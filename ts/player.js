/*
 * player.js — Netflix-style player behaviour.
 *
 * Playback: hls.js (MSE) in Chrome/Firefox, native HLS in Safari/iOS.
 * Scrub-bar hover previews: our wasm trickplay (trickplay.js) — a ~16 KB range
 * fetch + in-browser JPEG decode of the segment under the cursor.
 *
 * Expects the markup/ids in player.html and a global `Hls` (from lib/hls.min.js).
 */
import { openTrickplay, formatTime } from './trickplay.js';

const $ = (id) => document.getElementById(id);

export async function createPlayer(masterUrl, { title = '' } = {}) {
  const root = $('player');
  const video = $('video');
  const scrub = $('scrub');
  const playedEl = $('played');
  const bufferedEl = $('buffered');
  const knob = $('knob');
  const thumb = $('thumb');
  const thumbImg = $('thumbImg');
  const thumbTime = $('thumbTime');
  const curEl = $('cur');
  const durEl = $('dur');

  $('title').textContent = title;

  /* ---- playback engine ------------------------------------------------- */
  let hls = null;
  if (window.Hls && window.Hls.isSupported()) {
    // Prefer hls.js/MSE. Chrome reports canPlayType('…mpegurl')='maybe' but
    // can't actually play HLS natively, so native must NOT be tried first —
    // otherwise byte-range (and plain) VODs fail with a src-not-supported error.
    hls = new window.Hls({ maxBufferLength: 30, capLevelToPlayerSize: true });
    hls.loadSource(masterUrl);
    hls.attachMedia(video);
    hls.on(window.Hls.Events.ERROR, (_e, data) => { if (data.fatal) console.error('[hls]', data.type, data.details); });
  } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
    video.src = masterUrl;                       // iOS Safari — native HLS, no MSE
  } else {
    setStatus('This browser cannot play HLS.');
  }

  // Attempt autoplay once the media is ready. If the browser blocks it (no user
  // gesture), we stay paused and the big center play button is shown.
  const tryAutoplay = () => video.play().catch(() => {});
  if (hls) hls.on(window.Hls.Events.MANIFEST_PARSED, tryAutoplay);
  else video.addEventListener('loadedmetadata', tryAutoplay, { once: true });

  /* ---- trickplay (independent, lowest rung) ---------------------------- */
  let tp = null;
  openTrickplay(masterUrl, { headBytes: 16 * 1024 })
    .then((t) => { tp = t; })
    .catch((e) => console.warn('[trickplay]', e.message));

  /* ---- play / pause ---------------------------------------------------- */
  const togglePlay = () => { video.paused ? video.play().catch(() => {}) : video.pause(); };
  $('play').addEventListener('click', togglePlay);
  $('bigPlay').addEventListener('click', togglePlay);
  video.addEventListener('click', togglePlay);
  video.addEventListener('play', () => root.classList.remove('paused'));
  video.addEventListener('pause', () => root.classList.add('paused'));
  video.addEventListener('waiting', () => root.classList.add('buffering'));
  video.addEventListener('playing', () => root.classList.remove('buffering'));
  root.classList.add('paused');

  /* ---- time / progress ------------------------------------------------- */
  const dur = () => (isFinite(video.duration) && video.duration > 0 ? video.duration : (tp?.totalDuration ?? 0));
  video.addEventListener('loadedmetadata', () => { durEl.textContent = formatTime(dur()); });
  video.addEventListener('timeupdate', () => {
    const d = dur();
    if (!d) return;
    playedEl.style.width = knob.style.left = (video.currentTime / d) * 100 + '%';
    curEl.textContent = formatTime(video.currentTime);
    if (!durEl.textContent || durEl.textContent === '0:00') durEl.textContent = formatTime(d);
  });
  video.addEventListener('progress', () => {
    const d = dur();
    if (d && video.buffered.length) bufferedEl.style.width = (video.buffered.end(video.buffered.length - 1) / d) * 100 + '%';
  });

  /* ---- scrubbing + hover thumbnails ------------------------------------
   * While the pointer sweeps the bar we could fire a fetch+decode for every
   * segment it crosses. To keep the network sane we: (1) skip segments already
   * shown/loading, (2) throttle fetches to ~THROTTLE_MS (leading+trailing) so a
   * fast drag can't spawn one request per segment, (3) abort the in-flight
   * fetch the instant the cursor moves to a different segment, and (4) only
   * prefetch neighbours once the pointer settles. The time label still updates
   * on every move — only the decode is rate-limited. */
  let dragging = false;
  let hoverToken = 0;
  let lastSeg = -1;                 // segment currently requested/shown
  let hoverAbort = null;            // AbortController for the in-flight hover fetch
  let throttleTimer = 0, settleTimer = 0, lastFire = 0, pendingFrac = 0;
  const THROTTLE_MS = 120;          // cap thumbnail fetches to ~8/sec while moving

  const fracFromX = (clientX) => {
    const r = scrub.getBoundingClientRect();
    return Math.min(1, Math.max(0, (clientX - r.left) / r.width));
  };

  function requestThumb(frac) {
    if (!tp) return;
    const seconds = frac * dur();
    const seg = tp.segmentIndexAt(seconds);
    if (seg === lastSeg) return;          // same segment — nothing new to fetch
    lastSeg = seg;
    if (hoverAbort) hoverAbort.abort();   // cancel the now-stale in-flight fetch
    hoverAbort = new AbortController();
    const token = ++hoverToken;
    tp.thumbUrlAt(seconds, { signal: hoverAbort.signal })
      .then((url) => { if (token === hoverToken) thumbImg.src = url; })
      .catch(() => {});                   // aborted or failed → keep previous frame
    clearTimeout(settleTimer);
    settleTimer = setTimeout(() => tp.prefetchAround(seconds, 1), 200); // prefetch on settle only
  }

  function showThumb(frac) {
    const d = dur();
    const seconds = frac * d;
    const r = scrub.getBoundingClientRect();
    thumb.style.display = 'block';
    thumb.style.left = Math.min(Math.max(frac * r.width, 142), r.width - 142) + 'px';
    thumbTime.textContent = formatTime(seconds);   // cheap — every move
    if (!tp) return;
    pendingFrac = frac;
    const wait = THROTTLE_MS - (performance.now() - lastFire);
    clearTimeout(throttleTimer);
    if (wait <= 0) { lastFire = performance.now(); requestThumb(frac); }
    else throttleTimer = setTimeout(() => { lastFire = performance.now(); requestThumb(pendingFrac); }, wait);
  }

  function resetHover() {
    thumb.style.display = 'none';
    hoverToken++; lastSeg = -1;
    clearTimeout(throttleTimer); clearTimeout(settleTimer);
    if (hoverAbort) { hoverAbort.abort(); hoverAbort = null; }
  }

  scrub.addEventListener('pointermove', (e) => { if (!dragging) showThumb(fracFromX(e.clientX)); });
  scrub.addEventListener('pointerleave', () => { if (!dragging) resetHover(); });

  const seekToFrac = (frac) => { const d = dur(); if (d) video.currentTime = frac * d; };

  scrub.addEventListener('pointerdown', (e) => {
    dragging = true;
    scrub.setPointerCapture(e.pointerId);
    const f = fracFromX(e.clientX);
    playedEl.style.width = knob.style.left = f * 100 + '%';
    showThumb(f);
  });
  scrub.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const f = fracFromX(e.clientX);
    playedEl.style.width = knob.style.left = f * 100 + '%';   // live scrub feedback
    showThumb(f);
  });
  const endDrag = (e) => {
    if (!dragging) return;
    dragging = false;
    try { scrub.releasePointerCapture(e.pointerId); } catch {}
    seekToFrac(fracFromX(e.clientX));
    resetHover();
  };
  scrub.addEventListener('pointerup', endDrag);
  scrub.addEventListener('pointercancel', endDrag);

  /* ---- volume ---------------------------------------------------------- */
  const applyMuted = () => root.classList.toggle('muted', video.muted || video.volume === 0);
  $('mute').addEventListener('click', () => { video.muted = !video.muted; applyMuted(); });
  video.addEventListener('volumechange', applyMuted);

  /* ---- skip buttons ---------------------------------------------------- */
  $('back10').addEventListener('click', () => { video.currentTime = Math.max(0, video.currentTime - 10); });
  $('fwd10').addEventListener('click', () => { video.currentTime = Math.min(dur(), video.currentTime + 10); });

  /* ---- fullscreen ------------------------------------------------------ */
  $('fs').addEventListener('click', () => {
    if (document.fullscreenElement) document.exitFullscreen();
    else root.requestFullscreen?.();
  });

  /* ---- auto-hide controls --------------------------------------------- */
  let hideTimer = 0;
  const wake = () => {
    root.classList.remove('idle');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => { if (!video.paused) root.classList.add('idle'); }, 2800);
  };
  root.addEventListener('pointermove', wake);
  root.addEventListener('pointerleave', () => { if (!video.paused) root.classList.add('idle'); });
  wake();

  /* ---- keyboard -------------------------------------------------------- */
  addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
    switch (e.key) {
      case ' ': case 'k': e.preventDefault(); togglePlay(); break;
      case 'ArrowLeft': video.currentTime = Math.max(0, video.currentTime - 5); break;
      case 'ArrowRight': video.currentTime = Math.min(dur(), video.currentTime + 5); break;
      case 'f': $('fs').click(); break;
      case 'm': $('mute').click(); break;
    }
    wake();
  });

  function setStatus(msg) { const s = $('status'); if (s) s.textContent = msg; }
  return { video, get hls() { return hls; }, get trickplay() { return tp; } };
}
