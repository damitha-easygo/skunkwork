/*
 * remux.js — browser loader for ffmpeg-thumb.wasm's remux_ts_to_mp4().
 *
 * Ports worker/ffmpeg.ts to a plain-browser environment. The emscripten glue
 * (lib/ffmpeg-thumb.mjs) was built with its environment loaders stripped, so it
 * relies entirely on Module.instantiateWasm — same as under workerd. Here we
 * fetch + compile the .wasm ourselves and hand it over. Compiled once, cached
 * for the lifetime of the page.
 *
 * No dependencies, no build step. Import as an ES module.
 */
import FFmpegThumb from './lib/ffmpeg-thumb.mjs';

// Resolve the .wasm next to this module by default. Override via setWasmUrl().
let wasmUrl = new URL('./lib/ffmpeg-thumb.wasm', import.meta.url).href;

/** Point the loader at a custom .wasm location (call before the first remux). */
export function setWasmUrl(url) {
  wasmUrl = String(url);
}

let modPromise = null;

function load() {
  if (modPromise) return modPromise;
  modPromise = (async () => {
    // Compile the module once; the glue instantiates it synchronously via the hook.
    const bytes = await fetch(wasmUrl).then((r) => {
      if (!r.ok) throw new Error(`fetch wasm ${r.status}: ${wasmUrl}`);
      return r.arrayBuffer();
    });
    const wasmModule = await WebAssembly.compile(bytes);

    const Mod = await FFmpegThumb({
      instantiateWasm(imports, receive) {
        const instance = new WebAssembly.Instance(wasmModule, imports);
        receive(instance);
        return instance.exports;
      },
      // ffmpeg logs the (expected, harmless) audio-probe failures to stderr since
      // we keep only the video stream — swallow those, surface anything else.
      printErr: (t) => {
        if (/Could not find codec parameters|Consider increasing|analyzeduration|deprecated pixel format/i.test(t)) return;
        console.warn('[ffmpeg]', t);
      },
    });

    const remuxFn = Mod.cwrap('remux_ts_to_mp4', 'number',
      ['number', 'number', 'number', 'number']);
    const decodeFn = Mod.cwrap('decode_first_idr_to_jpeg', 'number',
      ['number', 'number', 'number', 'number', 'number', 'number', 'number']);
    return { Mod, remuxFn, decodeFn };
  })();
  return modPromise;
}

/** Warm the wasm (fetch + compile + instantiate) ahead of the first remux. */
export function warm() {
  return load().then(() => undefined);
}

/**
 * Remux a concatenated MPEG-TS buffer to a video-only MP4 (H.264 stream copy,
 * no re-encode, audio dropped).
 *
 * @param {Uint8Array|ArrayBuffer} ts  raw .ts bytes
 * @returns {Promise<Uint8Array>} the MP4 bytes
 * @throws if the wasm remuxer returns a non-zero code
 */
export async function remuxToMp4(ts) {
  const tsBytes = ts instanceof Uint8Array ? ts : new Uint8Array(ts);
  const { Mod, remuxFn } = await load();

  const inPtr = Mod._malloc(tsBytes.length);
  Mod.HEAPU8.set(tsBytes, inPtr);
  const outPtrPtr = Mod._malloc(4);
  const outLenPtr = Mod._malloc(4);

  try {
    const rc = remuxFn(inPtr, tsBytes.length, outPtrPtr, outLenPtr);
    if (rc !== 0) throw new Error(`remux_ts_to_mp4 failed: rc=${rc}`);
    const p = Mod.HEAPU32[outPtrPtr >> 2];
    const len = Mod.HEAPU32[outLenPtr >> 2];
    const mp4 = Mod.HEAPU8.slice(p, p + len);
    Mod._free_jpeg(p); // free_jpeg() is a plain free()
    // movenc writes moov after mdat; iOS Safari needs it up front. Reorder.
    return faststart(mp4);
  } finally {
    Mod._free(inPtr);
    Mod._free(outPtrPtr);
    Mod._free(outLenPtr);
  }
}

/**
 * Decode the FIRST IDR keyframe of an MPEG-TS buffer to a JPEG. The buffer may
 * be just the head of a segment (HLS segments start on an IDR with in-band
 * SPS/PPS) — ~16 KB of a 160p segment is enough.
 *
 * @param {Uint8Array|ArrayBuffer} ts  raw .ts bytes (or head)
 * @param {{width?:number,height?:number,quality?:number}} [opts]
 *   width/height 0 = keep native; quality 1..100 (default 80).
 * @returns {Promise<{rc:number, jpeg:Uint8Array|null}>}
 *   rc 0 = ok, 1 = NEED_MORE_DATA (grow the head and retry), <0 = hard error.
 */
