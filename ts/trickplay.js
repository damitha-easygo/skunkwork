/*
 * trickplay.js — on-demand HLS thumbnail (trickplay) source.
 *
 * Given an HLS master (or variant) URL it builds a time→segment index, then
 * lazily produces a JPEG thumbnail for any timestamp by range-fetching just the
 * head of the segment under the cursor and decoding its first IDR frame via
 * ffmpeg-thumb.wasm. Results are cached (LRU), so scrubbing a 21 h VOD costs one
 * ~16 KB fetch + ~10 ms decode per distinct segment visited.
 *
 *   import { openTrickplay } from './trickplay.js';
 *   const tp = await openTrickplay(masterUrl);
 *   img.src = await tp.thumbUrlAt(3600);   // frame near 1 h in
 *
 * No dependencies. Fetch works cross-origin only if the segments' server sends
 * CORS headers (kick.com / IVS do: access-control-allow-origin: *).
 */
import { decodeToJpeg } from './remux.js';

/* ---- manifest parsing ---------------------------------------------------- */

function parseMaster(text, baseUrl) {
  const lines = text.split(/\r?\n/);
  const variants = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('#EXT-X-STREAM-INF:')) {
      const attrs = lines[i].slice('#EXT-X-STREAM-INF:'.length);
      const bandwidth = Number(/BANDWIDTH=(\d+)/.exec(attrs)?.[1] ?? 0);
      const resolution = /RESOLUTION=(\d+x\d+)/.exec(attrs)?.[1] ?? null;
      const uri = lines[++i]?.trim();
      if (uri && !uri.startsWith('#')) {
        variants.push({ bandwidth, resolution, url: new URL(uri, baseUrl).href });
      }
    }
  }
  return variants;
}

function parseVariant(text, baseUrl) {
  const lines = text.split(/\r?\n/);
  const segments = [];
  let start = 0;
  let pendingDur = null;
  for (const raw of lines) {
    const line = raw.trim();
    if (line.startsWith('#EXTINF:')) {
      pendingDur = parseFloat(line.slice('#EXTINF:'.length));
    } else if (line && !line.startsWith('#')) {
      const duration = pendingDur ?? 0;
      segments.push({ index: segments.length, url: new URL(line, baseUrl).href, start, duration });
      start += duration;
      pendingDur = null;
    }
  }
  return { segments, totalDuration: start };
}

/** Locate the segment covering `t` seconds via binary search on start times. */
function segmentAt(segments, t) {
  let lo = 0, hi = segments.length - 1, ans = 0;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (segments[mid].start <= t) { ans = mid; lo = mid + 1; }
    else hi = mid - 1;
  }
  return ans;
}

/* ---- LRU of blob URLs ---------------------------------------------------- */

class LruBlobCache {
  constructor(max = 500) { this.max = max; this.map = new Map(); }
  get(key) {
    if (!this.map.has(key)) return undefined;
    const v = this.map.get(key);
    this.map.delete(key); this.map.set(key, v); // bump to newest
    return v;
  }
  set(key, url) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, url);
    while (this.map.size > this.max) {
      const [oldest, oldUrl] = this.map.entries().next().value;
      this.map.delete(oldest);
      URL.revokeObjectURL(oldUrl);
    }
  }
}

/* ---- public API ---------------------------------------------------------- */

/**
 * @param {string} url  master or variant .m3u8 URL
 * @param {object} [opts]
 *   variant: 'lowest'|'highest'|number(index)  — which rung to sample (default lowest)
 *   headBytes: initial range size (default 16384)
 *   maxHeadBytes: cap when doubling on NEED_MORE_DATA (default 262144)
 *   width/height: output size, 0 = native (default native)
 *   quality: 1..100 (default 80)
 *   cacheSize: max cached thumbnails (default 500)
 */
