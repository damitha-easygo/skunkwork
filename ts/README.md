# ts-video — play MPEG-TS in the browser

A tiny, dependency-free web component that takes an MPEG-TS (`.ts`) URL, remuxes
it to MP4 **in the browser** using WebAssembly (H.264 stream copy — no re-encode),
and plays it from a `blob:` URL in a real `<video>` element.

```html
<script type="module" src="ts-video.js"></script>

<ts-video src="clip.ts" controls autoplay muted loop></ts-video>
```

No server, no build step, no runtime dependencies. Just static files.

## Files

| File | Purpose |
|------|---------|
| `ts-video.js` | The `<ts-video>` custom element (import this). |
| `remux.js` | Loads the wasm and exposes `remuxToMp4(bytes) → Uint8Array`. |
| `lib/ffmpeg-thumb.wasm` | FFmpeg/libav remuxer (~1.6 MB), fetched + compiled once per page. |
| `lib/ffmpeg-thumb.mjs` | Emscripten glue for the wasm. |
| `demo.html` | Paste a `.ts` URL and play it. |

Serve the folder over HTTP (the `.wasm` must be served as `application/wasm`, and
ES modules don't load from `file://`):

```bash
cd web && python3 -m http.server 8080   # then open http://localhost:8080/demo.html
```

## API

### `<ts-video>` element

- **`src`** — URL of the `.ts` file. Setting/changing it (re)loads and plays.
- Passthrough `<video>` attributes: `controls`, `autoplay`, `muted`, `loop`,
  `playsinline`, `poster`, `preload`.
- Size it by styling the host: `ts-video { width: 480px }`.
- `.video` — the underlying `<video>` element (for `play()`, `currentTime`, …).

Events (bubble):

| Event | `detail` |
|-------|----------|
| `tsloadstart` | `{ src }` |
| `tsready` | `{ src, bytes }` — MP4 ready, playback starting |
| `tserror` | `{ src, error }` |

### `remux.js` (use the muxer directly)

```js
import { remuxToMp4, warm, setWasmUrl } from './remux.js';

await warm();                                  // optional: pre-compile the wasm
const mp4 = await remuxToMp4(new Uint8Array(tsBytes));
const url = URL.createObjectURL(new Blob([mp4], { type: 'video/mp4' }));
```

- `setWasmUrl(url)` — point at a custom `.wasm` location (call before first use).
  By default it resolves `./lib/ffmpeg-thumb.wasm` relative to `remux.js`.

### `<tsvideo>` (hyphen-less)

HTML requires custom-element tag names to contain a hyphen, so `<tsvideo>` can't
be a real custom element. `ts-video.js` still supports it for static markup by
scanning the DOM on load and mounting a `<ts-video>` inside each `<tsvideo>`.
**Prefer `<ts-video>`** — it has full lifecycle support (reacts to dynamic `src`
changes, elements added after load, etc.).

## Constraints & notes

- **Video only.** The remuxer copies the H.264 video stream and **drops audio**.
- **CORS.** The browser fetches the `.ts` directly, so the file's server must
  send `Access-Control-Allow-Origin` (or be same-origin). Servers that don't
  (e.g. some CDN segment hosts) will block the fetch — proxy them if needed.
- **Whole-file fetch.** The entire `.ts` is downloaded and remuxed in one shot
  (not streamed). Intended for short clips/segments, not long VODs.
- **Codec.** Input must be H.264 in MPEG-TS (what HLS segments carry). The MP4
  is a stream copy, so H.264 support in the target browser is all that's needed.
- Verified end-to-end in Chrome: a 893 KB TS segment remuxes to a 717 KB MP4 in
  ~38 ms and plays.

The wasm is the `remux_ts_to_mp4` build from this repo's `ffmpeg/` (see
`ffmpeg/wrapper.c`); `remux.js` is the browser port of `worker/ffmpeg.ts`.