export async function decodeToJpeg(ts, opts = {}) {
  const tsBytes = ts instanceof Uint8Array ? ts : new Uint8Array(ts);
  const { width = 0, height = 0, quality = 80 } = opts;
  const { Mod, decodeFn } = await load();

  const inPtr = Mod._malloc(tsBytes.length);
  Mod.HEAPU8.set(tsBytes, inPtr);
  const outPtrPtr = Mod._malloc(4);
  const outLenPtr = Mod._malloc(4);
  try {
    const rc = decodeFn(inPtr, tsBytes.length, width | 0, height | 0, quality | 0, outPtrPtr, outLenPtr);
    let jpeg = null;
    if (rc === 0) {
      const p = Mod.HEAPU32[outPtrPtr >> 2];
      const len = Mod.HEAPU32[outLenPtr >> 2];
      jpeg = Mod.HEAPU8.slice(p, p + len);
      Mod._free_jpeg(p);
    }
    return { rc, jpeg };
  } finally {
    Mod._free(inPtr);
    Mod._free(outPtrPtr);
    Mod._free(outLenPtr);
  }
}

/* ---- faststart: move the moov atom ahead of mdat -------------------------
 * A "moov-last" MP4 plays on desktop Safari/Chrome but iOS Safari wants the
 * index up front. We rebuild the file as [ftyp][moov][mdat] and patch the
 * chunk-offset tables (stco/co64) inside moov by however far mdat shifted.
 * Free-standing `free` padding is dropped. If the file is already faststart
 * (or not the shape we expect) it's returned untouched. */
const CONTAINERS = new Set(['moov', 'trak', 'mdia', 'minf', 'stbl', 'edts', 'mvex', 'udta']);

function boxType(buf, i) {
  return String.fromCharCode(buf[i + 4], buf[i + 5], buf[i + 6], buf[i + 7]);
}

function topLevelBoxes(mp4) {
  const dv = new DataView(mp4.buffer, mp4.byteOffset, mp4.byteLength);
  const boxes = [];
  let i = 0;
  while (i + 8 <= mp4.length) {
    let size = dv.getUint32(i);
    let hdr = 8;
    if (size === 1) { size = Number(dv.getBigUint64(i + 8)); hdr = 16; }
    else if (size === 0) size = mp4.length - i;
    if (size < hdr || i + size > mp4.length) break;
    boxes.push({ type: boxType(mp4, i), start: i, size });
    i += size;
  }
  return boxes;
}

function patchChunkOffsets(moov, delta) {
  const dv = new DataView(moov.buffer, moov.byteOffset, moov.byteLength);
  const bigDelta = BigInt(delta);
  (function walk(start, end) {
    let i = start;
    while (i + 8 <= end) {
      let size = dv.getUint32(i);
      let hdr = 8;
      if (size === 1) { size = Number(dv.getBigUint64(i + 8)); hdr = 16; }
      else if (size === 0) size = end - i;
      if (size < hdr || i + size > end) break;
      const type = boxType(moov, i);
      if (type === 'stco') {
        const count = dv.getUint32(i + hdr + 4);
        let p = i + hdr + 8;
        for (let e = 0; e < count && p + 4 <= end; e++, p += 4) dv.setUint32(p, dv.getUint32(p) + delta);
      } else if (type === 'co64') {
        const count = dv.getUint32(i + hdr + 4);
        let p = i + hdr + 8;
        for (let e = 0; e < count && p + 8 <= end; e++, p += 8) dv.setBigUint64(p, dv.getBigUint64(p) + bigDelta);
      } else if (CONTAINERS.has(type)) {
        walk(i + hdr, i + size);
      }
      i += size;
    }
  })(0, moov.length);
}

export function faststart(mp4) {
  const boxes = topLevelBoxes(mp4);
  const ftyp = boxes.find((b) => b.type === 'ftyp');
  const moov = boxes.find((b) => b.type === 'moov');
  const mdat = boxes.find((b) => b.type === 'mdat');
  if (!moov || !mdat) return mp4;            // unexpected shape — leave it
  if (moov.start < mdat.start) return mp4;   // already faststart

  const ftypEnd = ftyp ? ftyp.start + ftyp.size : 0;
  const rest = boxes.filter((b) => b !== ftyp && b !== moov && b.type !== 'free');
  if (!rest.length) return mp4;
  const delta = (ftypEnd + moov.size) - rest[0].start; // how far media shifts forward

  const moovBytes = mp4.slice(moov.start, moov.start + moov.size);
  patchChunkOffsets(moovBytes, delta);

  const out = new Uint8Array(ftypEnd + moov.size + rest.reduce((n, b) => n + b.size, 0));
  let o = 0;
  if (ftyp) { out.set(mp4.subarray(ftyp.start, ftyp.start + ftyp.size), o); o += ftyp.size; }
  out.set(moovBytes, o); o += moov.size;
  for (const b of rest) { out.set(mp4.subarray(b.start, b.start + b.size), o); o += b.size; }
  return out;
}
