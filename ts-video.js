/*
 * ts-video.js — <ts-video src="clip.ts"> web component.
 *
 * Fetches an MPEG-TS file, remuxes it to MP4 in-browser via WebAssembly
 * (ffmpeg-thumb.wasm, H.264 stream copy — no re-encode), wraps the result in a
 * blob: URL and plays it in a real <video> element.
 *
 *   <script type="module" src="ts-video.js"></script>
 *   <ts-video src="clip.ts" controls autoplay muted loop></ts-video>
 *
 * The <video> is created inside a shadow root, so page CSS doesn't leak in;
 * size it by styling the host (`ts-video { width: 480px }`).
 *
 * Note: HTML requires custom-element tag names to contain a hyphen, so the
 * canonical element is <ts-video>. For convenience a hyphen-less <tsvideo> is
 * also supported via a DOM scan (see the bottom of this file), but <ts-video>
 * is the one with full lifecycle support (reacts to dynamic src changes, etc.).
 */
import { remuxToMp4, warm } from './remux.js';

export { warm, setWasmUrl } from './remux.js';

// Attributes mirrored straight through to the inner <video>.
const VIDEO_ATTRS = ['controls', 'autoplay', 'muted', 'loop', 'playsinline', 'poster', 'preload'];

class TsVideo extends HTMLElement {
  static get observedAttributes() {
    return ['src', ...VIDEO_ATTRS];
  }

  #video;
  #objectUrl = null;
  #loadToken = 0;

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });
    root.innerHTML = `
      <style>
        :host { display: inline-block; position: relative; }
        video { display: block; width: 100%; height: 100%; background: #000; }
        :host([hidden]) { display: none; }
      </style>`;
    this.#video = document.createElement('video');
    root.appendChild(this.#video);
  }

  connectedCallback() {
    this.#syncVideoAttrs();
    if (this.getAttribute('src')) this.#load(this.getAttribute('src'));
  }

  disconnectedCallback() {
    this.#revoke();
  }

  attributeChangedCallback(name, _old, value) {
    if (name === 'src') {
      if (value) this.#load(value);
      else this.#clear();
    } else {
      this.#syncVideoAttrs();
    }
  }

  /** The underlying <video>, for play()/pause()/currentTime/etc. */
  get video() {
    return this.#video;
  }

  #syncVideoAttrs() {
    for (const a of VIDEO_ATTRS) {
      if (this.hasAttribute(a)) this.#video.setAttribute(a, this.getAttribute(a) ?? '');
      else this.#video.removeAttribute(a);
    }
    // iOS Safari only honours muted/inline autoplay via the *properties*, not
    // the attributes — set them explicitly or autoplay silently fails.
    this.#video.muted = this.#video.defaultMuted = this.hasAttribute('muted');
    this.#video.playsInline = this.hasAttribute('playsinline');
  }

  async #load(src) {
    const token = ++this.#loadToken; // guard against overlapping/aborted loads
    this.#emit('tsloadstart', { src });
    try {
      const resolved = new URL(src, this.baseURI).href;
      const resp = await fetch(resolved);
      if (!resp.ok) throw new Error(`fetch ${resp.status}: ${resolved}`);
      const ts = new Uint8Array(await resp.arrayBuffer());
      if (token !== this.#loadToken) return; // superseded by a newer src

      const mp4 = await remuxToMp4(ts);
      if (token !== this.#loadToken) return;

      this.#revoke();
      this.#objectUrl = URL.createObjectURL(new Blob([mp4], { type: 'video/mp4' }));
      this.#video.src = this.#objectUrl;
      if (this.hasAttribute('autoplay')) this.#video.play().catch(() => {}); // ignore gesture-required rejections
      this.#emit('tsready', { src, bytes: mp4.length });
    } catch (err) {
      if (token !== this.#loadToken) return;
      this.#emit('tserror', { src, error: err });
      console.error('[ts-video]', err);
    }
  }

  #clear() {
    this.#loadToken++;
    this.#revoke();
    this.#video.removeAttribute('src');
    this.#video.load();
  }

  #revoke() {
    if (this.#objectUrl) {
      URL.revokeObjectURL(this.#objectUrl);
      this.#objectUrl = null;
    }
  }

  #emit(type, detail) {
    this.dispatchEvent(new CustomEvent(type, { detail, bubbles: true }));
  }
}

if (!customElements.get('ts-video')) {
  customElements.define('ts-video', TsVideo);
}

export { TsVideo };

/* ---- <tsvideo> (hyphen-less) fallback ------------------------------------
 * A tag without a hyphen can't be a custom element, so we upgrade it by hand:
 * scan for <tsvideo> elements, mount a <ts-video> inside each, and mirror src.
 * Covers the common static-markup case; use <ts-video> directly if you add
 * <tsvideo> elements dynamically after load. */
function upgradePlainTags(root = document) {
  for (const el of root.querySelectorAll('tsvideo:not([data-ts-upgraded])')) {
    el.setAttribute('data-ts-upgraded', '');
    const inner = document.createElement('ts-video');
    for (const { name, value } of el.attributes) {
      if (name !== 'data-ts-upgraded') inner.setAttribute(name, value);
    }
    el.appendChild(inner);
  }
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => upgradePlainTags());
  } else {
    upgradePlainTags();
  }
}

export { upgradePlainTags };
