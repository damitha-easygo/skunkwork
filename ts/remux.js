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
    return { Mod, remuxFn };
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
    return mp4;
  } finally {
    Mod._free(inPtr);
    Mod._free(outPtrPtr);
    Mod._free(outLenPtr);
  }
}