export async function openTrickplay(url, opts = {}) {
  const {
    variant = 'lowest',
    headBytes = 16 * 1024,
    maxHeadBytes = 256 * 1024,
    width = 0, height = 0, quality = 80,
    cacheSize = 500,
  } = opts;

  const masterText = await fetch(url).then((r) => {
    if (!r.ok) throw new Error(`fetch manifest ${r.status}: ${url}`);
    return r.text();
  });

  // If it's a master, resolve to a variant playlist; otherwise it's already one.
  let variantUrl = url;
  let chosen = null;
  if (masterText.includes('#EXT-X-STREAM-INF:')) {
    const variants = parseMaster(masterText, url).sort((a, b) => a.bandwidth - b.bandwidth);
    if (!variants.length) throw new Error('no variants in master playlist');
    const idx = variant === 'lowest' ? 0
      : variant === 'highest' ? variants.length - 1
      : Math.max(0, Math.min(variants.length - 1, variant | 0));
    chosen = variants[idx];
    variantUrl = chosen.url;
  }

  const variantText = variantUrl === url
    ? masterText
    : await fetch(variantUrl).then((r) => {
        if (!r.ok) throw new Error(`fetch variant ${r.status}: ${variantUrl}`);
        return r.text();
      });

  const { segments, totalDuration } = parseVariant(variantText, variantUrl);
  if (!segments.length) throw new Error('no segments in variant playlist');

  const cache = new LruBlobCache(cacheSize);
  const inflight = new Map(); // segment index -> Promise<string>

  async function fetchAndDecode(seg, signal) {
    let want = headBytes;
    for (;;) {
      const resp = await fetch(seg.url, { headers: { Range: `bytes=0-${want - 1}` }, signal });
      if (!resp.ok && resp.status !== 206 && resp.status !== 200) {
        throw new Error(`fetch segment ${resp.status}: ${seg.url}`);
      }
      const head = new Uint8Array(await resp.arrayBuffer());
      const { rc, jpeg } = await decodeToJpeg(head, { width, height, quality });
      if (rc === 0 && jpeg) {
        return URL.createObjectURL(new Blob([jpeg], { type: 'image/jpeg' }));
      }
      // rc === 1: head ended before a full IDR. Grow and retry.
      // If the server already returned less than we asked (short segment), stop.
      if (rc !== 1 || head.length < want || want >= maxHeadBytes) {
        throw new Error(`decode failed for ${seg.url} (rc=${rc}, head=${head.length}B)`);
      }
      want = Math.min(want * 2, maxHeadBytes);
    }
  }

  return {
    variant: chosen,      // {bandwidth,resolution,url} or null if a variant URL was passed
    variantUrl,
    segments,
    totalDuration,
    segmentCount: segments.length,

    /** Segment index covering `seconds`. */
    segmentIndexAt: (seconds) => segmentAt(segments, Math.max(0, Math.min(seconds, totalDuration - 0.001))),

    /**
     * Blob-URL of a JPEG thumbnail for the segment covering `seconds`.
     * Cached per segment; concurrent calls for the same segment share one fetch.
     * Pass `{ signal }` to abort the underlying range fetch (e.g. when the
     * scrubber moves on before this segment finishes loading).
     */
    async thumbUrlAt(seconds, { signal } = {}) {
      const i = segmentAt(segments, Math.max(0, Math.min(seconds, totalDuration - 0.001)));
      const cached = cache.get(i);
      if (cached) return cached;
      if (inflight.has(i)) return inflight.get(i);
      const p = fetchAndDecode(segments[i], signal)
        .then((u) => { cache.set(i, u); inflight.delete(i); return u; })
        .catch((e) => { inflight.delete(i); throw e; });
      inflight.set(i, p);
      return p;
    },

    /** Warm neighbours around a time for smoother scrubbing (fire-and-forget). */
    prefetchAround(seconds, radius = 1) {
      const i = segmentAt(segments, seconds);
      for (let d = -radius; d <= radius; d++) {
        const j = i + d;
        if (j >= 0 && j < segments.length && !cache.get(j) && !inflight.has(j)) {
          this.thumbUrlAt(segments[j].start + 0.01).catch(() => {});
        }
      }
    },
  };
}

/** hh:mm:ss for a duration in seconds. */
export function formatTime(sec) {
  sec = Math.max(0, Math.floor(sec));
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return h ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}
