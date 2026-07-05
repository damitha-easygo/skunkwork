var __defProp = Object.defineProperty;
var __returnValue = (v) => v;
function __exportSetter(name, newValue) {
  this[name] = __returnValue.bind(null, newValue);
}
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: __exportSetter.bind(all, name)
    });
};
var __esm = (fn, res) => () => (fn && (res = fn(fn = 0)), res);
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// node_modules/@moq/net/path.js
var exports_path = {};
__export(exports_path, {
  stripPrefix: () => stripPrefix,
  join: () => join,
  hasPrefix: () => hasPrefix,
  from: () => from,
  empty: () => empty
});
function from(...paths) {
  const joined = paths.join("/");
  return joined.replace(/\/+/g, "/").replace(/^\/+/, "").replace(/\/+$/, "");
}
function hasPrefix(prefix, path) {
  if (prefix === "") {
    return true;
  }
  if (!path.startsWith(prefix)) {
    return false;
  }
  if (path.length === prefix.length) {
    return true;
  }
  return path[prefix.length] === "/";
}
function stripPrefix(prefix, path) {
  if (!hasPrefix(prefix, path)) {
    return null;
  }
  if (prefix === "") {
    return path;
  }
  if (path.length === prefix.length) {
    return "";
  }
  return path.slice(prefix.length + 1);
}
function join(path, other) {
  if (path === "") {
    return other;
  } else if (other === "") {
    return path;
  } else {
    return `${path}/${other}`;
  }
}
function empty() {
  return "";
}

// node_modules/@moq/net/ietf/version.js
function versionName(v) {
  return VERSION_NAMES[v] ?? `unknown(0x${v.toString(16)})`;
}
var Version, ALPN, VERSION_NAMES;
var init_version = __esm(() => {
  Version = {
    DRAFT_07: 4278190087,
    DRAFT_14: 4278190094,
    DRAFT_15: 4278190095,
    DRAFT_16: 4278190096,
    DRAFT_17: 4278190097,
    DRAFT_18: 4278190098
  };
  ALPN = {
    DRAFT_14: "moq-00",
    DRAFT_15: "moqt-15",
    DRAFT_16: "moqt-16",
    DRAFT_17: "moqt-17",
    DRAFT_18: "moqt-18"
  };
  VERSION_NAMES = {
    [Version.DRAFT_07]: "moq-transport-07",
    [Version.DRAFT_14]: "moq-transport-14",
    [Version.DRAFT_15]: "moq-transport-15",
    [Version.DRAFT_16]: "moq-transport-16",
    [Version.DRAFT_17]: "moq-transport-17",
    [Version.DRAFT_18]: "moq-transport-18"
  };
});

// node_modules/@moq/net/varint.js
var exports_varint = {};
__export(exports_varint, {
  sizeLeadingOnes: () => sizeLeadingOnes,
  size: () => size,
  encodeTo: () => encodeTo,
  encodeLeadingOnesTo: () => encodeLeadingOnesTo,
  encodeLeadingOnes: () => encodeLeadingOnes,
  encode: () => encode,
  decodeLeadingOnes: () => decodeLeadingOnes,
  decode: () => decode,
  MAX_U6: () => MAX_U6,
  MAX_U53: () => MAX_U53,
  MAX_U30: () => MAX_U30,
  MAX_U14: () => MAX_U14
});
function sizeLeadingOnes(v) {
  const b = BigInt(v);
  if (b < 0n)
    throw new RangeError(`value is negative: ${v}`);
  if (b > MAX_U64)
    throw new RangeError(`value exceeds 64 bits: ${v}`);
  if (b < 1n << 7n)
    return 1;
  if (b < 1n << 14n)
    return 2;
  if (b < 1n << 21n)
    return 3;
  if (b < 1n << 28n)
    return 4;
  if (b < 1n << 35n)
    return 5;
  if (b < 1n << 42n)
    return 6;
  if (b < 1n << 56n)
    return 8;
  return 9;
}
function encodeLeadingOnesTo(dst, v) {
  const x = BigInt(v);
  if (x < 0n)
    throw new RangeError(`underflow, value is negative: ${v}`);
  if (x > MAX_U64)
    throw new RangeError(`value exceeds 64 bits: ${v}`);
  const view = new DataView(dst);
  if (x < 1n << 7n) {
    view.setUint8(0, Number(x));
    return new Uint8Array(dst, 0, 1);
  }
  if (x < 1n << 14n) {
    view.setUint8(0, 128 | Number(x >> 8n));
    view.setUint8(1, Number(x & 0xffn));
    return new Uint8Array(dst, 0, 2);
  }
  if (x < 1n << 21n) {
    view.setUint8(0, 192 | Number(x >> 16n));
    view.setUint16(1, Number(x & 0xffffn));
    return new Uint8Array(dst, 0, 3);
  }
  if (x < 1n << 28n) {
    view.setUint8(0, 224 | Number(x >> 24n));
    view.setUint8(1, Number(x >> 16n & 0xffn));
    view.setUint16(2, Number(x & 0xffffn));
    return new Uint8Array(dst, 0, 4);
  }
  if (x < 1n << 35n) {
    view.setUint8(0, 240 | Number(x >> 32n));
    view.setUint32(1, Number(x & 0xffffffffn));
    return new Uint8Array(dst, 0, 5);
  }
  if (x < 1n << 42n) {
    view.setUint8(0, 248 | Number(x >> 40n));
    view.setUint8(1, Number(x >> 32n & 0xffn));
    view.setUint32(2, Number(x & 0xffffffffn));
    return new Uint8Array(dst, 0, 6);
  }
  if (x < 1n << 56n) {
    view.setUint8(0, 254);
    view.setUint8(1, Number(x >> 48n & 0xffn));
    view.setUint16(2, Number(x >> 32n & 0xffffn));
    view.setUint32(4, Number(x & 0xffffffffn));
    return new Uint8Array(dst, 0, 8);
  }
  view.setUint8(0, 255);
  view.setBigUint64(1, x);
  return new Uint8Array(dst, 0, 9);
}
function encodeLeadingOnes(v) {
  return encodeLeadingOnesTo(new ArrayBuffer(9), v);
}
function decodeLeadingOnes(buf) {
  if (buf.length === 0)
    throw new Error("buffer is empty");
  const b = buf[0];
  let ones = 0;
  for (let bit = 7;bit >= 0; bit--) {
    if (b & 1 << bit)
      ones++;
    else
      break;
  }
  let totalSize;
  if (ones <= 5)
    totalSize = ones + 1;
  else if (ones === 6)
    totalSize = 7;
  else if (ones === 7)
    totalSize = 8;
  else
    totalSize = 9;
  if (buf.length < totalSize) {
    throw new Error(`buffer too short: need ${totalSize} bytes, have ${buf.length}`);
  }
  const view = new DataView(buf.buffer, buf.byteOffset, totalSize);
  const remain = buf.subarray(totalSize);
  let value;
  switch (ones) {
    case 0:
      value = BigInt(b);
      break;
    case 1:
      value = BigInt(b & 63) << 8n | BigInt(buf[1]);
      break;
    case 2:
      value = BigInt(b & 31) << 16n | BigInt(view.getUint16(1));
      break;
    case 3:
      value = BigInt(b & 15) << 24n | BigInt(buf[1]) << 16n | BigInt(buf[2]) << 8n | BigInt(buf[3]);
      break;
    case 4:
      value = BigInt(b & 7) << 32n | BigInt(view.getUint32(1));
      break;
    case 5:
      value = BigInt(b & 3) << 40n | BigInt(buf[1]) << 32n | BigInt(buf[2]) << 24n | BigInt(buf[3]) << 16n | BigInt(buf[4]) << 8n | BigInt(buf[5]);
      break;
    case 6: {
      value = BigInt(b & 1) << 48n | BigInt(buf[1]) << 40n | BigInt(buf[2]) << 32n | BigInt(buf[3]) << 24n | BigInt(buf[4]) << 16n | BigInt(buf[5]) << 8n | BigInt(buf[6]);
      break;
    }
    case 7: {
      const hi = new Uint8Array(8);
      hi[0] = 0;
      hi.set(buf.subarray(1, 8), 1);
      value = new DataView(hi.buffer).getBigUint64(0);
      break;
    }
    case 8: {
      value = new DataView(buf.buffer, buf.byteOffset + 1, 8).getBigUint64(0);
      break;
    }
    default:
      throw new Error("impossible");
  }
  return [value, remain];
}
function size(v) {
  if (v <= MAX_U6)
    return 1;
  if (v <= MAX_U14)
    return 2;
  if (v <= MAX_U30)
    return 4;
  if (v <= MAX_U53)
    return 8;
  throw new Error(`overflow, value larger than 53-bits: ${v}`);
}
function setUint8(dst, v) {
  const buffer = new Uint8Array(dst, 0, 1);
  buffer[0] = v;
  return buffer;
}
function setUint16(dst, v) {
  const view = new DataView(dst, 0, 2);
  view.setUint16(0, v);
  return new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
}
function setUint32(dst, v) {
  const view = new DataView(dst, 0, 4);
  view.setUint32(0, v);
  return new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
}
function setUint64(dst, v) {
  const view = new DataView(dst, 0, 8);
  view.setBigUint64(0, v);
  return new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
}
function encodeTo(dst, v) {
  const b = BigInt(v);
  if (b < 0n) {
    throw new Error(`underflow, value is negative: ${v}`);
  }
  if (b > MAX_U62) {
    throw new Error(`overflow, value larger than 62-bits: ${v}`);
  }
  const n = Number(b);
  if (n <= MAX_U6) {
    return setUint8(dst, n);
  }
  if (n <= MAX_U14) {
    return setUint16(dst, n | 16384);
  }
  if (n <= MAX_U30) {
    return setUint32(dst, n | 2147483648);
  }
  return setUint64(dst, b | 0xc000000000000000n);
}
function encode(v) {
  return encodeTo(new ArrayBuffer(8), v);
}
function decode(buf) {
  if (buf.length === 0) {
    throw new Error("buffer is empty");
  }
  const size2 = 1 << ((buf[0] & 192) >> 6);
  if (buf.length < size2) {
    throw new Error(`buffer too short: need ${size2} bytes, have ${buf.length}`);
  }
  const view = new DataView(buf.buffer, buf.byteOffset, size2);
  const remain = buf.subarray(size2);
  let v;
  if (size2 === 1) {
    v = buf[0] & 63;
  } else if (size2 === 2) {
    v = view.getUint16(0) & 16383;
  } else if (size2 === 4) {
    v = view.getUint32(0) & 1073741823;
  } else if (size2 === 8) {
    v = Number(view.getBigUint64(0) & 0x3fffffffffffffffn);
  } else {
    throw new Error("impossible");
  }
  return [v, remain];
}
var MAX_U6, MAX_U14, MAX_U30, MAX_U53, MAX_U64, MAX_U62;
var init_varint = __esm(() => {
  MAX_U6 = 2 ** 6 - 1;
  MAX_U14 = 2 ** 14 - 1;
  MAX_U30 = 2 ** 30 - 1;
  MAX_U53 = Number.MAX_SAFE_INTEGER;
  MAX_U64 = (1n << 64n) - 1n;
  MAX_U62 = 2n ** 62n - 1n;
});

// node_modules/@moq/net/stream.js
function isLeadingOnes(version) {
  return version !== undefined && version !== Version.DRAFT_14 && version !== Version.DRAFT_15 && version !== Version.DRAFT_16;
}

class Stream {
  reader;
  writer;
  constructor(props) {
    this.writer = props.writer ?? new Writer(props.writable, props.version);
    this.reader = props.reader ?? new Reader(props.readable, undefined, props.version);
  }
  static async accept(quic, version) {
    for (;; ) {
      const reader = quic.incomingBidirectionalStreams.getReader();
      const next = await reader.read();
      reader.releaseLock();
      if (next.done)
        return;
      const { readable, writable } = next.value;
      return new Stream({ readable, writable, version });
    }
  }
  static async open(quic, version, priority) {
    const { readable, writable } = await quic.createBidirectionalStream({ sendOrder: priority });
    return new Stream({ readable, writable, version });
  }
  close() {
    this.writer.close();
    this.reader.stop(new Error("cancel"));
  }
  abort(reason) {
    this.writer.reset(reason);
    this.reader.stop(reason);
  }
}

class Reader {
  #buffer;
  #stream;
  #reader;
  version;
  constructor(stream, buffer, version) {
    this.#buffer = buffer ?? new Uint8Array;
    this.#stream = stream;
    this.#reader = this.#stream?.getReader();
    this.version = version;
  }
  async#fill() {
    if (!this.#reader) {
      return false;
    }
    const result = await this.#reader.read();
    if (result.done) {
      return false;
    }
    if (result.value.byteLength === 0) {
      throw new Error("unexpected empty chunk");
    }
    const buffer = new Uint8Array(result.value);
    if (this.#buffer.byteLength === 0) {
      this.#buffer = buffer;
    } else {
      const temp = new Uint8Array(this.#buffer.byteLength + buffer.byteLength);
      temp.set(this.#buffer);
      temp.set(buffer, this.#buffer.byteLength);
      this.#buffer = temp;
    }
    return true;
  }
  async#fillTo(size2) {
    if (size2 > MAX_READ_SIZE) {
      throw new Error(`read size ${size2} exceeds max size ${MAX_READ_SIZE}`);
    }
    while (this.#buffer.byteLength < size2) {
      if (!await this.#fill()) {
        throw new Error("unexpected end of stream");
      }
    }
  }
  #slice(size2) {
    const result = new Uint8Array(this.#buffer.buffer, this.#buffer.byteOffset, size2);
    this.#buffer = new Uint8Array(this.#buffer.buffer, this.#buffer.byteOffset + size2, this.#buffer.byteLength - size2);
    return result;
  }
  async read(size2) {
    if (size2 === 0)
      return new Uint8Array;
    await this.#fillTo(size2);
    return this.#slice(size2);
  }
  async readAll() {
    while (await this.#fill()) {}
    return this.#slice(this.#buffer.byteLength);
  }
  async string() {
    const length = await this.u53();
    const buffer = await this.read(length);
    return new TextDecoder().decode(buffer);
  }
  async bool() {
    const v = await this.u8();
    if (v === 0)
      return false;
    if (v === 1)
      return true;
    throw new Error("invalid bool value");
  }
  async u8() {
    await this.#fillTo(1);
    return this.#slice(1)[0];
  }
  async u16() {
    await this.#fillTo(2);
    const view = new DataView(this.#buffer.buffer, this.#buffer.byteOffset, 2);
    const result = view.getUint16(0);
    this.#slice(2);
    return result;
  }
  async u53() {
    const v = await this.u62();
    if (v > MAX_U53) {
      console.warn(`value larger than 53-bits; use u62 instead (precision lost): ${v.toString()}`);
    }
    return Number(v);
  }
  async u62() {
    if (isLeadingOnes(this.version)) {
      return this.#readLeadingOnes();
    }
    return this.#readQuicVarint();
  }
  async#readQuicVarint() {
    await this.#fillTo(1);
    const size2 = (this.#buffer[0] & 192) >> 6;
    if (size2 === 0) {
      const first = this.#slice(1)[0];
      return BigInt(first) & 0x3fn;
    }
    if (size2 === 1) {
      await this.#fillTo(2);
      const slice2 = this.#slice(2);
      const view2 = new DataView(slice2.buffer, slice2.byteOffset, slice2.byteLength);
      return BigInt(view2.getUint16(0)) & 0x3fffn;
    }
    if (size2 === 2) {
      await this.#fillTo(4);
      const slice2 = this.#slice(4);
      const view2 = new DataView(slice2.buffer, slice2.byteOffset, slice2.byteLength);
      return BigInt(view2.getUint32(0)) & 0x3fffffffn;
    }
    await this.#fillTo(8);
    const slice = this.#slice(8);
    const view = new DataView(slice.buffer, slice.byteOffset, slice.byteLength);
    return view.getBigUint64(0) & 0x3fffffffffffffffn;
  }
  async#readLeadingOnes() {
    await this.#fillTo(1);
    const b = this.#buffer[0];
    let ones = 0;
    for (let bit = 7;bit >= 0; bit--) {
      if (b & 1 << bit)
        ones++;
      else
        break;
    }
    if (ones === 6 && this.version === Version.DRAFT_17) {
      throw new Error("invalid leading-ones varint: 1111110x prefix is reserved on draft-17");
    }
    let totalSize;
    if (ones <= 5)
      totalSize = ones + 1;
    else if (ones === 6)
      totalSize = 7;
    else if (ones === 7)
      totalSize = 8;
    else
      totalSize = 9;
    await this.#fillTo(totalSize);
    const slice = this.#slice(totalSize);
    const [value] = decodeLeadingOnes(slice);
    return value;
  }
  async done() {
    if (this.#buffer.byteLength > 0)
      return false;
    return !await this.#fill();
  }
  stop(reason) {
    this.#reader?.cancel(reason).catch(() => {
      return;
    });
  }
  get closed() {
    return this.#reader?.closed ?? Promise.resolve();
  }
}

class Writer {
  #writer;
  #stream;
  #scratch;
  version;
  constructor(stream, version) {
    this.#stream = stream;
    this.#scratch = new ArrayBuffer(9);
    this.#writer = this.#stream.getWriter();
    this.version = version;
  }
  async bool(v) {
    await this.write(setUint82(this.#scratch, v ? 1 : 0));
  }
  async u8(v) {
    await this.write(setUint82(this.#scratch, v));
  }
  async u16(v) {
    await this.write(setUint162(this.#scratch, v));
  }
  async i32(v) {
    if (Math.abs(v) > MAX_U31) {
      throw new Error(`overflow, value larger than 32-bits: ${v.toString()}`);
    }
    await this.write(setInt32(this.#scratch, v));
  }
  async u53(v) {
    if (v > MAX_U53) {
      console.warn(`value larger than 53-bits; use u62 instead (precision lost): ${v.toString()}`);
    }
    if (isLeadingOnes(this.version)) {
      await this.write(encodeLeadingOnesTo(this.#scratch, v));
    } else {
      await this.write(encodeTo(this.#scratch, v));
    }
  }
  async u62(v) {
    if (isLeadingOnes(this.version)) {
      await this.write(encodeLeadingOnesTo(this.#scratch, v));
    } else {
      await this.write(encodeTo(this.#scratch, v));
    }
  }
  async write(v) {
    await this.#writer.write(v);
  }
  async string(str) {
    const data = new TextEncoder().encode(str);
    await this.u53(data.byteLength);
    await this.write(data);
  }
  close() {
    this.#writer.close().catch(() => {
      return;
    });
  }
  get closed() {
    return this.#writer.closed;
  }
  reset(reason) {
    this.#writer.abort(reason).catch(() => {
      return;
    });
  }
  static async open(quic, version) {
    const writable = await quic.createUnidirectionalStream();
    return new Writer(writable, version);
  }
}
function setUint82(dst, v) {
  const buffer = new Uint8Array(dst, 0, 1);
  buffer[0] = v;
  return buffer;
}
function setUint162(dst, v) {
  const view = new DataView(dst, 0, 2);
  view.setUint16(0, v);
  return new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
}
function setInt32(dst, v) {
  const view = new DataView(dst, 0, 4);
  view.setInt32(0, v);
  return new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
}

class Readers {
  #reader;
  #version;
  constructor(quic, version) {
    this.#reader = quic.incomingUnidirectionalStreams.getReader();
    this.#version = version;
  }
  async next() {
    const next = await this.#reader.read();
    if (next.done)
      return;
    return new Reader(next.value, undefined, this.#version);
  }
  close() {
    this.#reader.cancel();
  }
}
var MAX_U31, MAX_READ_SIZE;
var init_stream = __esm(() => {
  init_version();
  init_varint();
  MAX_U31 = 2 ** 31 - 1;
  MAX_READ_SIZE = 1024 * 1024 * 64;
});

// node_modules/@moq/net/ietf/namespace.js
async function encode2(w, namespace) {
  if (namespace === "") {
    await w.u53(0);
    return;
  }
  const parts = namespace.split("/");
  await w.u53(parts.length);
  for (const part of parts) {
    await w.string(part);
  }
}
async function decode2(r) {
  const parts = [];
  const count = await r.u53();
  for (let i = 0;i < count; i++) {
    parts.push(await r.string());
  }
  return from(...parts);
}
var init_namespace = () => {};

// node_modules/@moq/net/ietf/message.js
async function encode3(writer, f) {
  let scratch = new Uint8Array;
  const temp = new Writer(new WritableStream({
    write(chunk) {
      const needed = scratch.byteLength + chunk.byteLength;
      if (needed > scratch.buffer.byteLength) {
        const capacity = Math.max(needed, scratch.buffer.byteLength * 2);
        const newBuffer = new ArrayBuffer(capacity);
        const newScratch = new Uint8Array(newBuffer, 0, needed);
        newScratch.set(scratch);
        newScratch.set(chunk, scratch.byteLength);
        scratch = newScratch;
      } else {
        scratch = new Uint8Array(scratch.buffer, 0, needed);
        scratch.set(chunk, needed - chunk.byteLength);
      }
    }
  }), writer.version);
  try {
    await f(temp);
  } finally {
    temp.close();
  }
  await temp.closed;
  if (scratch.byteLength > 65535) {
    throw new Error(`Message too large: ${scratch.byteLength} bytes (max 65535)`);
  }
  await writer.u16(scratch.byteLength);
  await writer.write(scratch);
}
async function decode3(reader, f) {
  const size2 = await reader.u16();
  const data = await reader.read(size2);
  const limit = new Reader(undefined, data, reader.version);
  const msg = await f(limit);
  if (!await limit.done()) {
    throw new Error("Message decoding consumed too few bytes");
  }
  return msg;
}
var init_message = __esm(() => {
  init_stream();
});

// node_modules/@moq/net/ietf/parameters.js
class SetupOptions {
  vars;
  bytes;
  constructor() {
    this.vars = new Map;
    this.bytes = new Map;
  }
  get size() {
    return this.vars.size + this.bytes.size;
  }
  setBytes(id, value) {
    if (id % 2n !== 1n) {
      throw new Error(`invalid parameter id: ${id.toString()}, must be odd`);
    }
    this.bytes.set(id, value);
  }
  setVarint(id, value) {
    if (id % 2n !== 0n) {
      throw new Error(`invalid parameter id: ${id.toString()}, must be even`);
    }
    this.vars.set(id, value);
  }
  getBytes(id) {
    if (id % 2n !== 1n) {
      throw new Error(`invalid parameter id: ${id.toString()}, must be odd`);
    }
    return this.bytes.get(id);
  }
  getVarint(id) {
    if (id % 2n !== 0n) {
      throw new Error(`invalid parameter id: ${id.toString()}, must be even`);
    }
    return this.vars.get(id);
  }
  removeBytes(id) {
    if (id % 2n !== 1n) {
      throw new Error(`invalid parameter id: ${id.toString()}, must be odd`);
    }
    return this.bytes.delete(id);
  }
  removeVarint(id) {
    if (id % 2n !== 0n) {
      throw new Error(`invalid parameter id: ${id.toString()}, must be even`);
    }
    return this.vars.delete(id);
  }
  async encode(w, version) {
    if (version !== Version.DRAFT_14 && version !== Version.DRAFT_15) {
      if (version === Version.DRAFT_16) {
        await w.u53(this.vars.size + this.bytes.size);
      }
      const all = [];
      for (const id of this.vars.keys())
        all.push({ key: id, isVar: true });
      for (const id of this.bytes.keys())
        all.push({ key: id, isVar: false });
      all.sort((a, b) => a.key < b.key ? -1 : a.key > b.key ? 1 : 0);
      let prevId = 0n;
      for (let i = 0;i < all.length; i++) {
        const { key, isVar } = all[i];
        const delta = i === 0 ? key : key - prevId;
        prevId = key;
        await w.u62(delta);
        if (isVar) {
          await w.u62(this.vars.get(key));
        } else {
          const value = this.bytes.get(key);
          await w.u53(value.length);
          await w.write(value);
        }
      }
    } else {
      await w.u53(this.vars.size + this.bytes.size);
      for (const [id, value] of this.vars) {
        await w.u62(id);
        await w.u62(value);
      }
      for (const [id, value] of this.bytes) {
        await w.u62(id);
        await w.u53(value.length);
        await w.write(value);
      }
    }
  }
  static async decode(r, version) {
    const params = new SetupOptions;
    if (version !== Version.DRAFT_14 && version !== Version.DRAFT_15 && version !== Version.DRAFT_16) {
      let prevType = 0n;
      let i = 0;
      while (!await r.done()) {
        const delta = await r.u62();
        const id = i === 0 ? delta : prevType + delta;
        prevType = id;
        i++;
        if (id % 2n === 0n) {
          if (params.vars.has(id)) {
            throw new Error(`duplicate parameter id: ${id.toString()}`);
          }
          const varint = await r.u62();
          params.setVarint(id, varint);
        } else {
          if (params.bytes.has(id)) {
            throw new Error(`duplicate parameter id: ${id.toString()}`);
          }
          const size2 = await r.u53();
          const bytes = await r.read(size2);
          params.setBytes(id, bytes);
        }
      }
    } else {
      const count = await r.u53();
      let prevType = 0n;
      for (let i = 0;i < count; i++) {
        let id;
        if (version === Version.DRAFT_16) {
          const delta = await r.u62();
          id = i === 0 ? delta : prevType + delta;
          prevType = id;
        } else {
          id = await r.u62();
        }
        if (id % 2n === 0n) {
          if (params.vars.has(id)) {
            throw new Error(`duplicate parameter id: ${id.toString()}`);
          }
          const varint = await r.u62();
          params.setVarint(id, varint);
        } else {
          if (params.bytes.has(id)) {
            throw new Error(`duplicate parameter id: ${id.toString()}`);
          }
          const size2 = await r.u53();
          const bytes = await r.read(size2);
          params.setBytes(id, bytes);
        }
      }
    }
    return params;
  }
}

class Parameters {
  vars;
  bytes;
  constructor() {
    this.vars = new Map;
    this.bytes = new Map;
  }
  get subscriberPriority() {
    const v = this.vars.get(MSG_PARAM_SUBSCRIBER_PRIORITY);
    return v !== undefined ? Number(v) : undefined;
  }
  set subscriberPriority(v) {
    this.vars.set(MSG_PARAM_SUBSCRIBER_PRIORITY, BigInt(v));
  }
  get groupOrder() {
    const v = this.vars.get(MSG_PARAM_GROUP_ORDER);
    return v !== undefined ? Number(v) : undefined;
  }
  set groupOrder(v) {
    this.vars.set(MSG_PARAM_GROUP_ORDER, BigInt(v));
  }
  get forward() {
    const v = this.vars.get(MSG_PARAM_FORWARD);
    return v !== undefined ? v !== 0n : undefined;
  }
  set forward(v) {
    this.vars.set(MSG_PARAM_FORWARD, v ? 1n : 0n);
  }
  get publisherPriority() {
    const v = this.vars.get(MSG_PARAM_PUBLISHER_PRIORITY);
    return v !== undefined ? Number(v) : undefined;
  }
  set publisherPriority(v) {
    this.vars.set(MSG_PARAM_PUBLISHER_PRIORITY, BigInt(v));
  }
  get expires() {
    return this.vars.get(MSG_PARAM_EXPIRES);
  }
  set expires(v) {
    this.vars.set(MSG_PARAM_EXPIRES, v);
  }
  get deliveryTimeout() {
    return this.vars.get(MSG_PARAM_DELIVERY_TIMEOUT);
  }
  set deliveryTimeout(v) {
    this.vars.set(MSG_PARAM_DELIVERY_TIMEOUT, v);
  }
  get maxCacheDuration() {
    return this.vars.get(MSG_PARAM_MAX_CACHE_DURATION);
  }
  set maxCacheDuration(v) {
    this.vars.set(MSG_PARAM_MAX_CACHE_DURATION, v);
  }
  get largest() {
    const data = this.bytes.get(MSG_PARAM_LARGEST_OBJECT);
    if (!data || data.length === 0)
      return;
    const [groupId, rest] = decode(data);
    const [objectId] = decode(rest);
    return { groupId: BigInt(groupId), objectId: BigInt(objectId) };
  }
  set largest(v) {
    const buf1 = encode(Number(v.groupId));
    const buf2 = encode(Number(v.objectId));
    const combined = new Uint8Array(buf1.length + buf2.length);
    combined.set(buf1, 0);
    combined.set(buf2, buf1.length);
    this.bytes.set(MSG_PARAM_LARGEST_OBJECT, combined);
  }
  get subscriptionFilter() {
    const data = this.bytes.get(MSG_PARAM_SUBSCRIPTION_FILTER);
    if (!data || data.length === 0)
      return;
    return data[0];
  }
  set subscriptionFilter(v) {
    this.bytes.set(MSG_PARAM_SUBSCRIPTION_FILTER, new Uint8Array([v]));
  }
  async encode(w, version) {
    await w.u53(this.vars.size + this.bytes.size);
    if (version === Version.DRAFT_14 || version === Version.DRAFT_15) {
      for (const [id, value] of this.vars) {
        await w.u62(id);
        await w.u62(value);
      }
      for (const [id, value] of this.bytes) {
        await w.u62(id);
        await w.u53(value.length);
        await w.write(value);
      }
    } else {
      const all = [];
      for (const id of this.vars.keys())
        all.push({ key: id, isVar: true });
      for (const id of this.bytes.keys())
        all.push({ key: id, isVar: false });
      all.sort((a, b) => a.key < b.key ? -1 : a.key > b.key ? 1 : 0);
      let prevId = 0n;
      for (let i = 0;i < all.length; i++) {
        const { key, isVar } = all[i];
        const delta = i === 0 ? key : key - prevId;
        prevId = key;
        await w.u62(delta);
        if (isVar) {
          await w.u62(this.vars.get(key));
        } else {
          const value = this.bytes.get(key);
          await w.u53(value.length);
          await w.write(value);
        }
      }
    }
  }
  static async decode(r, version) {
    const count = await r.u53();
    const params = new Parameters;
    let prevType = 0n;
    for (let i = 0;i < count; i++) {
      let id;
      if (version === Version.DRAFT_14 || version === Version.DRAFT_15) {
        id = await r.u62();
      } else {
        const delta = await r.u62();
        id = i === 0 ? delta : prevType + delta;
        prevType = id;
      }
      if (id % 2n === 0n) {
        if (params.vars.has(id)) {
          throw new Error(`duplicate message parameter id: ${id.toString()}`);
        }
        const varint = await r.u62();
        params.vars.set(id, varint);
      } else {
        if (params.bytes.has(id)) {
          throw new Error(`duplicate message parameter id: ${id.toString()}`);
        }
        const size2 = await r.u53();
        const bytes = await r.read(size2);
        params.bytes.set(id, bytes);
      }
    }
    return params;
  }
}
var SetupOption, MSG_PARAM_DELIVERY_TIMEOUT = 0x02n, MSG_PARAM_MAX_CACHE_DURATION = 0x04n, MSG_PARAM_EXPIRES = 0x08n, MSG_PARAM_PUBLISHER_PRIORITY = 0x0en, MSG_PARAM_FORWARD = 0x10n, MSG_PARAM_SUBSCRIBER_PRIORITY = 0x20n, MSG_PARAM_GROUP_ORDER = 0x22n, MSG_PARAM_LARGEST_OBJECT = 0x09n, MSG_PARAM_SUBSCRIPTION_FILTER = 0x21n;
var init_parameters = __esm(() => {
  init_varint();
  init_version();
  SetupOption = {
    Path: 1n,
    MaxRequestId: 2n,
    AuthorizationToken: 3n,
    MaxAuthTokenCacheSize: 4n,
    Authority: 5n,
    Implementation: 7n
  };
});

// node_modules/@moq/net/ietf/properties.js
async function skip(r, version) {
  if (version === Version.DRAFT_14 || version === Version.DRAFT_15 || version === Version.DRAFT_16) {
    return;
  }
  let prevType = 0n;
  let i = 0;
  while (!await r.done()) {
    const delta = await r.u62();
    const abs = i === 0 ? delta : prevType + delta;
    prevType = abs;
    i++;
    if (abs % 2n === 0n) {
      await r.u62();
    } else {
      const len = await r.u53();
      await r.read(len);
    }
  }
}
var init_properties = __esm(() => {
  init_version();
});

// node_modules/@moq/net/ietf/publish_namespace.js
var exports_publish_namespace = {};
__export(exports_publish_namespace, {
  PublishNamespaceOk: () => PublishNamespaceOk,
  PublishNamespaceError: () => PublishNamespaceError,
  PublishNamespaceDone: () => PublishNamespaceDone,
  PublishNamespaceCancel: () => PublishNamespaceCancel,
  PublishNamespace: () => PublishNamespace
});

class PublishNamespace {
  static id = 6;
  requestId;
  trackNamespace;
  constructor({ requestId, trackNamespace }) {
    this.requestId = requestId;
    this.trackNamespace = trackNamespace;
  }
  async#encode(w, version) {
    await w.u62(this.requestId);
    if (version === Version.DRAFT_17) {
      await w.u62(0n);
    }
    await encode2(w, this.trackNamespace);
    await new Parameters().encode(w, version);
  }
  async encode(w, version) {
    return encode3(w, (wr) => this.#encode(wr, version));
  }
  static async decode(r, version) {
    return decode3(r, (rd) => PublishNamespace.#decode(rd, version));
  }
  static async#decode(r, version) {
    const requestId = await r.u62();
    if (version === Version.DRAFT_17) {
      await r.u62();
    }
    const trackNamespace = await decode2(r);
    await Parameters.decode(r, version);
    return new PublishNamespace({ requestId, trackNamespace });
  }
}

class PublishNamespaceOk {
  static id = 7;
  requestId;
  constructor({ requestId }) {
    this.requestId = requestId;
  }
  async#encode(w) {
    await w.u62(this.requestId);
  }
  async encode(w, _version) {
    return encode3(w, this.#encode.bind(this));
  }
  static async decode(r, _version) {
    return decode3(r, PublishNamespaceOk.#decode);
  }
  static async#decode(r) {
    const requestId = await r.u62();
    return new PublishNamespaceOk({ requestId });
  }
}

class PublishNamespaceError {
  static id = 8;
  requestId;
  errorCode;
  reasonPhrase;
  constructor({ requestId, errorCode, reasonPhrase }) {
    this.requestId = requestId;
    this.errorCode = errorCode;
    this.reasonPhrase = reasonPhrase;
  }
  async#encode(w) {
    await w.u62(this.requestId);
    await w.u62(BigInt(this.errorCode));
    await w.string(this.reasonPhrase);
  }
  async encode(w, _version) {
    return encode3(w, this.#encode.bind(this));
  }
  static async decode(r, _version) {
    return decode3(r, PublishNamespaceError.#decode);
  }
  static async#decode(r) {
    const requestId = await r.u62();
    const errorCode = Number(await r.u62());
    const reasonPhrase = await r.string();
    return new PublishNamespaceError({ requestId, errorCode, reasonPhrase });
  }
}

class PublishNamespaceCancel {
  static id = 12;
  trackNamespace;
  requestId;
  errorCode;
  reasonPhrase;
  constructor({ trackNamespace = "", errorCode = 0, reasonPhrase = "", requestId = 0n } = {}) {
    this.trackNamespace = trackNamespace;
    this.requestId = requestId;
    this.errorCode = errorCode;
    this.reasonPhrase = reasonPhrase;
  }
  async#encode(w, version) {
    if (version !== Version.DRAFT_14 && version !== Version.DRAFT_15 && version !== Version.DRAFT_16) {
      throw new Error("PublishNamespaceCancel removed in draft-17+");
    }
    if (version === Version.DRAFT_16) {
      await w.u62(this.requestId);
    } else {
      await encode2(w, this.trackNamespace);
    }
    await w.u62(BigInt(this.errorCode));
    await w.string(this.reasonPhrase);
  }
  async encode(w, version) {
    return encode3(w, (wr) => this.#encode(wr, version));
  }
  static async decode(r, version) {
    return decode3(r, (rd) => PublishNamespaceCancel.#decode(rd, version));
  }
  static async#decode(r, version) {
    if (version !== Version.DRAFT_14 && version !== Version.DRAFT_15 && version !== Version.DRAFT_16) {
      throw new Error("PublishNamespaceCancel removed in draft-17+");
    }
    let trackNamespace = "";
    let requestId = 0n;
    if (version === Version.DRAFT_16) {
      requestId = await r.u62();
    } else {
      trackNamespace = await decode2(r);
    }
    const errorCode = Number(await r.u62());
    const reasonPhrase = await r.string();
    return new PublishNamespaceCancel({ trackNamespace, errorCode, reasonPhrase, requestId });
  }
}

class PublishNamespaceDone {
  static id = 9;
  trackNamespace;
  requestId;
  constructor({ trackNamespace = "", requestId = 0n } = {}) {
    this.trackNamespace = trackNamespace;
    this.requestId = requestId;
  }
  async#encode(w, version) {
    if (version !== Version.DRAFT_14 && version !== Version.DRAFT_15 && version !== Version.DRAFT_16) {
      throw new Error("PublishNamespaceDone removed in draft-17+");
    }
    if (version === Version.DRAFT_16) {
      await w.u62(this.requestId);
    } else {
      await encode2(w, this.trackNamespace);
    }
  }
  async encode(w, version) {
    return encode3(w, (wr) => this.#encode(wr, version));
  }
  static async decode(r, version) {
    return decode3(r, (rd) => PublishNamespaceDone.#decode(rd, version));
  }
  static async#decode(r, version) {
    if (version !== Version.DRAFT_14 && version !== Version.DRAFT_15 && version !== Version.DRAFT_16) {
      throw new Error("PublishNamespaceDone removed in draft-17+");
    }
    if (version === Version.DRAFT_16) {
      const requestId = await r.u62();
      return new PublishNamespaceDone({ requestId });
    }
    const trackNamespace = await decode2(r);
    return new PublishNamespaceDone({ trackNamespace });
  }
}
var init_publish_namespace = __esm(() => {
  init_message();
  init_namespace();
  init_parameters();
  init_version();
});

// node_modules/@moq/net/ietf/subscribe.js
var exports_subscribe = {};
__export(exports_subscribe, {
  Unsubscribe: () => Unsubscribe,
  SubscribeUpdate: () => SubscribeUpdate,
  SubscribeOk: () => SubscribeOk,
  SubscribeError: () => SubscribeError,
  Subscribe: () => Subscribe
});

class Subscribe {
  static id = 3;
  requestId;
  trackNamespace;
  trackName;
  subscriberPriority;
  constructor({ requestId, trackNamespace, trackName, subscriberPriority }) {
    this.requestId = requestId;
    this.trackNamespace = trackNamespace;
    this.trackName = trackName;
    this.subscriberPriority = subscriberPriority;
  }
  async#encode(w, version) {
    await w.u62(this.requestId);
    if (version === Version.DRAFT_17) {
      await w.u62(0n);
    }
    await encode2(w, this.trackNamespace);
    await w.string(this.trackName);
    if (version === Version.DRAFT_14) {
      await w.u8(this.subscriberPriority);
      await w.u8(GROUP_ORDER);
      await w.bool(true);
      await w.u53(2);
      await w.u53(0);
    } else {
      const params = new Parameters;
      params.subscriberPriority = this.subscriberPriority;
      params.groupOrder = GROUP_ORDER;
      params.forward = true;
      params.subscriptionFilter = 2;
      await params.encode(w, version);
    }
  }
  async encode(w, version) {
    return encode3(w, (mw) => this.#encode(mw, version));
  }
  static async decode(r, version) {
    return decode3(r, (mr) => Subscribe.#decode(mr, version));
  }
  static async#decode(r, version) {
    const requestId = await r.u62();
    if (version === Version.DRAFT_17) {
      await r.u62();
    }
    const trackNamespace = await decode2(r);
    const trackName = await r.string();
    if (version === Version.DRAFT_14) {
      const subscriberPriority2 = await r.u8();
      let groupOrder2 = await r.u8();
      if (groupOrder2 > 2) {
        throw new Error(`unknown group order: ${groupOrder2}`);
      }
      if (groupOrder2 === 0) {
        groupOrder2 = GROUP_ORDER;
      }
      const forward2 = await r.bool();
      if (!forward2) {
        throw new Error(`unsupported forward value: ${forward2}`);
      }
      const filterType2 = await r.u53();
      if (filterType2 !== 1 && filterType2 !== 2) {
        throw new Error(`unsupported filter type: ${filterType2}`);
      }
      await Parameters.decode(r, version);
      return new Subscribe({ requestId, trackNamespace, trackName, subscriberPriority: subscriberPriority2 });
    }
    const params = await Parameters.decode(r, version);
    const subscriberPriority = params.subscriberPriority ?? 128;
    let groupOrder = params.groupOrder ?? GROUP_ORDER;
    if (groupOrder > 2) {
      throw new Error(`unknown group order: ${groupOrder}`);
    }
    if (groupOrder === 0) {
      groupOrder = GROUP_ORDER;
    }
    const forward = params.forward ?? true;
    if (!forward) {
      throw new Error(`unsupported forward value: ${forward}`);
    }
    const filterType = params.subscriptionFilter ?? 2;
    if (filterType !== 1 && filterType !== 2) {
      throw new Error(`unsupported filter type: ${filterType}`);
    }
    return new Subscribe({ requestId, trackNamespace, trackName, subscriberPriority });
  }
}

class SubscribeOk {
  static id = 4;
  requestId;
  trackAlias;
  constructor({ requestId, trackAlias }) {
    this.requestId = requestId;
    this.trackAlias = trackAlias;
  }
  async#encode(w, version) {
    if (version === Version.DRAFT_14 || version === Version.DRAFT_15 || version === Version.DRAFT_16) {
      if (this.requestId === undefined)
        throw new Error("requestId required for draft14-16");
      await w.u62(this.requestId);
    }
    await w.u62(this.trackAlias);
    if (version === Version.DRAFT_14) {
      await w.u62(0n);
      await w.u8(GROUP_ORDER);
      await w.bool(false);
      await w.u53(0);
    } else {
      const params = new Parameters;
      params.groupOrder = GROUP_ORDER;
      await params.encode(w, version);
    }
  }
  async encode(w, version) {
    return encode3(w, (mw) => this.#encode(mw, version));
  }
  static async decode(r, version) {
    return decode3(r, (mr) => SubscribeOk.#decode(mr, version));
  }
  static async#decode(r, version) {
    const requestId = version === Version.DRAFT_14 || version === Version.DRAFT_15 || version === Version.DRAFT_16 ? await r.u62() : undefined;
    const trackAlias = await r.u62();
    if (version === Version.DRAFT_14) {
      const expires = await r.u62();
      if (expires !== BigInt(0)) {
        throw new Error(`unsupported expires: ${expires}`);
      }
      await r.u8();
      const contentExists = await r.bool();
      if (contentExists) {
        await r.u62();
        await r.u62();
      }
      await Parameters.decode(r, version);
    } else {
      await Parameters.decode(r, version);
      await skip(r, version);
    }
    return new SubscribeOk({ requestId, trackAlias });
  }
}

class SubscribeError {
  static id = 5;
  requestId;
  errorCode;
  reasonPhrase;
  constructor({ requestId, errorCode, reasonPhrase }) {
    this.requestId = requestId;
    this.errorCode = errorCode;
    this.reasonPhrase = reasonPhrase;
  }
  async#encode(w) {
    await w.u62(this.requestId);
    await w.u62(BigInt(this.errorCode));
    await w.string(this.reasonPhrase);
  }
  async encode(w, _version) {
    return encode3(w, this.#encode.bind(this));
  }
  static async decode(r, _version) {
    return decode3(r, SubscribeError.#decode);
  }
  static async#decode(r) {
    const requestId = await r.u62();
    const errorCode = Number(await r.u62());
    const reasonPhrase = await r.string();
    return new SubscribeError({ requestId, errorCode, reasonPhrase });
  }
}

class SubscribeUpdate {
  static id = 2;
  requestId;
  constructor({ requestId }) {
    this.requestId = requestId;
  }
  async#encode(w, version) {
    if (version === Version.DRAFT_14) {
      await w.u62(this.requestId);
      await w.u62(0n);
      await w.u62(0n);
      await w.u62(0n);
      await w.u62(0n);
      await w.u8(128);
      await w.bool(true);
      await w.u53(0);
    } else if (version === Version.DRAFT_15 || version === Version.DRAFT_16) {
      await w.u62(this.requestId);
      await w.u62(0n);
      const params = new Parameters;
      await params.encode(w, version);
    } else {
      await w.u62(this.requestId);
      if (version === Version.DRAFT_17) {
        await w.u62(0n);
      }
      const params = new Parameters;
      await params.encode(w, version);
    }
  }
  async encode(w, version) {
    return encode3(w, (mw) => this.#encode(mw, version));
  }
  static async decode(r, version) {
    return decode3(r, (mr) => SubscribeUpdate.#decode(mr, version));
  }
  static async#decode(r, version) {
    if (version === Version.DRAFT_14) {
      const requestId = await r.u62();
      await r.u62();
      await r.u62();
      await r.u62();
      await r.u62();
      await r.u8();
      await r.bool();
      await Parameters.decode(r, version);
      return new SubscribeUpdate({ requestId });
    } else if (version === Version.DRAFT_15 || version === Version.DRAFT_16) {
      const requestId = await r.u62();
      await r.u62();
      await Parameters.decode(r, version);
      return new SubscribeUpdate({ requestId });
    } else {
      const requestId = await r.u62();
      if (version === Version.DRAFT_17) {
        await r.u62();
      }
      await Parameters.decode(r, version);
      return new SubscribeUpdate({ requestId });
    }
  }
}

class Unsubscribe {
  static id = 10;
  requestId;
  constructor({ requestId }) {
    this.requestId = requestId;
  }
  async#encode(w) {
    await w.u62(this.requestId);
  }
  async encode(w, _version) {
    return encode3(w, this.#encode.bind(this));
  }
  static async decode(r, _version) {
    return decode3(r, Unsubscribe.#decode);
  }
  static async#decode(r) {
    const requestId = await r.u62();
    return new Unsubscribe({ requestId });
  }
}
var GROUP_ORDER = 2;
var init_subscribe = __esm(() => {
  init_message();
  init_namespace();
  init_parameters();
  init_properties();
  init_version();
});

// node_modules/@libav.js/variant-opus-af/dist/libav-opus-af.mjs
var exports_libav_opus_af = {};
__export(exports_libav_opus_af, {
  target: () => target,
  isWebAssemblySupported: () => isWebAssemblySupported,
  isThreadingSupported: () => isThreadingSupported,
  i64tof64: () => i64tof64,
  i64ToBigInt: () => i64ToBigInt,
  ff_channels: () => ff_channels,
  ff_channel_layout: () => ff_channel_layout,
  factories: () => factories,
  f64toi64: () => f64toi64,
  default: () => libav_opus_af_default,
  bigIntToi64: () => bigIntToi64,
  base: () => base,
  VER: () => VER,
  LibAV: () => LibAV2,
  EPERM: () => EPERM,
  ENOENT: () => ENOENT,
  ENODEV: () => ENODEV,
  ENOBUFS: () => ENOBUFS,
  ENFILE: () => ENFILE,
  ENETUNREACH: () => ENETUNREACH,
  ENETRESET: () => ENETRESET,
  ENETDOWN: () => ENETDOWN,
  ENAMETOOLONG: () => ENAMETOOLONG,
  EMULTIHOP: () => EMULTIHOP,
  EMSGSIZE: () => EMSGSIZE,
  EMLINK: () => EMLINK,
  EMFILE: () => EMFILE,
  ELOOP: () => ELOOP,
  EISDIR: () => EISDIR,
  EISCONN: () => EISCONN,
  EIO: () => EIO,
  EINVAL: () => EINVAL,
  EINTR: () => EINTR,
  EINPROGRESS: () => EINPROGRESS,
  EILSEQ: () => EILSEQ,
  EIDRM: () => EIDRM,
  EHOSTUNREACH: () => EHOSTUNREACH,
  EFBIG: () => EFBIG,
  EFAULT: () => EFAULT,
  EEXIST: () => EEXIST,
  EDQUOT: () => EDQUOT,
  EDOM: () => EDOM,
  EDESTADDRREQ: () => EDESTADDRREQ,
  EDEADLOCK: () => EDEADLOCK,
  ECONNRESET: () => ECONNRESET,
  ECONNREFUSED: () => ECONNREFUSED,
  ECONNABORTED: () => ECONNABORTED,
  ECHILD: () => ECHILD,
  ECANCELED: () => ECANCELED,
  EBUSY: () => EBUSY,
  EBADMSG: () => EBADMSG,
  EBADF: () => EBADF,
  EALREADY: () => EALREADY,
  EAGAIN: () => EAGAIN,
  EAFNOSUPPORT: () => EAFNOSUPPORT,
  EADDRNOTAVAIL: () => EADDRNOTAVAIL,
  EADDRINUSE: () => EADDRINUSE,
  E2BIG: () => E2BIG,
  DBG: () => DBG,
  CONFIG: () => CONFIG,
  AV_VERSION_INT: () => AV_VERSION_INT,
  AV_TIME_BASE: () => AV_TIME_BASE,
  AV_SAMPLE_FMT_U8P: () => AV_SAMPLE_FMT_U8P,
  AV_SAMPLE_FMT_U8: () => AV_SAMPLE_FMT_U8,
  AV_SAMPLE_FMT_S64P: () => AV_SAMPLE_FMT_S64P,
  AV_SAMPLE_FMT_S64: () => AV_SAMPLE_FMT_S64,
  AV_SAMPLE_FMT_S32P: () => AV_SAMPLE_FMT_S32P,
  AV_SAMPLE_FMT_S32: () => AV_SAMPLE_FMT_S32,
  AV_SAMPLE_FMT_S16P: () => AV_SAMPLE_FMT_S16P,
  AV_SAMPLE_FMT_S16: () => AV_SAMPLE_FMT_S16,
  AV_SAMPLE_FMT_NONE: () => AV_SAMPLE_FMT_NONE,
  AV_SAMPLE_FMT_NB: () => AV_SAMPLE_FMT_NB,
  AV_SAMPLE_FMT_FLTP: () => AV_SAMPLE_FMT_FLTP,
  AV_SAMPLE_FMT_FLT: () => AV_SAMPLE_FMT_FLT,
  AV_SAMPLE_FMT_DBLP: () => AV_SAMPLE_FMT_DBLP,
  AV_SAMPLE_FMT_DBL: () => AV_SAMPLE_FMT_DBL,
  AV_PKT_FLAG_TRUSTED: () => AV_PKT_FLAG_TRUSTED,
  AV_PKT_FLAG_KEY: () => AV_PKT_FLAG_KEY,
  AV_PKT_FLAG_DISPOSABLE: () => AV_PKT_FLAG_DISPOSABLE,
  AV_PKT_FLAG_DISCARD: () => AV_PKT_FLAG_DISCARD,
  AV_PKT_FLAG_CORRUPT: () => AV_PKT_FLAG_CORRUPT,
  AV_PIX_FMT_YUYV422: () => AV_PIX_FMT_YUYV422,
  AV_PIX_FMT_YUVJ444P: () => AV_PIX_FMT_YUVJ444P,
  AV_PIX_FMT_YUVJ440P: () => AV_PIX_FMT_YUVJ440P,
  AV_PIX_FMT_YUVJ422P: () => AV_PIX_FMT_YUVJ422P,
  AV_PIX_FMT_YUVJ420P: () => AV_PIX_FMT_YUVJ420P,
  AV_PIX_FMT_YUVA420P: () => AV_PIX_FMT_YUVA420P,
  AV_PIX_FMT_YUV444P: () => AV_PIX_FMT_YUV444P,
  AV_PIX_FMT_YUV440P: () => AV_PIX_FMT_YUV440P,
  AV_PIX_FMT_YUV422P: () => AV_PIX_FMT_YUV422P,
  AV_PIX_FMT_YUV420P: () => AV_PIX_FMT_YUV420P,
  AV_PIX_FMT_YUV411P: () => AV_PIX_FMT_YUV411P,
  AV_PIX_FMT_YUV410P: () => AV_PIX_FMT_YUV410P,
  AV_PIX_FMT_UYYVYY411: () => AV_PIX_FMT_UYYVYY411,
  AV_PIX_FMT_UYVY422: () => AV_PIX_FMT_UYVY422,
  AV_PIX_FMT_RGBA: () => AV_PIX_FMT_RGBA,
  AV_PIX_FMT_RGB8: () => AV_PIX_FMT_RGB8,
  AV_PIX_FMT_RGB565LE: () => AV_PIX_FMT_RGB565LE,
  AV_PIX_FMT_RGB565BE: () => AV_PIX_FMT_RGB565BE,
  AV_PIX_FMT_RGB555LE: () => AV_PIX_FMT_RGB555LE,
  AV_PIX_FMT_RGB555BE: () => AV_PIX_FMT_RGB555BE,
  AV_PIX_FMT_RGB4_BYTE: () => AV_PIX_FMT_RGB4_BYTE,
  AV_PIX_FMT_RGB48LE: () => AV_PIX_FMT_RGB48LE,
  AV_PIX_FMT_RGB48BE: () => AV_PIX_FMT_RGB48BE,
  AV_PIX_FMT_RGB4: () => AV_PIX_FMT_RGB4,
  AV_PIX_FMT_RGB24: () => AV_PIX_FMT_RGB24,
  AV_PIX_FMT_PAL8: () => AV_PIX_FMT_PAL8,
  AV_PIX_FMT_NV21: () => AV_PIX_FMT_NV21,
  AV_PIX_FMT_NV12: () => AV_PIX_FMT_NV12,
  AV_PIX_FMT_NONE: () => AV_PIX_FMT_NONE,
  AV_PIX_FMT_MONOWHITE: () => AV_PIX_FMT_MONOWHITE,
  AV_PIX_FMT_MONOBLACK: () => AV_PIX_FMT_MONOBLACK,
  AV_PIX_FMT_GRAY8: () => AV_PIX_FMT_GRAY8,
  AV_PIX_FMT_GRAY16LE: () => AV_PIX_FMT_GRAY16LE,
  AV_PIX_FMT_GRAY16BE: () => AV_PIX_FMT_GRAY16BE,
  AV_PIX_FMT_BGRA: () => AV_PIX_FMT_BGRA,
  AV_PIX_FMT_BGR8: () => AV_PIX_FMT_BGR8,
  AV_PIX_FMT_BGR565LE: () => AV_PIX_FMT_BGR565LE,
  AV_PIX_FMT_BGR565BE: () => AV_PIX_FMT_BGR565BE,
  AV_PIX_FMT_BGR555LE: () => AV_PIX_FMT_BGR555LE,
  AV_PIX_FMT_BGR555BE: () => AV_PIX_FMT_BGR555BE,
  AV_PIX_FMT_BGR4_BYTE: () => AV_PIX_FMT_BGR4_BYTE,
  AV_PIX_FMT_BGR4: () => AV_PIX_FMT_BGR4,
  AV_PIX_FMT_BGR24: () => AV_PIX_FMT_BGR24,
  AV_PIX_FMT_ARGB: () => AV_PIX_FMT_ARGB,
  AV_PIX_FMT_ABGR: () => AV_PIX_FMT_ABGR,
  AV_OPT_SEARCH_CHILDREN: () => AV_OPT_SEARCH_CHILDREN,
  AV_NOPTS_VALUE_LO: () => AV_NOPTS_VALUE_LO,
  AV_NOPTS_VALUE_I64: () => AV_NOPTS_VALUE_I64,
  AV_NOPTS_VALUE_HI: () => AV_NOPTS_VALUE_HI,
  AV_NOPTS_VALUE: () => AV_NOPTS_VALUE,
  AV_LOG_WARNING: () => AV_LOG_WARNING,
  AV_LOG_VERBOSE: () => AV_LOG_VERBOSE,
  AV_LOG_TRACE: () => AV_LOG_TRACE,
  AV_LOG_QUIET: () => AV_LOG_QUIET,
  AV_LOG_PANIC: () => AV_LOG_PANIC,
  AV_LOG_INFO: () => AV_LOG_INFO,
  AV_LOG_FATAL: () => AV_LOG_FATAL,
  AV_LOG_ERROR: () => AV_LOG_ERROR,
  AV_LOG_DEBUG: () => AV_LOG_DEBUG,
  AVSEEK_FLAG_FRAME: () => AVSEEK_FLAG_FRAME,
  AVSEEK_FLAG_BYTE: () => AVSEEK_FLAG_BYTE,
  AVSEEK_FLAG_BACKWARD: () => AVSEEK_FLAG_BACKWARD,
  AVSEEK_FLAG_ANY: () => AVSEEK_FLAG_ANY,
  AVMEDIA_TYPE_VIDEO: () => AVMEDIA_TYPE_VIDEO,
  AVMEDIA_TYPE_UNKNOWN: () => AVMEDIA_TYPE_UNKNOWN,
  AVMEDIA_TYPE_SUBTITLE: () => AVMEDIA_TYPE_SUBTITLE,
  AVMEDIA_TYPE_DATA: () => AVMEDIA_TYPE_DATA,
  AVMEDIA_TYPE_AUDIO: () => AVMEDIA_TYPE_AUDIO,
  AVMEDIA_TYPE_ATTACHMENT: () => AVMEDIA_TYPE_ATTACHMENT,
  AVIO_FLAG_WRITE: () => AVIO_FLAG_WRITE,
  AVIO_FLAG_READ_WRITE: () => AVIO_FLAG_READ_WRITE,
  AVIO_FLAG_READ: () => AVIO_FLAG_READ,
  AVIO_FLAG_NONBLOCK: () => AVIO_FLAG_NONBLOCK,
  AVIO_FLAG_DIRECT: () => AVIO_FLAG_DIRECT,
  AVFMT_FLAG_NOBUFFER: () => AVFMT_FLAG_NOBUFFER,
  AVFMT_FLAG_FLUSH_PACKETS: () => AVFMT_FLAG_FLUSH_PACKETS,
  AVERROR_EOF: () => AVERROR_EOF,
  AVDISCARD_NONREF: () => AVDISCARD_NONREF,
  AVDISCARD_NONKEY: () => AVDISCARD_NONKEY,
  AVDISCARD_NONINTRA: () => AVDISCARD_NONINTRA,
  AVDISCARD_NONE: () => AVDISCARD_NONE,
  AVDISCARD_DEFAULT: () => AVDISCARD_DEFAULT,
  AVDISCARD_BIDIR: () => AVDISCARD_BIDIR,
  AVDISCARD_ALL: () => AVDISCARD_ALL
});
var libav, base, isWebAssemblySupported, isThreadingSupported, target, VER, CONFIG, DBG, factories, i64tof64, f64toi64, i64ToBigInt, bigIntToi64, ff_channel_layout, ff_channels, AV_VERSION_INT, AV_TIME_BASE, AV_NOPTS_VALUE_I64, AV_NOPTS_VALUE_LO, AV_NOPTS_VALUE_HI, AV_NOPTS_VALUE, AV_OPT_SEARCH_CHILDREN, AVMEDIA_TYPE_UNKNOWN, AVMEDIA_TYPE_VIDEO, AVMEDIA_TYPE_AUDIO, AVMEDIA_TYPE_DATA, AVMEDIA_TYPE_SUBTITLE, AVMEDIA_TYPE_ATTACHMENT, AV_SAMPLE_FMT_NONE, AV_SAMPLE_FMT_U8, AV_SAMPLE_FMT_S16, AV_SAMPLE_FMT_S32, AV_SAMPLE_FMT_FLT, AV_SAMPLE_FMT_DBL, AV_SAMPLE_FMT_U8P, AV_SAMPLE_FMT_S16P, AV_SAMPLE_FMT_S32P, AV_SAMPLE_FMT_FLTP, AV_SAMPLE_FMT_DBLP, AV_SAMPLE_FMT_S64, AV_SAMPLE_FMT_S64P, AV_SAMPLE_FMT_NB, AV_PIX_FMT_NONE, AV_PIX_FMT_YUV420P, AV_PIX_FMT_YUYV422, AV_PIX_FMT_RGB24, AV_PIX_FMT_BGR24, AV_PIX_FMT_YUV422P, AV_PIX_FMT_YUV444P, AV_PIX_FMT_YUV410P, AV_PIX_FMT_YUV411P, AV_PIX_FMT_GRAY8, AV_PIX_FMT_MONOWHITE, AV_PIX_FMT_MONOBLACK, AV_PIX_FMT_PAL8, AV_PIX_FMT_YUVJ420P, AV_PIX_FMT_YUVJ422P, AV_PIX_FMT_YUVJ444P, AV_PIX_FMT_UYVY422, AV_PIX_FMT_UYYVYY411, AV_PIX_FMT_BGR8, AV_PIX_FMT_BGR4, AV_PIX_FMT_BGR4_BYTE, AV_PIX_FMT_RGB8, AV_PIX_FMT_RGB4, AV_PIX_FMT_RGB4_BYTE, AV_PIX_FMT_NV12, AV_PIX_FMT_NV21, AV_PIX_FMT_ARGB, AV_PIX_FMT_RGBA, AV_PIX_FMT_ABGR, AV_PIX_FMT_BGRA, AV_PIX_FMT_GRAY16BE, AV_PIX_FMT_GRAY16LE, AV_PIX_FMT_YUV440P, AV_PIX_FMT_YUVJ440P, AV_PIX_FMT_YUVA420P, AV_PIX_FMT_RGB48BE, AV_PIX_FMT_RGB48LE, AV_PIX_FMT_RGB565BE, AV_PIX_FMT_RGB565LE, AV_PIX_FMT_RGB555BE, AV_PIX_FMT_RGB555LE, AV_PIX_FMT_BGR565BE, AV_PIX_FMT_BGR565LE, AV_PIX_FMT_BGR555BE, AV_PIX_FMT_BGR555LE, AVIO_FLAG_READ, AVIO_FLAG_WRITE, AVIO_FLAG_READ_WRITE, AVIO_FLAG_NONBLOCK, AVIO_FLAG_DIRECT, AVFMT_FLAG_NOBUFFER, AVFMT_FLAG_FLUSH_PACKETS, AVSEEK_FLAG_BACKWARD, AVSEEK_FLAG_BYTE, AVSEEK_FLAG_ANY, AVSEEK_FLAG_FRAME, AVDISCARD_NONE, AVDISCARD_DEFAULT, AVDISCARD_NONREF, AVDISCARD_BIDIR, AVDISCARD_NONINTRA, AVDISCARD_NONKEY, AVDISCARD_ALL, AV_LOG_QUIET, AV_LOG_PANIC, AV_LOG_FATAL, AV_LOG_ERROR, AV_LOG_WARNING, AV_LOG_INFO, AV_LOG_VERBOSE, AV_LOG_DEBUG, AV_LOG_TRACE, AV_PKT_FLAG_KEY, AV_PKT_FLAG_CORRUPT, AV_PKT_FLAG_DISCARD, AV_PKT_FLAG_TRUSTED, AV_PKT_FLAG_DISPOSABLE, E2BIG, EPERM, EADDRINUSE, EADDRNOTAVAIL, EAFNOSUPPORT, EAGAIN, EALREADY, EBADF, EBADMSG, EBUSY, ECANCELED, ECHILD, ECONNABORTED, ECONNREFUSED, ECONNRESET, EDEADLOCK, EDESTADDRREQ, EDOM, EDQUOT, EEXIST, EFAULT, EFBIG, EHOSTUNREACH, EIDRM, EILSEQ, EINPROGRESS, EINTR, EINVAL, EIO, EISCONN, EISDIR, ELOOP, EMFILE, EMLINK, EMSGSIZE, EMULTIHOP, ENAMETOOLONG, ENETDOWN, ENETRESET, ENETUNREACH, ENFILE, ENOBUFS, ENODEV, ENOENT, AVERROR_EOF, LibAV2, libav_opus_af_default;
var init_libav_opus_af = __esm(() => {
  libav = {};
  (function() {
    function isWebAssemblySupported(module) {
      module = module || [0, 97, 115, 109, 1, 0, 0, 0];
      if (typeof WebAssembly !== "object" || typeof WebAssembly.instantiate !== "function")
        return false;
      try {
        var module = new WebAssembly.Module(new Uint8Array(module));
        if (module instanceof WebAssembly.Module)
          return new WebAssembly.Instance(module) instanceof WebAssembly.Instance;
      } catch (e) {}
      return false;
    }
    function isThreadingSupported() {
      try {
        var mem = new WebAssembly.Memory({ initial: 1, maximum: 1, shared: true });
        if (!(mem.buffer instanceof SharedArrayBuffer))
          return false;
        return true;
      } catch (e) {}
      return false;
    }
    var nodejs = typeof process !== "undefined";
    if (!libav.base) {
      libav.base = import.meta.url;
      libav.base = libav.base.replace(/\/[^\/]*$/, "");
    }
    libav.isWebAssemblySupported = isWebAssemblySupported;
    libav.isThreadingSupported = isThreadingSupported;
    function target(opts) {
      opts = opts || {};
      var wasm = !opts.nowasm && isWebAssemblySupported();
      var thr = opts.yesthreads && wasm && !opts.nothreads && isThreadingSupported();
      if (!wasm)
        return "asm";
      else if (thr)
        return "thr";
      else
        return "wasm";
    }
    libav.target = target;
    libav.VER = "6.9.8.1";
    libav.CONFIG = "opus-af";
    libav.DBG = "";
    libav.factories = {};
    var libavStatics = {};
    libavStatics.i64tof64 = function(lo, hi) {
      if (!hi && lo >= 0)
        return lo;
      if (hi === -1 && lo < 0)
        return lo;
      return hi * 4294967296 + lo + (lo < 0 ? 4294967296 : 0);
    };
    libavStatics.f64toi64 = function(val) {
      return [~~val, Math.floor(val / 4294967296)];
    };
    libavStatics.i64ToBigInt = function(lo, hi) {
      var dv = new DataView(new ArrayBuffer(8));
      dv.setInt32(0, lo, true);
      dv.setInt32(4, hi, true);
      return dv.getBigInt64(0, true);
    };
    libavStatics.bigIntToi64 = function(val) {
      var dv = new DataView(new ArrayBuffer(8));
      dv.setBigInt64(0, val, true);
      return [dv.getInt32(0, true), dv.getInt32(4, true)];
    };
    libavStatics.ff_channel_layout = function(frame) {
      if (frame.channel_layout)
        return frame.channel_layout;
      else if (frame.channels && frame.channels !== 1)
        return (1 << frame.channels) - 1;
      else
        return 4;
    };
    libavStatics.ff_channels = function(frame) {
      if (frame.channels) {
        return frame.channels;
      } else if (frame.channel_layout) {
        var channels = 0;
        var cl = frame.channel_layout;
        while (cl) {
          channels += cl & 1;
          cl >>= 1;
        }
        return channels;
      } else {
        return 1;
      }
    };
    libavStatics.AV_VERSION_INT = function(maj, min, rev) {
      return maj << 16 | min << 8 | rev;
    };
    function enume(vals, first) {
      if (typeof first === "undefined")
        first = 0;
      var i = first;
      vals.forEach(function(val) {
        libavStatics[val] = i++;
      });
    }
    libavStatics.AV_TIME_BASE = 1e6;
    libavStatics.AV_NOPTS_VALUE_I64 = [0, ~~2147483648];
    libavStatics.AV_NOPTS_VALUE_LO = 0;
    libavStatics.AV_NOPTS_VALUE_HI = ~~2147483648;
    libavStatics.AV_NOPTS_VALUE = libavStatics.i64tof64(0, ~~2147483648);
    libavStatics.AV_OPT_SEARCH_CHILDREN = 1;
    enume(["AVMEDIA_TYPE_UNKNOWN", "AVMEDIA_TYPE_VIDEO", "AVMEDIA_TYPE_AUDIO", "AVMEDIA_TYPE_DATA", "AVMEDIA_TYPE_SUBTITLE", "AVMEDIA_TYPE_ATTACHMENT"], -1);
    enume(["AV_SAMPLE_FMT_NONE", "AV_SAMPLE_FMT_U8", "AV_SAMPLE_FMT_S16", "AV_SAMPLE_FMT_S32", "AV_SAMPLE_FMT_FLT", "AV_SAMPLE_FMT_DBL", "AV_SAMPLE_FMT_U8P", "AV_SAMPLE_FMT_S16P", "AV_SAMPLE_FMT_S32P", "AV_SAMPLE_FMT_FLTP", "AV_SAMPLE_FMT_DBLP", "AV_SAMPLE_FMT_S64", "AV_SAMPLE_FMT_S64P", "AV_SAMPLE_FMT_NB"], -1);
    enume(["AV_PIX_FMT_NONE", "AV_PIX_FMT_YUV420P", "AV_PIX_FMT_YUYV422", "AV_PIX_FMT_RGB24", "AV_PIX_FMT_BGR24", "AV_PIX_FMT_YUV422P", "AV_PIX_FMT_YUV444P", "AV_PIX_FMT_YUV410P", "AV_PIX_FMT_YUV411P", "AV_PIX_FMT_GRAY8", "AV_PIX_FMT_MONOWHITE", "AV_PIX_FMT_MONOBLACK", "AV_PIX_FMT_PAL8", "AV_PIX_FMT_YUVJ420P", "AV_PIX_FMT_YUVJ422P", "AV_PIX_FMT_YUVJ444P", "AV_PIX_FMT_UYVY422", "AV_PIX_FMT_UYYVYY411", "AV_PIX_FMT_BGR8", "AV_PIX_FMT_BGR4", "AV_PIX_FMT_BGR4_BYTE", "AV_PIX_FMT_RGB8", "AV_PIX_FMT_RGB4", "AV_PIX_FMT_RGB4_BYTE", "AV_PIX_FMT_NV12", "AV_PIX_FMT_NV21", "AV_PIX_FMT_ARGB", "AV_PIX_FMT_RGBA", "AV_PIX_FMT_ABGR", "AV_PIX_FMT_BGRA", "AV_PIX_FMT_GRAY16BE", "AV_PIX_FMT_GRAY16LE", "AV_PIX_FMT_YUV440P", "AV_PIX_FMT_YUVJ440P", "AV_PIX_FMT_YUVA420P", "AV_PIX_FMT_RGB48BE", "AV_PIX_FMT_RGB48LE", "AV_PIX_FMT_RGB565BE", "AV_PIX_FMT_RGB565LE", "AV_PIX_FMT_RGB555BE", "AV_PIX_FMT_RGB555LE", "AV_PIX_FMT_BGR565BE", "AV_PIX_FMT_BGR565LE", "AV_PIX_FMT_BGR555BE", "AV_PIX_FMT_BGR555LE"], -1);
    libavStatics.AVIO_FLAG_READ = 1;
    libavStatics.AVIO_FLAG_WRITE = 2;
    libavStatics.AVIO_FLAG_READ_WRITE = 3;
    libavStatics.AVIO_FLAG_NONBLOCK = 8;
    libavStatics.AVIO_FLAG_DIRECT = 32768;
    libavStatics.AVFMT_FLAG_NOBUFFER = 64;
    libavStatics.AVFMT_FLAG_FLUSH_PACKETS = 512;
    libavStatics.AVSEEK_FLAG_BACKWARD = 1;
    libavStatics.AVSEEK_FLAG_BYTE = 2;
    libavStatics.AVSEEK_FLAG_ANY = 4;
    libavStatics.AVSEEK_FLAG_FRAME = 8;
    libavStatics.AVDISCARD_NONE = -16;
    libavStatics.AVDISCARD_DEFAULT = 0;
    libavStatics.AVDISCARD_NONREF = 8;
    libavStatics.AVDISCARD_BIDIR = 16;
    libavStatics.AVDISCARD_NONINTRA = 24;
    libavStatics.AVDISCARD_NONKEY = 32;
    libavStatics.AVDISCARD_ALL = 48;
    libavStatics.AV_LOG_QUIET = -8;
    libavStatics.AV_LOG_PANIC = 0;
    libavStatics.AV_LOG_FATAL = 8;
    libavStatics.AV_LOG_ERROR = 16;
    libavStatics.AV_LOG_WARNING = 24;
    libavStatics.AV_LOG_INFO = 32;
    libavStatics.AV_LOG_VERBOSE = 40;
    libavStatics.AV_LOG_DEBUG = 48;
    libavStatics.AV_LOG_TRACE = 56;
    libavStatics.AV_PKT_FLAG_KEY = 1;
    libavStatics.AV_PKT_FLAG_CORRUPT = 2;
    libavStatics.AV_PKT_FLAG_DISCARD = 4;
    libavStatics.AV_PKT_FLAG_TRUSTED = 8;
    libavStatics.AV_PKT_FLAG_DISPOSABLE = 16;
    enume(["E2BIG", "EPERM", "EADDRINUSE", "EADDRNOTAVAIL", "EAFNOSUPPORT", "EAGAIN", "EALREADY", "EBADF", "EBADMSG", "EBUSY", "ECANCELED", "ECHILD", "ECONNABORTED", "ECONNREFUSED", "ECONNRESET", "EDEADLOCK", "EDESTADDRREQ", "EDOM", "EDQUOT", "EEXIST", "EFAULT", "EFBIG", "EHOSTUNREACH", "EIDRM", "EILSEQ", "EINPROGRESS", "EINTR", "EINVAL", "EIO", "EISCONN", "EISDIR", "ELOOP", "EMFILE", "EMLINK", "EMSGSIZE", "EMULTIHOP", "ENAMETOOLONG", "ENETDOWN", "ENETRESET", "ENETUNREACH", "ENFILE", "ENOBUFS", "ENODEV", "ENOENT"], 1);
    libavStatics.AVERROR_EOF = -541478725;
    Object.assign(libav, libavStatics);
    libav.LibAV = function(opts) {
      opts = opts || {};
      var base = opts.base || libav.base;
      var t = target(opts);
      var variant = opts.variant || libav.variant || "opus-af";
      var useES6 = true;
      if (useES6 && (opts.noes6 || libav.noes6))
        useES6 = false;
      var toImport = opts.toImport || libav.toImport || base + "/libav-6.9.8.1-" + variant + "." + t + "." + (useES6 ? "mjs" : "js");
      var ret;
      var mode = "direct";
      if (t === "thr")
        mode = "threads";
      else if (!nodejs && !opts.noworker && typeof Worker !== "undefined")
        mode = "worker";
      return Promise.all([]).then(function() {
        if (opts.factory || libav.factory)
          return opts.factory || libav.factory;
        if (libav.factories[toImport])
          return libav.factories[toImport];
        if (mode === "worker") {} else if (useES6) {
          return import(toImport).then(function(laf) {
            libav.factories[toImport] = laf.default;
            return laf.default;
          });
        } else if (nodejs) {
          return libav.factories[toImport] = __require(toImport);
        } else if (typeof importScripts !== "undefined") {
          importScripts(toImport);
          return libav.factories[toImport] = LibAVFactory;
        } else {
          return new Promise(function(res, rej) {
            var scr = document.createElement("script");
            scr.src = toImport;
            scr.addEventListener("load", res);
            scr.addEventListener("error", rej);
            scr.async = true;
            document.body.appendChild(scr);
          }).then(function() {
            return libav.factories[toImport] = LibAVFactory;
          });
        }
      }).then(function(factory) {
        if (mode === "worker") {
          ret = {};
          ret.worker = new Worker(toImport, { type: useES6 ? "module" : "classic" });
          return new Promise(function(res, rej) {
            ret.worker.onerror = (ev) => {
              console.error(ev);
              rej(ev.error || new Error(ev.message));
            };
            ret.worker.postMessage({ config: { variant: opts.variant || libav.variant, wasmurl: opts.wasmurl || libav.wasmurl } });
            ret.on = 1;
            ret.handlers = { error: [function(ex) {
              rej(ex);
            }, null], onready: [function() {
              res();
            }, null], onwrite: [function(args) {
              if (ret.onwrite)
                ret.onwrite.apply(ret, args);
            }, null], onread: [function(args) {
              try {
                var rr = null;
                if (ret.onread)
                  rr = ret.onread.apply(ret, args);
                if (rr && rr.then && rr.catch) {
                  rr.catch(function(ex) {
                    ret.ff_reader_dev_send(args[0], null, { error: ex });
                  });
                }
              } catch (ex) {
                ret.ff_reader_dev_send(args[0], null, { error: ex });
              }
            }, null], onblockread: [function(args) {
              try {
                var brr = null;
                if (ret.onblockread)
                  brr = ret.onblockread.apply(ret, args);
                if (brr && brr.then && brr.catch) {
                  brr.catch(function(ex) {
                    ret.ff_block_reader_dev_send(args[0], args[1], null, { error: ex });
                  });
                }
              } catch (ex) {
                ret.ff_block_reader_dev_send(args[0], args[1], null, { error: ex });
              }
            }, null] };
            ret.c = function() {
              var msg = Array.prototype.slice.call(arguments);
              var transfer = [];
              for (var i = 0;i < msg.length; i++) {
                if (msg[i] && msg[i].libavjsTransfer)
                  transfer.push.apply(transfer, msg[i].libavjsTransfer);
              }
              return new Promise(function(res2, rej2) {
                var id = ret.on++;
                msg = [id].concat(msg);
                ret.handlers[id] = [res2, rej2];
                ret.worker.postMessage(msg, transfer);
              });
            };
            function onworkermessage(e) {
              var id = e.data[0];
              var h = ret.handlers[id];
              if (h) {
                if (e.data[2])
                  h[0](e.data[3]);
                else
                  h[1](e.data[3]);
                if (typeof id === "number")
                  delete ret.handlers[id];
              }
            }
            ret.worker.onmessage = onworkermessage;
            ret.terminate = function() {
              ret.worker.terminate();
            };
          });
        } else if (mode === "threads") {
          return Promise.all([]).then(function() {
            return factory({ wasmurl: opts.wasmurl || libav.wasmurl, variant: opts.variant || libav.variant });
          }).then(function(x) {
            ret = x;
            var pthreadT = ret.libavjs_create_main_thread();
            var worker = ret.PThread.pthreads[pthreadT];
            var ready = 0;
            var on = 1;
            var handlers = {};
            var readyPromiseRes = null;
            var readyPromise = new Promise(function(res) {
              readyPromiseRes = res;
            });
            ret.c = function() {
              var msg = Array.prototype.slice.call(arguments);
              return new Promise(function(res, rej) {
                var id = on++;
                msg = [id].concat(msg);
                handlers[id] = [res, rej];
                worker.postMessage({ c: "libavjs_run", a: msg });
              });
            };
            var origOnmessage = worker.onmessage;
            worker.onmessage = function(e) {
              if (e.data && e.data.c === "libavjs_ret") {
                var a = e.data.a;
                var h = handlers[a[0]];
                if (h) {
                  if (a[2])
                    h[0](a[3]);
                  else
                    h[1](a[3]);
                  delete handlers[a[0]];
                }
              } else if (e.data && e.data.c === "libavjs_wait_reader") {
                if (ret.readerDevReady(e.data.fd)) {
                  worker.postMessage({ c: "libavjs_wait_reader", fd: e.data.fd });
                } else {
                  var name = ret.fdName(e.data.fd);
                  var waiters = ret.ff_reader_dev_waiters[name];
                  if (!waiters) {
                    waiters = ret.ff_reader_dev_waiters[name] = [];
                  }
                  waiters.push(function() {
                    worker.postMessage({ c: "libavjs_wait_reader", fd: e.data.fd });
                  });
                }
              } else if (e.data && e.data.c === "libavjs_ready") {
                readyPromiseRes();
              } else {
                return origOnmessage.apply(this, arguments);
              }
            };
            ret.terminate = function() {
              ret.PThread.unusedWorkers.concat(ret.PThread.runningWorkers).forEach(function(worker2) {
                worker2.terminate();
              });
            };
            return readyPromise;
          });
        } else {
          return Promise.all([]).then(function() {
            return factory({ wasmurl: opts.wasmurl || libav.wasmurl, variant: opts.variant || libav.variant });
          }).then(function(x) {
            ret = x;
            ret.worker = false;
            ret.c = function(func) {
              var args = Array.prototype.slice.call(arguments, 1);
              return new Promise(function(res, rej) {
                try {
                  res(ret[func].apply(ret, args));
                } catch (ex) {
                  rej(ex);
                }
              });
            };
            ret.terminate = function() {};
          });
        }
      }).then(function() {
        function indirectors(funcs2) {
          funcs2.forEach(function(f) {
            ret[f] = function() {
              return ret.c.apply(ret, [f].concat(Array.prototype.slice.call(arguments)));
            };
          });
        }
        function directs(funcs2) {
          funcs2.forEach(function(f) {
            var real = ret[f + "_sync"] = ret[f];
            ret[f] = function() {
              var args = arguments;
              return new Promise(function(res, rej) {
                try {
                  var p = real.apply(ret, args);
                  if (typeof p === "object" && p !== null && p.then)
                    p.then(res).catch(rej);
                  else
                    res(p);
                } catch (ex) {
                  rej(ex);
                }
              });
            };
          });
        }
        var funcs = ["calloc", "close", "dup2", "free", "malloc", "mallinfo_uordblks", "open", "strerror", "libavjs_create_main_thread", "libavjs_with_swscale", "ff_malloc_int32_list", "ff_malloc_int64_list", "av_compare_ts_js", "av_dict_copy_js", "av_dict_free", "av_dict_set_js", "av_log_get_level", "av_log_set_level", "av_opt_set", "av_opt_set_int_list_js", "av_strdup", "ff_error", "ff_nothing", "LIBAVUTIL_VERSION_INT", "av_dict_free_js", "av_find_best_stream", "av_find_input_format", "avformat_alloc_context", "avformat_alloc_output_context2_js", "avformat_close_input", "avformat_find_stream_info", "avformat_flush", "avformat_free_context", "avformat_new_stream", "avformat_open_input", "avformat_open_input_js", "avformat_seek_file", "avformat_seek_file_min", "avformat_seek_file_max", "avformat_seek_file_approx", "avformat_write_header", "av_interleaved_write_frame", "avio_open2_js", "avio_close", "avio_flush", "av_read_frame", "av_seek_frame", "av_write_frame", "av_write_trailer", "LIBAVFORMAT_VERSION_INT", "ff_init_muxer", "ff_free_muxer", "ff_init_demuxer_file", "ff_write_multi", "ff_read_frame_multi", "ff_read_multi", "AVFormatContext_duration", "AVFormatContext_duration_s", "AVFormatContext_durationhi", "AVFormatContext_durationhi_s", "AVFormatContext_flags", "AVFormatContext_flags_s", "AVFormatContext_nb_streams", "AVFormatContext_nb_streams_s", "AVFormatContext_oformat", "AVFormatContext_oformat_s", "AVFormatContext_pb", "AVFormatContext_pb_s", "AVFormatContext_start_time", "AVFormatContext_start_time_s", "AVFormatContext_start_timehi", "AVFormatContext_start_timehi_s", "AVFormatContext_streams_a", "AVFormatContext_streams_a_s", "AVStream_codecpar", "AVStream_codecpar_s", "AVStream_discard", "AVStream_discard_s", "AVStream_duration", "AVStream_duration_s", "AVStream_durationhi", "AVStream_durationhi_s", "AVStream_time_base_num", "AVStream_time_base_den", "AVStream_time_base_num_s", "AVStream_time_base_den_s", "AVStream_time_base_s", "avformat_close_input_js", "avcodec_descriptor_get", "avcodec_descriptor_get_by_name", "avcodec_descriptor_next", "av_grow_packet", "av_packet_alloc", "av_packet_clone", "av_packet_free", "av_packet_make_writable", "av_packet_new_side_data", "av_packet_ref", "av_packet_rescale_ts_js", "AVPacketSideData_data", "AVPacketSideData_size", "AVPacketSideData_type", "av_packet_unref", "av_shrink_packet", "ff_codecpar_new_side_data", "LIBAVCODEC_VERSION_INT", "ff_set_packet", "ff_copyout_packet", "ff_copyout_packet_ptr", "ff_copyin_packet", "AVCodecDescriptor_id", "AVCodecDescriptor_id_s", "AVCodecDescriptor_long_name", "AVCodecDescriptor_mime_types_a", "AVCodecDescriptor_mime_types_a_s", "AVCodecDescriptor_name", "AVCodecDescriptor_props", "AVCodecDescriptor_props_s", "AVCodecDescriptor_type", "AVCodecDescriptor_type_s", "AVCodecParameters_bit_rate", "AVCodecParameters_bit_rate_s", "AVCodecParameters_channel_layoutmask", "AVCodecParameters_channel_layoutmask_s", "AVCodecParameters_channels", "AVCodecParameters_channels_s", "AVCodecParameters_ch_layout_nb_channels", "AVCodecParameters_ch_layout_nb_channels_s", "AVCodecParameters_chroma_location", "AVCodecParameters_chroma_location_s", "AVCodecParameters_codec_id", "AVCodecParameters_codec_id_s", "AVCodecParameters_codec_tag", "AVCodecParameters_codec_tag_s", "AVCodecParameters_codec_type", "AVCodecParameters_codec_type_s", "AVCodecParameters_coded_side_data", "AVCodecParameters_coded_side_data_s", "AVCodecParameters_color_primaries", "AVCodecParameters_color_primaries_s", "AVCodecParameters_color_range", "AVCodecParameters_color_range_s", "AVCodecParameters_color_space", "AVCodecParameters_color_space_s", "AVCodecParameters_color_trc", "AVCodecParameters_color_trc_s", "AVCodecParameters_extradata", "AVCodecParameters_extradata_s", "AVCodecParameters_extradata_size", "AVCodecParameters_extradata_size_s", "AVCodecParameters_format", "AVCodecParameters_format_s", "AVCodecParameters_framerate_num", "AVCodecParameters_framerate_den", "AVCodecParameters_framerate_num_s", "AVCodecParameters_framerate_den_s", "AVCodecParameters_framerate_s", "AVCodecParameters_height", "AVCodecParameters_height_s", "AVCodecParameters_level", "AVCodecParameters_level_s", "AVCodecParameters_nb_coded_side_data", "AVCodecParameters_nb_coded_side_data_s", "AVCodecParameters_profile", "AVCodecParameters_profile_s", "AVCodecParameters_sample_rate", "AVCodecParameters_sample_rate_s", "AVCodecParameters_width", "AVCodecParameters_width_s", "AVPacket_data", "AVPacket_data_s", "AVPacket_dts", "AVPacket_dts_s", "AVPacket_dtshi", "AVPacket_dtshi_s", "AVPacket_duration", "AVPacket_duration_s", "AVPacket_durationhi", "AVPacket_durationhi_s", "AVPacket_flags", "AVPacket_flags_s", "AVPacket_pos", "AVPacket_pos_s", "AVPacket_poshi", "AVPacket_poshi_s", "AVPacket_pts", "AVPacket_pts_s", "AVPacket_ptshi", "AVPacket_ptshi_s", "AVPacket_side_data", "AVPacket_side_data_s", "AVPacket_side_data_elems", "AVPacket_side_data_elems_s", "AVPacket_size", "AVPacket_size_s", "AVPacket_stream_index", "AVPacket_stream_index_s", "AVPacket_time_base_num", "AVPacket_time_base_den", "AVPacket_time_base_num_s", "AVPacket_time_base_den_s", "AVPacket_time_base_s", "av_packet_free_js", "avcodec_parameters_free_js", "avcodec_alloc_context3", "avcodec_find_decoder", "avcodec_find_decoder_by_name", "avcodec_find_encoder", "avcodec_find_encoder_by_name", "avcodec_flush_buffers", "avcodec_free_context", "avcodec_get_name", "avcodec_open2", "avcodec_open2_js", "avcodec_parameters_alloc", "avcodec_parameters_copy", "avcodec_parameters_free", "avcodec_parameters_from_context", "avcodec_parameters_to_context", "avcodec_receive_frame", "avcodec_receive_packet", "avcodec_send_frame", "avcodec_send_packet", "ff_init_encoder", "ff_init_decoder", "ff_free_encoder", "ff_free_decoder", "ff_encode_multi", "ff_decode_multi", "ff_copyout_codecpar", "ff_copyin_codecpar", "AVCodec_name", "AVCodec_sample_fmts", "AVCodec_sample_fmts_s", "AVCodec_sample_fmts_a", "AVCodec_sample_fmts_a_s", "AVCodec_supported_samplerates", "AVCodec_supported_samplerates_s", "AVCodec_supported_samplerates_a", "AVCodec_supported_samplerates_a_s", "AVCodec_type", "AVCodec_type_s", "AVCodecContext_codec_id", "AVCodecContext_codec_id_s", "AVCodecContext_codec_type", "AVCodecContext_codec_type_s", "AVCodecContext_bit_rate", "AVCodecContext_bit_rate_s", "AVCodecContext_bit_ratehi", "AVCodecContext_bit_ratehi_s", "AVCodecContext_channel_layout", "AVCodecContext_channel_layout_s", "AVCodecContext_channel_layouthi", "AVCodecContext_channel_layouthi_s", "AVCodecContext_channels", "AVCodecContext_channels_s", "AVCodecContext_channel_layoutmask", "AVCodecContext_channel_layoutmask_s", "AVCodecContext_ch_layout_nb_channels", "AVCodecContext_ch_layout_nb_channels_s", "AVCodecContext_coded_side_data", "AVCodecContext_coded_side_data_s", "AVCodecContext_compression_level", "AVCodecContext_compression_level_s", "AVCodecContext_extradata", "AVCodecContext_extradata_s", "AVCodecContext_extradata_size", "AVCodecContext_extradata_size_s", "AVCodecContext_frame_size", "AVCodecContext_frame_size_s", "AVCodecContext_framerate_num", "AVCodecContext_framerate_den", "AVCodecContext_framerate_num_s", "AVCodecContext_framerate_den_s", "AVCodecContext_framerate_s", "AVCodecContext_gop_size", "AVCodecContext_gop_size_s", "AVCodecContext_height", "AVCodecContext_height_s", "AVCodecContext_keyint_min", "AVCodecContext_keyint_min_s", "AVCodecContext_level", "AVCodecContext_level_s", "AVCodecContext_max_b_frames", "AVCodecContext_max_b_frames_s", "AVCodecContext_nb_coded_side_data", "AVCodecContext_nb_coded_side_data_s", "AVCodecContext_pix_fmt", "AVCodecContext_pix_fmt_s", "AVCodecContext_profile", "AVCodecContext_profile_s", "AVCodecContext_rc_max_rate", "AVCodecContext_rc_max_rate_s", "AVCodecContext_rc_max_ratehi", "AVCodecContext_rc_max_ratehi_s", "AVCodecContext_rc_min_rate", "AVCodecContext_rc_min_rate_s", "AVCodecContext_rc_min_ratehi", "AVCodecContext_rc_min_ratehi_s", "AVCodecContext_sample_aspect_ratio_num", "AVCodecContext_sample_aspect_ratio_den", "AVCodecContext_sample_aspect_ratio_num_s", "AVCodecContext_sample_aspect_ratio_den_s", "AVCodecContext_sample_aspect_ratio_s", "AVCodecContext_sample_fmt", "AVCodecContext_sample_fmt_s", "AVCodecContext_sample_rate", "AVCodecContext_sample_rate_s", "AVCodecContext_strict_std_compliance", "AVCodecContext_strict_std_compliance_s", "AVCodecContext_time_base_num", "AVCodecContext_time_base_den", "AVCodecContext_time_base_num_s", "AVCodecContext_time_base_den_s", "AVCodecContext_time_base_s", "AVCodecContext_pkt_timebase_num", "AVCodecContext_pkt_timebase_den", "AVCodecContext_pkt_timebase_num_s", "AVCodecContext_pkt_timebase_den_s", "AVCodecContext_pkt_timebase_s", "AVCodecContext_qmax", "AVCodecContext_qmax_s", "AVCodecContext_qmin", "AVCodecContext_qmin_s", "AVCodecContext_width", "AVCodecContext_width_s", "avcodec_free_context_js", "av_frame_alloc", "av_frame_clone", "av_frame_free", "av_frame_get_buffer", "av_frame_make_writable", "av_frame_ref", "av_frame_unref", "av_get_bytes_per_sample", "av_get_sample_fmt_name", "av_pix_fmt_desc_get", "AVPixFmtDescriptor_comp_depth", "ff_frame_rescale_ts_js", "ff_copyout_frame", "ff_copyout_frame_video", "ff_frame_video_packed_size", "ff_copyout_frame_video_packed", "ff_copyout_frame_video_imagedata", "ff_copyout_frame_ptr", "ff_copyin_frame", "AVFrame_channel_layout", "AVFrame_channel_layout_s", "AVFrame_channel_layouthi", "AVFrame_channel_layouthi_s", "AVFrame_channels", "AVFrame_channels_s", "AVFrame_channel_layoutmask", "AVFrame_channel_layoutmask_s", "AVFrame_ch_layout_nb_channels", "AVFrame_ch_layout_nb_channels_s", "AVFrame_crop_bottom", "AVFrame_crop_bottom_s", "AVFrame_crop_left", "AVFrame_crop_left_s", "AVFrame_crop_right", "AVFrame_crop_right_s", "AVFrame_crop_top", "AVFrame_crop_top_s", "AVFrame_data_a", "AVFrame_data_a_s", "AVFrame_duration", "AVFrame_duration_s", "AVFrame_flags", "AVFrame_flags_s", "AVFrame_format", "AVFrame_format_s", "AVFrame_height", "AVFrame_height_s", "AVFrame_key_frame", "AVFrame_key_frame_s", "AVFrame_linesize_a", "AVFrame_linesize_a_s", "AVFrame_nb_samples", "AVFrame_nb_samples_s", "AVFrame_pict_type", "AVFrame_pict_type_s", "AVFrame_pts", "AVFrame_pts_s", "AVFrame_ptshi", "AVFrame_ptshi_s", "AVFrame_best_effort_timestamp", "AVFrame_best_effort_timestamp_s", "AVFrame_best_effort_timestamphi", "AVFrame_best_effort_timestamphi_s", "AVFrame_sample_aspect_ratio_num", "AVFrame_sample_aspect_ratio_den", "AVFrame_sample_aspect_ratio_num_s", "AVFrame_sample_aspect_ratio_den_s", "AVFrame_sample_aspect_ratio_s", "AVFrame_sample_rate", "AVFrame_sample_rate_s", "AVFrame_time_base_num", "AVFrame_time_base_den", "AVFrame_time_base_num_s", "AVFrame_time_base_den_s", "AVFrame_time_base_s", "AVFrame_width", "AVFrame_width_s", "AVPixFmtDescriptor_flags", "AVPixFmtDescriptor_flags_s", "AVPixFmtDescriptor_log2_chroma_h", "AVPixFmtDescriptor_log2_chroma_h_s", "AVPixFmtDescriptor_log2_chroma_w", "AVPixFmtDescriptor_log2_chroma_w_s", "AVPixFmtDescriptor_nb_components", "AVPixFmtDescriptor_nb_components_s", "av_frame_free_js", "av_buffersink_get_frame", "av_buffersink_get_time_base_num", "av_buffersink_get_time_base_den", "av_buffersink_set_frame_size", "ff_buffersink_set_ch_layout", "av_buffersrc_add_frame_flags", "avfilter_free", "avfilter_get_by_name", "avfilter_graph_alloc", "avfilter_graph_config", "avfilter_graph_create_filter_js", "avfilter_graph_free", "avfilter_graph_parse", "avfilter_inout_alloc", "avfilter_inout_free", "avfilter_link", "LIBAVFILTER_VERSION_INT", "ff_init_filter_graph", "ff_filter_multi", "ff_decode_filter_multi", "AVFilterInOut_filter_ctx", "AVFilterInOut_filter_ctx_s", "AVFilterInOut_name", "AVFilterInOut_name_s", "AVFilterInOut_next", "AVFilterInOut_next_s", "AVFilterInOut_pad_idx", "AVFilterInOut_pad_idx_s", "avfilter_graph_free_js", "avfilter_inout_free_js"];
        var localFuncs = ["copyin_u8", "copyout_u8", "copyin_s16", "copyout_s16", "copyin_s32", "copyout_s32", "copyin_f32", "copyout_f32", "createLazyFile", "ff_block_reader_dev_send", "ff_reader_dev_send", "ff_reader_dev_waiting", "mkblockreaderdev", "mkdev", "mkfsfhfile", "mkreadaheadfile", "mkreaderdev", "mkstreamwriterdev", "mkworkerfsfile", "mkwriterdev", "mountwriterfs", "readFile", "unlink", "unlinkfsfhfile", "unlinkreadaheadfile", "unlinkworkerfsfile", "unmount", "writeFile"];
        ret.libavjsMode = mode;
        if (mode === "worker") {
          indirectors(funcs);
          indirectors(localFuncs);
        } else if (mode === "threads") {
          indirectors(funcs);
          directs(localFuncs);
        } else {
          directs(funcs);
          directs(localFuncs);
        }
        Object.assign(ret, libavStatics);
        return ret;
      });
    };
  })();
  ({ base, isWebAssemblySupported, isThreadingSupported, target, VER, CONFIG, DBG, factories, i64tof64, f64toi64, i64ToBigInt, bigIntToi64, ff_channel_layout, ff_channels, AV_VERSION_INT, AV_TIME_BASE, AV_NOPTS_VALUE_I64, AV_NOPTS_VALUE_LO, AV_NOPTS_VALUE_HI, AV_NOPTS_VALUE, AV_OPT_SEARCH_CHILDREN, AVMEDIA_TYPE_UNKNOWN, AVMEDIA_TYPE_VIDEO, AVMEDIA_TYPE_AUDIO, AVMEDIA_TYPE_DATA, AVMEDIA_TYPE_SUBTITLE, AVMEDIA_TYPE_ATTACHMENT, AV_SAMPLE_FMT_NONE, AV_SAMPLE_FMT_U8, AV_SAMPLE_FMT_S16, AV_SAMPLE_FMT_S32, AV_SAMPLE_FMT_FLT, AV_SAMPLE_FMT_DBL, AV_SAMPLE_FMT_U8P, AV_SAMPLE_FMT_S16P, AV_SAMPLE_FMT_S32P, AV_SAMPLE_FMT_FLTP, AV_SAMPLE_FMT_DBLP, AV_SAMPLE_FMT_S64, AV_SAMPLE_FMT_S64P, AV_SAMPLE_FMT_NB, AV_PIX_FMT_NONE, AV_PIX_FMT_YUV420P, AV_PIX_FMT_YUYV422, AV_PIX_FMT_RGB24, AV_PIX_FMT_BGR24, AV_PIX_FMT_YUV422P, AV_PIX_FMT_YUV444P, AV_PIX_FMT_YUV410P, AV_PIX_FMT_YUV411P, AV_PIX_FMT_GRAY8, AV_PIX_FMT_MONOWHITE, AV_PIX_FMT_MONOBLACK, AV_PIX_FMT_PAL8, AV_PIX_FMT_YUVJ420P, AV_PIX_FMT_YUVJ422P, AV_PIX_FMT_YUVJ444P, AV_PIX_FMT_UYVY422, AV_PIX_FMT_UYYVYY411, AV_PIX_FMT_BGR8, AV_PIX_FMT_BGR4, AV_PIX_FMT_BGR4_BYTE, AV_PIX_FMT_RGB8, AV_PIX_FMT_RGB4, AV_PIX_FMT_RGB4_BYTE, AV_PIX_FMT_NV12, AV_PIX_FMT_NV21, AV_PIX_FMT_ARGB, AV_PIX_FMT_RGBA, AV_PIX_FMT_ABGR, AV_PIX_FMT_BGRA, AV_PIX_FMT_GRAY16BE, AV_PIX_FMT_GRAY16LE, AV_PIX_FMT_YUV440P, AV_PIX_FMT_YUVJ440P, AV_PIX_FMT_YUVA420P, AV_PIX_FMT_RGB48BE, AV_PIX_FMT_RGB48LE, AV_PIX_FMT_RGB565BE, AV_PIX_FMT_RGB565LE, AV_PIX_FMT_RGB555BE, AV_PIX_FMT_RGB555LE, AV_PIX_FMT_BGR565BE, AV_PIX_FMT_BGR565LE, AV_PIX_FMT_BGR555BE, AV_PIX_FMT_BGR555LE, AVIO_FLAG_READ, AVIO_FLAG_WRITE, AVIO_FLAG_READ_WRITE, AVIO_FLAG_NONBLOCK, AVIO_FLAG_DIRECT, AVFMT_FLAG_NOBUFFER, AVFMT_FLAG_FLUSH_PACKETS, AVSEEK_FLAG_BACKWARD, AVSEEK_FLAG_BYTE, AVSEEK_FLAG_ANY, AVSEEK_FLAG_FRAME, AVDISCARD_NONE, AVDISCARD_DEFAULT, AVDISCARD_NONREF, AVDISCARD_BIDIR, AVDISCARD_NONINTRA, AVDISCARD_NONKEY, AVDISCARD_ALL, AV_LOG_QUIET, AV_LOG_PANIC, AV_LOG_FATAL, AV_LOG_ERROR, AV_LOG_WARNING, AV_LOG_INFO, AV_LOG_VERBOSE, AV_LOG_DEBUG, AV_LOG_TRACE, AV_PKT_FLAG_KEY, AV_PKT_FLAG_CORRUPT, AV_PKT_FLAG_DISCARD, AV_PKT_FLAG_TRUSTED, AV_PKT_FLAG_DISPOSABLE, E2BIG, EPERM, EADDRINUSE, EADDRNOTAVAIL, EAFNOSUPPORT, EAGAIN, EALREADY, EBADF, EBADMSG, EBUSY, ECANCELED, ECHILD, ECONNABORTED, ECONNREFUSED, ECONNRESET, EDEADLOCK, EDESTADDRREQ, EDOM, EDQUOT, EEXIST, EFAULT, EFBIG, EHOSTUNREACH, EIDRM, EILSEQ, EINPROGRESS, EINTR, EINVAL, EIO, EISCONN, EISDIR, ELOOP, EMFILE, EMLINK, EMSGSIZE, EMULTIHOP, ENAMETOOLONG, ENETDOWN, ENETRESET, ENETUNREACH, ENFILE, ENOBUFS, ENODEV, ENOENT, AVERROR_EOF, LibAV: LibAV2 } = libav);
  libav_opus_af_default = libav;
});

// node_modules/@kixelated/libavjs-webcodecs-polyfill/dist/encoded-audio-chunk.js
class EncodedAudioChunk2 {
  constructor(init) {
    {
      this.type = init.type;
      this.timestamp = init.timestamp;
      if (typeof init.duration === "number")
        this.duration = init.duration;
      else
        this.duration = null;
      this.byteLength = init.data.byteLength;
      let transfer = false;
      if (init.transfer) {
        let inBuffer;
        if (init.data.buffer)
          inBuffer = init.data.buffer;
        else
          inBuffer = init.data;
        let t;
        if (init.transfer instanceof Array)
          t = init.transfer;
        else
          t = Array.from(init.transfer);
        for (const b of t) {
          if (b === inBuffer) {
            transfer = true;
            break;
          }
        }
      }
      const data = new Uint8Array(init.data.buffer || init.data, init.data.byteOffset || 0, init.data.BYTES_PER_ELEMENT ? init.data.BYTES_PER_ELEMENT * init.data.length : init.data.byteLength);
      if (transfer)
        this._data = data;
      else
        this._data = data.slice(0);
    }
  }
  _libavGetData() {
    return this._data;
  }
  copyTo(destination) {
    new Uint8Array(destination.buffer || destination, destination.byteOffset || 0).set(this._data);
  }
}

// node_modules/@ungap/global-this/esm/index.js
var init_esm = __esm(() => {
  (function(Object2) {
    typeof globalThis !== "object" && (this ? get() : (Object2.defineProperty(Object2.prototype, "_T_", {
      configurable: true,
      get
    }), _T_));
    function get() {
      var global = this || self;
      global.globalThis = global;
      delete Object2.prototype._T_;
    }
  })(Object);
});

// node_modules/@kixelated/libavjs-webcodecs-polyfill/dist/audio-data.js
class AudioData2 {
  constructor(init) {
    AudioData2._checkValidAudioDataInit(init);
    {
      this.format = init.format;
      this.sampleRate = init.sampleRate;
      this.numberOfFrames = init.numberOfFrames;
      this.numberOfChannels = init.numberOfChannels;
      this.timestamp = init.timestamp;
      let transfer = false;
      if (init.transfer) {
        let inBuffer;
        if (init.data.buffer)
          inBuffer = init.data.buffer;
        else
          inBuffer = init.data;
        let t;
        if (init.transfer instanceof Array)
          t = init.transfer;
        else
          t = Array.from(init.transfer);
        for (const b of t) {
          if (b === inBuffer) {
            transfer = true;
            break;
          }
        }
      }
      let inData, byteOffset = 0;
      if (transfer) {
        inData = init.data;
        byteOffset = init.data.byteOffset || 0;
      } else {
        inData = init.data.slice(0);
      }
      const resourceReference = audioView(init.format, inData.buffer || inData, byteOffset);
      this._data = resourceReference;
    }
    this.duration = init.numberOfFrames / init.sampleRate * 1e6;
  }
  toNative(opts = {}) {
    const ret = new globalThis.AudioData({
      data: this._data,
      format: this.format,
      sampleRate: this.sampleRate,
      numberOfFrames: this.numberOfFrames,
      numberOfChannels: this.numberOfChannels,
      timestamp: this.timestamp,
      transfer: opts.transfer ? [this._data.buffer] : []
    });
    if (opts.transfer)
      this.close();
    return ret;
  }
  static fromNative(from2) {
    const ad = from2;
    const isInterleaved_ = isInterleaved(ad.format);
    const planes = isInterleaved_ ? 1 : ad.numberOfChannels;
    const sizePerPlane = ad.allocationSize({
      format: ad.format,
      planeIndex: 0
    });
    const data = new Uint8Array(sizePerPlane * planes);
    for (let p = 0;p < planes; p++) {
      ad.copyTo(data.subarray(p * sizePerPlane), {
        format: ad.format,
        planeIndex: p
      });
    }
    return new AudioData2({
      data,
      format: ad.format,
      sampleRate: ad.sampleRate,
      numberOfFrames: ad.numberOfFrames,
      numberOfChannels: ad.numberOfChannels,
      timestamp: ad.timestamp,
      transfer: [data.buffer]
    });
  }
  _libavGetData() {
    return this._data;
  }
  static _checkValidAudioDataInit(init) {
    if (init.sampleRate <= 0)
      throw new TypeError(`Invalid sample rate ${init.sampleRate}`);
    if (init.numberOfFrames <= 0)
      throw new TypeError(`Invalid number of frames ${init.numberOfFrames}`);
    if (init.numberOfChannels <= 0)
      throw new TypeError(`Invalid number of channels ${init.numberOfChannels}`);
    {
      const totalSamples = init.numberOfFrames * init.numberOfChannels;
      const bytesPerSample_ = bytesPerSample(init.format);
      const totalSize = bytesPerSample_ * totalSamples;
      const dataSize = init.data.byteLength;
      if (dataSize < totalSize)
        throw new TypeError(`This audio data must be at least ${totalSize} bytes`);
    }
  }
  allocationSize(options) {
    if (this._data === null)
      throw new DOMException("Detached", "InvalidStateError");
    const copyElementCount = this._computeCopyElementCount(options);
    let destFormat = this.format;
    if (options.format)
      destFormat = options.format;
    const bytesPerSample_ = bytesPerSample(destFormat);
    return bytesPerSample_ * copyElementCount;
  }
  _computeCopyElementCount(options) {
    let destFormat = this.format;
    if (options.format)
      destFormat = options.format;
    const isInterleaved_ = isInterleaved(destFormat);
    if (isInterleaved_) {
      if (options.planeIndex > 0)
        throw new RangeError("Invalid plane");
    } else if (options.planeIndex >= this.numberOfChannels)
      throw new RangeError("Invalid plane");
    if (this.format !== destFormat && destFormat !== "f32-planar")
      throw new DOMException("Only conversion to f32-planar is supported", "NotSupportedError");
    const frameCount = this.numberOfFrames;
    const frameOffset = options.frameOffset || 0;
    if (frameOffset >= frameCount)
      throw new RangeError("Frame offset out of range");
    let copyFrameCount = frameCount - frameOffset;
    if (typeof options.frameCount === "number") {
      if (options.frameCount >= copyFrameCount)
        throw new RangeError("Frame count out of range");
      copyFrameCount = options.frameCount;
    }
    let elementCount = copyFrameCount;
    if (isInterleaved_)
      elementCount *= this.numberOfChannels;
    return elementCount;
  }
  copyTo(destination, options) {
    if (this._data === null)
      throw new DOMException("Detached", "InvalidStateError");
    const copyElementCount = this._computeCopyElementCount(options);
    let destFormat = this.format;
    if (options.format)
      destFormat = options.format;
    const bytesPerSample_ = bytesPerSample(destFormat);
    if (bytesPerSample_ * copyElementCount > destination.byteLength)
      throw new RangeError("Buffer too small");
    const resource = this._data;
    const planeFrames = resource.subarray(options.planeIndex * this.numberOfFrames);
    const frameOffset = options.frameOffset || 0;
    const numberOfChannels = this.numberOfChannels;
    if (this.format === destFormat) {
      const dest = audioView(destFormat, destination.buffer || destination, destination.byteOffset || 0);
      if (isInterleaved(destFormat)) {
        dest.set(planeFrames.subarray(frameOffset * numberOfChannels, frameOffset * numberOfChannels + copyElementCount));
      } else {
        dest.set(planeFrames.subarray(frameOffset, frameOffset + copyElementCount));
      }
    } else {
      const out = audioView(destFormat, destination.buffer || destination, destination.byteOffset || 0);
      let sub = 0;
      let div = 1;
      switch (this.format) {
        case "u8":
        case "u8-planar":
          sub = 128;
          div = 128;
          break;
        case "s16":
        case "s16-planar":
          div = 32768;
          break;
        case "s32":
        case "s32-planar":
          div = 2147483648;
          break;
      }
      if (isInterleaved(this.format)) {
        for (let i = options.planeIndex + frameOffset * numberOfChannels, o = 0;o < copyElementCount; i += numberOfChannels, o++)
          out[o] = (planeFrames[i] - sub) / div;
      } else {
        for (let i = frameOffset, o = 0;o < copyElementCount; i++, o++)
          out[o] = (planeFrames[i] - sub) / div;
      }
    }
  }
  clone() {
    if (this._data === null)
      throw new DOMException("Detached", "InvalidStateError");
    return new AudioData2({
      format: this.format,
      sampleRate: this.sampleRate,
      numberOfFrames: this.numberOfFrames,
      numberOfChannels: this.numberOfChannels,
      timestamp: this.timestamp,
      data: this._data
    });
  }
  close() {
    this._data = null;
  }
}
function audioView(format, buffer, byteOffset) {
  switch (format) {
    case "u8":
    case "u8-planar":
      return new Uint8Array(buffer, byteOffset);
    case "s16":
    case "s16-planar":
      return new Int16Array(buffer, byteOffset);
    case "s32":
    case "s32-planar":
      return new Int32Array(buffer, byteOffset);
    case "f32":
    case "f32-planar":
      return new Float32Array(buffer, byteOffset);
    default:
      throw new TypeError("Invalid AudioSampleFormat");
  }
}
function bytesPerSample(format) {
  switch (format) {
    case "u8":
    case "u8-planar":
      return 1;
    case "s16":
    case "s16-planar":
      return 2;
    case "s32":
    case "s32-planar":
    case "f32":
    case "f32-planar":
      return 4;
    default:
      throw new TypeError("Invalid AudioSampleFormat");
  }
}
function isInterleaved(format) {
  switch (format) {
    case "u8":
    case "s16":
    case "s32":
    case "f32":
      return true;
    case "u8-planar":
    case "s16-planar":
    case "s32-planar":
    case "f32-planar":
      return false;
    default:
      throw new TypeError("Invalid AudioSampleFormat");
  }
}
var init_audio_data = __esm(() => {
  init_esm();
});

// node_modules/@kixelated/libavjs-webcodecs-polyfill/dist/event-target.js
class HasAEventTarget {
  constructor() {
    const ev = this._eventer = new EventTarget;
    this.addEventListener = ev.addEventListener.bind(ev);
    this.removeEventListener = ev.removeEventListener.bind(ev);
    this.dispatchEvent = ev.dispatchEvent.bind(ev);
  }
}
var DequeueEventTarget;
var init_event_target = __esm(() => {
  DequeueEventTarget = class DequeueEventTarget extends HasAEventTarget {
    constructor() {
      super();
      this.addEventListener("dequeue", (ev) => {
        if (this.ondequeue)
          this.ondequeue(ev);
      });
    }
  };
});

// node_modules/@kixelated/libavjs-webcodecs-polyfill/dist/avloader.js
function setLibAV(to) {
  LibAVWrapper = to;
}
function setLibAVOptions(to) {
  libavOptions = to;
}
function get() {
  return __awaiter(this, undefined, undefined, function* () {
    if (libavs.length)
      return libavs.shift();
    return yield LibAVWrapper.LibAV(libavOptions);
  });
}
function free(libav2) {
  libavs.push(libav2);
}
function codecs(encoders2) {
  return __awaiter(this, undefined, undefined, function* () {
    const libav2 = yield get();
    const ret = [];
    for (const [avname, codec] of [
      ["flac", "flac"],
      ["libopus", "opus"],
      ["libvorbis", "vorbis"],
      ["libaom-av1", "av01"],
      ["libvpx-vp9", "vp09"],
      ["libvpx", "vp8"]
    ]) {
      if (encoders2) {
        if (yield libav2.avcodec_find_encoder_by_name(avname))
          ret.push(codec);
      } else {
        if (yield libav2.avcodec_find_decoder_by_name(avname))
          ret.push(codec);
      }
    }
    free(libav2);
    return ret;
  });
}
function load() {
  return __awaiter(this, undefined, undefined, function* () {
    LibAVWrapper = LibAVWrapper || LibAV;
    decoders = yield codecs(false);
    encoders = yield codecs(true);
  });
}
function decoder(codec, config2) {
  if (typeof codec === "string") {
    codec = codec.replace(/\..*/, "");
    let outCodec = codec;
    switch (codec) {
      case "flac":
        if (typeof config2.description === "undefined") {
          return null;
        }
        break;
      case "opus":
        if (typeof config2.description !== "undefined") {
          return null;
        }
        outCodec = "libopus";
        break;
      case "vorbis":
        if (typeof config2.description === "undefined") {
          return null;
        }
        outCodec = "libvorbis";
        break;
      case "av01":
        outCodec = "libaom-av1";
        break;
      case "vp09":
        outCodec = "libvpx-vp9";
        break;
      case "vp8":
        outCodec = "libvpx";
        break;
      case "mp3":
      case "mp4a":
      case "ulaw":
      case "alaw":
      case "avc1":
      case "avc3":
      case "hev1":
      case "hvc1":
        return null;
      default:
        throw new TypeError("Unrecognized codec");
    }
    if (!(decoders.indexOf(codec) >= 0))
      return null;
    return { codec: outCodec };
  } else {
    return codec.libavjs;
  }
}
function encoder(codec, config2) {
  if (typeof codec === "string") {
    const codecParts = codec.split(".");
    codec = codecParts[0];
    let outCodec = codec;
    const ctx = {};
    const options = {};
    let video = false;
    switch (codec) {
      case "flac":
        ctx.sample_fmt = 2;
        ctx.bit_rate = 0;
        if (typeof config2.flac === "object" && config2.flac !== null) {
          const flac = config2.flac;
          if (typeof flac.blockSize === "number")
            ctx.frame_size = flac.blockSize;
          if (typeof flac.compressLevel === "number") {
            return null;
          }
        }
        break;
      case "opus":
        outCodec = "libopus";
        ctx.sample_fmt = 3;
        ctx.sample_rate = 48000;
        if (typeof config2.opus === "object" && config2.opus !== null) {
          const opus = config2.opus;
          if (typeof opus.frameDuration === "number")
            options.frame_duration = "" + opus.frameDuration / 1000;
          if (typeof opus.complexity !== "undefined") {
            return null;
          }
          if (typeof opus.packetlossperc === "number") {
            if (opus.packetlossperc < 0 || opus.packetlossperc > 100)
              return null;
            options.packet_loss = "" + opus.packetlossperc;
          }
          if (typeof opus.useinbandfec === "boolean")
            options.fec = opus.useinbandfec ? "1" : "0";
          if (typeof opus.usedtx === "boolean") {
            return null;
          }
          if (typeof opus.format === "string") {
            if (opus.format !== "opus")
              return null;
          }
        }
        break;
      case "vorbis":
        outCodec = "libvorbis";
        ctx.sample_fmt = 8;
        break;
      case "av01":
        video = true;
        outCodec = "libaom-av1";
        if (config2.latencyMode === "realtime") {
          options.usage = "realtime";
          options["cpu-used"] = "8";
        }
        if (!av1Advanced(codecParts, ctx))
          return null;
        break;
      case "vp09":
        video = true;
        outCodec = "libvpx-vp9";
        if (config2.latencyMode === "realtime") {
          options.quality = "realtime";
          options["cpu-used"] = "8";
        }
        if (!vp9Advanced(codecParts, ctx))
          return null;
        break;
      case "vp8":
        video = true;
        outCodec = "libvpx";
        if (config2.latencyMode === "realtime") {
          options.quality = "realtime";
          options["cpu-used"] = "8";
        }
        break;
      case "mp3":
      case "mp4a":
      case "ulaw":
      case "alaw":
      case "avc1":
        return null;
      default:
        throw new TypeError("Unrecognized codec");
    }
    if (!(encoders.indexOf(codec) >= 0))
      return null;
    if (video) {
      if (typeof ctx.pix_fmt !== "number")
        ctx.pix_fmt = 0;
      const width = ctx.width = config2.width;
      const height = ctx.height = config2.height;
      if (config2.framerate) {
        ctx.framerate_num = Math.round(config2.framerate);
        ctx.framerate_den = 1;
      }
      const dWidth = config2.displayWidth || config2.width;
      const dHeight = config2.displayHeight || config2.height;
      if (dWidth !== width || dHeight !== height) {
        ctx.sample_aspect_ratio_num = dWidth * height;
        ctx.sample_aspect_ratio_den = dHeight * width;
      }
    } else {
      if (!ctx.sample_rate)
        ctx.sample_rate = config2.sampleRate || 48000;
      if (config2.numberOfChannels) {
        const n = config2.numberOfChannels;
        ctx.channel_layout = n === 1 ? 4 : (1 << n) - 1;
      }
    }
    if (typeof ctx.bit_rate !== "number" && config2.bitrate) {
      ctx.bit_rate = config2.bitrate;
    }
    return {
      codec: outCodec,
      ctx,
      options
    };
  } else {
    return codec.libavjs;
  }
}
function av1Advanced(codecParts, ctx) {
  if (codecParts[1]) {
    const profile = +codecParts[1];
    if (profile >= 0 && profile <= 2)
      ctx.profile = profile;
    else
      throw new TypeError("Invalid AV1 profile");
  }
  if (codecParts[2]) {
    const level = +codecParts[2];
    if (level >= 0 && level <= 23)
      ctx.level = level;
    else
      throw new TypeError("Invalid AV1 level");
  }
  if (codecParts[3]) {
    switch (codecParts[3]) {
      case "M":
        break;
      case "H":
        if (ctx.level && ctx.level >= 8) {
          return false;
        } else {
          throw new TypeError("The AV1 high tier is only available for level 4.0 and up");
        }
        break;
      default:
        throw new TypeError("Invalid AV1 tier");
    }
  }
  if (codecParts[4]) {
    const depth = +codecParts[3];
    if (depth === 10 || depth === 12) {
      return false;
    } else if (depth !== 8) {
      throw new TypeError("Invalid AV1 bit depth");
    }
  }
  if (codecParts[5]) {
    switch (codecParts[5]) {
      case "0":
        break;
      case "1":
        return false;
      default:
        throw new TypeError("Invalid AV1 monochrome flag");
    }
  }
  if (codecParts[6]) {
    switch (codecParts[6]) {
      case "000":
        ctx.pix_fmt = 5;
        break;
      case "100":
        ctx.pix_fmt = 4;
        break;
      case "110":
        ctx.pix_fmt = 0;
        break;
      case "111":
        return false;
      default:
        throw new TypeError("Invalid AV1 subsampling mode");
    }
  }
  return true;
}
function vp9Advanced(codecParts, ctx) {
  if (codecParts[1]) {
    const profile = +codecParts[1];
    if (profile >= 0 && profile <= 3)
      ctx.profile = profile;
    else
      throw new TypeError("Invalid VP9 profile");
  }
  if (codecParts[2]) {
    const level = [+codecParts[2][0], +codecParts[2][1]];
    if (level[0] >= 1 && level[0] <= 4) {
      if (level[1] >= 0 && level[1] <= 1) {} else {
        throw new TypeError("Invalid VP9 level");
      }
    } else if (level[0] >= 5 && level[0] <= 6) {
      if (level[1] >= 0 && level[1] <= 2) {} else {
        throw new TypeError("Invalid VP9 level");
      }
    } else {
      throw new TypeError("Invalid VP9 level");
    }
    ctx.level = +codecParts[2];
  }
  if (codecParts[3]) {
    const depth = +codecParts[3];
    if (depth === 10 || depth === 12) {
      return false;
    } else if (depth !== 8) {
      throw new TypeError("Invalid VP9 bit depth");
    }
  }
  if (codecParts[4]) {
    const chromaMode = +codecParts[4];
    switch (chromaMode) {
      case 0:
      case 1:
        ctx.pix_fmt = 0;
        break;
      case 2:
        ctx.pix_fmt = 4;
        break;
      case 3:
        ctx.pix_fmt = 5;
        break;
      default:
        throw new TypeError("Invalid VP9 chroma subsampling format");
    }
  }
  return true;
}
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}, LibAVWrapper = null, libavs, libavOptions, decoders = null, encoders = null;
var init_avloader = __esm(() => {
  libavs = [];
  libavOptions = {};
});

// node_modules/@kixelated/libavjs-webcodecs-polyfill/dist/misc.js
function cloneConfig(config2, fields) {
  const ret = {};
  for (const field of fields) {
    if (field in config2)
      ret[field] = config2[field];
  }
  return ret;
}

// node_modules/@kixelated/libavjs-webcodecs-polyfill/dist/audio-decoder.js
var __awaiter2 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}, AudioDecoder2;
var init_audio_decoder = __esm(() => {
  init_audio_data();
  init_event_target();
  init_avloader();
  AudioDecoder2 = class AudioDecoder2 extends DequeueEventTarget {
    constructor(init) {
      super();
      this._p = Promise.all([]);
      this._libav = null;
      this._codec = this._c = this._pkt = this._frame = 0;
      this._output = init.output;
      this._error = init.error;
      this.state = "unconfigured";
      this.decodeQueueSize = 0;
    }
    configure(config2) {
      if (this.state === "closed")
        throw new DOMException("Decoder is closed", "InvalidStateError");
      if (this._libav)
        this._p = this._p.then(() => this._free());
      this.state = "configured";
      this._p = this._p.then(() => __awaiter2(this, undefined, undefined, function* () {
        let udesc = undefined;
        if (config2.description) {
          if (ArrayBuffer.isView(config2.description)) {
            const descView = config2.description;
            udesc = new Uint8Array(descView.buffer, descView.byteOffset, descView.byteLength);
          } else {
            const descBuf = config2.description;
            udesc = new Uint8Array(descBuf);
          }
        }
        const supported = decoder(config2.codec, config2);
        if (!supported) {
          this._closeAudioDecoder(new DOMException("Unsupported codec", "NotSupportedError"));
          return;
        }
        const libav2 = this._libav = yield get();
        const codecpara = yield libav2.avcodec_parameters_alloc();
        const ps = [
          libav2.AVCodecParameters_channels_s(codecpara, config2.numberOfChannels),
          libav2.AVCodecParameters_sample_rate_s(codecpara, config2.sampleRate),
          libav2.AVCodecParameters_codec_type_s(codecpara, 1)
        ];
        let extraDataPtr = 0;
        if (!udesc) {
          ps.push(libav2.AVCodecParameters_extradata_s(codecpara, 0));
          ps.push(libav2.AVCodecParameters_extradata_size_s(codecpara, 0));
        } else {
          ps.push(libav2.AVCodecParameters_extradata_size_s(codecpara, udesc.byteLength));
          extraDataPtr = yield libav2.calloc(udesc.byteLength + 64, 1);
          ps.push(libav2.copyin_u8(extraDataPtr, udesc));
          ps.push(libav2.AVCodecParameters_extradata_s(codecpara, extraDataPtr));
        }
        yield Promise.all(ps);
        [this._codec, this._c, this._pkt, this._frame] = yield libav2.ff_init_decoder(supported.codec, codecpara);
        const fps = [
          libav2.AVCodecContext_time_base_s(this._c, 1, 1000),
          libav2.avcodec_parameters_free_js(codecpara)
        ];
        if (extraDataPtr)
          fps.push(libav2.free(extraDataPtr));
        yield Promise.all(fps);
      })).catch(this._error);
    }
    _free() {
      return __awaiter2(this, undefined, undefined, function* () {
        if (this._c) {
          yield this._libav.ff_free_decoder(this._c, this._pkt, this._frame);
          this._codec = this._c = this._pkt = this._frame = 0;
        }
        if (this._libav) {
          free(this._libav);
          this._libav = null;
        }
      });
    }
    _closeAudioDecoder(exception) {
      this._resetAudioDecoder(exception);
      this.state = "closed";
      this._p = this._p.then(() => this._free());
      if (exception.name !== "AbortError")
        this._p = this._p.then(() => {
          this._error(exception);
        });
    }
    _resetAudioDecoder(exception) {
      if (this.state === "closed")
        throw new DOMException("Decoder closed", "InvalidStateError");
      this.state = "unconfigured";
      this._p = this._p.then(() => this._free());
    }
    decode(chunk) {
      if (this.state !== "configured")
        throw new DOMException("Unconfigured", "InvalidStateError");
      this.decodeQueueSize++;
      this._p = this._p.then(() => __awaiter2(this, undefined, undefined, function* () {
        const libav2 = this._libav;
        const c = this._c;
        const pkt = this._pkt;
        const frame = this._frame;
        let decodedOutputs = null;
        this.decodeQueueSize--;
        this.dispatchEvent(new CustomEvent("dequeue"));
        try {
          const ptsFull = Math.floor(chunk.timestamp / 1000);
          const [pts, ptshi] = libav2.f64toi64(ptsFull);
          const packet = {
            data: chunk._libavGetData(),
            pts,
            ptshi,
            dts: pts,
            dtshi: ptshi
          };
          if (chunk.duration) {
            packet.duration = Math.floor(chunk.duration / 1000);
            packet.durationhi = 0;
          }
          decodedOutputs = yield libav2.ff_decode_multi(c, pkt, frame, [packet]);
        } catch (ex) {
          this._p = this._p.then(() => {
            this._closeAudioDecoder(ex);
          });
          return;
        }
        if (decodedOutputs)
          this._outputAudioData(decodedOutputs);
      })).catch(this._error);
    }
    _outputAudioData(outputs) {
      const libav2 = this._libav;
      for (const frame of outputs) {
        let format;
        let planar = false;
        switch (frame.format) {
          case libav2.AV_SAMPLE_FMT_U8:
            format = "u8";
            break;
          case libav2.AV_SAMPLE_FMT_S16:
            format = "s16";
            break;
          case libav2.AV_SAMPLE_FMT_S32:
            format = "s32";
            break;
          case libav2.AV_SAMPLE_FMT_FLT:
            format = "f32";
            break;
          case libav2.AV_SAMPLE_FMT_U8P:
            format = "u8";
            planar = true;
            break;
          case libav2.AV_SAMPLE_FMT_S16P:
            format = "s16";
            planar = true;
            break;
          case libav2.AV_SAMPLE_FMT_S32P:
            format = "s32";
            planar = true;
            break;
          case libav2.AV_SAMPLE_FMT_FLTP:
            format = "f32";
            planar = true;
            break;
          default:
            throw new DOMException("Unsupported libav format!", "EncodingError");
        }
        const sampleRate = frame.sample_rate;
        const numberOfFrames = frame.nb_samples;
        const numberOfChannels = frame.channels;
        const timestamp = libav2.i64tof64(frame.pts, frame.ptshi) * 1000;
        let raw;
        if (planar) {
          let ct = 0;
          for (let i = 0;i < frame.data.length; i++)
            ct += frame.data[i].length;
          raw = new frame.data[0].constructor(ct);
          ct = 0;
          for (let i = 0;i < frame.data.length; i++) {
            const part = frame.data[i];
            raw.set(part, ct);
            ct += part.length;
          }
        } else {
          raw = frame.data;
        }
        const data = new AudioData2({
          format,
          sampleRate,
          numberOfFrames,
          numberOfChannels,
          timestamp,
          data: raw
        });
        this._output(data);
      }
    }
    flush() {
      if (this.state !== "configured")
        throw new DOMException("Invalid state", "InvalidStateError");
      const ret = this._p.then(() => __awaiter2(this, undefined, undefined, function* () {
        if (!this._c)
          return;
        const libav2 = this._libav;
        const c = this._c;
        const pkt = this._pkt;
        const frame = this._frame;
        let decodedOutputs = null;
        try {
          decodedOutputs = yield libav2.ff_decode_multi(c, pkt, frame, [], true);
        } catch (ex) {
          this._p = this._p.then(() => {
            this._closeAudioDecoder(ex);
          });
        }
        {
          if (decodedOutputs)
            this._outputAudioData(decodedOutputs);
        }
      }));
      this._p = ret;
      return ret;
    }
    reset() {
      this._resetAudioDecoder(new DOMException("Reset", "AbortError"));
    }
    close() {
      this._closeAudioDecoder(new DOMException("Close", "AbortError"));
    }
    static isConfigSupported(config2) {
      return __awaiter2(this, undefined, undefined, function* () {
        const dec = decoder(config2.codec, config2);
        let supported = false;
        if (dec) {
          const libav2 = yield get();
          try {
            const [, c, pkt, frame] = yield libav2.ff_init_decoder(dec.codec);
            yield libav2.ff_free_decoder(c, pkt, frame);
            supported = true;
          } catch (ex) {}
          yield free(libav2);
        }
        return {
          supported,
          config: cloneConfig(config2, ["codec", "sampleRate", "numberOfChannels"])
        };
      });
    }
  };
});

// node_modules/@kixelated/libavjs-webcodecs-polyfill/dist/audio-encoder.js
var __awaiter3 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}, AudioEncoder2;
var init_audio_encoder = __esm(() => {
  init_audio_data();
  init_event_target();
  init_avloader();
  AudioEncoder2 = class AudioEncoder2 extends DequeueEventTarget {
    constructor(init) {
      super();
      this._outputMetadata = null;
      this._outputMetadataFilled = false;
      this._pts = null;
      this._p = Promise.all([]);
      this._libav = null;
      this._codec = this._c = this._frame = this._pkt = 0;
      this._filter_in_ctx = this._filter_out_ctx = null;
      this._filter_graph = this._buffersrc_ctx = this._buffersink_ctx = 0;
      this._output = init.output;
      this._error = init.error;
      this.state = "unconfigured";
      this.encodeQueueSize = 0;
    }
    configure(config2) {
      const self2 = this;
      if (this.state === "closed")
        throw new DOMException("Encoder is closed", "InvalidStateError");
      if (this._libav)
        this._p = this._p.then(() => this._free());
      this.state = "configured";
      this._p = this._p.then(function() {
        return __awaiter3(this, undefined, undefined, function* () {
          const supported = encoder(config2.codec, config2);
          self2._outputMetadata = { decoderConfig: {
            codec: config2.codec,
            sampleRate: 0,
            numberOfChannels: 0
          } };
          self2._outputMetadataFilled = false;
          if (!supported) {
            self2._closeAudioEncoder(new DOMException("Unsupported codec", "NotSupportedError"));
            return;
          }
          const libav2 = self2._libav = yield get();
          let frame_size;
          [self2._codec, self2._c, self2._frame, self2._pkt, frame_size] = yield libav2.ff_init_encoder(supported.codec, supported);
          self2._pts = null;
          yield libav2.AVCodecContext_time_base_s(self2._c, 1, supported.ctx.sample_rate);
          self2._filter_out_ctx = {
            sample_rate: supported.ctx.sample_rate,
            sample_fmt: supported.ctx.sample_fmt,
            channel_layout: supported.ctx.channel_layout,
            frame_size
          };
        });
      }).catch(this._error);
    }
    _free() {
      return __awaiter3(this, undefined, undefined, function* () {
        if (this._filter_graph) {
          yield this._libav.avfilter_graph_free_js(this._filter_graph);
          this._filter_in_ctx = this._filter_out_ctx = null;
          this._filter_graph = this._buffersrc_ctx = this._buffersink_ctx = 0;
        }
        if (this._c) {
          yield this._libav.ff_free_encoder(this._c, this._frame, this._pkt);
          this._codec = this._c = this._frame = this._pkt = 0;
        }
        if (this._libav) {
          free(this._libav);
          this._libav = null;
        }
      });
    }
    _closeAudioEncoder(exception) {
      this._resetAudioEncoder(exception);
      this.state = "closed";
      this._p = this._p.then(() => this._free());
      if (exception.name !== "AbortError")
        this._p = this._p.then(() => {
          this._error(exception);
        });
    }
    _resetAudioEncoder(exception) {
      if (this.state === "closed")
        throw new DOMException("Encoder closed", "InvalidStateError");
      this.state = "unconfigured";
      this._p = this._p.then(() => this._free());
    }
    encode(data) {
      if (data._libavGetData() === null)
        throw new TypeError("Detached");
      if (this.state !== "configured")
        throw new DOMException("Unconfigured", "InvalidStateError");
      const dataClone = data.clone();
      this.encodeQueueSize++;
      this._p = this._p.then(() => __awaiter3(this, undefined, undefined, function* () {
        const libav2 = this._libav;
        const c = this._c;
        const pkt = this._pkt;
        const framePtr = this._frame;
        let encodedOutputs = null;
        this.encodeQueueSize--;
        this.dispatchEvent(new CustomEvent("dequeue"));
        try {
          let raw = dataClone._libavGetData();
          const nb_samples = dataClone.numberOfFrames;
          if (!isInterleaved(dataClone.format)) {
            let split = [];
            for (let i = 0;i < dataClone.numberOfChannels; i++)
              split.push(raw.subarray(i * nb_samples, (i + 1) * nb_samples));
            raw = split;
          }
          let format;
          switch (dataClone.format) {
            case "u8":
              format = libav2.AV_SAMPLE_FMT_U8;
              break;
            case "s16":
              format = libav2.AV_SAMPLE_FMT_S16;
              break;
            case "s32":
              format = libav2.AV_SAMPLE_FMT_S32;
              break;
            case "f32":
              format = libav2.AV_SAMPLE_FMT_FLT;
              break;
            case "u8-planar":
              format = libav2.AV_SAMPLE_FMT_U8P;
              break;
            case "s16-planar":
              format = libav2.AV_SAMPLE_FMT_S16P;
              break;
            case "s32-planar":
              format = libav2.AV_SAMPLE_FMT_S32P;
              break;
            case "f32-planar":
              format = libav2.AV_SAMPLE_FMT_FLTP;
              break;
            default:
              throw new TypeError("Invalid AudioSampleFormat");
          }
          const ptsFull = Math.floor(dataClone.timestamp / 1000);
          const [pts, ptshi] = libav2.f64toi64(ptsFull);
          const cc = dataClone.numberOfChannels;
          const channel_layout = cc === 1 ? 4 : (1 << cc) - 1;
          const sample_rate = dataClone.sampleRate;
          const frame = {
            data: raw,
            format,
            pts,
            ptshi,
            channel_layout,
            sample_rate
          };
          let preOutputs = null;
          if (this._filter_in_ctx) {
            const filter_ctx = this._filter_in_ctx;
            if (filter_ctx.sample_fmt !== frame.format || filter_ctx.channel_layout !== frame.channel_layout || filter_ctx.sample_rate !== frame.sample_rate) {
              let fframes2 = yield this._filter([], true);
              fframes2 = fframes2.filter((x) => {
                let frame_size;
                if (x.data[0].length) {
                  frame_size = x.data[0].length;
                } else {
                  frame_size = x.data.length / x.channels;
                }
                return frame_size === this._filter_out_ctx.frame_size;
              });
              if (fframes2.length) {
                preOutputs = yield libav2.ff_encode_multi(c, framePtr, pkt, fframes2);
              }
              yield libav2.avfilter_graph_free_js(this._filter_graph);
              this._filter_in_ctx = null;
              this._filter_graph = this._buffersrc_ctx = this._buffersink_ctx = 0;
            }
          }
          if (!this._filter_graph) {
            const filter_ctx = this._filter_in_ctx = {
              sample_rate: frame.sample_rate,
              sample_fmt: frame.format,
              channel_layout: frame.channel_layout
            };
            [this._filter_graph, this._buffersrc_ctx, this._buffersink_ctx] = yield libav2.ff_init_filter_graph("aresample", filter_ctx, this._filter_out_ctx);
          }
          const fframes = yield this._filter([frame]);
          encodedOutputs = yield libav2.ff_encode_multi(c, framePtr, pkt, fframes);
          if (preOutputs)
            encodedOutputs = preOutputs.concat(encodedOutputs);
          if (encodedOutputs.length && !this._outputMetadataFilled && fframes && fframes.length)
            yield this._getOutputMetadata(fframes[0]);
        } catch (ex) {
          this._p = this._p.then(() => {
            this._closeAudioEncoder(ex);
          });
        }
        if (encodedOutputs)
          this._outputEncodedAudioChunks(encodedOutputs);
      })).catch(this._error);
    }
    _filter(frames, fin = false) {
      return __awaiter3(this, undefined, undefined, function* () {
        if (frames.length && this._pts === null)
          this._pts = frames[0].pts || 0;
        const fframes = yield this._libav.ff_filter_multi(this._buffersrc_ctx, this._buffersink_ctx, this._frame, frames, fin);
        for (const frame of fframes) {
          frame.pts = this._pts;
          frame.ptshi = 0;
          this._pts += frame.nb_samples;
        }
        return fframes;
      });
    }
    _getOutputMetadata(frame) {
      return __awaiter3(this, undefined, undefined, function* () {
        const libav2 = this._libav;
        const c = this._c;
        const extradataPtr = yield libav2.AVCodecContext_extradata(c);
        const extradata_size = yield libav2.AVCodecContext_extradata_size(c);
        let extradata = null;
        if (extradataPtr && extradata_size)
          extradata = yield libav2.copyout_u8(extradataPtr, extradata_size);
        this._outputMetadata.decoderConfig.sampleRate = frame.sample_rate;
        this._outputMetadata.decoderConfig.numberOfChannels = frame.channels;
        if (extradata)
          this._outputMetadata.decoderConfig.description = extradata;
        this._outputMetadataFilled = true;
      });
    }
    _outputEncodedAudioChunks(packets) {
      const libav2 = this._libav;
      const sampleRate = this._filter_out_ctx.sample_rate;
      for (const packet of packets) {
        const data = packet.data;
        const type = packet.flags & 1 ? "key" : "delta";
        let timestamp = libav2.i64tof64(packet.pts, packet.ptshi);
        timestamp = Math.floor(timestamp / sampleRate * 1e6);
        let duration2;
        if (typeof packet.duration !== "undefined") {
          duration2 = libav2.i64tof64(packet.duration, packet.durationhi || 0);
          duration2 = Math.floor(duration2 / sampleRate * 1e6);
        }
        const chunk = new EncodedAudioChunk2({
          data,
          type,
          timestamp,
          duration: duration2
        });
        if (this._outputMetadataFilled)
          this._output(chunk, this._outputMetadata || undefined);
        else
          this._output(chunk);
      }
    }
    flush() {
      if (this.state !== "configured")
        throw new DOMException("Invalid state", "InvalidStateError");
      const ret = this._p.then(() => __awaiter3(this, undefined, undefined, function* () {
        if (!this._c)
          return;
        const libav2 = this._libav;
        const c = this._c;
        const frame = this._frame;
        const pkt = this._pkt;
        const buffersrc_ctx = this._buffersrc_ctx;
        const buffersink_ctx = this._buffersink_ctx;
        let encodedOutputs = null;
        try {
          let fframes = null;
          if (buffersrc_ctx)
            fframes = yield this._filter([], true);
          encodedOutputs = yield libav2.ff_encode_multi(c, frame, pkt, fframes || [], true);
          if (!this._outputMetadataFilled && fframes && fframes.length)
            yield this._getOutputMetadata(fframes[0]);
        } catch (ex) {
          this._p = this._p.then(() => {
            this._closeAudioEncoder(ex);
          });
        }
        {
          if (encodedOutputs)
            this._outputEncodedAudioChunks(encodedOutputs);
        }
      }));
      this._p = ret;
      return ret;
    }
    reset() {
      this._resetAudioEncoder(new DOMException("Reset", "AbortError"));
    }
    close() {
      this._closeAudioEncoder(new DOMException("Close", "AbortError"));
    }
    static isConfigSupported(config2) {
      return __awaiter3(this, undefined, undefined, function* () {
        const enc = encoder(config2.codec, config2);
        let supported = false;
        if (enc) {
          const libav2 = yield get();
          try {
            const [, c, frame, pkt] = yield libav2.ff_init_encoder(enc.codec, enc);
            yield libav2.ff_free_encoder(c, frame, pkt);
            supported = true;
          } catch (ex) {}
          yield free(libav2);
        }
        return {
          supported,
          config: cloneConfig(config2, ["codec", "sampleRate", "numberOfChannels", "bitrate"])
        };
      });
    }
  };
});

// node_modules/@kixelated/libavjs-webcodecs-polyfill/dist/encoded-video-chunk.js
var EncodedVideoChunk2;
var init_encoded_video_chunk = __esm(() => {
  EncodedVideoChunk2 = EncodedAudioChunk2;
});

// node_modules/@kixelated/libavjs-webcodecs-polyfill/dist/video-frame.js
class VideoFrame2 {
  constructor(data, init) {
    this.format = "I420";
    this.codedWidth = 0;
    this.codedHeight = 0;
    this.codedRect = null;
    this.visibleRect = null;
    this.displayWidth = 0;
    this.displayHeight = 0;
    this.timestamp = 0;
    this._layout = null;
    this._data = null;
    this._nonSquarePixels = false;
    this._sar_num = 1;
    this._sar_den = 1;
    if (data instanceof ArrayBuffer || data.buffer instanceof ArrayBuffer) {
      this._constructBuffer(data, init);
    } else if (data instanceof VideoFrame2 || globalThis.VideoFrame && data instanceof globalThis.VideoFrame) {
      const array2 = new Uint8Array(data.allocationSize());
      data.copyTo(array2);
      this._constructBuffer(array2, {
        transfer: [array2.buffer],
        format: data.format,
        codedHeight: data.codedHeight,
        codedWidth: data.codedWidth,
        colorSpace: data.colorSpace,
        visibleRect: (init === null || init === undefined ? undefined : init.visibleRect) || data.visibleRect,
        displayHeight: (init === null || init === undefined ? undefined : init.displayHeight) || data.displayHeight,
        displayWidth: (init === null || init === undefined ? undefined : init.displayWidth) || data.displayWidth,
        duration: (init === null || init === undefined ? undefined : init.duration) || data.duration,
        timestamp: (init === null || init === undefined ? undefined : init.timestamp) || data.timestamp,
        metadata: JSON.parse(JSON.stringify(init === null || init === undefined ? undefined : init.metadata))
      });
    } else if (data instanceof HTMLVideoElement) {
      if (data.readyState === HTMLVideoElement.prototype.HAVE_NOTHING || data.readyState === HTMLVideoElement.prototype.HAVE_METADATA) {
        throw new DOMException("Video is not ready for reading frames", "InvalidStateError");
      }
      if (data.networkState === data.NETWORK_EMPTY) {
        throw new DOMException("Video network state is empty", "InvalidStateError");
      }
      this._constructCanvas(data, Object.assign(Object.assign({}, init), { timestamp: (init === null || init === undefined ? undefined : init.timestamp) || data.currentTime * 1e6 }));
    } else {
      this._constructCanvas(data, init);
    }
  }
  _constructCanvas(image, init) {
    let width = 0, height = 0;
    if (image.naturalWidth) {
      width = image.naturalWidth;
      height = image.naturalHeight;
    } else if (image.videoWidth) {
      width = image.videoWidth;
      height = image.videoHeight;
    } else if (image.width) {
      width = image.width;
      height = image.height;
    }
    if (!width || !height)
      throw new DOMException("Could not determine dimensions", "InvalidStateError");
    if (offscreenCanvas === null) {
      if (typeof OffscreenCanvas !== "undefined") {
        offscreenCanvas = new OffscreenCanvas(width, height);
      } else {
        offscreenCanvas = document.createElement("canvas");
        offscreenCanvas.style.display = "none";
        document.body.appendChild(offscreenCanvas);
      }
    }
    offscreenCanvas.width = width;
    offscreenCanvas.height = height;
    const options = { desynchronized: true, willReadFrequently: true };
    const ctx = offscreenCanvas.getContext("2d", options);
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(image, 0, 0);
    this._constructBuffer(ctx.getImageData(0, 0, width, height).data, {
      format: "RGBA",
      codedWidth: width,
      codedHeight: height,
      timestamp: (init === null || init === undefined ? undefined : init.timestamp) || 0,
      duration: (init === null || init === undefined ? undefined : init.duration) || 0,
      layout: [{ offset: 0, stride: width * 4 }],
      displayWidth: (init === null || init === undefined ? undefined : init.displayWidth) || width,
      displayHeight: (init === null || init === undefined ? undefined : init.displayHeight) || height
    });
  }
  _constructBuffer(data, init) {
    VideoFrame2._checkValidVideoFrameBufferInit(init);
    const defaultRect = new DOMRect(0, 0, init.codedWidth, init.codedHeight);
    let overrideRect = undefined;
    if (init.visibleRect)
      overrideRect = DOMRect.fromRect(init.visibleRect);
    this.codedWidth = init.codedWidth;
    this.codedHeight = init.codedHeight;
    const parsedRect = this._parseVisibleRect(defaultRect, overrideRect || null);
    let optLayout = undefined;
    if (init.layout) {
      if (init.layout instanceof Array)
        optLayout = init.layout;
      else
        optLayout = Array.from(init.layout);
    }
    this.format = init.format;
    const combinedLayout = this._computeLayoutAndAllocationSize(parsedRect, optLayout || null);
    if (data.byteLength < combinedLayout.allocationSize)
      throw new TypeError("data is too small for layout");
    let transfer = false;
    if (init.transfer) {
      let inBuffer;
      if (data.buffer)
        inBuffer = data.buffer;
      else
        inBuffer = data;
      let t;
      if (init.transfer instanceof Array)
        t = init.transfer;
      else
        t = Array.from(init.transfer);
      for (const b of t) {
        if (b === inBuffer) {
          transfer = true;
          break;
        }
      }
    }
    const format = init.format;
    if (init.layout) {
      if (init.layout instanceof Array)
        this._layout = init.layout;
      else
        this._layout = Array.from(init.layout);
    } else {
      const numPlanes_ = numPlanes(format);
      const layout = [];
      let offset = 0;
      for (let i = 0;i < numPlanes_; i++) {
        const sampleWidth = horizontalSubSamplingFactor(format, i);
        const sampleHeight = verticalSubSamplingFactor(format, i);
        const stride = ~~(this.codedWidth / sampleWidth);
        layout.push({ offset, stride });
        offset += stride * ~~(this.codedHeight / sampleHeight);
      }
      this._layout = layout;
    }
    this._data = new Uint8Array(data.buffer || data, data.byteOffset || 0);
    if (!transfer) {
      const numPlanes_ = numPlanes(format);
      let layout = this._layout;
      let lo = 1 / 0;
      let hi = 0;
      for (let i = 0;i < numPlanes_; i++) {
        const plane = layout[i];
        let offset = plane.offset;
        if (offset < lo)
          lo = offset;
        const sampleHeight = verticalSubSamplingFactor(format, i);
        offset += plane.stride * ~~(this.codedHeight / sampleHeight);
        if (offset > hi)
          hi = offset;
      }
      if (lo !== 0) {
        layout = this._layout = layout.map((x) => ({
          offset: x.offset - lo,
          stride: x.stride
        }));
      }
      this._data = this._data.slice(lo, hi);
    }
    const resourceCodedWidth = init.codedWidth;
    const resourceCodedHeight = init.codedHeight;
    const resourceVisibleLeft = parsedRect.left;
    const resourceVisibleTop = parsedRect.top;
    {
      this.codedRect = new DOMRect(0, 0, resourceCodedWidth, resourceCodedHeight);
      this.visibleRect = parsedRect;
      if (init.visibleRect) {
        this.visibleRect = DOMRect.fromRect(init.visibleRect);
      } else {
        this.visibleRect = new DOMRect(0, 0, resourceCodedWidth, resourceCodedHeight);
      }
      if (typeof init.displayWidth === "number")
        this.displayWidth = init.displayWidth;
      else
        this.displayWidth = this.visibleRect.width;
      if (typeof init.displayHeight === "number")
        this.displayHeight = init.displayHeight;
      else
        this.displayHeight = this.visibleRect.height;
      if (this.displayWidth !== this.visibleRect.width || this.displayHeight !== this.visibleRect.height) {
        this._nonSquarePixels = true;
        this._sar_num = this.displayWidth * this.visibleRect.width;
        this._sar_den = this.displayHeight * this.visibleRect.height;
      } else {
        this._nonSquarePixels = false;
        this._sar_num = this._sar_den = 1;
      }
      this.timestamp = init.timestamp;
      this.duration = init.duration;
    }
  }
  toNative(opts = {}) {
    const ret = new globalThis.VideoFrame(this._data, {
      layout: this._layout,
      format: this.format,
      codedWidth: this.codedWidth,
      codedHeight: this.codedHeight,
      visibleRect: this.visibleRect,
      displayWidth: this.displayWidth,
      displayHeight: this.displayHeight,
      duration: this.duration,
      timestamp: this.timestamp,
      transfer: opts.transfer ? [this._data.buffer] : []
    });
    if (opts.transfer)
      this.close();
    return ret;
  }
  static fromNative(from2) {
    const vf = from2;
    const data = new Uint8Array(vf.allocationSize());
    vf.copyTo(data);
    return new VideoFrame2(data, {
      format: vf.format,
      codedWidth: vf.codedWidth,
      codedHeight: vf.codedHeight,
      visibleRect: vf.visibleRect,
      displayWidth: vf.displayWidth,
      displayHeight: vf.displayHeight,
      duration: vf.duration,
      timestamp: vf.timestamp
    });
  }
  _libavGetData() {
    return this._data;
  }
  _libavGetLayout() {
    return this._layout;
  }
  static _checkValidVideoFrameBufferInit(init) {
    if (!init.codedWidth || !init.codedHeight)
      throw new TypeError("Invalid coded dimensions");
    if (init.visibleRect) {
      const vr = DOMRect.fromRect(init.visibleRect);
      if (vr.x < 0 || !Number.isFinite(vr.x) || vr.y < 0 || !Number.isFinite(vr.y) || vr.width < 0 || !Number.isFinite(vr.width) || vr.height < 0 || !Number.isFinite(vr.height)) {
        throw new TypeError("Invalid visible rectangle");
      }
      if (vr.y + vr.height > init.codedHeight)
        throw new TypeError("Visible rectangle outside of coded height");
      if (vr.x + vr.width > init.codedWidth)
        throw new TypeError("Visible rectangle outside of coded width");
      if (init.displayWidth && !init.displayHeight || !init.displayWidth && !init.displayHeight || (init.displayWidth === 0 || init.displayHeight === 0))
        throw new TypeError("Invalid display dimensions");
    }
  }
  metadata() {
    if (this._data === null)
      throw new DOMException("Detached", "InvalidStateError");
    return null;
  }
  allocationSize(options = {}) {
    if (this._data === null)
      throw new DOMException("Detached", "InvalidStateError");
    if (this.format === null)
      throw new DOMException("Not supported", "NotSupportedError");
    const combinedLayout = this._parseVideoFrameCopyToOptions(options);
    return combinedLayout.allocationSize;
  }
  _parseVideoFrameCopyToOptions(options) {
    const defaultRect = this.visibleRect;
    let overrideRect = options.rect ? new DOMRect(options.rect.x, options.rect.y, options.rect.width, options.rect.height) : null;
    const parsedRect = this._parseVisibleRect(defaultRect, overrideRect);
    let optLayout = null;
    if (options.layout) {
      if (options.layout instanceof Array)
        optLayout = options.layout;
      else
        optLayout = Array.from(options.layout);
    }
    const combinedLayout = this._computeLayoutAndAllocationSize(parsedRect, optLayout);
    return combinedLayout;
  }
  _parseVisibleRect(defaultRect, overrideRect) {
    let sourceRect = defaultRect;
    if (overrideRect) {
      if (overrideRect.width === 0 || overrideRect.height === 0)
        throw new TypeError("Invalid rectangle");
      if (overrideRect.x + overrideRect.width > this.codedWidth)
        throw new TypeError("Invalid rectangle");
      if (overrideRect.y + overrideRect.height > this.codedHeight)
        throw new TypeError("Invalid rectangle");
      sourceRect = overrideRect;
    }
    const validAlignment = this._verifyRectOffsetAlignment(sourceRect);
    if (!validAlignment)
      throw new TypeError("Invalid alignment");
    return sourceRect;
  }
  _computeLayoutAndAllocationSize(parsedRect, layout) {
    let numPlanes_ = numPlanes(this.format);
    if (layout && layout.length !== numPlanes_)
      throw new TypeError("Invalid layout");
    let minAllocationSize = 0;
    let computedLayouts = [];
    let endOffsets = [];
    let planeIndex = 0;
    while (planeIndex < numPlanes_) {
      const sampleBytes_ = sampleBytes(this.format, planeIndex);
      const sampleWidth = horizontalSubSamplingFactor(this.format, planeIndex);
      const sampleHeight = verticalSubSamplingFactor(this.format, planeIndex);
      const computedLayout = {
        destinationOffset: 0,
        destinationStride: 0,
        sourceTop: Math.ceil(~~parsedRect.y / sampleHeight),
        sourceHeight: Math.ceil(~~parsedRect.height / sampleHeight),
        sourceLeftBytes: ~~(parsedRect.x / sampleWidth * sampleBytes_),
        sourceWidthBytes: ~~(parsedRect.width / sampleWidth * sampleBytes_)
      };
      if (layout) {
        const planeLayout = layout[planeIndex];
        if (planeLayout.stride < computedLayout.sourceWidthBytes)
          throw new TypeError("Invalid stride");
        computedLayout.destinationOffset = planeLayout.offset;
        computedLayout.destinationStride = planeLayout.stride;
      } else {
        computedLayout.destinationOffset = minAllocationSize;
        computedLayout.destinationStride = computedLayout.sourceWidthBytes;
      }
      const planeSize = computedLayout.destinationStride * computedLayout.sourceHeight;
      const planeEnd = planeSize + computedLayout.destinationOffset;
      if (planeSize >= 4294967296 || planeEnd >= 4294967296)
        throw new TypeError("Plane too large");
      endOffsets.push(planeEnd);
      if (planeEnd > minAllocationSize)
        minAllocationSize = planeEnd;
      let earlierPlaneIndex = 0;
      while (earlierPlaneIndex < planeIndex) {
        const earlierLayout = computedLayouts[earlierPlaneIndex];
        if (planeEnd <= earlierLayout.destinationOffset || endOffsets[earlierPlaneIndex] <= computedLayout.destinationOffset) {} else
          throw new TypeError("Invalid plane layout");
        earlierPlaneIndex++;
      }
      computedLayouts.push(computedLayout);
      planeIndex++;
    }
    const combinedLayout = {
      computedLayouts,
      allocationSize: minAllocationSize
    };
    return combinedLayout;
  }
  _verifyRectOffsetAlignment(rect) {
    if (!this.format)
      return true;
    let planeIndex = 0;
    const numPlanes_ = numPlanes(this.format);
    while (planeIndex < numPlanes_) {
      const sampleWidth = horizontalSubSamplingFactor(this.format, planeIndex);
      const sampleHeight = verticalSubSamplingFactor(this.format, planeIndex);
      const xw = rect.x / sampleWidth;
      if (xw !== ~~xw)
        return false;
      const yh = rect.y / sampleHeight;
      if (yh !== ~~yh)
        return false;
      planeIndex++;
    }
    return true;
  }
  copyTo(destination, options = {}) {
    return __awaiter4(this, undefined, undefined, function* () {
      const destBuf = new Uint8Array(destination.buffer || destination, destination.byteOffset || 0);
      if (this._data === null)
        throw new DOMException("Detached", "InvalidStateError");
      if (!this.format)
        throw new DOMException("No format", "NotSupportedError");
      const combinedLayout = this._parseVideoFrameCopyToOptions(options);
      if (destination.byteLength < combinedLayout.allocationSize)
        throw new TypeError("Insufficient space");
      let planeLayouts = [];
      {
        const numPlanes_ = numPlanes(this.format);
        let planeIndex = 0;
        while (planeIndex < combinedLayout.computedLayouts.length) {
          const sourceStride = this._layout[planeIndex].stride;
          const computedLayout = combinedLayout.computedLayouts[planeIndex];
          let sourceOffset = computedLayout.sourceTop * sourceStride;
          sourceOffset += computedLayout.sourceLeftBytes;
          let destinationOffset = computedLayout.destinationOffset;
          const rowBytes = computedLayout.sourceWidthBytes;
          const layout = {
            offset: computedLayout.destinationOffset,
            stride: computedLayout.destinationStride
          };
          let row = 0;
          while (row < computedLayout.sourceHeight) {
            destBuf.set(this._data.subarray(sourceOffset, sourceOffset + rowBytes), destinationOffset);
            sourceOffset += sourceStride;
            destinationOffset += computedLayout.destinationStride;
            row++;
          }
          planeIndex++;
          planeLayouts.push(layout);
        }
      }
      return planeLayouts;
    });
  }
  clone() {
    return new VideoFrame2(this._data, {
      format: this.format,
      codedWidth: this.codedWidth,
      codedHeight: this.codedHeight,
      timestamp: this.timestamp,
      duration: this.duration,
      layout: this._layout,
      transfer: [this._data.buffer]
    });
  }
  close() {
    this._data = null;
  }
}
function wcFormatToLibAVFormat(libav2, wcFormat) {
  let format = libav2.AV_PIX_FMT_RGBA;
  switch (wcFormat) {
    case "I420":
      format = libav2.AV_PIX_FMT_YUV420P;
      break;
    case "I420P10":
      format = 62;
      break;
    case "I420P12":
      format = 123;
      break;
    case "I420A":
      format = libav2.AV_PIX_FMT_YUVA420P;
      break;
    case "I420AP10":
      format = 87;
      break;
    case "I420AP12":
      throw new TypeError("YUV420P12 is not supported by libav");
      break;
    case "I422":
      format = libav2.AV_PIX_FMT_YUV422P;
      break;
    case "I422P10":
      format = 64;
      break;
    case "I422P12":
      format = 127;
      break;
    case "I422A":
      format = 78;
      break;
    case "I422AP10":
      format = 89;
      break;
    case "I422AP10":
      format = 186;
      break;
    case "I444":
      format = libav2.AV_PIX_FMT_YUV444P;
      break;
    case "I444P10":
      format = 68;
      break;
    case "I444P12":
      format = 131;
      break;
    case "I444A":
      format = 79;
      break;
    case "I444AP10":
      format = 91;
      break;
    case "I444AP12":
      format = 188;
      break;
    case "NV12":
      format = libav2.AV_PIX_FMT_NV12;
      break;
    case "RGBA":
      format = libav2.AV_PIX_FMT_RGBA;
      break;
    case "RGBX":
      format = 119;
      break;
    case "BGRA":
      format = libav2.AV_PIX_FMT_BGRA;
      break;
    case "BGRX":
      format = 121;
      break;
    default:
      throw new TypeError("Invalid VideoPixelFormat");
  }
  return format;
}
function numPlanes(format) {
  switch (format) {
    case "I420":
    case "I420P10":
    case "I420P12":
    case "I422":
    case "I422P10":
    case "I422P12":
    case "I444":
    case "I444P10":
    case "I444P12":
      return 3;
    case "I420A":
    case "I420AP10":
    case "I420AP12":
    case "I422A":
    case "I422AP10":
    case "I422AP12":
    case "I444A":
    case "I444AP10":
    case "I444AP12":
      return 4;
    case "NV12":
      return 2;
    case "RGBA":
    case "RGBX":
    case "BGRA":
    case "BGRX":
      return 1;
    default:
      throw new DOMException("Unsupported video pixel format", "NotSupportedError");
  }
}
function sampleBytes(format, planeIndex) {
  switch (format) {
    case "I420":
    case "I420A":
    case "I422":
    case "I422A":
    case "I444":
    case "I444A":
      return 1;
    case "I420P10":
    case "I420AP10":
    case "I422P10":
    case "I422AP10":
    case "I444P10":
    case "I444AP10":
    case "I420P12":
    case "I420AP12":
    case "I422P12":
    case "I422AP12":
    case "I444P12":
    case "I444AP12":
      return 2;
    case "NV12":
      if (planeIndex === 1)
        return 2;
      else
        return 1;
    case "RGBA":
    case "RGBX":
    case "BGRA":
    case "BGRX":
      return 4;
    default:
      throw new DOMException("Unsupported video pixel format", "NotSupportedError");
  }
}
function horizontalSubSamplingFactor(format, planeIndex) {
  if (planeIndex === 0)
    return 1;
  if (planeIndex === 3)
    return 1;
  switch (format) {
    case "I420":
    case "I420P10":
    case "I420P12":
    case "I420A":
    case "I420AP10":
    case "I420AP12":
    case "I422":
    case "I422P10":
    case "I422P12":
    case "I422A":
    case "I422AP10":
    case "I422AP12":
      return 2;
    case "I444":
    case "I444P10":
    case "I444P12":
    case "I444A":
    case "I444AP10":
    case "I444AP12":
      return 1;
    case "NV12":
      return 2;
    case "RGBA":
    case "RGBX":
    case "BGRA":
    case "BGRX":
      return 1;
    default:
      throw new DOMException("Unsupported video pixel format", "NotSupportedError");
  }
}
function verticalSubSamplingFactor(format, planeIndex) {
  if (planeIndex === 0)
    return 1;
  if (planeIndex === 3)
    return 1;
  switch (format) {
    case "I420":
    case "I420P10":
    case "I420P12":
    case "I420A":
    case "I420AP10":
    case "I420AP12":
      return 2;
    case "I422":
    case "I422P10":
    case "I422P12":
    case "I422A":
    case "I422AP10":
    case "I422AP12":
    case "I444":
    case "I444P10":
    case "I444P12":
    case "I444A":
    case "I444AP10":
    case "I444AP12":
      return 1;
    case "NV12":
      return 2;
    case "RGBA":
    case "RGBX":
    case "BGRA":
    case "BGRX":
      return 1;
    default:
      throw new DOMException("Unsupported video pixel format", "NotSupportedError");
  }
}
var __awaiter4 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}, offscreenCanvas = null;
var init_video_frame = __esm(() => {
  init_esm();
});

// node_modules/@kixelated/libavjs-webcodecs-polyfill/dist/video-decoder.js
var __awaiter5 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}, VideoDecoder2;
var init_video_decoder = __esm(() => {
  init_event_target();
  init_avloader();
  init_video_frame();
  VideoDecoder2 = class VideoDecoder2 extends DequeueEventTarget {
    constructor(init) {
      super();
      this._p = Promise.all([]);
      this._libav = null;
      this._codec = this._c = this._pkt = this._frame = 0;
      this._output = init.output;
      this._error = init.error;
      this.state = "unconfigured";
      this.decodeQueueSize = 0;
    }
    configure(config2) {
      if (this.state === "closed")
        throw new DOMException("Decoder is closed", "InvalidStateError");
      if (this._libav)
        this._p = this._p.then(() => this._free());
      this.state = "configured";
      this._p = this._p.then(() => __awaiter5(this, undefined, undefined, function* () {
        const supported = decoder(config2.codec, config2);
        if (!supported) {
          this._closeVideoDecoder(new DOMException("Unsupported codec", "NotSupportedError"));
          return;
        }
        const libav2 = this._libav = yield get();
        [this._codec, this._c, this._pkt, this._frame] = yield libav2.ff_init_decoder(supported.codec);
        yield libav2.AVCodecContext_time_base_s(this._c, 1, 1000);
      })).catch(this._error);
    }
    _free() {
      return __awaiter5(this, undefined, undefined, function* () {
        if (this._c) {
          yield this._libav.ff_free_decoder(this._c, this._pkt, this._frame);
          this._codec = this._c = this._pkt = this._frame = 0;
        }
        if (this._libav) {
          free(this._libav);
          this._libav = null;
        }
      });
    }
    _closeVideoDecoder(exception) {
      this._resetVideoDecoder(exception);
      this.state = "closed";
      this._p = this._p.then(() => this._free());
      if (exception.name !== "AbortError")
        this._p = this._p.then(() => {
          this._error(exception);
        });
    }
    _resetVideoDecoder(exception) {
      if (this.state === "closed")
        throw new DOMException("Decoder closed", "InvalidStateError");
      this.state = "unconfigured";
      this._p = this._p.then(() => this._free());
    }
    decode(chunk) {
      const self2 = this;
      if (this.state !== "configured")
        throw new DOMException("Unconfigured", "InvalidStateError");
      this.decodeQueueSize++;
      this._p = this._p.then(function() {
        return __awaiter5(this, undefined, undefined, function* () {
          const libav2 = self2._libav;
          const c = self2._c;
          const pkt = self2._pkt;
          const frame = self2._frame;
          let decodedOutputs = null;
          self2.decodeQueueSize--;
          self2.dispatchEvent(new CustomEvent("dequeue"));
          try {
            const ptsFull = Math.floor(chunk.timestamp / 1000);
            const [pts, ptshi] = libav2.f64toi64(ptsFull);
            const packet = {
              data: chunk._libavGetData(),
              pts,
              ptshi,
              dts: pts,
              dtshi: ptshi
            };
            if (chunk.duration) {
              packet.duration = Math.floor(chunk.duration / 1000);
              packet.durationhi = 0;
            }
            decodedOutputs = yield libav2.ff_decode_multi(c, pkt, frame, [packet]);
          } catch (ex) {
            self2._p = self2._p.then(() => {
              self2._closeVideoDecoder(ex);
            });
          }
          if (decodedOutputs)
            self2._outputVideoFrames(decodedOutputs);
        });
      }).catch(this._error);
    }
    _outputVideoFrames(frames) {
      const libav2 = this._libav;
      for (const frame of frames) {
        let format;
        switch (frame.format) {
          case libav2.AV_PIX_FMT_YUV420P:
            format = "I420";
            break;
          case 62:
            format = "I420P10";
            break;
          case 123:
            format = "I420P12";
            break;
          case libav2.AV_PIX_FMT_YUVA420P:
            format = "I420A";
            break;
          case 87:
            format = "I420AP10";
            break;
          case libav2.AV_PIX_FMT_YUV422P:
            format = "I422";
            break;
          case 64:
            format = "I422P10";
            break;
          case 127:
            format = "I422P12";
            break;
          case 78:
            format = "I422A";
            break;
          case 89:
            format = "I422AP10";
            break;
          case 186:
            format = "I422AP12";
            break;
          case libav2.AV_PIX_FMT_YUV444P:
            format = "I444";
            break;
          case 68:
            format = "I444P10";
            break;
          case 131:
            format = "I444P12";
            break;
          case 79:
            format = "I444A";
            break;
          case 91:
            format = "I444AP10";
            break;
          case 188:
            format = "I444AP12";
            break;
          case libav2.AV_PIX_FMT_NV12:
            format = "NV12";
            break;
          case libav2.AV_PIX_FMT_RGBA:
            format = "RGBA";
            break;
          case 119:
            format = "RGBX";
            break;
          case libav2.AV_PIX_FMT_BGRA:
            format = "BGRA";
            break;
          case 121:
            format = "BGRX";
            break;
          default:
            throw new DOMException("Unsupported libav format!", "EncodingError");
        }
        const codedWidth = frame.width;
        const codedHeight = frame.height;
        let visibleRect;
        if (frame.crop) {
          visibleRect = new DOMRect(frame.crop.left, frame.crop.top, codedWidth - frame.crop.left - frame.crop.right, codedHeight - frame.crop.top - frame.crop.bottom);
        } else {
          visibleRect = new DOMRect(0, 0, codedWidth, codedHeight);
        }
        let displayWidth = codedWidth;
        let displayHeight = codedHeight;
        if (frame.sample_aspect_ratio && frame.sample_aspect_ratio[0]) {
          const sar = frame.sample_aspect_ratio;
          if (sar[0] > sar[1])
            displayWidth = ~~(codedWidth * sar[0] / sar[1]);
          else
            displayHeight = ~~(codedHeight * sar[1] / sar[0]);
        }
        const timestamp = libav2.i64tof64(frame.pts, frame.ptshi) * 1000;
        const data = new VideoFrame2(frame.data, {
          layout: frame.layout,
          format,
          codedWidth,
          codedHeight,
          visibleRect,
          displayWidth,
          displayHeight,
          timestamp
        });
        this._output(data);
      }
    }
    flush() {
      if (this.state !== "configured")
        throw new DOMException("Invalid state", "InvalidStateError");
      const ret = this._p.then(() => __awaiter5(this, undefined, undefined, function* () {
        if (!this._c)
          return;
        const libav2 = this._libav;
        const c = this._c;
        const pkt = this._pkt;
        const frame = this._frame;
        let decodedOutputs = null;
        try {
          decodedOutputs = yield libav2.ff_decode_multi(c, pkt, frame, [], true);
        } catch (ex) {
          this._p = this._p.then(() => {
            this._closeVideoDecoder(ex);
          });
        }
        {
          if (decodedOutputs)
            this._outputVideoFrames(decodedOutputs);
        }
      }));
      this._p = ret;
      return ret;
    }
    reset() {
      this._resetVideoDecoder(new DOMException("Reset", "AbortError"));
    }
    close() {
      this._closeVideoDecoder(new DOMException("Close", "AbortError"));
    }
    static isConfigSupported(config2) {
      return __awaiter5(this, undefined, undefined, function* () {
        const dec = decoder(config2.codec, config2);
        let supported = false;
        if (dec) {
          const libav2 = yield get();
          try {
            const [, c, pkt, frame] = yield libav2.ff_init_decoder(dec.codec);
            yield libav2.ff_free_decoder(c, pkt, frame);
            supported = true;
          } catch (ex) {}
          yield free(libav2);
        }
        return {
          supported,
          config: cloneConfig(config2, ["codec", "codedWidth", "codedHeight"])
        };
      });
    }
  };
});

// node_modules/@kixelated/libavjs-webcodecs-polyfill/dist/video-encoder.js
var __awaiter6 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}, VideoEncoder2;
var init_video_encoder = __esm(() => {
  init_encoded_video_chunk();
  init_event_target();
  init_avloader();
  init_video_frame();
  VideoEncoder2 = class VideoEncoder2 extends DequeueEventTarget {
    constructor(init) {
      super();
      this._extradataSet = false;
      this._extradata = null;
      this._nonSquarePixels = false;
      this._sar_num = 1;
      this._sar_den = 1;
      this._p = Promise.all([]);
      this._libav = null;
      this._codec = this._c = this._frame = this._pkt = 0;
      this._output = init.output;
      this._error = init.error;
      this._metadata = null;
      this.state = "unconfigured";
      this.encodeQueueSize = 0;
    }
    configure(config2) {
      if (this.state === "closed")
        throw new DOMException("Encoder is closed", "InvalidStateError");
      if (this._libav)
        this._p = this._p.then(() => this._free());
      this.state = "configured";
      this._p = this._p.then(() => __awaiter6(this, undefined, undefined, function* () {
        const supported = encoder(config2.codec, config2);
        if (!supported) {
          this._closeVideoEncoder(new DOMException("Unsupported codec", "NotSupportedError"));
          return;
        }
        const libav2 = this._libav = yield get();
        this._metadata = {
          decoderConfig: {
            codec: supported.codec
          }
        };
        [this._codec, this._c, this._frame, this._pkt] = yield libav2.ff_init_encoder(supported.codec, supported);
        this._extradataSet = false;
        this._extradata = null;
        yield libav2.AVCodecContext_time_base_s(this._c, 1, 1000);
        const width = config2.width;
        const height = config2.height;
        this._sws = 0;
        this._swsFrame = 0;
        this._swsOut = {
          width,
          height,
          format: supported.ctx.pix_fmt
        };
        const dWidth = config2.displayWidth || width;
        const dHeight = config2.displayHeight || height;
        if (dWidth !== width || dHeight !== height) {
          this._nonSquarePixels = true;
          this._sar_num = dWidth * height;
          this._sar_den = dHeight * width;
        } else {
          this._nonSquarePixels = false;
        }
      })).catch(this._error);
    }
    _free() {
      return __awaiter6(this, undefined, undefined, function* () {
        if (this._sws) {
          yield this._libav.av_frame_free_js(this._swsFrame);
          yield this._libav.sws_freeContext(this._sws);
          this._sws = this._swsFrame = 0;
          this._swsIn = this._swsOut = undefined;
        }
        if (this._c) {
          yield this._libav.ff_free_encoder(this._c, this._frame, this._pkt);
          this._codec = this._c = this._frame = this._pkt = 0;
        }
        if (this._libav) {
          free(this._libav);
          this._libav = null;
        }
      });
    }
    _closeVideoEncoder(exception) {
      this._resetVideoEncoder(exception);
      this.state = "closed";
      this._p = this._p.then(() => this._free());
      if (exception.name !== "AbortError")
        this._p = this._p.then(() => {
          this._error(exception);
        });
    }
    _resetVideoEncoder(exception) {
      if (this.state === "closed")
        throw new DOMException("Encoder closed", "InvalidStateError");
      this.state = "unconfigured";
      this._p = this._p.then(() => this._free());
    }
    encode(frame, options = {}) {
      if (frame._libavGetData() === null)
        throw new TypeError("Detached");
      if (this.state !== "configured")
        throw new DOMException("Unconfigured", "InvalidStateError");
      const frameClone = frame.clone();
      this.encodeQueueSize++;
      this._p = this._p.then(() => __awaiter6(this, undefined, undefined, function* () {
        const libav2 = this._libav;
        const c = this._c;
        const pkt = this._pkt;
        const framePtr = this._frame;
        const swsOut = this._swsOut;
        let encodedOutputs = null;
        this.encodeQueueSize--;
        this.dispatchEvent(new CustomEvent("dequeue"));
        try {
          const format = wcFormatToLibAVFormat(libav2, frameClone.format);
          const rawU8 = frameClone._libavGetData();
          const layout = frameClone._libavGetLayout();
          const ptsFull = Math.floor(frameClone.timestamp / 1000);
          const [pts, ptshi] = libav2.f64toi64(ptsFull);
          const frame2 = {
            data: rawU8,
            layout,
            format,
            pts,
            ptshi,
            width: frameClone.codedWidth,
            height: frameClone.codedHeight,
            crop: {
              left: frameClone.visibleRect.left,
              right: frameClone.visibleRect.right,
              top: frameClone.visibleRect.top,
              bottom: frameClone.visibleRect.bottom
            },
            key_frame: options.keyFrame ? 1 : 0,
            pict_type: options.keyFrame ? 1 : 0
          };
          if (frame2.width !== swsOut.width || frame2.height !== swsOut.height || frame2.format !== swsOut.format) {
            if (frameClone._nonSquarePixels) {
              frame2.sample_aspect_ratio = [
                frameClone._sar_num,
                frameClone._sar_den
              ];
            }
            let sws = this._sws, swsIn = this._swsIn, swsFrame = this._swsFrame;
            if (!sws || frame2.width !== swsIn.width || frame2.height !== swsIn.height || frame2.format !== swsIn.format) {
              if (sws)
                yield libav2.sws_freeContext(sws);
              swsIn = {
                width: frame2.width,
                height: frame2.height,
                format: frame2.format
              };
              sws = yield libav2.sws_getContext(swsIn.width, swsIn.height, swsIn.format, swsOut.width, swsOut.height, swsOut.format, 2, 0, 0, 0);
              this._sws = sws;
              this._swsIn = swsIn;
              if (!swsFrame)
                this._swsFrame = swsFrame = yield libav2.av_frame_alloc();
            }
            const [, swsRes, , , , , , encRes] = yield Promise.all([
              libav2.ff_copyin_frame(framePtr, frame2),
              libav2.sws_scale_frame(sws, swsFrame, framePtr),
              this._nonSquarePixels ? libav2.AVFrame_sample_aspect_ratio_s(swsFrame, this._sar_num, this._sar_den) : null,
              libav2.AVFrame_pts_s(swsFrame, pts),
              libav2.AVFrame_ptshi_s(swsFrame, ptshi),
              libav2.AVFrame_key_frame_s(swsFrame, options.keyFrame ? 1 : 0),
              libav2.AVFrame_pict_type_s(swsFrame, options.keyFrame ? 1 : 0),
              libav2.avcodec_send_frame(c, swsFrame)
            ]);
            if (swsRes < 0 || encRes < 0)
              throw new Error("Encoding failed!");
            encodedOutputs = [];
            while (true) {
              const recv = yield libav2.avcodec_receive_packet(c, pkt);
              if (recv === -libav2.EAGAIN)
                break;
              else if (recv < 0)
                throw new Error("Encoding failed!");
              encodedOutputs.push(yield libav2.ff_copyout_packet(pkt));
            }
          } else {
            if (this._nonSquarePixels) {
              frame2.sample_aspect_ratio = [
                this._sar_num,
                this._sar_den
              ];
            }
            encodedOutputs = yield libav2.ff_encode_multi(c, framePtr, pkt, [frame2]);
          }
          if (encodedOutputs.length && !this._extradataSet)
            yield this._getExtradata();
        } catch (ex) {
          this._p = this._p.then(() => {
            this._closeVideoEncoder(ex);
          });
          return;
        }
        if (encodedOutputs)
          this._outputEncodedVideoChunks(encodedOutputs);
      })).catch(this._error);
    }
    _getExtradata() {
      return __awaiter6(this, undefined, undefined, function* () {
        const libav2 = this._libav;
        const c = this._c;
        const extradata = yield libav2.AVCodecContext_extradata(c);
        const extradata_size = yield libav2.AVCodecContext_extradata_size(c);
        if (extradata && extradata_size) {
          this._metadata.decoderConfig.description = this._extradata = yield libav2.copyout_u8(extradata, extradata_size);
        }
        this._extradataSet = true;
      });
    }
    _outputEncodedVideoChunks(packets) {
      const libav2 = this._libav;
      for (const packet of packets) {
        const type = packet.flags & 1 ? "key" : "delta";
        const timestamp = libav2.i64tof64(packet.pts, packet.ptshi) * 1000;
        const chunk = new EncodedVideoChunk2({
          type,
          timestamp,
          data: packet.data
        });
        if (this._extradataSet)
          this._output(chunk, this._metadata || undefined);
        else
          this._output(chunk);
      }
    }
    flush() {
      if (this.state !== "configured")
        throw new DOMException("Invalid state", "InvalidStateError");
      const ret = this._p.then(() => __awaiter6(this, undefined, undefined, function* () {
        if (!this._c)
          return;
        const libav2 = this._libav;
        const c = this._c;
        const frame = this._frame;
        const pkt = this._pkt;
        let encodedOutputs = null;
        try {
          encodedOutputs = yield libav2.ff_encode_multi(c, frame, pkt, [], true);
          if (!this._extradataSet)
            yield this._getExtradata();
        } catch (ex) {
          this._p = this._p.then(() => {
            this._closeVideoEncoder(ex);
          });
        }
        {
          if (encodedOutputs)
            this._outputEncodedVideoChunks(encodedOutputs);
        }
      }));
      this._p = ret;
      return ret;
    }
    reset() {
      this._resetVideoEncoder(new DOMException("Reset", "AbortError"));
    }
    close() {
      this._closeVideoEncoder(new DOMException("Close", "AbortError"));
    }
    static isConfigSupported(config2) {
      return __awaiter6(this, undefined, undefined, function* () {
        const enc = encoder(config2.codec, config2);
        let supported = false;
        if (enc) {
          const libav2 = yield get();
          try {
            const [, c, frame, pkt] = yield libav2.ff_init_encoder(enc.codec, enc);
            yield libav2.ff_free_encoder(c, frame, pkt);
            supported = true;
          } catch (ex) {}
          yield free(libav2);
        }
        return {
          supported,
          config: cloneConfig(config2, ["codec", "width", "height", "bitrate", "framerate", "latencyMode"])
        };
      });
    }
  };
});

// node_modules/@kixelated/libavjs-webcodecs-polyfill/dist/rendering.js
function load2(libavOptions2, polyfill) {
  return __awaiter7(this, undefined, undefined, function* () {
    if ("importScripts" in globalThis) {
      LibAVWrapper.nolibavworker = true;
    }
    scalerSync = yield LibAVWrapper.LibAV(Object.assign(Object.assign({}, libavOptions2), { noworker: true, yesthreads: false }));
    scalerAsync = yield LibAVWrapper.LibAV(libavOptions2);
    if ("CanvasRenderingContext2D" in globalThis) {
      origDrawImage = CanvasRenderingContext2D.prototype.drawImage;
      if (polyfill)
        CanvasRenderingContext2D.prototype.drawImage = drawImagePolyfill;
    }
    if ("OffscreenCanvasRenderingContext2D" in globalThis) {
      origDrawImageOffscreen = OffscreenCanvasRenderingContext2D.prototype.drawImage;
      if (polyfill)
        OffscreenCanvasRenderingContext2D.prototype.drawImage = drawImagePolyfillOffscreen;
    }
    origCreateImageBitmap = globalThis.createImageBitmap;
    if (polyfill)
      globalThis.createImageBitmap = createImageBitmap;
  });
}
function canvasDrawImage(ctx, image, ax, ay, sWidth, sHeight, dx, dy, dWidth, dHeight) {
  if (!image._data) {
    return origDrawImage.apply(ctx, Array.prototype.slice.call(arguments, 1));
  }
  let sx;
  let sy;
  if (typeof sWidth === "undefined") {
    dx = ax;
    dy = ay;
  } else if (typeof dx === "undefined") {
    dx = ax;
    dy = ay;
    dWidth = sWidth;
    dHeight = sHeight;
    sx = undefined;
    sy = undefined;
    sWidth = undefined;
    sHeight = undefined;
  } else {
    sx = ax;
    sy = ay;
  }
  if (typeof dWidth === "undefined") {
    dWidth = image.displayWidth;
    dHeight = image.displayHeight;
  }
  const format = wcFormatToLibAVFormat(scalerSync, image.format);
  const sctx = scalerSync.sws_getContext_sync(image.visibleRect.width, image.visibleRect.height, format, dWidth, dHeight, scalerSync.AV_PIX_FMT_RGBA, 2, 0, 0, 0);
  const inFrame = scalerSync.av_frame_alloc_sync();
  const outFrame = scalerSync.av_frame_alloc_sync();
  let rawU8;
  let layout;
  if (image._libavGetData) {
    rawU8 = image._libavGetData();
    layout = image._libavGetLayout();
  } else {
    rawU8 = image._data;
    layout = image._layout;
  }
  scalerSync.ff_copyin_frame_sync(inFrame, {
    data: rawU8,
    layout,
    format,
    width: image.codedWidth,
    height: image.codedHeight,
    crop: {
      left: image.visibleRect.left,
      right: image.visibleRect.right,
      top: image.visibleRect.top,
      bottom: image.visibleRect.bottom
    }
  });
  scalerSync.sws_scale_frame_sync(sctx, outFrame, inFrame);
  const frameData = scalerSync.ff_copyout_frame_video_imagedata_sync(outFrame);
  ctx.putImageData(frameData, dx, dy);
  scalerSync.av_frame_free_js_sync(outFrame);
  scalerSync.av_frame_free_js_sync(inFrame);
  scalerSync.sws_freeContext_sync(sctx);
}
function drawImagePolyfill(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
  if (image instanceof VideoFrame2) {
    return canvasDrawImage(this, image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  }
  return origDrawImage.apply(this, arguments);
}
function drawImagePolyfillOffscreen(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) {
  if (image instanceof VideoFrame2) {
    return canvasDrawImage(this, image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  }
  return origDrawImageOffscreen.apply(this, arguments);
}
function createImageBitmap(image, opts = {}) {
  if (!image._data) {
    return origCreateImageBitmap.apply(globalThis, arguments);
  }
  const format = wcFormatToLibAVFormat(scalerAsync, image.format);
  const dWidth = typeof opts.resizeWidth === "number" ? opts.resizeWidth : image.displayWidth;
  const dHeight = typeof opts.resizeHeight === "number" ? opts.resizeHeight : image.displayHeight;
  return (() => __awaiter7(this, undefined, undefined, function* () {
    const [sctx, inFrame, outFrame] = yield Promise.all([
      scalerAsync.sws_getContext(image.visibleRect.width, image.visibleRect.height, format, dWidth, dHeight, scalerAsync.AV_PIX_FMT_RGBA, 2, 0, 0, 0),
      scalerAsync.av_frame_alloc(),
      scalerAsync.av_frame_alloc()
    ]);
    let rawU8;
    let layout = undefined;
    if (image._libavGetData) {
      rawU8 = image._libavGetData();
      layout = image._libavGetLayout();
    } else if (image._data) {
      rawU8 = image._data;
      layout = image._layout;
    } else {
      rawU8 = new Uint8Array(image.allocationSize());
      yield image.copyTo(rawU8);
    }
    yield scalerAsync.ff_copyin_frame(inFrame, {
      data: rawU8,
      layout,
      format,
      width: image.codedWidth,
      height: image.codedHeight,
      crop: {
        left: image.visibleRect.left,
        right: image.visibleRect.right,
        top: image.visibleRect.top,
        bottom: image.visibleRect.bottom
      }
    }), yield scalerAsync.sws_scale_frame(sctx, outFrame, inFrame);
    const frameData = yield scalerAsync.ff_copyout_frame_video_imagedata(outFrame);
    yield Promise.all([
      scalerAsync.av_frame_free_js(outFrame),
      scalerAsync.av_frame_free_js(inFrame),
      scalerAsync.sws_freeContext(sctx)
    ]);
    return yield origCreateImageBitmap(frameData);
  }))();
}
var __awaiter7 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}, scalerSync = null, scalerAsync = null, origDrawImage = null, origDrawImageOffscreen = null, origCreateImageBitmap = null;
var init_rendering = __esm(() => {
  init_avloader();
  init_video_frame();
  init_esm();
});

// node_modules/@kixelated/libavjs-webcodecs-polyfill/dist/config.js
function getAudioDecoder(config2) {
  return __awaiter8(this, undefined, undefined, function* () {
    try {
      if (typeof globalThis.AudioDecoder !== "undefined" && (yield globalThis.AudioDecoder.isConfigSupported(config2)).supported) {
        return {
          AudioDecoder: globalThis.AudioDecoder,
          EncodedAudioChunk: globalThis.EncodedAudioChunk,
          AudioData: globalThis.AudioData
        };
      }
    } catch (ex) {}
    if ((yield AudioDecoder2.isConfigSupported(config2)).supported) {
      return {
        AudioDecoder: AudioDecoder2,
        EncodedAudioChunk: EncodedAudioChunk2,
        AudioData: AudioData2
      };
    }
    throw new UnsupportedException;
  });
}
function getVideoDecoder(config2) {
  return __awaiter8(this, undefined, undefined, function* () {
    try {
      if (typeof globalThis.VideoDecoder !== "undefined" && (yield globalThis.VideoDecoder.isConfigSupported(config2)).supported) {
        return {
          VideoDecoder: globalThis.VideoDecoder,
          EncodedVideoChunk: globalThis.EncodedVideoChunk,
          VideoFrame: globalThis.VideoFrame
        };
      }
    } catch (ex) {}
    if ((yield VideoDecoder2.isConfigSupported(config2)).supported) {
      return {
        VideoDecoder: VideoDecoder2,
        EncodedVideoChunk: EncodedVideoChunk2,
        VideoFrame: VideoFrame2
      };
    }
    throw new UnsupportedException;
  });
}
function getAudioEncoder(config2) {
  return __awaiter8(this, undefined, undefined, function* () {
    try {
      if (typeof globalThis.AudioEncoder !== "undefined" && (yield globalThis.AudioEncoder.isConfigSupported(config2)).supported) {
        return {
          AudioEncoder: globalThis.AudioEncoder,
          EncodedAudioChunk: globalThis.EncodedAudioChunk,
          AudioData: globalThis.AudioData
        };
      }
    } catch (ex) {}
    if ((yield AudioEncoder2.isConfigSupported(config2)).supported) {
      return {
        AudioEncoder: AudioEncoder2,
        EncodedAudioChunk: EncodedAudioChunk2,
        AudioData: AudioData2
      };
    }
    throw new UnsupportedException;
  });
}
function getVideoEncoder(config2) {
  return __awaiter8(this, undefined, undefined, function* () {
    try {
      if (typeof globalThis.VideoEncoder !== "undefined" && (yield globalThis.VideoEncoder.isConfigSupported(config2)).supported) {
        return {
          VideoEncoder: globalThis.VideoEncoder,
          EncodedVideoChunk: globalThis.EncodedVideoChunk,
          VideoFrame: globalThis.VideoFrame
        };
      }
    } catch (ex) {}
    if ((yield VideoEncoder2.isConfigSupported(config2)).supported) {
      return {
        VideoEncoder: VideoEncoder2,
        EncodedVideoChunk: EncodedVideoChunk2,
        VideoFrame: VideoFrame2
      };
    }
    throw new UnsupportedException;
  });
}
var __awaiter8 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}, UnsupportedException;
var init_config = __esm(() => {
  init_audio_data();
  init_audio_decoder();
  init_audio_encoder();
  init_encoded_video_chunk();
  init_video_frame();
  init_video_decoder();
  init_video_encoder();
  init_esm();
  UnsupportedException = class UnsupportedException extends Error {
    constructor() {
      super("The requested configuration is not supported");
    }
  };
});

// node_modules/@kixelated/libavjs-webcodecs-polyfill/dist/main.js
var exports_main = {};
__export(exports_main, {
  load: () => load3,
  getVideoEncoder: () => getVideoEncoder2,
  getVideoDecoder: () => getVideoDecoder2,
  getAudioEncoder: () => getAudioEncoder2,
  getAudioDecoder: () => getAudioDecoder2,
  createImageBitmap: () => createImageBitmap2,
  canvasDrawImage: () => canvasDrawImage2,
  VideoFrame: () => VideoFrame3,
  VideoEncoder: () => VideoEncoder3,
  VideoDecoder: () => VideoDecoder3,
  UnsupportedException: () => UnsupportedException2,
  EncodedVideoChunk: () => EncodedVideoChunk3,
  EncodedAudioChunk: () => EncodedAudioChunk3,
  AudioEncoder: () => AudioEncoder3,
  AudioDecoder: () => AudioDecoder3,
  AudioData: () => AudioData3
});
function load3(options = {}) {
  return __awaiter9(this, undefined, undefined, function* () {
    let libavOptions2 = {};
    if (options.libavOptions)
      Object.assign(libavOptions2, options.libavOptions);
    if (!options.LibAV && typeof globalThis.LibAV === "undefined") {
      yield new Promise((res, rej) => {
        libavOptions2.noworker = true;
        const libavBase = "https://cdn.jsdelivr.net/npm/@libav.js/variant-webm-vp9@6.7.7/dist";
        globalThis.LibAV = { base: libavBase };
        const libavVar = "libav-6.7.7.1.1-webm-vp9.js";
        if (typeof importScripts !== "undefined") {
          importScripts(`${libavBase}/${libavVar}`);
          res(undefined);
        } else {
          const scr = document.createElement("script");
          scr.src = `${libavBase}/${libavVar}`;
          scr.onload = res;
          scr.onerror = rej;
          document.body.appendChild(scr);
        }
      });
    }
    if (options.LibAV)
      setLibAV(options.LibAV);
    setLibAVOptions(libavOptions2);
    yield load();
    if (options.polyfill) {
      for (const exp of [
        ["EncodedAudioChunk", EncodedAudioChunk2],
        ["AudioData", AudioData2],
        ["AudioDecoder", AudioDecoder2],
        ["AudioEncoder", AudioEncoder2],
        ["EncodedVideoChunk", EncodedVideoChunk2],
        ["VideoFrame", VideoFrame2],
        ["VideoDecoder", VideoDecoder2],
        ["VideoEncoder", VideoEncoder2]
      ]) {
        if (!globalThis[exp[0]])
          globalThis[exp[0]] = exp[1];
      }
    }
    yield load2(libavOptions2, !!options.polyfill);
  });
}
var __awaiter9 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}, EncodedAudioChunk3, AudioData3, AudioDecoder3, AudioEncoder3, EncodedVideoChunk3, VideoFrame3, VideoDecoder3, VideoEncoder3, canvasDrawImage2, createImageBitmap2, UnsupportedException2, getAudioDecoder2, getVideoDecoder2, getAudioEncoder2, getVideoEncoder2;
var init_main = __esm(() => {
  init_audio_data();
  init_audio_decoder();
  init_audio_encoder();
  init_encoded_video_chunk();
  init_video_frame();
  init_video_decoder();
  init_video_encoder();
  init_rendering();
  init_config();
  init_avloader();
  init_esm();
  EncodedAudioChunk3 = EncodedAudioChunk2;
  AudioData3 = AudioData2;
  AudioDecoder3 = AudioDecoder2;
  AudioEncoder3 = AudioEncoder2;
  EncodedVideoChunk3 = EncodedVideoChunk2;
  VideoFrame3 = VideoFrame2;
  VideoDecoder3 = VideoDecoder2;
  VideoEncoder3 = VideoEncoder2;
  canvasDrawImage2 = canvasDrawImage;
  createImageBitmap2 = createImageBitmap;
  UnsupportedException2 = UnsupportedException;
  getAudioDecoder2 = getAudioDecoder;
  getVideoDecoder2 = getVideoDecoder;
  getAudioEncoder2 = getAudioEncoder;
  getVideoEncoder2 = getVideoEncoder;
});

// node_modules/@moq/signals/index.js
var DEV = typeof import.meta.env !== "undefined" && import.meta.env?.MODE !== "production";
var SIGNAL_BRAND = Symbol.for("@moq/signals");

class Signal {
  #value;
  #subscribers = new Set;
  #changed = new Set;
  #pending = false;
  #oldValue;
  #hasCapturedOldValue = false;
  #forceNotify = false;
  [SIGNAL_BRAND] = true;
  constructor(value) {
    this.#value = value;
  }
  static from(value) {
    if (typeof value === "object" && value !== null && SIGNAL_BRAND in value) {
      return value;
    }
    return new Signal(value);
  }
  get() {
    return this.#value;
  }
  peek() {
    return this.#value;
  }
  set(value, notify) {
    if (!this.#hasCapturedOldValue) {
      this.#oldValue = this.#value;
      this.#hasCapturedOldValue = true;
    }
    this.#value = value;
    if (notify === false)
      return;
    if (notify === true)
      this.#forceNotify = true;
    if (this.#subscribers.size === 0 && this.#changed.size === 0) {
      this.#hasCapturedOldValue = false;
      this.#oldValue = undefined;
      this.#forceNotify = false;
      return;
    }
    if (this.#pending)
      return;
    this.#pending = true;
    queueMicrotask(() => this.#flush());
  }
  #flush() {
    this.#pending = false;
    this.#hasCapturedOldValue = false;
    const old = this.#oldValue;
    this.#oldValue = undefined;
    const force = this.#forceNotify;
    this.#forceNotify = false;
    if (!force && isEqual(old, this.#value))
      return;
    const value = this.#value;
    const changed = this.#changed;
    this.#changed = new Set;
    for (const fn of this.#subscribers) {
      try {
        fn(value);
      } catch (error) {
        console.error("signal subscriber error", error);
      }
    }
    for (const fn of changed) {
      try {
        fn(value);
      } catch (error) {
        console.error("signal changed error", error);
      }
    }
  }
  update(fn, notify = true) {
    const value = fn(this.#value);
    this.set(value, notify);
  }
  mutate(fn, notify = true) {
    const r = fn(this.#value);
    this.set(this.#value, notify);
    return r;
  }
  subscribe(fn) {
    this.#subscribers.add(fn);
    if (DEV && this.#subscribers.size >= 100 && Number.isInteger(Math.log10(this.#subscribers.size))) {
      throw new Error("signal has too many subscribers; may be leaking");
    }
    return () => this.#subscribers.delete(fn);
  }
  changed(fn) {
    this.#changed.add(fn);
    return () => this.#changed.delete(fn);
  }
  next() {
    return new Promise((resolve) => {
      this.changed(resolve);
    });
  }
  watch(fn) {
    const dispose = this.subscribe(fn);
    queueMicrotask(() => fn(this.#value));
    return dispose;
  }
  static async race(...sigs) {
    const dispose = [];
    const result = await new Promise((resolve) => {
      for (const sig of sigs) {
        dispose.push(sig.changed(resolve));
      }
    });
    for (const fn of dispose)
      fn();
    return result;
  }
}

class Effect {
  static #finalizer = new FinalizationRegistry((debugInfo) => {
    console.warn(`Signals was garbage collected without being closed:
${debugInfo}`);
  });
  #fn;
  #dispose = [];
  #unwatch = [];
  #async = [];
  #stack;
  #scheduled = false;
  #stopped;
  #closed;
  #abort = new AbortController;
  constructor(fn) {
    if (DEV) {
      const debug = new Error("created here:").stack ?? "No stack";
      Effect.#finalizer.register(this, debug, this);
    }
    this.#fn = fn;
    if (DEV) {
      this.#stack = new Error().stack;
    }
    this.#stopped = Promise.withResolvers();
    this.#closed = Promise.withResolvers();
    if (fn) {
      this.#schedule();
    }
  }
  #schedule() {
    if (this.#scheduled)
      return;
    this.#scheduled = true;
    queueMicrotask(() => this.#run().catch((error) => {
      console.error("effect error", error, this.#stack);
    }));
  }
  async#run() {
    if (this.#dispose === undefined)
      return;
    this.#stopped.resolve();
    this.#abort.abort();
    this.#abort = new AbortController;
    this.#stopped = Promise.withResolvers();
    for (const unwatch of this.#unwatch)
      unwatch();
    this.#unwatch.length = 0;
    for (const fn of this.#dispose)
      fn();
    this.#dispose.length = 0;
    if (this.#async.length > 0) {
      try {
        let warn;
        const timeout = new Promise((resolve) => {
          warn = setTimeout(() => {
            if (DEV) {
              console.warn("spawn is still running after 5s; continuing anyway", this.#stack);
            }
            resolve();
          }, 5000);
        });
        await Promise.race([Promise.all(this.#async), timeout]);
        if (warn)
          clearTimeout(warn);
        this.#async.length = 0;
      } catch (error) {
        console.error("async effect error", error);
        if (this.#stack)
          console.error("stack", this.#stack);
      }
    }
    if (this.#dispose === undefined)
      return;
    this.#scheduled = false;
    if (this.#fn) {
      this.#fn(this);
      if (DEV && this.#dispose !== undefined && this.#unwatch.length === 0 && this.#dispose.length === 0 && this.#async.length === 0) {
        console.warn("Effect did not subscribe to any signals; it will never rerun.", this.#stack);
      }
    }
  }
  get(signal) {
    if (this.#dispose === undefined) {
      if (DEV) {
        console.warn("Effect.get called when closed, returning current value");
      }
      return signal.peek();
    }
    const value = signal.peek();
    const dispose = signal.changed(() => this.#schedule());
    this.#unwatch.push(dispose);
    return value;
  }
  set(signal, value, ...args) {
    if (this.#dispose === undefined) {
      if (DEV) {
        console.warn("Effect.set called when closed, ignoring");
      }
      return;
    }
    signal.set(value);
    const cleanup = args[0];
    const cleanupValue = cleanup === undefined ? undefined : cleanup;
    this.cleanup(() => signal.set(cleanupValue));
  }
  spawn(fn) {
    const promise = fn().catch((error) => {
      console.error("spawn error", error);
    });
    if (this.#dispose === undefined) {
      if (DEV) {
        console.warn("Effect.spawn called when closed");
      }
      return;
    }
    this.#async.push(promise);
  }
  timer(fn, ms) {
    if (this.#dispose === undefined) {
      if (DEV) {
        console.warn("Effect.timer called when closed, ignoring");
      }
      return;
    }
    let timeout;
    timeout = setTimeout(() => {
      timeout = undefined;
      fn();
    }, ms);
    this.cleanup(() => timeout && clearTimeout(timeout));
  }
  timeout(fn, ms) {
    if (this.#dispose === undefined) {
      if (DEV) {
        console.warn("Effect.timeout called when closed, ignoring");
      }
      return;
    }
    const effect = new Effect(fn);
    let timeout = setTimeout(() => {
      effect.close();
      timeout = undefined;
    }, ms);
    this.#dispose.push(() => {
      if (timeout) {
        clearTimeout(timeout);
        effect.close();
      }
    });
  }
  animate(fn) {
    if (this.#dispose === undefined) {
      if (DEV) {
        console.warn("Effect.animate called when closed, ignoring");
      }
      return;
    }
    let animate = requestAnimationFrame((now) => {
      fn(now);
      animate = undefined;
    });
    this.cleanup(() => {
      if (animate)
        cancelAnimationFrame(animate);
    });
  }
  interval(fn, ms) {
    if (this.#dispose === undefined) {
      if (DEV) {
        console.warn("Effect.interval called when closed, ignoring");
      }
      return;
    }
    const interval = setInterval(() => {
      fn();
    }, ms);
    this.cleanup(() => clearInterval(interval));
  }
  run(fn) {
    if (this.#dispose === undefined) {
      if (DEV) {
        console.warn("Effect.nested called when closed, ignoring");
      }
      return;
    }
    const effect = new Effect(fn);
    this.#dispose.push(() => effect.close());
  }
  effect(fn) {
    return this.run(fn);
  }
  computed(fn) {
    const computed = new Computed(fn);
    this.cleanup(() => computed.close());
    return computed;
  }
  getAll(signals) {
    const values = [];
    for (const signal of signals) {
      const value = this.get(signal);
      if (!value)
        return;
      values.push(value);
    }
    return values;
  }
  subscribe(signal, fn) {
    if (this.#dispose === undefined) {
      if (DEV) {
        console.warn("Effect.subscribe called when closed, running once");
      }
      fn(signal.peek());
      return;
    }
    this.run((effect) => {
      const value = effect.get(signal);
      fn(value);
    });
  }
  event(target, type, listener, options) {
    if (this.#dispose === undefined) {
      if (DEV) {
        console.warn("Effect.eventListener called when closed, ignoring");
      }
      return;
    }
    const signal = typeof options !== "boolean" && options?.signal ? AbortSignal.any([this.#abort.signal, options.signal]) : this.#abort.signal;
    const merged = typeof options === "boolean" ? { capture: options, signal } : { ...options, signal };
    target.addEventListener(type, listener, merged);
  }
  cleanup(fn) {
    if (this.#dispose === undefined) {
      if (DEV) {
        console.warn("Effect.cleanup called when closed, running immediately");
      }
      fn();
      return;
    }
    this.#dispose.push(fn);
  }
  close() {
    if (this.#dispose === undefined) {
      return;
    }
    this.#closed.resolve();
    this.#stopped.resolve();
    this.#abort.abort();
    for (const fn of this.#dispose)
      fn();
    this.#dispose = undefined;
    for (const signal of this.#unwatch)
      signal();
    this.#unwatch.length = 0;
    this.#async.length = 0;
    if (DEV) {
      Effect.#finalizer.unregister(this);
    }
  }
  get closed() {
    return this.#closed.promise;
  }
  get cancel() {
    return this.#stopped.promise;
  }
  get abort() {
    return this.#abort.signal;
  }
  proxy(dst, src) {
    this.subscribe(src, (value) => dst.update(() => value));
  }
}

class Computed {
  #signal = new Signal(undefined);
  #effect;
  constructor(fn) {
    this.#effect = new Effect((effect) => {
      this.#signal.set(fn(effect));
    });
  }
  peek() {
    return this.#signal.peek();
  }
  changed(fn) {
    return this.#signal.changed(fn);
  }
  subscribe(fn) {
    return this.#signal.subscribe(fn);
  }
  close() {
    this.#effect.close();
  }
}
function isEqual(a, b) {
  if (a === b)
    return true;
  if (a === null || b === null || typeof a !== "object" || typeof b !== "object")
    return false;
  const protoA = Object.getPrototypeOf(a);
  const protoB = Object.getPrototypeOf(b);
  if (protoA !== protoB)
    return false;
  if (protoA !== Object.prototype && protoA !== Array.prototype)
    return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length)
    return false;
  for (const key of keysA) {
    if (!isEqual(a[key], b[key]))
      return false;
  }
  return true;
}

// node_modules/@moq/net/announced.js
class AnnouncedState {
  queue = new Signal([]);
  closed = new Signal(false);
}

class Announced {
  state = new AnnouncedState;
  prefix;
  closed;
  constructor(prefix = empty()) {
    this.prefix = prefix;
    this.closed = new Promise((resolve) => {
      const dispose = this.state.closed.subscribe((closed) => {
        if (!closed)
          return;
        resolve(closed instanceof Error ? closed : undefined);
        dispose();
      });
    });
  }
  append(announcement) {
    if (this.state.closed.peek())
      throw new Error("announced is closed");
    this.state.queue.mutate((queue) => {
      queue.push(announcement);
    });
  }
  close(abort) {
    this.state.closed.set(abort ?? true);
    this.state.queue.mutate((queue) => {
      queue.length = 0;
    });
  }
  async next() {
    for (;; ) {
      const announce = this.state.queue.peek().shift();
      if (announce)
        return announce;
      const closed = this.state.closed.peek();
      if (closed instanceof Error)
        throw closed;
      if (closed)
        return;
      await Signal.race(this.state.queue, this.state.closed);
    }
  }
}
// node_modules/@moq/net/bandwidth.js
function createBandwidth() {
  return new Signal(undefined);
}
// node_modules/@moq/net/group.js
class GroupState {
  frames = new Signal([]);
  closed = new Signal(false);
  total = new Signal(0);
}

class Group {
  sequence;
  #state = new GroupState;
  closed;
  constructor(sequence) {
    this.sequence = sequence;
    this.closed = new Promise((resolve) => {
      const dispose = this.#state.closed.subscribe((closed) => {
        if (!closed)
          return;
        resolve(closed instanceof Error ? closed : undefined);
        dispose();
      });
    });
  }
  writeFrame(frame) {
    if (this.#state.closed.peek())
      throw new Error("group is closed");
    this.#state.frames.mutate((frames) => {
      frames.push(frame);
    });
    this.#state.total.update((total) => total + 1);
  }
  writeString(str) {
    this.writeFrame(new TextEncoder().encode(str));
  }
  writeJson(json) {
    this.writeString(JSON.stringify(json));
  }
  writeBool(bool) {
    this.writeFrame(new Uint8Array([bool ? 1 : 0]));
  }
  get done() {
    return this.#state.frames.peek().length === 0 && this.#state.closed.peek() !== false;
  }
  tryReadFrame() {
    return this.tryReadFrameSequence()?.data;
  }
  tryReadFrameSequence() {
    const frames = this.#state.frames.peek();
    const data = frames.shift();
    if (data === undefined)
      return;
    return { sequence: this.#state.total.peek() - frames.length - 1, data };
  }
  async readable() {
    for (;; ) {
      if (this.#state.frames.peek().length > 0)
        return;
      if (this.#state.closed.peek())
        return;
      await Signal.race(this.#state.frames, this.#state.closed);
    }
  }
  async readFrame() {
    return (await this.readFrameSequence())?.data;
  }
  async readFrameSequence() {
    for (;; ) {
      const next = this.tryReadFrameSequence();
      if (next)
        return next;
      const closed = this.#state.closed.peek();
      if (closed instanceof Error)
        throw closed;
      if (closed)
        return;
      await this.readable();
    }
  }
  async readString() {
    const frame = await this.readFrame();
    return frame ? new TextDecoder().decode(frame) : undefined;
  }
  async readJson() {
    const frame = await this.readString();
    return frame ? JSON.parse(frame) : undefined;
  }
  async readBool() {
    const frame = await this.readFrame();
    return frame ? frame[0] === 1 : undefined;
  }
  close(abort) {
    this.#state.closed.set(abort ?? true);
  }
}

// node_modules/@moq/net/track.js
class TrackState {
  groups = new Signal([]);
  closed = new Signal(false);
  priority = new Signal(undefined);
}

class Track {
  name;
  state = new TrackState;
  #next;
  #nextSequence = 0;
  closed;
  constructor(name) {
    this.name = name;
    this.closed = new Promise((resolve) => {
      const dispose = this.state.closed.subscribe((closed) => {
        if (!closed)
          return;
        resolve(closed instanceof Error ? closed : undefined);
        dispose();
      });
    });
  }
  appendGroup() {
    if (this.state.closed.peek())
      throw new Error("track is closed");
    const group = new Group(this.#next ?? 0);
    this.#next = group.sequence + 1;
    this.state.groups.mutate((groups) => {
      groups.push(group);
      groups.sort((a, b) => a.sequence - b.sequence);
    });
    return group;
  }
  writeGroup(group) {
    if (this.state.closed.peek())
      throw new Error("track is closed");
    if (group.sequence >= (this.#next ?? 0)) {
      this.#next = group.sequence + 1;
    }
    this.state.groups.mutate((groups) => {
      groups.push(group);
      groups.sort((a, b) => a.sequence - b.sequence);
    });
  }
  writeFrame(frame) {
    const group = this.appendGroup();
    group.writeFrame(frame);
    group.close();
  }
  writeString(str) {
    const group = this.appendGroup();
    group.writeString(str);
    group.close();
  }
  writeJson(json) {
    const group = this.appendGroup();
    group.writeJson(json);
    group.close();
  }
  writeBool(bool) {
    const group = this.appendGroup();
    group.writeBool(bool);
    group.close();
  }
  async recvGroup() {
    for (;; ) {
      const groups = this.state.groups.peek();
      if (groups.length > 0) {
        return groups.shift();
      }
      const closed = this.state.closed.peek();
      if (closed instanceof Error)
        throw closed;
      if (closed)
        return;
      await Signal.race(this.state.groups, this.state.closed);
    }
  }
  async nextGroup() {
    return this.recvGroup();
  }
  async nextGroupOrdered() {
    for (;; ) {
      const group = await this.recvGroup();
      if (!group)
        return;
      if (group.sequence < this.#nextSequence) {
        group.close();
        continue;
      }
      this.#nextSequence = group.sequence + 1;
      return group;
    }
  }
  async readFrame() {
    return (await this.readFrameSequence())?.data;
  }
  async readFrameSequence() {
    for (;; ) {
      const groups = this.state.groups.peek();
      while (groups.length > 1) {
        const next2 = groups[0].tryReadFrameSequence();
        if (next2) {
          return { group: groups[0].sequence, frame: next2.sequence, data: next2.data };
        }
        groups.shift()?.close();
      }
      if (groups.length === 0) {
        const closed2 = this.state.closed.peek();
        if (closed2 instanceof Error)
          throw closed2;
        if (closed2)
          return;
        await Signal.race(this.state.groups, this.state.closed);
        continue;
      }
      const group = groups[0];
      const next = group.tryReadFrameSequence();
      if (next) {
        return { group: group.sequence, frame: next.sequence, data: next.data };
      }
      const closed = this.state.closed.peek();
      if (closed instanceof Error)
        throw closed;
      if (closed)
        return;
      if (group.done) {
        await Signal.race(this.state.groups, this.state.closed);
      } else {
        await Promise.race([Signal.race(this.state.groups, this.state.closed), group.readable()]);
      }
    }
  }
  async readString() {
    const next = await this.readFrame();
    if (!next)
      return;
    return new TextDecoder().decode(next);
  }
  async readJson() {
    const next = await this.readString();
    if (!next)
      return;
    return JSON.parse(next);
  }
  async readBool() {
    const next = await this.readFrame();
    if (!next)
      return;
    if (next.byteLength !== 1 || !(next[0] === 0 || next[0] === 1))
      throw new Error("invalid bool frame");
    return next[0] === 1;
  }
  updatePriority(priority) {
    this.state.priority.set(priority, true);
  }
  close(abort) {
    this.state.closed.set(abort ?? true);
    for (const group of this.state.groups.peek()) {
      group.close(abort);
    }
  }
}

// node_modules/@moq/net/broadcast.js
class BroadcastState {
  requested = new Signal([]);
  closed = new Signal(false);
}

class Broadcast {
  state = new BroadcastState;
  closed;
  constructor() {
    this.closed = new Promise((resolve) => {
      const dispose = this.state.closed.subscribe((closed) => {
        if (!closed)
          return;
        resolve(closed instanceof Error ? closed : undefined);
        dispose();
      });
    });
  }
  async requested() {
    for (;; ) {
      const track = this.state.requested.peek().pop();
      if (track)
        return track;
      const closed = this.state.closed.peek();
      if (closed instanceof Error)
        throw closed;
      if (closed)
        return;
      await Signal.race(this.state.requested, this.state.closed);
    }
  }
  subscribe(name, priority) {
    const track = new Track(name);
    if (this.state.closed.peek()) {
      throw new Error(`broadcast is closed: ${this.state.closed.peek()}`);
    }
    this.state.requested.mutate((requested) => {
      requested.push({ track, priority });
      requested.sort((a, b) => a.priority - b.priority);
    });
    return track;
  }
  close(abort) {
    this.state.closed.set(abort ?? true);
    for (const { track } of this.state.requested.peek()) {
      track.close(abort);
    }
    this.state.requested.mutate((requested) => {
      requested.length = 0;
    });
  }
}
// node_modules/@moq/net/connection/index.js
var exports_connection = {};
__export(exports_connection, {
  connect: () => connect,
  certificateHash: () => certificateHash,
  accept: () => accept,
  Reload: () => Reload
});

// node_modules/async-mutex/index.mjs
var E_TIMEOUT = new Error("timeout while waiting for mutex to become available");
var E_ALREADY_LOCKED = new Error("mutex already locked");
var E_CANCELED = new Error("request for lock canceled");
var __awaiter$2 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

class Semaphore {
  constructor(_value, _cancelError = E_CANCELED) {
    this._value = _value;
    this._cancelError = _cancelError;
    this._queue = [];
    this._weightedWaiters = [];
  }
  acquire(weight = 1, priority = 0) {
    if (weight <= 0)
      throw new Error(`invalid weight ${weight}: must be positive`);
    return new Promise((resolve, reject) => {
      const task = { resolve, reject, weight, priority };
      const i = findIndexFromEnd(this._queue, (other) => priority <= other.priority);
      if (i === -1 && weight <= this._value) {
        this._dispatchItem(task);
      } else {
        this._queue.splice(i + 1, 0, task);
      }
    });
  }
  runExclusive(callback_1) {
    return __awaiter$2(this, arguments, undefined, function* (callback, weight = 1, priority = 0) {
      const [value, release] = yield this.acquire(weight, priority);
      try {
        return yield callback(value);
      } finally {
        release();
      }
    });
  }
  waitForUnlock(weight = 1, priority = 0) {
    if (weight <= 0)
      throw new Error(`invalid weight ${weight}: must be positive`);
    if (this._couldLockImmediately(weight, priority)) {
      return Promise.resolve();
    } else {
      return new Promise((resolve) => {
        if (!this._weightedWaiters[weight - 1])
          this._weightedWaiters[weight - 1] = [];
        insertSorted(this._weightedWaiters[weight - 1], { resolve, priority });
      });
    }
  }
  isLocked() {
    return this._value <= 0;
  }
  getValue() {
    return this._value;
  }
  setValue(value) {
    this._value = value;
    this._dispatchQueue();
  }
  release(weight = 1) {
    if (weight <= 0)
      throw new Error(`invalid weight ${weight}: must be positive`);
    this._value += weight;
    this._dispatchQueue();
  }
  cancel() {
    this._queue.forEach((entry) => entry.reject(this._cancelError));
    this._queue = [];
  }
  _dispatchQueue() {
    this._drainUnlockWaiters();
    while (this._queue.length > 0 && this._queue[0].weight <= this._value) {
      this._dispatchItem(this._queue.shift());
      this._drainUnlockWaiters();
    }
  }
  _dispatchItem(item) {
    const previousValue = this._value;
    this._value -= item.weight;
    item.resolve([previousValue, this._newReleaser(item.weight)]);
  }
  _newReleaser(weight) {
    let called = false;
    return () => {
      if (called)
        return;
      called = true;
      this.release(weight);
    };
  }
  _drainUnlockWaiters() {
    if (this._queue.length === 0) {
      for (let weight = this._value;weight > 0; weight--) {
        const waiters = this._weightedWaiters[weight - 1];
        if (!waiters)
          continue;
        waiters.forEach((waiter) => waiter.resolve());
        this._weightedWaiters[weight - 1] = [];
      }
    } else {
      const queuedPriority = this._queue[0].priority;
      for (let weight = this._value;weight > 0; weight--) {
        const waiters = this._weightedWaiters[weight - 1];
        if (!waiters)
          continue;
        const i = waiters.findIndex((waiter) => waiter.priority <= queuedPriority);
        (i === -1 ? waiters : waiters.splice(0, i)).forEach((waiter) => waiter.resolve());
      }
    }
  }
  _couldLockImmediately(weight, priority) {
    return (this._queue.length === 0 || this._queue[0].priority < priority) && weight <= this._value;
  }
}
function insertSorted(a, v) {
  const i = findIndexFromEnd(a, (other) => v.priority <= other.priority);
  a.splice(i + 1, 0, v);
}
function findIndexFromEnd(a, predicate) {
  for (let i = a.length - 1;i >= 0; i--) {
    if (predicate(a[i])) {
      return i;
    }
  }
  return -1;
}
var __awaiter$1 = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

class Mutex {
  constructor(cancelError) {
    this._semaphore = new Semaphore(1, cancelError);
  }
  acquire() {
    return __awaiter$1(this, arguments, undefined, function* (priority = 0) {
      const [, releaser] = yield this._semaphore.acquire(1, priority);
      return releaser;
    });
  }
  runExclusive(callback, priority = 0) {
    return this._semaphore.runExclusive(() => callback(), 1, priority);
  }
  isLocked() {
    return this._semaphore.isLocked();
  }
  waitForUnlock(priority = 0) {
    return this._semaphore.waitForUnlock(1, priority);
  }
  release() {
    if (this._semaphore.isLocked())
      this._semaphore.release();
  }
  cancel() {
    return this._semaphore.cancel();
  }
}

// node_modules/@moq/net/ietf/adapter.js
init_stream();
init_varint();
init_namespace();
init_version();

class NativeSession {
  #quic;
  #requestId = 0n;
  version;
  constructor(quic, version) {
    this.#quic = quic;
    this.version = version;
  }
  async openBi() {
    return Stream.open(this.#quic, this.version);
  }
  async acceptBi() {
    return Stream.accept(this.#quic, this.version);
  }
  async nextRequestId() {
    const id = this.#requestId;
    this.#requestId += 2n;
    return id;
  }
}
var Route = {
  NewRequest: 0,
  Response: 1,
  ErrorResponse: 2,
  CloseStream: 3,
  FollowUp: 4,
  MaxRequestId: 5,
  Ignore: 6,
  GoAway: 7
};

class ControlStreamAdapter {
  #quic;
  #reader;
  #writer;
  #writeMutex = new Mutex;
  version;
  #streams = new Map;
  #namespaces = new Map;
  #namespacesByRequestId = new Map;
  #subscribeNamespaces = new Set;
  #incomingQueue = [];
  #incomingWaiters = [];
  #requestId = 0n;
  #maxRequestId;
  #maxRequestIdResolves = [];
  #closed = false;
  constructor(quic, controlStream, version, maxRequestId) {
    this.#quic = quic;
    this.#reader = controlStream.reader;
    this.#reader.version = version;
    this.#writer = controlStream.writer;
    this.#writer.version = version;
    this.version = version;
    this.#maxRequestId = maxRequestId;
  }
  async acceptBi() {
    if (this.#closed)
      return;
    const queued = this.#incomingQueue.shift();
    if (queued)
      return queued;
    return new Promise((resolve) => {
      this.#incomingWaiters.push(resolve);
    });
  }
  openBi() {
    let controller;
    let registeredRequestId;
    const readable = new ReadableStream({
      start(c) {
        controller = c;
      },
      cancel: () => {
        if (registeredRequestId !== undefined) {
          this.#streams.delete(registeredRequestId);
        }
      }
    });
    let buffer = new Uint8Array(0);
    let registered = false;
    const sendWritable = new WritableStream({
      write: async (chunk) => {
        const newBuf = new Uint8Array(buffer.length + chunk.length);
        newBuf.set(buffer);
        newBuf.set(chunk, buffer.length);
        buffer = newBuf;
        for (;; ) {
          const boundary = this.#messageSize(buffer);
          if (boundary === undefined)
            break;
          const toFlush = buffer.subarray(0, boundary);
          buffer = buffer.subarray(boundary);
          if (!registered) {
            const parsed = this.#tryParseOutgoing(toFlush);
            if (parsed) {
              registeredRequestId = parsed.requestId;
              this.#streams.set(parsed.requestId, { controller });
              registered = true;
            }
          }
          await this.#writeMutex.runExclusive(() => this.#writer.write(toFlush));
        }
      }
    });
    const stream = new Stream({ readable, writable: sendWritable });
    stream.reader.version = this.version;
    stream.writer.version = this.version;
    return stream;
  }
  async openNativeBi() {
    return Stream.open(this.#quic, this.version);
  }
  async nextRequestId() {
    for (;; ) {
      if (this.#closed)
        return;
      const id = this.#requestId;
      if (id < this.#maxRequestId) {
        this.#requestId += 2n;
        return id;
      }
      await new Promise((resolve) => {
        this.#maxRequestIdResolves.push(resolve);
      });
    }
  }
  async run() {
    try {
      if (this.version === Version.DRAFT_16) {
        this.#acceptNativeBidis();
      }
      for (;; ) {
        const done = await this.#reader.done();
        if (done)
          break;
        const typeId = await this.#reader.u53();
        const size2 = await this.#reader.u16();
        const body = await this.#reader.read(size2);
        const classified = await this.#classify(typeId, body);
        if (classified.route === Route.GoAway) {
          console.warn("received GOAWAY on control stream");
          return;
        }
        const { route, requestId } = classified;
        switch (route) {
          case Route.NewRequest:
            this.#newRequest(typeId, size2, body, requestId);
            break;
          case Route.Response:
            this.#pushMessage(requestId, typeId, size2, body);
            break;
          case Route.ErrorResponse:
            this.#pushMessage(requestId, typeId, size2, body);
            this.#closeStream(requestId);
            break;
          case Route.CloseStream:
            this.#closeStream(requestId);
            break;
          case Route.FollowUp:
            this.#pushMessage(requestId, typeId, size2, body);
            break;
          case Route.MaxRequestId:
            this.#maxRequestId = requestId;
            for (const resolve of this.#maxRequestIdResolves)
              resolve();
            this.#maxRequestIdResolves = [];
            break;
        }
      }
    } finally {
      this.close();
    }
  }
  async#acceptNativeBidis() {
    try {
      for (;; ) {
        const stream = await Stream.accept(this.#quic, this.version);
        if (!stream)
          break;
        const waiter = this.#incomingWaiters.shift();
        if (waiter) {
          waiter(stream);
        } else {
          this.#incomingQueue.push(stream);
        }
      }
    } catch {}
  }
  #newRequest(typeId, size2, body, requestId) {
    let controller;
    const readable = new ReadableStream({
      start(c) {
        controller = c;
      },
      cancel: () => {
        this.#streams.delete(requestId);
      }
    });
    const sendWritable = this.#createSendWritable();
    const stream = new Stream({ readable, writable: sendWritable });
    stream.reader.version = this.version;
    stream.writer.version = this.version;
    this.#streams.set(requestId, { controller });
    controller.enqueue(this.#encodeRaw(typeId, size2, body));
    const waiter = this.#incomingWaiters.shift();
    if (waiter) {
      waiter(stream);
    } else {
      this.#incomingQueue.push(stream);
    }
  }
  #pushMessage(requestId, typeId, size2, body) {
    const entry = this.#streams.get(requestId);
    if (!entry) {
      console.warn(`adapter: no stream for requestId=${requestId} typeId=0x${typeId.toString(16)}`);
      return;
    }
    try {
      entry.controller.enqueue(this.#encodeRaw(typeId, size2, body));
    } catch {}
  }
  #closeStream(requestId) {
    const entry = this.#streams.get(requestId);
    if (!entry)
      return;
    console.debug(`adapter: closing stream requestId=${requestId}`);
    this.#streams.delete(requestId);
    this.#subscribeNamespaces.delete(requestId);
    const namespace = this.#namespacesByRequestId.get(requestId);
    if (namespace !== undefined) {
      this.#namespaces.delete(namespace);
      this.#namespacesByRequestId.delete(requestId);
    }
    try {
      entry.controller.close();
    } catch {}
  }
  #messageSize(buffer) {
    if (buffer.length === 0)
      return;
    const typeSize = 1 << ((buffer[0] & 192) >> 6);
    if (buffer.length < typeSize)
      return;
    const [, afterType] = decode(buffer);
    if (afterType.length < 2)
      return;
    const size2 = afterType[0] << 8 | afterType[1];
    const totalSize = buffer.length - afterType.length + 2 + size2;
    if (buffer.length < totalSize)
      return;
    return totalSize;
  }
  #tryParseOutgoing(buffer) {
    if (buffer.length === 0)
      return;
    const typeSize = 1 << ((buffer[0] & 192) >> 6);
    if (buffer.length < typeSize)
      return;
    const [typeId, afterType] = decode(buffer);
    if (afterType.length < 2)
      return;
    const size2 = afterType[0] << 8 | afterType[1];
    const bodyStart = afterType.subarray(2);
    if (bodyStart.length < size2)
      return;
    const body = bodyStart.subarray(0, size2);
    const [reqId] = decode(body);
    const requestId = BigInt(reqId);
    if (typeId === 6) {
      try {
        const [, afterReqId] = decode(body);
        this.#parseAndRegisterNamespace(afterReqId, requestId);
      } catch {}
    }
    if (typeId === 17) {
      this.#subscribeNamespaces.add(requestId);
    }
    return { requestId };
  }
  #parseAndRegisterNamespace(buf, requestId) {
    const decoder = new TextDecoder;
    const [partCount, afterCount] = decode(buf);
    let cursor = afterCount;
    const parts = [];
    for (let i = 0;i < partCount; i++) {
      const [len, afterLen] = decode(cursor);
      parts.push(decoder.decode(afterLen.subarray(0, len)));
      cursor = afterLen.subarray(len);
    }
    const namespace = parts.join("/");
    this.#namespaces.set(namespace, requestId);
    this.#namespacesByRequestId.set(requestId, namespace);
  }
  #createSendWritable() {
    let buffer = new Uint8Array(0);
    return new WritableStream({
      write: async (chunk) => {
        const newBuf = new Uint8Array(buffer.length + chunk.length);
        newBuf.set(buffer);
        newBuf.set(chunk, buffer.length);
        buffer = newBuf;
        for (;; ) {
          const boundary = this.#messageSize(buffer);
          if (boundary === undefined)
            break;
          const toFlush = buffer.subarray(0, boundary);
          buffer = buffer.subarray(boundary);
          await this.#writeMutex.runExclusive(() => this.#writer.write(toFlush));
        }
      }
    });
  }
  #encodeRaw(typeId, size2, body) {
    const typeIdBytes = encodeTo(new ArrayBuffer(9), typeId);
    const result = new Uint8Array(typeIdBytes.byteLength + 2 + body.byteLength);
    result.set(typeIdBytes, 0);
    const sizeView = new DataView(result.buffer, typeIdBytes.byteLength, 2);
    sizeView.setUint16(0, size2);
    result.set(body, typeIdBytes.byteLength + 2);
    return result;
  }
  async#classify(typeId, body) {
    const readRequestId = async () => {
      const r = new Reader(undefined, body, this.version);
      return await r.u62();
    };
    const readNamespaceRequestId = async () => {
      const r = new Reader(undefined, body, this.version);
      const namespace = await decode2(r);
      const requestId = this.#namespaces.get(namespace);
      if (requestId === undefined)
        throw new Error(`unknown namespace: ${namespace}`);
      this.#namespaces.delete(namespace);
      return requestId;
    };
    switch (typeId) {
      case 2: {
        const requestId = await readRequestId();
        return { route: Route.FollowUp, requestId };
      }
      case 3:
      case 22:
      case 29:
      case 13: {
        const requestId = await readRequestId();
        return { route: Route.NewRequest, requestId };
      }
      case 6: {
        const r = new Reader(undefined, body, this.version);
        const requestId = await r.u62();
        const namespace = await decode2(r);
        this.#namespaces.set(namespace, requestId);
        this.#namespacesByRequestId.set(requestId, namespace);
        return { route: Route.NewRequest, requestId };
      }
      case 17: {
        if (this.version !== Version.DRAFT_14 && this.version !== Version.DRAFT_15) {
          throw new Error("unexpected SubscribeNamespace on control stream");
        }
        const requestId = await readRequestId();
        return { route: Route.NewRequest, requestId };
      }
      case 4: {
        const requestId = await readRequestId();
        return { route: Route.Response, requestId };
      }
      case 24: {
        const requestId = await readRequestId();
        return { route: Route.Response, requestId };
      }
      case 30: {
        const requestId = await readRequestId();
        return { route: Route.Response, requestId };
      }
      case 7: {
        const requestId = await readRequestId();
        return { route: Route.Response, requestId };
      }
      case 18: {
        if (this.version !== Version.DRAFT_14)
          throw new Error("unexpected SubscribeNamespaceOk");
        const requestId = await readRequestId();
        return { route: Route.Response, requestId };
      }
      case 5: {
        const requestId = await readRequestId();
        return { route: Route.ErrorResponse, requestId };
      }
      case 25: {
        if (this.version !== Version.DRAFT_14)
          throw new Error("unexpected FetchError");
        const requestId = await readRequestId();
        return { route: Route.ErrorResponse, requestId };
      }
      case 31: {
        if (this.version !== Version.DRAFT_14)
          throw new Error("unexpected PublishError");
        const requestId = await readRequestId();
        return { route: Route.ErrorResponse, requestId };
      }
      case 8: {
        if (this.version === Version.DRAFT_14) {
          const requestId = await readRequestId();
          return { route: Route.ErrorResponse, requestId };
        }
        const subNs08 = this.#subscribeNamespaces.values().next().value;
        if (subNs08 === undefined)
          throw new Error("unexpected message 0x08: no SubscribeNamespace stream");
        return { route: Route.FollowUp, requestId: subNs08 };
      }
      case 14: {
        const subNs0e = this.#subscribeNamespaces.values().next().value;
        if (subNs0e === undefined)
          throw new Error("unexpected message 0x0e: no SubscribeNamespace stream");
        return { route: Route.FollowUp, requestId: subNs0e };
      }
      case 19: {
        if (this.version !== Version.DRAFT_14)
          throw new Error("unexpected SubscribeNamespaceError");
        const requestId = await readRequestId();
        return { route: Route.ErrorResponse, requestId };
      }
      case 10: {
        const requestId = await readRequestId();
        return { route: Route.CloseStream, requestId };
      }
      case 11: {
        const requestId = await readRequestId();
        return { route: Route.CloseStream, requestId };
      }
      case 23: {
        const requestId = await readRequestId();
        return { route: Route.CloseStream, requestId };
      }
      case 9: {
        if (this.version === Version.DRAFT_16) {
          const requestId2 = await readRequestId();
          return { route: Route.CloseStream, requestId: requestId2 };
        }
        const requestId = await readNamespaceRequestId();
        return { route: Route.CloseStream, requestId };
      }
      case 12: {
        if (this.version === Version.DRAFT_16) {
          const requestId2 = await readRequestId();
          return { route: Route.CloseStream, requestId: requestId2 };
        }
        const requestId = await readNamespaceRequestId();
        return { route: Route.CloseStream, requestId };
      }
      case 20: {
        if (this.version !== Version.DRAFT_14 && this.version !== Version.DRAFT_15) {
          throw new Error("unexpected UnsubscribeNamespace");
        }
        const requestId = await readRequestId();
        return { route: Route.CloseStream, requestId };
      }
      case 21: {
        const requestId = await readRequestId();
        return { route: Route.MaxRequestId, requestId };
      }
      case 26: {
        await readRequestId();
        return { route: Route.Ignore, requestId: 0n };
      }
      case 16:
        return { route: Route.GoAway };
      default:
        throw new Error(`unknown control message type: 0x${typeId.toString(16)}`);
    }
  }
  close() {
    if (this.#closed)
      return;
    this.#closed = true;
    console.debug("adapter: close() called");
    for (const entry of this.#streams.values()) {
      try {
        entry.controller.close();
      } catch {}
    }
    this.#streams.clear();
    for (const waiter of this.#incomingWaiters) {
      waiter(undefined);
    }
    this.#incomingWaiters = [];
    this.#namespaces.clear();
    this.#namespacesByRequestId.clear();
    this.#subscribeNamespaces.clear();
    for (const resolve of this.#maxRequestIdResolves)
      resolve();
    this.#maxRequestIdResolves = [];
  }
}

// node_modules/@moq/net/ietf/connection.js
init_stream();

// node_modules/@moq/net/ietf/goaway.js
init_message();
init_version();

class GoAway {
  static id = 16;
  newSessionUri;
  timeout;
  constructor({ newSessionUri, timeout = 0n }) {
    this.newSessionUri = newSessionUri;
    this.timeout = timeout;
  }
  async#encode(w, version) {
    await w.string(this.newSessionUri);
    if (version !== Version.DRAFT_14 && version !== Version.DRAFT_15 && version !== Version.DRAFT_16) {
      await w.u62(this.timeout);
    }
  }
  async encode(w, version) {
    return encode3(w, (mw) => this.#encode(mw, version));
  }
  static async decode(r, version) {
    return decode3(r, (mr) => GoAway.#decode(mr, version));
  }
  static async#decode(r, version) {
    const newSessionUri = await r.string();
    const timeout = version === Version.DRAFT_14 || version === Version.DRAFT_15 || version === Version.DRAFT_16 ? 0n : await r.u62();
    return new GoAway({ newSessionUri, timeout });
  }
}

// node_modules/@moq/net/ietf/object.js
init_version();
var GROUP_END = 3;
var FIRST_OBJECT_BIT = 64;
function hasFirstObjectBit(version) {
  switch (version) {
    case Version.DRAFT_14:
    case Version.DRAFT_15:
    case Version.DRAFT_16:
    case Version.DRAFT_17:
      return false;
    default:
      return true;
  }
}

class Group2 {
  flags;
  trackAlias;
  groupId;
  subGroupId;
  publisherPriority;
  constructor({ trackAlias, groupId, subGroupId, publisherPriority, flags }) {
    this.flags = flags;
    this.trackAlias = trackAlias;
    this.groupId = groupId;
    this.subGroupId = subGroupId;
    this.publisherPriority = publisherPriority;
  }
  async encode(w, version) {
    if (!this.flags.hasSubgroup && this.subGroupId !== 0) {
      throw new Error(`Subgroup ID must be 0 if hasSubgroup is false: ${this.subGroupId}`);
    }
    const base = this.flags.hasPriority ? 16 : 48;
    let id = base;
    if (this.flags.hasExtensions) {
      id |= 1;
    }
    if (this.flags.hasSubgroupObject) {
      id |= 2;
    }
    if (this.flags.hasSubgroup) {
      id |= 4;
    }
    if (this.flags.hasEnd) {
      id |= 8;
    }
    if (hasFirstObjectBit(version)) {
      id |= FIRST_OBJECT_BIT;
    }
    await w.u53(id);
    await w.u62(this.trackAlias);
    await w.u53(this.groupId);
    if (this.flags.hasSubgroup) {
      await w.u53(this.subGroupId);
    }
    if (this.flags.hasPriority) {
      await w.u8(this.publisherPriority);
    }
  }
  static async decode(r, version) {
    const raw = await r.u53();
    const id = hasFirstObjectBit(version) ? raw & ~FIRST_OBJECT_BIT : raw;
    let hasPriority;
    let baseId;
    if (id >= 16 && id <= 31) {
      hasPriority = true;
      baseId = id;
    } else if (id >= 48 && id <= 63) {
      hasPriority = false;
      baseId = id - (48 - 16);
    } else {
      throw new Error(`Unsupported group type: ${id}`);
    }
    const flags = {
      hasExtensions: (baseId & 1) !== 0,
      hasSubgroupObject: (baseId & 2) !== 0,
      hasSubgroup: (baseId & 4) !== 0,
      hasEnd: (baseId & 8) !== 0,
      hasPriority
    };
    const trackAlias = await r.u62();
    const groupId = await r.u53();
    const subGroupId = flags.hasSubgroup ? await r.u53() : 0;
    const publisherPriority = hasPriority ? await r.u8() : 128;
    return new Group2({ trackAlias, groupId, subGroupId, publisherPriority, flags });
  }
}

class Frame {
  payload;
  constructor({ payload } = {}) {
    this.payload = payload;
  }
  async encode(w, flags) {
    await w.u53(0);
    if (flags.hasExtensions) {
      await w.u53(0);
    }
    if (this.payload !== undefined) {
      await w.u53(this.payload.byteLength);
      if (this.payload.byteLength === 0) {
        await w.u53(0);
      } else {
        await w.write(this.payload);
      }
    } else {
      await w.u53(0);
      await w.u53(GROUP_END);
    }
  }
  static async decode(r, flags) {
    const delta = await r.u53();
    if (delta !== 0) {
      throw new Error(`object ID delta is not supported: ${delta}`);
    }
    if (flags.hasExtensions) {
      const extensionsLength = await r.u53();
      await r.read(extensionsLength);
    }
    const payloadLength = await r.u53();
    if (payloadLength > 0) {
      const payload = await r.read(payloadLength);
      return new Frame({ payload });
    }
    const status = await r.u53();
    if (flags.hasEnd) {
      if (status === 0)
        return new Frame({ payload: new Uint8Array(0) });
    } else if (status === 0 || status === GROUP_END) {
      return new Frame;
    }
    throw new Error(`Unsupported object status: ${status}`);
  }
}

// node_modules/@moq/net/ietf/publish.js
init_message();
init_namespace();
init_parameters();
init_properties();
init_version();

class Publish {
  static id = 29;
  requestId;
  trackNamespace;
  trackName;
  trackAlias;
  groupOrder;
  contentExists;
  largest;
  forward;
  constructor({ requestId, trackNamespace, trackName, trackAlias, groupOrder, contentExists, largest, forward }) {
    this.requestId = requestId;
    this.trackNamespace = trackNamespace;
    this.trackName = trackName;
    this.trackAlias = trackAlias;
    this.groupOrder = groupOrder;
    this.contentExists = contentExists;
    this.largest = largest;
    this.forward = forward;
  }
  async#encode(w, version) {
    await w.u62(this.requestId);
    if (version === Version.DRAFT_17) {
      await w.u62(0n);
    }
    await encode2(w, this.trackNamespace);
    await w.string(this.trackName);
    await w.u62(this.trackAlias);
    if (version === Version.DRAFT_14) {
      await w.u8(this.groupOrder);
      await w.bool(this.contentExists);
      if (this.contentExists !== !!this.largest) {
        throw new Error("contentExists and largest must both be true or false");
      }
      if (this.largest) {
        await w.u62(this.largest.groupId);
        await w.u62(this.largest.objectId);
      }
      await w.bool(this.forward);
      await w.u53(0);
    } else {
      if (this.contentExists !== !!this.largest) {
        throw new Error("contentExists and largest must both be true or false");
      }
      const params = new Parameters;
      params.groupOrder = this.groupOrder;
      params.forward = this.forward;
      if (this.largest) {
        params.largest = this.largest;
      }
      await params.encode(w, version);
    }
  }
  async encode(w, version) {
    return encode3(w, (mw) => this.#encode(mw, version));
  }
  static async decode(r, version) {
    return decode3(r, (mr) => Publish.#decode(mr, version));
  }
  static async#decode(r, version) {
    const requestId = await r.u62();
    if (version === Version.DRAFT_17) {
      await r.u62();
    }
    const trackNamespace = await decode2(r);
    const trackName = await r.string();
    const trackAlias = await r.u62();
    if (version === Version.DRAFT_14) {
      const groupOrder2 = await r.u8();
      const contentExists = await r.bool();
      const largest2 = contentExists ? { groupId: await r.u62(), objectId: await r.u62() } : undefined;
      const forward2 = await r.bool();
      await Parameters.decode(r, version);
      return new Publish({
        requestId,
        trackNamespace,
        trackName,
        trackAlias,
        groupOrder: groupOrder2,
        contentExists,
        largest: largest2,
        forward: forward2
      });
    }
    const params = await Parameters.decode(r, version);
    await skip(r, version);
    const groupOrder = params.groupOrder ?? 2;
    const forward = params.forward ?? true;
    const largest = params.largest;
    return new Publish({
      requestId,
      trackNamespace,
      trackName,
      trackAlias,
      groupOrder,
      contentExists: !!largest,
      largest,
      forward
    });
  }
}

class PublishOk {
  static id = 30;
  async#encode(_w) {
    throw new Error("PUBLISH_OK messages are not supported");
  }
  async encode(w, _version) {
    return encode3(w, this.#encode.bind(this));
  }
  static async decode(r, _version) {
    return decode3(r, PublishOk.#decode);
  }
  static async#decode(_r) {
    throw new Error("PUBLISH_OK messages are not supported");
  }
}

class PublishError {
  static id = 31;
  requestId;
  errorCode;
  reasonPhrase;
  constructor({ requestId, errorCode, reasonPhrase }) {
    this.requestId = requestId;
    this.errorCode = errorCode;
    this.reasonPhrase = reasonPhrase;
  }
  async#encode(w) {
    await w.u62(this.requestId);
    await w.u62(BigInt(this.errorCode));
    await w.string(this.reasonPhrase);
  }
  async encode(w, _version) {
    return encode3(w, this.#encode.bind(this));
  }
  static async decode(r, _version) {
    return decode3(r, PublishError.#decode);
  }
  static async#decode(r) {
    const requestId = await r.u62();
    const errorCode = Number(await r.u62());
    const reasonPhrase = await r.string();
    return new PublishError({ requestId, errorCode, reasonPhrase });
  }
}

class PublishDone {
  static id = 11;
  requestId;
  statusCode;
  reasonPhrase;
  constructor({ requestId, statusCode, reasonPhrase }) {
    this.requestId = requestId;
    this.statusCode = statusCode;
    this.reasonPhrase = reasonPhrase;
  }
  async#encode(w, version) {
    if (version === Version.DRAFT_14 || version === Version.DRAFT_15 || version === Version.DRAFT_16) {
      if (this.requestId === undefined)
        throw new Error("requestId required for draft14-16");
      await w.u62(this.requestId);
    }
    await w.u62(BigInt(this.statusCode));
    await w.u62(BigInt(0));
    await w.string(this.reasonPhrase);
  }
  async encode(w, version) {
    return encode3(w, (mw) => this.#encode(mw, version));
  }
  static async decode(r, version) {
    return decode3(r, (mr) => PublishDone.#decode(mr, version));
  }
  static async#decode(r, version) {
    const requestId = version === Version.DRAFT_14 || version === Version.DRAFT_15 || version === Version.DRAFT_16 ? await r.u62() : undefined;
    const statusCode = Number(await r.u62());
    await r.u62();
    const reasonPhrase = await r.string();
    return new PublishDone({ requestId, statusCode, reasonPhrase });
  }
}

// node_modules/@moq/net/ietf/connection.js
init_publish_namespace();

// node_modules/@moq/net/ietf/publisher.js
init_stream();

// node_modules/@moq/net/util/error.js
function error(err) {
  return err instanceof Error ? err : new Error(String(err));
}

// node_modules/@moq/net/ietf/publisher.js
init_publish_namespace();

// node_modules/@moq/net/ietf/request.js
init_message();
init_parameters();
init_properties();
init_version();

class MaxRequestId {
  static id = 21;
  requestId;
  constructor({ requestId }) {
    this.requestId = requestId;
  }
  async#encode(w) {
    await w.u62(this.requestId);
  }
  async encode(w, _version) {
    return encode3(w, this.#encode.bind(this));
  }
  static async#decode(r) {
    return new MaxRequestId({ requestId: await r.u62() });
  }
  static async decode(r, _version) {
    return decode3(r, MaxRequestId.#decode);
  }
}

class RequestsBlocked {
  static id = 26;
  requestId;
  constructor({ requestId }) {
    this.requestId = requestId;
  }
  async#encode(w) {
    await w.u62(this.requestId);
  }
  async encode(w, _version) {
    return encode3(w, this.#encode.bind(this));
  }
  static async#decode(r) {
    return new RequestsBlocked({ requestId: await r.u62() });
  }
  static async decode(r, _version) {
    return decode3(r, RequestsBlocked.#decode);
  }
}

class RequestOk {
  static id = 7;
  requestId;
  parameters;
  constructor({ requestId, parameters = new Parameters }) {
    this.requestId = requestId;
    this.parameters = parameters;
  }
  async#encode(w, version) {
    if (version === Version.DRAFT_14 || version === Version.DRAFT_15 || version === Version.DRAFT_16) {
      if (this.requestId === undefined)
        throw new Error("requestId required for draft14-16");
      await w.u62(this.requestId);
    }
    await this.parameters.encode(w, version);
  }
  async encode(w, version) {
    return encode3(w, (wr) => this.#encode(wr, version));
  }
  static async#decode(r, version) {
    const requestId = version === Version.DRAFT_14 || version === Version.DRAFT_15 || version === Version.DRAFT_16 ? await r.u62() : undefined;
    const parameters = await Parameters.decode(r, version);
    await skip(r, version);
    return new RequestOk({ requestId, parameters });
  }
  static async decode(r, version) {
    return decode3(r, (rd) => RequestOk.#decode(rd, version));
  }
}

class RequestError {
  static id = 5;
  requestId;
  errorCode;
  reasonPhrase;
  retryInterval;
  constructor({ requestId, errorCode, reasonPhrase, retryInterval = 0n }) {
    this.requestId = requestId;
    this.errorCode = errorCode;
    this.reasonPhrase = reasonPhrase;
    this.retryInterval = retryInterval;
  }
  async#encode(w, version) {
    if (version === Version.DRAFT_14 || version === Version.DRAFT_15 || version === Version.DRAFT_16) {
      if (this.requestId === undefined)
        throw new Error("requestId required for draft14-16");
      await w.u62(this.requestId);
    }
    await w.u62(BigInt(this.errorCode));
    if (version !== Version.DRAFT_14 && version !== Version.DRAFT_15) {
      await w.u62(this.retryInterval);
    }
    await w.string(this.reasonPhrase);
  }
  async encode(w, version) {
    return encode3(w, (wr) => this.#encode(wr, version));
  }
  static async#decode(r, version) {
    const requestId = version === Version.DRAFT_14 || version === Version.DRAFT_15 || version === Version.DRAFT_16 ? await r.u62() : undefined;
    const errorCode = Number(await r.u62());
    const retryInterval = version === Version.DRAFT_14 || version === Version.DRAFT_15 ? 0n : await r.u62();
    const reasonPhrase = await r.string();
    return new RequestError({ requestId, errorCode, reasonPhrase, retryInterval });
  }
  static async decode(r, version) {
    return decode3(r, (rd) => RequestError.#decode(rd, version));
  }
}

// node_modules/@moq/net/ietf/publisher.js
init_subscribe();

// node_modules/@moq/net/ietf/subscribe_namespace.js
init_message();
init_namespace();
init_parameters();
init_version();
function isLegacyVersion(version) {
  switch (version) {
    case Version.DRAFT_14:
    case Version.DRAFT_15:
    case Version.DRAFT_16:
    case Version.DRAFT_17:
      return true;
    default:
      return false;
  }
}

class SubscribeNamespace {
  static id = 80;
  namespace;
  requestId;
  constructor({ namespace, requestId }) {
    this.namespace = namespace;
    this.requestId = requestId;
  }
  async#encode(w, version) {
    if (isLegacyVersion(version)) {
      throw new Error(`SUBSCRIBE_NAMESPACE (0x50) is draft-18+ only, not ${version}`);
    }
    await w.u62(this.requestId);
    await encode2(w, this.namespace);
    await new Parameters().encode(w, version);
  }
  async encode(w, version) {
    return encode3(w, (wr) => this.#encode(wr, version));
  }
  static async decode(r, version) {
    return decode3(r, (rd) => SubscribeNamespace.#decode(rd, version));
  }
  static async#decode(r, version) {
    if (isLegacyVersion(version)) {
      throw new Error(`SUBSCRIBE_NAMESPACE (0x50) is draft-18+ only, not ${version}`);
    }
    const requestId = await r.u62();
    const namespace = await decode2(r);
    await Parameters.decode(r, version);
    return new SubscribeNamespace({ namespace, requestId });
  }
}

class SubscribeNamespaceLegacy {
  static id = 17;
  namespace;
  requestId;
  subscribeOptions;
  constructor({ namespace, requestId, subscribeOptions = 1 }) {
    this.namespace = namespace;
    this.requestId = requestId;
    this.subscribeOptions = subscribeOptions;
  }
  async#encode(w, version) {
    if (!isLegacyVersion(version)) {
      throw new Error(`legacy SUBSCRIBE_NAMESPACE (0x11) is draft-14..17 only, not ${version}`);
    }
    await w.u62(this.requestId);
    if (version === Version.DRAFT_17) {
      await w.u62(0n);
    }
    await encode2(w, this.namespace);
    if (version === Version.DRAFT_16 || version === Version.DRAFT_17) {
      await w.u53(this.subscribeOptions);
    }
    await new Parameters().encode(w, version);
  }
  async encode(w, version) {
    return encode3(w, (wr) => this.#encode(wr, version));
  }
  static async decode(r, version) {
    return decode3(r, (rd) => SubscribeNamespaceLegacy.#decode(rd, version));
  }
  static async#decode(r, version) {
    if (!isLegacyVersion(version)) {
      throw new Error(`legacy SUBSCRIBE_NAMESPACE (0x11) is draft-14..17 only, not ${version}`);
    }
    const requestId = await r.u62();
    if (version === Version.DRAFT_17) {
      await r.u62();
    }
    const namespace = await decode2(r);
    let subscribeOptions = 1;
    if (version === Version.DRAFT_16 || version === Version.DRAFT_17) {
      subscribeOptions = await r.u53();
    }
    await Parameters.decode(r, version);
    return new SubscribeNamespaceLegacy({ namespace, requestId, subscribeOptions });
  }
}
class SubscribeNamespaceOk {
  static id = 18;
  requestId;
  constructor({ requestId }) {
    this.requestId = requestId;
  }
  async#encode(w) {
    await w.u62(this.requestId);
  }
  async encode(w, _version) {
    return encode3(w, this.#encode.bind(this));
  }
  static async decode(r, _version) {
    return decode3(r, SubscribeNamespaceOk.#decode);
  }
  static async#decode(r) {
    const requestId = await r.u62();
    return new SubscribeNamespaceOk({ requestId });
  }
}

class SubscribeNamespaceError {
  static id = 19;
  requestId;
  errorCode;
  reasonPhrase;
  constructor({ requestId, errorCode, reasonPhrase }) {
    this.requestId = requestId;
    this.errorCode = errorCode;
    this.reasonPhrase = reasonPhrase;
  }
  async#encode(w) {
    await w.u62(this.requestId);
    await w.u62(BigInt(this.errorCode));
    await w.string(this.reasonPhrase);
  }
  async encode(w, _version) {
    return encode3(w, this.#encode.bind(this));
  }
  static async decode(r, _version) {
    return decode3(r, SubscribeNamespaceError.#decode);
  }
  static async#decode(r) {
    const requestId = await r.u62();
    const errorCode = Number(await r.u62());
    const reasonPhrase = await r.string();
    return new SubscribeNamespaceError({ requestId, errorCode, reasonPhrase });
  }
}

class UnsubscribeNamespace {
  static id = 20;
  requestId;
  constructor({ requestId }) {
    this.requestId = requestId;
  }
  async#encode(w) {
    await w.u62(this.requestId);
  }
  async encode(w, _version) {
    return encode3(w, this.#encode.bind(this));
  }
  static async decode(r, _version) {
    return decode3(r, UnsubscribeNamespace.#decode);
  }
  static async#decode(r) {
    const requestId = await r.u62();
    return new UnsubscribeNamespace({ requestId });
  }
}

class SubscribeNamespaceEntry {
  static id = 8;
  suffix;
  constructor({ suffix }) {
    this.suffix = suffix;
  }
  async#encode(w) {
    await encode2(w, this.suffix);
  }
  async encode(w, _version) {
    return encode3(w, this.#encode.bind(this));
  }
  static async decode(r, _version) {
    return decode3(r, SubscribeNamespaceEntry.#decode);
  }
  static async#decode(r) {
    const suffix = await decode2(r);
    return new SubscribeNamespaceEntry({ suffix });
  }
}

class SubscribeNamespaceEntryDone {
  static id = 14;
  suffix;
  constructor({ suffix }) {
    this.suffix = suffix;
  }
  async#encode(w) {
    await encode2(w, this.suffix);
  }
  async encode(w, _version) {
    return encode3(w, this.#encode.bind(this));
  }
  static async decode(r, _version) {
    return decode3(r, SubscribeNamespaceEntryDone.#decode);
  }
  static async#decode(r) {
    const suffix = await decode2(r);
    return new SubscribeNamespaceEntryDone({ suffix });
  }
}

class PublishBlocked {
  static id = 15;
  suffix;
  trackName;
  constructor({ suffix, trackName }) {
    this.suffix = suffix;
    this.trackName = trackName;
  }
  async#encode(w) {
    await encode2(w, this.suffix);
    await w.string(this.trackName);
  }
  async encode(w, _version) {
    return encode3(w, this.#encode.bind(this));
  }
  static async decode(r, _version) {
    return decode3(r, PublishBlocked.#decode);
  }
  static async#decode(r) {
    const suffix = await decode2(r);
    const trackName = await r.string();
    return new PublishBlocked({ suffix, trackName });
  }
}

// node_modules/@moq/net/ietf/track.js
init_message();
init_namespace();
init_parameters();
init_version();
var GROUP_ORDER2 = 2;

class TrackStatusRequest {
  static id = 13;
  requestId;
  trackNamespace;
  trackName;
  constructor({ requestId, trackNamespace, trackName }) {
    this.requestId = requestId;
    this.trackNamespace = trackNamespace;
    this.trackName = trackName;
  }
  async#encode(w, version) {
    await w.u62(this.requestId);
    if (version === Version.DRAFT_17) {
      await w.u62(0n);
    }
    await encode2(w, this.trackNamespace);
    await w.string(this.trackName);
    if (version === Version.DRAFT_14) {
      await w.u8(0);
      await w.u8(GROUP_ORDER2);
      await w.bool(false);
      await w.u53(2);
      await w.u53(0);
    } else {
      const params = new Parameters;
      await params.encode(w, version);
    }
  }
  async encode(w, version) {
    return encode3(w, (mw) => this.#encode(mw, version));
  }
  static async decode(r, version) {
    return decode3(r, (mr) => TrackStatusRequest.#decode(mr, version));
  }
  static async#decode(r, version) {
    const requestId = await r.u62();
    if (version === Version.DRAFT_17) {
      await r.u62();
    }
    const trackNamespace = await decode2(r);
    const trackName = await r.string();
    if (version === Version.DRAFT_14) {
      await r.u8();
      await r.u8();
      await r.bool();
      await r.u53();
      await Parameters.decode(r, version);
    } else {
      await Parameters.decode(r, version);
    }
    return new TrackStatusRequest({ requestId, trackNamespace, trackName });
  }
}

class TrackStatus {
  static id = 14;
  trackNamespace;
  trackName;
  statusCode;
  lastGroupId;
  lastObjectId;
  constructor({ trackNamespace, trackName, statusCode, lastGroupId, lastObjectId }) {
    this.trackNamespace = trackNamespace;
    this.trackName = trackName;
    this.statusCode = statusCode;
    this.lastGroupId = lastGroupId;
    this.lastObjectId = lastObjectId;
  }
  async#encode(w) {
    await encode2(w, this.trackNamespace);
    await w.string(this.trackName);
    await w.u62(BigInt(this.statusCode));
    await w.u62(this.lastGroupId);
    await w.u62(this.lastObjectId);
  }
  async encode(w, _version) {
    return encode3(w, this.#encode.bind(this));
  }
  static async decode(r, _version) {
    return decode3(r, TrackStatus.#decode);
  }
  static async#decode(r) {
    const trackNamespace = await decode2(r);
    const trackName = await r.string();
    const statusCode = Number(await r.u62());
    const lastGroupId = await r.u62();
    const lastObjectId = await r.u62();
    return new TrackStatus({ trackNamespace, trackName, statusCode, lastGroupId, lastObjectId });
  }
  static STATUS_IN_PROGRESS = 0;
  static STATUS_NOT_FOUND = 1;
  static STATUS_NOT_AUTHORIZED = 2;
  static STATUS_ENDED = 3;
}

// node_modules/@moq/net/ietf/publisher.js
init_version();

class Publisher {
  #quic;
  #session;
  #broadcasts = new Map;
  #announcedConsumers = new Set;
  constructor(quic, session) {
    this.#quic = quic;
    this.#session = session;
  }
  publish(path, broadcast) {
    this.#broadcasts.set(path, broadcast);
    this.#notifyConsumers(path, true);
    this.#runPublish(path, broadcast);
  }
  async#runPublish(path, broadcast) {
    try {
      const requestId = await this.#session.nextRequestId();
      if (requestId === undefined)
        return;
      const stream = await this.#session.openBi();
      try {
        await stream.writer.u53(PublishNamespace.id);
        const msg = new PublishNamespace({ requestId, trackNamespace: path });
        await msg.encode(stream.writer, this.#session.version);
        const respTypeId = await stream.reader.u53();
        if (respTypeId === RequestOk.id) {
          if (this.#session.version === Version.DRAFT_14) {
            await PublishNamespaceOk.decode(stream.reader, this.#session.version);
          } else {
            await RequestOk.decode(stream.reader, this.#session.version);
          }
        } else {
          throw new Error(`PublishNamespace rejected: typeId=0x${respTypeId.toString(16)}`);
        }
        await Promise.race([broadcast.closed, stream.reader.closed]);
        if (this.#session.version === Version.DRAFT_14 || this.#session.version === Version.DRAFT_15 || this.#session.version === Version.DRAFT_16) {
          try {
            await stream.writer.u53(PublishNamespaceDone.id);
            const done = new PublishNamespaceDone({ trackNamespace: path, requestId });
            await done.encode(stream.writer, this.#session.version);
          } catch {}
        }
        stream.close();
      } catch (err) {
        stream.abort(error(err));
        throw err;
      }
    } catch (err) {
      const e = error(err);
      console.warn(`announce failed: broadcast=${path} error=${e.message}`);
    } finally {
      broadcast.close();
      this.#broadcasts.delete(path);
      this.#notifyConsumers(path, false);
    }
  }
  async runSubscribe(msg, stream) {
    const version = this.#session.version;
    const name = msg.trackNamespace;
    const broadcast = this.#broadcasts.get(name);
    if (!broadcast) {
      if (version === Version.DRAFT_14) {
        await stream.writer.u53(SubscribeError.id);
        const err = new SubscribeError({
          requestId: msg.requestId,
          errorCode: 404,
          reasonPhrase: "Broadcast not found"
        });
        await err.encode(stream.writer, version);
      } else {
        await stream.writer.u53(RequestError.id);
        const err = new RequestError({
          requestId: version === Version.DRAFT_15 || version === Version.DRAFT_16 ? msg.requestId : undefined,
          errorCode: 404,
          reasonPhrase: "Broadcast not found"
        });
        await err.encode(stream.writer, version);
      }
      stream.close();
      return;
    }
    const track = broadcast.subscribe(msg.trackName, msg.subscriberPriority);
    try {
      await stream.writer.u53(SubscribeOk.id);
      const ok = new SubscribeOk({
        requestId: version === Version.DRAFT_14 || version === Version.DRAFT_15 || version === Version.DRAFT_16 ? msg.requestId : undefined,
        trackAlias: msg.requestId
      });
      await ok.encode(stream.writer, version);
      console.debug(`publish ok: broadcast=${name} track=${track.name}`);
      const serving = (async () => {
        for (;; ) {
          const group = await track.recvGroup();
          if (!group)
            return;
          this.#runGroup(msg.requestId, group);
        }
      })();
      await Promise.race([serving, stream.reader.closed]);
      console.debug(`publish done: broadcast=${name} track=${track.name}`);
      if (version === Version.DRAFT_14 || version === Version.DRAFT_15 || version === Version.DRAFT_16) {
        try {
          await stream.writer.u53(PublishDone.id);
          const done = new PublishDone({
            requestId: msg.requestId,
            statusCode: 200,
            reasonPhrase: "OK"
          });
          await done.encode(stream.writer, version);
        } catch {}
      }
      stream.close();
    } catch (err) {
      const e = error(err);
      console.warn(`publish error: broadcast=${name} track=${track.name} error=${e.message}`);
      stream.abort(e);
    } finally {
      track.close();
    }
  }
  async#runGroup(requestId, group) {
    try {
      const stream = await Writer.open(this.#quic, this.#session.version);
      const header = new Group2({
        trackAlias: requestId,
        groupId: group.sequence,
        subGroupId: 0,
        publisherPriority: 0,
        flags: {
          hasExtensions: false,
          hasSubgroup: false,
          hasSubgroupObject: false,
          hasEnd: true,
          hasPriority: true
        }
      });
      await header.encode(stream, this.#session.version);
      try {
        for (;; ) {
          const frame = await Promise.race([group.readFrame(), stream.closed]);
          if (!frame)
            break;
          const obj = new Frame({ payload: frame });
          await obj.encode(stream, header.flags);
        }
        stream.close();
      } catch (err) {
        stream.reset(error(err));
      }
    } finally {
      group.close();
    }
  }
  async runSubscribeNamespace(msg, stream) {
    const version = this.#session.version;
    const prefix = msg.namespace;
    try {
      if (version === Version.DRAFT_14) {
        await stream.writer.u53(SubscribeNamespaceOk.id);
        const ok = new SubscribeNamespaceOk({ requestId: msg.requestId });
        await ok.encode(stream.writer, version);
      } else {
        await stream.writer.u53(RequestOk.id);
        const ok = new RequestOk({
          requestId: version === Version.DRAFT_15 || version === Version.DRAFT_16 ? msg.requestId : undefined
        });
        await ok.encode(stream.writer, version);
      }
      const announced = new Announced(prefix);
      for (const name of this.#broadcasts.keys()) {
        const suffix = stripPrefix(prefix, name);
        if (suffix === null)
          continue;
        announced.append({ path: suffix, active: true });
      }
      this.#announcedConsumers.add(announced);
      stream.reader.closed.then(() => announced.close(), () => announced.close());
      try {
        for (;; ) {
          const entry = await announced.next();
          if (!entry)
            break;
          if (entry.active) {
            await stream.writer.u53(SubscribeNamespaceEntry.id);
            const e = new SubscribeNamespaceEntry({ suffix: entry.path });
            await e.encode(stream.writer, version);
          } else {
            await stream.writer.u53(SubscribeNamespaceEntryDone.id);
            const e = new SubscribeNamespaceEntryDone({ suffix: entry.path });
            await e.encode(stream.writer, version);
          }
        }
      } finally {
        announced.close();
        this.#announcedConsumers.delete(announced);
      }
      stream.close();
    } catch (err) {
      const e = error(err);
      console.debug(`subscribe_namespace stream error: ${e.message}`);
      stream.abort(e);
    }
  }
  async runTrackStatusRequest(msg, stream) {
    const version = this.#session.version;
    if (version === Version.DRAFT_14) {
      await stream.writer.u53(TrackStatus.id);
      const status = new TrackStatus({
        trackNamespace: msg.trackNamespace,
        trackName: msg.trackName,
        statusCode: TrackStatus.STATUS_NOT_FOUND,
        lastGroupId: 0n,
        lastObjectId: 0n
      });
      await status.encode(stream.writer, version);
    } else {
      await stream.writer.u53(RequestOk.id);
      const ok = new RequestOk({
        requestId: version === Version.DRAFT_15 || version === Version.DRAFT_16 ? msg.requestId : undefined
      });
      await ok.encode(stream.writer, version);
    }
    stream.close();
  }
  #notifyConsumers(path, active) {
    for (const consumer of this.#announcedConsumers) {
      const suffix = stripPrefix(consumer.prefix, path);
      if (suffix === null)
        continue;
      try {
        consumer.append({ path: suffix, active });
      } catch {}
    }
  }
}

// node_modules/@moq/net/ietf/connection.js
init_subscribe();
// node_modules/@moq/net/ietf/subscriber.js
init_subscribe();
init_version();

class Subscriber {
  #session;
  #subscribes = new Map;
  #announced = new Set;
  #announcedConsumers = new Set;
  constructor(session) {
    this.#session = session;
  }
  announced(prefix = empty()) {
    const announced = new Announced(prefix);
    for (const active of this.#announced) {
      if (!hasPrefix(prefix, active))
        continue;
      announced.append({ path: active, active: true });
    }
    this.#announcedConsumers.add(announced);
    this.#runAnnounced(announced, prefix).finally(() => {
      this.#announcedConsumers.delete(announced);
      announced.close();
    });
    return announced;
  }
  async#runAnnounced(announced, prefix) {
    const version = this.#session.version;
    const requestId = await this.#session.nextRequestId();
    if (requestId === undefined)
      return;
    try {
      const stream = version === Version.DRAFT_16 && this.#session.openNativeBi ? await this.#session.openNativeBi() : await this.#session.openBi();
      try {
        if (version === Version.DRAFT_14 || version === Version.DRAFT_15 || version === Version.DRAFT_16 || version === Version.DRAFT_17) {
          await stream.writer.u53(SubscribeNamespaceLegacy.id);
          await new SubscribeNamespaceLegacy({ namespace: prefix, requestId }).encode(stream.writer, version);
        } else {
          await stream.writer.u53(SubscribeNamespace.id);
          await new SubscribeNamespace({ namespace: prefix, requestId }).encode(stream.writer, version);
        }
        console.debug(`subscribe_namespace written: requestId=${requestId}`);
        const respTypeId = await stream.reader.u53();
        if (respTypeId === RequestOk.id) {
          await RequestOk.decode(stream.reader, version);
        } else if (respTypeId === SubscribeNamespaceOk.id) {
          const size2 = await stream.reader.u16();
          await stream.reader.read(size2);
        } else {
          throw new Error(`SubscribeNamespace rejected: typeId=0x${respTypeId.toString(16)}`);
        }
        const readLoop = (async () => {
          for (;; ) {
            const done = await stream.reader.done();
            if (done)
              break;
            const msgType = await stream.reader.u53();
            if (msgType === SubscribeNamespaceEntry.id) {
              const entry = await SubscribeNamespaceEntry.decode(stream.reader, version);
              const path = join(prefix, entry.suffix);
              console.debug(`announced: broadcast=${path} active=true`);
              this.#announced.add(path);
              for (const consumer of this.#announcedConsumers) {
                if (!hasPrefix(consumer.prefix, path))
                  continue;
                consumer.append({ path, active: true });
              }
            } else if (msgType === SubscribeNamespaceEntryDone.id) {
              const entry = await SubscribeNamespaceEntryDone.decode(stream.reader, version);
              const path = join(prefix, entry.suffix);
              console.debug(`announced: broadcast=${path} active=false`);
              this.#announced.delete(path);
              for (const consumer of this.#announcedConsumers) {
                if (!hasPrefix(consumer.prefix, path))
                  continue;
                consumer.append({ path, active: false });
              }
            } else if (msgType === PublishBlocked.id && version === Version.DRAFT_17) {
              const blocked = await PublishBlocked.decode(stream.reader, version);
              console.debug(`publish_blocked: suffix=${blocked.suffix} track=${blocked.trackName}`);
            } else {
              throw new Error(`unexpected message on subscribe_namespace stream: 0x${msgType.toString(16)}`);
            }
          }
        })();
        await Promise.race([readLoop, announced.closed]);
        if (version === Version.DRAFT_14 || version === Version.DRAFT_15) {
          try {
            await stream.writer.u53(UnsubscribeNamespace.id);
            const unsub = new UnsubscribeNamespace({ requestId });
            await unsub.encode(stream.writer, version);
          } catch {}
        }
        stream.close();
      } catch (err) {
        stream.abort(error(err));
        throw err;
      }
    } catch (err) {
      const e = error(err);
      console.warn(`subscribe_namespace error: ${e.message}`);
    }
  }
  consume(path) {
    const broadcast = new Broadcast;
    (async () => {
      for (;; ) {
        const request = await broadcast.requested();
        if (!request)
          break;
        this.#runSubscribe(path, request);
      }
    })();
    return broadcast;
  }
  async#runSubscribe(broadcast, request) {
    const version = this.#session.version;
    const requestId = await this.#session.nextRequestId();
    if (requestId === undefined) {
      request.track.close(new Error("session closed"));
      return;
    }
    console.debug(`subscribe start: id=${requestId} broadcast=${broadcast} track=${request.track.name}`);
    try {
      const stream = await this.#session.openBi();
      try {
        await stream.writer.u53(Subscribe.id);
        const msg = new Subscribe({
          requestId,
          trackNamespace: broadcast,
          trackName: request.track.name,
          subscriberPriority: request.priority
        });
        await msg.encode(stream.writer, version);
        console.debug(`subscribe written: id=${requestId} broadcast=${broadcast} track=${request.track.name}`);
        this.#subscribes.set(requestId, request.track);
        const respTypeId = await stream.reader.u53();
        if (respTypeId === SubscribeOk.id) {
          const ok = await SubscribeOk.decode(stream.reader, version);
          if (ok.trackAlias !== requestId) {
            this.#subscribes.delete(requestId);
            this.#subscribes.set(ok.trackAlias, request.track);
          }
          console.debug(`subscribe ok: id=${requestId} broadcast=${broadcast} track=${request.track.name}`);
          try {
            await Promise.race([stream.reader.closed, request.track.closed]);
            if (version === Version.DRAFT_14 || version === Version.DRAFT_15 || version === Version.DRAFT_16) {
              try {
                await stream.writer.u53(Unsubscribe.id);
                const unsub = new Unsubscribe({ requestId });
                await unsub.encode(stream.writer, version);
              } catch {}
            }
            request.track.close();
            stream.close();
            console.debug(`subscribe close: id=${requestId} broadcast=${broadcast} track=${request.track.name}`);
          } finally {
            this.#subscribes.delete(ok.trackAlias);
          }
        } else {
          this.#subscribes.delete(requestId);
          let reasonPhrase = "unknown error";
          try {
            if (respTypeId === RequestError.id) {
              const err = version === Version.DRAFT_14 ? await (await Promise.resolve().then(() => (init_subscribe(), exports_subscribe))).SubscribeError.decode(stream.reader, version) : await RequestError.decode(stream.reader, version);
              reasonPhrase = `code=${err.errorCode} reason=${err.reasonPhrase}`;
            }
          } catch {}
          throw new Error(`SUBSCRIBE error: ${reasonPhrase}`);
        }
      } catch (err) {
        this.#subscribes.delete(requestId);
        stream.abort(error(err));
        throw err;
      }
    } catch (err) {
      const e = error(err);
      request.track.close(e);
      console.warn(`subscribe error: id=${requestId} broadcast=${broadcast} track=${request.track.name} error=${e.message}`);
    }
  }
  async runPublishNamespace(msg, stream) {
    const version = this.#session.version;
    const path = msg.trackNamespace;
    if (this.#announced.has(path)) {
      console.warn("duplicate PublishNamespace");
      if (version === Version.DRAFT_14) {
        const { PublishNamespaceError: PublishNamespaceError2 } = await Promise.resolve().then(() => (init_publish_namespace(), exports_publish_namespace));
        await stream.writer.u53(PublishNamespaceError2.id);
        const err = new PublishNamespaceError2({
          requestId: msg.requestId,
          errorCode: 409,
          reasonPhrase: "duplicate namespace"
        });
        await err.encode(stream.writer, version);
      } else {
        await stream.writer.u53(RequestError.id);
        const err = new RequestError({
          requestId: version === Version.DRAFT_15 || version === Version.DRAFT_16 ? msg.requestId : undefined,
          errorCode: 409,
          reasonPhrase: "duplicate namespace"
        });
        await err.encode(stream.writer, version);
      }
      stream.close();
      return;
    }
    this.#announced.add(path);
    try {
      if (version === Version.DRAFT_14) {
        const { PublishNamespaceOk: PublishNamespaceOk2 } = await Promise.resolve().then(() => (init_publish_namespace(), exports_publish_namespace));
        await stream.writer.u53(PublishNamespaceOk2.id);
        const ok = new PublishNamespaceOk2({ requestId: msg.requestId });
        await ok.encode(stream.writer, version);
      } else {
        await stream.writer.u53(RequestOk.id);
        const ok = new RequestOk({
          requestId: version === Version.DRAFT_15 || version === Version.DRAFT_16 ? msg.requestId : undefined
        });
        await ok.encode(stream.writer, version);
      }
      console.debug(`announced: broadcast=${path} active=true`);
      for (const consumer of this.#announcedConsumers) {
        const suffix = stripPrefix(consumer.prefix, path);
        if (suffix === null)
          continue;
        consumer.append({ path, active: true });
      }
      console.debug(`runPublishNamespace: awaiting stream.reader.closed for ${path}`);
      await stream.reader.closed;
      console.debug(`runPublishNamespace: stream.reader.closed resolved for ${path}`);
    } finally {
      this.#announced.delete(path);
      console.debug(`announced: broadcast=${path} active=false`);
      for (const consumer of this.#announcedConsumers) {
        const suffix = stripPrefix(consumer.prefix, path);
        if (suffix === null)
          continue;
        try {
          consumer.append({ path, active: false });
        } catch {}
      }
    }
  }
  async runPublish(msg, stream) {
    const version = this.#session.version;
    if (version === Version.DRAFT_14) {
      await stream.writer.u53(PublishError.id);
      const err = new PublishError({
        requestId: msg.requestId,
        errorCode: 500,
        reasonPhrase: "publish not supported"
      });
      await err.encode(stream.writer, version);
    } else {
      await stream.writer.u53(RequestError.id);
      const err = new RequestError({
        requestId: version === Version.DRAFT_15 || version === Version.DRAFT_16 ? msg.requestId : undefined,
        errorCode: 500,
        reasonPhrase: "publish not supported"
      });
      await err.encode(stream.writer, version);
    }
    stream.close();
  }
  async handleGroup(group, stream) {
    const producer = new Group(group.groupId);
    if (group.subGroupId !== 0) {
      throw new Error("subgroups are not supported");
    }
    try {
      const track = this.#subscribes.get(group.trackAlias);
      if (!track) {
        throw new Error(`unknown track: trackAlias=${group.trackAlias}`);
      }
      track.writeGroup(producer);
      for (;; ) {
        const done = await Promise.race([stream.done(), producer.closed, track.closed]);
        if (done !== false)
          break;
        const frame = await Frame.decode(stream, group.flags);
        if (frame.payload === undefined)
          break;
        producer.writeFrame(frame.payload);
      }
      producer.close();
    } catch (err) {
      const e = error(err);
      producer.close(e);
      stream.stop(e);
    }
  }
}

// node_modules/@moq/net/ietf/connection.js
init_version();

class Connection {
  url;
  version;
  #quic;
  #session;
  #publisher;
  #subscriber;
  #closed = false;
  constructor({ url, quic, control, maxRequestId, version }) {
    this.url = url;
    this.version = versionName(version);
    this.#quic = quic;
    if (version === Version.DRAFT_17 || version === Version.DRAFT_18) {
      this.#session = new NativeSession(quic, version);
      this.#runGoAway(control, version);
    } else {
      const adapter = new ControlStreamAdapter(quic, control, version, maxRequestId);
      this.#session = adapter;
      adapter.run().catch((err) => {
        if (!this.#closed)
          console.error("adapter error", err);
        this.close();
      });
    }
    this.#publisher = new Publisher(this.#quic, this.#session);
    this.#subscriber = new Subscriber(this.#session);
    this.#run();
  }
  close() {
    if (this.#closed)
      return;
    this.#closed = true;
    this.#session.close?.();
    try {
      this.#quic.close();
    } catch {}
  }
  async#run() {
    try {
      await Promise.all([this.#runBidis(), this.#runUnis()]);
    } catch (err) {
      if (!this.#closed) {
        console.error("fatal error running connection", err);
      }
    } finally {
      this.close();
    }
  }
  publish(path, broadcast) {
    this.#publisher.publish(path, broadcast);
  }
  announced(prefix = empty()) {
    return this.#subscriber.announced(prefix);
  }
  consume(broadcast) {
    return this.#subscriber.consume(broadcast);
  }
  async#runBidis() {
    for (;; ) {
      const stream = await this.#session.acceptBi();
      if (!stream)
        break;
      this.#runBidi(stream).catch((err) => {
        console.error("error processing bidi stream", err);
        stream.abort(new Error("bidi stream error"));
      });
    }
  }
  async#runBidi(stream) {
    const typeId = await stream.reader.u53();
    switch (typeId) {
      case SubscribeNamespace.id: {
        const msg = await SubscribeNamespace.decode(stream.reader, this.#session.version);
        await this.#publisher.runSubscribeNamespace(msg, stream);
        break;
      }
      case SubscribeNamespaceLegacy.id: {
        const legacy = await SubscribeNamespaceLegacy.decode(stream.reader, this.#session.version);
        const msg = new SubscribeNamespace({ requestId: legacy.requestId, namespace: legacy.namespace });
        await this.#publisher.runSubscribeNamespace(msg, stream);
        break;
      }
      case SubscribeUpdate.id: {
        stream.abort(new Error("unexpected REQUEST_UPDATE as initial message"));
        break;
      }
      case Subscribe.id: {
        const msg = await Subscribe.decode(stream.reader, this.#session.version);
        await this.#publisher.runSubscribe(msg, stream);
        break;
      }
      case TrackStatusRequest.id: {
        const msg = await TrackStatusRequest.decode(stream.reader, this.#session.version);
        await this.#publisher.runTrackStatusRequest(msg, stream);
        break;
      }
      case PublishNamespace.id: {
        const msg = await PublishNamespace.decode(stream.reader, this.#session.version);
        await this.#subscriber.runPublishNamespace(msg, stream);
        break;
      }
      case Publish.id: {
        const msg = await Publish.decode(stream.reader, this.#session.version);
        await this.#subscriber.runPublish(msg, stream);
        break;
      }
      default:
        console.warn(`unexpected bidi stream type: 0x${typeId.toString(16)}`);
        stream.abort(new Error("unexpected stream type"));
    }
  }
  async#runUnis() {
    const readers = new Readers(this.#quic, this.#session.version);
    for (;; ) {
      const stream = await readers.next();
      if (!stream)
        break;
      this.#runUni(stream).then(() => {
        stream.stop(new Error("cancel"));
      }).catch((err) => {
        console.error("error processing object stream", err);
        stream.stop(err);
      });
    }
  }
  async#runUni(stream) {
    const header = await Group2.decode(stream, this.#session.version);
    await this.#subscriber.handleGroup(header, stream);
  }
  async#runGoAway(controlStream, version) {
    try {
      const done = await controlStream.reader.done();
      if (done)
        return;
      const typeId = await controlStream.reader.u53();
      if (typeId === GoAway.id) {
        const msg = await GoAway.decode(controlStream.reader, version);
        console.warn(`received GOAWAY with redirect URI: ${msg.newSessionUri}`);
      } else {
        console.warn(`unexpected message on setup stream: 0x${typeId.toString(16)}`);
      }
    } catch (err) {
      if (!this.#closed) {
        console.error("error reading setup stream", err);
      }
    } finally {
      this.close();
    }
  }
  get closed() {
    return this.#quic.closed.then(() => {
      return;
    });
  }
}

// node_modules/@moq/net/ietf/setup.js
init_message();
init_parameters();
init_version();

class Setup {
  static id = 12032;
  parameters;
  constructor({ parameters = new SetupOptions } = {}) {
    this.parameters = parameters;
  }
  async#encode(w, version) {
    await this.parameters.encode(w, version);
  }
  async encode(w, version) {
    return encode3(w, (mw) => this.#encode(mw, version));
  }
  static async#decode(r, version) {
    const parameters = await SetupOptions.decode(r, version);
    return new Setup({ parameters });
  }
  static async decode(r, version) {
    return decode3(r, (mr) => Setup.#decode(mr, version));
  }
}
var MAX_VERSIONS = 128;

class ClientSetup {
  static id = 32;
  versions;
  parameters;
  constructor({ versions, parameters = new SetupOptions }) {
    this.versions = versions;
    this.parameters = parameters;
  }
  async#encode(w, version) {
    if (version === Version.DRAFT_15 || version === Version.DRAFT_16) {
      await this.parameters.encode(w, version);
    } else if (version === Version.DRAFT_14) {
      await w.u53(this.versions.length);
      for (const v of this.versions) {
        await w.u53(v);
      }
      await this.parameters.encode(w, version);
    } else {
      throw new Error("ClientSetup not used for this version");
    }
  }
  async encode(w, version) {
    return encode3(w, (mw) => this.#encode(mw, version));
  }
  static async#decode(r, version) {
    if (version === Version.DRAFT_15 || version === Version.DRAFT_16) {
      const parameters = await SetupOptions.decode(r, version);
      return new ClientSetup({ versions: [version], parameters });
    } else if (version === Version.DRAFT_14) {
      const numVersions = await r.u53();
      if (numVersions > MAX_VERSIONS) {
        throw new Error(`too many versions: ${numVersions}`);
      }
      const supportedVersions = [];
      for (let i = 0;i < numVersions; i++) {
        const v = await r.u53();
        supportedVersions.push(v);
      }
      const parameters = await SetupOptions.decode(r, version);
      return new ClientSetup({ versions: supportedVersions, parameters });
    } else {
      throw new Error("ClientSetup not used for this version");
    }
  }
  static async decode(r, version) {
    return decode3(r, (mr) => ClientSetup.#decode(mr, version));
  }
}

class ServerSetup {
  static id = 33;
  version;
  parameters;
  constructor({ version, parameters = new SetupOptions }) {
    this.version = version;
    this.parameters = parameters;
  }
  async#encode(w, version) {
    if (version === Version.DRAFT_15 || version === Version.DRAFT_16) {
      await this.parameters.encode(w, version);
    } else if (version === Version.DRAFT_14) {
      await w.u53(this.version);
      await this.parameters.encode(w, version);
    } else {
      throw new Error("ServerSetup not used for this version");
    }
  }
  async encode(w, version) {
    return encode3(w, (mw) => this.#encode(mw, version));
  }
  static async#decode(r, version) {
    if (version === Version.DRAFT_15 || version === Version.DRAFT_16) {
      const parameters = await SetupOptions.decode(r, version);
      return new ServerSetup({ version, parameters });
    } else if (version === Version.DRAFT_14) {
      const selectedVersion = await r.u53();
      const parameters = await SetupOptions.decode(r, version);
      return new ServerSetup({ version: selectedVersion, parameters });
    } else {
      throw new Error("ServerSetup not used for this version");
    }
  }
  static async decode(r, version) {
    return decode3(r, (mr) => ServerSetup.#decode(mr, version));
  }
}
// node_modules/@moq/net/lite/message.js
init_stream();
async function encode4(writer, f) {
  let scratch = new Uint8Array;
  const temp = new Writer(new WritableStream({
    write(chunk) {
      const needed = scratch.byteLength + chunk.byteLength;
      if (needed > scratch.buffer.byteLength) {
        const capacity = Math.max(needed, scratch.buffer.byteLength * 2);
        const newBuffer = new ArrayBuffer(capacity);
        const newScratch = new Uint8Array(newBuffer, 0, needed);
        newScratch.set(scratch);
        newScratch.set(chunk, scratch.byteLength);
        scratch = newScratch;
      } else {
        scratch = new Uint8Array(scratch.buffer, 0, needed);
        scratch.set(chunk, needed - chunk.byteLength);
      }
    }
  }));
  await f(temp);
  temp.close();
  await temp.closed;
  await writer.u53(scratch.byteLength);
  if (scratch.byteLength > 0) {
    await writer.write(scratch);
  }
}
async function decode4(reader, f) {
  const size2 = await reader.u53();
  const data = await reader.read(size2);
  const limit = new Reader(undefined, data);
  const msg = await f(limit);
  if (!await limit.done()) {
    throw new Error("Message decoding consumed too few bytes");
  }
  return msg;
}
async function decodeMaybe(reader, f) {
  if (await reader.done())
    return;
  return await decode4(reader, f);
}

// node_modules/zod/v4/core/core.js
var _a;
function $constructor(name, initializer, params) {
  function init(inst, def) {
    if (!inst._zod) {
      Object.defineProperty(inst, "_zod", {
        value: {
          def,
          constr: _,
          traits: new Set
        },
        enumerable: false
      });
    }
    if (inst._zod.traits.has(name)) {
      return;
    }
    inst._zod.traits.add(name);
    initializer(inst, def);
    const proto = _.prototype;
    const keys = Object.keys(proto);
    for (let i = 0;i < keys.length; i++) {
      const k = keys[i];
      if (!(k in inst)) {
        inst[k] = proto[k].bind(inst);
      }
    }
  }
  const Parent = params?.Parent ?? Object;

  class Definition extends Parent {
  }
  Object.defineProperty(Definition, "name", { value: name });
  function _(def) {
    var _a2;
    const inst = params?.Parent ? new Definition : this;
    init(inst, def);
    (_a2 = inst._zod).deferred ?? (_a2.deferred = []);
    for (const fn of inst._zod.deferred) {
      fn();
    }
    return inst;
  }
  Object.defineProperty(_, "init", { value: init });
  Object.defineProperty(_, Symbol.hasInstance, {
    value: (inst) => {
      if (params?.Parent && inst instanceof params.Parent)
        return true;
      return inst?._zod?.traits?.has(name);
    }
  });
  Object.defineProperty(_, "name", { value: name });
  return _;
}
var $brand = Symbol("zod_brand");

class $ZodAsyncError extends Error {
  constructor() {
    super(`Encountered Promise during synchronous parse. Use .parseAsync() instead.`);
  }
}

class $ZodEncodeError extends Error {
  constructor(name) {
    super(`Encountered unidirectional transform during encode: ${name}`);
    this.name = "ZodEncodeError";
  }
}
(_a = globalThis).__zod_globalConfig ?? (_a.__zod_globalConfig = {});
var globalConfig = globalThis.__zod_globalConfig;
function config(newConfig) {
  if (newConfig)
    Object.assign(globalConfig, newConfig);
  return globalConfig;
}

// node_modules/zod/v4/core/util.js
function getEnumValues(entries) {
  const numericValues = Object.values(entries).filter((v) => typeof v === "number");
  const values = Object.entries(entries).filter(([k, _]) => numericValues.indexOf(+k) === -1).map(([_, v]) => v);
  return values;
}
function jsonStringifyReplacer(_, value) {
  if (typeof value === "bigint")
    return value.toString();
  return value;
}
function cached(getter) {
  const set = false;
  return {
    get value() {
      if (!set) {
        const value = getter();
        Object.defineProperty(this, "value", { value });
        return value;
      }
      throw new Error("cached value already set");
    }
  };
}
function cleanRegex(source) {
  const start = source.startsWith("^") ? 1 : 0;
  const end = source.endsWith("$") ? source.length - 1 : source.length;
  return source.slice(start, end);
}
var EVALUATING = /* @__PURE__ */ Symbol("evaluating");
function defineLazy(object, key, getter) {
  let value = undefined;
  Object.defineProperty(object, key, {
    get() {
      if (value === EVALUATING) {
        return;
      }
      if (value === undefined) {
        value = EVALUATING;
        value = getter();
      }
      return value;
    },
    set(v) {
      Object.defineProperty(object, key, {
        value: v
      });
    },
    configurable: true
  });
}
var captureStackTrace = "captureStackTrace" in Error ? Error.captureStackTrace : (..._args) => {};
function isObject(data) {
  return typeof data === "object" && data !== null && !Array.isArray(data);
}
function isPlainObject(o) {
  if (isObject(o) === false)
    return false;
  const ctor = o.constructor;
  if (ctor === undefined)
    return true;
  if (typeof ctor !== "function")
    return true;
  const prot = ctor.prototype;
  if (isObject(prot) === false)
    return false;
  if (Object.prototype.hasOwnProperty.call(prot, "isPrototypeOf") === false) {
    return false;
  }
  return true;
}
function shallowClone(o) {
  if (isPlainObject(o))
    return { ...o };
  if (Array.isArray(o))
    return [...o];
  if (o instanceof Map)
    return new Map(o);
  if (o instanceof Set)
    return new Set(o);
  return o;
}
var propertyKeyTypes = /* @__PURE__ */ new Set(["string", "number", "symbol"]);
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function clone(inst, def, params) {
  const cl = new inst._zod.constr(def ?? inst._zod.def);
  if (!def || params?.parent)
    cl._zod.parent = inst;
  return cl;
}
function normalizeParams(_params) {
  const params = _params;
  if (!params)
    return {};
  if (typeof params === "string")
    return { error: () => params };
  if (params?.message !== undefined) {
    if (params?.error !== undefined)
      throw new Error("Cannot specify both `message` and `error` params");
    params.error = params.message;
  }
  delete params.message;
  if (typeof params.error === "string")
    return { ...params, error: () => params.error };
  return params;
}
function optionalKeys(shape) {
  return Object.keys(shape).filter((k) => {
    return shape[k]._zod.optin === "optional" && shape[k]._zod.optout === "optional";
  });
}
var NUMBER_FORMAT_RANGES = {
  safeint: [Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER],
  int32: [-2147483648, 2147483647],
  uint32: [0, 4294967295],
  float32: [-340282346638528860000000000000000000000, 340282346638528860000000000000000000000],
  float64: [-Number.MAX_VALUE, Number.MAX_VALUE]
};
function aborted(x, startIndex = 0) {
  if (x.aborted === true)
    return true;
  for (let i = startIndex;i < x.issues.length; i++) {
    if (x.issues[i]?.continue !== true) {
      return true;
    }
  }
  return false;
}
function explicitlyAborted(x, startIndex = 0) {
  if (x.aborted === true)
    return true;
  for (let i = startIndex;i < x.issues.length; i++) {
    if (x.issues[i]?.continue === false) {
      return true;
    }
  }
  return false;
}
function prefixIssues(path, issues) {
  return issues.map((iss) => {
    var _a2;
    (_a2 = iss).path ?? (_a2.path = []);
    iss.path.unshift(path);
    return iss;
  });
}
function unwrapMessage(message) {
  return typeof message === "string" ? message : message?.message;
}
function finalizeIssue(iss, ctx, config2) {
  const message = iss.message ? iss.message : unwrapMessage(iss.inst?._zod.def?.error?.(iss)) ?? unwrapMessage(ctx?.error?.(iss)) ?? unwrapMessage(config2.customError?.(iss)) ?? unwrapMessage(config2.localeError?.(iss)) ?? "Invalid input";
  const { inst: _inst, continue: _continue, input: _input, ...rest } = iss;
  rest.path ?? (rest.path = []);
  rest.message = message;
  if (ctx?.reportInput) {
    rest.input = _input;
  }
  return rest;
}
function issue(...args) {
  const [iss, input, inst] = args;
  if (typeof iss === "string") {
    return {
      message: iss,
      code: "custom",
      input,
      inst
    };
  }
  return { ...iss };
}

// node_modules/zod/v4/core/errors.js
var initializer = (inst, def) => {
  inst.name = "$ZodError";
  Object.defineProperty(inst, "_zod", {
    value: inst._zod,
    enumerable: false
  });
  Object.defineProperty(inst, "issues", {
    value: def,
    enumerable: false
  });
  inst.message = JSON.stringify(def, jsonStringifyReplacer, 2);
  Object.defineProperty(inst, "toString", {
    value: () => inst.message,
    enumerable: false
  });
};
var $ZodError = $constructor("$ZodError", initializer);
var $ZodRealError = $constructor("$ZodError", initializer, { Parent: Error });

// node_modules/zod/v4/core/parse.js
var _parse = (_Err) => (schema, value, _ctx, _params) => {
  const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
  const result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise) {
    throw new $ZodAsyncError;
  }
  if (result.issues.length) {
    const e = new (_params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
    captureStackTrace(e, _params?.callee);
    throw e;
  }
  return result.value;
};
var parse = /* @__PURE__ */ _parse($ZodRealError);
var _parseAsync = (_Err) => async (schema, value, _ctx, params) => {
  const ctx = _ctx ? { ..._ctx, async: true } : { async: true };
  let result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise)
    result = await result;
  if (result.issues.length) {
    const e = new (params?.Err ?? _Err)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())));
    captureStackTrace(e, params?.callee);
    throw e;
  }
  return result.value;
};
var parseAsync = /* @__PURE__ */ _parseAsync($ZodRealError);
var _safeParse = (_Err) => (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, async: false } : { async: false };
  const result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise) {
    throw new $ZodAsyncError;
  }
  return result.issues.length ? {
    success: false,
    error: new (_Err ?? $ZodError)(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  } : { success: true, data: result.value };
};
var safeParse = /* @__PURE__ */ _safeParse($ZodRealError);
var _safeParseAsync = (_Err) => async (schema, value, _ctx) => {
  const ctx = _ctx ? { ..._ctx, async: true } : { async: true };
  let result = schema._zod.run({ value, issues: [] }, ctx);
  if (result instanceof Promise)
    result = await result;
  return result.issues.length ? {
    success: false,
    error: new _Err(result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  } : { success: true, data: result.value };
};
var safeParseAsync = /* @__PURE__ */ _safeParseAsync($ZodRealError);

// node_modules/zod/v4/core/regexes.js
var base64 = /^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/;
var dateSource = `(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))`;
var date = /* @__PURE__ */ new RegExp(`^${dateSource}$`);
var string = (params) => {
  const regex = params ? `[\\s\\S]{${params?.minimum ?? 0},${params?.maximum ?? ""}}` : `[\\s\\S]*`;
  return new RegExp(`^${regex}$`);
};
var bigint = /^-?\d+n?$/;
var integer = /^-?\d+$/;
var number = /^-?\d+(?:\.\d+)?$/;
var boolean = /^(?:true|false)$/i;

// node_modules/zod/v4/core/checks.js
var $ZodCheck = /* @__PURE__ */ $constructor("$ZodCheck", (inst, def) => {
  var _a2;
  inst._zod ?? (inst._zod = {});
  inst._zod.def = def;
  (_a2 = inst._zod).onattach ?? (_a2.onattach = []);
});
var numericOriginMap = {
  number: "number",
  bigint: "bigint",
  object: "date"
};
var $ZodCheckLessThan = /* @__PURE__ */ $constructor("$ZodCheckLessThan", (inst, def) => {
  $ZodCheck.init(inst, def);
  const origin = numericOriginMap[typeof def.value];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    const curr = (def.inclusive ? bag.maximum : bag.exclusiveMaximum) ?? Number.POSITIVE_INFINITY;
    if (def.value < curr) {
      if (def.inclusive)
        bag.maximum = def.value;
      else
        bag.exclusiveMaximum = def.value;
    }
  });
  inst._zod.check = (payload) => {
    if (def.inclusive ? payload.value <= def.value : payload.value < def.value) {
      return;
    }
    payload.issues.push({
      origin,
      code: "too_big",
      maximum: typeof def.value === "object" ? def.value.getTime() : def.value,
      input: payload.value,
      inclusive: def.inclusive,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckGreaterThan = /* @__PURE__ */ $constructor("$ZodCheckGreaterThan", (inst, def) => {
  $ZodCheck.init(inst, def);
  const origin = numericOriginMap[typeof def.value];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    const curr = (def.inclusive ? bag.minimum : bag.exclusiveMinimum) ?? Number.NEGATIVE_INFINITY;
    if (def.value > curr) {
      if (def.inclusive)
        bag.minimum = def.value;
      else
        bag.exclusiveMinimum = def.value;
    }
  });
  inst._zod.check = (payload) => {
    if (def.inclusive ? payload.value >= def.value : payload.value > def.value) {
      return;
    }
    payload.issues.push({
      origin,
      code: "too_small",
      minimum: typeof def.value === "object" ? def.value.getTime() : def.value,
      input: payload.value,
      inclusive: def.inclusive,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodCheckNumberFormat = /* @__PURE__ */ $constructor("$ZodCheckNumberFormat", (inst, def) => {
  $ZodCheck.init(inst, def);
  def.format = def.format || "float64";
  const isInt = def.format?.includes("int");
  const origin = isInt ? "int" : "number";
  const [minimum, maximum] = NUMBER_FORMAT_RANGES[def.format];
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = def.format;
    bag.minimum = minimum;
    bag.maximum = maximum;
    if (isInt)
      bag.pattern = integer;
  });
  inst._zod.check = (payload) => {
    const input = payload.value;
    if (isInt) {
      if (!Number.isInteger(input)) {
        payload.issues.push({
          expected: origin,
          format: def.format,
          code: "invalid_type",
          continue: false,
          input,
          inst
        });
        return;
      }
      if (!Number.isSafeInteger(input)) {
        if (input > 0) {
          payload.issues.push({
            input,
            code: "too_big",
            maximum: Number.MAX_SAFE_INTEGER,
            note: "Integers must be within the safe integer range.",
            inst,
            origin,
            inclusive: true,
            continue: !def.abort
          });
        } else {
          payload.issues.push({
            input,
            code: "too_small",
            minimum: Number.MIN_SAFE_INTEGER,
            note: "Integers must be within the safe integer range.",
            inst,
            origin,
            inclusive: true,
            continue: !def.abort
          });
        }
        return;
      }
    }
    if (input < minimum) {
      payload.issues.push({
        origin: "number",
        input,
        code: "too_small",
        minimum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
    if (input > maximum) {
      payload.issues.push({
        origin: "number",
        input,
        code: "too_big",
        maximum,
        inclusive: true,
        inst,
        continue: !def.abort
      });
    }
  };
});
var $ZodCheckStringFormat = /* @__PURE__ */ $constructor("$ZodCheckStringFormat", (inst, def) => {
  var _a2, _b;
  $ZodCheck.init(inst, def);
  inst._zod.onattach.push((inst2) => {
    const bag = inst2._zod.bag;
    bag.format = def.format;
    if (def.pattern) {
      bag.patterns ?? (bag.patterns = new Set);
      bag.patterns.add(def.pattern);
    }
  });
  if (def.pattern)
    (_a2 = inst._zod).check ?? (_a2.check = (payload) => {
      def.pattern.lastIndex = 0;
      if (def.pattern.test(payload.value))
        return;
      payload.issues.push({
        origin: "string",
        code: "invalid_format",
        format: def.format,
        input: payload.value,
        ...def.pattern ? { pattern: def.pattern.toString() } : {},
        inst,
        continue: !def.abort
      });
    });
  else
    (_b = inst._zod).check ?? (_b.check = () => {});
});

// node_modules/zod/v4/core/versions.js
var version = {
  major: 4,
  minor: 4,
  patch: 3
};

// node_modules/zod/v4/core/schemas.js
var $ZodType = /* @__PURE__ */ $constructor("$ZodType", (inst, def) => {
  var _a2;
  inst ?? (inst = {});
  inst._zod.def = def;
  inst._zod.bag = inst._zod.bag || {};
  inst._zod.version = version;
  const checks = [...inst._zod.def.checks ?? []];
  if (inst._zod.traits.has("$ZodCheck")) {
    checks.unshift(inst);
  }
  for (const ch of checks) {
    for (const fn of ch._zod.onattach) {
      fn(inst);
    }
  }
  if (checks.length === 0) {
    (_a2 = inst._zod).deferred ?? (_a2.deferred = []);
    inst._zod.deferred?.push(() => {
      inst._zod.run = inst._zod.parse;
    });
  } else {
    const runChecks = (payload, checks2, ctx) => {
      let isAborted = aborted(payload);
      let asyncResult;
      for (const ch of checks2) {
        if (ch._zod.def.when) {
          if (explicitlyAborted(payload))
            continue;
          const shouldRun = ch._zod.def.when(payload);
          if (!shouldRun)
            continue;
        } else if (isAborted) {
          continue;
        }
        const currLen = payload.issues.length;
        const _ = ch._zod.check(payload);
        if (_ instanceof Promise && ctx?.async === false) {
          throw new $ZodAsyncError;
        }
        if (asyncResult || _ instanceof Promise) {
          asyncResult = (asyncResult ?? Promise.resolve()).then(async () => {
            await _;
            const nextLen = payload.issues.length;
            if (nextLen === currLen)
              return;
            if (!isAborted)
              isAborted = aborted(payload, currLen);
          });
        } else {
          const nextLen = payload.issues.length;
          if (nextLen === currLen)
            continue;
          if (!isAborted)
            isAborted = aborted(payload, currLen);
        }
      }
      if (asyncResult) {
        return asyncResult.then(() => {
          return payload;
        });
      }
      return payload;
    };
    const handleCanaryResult = (canary, payload, ctx) => {
      if (aborted(canary)) {
        canary.aborted = true;
        return canary;
      }
      const checkResult = runChecks(payload, checks, ctx);
      if (checkResult instanceof Promise) {
        if (ctx.async === false)
          throw new $ZodAsyncError;
        return checkResult.then((checkResult2) => inst._zod.parse(checkResult2, ctx));
      }
      return inst._zod.parse(checkResult, ctx);
    };
    inst._zod.run = (payload, ctx) => {
      if (ctx.skipChecks) {
        return inst._zod.parse(payload, ctx);
      }
      if (ctx.direction === "backward") {
        const canary = inst._zod.parse({ value: payload.value, issues: [] }, { ...ctx, skipChecks: true });
        if (canary instanceof Promise) {
          return canary.then((canary2) => {
            return handleCanaryResult(canary2, payload, ctx);
          });
        }
        return handleCanaryResult(canary, payload, ctx);
      }
      const result = inst._zod.parse(payload, ctx);
      if (result instanceof Promise) {
        if (ctx.async === false)
          throw new $ZodAsyncError;
        return result.then((result2) => runChecks(result2, checks, ctx));
      }
      return runChecks(result, checks, ctx);
    };
  }
  defineLazy(inst, "~standard", () => ({
    validate: (value) => {
      try {
        const r = safeParse(inst, value);
        return r.success ? { value: r.data } : { issues: r.error?.issues };
      } catch (_) {
        return safeParseAsync(inst, value).then((r) => r.success ? { value: r.data } : { issues: r.error?.issues });
      }
    },
    vendor: "zod",
    version: 1
  }));
});
var $ZodString = /* @__PURE__ */ $constructor("$ZodString", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = [...inst?._zod.bag?.patterns ?? []].pop() ?? string(inst._zod.bag);
  inst._zod.parse = (payload, _) => {
    if (def.coerce)
      try {
        payload.value = String(payload.value);
      } catch (_2) {}
    if (typeof payload.value === "string")
      return payload;
    payload.issues.push({
      expected: "string",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
var $ZodStringFormat = /* @__PURE__ */ $constructor("$ZodStringFormat", (inst, def) => {
  $ZodCheckStringFormat.init(inst, def);
  $ZodString.init(inst, def);
});
function isValidBase64(data) {
  if (data === "")
    return true;
  if (/\s/.test(data))
    return false;
  if (data.length % 4 !== 0)
    return false;
  try {
    atob(data);
    return true;
  } catch {
    return false;
  }
}
var $ZodBase64 = /* @__PURE__ */ $constructor("$ZodBase64", (inst, def) => {
  def.pattern ?? (def.pattern = base64);
  $ZodStringFormat.init(inst, def);
  inst._zod.bag.contentEncoding = "base64";
  inst._zod.check = (payload) => {
    if (isValidBase64(payload.value))
      return;
    payload.issues.push({
      code: "invalid_format",
      format: "base64",
      input: payload.value,
      inst,
      continue: !def.abort
    });
  };
});
var $ZodNumber = /* @__PURE__ */ $constructor("$ZodNumber", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = inst._zod.bag.pattern ?? number;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = Number(payload.value);
      } catch (_) {}
    const input = payload.value;
    if (typeof input === "number" && !Number.isNaN(input) && Number.isFinite(input)) {
      return payload;
    }
    const received = typeof input === "number" ? Number.isNaN(input) ? "NaN" : !Number.isFinite(input) ? "Infinity" : undefined : undefined;
    payload.issues.push({
      expected: "number",
      code: "invalid_type",
      input,
      inst,
      ...received ? { received } : {}
    });
    return payload;
  };
});
var $ZodNumberFormat = /* @__PURE__ */ $constructor("$ZodNumberFormat", (inst, def) => {
  $ZodCheckNumberFormat.init(inst, def);
  $ZodNumber.init(inst, def);
});
var $ZodBoolean = /* @__PURE__ */ $constructor("$ZodBoolean", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = boolean;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = Boolean(payload.value);
      } catch (_) {}
    const input = payload.value;
    if (typeof input === "boolean")
      return payload;
    payload.issues.push({
      expected: "boolean",
      code: "invalid_type",
      input,
      inst
    });
    return payload;
  };
});
var $ZodBigInt = /* @__PURE__ */ $constructor("$ZodBigInt", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.pattern = bigint;
  inst._zod.parse = (payload, _ctx) => {
    if (def.coerce)
      try {
        payload.value = BigInt(payload.value);
      } catch (_) {}
    if (typeof payload.value === "bigint")
      return payload;
    payload.issues.push({
      expected: "bigint",
      code: "invalid_type",
      input: payload.value,
      inst
    });
    return payload;
  };
});
var $ZodUnknown = /* @__PURE__ */ $constructor("$ZodUnknown", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload) => payload;
});
function handleArrayResult(result, final, index) {
  if (result.issues.length) {
    final.issues.push(...prefixIssues(index, result.issues));
  }
  final.value[index] = result.value;
}
var $ZodArray = /* @__PURE__ */ $constructor("$ZodArray", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!Array.isArray(input)) {
      payload.issues.push({
        expected: "array",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    payload.value = Array(input.length);
    const proms = [];
    for (let i = 0;i < input.length; i++) {
      const item = input[i];
      const result = def.element._zod.run({
        value: item,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        proms.push(result.then((result2) => handleArrayResult(result2, payload, i)));
      } else {
        handleArrayResult(result, payload, i);
      }
    }
    if (proms.length) {
      return Promise.all(proms).then(() => payload);
    }
    return payload;
  };
});
function handlePropertyResult(result, final, key, input, isOptionalIn, isOptionalOut) {
  const isPresent = key in input;
  if (result.issues.length) {
    if (isOptionalIn && isOptionalOut && !isPresent) {
      return;
    }
    final.issues.push(...prefixIssues(key, result.issues));
  }
  if (!isPresent && !isOptionalIn) {
    if (!result.issues.length) {
      final.issues.push({
        code: "invalid_type",
        expected: "nonoptional",
        input: undefined,
        path: [key]
      });
    }
    return;
  }
  if (result.value === undefined) {
    if (isPresent) {
      final.value[key] = undefined;
    }
  } else {
    final.value[key] = result.value;
  }
}
function normalizeDef(def) {
  const keys = Object.keys(def.shape);
  for (const k of keys) {
    if (!def.shape?.[k]?._zod?.traits?.has("$ZodType")) {
      throw new Error(`Invalid element at key "${k}": expected a Zod schema`);
    }
  }
  const okeys = optionalKeys(def.shape);
  return {
    ...def,
    keys,
    keySet: new Set(keys),
    numKeys: keys.length,
    optionalKeys: new Set(okeys)
  };
}
function handleCatchall(proms, input, payload, ctx, def, inst) {
  const unrecognized = [];
  const keySet = def.keySet;
  const _catchall = def.catchall._zod;
  const t = _catchall.def.type;
  const isOptionalIn = _catchall.optin === "optional";
  const isOptionalOut = _catchall.optout === "optional";
  for (const key in input) {
    if (key === "__proto__")
      continue;
    if (keySet.has(key))
      continue;
    if (t === "never") {
      unrecognized.push(key);
      continue;
    }
    const r = _catchall.run({ value: input[key], issues: [] }, ctx);
    if (r instanceof Promise) {
      proms.push(r.then((r2) => handlePropertyResult(r2, payload, key, input, isOptionalIn, isOptionalOut)));
    } else {
      handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
    }
  }
  if (unrecognized.length) {
    payload.issues.push({
      code: "unrecognized_keys",
      keys: unrecognized,
      input,
      inst
    });
  }
  if (!proms.length)
    return payload;
  return Promise.all(proms).then(() => {
    return payload;
  });
}
var $ZodObject = /* @__PURE__ */ $constructor("$ZodObject", (inst, def) => {
  $ZodType.init(inst, def);
  const desc = Object.getOwnPropertyDescriptor(def, "shape");
  if (!desc?.get) {
    const sh = def.shape;
    Object.defineProperty(def, "shape", {
      get: () => {
        const newSh = { ...sh };
        Object.defineProperty(def, "shape", {
          value: newSh
        });
        return newSh;
      }
    });
  }
  const _normalized = cached(() => normalizeDef(def));
  defineLazy(inst._zod, "propValues", () => {
    const shape = def.shape;
    const propValues = {};
    for (const key in shape) {
      const field = shape[key]._zod;
      if (field.values) {
        propValues[key] ?? (propValues[key] = new Set);
        for (const v of field.values)
          propValues[key].add(v);
      }
    }
    return propValues;
  });
  const isObject2 = isObject;
  const catchall = def.catchall;
  let value;
  inst._zod.parse = (payload, ctx) => {
    value ?? (value = _normalized.value);
    const input = payload.value;
    if (!isObject2(input)) {
      payload.issues.push({
        expected: "object",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    payload.value = {};
    const proms = [];
    const shape = value.shape;
    for (const key of value.keys) {
      const el = shape[key];
      const isOptionalIn = el._zod.optin === "optional";
      const isOptionalOut = el._zod.optout === "optional";
      const r = el._zod.run({ value: input[key], issues: [] }, ctx);
      if (r instanceof Promise) {
        proms.push(r.then((r2) => handlePropertyResult(r2, payload, key, input, isOptionalIn, isOptionalOut)));
      } else {
        handlePropertyResult(r, payload, key, input, isOptionalIn, isOptionalOut);
      }
    }
    if (!catchall) {
      return proms.length ? Promise.all(proms).then(() => payload) : payload;
    }
    return handleCatchall(proms, input, payload, ctx, _normalized.value, inst);
  };
});
function handleUnionResults(results, final, inst, ctx) {
  for (const result of results) {
    if (result.issues.length === 0) {
      final.value = result.value;
      return final;
    }
  }
  const nonaborted = results.filter((r) => !aborted(r));
  if (nonaborted.length === 1) {
    final.value = nonaborted[0].value;
    return nonaborted[0];
  }
  final.issues.push({
    code: "invalid_union",
    input: final.value,
    inst,
    errors: results.map((result) => result.issues.map((iss) => finalizeIssue(iss, ctx, config())))
  });
  return final;
}
var $ZodUnion = /* @__PURE__ */ $constructor("$ZodUnion", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "optin", () => def.options.some((o) => o._zod.optin === "optional") ? "optional" : undefined);
  defineLazy(inst._zod, "optout", () => def.options.some((o) => o._zod.optout === "optional") ? "optional" : undefined);
  defineLazy(inst._zod, "values", () => {
    if (def.options.every((o) => o._zod.values)) {
      return new Set(def.options.flatMap((option) => Array.from(option._zod.values)));
    }
    return;
  });
  defineLazy(inst._zod, "pattern", () => {
    if (def.options.every((o) => o._zod.pattern)) {
      const patterns = def.options.map((o) => o._zod.pattern);
      return new RegExp(`^(${patterns.map((p) => cleanRegex(p.source)).join("|")})$`);
    }
    return;
  });
  const first = def.options.length === 1 ? def.options[0]._zod.run : null;
  inst._zod.parse = (payload, ctx) => {
    if (first) {
      return first(payload, ctx);
    }
    let async = false;
    const results = [];
    for (const option of def.options) {
      const result = option._zod.run({
        value: payload.value,
        issues: []
      }, ctx);
      if (result instanceof Promise) {
        results.push(result);
        async = true;
      } else {
        if (result.issues.length === 0)
          return result;
        results.push(result);
      }
    }
    if (!async)
      return handleUnionResults(results, payload, inst, ctx);
    return Promise.all(results).then((results2) => {
      return handleUnionResults(results2, payload, inst, ctx);
    });
  };
});
var $ZodDiscriminatedUnion = /* @__PURE__ */ $constructor("$ZodDiscriminatedUnion", (inst, def) => {
  def.inclusive = false;
  $ZodUnion.init(inst, def);
  const _super = inst._zod.parse;
  defineLazy(inst._zod, "propValues", () => {
    const propValues = {};
    for (const option of def.options) {
      const pv = option._zod.propValues;
      if (!pv || Object.keys(pv).length === 0)
        throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(option)}"`);
      for (const [k, v] of Object.entries(pv)) {
        if (!propValues[k])
          propValues[k] = new Set;
        for (const val of v) {
          propValues[k].add(val);
        }
      }
    }
    return propValues;
  });
  const disc = cached(() => {
    const opts = def.options;
    const map = new Map;
    for (const o of opts) {
      const values = o._zod.propValues?.[def.discriminator];
      if (!values || values.size === 0)
        throw new Error(`Invalid discriminated union option at index "${def.options.indexOf(o)}"`);
      for (const v of values) {
        if (map.has(v)) {
          throw new Error(`Duplicate discriminator value "${String(v)}"`);
        }
        map.set(v, o);
      }
    }
    return map;
  });
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!isObject(input)) {
      payload.issues.push({
        code: "invalid_type",
        expected: "object",
        input,
        inst
      });
      return payload;
    }
    const opt = disc.value.get(input?.[def.discriminator]);
    if (opt) {
      return opt._zod.run(payload, ctx);
    }
    if (def.unionFallback || ctx.direction === "backward") {
      return _super(payload, ctx);
    }
    payload.issues.push({
      code: "invalid_union",
      errors: [],
      note: "No matching discriminator",
      discriminator: def.discriminator,
      options: Array.from(disc.value.keys()),
      input,
      path: [def.discriminator],
      inst
    });
    return payload;
  };
});
var $ZodRecord = /* @__PURE__ */ $constructor("$ZodRecord", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, ctx) => {
    const input = payload.value;
    if (!isPlainObject(input)) {
      payload.issues.push({
        expected: "record",
        code: "invalid_type",
        input,
        inst
      });
      return payload;
    }
    const proms = [];
    const values = def.keyType._zod.values;
    if (values) {
      payload.value = {};
      const recordKeys = new Set;
      for (const key of values) {
        if (typeof key === "string" || typeof key === "number" || typeof key === "symbol") {
          recordKeys.add(typeof key === "number" ? key.toString() : key);
          const keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
          if (keyResult instanceof Promise) {
            throw new Error("Async schemas not supported in object keys currently");
          }
          if (keyResult.issues.length) {
            payload.issues.push({
              code: "invalid_key",
              origin: "record",
              issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
              input: key,
              path: [key],
              inst
            });
            continue;
          }
          const outKey = keyResult.value;
          const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
          if (result instanceof Promise) {
            proms.push(result.then((result2) => {
              if (result2.issues.length) {
                payload.issues.push(...prefixIssues(key, result2.issues));
              }
              payload.value[outKey] = result2.value;
            }));
          } else {
            if (result.issues.length) {
              payload.issues.push(...prefixIssues(key, result.issues));
            }
            payload.value[outKey] = result.value;
          }
        }
      }
      let unrecognized;
      for (const key in input) {
        if (!recordKeys.has(key)) {
          unrecognized = unrecognized ?? [];
          unrecognized.push(key);
        }
      }
      if (unrecognized && unrecognized.length > 0) {
        payload.issues.push({
          code: "unrecognized_keys",
          input,
          inst,
          keys: unrecognized
        });
      }
    } else {
      payload.value = {};
      for (const key of Reflect.ownKeys(input)) {
        if (key === "__proto__")
          continue;
        if (!Object.prototype.propertyIsEnumerable.call(input, key))
          continue;
        let keyResult = def.keyType._zod.run({ value: key, issues: [] }, ctx);
        if (keyResult instanceof Promise) {
          throw new Error("Async schemas not supported in object keys currently");
        }
        const checkNumericKey = typeof key === "string" && number.test(key) && keyResult.issues.length;
        if (checkNumericKey) {
          const retryResult = def.keyType._zod.run({ value: Number(key), issues: [] }, ctx);
          if (retryResult instanceof Promise) {
            throw new Error("Async schemas not supported in object keys currently");
          }
          if (retryResult.issues.length === 0) {
            keyResult = retryResult;
          }
        }
        if (keyResult.issues.length) {
          if (def.mode === "loose") {
            payload.value[key] = input[key];
          } else {
            payload.issues.push({
              code: "invalid_key",
              origin: "record",
              issues: keyResult.issues.map((iss) => finalizeIssue(iss, ctx, config())),
              input: key,
              path: [key],
              inst
            });
          }
          continue;
        }
        const result = def.valueType._zod.run({ value: input[key], issues: [] }, ctx);
        if (result instanceof Promise) {
          proms.push(result.then((result2) => {
            if (result2.issues.length) {
              payload.issues.push(...prefixIssues(key, result2.issues));
            }
            payload.value[keyResult.value] = result2.value;
          }));
        } else {
          if (result.issues.length) {
            payload.issues.push(...prefixIssues(key, result.issues));
          }
          payload.value[keyResult.value] = result.value;
        }
      }
    }
    if (proms.length) {
      return Promise.all(proms).then(() => payload);
    }
    return payload;
  };
});
var $ZodEnum = /* @__PURE__ */ $constructor("$ZodEnum", (inst, def) => {
  $ZodType.init(inst, def);
  const values = getEnumValues(def.entries);
  const valuesSet = new Set(values);
  inst._zod.values = valuesSet;
  inst._zod.pattern = new RegExp(`^(${values.filter((k) => propertyKeyTypes.has(typeof k)).map((o) => typeof o === "string" ? escapeRegex(o) : o.toString()).join("|")})$`);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (valuesSet.has(input)) {
      return payload;
    }
    payload.issues.push({
      code: "invalid_value",
      values,
      input,
      inst
    });
    return payload;
  };
});
var $ZodLiteral = /* @__PURE__ */ $constructor("$ZodLiteral", (inst, def) => {
  $ZodType.init(inst, def);
  if (def.values.length === 0) {
    throw new Error("Cannot create literal schema with no valid values");
  }
  const values = new Set(def.values);
  inst._zod.values = values;
  inst._zod.pattern = new RegExp(`^(${def.values.map((o) => typeof o === "string" ? escapeRegex(o) : o ? escapeRegex(o.toString()) : String(o)).join("|")})$`);
  inst._zod.parse = (payload, _ctx) => {
    const input = payload.value;
    if (values.has(input)) {
      return payload;
    }
    payload.issues.push({
      code: "invalid_value",
      values: def.values,
      input,
      inst
    });
    return payload;
  };
});
var $ZodTransform = /* @__PURE__ */ $constructor("$ZodTransform", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      throw new $ZodEncodeError(inst.constructor.name);
    }
    const _out = def.transform(payload.value, payload);
    if (ctx.async) {
      const output = _out instanceof Promise ? _out : Promise.resolve(_out);
      return output.then((output2) => {
        payload.value = output2;
        payload.fallback = true;
        return payload;
      });
    }
    if (_out instanceof Promise) {
      throw new $ZodAsyncError;
    }
    payload.value = _out;
    payload.fallback = true;
    return payload;
  };
});
function handleOptionalResult(result, input) {
  if (input === undefined && (result.issues.length || result.fallback)) {
    return { issues: [], value: undefined };
  }
  return result;
}
var $ZodOptional = /* @__PURE__ */ $constructor("$ZodOptional", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  inst._zod.optout = "optional";
  defineLazy(inst._zod, "values", () => {
    return def.innerType._zod.values ? new Set([...def.innerType._zod.values, undefined]) : undefined;
  });
  defineLazy(inst._zod, "pattern", () => {
    const pattern = def.innerType._zod.pattern;
    return pattern ? new RegExp(`^(${cleanRegex(pattern.source)})?$`) : undefined;
  });
  inst._zod.parse = (payload, ctx) => {
    if (def.innerType._zod.optin === "optional") {
      const input = payload.value;
      const result = def.innerType._zod.run(payload, ctx);
      if (result instanceof Promise)
        return result.then((r) => handleOptionalResult(r, input));
      return handleOptionalResult(result, input);
    }
    if (payload.value === undefined) {
      return payload;
    }
    return def.innerType._zod.run(payload, ctx);
  };
});
var $ZodDefault = /* @__PURE__ */ $constructor("$ZodDefault", (inst, def) => {
  $ZodType.init(inst, def);
  inst._zod.optin = "optional";
  defineLazy(inst._zod, "values", () => def.innerType._zod.values);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      return def.innerType._zod.run(payload, ctx);
    }
    if (payload.value === undefined) {
      payload.value = def.defaultValue;
      return payload;
    }
    const result = def.innerType._zod.run(payload, ctx);
    if (result instanceof Promise) {
      return result.then((result2) => handleDefaultResult(result2, def));
    }
    return handleDefaultResult(result, def);
  };
});
function handleDefaultResult(payload, def) {
  if (payload.value === undefined) {
    payload.value = def.defaultValue;
  }
  return payload;
}
var $ZodPipe = /* @__PURE__ */ $constructor("$ZodPipe", (inst, def) => {
  $ZodType.init(inst, def);
  defineLazy(inst._zod, "values", () => def.in._zod.values);
  defineLazy(inst._zod, "optin", () => def.in._zod.optin);
  defineLazy(inst._zod, "optout", () => def.out._zod.optout);
  defineLazy(inst._zod, "propValues", () => def.in._zod.propValues);
  inst._zod.parse = (payload, ctx) => {
    if (ctx.direction === "backward") {
      const right = def.out._zod.run(payload, ctx);
      if (right instanceof Promise) {
        return right.then((right2) => handlePipeResult(right2, def.in, ctx));
      }
      return handlePipeResult(right, def.in, ctx);
    }
    const left = def.in._zod.run(payload, ctx);
    if (left instanceof Promise) {
      return left.then((left2) => handlePipeResult(left2, def.out, ctx));
    }
    return handlePipeResult(left, def.out, ctx);
  };
});
function handlePipeResult(left, next, ctx) {
  if (left.issues.length) {
    left.aborted = true;
    return left;
  }
  return next._zod.run({ value: left.value, issues: left.issues, fallback: left.fallback }, ctx);
}
var $ZodCustom = /* @__PURE__ */ $constructor("$ZodCustom", (inst, def) => {
  $ZodCheck.init(inst, def);
  $ZodType.init(inst, def);
  inst._zod.parse = (payload, _) => {
    return payload;
  };
  inst._zod.check = (payload) => {
    const input = payload.value;
    const r = def.fn(input);
    if (r instanceof Promise) {
      return r.then((r2) => handleRefineResult(r2, payload, input, inst));
    }
    handleRefineResult(r, payload, input, inst);
    return;
  };
});
function handleRefineResult(result, payload, input, inst) {
  if (!result) {
    const _iss = {
      code: "custom",
      input,
      inst,
      path: [...inst._zod.def.path ?? []],
      continue: !inst._zod.def.abort
    };
    if (inst._zod.def.params)
      _iss.params = inst._zod.def.params;
    payload.issues.push(issue(_iss));
  }
}

// node_modules/zod/v4/core/api.js
function _string(Class, params) {
  return new Class({
    type: "string",
    ...normalizeParams(params)
  });
}
function _base64(Class, params) {
  return new Class({
    type: "string",
    format: "base64",
    check: "string_format",
    abort: false,
    ...normalizeParams(params)
  });
}
function _number(Class, params) {
  return new Class({
    type: "number",
    checks: [],
    ...normalizeParams(params)
  });
}
function _int(Class, params) {
  return new Class({
    type: "number",
    check: "number_format",
    abort: false,
    format: "safeint",
    ...normalizeParams(params)
  });
}
function _boolean(Class, params) {
  return new Class({
    type: "boolean",
    ...normalizeParams(params)
  });
}
function _bigint(Class, params) {
  return new Class({
    type: "bigint",
    ...normalizeParams(params)
  });
}
function _unknown(Class) {
  return new Class({
    type: "unknown"
  });
}
function _lte(value, params) {
  return new $ZodCheckLessThan({
    check: "less_than",
    ...normalizeParams(params),
    value,
    inclusive: true
  });
}
function _gte(value, params) {
  return new $ZodCheckGreaterThan({
    check: "greater_than",
    ...normalizeParams(params),
    value,
    inclusive: true
  });
}
function _nonnegative(params) {
  return _gte(0, params);
}
function _refine(Class, fn, _params) {
  const schema = new Class({
    type: "custom",
    check: "custom",
    fn,
    ...normalizeParams(_params)
  });
  return schema;
}
// node_modules/zod/v4/mini/schemas.js
var ZodMiniType = /* @__PURE__ */ $constructor("ZodMiniType", (inst, def) => {
  if (!inst._zod)
    throw new Error("Uninitialized schema in ZodMiniType.");
  $ZodType.init(inst, def);
  inst.def = def;
  inst.type = def.type;
  inst.parse = (data, params) => parse(inst, data, params, { callee: inst.parse });
  inst.safeParse = (data, params) => safeParse(inst, data, params);
  inst.parseAsync = async (data, params) => parseAsync(inst, data, params, { callee: inst.parseAsync });
  inst.safeParseAsync = async (data, params) => safeParseAsync(inst, data, params);
  inst.check = (...checks) => {
    return inst.clone({
      ...def,
      checks: [
        ...def.checks ?? [],
        ...checks.map((ch) => typeof ch === "function" ? {
          _zod: { check: ch, def: { check: "custom" }, onattach: [] }
        } : ch)
      ]
    }, { parent: true });
  };
  inst.with = inst.check;
  inst.clone = (_def, params) => clone(inst, _def, params);
  inst.brand = () => inst;
  inst.register = (reg, meta2) => {
    reg.add(inst, meta2);
    return inst;
  };
  inst.apply = (fn) => fn(inst);
});
var ZodMiniString = /* @__PURE__ */ $constructor("ZodMiniString", (inst, def) => {
  $ZodString.init(inst, def);
  ZodMiniType.init(inst, def);
});
function string2(params) {
  return _string(ZodMiniString, params);
}
var ZodMiniStringFormat = /* @__PURE__ */ $constructor("ZodMiniStringFormat", (inst, def) => {
  $ZodStringFormat.init(inst, def);
  ZodMiniString.init(inst, def);
});
var ZodMiniBase64 = /* @__PURE__ */ $constructor("ZodMiniBase64", (inst, def) => {
  $ZodBase64.init(inst, def);
  ZodMiniStringFormat.init(inst, def);
});
function base642(params) {
  return _base64(ZodMiniBase64, params);
}
var ZodMiniNumber = /* @__PURE__ */ $constructor("ZodMiniNumber", (inst, def) => {
  $ZodNumber.init(inst, def);
  ZodMiniType.init(inst, def);
});
function number2(params) {
  return _number(ZodMiniNumber, params);
}
var ZodMiniNumberFormat = /* @__PURE__ */ $constructor("ZodMiniNumberFormat", (inst, def) => {
  $ZodNumberFormat.init(inst, def);
  ZodMiniNumber.init(inst, def);
});
function int(params) {
  return _int(ZodMiniNumberFormat, params);
}
var ZodMiniBoolean = /* @__PURE__ */ $constructor("ZodMiniBoolean", (inst, def) => {
  $ZodBoolean.init(inst, def);
  ZodMiniType.init(inst, def);
});
function boolean2(params) {
  return _boolean(ZodMiniBoolean, params);
}
var ZodMiniBigInt = /* @__PURE__ */ $constructor("ZodMiniBigInt", (inst, def) => {
  $ZodBigInt.init(inst, def);
  ZodMiniType.init(inst, def);
});
function bigint2(params) {
  return _bigint(ZodMiniBigInt, params);
}
var ZodMiniUnknown = /* @__PURE__ */ $constructor("ZodMiniUnknown", (inst, def) => {
  $ZodUnknown.init(inst, def);
  ZodMiniType.init(inst, def);
});
function unknown() {
  return _unknown(ZodMiniUnknown);
}
var ZodMiniArray = /* @__PURE__ */ $constructor("ZodMiniArray", (inst, def) => {
  $ZodArray.init(inst, def);
  ZodMiniType.init(inst, def);
});
function array(element, params) {
  return new ZodMiniArray({
    type: "array",
    element,
    ...normalizeParams(params)
  });
}
var ZodMiniObject = /* @__PURE__ */ $constructor("ZodMiniObject", (inst, def) => {
  $ZodObject.init(inst, def);
  ZodMiniType.init(inst, def);
  defineLazy(inst, "shape", () => def.shape);
});
function object(shape, params) {
  const def = {
    type: "object",
    shape: shape ?? {},
    ...normalizeParams(params)
  };
  return new ZodMiniObject(def);
}
function looseObject(shape, params) {
  return new ZodMiniObject({
    type: "object",
    shape,
    catchall: unknown(),
    ...normalizeParams(params)
  });
}
var ZodMiniUnion = /* @__PURE__ */ $constructor("ZodMiniUnion", (inst, def) => {
  $ZodUnion.init(inst, def);
  ZodMiniType.init(inst, def);
});
function union(options, params) {
  return new ZodMiniUnion({
    type: "union",
    options,
    ...normalizeParams(params)
  });
}
var ZodMiniDiscriminatedUnion = /* @__PURE__ */ $constructor("ZodMiniDiscriminatedUnion", (inst, def) => {
  $ZodDiscriminatedUnion.init(inst, def);
  ZodMiniType.init(inst, def);
});
function discriminatedUnion(discriminator, options, params) {
  return new ZodMiniDiscriminatedUnion({
    type: "union",
    options,
    discriminator,
    ...normalizeParams(params)
  });
}
var ZodMiniRecord = /* @__PURE__ */ $constructor("ZodMiniRecord", (inst, def) => {
  $ZodRecord.init(inst, def);
  ZodMiniType.init(inst, def);
});
function record(keyType, valueType, params) {
  if (!valueType || !valueType._zod) {
    return new ZodMiniRecord({
      type: "record",
      keyType: string2(),
      valueType: keyType,
      ...normalizeParams(valueType)
    });
  }
  return new ZodMiniRecord({
    type: "record",
    keyType,
    valueType,
    ...normalizeParams(params)
  });
}
var ZodMiniEnum = /* @__PURE__ */ $constructor("ZodMiniEnum", (inst, def) => {
  $ZodEnum.init(inst, def);
  ZodMiniType.init(inst, def);
  inst.options = Object.values(def.entries);
});
function _enum(values, params) {
  const entries = Array.isArray(values) ? Object.fromEntries(values.map((v) => [v, v])) : values;
  return new ZodMiniEnum({
    type: "enum",
    entries,
    ...normalizeParams(params)
  });
}
var ZodMiniLiteral = /* @__PURE__ */ $constructor("ZodMiniLiteral", (inst, def) => {
  $ZodLiteral.init(inst, def);
  ZodMiniType.init(inst, def);
});
function literal(value, params) {
  return new ZodMiniLiteral({
    type: "literal",
    values: Array.isArray(value) ? value : [value],
    ...normalizeParams(params)
  });
}
var ZodMiniTransform = /* @__PURE__ */ $constructor("ZodMiniTransform", (inst, def) => {
  $ZodTransform.init(inst, def);
  ZodMiniType.init(inst, def);
});
function transform(fn) {
  return new ZodMiniTransform({
    type: "transform",
    transform: fn
  });
}
var ZodMiniOptional = /* @__PURE__ */ $constructor("ZodMiniOptional", (inst, def) => {
  $ZodOptional.init(inst, def);
  ZodMiniType.init(inst, def);
});
function optional(innerType) {
  return new ZodMiniOptional({
    type: "optional",
    innerType
  });
}
var ZodMiniDefault = /* @__PURE__ */ $constructor("ZodMiniDefault", (inst, def) => {
  $ZodDefault.init(inst, def);
  ZodMiniType.init(inst, def);
});
function _default(innerType, defaultValue) {
  return new ZodMiniDefault({
    type: "default",
    innerType,
    get defaultValue() {
      return typeof defaultValue === "function" ? defaultValue() : shallowClone(defaultValue);
    }
  });
}
var ZodMiniPipe = /* @__PURE__ */ $constructor("ZodMiniPipe", (inst, def) => {
  $ZodPipe.init(inst, def);
  ZodMiniType.init(inst, def);
});
function pipe(in_, out) {
  return new ZodMiniPipe({
    type: "pipe",
    in: in_,
    out
  });
}
var ZodMiniCustom = /* @__PURE__ */ $constructor("ZodMiniCustom", (inst, def) => {
  $ZodCustom.init(inst, def);
  ZodMiniType.init(inst, def);
});
function refine(fn, _params = {}) {
  return _refine(ZodMiniCustom, fn, _params);
}
// node_modules/@moq/net/lite/origin.js
var OriginSchema = bigint2().check(refine((value) => value >= 0n && value < 1n << 62n, "Origin must be a non-negative 62-bit integer")).brand("Origin");
function randomOrigin() {
  const buf = new BigUint64Array(1);
  crypto.getRandomValues(buf);
  const raw = buf[0] & 0x1fffffffffffffn;
  return OriginSchema.parse(raw === 0n ? 1n : raw);
}

// node_modules/@moq/net/lite/version.js
var Version2 = {
  DRAFT_01: 4279086337,
  DRAFT_02: 4279086338,
  DRAFT_03: 4279086339,
  DRAFT_04: 4279086340,
  DRAFT_05_WIP: 4279086341
};
var ALPN2 = "moql";
var ALPN_03 = "moq-lite-03";
var ALPN_04 = "moq-lite-04";
var VERSION_NAMES2 = {
  [Version2.DRAFT_01]: "moq-lite-01",
  [Version2.DRAFT_02]: "moq-lite-02",
  [Version2.DRAFT_03]: "moq-lite-03",
  [Version2.DRAFT_04]: "moq-lite-04",
  [Version2.DRAFT_05_WIP]: "moq-lite-05-wip"
};
function versionName2(v) {
  return VERSION_NAMES2[v] ?? `unknown(0x${v.toString(16)})`;
}

// node_modules/@moq/net/lite/announce.js
var MAX_HOPS = 32;

class Announce {
  suffix;
  active;
  hops;
  constructor(props) {
    this.suffix = props.suffix;
    this.active = props.active;
    this.hops = props.hops ?? [];
    if (this.hops.length > MAX_HOPS) {
      throw new Error(`hop count ${this.hops.length} exceeds maximum ${MAX_HOPS}`);
    }
  }
  async#encode(w, version2) {
    await w.bool(this.active);
    await w.string(this.suffix);
    switch (version2) {
      case Version2.DRAFT_01:
      case Version2.DRAFT_02:
        break;
      case Version2.DRAFT_03:
        await w.u53(this.hops.length);
        break;
      default:
        await w.u53(this.hops.length);
        for (const origin of this.hops) {
          await w.u62(origin);
        }
        break;
    }
  }
  static async#decode(r, version2) {
    const active = await r.bool();
    const suffix = from(await r.string());
    let hops = [];
    switch (version2) {
      case Version2.DRAFT_01:
      case Version2.DRAFT_02:
        break;
      case Version2.DRAFT_03: {
        const count = await r.u53();
        if (count > MAX_HOPS)
          throw new Error(`hop count ${count} exceeds maximum ${MAX_HOPS}`);
        const placeholder = OriginSchema.parse(0n);
        hops = new Array(count).fill(placeholder);
        break;
      }
      default: {
        const count = await r.u53();
        if (count > MAX_HOPS)
          throw new Error(`hop count ${count} exceeds maximum ${MAX_HOPS}`);
        hops = [];
        for (let i = 0;i < count; i++) {
          hops.push(OriginSchema.parse(await r.u62()));
        }
        break;
      }
    }
    return new Announce({ suffix, active, hops });
  }
  async encode(w, version2) {
    return encode4(w, (w2) => this.#encode(w2, version2));
  }
  static async decode(r, version2) {
    return decode4(r, (r2) => Announce.#decode(r2, version2));
  }
  static async decodeMaybe(r, version2) {
    return decodeMaybe(r, (r2) => Announce.#decode(r2, version2));
  }
}

class AnnounceInterest {
  prefix;
  excludeHop;
  constructor(prefix, excludeHop = 0n) {
    this.prefix = prefix;
    this.excludeHop = excludeHop;
  }
  async#encode(w, version2) {
    await w.string(this.prefix);
    switch (version2) {
      case Version2.DRAFT_01:
      case Version2.DRAFT_02:
      case Version2.DRAFT_03:
        break;
      default:
        await w.u62(this.excludeHop);
        break;
    }
  }
  static async#decode(r, version2) {
    const prefix = from(await r.string());
    let excludeHop = 0n;
    switch (version2) {
      case Version2.DRAFT_01:
      case Version2.DRAFT_02:
      case Version2.DRAFT_03:
        break;
      default:
        excludeHop = await r.u62();
        break;
    }
    return new AnnounceInterest(prefix, excludeHop);
  }
  async encode(w, version2) {
    return encode4(w, (w2) => this.#encode(w2, version2));
  }
  static async decode(r, version2) {
    return decode4(r, (r2) => AnnounceInterest.#decode(r2, version2));
  }
}

class AnnounceInit {
  suffixes;
  constructor(paths) {
    this.suffixes = paths;
  }
  static #guard(version2) {
    switch (version2) {
      case Version2.DRAFT_01:
      case Version2.DRAFT_02:
        break;
      default:
        throw new Error("announce init not supported for this version");
    }
  }
  async#encode(w) {
    await w.u53(this.suffixes.length);
    for (const path of this.suffixes) {
      await w.string(path);
    }
  }
  static async#decode(r) {
    const count = await r.u53();
    const suffixes = [];
    for (let i = 0;i < count; i++) {
      suffixes.push(from(await r.string()));
    }
    return new AnnounceInit(suffixes);
  }
  async encode(w, version2) {
    AnnounceInit.#guard(version2);
    return encode4(w, this.#encode.bind(this));
  }
  static async decode(r, version2) {
    AnnounceInit.#guard(version2);
    return decode4(r, AnnounceInit.#decode);
  }
}

// node_modules/@moq/net/lite/connection.js
init_stream();

// node_modules/@moq/net/lite/goaway.js
function guardGoaway(version2) {
  switch (version2) {
    case Version2.DRAFT_01:
    case Version2.DRAFT_02:
    case Version2.DRAFT_03:
      throw new Error("goaway not supported for this version");
    default:
      break;
  }
}

class Goaway {
  uri;
  constructor(uri) {
    this.uri = uri;
  }
  async#encode(w) {
    await w.string(this.uri);
  }
  static async#decode(r) {
    return new Goaway(await r.string());
  }
  async encode(w, version2) {
    guardGoaway(version2);
    return encode4(w, this.#encode.bind(this));
  }
  static async decode(r, version2) {
    guardGoaway(version2);
    return decode4(r, Goaway.#decode);
  }
}

// node_modules/@moq/net/lite/group.js
class Group3 {
  subscribe;
  sequence;
  constructor(subscribe, sequence) {
    this.subscribe = subscribe;
    this.sequence = sequence;
  }
  async#encode(w) {
    await w.u62(this.subscribe);
    await w.u53(this.sequence);
  }
  static async#decode(r) {
    return new Group3(await r.u62(), await r.u53());
  }
  async encode(w) {
    return encode4(w, this.#encode.bind(this));
  }
  static async decode(r) {
    return decode4(r, Group3.#decode);
  }
  static async decodeMaybe(r) {
    return decodeMaybe(r, Group3.#decode);
  }
}

class Frame2 {
  payload;
  constructor(payload) {
    this.payload = payload;
  }
  async#encode(w) {
    await w.write(this.payload);
  }
  static async#decode(r) {
    const payload = await r.readAll();
    return new Frame2(payload);
  }
  async encode(w) {
    return encode4(w, this.#encode.bind(this));
  }
  static async decode(r) {
    return decode4(r, Frame2.#decode);
  }
}

// node_modules/@moq/net/lite/publisher.js
init_stream();

// node_modules/@moq/net/lite/probe.js
function guardProbe(version2) {
  switch (version2) {
    case Version2.DRAFT_01:
    case Version2.DRAFT_02:
      throw new Error("probe not supported for this version");
    default:
      break;
  }
}

class Probe {
  bitrate;
  rtt;
  constructor(bitrate, rtt) {
    this.bitrate = bitrate;
    this.rtt = rtt;
  }
  async#encode(w, version2) {
    await w.u53(this.bitrate);
    switch (version2) {
      case Version2.DRAFT_03:
        break;
      default: {
        const wire = this.rtt !== undefined ? Math.max(this.rtt, 1) : 0;
        await w.u53(wire);
        break;
      }
    }
  }
  static async#decode(r, version2) {
    const bitrate = await r.u53();
    let rtt;
    switch (version2) {
      case Version2.DRAFT_03:
        break;
      default: {
        const wire = await r.u53();
        rtt = wire === 0 ? undefined : wire;
        break;
      }
    }
    return new Probe(bitrate, rtt);
  }
  async encode(w, version2) {
    guardProbe(version2);
    return encode4(w, (w2) => this.#encode(w2, version2));
  }
  static async decode(r, version2) {
    guardProbe(version2);
    return decode4(r, (r2) => Probe.#decode(r2, version2));
  }
  static async decodeMaybe(r, version2) {
    guardProbe(version2);
    return decodeMaybe(r, (r2) => Probe.#decode(r2, version2));
  }
}
// node_modules/@moq/net/lite/subscribe.js
class SubscribeUpdate2 {
  priority;
  ordered;
  maxLatency;
  startGroup;
  endGroup;
  constructor(props) {
    this.priority = props.priority;
    this.ordered = props.ordered ?? true;
    this.maxLatency = props.maxLatency ?? 0;
    this.startGroup = props.startGroup;
    this.endGroup = props.endGroup;
  }
  async#encode(w, version2) {
    switch (version2) {
      case Version2.DRAFT_01:
      case Version2.DRAFT_02:
        await w.u8(this.priority);
        break;
      default:
        await w.u8(this.priority);
        await w.bool(this.ordered);
        await w.u53(this.maxLatency);
        await w.u53(this.startGroup !== undefined ? this.startGroup + 1 : 0);
        await w.u53(this.endGroup !== undefined ? this.endGroup + 1 : 0);
        break;
    }
  }
  static async#decode(r, version2) {
    switch (version2) {
      case Version2.DRAFT_01:
      case Version2.DRAFT_02:
        return new SubscribeUpdate2({ priority: await r.u8() });
      default: {
        const priority = await r.u8();
        const ordered = await r.bool();
        const maxLatency = await r.u53();
        const startGroup = await r.u53();
        const endGroup = await r.u53();
        return new SubscribeUpdate2({
          priority,
          ordered,
          maxLatency,
          startGroup: startGroup > 0 ? startGroup - 1 : undefined,
          endGroup: endGroup > 0 ? endGroup - 1 : undefined
        });
      }
    }
  }
  async encode(w, version2) {
    return encode4(w, (w2) => this.#encode(w2, version2));
  }
  static async decode(r, version2) {
    return decode4(r, (r2) => SubscribeUpdate2.#decode(r2, version2));
  }
  static async decodeMaybe(r, version2) {
    return decodeMaybe(r, (r2) => SubscribeUpdate2.#decode(r2, version2));
  }
}

class Subscribe2 {
  id;
  broadcast;
  track;
  priority;
  ordered;
  maxLatency;
  startGroup;
  endGroup;
  constructor(props) {
    this.id = props.id;
    this.broadcast = props.broadcast;
    this.track = props.track;
    this.priority = props.priority;
    this.ordered = props.ordered ?? false;
    this.maxLatency = props.maxLatency ?? 0;
    this.startGroup = props.startGroup;
    this.endGroup = props.endGroup;
  }
  async#encode(w, version2) {
    await w.u62(this.id);
    await w.string(this.broadcast);
    await w.string(this.track);
    await w.u8(this.priority);
    switch (version2) {
      case Version2.DRAFT_01:
      case Version2.DRAFT_02:
        break;
      default:
        await w.bool(this.ordered);
        await w.u53(this.maxLatency);
        await w.u53(this.startGroup !== undefined ? this.startGroup + 1 : 0);
        await w.u53(this.endGroup !== undefined ? this.endGroup + 1 : 0);
        break;
    }
  }
  static async#decode(r, version2) {
    const id = await r.u62();
    const broadcast = from(await r.string());
    const track = await r.string();
    const priority = await r.u8();
    switch (version2) {
      case Version2.DRAFT_01:
      case Version2.DRAFT_02:
        return new Subscribe2({ id, broadcast, track, priority });
      default: {
        const ordered = await r.bool();
        const maxLatency = await r.u53();
        const startGroup = await r.u53();
        const endGroup = await r.u53();
        return new Subscribe2({
          id,
          broadcast,
          track,
          priority,
          ordered,
          maxLatency,
          startGroup: startGroup > 0 ? startGroup - 1 : undefined,
          endGroup: endGroup > 0 ? endGroup - 1 : undefined
        });
      }
    }
  }
  async encode(w, version2) {
    return encode4(w, (w2) => this.#encode(w2, version2));
  }
  static async decode(r, version2) {
    return decode4(r, (r2) => Subscribe2.#decode(r2, version2));
  }
}

class SubscribeOk2 {
  priority;
  ordered;
  maxLatency;
  startGroup;
  endGroup;
  constructor({ priority = 0, ordered = true, maxLatency = 0, startGroup = undefined, endGroup = undefined }) {
    this.priority = priority;
    this.ordered = ordered;
    this.maxLatency = maxLatency;
    this.startGroup = startGroup;
    this.endGroup = endGroup;
  }
  async#encode(w, version2) {
    switch (version2) {
      case Version2.DRAFT_02:
        break;
      case Version2.DRAFT_01:
        await w.u8(this.priority ?? 0);
        break;
      default:
        await w.u8(this.priority);
        await w.bool(this.ordered);
        await w.u53(this.maxLatency);
        await w.u53(this.startGroup !== undefined ? this.startGroup + 1 : 0);
        await w.u53(this.endGroup !== undefined ? this.endGroup + 1 : 0);
        break;
    }
  }
  static async#decode(version2, r) {
    let priority;
    let ordered;
    let maxLatency;
    let startGroup;
    let endGroup;
    switch (version2) {
      case Version2.DRAFT_02:
        break;
      case Version2.DRAFT_01:
        priority = await r.u8();
        break;
      default:
        priority = await r.u8();
        ordered = await r.bool();
        maxLatency = await r.u53();
        startGroup = await r.u53();
        endGroup = await r.u53();
        break;
    }
    return new SubscribeOk2({
      priority,
      ordered,
      maxLatency,
      startGroup: startGroup !== undefined && startGroup > 0 ? startGroup - 1 : undefined,
      endGroup: endGroup !== undefined && endGroup > 0 ? endGroup - 1 : undefined
    });
  }
  async encode(w, version2) {
    return encode4(w, (w2) => this.#encode(w2, version2));
  }
  static async decode(r, version2) {
    return decode4(r, SubscribeOk2.#decode.bind(SubscribeOk2, version2));
  }
}

class SubscribeDrop {
  start;
  end;
  error;
  constructor(props) {
    this.start = props.start;
    this.end = props.end;
    this.error = props.error;
  }
  async#encode(w) {
    await w.u53(this.start);
    await w.u53(this.end);
    await w.u53(this.error);
  }
  static async#decode(r) {
    return new SubscribeDrop({ start: await r.u53(), end: await r.u53(), error: await r.u53() });
  }
  async encode(w) {
    return encode4(w, this.#encode.bind(this));
  }
  static async decode(r) {
    return decode4(r, SubscribeDrop.#decode);
  }
}
async function encodeSubscribeResponse(w, resp, version2) {
  switch (version2) {
    case Version2.DRAFT_01:
    case Version2.DRAFT_02:
      if ("ok" in resp) {
        await resp.ok.encode(w, version2);
      } else {
        throw new Error("subscribe drop not supported for this version");
      }
      break;
    default:
      if ("ok" in resp) {
        await w.u53(0);
        await resp.ok.encode(w, version2);
      } else {
        await w.u53(1);
        await resp.drop.encode(w);
      }
      break;
  }
}
async function decodeSubscribeResponse(r, version2) {
  switch (version2) {
    case Version2.DRAFT_01:
    case Version2.DRAFT_02:
      return { ok: await SubscribeOk2.decode(r, version2) };
    default: {
      const typ = await r.u53();
      switch (typ) {
        case 0:
          return { ok: await SubscribeOk2.decode(r, version2) };
        case 1:
          return { drop: await SubscribeDrop.decode(r) };
        default:
          throw new Error(`unknown subscribe response type: ${typ}`);
      }
    }
  }
}

// node_modules/@moq/net/lite/publisher.js
var PROBE_INTERVAL = 100;
var PROBE_MAX_AGE = 1e4;
var PROBE_MAX_DELTA = 0.25;

class Publisher2 {
  version;
  origin;
  #quic;
  #broadcasts = new Signal(new Map);
  constructor(quic, version2, origin) {
    this.#quic = quic;
    this.version = version2;
    this.origin = origin;
  }
  publish(path, broadcast) {
    this.#broadcasts.mutate((broadcasts) => {
      if (!broadcasts)
        throw new Error("closed");
      broadcasts.set(path, broadcast);
    });
    broadcast.closed.finally(() => {
      this.#broadcasts.mutate((broadcasts) => {
        broadcasts?.delete(path);
      });
    });
  }
  async runAnnounce(msg, stream) {
    console.debug(`announce: prefix=${msg.prefix}`);
    let active = new Set;
    const broadcasts = this.#broadcasts.peek();
    if (!broadcasts)
      return;
    for (const name of broadcasts.keys()) {
      const suffix = stripPrefix(msg.prefix, name);
      if (suffix === null)
        continue;
      console.debug(`announce: broadcast=${name} active=true`);
      active.add(suffix);
    }
    switch (this.version) {
      case Version2.DRAFT_01:
      case Version2.DRAFT_02: {
        const init = new AnnounceInit([...active]);
        await init.encode(stream.writer, this.version);
        break;
      }
      default:
        for (const suffix of active) {
          const wire = new Announce({ suffix, active: true, hops: [this.origin] });
          await wire.encode(stream.writer, this.version);
        }
        break;
    }
    for (;; ) {
      let dispose;
      const changed = new Promise((resolve) => {
        dispose = this.#broadcasts.changed(resolve);
      });
      const broadcasts2 = await Promise.race([changed, stream.reader.closed]);
      dispose();
      if (!broadcasts2)
        break;
      const newActive = new Set;
      for (const name of broadcasts2.keys()) {
        const suffix = stripPrefix(msg.prefix, name);
        if (suffix === null)
          continue;
        newActive.add(suffix);
      }
      for (const added of newActive.difference(active)) {
        console.debug(`announce: broadcast=${added} active=true`);
        const wire = new Announce({ suffix: added, active: true, hops: [this.origin] });
        await wire.encode(stream.writer, this.version);
      }
      for (const removed of active.difference(newActive)) {
        console.debug(`announce: broadcast=${removed} active=false`);
        const wire = new Announce({ suffix: removed, active: false });
        await wire.encode(stream.writer, this.version);
      }
      active = newActive;
    }
  }
  async runSubscribe(msg, stream) {
    const broadcast = this.#broadcasts.peek()?.get(msg.broadcast);
    if (!broadcast) {
      console.debug(`publish unknown: broadcast=${msg.broadcast}`);
      stream.writer.reset(new Error("not found"));
      return;
    }
    const track = broadcast.subscribe(msg.track, msg.priority);
    try {
      const info = new SubscribeOk2({ priority: msg.priority });
      await encodeSubscribeResponse(stream.writer, { ok: info }, this.version);
      console.debug(`publish ok: broadcast=${msg.broadcast} track=${track.name}`);
      const serving = this.#runTrack(msg.id, msg.broadcast, track, stream.writer);
      for (;; ) {
        const decode6 = SubscribeUpdate2.decodeMaybe(stream.reader, this.version);
        const result = await Promise.any([serving, decode6]);
        if (!result)
          break;
        if (result instanceof SubscribeUpdate2) {
          console.debug(`subscribe update: broadcast=${msg.broadcast} track=${track.name} priority=${result.priority}`);
          track.updatePriority(result.priority);
        }
      }
      console.debug(`publish done: broadcast=${msg.broadcast} track=${track.name}`);
      stream.close();
      track.close();
    } catch (err) {
      const e = error(err);
      console.warn(`publish error: broadcast=${msg.broadcast} track=${track.name} error=${e.message}`);
      track.close(e);
      stream.abort(e);
    }
  }
  async#runTrack(sub, broadcast, track, stream) {
    try {
      for (;; ) {
        const next = track.recvGroup();
        const group = await Promise.race([next, stream.closed]);
        if (!group) {
          next.then((group2) => group2?.close()).catch(() => {});
          break;
        }
        this.#runGroup(sub, group);
      }
      console.debug(`publish close: broadcast=${broadcast} track=${track.name}`);
      track.close();
      stream.close();
    } catch (err) {
      const e = error(err);
      console.warn(`publish error: broadcast=${broadcast} track=${track.name} error=${e.message}`);
      track.close(e);
      stream.reset(e);
    }
  }
  async#runGroup(sub, group) {
    const msg = new Group3(sub, group.sequence);
    try {
      const stream = await Writer.open(this.#quic);
      await stream.u8(0);
      await msg.encode(stream);
      try {
        for (;; ) {
          const frame = await Promise.race([group.readFrame(), stream.closed]);
          if (!frame)
            break;
          await stream.u53(frame.byteLength);
          await stream.write(frame);
        }
        stream.close();
        group.close();
      } catch (err) {
        const e = error(err);
        stream.reset(e);
        group.close(e);
      }
    } catch (err) {
      const e = error(err);
      group.close(e);
    }
  }
  async runProbe(stream) {
    const quic = this.#quic;
    if (!quic.getStats) {
      stream.close();
      return;
    }
    let lastSentBitrate;
    let lastSentTime;
    try {
      for (;; ) {
        const timeout = new Promise((resolve) => setTimeout(() => resolve("timeout"), PROBE_INTERVAL));
        const result = await Promise.race([timeout, stream.reader.closed]);
        if (result !== "timeout")
          break;
        const stats = await quic.getStats();
        const bitrate = stats.estimatedSendRate;
        if (bitrate == null)
          continue;
        let shouldSend;
        if (lastSentBitrate === undefined || lastSentTime === undefined) {
          shouldSend = true;
        } else if (lastSentBitrate === 0) {
          shouldSend = bitrate > 0;
        } else {
          const elapsed = performance.now() - lastSentTime;
          const t = Math.max(PROBE_INTERVAL, Math.min(PROBE_MAX_AGE, elapsed));
          const range = PROBE_MAX_AGE - PROBE_INTERVAL;
          const threshold = PROBE_MAX_DELTA * (PROBE_MAX_AGE - t) / range;
          const change = Math.abs(bitrate - lastSentBitrate) / lastSentBitrate;
          shouldSend = change >= threshold;
        }
        if (shouldSend) {
          await new Probe(bitrate).encode(stream.writer, this.version);
          lastSentBitrate = bitrate;
          lastSentTime = performance.now();
        }
      }
    } catch (err) {
      console.warn("probe stream error", err);
      stream.close();
    }
  }
  close() {
    this.#broadcasts.update((broadcasts) => {
      for (const broadcast of broadcasts?.values() ?? []) {
        broadcast.close();
      }
      return;
    });
  }
}

// node_modules/@moq/net/lite/session.js
class Extensions {
  entries;
  constructor() {
    this.entries = new Map;
  }
  set(id, value) {
    this.entries.set(id, value);
  }
  get(id) {
    return this.entries.get(id);
  }
  remove(id) {
    const value = this.entries.get(id);
    this.entries.delete(id);
    return value;
  }
  async encode(w) {
    await w.u53(this.entries.size);
    for (const [id, value] of this.entries) {
      await w.u62(id);
      await w.u53(value.length);
      await w.write(value);
    }
  }
  static async decode(r) {
    const count = await r.u53();
    const params = new Extensions;
    for (let i = 0;i < count; i++) {
      const id = await r.u62();
      const size2 = await r.u53();
      const value = await r.read(size2);
      if (params.entries.has(id)) {
        throw new Error(`duplicate parameter id: ${id.toString()}`);
      }
      params.entries.set(id, value);
    }
    return params;
  }
}

class SessionClient {
  versions;
  extensions;
  constructor(versions, extensions = new Extensions) {
    this.versions = versions;
    this.extensions = extensions;
  }
  async#encode(w) {
    await w.u53(this.versions.length);
    for (const v of this.versions) {
      await w.u53(v);
    }
    await this.extensions.encode(w);
  }
  static async#decode(r) {
    const versions = [];
    const count = await r.u53();
    for (let i = 0;i < count; i++) {
      versions.push(await r.u53());
    }
    const extensions = await Extensions.decode(r);
    return new SessionClient(versions, extensions);
  }
  async encode(w) {
    return encode4(w, this.#encode.bind(this));
  }
  static async decode(r) {
    return decode4(r, SessionClient.#decode);
  }
}

class SessionServer {
  version;
  extensions;
  constructor(version2, extensions = new Extensions) {
    this.version = version2;
    this.extensions = extensions;
  }
  async#encode(w) {
    await w.u53(this.version);
    await this.extensions.encode(w);
  }
  static async#decode(r) {
    const version2 = await r.u53();
    const extensions = await Extensions.decode(r);
    return new SessionServer(version2, extensions);
  }
  async encode(w) {
    return encode4(w, this.#encode.bind(this));
  }
  static async decode(r) {
    return decode4(r, SessionServer.#decode);
  }
}

class SessionInfo {
  bitrate;
  constructor(bitrate) {
    this.bitrate = bitrate;
  }
  static #guard(version2) {
    switch (version2) {
      case Version2.DRAFT_01:
      case Version2.DRAFT_02:
        break;
      default:
        throw new Error("session info not supported for this version");
    }
  }
  async#encode(w) {
    await w.u53(this.bitrate);
  }
  static async#decode(r) {
    const bitrate = await r.u53();
    return new SessionInfo(bitrate);
  }
  async encode(w, version2) {
    SessionInfo.#guard(version2);
    return encode4(w, this.#encode.bind(this));
  }
  static async decode(r, version2) {
    SessionInfo.#guard(version2);
    return decode4(r, SessionInfo.#decode);
  }
  static async decodeMaybe(r, version2) {
    SessionInfo.#guard(version2);
    return decodeMaybe(r, SessionInfo.#decode);
  }
}

// node_modules/@moq/net/lite/stream.js
var StreamId = {
  Session: 0,
  Announce: 1,
  Subscribe: 2,
  Fetch: 3,
  Probe: 4,
  Goaway: 5,
  ClientCompat: 32,
  ServerCompat: 33
};

// node_modules/@moq/net/lite/subscriber.js
init_stream();
class Subscriber2 {
  #quic;
  version;
  origin;
  #subscribes = new Map;
  #subscribeNext = 0n;
  #recvBandwidth;
  #rtt;
  constructor(quic, version2, origin, recvBandwidth, rtt) {
    this.#quic = quic;
    this.version = version2;
    this.origin = origin;
    this.#recvBandwidth = recvBandwidth;
    this.#rtt = rtt;
  }
  announced(prefix = empty(), options = {}) {
    const announced = new Announced;
    this.#runAnnounced(announced, prefix, options);
    return announced;
  }
  async#runAnnounced(announced, prefix, options) {
    console.debug(`announced: prefix=${prefix}`);
    const msg = new AnnounceInterest(prefix, this.origin);
    try {
      const stream = await Stream.open(this.#quic);
      await stream.writer.u53(StreamId.Announce);
      await msg.encode(stream.writer, this.version);
      switch (this.version) {
        case Version2.DRAFT_01:
        case Version2.DRAFT_02: {
          const init = await AnnounceInit.decode(stream.reader, this.version);
          for (const suffix of init.suffixes) {
            const path = join(prefix, suffix);
            console.debug(`announced: broadcast=${path} active=true`);
            announced.append({ path, active: true });
          }
          break;
        }
        default:
          break;
      }
      for (;; ) {
        const announce = await Promise.race([
          Announce.decodeMaybe(stream.reader, this.version),
          announced.closed
        ]);
        if (!announce)
          break;
        if (announce instanceof Error)
          throw announce;
        if (options.ignoreSelf && announce.hops.includes(this.origin)) {
          continue;
        }
        const path = join(prefix, announce.suffix);
        console.debug(`announced: broadcast=${path} active=${announce.active}`);
        announced.append({ path, active: announce.active });
      }
      announced.close();
    } catch (err) {
      announced.close(error(err));
    }
  }
  consume(path) {
    const broadcast = new Broadcast;
    (async () => {
      for (;; ) {
        const request = await broadcast.requested();
        if (!request)
          break;
        this.#runSubscribe(path, request);
      }
    })();
    return broadcast;
  }
  async#runSubscribe(broadcast, request) {
    const id = this.#subscribeNext++;
    this.#subscribes.set(id, request.track);
    console.debug(`subscribe start: id=${id} broadcast=${broadcast} track=${request.track.name}`);
    const msg = new Subscribe2({ id, broadcast, track: request.track.name, priority: request.priority });
    const stream = await Stream.open(this.#quic);
    await stream.writer.u53(StreamId.Subscribe);
    await msg.encode(stream.writer, this.version);
    try {
      const resp = await decodeSubscribeResponse(stream.reader, this.version);
      if (!("ok" in resp)) {
        throw new Error("first subscribe response must be SUBSCRIBE_OK");
      }
      console.debug(`subscribe ok: id=${id} broadcast=${broadcast} track=${request.track.name}`);
      const waits = [stream.reader.closed, request.track.closed];
      switch (this.version) {
        case Version2.DRAFT_01:
        case Version2.DRAFT_02:
          break;
        default:
          waits.push(this.#runPriorityUpdates(id, broadcast, request.track, msg, stream));
          break;
      }
      await Promise.race(waits);
      request.track.close();
      stream.close();
      console.debug(`subscribe close: id=${id} broadcast=${broadcast} track=${request.track.name}`);
    } catch (err) {
      const e = error(err);
      request.track.close(e);
      console.warn(`subscribe error: id=${id} broadcast=${broadcast} track=${request.track.name} error=${e.message}`);
      stream.abort(e);
    } finally {
      this.#subscribes.delete(id);
    }
  }
  async#runPriorityUpdates(id, broadcast, track, msg, stream) {
    const stopped = Promise.race([track.closed, stream.reader.closed]).then(() => null);
    let lastSent;
    for (;; ) {
      const current = track.state.priority.peek();
      if (current === undefined || current === lastSent) {
        const next = await Promise.race([track.state.priority.next(), stopped]);
        if (next === null)
          return;
        continue;
      }
      const update = new SubscribeUpdate2({
        priority: current,
        ordered: msg.ordered,
        maxLatency: msg.maxLatency,
        startGroup: msg.startGroup,
        endGroup: msg.endGroup
      });
      await update.encode(stream.writer, this.version);
      lastSent = current;
      console.debug(`subscribe update: id=${id} broadcast=${broadcast} track=${track.name} priority=${current}`);
    }
  }
  async runGroup(group, stream) {
    const subscribe = this.#subscribes.get(group.subscribe);
    if (!subscribe) {
      if (group.subscribe >= this.#subscribeNext) {
        throw new Error(`unknown subscription: id=${group.subscribe}`);
      }
      return;
    }
    const producer = new Group(group.sequence);
    subscribe.writeGroup(producer);
    try {
      for (;; ) {
        const done = await Promise.race([stream.done(), subscribe.closed, producer.closed]);
        if (done !== false)
          break;
        const size2 = await stream.u53();
        const payload = await stream.read(size2);
        if (!payload)
          break;
        producer.writeFrame(payload);
      }
      producer.close();
      stream.stop(new Error("cancel"));
    } catch (err) {
      const e = error(err);
      producer.close(e);
      stream.stop(e);
    }
  }
  async runProbe() {
    if (!this.#recvBandwidth)
      return;
    if (this.version === Version2.DRAFT_01 || this.version === Version2.DRAFT_02)
      return;
    try {
      const stream = await Stream.open(this.#quic);
      await stream.writer.u53(StreamId.Probe);
      for (;; ) {
        const probe = await Probe.decodeMaybe(stream.reader, this.version);
        if (!probe)
          break;
        this.#recvBandwidth.set(probe.bitrate ?? undefined);
        if (this.#rtt && probe.rtt !== undefined) {
          this.#rtt.set(probe.rtt);
        }
      }
    } catch (err) {
      console.warn("probe stream error", err);
    } finally {
      this.#recvBandwidth.set(undefined);
      this.#rtt?.set(undefined);
    }
  }
  close() {
    for (const track of this.#subscribes.values()) {
      track.close();
    }
    this.#subscribes.clear();
  }
}

// node_modules/@moq/net/lite/connection.js
var SEND_BW_POLL_INTERVAL = 100;

class Connection2 {
  url;
  version;
  #version;
  #quic;
  #session;
  #publisher;
  #subscriber;
  sendBandwidth;
  recvBandwidth;
  rtt;
  origin;
  constructor(url, quic, version2, session) {
    this.url = url;
    this.#quic = quic;
    this.#session = session;
    this.version = versionName2(version2);
    this.#version = version2;
    const hasGetStats = typeof quic.getStats === "function";
    if (hasGetStats) {
      this.sendBandwidth = createBandwidth();
    }
    if (version2 !== Version2.DRAFT_01 && version2 !== Version2.DRAFT_02) {
      this.recvBandwidth = createBandwidth();
    }
    this.rtt = new Signal(undefined);
    this.origin = randomOrigin();
    this.#publisher = new Publisher2(this.#quic, this.#version, this.origin);
    this.#subscriber = new Subscriber2(this.#quic, this.#version, this.origin, this.recvBandwidth, this.rtt);
    this.#run();
  }
  close() {
    this.#publisher.close();
    this.#subscriber.close();
    try {
      this.#quic.close();
    } catch {}
  }
  async#run() {
    const tasks = [this.#runSession(), this.#runBidis(), this.#runUnis()];
    if (this.sendBandwidth) {
      tasks.push(this.#runSendBandwidth(this.sendBandwidth));
    }
    if (this.recvBandwidth) {
      tasks.push(this.#subscriber.runProbe());
    }
    try {
      await Promise.all(tasks);
    } catch (err) {
      console.error("fatal error running connection", err);
    } finally {
      this.close();
    }
  }
  publish(path, broadcast) {
    this.#publisher.publish(path, broadcast);
  }
  announced(prefix = empty()) {
    return this.#subscriber.announced(prefix);
  }
  consume(broadcast) {
    return this.#subscriber.consume(broadcast);
  }
  async#runSession() {
    if (!this.#session) {
      return;
    }
    try {
      for (;; ) {
        const msg = await SessionInfo.decodeMaybe(this.#session.reader, this.#version);
        if (!msg)
          break;
      }
    } finally {
      console.debug("session stream closed");
    }
  }
  async#runBidis() {
    for (;; ) {
      const stream = await Stream.accept(this.#quic);
      if (!stream)
        break;
      this.#runBidi(stream).catch((err) => {
        stream.writer.reset(err);
      }).finally(() => {
        stream.writer.close();
      });
    }
  }
  async#runBidi(stream) {
    const typ = await stream.reader.u53();
    if (typ === StreamId.Session) {
      throw new Error("duplicate session stream");
    } else if (typ === StreamId.Announce) {
      const msg = await AnnounceInterest.decode(stream.reader, this.#version);
      await this.#publisher.runAnnounce(msg, stream);
    } else if (typ === StreamId.Subscribe) {
      const msg = await Subscribe2.decode(stream.reader, this.#version);
      await this.#publisher.runSubscribe(msg, stream);
    } else if (typ === StreamId.Probe) {
      await this.#publisher.runProbe(stream);
    } else if (typ === StreamId.Goaway) {
      const msg = await Goaway.decode(stream.reader, this.#version);
      console.info("received goaway:", msg.uri);
    } else {
      throw new Error(`unknown stream type: ${typ.toString()}`);
    }
  }
  async#runUnis() {
    const readers = new Readers(this.#quic);
    for (;; ) {
      const stream = await readers.next();
      if (!stream)
        break;
      this.#runUni(stream).then(() => {
        stream.stop(new Error("cancel"));
      }).catch((err) => {
        stream.stop(err);
      });
    }
  }
  async#runUni(stream) {
    const typ = await stream.u8();
    if (typ === 0) {
      const msg = await Group3.decode(stream);
      await this.#subscriber.runGroup(msg, stream);
    } else {
      throw new Error(`unknown stream type: ${typ.toString()}`);
    }
  }
  async#runSendBandwidth(bandwidth) {
    const quic = this.#quic;
    return new Promise((resolve) => {
      const id = setInterval(async () => {
        try {
          const stats = await quic.getStats();
          bandwidth.set(stats.estimatedSendRate ?? undefined);
        } catch {
          clearInterval(id);
          resolve();
        }
      }, SEND_BW_POLL_INTERVAL);
      this.closed.then(() => {
        clearInterval(id);
        resolve();
      });
    });
  }
  get closed() {
    return this.#quic.closed.then(() => {
      return;
    });
  }
}

// node_modules/@moq/net/connection/accept.js
init_stream();

// node_modules/@moq/net/connection/handshake.js
init_stream();
async function exchangeSetup(transport, version2, implementation) {
  const encoder = new TextEncoder;
  const params = new SetupOptions;
  params.setBytes(SetupOption.Implementation, encoder.encode(implementation));
  const setupMsg = new Setup({ parameters: params });
  const [sent, received] = await Promise.all([
    sendSetup(transport, version2, setupMsg),
    receiveSetup(transport, version2)
  ]);
  return new Stream({
    writable: sent.writable,
    readable: received.readable,
    writer: sent.writer,
    reader: received.reader
  });
}
async function sendSetup(transport, version2, setupMsg) {
  const writable = await transport.createUnidirectionalStream();
  const writer = new Writer(writable, version2);
  await writer.u53(Setup.id);
  await setupMsg.encode(writer, version2);
  return { writable, writer };
}
async function receiveSetup(transport, version2) {
  const uniReader = transport.incomingUnidirectionalStreams.getReader();
  const next = await uniReader.read();
  uniReader.releaseLock();
  if (next.done)
    throw new Error("no incoming uni stream for SETUP");
  const readable = next.value;
  const reader = new Reader(readable, undefined, version2);
  const streamType = await reader.u53();
  if (streamType !== Setup.id) {
    throw new Error(`unexpected stream type on setup uni: 0x${streamType.toString(16)}`);
  }
  await Setup.decode(reader, version2);
  return { readable, reader };
}

// node_modules/@moq/net/connection/accept.js
async function accept(transport, url, props) {
  const protocol = transport.protocol;
  if (protocol === ALPN.DRAFT_18) {
    return acceptAlpn(transport, url, Version.DRAFT_18);
  } else if (protocol === ALPN.DRAFT_17) {
    return acceptAlpn(transport, url, Version.DRAFT_17);
  } else if (protocol === ALPN.DRAFT_16) {
    return acceptSetup(transport, url, Version.DRAFT_16);
  } else if (protocol === ALPN.DRAFT_15) {
    return acceptSetup(transport, url, Version.DRAFT_15);
  } else if (protocol === ALPN_04) {
    return new Connection2(url, transport, Version2.DRAFT_04, undefined);
  } else if (protocol === ALPN_03) {
    return new Connection2(url, transport, Version2.DRAFT_03, undefined);
  } else if (protocol === ALPN2 || protocol === "" || protocol === undefined) {
    return acceptNegotiated(transport, url, props);
  } else {
    throw new Error(`unsupported WebTransport protocol: ${protocol}`);
  }
}
async function acceptAlpn(transport, url, version2) {
  const controlStream = await exchangeSetup(transport, version2, "moq-lite-js");
  return new Connection({
    url,
    quic: transport,
    control: controlStream,
    maxRequestId: 0n,
    version: version2
  });
}
async function acceptSetup(transport, url, version2) {
  const stream = await Stream.accept(transport);
  if (!stream)
    throw new Error("no incoming bidi stream for SETUP");
  const clientCompat = await stream.reader.u53();
  if (clientCompat !== StreamId.ClientCompat) {
    throw new Error(`unexpected client message type: 0x${clientCompat.toString(16)}`);
  }
  await ClientSetup.decode(stream.reader, version2);
  await stream.writer.u53(StreamId.ServerCompat);
  const encoder = new TextEncoder;
  const params = new SetupOptions;
  params.setVarint(SetupOption.MaxRequestId, 42069n);
  params.setBytes(SetupOption.Implementation, encoder.encode("moq-lite-js"));
  const server = new ServerSetup({ version: version2, parameters: params });
  await server.encode(stream.writer, version2);
  const maxRequestId = 42069n;
  return new Connection({
    url,
    quic: transport,
    control: stream,
    maxRequestId,
    version: version2
  });
}
async function acceptNegotiated(transport, url, props) {
  const setupVersion = Version.DRAFT_14;
  const stream = await Stream.accept(transport);
  if (!stream)
    throw new Error("no incoming bidi stream for SETUP");
  const clientCompat = await stream.reader.u53();
  if (clientCompat !== StreamId.ClientCompat) {
    throw new Error(`unexpected client message type: 0x${clientCompat.toString(16)}`);
  }
  const client = await ClientSetup.decode(stream.reader, setupVersion);
  const allVersions = [...Object.values(Version2), ...Object.values(Version)];
  let selectedVersion;
  if (props?.version !== undefined) {
    selectedVersion = props.version;
  } else {
    const match = client.versions.find((v) => allVersions.includes(v));
    if (match === undefined) {
      throw new Error(`no common version found; client offered: ${client.versions.map((v) => v.toString(16)).join(", ")}`);
    }
    selectedVersion = match;
  }
  await stream.writer.u53(StreamId.ServerCompat);
  const encoder = new TextEncoder;
  const params = new SetupOptions;
  params.setVarint(SetupOption.MaxRequestId, 42069n);
  params.setBytes(SetupOption.Implementation, encoder.encode("moq-lite-js"));
  const server = new ServerSetup({ version: selectedVersion, parameters: params });
  await server.encode(stream.writer, setupVersion);
  if (Object.values(Version2).includes(selectedVersion)) {
    return new Connection2(url, transport, selectedVersion, stream);
  } else if (Object.values(Version).includes(selectedVersion)) {
    const maxRequestId = client.parameters.getVarint(SetupOption.MaxRequestId) ?? 0n;
    return new Connection({
      url,
      quic: transport,
      control: stream,
      maxRequestId,
      version: selectedVersion
    });
  } else {
    throw new Error(`unsupported version: ${selectedVersion.toString(16)}`);
  }
}
// node_modules/@moq/qmux/credit.js
class Credit {
  #used;
  #max;
  #released = 0n;
  #closed = false;
  #waiters = [];
  constructor(max) {
    this.#used = 0n;
    this.#max = max;
  }
  tryClaim(limit) {
    if (limit === 0n)
      return 0n;
    const available = this.#max - this.#used;
    if (available <= 0n)
      return 0n;
    const claimed = limit < available ? limit : available;
    this.#used += claimed;
    return claimed;
  }
  async claim(limit) {
    if (limit === 0n)
      return 0n;
    while (true) {
      if (this.#closed)
        throw new Error("closed");
      const claimed = this.tryClaim(limit);
      if (claimed > 0n)
        return claimed;
      await new Promise((resolve, reject) => {
        this.#waiters.push({ resolve, reject });
      });
    }
  }
  release(amount) {
    this.#used = this.#used > amount ? this.#used - amount : 0n;
    this.#wake();
  }
  increaseMax(newMax) {
    if (newMax < this.#max)
      return false;
    if (newMax === this.#max)
      return true;
    this.#max = newMax;
    this.#wake();
    return true;
  }
  close() {
    this.#closed = true;
    const waiters = this.#waiters;
    this.#waiters = [];
    const err = new Error("closed");
    for (const { reject } of waiters)
      reject(err);
  }
  receiveUpTo(value) {
    if (value > this.#max)
      return false;
    if (value > this.#used)
      this.#used = value;
    return true;
  }
  consume(len) {
    this.#released += len;
    if (this.#used + 2n * this.#released > this.#max) {
      const newMax = this.#max + this.#released;
      this.#max = newMax;
      this.#released = 0n;
      this.#wake();
      return newMax;
    }
    return null;
  }
  get available() {
    const avail = this.#max - this.#used;
    return avail > 0n ? avail : 0n;
  }
  get max() {
    return this.#max;
  }
  get used() {
    return this.#used;
  }
  #wake() {
    const waiters = this.#waiters;
    this.#waiters = [];
    for (const { resolve } of waiters)
      resolve();
  }
}

// node_modules/@moq/qmux/varint.js
class VarInt {
  static MAX = (1n << 62n) - 1n;
  static MAX_SIZE = 8;
  value;
  constructor(value) {
    if (value < 0n || value > VarInt.MAX) {
      throw new Error(`VarInt value out of range: ${value}`);
    }
    this.value = value;
  }
  static from(value) {
    return new VarInt(BigInt(value));
  }
  size() {
    const x = this.value;
    if (x < 2n ** 6n)
      return 1;
    if (x < 2n ** 14n)
      return 2;
    if (x < 2n ** 30n)
      return 4;
    if (x < 2n ** 62n)
      return 8;
    throw new Error("VarInt value too large");
  }
  encode(dst) {
    const x = this.value;
    const size2 = this.size();
    if (dst.byteOffset + dst.byteLength + size2 > dst.buffer.byteLength) {
      throw new Error("destination buffer too small");
    }
    const view = new DataView(dst.buffer, dst.byteOffset + dst.byteLength, size2);
    if (size2 === 1) {
      view.setUint8(0, Number(x));
    } else if (size2 === 2) {
      view.setUint16(0, 1 << 14 | Number(x), false);
    } else if (size2 === 4) {
      view.setUint32(0, 2 << 30 | Number(x), false);
    } else if (size2 === 8) {
      view.setBigUint64(0, 3n << 62n | x, false);
    } else {
      throw new Error("VarInt value too large");
    }
    return new Uint8Array(dst.buffer, dst.byteOffset, dst.byteLength + size2);
  }
  static decode(buffer) {
    if (buffer.byteLength < 1) {
      throw new Error("Unexpected end of buffer");
    }
    const view = new DataView(buffer.buffer, buffer.byteOffset);
    const firstByte = view.getUint8(0);
    const tag = firstByte >> 6;
    let value;
    let bytesRead;
    switch (tag) {
      case 0:
        value = BigInt(firstByte & 63);
        bytesRead = 1;
        break;
      case 1:
        if (2 > buffer.length) {
          throw new Error("Unexpected end of buffer");
        }
        value = BigInt(view.getUint16(0, false) & 16383);
        bytesRead = 2;
        break;
      case 2:
        if (4 > buffer.length) {
          throw new Error("Unexpected end of buffer");
        }
        value = BigInt(view.getUint32(0, false) & 1073741823);
        bytesRead = 4;
        break;
      case 3:
        if (8 > buffer.length) {
          throw new Error("Unexpected end of buffer");
        }
        value = view.getBigUint64(0, false) & 0x3fffffffffffffffn;
        bytesRead = 8;
        break;
      default:
        throw new Error("Invalid VarInt tag");
    }
    const remaining = new Uint8Array(buffer.buffer, buffer.byteOffset + bytesRead, buffer.byteLength - bytesRead);
    return [new VarInt(value), remaining];
  }
}

// node_modules/@moq/qmux/stream.js
var Dir = {
  Bi: 0,
  Uni: 1
};

class Id {
  value;
  constructor(value) {
    this.value = value;
  }
  static create(id, dir, isServer) {
    let streamId = id << 2n;
    if (dir === Dir.Uni) {
      streamId |= 0x02n;
    }
    if (isServer) {
      streamId |= 0x01n;
    }
    return new Id(VarInt.from(streamId));
  }
  get dir() {
    return (this.value.value & 0x02n) !== 0n ? Dir.Uni : Dir.Bi;
  }
  get serverInitiated() {
    return (this.value.value & 0x01n) !== 0n;
  }
  get index() {
    return this.value.value >> 2n;
  }
  canRecv(isServer) {
    if (this.dir === Dir.Uni) {
      return this.serverInitiated !== isServer;
    }
    return true;
  }
  canSend(isServer) {
    if (this.dir === Dir.Uni) {
      return this.serverInitiated === isServer;
    }
    return true;
  }
}

// node_modules/@moq/qmux/frame.js
var MAX_FRAME_SIZE = 16384;
var MAX_FRAME_PAYLOAD = MAX_FRAME_SIZE - 24;
var DEFAULT_TRANSPORT_PARAMS = {
  initialMaxData: 0n,
  initialMaxStreamDataBidiLocal: 0n,
  initialMaxStreamDataBidiRemote: 0n,
  initialMaxStreamDataUni: 0n,
  initialMaxStreamsBidi: 0n,
  initialMaxStreamsUni: 0n
};
function encode6(frame, version2 = "webtransport") {
  if (version2 === "webtransport") {
    return encodeWebTransport(frame);
  }
  return encodeQMux(frame);
}
function encodeWebTransport(frame) {
  switch (frame.type) {
    case "stream": {
      let buffer = new Uint8Array(new ArrayBuffer(1 + 8 + frame.data.length), 0, 1);
      buffer[0] = frame.fin ? 9 : 8;
      buffer = frame.id.value.encode(buffer);
      buffer = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength + frame.data.length);
      buffer.set(frame.data, buffer.byteLength - frame.data.length);
      return buffer;
    }
    case "reset_stream": {
      let buffer = new Uint8Array(new ArrayBuffer(1 + 8 + 8), 0, 1);
      buffer[0] = 4;
      buffer = frame.id.value.encode(buffer);
      buffer = frame.code.encode(buffer);
      return buffer;
    }
    case "stop_sending": {
      let buffer = new Uint8Array(new ArrayBuffer(1 + 8 + 8), 0, 1);
      buffer[0] = 5;
      buffer = frame.id.value.encode(buffer);
      buffer = frame.code.encode(buffer);
      return buffer;
    }
    case "connection_close": {
      const body = new TextEncoder().encode(frame.reason);
      let buffer = new Uint8Array(new ArrayBuffer(1 + 8 + body.length), 0, 1);
      buffer[0] = 29;
      buffer = frame.code.encode(buffer);
      buffer = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength + body.length);
      buffer.set(body, buffer.byteLength - body.length);
      return buffer;
    }
    default:
      throw new Error("flow control frames are not supported in WebTransport version");
  }
}
function encodeQMux(frame) {
  switch (frame.type) {
    case "stream": {
      const frameType = VarInt.from(10 | (frame.fin ? 1 : 0));
      const lengthVi = VarInt.from(frame.data.length);
      const maxSize = 8 + 8 + 8 + frame.data.length;
      let buffer = new Uint8Array(new ArrayBuffer(maxSize), 0, 0);
      buffer = frameType.encode(buffer);
      buffer = frame.id.value.encode(buffer);
      buffer = lengthVi.encode(buffer);
      buffer = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength + frame.data.length);
      buffer.set(frame.data, buffer.byteLength - frame.data.length);
      return buffer;
    }
    case "reset_stream": {
      const frameType = VarInt.from(4);
      const finalSize = VarInt.from(0);
      let buffer = new Uint8Array(new ArrayBuffer(8 + 8 + 8 + 8), 0, 0);
      buffer = frameType.encode(buffer);
      buffer = frame.id.value.encode(buffer);
      buffer = frame.code.encode(buffer);
      buffer = finalSize.encode(buffer);
      return buffer;
    }
    case "stop_sending": {
      const frameType = VarInt.from(5);
      let buffer = new Uint8Array(new ArrayBuffer(8 + 8 + 8), 0, 0);
      buffer = frameType.encode(buffer);
      buffer = frame.id.value.encode(buffer);
      buffer = frame.code.encode(buffer);
      return buffer;
    }
    case "connection_close": {
      const frameType = VarInt.from(29);
      const causingFrameType = VarInt.from(0);
      const body = new TextEncoder().encode(frame.reason);
      const reasonLength = VarInt.from(body.length);
      let buffer = new Uint8Array(new ArrayBuffer(8 + 8 + 8 + 8 + body.length), 0, 0);
      buffer = frameType.encode(buffer);
      buffer = frame.code.encode(buffer);
      buffer = causingFrameType.encode(buffer);
      buffer = reasonLength.encode(buffer);
      buffer = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength + body.length);
      buffer.set(body, buffer.byteLength - body.length);
      return buffer;
    }
    case "max_data": {
      let buffer = new Uint8Array(new ArrayBuffer(16), 0, 0);
      buffer = VarInt.from(16).encode(buffer);
      buffer = VarInt.from(frame.max).encode(buffer);
      return buffer;
    }
    case "max_stream_data": {
      let buffer = new Uint8Array(new ArrayBuffer(24), 0, 0);
      buffer = VarInt.from(17).encode(buffer);
      buffer = frame.id.value.encode(buffer);
      buffer = VarInt.from(frame.max).encode(buffer);
      return buffer;
    }
    case "max_streams_bidi": {
      let buffer = new Uint8Array(new ArrayBuffer(16), 0, 0);
      buffer = VarInt.from(18).encode(buffer);
      buffer = VarInt.from(frame.max).encode(buffer);
      return buffer;
    }
    case "max_streams_uni": {
      let buffer = new Uint8Array(new ArrayBuffer(16), 0, 0);
      buffer = VarInt.from(19).encode(buffer);
      buffer = VarInt.from(frame.max).encode(buffer);
      return buffer;
    }
    case "data_blocked": {
      let buffer = new Uint8Array(new ArrayBuffer(16), 0, 0);
      buffer = VarInt.from(20).encode(buffer);
      buffer = VarInt.from(frame.limit).encode(buffer);
      return buffer;
    }
    case "stream_data_blocked": {
      let buffer = new Uint8Array(new ArrayBuffer(24), 0, 0);
      buffer = VarInt.from(21).encode(buffer);
      buffer = frame.id.value.encode(buffer);
      buffer = VarInt.from(frame.limit).encode(buffer);
      return buffer;
    }
    case "streams_blocked_bidi": {
      let buffer = new Uint8Array(new ArrayBuffer(16), 0, 0);
      buffer = VarInt.from(22).encode(buffer);
      buffer = VarInt.from(frame.limit).encode(buffer);
      return buffer;
    }
    case "streams_blocked_uni": {
      let buffer = new Uint8Array(new ArrayBuffer(16), 0, 0);
      buffer = VarInt.from(23).encode(buffer);
      buffer = VarInt.from(frame.limit).encode(buffer);
      return buffer;
    }
    case "transport_parameters": {
      const payload = encodeTransportParams(frame.params);
      let buffer = new Uint8Array(new ArrayBuffer(8 + 8 + payload.byteLength), 0, 0);
      buffer = VarInt.from(0x3f5153300d0a0d0an).encode(buffer);
      buffer = VarInt.from(payload.byteLength).encode(buffer);
      buffer = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength + payload.byteLength);
      buffer.set(payload, buffer.byteLength - payload.byteLength);
      return buffer;
    }
  }
}
function encodeTransportParams(params) {
  let buffer = new Uint8Array(new ArrayBuffer(144), 0, 0);
  function writeParam(buf, id, value) {
    if (value === 0n)
      return buf;
    const valVi = VarInt.from(value);
    buf = VarInt.from(id).encode(buf);
    buf = VarInt.from(valVi.size()).encode(buf);
    buf = valVi.encode(buf);
    return buf;
  }
  buffer = writeParam(buffer, 4, params.initialMaxData);
  buffer = writeParam(buffer, 5, params.initialMaxStreamDataBidiLocal);
  buffer = writeParam(buffer, 6, params.initialMaxStreamDataBidiRemote);
  buffer = writeParam(buffer, 7, params.initialMaxStreamDataUni);
  buffer = writeParam(buffer, 8, params.initialMaxStreamsBidi);
  buffer = writeParam(buffer, 9, params.initialMaxStreamsUni);
  return buffer;
}
function decodeTransportParams(buffer) {
  const params = { ...DEFAULT_TRANSPORT_PARAMS };
  let v;
  while (buffer.byteLength > 0) {
    [v, buffer] = VarInt.decode(buffer);
    const id = v.value;
    [v, buffer] = VarInt.decode(buffer);
    const len = Number(v.value);
    if (buffer.byteLength < len) {
      throw new Error("transport parameter truncated");
    }
    const paramData = buffer.slice(0, len);
    buffer = buffer.slice(len);
    if (paramData.byteLength < 1) {
      continue;
    }
    let paramValue;
    [v] = VarInt.decode(paramData);
    paramValue = v.value;
    switch (id) {
      case 0x04n:
        params.initialMaxData = paramValue;
        break;
      case 0x05n:
        params.initialMaxStreamDataBidiLocal = paramValue;
        break;
      case 0x06n:
        params.initialMaxStreamDataBidiRemote = paramValue;
        break;
      case 0x07n:
        params.initialMaxStreamDataUni = paramValue;
        break;
      case 0x08n:
        params.initialMaxStreamsBidi = paramValue;
        break;
      case 0x09n:
        params.initialMaxStreamsUni = paramValue;
        break;
    }
  }
  return params;
}
function decode6(buffer, version2 = "webtransport") {
  if (buffer.length === 0) {
    throw new Error("Invalid frame: empty buffer");
  }
  if (version2 === "webtransport") {
    return decodeWebTransport(buffer);
  }
  return decodeQMux(buffer);
}
function decodeWebTransport(buffer) {
  const frameType = buffer[0];
  buffer = buffer.slice(1);
  let v;
  if (frameType === 4) {
    [v, buffer] = VarInt.decode(buffer);
    const id = new Id(v);
    [v, buffer] = VarInt.decode(buffer);
    const code = v;
    return { type: "reset_stream", id, code };
  }
  if (frameType === 5) {
    [v, buffer] = VarInt.decode(buffer);
    const id = new Id(v);
    [v, buffer] = VarInt.decode(buffer);
    const code = v;
    return { type: "stop_sending", id, code };
  }
  if (frameType === 29) {
    [v, buffer] = VarInt.decode(buffer);
    const code = v;
    const reason = new TextDecoder().decode(buffer);
    return { type: "connection_close", code, reason };
  }
  if (frameType === 8 || frameType === 9) {
    [v, buffer] = VarInt.decode(buffer);
    const id = new Id(v);
    return {
      type: "stream",
      id,
      data: buffer,
      fin: frameType === 9
    };
  }
  throw new Error(`Invalid frame type: ${frameType}`);
}
function decodeQMux(buffer) {
  let v;
  [v, buffer] = VarInt.decode(buffer);
  const frameType = v.value;
  if (frameType >= 0x08n && frameType <= 0x0fn) {
    const hasOff = (frameType & 0x04n) !== 0n;
    const hasLen = (frameType & 0x02n) !== 0n;
    const hasFin = (frameType & 0x01n) !== 0n;
    [v, buffer] = VarInt.decode(buffer);
    const id = new Id(v);
    if (hasOff) {
      [v, buffer] = VarInt.decode(buffer);
    }
    let data;
    if (hasLen) {
      [v, buffer] = VarInt.decode(buffer);
      const len = Number(v.value);
      data = buffer.slice(0, len);
      buffer = buffer.slice(len);
    } else {
      data = buffer;
    }
    return { type: "stream", id, data, fin: hasFin };
  }
  if (frameType === 0x04n) {
    [v, buffer] = VarInt.decode(buffer);
    const id = new Id(v);
    [v, buffer] = VarInt.decode(buffer);
    const code = v;
    [v, buffer] = VarInt.decode(buffer);
    return { type: "reset_stream", id, code };
  }
  if (frameType === 0x05n) {
    [v, buffer] = VarInt.decode(buffer);
    const id = new Id(v);
    [v, buffer] = VarInt.decode(buffer);
    const code = v;
    return { type: "stop_sending", id, code };
  }
  if (frameType === 0x1cn || frameType === 0x1dn) {
    [v, buffer] = VarInt.decode(buffer);
    const code = v;
    [v, buffer] = VarInt.decode(buffer);
    [v, buffer] = VarInt.decode(buffer);
    const reasonLen = Number(v.value);
    const reason = new TextDecoder().decode(buffer.slice(0, reasonLen));
    return { type: "connection_close", code, reason };
  }
  if (frameType === 0x10n) {
    [v, buffer] = VarInt.decode(buffer);
    return { type: "max_data", max: v.value };
  }
  if (frameType === 0x11n) {
    [v, buffer] = VarInt.decode(buffer);
    const id = new Id(v);
    [v, buffer] = VarInt.decode(buffer);
    return { type: "max_stream_data", id, max: v.value };
  }
  if (frameType === 0x12n) {
    [v, buffer] = VarInt.decode(buffer);
    return { type: "max_streams_bidi", max: v.value };
  }
  if (frameType === 0x13n) {
    [v, buffer] = VarInt.decode(buffer);
    return { type: "max_streams_uni", max: v.value };
  }
  if (frameType === 0x14n) {
    [v, buffer] = VarInt.decode(buffer);
    return { type: "data_blocked", limit: v.value };
  }
  if (frameType === 0x15n) {
    [v, buffer] = VarInt.decode(buffer);
    const id = new Id(v);
    [v, buffer] = VarInt.decode(buffer);
    return { type: "stream_data_blocked", id, limit: v.value };
  }
  if (frameType === 0x16n) {
    [v, buffer] = VarInt.decode(buffer);
    return { type: "streams_blocked_bidi", limit: v.value };
  }
  if (frameType === 0x17n) {
    [v, buffer] = VarInt.decode(buffer);
    return { type: "streams_blocked_uni", limit: v.value };
  }
  if (frameType === 0x3f5153300d0a0d0an) {
    [v, buffer] = VarInt.decode(buffer);
    const len = Number(v.value);
    if (buffer.byteLength < len) {
      throw new Error("transport parameters frame truncated");
    }
    const payload = buffer.slice(0, len);
    const params = decodeTransportParams(payload);
    return { type: "transport_parameters", params };
  }
  if (frameType === 0x30n) {
    return null;
  }
  if (frameType === 0x31n) {
    [v, buffer] = VarInt.decode(buffer);
    return null;
  }
  return null;
}

// node_modules/@moq/qmux/session.js
var DEFAULT_CONFIG = {
  maxStreamsBidi: 100n,
  maxStreamsUni: 100n,
  maxData: 1048576n,
  maxStreamDataBidiLocal: 262144n,
  maxStreamDataBidiRemote: 262144n,
  maxStreamDataUni: 262144n
};
function configToTransportParams(config2) {
  return {
    initialMaxData: config2.maxData,
    initialMaxStreamDataBidiLocal: config2.maxStreamDataBidiLocal,
    initialMaxStreamDataBidiRemote: config2.maxStreamDataBidiRemote,
    initialMaxStreamDataUni: config2.maxStreamDataUni,
    initialMaxStreamsBidi: config2.maxStreamsBidi,
    initialMaxStreamsUni: config2.maxStreamsUni
  };
}

class Datagrams {
  incomingHighWaterMark;
  incomingMaxAge;
  maxDatagramSize;
  outgoingHighWaterMark;
  outgoingMaxAge;
  readable;
  writable;
  constructor() {
    this.incomingHighWaterMark = 1024;
    this.incomingMaxAge = null;
    this.maxDatagramSize = 1200;
    this.outgoingHighWaterMark = 1024;
    this.outgoingMaxAge = null;
    this.readable = new ReadableStream({});
    this.writable = new WritableStream({});
  }
}
var PREFIX_WEBTRANSPORT = "webtransport.";
var PREFIX_QMUX = "qmux-00.";

class Session {
  #ws;
  #isServer = false;
  #closed;
  #closeReason;
  #sendStreams = new Map;
  #recvStreams = new Map;
  #nextUniStreamId = 0n;
  #nextBiStreamId = 0n;
  #version = "webtransport";
  #protocol = "";
  get protocol() {
    return this.#protocol;
  }
  ready;
  #readyResolve;
  closed;
  #closedResolve;
  incomingBidirectionalStreams;
  #incomingBidirectionalStreams;
  incomingUnidirectionalStreams;
  #incomingUnidirectionalStreams;
  datagrams = new Datagrams;
  #config;
  #ourParams;
  #peerParams = { ...DEFAULT_TRANSPORT_PARAMS };
  #paramsReceived = false;
  #connCredit;
  #recvDataOffset = 0n;
  #recvDataMax = 0n;
  #recvDataConsumed = 0n;
  #streamFlow = new Map;
  #bidiStreamCredit;
  #uniStreamCredit;
  #recvBiCredit;
  #recvUniCredit;
  constructor(url, options) {
    if (options?.requireUnreliable) {
      throw new Error("not allowed to use WebSocket; requireUnreliable is true");
    }
    if (options?.serverCertificateHashes) {
      console.warn("serverCertificateHashes is not supported; trying anyway");
    }
    url = Session.#convertToWebSocketUrl(url);
    this.#config = { ...DEFAULT_CONFIG, ...options?.config };
    this.#ourParams = configToTransportParams(this.#config);
    const appProtocols = options?.protocols ?? [];
    const prefixed = new Set(["qmux-00", "webtransport"]);
    for (const p of appProtocols) {
      const stripped = p.startsWith(PREFIX_WEBTRANSPORT) ? p.slice(PREFIX_WEBTRANSPORT.length) : p.startsWith(PREFIX_QMUX) ? p.slice(PREFIX_QMUX.length) : p;
      prefixed.add(`${PREFIX_QMUX}${stripped}`);
      prefixed.add(`${PREFIX_WEBTRANSPORT}${stripped}`);
    }
    this.#ws = new WebSocket(url, [...prefixed]);
    this.#connCredit = new Credit(0n);
    this.#bidiStreamCredit = new Credit(0n);
    this.#uniStreamCredit = new Credit(0n);
    this.#recvBiCredit = new Credit(this.#config.maxStreamsBidi);
    this.#recvUniCredit = new Credit(this.#config.maxStreamsUni);
    const ready = Promise.withResolvers();
    this.ready = ready.promise;
    this.#readyResolve = ready.resolve;
    const closed = Promise.withResolvers();
    this.closed = closed.promise;
    this.#closedResolve = closed.resolve;
    this.#ws.binaryType = "arraybuffer";
    this.#ws.onopen = () => {
      const raw = this.#ws.protocol;
      if (raw.startsWith(PREFIX_QMUX)) {
        this.#version = "qmux-00";
        this.#protocol = raw.slice(PREFIX_QMUX.length);
      } else if (raw.startsWith(PREFIX_WEBTRANSPORT)) {
        this.#version = "webtransport";
        this.#protocol = raw.slice(PREFIX_WEBTRANSPORT.length);
      } else if (raw === "qmux-00") {
        this.#version = "qmux-00";
        this.#protocol = "";
      } else {
        this.#version = "webtransport";
        this.#protocol = "";
      }
      if (this.#version === "qmux-00") {
        this.#recvDataMax = this.#ourParams.initialMaxData;
        this.#sendTransportParameters();
      } else {
        this.#connCredit = new Credit(BigInt(Number.MAX_SAFE_INTEGER));
        this.#bidiStreamCredit = new Credit(BigInt(Number.MAX_SAFE_INTEGER));
        this.#uniStreamCredit = new Credit(BigInt(Number.MAX_SAFE_INTEGER));
      }
      this.#readyResolve();
    };
    this.#ws.onmessage = (event) => this.#handleMessage(event);
    this.#ws.onerror = (event) => this.#handleError(event);
    this.#ws.onclose = (event) => this.#handleClose(event);
    this.incomingBidirectionalStreams = new ReadableStream({
      start: (controller) => {
        this.#incomingBidirectionalStreams = controller;
      }
    });
    this.incomingUnidirectionalStreams = new ReadableStream({
      start: (controller) => {
        this.#incomingUnidirectionalStreams = controller;
      }
    });
    if (!this.#incomingBidirectionalStreams || !this.#incomingUnidirectionalStreams) {
      throw new Error("ReadableStream didn't call start");
    }
  }
  static #convertToWebSocketUrl(url) {
    const urlObj = typeof url === "string" ? new URL(url) : url;
    let protocol = urlObj.protocol;
    if (protocol === "https:") {
      protocol = "wss:";
    } else if (protocol === "http:") {
      protocol = "ws:";
    } else if (protocol !== "ws:" && protocol !== "wss:") {
      throw new Error(`Unsupported protocol: ${protocol}`);
    }
    return `${protocol}//${urlObj.host}${urlObj.pathname}${urlObj.search}`;
  }
  #handleMessage(event) {
    if (!(event.data instanceof ArrayBuffer))
      return;
    const data = new Uint8Array(event.data);
    try {
      const frame = decode6(data, this.#version);
      if (frame !== null) {
        this.#recvFrame(frame);
      }
    } catch (error2) {
      console.error("Failed to decode frame:", error2);
      this.close({ closeCode: 1002, reason: "Protocol violation" });
    }
  }
  #handleError(event) {
    if (this.#closed)
      return;
    this.#closed = new Error(`WebSocket error: ${event.type}`);
    this.#close(1006, "WebSocket error");
  }
  #handleClose(event) {
    if (this.#closed)
      return;
    this.#closed = new Error(`Connection closed: ${event.code} ${event.reason}`);
    this.#close(event.code, event.reason);
  }
  #recvFrame(frame) {
    if (frame.type === "stream") {
      this.#handleStreamFrame(frame);
    } else if (frame.type === "reset_stream") {
      this.#handleResetStream(frame);
    } else if (frame.type === "stop_sending") {
      this.#handleStopSending(frame);
    } else if (frame.type === "connection_close") {
      this.#closeReason = new Error(`Connection closed: ${frame.code.value}: ${frame.reason}`);
      this.#ws.close();
    } else if (frame.type === "transport_parameters") {
      this.#handleTransportParameters(frame.params);
    } else if (frame.type === "max_data") {
      this.#connCredit.increaseMax(frame.max);
    } else if (frame.type === "max_stream_data") {
      const flow = this.#streamFlow.get(frame.id.value.value);
      if (flow)
        flow.sendCredit.increaseMax(frame.max);
    } else if (frame.type === "max_streams_bidi") {
      this.#bidiStreamCredit.increaseMax(frame.max);
    } else if (frame.type === "max_streams_uni") {
      this.#uniStreamCredit.increaseMax(frame.max);
    } else if (frame.type === "data_blocked" || frame.type === "stream_data_blocked" || frame.type === "streams_blocked_bidi" || frame.type === "streams_blocked_uni") {}
  }
  #handleTransportParameters(params) {
    if (this.#paramsReceived)
      return;
    this.#paramsReceived = true;
    this.#peerParams = params;
    this.#connCredit.increaseMax(params.initialMaxData);
    this.#bidiStreamCredit.increaseMax(params.initialMaxStreamsBidi);
    this.#uniStreamCredit.increaseMax(params.initialMaxStreamsUni);
    for (const [streamIdVal, flow] of this.#streamFlow) {
      const id = new Id(VarInt.from(streamIdVal));
      const sendLimit = id.dir === Dir.Bi ? params.initialMaxStreamDataBidiRemote : params.initialMaxStreamDataUni;
      flow.sendCredit.increaseMax(sendLimit);
    }
  }
  async#claimSendCredit(streamId, desired) {
    const flow = this.#streamFlow.get(streamId);
    if (!flow)
      return desired;
    while (true) {
      const streamClaimed = flow.sendCredit.tryClaim(desired);
      if (streamClaimed === 0n) {
        if (this.#closed)
          throw this.#closeReason || new Error("Connection closed");
        const claimed = await flow.sendCredit.claim(desired);
        flow.sendCredit.release(claimed);
        continue;
      }
      const connClaimed = this.#connCredit.tryClaim(streamClaimed);
      if (connClaimed === 0n) {
        flow.sendCredit.release(streamClaimed);
        if (this.#closed)
          throw this.#closeReason || new Error("Connection closed");
        const claimed = await this.#connCredit.claim(1n);
        this.#connCredit.release(claimed);
        continue;
      }
      if (connClaimed < streamClaimed) {
        flow.sendCredit.release(streamClaimed - connClaimed);
      }
      return connClaimed;
    }
  }
  #accountRecv(streamId, bytes) {
    if (this.#version !== "qmux-00" || bytes === 0)
      return true;
    const bytesN = BigInt(bytes);
    if (this.#recvDataOffset + bytesN > this.#recvDataMax) {
      return false;
    }
    this.#recvDataOffset += bytesN;
    const flow = this.#streamFlow.get(streamId);
    if (flow) {
      if (flow.recvOffset + bytesN > flow.recvMax) {
        return false;
      }
      flow.recvOffset += bytesN;
    }
    return true;
  }
  #accountConsumed(streamId, bytes) {
    if (this.#version !== "qmux-00" || bytes === 0)
      return;
    this.#recvDataConsumed += BigInt(bytes);
    const flow = this.#streamFlow.get(streamId);
    if (flow) {
      flow.recvConsumed += BigInt(bytes);
      this.#maybeSendMaxStreamData(streamId, flow);
    }
    this.#maybeSendMaxData();
  }
  #maybeSendMaxData() {
    const window2 = this.#ourParams.initialMaxData;
    if (window2 === 0n)
      return;
    const threshold = window2 / 2n;
    if (this.#recvDataConsumed >= threshold) {
      const newMax = this.#recvDataOffset + window2;
      if (newMax > this.#recvDataMax) {
        this.#recvDataMax = newMax;
        this.#recvDataConsumed = 0n;
        this.#sendPriorityFrame({ type: "max_data", max: newMax });
      }
    }
  }
  #maybeSendMaxStreamData(streamId, flow) {
    const id = new Id(VarInt.from(streamId));
    let initialWindow;
    if (id.dir === Dir.Bi) {
      initialWindow = id.serverInitiated === this.#isServer ? this.#ourParams.initialMaxStreamDataBidiLocal : this.#ourParams.initialMaxStreamDataBidiRemote;
    } else {
      initialWindow = this.#ourParams.initialMaxStreamDataUni;
    }
    if (initialWindow === 0n)
      return;
    const threshold = initialWindow / 2n;
    if (flow.recvConsumed >= threshold) {
      const newMax = flow.recvOffset + initialWindow;
      if (newMax > flow.recvMax) {
        flow.recvMax = newMax;
        flow.recvConsumed = 0n;
        this.#sendPriorityFrame({ type: "max_stream_data", id, max: newMax });
      }
    }
  }
  #replenishStreamCredit(dir) {
    if (this.#version !== "qmux-00")
      return;
    const credit = dir === Dir.Bi ? this.#recvBiCredit : this.#recvUniCredit;
    const newMax = credit.consume(1n);
    if (newMax !== null) {
      if (dir === Dir.Bi) {
        this.#sendPriorityFrame({ type: "max_streams_bidi", max: newMax });
      } else {
        this.#sendPriorityFrame({ type: "max_streams_uni", max: newMax });
      }
    }
  }
  #maybeDeleteStreamFlow(streamId) {
    if (!this.#sendStreams.has(streamId) && !this.#recvStreams.has(streamId)) {
      const flow = this.#streamFlow.get(streamId);
      if (flow) {
        flow.sendCredit.close();
        this.#streamFlow.delete(streamId);
      }
    }
  }
  async#handleStreamFrame(frame) {
    if (frame.data.byteLength > MAX_FRAME_PAYLOAD) {
      this.close({ closeCode: 1002, reason: "frame too large" });
      return;
    }
    const streamId = frame.id.value.value;
    if (!frame.id.canRecv(this.#isServer)) {
      throw new Error("Invalid stream ID direction");
    }
    let stream = this.#recvStreams.get(streamId);
    if (!stream) {
      if (frame.id.serverInitiated === this.#isServer) {
        return;
      }
      if (!frame.id.canRecv(this.#isServer)) {
        throw new Error("received write-only stream");
      }
      if (this.#version === "qmux-00") {
        const credit = frame.id.dir === Dir.Bi ? this.#recvBiCredit : this.#recvUniCredit;
        if (!credit.receiveUpTo(frame.id.index + 1n)) {
          this.close({ closeCode: 1002, reason: "stream limit exceeded" });
          return;
        }
      }
      if (this.#version === "qmux-00") {
        const recvMax = frame.id.dir === Dir.Bi ? this.#ourParams.initialMaxStreamDataBidiRemote : this.#ourParams.initialMaxStreamDataUni;
        const sendMax = frame.id.dir === Dir.Bi ? this.#peerParams.initialMaxStreamDataBidiLocal : 0n;
        this.#streamFlow.set(streamId, {
          sendCredit: new Credit(sendMax),
          recvMax,
          recvOffset: 0n,
          recvConsumed: 0n
        });
      }
      if (!this.#accountRecv(streamId, frame.data.byteLength)) {
        this.close({ closeCode: 1002, reason: "flow control error" });
        return;
      }
      const reader = new ReadableStream({
        start: (controller) => {
          stream = controller;
          this.#recvStreams.set(streamId, controller);
        },
        cancel: () => {
          this.#sendPriorityFrame({
            type: "stop_sending",
            id: frame.id,
            code: VarInt.from(0)
          });
          this.#recvStreams.delete(streamId);
          this.#replenishStreamCredit(frame.id.dir);
          this.#maybeDeleteStreamFlow(streamId);
        }
      });
      if (!stream) {
        throw new Error("ReadableStream didn't call start");
      }
      if (frame.id.dir === Dir.Bi) {
        const writer = new WritableStream({
          start: (controller) => {
            this.#sendStreams.set(streamId, controller);
          },
          write: async (chunk) => {
            await Promise.race([this.#sendStreamData(frame.id, chunk), this.closed]);
          },
          abort: (e) => {
            console.warn("abort", e);
            this.#sendPriorityFrame({
              type: "reset_stream",
              id: frame.id,
              code: VarInt.from(0)
            });
            this.#sendStreams.delete(streamId);
            this.#maybeDeleteStreamFlow(streamId);
          },
          close: async () => {
            await Promise.race([
              this.#sendFrame({
                type: "stream",
                id: frame.id,
                data: new Uint8Array,
                fin: true
              }),
              this.closed
            ]);
            this.#sendStreams.delete(streamId);
            this.#maybeDeleteStreamFlow(streamId);
          }
        });
        this.#incomingBidirectionalStreams.enqueue({ readable: reader, writable: writer });
      } else {
        this.#incomingUnidirectionalStreams.enqueue(reader);
      }
    } else {
      if (!this.#accountRecv(streamId, frame.data.byteLength)) {
        this.close({ closeCode: 1002, reason: "flow control error" });
        return;
      }
    }
    if (frame.data.byteLength > 0) {
      stream.enqueue(frame.data);
      this.#accountConsumed(streamId, frame.data.byteLength);
    }
    if (frame.fin) {
      stream.close();
      this.#recvStreams.delete(streamId);
      if (frame.id.serverInitiated !== this.#isServer) {
        this.#replenishStreamCredit(frame.id.dir);
      }
      this.#maybeDeleteStreamFlow(streamId);
    }
  }
  #handleResetStream(frame) {
    const streamId = frame.id.value.value;
    const stream = this.#recvStreams.get(streamId);
    if (!stream)
      return;
    stream.error(new Error(`RESET_STREAM: ${frame.code.value}`));
    this.#recvStreams.delete(streamId);
    if (frame.id.serverInitiated !== this.#isServer) {
      this.#replenishStreamCredit(frame.id.dir);
    }
    this.#maybeDeleteStreamFlow(streamId);
  }
  #handleStopSending(frame) {
    const streamId = frame.id.value.value;
    const stream = this.#sendStreams.get(streamId);
    if (!stream)
      return;
    stream.error(new Error(`STOP_SENDING: ${frame.code.value}`));
    this.#sendStreams.delete(streamId);
    this.#sendPriorityFrame({
      type: "reset_stream",
      id: frame.id,
      code: frame.code
    });
    this.#maybeDeleteStreamFlow(streamId);
  }
  #sendTransportParameters() {
    const frame = {
      type: "transport_parameters",
      params: this.#ourParams
    };
    const encoded = encode6(frame, this.#version);
    this.#ws.send(encoded);
  }
  async#sendStreamDataWithFlowControl(id, streamId, data) {
    for (let offset = 0;offset < data.byteLength; ) {
      const remaining = data.byteLength - offset;
      const chunkMax = Math.min(remaining, MAX_FRAME_PAYLOAD);
      const allowed = await this.#claimSendCredit(streamId, BigInt(chunkMax));
      const sendable = Number(allowed);
      const chunk = data.subarray(offset, offset + sendable);
      try {
        await this.#sendFrame({
          type: "stream",
          id,
          data: chunk,
          fin: false
        });
      } catch (e) {
        if (sendable > 0) {
          const flow = this.#streamFlow.get(streamId);
          if (flow)
            flow.sendCredit.release(BigInt(sendable));
          this.#connCredit.release(BigInt(sendable));
        }
        throw e;
      }
      offset += sendable;
    }
  }
  async#sendStreamData(id, data) {
    const streamId = id.value.value;
    if (this.#version === "qmux-00") {
      await this.#sendStreamDataWithFlowControl(id, streamId, data);
    } else {
      for (let offset = 0;offset < data.byteLength; offset += MAX_FRAME_PAYLOAD) {
        const end = Math.min(offset + MAX_FRAME_PAYLOAD, data.byteLength);
        const chunk = data.subarray(offset, end);
        await this.#sendFrame({
          type: "stream",
          id,
          data: chunk,
          fin: false
        });
      }
    }
  }
  async#sendFrame(frame) {
    while (this.#ws.bufferedAmount > 64 * 1024) {
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    const chunk = encode6(frame, this.#version);
    this.#ws.send(chunk);
  }
  #sendPriorityFrame(frame) {
    const chunk = encode6(frame, this.#version);
    this.#ws.send(chunk);
  }
  async createBidirectionalStream() {
    await this.ready;
    if (this.#closed) {
      throw this.#closeReason || new Error("Connection closed");
    }
    await this.#bidiStreamCredit.claim(1n);
    const streamId = Id.create(this.#nextBiStreamId++, Dir.Bi, this.#isServer);
    const streamIdVal = streamId.value.value;
    if (this.#version === "qmux-00") {
      this.#streamFlow.set(streamIdVal, {
        sendCredit: new Credit(this.#peerParams.initialMaxStreamDataBidiRemote),
        recvMax: this.#ourParams.initialMaxStreamDataBidiLocal,
        recvOffset: 0n,
        recvConsumed: 0n
      });
    }
    const writer = new WritableStream({
      start: (controller) => {
        this.#sendStreams.set(streamIdVal, controller);
      },
      write: async (chunk) => {
        await Promise.race([this.#sendStreamData(streamId, chunk), this.closed]);
      },
      abort: (e) => {
        console.warn("abort", e);
        this.#sendPriorityFrame({
          type: "reset_stream",
          id: streamId,
          code: VarInt.from(0)
        });
        this.#sendStreams.delete(streamIdVal);
        this.#maybeDeleteStreamFlow(streamIdVal);
      },
      close: async () => {
        await Promise.race([
          this.#sendFrame({
            type: "stream",
            id: streamId,
            data: new Uint8Array,
            fin: true
          }),
          this.closed
        ]);
        this.#sendStreams.delete(streamIdVal);
        this.#maybeDeleteStreamFlow(streamIdVal);
      }
    });
    const reader = new ReadableStream({
      start: (controller) => {
        this.#recvStreams.set(streamIdVal, controller);
      },
      cancel: async () => {
        this.#sendPriorityFrame({
          type: "stop_sending",
          id: streamId,
          code: VarInt.from(0)
        });
        this.#recvStreams.delete(streamIdVal);
        this.#maybeDeleteStreamFlow(streamIdVal);
      }
    });
    return { readable: reader, writable: writer };
  }
  async createUnidirectionalStream() {
    await this.ready;
    if (this.#closed) {
      throw this.#closed;
    }
    await this.#uniStreamCredit.claim(1n);
    const streamId = Id.create(this.#nextUniStreamId++, Dir.Uni, this.#isServer);
    const streamIdVal = streamId.value.value;
    if (this.#version === "qmux-00") {
      this.#streamFlow.set(streamIdVal, {
        sendCredit: new Credit(this.#peerParams.initialMaxStreamDataUni),
        recvMax: 0n,
        recvOffset: 0n,
        recvConsumed: 0n
      });
    }
    const session = this;
    const writer = new WritableStream({
      start: (controller) => {
        session.#sendStreams.set(streamIdVal, controller);
      },
      async write(chunk) {
        await Promise.race([session.#sendStreamData(streamId, chunk), session.closed]);
      },
      abort(e) {
        console.warn("abort", e);
        session.#sendPriorityFrame({
          type: "reset_stream",
          id: streamId,
          code: VarInt.from(0)
        });
        session.#sendStreams.delete(streamIdVal);
        session.#maybeDeleteStreamFlow(streamIdVal);
      },
      async close() {
        await Promise.race([
          session.#sendFrame({
            type: "stream",
            id: streamId,
            data: new Uint8Array,
            fin: true
          }),
          session.closed
        ]);
        session.#sendStreams.delete(streamIdVal);
        session.#maybeDeleteStreamFlow(streamIdVal);
      }
    });
    return writer;
  }
  #close(code, reason) {
    this.#closedResolve({
      closeCode: code,
      reason
    });
    try {
      this.#incomingBidirectionalStreams.close();
    } catch {}
    try {
      this.#incomingUnidirectionalStreams.close();
    } catch {}
    for (const c of this.#sendStreams.values()) {
      try {
        c.error(this.#closed);
      } catch {}
    }
    for (const c of this.#recvStreams.values()) {
      try {
        c.error(this.#closed);
      } catch {}
    }
    this.#sendStreams.clear();
    this.#recvStreams.clear();
    for (const flow of this.#streamFlow.values()) {
      flow.sendCredit.close();
    }
    this.#streamFlow.clear();
    this.#connCredit.close();
    this.#bidiStreamCredit.close();
    this.#uniStreamCredit.close();
    this.#recvBiCredit.close();
    this.#recvUniCredit.close();
  }
  close(info) {
    if (this.#closed)
      return;
    const code = info?.closeCode ?? 0;
    const reason = info?.reason ?? "";
    this.#sendPriorityFrame({
      type: "connection_close",
      code: VarInt.from(code),
      reason
    });
    setTimeout(() => {
      this.#ws.close();
    }, 100);
    this.#close(code, reason);
  }
  get congestionControl() {
    return "default";
  }
}

// node_modules/@moq/qmux/index.js
var qmux_default = Session;

// node_modules/@moq/net/connection/connect.js
init_stream();

// node_modules/@moq/net/util/hex.js
function toBytes(hex) {
  hex = hex.startsWith("0x") ? hex.slice(2) : hex;
  if (hex.length % 2) {
    throw new Error("invalid hex string length");
  }
  const matches = hex.match(/.{2}/g);
  if (!matches) {
    throw new Error("invalid hex string format");
  }
  return new Uint8Array(matches.map((byte) => parseInt(byte, 16)));
}

// node_modules/@moq/net/connection/connect.js
var DEFAULT_WEBSOCKET_DELAY_MS = 500;
var websocketWon = new Set;
var isFirefox = typeof navigator !== "undefined" && navigator.userAgent.toLowerCase().includes("firefox");
async function connect(url, props) {
  if (props?.transport) {
    return connectTransport(url, props.transport);
  }
  const { promise: cancel, resolve: done } = Promise.withResolvers();
  const webtransport = globalThis.WebTransport && !isFirefox ? connectWebTransport(url, cancel, props?.webtransport) : undefined;
  const headstart = !webtransport || websocketWon.has(url.toString()) ? 0 : props?.websocket?.delay ?? DEFAULT_WEBSOCKET_DELAY_MS;
  const websocket = props?.websocket?.enabled !== false ? connectWebSocket(props?.websocket?.url ?? url, headstart, cancel) : undefined;
  if (!websocket && !webtransport) {
    throw new Error("no transport available; WebTransport not supported and WebSocket is disabled");
  }
  const session = await Promise.any(webtransport !== undefined ? websocket !== undefined ? [websocket, webtransport] : [webtransport] : [websocket]);
  done();
  if (!session)
    throw new Error("no transport available");
  if (session instanceof qmux_default) {
    console.warn(url.toString(), "connected via WebSocket");
    websocketWon.add(url.toString());
  } else {
    console.log(url.toString(), "connected via WebTransport");
  }
  const protocol = session instanceof qmux_default ? session.protocol || undefined : session.protocol;
  console.debug(url.toString(), "negotiated ALPN:", protocol ?? "(none)");
  let setupVersion;
  const modernVersion = protocol === ALPN.DRAFT_18 ? Version.DRAFT_18 : protocol === ALPN.DRAFT_17 ? Version.DRAFT_17 : undefined;
  if (modernVersion !== undefined) {
    return await handshakeAlpn(url, session, modernVersion);
  } else if (protocol === ALPN.DRAFT_16) {
    setupVersion = Version.DRAFT_16;
  } else if (protocol === ALPN.DRAFT_15) {
    setupVersion = Version.DRAFT_15;
  } else if (protocol === ALPN_04) {
    return new Connection2(url, session, Version2.DRAFT_04, undefined);
  } else if (protocol === ALPN_03) {
    return new Connection2(url, session, Version2.DRAFT_03, undefined);
  } else if (protocol === ALPN2 || protocol === "" || protocol === undefined) {
    setupVersion = Version.DRAFT_14;
  } else {
    throw new Error(`unsupported WebTransport protocol: ${protocol}`);
  }
  const stream = await Stream.open(session);
  await stream.writer.u53(StreamId.ClientCompat);
  const encoder = new TextEncoder;
  const params = new SetupOptions;
  params.setVarint(SetupOption.MaxRequestId, 42069n);
  params.setBytes(SetupOption.Implementation, encoder.encode("moq-lite-js"));
  const client = new ClientSetup({
    versions: setupVersion === Version.DRAFT_16 ? [Version.DRAFT_16] : setupVersion === Version.DRAFT_15 ? [Version.DRAFT_15] : [Version2.DRAFT_02, Version2.DRAFT_01, Version.DRAFT_14],
    parameters: params
  });
  console.debug(url.toString(), "sending client setup", client);
  await client.encode(stream.writer, setupVersion);
  const serverCompat = await stream.reader.u53();
  if (serverCompat !== StreamId.ServerCompat) {
    throw new Error(`unsupported server message type: ${serverCompat.toString()}`);
  }
  const server = await ServerSetup.decode(stream.reader, setupVersion);
  console.debug(url.toString(), "received server setup", server);
  if (Object.values(Version2).includes(server.version)) {
    return new Connection2(url, session, server.version, stream);
  } else if (Object.values(Version).includes(server.version)) {
    const maxRequestId = server.parameters.getVarint(SetupOption.MaxRequestId) ?? 0n;
    return new Connection({
      url,
      quic: session,
      control: stream,
      maxRequestId,
      version: server.version
    });
  } else {
    throw new Error(`unsupported server version: ${server.version.toString()}`);
  }
}
async function connectTransport(url, session) {
  const protocol = session.protocol;
  let setupVersion;
  const modernVersion = protocol === ALPN.DRAFT_18 ? Version.DRAFT_18 : protocol === ALPN.DRAFT_17 ? Version.DRAFT_17 : undefined;
  if (modernVersion !== undefined) {
    return await handshakeAlpn(url, session, modernVersion);
  } else if (protocol === ALPN.DRAFT_16) {
    setupVersion = Version.DRAFT_16;
  } else if (protocol === ALPN.DRAFT_15) {
    setupVersion = Version.DRAFT_15;
  } else if (protocol === ALPN_04) {
    return new Connection2(url, session, Version2.DRAFT_04, undefined);
  } else if (protocol === ALPN_03) {
    return new Connection2(url, session, Version2.DRAFT_03, undefined);
  } else if (protocol === ALPN2 || protocol === "" || protocol === undefined) {
    setupVersion = Version.DRAFT_14;
  } else {
    throw new Error(`unsupported WebTransport protocol: ${protocol}`);
  }
  const stream = await Stream.open(session);
  await stream.writer.u53(StreamId.ClientCompat);
  const encoder = new TextEncoder;
  const params = new SetupOptions;
  params.setVarint(SetupOption.MaxRequestId, 42069n);
  params.setBytes(SetupOption.Implementation, encoder.encode("moq-lite-js"));
  const client = new ClientSetup({
    versions: setupVersion === Version.DRAFT_16 ? [Version.DRAFT_16] : setupVersion === Version.DRAFT_15 ? [Version.DRAFT_15] : [Version2.DRAFT_02, Version2.DRAFT_01, Version.DRAFT_14],
    parameters: params
  });
  await client.encode(stream.writer, setupVersion);
  const serverCompat = await stream.reader.u53();
  if (serverCompat !== StreamId.ServerCompat) {
    throw new Error(`unsupported server message type: ${serverCompat.toString()}`);
  }
  const server = await ServerSetup.decode(stream.reader, setupVersion);
  if (Object.values(Version2).includes(server.version)) {
    return new Connection2(url, session, server.version, stream);
  } else if (Object.values(Version).includes(server.version)) {
    const maxRequestId = server.parameters.getVarint(SetupOption.MaxRequestId) ?? 0n;
    return new Connection({
      url,
      quic: session,
      control: stream,
      maxRequestId,
      version: server.version
    });
  } else {
    throw new Error(`unsupported server version: ${server.version.toString()}`);
  }
}
async function handshakeAlpn(url, session, version2) {
  const controlStream = await exchangeSetup(session, version2, "moq-lite-js");
  return new Connection({
    url,
    quic: session,
    control: controlStream,
    maxRequestId: 0n,
    version: version2
  });
}
function pemToDer(pem) {
  const match = pem.match(/-----BEGIN CERTIFICATE-----([\s\S]+?)-----END CERTIFICATE-----/);
  if (!match) {
    throw new Error("invalid PEM certificate: missing -----BEGIN/END CERTIFICATE----- armor");
  }
  const binary = atob(match[1].replace(/\s+/g, ""));
  const der = new Uint8Array(binary.length);
  for (let i = 0;i < binary.length; i++) {
    der[i] = binary.charCodeAt(i);
  }
  return der;
}
async function certificateHash(cert) {
  const der = typeof cert === "string" ? pemToDer(cert) : cert;
  const digest = await crypto.subtle.digest("SHA-256", der);
  return new Uint8Array(digest);
}
async function resolveCertificateHashes(options) {
  const hashes = [];
  for (const hash of options?.serverCertificateHashes ?? []) {
    const value = typeof hash.value === "string" ? toBytes(hash.value) : hash.value;
    hashes.push({ algorithm: hash.algorithm ?? "sha-256", value });
  }
  if (options?.serverCertificate !== undefined) {
    hashes.push({ algorithm: "sha-256", value: await certificateHash(options.serverCertificate) });
  }
  return hashes.length > 0 ? hashes : undefined;
}
async function connectWebTransport(url, cancel, options) {
  let finalUrl = url;
  const { serverCertificate: _cert, serverCertificateHashes: _hashes, ...webtransport } = options ?? {};
  const finalOptions = {
    allowPooling: false,
    congestionControl: "low-latency",
    protocols: [
      ALPN_04,
      ALPN_03,
      ALPN2,
      ALPN.DRAFT_18,
      ALPN.DRAFT_17,
      ALPN.DRAFT_16,
      ALPN.DRAFT_15
    ],
    ...webtransport
  };
  const hashes = await resolveCertificateHashes(options) ?? [];
  if (url.protocol === "http:") {
    const fingerprintUrl = new URL(url);
    fingerprintUrl.pathname = "/certificate.sha256";
    fingerprintUrl.search = "";
    console.debug(fingerprintUrl.toString(), "performing an insecure fingerprint fetch; use https:// in production");
    const fingerprint = await Promise.race([fetch(fingerprintUrl), cancel]);
    if (!fingerprint)
      return;
    const fingerprintText = await Promise.race([fingerprint.text(), cancel]);
    if (fingerprintText === undefined)
      return;
    hashes.push({ algorithm: "sha-256", value: toBytes(fingerprintText) });
    finalUrl = new URL(url);
    finalUrl.protocol = "https:";
  }
  if (hashes.length > 0) {
    finalOptions.serverCertificateHashes = hashes;
  }
  const quic = new WebTransport(finalUrl, finalOptions);
  quic.closed.catch(() => {});
  const loaded = await Promise.race([quic.ready.then(() => true), cancel]);
  if (!loaded) {
    quic.close();
    return;
  }
  return quic;
}
async function connectWebSocket(url, delay, cancel) {
  const timer = new Promise((resolve) => setTimeout(resolve, delay));
  const active = await Promise.race([cancel, timer.then(() => true)]);
  if (!active)
    return;
  const quic = new qmux_default(url);
  const loaded = await Promise.race([quic.ready.then(() => true), cancel]);
  if (!loaded) {
    quic.close();
    return;
  }
  return quic;
}
// node_modules/@moq/net/connection/reload.js
class Reload {
  url;
  enabled;
  status = new Signal("disconnected");
  established = new Signal(undefined);
  #announced = new Signal(new Set);
  announced = this.#announced;
  webtransport;
  websocket;
  delay;
  signals = new Effect;
  closed;
  #closedResolve;
  #closedReject;
  #delay;
  #retryStart;
  #tick = new Signal(0);
  constructor(props) {
    this.url = Signal.from(props?.url);
    this.enabled = Signal.from(props?.enabled ?? false);
    this.delay = props?.delay ?? { initial: 1000, multiplier: 2, max: 30000 };
    this.webtransport = props?.webtransport;
    this.websocket = props?.websocket;
    this.#delay = this.delay.initial;
    this.closed = new Promise((resolve, reject) => {
      this.#closedResolve = resolve;
      this.#closedReject = reject;
    });
    this.signals.run(this.#connect.bind(this));
    this.signals.run(this.#runAnnounced.bind(this));
  }
  #connect(effect) {
    effect.get(this.#tick);
    const enabled = effect.get(this.enabled);
    if (!enabled)
      return;
    const url = effect.get(this.url);
    if (!url)
      return;
    effect.set(this.status, "connecting", "disconnected");
    effect.spawn(async () => {
      try {
        const pending = connect(url, { websocket: this.websocket, webtransport: this.webtransport });
        const connection = await Promise.race([effect.cancel, pending]);
        if (!connection) {
          pending.then((conn) => conn.close()).catch(() => {});
          return;
        }
        effect.set(this.established, connection);
        effect.cleanup(() => connection.close());
        effect.set(this.status, "connected", "disconnected");
        this.#delay = this.delay.initial;
        this.#retryStart = undefined;
        await Promise.race([effect.cancel, connection.closed]);
      } catch (err) {
        console.warn("connection error:", err);
        this.#retryStart ??= performance.now();
        const timeout = this.delay.timeout ?? 300000;
        if (timeout > 0) {
          const elapsed = performance.now() - this.#retryStart;
          if (elapsed >= timeout) {
            console.warn("reconnect timed out");
            this.#closedReject(err instanceof Error ? err : new Error(String(err)));
            return;
          }
        }
        const tick = this.#tick.peek() + 1;
        effect.timer(() => this.#tick.update((prev) => Math.max(prev, tick)), this.#delay);
        this.#delay = Math.min(this.#delay * this.delay.multiplier, this.delay.max);
      }
    });
  }
  #runAnnounced(effect) {
    this.#announced.set(new Set);
    const conn = effect.get(this.established);
    if (!conn)
      return;
    effect.cleanup(() => this.#announced.set(new Set));
    if (conn.url.hostname.endsWith("mediaoverquic.com")) {
      return;
    }
    const announced = conn.announced(empty());
    effect.cleanup(() => announced.close());
    effect.spawn(async () => {
      try {
        for (;; ) {
          const entry = await Promise.race([effect.cancel, announced.next()]);
          if (!entry)
            break;
          this.#announced.mutate((active) => {
            if (entry.active) {
              active.add(entry.path);
            } else {
              active.delete(entry.path);
            }
          });
        }
      } catch (err) {
        this.#announced.set(new Set);
        throw err;
      }
    });
  }
  close() {
    this.signals.close();
    this.#closedResolve();
  }
}
// node_modules/@moq/net/time.js
var exports_time = {};
__export(exports_time, {
  Second: () => Second,
  Nano: () => Nano,
  Milli: () => Milli,
  Micro: () => Micro
});
var Nano = {
  zero: 0,
  fromMicro: (us) => us * 1000,
  fromMilli: (ms) => ms * 1e6,
  fromSecond: (s) => s * 1e9,
  toMicro: (ns) => ns / 1000,
  toMilli: (ns) => ns / 1e6,
  toSecond: (ns) => ns / 1e9,
  now: () => performance.now() * 1e6,
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  mul: (a, b) => a * b,
  div: (a, b) => a / b,
  max: (a, b) => Math.max(a, b),
  min: (a, b) => Math.min(a, b)
};
var Micro = {
  zero: 0,
  fromNano: (ns) => ns / 1000,
  fromMilli: (ms) => ms * 1000,
  fromSecond: (s) => s * 1e6,
  toNano: (us) => us * 1000,
  toMilli: (us) => us / 1000,
  toSecond: (us) => us / 1e6,
  now: () => performance.now() * 1000,
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  mul: (a, b) => a * b,
  div: (a, b) => a / b,
  max: (a, b) => Math.max(a, b),
  min: (a, b) => Math.min(a, b)
};
var Milli = {
  zero: 0,
  fromNano: (ns) => ns / 1e6,
  fromMicro: (us) => us / 1000,
  fromSecond: (s) => s * 1000,
  toNano: (ms) => ms * 1e6,
  toMicro: (ms) => ms * 1000,
  toSecond: (ms) => ms / 1000,
  now: () => performance.now(),
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  mul: (a, b) => a * b,
  div: (a, b) => a / b,
  max: (a, b) => Math.max(a, b),
  min: (a, b) => Math.min(a, b)
};
var Second = {
  zero: 0,
  fromNano: (ns) => ns / 1e9,
  fromMicro: (us) => us / 1e6,
  fromMilli: (ms) => ms / 1000,
  toNano: (s) => s * 1e9,
  toMicro: (s) => s * 1e6,
  toMilli: (s) => s * 1000,
  now: () => performance.now() / 1000,
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  mul: (a, b) => a * b,
  div: (a, b) => a / b,
  max: (a, b) => Math.max(a, b),
  min: (a, b) => Math.min(a, b)
};

// node_modules/@moq/net/index.js
init_varint();

// node_modules/@moq/hang/catalog/integers.js
var u8Schema = number2().check(int(), _nonnegative(), _lte(255)).brand("u8");
var u53Schema = number2().check(int(), _nonnegative(), _lte(Number.MAX_SAFE_INTEGER)).brand("u53");
function u53(value) {
  return u53Schema.parse(value);
}

// node_modules/@moq/hang/catalog/container.js
var ContainerSchema = _default(discriminatedUnion("kind", [
  object({ kind: literal("legacy") }),
  object({
    kind: literal("cmaf"),
    init: base642(),
    timescale: optional(u53Schema),
    trackId: optional(u53Schema)
  }),
  object({ kind: literal("loc") })
]), { kind: "legacy" });

// node_modules/@moq/hang/catalog/audio.js
var TrackSchema = object({
  name: string2()
});
var AudioConfigSchema = object({
  codec: string2(),
  container: ContainerSchema,
  description: optional(string2()),
  sampleRate: u53Schema,
  numberOfChannels: u53Schema,
  bitrate: optional(u53Schema),
  jitter: optional(u53Schema)
});
var AudioSchema = union([
  object({
    renditions: record(string2(), AudioConfigSchema)
  }),
  pipe(object({
    track: TrackSchema,
    config: AudioConfigSchema
  }), transform((old) => ({
    renditions: { [old.track.name]: old.config }
  })))
]);

// node_modules/pako/dist/pako.esm.mjs
/*! pako 2.2.0 https://github.com/nodeca/pako @license (MIT AND Zlib) */
var Z_FIXED$1 = 4;
var Z_BINARY = 0;
var Z_TEXT = 1;
var Z_UNKNOWN$1 = 2;
function zero$1(buf) {
  let len = buf.length;
  while (--len >= 0) {
    buf[len] = 0;
  }
}
var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES = 2;
var MIN_MATCH$1 = 3;
var MAX_MATCH$1 = 258;
var LENGTH_CODES$1 = 29;
var LITERALS$1 = 256;
var L_CODES$1 = LITERALS$1 + 1 + LENGTH_CODES$1;
var D_CODES$1 = 30;
var BL_CODES$1 = 19;
var HEAP_SIZE$1 = 2 * L_CODES$1 + 1;
var MAX_BITS$1 = 15;
var Buf_size = 16;
var MAX_BL_BITS = 7;
var END_BLOCK = 256;
var REP_3_6 = 16;
var REPZ_3_10 = 17;
var REPZ_11_138 = 18;
var extra_lbits = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]);
var extra_dbits = new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]);
var extra_blbits = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]);
var bl_order = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var DIST_CODE_LEN = 512;
var static_ltree = new Array((L_CODES$1 + 2) * 2);
zero$1(static_ltree);
var static_dtree = new Array(D_CODES$1 * 2);
zero$1(static_dtree);
var _dist_code = new Array(DIST_CODE_LEN);
zero$1(_dist_code);
var _length_code = new Array(MAX_MATCH$1 - MIN_MATCH$1 + 1);
zero$1(_length_code);
var base_length = new Array(LENGTH_CODES$1);
zero$1(base_length);
var base_dist = new Array(D_CODES$1);
zero$1(base_dist);
function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
  this.static_tree = static_tree;
  this.extra_bits = extra_bits;
  this.extra_base = extra_base;
  this.elems = elems;
  this.max_length = max_length;
  this.has_stree = static_tree && static_tree.length;
}
var static_l_desc;
var static_d_desc;
var static_bl_desc;
function TreeDesc(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;
  this.max_code = 0;
  this.stat_desc = stat_desc;
}
var d_code = (dist) => {
  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
};
var put_short = (s, w) => {
  s.pending_buf[s.pending++] = w & 255;
  s.pending_buf[s.pending++] = w >>> 8 & 255;
};
var send_bits = (s, value, length) => {
  if (s.bi_valid > Buf_size - length) {
    s.bi_buf |= value << s.bi_valid & 65535;
    put_short(s, s.bi_buf);
    s.bi_buf = value >> Buf_size - s.bi_valid;
    s.bi_valid += length - Buf_size;
  } else {
    s.bi_buf |= value << s.bi_valid & 65535;
    s.bi_valid += length;
  }
};
var send_code = (s, c, tree) => {
  send_bits(s, tree[c * 2], tree[c * 2 + 1]);
};
var bi_reverse = (code, len) => {
  let res = 0;
  do {
    res |= code & 1;
    code >>>= 1;
    res <<= 1;
  } while (--len > 0);
  return res >>> 1;
};
var bi_flush = (s) => {
  if (s.bi_valid === 16) {
    put_short(s, s.bi_buf);
    s.bi_buf = 0;
    s.bi_valid = 0;
  } else if (s.bi_valid >= 8) {
    s.pending_buf[s.pending++] = s.bi_buf & 255;
    s.bi_buf >>= 8;
    s.bi_valid -= 8;
  }
};
var gen_bitlen = (s, desc) => {
  const tree = desc.dyn_tree;
  const max_code = desc.max_code;
  const stree = desc.stat_desc.static_tree;
  const has_stree = desc.stat_desc.has_stree;
  const extra = desc.stat_desc.extra_bits;
  const base = desc.stat_desc.extra_base;
  const max_length = desc.stat_desc.max_length;
  let h;
  let n, m;
  let bits;
  let xbits;
  let f;
  let overflow = 0;
  for (bits = 0;bits <= MAX_BITS$1; bits++) {
    s.bl_count[bits] = 0;
  }
  tree[s.heap[s.heap_max] * 2 + 1] = 0;
  for (h = s.heap_max + 1;h < HEAP_SIZE$1; h++) {
    n = s.heap[h];
    bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }
    tree[n * 2 + 1] = bits;
    if (n > max_code) {
      continue;
    }
    s.bl_count[bits]++;
    xbits = 0;
    if (n >= base) {
      xbits = extra[n - base];
    }
    f = tree[n * 2];
    s.opt_len += f * (bits + xbits);
    if (has_stree) {
      s.static_len += f * (stree[n * 2 + 1] + xbits);
    }
  }
  if (overflow === 0) {
    return;
  }
  do {
    bits = max_length - 1;
    while (s.bl_count[bits] === 0) {
      bits--;
    }
    s.bl_count[bits]--;
    s.bl_count[bits + 1] += 2;
    s.bl_count[max_length]--;
    overflow -= 2;
  } while (overflow > 0);
  for (bits = max_length;bits !== 0; bits--) {
    n = s.bl_count[bits];
    while (n !== 0) {
      m = s.heap[--h];
      if (m > max_code) {
        continue;
      }
      if (tree[m * 2 + 1] !== bits) {
        s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
        tree[m * 2 + 1] = bits;
      }
      n--;
    }
  }
};
var gen_codes = (tree, max_code, bl_count) => {
  const next_code = new Array(MAX_BITS$1 + 1);
  let code = 0;
  let bits;
  let n;
  for (bits = 1;bits <= MAX_BITS$1; bits++) {
    code = code + bl_count[bits - 1] << 1;
    next_code[bits] = code;
  }
  for (n = 0;n <= max_code; n++) {
    let len = tree[n * 2 + 1];
    if (len === 0) {
      continue;
    }
    tree[n * 2] = bi_reverse(next_code[len]++, len);
  }
};
var tr_static_init = () => {
  let n;
  let bits;
  let length;
  let code;
  let dist;
  const bl_count = new Array(MAX_BITS$1 + 1);
  length = 0;
  for (code = 0;code < LENGTH_CODES$1 - 1; code++) {
    base_length[code] = length;
    for (n = 0;n < 1 << extra_lbits[code]; n++) {
      _length_code[length++] = code;
    }
  }
  _length_code[length - 1] = code;
  dist = 0;
  for (code = 0;code < 16; code++) {
    base_dist[code] = dist;
    for (n = 0;n < 1 << extra_dbits[code]; n++) {
      _dist_code[dist++] = code;
    }
  }
  dist >>= 7;
  for (;code < D_CODES$1; code++) {
    base_dist[code] = dist << 7;
    for (n = 0;n < 1 << extra_dbits[code] - 7; n++) {
      _dist_code[256 + dist++] = code;
    }
  }
  for (bits = 0;bits <= MAX_BITS$1; bits++) {
    bl_count[bits] = 0;
  }
  n = 0;
  while (n <= 143) {
    static_ltree[n * 2 + 1] = 8;
    n++;
    bl_count[8]++;
  }
  while (n <= 255) {
    static_ltree[n * 2 + 1] = 9;
    n++;
    bl_count[9]++;
  }
  while (n <= 279) {
    static_ltree[n * 2 + 1] = 7;
    n++;
    bl_count[7]++;
  }
  while (n <= 287) {
    static_ltree[n * 2 + 1] = 8;
    n++;
    bl_count[8]++;
  }
  gen_codes(static_ltree, L_CODES$1 + 1, bl_count);
  for (n = 0;n < D_CODES$1; n++) {
    static_dtree[n * 2 + 1] = 5;
    static_dtree[n * 2] = bi_reverse(n, 5);
  }
  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS$1 + 1, L_CODES$1, MAX_BITS$1);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES$1, MAX_BITS$1);
  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES$1, MAX_BL_BITS);
};
var init_block = (s) => {
  let n;
  for (n = 0;n < L_CODES$1; n++) {
    s.dyn_ltree[n * 2] = 0;
  }
  for (n = 0;n < D_CODES$1; n++) {
    s.dyn_dtree[n * 2] = 0;
  }
  for (n = 0;n < BL_CODES$1; n++) {
    s.bl_tree[n * 2] = 0;
  }
  s.dyn_ltree[END_BLOCK * 2] = 1;
  s.opt_len = s.static_len = 0;
  s.sym_next = s.matches = 0;
};
var bi_windup = (s) => {
  if (s.bi_valid > 8) {
    put_short(s, s.bi_buf);
  } else if (s.bi_valid > 0) {
    s.pending_buf[s.pending++] = s.bi_buf;
  }
  s.bi_buf = 0;
  s.bi_valid = 0;
};
var smaller = (tree, n, m, depth) => {
  const _n2 = n * 2;
  const _m2 = m * 2;
  return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n] <= depth[m];
};
var pqdownheap = (s, tree, k) => {
  const v = s.heap[k];
  let j = k << 1;
  while (j <= s.heap_len) {
    if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
      j++;
    }
    if (smaller(tree, v, s.heap[j], s.depth)) {
      break;
    }
    s.heap[k] = s.heap[j];
    k = j;
    j <<= 1;
  }
  s.heap[k] = v;
};
var compress_block = (s, ltree, dtree) => {
  let dist;
  let lc;
  let sx = 0;
  let code;
  let extra;
  if (s.sym_next !== 0) {
    do {
      dist = s.pending_buf[s.sym_buf + sx++] & 255;
      dist += (s.pending_buf[s.sym_buf + sx++] & 255) << 8;
      lc = s.pending_buf[s.sym_buf + sx++];
      if (dist === 0) {
        send_code(s, lc, ltree);
      } else {
        code = _length_code[lc];
        send_code(s, code + LITERALS$1 + 1, ltree);
        extra = extra_lbits[code];
        if (extra !== 0) {
          lc -= base_length[code];
          send_bits(s, lc, extra);
        }
        dist--;
        code = d_code(dist);
        send_code(s, code, dtree);
        extra = extra_dbits[code];
        if (extra !== 0) {
          dist -= base_dist[code];
          send_bits(s, dist, extra);
        }
      }
    } while (sx < s.sym_next);
  }
  send_code(s, END_BLOCK, ltree);
};
var build_tree = (s, desc) => {
  const tree = desc.dyn_tree;
  const stree = desc.stat_desc.static_tree;
  const has_stree = desc.stat_desc.has_stree;
  const elems = desc.stat_desc.elems;
  let n, m;
  let max_code = -1;
  let node;
  s.heap_len = 0;
  s.heap_max = HEAP_SIZE$1;
  for (n = 0;n < elems; n++) {
    if (tree[n * 2] !== 0) {
      s.heap[++s.heap_len] = max_code = n;
      s.depth[n] = 0;
    } else {
      tree[n * 2 + 1] = 0;
    }
  }
  while (s.heap_len < 2) {
    node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
    tree[node * 2] = 1;
    s.depth[node] = 0;
    s.opt_len--;
    if (has_stree) {
      s.static_len -= stree[node * 2 + 1];
    }
  }
  desc.max_code = max_code;
  for (n = s.heap_len >> 1;n >= 1; n--) {
    pqdownheap(s, tree, n);
  }
  node = elems;
  do {
    n = s.heap[1];
    s.heap[1] = s.heap[s.heap_len--];
    pqdownheap(s, tree, 1);
    m = s.heap[1];
    s.heap[--s.heap_max] = n;
    s.heap[--s.heap_max] = m;
    tree[node * 2] = tree[n * 2] + tree[m * 2];
    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
    tree[n * 2 + 1] = tree[m * 2 + 1] = node;
    s.heap[1] = node++;
    pqdownheap(s, tree, 1);
  } while (s.heap_len >= 2);
  s.heap[--s.heap_max] = s.heap[1];
  gen_bitlen(s, desc);
  gen_codes(tree, max_code, s.bl_count);
};
var scan_tree = (s, tree, max_code) => {
  let n;
  let prevlen = -1;
  let curlen;
  let nextlen = tree[0 * 2 + 1];
  let count = 0;
  let max_count = 7;
  let min_count = 4;
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  tree[(max_code + 1) * 2 + 1] = 65535;
  for (n = 0;n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1];
    if (++count < max_count && curlen === nextlen) {
      continue;
    } else if (count < min_count) {
      s.bl_tree[curlen * 2] += count;
    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        s.bl_tree[curlen * 2]++;
      }
      s.bl_tree[REP_3_6 * 2]++;
    } else if (count <= 10) {
      s.bl_tree[REPZ_3_10 * 2]++;
    } else {
      s.bl_tree[REPZ_11_138 * 2]++;
    }
    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;
    } else {
      max_count = 7;
      min_count = 4;
    }
  }
};
var send_tree = (s, tree, max_code) => {
  let n;
  let prevlen = -1;
  let curlen;
  let nextlen = tree[0 * 2 + 1];
  let count = 0;
  let max_count = 7;
  let min_count = 4;
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  for (n = 0;n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1];
    if (++count < max_count && curlen === nextlen) {
      continue;
    } else if (count < min_count) {
      do {
        send_code(s, curlen, s.bl_tree);
      } while (--count !== 0);
    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s, curlen, s.bl_tree);
        count--;
      }
      send_code(s, REP_3_6, s.bl_tree);
      send_bits(s, count - 3, 2);
    } else if (count <= 10) {
      send_code(s, REPZ_3_10, s.bl_tree);
      send_bits(s, count - 3, 3);
    } else {
      send_code(s, REPZ_11_138, s.bl_tree);
      send_bits(s, count - 11, 7);
    }
    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;
    } else {
      max_count = 7;
      min_count = 4;
    }
  }
};
var build_bl_tree = (s) => {
  let max_blindex;
  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
  build_tree(s, s.bl_desc);
  for (max_blindex = BL_CODES$1 - 1;max_blindex >= 3; max_blindex--) {
    if (s.bl_tree[bl_order[max_blindex] * 2 + 1] !== 0) {
      break;
    }
  }
  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
  return max_blindex;
};
var send_all_trees = (s, lcodes, dcodes, blcodes) => {
  let rank;
  send_bits(s, lcodes - 257, 5);
  send_bits(s, dcodes - 1, 5);
  send_bits(s, blcodes - 4, 4);
  for (rank = 0;rank < blcodes; rank++) {
    send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1], 3);
  }
  send_tree(s, s.dyn_ltree, lcodes - 1);
  send_tree(s, s.dyn_dtree, dcodes - 1);
};
var detect_data_type = (s) => {
  let block_mask = 4093624447;
  let n;
  for (n = 0;n <= 31; n++, block_mask >>>= 1) {
    if (block_mask & 1 && s.dyn_ltree[n * 2] !== 0) {
      return Z_BINARY;
    }
  }
  if (s.dyn_ltree[9 * 2] !== 0 || s.dyn_ltree[10 * 2] !== 0 || s.dyn_ltree[13 * 2] !== 0) {
    return Z_TEXT;
  }
  for (n = 32;n < LITERALS$1; n++) {
    if (s.dyn_ltree[n * 2] !== 0) {
      return Z_TEXT;
    }
  }
  return Z_BINARY;
};
var static_init_done = false;
var _tr_init$1 = (s) => {
  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }
  s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
  s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
  s.bi_buf = 0;
  s.bi_valid = 0;
  init_block(s);
};
var _tr_stored_block$1 = (s, buf, stored_len, last) => {
  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
  bi_windup(s);
  put_short(s, stored_len);
  put_short(s, ~stored_len);
  if (stored_len) {
    s.pending_buf.set(s.window.subarray(buf, buf + stored_len), s.pending);
  }
  s.pending += stored_len;
};
var _tr_align$1 = (s) => {
  send_bits(s, STATIC_TREES << 1, 3);
  send_code(s, END_BLOCK, static_ltree);
  bi_flush(s);
};
var _tr_flush_block$1 = (s, buf, stored_len, last) => {
  let opt_lenb, static_lenb;
  let max_blindex = 0;
  if (s.level > 0) {
    if (s.strm.data_type === Z_UNKNOWN$1) {
      s.strm.data_type = detect_data_type(s);
    }
    build_tree(s, s.l_desc);
    build_tree(s, s.d_desc);
    max_blindex = build_bl_tree(s);
    opt_lenb = s.opt_len + 3 + 7 >>> 3;
    static_lenb = s.static_len + 3 + 7 >>> 3;
    if (static_lenb <= opt_lenb) {
      opt_lenb = static_lenb;
    }
  } else {
    opt_lenb = static_lenb = stored_len + 5;
  }
  if (stored_len + 4 <= opt_lenb && buf !== -1) {
    _tr_stored_block$1(s, buf, stored_len, last);
  } else if (s.strategy === Z_FIXED$1 || static_lenb === opt_lenb) {
    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
    compress_block(s, static_ltree, static_dtree);
  } else {
    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
    compress_block(s, s.dyn_ltree, s.dyn_dtree);
  }
  init_block(s);
  if (last) {
    bi_windup(s);
  }
};
var _tr_tally$1 = (s, dist, lc) => {
  s.pending_buf[s.sym_buf + s.sym_next++] = dist;
  s.pending_buf[s.sym_buf + s.sym_next++] = dist >> 8;
  s.pending_buf[s.sym_buf + s.sym_next++] = lc;
  if (dist === 0) {
    s.dyn_ltree[lc * 2]++;
  } else {
    s.matches++;
    dist--;
    s.dyn_ltree[(_length_code[lc] + LITERALS$1 + 1) * 2]++;
    s.dyn_dtree[d_code(dist) * 2]++;
  }
  return s.sym_next === s.sym_end;
};
var _tr_init_1 = _tr_init$1;
var _tr_stored_block_1 = _tr_stored_block$1;
var _tr_flush_block_1 = _tr_flush_block$1;
var _tr_tally_1 = _tr_tally$1;
var _tr_align_1 = _tr_align$1;
var trees = {
  _tr_init: _tr_init_1,
  _tr_stored_block: _tr_stored_block_1,
  _tr_flush_block: _tr_flush_block_1,
  _tr_tally: _tr_tally_1,
  _tr_align: _tr_align_1
};
var adler32 = (adler, buf, len, pos) => {
  let s1 = adler & 65535 | 0, s2 = adler >>> 16 & 65535 | 0, n = 0;
  while (len !== 0) {
    n = len > 2000 ? 2000 : len;
    len -= n;
    do {
      s1 = s1 + buf[pos++] | 0;
      s2 = s2 + s1 | 0;
    } while (--n);
    s1 %= 65521;
    s2 %= 65521;
  }
  return s1 | s2 << 16 | 0;
};
var adler32_1 = adler32;
var makeTable = () => {
  let c, table = [];
  for (var n = 0;n < 256; n++) {
    c = n;
    for (var k = 0;k < 8; k++) {
      c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
    }
    table[n] = c;
  }
  return table;
};
var crcTable = new Uint32Array(makeTable());
var crc32 = (crc, buf, len, pos) => {
  const t = crcTable;
  const end = pos + len;
  crc ^= -1;
  for (let i = pos;i < end; i++) {
    crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
  }
  return crc ^ -1;
};
var crc32_1 = crc32;
var messages = {
  2: "need dictionary",
  1: "stream end",
  0: "",
  "-1": "file error",
  "-2": "stream error",
  "-3": "data error",
  "-4": "insufficient memory",
  "-5": "buffer error",
  "-6": "incompatible version"
};
var constants$2 = {
  Z_NO_FLUSH: 0,
  Z_PARTIAL_FLUSH: 1,
  Z_SYNC_FLUSH: 2,
  Z_FULL_FLUSH: 3,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_TREES: 6,
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_ERRNO: -1,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  Z_MEM_ERROR: -4,
  Z_BUF_ERROR: -5,
  Z_NO_COMPRESSION: 0,
  Z_BEST_SPEED: 1,
  Z_BEST_COMPRESSION: 9,
  Z_DEFAULT_COMPRESSION: -1,
  Z_FILTERED: 1,
  Z_HUFFMAN_ONLY: 2,
  Z_RLE: 3,
  Z_FIXED: 4,
  Z_DEFAULT_STRATEGY: 0,
  Z_BINARY: 0,
  Z_TEXT: 1,
  Z_UNKNOWN: 2,
  Z_DEFLATED: 8
};
var { _tr_init, _tr_stored_block, _tr_flush_block, _tr_tally, _tr_align } = trees;
var {
  Z_NO_FLUSH: Z_NO_FLUSH$2,
  Z_PARTIAL_FLUSH,
  Z_FULL_FLUSH: Z_FULL_FLUSH$1,
  Z_FINISH: Z_FINISH$3,
  Z_BLOCK: Z_BLOCK$1,
  Z_OK: Z_OK$3,
  Z_STREAM_END: Z_STREAM_END$3,
  Z_STREAM_ERROR: Z_STREAM_ERROR$2,
  Z_DATA_ERROR: Z_DATA_ERROR$2,
  Z_BUF_ERROR: Z_BUF_ERROR$2,
  Z_DEFAULT_COMPRESSION: Z_DEFAULT_COMPRESSION$1,
  Z_FILTERED,
  Z_HUFFMAN_ONLY,
  Z_RLE,
  Z_FIXED,
  Z_DEFAULT_STRATEGY: Z_DEFAULT_STRATEGY$1,
  Z_UNKNOWN,
  Z_DEFLATED: Z_DEFLATED$2
} = constants$2;
var MAX_MEM_LEVEL = 9;
var MAX_WBITS$1 = 15;
var DEF_MEM_LEVEL = 8;
var LENGTH_CODES = 29;
var LITERALS = 256;
var L_CODES = LITERALS + 1 + LENGTH_CODES;
var D_CODES = 30;
var BL_CODES = 19;
var HEAP_SIZE = 2 * L_CODES + 1;
var MAX_BITS = 15;
var MIN_MATCH = 3;
var MAX_MATCH = 258;
var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;
var PRESET_DICT = 32;
var INIT_STATE = 42;
var GZIP_STATE = 57;
var EXTRA_STATE = 69;
var NAME_STATE = 73;
var COMMENT_STATE = 91;
var HCRC_STATE = 103;
var BUSY_STATE = 113;
var FINISH_STATE = 666;
var BS_NEED_MORE = 1;
var BS_BLOCK_DONE = 2;
var BS_FINISH_STARTED = 3;
var BS_FINISH_DONE = 4;
var OS_CODE = 3;
var err = (strm, errorCode) => {
  strm.msg = messages[errorCode];
  return errorCode;
};
var rank = (f) => {
  return f * 2 - (f > 4 ? 9 : 0);
};
var zero = (buf) => {
  let len = buf.length;
  while (--len >= 0) {
    buf[len] = 0;
  }
};
var slide_hash = (s) => {
  let n, m;
  let p;
  let wsize = s.w_size;
  n = s.hash_size;
  p = n;
  do {
    m = s.head[--p];
    s.head[p] = m >= wsize ? m - wsize : 0;
  } while (--n);
  n = wsize;
  p = n;
  do {
    m = s.prev[--p];
    s.prev[p] = m >= wsize ? m - wsize : 0;
  } while (--n);
};
var HASH = (s, prev, data) => (prev << s.hash_shift ^ data) & s.hash_mask;
var INSERT_STRING = (s, str) => {
  let h;
  if (s.legacy_hash) {
    h = s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH - 1]);
  } else {
    const w = s.window;
    const value = w[str] | w[str + 1] << 8 | w[str + 2] << 16 | w[str + 3] << 24;
    h = s.ins_h = Math.imul(value, 66521) + 66521 >>> 16 & s.hash_mask;
  }
  const hash_head = s.prev[str & s.w_mask] = s.head[h];
  s.head[h] = str;
  return hash_head;
};
var flush_pending = (strm) => {
  const s = strm.state;
  let len = s.pending;
  if (len > strm.avail_out) {
    len = strm.avail_out;
  }
  if (len === 0) {
    return;
  }
  strm.output.set(s.pending_buf.subarray(s.pending_out, s.pending_out + len), strm.next_out);
  strm.next_out += len;
  s.pending_out += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s.pending -= len;
  if (s.pending === 0) {
    s.pending_out = 0;
  }
};
var flush_block_only = (s, last) => {
  _tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);
  s.block_start = s.strstart;
  flush_pending(s.strm);
};
var put_byte = (s, b) => {
  s.pending_buf[s.pending++] = b;
};
var putShortMSB = (s, b) => {
  s.pending_buf[s.pending++] = b >>> 8 & 255;
  s.pending_buf[s.pending++] = b & 255;
};
var read_buf = (strm, buf, start, size2) => {
  let len = strm.avail_in;
  if (len > size2) {
    len = size2;
  }
  if (len === 0) {
    return 0;
  }
  strm.avail_in -= len;
  buf.set(strm.input.subarray(strm.next_in, strm.next_in + len), start);
  if (strm.state.wrap === 1) {
    strm.adler = adler32_1(strm.adler, buf, len, start);
  } else if (strm.state.wrap === 2) {
    strm.adler = crc32_1(strm.adler, buf, len, start);
  }
  strm.next_in += len;
  strm.total_in += len;
  return len;
};
var longest_match = (s, cur_match) => {
  let chain_length = s.max_chain_length;
  let scan = s.strstart;
  let match;
  let len;
  let best_len = s.prev_length;
  let nice_match = s.nice_match;
  const limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0;
  const _win = s.window;
  const wmask = s.w_mask;
  const prev = s.prev;
  const strend = s.strstart + MAX_MATCH;
  let scan_end1 = _win[scan + best_len - 1];
  let scan_end = _win[scan + best_len];
  if (s.prev_length >= s.good_match) {
    chain_length >>= 2;
  }
  if (nice_match > s.lookahead) {
    nice_match = s.lookahead;
  }
  do {
    match = cur_match;
    if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
      continue;
    }
    scan += 2;
    match++;
    do {} while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
    len = MAX_MATCH - (strend - scan);
    scan = strend - MAX_MATCH;
    if (len > best_len) {
      s.match_start = cur_match;
      best_len = len;
      if (len >= nice_match) {
        break;
      }
      scan_end1 = _win[scan + best_len - 1];
      scan_end = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
  if (best_len <= s.lookahead) {
    return best_len;
  }
  return s.lookahead;
};
var fill_window = (s) => {
  const _w_size = s.w_size;
  let n, more, str;
  do {
    more = s.window_size - s.lookahead - s.strstart;
    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
      s.window.set(s.window.subarray(_w_size, _w_size + _w_size - more), 0);
      s.match_start -= _w_size;
      s.strstart -= _w_size;
      s.block_start -= _w_size;
      if (s.insert > s.strstart) {
        s.insert = s.strstart;
      }
      slide_hash(s);
      more += _w_size;
    }
    if (s.strm.avail_in === 0) {
      break;
    }
    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
    s.lookahead += n;
    if (!s.legacy_hash) {
      if (s.lookahead + s.insert > MIN_MATCH) {
        str = s.strstart - s.insert;
        while (s.insert) {
          INSERT_STRING(s, str);
          str++;
          s.insert--;
          if (s.lookahead + s.insert <= MIN_MATCH) {
            break;
          }
        }
      }
    } else if (s.lookahead + s.insert >= MIN_MATCH) {
      str = s.strstart - s.insert;
      s.ins_h = s.window[str];
      s.ins_h = HASH(s, s.ins_h, s.window[str + 1]);
      while (s.insert) {
        INSERT_STRING(s, str);
        str++;
        s.insert--;
        if (s.lookahead + s.insert < MIN_MATCH) {
          break;
        }
      }
    }
  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
};
var deflate_stored = (s, flush) => {
  let min_block = s.pending_buf_size - 5 > s.w_size ? s.w_size : s.pending_buf_size - 5;
  let len, left, have, last = 0;
  let used = s.strm.avail_in;
  do {
    len = 65535;
    have = s.bi_valid + 42 >> 3;
    if (s.strm.avail_out < have) {
      break;
    }
    have = s.strm.avail_out - have;
    left = s.strstart - s.block_start;
    if (len > left + s.strm.avail_in) {
      len = left + s.strm.avail_in;
    }
    if (len > have) {
      len = have;
    }
    if (len < min_block && (len === 0 && flush !== Z_FINISH$3 || flush === Z_NO_FLUSH$2 || len !== left + s.strm.avail_in)) {
      break;
    }
    last = flush === Z_FINISH$3 && len === left + s.strm.avail_in ? 1 : 0;
    _tr_stored_block(s, 0, 0, last);
    s.pending_buf[s.pending - 4] = len;
    s.pending_buf[s.pending - 3] = len >> 8;
    s.pending_buf[s.pending - 2] = ~len;
    s.pending_buf[s.pending - 1] = ~len >> 8;
    flush_pending(s.strm);
    if (left) {
      if (left > len) {
        left = len;
      }
      s.strm.output.set(s.window.subarray(s.block_start, s.block_start + left), s.strm.next_out);
      s.strm.next_out += left;
      s.strm.avail_out -= left;
      s.strm.total_out += left;
      s.block_start += left;
      len -= left;
    }
    if (len) {
      read_buf(s.strm, s.strm.output, s.strm.next_out, len);
      s.strm.next_out += len;
      s.strm.avail_out -= len;
      s.strm.total_out += len;
    }
  } while (last === 0);
  used -= s.strm.avail_in;
  if (used) {
    if (used >= s.w_size) {
      s.matches = 2;
      s.window.set(s.strm.input.subarray(s.strm.next_in - s.w_size, s.strm.next_in), 0);
      s.strstart = s.w_size;
      s.insert = s.strstart;
    } else {
      if (s.window_size - s.strstart <= used) {
        s.strstart -= s.w_size;
        s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
        if (s.matches < 2) {
          s.matches++;
        }
        if (s.insert > s.strstart) {
          s.insert = s.strstart;
        }
      }
      s.window.set(s.strm.input.subarray(s.strm.next_in - used, s.strm.next_in), s.strstart);
      s.strstart += used;
      s.insert += used > s.w_size - s.insert ? s.w_size - s.insert : used;
    }
    s.block_start = s.strstart;
  }
  if (s.high_water < s.strstart) {
    s.high_water = s.strstart;
  }
  if (last) {
    return BS_FINISH_DONE;
  }
  if (flush !== Z_NO_FLUSH$2 && flush !== Z_FINISH$3 && s.strm.avail_in === 0 && s.strstart === s.block_start) {
    return BS_BLOCK_DONE;
  }
  have = s.window_size - s.strstart;
  if (s.strm.avail_in > have && s.block_start >= s.w_size) {
    s.block_start -= s.w_size;
    s.strstart -= s.w_size;
    s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
    if (s.matches < 2) {
      s.matches++;
    }
    have += s.w_size;
    if (s.insert > s.strstart) {
      s.insert = s.strstart;
    }
  }
  if (have > s.strm.avail_in) {
    have = s.strm.avail_in;
  }
  if (have) {
    read_buf(s.strm, s.window, s.strstart, have);
    s.strstart += have;
    s.insert += have > s.w_size - s.insert ? s.w_size - s.insert : have;
  }
  if (s.high_water < s.strstart) {
    s.high_water = s.strstart;
  }
  have = s.bi_valid + 42 >> 3;
  have = s.pending_buf_size - have > 65535 ? 65535 : s.pending_buf_size - have;
  min_block = have > s.w_size ? s.w_size : have;
  left = s.strstart - s.block_start;
  if (left >= min_block || (left || flush === Z_FINISH$3) && flush !== Z_NO_FLUSH$2 && s.strm.avail_in === 0 && left <= have) {
    len = left > have ? have : left;
    last = flush === Z_FINISH$3 && s.strm.avail_in === 0 && len === left ? 1 : 0;
    _tr_stored_block(s, s.block_start, len, last);
    s.block_start += len;
    flush_pending(s.strm);
  }
  return last ? BS_FINISH_STARTED : BS_NEED_MORE;
};
var deflate_fast = (s, flush) => {
  let hash_head;
  let bflush;
  for (;; ) {
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break;
      }
    }
    hash_head = 0;
    if (s.lookahead >= MIN_MATCH) {
      hash_head = INSERT_STRING(s, s.strstart);
    }
    if (hash_head !== 0 && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
      s.match_length = longest_match(s, hash_head);
    }
    if (s.match_length >= MIN_MATCH) {
      bflush = _tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);
      s.lookahead -= s.match_length;
      if (s.match_length <= s.max_lazy_match && s.lookahead >= MIN_MATCH) {
        s.match_length--;
        do {
          s.strstart++;
          hash_head = INSERT_STRING(s, s.strstart);
        } while (--s.match_length !== 0);
        s.strstart++;
      } else {
        s.strstart += s.match_length;
        s.match_length = 0;
        if (s.legacy_hash) {
          s.ins_h = s.window[s.strstart];
          s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + 1]);
        }
      }
    } else {
      bflush = _tr_tally(s, 0, s.window[s.strstart]);
      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH$3) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
var deflate_slow = (s, flush) => {
  let hash_head;
  let bflush;
  let max_insert;
  for (;; ) {
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break;
      }
    }
    hash_head = 0;
    if (s.lookahead >= MIN_MATCH) {
      hash_head = INSERT_STRING(s, s.strstart);
    }
    s.prev_length = s.match_length;
    s.prev_match = s.match_start;
    s.match_length = MIN_MATCH - 1;
    if (hash_head !== 0 && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
      s.match_length = longest_match(s, hash_head);
      if (s.match_length <= 5 && (s.strategy === Z_FILTERED || s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096)) {
        s.match_length = MIN_MATCH - 1;
      }
    }
    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
      max_insert = s.strstart + s.lookahead - MIN_MATCH;
      bflush = _tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
      s.lookahead -= s.prev_length - 1;
      s.prev_length -= 2;
      do {
        if (++s.strstart <= max_insert) {
          hash_head = INSERT_STRING(s, s.strstart);
        }
      } while (--s.prev_length !== 0);
      s.match_available = 0;
      s.match_length = MIN_MATCH - 1;
      s.strstart++;
      if (bflush) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    } else if (s.match_available) {
      bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);
      if (bflush) {
        flush_block_only(s, false);
      }
      s.strstart++;
      s.lookahead--;
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      s.match_available = 1;
      s.strstart++;
      s.lookahead--;
    }
  }
  if (s.match_available) {
    bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);
    s.match_available = 0;
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH$3) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
var deflate_rle = (s, flush) => {
  let bflush;
  let prev;
  let scan, strend;
  const _win = s.window;
  for (;; ) {
    if (s.lookahead <= MAX_MATCH) {
      fill_window(s);
      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH$2) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break;
      }
    }
    s.match_length = 0;
    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
      scan = s.strstart - 1;
      prev = _win[scan];
      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s.strstart + MAX_MATCH;
        do {} while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
        s.match_length = MAX_MATCH - (strend - scan);
        if (s.match_length > s.lookahead) {
          s.match_length = s.lookahead;
        }
      }
    }
    if (s.match_length >= MIN_MATCH) {
      bflush = _tr_tally(s, 1, s.match_length - MIN_MATCH);
      s.lookahead -= s.match_length;
      s.strstart += s.match_length;
      s.match_length = 0;
    } else {
      bflush = _tr_tally(s, 0, s.window[s.strstart]);
      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH$3) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
var deflate_huff = (s, flush) => {
  let bflush;
  for (;; ) {
    if (s.lookahead === 0) {
      fill_window(s);
      if (s.lookahead === 0) {
        if (flush === Z_NO_FLUSH$2) {
          return BS_NEED_MORE;
        }
        break;
      }
    }
    s.match_length = 0;
    bflush = _tr_tally(s, 0, s.window[s.strstart]);
    s.lookahead--;
    s.strstart++;
    if (bflush) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH$3) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
function Config(good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
}
var configuration_table = [
  new Config(0, 0, 0, 0, deflate_stored),
  new Config(4, 4, 8, 4, deflate_fast),
  new Config(4, 5, 16, 8, deflate_fast),
  new Config(4, 6, 32, 32, deflate_fast),
  new Config(4, 4, 16, 16, deflate_slow),
  new Config(8, 16, 32, 32, deflate_slow),
  new Config(8, 16, 128, 128, deflate_slow),
  new Config(8, 32, 128, 256, deflate_slow),
  new Config(32, 128, 258, 1024, deflate_slow),
  new Config(32, 258, 258, 4096, deflate_slow)
];
var lm_init = (s) => {
  s.window_size = 2 * s.w_size;
  zero(s.head);
  s.max_lazy_match = configuration_table[s.level].max_lazy;
  s.good_match = configuration_table[s.level].good_length;
  s.nice_match = configuration_table[s.level].nice_length;
  s.max_chain_length = configuration_table[s.level].max_chain;
  s.strstart = 0;
  s.block_start = 0;
  s.lookahead = 0;
  s.insert = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  s.ins_h = 0;
};
function DeflateState() {
  this.strm = null;
  this.status = 0;
  this.pending_buf = null;
  this.pending_buf_size = 0;
  this.pending_out = 0;
  this.pending = 0;
  this.wrap = 0;
  this.gzhead = null;
  this.gzindex = 0;
  this.method = Z_DEFLATED$2;
  this.last_flush = -1;
  this.w_size = 0;
  this.w_bits = 0;
  this.w_mask = 0;
  this.window = null;
  this.window_size = 0;
  this.prev = null;
  this.head = null;
  this.ins_h = 0;
  this.legacy_hash = 0;
  this.hash_size = 0;
  this.hash_bits = 0;
  this.hash_mask = 0;
  this.hash_shift = 0;
  this.block_start = 0;
  this.match_length = 0;
  this.prev_match = 0;
  this.match_available = 0;
  this.strstart = 0;
  this.match_start = 0;
  this.lookahead = 0;
  this.prev_length = 0;
  this.max_chain_length = 0;
  this.max_lazy_match = 0;
  this.level = 0;
  this.strategy = 0;
  this.good_match = 0;
  this.nice_match = 0;
  this.dyn_ltree = new Uint16Array(HEAP_SIZE * 2);
  this.dyn_dtree = new Uint16Array((2 * D_CODES + 1) * 2);
  this.bl_tree = new Uint16Array((2 * BL_CODES + 1) * 2);
  zero(this.dyn_ltree);
  zero(this.dyn_dtree);
  zero(this.bl_tree);
  this.l_desc = null;
  this.d_desc = null;
  this.bl_desc = null;
  this.bl_count = new Uint16Array(MAX_BITS + 1);
  this.heap = new Uint16Array(2 * L_CODES + 1);
  zero(this.heap);
  this.heap_len = 0;
  this.heap_max = 0;
  this.depth = new Uint16Array(2 * L_CODES + 1);
  zero(this.depth);
  this.sym_buf = 0;
  this.lit_bufsize = 0;
  this.sym_next = 0;
  this.sym_end = 0;
  this.opt_len = 0;
  this.static_len = 0;
  this.matches = 0;
  this.insert = 0;
  this.bi_buf = 0;
  this.bi_valid = 0;
}
var deflateStateCheck = (strm) => {
  if (!strm) {
    return 1;
  }
  const s = strm.state;
  if (!s || s.strm !== strm || s.status !== INIT_STATE && s.status !== GZIP_STATE && s.status !== EXTRA_STATE && s.status !== NAME_STATE && s.status !== COMMENT_STATE && s.status !== HCRC_STATE && s.status !== BUSY_STATE && s.status !== FINISH_STATE) {
    return 1;
  }
  return 0;
};
var deflateResetKeep = (strm) => {
  if (deflateStateCheck(strm)) {
    return err(strm, Z_STREAM_ERROR$2);
  }
  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN;
  const s = strm.state;
  s.pending = 0;
  s.pending_out = 0;
  if (s.wrap < 0) {
    s.wrap = -s.wrap;
  }
  s.status = s.wrap === 2 ? GZIP_STATE : s.wrap ? INIT_STATE : BUSY_STATE;
  strm.adler = s.wrap === 2 ? 0 : 1;
  s.last_flush = -2;
  _tr_init(s);
  return Z_OK$3;
};
var deflateReset = (strm) => {
  const ret = deflateResetKeep(strm);
  if (ret === Z_OK$3) {
    lm_init(strm.state);
  }
  return ret;
};
var deflateSetHeader = (strm, head) => {
  if (deflateStateCheck(strm) || strm.state.wrap !== 2) {
    return Z_STREAM_ERROR$2;
  }
  strm.state.gzhead = head;
  return Z_OK$3;
};
var deflateInit2 = (strm, level, method, windowBits, memLevel, strategy, legacyHash) => {
  if (!strm) {
    return Z_STREAM_ERROR$2;
  }
  let wrap = 1;
  if (level === Z_DEFAULT_COMPRESSION$1) {
    level = 6;
  }
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  } else if (windowBits > 15) {
    wrap = 2;
    windowBits -= 16;
  }
  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED$2 || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED || windowBits === 8 && wrap !== 1) {
    return err(strm, Z_STREAM_ERROR$2);
  }
  if (windowBits === 8) {
    windowBits = 9;
  }
  const s = new DeflateState;
  strm.state = s;
  s.strm = strm;
  s.status = INIT_STATE;
  s.wrap = wrap;
  s.gzhead = null;
  s.w_bits = windowBits;
  s.w_size = 1 << s.w_bits;
  s.w_mask = s.w_size - 1;
  s.legacy_hash = legacyHash ? 1 : 0;
  s.hash_bits = memLevel + 7;
  if (!s.legacy_hash && s.hash_bits < 15) {
    s.hash_bits = 15;
  }
  s.hash_size = 1 << s.hash_bits;
  s.hash_mask = s.hash_size - 1;
  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);
  s.window = new Uint8Array(s.w_size * 2);
  s.head = new Uint16Array(s.hash_size);
  s.prev = new Uint16Array(s.w_size);
  s.lit_bufsize = 1 << memLevel + 6;
  s.pending_buf_size = s.lit_bufsize * 4;
  s.pending_buf = new Uint8Array(s.pending_buf_size);
  s.sym_buf = s.lit_bufsize;
  s.sym_end = (s.lit_bufsize - 1) * 3;
  s.level = level;
  s.strategy = strategy;
  s.method = method;
  return deflateReset(strm);
};
var deflateInit = (strm, level) => {
  return deflateInit2(strm, level, Z_DEFLATED$2, MAX_WBITS$1, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY$1);
};
var deflate$2 = (strm, flush) => {
  if (deflateStateCheck(strm) || flush > Z_BLOCK$1 || flush < 0) {
    return strm ? err(strm, Z_STREAM_ERROR$2) : Z_STREAM_ERROR$2;
  }
  const s = strm.state;
  if (!strm.output || strm.avail_in !== 0 && !strm.input || s.status === FINISH_STATE && flush !== Z_FINISH$3) {
    return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR$2 : Z_STREAM_ERROR$2);
  }
  const old_flush = s.last_flush;
  s.last_flush = flush;
  if (s.pending !== 0) {
    flush_pending(strm);
    if (strm.avail_out === 0) {
      s.last_flush = -1;
      return Z_OK$3;
    }
  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH$3) {
    return err(strm, Z_BUF_ERROR$2);
  }
  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
    return err(strm, Z_BUF_ERROR$2);
  }
  if (s.status === INIT_STATE && s.wrap === 0) {
    s.status = BUSY_STATE;
  }
  if (s.status === INIT_STATE) {
    let header = Z_DEFLATED$2 + (s.w_bits - 8 << 4) << 8;
    let level_flags = -1;
    if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
      level_flags = 0;
    } else if (s.level < 6) {
      level_flags = 1;
    } else if (s.level === 6) {
      level_flags = 2;
    } else {
      level_flags = 3;
    }
    header |= level_flags << 6;
    if (s.strstart !== 0) {
      header |= PRESET_DICT;
    }
    header += 31 - header % 31;
    putShortMSB(s, header);
    if (s.strstart !== 0) {
      putShortMSB(s, strm.adler >>> 16);
      putShortMSB(s, strm.adler & 65535);
    }
    strm.adler = 1;
    s.status = BUSY_STATE;
    flush_pending(strm);
    if (s.pending !== 0) {
      s.last_flush = -1;
      return Z_OK$3;
    }
  }
  if (s.status === GZIP_STATE) {
    strm.adler = 0;
    put_byte(s, 31);
    put_byte(s, 139);
    put_byte(s, 8);
    if (!s.gzhead) {
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
      put_byte(s, OS_CODE);
      s.status = BUSY_STATE;
      flush_pending(strm);
      if (s.pending !== 0) {
        s.last_flush = -1;
        return Z_OK$3;
      }
    } else {
      put_byte(s, (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (!s.gzhead.extra ? 0 : 4) + (!s.gzhead.name ? 0 : 8) + (!s.gzhead.comment ? 0 : 16));
      put_byte(s, s.gzhead.time & 255);
      put_byte(s, s.gzhead.time >> 8 & 255);
      put_byte(s, s.gzhead.time >> 16 & 255);
      put_byte(s, s.gzhead.time >> 24 & 255);
      put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
      put_byte(s, s.gzhead.os & 255);
      if (s.gzhead.extra && s.gzhead.extra.length) {
        put_byte(s, s.gzhead.extra.length & 255);
        put_byte(s, s.gzhead.extra.length >> 8 & 255);
      }
      if (s.gzhead.hcrc) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending, 0);
      }
      s.gzindex = 0;
      s.status = EXTRA_STATE;
    }
  }
  if (s.status === EXTRA_STATE) {
    if (s.gzhead.extra) {
      let beg = s.pending;
      let left = (s.gzhead.extra.length & 65535) - s.gzindex;
      while (s.pending + left > s.pending_buf_size) {
        let copy = s.pending_buf_size - s.pending;
        s.pending_buf.set(s.gzhead.extra.subarray(s.gzindex, s.gzindex + copy), s.pending);
        s.pending = s.pending_buf_size;
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        s.gzindex += copy;
        flush_pending(strm);
        if (s.pending !== 0) {
          s.last_flush = -1;
          return Z_OK$3;
        }
        beg = 0;
        left -= copy;
      }
      let gzhead_extra = new Uint8Array(s.gzhead.extra);
      s.pending_buf.set(gzhead_extra.subarray(s.gzindex, s.gzindex + left), s.pending);
      s.pending += left;
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      s.gzindex = 0;
    }
    s.status = NAME_STATE;
  }
  if (s.status === NAME_STATE) {
    if (s.gzhead.name) {
      let beg = s.pending;
      let val;
      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          if (s.pending !== 0) {
            s.last_flush = -1;
            return Z_OK$3;
          }
          beg = 0;
        }
        if (s.gzindex < s.gzhead.name.length) {
          val = s.gzhead.name.charCodeAt(s.gzindex++) & 255;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      s.gzindex = 0;
    }
    s.status = COMMENT_STATE;
  }
  if (s.status === COMMENT_STATE) {
    if (s.gzhead.comment) {
      let beg = s.pending;
      let val;
      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          if (s.pending !== 0) {
            s.last_flush = -1;
            return Z_OK$3;
          }
          beg = 0;
        }
        if (s.gzindex < s.gzhead.comment.length) {
          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 255;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
    }
    s.status = HCRC_STATE;
  }
  if (s.status === HCRC_STATE) {
    if (s.gzhead.hcrc) {
      if (s.pending + 2 > s.pending_buf_size) {
        flush_pending(strm);
        if (s.pending !== 0) {
          s.last_flush = -1;
          return Z_OK$3;
        }
      }
      put_byte(s, strm.adler & 255);
      put_byte(s, strm.adler >> 8 & 255);
      strm.adler = 0;
    }
    s.status = BUSY_STATE;
    flush_pending(strm);
    if (s.pending !== 0) {
      s.last_flush = -1;
      return Z_OK$3;
    }
  }
  if (strm.avail_in !== 0 || s.lookahead !== 0 || flush !== Z_NO_FLUSH$2 && s.status !== FINISH_STATE) {
    let bstate = s.level === 0 ? deflate_stored(s, flush) : s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) : s.strategy === Z_RLE ? deflate_rle(s, flush) : configuration_table[s.level].func(s, flush);
    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s.status = FINISH_STATE;
    }
    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s.last_flush = -1;
      }
      return Z_OK$3;
    }
    if (bstate === BS_BLOCK_DONE) {
      if (flush === Z_PARTIAL_FLUSH) {
        _tr_align(s);
      } else if (flush !== Z_BLOCK$1) {
        _tr_stored_block(s, 0, 0, false);
        if (flush === Z_FULL_FLUSH$1) {
          zero(s.head);
          if (s.lookahead === 0) {
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
        }
      }
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        return Z_OK$3;
      }
    }
  }
  if (flush !== Z_FINISH$3) {
    return Z_OK$3;
  }
  if (s.wrap <= 0) {
    return Z_STREAM_END$3;
  }
  if (s.wrap === 2) {
    put_byte(s, strm.adler & 255);
    put_byte(s, strm.adler >> 8 & 255);
    put_byte(s, strm.adler >> 16 & 255);
    put_byte(s, strm.adler >> 24 & 255);
    put_byte(s, strm.total_in & 255);
    put_byte(s, strm.total_in >> 8 & 255);
    put_byte(s, strm.total_in >> 16 & 255);
    put_byte(s, strm.total_in >> 24 & 255);
  } else {
    putShortMSB(s, strm.adler >>> 16);
    putShortMSB(s, strm.adler & 65535);
  }
  flush_pending(strm);
  if (s.wrap > 0) {
    s.wrap = -s.wrap;
  }
  return s.pending !== 0 ? Z_OK$3 : Z_STREAM_END$3;
};
var deflateEnd = (strm) => {
  if (deflateStateCheck(strm)) {
    return Z_STREAM_ERROR$2;
  }
  const status = strm.state.status;
  strm.state = null;
  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR$2) : Z_OK$3;
};
var deflateSetDictionary = (strm, dictionary) => {
  let dictLength = dictionary.length;
  if (deflateStateCheck(strm)) {
    return Z_STREAM_ERROR$2;
  }
  const s = strm.state;
  const wrap = s.wrap;
  if (wrap === 2 || wrap === 1 && s.status !== INIT_STATE || s.lookahead) {
    return Z_STREAM_ERROR$2;
  }
  if (wrap === 1) {
    strm.adler = adler32_1(strm.adler, dictionary, dictLength, 0);
  }
  s.wrap = 0;
  if (dictLength >= s.w_size) {
    if (wrap === 0) {
      zero(s.head);
      s.strstart = 0;
      s.block_start = 0;
      s.insert = 0;
    }
    let tmpDict = new Uint8Array(s.w_size);
    tmpDict.set(dictionary.subarray(dictLength - s.w_size, dictLength), 0);
    dictionary = tmpDict;
    dictLength = s.w_size;
  }
  const avail = strm.avail_in;
  const next = strm.next_in;
  const input = strm.input;
  strm.avail_in = dictLength;
  strm.next_in = 0;
  strm.input = dictionary;
  fill_window(s);
  while (s.lookahead >= MIN_MATCH) {
    let str = s.strstart;
    let n = s.lookahead - (MIN_MATCH - 1);
    do {
      INSERT_STRING(s, str);
      str++;
    } while (--n);
    s.strstart = str;
    s.lookahead = MIN_MATCH - 1;
    fill_window(s);
  }
  s.strstart += s.lookahead;
  s.block_start = s.strstart;
  s.insert = s.lookahead;
  s.lookahead = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  strm.next_in = next;
  strm.input = input;
  strm.avail_in = avail;
  s.wrap = wrap;
  return Z_OK$3;
};
var deflateInit_1 = deflateInit;
var deflateInit2_1 = deflateInit2;
var deflateReset_1 = deflateReset;
var deflateResetKeep_1 = deflateResetKeep;
var deflateSetHeader_1 = deflateSetHeader;
var deflate_2$1 = deflate$2;
var deflateEnd_1 = deflateEnd;
var deflateSetDictionary_1 = deflateSetDictionary;
var deflateInfo = "pako deflate (from Nodeca project)";
var deflate_1$2 = {
  deflateInit: deflateInit_1,
  deflateInit2: deflateInit2_1,
  deflateReset: deflateReset_1,
  deflateResetKeep: deflateResetKeep_1,
  deflateSetHeader: deflateSetHeader_1,
  deflate: deflate_2$1,
  deflateEnd: deflateEnd_1,
  deflateSetDictionary: deflateSetDictionary_1,
  deflateInfo
};
var _has = (obj, key) => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};
var assign = function(obj) {
  const sources = Array.prototype.slice.call(arguments, 1);
  while (sources.length) {
    const source = sources.shift();
    if (!source) {
      continue;
    }
    if (typeof source !== "object") {
      throw new TypeError(source + "must be non-object");
    }
    for (const p in source) {
      if (_has(source, p)) {
        obj[p] = source[p];
      }
    }
  }
  return obj;
};
var flattenChunks = (chunks) => {
  let len = 0;
  for (let i = 0, l = chunks.length;i < l; i++) {
    len += chunks[i].length;
  }
  const result = new Uint8Array(len);
  for (let i = 0, pos = 0, l = chunks.length;i < l; i++) {
    let chunk = chunks[i];
    result.set(chunk, pos);
    pos += chunk.length;
  }
  return result;
};
var common = {
  assign,
  flattenChunks
};
var STR_APPLY_UIA_OK = true;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch (__) {
  STR_APPLY_UIA_OK = false;
}
var _utf8len = new Uint8Array(256);
for (let q = 0;q < 256; q++) {
  _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
}
_utf8len[254] = _utf8len[255] = 1;
var string2buf = (str) => {
  if (typeof TextEncoder === "function" && TextEncoder.prototype.encode) {
    return new TextEncoder().encode(str);
  }
  let buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;
  for (m_pos = 0;m_pos < str_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 64512) === 56320) {
        c = 65536 + (c - 55296 << 10) + (c2 - 56320);
        m_pos++;
      }
    }
    buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
  }
  buf = new Uint8Array(buf_len);
  for (i = 0, m_pos = 0;i < buf_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 64512) === 56320) {
        c = 65536 + (c - 55296 << 10) + (c2 - 56320);
        m_pos++;
      }
    }
    if (c < 128) {
      buf[i++] = c;
    } else if (c < 2048) {
      buf[i++] = 192 | c >>> 6;
      buf[i++] = 128 | c & 63;
    } else if (c < 65536) {
      buf[i++] = 224 | c >>> 12;
      buf[i++] = 128 | c >>> 6 & 63;
      buf[i++] = 128 | c & 63;
    } else {
      buf[i++] = 240 | c >>> 18;
      buf[i++] = 128 | c >>> 12 & 63;
      buf[i++] = 128 | c >>> 6 & 63;
      buf[i++] = 128 | c & 63;
    }
  }
  return buf;
};
var buf2binstring = (buf, len) => {
  if (len < 65534) {
    if (buf.subarray && STR_APPLY_UIA_OK) {
      return String.fromCharCode.apply(null, buf.length === len ? buf : buf.subarray(0, len));
    }
  }
  let result = "";
  for (let i = 0;i < len; i++) {
    result += String.fromCharCode(buf[i]);
  }
  return result;
};
var buf2string = (buf, max) => {
  const len = max || buf.length;
  if (typeof TextDecoder === "function" && TextDecoder.prototype.decode) {
    return new TextDecoder().decode(buf.subarray(0, max));
  }
  let i, out;
  const utf16buf = new Array(len * 2);
  for (out = 0, i = 0;i < len; ) {
    let c = buf[i++];
    if (c < 128) {
      utf16buf[out++] = c;
      continue;
    }
    let c_len = _utf8len[c];
    if (c_len > 4) {
      utf16buf[out++] = 65533;
      i += c_len - 1;
      continue;
    }
    c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
    while (c_len > 1 && i < len) {
      c = c << 6 | buf[i++] & 63;
      c_len--;
    }
    if (c_len > 1) {
      utf16buf[out++] = 65533;
      continue;
    }
    if (c < 65536) {
      utf16buf[out++] = c;
    } else {
      c -= 65536;
      utf16buf[out++] = 55296 | c >> 10 & 1023;
      utf16buf[out++] = 56320 | c & 1023;
    }
  }
  return buf2binstring(utf16buf, out);
};
var utf8border = (buf, max) => {
  max = max || buf.length;
  if (max > buf.length) {
    max = buf.length;
  }
  let pos = max - 1;
  while (pos >= 0 && (buf[pos] & 192) === 128) {
    pos--;
  }
  if (pos < 0) {
    return max;
  }
  if (pos === 0) {
    return max;
  }
  return pos + _utf8len[buf[pos]] > max ? pos : max;
};
var strings = {
  string2buf,
  buf2string,
  utf8border
};
function ZStream() {
  this.input = null;
  this.next_in = 0;
  this.avail_in = 0;
  this.total_in = 0;
  this.output = null;
  this.next_out = 0;
  this.avail_out = 0;
  this.total_out = 0;
  this.msg = "";
  this.state = null;
  this.data_type = 2;
  this.adler = 0;
}
var zstream = ZStream;
var toString$1 = Object.prototype.toString;
var {
  Z_NO_FLUSH: Z_NO_FLUSH$1,
  Z_SYNC_FLUSH,
  Z_FULL_FLUSH,
  Z_FINISH: Z_FINISH$2,
  Z_OK: Z_OK$2,
  Z_STREAM_END: Z_STREAM_END$2,
  Z_DEFAULT_COMPRESSION,
  Z_DEFAULT_STRATEGY,
  Z_DEFLATED: Z_DEFLATED$1
} = constants$2;
var defaultOptions$1 = {
  level: Z_DEFAULT_COMPRESSION,
  method: Z_DEFLATED$1,
  chunkSize: 16384,
  windowBits: 15,
  memLevel: 8,
  strategy: Z_DEFAULT_STRATEGY,
  legacyHash: true
};
function Deflate$1(options) {
  this.options = common.assign({}, defaultOptions$1, options || {});
  let opt = this.options;
  if (opt.raw && opt.windowBits > 0) {
    opt.windowBits = -opt.windowBits;
  } else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
    opt.windowBits += 16;
  }
  this.err = 0;
  this.msg = "";
  this.ended = false;
  this.chunks = [];
  this.strm = new zstream;
  this.strm.avail_out = 0;
  let status = deflate_1$2.deflateInit2(this.strm, opt.level, opt.method, opt.windowBits, opt.memLevel, opt.strategy, opt.legacyHash);
  if (status !== Z_OK$2) {
    throw new Error(messages[status]);
  }
  if (opt.header) {
    deflate_1$2.deflateSetHeader(this.strm, opt.header);
  }
  if (opt.dictionary) {
    let dict;
    if (typeof opt.dictionary === "string") {
      dict = strings.string2buf(opt.dictionary);
    } else if (toString$1.call(opt.dictionary) === "[object ArrayBuffer]") {
      dict = new Uint8Array(opt.dictionary);
    } else {
      dict = opt.dictionary;
    }
    status = deflate_1$2.deflateSetDictionary(this.strm, dict);
    if (status !== Z_OK$2) {
      throw new Error(messages[status]);
    }
    this._dict_set = true;
  }
}
Deflate$1.prototype.push = function(data, flush_mode) {
  const strm = this.strm;
  const chunkSize = this.options.chunkSize;
  let status, _flush_mode;
  if (this.ended) {
    return false;
  }
  if (flush_mode === ~~flush_mode)
    _flush_mode = flush_mode;
  else
    _flush_mode = flush_mode === true ? Z_FINISH$2 : Z_NO_FLUSH$1;
  if (typeof data === "string") {
    strm.input = strings.string2buf(data);
  } else if (toString$1.call(data) === "[object ArrayBuffer]") {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }
  strm.next_in = 0;
  strm.avail_in = strm.input.length;
  for (;; ) {
    if (strm.avail_out === 0) {
      strm.output = new Uint8Array(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    if ((_flush_mode === Z_SYNC_FLUSH || _flush_mode === Z_FULL_FLUSH) && strm.avail_out <= 6) {
      this.onData(strm.output.subarray(0, strm.next_out));
      strm.avail_out = 0;
      continue;
    }
    status = deflate_1$2.deflate(strm, _flush_mode);
    if (status === Z_STREAM_END$2) {
      if (strm.next_out > 0) {
        this.onData(strm.output.subarray(0, strm.next_out));
      }
      status = deflate_1$2.deflateEnd(this.strm);
      this.onEnd(status);
      this.ended = true;
      return status === Z_OK$2;
    }
    if (strm.avail_out === 0) {
      this.onData(strm.output);
      continue;
    }
    if (_flush_mode > 0 && strm.next_out > 0) {
      this.onData(strm.output.subarray(0, strm.next_out));
      strm.avail_out = 0;
      continue;
    }
    if (strm.avail_in === 0)
      break;
  }
  return true;
};
Deflate$1.prototype.onData = function(chunk) {
  this.chunks.push(chunk);
};
Deflate$1.prototype.onEnd = function(status) {
  if (status === Z_OK$2) {
    this.result = common.flattenChunks(this.chunks);
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};
function deflate$1(input, options) {
  const deflator = new Deflate$1(options);
  deflator.push(input, true);
  if (deflator.err) {
    throw deflator.msg || messages[deflator.err];
  }
  return deflator.result;
}
function deflateRaw$1(input, options) {
  options = options || {};
  options.raw = true;
  return deflate$1(input, options);
}
function gzip$1(input, options) {
  options = options || {};
  options.gzip = true;
  return deflate$1(input, options);
}
var Deflate_1$1 = Deflate$1;
var deflate_2 = deflate$1;
var deflateRaw_1$1 = deflateRaw$1;
var gzip_1$1 = gzip$1;
var constants$1 = constants$2;
var deflate_1$1 = {
  Deflate: Deflate_1$1,
  deflate: deflate_2,
  deflateRaw: deflateRaw_1$1,
  gzip: gzip_1$1,
  constants: constants$1
};
var BAD$1 = 16209;
var TYPE$1 = 16191;
var inffast = function inflate_fast(strm, start) {
  let _in;
  let last;
  let _out;
  let beg;
  let end;
  let dmax;
  let wsize;
  let whave;
  let wnext;
  let s_window;
  let hold;
  let bits;
  let lcode;
  let dcode;
  let lmask;
  let dmask;
  let here;
  let op;
  let len;
  let dist;
  let from2;
  let from_source;
  let input, output;
  const state = strm.state;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257);
  dmax = state.dmax;
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  s_window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;
  top:
    do {
      if (bits < 15) {
        hold += input[_in++] << bits;
        bits += 8;
        hold += input[_in++] << bits;
        bits += 8;
      }
      here = lcode[hold & lmask];
      dolen:
        for (;; ) {
          op = here >>> 24;
          hold >>>= op;
          bits -= op;
          op = here >>> 16 & 255;
          if (op === 0) {
            output[_out++] = here & 65535;
          } else if (op & 16) {
            len = here & 65535;
            op &= 15;
            if (op) {
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
              len += hold & (1 << op) - 1;
              hold >>>= op;
              bits -= op;
            }
            if (bits < 15) {
              hold += input[_in++] << bits;
              bits += 8;
              hold += input[_in++] << bits;
              bits += 8;
            }
            here = dcode[hold & dmask];
            dodist:
              for (;; ) {
                op = here >>> 24;
                hold >>>= op;
                bits -= op;
                op = here >>> 16 & 255;
                if (op & 16) {
                  dist = here & 65535;
                  op &= 15;
                  if (bits < op) {
                    hold += input[_in++] << bits;
                    bits += 8;
                    if (bits < op) {
                      hold += input[_in++] << bits;
                      bits += 8;
                    }
                  }
                  dist += hold & (1 << op) - 1;
                  if (dist > dmax) {
                    strm.msg = "invalid distance too far back";
                    state.mode = BAD$1;
                    break top;
                  }
                  hold >>>= op;
                  bits -= op;
                  op = _out - beg;
                  if (dist > op) {
                    op = dist - op;
                    if (op > whave) {
                      if (state.sane) {
                        strm.msg = "invalid distance too far back";
                        state.mode = BAD$1;
                        break top;
                      }
                    }
                    from2 = 0;
                    from_source = s_window;
                    if (wnext === 0) {
                      from2 += wsize - op;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from2++];
                        } while (--op);
                        from2 = _out - dist;
                        from_source = output;
                      }
                    } else if (wnext < op) {
                      from2 += wsize + wnext - op;
                      op -= wnext;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from2++];
                        } while (--op);
                        from2 = 0;
                        if (wnext < len) {
                          op = wnext;
                          len -= op;
                          do {
                            output[_out++] = s_window[from2++];
                          } while (--op);
                          from2 = _out - dist;
                          from_source = output;
                        }
                      }
                    } else {
                      from2 += wnext - op;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from2++];
                        } while (--op);
                        from2 = _out - dist;
                        from_source = output;
                      }
                    }
                    while (len > 2) {
                      output[_out++] = from_source[from2++];
                      output[_out++] = from_source[from2++];
                      output[_out++] = from_source[from2++];
                      len -= 3;
                    }
                    if (len) {
                      output[_out++] = from_source[from2++];
                      if (len > 1) {
                        output[_out++] = from_source[from2++];
                      }
                    }
                  } else {
                    from2 = _out - dist;
                    do {
                      output[_out++] = output[from2++];
                      output[_out++] = output[from2++];
                      output[_out++] = output[from2++];
                      len -= 3;
                    } while (len > 2);
                    if (len) {
                      output[_out++] = output[from2++];
                      if (len > 1) {
                        output[_out++] = output[from2++];
                      }
                    }
                  }
                } else if ((op & 64) === 0) {
                  here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
                  continue dodist;
                } else {
                  strm.msg = "invalid distance code";
                  state.mode = BAD$1;
                  break top;
                }
                break;
              }
          } else if ((op & 64) === 0) {
            here = lcode[(here & 65535) + (hold & (1 << op) - 1)];
            continue dolen;
          } else if (op & 32) {
            state.mode = TYPE$1;
            break top;
          } else {
            strm.msg = "invalid literal/length code";
            state.mode = BAD$1;
            break top;
          }
          break;
        }
    } while (_in < last && _out < end);
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
  strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
  state.hold = hold;
  state.bits = bits;
  return;
};
var MAXBITS = 15;
var ENOUGH_LENS$1 = 852;
var ENOUGH_DISTS$1 = 592;
var CODES$1 = 0;
var LENS$1 = 1;
var DISTS$1 = 2;
var lbase = new Uint16Array([
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  13,
  15,
  17,
  19,
  23,
  27,
  31,
  35,
  43,
  51,
  59,
  67,
  83,
  99,
  115,
  131,
  163,
  195,
  227,
  258,
  0,
  0
]);
var lext = new Uint8Array([
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  17,
  17,
  17,
  17,
  18,
  18,
  18,
  18,
  19,
  19,
  19,
  19,
  20,
  20,
  20,
  20,
  21,
  21,
  21,
  21,
  16,
  199,
  75
]);
var dbase = new Uint16Array([
  1,
  2,
  3,
  4,
  5,
  7,
  9,
  13,
  17,
  25,
  33,
  49,
  65,
  97,
  129,
  193,
  257,
  385,
  513,
  769,
  1025,
  1537,
  2049,
  3073,
  4097,
  6145,
  8193,
  12289,
  16385,
  24577,
  0,
  0
]);
var dext = new Uint8Array([
  16,
  16,
  16,
  16,
  17,
  17,
  18,
  18,
  19,
  19,
  20,
  20,
  21,
  21,
  22,
  22,
  23,
  23,
  24,
  24,
  25,
  25,
  26,
  26,
  27,
  27,
  28,
  28,
  29,
  29,
  64,
  64
]);
var inflate_table = (type, lens, lens_index, codes, table, table_index, work, opts) => {
  const bits = opts.bits;
  let len = 0;
  let sym = 0;
  let min = 0, max = 0;
  let root = 0;
  let curr = 0;
  let drop = 0;
  let left = 0;
  let used = 0;
  let huff = 0;
  let incr;
  let fill;
  let low;
  let mask;
  let next;
  let base = null;
  let match;
  const count = new Uint16Array(MAXBITS + 1);
  const offs = new Uint16Array(MAXBITS + 1);
  let extra = null;
  let here_bits, here_op, here_val;
  for (len = 0;len <= MAXBITS; len++) {
    count[len] = 0;
  }
  for (sym = 0;sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }
  root = bits;
  for (max = MAXBITS;max >= 1; max--) {
    if (count[max] !== 0) {
      break;
    }
  }
  if (root > max) {
    root = max;
  }
  if (max === 0) {
    table[table_index++] = 1 << 24 | 64 << 16 | 0;
    table[table_index++] = 1 << 24 | 64 << 16 | 0;
    opts.bits = 1;
    return 0;
  }
  for (min = 1;min < max; min++) {
    if (count[min] !== 0) {
      break;
    }
  }
  if (root < min) {
    root = min;
  }
  left = 1;
  for (len = 1;len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];
    if (left < 0) {
      return -1;
    }
  }
  if (left > 0 && (type === CODES$1 || max !== 1)) {
    return -1;
  }
  offs[1] = 0;
  for (len = 1;len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }
  for (sym = 0;sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }
  if (type === CODES$1) {
    base = extra = work;
    match = 20;
  } else if (type === LENS$1) {
    base = lbase;
    extra = lext;
    match = 257;
  } else {
    base = dbase;
    extra = dext;
    match = 0;
  }
  huff = 0;
  sym = 0;
  len = min;
  next = table_index;
  curr = root;
  drop = 0;
  low = -1;
  used = 1 << root;
  mask = used - 1;
  if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) {
    return 1;
  }
  for (;; ) {
    here_bits = len - drop;
    if (work[sym] + 1 < match) {
      here_op = 0;
      here_val = work[sym];
    } else if (work[sym] >= match) {
      here_op = extra[work[sym] - match];
      here_val = base[work[sym] - match];
    } else {
      here_op = 32 + 64;
      here_val = 0;
    }
    incr = 1 << len - drop;
    fill = 1 << curr;
    min = fill;
    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
    } while (fill !== 0);
    incr = 1 << len - 1;
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }
    sym++;
    if (--count[len] === 0) {
      if (len === max) {
        break;
      }
      len = lens[lens_index + work[sym]];
    }
    if (len > root && (huff & mask) !== low) {
      if (drop === 0) {
        drop = root;
      }
      next += min;
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count[curr + drop];
        if (left <= 0) {
          break;
        }
        curr++;
        left <<= 1;
      }
      used += 1 << curr;
      if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) {
        return 1;
      }
      low = huff & mask;
      table[low] = root << 24 | curr << 16 | next - table_index | 0;
    }
  }
  if (huff !== 0) {
    table[next + huff] = len - drop << 24 | 64 << 16 | 0;
  }
  opts.bits = root;
  return 0;
};
var inftrees = inflate_table;
var CODES = 0;
var LENS = 1;
var DISTS = 2;
var {
  Z_FINISH: Z_FINISH$1,
  Z_BLOCK,
  Z_TREES,
  Z_OK: Z_OK$1,
  Z_STREAM_END: Z_STREAM_END$1,
  Z_NEED_DICT: Z_NEED_DICT$1,
  Z_STREAM_ERROR: Z_STREAM_ERROR$1,
  Z_DATA_ERROR: Z_DATA_ERROR$1,
  Z_MEM_ERROR: Z_MEM_ERROR$1,
  Z_BUF_ERROR: Z_BUF_ERROR$1,
  Z_DEFLATED
} = constants$2;
var HEAD = 16180;
var FLAGS = 16181;
var TIME = 16182;
var OS = 16183;
var EXLEN = 16184;
var EXTRA = 16185;
var NAME = 16186;
var COMMENT = 16187;
var HCRC = 16188;
var DICTID = 16189;
var DICT = 16190;
var TYPE = 16191;
var TYPEDO = 16192;
var STORED = 16193;
var COPY_ = 16194;
var COPY = 16195;
var TABLE = 16196;
var LENLENS = 16197;
var CODELENS = 16198;
var LEN_ = 16199;
var LEN = 16200;
var LENEXT = 16201;
var DIST = 16202;
var DISTEXT = 16203;
var MATCH = 16204;
var LIT = 16205;
var CHECK = 16206;
var LENGTH = 16207;
var DONE = 16208;
var BAD = 16209;
var MEM = 16210;
var SYNC = 16211;
var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
var MAX_WBITS = 15;
var DEF_WBITS = MAX_WBITS;
var zswap32 = (q) => {
  return (q >>> 24 & 255) + (q >>> 8 & 65280) + ((q & 65280) << 8) + ((q & 255) << 24);
};
function InflateState() {
  this.strm = null;
  this.mode = 0;
  this.last = false;
  this.wrap = 0;
  this.havedict = false;
  this.flags = 0;
  this.dmax = 0;
  this.check = 0;
  this.total = 0;
  this.head = null;
  this.wbits = 0;
  this.wsize = 0;
  this.whave = 0;
  this.wnext = 0;
  this.window = null;
  this.hold = 0;
  this.bits = 0;
  this.length = 0;
  this.offset = 0;
  this.extra = 0;
  this.lencode = null;
  this.distcode = null;
  this.lenbits = 0;
  this.distbits = 0;
  this.ncode = 0;
  this.nlen = 0;
  this.ndist = 0;
  this.have = 0;
  this.next = null;
  this.lens = new Uint16Array(320);
  this.work = new Uint16Array(288);
  this.lendyn = null;
  this.distdyn = null;
  this.sane = 0;
  this.back = 0;
  this.was = 0;
}
var inflateStateCheck = (strm) => {
  if (!strm) {
    return 1;
  }
  const state = strm.state;
  if (!state || state.strm !== strm || state.mode < HEAD || state.mode > SYNC) {
    return 1;
  }
  return 0;
};
var inflateResetKeep = (strm) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = "";
  if (state.wrap) {
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.flags = -1;
  state.dmax = 32768;
  state.head = null;
  state.hold = 0;
  state.bits = 0;
  state.lencode = state.lendyn = new Int32Array(ENOUGH_LENS);
  state.distcode = state.distdyn = new Int32Array(ENOUGH_DISTS);
  state.sane = 1;
  state.back = -1;
  return Z_OK$1;
};
var inflateReset = (strm) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);
};
var inflateReset2 = (strm, windowBits) => {
  let wrap;
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  } else {
    wrap = (windowBits >> 4) + 5;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR$1;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
};
var inflateInit2 = (strm, windowBits) => {
  if (!strm) {
    return Z_STREAM_ERROR$1;
  }
  const state = new InflateState;
  strm.state = state;
  state.strm = strm;
  state.window = null;
  state.mode = HEAD;
  const ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK$1) {
    strm.state = null;
  }
  return ret;
};
var inflateInit = (strm) => {
  return inflateInit2(strm, DEF_WBITS);
};
var virgin = true;
var lenfix;
var distfix;
var fixedtables = (state) => {
  if (virgin) {
    lenfix = new Int32Array(512);
    distfix = new Int32Array(32);
    let sym = 0;
    while (sym < 144) {
      state.lens[sym++] = 8;
    }
    while (sym < 256) {
      state.lens[sym++] = 9;
    }
    while (sym < 280) {
      state.lens[sym++] = 7;
    }
    while (sym < 288) {
      state.lens[sym++] = 8;
    }
    inftrees(LENS, state.lens, 0, 288, lenfix, 0, state.work, { bits: 9 });
    sym = 0;
    while (sym < 32) {
      state.lens[sym++] = 5;
    }
    inftrees(DISTS, state.lens, 0, 32, distfix, 0, state.work, { bits: 5 });
    virgin = false;
  }
  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
};
var updatewindow = (strm, src, end, copy) => {
  let dist;
  const state = strm.state;
  if (state.window === null) {
    state.window = new Uint8Array(1 << state.wbits);
  }
  if (state.wsize === 0) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;
  }
  if (copy >= state.wsize) {
    state.window.set(src.subarray(end - state.wsize, end), 0);
    state.wnext = 0;
    state.whave = state.wsize;
  } else {
    dist = state.wsize - state.wnext;
    if (dist > copy) {
      dist = copy;
    }
    state.window.set(src.subarray(end - copy, end - copy + dist), state.wnext);
    copy -= dist;
    if (copy) {
      state.window.set(src.subarray(end - copy, end), 0);
      state.wnext = copy;
      state.whave = state.wsize;
    } else {
      state.wnext += dist;
      if (state.wnext === state.wsize) {
        state.wnext = 0;
      }
      if (state.whave < state.wsize) {
        state.whave += dist;
      }
    }
  }
  return 0;
};
var inflate$2 = (strm, flush) => {
  let state;
  let input, output;
  let next;
  let put;
  let have, left;
  let hold;
  let bits;
  let _in, _out;
  let copy;
  let from2;
  let from_source;
  let here = 0;
  let here_bits, here_op, here_val;
  let last_bits, last_op, last_val;
  let len;
  let ret;
  const hbuf = new Uint8Array(4);
  let opts;
  let n;
  const order = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  if (inflateStateCheck(strm) || !strm.output || !strm.input && strm.avail_in !== 0) {
    return Z_STREAM_ERROR$1;
  }
  state = strm.state;
  if (state.mode === TYPE) {
    state.mode = TYPEDO;
  }
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  _in = have;
  _out = left;
  ret = Z_OK$1;
  inf_leave:
    for (;; ) {
      switch (state.mode) {
        case HEAD:
          if (state.wrap === 0) {
            state.mode = TYPEDO;
            break;
          }
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.wrap & 2 && hold === 35615) {
            if (state.wbits === 0) {
              state.wbits = 15;
            }
            state.check = 0;
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = crc32_1(state.check, hbuf, 2, 0);
            hold = 0;
            bits = 0;
            state.mode = FLAGS;
            break;
          }
          if (state.head) {
            state.head.done = false;
          }
          if (!(state.wrap & 1) || (((hold & 255) << 8) + (hold >> 8)) % 31) {
            strm.msg = "incorrect header check";
            state.mode = BAD;
            break;
          }
          if ((hold & 15) !== Z_DEFLATED) {
            strm.msg = "unknown compression method";
            state.mode = BAD;
            break;
          }
          hold >>>= 4;
          bits -= 4;
          len = (hold & 15) + 8;
          if (state.wbits === 0) {
            state.wbits = len;
          }
          if (len > 15 || len > state.wbits) {
            strm.msg = "invalid window size";
            state.mode = BAD;
            break;
          }
          state.dmax = 1 << state.wbits;
          state.flags = 0;
          strm.adler = state.check = 1;
          state.mode = hold & 512 ? DICTID : TYPE;
          hold = 0;
          bits = 0;
          break;
        case FLAGS:
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.flags = hold;
          if ((state.flags & 255) !== Z_DEFLATED) {
            strm.msg = "unknown compression method";
            state.mode = BAD;
            break;
          }
          if (state.flags & 57344) {
            strm.msg = "unknown header flags set";
            state.mode = BAD;
            break;
          }
          if (state.head) {
            state.head.text = hold >> 8 & 1;
          }
          if (state.flags & 512 && state.wrap & 4) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = crc32_1(state.check, hbuf, 2, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = TIME;
        case TIME:
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.head) {
            state.head.time = hold;
          }
          if (state.flags & 512 && state.wrap & 4) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            hbuf[2] = hold >>> 16 & 255;
            hbuf[3] = hold >>> 24 & 255;
            state.check = crc32_1(state.check, hbuf, 4, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = OS;
        case OS:
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.head) {
            state.head.xflags = hold & 255;
            state.head.os = hold >> 8;
          }
          if (state.flags & 512 && state.wrap & 4) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = crc32_1(state.check, hbuf, 2, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = EXLEN;
        case EXLEN:
          if (state.flags & 1024) {
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.length = hold;
            if (state.head) {
              state.head.extra_len = hold;
            }
            if (state.flags & 512 && state.wrap & 4) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state.check = crc32_1(state.check, hbuf, 2, 0);
            }
            hold = 0;
            bits = 0;
          } else if (state.head) {
            state.head.extra = null;
          }
          state.mode = EXTRA;
        case EXTRA:
          if (state.flags & 1024) {
            copy = state.length;
            if (copy > have) {
              copy = have;
            }
            if (copy) {
              if (state.head) {
                len = state.head.extra_len - state.length;
                if (!state.head.extra) {
                  state.head.extra = new Uint8Array(state.head.extra_len);
                }
                state.head.extra.set(input.subarray(next, next + copy), len);
              }
              if (state.flags & 512 && state.wrap & 4) {
                state.check = crc32_1(state.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              state.length -= copy;
            }
            if (state.length) {
              break inf_leave;
            }
          }
          state.length = 0;
          state.mode = NAME;
        case NAME:
          if (state.flags & 2048) {
            if (have === 0) {
              break inf_leave;
            }
            copy = 0;
            do {
              len = input[next + copy++];
              if (state.head && len && state.length < 65536) {
                state.head.name += String.fromCharCode(len);
              }
            } while (len && copy < have);
            if (state.flags & 512 && state.wrap & 4) {
              state.check = crc32_1(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            if (len) {
              break inf_leave;
            }
          } else if (state.head) {
            state.head.name = null;
          }
          state.length = 0;
          state.mode = COMMENT;
        case COMMENT:
          if (state.flags & 4096) {
            if (have === 0) {
              break inf_leave;
            }
            copy = 0;
            do {
              len = input[next + copy++];
              if (state.head && len && state.length < 65536) {
                state.head.comment += String.fromCharCode(len);
              }
            } while (len && copy < have);
            if (state.flags & 512 && state.wrap & 4) {
              state.check = crc32_1(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            if (len) {
              break inf_leave;
            }
          } else if (state.head) {
            state.head.comment = null;
          }
          state.mode = HCRC;
        case HCRC:
          if (state.flags & 512) {
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.wrap & 4 && hold !== (state.check & 65535)) {
              strm.msg = "header crc mismatch";
              state.mode = BAD;
              break;
            }
            hold = 0;
            bits = 0;
          }
          if (state.head) {
            state.head.hcrc = state.flags >> 9 & 1;
            state.head.done = true;
          }
          strm.adler = state.check = 0;
          state.mode = TYPE;
          break;
        case DICTID:
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          strm.adler = state.check = zswap32(hold);
          hold = 0;
          bits = 0;
          state.mode = DICT;
        case DICT:
          if (state.havedict === 0) {
            strm.next_out = put;
            strm.avail_out = left;
            strm.next_in = next;
            strm.avail_in = have;
            state.hold = hold;
            state.bits = bits;
            return Z_NEED_DICT$1;
          }
          strm.adler = state.check = 1;
          state.mode = TYPE;
        case TYPE:
          if (flush === Z_BLOCK || flush === Z_TREES) {
            break inf_leave;
          }
        case TYPEDO:
          if (state.last) {
            hold >>>= bits & 7;
            bits -= bits & 7;
            state.mode = CHECK;
            break;
          }
          while (bits < 3) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.last = hold & 1;
          hold >>>= 1;
          bits -= 1;
          switch (hold & 3) {
            case 0:
              state.mode = STORED;
              break;
            case 1:
              fixedtables(state);
              state.mode = LEN_;
              if (flush === Z_TREES) {
                hold >>>= 2;
                bits -= 2;
                break inf_leave;
              }
              break;
            case 2:
              state.mode = TABLE;
              break;
            case 3:
              strm.msg = "invalid block type";
              state.mode = BAD;
          }
          hold >>>= 2;
          bits -= 2;
          break;
        case STORED:
          hold >>>= bits & 7;
          bits -= bits & 7;
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
            strm.msg = "invalid stored block lengths";
            state.mode = BAD;
            break;
          }
          state.length = hold & 65535;
          hold = 0;
          bits = 0;
          state.mode = COPY_;
          if (flush === Z_TREES) {
            break inf_leave;
          }
        case COPY_:
          state.mode = COPY;
        case COPY:
          copy = state.length;
          if (copy) {
            if (copy > have) {
              copy = have;
            }
            if (copy > left) {
              copy = left;
            }
            if (copy === 0) {
              break inf_leave;
            }
            output.set(input.subarray(next, next + copy), put);
            have -= copy;
            next += copy;
            left -= copy;
            put += copy;
            state.length -= copy;
            break;
          }
          state.mode = TYPE;
          break;
        case TABLE:
          while (bits < 14) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.nlen = (hold & 31) + 257;
          hold >>>= 5;
          bits -= 5;
          state.ndist = (hold & 31) + 1;
          hold >>>= 5;
          bits -= 5;
          state.ncode = (hold & 15) + 4;
          hold >>>= 4;
          bits -= 4;
          if (state.nlen > 286 || state.ndist > 30) {
            strm.msg = "too many length or distance symbols";
            state.mode = BAD;
            break;
          }
          state.have = 0;
          state.mode = LENLENS;
        case LENLENS:
          while (state.have < state.ncode) {
            while (bits < 3) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.lens[order[state.have++]] = hold & 7;
            hold >>>= 3;
            bits -= 3;
          }
          while (state.have < 19) {
            state.lens[order[state.have++]] = 0;
          }
          state.lencode = state.lendyn;
          state.lenbits = 7;
          opts = { bits: state.lenbits };
          ret = inftrees(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
          state.lenbits = opts.bits;
          if (ret) {
            strm.msg = "invalid code lengths set";
            state.mode = BAD;
            break;
          }
          state.have = 0;
          state.mode = CODELENS;
        case CODELENS:
          while (state.have < state.nlen + state.ndist) {
            for (;; ) {
              here = state.lencode[hold & (1 << state.lenbits) - 1];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (here_val < 16) {
              hold >>>= here_bits;
              bits -= here_bits;
              state.lens[state.have++] = here_val;
            } else {
              if (here_val === 16) {
                n = here_bits + 2;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                if (state.have === 0) {
                  strm.msg = "invalid bit length repeat";
                  state.mode = BAD;
                  break;
                }
                len = state.lens[state.have - 1];
                copy = 3 + (hold & 3);
                hold >>>= 2;
                bits -= 2;
              } else if (here_val === 17) {
                n = here_bits + 3;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                len = 0;
                copy = 3 + (hold & 7);
                hold >>>= 3;
                bits -= 3;
              } else {
                n = here_bits + 7;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                len = 0;
                copy = 11 + (hold & 127);
                hold >>>= 7;
                bits -= 7;
              }
              if (state.have + copy > state.nlen + state.ndist) {
                strm.msg = "invalid bit length repeat";
                state.mode = BAD;
                break;
              }
              while (copy--) {
                state.lens[state.have++] = len;
              }
            }
          }
          if (state.mode === BAD) {
            break;
          }
          if (state.lens[256] === 0) {
            strm.msg = "invalid code -- missing end-of-block";
            state.mode = BAD;
            break;
          }
          state.lenbits = 9;
          opts = { bits: state.lenbits };
          ret = inftrees(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
          state.lenbits = opts.bits;
          if (ret) {
            strm.msg = "invalid literal/lengths set";
            state.mode = BAD;
            break;
          }
          state.distbits = 6;
          state.distcode = state.distdyn;
          opts = { bits: state.distbits };
          ret = inftrees(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
          state.distbits = opts.bits;
          if (ret) {
            strm.msg = "invalid distances set";
            state.mode = BAD;
            break;
          }
          state.mode = LEN_;
          if (flush === Z_TREES) {
            break inf_leave;
          }
        case LEN_:
          state.mode = LEN;
        case LEN:
          if (have >= 6 && left >= 258) {
            strm.next_out = put;
            strm.avail_out = left;
            strm.next_in = next;
            strm.avail_in = have;
            state.hold = hold;
            state.bits = bits;
            inffast(strm, _out);
            put = strm.next_out;
            output = strm.output;
            left = strm.avail_out;
            next = strm.next_in;
            input = strm.input;
            have = strm.avail_in;
            hold = state.hold;
            bits = state.bits;
            if (state.mode === TYPE) {
              state.back = -1;
            }
            break;
          }
          state.back = 0;
          for (;; ) {
            here = state.lencode[hold & (1 << state.lenbits) - 1];
            here_bits = here >>> 24;
            here_op = here >>> 16 & 255;
            here_val = here & 65535;
            if (here_bits <= bits) {
              break;
            }
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (here_op && (here_op & 240) === 0) {
            last_bits = here_bits;
            last_op = here_op;
            last_val = here_val;
            for (;; ) {
              here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (last_bits + here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            hold >>>= last_bits;
            bits -= last_bits;
            state.back += last_bits;
          }
          hold >>>= here_bits;
          bits -= here_bits;
          state.back += here_bits;
          state.length = here_val;
          if (here_op === 0) {
            state.mode = LIT;
            break;
          }
          if (here_op & 32) {
            state.back = -1;
            state.mode = TYPE;
            break;
          }
          if (here_op & 64) {
            strm.msg = "invalid literal/length code";
            state.mode = BAD;
            break;
          }
          state.extra = here_op & 15;
          state.mode = LENEXT;
        case LENEXT:
          if (state.extra) {
            n = state.extra;
            while (bits < n) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.length += hold & (1 << state.extra) - 1;
            hold >>>= state.extra;
            bits -= state.extra;
            state.back += state.extra;
          }
          state.was = state.length;
          state.mode = DIST;
        case DIST:
          for (;; ) {
            here = state.distcode[hold & (1 << state.distbits) - 1];
            here_bits = here >>> 24;
            here_op = here >>> 16 & 255;
            here_val = here & 65535;
            if (here_bits <= bits) {
              break;
            }
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if ((here_op & 240) === 0) {
            last_bits = here_bits;
            last_op = here_op;
            last_val = here_val;
            for (;; ) {
              here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (last_bits + here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            hold >>>= last_bits;
            bits -= last_bits;
            state.back += last_bits;
          }
          hold >>>= here_bits;
          bits -= here_bits;
          state.back += here_bits;
          if (here_op & 64) {
            strm.msg = "invalid distance code";
            state.mode = BAD;
            break;
          }
          state.offset = here_val;
          state.extra = here_op & 15;
          state.mode = DISTEXT;
        case DISTEXT:
          if (state.extra) {
            n = state.extra;
            while (bits < n) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.offset += hold & (1 << state.extra) - 1;
            hold >>>= state.extra;
            bits -= state.extra;
            state.back += state.extra;
          }
          if (state.offset > state.dmax) {
            strm.msg = "invalid distance too far back";
            state.mode = BAD;
            break;
          }
          state.mode = MATCH;
        case MATCH:
          if (left === 0) {
            break inf_leave;
          }
          copy = _out - left;
          if (state.offset > copy) {
            copy = state.offset - copy;
            if (copy > state.whave) {
              if (state.sane) {
                strm.msg = "invalid distance too far back";
                state.mode = BAD;
                break;
              }
            }
            if (copy > state.wnext) {
              copy -= state.wnext;
              from2 = state.wsize - copy;
            } else {
              from2 = state.wnext - copy;
            }
            if (copy > state.length) {
              copy = state.length;
            }
            from_source = state.window;
          } else {
            from_source = output;
            from2 = put - state.offset;
            copy = state.length;
          }
          if (copy > left) {
            copy = left;
          }
          left -= copy;
          state.length -= copy;
          do {
            output[put++] = from_source[from2++];
          } while (--copy);
          if (state.length === 0) {
            state.mode = LEN;
          }
          break;
        case LIT:
          if (left === 0) {
            break inf_leave;
          }
          output[put++] = state.length;
          left--;
          state.mode = LEN;
          break;
        case CHECK:
          if (state.wrap) {
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold |= input[next++] << bits;
              bits += 8;
            }
            _out -= left;
            strm.total_out += _out;
            state.total += _out;
            if (state.wrap & 4 && _out) {
              strm.adler = state.check = state.flags ? crc32_1(state.check, output, _out, put - _out) : adler32_1(state.check, output, _out, put - _out);
            }
            _out = left;
            if (state.wrap & 4 && (state.flags ? hold : zswap32(hold)) !== state.check) {
              strm.msg = "incorrect data check";
              state.mode = BAD;
              break;
            }
            hold = 0;
            bits = 0;
          }
          state.mode = LENGTH;
        case LENGTH:
          if (state.wrap && state.flags) {
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.wrap & 4 && hold !== (state.total & 4294967295)) {
              strm.msg = "incorrect length check";
              state.mode = BAD;
              break;
            }
            hold = 0;
            bits = 0;
          }
          state.mode = DONE;
        case DONE:
          ret = Z_STREAM_END$1;
          break inf_leave;
        case BAD:
          ret = Z_DATA_ERROR$1;
          break inf_leave;
        case MEM:
          return Z_MEM_ERROR$1;
        case SYNC:
        default:
          return Z_STREAM_ERROR$1;
      }
    }
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  if (state.wsize || _out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH$1)) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out))
      ;
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if (state.wrap & 4 && _out) {
    strm.adler = state.check = state.flags ? crc32_1(state.check, output, _out, strm.next_out - _out) : adler32_1(state.check, output, _out, strm.next_out - _out);
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if ((_in === 0 && _out === 0 || flush === Z_FINISH$1) && ret === Z_OK$1) {
    ret = Z_BUF_ERROR$1;
  }
  return ret;
};
var inflateEnd = (strm) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  let state = strm.state;
  if (state.window) {
    state.window = null;
  }
  strm.state = null;
  return Z_OK$1;
};
var inflateGetHeader = (strm, head) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  if ((state.wrap & 2) === 0) {
    return Z_STREAM_ERROR$1;
  }
  state.head = head;
  head.done = false;
  return Z_OK$1;
};
var inflateSetDictionary = (strm, dictionary) => {
  const dictLength = dictionary.length;
  let state;
  let dictid;
  let ret;
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  state = strm.state;
  if (state.wrap !== 0 && state.mode !== DICT) {
    return Z_STREAM_ERROR$1;
  }
  if (state.mode === DICT) {
    dictid = 1;
    dictid = adler32_1(dictid, dictionary, dictLength, 0);
    if (dictid !== state.check) {
      return Z_DATA_ERROR$1;
    }
  }
  ret = updatewindow(strm, dictionary, dictLength, dictLength);
  if (ret) {
    state.mode = MEM;
    return Z_MEM_ERROR$1;
  }
  state.havedict = 1;
  return Z_OK$1;
};
var inflateReset_1 = inflateReset;
var inflateReset2_1 = inflateReset2;
var inflateResetKeep_1 = inflateResetKeep;
var inflateInit_1 = inflateInit;
var inflateInit2_1 = inflateInit2;
var inflate_2$1 = inflate$2;
var inflateEnd_1 = inflateEnd;
var inflateGetHeader_1 = inflateGetHeader;
var inflateSetDictionary_1 = inflateSetDictionary;
var inflateInfo = "pako inflate (from Nodeca project)";
var inflate_1$2 = {
  inflateReset: inflateReset_1,
  inflateReset2: inflateReset2_1,
  inflateResetKeep: inflateResetKeep_1,
  inflateInit: inflateInit_1,
  inflateInit2: inflateInit2_1,
  inflate: inflate_2$1,
  inflateEnd: inflateEnd_1,
  inflateGetHeader: inflateGetHeader_1,
  inflateSetDictionary: inflateSetDictionary_1,
  inflateInfo
};
function GZheader() {
  this.text = 0;
  this.time = 0;
  this.xflags = 0;
  this.os = 0;
  this.extra = null;
  this.extra_len = 0;
  this.name = "";
  this.comment = "";
  this.hcrc = 0;
  this.done = false;
}
var gzheader = GZheader;
var toString = Object.prototype.toString;
var {
  Z_NO_FLUSH,
  Z_FINISH,
  Z_OK,
  Z_STREAM_END,
  Z_NEED_DICT,
  Z_STREAM_ERROR,
  Z_DATA_ERROR,
  Z_MEM_ERROR,
  Z_BUF_ERROR
} = constants$2;
var defaultOptions = {
  chunkSize: 1024 * 64,
  windowBits: 15,
  to: ""
};
function Inflate$1(options) {
  this.options = common.assign({}, defaultOptions, options || {});
  const opt = this.options;
  if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
    opt.windowBits = -opt.windowBits;
    if (opt.windowBits === 0) {
      opt.windowBits = -15;
    }
  }
  if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
    opt.windowBits += 32;
  }
  if (opt.windowBits > 15 && opt.windowBits < 48) {
    if ((opt.windowBits & 15) === 0) {
      opt.windowBits |= 15;
    }
  }
  this.err = 0;
  this.msg = "";
  this.ended = false;
  this.chunks = [];
  this.strm = new zstream;
  this.strm.avail_out = 0;
  let status = inflate_1$2.inflateInit2(this.strm, opt.windowBits);
  if (status !== Z_OK) {
    throw new Error(messages[status]);
  }
  this.header = new gzheader;
  inflate_1$2.inflateGetHeader(this.strm, this.header);
  if (opt.dictionary) {
    if (typeof opt.dictionary === "string") {
      opt.dictionary = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
      opt.dictionary = new Uint8Array(opt.dictionary);
    }
    if (opt.raw) {
      status = inflate_1$2.inflateSetDictionary(this.strm, opt.dictionary);
      if (status !== Z_OK) {
        throw new Error(messages[status]);
      }
    }
  }
}
Inflate$1.prototype.push = function(data, flush_mode) {
  const strm = this.strm;
  const chunkSize = this.options.chunkSize;
  const dictionary = this.options.dictionary;
  let status, _flush_mode, last_avail_out;
  if (this.ended)
    return false;
  if (flush_mode === ~~flush_mode)
    _flush_mode = flush_mode;
  else
    _flush_mode = flush_mode === true ? Z_FINISH : Z_NO_FLUSH;
  if (toString.call(data) === "[object ArrayBuffer]") {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }
  strm.next_in = 0;
  strm.avail_in = strm.input.length;
  for (;; ) {
    if (strm.avail_out === 0) {
      strm.output = new Uint8Array(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    status = inflate_1$2.inflate(strm, _flush_mode);
    if (status === Z_NEED_DICT && dictionary) {
      status = inflate_1$2.inflateSetDictionary(strm, dictionary);
      if (status === Z_OK) {
        status = inflate_1$2.inflate(strm, _flush_mode);
      } else if (status === Z_DATA_ERROR) {
        status = Z_NEED_DICT;
      }
    }
    while (strm.avail_in > 0 && status === Z_STREAM_END && strm.state.wrap & 2 && strm.state.flags !== 0 && strm.input[strm.next_in] !== 0) {
      inflate_1$2.inflateReset(strm);
      status = inflate_1$2.inflate(strm, _flush_mode);
    }
    switch (status) {
      case Z_STREAM_ERROR:
      case Z_DATA_ERROR:
      case Z_NEED_DICT:
      case Z_MEM_ERROR:
        this.onEnd(status);
        this.ended = true;
        return false;
    }
    last_avail_out = strm.avail_out;
    if (strm.next_out) {
      if (strm.avail_out === 0 || status === Z_STREAM_END || _flush_mode > 0) {
        if (this.options.to === "string") {
          let next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
          let tail = strm.next_out - next_out_utf8;
          let utf8str = strings.buf2string(strm.output, next_out_utf8);
          strm.next_out = tail;
          strm.avail_out = chunkSize - tail;
          if (tail)
            strm.output.set(strm.output.subarray(next_out_utf8, next_out_utf8 + tail), 0);
          this.onData(utf8str);
        } else {
          this.onData(strm.output.length === strm.next_out ? strm.output : strm.output.subarray(0, strm.next_out));
          strm.avail_out = 0;
          strm.next_out = 0;
        }
      }
    }
    if ((status === Z_OK || status === Z_BUF_ERROR) && last_avail_out === 0)
      continue;
    if (status === Z_STREAM_END) {
      status = inflate_1$2.inflateEnd(this.strm);
      this.onEnd(status);
      this.ended = true;
      return true;
    }
    if (strm.avail_in === 0) {
      if (_flush_mode === Z_FINISH) {
        status = inflate_1$2.inflateEnd(this.strm);
        this.onEnd(status === Z_OK ? Z_BUF_ERROR : status);
        this.ended = true;
        return false;
      }
      break;
    }
  }
  return true;
};
Inflate$1.prototype.onData = function(chunk) {
  this.chunks.push(chunk);
};
Inflate$1.prototype.onEnd = function(status) {
  if (status === Z_OK) {
    if (this.options.to === "string") {
      this.result = this.chunks.join("");
    } else {
      this.result = common.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};
function inflate$1(input, options) {
  const inflator = new Inflate$1(options);
  inflator.push(input, true);
  if (inflator.err)
    throw inflator.msg || messages[inflator.err];
  return inflator.result;
}
function inflateRaw$1(input, options) {
  options = options || {};
  options.raw = true;
  return inflate$1(input, options);
}
var Inflate_1$1 = Inflate$1;
var inflate_2 = inflate$1;
var inflateRaw_1$1 = inflateRaw$1;
var ungzip$1 = inflate$1;
var constants = constants$2;
var inflate_1$1 = {
  Inflate: Inflate_1$1,
  inflate: inflate_2,
  inflateRaw: inflateRaw_1$1,
  ungzip: ungzip$1,
  constants
};
var { Deflate, deflate, deflateRaw, gzip } = deflate_1$1;
var { Inflate, inflate, inflateRaw, ungzip } = inflate_1$1;
var Deflate_1 = Deflate;
var Inflate_1 = Inflate;
var constants_1 = constants$2;

// node_modules/@moq/flate/index.js
var DEFAULT_LEVEL = 6;
var DEFAULT_MAX_FRAME_SIZE = 64 * 1024 * 1024;
var SYNC_FLUSH_TAIL = new Uint8Array([0, 0, 255, 255]);
function concat(chunks, total) {
  if (chunks.length === 1)
    return chunks[0];
  const out = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.length;
  }
  return out;
}

class Encoder {
  #deflate;
  #chunks = [];
  #total = 0;
  constructor(options = {}) {
    const level = options.level ?? DEFAULT_LEVEL;
    this.#deflate = new Deflate_1({ raw: true, level });
    this.#deflate.onData = (chunk) => {
      const bytes = chunk;
      this.#chunks.push(bytes);
      this.#total += bytes.length;
    };
  }
  frame(payload) {
    if (payload.length === 0)
      return payload;
    this.#chunks = [];
    this.#total = 0;
    this.#deflate.push(payload, constants_1.Z_SYNC_FLUSH);
    const out = new Uint8Array(this.#total - SYNC_FLUSH_TAIL.length);
    let offset = 0;
    for (const chunk of this.#chunks) {
      if (offset >= out.length)
        break;
      const take = Math.min(chunk.length, out.length - offset);
      out.set(chunk.subarray(0, take), offset);
      offset += take;
    }
    return out;
  }
}

class Decoder {
  #inflate = new Inflate_1({ raw: true });
  #chunks = [];
  #total = 0;
  #tooLarge = false;
  #maxFrameSize;
  constructor(options = {}) {
    this.#maxFrameSize = options.maxFrameSize ?? DEFAULT_MAX_FRAME_SIZE;
    this.#inflate.onData = (chunk) => {
      const bytes = chunk;
      this.#total += bytes.length;
      if (this.#total > this.#maxFrameSize) {
        this.#tooLarge = true;
        return;
      }
      this.#chunks.push(bytes);
    };
  }
  frame(slice) {
    if (slice.length === 0)
      return slice;
    this.#chunks = [];
    this.#total = 0;
    this.#tooLarge = false;
    this.#inflate.push(slice, false);
    this.#inflate.push(SYNC_FLUSH_TAIL, constants_1.Z_SYNC_FLUSH);
    if (this.#inflate.err)
      throw new Error(`decompression failed: ${this.#inflate.msg}`);
    if (this.#tooLarge)
      throw new Error(`decompressed frame exceeded ${this.#maxFrameSize} bytes`);
    return concat(this.#chunks, this.#total);
  }
}

// node_modules/@moq/json/diff.js
function isObject2(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function diff(oldVal, newVal) {
  if (isObject2(oldVal) && isObject2(newVal)) {
    const patch = {};
    const forced = { value: false };
    diffObjects(oldVal, newVal, patch, forced);
    return { patch, forcedSnapshot: forced.value };
  }
  return { patch: newVal, forcedSnapshot: true };
}
function diffObjects(oldObj, newObj, patch, forced) {
  for (const key of Object.keys(oldObj)) {
    if (!(key in newObj))
      patch[key] = null;
  }
  for (const key of Object.keys(newObj)) {
    const newV = newObj[key];
    const oldV = oldObj[key];
    const inOld = key in oldObj;
    if (inOld && deepEqual(oldV, newV))
      continue;
    if (isObject2(oldV) && isObject2(newV)) {
      const sub = {};
      diffObjects(oldV, newV, sub, forced);
      if (Object.keys(sub).length > 0)
        patch[key] = sub;
      continue;
    }
    if (newV === null) {
      forced.value = true;
    }
    patch[key] = newV;
  }
}
function merge(target, patch) {
  if (!isObject2(patch))
    return patch;
  const base = isObject2(target) ? { ...target } : {};
  for (const [key, value] of Object.entries(patch)) {
    if (value === null) {
      delete base[key];
    } else {
      base[key] = merge(base[key], value);
    }
  }
  return base;
}
function deepEqual(a, b) {
  if (a === b)
    return true;
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((item, i) => deepEqual(item, b[i]));
  }
  if (isObject2(a) && isObject2(b)) {
    const keys = Object.keys(a);
    if (keys.length !== Object.keys(b).length)
      return false;
    return keys.every((key) => (key in b) && deepEqual(a[key], b[key]));
  }
  return false;
}

// node_modules/@moq/json/consumer.js
class Consumer {
  #track;
  #schema;
  #decompress;
  #group;
  #decoder;
  #current;
  #framesRead = 0;
  constructor(track2, config2 = {}) {
    this.#track = track2;
    this.#schema = config2.schema;
    this.#decompress = config2.compression ?? false;
  }
  async next() {
    for (;; ) {
      if (!this.#group) {
        this.#group = await this.#track.nextGroupOrdered();
        if (!this.#group)
          return;
        this.#current = undefined;
        this.#framesRead = 0;
        this.#decoder = undefined;
      }
      let value;
      let advanced = false;
      for (let frame2 = this.#group.tryReadFrame();frame2 !== undefined; frame2 = this.#group.tryReadFrame()) {
        value = this.#apply(frame2);
        advanced = true;
      }
      if (advanced)
        return value;
      const frame = await this.#group.readFrame();
      if (frame === undefined) {
        this.#group = undefined;
        continue;
      }
      return this.#apply(frame);
    }
  }
  async* [Symbol.asyncIterator]() {
    for (;; ) {
      const value = await this.next();
      if (value === undefined)
        return;
      yield value;
    }
  }
  #apply(frame) {
    let payload = frame;
    if (this.#decompress) {
      this.#decoder ??= new Decoder;
      payload = this.#decoder.frame(frame);
    }
    const parsed = JSON.parse(new TextDecoder().decode(payload));
    if (this.#framesRead === 0) {
      this.#current = parsed;
    } else {
      this.#current = merge(this.#current, parsed);
    }
    this.#framesRead += 1;
    return this.#schema ? this.#schema.parse(this.#current) : this.#current;
  }
}
// node_modules/@moq/json/producer.js
var MAX_DELTA_FRAMES = 256;
var DEFAULT_DELTA_RATIO = 8;

class Producer {
  #config;
  #track;
  #group;
  #last;
  #deltaBytes = 0;
  #snapshotLen = 0;
  #groupFrames = 0;
  #compress = false;
  #encoder;
  #outputs;
  #value;
  constructor(trackOrConfig, config2 = {}) {
    if (trackOrConfig instanceof Track) {
      this.#track = trackOrConfig;
      this.#config = config2;
    } else {
      this.#config = trackOrConfig ?? {};
      this.#outputs = new Set;
      this.#value = this.#config.initial;
    }
    this.#compress = this.#config.compression ?? false;
  }
  get value() {
    return this.#track ? this.#last : this.#value;
  }
  update(value) {
    if (!this.#track) {
      this.#value = value;
      for (const output of this.#outputs ?? []) {
        try {
          output.update(value);
        } catch (err2) {
          this.#outputs?.delete(output);
          try {
            output.finish();
          } catch {}
          console.warn("dropping failed json subscriber during fan-out", err2);
        }
      }
      return;
    }
    const valid = this.#config.schema ? this.#config.schema.parse(value) : value;
    const text = JSON.stringify(valid);
    const json = JSON.parse(text);
    if (this.#last !== undefined && deepEqual(this.#last, json))
      return;
    const snapshot = new TextEncoder().encode(text);
    const delta = this.#delta(json);
    if (delta && this.#group) {
      this.#deltaBytes += this.#writeDelta(this.#group, delta);
      this.#groupFrames += 1;
    } else {
      this.#snapshot(this.#track, snapshot);
    }
    this.#last = json;
  }
  mutate(fn) {
    const base = (this.#track ? this.#last : this.#value) ?? this.#config.initial;
    if (base === undefined) {
      throw new Error("mutate() requires a prior update() or `initial` in the config");
    }
    const value = structuredClone(base);
    fn(value);
    this.update(value);
  }
  serve(track2, effect, opts) {
    if (!this.#outputs) {
      throw new Error("serve() is only available on a track-less Producer");
    }
    const config2 = opts?.compression === undefined ? this.#config : { ...this.#config, compression: opts.compression };
    const output = new Producer(track2, config2);
    if (this.#value !== undefined)
      output.update(this.#value);
    this.#outputs.add(output);
    effect.cleanup(() => {
      this.#outputs?.delete(output);
      output.finish();
    });
  }
  finish() {
    if (!this.#track) {
      for (const output of this.#outputs ?? [])
        output.finish();
      this.#outputs?.clear();
      return;
    }
    this.#group?.close();
    this.#group = undefined;
    this.#track.close();
  }
  get #deltaRatio() {
    return this.#config.deltaRatio ?? DEFAULT_DELTA_RATIO;
  }
  #delta(json) {
    const ratio = this.#deltaRatio;
    if (ratio === 0)
      return;
    if (this.#last === undefined)
      return;
    if (!this.#group || this.#groupFrames >= MAX_DELTA_FRAMES)
      return;
    if (this.#deltaBytes > ratio * this.#snapshotLen)
      return;
    const result = diff(this.#last, json);
    if (result.forcedSnapshot)
      return;
    return new TextEncoder().encode(JSON.stringify(result.patch));
  }
  #snapshot(track2, snapshot) {
    this.#group?.close();
    const group2 = track2.appendGroup();
    this.#snapshotLen = this.#writeSnapshot(group2, snapshot);
    this.#deltaBytes = 0;
    this.#groupFrames = 1;
    if (this.#deltaRatio !== 0) {
      this.#group = group2;
    } else {
      group2.close();
      this.#group = undefined;
    }
  }
  #writeSnapshot(group2, frame) {
    if (!this.#compress) {
      group2.writeFrame(frame);
      return frame.length;
    }
    this.#encoder = new Encoder;
    const slice = this.#encoder.frame(frame);
    group2.writeFrame(slice);
    return slice.length;
  }
  #writeDelta(group2, frame) {
    if (!this.#compress) {
      group2.writeFrame(frame);
      return frame.length;
    }
    if (!this.#encoder)
      throw new Error("compressed delta requires an open group");
    const slice = this.#encoder.frame(frame);
    group2.writeFrame(slice);
    return slice.length;
  }
}
// node_modules/@moq/hang/catalog/video.js
var TrackSchema2 = object({
  name: string2()
});
var VideoConfigSchema = object({
  codec: string2(),
  container: ContainerSchema,
  description: optional(string2()),
  codedWidth: optional(u53Schema),
  codedHeight: optional(u53Schema),
  displayAspectWidth: optional(u53Schema),
  displayAspectHeight: optional(u53Schema),
  framerate: optional(number2()),
  bitrate: optional(u53Schema),
  optimizeForLatency: optional(boolean2()),
  jitter: optional(u53Schema)
});
var VideoSchema = union([
  object({
    renditions: record(string2(), VideoConfigSchema),
    display: optional(object({
      width: u53Schema,
      height: u53Schema
    })),
    rotation: optional(number2()),
    flip: optional(boolean2())
  }),
  pipe(array(object({
    track: TrackSchema2,
    config: VideoConfigSchema
  })), transform((arr) => {
    const config2 = arr[0]?.config;
    return {
      renditions: Object.fromEntries(arr.map((item) => [item.track.name, item.config])),
      display: config2?.displayAspectWidth !== undefined && config2?.displayAspectHeight !== undefined ? { width: config2.displayAspectWidth, height: config2.displayAspectHeight } : undefined,
      rotation: undefined,
      flip: undefined
    };
  }))
]);

// node_modules/@moq/hang/catalog/root.js
var RootSchema = looseObject({
  video: optional(VideoSchema),
  audio: optional(AudioSchema)
});

// node_modules/@moq/hang/catalog/consumer.js
class Consumer2 extends Consumer {
  constructor(track2, config2 = {}) {
    super(track2, {
      schema: config2.schema ?? RootSchema,
      compression: config2.compression
    });
  }
}

// node_modules/@moq/hang/catalog/format.js
var TRACK = "catalog.json";
var TRACK_COMPRESSED = "catalog.json.z";
var FORMATS = ["hang", "msf"];
var DEFAULT_FORMAT = "hang";
function detectFormat(name) {
  for (const format of FORMATS) {
    if (name.endsWith(`.${format}`))
      return format;
  }
  return;
}

// node_modules/@moq/hang/catalog/priority.js
var PRIORITY = {
  catalog: 100,
  audio: 80,
  video: 60
};

// node_modules/@moq/hang/catalog/producer.js
class Producer2 extends Producer {
  constructor(config2 = {}) {
    super({
      initial: {},
      schema: config2.schema ?? RootSchema,
      deltaRatio: config2.deltaRatio ?? 0
    });
  }
}

// node_modules/@moq/loc/index.js
var exports_loc = {};
__export(exports_loc, {
  Producer: () => Producer3,
  Format: () => Format
});
var PROP_TIMESTAMP = 6;
var PROP_TIMESCALE = 8;
var DEFAULT_TIMESCALE = 1e6;

class Format {
  decode(frame) {
    const [propsLen, afterLen] = exports_varint.decode(frame);
    if (afterLen.byteLength < propsLen) {
      throw new Error("loc: properties_length exceeds frame size");
    }
    const props = afterLen.subarray(0, propsLen);
    const payload = afterLen.subarray(propsLen);
    let timestamp;
    let timescale;
    let prevType = 0;
    let first = true;
    let cursor = props;
    while (cursor.byteLength > 0) {
      const [delta, afterDelta] = exports_varint.decode(cursor);
      const abs = first ? delta : prevType + delta;
      first = false;
      prevType = abs;
      cursor = afterDelta;
      if (abs % 2 === 0) {
        const [value, afterValue] = exports_varint.decode(cursor);
        cursor = afterValue;
        if (abs === PROP_TIMESTAMP) {
          timestamp = value;
        } else if (abs === PROP_TIMESCALE) {
          if (value === 0) {
            throw new Error("loc: timescale property must be non-zero");
          }
          timescale = value;
        }
      } else {
        const [len, afterLenInner] = exports_varint.decode(cursor);
        if (afterLenInner.byteLength < len) {
          throw new Error("loc: property length exceeds remaining bytes");
        }
        cursor = afterLenInner.subarray(len);
      }
    }
    if (timestamp === undefined) {
      throw new Error("loc: frame missing required timestamp property");
    }
    const activeTimescale = timescale ?? DEFAULT_TIMESCALE;
    const micros = Math.round(timestamp * DEFAULT_TIMESCALE / activeTimescale);
    return [{ data: payload, timestamp: micros, keyframe: false }];
  }
}

class Producer3 {
  #track;
  #group;
  constructor(track2) {
    this.#track = track2;
  }
  encode(data, timestamp, keyframe) {
    if (keyframe) {
      this.#group?.close();
      this.#group = this.#track.appendGroup();
    } else if (!this.#group) {
      throw new Error("must start with a keyframe");
    }
    this.#group?.writeFrame(this.#encode(data, timestamp));
  }
  #encode(source, timestamp) {
    const propTypeBytes = exports_varint.encode(PROP_TIMESTAMP);
    const propValueBytes = exports_varint.encode(timestamp);
    const propsLen = propTypeBytes.byteLength + propValueBytes.byteLength;
    const propsLenBytes = exports_varint.encode(propsLen);
    const payloadSize = source.byteLength;
    const total = propsLenBytes.byteLength + propsLen + payloadSize;
    const out = new Uint8Array(total);
    let offset = 0;
    out.set(propsLenBytes, offset);
    offset += propsLenBytes.byteLength;
    out.set(propTypeBytes, offset);
    offset += propTypeBytes.byteLength;
    out.set(propValueBytes, offset);
    offset += propValueBytes.byteLength;
    const payloadView = out.subarray(offset);
    if (source instanceof Uint8Array) {
      payloadView.set(source);
    } else {
      source.copyTo(payloadView);
    }
    return out;
  }
  close(err2) {
    this.#group?.close();
    this.#track.close(err2);
  }
}

// node_modules/@moq/hang/container/cmaf/index.js
var exports_cmaf = {};
__export(exports_cmaf, {
  encodeDataSegment: () => encodeDataSegment,
  decodeTimestamp: () => decodeTimestamp,
  decodeInitSegment: () => decodeInitSegment,
  decodeDataSegment: () => decodeDataSegment,
  createVideoInitSegment: () => createVideoInitSegment,
  createAudioInitSegment: () => createAudioInitSegment,
  Format: () => Format2
});

// node_modules/@svta/cml-utils/dist/index.js
function isArrayBufferLike(value) {
  return value instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && value instanceof SharedArrayBuffer;
}
var UTF_16 = "utf-16";
var UTF_16_BE = "utf-16be";
var UTF_16_LE = "utf-16le";
var UTF_8 = "utf-8";
function decodeText(data, options = {}) {
  let view;
  if (isArrayBufferLike(data))
    view = new DataView(data);
  else
    view = new DataView(data.buffer, data.byteOffset, data.byteLength);
  let byteOffset = 0;
  let { encoding } = options;
  if (!encoding) {
    const first = view.getUint8(0);
    const second = view.getUint8(1);
    if (first == 239 && second == 187 && view.getUint8(2) == 191) {
      encoding = UTF_8;
      byteOffset = 3;
    } else if (first == 254 && second == 255) {
      encoding = UTF_16_BE;
      byteOffset = 2;
    } else if (first == 255 && second == 254) {
      encoding = UTF_16_LE;
      byteOffset = 2;
    } else
      encoding = UTF_8;
  }
  if (typeof TextDecoder !== "undefined")
    return new TextDecoder(encoding).decode(view);
  const { byteLength } = view;
  const endian = encoding !== UTF_16_BE;
  let str = "";
  let char;
  while (byteOffset < byteLength) {
    switch (encoding) {
      case UTF_8:
        char = view.getUint8(byteOffset);
        if (char < 128)
          byteOffset++;
        else if (char >= 194 && char <= 223)
          if (byteOffset + 1 < byteLength) {
            const byte2 = view.getUint8(byteOffset + 1);
            if (byte2 >= 128 && byte2 <= 191) {
              char = (char & 31) << 6 | byte2 & 63;
              byteOffset += 2;
            } else
              byteOffset++;
          } else
            byteOffset++;
        else if (char >= 224 && char <= 239)
          if (byteOffset + 2 <= byteLength - 1) {
            const byte2 = view.getUint8(byteOffset + 1);
            const byte3 = view.getUint8(byteOffset + 2);
            if (byte2 >= 128 && byte2 <= 191 && byte3 >= 128 && byte3 <= 191) {
              char = (char & 15) << 12 | (byte2 & 63) << 6 | byte3 & 63;
              byteOffset += 3;
            } else
              byteOffset++;
          } else
            byteOffset++;
        else if (char >= 240 && char <= 244)
          if (byteOffset + 3 <= byteLength - 1) {
            const byte2 = view.getUint8(byteOffset + 1);
            const byte3 = view.getUint8(byteOffset + 2);
            const byte4 = view.getUint8(byteOffset + 3);
            if (byte2 >= 128 && byte2 <= 191 && byte3 >= 128 && byte3 <= 191 && byte4 >= 128 && byte4 <= 191) {
              char = (char & 7) << 18 | (byte2 & 63) << 12 | (byte3 & 63) << 6 | byte4 & 63;
              byteOffset += 4;
            } else
              byteOffset++;
          } else
            byteOffset++;
        else
          byteOffset++;
        break;
      case UTF_16_BE:
      case UTF_16:
      case UTF_16_LE:
        char = view.getUint16(byteOffset, endian);
        byteOffset += 2;
        break;
    }
    str += String.fromCodePoint(char);
  }
  return str;
}
function encodeText(data) {
  return new TextEncoder().encode(data);
}

// node_modules/@svta/cml-iso-bmff/dist/index.js
function createWriterConfig(config2) {
  return { writers: config2?.writers ?? {} };
}
var CONTAINERS = [
  "dinf",
  "edts",
  "grpl",
  "mdia",
  "meco",
  "mfra",
  "minf",
  "moof",
  "moov",
  "mvex",
  "schi",
  "sinf",
  "stbl",
  "strk",
  "traf",
  "trak",
  "tref",
  "udta",
  "vttc"
];
function isContainer(box) {
  return "boxes" in box || CONTAINERS.includes(box.type);
}
var UTF8 = "utf8";
var UINT = "uint";
var TEMPLATE = "template";
var STRING = "string";
var INT = "int";
var DATA = "data";
var IsoBoxWriteView = class {
  constructor(type, size2) {
    this.writeUint = (value, size$1) => {
      const { dataView, cursor } = this;
      switch (size$1) {
        case 1:
          dataView.setUint8(cursor, value);
          break;
        case 2:
          dataView.setUint16(cursor, value);
          break;
        case 3: {
          const s1 = (value & 16776960) >> 8;
          const s2 = value & 255;
          dataView.setUint16(cursor, s1);
          dataView.setUint8(cursor + 2, s2);
          break;
        }
        case 4:
          dataView.setUint32(cursor, value);
          break;
        case 8: {
          const s1 = Math.floor(value / Math.pow(2, 32));
          const s2 = value - s1 * Math.pow(2, 32);
          dataView.setUint32(cursor, s1);
          dataView.setUint32(cursor + 4, s2);
          break;
        }
      }
      this.cursor += size$1;
    };
    this.writeInt = (value, size$1) => {
      const { dataView, cursor } = this;
      switch (size$1) {
        case 1:
          dataView.setInt8(cursor, value);
          break;
        case 2:
          dataView.setInt16(cursor, value);
          break;
        case 4:
          dataView.setInt32(cursor, value);
          break;
        case 8:
          const s1 = Math.floor(value / Math.pow(2, 32));
          const s2 = value - s1 * Math.pow(2, 32);
          dataView.setUint32(cursor, s1);
          dataView.setUint32(cursor + 4, s2);
          break;
      }
      this.cursor += size$1;
    };
    this.writeString = (value) => {
      for (let c = 0, len = value.length;c < len; c++)
        this.writeUint(value.charCodeAt(c), 1);
    };
    this.writeTerminatedString = (value) => {
      if (value.length === 0)
        return;
      for (let c = 0, len = value.length;c < len; c++)
        this.writeUint(value.charCodeAt(c), 1);
      this.writeUint(0, 1);
    };
    this.writeUtf8TerminatedString = (value) => {
      const bytes = encodeText(value);
      new Uint8Array(this.dataView.buffer).set(bytes, this.cursor);
      this.cursor += bytes.length;
      this.writeUint(0, 1);
    };
    this.writeBytes = (data) => {
      if (!Array.isArray(data))
        data = [data];
      for (const bytes of data) {
        new Uint8Array(this.dataView.buffer).set(bytes, this.cursor);
        this.cursor += bytes.length;
      }
    };
    this.writeArray = (data, type$1, size$1, length) => {
      const write = type$1 === UINT ? this.writeUint : type$1 === TEMPLATE ? this.writeTemplate : this.writeInt;
      for (let i = 0;i < length; i++)
        write(data[i] ?? 0, size$1);
    };
    this.writeTemplate = (value, size$1) => {
      const shift = size$1 === 4 ? 16 : 8;
      const fixedPoint = Math.round(value * Math.pow(2, shift));
      this.writeUint(fixedPoint, size$1);
    };
    this.writeBoxHeader = (type$1, size$1) => {
      if (size$1 > 4294967295) {
        this.writeUint(1, 4);
        this.writeString(type$1);
        this.writeUint(size$1, 8);
      } else {
        this.writeUint(size$1, 4);
        this.writeString(type$1);
      }
    };
    this.dataView = new DataView(new ArrayBuffer(size2));
    this.cursor = 0;
    this.writeBoxHeader(type, size2);
  }
  get buffer() {
    return this.dataView.buffer;
  }
  get byteLength() {
    return this.dataView.byteLength;
  }
  get byteOffset() {
    return this.dataView.byteOffset;
  }
  writeFullBox(version2, flags) {
    this.writeUint(version2, 1);
    this.writeUint(flags, 3);
  }
};
function writeBoxes(boxes, config2) {
  return Array.from(boxes, (box) => writeBox(box, config2));
}
function writeChildBoxes(boxes, config2) {
  const bytes = writeBoxes(boxes, config2);
  return {
    bytes,
    size: bytes.reduce((size2, byte) => size2 + byte.byteLength, 0)
  };
}
function writeContainerBox(box, config2) {
  const headerSize = 8;
  const { bytes, size: size2 } = writeChildBoxes(box.boxes, config2);
  const totalSize = headerSize + size2;
  const writer = new IsoBoxWriteView(box.type, totalSize);
  writer.writeBytes(bytes);
  return writer;
}
function writeBox(box, config2) {
  let view = null;
  if ("type" in box) {
    const { type } = box;
    const writer = config2.writers?.[type];
    if (writer)
      view = writer(box, config2);
    else if (isContainer(box))
      view = writeContainerBox(box, config2);
    else if ("view" in box)
      view = box.view;
    if (!view)
      throw new Error(`No writer found for box type: ${type}`);
  }
  if ("buffer" in box)
    view = box;
  if (!view)
    throw new Error("Invalid box");
  return new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
}
function readData(dataView, offset, size2) {
  const length = size2 > 0 ? size2 : dataView.byteLength - (offset - dataView.byteOffset);
  return new Uint8Array(dataView.buffer, offset, Math.max(length, 0));
}
function readInt(dataView, offset, size2) {
  let result = NaN;
  const cursor = offset - dataView.byteOffset;
  switch (size2) {
    case 1:
      result = dataView.getInt8(cursor);
      break;
    case 2:
      result = dataView.getInt16(cursor);
      break;
    case 4:
      result = dataView.getInt32(cursor);
      break;
    case 8:
      const s1 = dataView.getInt32(cursor);
      const s2 = dataView.getInt32(cursor + 4);
      result = s1 * Math.pow(2, 32) + s2;
      break;
  }
  return result;
}
function readUint(dataView, offset, size2) {
  const cursor = offset - dataView.byteOffset;
  let value = NaN;
  let s1;
  let s2;
  switch (size2) {
    case 1:
      value = dataView.getUint8(cursor);
      break;
    case 2:
      value = dataView.getUint16(cursor);
      break;
    case 3:
      s1 = dataView.getUint16(cursor);
      s2 = dataView.getUint8(cursor + 2);
      value = (s1 << 8) + s2;
      break;
    case 4:
      value = dataView.getUint32(cursor);
      break;
    case 8:
      s1 = dataView.getUint32(cursor);
      s2 = dataView.getUint32(cursor + 4);
      value = s1 * Math.pow(2, 32) + s2;
      break;
  }
  return value;
}
function readString(dataView, offset, length) {
  let str = "";
  for (let c = 0;c < length; c++) {
    const char = readUint(dataView, offset + c, 1);
    str += String.fromCharCode(char);
  }
  return str;
}
function readTemplate(dataView, offset, size2) {
  const half = size2 / 2;
  return readUint(dataView, offset, half) + readUint(dataView, offset + half, half) / Math.pow(2, half);
}
function readTerminatedString(dataView, offset) {
  let str = "";
  let cursor = offset;
  while (cursor - dataView.byteOffset < dataView.byteLength) {
    const char = readUint(dataView, cursor, 1);
    if (char === 0)
      break;
    str += String.fromCharCode(char);
    cursor++;
  }
  return str;
}
function readUtf8String(dataView, offset) {
  const length = dataView.byteLength - (offset - dataView.byteOffset);
  return length > 0 ? decodeText(new DataView(dataView.buffer, offset, length), { encoding: UTF_8 }) : "";
}
function readUtf8TerminatedString(dataView, offset) {
  const length = dataView.byteLength - (offset - dataView.byteOffset);
  let data = "";
  if (length > 0) {
    const view = new DataView(dataView.buffer, offset, length);
    let l = 0;
    for (;l < length; l++)
      if (view.getUint8(l) === 0)
        break;
    data = decodeText(new DataView(dataView.buffer, offset, l), { encoding: UTF_8 });
  }
  return data;
}
var IsoBoxReadView = class IsoBoxReadView2 {
  constructor(raw, config2) {
    this.truncated = false;
    this.slice = (offset, size2) => {
      const isoView = new IsoBoxReadView2(new DataView(this.dataView.buffer, offset, size2), this.config);
      const headerSize = this.offset - offset;
      const bodySize = size2 - headerSize;
      this.offset += bodySize;
      isoView.jump(headerSize);
      return isoView;
    };
    this.read = (type, size2 = 0) => {
      const { dataView, offset } = this;
      let result;
      let cursor = size2;
      switch (type) {
        case UINT:
          result = readUint(dataView, offset, size2);
          break;
        case INT:
          result = readInt(dataView, offset, size2);
          break;
        case TEMPLATE:
          result = readTemplate(dataView, offset, size2);
          break;
        case STRING:
          if (size2 === -1) {
            result = readTerminatedString(dataView, offset);
            cursor = result.length + 1;
          } else
            result = readString(dataView, offset, size2);
          break;
        case DATA:
          result = readData(dataView, offset, size2);
          cursor = result.length;
          break;
        case UTF8:
          if (size2 === -1) {
            result = readUtf8TerminatedString(dataView, offset);
            cursor = result.length + 1;
          } else
            result = readUtf8String(dataView, offset);
          break;
        default:
          result = -1;
      }
      this.offset += cursor;
      return result;
    };
    this.readUint = (size2) => {
      return this.read(UINT, size2);
    };
    this.readInt = (size2) => {
      return this.read(INT, size2);
    };
    this.readString = (size2) => {
      return this.read(STRING, size2);
    };
    this.readTemplate = (size2) => {
      return this.read(TEMPLATE, size2);
    };
    this.readData = (size2) => {
      return this.read(DATA, size2);
    };
    this.readUtf8 = (size2) => {
      return this.read(UTF8, size2);
    };
    this.readFullBox = () => {
      return {
        version: this.readUint(1),
        flags: this.readUint(3)
      };
    };
    this.readArray = (type, size2, length) => {
      const value = [];
      for (let i = 0;i < length; i++)
        value.push(this.read(type, size2));
      return value;
    };
    this.jump = (size2) => {
      this.offset += size2;
    };
    this.readBox = () => {
      const { dataView, offset } = this;
      let cursor = 0;
      const size2 = readUint(dataView, offset, 4);
      const type = readString(dataView, offset + 4, 4);
      const box = {
        size: size2,
        type
      };
      cursor += 8;
      if (box.size === 1) {
        box.largesize = readUint(dataView, offset + cursor, 8);
        cursor += 8;
      }
      const actualSize = box.size === 0 ? this.bytesRemaining : box.largesize ?? box.size;
      if (this.cursor + actualSize > dataView.byteLength) {
        this.truncated = true;
        throw new Error("Truncated box");
      }
      this.jump(cursor);
      if (type === "uuid")
        box.usertype = this.readArray("uint", 1, 16);
      box.view = this.slice(offset, actualSize);
      return box;
    };
    this.readBoxes = (length = -1) => {
      const result = [];
      for (const box of this) {
        result.push(box);
        if (length > 0 && result.length >= length)
          break;
      }
      return result;
    };
    this.readEntries = (length, map) => {
      const result = [];
      for (let i = 0;i < length; i++)
        result.push(map());
      return result;
    };
    this.dataView = isArrayBufferLike(raw) ? new DataView(raw) : raw instanceof DataView ? raw : new DataView(raw.buffer, raw.byteOffset, raw.byteLength);
    this.offset = this.dataView.byteOffset;
    this.config = config2 || {};
  }
  get buffer() {
    return this.dataView.buffer;
  }
  get byteOffset() {
    return this.dataView.byteOffset;
  }
  get byteLength() {
    return this.dataView.byteLength;
  }
  get cursor() {
    return this.offset - this.dataView.byteOffset;
  }
  get done() {
    return this.cursor >= this.dataView.byteLength || this.truncated;
  }
  get bytesRemaining() {
    return this.dataView.byteLength - this.cursor;
  }
  *[Symbol.iterator]() {
    const { readers = {} } = this.config;
    while (!this.done)
      try {
        const box = this.readBox();
        const { type, view } = box;
        const parser = readers[type] || readers[type.trim()];
        if (parser)
          Object.assign(box, parser(view, type));
        if (isContainer(box) && !box.boxes) {
          const boxes = [];
          for (const child of view)
            boxes.push(child);
          box.boxes = boxes;
        }
        yield box;
      } catch (error2) {
        if (error2 instanceof Error && error2.message === "Truncated box")
          break;
        throw error2;
      }
  }
};
function readIsoBoxes(raw, config2) {
  const boxes = [];
  for (const box of new IsoBoxReadView(raw, config2))
    boxes.push(box);
  return boxes;
}
function writeIsoBoxes(boxes, config2) {
  return writeBoxes(boxes, createWriterConfig(config2));
}
function readAudioSampleEntryBox(type, view) {
  const { readArray, readUint: readUint$1, readTemplate: readTemplate$1, readBoxes } = view;
  return {
    type,
    reserved1: readArray(UINT, 1, 6),
    dataReferenceIndex: readUint$1(2),
    reserved2: readArray(UINT, 4, 2),
    channelcount: readUint$1(2),
    samplesize: readUint$1(2),
    preDefined: readUint$1(2),
    reserved3: readUint$1(2),
    samplerate: readTemplate$1(4),
    boxes: readBoxes()
  };
}
function readVisualSampleEntryBox(type, view) {
  const { readArray, readUint: readUint$1, readInt: readInt$1, readTemplate: readTemplate$1, readBoxes } = view;
  return {
    type,
    reserved1: readArray(UINT, 1, 6),
    dataReferenceIndex: readUint$1(2),
    preDefined1: readUint$1(2),
    reserved2: readUint$1(2),
    preDefined2: readArray(UINT, 4, 3),
    width: readUint$1(2),
    height: readUint$1(2),
    horizresolution: readTemplate$1(4),
    vertresolution: readTemplate$1(4),
    reserved3: readUint$1(4),
    frameCount: readUint$1(2),
    compressorName: readArray(UINT, 1, 32),
    depth: readUint$1(2),
    preDefined3: readInt$1(2),
    boxes: readBoxes()
  };
}
function readAvc1(view) {
  return readVisualSampleEntryBox("avc1", view);
}
function readHev1(view) {
  return readVisualSampleEntryBox("hev1", view);
}
function readHvc1(view) {
  return readVisualSampleEntryBox("hvc1", view);
}
function readMdat(view) {
  return {
    type: "mdat",
    data: view.readData(-1)
  };
}
function readMdhd(view) {
  const { version: version2, flags } = view.readFullBox();
  const creationTime = view.readUint(version2 == 1 ? 8 : 4);
  const modificationTime = view.readUint(version2 == 1 ? 8 : 4);
  const timescale = view.readUint(4);
  const duration2 = view.readUint(version2 == 1 ? 8 : 4);
  const lang = view.readUint(2);
  return {
    type: "mdhd",
    version: version2,
    flags,
    creationTime,
    modificationTime,
    timescale,
    duration: duration2,
    language: String.fromCharCode((lang >> 10 & 31) + 96, (lang >> 5 & 31) + 96, (lang & 31) + 96),
    preDefined: view.readUint(2)
  };
}
function readMfhd(view) {
  return {
    type: "mfhd",
    ...view.readFullBox(),
    sequenceNumber: view.readUint(4)
  };
}
function readMp4a(view) {
  return readAudioSampleEntryBox("mp4a", view);
}
function readStsd(view) {
  const { version: version2, flags } = view.readFullBox();
  const entryCount = view.readUint(4);
  return {
    type: "stsd",
    version: version2,
    flags,
    entryCount,
    entries: view.readBoxes(entryCount)
  };
}
function readTfdt(view) {
  const { version: version2, flags } = view.readFullBox();
  return {
    type: "tfdt",
    version: version2,
    flags,
    baseMediaDecodeTime: view.readUint(version2 == 1 ? 8 : 4)
  };
}
function readTfhd(view) {
  const { version: version2, flags } = view.readFullBox();
  return {
    type: "tfhd",
    version: version2,
    flags,
    trackId: view.readUint(4),
    baseDataOffset: flags & 1 ? view.readUint(8) : undefined,
    sampleDescriptionIndex: flags & 2 ? view.readUint(4) : undefined,
    defaultSampleDuration: flags & 8 ? view.readUint(4) : undefined,
    defaultSampleSize: flags & 16 ? view.readUint(4) : undefined,
    defaultSampleFlags: flags & 32 ? view.readUint(4) : undefined
  };
}
function readTkhd(view) {
  const { version: version2, flags } = view.readFullBox();
  const size2 = version2 === 1 ? 8 : 4;
  return {
    type: "tkhd",
    version: version2,
    flags,
    creationTime: view.readUint(size2),
    modificationTime: view.readUint(size2),
    trackId: view.readUint(4),
    reserved1: view.readUint(4),
    duration: view.readUint(size2),
    reserved2: view.readArray(UINT, 4, 2),
    layer: view.readUint(2),
    alternateGroup: view.readUint(2),
    volume: view.readTemplate(2),
    reserved3: view.readUint(2),
    matrix: view.readArray(TEMPLATE, 4, 9),
    width: view.readTemplate(4),
    height: view.readTemplate(4)
  };
}
function readTrex(view) {
  return {
    type: "trex",
    ...view.readFullBox(),
    trackId: view.readUint(4),
    defaultSampleDescriptionIndex: view.readUint(4),
    defaultSampleDuration: view.readUint(4),
    defaultSampleSize: view.readUint(4),
    defaultSampleFlags: view.readUint(4)
  };
}
function readTrun(view) {
  const { version: version2, flags } = view.readFullBox();
  const sampleCount = view.readUint(4);
  let dataOffset;
  let firstSampleFlags;
  if (flags & 1)
    dataOffset = view.readInt(4);
  if (flags & 4)
    firstSampleFlags = view.readUint(4);
  const samples = view.readEntries(sampleCount, () => {
    const sample = {};
    if (flags & 256)
      sample.sampleDuration = view.readUint(4);
    if (flags & 512)
      sample.sampleSize = view.readUint(4);
    if (flags & 1024)
      sample.sampleFlags = view.readUint(4);
    if (flags & 2048)
      sample.sampleCompositionTimeOffset = version2 === 1 ? view.readInt(4) : view.readUint(4);
    return sample;
  });
  return {
    type: "trun",
    version: version2,
    flags,
    sampleCount,
    dataOffset,
    firstSampleFlags,
    samples
  };
}
function writeDref(box, config2) {
  const headerSize = 8;
  const fullBoxSize = 4;
  const entryCountSize = 4;
  const entryCount = box.entries.length;
  const { bytes, size: size2 } = writeChildBoxes(box.entries, config2);
  const writer = new IsoBoxWriteView("dref", headerSize + fullBoxSize + entryCountSize + size2);
  writer.writeFullBox(box.version, box.flags);
  writer.writeUint(entryCount, 4);
  writer.writeBytes(bytes);
  return writer;
}
function writeFtyp(box) {
  const headerSize = 8;
  const majorBrandSize = 4;
  const minorVersionSize = 4;
  const compatibleBrandsSize = box.compatibleBrands.length * 4;
  const writer = new IsoBoxWriteView("ftyp", headerSize + majorBrandSize + minorVersionSize + compatibleBrandsSize);
  writer.writeString(box.majorBrand);
  writer.writeUint(box.minorVersion, 4);
  for (const brand of box.compatibleBrands)
    writer.writeString(brand);
  return writer;
}
function writeHdlr(box) {
  const headerSize = 8;
  const fullBoxSize = 4;
  const preDefinedSize = 4;
  const handlerTypeSize = 4;
  const reservedSize = 12;
  const nameSize = box.name.length + 1;
  const writer = new IsoBoxWriteView("hdlr", headerSize + fullBoxSize + preDefinedSize + handlerTypeSize + reservedSize + nameSize);
  writer.writeFullBox(box.version, box.flags);
  writer.writeUint(box.preDefined, 4);
  writer.writeString(box.handlerType);
  writer.writeArray(box.reserved, UINT, 4, 3);
  writer.writeTerminatedString(box.name);
  return writer;
}
function writeMdat(box) {
  const writer = new IsoBoxWriteView("mdat", 8 + box.data.length);
  writer.writeBytes(box.data);
  return writer;
}
function writeMdhd(box) {
  const size2 = box.version === 1 ? 8 : 4;
  const headerSize = 8;
  const fullBoxSize = 4;
  const timesSize = size2 * 3;
  const writer = new IsoBoxWriteView("mdhd", headerSize + fullBoxSize + timesSize + 4 + 2 + 2);
  writer.writeFullBox(box.version, box.flags);
  writer.writeUint(box.creationTime, size2);
  writer.writeUint(box.modificationTime, size2);
  writer.writeUint(box.timescale, 4);
  writer.writeUint(box.duration, size2);
  const lang = box.language.length >= 3 ? (box.language.charCodeAt(0) - 96 & 31) << 10 | (box.language.charCodeAt(1) - 96 & 31) << 5 | box.language.charCodeAt(2) - 96 & 31 : 0;
  writer.writeUint(lang, 2);
  writer.writeUint(box.preDefined, 2);
  return writer;
}
function writeMfhd(box) {
  const writer = new IsoBoxWriteView("mfhd", 16);
  writer.writeFullBox(box.version, box.flags);
  writer.writeUint(box.sequenceNumber, 4);
  return writer;
}
function writeMvhd(box) {
  const size2 = box.version === 1 ? 8 : 4;
  const headerSize = 8;
  const fullBoxSize = 4;
  const timesSize = size2 * 3;
  const writer = new IsoBoxWriteView("mvhd", headerSize + fullBoxSize + timesSize + 4 + 4 + 2 + 2 + 8 + 36 + 24 + 4);
  writer.writeFullBox(box.version, box.flags);
  writer.writeUint(box.creationTime, size2);
  writer.writeUint(box.modificationTime, size2);
  writer.writeUint(box.timescale, 4);
  writer.writeUint(box.duration, size2);
  writer.writeTemplate(box.rate, 4);
  writer.writeTemplate(box.volume, 2);
  writer.writeUint(box.reserved1, 2);
  writer.writeArray(box.reserved2, UINT, 4, 2);
  writer.writeArray(box.matrix, TEMPLATE, 4, 9);
  writer.writeArray(box.preDefined, UINT, 4, 6);
  writer.writeUint(box.nextTrackId, 4);
  return writer;
}
function writeSmhd(box) {
  const writer = new IsoBoxWriteView("smhd", 16);
  writer.writeFullBox(box.version, box.flags);
  writer.writeUint(box.balance, 2);
  writer.writeUint(box.reserved, 2);
  return writer;
}
function writeStsd(box, config2) {
  const headerSize = 8;
  const fullBoxSize = 4;
  const entryCountSize = 4;
  const entryCount = box.entries.length;
  const { bytes, size: size2 } = writeChildBoxes(box.entries, config2);
  const writer = new IsoBoxWriteView("stsd", headerSize + fullBoxSize + entryCountSize + size2);
  writer.writeFullBox(box.version, box.flags);
  writer.writeUint(entryCount, 4);
  writer.writeBytes(bytes);
  return writer;
}
function writeStts(box) {
  const headerSize = 8;
  const fullBoxSize = 4;
  const entryCountSize = 4;
  const entriesSize = box.entryCount * 8;
  const writer = new IsoBoxWriteView("stts", headerSize + fullBoxSize + entryCountSize + entriesSize);
  writer.writeFullBox(box.version, box.flags);
  writer.writeUint(box.entryCount, 4);
  for (const entry of box.entries) {
    writer.writeUint(entry.sampleCount, 4);
    writer.writeUint(entry.sampleDelta, 4);
  }
  return writer;
}
function writeTfdt(box) {
  const size2 = box.version === 1 ? 8 : 4;
  const headerSize = 8;
  const fullBoxSize = 4;
  const baseMediaDecodeTimeSize = size2;
  const writer = new IsoBoxWriteView("tfdt", headerSize + fullBoxSize + baseMediaDecodeTimeSize);
  writer.writeFullBox(box.version, box.flags);
  writer.writeUint(box.baseMediaDecodeTime, size2);
  return writer;
}
function writeTfhd(box) {
  const headerSize = 8;
  const fullBoxSize = 4;
  const trackIdSize = 4;
  const baseDataOffsetSize = box.flags & 1 ? 8 : 0;
  const sampleDescriptionIndexSize = box.flags & 2 ? 4 : 0;
  const defaultSampleDurationSize = box.flags & 8 ? 4 : 0;
  const defaultSampleSizeSize = box.flags & 16 ? 4 : 0;
  const defaultSampleFlagsSize = box.flags & 32 ? 4 : 0;
  const writer = new IsoBoxWriteView("tfhd", headerSize + fullBoxSize + trackIdSize + baseDataOffsetSize + sampleDescriptionIndexSize + defaultSampleDurationSize + defaultSampleSizeSize + defaultSampleFlagsSize);
  writer.writeFullBox(box.version, box.flags);
  writer.writeUint(box.trackId, 4);
  if (box.flags & 1)
    writer.writeUint(box.baseDataOffset ?? 0, 8);
  if (box.flags & 2)
    writer.writeUint(box.sampleDescriptionIndex ?? 0, 4);
  if (box.flags & 8)
    writer.writeUint(box.defaultSampleDuration ?? 0, 4);
  if (box.flags & 16)
    writer.writeUint(box.defaultSampleSize ?? 0, 4);
  if (box.flags & 32)
    writer.writeUint(box.defaultSampleFlags ?? 0, 4);
  return writer;
}
function writeTkhd(box) {
  const size2 = box.version === 1 ? 8 : 4;
  const headerSize = 8;
  const fullBoxSize = 4;
  const timesSize = size2 * 3;
  const writer = new IsoBoxWriteView("tkhd", headerSize + fullBoxSize + timesSize + 4 + 4 + 8 + 2 + 2 + 2 + 2 + 36 + 4 + 4);
  writer.writeFullBox(box.version, box.flags);
  writer.writeUint(box.creationTime, size2);
  writer.writeUint(box.modificationTime, size2);
  writer.writeUint(box.trackId, 4);
  writer.writeUint(box.reserved1, 4);
  writer.writeUint(box.duration, size2);
  writer.writeArray(box.reserved2, UINT, 4, 2);
  writer.writeUint(box.layer, 2);
  writer.writeUint(box.alternateGroup, 2);
  writer.writeTemplate(box.volume, 2);
  writer.writeUint(box.reserved3, 2);
  writer.writeArray(box.matrix, TEMPLATE, 4, 9);
  writer.writeTemplate(box.width, 4);
  writer.writeTemplate(box.height, 4);
  return writer;
}
function writeTrex(box) {
  const writer = new IsoBoxWriteView("trex", 32);
  writer.writeFullBox(box.version, box.flags);
  writer.writeUint(box.trackId, 4);
  writer.writeUint(box.defaultSampleDescriptionIndex, 4);
  writer.writeUint(box.defaultSampleDuration, 4);
  writer.writeUint(box.defaultSampleSize, 4);
  writer.writeUint(box.defaultSampleFlags, 4);
  return writer;
}
function writeTrun(box) {
  const headerSize = 8;
  const fullBoxSize = 4;
  const sampleCountSize = 4;
  const dataOffsetSize = box.flags & 1 ? 4 : 0;
  const firstSampleFlagsSize = box.flags & 4 ? 4 : 0;
  let sampleSize = 0;
  if (box.flags & 256)
    sampleSize += 4;
  if (box.flags & 512)
    sampleSize += 4;
  if (box.flags & 1024)
    sampleSize += 4;
  if (box.flags & 2048)
    sampleSize += 4;
  const samplesSize = sampleSize * box.sampleCount;
  const writer = new IsoBoxWriteView("trun", headerSize + fullBoxSize + sampleCountSize + dataOffsetSize + firstSampleFlagsSize + samplesSize);
  writer.writeFullBox(box.version, box.flags);
  writer.writeUint(box.sampleCount, 4);
  if (box.flags & 1)
    writer.writeUint(box.dataOffset ?? 0, 4);
  if (box.flags & 4)
    writer.writeUint(box.firstSampleFlags ?? 0, 4);
  for (const sample of box.samples) {
    if (box.flags & 256)
      writer.writeUint(sample.sampleDuration ?? 0, 4);
    if (box.flags & 512)
      writer.writeUint(sample.sampleSize ?? 0, 4);
    if (box.flags & 1024)
      writer.writeUint(sample.sampleFlags ?? 0, 4);
    if (box.flags & 2048)
      writer.writeUint(sample.sampleCompositionTimeOffset ?? 0, 4);
  }
  return writer;
}
function writeUrl(box) {
  const headerSize = 8;
  const fullBoxSize = 4;
  const locationSize = box.location.length + 1;
  const writer = new IsoBoxWriteView("url ", headerSize + fullBoxSize + locationSize);
  writer.writeFullBox(box.version, box.flags);
  writer.writeTerminatedString(box.location);
  return writer;
}
function writeVmhd(box) {
  const writer = new IsoBoxWriteView("vmhd", 20);
  writer.writeFullBox(box.version, box.flags);
  writer.writeUint(box.graphicsmode, 2);
  writer.writeArray(box.opcolor, UINT, 2, 3);
  return writer;
}

// node_modules/@moq/hang/container/cmaf/decode.js
var INIT_READERS = {
  avc1: readAvc1,
  avc3: readAvc1,
  hvc1: readHvc1,
  hev1: readHev1,
  mp4a: readMp4a,
  stsd: readStsd,
  mdhd: readMdhd,
  tkhd: readTkhd,
  trex: readTrex
};
var DATA_READERS = {
  mfhd: readMfhd,
  tfhd: readTfhd,
  tfdt: readTfdt,
  trun: readTrun,
  mdat: readMdat
};
function findBox(boxes, predicate) {
  for (const box of boxes) {
    if (predicate(box)) {
      return box;
    }
    const children = box.boxes;
    if (children && Array.isArray(children)) {
      const found = findBox(children, predicate);
      if (found)
        return found;
    }
  }
  return;
}
function toArrayBuffer(data) {
  const buffer = new ArrayBuffer(data.byteLength);
  new Uint8Array(buffer).set(data);
  return buffer;
}
function isBoxType(type) {
  return (box) => box.type === type;
}
function decodeInitSegment(init) {
  const boxes = readIsoBoxes(toArrayBuffer(init), { readers: INIT_READERS });
  const mdhd = findBox(boxes, isBoxType("mdhd"));
  if (!mdhd) {
    throw new Error("No mdhd box found in init segment");
  }
  const tkhd = findBox(boxes, isBoxType("tkhd"));
  const trackId = tkhd?.trackId ?? 1;
  const stsd = findBox(boxes, isBoxType("stsd"));
  if (!stsd?.entries || stsd.entries.length === 0) {
    throw new Error("No stsd box found in init segment");
  }
  const entry = stsd.entries[0];
  const description = extractDescription(entry);
  const trex = findBox(boxes, (box) => box.type === "trex" && box.trackId === trackId);
  return {
    description,
    timescale: mdhd.timescale,
    trackId,
    defaultSampleDuration: trex?.defaultSampleDuration ?? 0,
    defaultSampleSize: trex?.defaultSampleSize ?? 0,
    defaultSampleFlags: trex?.defaultSampleFlags ?? 0
  };
}
function extractDescription(entry) {
  if (!entry.boxes || !Array.isArray(entry.boxes)) {
    return;
  }
  for (const box of entry.boxes) {
    if (box instanceof Uint8Array) {
      if (box.length > 8) {
        const typeBytes = String.fromCharCode(box[4], box[5], box[6], box[7]);
        if (typeBytes === "avcC" || typeBytes === "hvcC" || typeBytes === "dOps") {
          return new Uint8Array(box.slice(8));
        }
        if (typeBytes === "esds") {
          return extractAudioSpecificConfig(new Uint8Array(box.slice(8)));
        }
      }
      continue;
    }
    const boxType = box.type;
    if (boxType === "avcC" || boxType === "hvcC" || boxType === "dOps") {
      if (box.view) {
        const view = box.view;
        const headerSize = 8;
        const payloadOffset = view.byteOffset + headerSize;
        const payloadLength = box.size - headerSize;
        return new Uint8Array(view.buffer, payloadOffset, payloadLength);
      }
      if (box.data instanceof Uint8Array) {
        return new Uint8Array(box.data);
      }
      if (box.raw instanceof Uint8Array) {
        return new Uint8Array(box.raw.slice(8));
      }
    }
    if (boxType === "esds") {
      let payload;
      if (box.view) {
        const view = box.view;
        const headerSize = 8;
        payload = new Uint8Array(view.buffer, view.byteOffset + headerSize, box.size - headerSize);
      } else if (box.data instanceof Uint8Array) {
        payload = new Uint8Array(box.data);
      } else if (box.raw instanceof Uint8Array) {
        payload = new Uint8Array(box.raw.slice(8));
      }
      if (payload)
        return extractAudioSpecificConfig(payload);
    }
  }
  return;
}
function extractAudioSpecificConfig(esds) {
  let offset = 4;
  while (offset < esds.length) {
    const tag = esds[offset++];
    let size2 = 0;
    for (let i = 0;i < 4 && offset < esds.length; i++) {
      const b = esds[offset++];
      size2 = size2 << 7 | b & 127;
      if ((b & 128) === 0)
        break;
    }
    if (tag === 5) {
      if (offset + size2 <= esds.length) {
        return new Uint8Array(esds.buffer, esds.byteOffset + offset, size2);
      }
      return;
    }
    if (tag === 3) {
      offset += 3;
    } else if (tag === 4) {
      offset += 13;
    } else {
      offset += size2;
    }
  }
  return;
}
function decodeTimestamp(segment, init) {
  const boxes = readIsoBoxes(toArrayBuffer(segment), { readers: DATA_READERS });
  const tfdt = findBox(boxes, isBoxType("tfdt"));
  const baseDecodeTime = tfdt?.baseMediaDecodeTime ?? 0;
  return baseDecodeTime * 1e6 / init.timescale;
}
function decodeDataSegment(segment, init) {
  const boxes = readIsoBoxes(toArrayBuffer(segment), { readers: DATA_READERS });
  const tfdt = findBox(boxes, isBoxType("tfdt"));
  const baseDecodeTime = tfdt?.baseMediaDecodeTime ?? 0;
  const tfhd = findBox(boxes, isBoxType("tfhd"));
  const defaultDuration = tfhd?.defaultSampleDuration ?? init.defaultSampleDuration;
  const defaultSize = tfhd?.defaultSampleSize ?? init.defaultSampleSize;
  const defaultFlags = tfhd?.defaultSampleFlags ?? init.defaultSampleFlags;
  const trun = findBox(boxes, isBoxType("trun"));
  if (!trun) {
    throw new Error("No trun box found in data segment");
  }
  const mdat = findBox(boxes, isBoxType("mdat"));
  if (!mdat) {
    throw new Error("No mdat box found in data segment");
  }
  const mdatData = mdat.data;
  if (!mdatData) {
    throw new Error("No data in mdat box");
  }
  const samples = [];
  let dataOffset = 0;
  let decodeTime = baseDecodeTime;
  for (let i = 0;i < trun.sampleCount; i++) {
    const sample = trun.samples[i] ?? {};
    const sampleSize = sample.sampleSize ?? defaultSize;
    const sampleDuration = sample.sampleDuration ?? defaultDuration;
    if (sampleSize <= 0) {
      throw new Error(`Invalid sample size ${sampleSize} for sample ${i} in trun`);
    }
    if (sampleDuration < 0) {
      throw new Error(`Invalid sample duration ${sampleDuration} for sample ${i} in trun`);
    }
    if (dataOffset + sampleSize > mdatData.length) {
      throw new Error(`Sample ${i} would overflow mdat: offset=${dataOffset}, size=${sampleSize}, mdatLength=${mdatData.length}`);
    }
    const sampleFlags = i === 0 && trun.firstSampleFlags !== undefined ? trun.firstSampleFlags : sample.sampleFlags ?? defaultFlags;
    const compositionOffset = sample.sampleCompositionTimeOffset ?? 0;
    const data = new Uint8Array(mdatData.slice(dataOffset, dataOffset + sampleSize));
    dataOffset += sampleSize;
    const pts = decodeTime + compositionOffset;
    const timestamp = Math.round(pts * 1e6 / init.timescale);
    const keyframe = sampleFlags === 0 || (sampleFlags & 65536) === 0;
    samples.push({
      data,
      timestamp,
      keyframe
    });
    decodeTime += sampleDuration;
  }
  return samples;
}
// node_modules/@moq/hang/util/aac.js
var exports_aac = {};
__export(exports_aac, {
  audioSpecificConfig: () => audioSpecificConfig
});
var SAMPLE_RATE_INDEX = {
  96000: 0,
  88200: 1,
  64000: 2,
  48000: 3,
  44100: 4,
  32000: 5,
  24000: 6,
  22050: 7,
  16000: 8,
  12000: 9,
  11025: 10,
  8000: 11,
  7350: 12
};
var AAC_LC = 2;
function channelConfig(channelCount) {
  if (channelCount >= 1 && channelCount <= 6)
    return channelCount;
  if (channelCount === 8)
    return 7;
  return 2;
}
function audioSpecificConfig(sampleRate, channelCount) {
  const config2 = channelConfig(channelCount);
  const freqIndex = SAMPLE_RATE_INDEX[sampleRate];
  if (freqIndex !== undefined) {
    const byte0 = AAC_LC << 3 | freqIndex >> 1;
    const byte1 = (freqIndex & 1) << 7 | config2 << 3;
    return new Uint8Array([byte0, byte1]);
  }
  let bits = 0n;
  bits |= BigInt(AAC_LC) << 35n;
  bits |= 0xfn << 31n;
  bits |= BigInt(sampleRate) << 7n;
  bits |= BigInt(config2) << 3n;
  const out = new Uint8Array(5);
  for (let i = 0;i < out.length; i++) {
    out[i] = Number(bits >> BigInt((out.length - 1 - i) * 8) & 0xffn);
  }
  return out;
}

// node_modules/@moq/hang/util/hex.js
var exports_hex2 = {};
__export(exports_hex2, {
  toBytes: () => toBytes2,
  fromBytes: () => fromBytes
});
function toBytes2(hex) {
  hex = hex.startsWith("0x") ? hex.slice(2) : hex;
  if (hex.length % 2) {
    throw new Error("invalid hex string length");
  }
  const matches = hex.match(/.{2}/g);
  if (!matches) {
    throw new Error("invalid hex string format");
  }
  return new Uint8Array(matches.map((byte) => parseInt(byte, 16)));
}
function fromBytes(bytes) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

// node_modules/@moq/hang/container/cmaf/encode.js
var IDENTITY_MATRIX = [65536, 0, 0, 0, 65536, 0, 0, 0, 1073741824];
var WRITERS = {
  ftyp: writeFtyp,
  mvhd: writeMvhd,
  tkhd: writeTkhd,
  mdhd: writeMdhd,
  hdlr: writeHdlr,
  vmhd: writeVmhd,
  smhd: writeSmhd,
  "url ": writeUrl,
  dref: writeDref,
  stsd: writeStsd,
  stts: writeStts,
  trex: writeTrex,
  mfhd: writeMfhd,
  tfhd: writeTfhd,
  tfdt: writeTfdt,
  trun: writeTrun,
  mdat: writeMdat
};
function writeBoxes2(boxes) {
  return writeIsoBoxes(boxes, { writers: WRITERS });
}
function createFullBox(type, version2, flags, content) {
  const size2 = 8 + 4 + content.length;
  const box = new Uint8Array(size2);
  const view = new DataView(box.buffer);
  view.setUint32(0, size2, false);
  box[4] = type.charCodeAt(0);
  box[5] = type.charCodeAt(1);
  box[6] = type.charCodeAt(2);
  box[7] = type.charCodeAt(3);
  view.setUint32(8, version2 << 24 | flags, false);
  box.set(content, 12);
  return box;
}
function createEmptyStsc() {
  const content = new Uint8Array(4);
  return createFullBox("stsc", 0, 0, content);
}
function createEmptyStsz() {
  const content = new Uint8Array(8);
  return createFullBox("stsz", 0, 0, content);
}
function createEmptyStco() {
  const content = new Uint8Array(4);
  return createFullBox("stco", 0, 0, content);
}
function createAvc1Box(width, height, avcC) {
  const avcCSize = 8 + avcC.length;
  const avc1ContentSize = 6 + 2 + 2 + 2 + 12 + 2 + 2 + 4 + 4 + 4 + 2 + 32 + 2 + 2 + avcCSize;
  const avc1Size = 8 + avc1ContentSize;
  const box = new Uint8Array(avc1Size);
  const view = new DataView(box.buffer);
  let offset = 0;
  view.setUint32(offset, avc1Size, false);
  offset += 4;
  box[offset++] = 97;
  box[offset++] = 118;
  box[offset++] = 99;
  box[offset++] = 49;
  offset += 6;
  view.setUint16(offset, 1, false);
  offset += 2;
  view.setUint16(offset, 0, false);
  offset += 2;
  view.setUint16(offset, 0, false);
  offset += 2;
  offset += 12;
  view.setUint16(offset, width, false);
  offset += 2;
  view.setUint16(offset, height, false);
  offset += 2;
  view.setUint32(offset, 4718592, false);
  offset += 4;
  view.setUint32(offset, 4718592, false);
  offset += 4;
  view.setUint32(offset, 0, false);
  offset += 4;
  view.setUint16(offset, 1, false);
  offset += 2;
  offset += 32;
  view.setUint16(offset, 24, false);
  offset += 2;
  view.setUint16(offset, 65535, false);
  offset += 2;
  view.setUint32(offset, avcCSize, false);
  offset += 4;
  box[offset++] = 97;
  box[offset++] = 118;
  box[offset++] = 99;
  box[offset++] = 67;
  box.set(avcC, offset);
  return box;
}
function createVideoInitSegment(config2) {
  const { codedWidth, codedHeight, description } = config2;
  if (!codedWidth || !codedHeight || !description) {
    throw new Error("Missing required fields to create video init segment");
  }
  const timescale = 1e6;
  const trackId = 1;
  const ftyp = {
    type: "ftyp",
    majorBrand: "isom",
    minorVersion: 512,
    compatibleBrands: ["isom", "iso6", "mp41"]
  };
  const mvhd = {
    type: "mvhd",
    version: 0,
    flags: 0,
    creationTime: 0,
    modificationTime: 0,
    timescale,
    duration: 0,
    rate: 65536,
    volume: 256,
    reserved1: 0,
    reserved2: [0, 0],
    matrix: IDENTITY_MATRIX,
    preDefined: [0, 0, 0, 0, 0, 0],
    nextTrackId: trackId + 1
  };
  const tkhd = {
    type: "tkhd",
    version: 0,
    flags: 3,
    creationTime: 0,
    modificationTime: 0,
    trackId,
    reserved1: 0,
    duration: 0,
    reserved2: [0, 0],
    layer: 0,
    alternateGroup: 0,
    volume: 0,
    reserved3: 0,
    matrix: IDENTITY_MATRIX,
    width: codedWidth * 65536,
    height: codedHeight * 65536
  };
  const mdhd = {
    type: "mdhd",
    version: 0,
    flags: 0,
    creationTime: 0,
    modificationTime: 0,
    timescale,
    duration: 0,
    language: "und",
    preDefined: 0
  };
  const hdlr = {
    type: "hdlr",
    version: 0,
    flags: 0,
    preDefined: 0,
    handlerType: "vide",
    reserved: [0, 0, 0],
    name: "VideoHandler"
  };
  const vmhd = {
    type: "vmhd",
    version: 0,
    flags: 1,
    graphicsmode: 0,
    opcolor: [0, 0, 0]
  };
  const urlBox = {
    type: "url ",
    version: 0,
    flags: 1,
    location: ""
  };
  const dref = {
    type: "dref",
    version: 0,
    flags: 0,
    entryCount: 1,
    entries: [urlBox]
  };
  const dinf = {
    type: "dinf",
    boxes: [dref]
  };
  const avc1Box = createAvc1Box(codedWidth, codedHeight, toBytes2(description));
  const stsd = {
    type: "stsd",
    version: 0,
    flags: 0,
    entryCount: 1,
    entries: [avc1Box]
  };
  const stts = {
    type: "stts",
    version: 0,
    flags: 0,
    entryCount: 0,
    entries: []
  };
  const stsc = createEmptyStsc();
  const stsz = createEmptyStsz();
  const stco = createEmptyStco();
  const stbl = {
    type: "stbl",
    boxes: [stsd, stts, stsc, stsz, stco]
  };
  const minf = {
    type: "minf",
    boxes: [vmhd, dinf, stbl]
  };
  const mdia = {
    type: "mdia",
    boxes: [mdhd, hdlr, minf]
  };
  const trak = {
    type: "trak",
    boxes: [tkhd, mdia]
  };
  const trex = {
    type: "trex",
    version: 0,
    flags: 0,
    trackId,
    defaultSampleDescriptionIndex: 1,
    defaultSampleDuration: 0,
    defaultSampleSize: 0,
    defaultSampleFlags: 0
  };
  const mvex = {
    type: "mvex",
    boxes: [trex]
  };
  const moov = {
    type: "moov",
    boxes: [mvhd, trak, mvex]
  };
  const buffers = writeBoxes2([ftyp, moov]);
  const totalLength = buffers.reduce((sum, buf) => sum + buf.byteLength, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const buf of buffers) {
    result.set(new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength), offset);
    offset += buf.byteLength;
  }
  return result;
}
function createAudioInitSegment(config2) {
  const { sampleRate, numberOfChannels, description, codec } = config2;
  const timescale = 1e6;
  const trackId = 1;
  const ftyp = {
    type: "ftyp",
    majorBrand: "isom",
    minorVersion: 512,
    compatibleBrands: ["isom", "iso6", "mp41"]
  };
  const mvhd = {
    type: "mvhd",
    version: 0,
    flags: 0,
    creationTime: 0,
    modificationTime: 0,
    timescale,
    duration: 0,
    rate: 65536,
    volume: 256,
    reserved1: 0,
    reserved2: [0, 0],
    matrix: IDENTITY_MATRIX,
    preDefined: [0, 0, 0, 0, 0, 0],
    nextTrackId: trackId + 1
  };
  const tkhd = {
    type: "tkhd",
    version: 0,
    flags: 3,
    creationTime: 0,
    modificationTime: 0,
    trackId,
    reserved1: 0,
    duration: 0,
    reserved2: [0, 0],
    layer: 0,
    alternateGroup: 0,
    volume: 256,
    reserved3: 0,
    matrix: IDENTITY_MATRIX,
    width: 0,
    height: 0
  };
  const mdhd = {
    type: "mdhd",
    version: 0,
    flags: 0,
    creationTime: 0,
    modificationTime: 0,
    timescale,
    duration: 0,
    language: "und",
    preDefined: 0
  };
  const hdlr = {
    type: "hdlr",
    version: 0,
    flags: 0,
    preDefined: 0,
    handlerType: "soun",
    reserved: [0, 0, 0],
    name: "SoundHandler"
  };
  const smhd = {
    type: "smhd",
    version: 0,
    flags: 0,
    balance: 0,
    reserved: 0
  };
  const urlBox = {
    type: "url ",
    version: 0,
    flags: 1,
    location: ""
  };
  const dref = {
    type: "dref",
    version: 0,
    flags: 0,
    entryCount: 1,
    entries: [urlBox]
  };
  const dinf = {
    type: "dinf",
    boxes: [dref]
  };
  const sampleEntry = createAudioSampleEntry(codec, sampleRate, numberOfChannels, description);
  const stsd = {
    type: "stsd",
    version: 0,
    flags: 0,
    entryCount: 1,
    entries: [sampleEntry]
  };
  const stts = {
    type: "stts",
    version: 0,
    flags: 0,
    entryCount: 0,
    entries: []
  };
  const stsc = createEmptyStsc();
  const stsz = createEmptyStsz();
  const stco = createEmptyStco();
  const stbl = {
    type: "stbl",
    boxes: [stsd, stts, stsc, stsz, stco]
  };
  const minf = {
    type: "minf",
    boxes: [smhd, dinf, stbl]
  };
  const mdia = {
    type: "mdia",
    boxes: [mdhd, hdlr, minf]
  };
  const trak = {
    type: "trak",
    boxes: [tkhd, mdia]
  };
  const trex = {
    type: "trex",
    version: 0,
    flags: 0,
    trackId,
    defaultSampleDescriptionIndex: 1,
    defaultSampleDuration: 0,
    defaultSampleSize: 0,
    defaultSampleFlags: 0
  };
  const mvex = {
    type: "mvex",
    boxes: [trex]
  };
  const moov = {
    type: "moov",
    boxes: [mvhd, trak, mvex]
  };
  const buffers = writeBoxes2([ftyp, moov]);
  const totalLength = buffers.reduce((sum, buf) => sum + buf.byteLength, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const buf of buffers) {
    result.set(new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength), offset);
    offset += buf.byteLength;
  }
  return result;
}
function createAudioSampleEntry(codec, sampleRate, channelCount, description) {
  if (codec.startsWith("mp4a")) {
    return createMp4aBox(sampleRate, channelCount, description);
  } else if (codec === "opus") {
    return createOpusBox(sampleRate, channelCount, description);
  }
  throw new Error(`Unsupported audio codec: ${codec}`);
}
function createMp4aBox(sampleRate, channelCount, description) {
  const esds = createEsdsBox(sampleRate, channelCount, description);
  const mp4aContentSize = 6 + 2 + 8 + 2 + 2 + 2 + 2 + 4 + esds.length;
  const mp4aSize = 8 + mp4aContentSize;
  const box = new Uint8Array(mp4aSize);
  const view = new DataView(box.buffer);
  let offset = 0;
  view.setUint32(offset, mp4aSize, false);
  offset += 4;
  box[offset++] = 109;
  box[offset++] = 112;
  box[offset++] = 52;
  box[offset++] = 97;
  offset += 6;
  view.setUint16(offset, 1, false);
  offset += 2;
  offset += 8;
  view.setUint16(offset, channelCount, false);
  offset += 2;
  view.setUint16(offset, 16, false);
  offset += 2;
  view.setUint16(offset, 0, false);
  offset += 2;
  view.setUint16(offset, 0, false);
  offset += 2;
  view.setUint32(offset, sampleRate * 65536, false);
  offset += 4;
  box.set(esds, offset);
  return box;
}
function createOpusBox(sampleRate, channelCount, description) {
  const dOps = createDOpsBox(channelCount, sampleRate, description);
  const opusContentSize = 6 + 2 + 8 + 2 + 2 + 2 + 2 + 4 + dOps.length;
  const opusSize = 8 + opusContentSize;
  const box = new Uint8Array(opusSize);
  const view = new DataView(box.buffer);
  let offset = 0;
  view.setUint32(offset, opusSize, false);
  offset += 4;
  box[offset++] = 79;
  box[offset++] = 112;
  box[offset++] = 117;
  box[offset++] = 115;
  offset += 6;
  view.setUint16(offset, 1, false);
  offset += 2;
  offset += 8;
  view.setUint16(offset, channelCount, false);
  offset += 2;
  view.setUint16(offset, 16, false);
  offset += 2;
  view.setUint16(offset, 0, false);
  offset += 2;
  view.setUint16(offset, 0, false);
  offset += 2;
  view.setUint32(offset, sampleRate * 65536, false);
  offset += 4;
  box.set(dOps, offset);
  return box;
}
function createEsdsBox(sampleRate, channelCount, description) {
  const audioSpecificConfig2 = description ? toBytes2(description) : audioSpecificConfig(sampleRate, channelCount);
  const decSpecificInfoSize = audioSpecificConfig2.length;
  const decConfigDescSize = 13 + 2 + decSpecificInfoSize;
  const esDescSize = 3 + 2 + decConfigDescSize + 3;
  const esdsSize = 12 + 2 + esDescSize;
  const esds = new Uint8Array(esdsSize);
  const view = new DataView(esds.buffer);
  let offset = 0;
  view.setUint32(offset, esdsSize, false);
  offset += 4;
  esds[offset++] = 101;
  esds[offset++] = 115;
  esds[offset++] = 100;
  esds[offset++] = 115;
  view.setUint32(offset, 0, false);
  offset += 4;
  esds[offset++] = 3;
  esds[offset++] = esDescSize;
  view.setUint16(offset, 0, false);
  offset += 2;
  esds[offset++] = 0;
  esds[offset++] = 4;
  esds[offset++] = decConfigDescSize;
  esds[offset++] = 64;
  esds[offset++] = 21;
  esds[offset++] = 0;
  esds[offset++] = 0;
  esds[offset++] = 0;
  view.setUint32(offset, 0, false);
  offset += 4;
  view.setUint32(offset, 0, false);
  offset += 4;
  esds[offset++] = 5;
  esds[offset++] = decSpecificInfoSize;
  esds.set(audioSpecificConfig2, offset);
  offset += decSpecificInfoSize;
  esds[offset++] = 6;
  esds[offset++] = 1;
  esds[offset++] = 2;
  return esds;
}
function createDOpsBox(channelCount, sampleRate, description) {
  if (description) {
    const opusHead = toBytes2(description);
    const dOpsSize2 = 8 + opusHead.length;
    const dOps2 = new Uint8Array(dOpsSize2);
    const view2 = new DataView(dOps2.buffer);
    view2.setUint32(0, dOpsSize2, false);
    dOps2[4] = 100;
    dOps2[5] = 79;
    dOps2[6] = 112;
    dOps2[7] = 115;
    dOps2.set(opusHead, 8);
    return dOps2;
  }
  const dOpsSize = 8 + 11;
  const dOps = new Uint8Array(dOpsSize);
  const view = new DataView(dOps.buffer);
  let offset = 0;
  view.setUint32(offset, dOpsSize, false);
  offset += 4;
  dOps[offset++] = 100;
  dOps[offset++] = 79;
  dOps[offset++] = 112;
  dOps[offset++] = 115;
  dOps[offset++] = 0;
  dOps[offset++] = channelCount;
  view.setUint16(offset, 312, false);
  offset += 2;
  view.setUint32(offset, sampleRate, false);
  offset += 4;
  view.setInt16(offset, 0, false);
  offset += 2;
  dOps[offset++] = 0;
  return dOps;
}
function encodeDataSegment(opts) {
  const { data, timestamp, duration: duration2, keyframe, sequence, trackId = 1 } = opts;
  const sampleFlags = keyframe ? 33554432 : 16842752;
  const mfhd = {
    type: "mfhd",
    version: 0,
    flags: 0,
    sequenceNumber: sequence
  };
  const tfhd = {
    type: "tfhd",
    version: 0,
    flags: 131072,
    trackId
  };
  const tfdt = {
    type: "tfdt",
    version: 1,
    flags: 0,
    baseMediaDecodeTime: timestamp
  };
  const trun = {
    type: "trun",
    version: 0,
    flags: 1 | 256 | 512 | 1024,
    sampleCount: 1,
    dataOffset: 0,
    samples: [
      {
        sampleDuration: duration2,
        sampleSize: data.byteLength,
        sampleFlags
      }
    ]
  };
  const traf = {
    type: "traf",
    boxes: [tfhd, tfdt, trun]
  };
  const moof = {
    type: "moof",
    boxes: [mfhd, traf]
  };
  const moofBuffers = writeBoxes2([moof]);
  let moofSize = 0;
  for (const buf of moofBuffers) {
    moofSize += buf.byteLength;
  }
  trun.dataOffset = moofSize + 8;
  const moofBuffersFinal = writeBoxes2([moof]);
  moofSize = 0;
  for (const buf of moofBuffersFinal) {
    moofSize += buf.byteLength;
  }
  const mdatBuffer = new ArrayBuffer(data.byteLength);
  const mdatData = new Uint8Array(mdatBuffer);
  mdatData.set(data);
  const mdat = {
    type: "mdat",
    data: mdatData
  };
  const mdatBuffers = writeBoxes2([mdat]);
  let mdatSize = 0;
  for (const buf of mdatBuffers) {
    mdatSize += buf.byteLength;
  }
  const result = new Uint8Array(moofSize + mdatSize);
  let offset = 0;
  for (const buf of moofBuffersFinal) {
    result.set(new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength), offset);
    offset += buf.byteLength;
  }
  for (const buf of mdatBuffers) {
    result.set(new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength), offset);
    offset += buf.byteLength;
  }
  return result;
}
// node_modules/@moq/hang/container/cmaf/format.js
class Format2 {
  #init;
  constructor(init) {
    this.#init = init;
  }
  decode(frame) {
    return decodeDataSegment(frame, this.#init).map((s) => ({
      data: s.data,
      timestamp: s.timestamp,
      keyframe: s.keyframe
    }));
  }
}
// node_modules/@moq/hang/container/consumer.js
class Reset {
  prevMax;
  group;
  timestamp;
  constructor(prevMax, group2, timestamp) {
    this.prevMax = prevMax;
    this.group = group2;
    this.timestamp = timestamp;
  }
  bySequence(sequence) {
    if (sequence <= this.prevMax)
      return true;
    if (sequence >= this.group)
      return false;
    return;
  }
  isStale(sequence, timestamp) {
    return this.bySequence(sequence) ?? timestamp >= this.timestamp;
  }
}

class Rewind {
  liveEdge;
  boundary;
  discontinuity = 0;
}

class Consumer3 {
  #track;
  #format;
  #latency;
  #groups = [];
  #active;
  #rewind = new Rewind;
  #notify;
  #buffered = new Signal([]);
  buffered = this.#buffered;
  #signals = new Effect;
  constructor(track2, props) {
    this.#track = track2;
    this.#format = props.format;
    this.#latency = Signal.from(props.latency ?? exports_time.Milli.zero);
    this.#signals.spawn(this.#run.bind(this));
    this.#signals.cleanup(() => {
      this.#track.close();
      for (const group2 of this.#groups) {
        group2.consumer.close();
      }
      this.#groups.length = 0;
    });
  }
  async#run() {
    for (;; ) {
      const consumer = await this.#track.recvGroup();
      if (!consumer)
        break;
      if (this.#active === undefined) {
        this.#active = consumer.sequence;
      }
      let drop;
      if (this.#rewind.boundary) {
        const verdict = this.#rewind.boundary.bySequence(consumer.sequence);
        if (verdict === undefined)
          drop = false;
        else if (verdict)
          drop = true;
        else
          drop = consumer.sequence < this.#active;
      } else {
        drop = consumer.sequence < this.#active;
      }
      if (drop) {
        console.warn(`skipping old group: ${consumer.sequence}`);
        consumer.close();
        continue;
      }
      const group2 = {
        consumer,
        frames: []
      };
      this.#groups.push(group2);
      this.#groups.sort((a, b) => a.consumer.sequence - b.consumer.sequence);
      this.#signals.spawn(this.#runGroup.bind(this, group2));
    }
  }
  async#runGroup(group2) {
    try {
      let index = 0;
      for (;; ) {
        const next = await group2.consumer.readFrame();
        if (!next)
          break;
        const decoded = this.#format.decode(next);
        for (const sample of decoded) {
          const frame = {
            data: sample.data,
            timestamp: sample.timestamp,
            keyframe: index === 0 ? true : sample.keyframe
          };
          index++;
          group2.frames.push(frame);
          if (group2.latest === undefined || frame.timestamp > group2.latest) {
            group2.latest = frame.timestamp;
          }
          this.#updateBuffered();
          if (group2.consumer.sequence === this.#active) {
            this.#notify?.();
            this.#notify = undefined;
          } else {
            if (this.#classifyStale(group2))
              return;
            this.#checkReset(group2);
            this.#checkLatency();
          }
        }
      }
    } catch (_err) {} finally {
      group2.done = true;
      if (group2.consumer.sequence === this.#active) {
        this.#active += 1;
      }
      this.#updateBuffered();
      this.#notify?.();
      this.#notify = undefined;
      group2.consumer.close();
    }
  }
  #checkLatency() {
    if (this.#active === undefined)
      return;
    let skipped = false;
    while (this.#groups.length >= 2) {
      const threshold = exports_time.Micro.fromMilli(this.#latency.peek());
      let min;
      let max;
      for (const group2 of this.#groups) {
        if (group2.latest === undefined)
          continue;
        const frame = group2.frames.at(0)?.timestamp ?? group2.latest;
        if (min === undefined || frame < min)
          min = frame;
        if (max === undefined || group2.latest > max)
          max = group2.latest;
      }
      if (min === undefined || max === undefined)
        break;
      const latency = max - min;
      if (latency <= threshold)
        break;
      const first = this.#groups.shift();
      if (!first)
        break;
      this.#active = this.#groups[0]?.consumer.sequence;
      console.warn(`skipping slow group: ${first.consumer.sequence} -> ${this.#active}`);
      first.consumer.close();
      first.frames.length = 0;
      skipped = true;
    }
    if (skipped) {
      this.#updateBuffered();
      this.#notify?.();
      this.#notify = undefined;
    }
  }
  #checkReset(group2) {
    if (this.#active === undefined)
      return;
    const live = this.#rewind.liveEdge;
    if (live === undefined)
      return;
    if (group2.consumer.sequence <= this.#active)
      return;
    const start = group2.frames.at(0)?.timestamp;
    if (start === undefined)
      return;
    if (start >= live.timestamp)
      return;
    const reset = new Reset(live.group, group2.consumer.sequence, start);
    this.#rewind.boundary = reset;
    this.#rewind.discontinuity++;
    this.#groups = this.#groups.filter((g) => {
      const verdict = reset.bySequence(g.consumer.sequence);
      const first = g.frames.at(0);
      const stale = verdict ?? (first !== undefined && reset.isStale(g.consumer.sequence, first.timestamp));
      if (stale) {
        g.consumer.close();
        g.frames.length = 0;
      }
      return !stale;
    });
    console.warn(`buffer reset: group timestamps rewound (prevMax ${reset.prevMax}, group ${reset.group})`);
    this.#active = this.#groups[0]?.consumer.sequence ?? reset.group;
    this.#rewind.liveEdge = { group: reset.group, timestamp: start };
    this.#updateBuffered();
    this.#notify?.();
    this.#notify = undefined;
  }
  #classifyStale(group2) {
    const reset = this.#rewind.boundary;
    if (!reset)
      return false;
    const first = group2.frames.at(0);
    if (first === undefined)
      return false;
    if (!reset.isStale(group2.consumer.sequence, first.timestamp))
      return false;
    this.#groups = this.#groups.filter((g) => g !== group2);
    group2.consumer.close();
    group2.frames.length = 0;
    this.#updateBuffered();
    return true;
  }
  #checkBufferedReset() {
    if (this.#active === undefined || this.#rewind.liveEdge === undefined)
      return;
    for (const group2 of [...this.#groups].reverse()) {
      if (group2.consumer.sequence <= this.#active)
        break;
      this.#checkReset(group2);
    }
  }
  async next() {
    for (;; ) {
      this.#checkBufferedReset();
      if (this.#groups.length > 0 && this.#active !== undefined && this.#groups[0].consumer.sequence <= this.#active) {
        const frame = this.#groups[0].frames.shift();
        if (frame) {
          const seq = this.#groups[0].consumer.sequence;
          const live = this.#rewind.liveEdge;
          if (live === undefined || frame.timestamp > live.timestamp) {
            this.#rewind.liveEdge = { group: seq, timestamp: frame.timestamp };
          }
          this.#updateBuffered();
          return { frame, group: seq, discontinuity: this.#rewind.discontinuity };
        }
        if (this.#active > this.#groups[0].consumer.sequence || this.#groups[0].done) {
          if (this.#groups[0].consumer.sequence === this.#active) {
            this.#active += 1;
          }
          const group2 = this.#groups.shift();
          if (group2) {
            this.#updateBuffered();
            return {
              frame: undefined,
              group: group2.consumer.sequence,
              discontinuity: this.#rewind.discontinuity
            };
          }
        }
      }
      if (this.#notify) {
        throw new Error("multiple calls to next not supported");
      }
      const abort = this.#signals.abort;
      if (abort.aborted)
        return;
      const aborted2 = await new Promise((resolve) => {
        const onAbort = () => resolve(true);
        abort.addEventListener("abort", onAbort, { once: true });
        this.#notify = () => {
          abort.removeEventListener("abort", onAbort);
          resolve(false);
        };
      });
      this.#notify = undefined;
      if (aborted2)
        return;
    }
  }
  #updateBuffered() {
    const ranges = [];
    let prev;
    for (const group2 of this.#groups) {
      const first = group2.frames.at(0);
      if (!first || group2.latest === undefined)
        continue;
      const start = exports_time.Milli.fromMicro(first.timestamp);
      const end = exports_time.Milli.fromMicro(group2.latest);
      const last = ranges.at(-1);
      const contiguous = prev?.done && prev.consumer.sequence + 1 === group2.consumer.sequence;
      if (last && (last.end >= start || contiguous)) {
        last.end = exports_time.Milli.max(last.end, end);
      } else {
        ranges.push({ start, end });
      }
      prev = group2;
    }
    this.#buffered.set(ranges);
  }
  get discontinuity() {
    return this.#rewind.discontinuity;
  }
  close() {
    this.#signals.close();
  }
}
// node_modules/@moq/hang/container/legacy.js
var exports_legacy = {};
__export(exports_legacy, {
  encodeFrame: () => encodeFrame,
  Producer: () => Producer4,
  Format: () => Format3
});
class Format3 {
  decode(frame) {
    const [timestamp, data] = exports_varint.decode(frame);
    return [{ data, timestamp, keyframe: false }];
  }
}
function encodeFrame(source, timestamp) {
  const timestampBytes = exports_varint.encode(timestamp);
  const data = new Uint8Array(timestampBytes.byteLength + source.byteLength);
  data.set(timestampBytes, 0);
  if (source instanceof Uint8Array) {
    data.set(source, timestampBytes.byteLength);
  } else {
    source.copyTo(data.subarray(timestampBytes.byteLength));
  }
  return data;
}

class Producer4 {
  #track;
  #group;
  constructor(track2) {
    this.#track = track2;
  }
  encode(data, timestamp, keyframe) {
    if (keyframe) {
      this.#group?.close();
      this.#group = this.#track.appendGroup();
    } else if (!this.#group) {
      throw new Error("must start with a keyframe");
    }
    this.#group?.writeFrame(encodeFrame(data, timestamp));
  }
  close(err2) {
    this.#track.close(err2);
    this.#group?.close();
  }
}

// node_modules/@moq/hang/container/types.js
function mergeBufferedRanges(a, b) {
  if (a.length === 0)
    return b;
  if (b.length === 0)
    return a;
  const result = [];
  const all = [...a, ...b].sort((x, y) => x.start - y.start);
  for (const range of all) {
    const last = result.at(-1);
    if (last && last.end >= range.start) {
      last.end = exports_time.Milli.max(last.end, range.end);
    } else {
      result.push({ ...range });
    }
  }
  return result;
}
// node_modules/@moq/hang/util/hacks.js
var exports_hacks = {};
__export(exports_hacks, {
  isFirefox: () => isFirefox2,
  isChrome: () => isChrome
});
var isChrome = navigator.userAgent.toLowerCase().includes("chrome");
var isFirefox2 = navigator.userAgent.toLowerCase().includes("firefox");

// node_modules/@moq/hang/util/libav.js
var exports_libav = {};
__export(exports_libav, {
  polyfill: () => polyfill
});
var loading;
async function polyfill() {
  if (globalThis.AudioEncoder && globalThis.AudioDecoder) {
    return true;
  }
  if (!loading) {
    console.warn("using Opus polyfill; performance may be degraded");
    loading = Promise.all([
      Promise.resolve().then(() => (init_libav_opus_af(), exports_libav_opus_af)),
      Promise.resolve().then(() => (init_main(), exports_main))
    ]).then(async ([opus, libav2]) => {
      await libav2.load({
        LibAV: opus,
        polyfill: true
      });
      return true;
    });
  }
  return await loading;
}

// node_modules/@moq/publish/source-R52213JX.js
function l(e) {
  return "track" in e ? e : {
    track: e,
    kind: "auto"
  };
}
var u = new Blob([`var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// ../net/src/path.ts
var init_path = __esm({
  "../net/src/path.ts"() {
    "use strict";
  }
});

// ../net/src/varint.ts
var MAX_U6, MAX_U14, MAX_U30, MAX_U53, MAX_U64, MAX_U62;
var init_varint = __esm({
  "../net/src/varint.ts"() {
    "use strict";
    MAX_U6 = 2 ** 6 - 1;
    MAX_U14 = 2 ** 14 - 1;
    MAX_U30 = 2 ** 30 - 1;
    MAX_U53 = Number.MAX_SAFE_INTEGER;
    MAX_U64 = (1n << 64n) - 1n;
    MAX_U62 = 2n ** 62n - 1n;
  }
});

// ../net/src/index.ts
init_path();

// ../net/src/time.ts
var time_exports = {};
__export(time_exports, {
  Micro: () => Micro,
  Milli: () => Milli,
  Nano: () => Nano,
  Second: () => Second
});
var Nano = {
  zero: 0,
  fromMicro: (us) => us * 1e3,
  fromMilli: (ms) => ms * 1e6,
  fromSecond: (s) => s * 1e9,
  toMicro: (ns) => ns / 1e3,
  toMilli: (ns) => ns / 1e6,
  toSecond: (ns) => ns / 1e9,
  now: () => performance.now() * 1e6,
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  mul: (a, b) => a * b,
  div: (a, b) => a / b,
  max: (a, b) => Math.max(a, b),
  min: (a, b) => Math.min(a, b)
};
var Micro = {
  zero: 0,
  fromNano: (ns) => ns / 1e3,
  fromMilli: (ms) => ms * 1e3,
  fromSecond: (s) => s * 1e6,
  toNano: (us) => us * 1e3,
  toMilli: (us) => us / 1e3,
  toSecond: (us) => us / 1e6,
  now: () => performance.now() * 1e3,
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  mul: (a, b) => a * b,
  div: (a, b) => a / b,
  max: (a, b) => Math.max(a, b),
  min: (a, b) => Math.min(a, b)
};
var Milli = {
  zero: 0,
  fromNano: (ns) => ns / 1e6,
  fromMicro: (us) => us / 1e3,
  fromSecond: (s) => s * 1e3,
  toNano: (ms) => ms * 1e6,
  toMicro: (ms) => ms * 1e3,
  toSecond: (ms) => ms / 1e3,
  now: () => performance.now(),
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  mul: (a, b) => a * b,
  div: (a, b) => a / b,
  max: (a, b) => Math.max(a, b),
  min: (a, b) => Math.min(a, b)
};
var Second = {
  zero: 0,
  fromNano: (ns) => ns / 1e9,
  fromMicro: (us) => us / 1e6,
  fromMilli: (ms) => ms / 1e3,
  toNano: (s) => s * 1e9,
  toMicro: (s) => s * 1e6,
  toMilli: (s) => s * 1e3,
  now: () => performance.now() / 1e3,
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  mul: (a, b) => a * b,
  div: (a, b) => a / b,
  max: (a, b) => Math.max(a, b),
  min: (a, b) => Math.min(a, b)
};

// ../net/src/index.ts
init_varint();

// src/audio/capture-worklet.ts
var Capture = class extends AudioWorkletProcessor {
  #sampleCount = 0;
  #zero;
  constructor(options) {
    super();
    this.#zero = options?.processorOptions?.zero ?? 0;
  }
  process(input) {
    if (input.length > 1) throw new Error("only one input is supported.");
    const channels = input[0];
    if (channels.length === 0) return true;
    const timestamp = time_exports.Micro.fromSecond(this.#sampleCount / sampleRate) + this.#zero;
    const msg = {
      timestamp,
      channels
    };
    this.port.postMessage(msg);
    this.#sampleCount += channels[0].length;
    return true;
  }
};
registerProcessor("capture", Capture);
`], { type: "application/javascript" });
var d = URL.createObjectURL(u);
var f = 0.001;
var p = 0.2;
var m = 32000;
var h = 20;
var g = 64000;
var _ = 1024;
var v = "mp4a.40.2";
var y = class e {
  static TRACK = "audio/data";
  static PRIORITY = PRIORITY.audio;
  enabled;
  muted;
  volume;
  sampleRate;
  channelCount;
  codec;
  source;
  #e = new Signal(undefined);
  catalog = this.#e;
  #t = new Signal(undefined);
  #n = new Signal(undefined);
  config = this.#n;
  #r = new Signal(undefined);
  #i = new Signal(undefined);
  root = this.#i;
  active = new Signal(false);
  #a = new Effect;
  constructor(e2) {
    this.source = Signal.from(e2?.source), this.enabled = Signal.from(e2?.enabled ?? false), this.muted = Signal.from(e2?.muted ?? false), this.volume = Signal.from(e2?.volume ?? 1), this.sampleRate = Signal.from(e2?.sampleRate), this.channelCount = Signal.from(e2?.channelCount), this.codec = Signal.from(e2?.codec ?? "opus"), this.#a.run(this.#o.bind(this)), this.#a.run(this.#u.bind(this)), this.#a.run(this.#c.bind(this)), this.#a.run(this.#d.bind(this));
  }
  #o(e2) {
    let t = e2.getAll([this.enabled, this.source]);
    if (!t)
      return;
    let [n, r] = t, i = l(r), a = i.track.getSettings(), o = e2.get(this.sampleRate) ?? a.sampleRate, s = e2.get(this.channelCount) ?? b(i.track), c = new AudioContext({
      latencyHint: "interactive",
      sampleRate: o
    });
    e2.cleanup(() => c.close());
    let u2 = new MediaStreamAudioSourceNode(c, { mediaStream: new MediaStream([i.track]) });
    e2.cleanup(() => u2.disconnect());
    let f2 = new GainNode(c, { gain: this.volume.peek() });
    u2.connect(f2), e2.cleanup(() => f2.disconnect()), e2.spawn(async () => {
      if (await c.audioWorklet.addModule(d), c.state === "closed")
        return;
      let t2 = s ?? a.channelCount ?? u2.channelCount, n2 = new AudioWorkletNode(c, "capture", {
        numberOfInputs: 1,
        numberOfOutputs: 0,
        channelCount: t2,
        channelCountMode: s === undefined ? "max" : "explicit",
        processorOptions: { zero: performance.now() * 1000 }
      });
      e2.set(this.#r, n2), e2.event(n2.port, "message", (e3) => {
        let t3 = e3.data.channels.length;
        t3 && this.#t.set({
          sampleRate: n2.context.sampleRate,
          channelCount: t3
        });
      }, { once: true }), n2.port.start(), e2.cleanup(() => {
        this.#t.set(undefined);
      }), f2.connect(n2), e2.cleanup(() => n2.disconnect()), e2.set(this.#i, f2);
    });
  }
  #s(e2, t) {
    let n = u53(e2.sampleRate), r = u53(e2.channelCount);
    return t.mime === "aac" ? {
      codec: v,
      sampleRate: n,
      numberOfChannels: r,
      bitrate: u53(t.bitrate ?? e2.channelCount * g),
      container: { kind: "legacy" },
      description: exports_hex2.fromBytes(exports_aac.audioSpecificConfig(e2.sampleRate, e2.channelCount)),
      jitter: u53(Math.ceil(_ / e2.sampleRate * 1000))
    } : {
      codec: "opus",
      sampleRate: n,
      numberOfChannels: r,
      bitrate: u53(t.bitrate ?? e2.channelCount * m),
      container: { kind: "legacy" },
      jitter: u53(t.frameDuration ?? h)
    };
  }
  #c(e2) {
    let t = e2.get(this.#t);
    if (!t) {
      e2.set(this.#n, undefined);
      return;
    }
    let n = x(e2.get(this.codec));
    e2.set(this.#n, this.#s(t, n));
  }
  #l(e2) {
    let t = x(e2.get(this.codec)), n = {};
    return t.mime === "opus" ? (t.complexity !== undefined && (n.complexity = t.complexity), t.packetlossperc !== undefined && (n.packetlossperc = t.packetlossperc), t.useinbandfec !== undefined && (n.useinbandfec = t.useinbandfec), t.usedtx !== undefined && (n.usedtx = t.usedtx), n) : n;
  }
  #u(e2) {
    let t = e2.get(this.#i);
    if (!t)
      return;
    e2.cleanup(() => t.gain.cancelScheduledValues(t.context.currentTime));
    let n = e2.get(this.muted) ? 0 : e2.get(this.volume);
    n < f ? (t.gain.exponentialRampToValueAtTime(f, t.context.currentTime + p), t.gain.setValueAtTime(0, t.context.currentTime + p + 0.01)) : t.gain.exponentialRampToValueAtTime(n, t.context.currentTime + p);
  }
  serve(e2, t) {
    let n = t.getAll([this.enabled, this.#r]);
    if (!n)
      return;
    let [r, i] = n;
    t.set(this.active, true, false), t.cleanup(() => e2.close()), t.spawn(async () => {
      await exports_libav.polyfill();
      let n2 = new AudioEncoder({
        output: (t2) => {
          if (t2.type !== "key")
            throw Error("only key frames are supported");
          e2.writeFrame(exports_legacy.encodeFrame(t2, t2.timestamp));
        },
        error: (t2) => {
          console.error("encoder error", t2), e2.close(t2);
        }
      });
      t.cleanup(() => n2.close());
      let r2;
      t.run((e3) => {
        if (r2 = e3.get(this.#n), !r2)
          return;
        let t2 = e3.get(this.source), i2 = t2 ? l(t2).kind : "auto", a = C(r2, i2, this.#l(e3));
        console.debug("encoding audio", a), n2.configure(a);
      }), t.event(i.port, "message", (e3) => {
        let t2 = e3.data, a = t2.channels.length;
        if (!a)
          return;
        if (!r2 || a !== r2.numberOfChannels) {
          this.#t.set({
            sampleRate: i.context.sampleRate,
            channelCount: a
          });
          return;
        }
        let o = t2.channels, s = o.reduce((e4, t3) => e4 + t3.length, 0), c = new Float32Array(s);
        o.reduce((e4, t3) => (c.set(t3, e4), e4 + t3.length), 0);
        let l2 = new AudioData({
          format: "f32-planar",
          sampleRate: i.context.sampleRate,
          numberOfFrames: o[0].length,
          numberOfChannels: o.length,
          timestamp: t2.timestamp,
          data: c,
          transfer: [c.buffer]
        });
        n2.encode(l2), l2.close();
      }), i.port.start();
    });
  }
  #d(t) {
    let n = t.get(this.#n);
    if (!n) {
      t.set(this.#e, undefined);
      return;
    }
    let r = { renditions: { [e.TRACK]: n } };
    t.set(this.#e, r);
  }
  close() {
    this.#a.close();
  }
};
function b(e2) {
  let t = e2.getConstraints().channelCount;
  if (t !== undefined)
    return typeof t == "number" ? t : t.exact ?? t.ideal ?? t.max ?? t.min;
}
function x(e2) {
  return e2 === "opus" ? { mime: "opus" } : e2 === "aac" ? { mime: "aac" } : e2;
}
function S(e2) {
  switch (e2) {
    case "voice":
      return {
        application: "voip",
        signal: "voice",
        usedtx: true
      };
    case "music":
      return {
        application: "audio",
        signal: "music"
      };
    default:
      return {};
  }
}
function C(e2, t, n) {
  let r = {
    codec: e2.codec,
    sampleRate: e2.sampleRate,
    numberOfChannels: e2.numberOfChannels,
    bitrate: e2.bitrate
  };
  if (e2.codec.startsWith("mp4a") && (r.aac = { format: "aac" }), e2.codec === "opus") {
    let i = {
      ...S(t),
      ...n
    };
    e2.jitter !== undefined && (i.frameDuration = e2.jitter * 1000), Object.keys(i).length > 0 && (r.opus = i);
  }
  return r;
}
var T = class {
  enabled;
  source;
  frame;
  #e = new Signal(undefined);
  catalog = this.#e;
  #t = new Effect;
  config;
  #n = new Signal(undefined);
  #r = new Signal(undefined);
  resolved = this.#r;
  active = new Signal(false);
  connection;
  constructor(e2, t, n, i) {
    this.frame = e2, this.source = t, this.connection = n, this.enabled = Signal.from(i?.enabled ?? false), this.config = Signal.from(i?.config), this.#t.run(this.#i.bind(this)), this.#t.run(this.#a.bind(this)), this.#t.run(this.#o.bind(this));
  }
  serve(e2, n) {
    if (!n.get(this.enabled))
      return;
    let r = new exports_legacy.Producer(e2);
    n.cleanup(() => r.close());
    let i, o;
    n.set(this.active, true, false), n.spawn(async () => {
      let e3 = new VideoEncoder({
        output: (e4) => {
          e4.type === "key" && (i = e4.timestamp), r.encode(e4, e4.timestamp, e4.type === "key");
        },
        error: (e4) => {
          r.close(e4);
        }
      });
      n.cleanup(() => e3.close()), n.run(() => {
        let t = n.get(this.#r);
        t && e3.configure(t);
      }), n.run((n2) => {
        let r2 = n2.get(this.frame);
        if (!r2 || e3.state !== "configured")
          return;
        let a = this.config.peek(), s = a?.frameRate;
        if (s && o !== undefined) {
          let e4 = exports_time.Micro.fromSecond(1 / s);
          if (r2.timestamp - o < e4 - e4 / 2)
            return;
        }
        o = r2.timestamp;
        let c = a?.keyframeInterval ?? exports_time.Milli.fromSecond(2), l2 = !i || i + exports_time.Micro.fromMilli(c) <= r2.timestamp;
        l2 && (i = r2.timestamp), e3.encode(r2, { keyFrame: l2 });
      });
    });
  }
  #i(e2) {
    let t = e2.getAll([this.enabled, this.#r]);
    if (!t)
      return;
    let [n, r] = t, a = {
      codec: r.codec,
      bitrate: r.bitrate ? u53(r.bitrate) : undefined,
      framerate: r.framerate,
      codedWidth: u53(r.width),
      codedHeight: u53(r.height),
      optimizeForLatency: true,
      container: { kind: "legacy" },
      jitter: r.framerate ? u53(Math.ceil(1000 / r.framerate)) : undefined
    };
    e2.set(this.#e, a);
  }
  #a(e2) {
    let t = e2.getAll([
      this.enabled,
      this.source,
      this.#n
    ]);
    if (!t)
      return;
    let [n, r, i] = t, a = r.getSettings(), o = e2.get(this.config) ?? {}, s = o.frameRate ?? a.frameRate ?? 30, c = o.maxPixels ?? i.width * i.height, l2 = o.bitrateScale ?? 0.07;
    e2.spawn(async () => {
      let t2 = await this.#s(e2);
      if (!t2)
        return;
      let { codec: n2, hardwareAcceleration: r2 } = t2, a2 = 30 + (s - 30) / 2, u2 = Math.round(c * l2 * a2);
      if (n2.startsWith("avc1"))
        u2 *= 1;
      else if (n2.startsWith("hev1"))
        u2 *= 0.7;
      else if (n2.startsWith("vp09"))
        u2 *= 0.8;
      else if (n2.startsWith("av01"))
        u2 *= 0.6;
      else if (n2 === "vp8")
        u2 *= 1.1;
      else
        throw Error(`unknown codec: ${n2}`);
      if (u2 = Math.round(Math.min(u2, o.maxBitrate || u2)), !o.maxBitrate) {
        let t3 = e2.get(this.connection)?.sendBandwidth;
        if (t3) {
          let n3 = e2.get(t3);
          if (n3 != null) {
            let e3 = Math.round(n3 * 0.9);
            u2 = Math.min(u2, e3);
          }
        }
      }
      let d2 = {
        codec: n2,
        width: i.width,
        height: i.height,
        framerate: s,
        bitrate: u2,
        avc: n2.startsWith("avc1") ? { format: "annexb" } : undefined,
        hevc: n2.startsWith("hev1") ? { format: "annexb" } : undefined,
        latencyMode: "realtime",
        hardwareAcceleration: r2
      };
      e2.set(this.#r, d2);
    });
  }
  #o(e2) {
    let t = e2.get(this.config), n = e2.get(this.frame);
    if (!n)
      return;
    let r = n.codedWidth * n.codedHeight, i = t?.maxPixels ?? r;
    if (t?.maxScale !== undefined) {
      if (!Number.isFinite(t.maxScale) || t.maxScale <= 0)
        throw Error(`maxScale must be a finite number greater than 0: ${t.maxScale}`);
      i = Math.min(i, r * t.maxScale);
    }
    let a = Math.min(Math.sqrt(i / r), 1), o = 16 * Math.floor(n.codedWidth * a / 16), s = 16 * Math.floor(n.codedHeight * a / 16);
    e2.set(this.#n, {
      width: o,
      height: s
    });
  }
  async#s(e2) {
    let t = e2.get(this.config)?.codec ?? "", n = e2.get(this.#n);
    if (!n)
      return;
    let r = [
      "vp09.00.10.08",
      "vp09",
      "avc1.640028",
      "avc1.4D401F",
      "avc1.42E01E",
      "avc1",
      "av01.0.08M.08",
      "av01",
      "hev1.1.6.L93.B0",
      "hev1",
      "vp8"
    ], i = [
      "avc1.640028",
      "avc1.4D401F",
      "avc1.42E01E",
      "avc1",
      "vp8",
      "vp09.00.10.08",
      "vp09",
      "hev1.1.6.L93.B0",
      "hev1",
      "av01.0.08M.08",
      "av01"
    ];
    if (!exports_hacks.isFirefox)
      for (let e3 of r) {
        if (!e3.startsWith(t))
          continue;
        let r2 = "prefer-hardware", i2 = {
          codec: e3,
          width: n.width,
          height: n.height,
          latencyMode: "realtime",
          hardwareAcceleration: r2,
          avc: e3.startsWith("avc1") ? { format: "annexb" } : undefined,
          hevc: e3.startsWith("hev1") ? { format: "annexb" } : undefined
        }, { supported: a } = await VideoEncoder.isConfigSupported(i2);
        if (a)
          return {
            codec: e3,
            hardwareAcceleration: r2
          };
      }
    for (let e3 of i) {
      if (!e3.startsWith(t))
        continue;
      let r2 = "prefer-software", i2 = {
        codec: e3,
        width: n.width,
        height: n.height,
        latencyMode: "realtime",
        hardwareAcceleration: r2,
        avc: e3.startsWith("avc1") ? { format: "annexb" } : undefined,
        hevc: e3.startsWith("hev1") ? { format: "annexb" } : undefined
      }, { supported: a } = await VideoEncoder.isConfigSupported(i2);
      if (a)
        return {
          codec: e3,
          hardwareAcceleration: r2
        };
    }
    throw Error("no supported codec");
  }
  close() {
    this.#t.close();
  }
};
function E(e2) {
  if (self.MediaStreamTrackProcessor) {
    let t, n2 = 0, r2 = new TransformStream({ transform(e3, r3) {
      t === undefined && (t = e3.timestamp, n2 = performance.now() * 1000);
      let i2 = new VideoFrame(e3, { timestamp: e3.timestamp - t + n2 });
      e3.close(), r3.enqueue(i2);
    } });
    return new self.MediaStreamTrackProcessor({ track: e2 }).readable.pipeThrough(r2);
  }
  console.warn("Using MediaStreamTrackProcessor polyfill; performance might suffer.");
  let n = e2.getSettings();
  if (!n)
    throw Error("track has no settings");
  let r, i, a = n.frameRate ?? 30;
  return new ReadableStream({
    async start() {
      r = document.createElement("video"), r.srcObject = new MediaStream([e2]), await Promise.all([r.play(), new Promise((e3) => {
        r.onloadedmetadata = e3;
      })]), i = exports_time.Milli.now();
    },
    async pull(e3) {
      for (;; ) {
        let n2 = exports_time.Milli.now();
        if (exports_time.Milli.sub(n2, i) < 1000 / a) {
          await new Promise((e4) => requestAnimationFrame(e4));
          continue;
        }
        i = n2, e3.enqueue(new VideoFrame(r, { timestamp: exports_time.Micro.fromMilli(i) }));
      }
    }
  });
}
var O = class e2 {
  static TRACK_HD = "video/hd";
  static TRACK_SD = "video/sd";
  static PRIORITY = PRIORITY.video;
  static SD_DEFAULT_CONFIG = { maxScale: 0.1875 };
  source;
  hd;
  sd;
  frame = new Signal(undefined);
  catalog = new Signal(undefined);
  display = new Signal(undefined);
  flip = new Signal(false);
  signals = new Effect;
  constructor(t) {
    this.source = Signal.from(t?.source);
    let n = t?.connection ?? new Signal(undefined);
    this.hd = new T(this.frame, this.source, n, t?.hd), this.sd = new T(this.frame, this.source, n, {
      ...t?.sd,
      config: t?.sd?.config ?? e2.SD_DEFAULT_CONFIG
    }), this.flip = Signal.from(t?.flip ?? false), this.signals.run(this.#t.bind(this)), this.signals.run(this.#e.bind(this));
  }
  #e(e3) {
    let t = e3.get(this.source);
    if (!t)
      return;
    let n = E(t).getReader();
    e3.cleanup(() => n.cancel()), e3.spawn(async () => {
      for (;; ) {
        let t2 = await Promise.race([n.read(), e3.cancel]);
        if (!t2?.value)
          break;
        this.frame.update((e4) => (e4?.close(), t2.value)), this.display.set({
          width: t2.value.codedWidth,
          height: t2.value.codedHeight
        });
      }
    }), e3.cleanup(() => {
      this.frame.update((e4) => {
        e4?.close();
      }), this.display.set(undefined);
    });
  }
  #t(t) {
    if (!t.get(this.source))
      return;
    let n = t.get(this.display);
    if (!n)
      return;
    let r = t.get(this.hd.catalog), a = t.get(this.sd.catalog), o = {};
    r && (o[e2.TRACK_HD] = r), a && (o[e2.TRACK_SD] = a);
    let s = {
      renditions: o,
      display: {
        width: u53(n.width),
        height: u53(n.height)
      },
      flip: t.get(this.flip) ?? undefined
    };
    t.set(this.catalog, s);
  }
  close() {
    this.signals.close(), this.hd.close(), this.sd.close(), this.frame.update((e3) => {
      e3?.close();
    });
  }
};
var k = class t {
  static CATALOG_TRACK = TRACK;
  static CATALOG_TRACK_COMPRESSED = TRACK_COMPRESSED;
  connection;
  enabled;
  name;
  audio;
  video;
  catalog = new Producer2;
  #e = /* @__PURE__ */ new Map;
  static #t = /* @__PURE__ */ new Set([
    t.CATALOG_TRACK,
    t.CATALOG_TRACK_COMPRESSED,
    y.TRACK,
    O.TRACK_HD,
    O.TRACK_SD
  ]);
  signals = new Effect;
  constructor(t2) {
    this.connection = Signal.from(t2?.connection), this.enabled = Signal.from(t2?.enabled ?? false), this.name = Signal.from(t2?.name ?? exports_path.empty()), this.audio = new y(t2?.audio), this.video = new O({
      ...t2?.video,
      connection: this.connection
    }), this.signals.run(this.#n.bind(this)), this.signals.run(this.#r.bind(this));
  }
  #n(e3) {
    let t2 = e3.get(this.enabled), n = t2 ? e3.get(this.video.catalog) : undefined, r = t2 ? e3.get(this.audio.catalog) : undefined;
    this.catalog.mutate((e4) => {
      n === undefined ? delete e4.video : e4.video = n, r === undefined ? delete e4.audio : e4.audio = r;
    });
  }
  #r(t2) {
    let n = t2.getAll([this.enabled, this.connection]);
    if (!n)
      return;
    let [r, a] = n, o = t2.get(this.name);
    detectFormat(o) === undefined && console.warn(`You should append .hang to broadcast name ${JSON.stringify(o)} to make the catalog format explicit.`);
    let s = new Broadcast;
    t2.cleanup(() => s.close()), a.publish(o, s), t2.spawn(this.#i.bind(this, s, t2));
  }
  async#i(e3, n) {
    for (;; ) {
      let r = await e3.requested();
      if (!r)
        break;
      n.cleanup(() => r.track.close()), n.run((e4) => {
        if (!e4.get(r.track.state.closed))
          switch (r.track.name) {
            case t.CATALOG_TRACK:
              this.catalog.serve(r.track, e4);
              break;
            case t.CATALOG_TRACK_COMPRESSED:
              this.catalog.serve(r.track, e4, { compression: true });
              break;
            case y.TRACK:
              this.audio.serve(r.track, e4);
              break;
            case O.TRACK_HD:
              this.video.hd.serve(r.track, e4);
              break;
            case O.TRACK_SD:
              this.video.sd.serve(r.track, e4);
              break;
            default: {
              let t2 = this.#e.get(r.track.name);
              if (t2) {
                t2(r.track, e4);
                break;
              }
              console.error("received subscription for unknown track", r.track.name), r.track.close(/* @__PURE__ */ Error(`Unknown track: ${r.track.name}`));
              break;
            }
          }
      });
    }
  }
  publishTrack(e3, n) {
    if (t.#t.has(e3))
      throw Error(`Track name is reserved: ${e3}`);
    return this.#e.set(e3, n), () => {
      this.#e.get(e3) === n && this.#e.delete(e3);
    };
  }
  close() {
    this.signals.close(), this.audio.close(), this.video.close();
  }
};
var j = class {
  canvas;
  mode;
  enabled;
  #e;
  #t = new Signal(undefined);
  #n = new Signal(undefined);
  #r = new Effect;
  constructor(e3) {
    this.canvas = Signal.from(e3.canvas), this.mode = Signal.from(e3.mode ?? "source"), this.enabled = Signal.from(e3.enabled ?? true), this.#e = e3.video, this.#r.run((e4) => {
      let t2 = e4.get(this.canvas);
      this.#n.set(t2?.getContext("2d") ?? undefined);
    }), this.#r.run(this.#i.bind(this)), this.#r.run(this.#a.bind(this));
  }
  #i(e3) {
    let t2 = e3.get(this.mode);
    if (t2 === "none" || !e3.get(this.enabled)) {
      e3.set(this.#t, undefined);
      return;
    }
    if (t2 === "encoded") {
      let t3 = new M({
        source: this.#e.frame,
        config: this.#e.hd.resolved,
        settings: this.#e.hd.config
      });
      e3.cleanup(() => t3.close()), e3.proxy(this.#t, t3.frame);
      return;
    }
    e3.proxy(this.#t, this.#e.frame);
  }
  #a(e3) {
    let t2 = e3.get(this.#n);
    if (!t2)
      return;
    let n = e3.get(this.#t), r = e3.get(this.#e.display), i = e3.get(this.#e.flip), a = n?.displayWidth ?? r?.width, o = n?.displayHeight ?? r?.height;
    a && o && (t2.canvas.width !== a || t2.canvas.height !== o) && (t2.canvas.width = a, t2.canvas.height = o), t2.fillStyle = "#000", t2.fillRect(0, 0, t2.canvas.width, t2.canvas.height), n && (t2.save(), i && (t2.scale(-1, 1), t2.translate(-t2.canvas.width, 0)), t2.drawImage(n, 0, 0, t2.canvas.width, t2.canvas.height), t2.restore());
  }
  close() {
    this.#r.close();
  }
};
var M = class {
  frame = new Signal(undefined);
  #e;
  #t;
  #n;
  #r = new Effect;
  constructor(e3) {
    this.#e = e3.source, this.#t = e3.config, this.#n = e3.settings, this.#r.run(this.#i.bind(this));
  }
  #i(e3) {
    let n = e3.get(this.#t);
    if (!n)
      return;
    let r = new VideoDecoder({
      output: (e4) => {
        this.frame.update((t2) => (t2?.close(), e4));
      },
      error: (t2) => {
        console.warn("preview: decode error", t2), e3.close();
      }
    });
    e3.cleanup(() => {
      r.state !== "closed" && r.close();
    });
    let i = new VideoEncoder({
      output: (e4) => {
        r.state === "configured" && r.decode(e4);
      },
      error: (t2) => {
        console.warn("preview: encode error", t2), e3.close();
      }
    });
    e3.cleanup(() => {
      i.state !== "closed" && i.close();
    }), i.configure(n), r.configure({
      codec: n.codec,
      optimizeForLatency: true
    });
    let a;
    e3.run((e4) => {
      let n2 = e4.get(this.#e);
      if (!n2 || i.state !== "configured")
        return;
      let r2 = (this.#n ? e4.get(this.#n) : undefined)?.keyframeInterval ?? exports_time.Milli.fromSecond(2), o = n2.timestamp, s = a === undefined || a + exports_time.Micro.fromMilli(r2) <= o;
      s && (a = o), i.encode(n2, { keyFrame: s });
    }), e3.cleanup(() => {
      this.frame.update((e4) => {
        e4?.close();
      });
    });
  }
  close() {
    this.#r.close(), this.frame.update((e3) => {
      e3?.close();
    });
  }
};
var N = class {
  kind;
  #e = new Signal(undefined);
  available = this.#e;
  #t = new Signal(undefined);
  default = this.#t;
  preferred;
  active = new Signal(undefined);
  permission = new Signal(false);
  #n = new Signal(undefined);
  requested = this.#n;
  signals = new Effect;
  constructor(e3, t2) {
    this.kind = e3, this.preferred = Signal.from(t2?.preferred), this.signals.run((e4) => {
      e4.spawn(this.#r.bind(this, e4)), e4.event(navigator.mediaDevices, "devicechange", () => this.permission.mutate(() => {}));
    }), this.signals.run(this.#i.bind(this));
  }
  async#r(e3) {
    e3.get(this.permission);
    let t2 = await Promise.race([navigator.mediaDevices.enumerateDevices().catch(() => {
      return;
    }), e3.cancel]);
    if (!t2)
      return;
    if (t2 = t2.filter((e4) => e4.kind === `${this.kind}input`), t2.some((e4) => e4.deviceId === "")) {
      console.warn(`no ${this.kind} permission`), this.#e.set(undefined), this.#t.set(undefined);
      return;
    }
    this.permission.set(true), t2.length || console.warn(`no ${this.kind} devices found`);
    let n = t2.find((e4) => e4.deviceId === "default");
    t2 = t2.filter((e4) => e4.deviceId !== "default");
    let r;
    n && (r = t2.find((e4) => e4.groupId === n.groupId)), r || (this.kind === "audio" ? r = t2.find((e4) => {
      let t3 = e4.label.toLowerCase();
      return t3.includes("default") || t3.includes("communications");
    }) : this.kind === "video" && (r = t2.find((e4) => {
      let t3 = e4.label.toLowerCase();
      return t3.includes("front") || t3.includes("external") || t3.includes("usb");
    }))), r ||= t2.at(0), this.#e.set(t2), this.#t.set(r?.deviceId);
  }
  #i(e3) {
    let t2 = e3.get(this.preferred);
    t2 && e3.get(this.#e)?.some((e4) => e4.deviceId === t2) ? this.#n.set(t2) : this.#n.set(e3.get(this.default));
  }
  requestPermission() {
    this.permission.peek() || navigator.mediaDevices.getUserMedia({ [this.kind]: true }).then((e3) => {
      this.permission.set(true);
      let t2 = e3.getTracks().at(0)?.getSettings().deviceId;
      t2 && this.preferred.set(t2), e3.getTracks().forEach((e4) => {
        e4.stop();
      });
    }).catch(() => {
      return;
    });
  }
  close() {
    this.signals.close();
  }
};
var P = class e3 {
  static DEFAULT_CONSTRAINTS = {
    width: { ideal: 1280 },
    height: { ideal: 720 }
  };
  enabled;
  device;
  constraints;
  source = new Signal(undefined);
  signals = new Effect;
  constructor(e4) {
    this.device = new N("video", e4?.device), this.enabled = Signal.from(e4?.enabled ?? false), this.constraints = Signal.from(e4?.constraints), this.signals.run(this.#e.bind(this));
  }
  #e(t2) {
    if (!t2.get(this.enabled))
      return;
    let n = t2.get(this.device.requested), r = t2.get(this.constraints) ?? {}, i = {
      ...e3.DEFAULT_CONSTRAINTS,
      ...r,
      deviceId: n ? { exact: n } : undefined
    };
    t2.spawn(async () => {
      let e4 = navigator.mediaDevices.getUserMedia({ video: i }).catch(() => {
        return;
      });
      t2.cleanup(() => e4.then((e5) => e5?.getTracks().forEach((e6) => {
        e6.stop();
      })));
      let n2 = await Promise.race([e4, t2.cancel]);
      if (!n2)
        return;
      this.device.permission.set(true);
      let r2 = n2.getVideoTracks()[0];
      if (!r2)
        return;
      let a = r2.getSettings();
      t2.set(this.device.active, a.deviceId), t2.set(this.source, r2);
    });
  }
  close() {
    this.signals.close(), this.device.close();
  }
};
var F = "image/*,video/*,audio/*";
var I = class {
  file = new Signal(undefined);
  signals = new Effect;
  source = new Signal({});
  enabled;
  constructor(e4) {
    this.enabled = Signal.from(e4.enabled ?? false), this.file = Signal.from(e4.file), this.signals.run((e5) => {
      let t2 = e5.getAll([this.file, this.enabled]);
      if (!t2)
        return;
      let [n] = t2;
      this.#e(n, e5).catch((e6) => {
        console.error("Failed to decode file:", e6);
      });
    });
  }
  prompt() {
    let e4 = document.createElement("input");
    e4.type = "file", e4.accept = F, e4.addEventListener("change", () => {
      let t2 = e4.files?.[0];
      t2 && this.file.set(t2);
    }), e4.click();
  }
  async#e(e4, t2) {
    let n = e4.type;
    if (n.startsWith("image/"))
      await this.#t(e4, t2);
    else if (n.startsWith("video/") || n.startsWith("audio/"))
      await this.#n(e4, t2);
    else
      throw Error(`Unsupported file type: ${n}`);
  }
  async#t(e4, t2) {
    let n = new Image, r = URL.createObjectURL(e4);
    n.src = r, await n.decode(), t2.cleanup(() => URL.revokeObjectURL(r));
    let i = document.createElement("canvas");
    i.width = n.width, i.height = n.height;
    let a = i.getContext("2d");
    if (!a)
      throw Error("Failed to create 2D canvas context");
    let o = setInterval(() => {
      a.drawImage(n, 0, 0);
    }, 1000 / 30);
    t2.cleanup(() => clearInterval(o));
    let s = i.captureStream(30).getVideoTracks()[0];
    if (!s)
      throw Error("Failed to capture video track from canvas stream");
    t2.set(this.source, { video: s }, {});
  }
  async#n(e4, t2) {
    let n = document.createElement("video"), r = URL.createObjectURL(e4);
    n.src = r, n.loop = true, n.muted = true, await new Promise((e5, t3) => {
      n.onloadedmetadata = () => e5(), n.onerror = () => t3(/* @__PURE__ */ Error("Failed to load video"));
    }), await n.play(), t2.cleanup(() => {
      n.pause(), URL.revokeObjectURL(r);
    });
    let i = n.captureStream(), a = i.getVideoTracks()[0], o = i.getAudioTracks()[0];
    if (!a && !o)
      throw Error("Failed to capture any tracks from video element");
    t2.set(this.source, {
      video: a,
      audio: o ? {
        track: o,
        kind: "auto"
      } : undefined
    }, {});
  }
  close() {
    this.signals.close();
  }
};
var L = class {
  enabled;
  device;
  constraints;
  source = new Signal(undefined);
  signals = new Effect;
  constructor(e4) {
    this.device = new N("audio", e4?.device), this.enabled = Signal.from(e4?.enabled ?? false), this.constraints = Signal.from(e4?.constraints), this.signals.run(this.#e.bind(this));
  }
  #e(e4) {
    if (!e4.get(this.enabled))
      return;
    let t2 = e4.get(this.device.requested), n = {
      ...e4.get(this.constraints) ?? {},
      deviceId: t2 === undefined ? undefined : { exact: t2 }
    };
    e4.spawn(async () => {
      let r = navigator.mediaDevices.getUserMedia({ audio: n }).catch(() => {
        return;
      });
      e4.cleanup(() => r.then((e5) => e5?.getTracks().forEach((e6) => {
        e6.stop();
      })));
      let i = await Promise.race([r, e4.cancel]);
      if (!i)
        return;
      this.device.permission.set(true);
      let a = i.getAudioTracks()[0];
      if (!a)
        return;
      let o = a.getSettings();
      t2 === undefined && this.device.preferred.set(o.deviceId), e4.set(this.device.active, o.deviceId), e4.set(this.source, {
        track: a,
        kind: "voice"
      });
    });
  }
  close() {
    this.signals.close(), this.device.close();
  }
};
var R = class {
  enabled;
  video;
  audio;
  source = new Signal(undefined);
  signals = new Effect;
  constructor(e4) {
    this.enabled = Signal.from(e4?.enabled ?? false), this.video = Signal.from(e4?.video), this.audio = Signal.from(e4?.audio), this.signals.run(this.#e.bind(this));
  }
  #e(e4) {
    if (!e4.get(this.enabled))
      return;
    let t2 = e4.get(this.video), n = e4.get(this.audio), r;
    self.CaptureController !== undefined && (r = new CaptureController, r.setFocusBehavior("no-focus-change")), e4.spawn(async () => {
      let i = await Promise.race([navigator.mediaDevices.getDisplayMedia({
        video: t2,
        audio: n,
        controller: r,
        preferCurrentTab: false,
        selfBrowserSurface: "exclude",
        surfaceSwitching: "include"
      }).catch(() => {
        return;
      }), e4.cancel]);
      if (!i)
        return;
      let a = i.getVideoTracks().at(0), o = i.getAudioTracks().at(0);
      e4.cleanup(() => a?.stop()), e4.cleanup(() => o?.stop()), e4.set(this.source, {
        video: a,
        audio: o ? {
          track: o,
          kind: "music"
        } : undefined
      });
    });
  }
  close() {
    this.signals.close();
  }
};

// node_modules/@moq/publish/element.js
var l2 = [
  "url",
  "name",
  "muted",
  "invisible",
  "source",
  "simulcast",
  "preview",
  "announce"
];
var u2 = new FinalizationRegistry((e4) => e4.close());
var d2 = class extends HTMLElement {
  static observedAttributes = l2;
  state = {
    source: new Signal(undefined),
    muted: new Signal(false),
    invisible: new Signal(false),
    simulcast: new Signal(false),
    preview: new Signal("source"),
    announce: new Signal("source")
  };
  connection;
  broadcast;
  #e = new Signal(undefined);
  video = new Signal(undefined);
  audio = new Signal(undefined);
  file = new Signal(undefined);
  #t;
  #n;
  #r;
  #i;
  #a = new Signal(false);
  #o = new Signal(false);
  signals = new Effect;
  constructor() {
    super(), u2.register(this, this.signals), this.connection = new exports_connection.Reload({ enabled: this.#a }), this.signals.cleanup(() => this.connection.close()), this.#t = new Signal(false), this.#n = new Signal(false), this.#r = new Signal(false), this.#i = new Signal(false), this.signals.run((e5) => {
      let t2 = e5.get(this.state.muted), n2 = e5.get(this.state.invisible), r = e5.get(this.state.simulcast);
      this.#t.set(!n2), this.#n.set(!t2), this.#r.set(!t2 || !n2), this.#i.set(r && !n2);
    }), this.signals.run((e5) => {
      let t2 = e5.get(this.#a), n2 = e5.get(this.state.announce), r = e5.get(this.state.source) !== undefined, i = n2 === "always" || n2 === "source" && r;
      this.#o.set(t2 && i);
    }), this.broadcast = new k({
      connection: this.connection.established,
      enabled: this.#o,
      audio: { enabled: this.#n },
      video: {
        hd: { enabled: this.#t },
        sd: { enabled: this.#i }
      }
    }), this.signals.cleanup(() => this.broadcast.close());
    let e4 = () => {
      this.#e.set(this.querySelector("video, canvas"));
    }, n = new MutationObserver(e4);
    n.observe(this, {
      childList: true,
      subtree: true
    }), this.signals.cleanup(() => n.disconnect()), e4(), this.signals.run((e5) => {
      let t2 = e5.get(this.#e);
      if (!t2)
        return;
      if (t2 instanceof HTMLCanvasElement) {
        let n3 = new j({
          canvas: t2,
          video: this.broadcast.video,
          mode: this.state.preview,
          enabled: this.#t
        });
        e5.cleanup(() => n3.close());
        return;
      }
      if (e5.get(this.state.preview) === "none") {
        t2.style.display = "none";
        return;
      }
      let n2 = e5.get(this.broadcast.video.source);
      if (!n2) {
        t2.style.display = "none";
        return;
      }
      t2.srcObject = new MediaStream([n2]), t2.style.display = "block", e5.cleanup(() => {
        t2.srcObject = null;
      });
    }), this.signals.run((e5) => {
      e5.get(this.#e) instanceof HTMLVideoElement && e5.get(this.state.preview) === "encoded" && console.warn('moq-publish: preview="encoded" requires a <canvas> element; showing the raw source.');
    }), this.signals.run(this.#s.bind(this));
  }
  connectedCallback() {
    this.#a.set(true);
  }
  disconnectedCallback() {
    this.#a.set(false);
  }
  attributeChangedCallback(e4, t2, n) {
    if (t2 !== n)
      if (e4 === "url")
        this.connection.url.set(n ? new URL(n) : undefined);
      else if (e4 === "name")
        this.broadcast.name.set(exports_path.from(n ?? ""));
      else if (e4 === "source")
        if (n === "camera" || n === "screen" || n === "file" || n === null)
          this.state.source.set(n);
        else
          throw Error(`Invalid source: ${n}`);
      else if (e4 === "announce")
        if (n === "source" || n === null)
          this.state.announce.set("source");
        else if (n === "always")
          this.state.announce.set("always");
        else if (n === "never")
          this.state.announce.set("never");
        else
          throw Error(`Invalid announce: ${n}`);
      else if (e4 === "muted")
        this.state.muted.set(n !== null);
      else if (e4 === "invisible")
        this.state.invisible.set(n !== null);
      else if (e4 === "simulcast")
        this.state.simulcast.set(n !== null);
      else if (e4 === "preview")
        if (n === "encoded" || n === "source" || n === "none")
          this.state.preview.set(n);
        else if (n === null)
          this.state.preview.set("source");
        else
          throw Error(`Invalid preview: ${n}`);
      else
        throw Error(`Invalid attribute: ${e4}`);
  }
  #s(t2) {
    let i = t2.get(this.state.source);
    if (i) {
      if (i === "camera") {
        let n = new P({ enabled: this.#t });
        this.signals.run((e4) => {
          let t3 = e4.get(n.source);
          this.broadcast.video.source.set(t3);
        });
        let r = new L({ enabled: this.#n });
        this.signals.run((e4) => {
          let t3 = e4.get(r.source);
          this.broadcast.audio.source.set(t3);
        }), t2.set(this.video, n), t2.set(this.audio, r), t2.cleanup(() => {
          n.close(), r.close();
        });
        return;
      }
      if (i === "screen") {
        let e4 = new R({ enabled: this.#r });
        this.signals.run((t3) => {
          let n = t3.get(e4.source);
          n && (t3.set(this.broadcast.video.source, n.video), t3.set(this.broadcast.audio.source, n.audio));
        }), t2.set(this.video, e4), t2.set(this.audio, e4), t2.cleanup(() => {
          e4.close();
        });
        return;
      }
      if (i === "file" || i instanceof File) {
        let e4 = new I({
          file: i instanceof File ? i : undefined,
          enabled: this.#r
        });
        i instanceof File || e4.prompt(), t2.set(this.file, e4), this.signals.run((t3) => {
          let n = t3.get(e4.source);
          this.broadcast.video.source.set(n.video), this.broadcast.audio.source.set(n.audio);
        }), t2.cleanup(() => {
          e4.close();
        });
        return;
      }
      throw Error(`Invalid source: ${i}`);
    }
  }
  get url() {
    return this.connection.url.peek();
  }
  set url(e4) {
    this.connection.url.set(e4 ? new URL(e4) : undefined);
  }
  get name() {
    return this.broadcast.name.peek();
  }
  set name(e4) {
    this.broadcast.name.set(exports_path.from(e4));
  }
  get source() {
    return this.state.source.peek();
  }
  set source(e4) {
    this.state.source.set(e4);
  }
  get muted() {
    return this.state.muted.peek();
  }
  set muted(e4) {
    this.state.muted.set(e4);
  }
  get invisible() {
    return this.state.invisible.peek();
  }
  set invisible(e4) {
    this.state.invisible.set(e4);
  }
  get simulcast() {
    return this.state.simulcast.peek();
  }
  set simulcast(e4) {
    this.state.simulcast.set(e4);
  }
  get preview() {
    return this.state.preview.peek();
  }
  set preview(e4) {
    this.state.preview.set(e4);
  }
  get announce() {
    return this.state.announce.peek();
  }
  set announce(e4) {
    this.state.announce.set(e4);
  }
};
customElements.define("moq-publish", d2);

// node_modules/@moq/watch/sync-D67IxmxJ.js
function r(e4) {
  return e4 === "real-time" || typeof e4 == "number" ? {
    min: e4,
    max: e4
  } : {
    min: e4.min ?? "real-time",
    max: e4.max ?? "real-time"
  };
}
function i(e4, t2) {
  return e4 === t2 ? e4 : {
    min: e4,
    max: t2
  };
}
var a = 20;
var o = 100;
var s = class i2 {
  #e = new Signal(undefined);
  reference = this.#e;
  latency;
  jitter;
  audio;
  video;
  #t = new Signal(false);
  buffered = this.#t;
  #n = new Signal(exports_time.Milli.zero);
  maxBuffer = this.#n;
  #r = new Signal(exports_time.Milli.zero);
  buffer = this.#r;
  #i;
  timestamp = new Signal(undefined);
  #a = /* @__PURE__ */ new Map;
  #o;
  #s;
  signals = new Effect;
  constructor(e4) {
    this.latency = Signal.from(e4?.latency ?? "real-time"), this.jitter = new Signal(o), this.#o = e4?.connection, this.audio = Signal.from(e4?.audio), this.video = Signal.from(e4?.video), this.#i = Promise.withResolvers(), this.signals.run(this.#u.bind(this)), this.signals.run(this.#d.bind(this)), this.signals.run(this.#c.bind(this));
  }
  #c(t2) {
    let { max: n } = r(t2.get(this.latency)), i3 = t2.get(this.buffer);
    n === "real-time" ? (this.#t.set(false), this.#n.set(i3)) : (this.#t.set(n > i3), this.#n.set(exports_time.Milli.max(n, i3)));
  }
  #l() {
    let { max: t2 } = r(this.latency.peek()), n = this.#r.peek();
    return t2 === "real-time" ? n : exports_time.Milli.max(t2, n);
  }
  #u(e4) {
    let { min: t2 } = r(e4.get(this.latency));
    if (typeof t2 == "number") {
      this.#s = undefined, this.jitter.set(t2);
      return;
    }
    let n = (this.#o ? e4.get(this.#o) : undefined)?.rtt, i3 = n ? e4.get(n) : undefined;
    if (i3 !== undefined) {
      this.#s = this.#s === undefined ? i3 : Math.min(this.#s, i3);
      let e5 = Math.max(a, this.#s * 1.25);
      this.jitter.set(e5);
      return;
    }
    this.#s = undefined, this.jitter.set(o);
  }
  #d(t2) {
    let n = t2.get(this.jitter), r2 = t2.get(this.video) ?? exports_time.Milli.zero, i3 = t2.get(this.audio) ?? exports_time.Milli.zero, a2 = exports_time.Milli.add(exports_time.Milli.max(r2, i3), n);
    this.#r.set(a2), this.#i.resolve(), this.#i = Promise.withResolvers();
  }
  received(t2, n = "") {
    this.timestamp.update((e4) => e4 === undefined || t2 > e4 ? t2 : e4);
    let r2 = exports_time.Milli.now(), a2 = exports_time.Milli.sub(r2, t2), o2 = this.#e.peek();
    if (o2 === undefined) {
      this.#f(a2);
      return;
    }
    let s2 = this.#r.peek(), c = exports_time.Milli.add(exports_time.Milli.sub(o2, a2), s2);
    if (c < 0) {
      let e4 = this.#a.get(n);
      e4 ? (e4.count++, e4.maxMs = Math.max(e4.maxMs, -c)) : this.#a.set(n, {
        count: 1,
        maxMs: -c
      });
    } else {
      let e4 = this.#a.get(n);
      if (e4) {
        let t3 = n ? `sync[${n}]` : "sync", r3 = i2.#p(e4.maxMs);
        console.debug(`${t3}: ${e4.count} late frame(s), max ${r3} behind`), this.#a.delete(n);
      }
    }
    if (a2 >= o2)
      return;
    let l3 = this.#l();
    c <= l3 || this.#f(exports_time.Milli.add(a2, l3 - s2));
  }
  #f(e4) {
    this.#e.set(e4), this.#i.resolve(), this.#i = Promise.withResolvers();
  }
  reset() {
    this.#e.set(undefined), this.#a.clear(), this.#i.resolve(), this.#i = Promise.withResolvers();
  }
  now() {
    let t2 = this.#e.peek();
    if (t2 !== undefined)
      return exports_time.Milli.sub(exports_time.Milli.sub(exports_time.Milli.now(), t2), this.#r.peek());
  }
  async wait(t2) {
    if (this.#e.peek() === undefined)
      throw Error("reference not set; call update() first");
    for (;; ) {
      let n = exports_time.Milli.now(), r2 = exports_time.Milli.sub(n, t2), i3 = this.#e.peek();
      if (i3 === undefined)
        return;
      let a2 = exports_time.Milli.add(exports_time.Milli.sub(i3, r2), this.#r.peek());
      if (a2 <= 0 || a2 < 5)
        return;
      let o2 = new Promise((e4) => setTimeout(e4, a2)).then(() => true);
      if (await Promise.race([this.#i.promise, o2]))
        return;
    }
  }
  static #p(e4) {
    if (e4 = Math.round(e4), e4 < 1000)
      return `${e4}ms`;
    let t2 = e4 / 1000;
    if (t2 < 60)
      return `${Math.round(t2 * 10) / 10}s`;
    let n = t2 / 60;
    return `${Math.round(n * 10) / 10}m`;
  }
  close() {
    this.signals.close();
  }
};

// node_modules/@moq/msf/catalog.js
var PackagingSchema = union([
  _enum(["loc", "cmaf", "legacy", "mediatimeline", "eventtimeline"]),
  string2()
]);
var RoleSchema = union([
  _enum(["video", "audio", "audiodescription", "caption", "subtitle", "signlanguage"]),
  string2()
]);
var trackShape = {
  name: string2(),
  packaging: PackagingSchema,
  isLive: optional(boolean2()),
  role: optional(RoleSchema),
  codec: optional(string2()),
  width: optional(number2()),
  height: optional(number2()),
  framerate: optional(number2()),
  samplerate: optional(number2()),
  channelConfig: optional(string2()),
  bitrate: optional(number2()),
  initData: optional(string2()),
  renderGroup: optional(number2()),
  altGroup: optional(number2()),
  jitter: optional(number2())
};
var TrackSchema3 = object(trackShape);
var CatalogSchema = object({
  tracks: array(TrackSchema3)
});
var InitDataSchema = object({
  id: string2(),
  type: string2(),
  data: string2()
});
var WireTrackSchema = object({
  ...trackShape,
  initRef: optional(string2())
});
var WireCatalogSchema = object({
  version: union([literal(1), string2()]),
  tracks: optional(array(WireTrackSchema)),
  initDataList: optional(array(InitDataSchema))
});
function decode8(raw) {
  const str = new TextDecoder().decode(raw);
  try {
    const wire = WireCatalogSchema.parse(JSON.parse(str));
    const inline = new Map((wire.initDataList ?? []).filter((e4) => e4.type === "inline").map((e4) => [e4.id, e4.data]));
    const tracks = (wire.tracks ?? []).map(({ initRef, ...track2 }) => {
      if (track2.initData === undefined && initRef !== undefined) {
        track2.initData = inline.get(initRef);
      }
      return track2;
    });
    return { tracks };
  } catch (error2) {
    console.warn("invalid MSF catalog", str);
    throw error2;
  }
}
async function fetch2(track2) {
  const frame = await track2.readFrame();
  if (!frame)
    return;
  return decode8(frame);
}

// node_modules/@moq/watch/broadcast-oQKyLEQ1.js
function p2(e4) {
  let t2 = atob(e4), n = new Uint8Array(t2.length);
  for (let e5 = 0;e5 < t2.length; e5++)
    n[e5] = t2.charCodeAt(e5);
  return n;
}
var m2 = 0;
var h2 = 1;
var g2 = 2;
var _2 = 3;
var v2 = 4;
function y2(e4, t2, n, r2 = false) {
  if (e4 <= 0)
    throw Error("invalid channels");
  if (t2 <= 0)
    throw Error("invalid capacity");
  if (n <= 0)
    throw Error("invalid sample rate");
  let i3 = new SharedArrayBuffer(e4 * t2 * Float32Array.BYTES_PER_ELEMENT), a2 = new SharedArrayBuffer(v2 * Int32Array.BYTES_PER_ELEMENT), o2 = new Int32Array(a2);
  return Atomics.store(o2, _2, 1), {
    channels: e4,
    capacity: t2,
    rate: n,
    samples: i3,
    control: a2,
    buffered: r2
  };
}
function b2(e4, t2) {
  return (e4 - t2 | 0) > 0 ? e4 : t2;
}
function x2(e4, t2) {
  return (e4 % t2 + t2) % t2;
}
function S2(e4, t2, n) {
  for (;; ) {
    let r2 = Atomics.load(e4, t2);
    if ((n - r2 | 0) <= 0)
      return r2;
    if (Atomics.compareExchange(e4, t2, r2, n) === r2)
      return n;
  }
}
var C2 = class e4 {
  channels;
  capacity;
  rate;
  buffered;
  init;
  #e;
  #t;
  #n = false;
  constructor(e5) {
    this.channels = e5.channels, this.capacity = e5.capacity, this.rate = e5.rate, this.buffered = e5.buffered, this.init = e5, this.#e = new Int32Array(e5.control), this.#t = [];
    for (let t2 = 0;t2 < this.channels; t2++)
      this.#t.push(new Float32Array(e5.samples, t2 * this.capacity * Float32Array.BYTES_PER_ELEMENT, this.capacity));
  }
  insert(e5, t2) {
    if (t2.length !== this.channels)
      throw Error("wrong number of channels");
    let n = Math.round(exports_time.Second.fromMicro(e5) * this.rate), i3 = t2[0].length, a2 = 0;
    this.buffered && !this.#n && (Atomics.store(this.#e, h2, n | 0), Atomics.store(this.#e, m2, n | 0), this.#n = true);
    let o2 = n + i3 | 0, s2 = Atomics.load(this.#e, h2), c = s2 - n | 0;
    if (c > 0) {
      if (c >= i3)
        return;
      a2 = c, n = n + c | 0;
    }
    let l3 = i3 - a2;
    (o2 - s2 | 0) > this.capacity && S2(this.#e, h2, o2 - this.capacity | 0);
    let u3 = Atomics.load(this.#e, m2), d3 = n - u3 | 0;
    if (d3 > 0) {
      let e6 = Math.min(d3, this.capacity);
      for (let t3 = 0;t3 < this.channels; t3++) {
        let n2 = this.#t[t3];
        for (let t4 = 0;t4 < e6; t4++)
          n2[x2(u3 + t4 | 0, this.capacity)] = 0;
      }
    }
    for (let e6 = 0;e6 < this.channels; e6++) {
      let r2 = t2[e6], i4 = this.#t[e6];
      for (let e7 = 0;e7 < l3; e7++)
        i4[x2(n + e7 | 0, this.capacity)] = r2[a2 + e7];
    }
    Atomics.store(this.#e, m2, b2(Atomics.load(this.#e, m2), o2));
    let f2 = Atomics.load(this.#e, h2), p3 = Atomics.load(this.#e, m2), v3 = Atomics.load(this.#e, g2);
    (p3 - f2 | 0) >= v3 && v3 > 0 && Atomics.store(this.#e, _2, 0);
  }
  read(e5) {
    if (Atomics.load(this.#e, _2) === 1)
      return 0;
    let t2 = Atomics.load(this.#e, h2), n = Atomics.load(this.#e, m2), r2 = Atomics.load(this.#e, g2), i3 = n - t2 | 0;
    if (!this.buffered && r2 > 0 && i3 > r2) {
      let e6 = n - r2 | 0;
      t2 = S2(this.#e, h2, e6);
    }
    let a2 = n - t2 | 0, o2 = Math.min(a2, e5[0].length);
    if (o2 <= 0)
      return 0;
    for (let n2 = 0;n2 < this.channels; n2++) {
      let r3 = this.#t[n2], i4 = e5[n2];
      for (let e6 = 0;e6 < o2; e6++)
        i4[e6] = r3[x2(t2 + e6 | 0, this.capacity)];
    }
    return S2(this.#e, h2, t2 + o2 | 0), o2;
  }
  setLatency(e5) {
    Atomics.store(this.#e, g2, e5);
  }
  reset() {
    this.#n = false, Atomics.store(this.#e, _2, 1);
    let e5 = Atomics.load(this.#e, m2);
    Atomics.store(this.#e, h2, e5);
  }
  resize(t2) {
    let n = new e4(y2(this.channels, t2, this.rate, this.buffered));
    n.#n = this.#n;
    let r2 = Atomics.load(this.#e, h2), i3 = Atomics.load(this.#e, m2), a2 = Atomics.load(this.#e, g2), o2 = Atomics.load(this.#e, _2), s2 = i3 - r2 | 0, c = Math.max(0, Math.min(s2, n.capacity)), l3 = i3 - c | 0;
    for (let e5 = 0;e5 < this.channels; e5++) {
      let t3 = this.#t[e5], r3 = n.#t[e5];
      for (let e6 = 0;e6 < c; e6++) {
        let i4 = l3 + e6 | 0;
        r3[x2(i4, n.capacity)] = t3[x2(i4, this.capacity)];
      }
    }
    return Atomics.store(n.#e, h2, l3), Atomics.store(n.#e, m2, i3), Atomics.store(n.#e, g2, a2), Atomics.store(n.#e, _2, o2), n;
  }
  get timestamp() {
    let e5 = Atomics.load(this.#e, h2);
    return exports_time.Micro.fromSecond(e5 / this.rate);
  }
  get stalled() {
    return Atomics.load(this.#e, _2) === 1;
  }
  get length() {
    return Atomics.load(this.#e, m2) - Atomics.load(this.#e, h2) | 0;
  }
};
var w = class {
  #e;
  #t;
  #n = [];
  constructor(e5, t2) {
    this.#e = e5, this.#t = t2;
  }
  setHeadroom(e5) {
    this.#t = e5;
  }
  wait(e5, t2) {
    return !this.#e || t2 >= (e5 - this.#t | 0) ? Promise.resolve() : new Promise((t3) => this.#n.push({
      timestamp: e5,
      resolve: t3
    }));
  }
  advance(e5) {
    this.#n.length !== 0 && (this.#n = this.#n.filter(({ timestamp: t2, resolve: n }) => e5 < (t2 - this.#t | 0) ? true : (n(), false)));
  }
  flush() {
    for (let { resolve: e5 } of this.#n)
      e5();
    this.#n = [];
  }
};
function T2(e5, t2) {
  return exports_time.Micro.fromSecond(e5 / t2);
}
function E2() {
  return !(typeof SharedArrayBuffer > "u" || typeof crossOriginIsolated < "u" && !crossOriginIsolated);
}
function ee(e5, t2, n, r2, i3 = false) {
  return E2() ? (console.log("[audio] using SharedArrayBuffer audio buffer"), new te(e5, t2, n, r2, i3)) : (console.log("[audio] using postMessage audio buffer (SharedArrayBuffer unavailable)"), new ne(e5, t2, n, r2, i3));
}
var te = class {
  rate;
  channels;
  #e;
  #t;
  #n = new Signal(0);
  timestamp = this.#n;
  #r = new Signal(true);
  stalled = this.#r;
  #i;
  #a = new Effect;
  constructor(e5, t2, n, r2, i3) {
    this.#e = e5, this.channels = t2, this.rate = n;
    let a2 = Math.max(n, r2 * 2);
    this.#i = new w(i3, T2(r2, n));
    let o2 = y2(t2, a2, n, i3);
    this.#t = new C2(o2), this.#t.setLatency(r2);
    let s2 = {
      type: "init-shared",
      ...o2
    };
    e5.port.postMessage(s2), this.#a.interval(() => {
      let e6 = this.#t.stalled;
      this.#n.set(this.#t.timestamp), this.#r.set(e6), e6 ? this.#i.flush() : this.#i.advance(this.#t.timestamp);
    }, 50);
  }
  insert(e5, t2) {
    this.#t.insert(e5, t2);
  }
  setLatency(e5) {
    if (this.#i.setHeadroom(T2(e5, this.rate)), this.#t.capacity < e5 * 1.5) {
      let t2 = Math.max(this.rate, e5 * 2);
      this.#t = this.#t.resize(t2), this.#t.setLatency(e5);
      let n = {
        type: "init-shared",
        ...this.#t.init
      };
      this.#e.port.postMessage(n);
    } else
      this.#t.setLatency(e5);
  }
  reset() {
    this.#t.reset(), this.#i.flush();
  }
  wait(e5) {
    return this.#t.stalled ? Promise.resolve() : this.#i.wait(e5, this.#t.timestamp);
  }
  close() {
    this.#i.flush(), this.#a.close();
  }
};
var ne = class {
  rate;
  channels;
  #e;
  #t = new Signal(0);
  timestamp = this.#t;
  #n = new Signal(true);
  stalled = this.#n;
  #r;
  #i = new Effect;
  constructor(e5, t2, n, i3, a2) {
    this.#e = e5, this.channels = t2, this.rate = n, this.#r = new w(a2, T2(i3, n));
    let o2 = {
      type: "init-post",
      channels: t2,
      rate: n,
      latency: exports_time.Milli.fromSecond(i3 / n),
      buffered: a2
    };
    e5.port.postMessage(o2), this.#i.event(e5.port, "message", (e6) => {
      let t3 = e6.data;
      t3?.type === "state" && (this.#t.set(t3.timestamp), this.#n.set(t3.stalled), t3.stalled ? this.#r.flush() : this.#r.advance(t3.timestamp));
    }), e5.port.start();
  }
  insert(e5, t2) {
    let n = {
      type: "data",
      data: t2,
      timestamp: e5
    };
    this.#e.port.postMessage(n, t2.map((e6) => e6.buffer));
  }
  setLatency(e5) {
    this.#r.setHeadroom(T2(e5, this.rate));
    let t2 = {
      type: "latency",
      latency: exports_time.Milli.fromSecond(e5 / this.rate)
    };
    this.#e.port.postMessage(t2);
  }
  reset() {
    this.#e.port.postMessage({ type: "reset" }), this.#r.flush();
  }
  wait(e5) {
    return this.#n.peek() ? Promise.resolve() : this.#r.wait(e5, this.#t.peek());
  }
  close() {
    this.#r.flush(), this.#i.close();
  }
};
var re = new Blob([`var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// ../net/src/path.ts
var init_path = __esm({
  "../net/src/path.ts"() {
    "use strict";
  }
});

// ../net/src/varint.ts
var MAX_U6, MAX_U14, MAX_U30, MAX_U53, MAX_U64, MAX_U62;
var init_varint = __esm({
  "../net/src/varint.ts"() {
    "use strict";
    MAX_U6 = 2 ** 6 - 1;
    MAX_U14 = 2 ** 14 - 1;
    MAX_U30 = 2 ** 30 - 1;
    MAX_U53 = Number.MAX_SAFE_INTEGER;
    MAX_U64 = (1n << 64n) - 1n;
    MAX_U62 = 2n ** 62n - 1n;
  }
});

// ../net/src/index.ts
init_path();

// ../net/src/time.ts
var time_exports = {};
__export(time_exports, {
  Micro: () => Micro,
  Milli: () => Milli,
  Nano: () => Nano,
  Second: () => Second
});
var Nano = {
  zero: 0,
  fromMicro: (us) => us * 1e3,
  fromMilli: (ms) => ms * 1e6,
  fromSecond: (s) => s * 1e9,
  toMicro: (ns) => ns / 1e3,
  toMilli: (ns) => ns / 1e6,
  toSecond: (ns) => ns / 1e9,
  now: () => performance.now() * 1e6,
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  mul: (a, b) => a * b,
  div: (a, b) => a / b,
  max: (a, b) => Math.max(a, b),
  min: (a, b) => Math.min(a, b)
};
var Micro = {
  zero: 0,
  fromNano: (ns) => ns / 1e3,
  fromMilli: (ms) => ms * 1e3,
  fromSecond: (s) => s * 1e6,
  toNano: (us) => us * 1e3,
  toMilli: (us) => us / 1e3,
  toSecond: (us) => us / 1e6,
  now: () => performance.now() * 1e3,
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  mul: (a, b) => a * b,
  div: (a, b) => a / b,
  max: (a, b) => Math.max(a, b),
  min: (a, b) => Math.min(a, b)
};
var Milli = {
  zero: 0,
  fromNano: (ns) => ns / 1e6,
  fromMicro: (us) => us / 1e3,
  fromSecond: (s) => s * 1e3,
  toNano: (ms) => ms * 1e6,
  toMicro: (ms) => ms * 1e3,
  toSecond: (ms) => ms / 1e3,
  now: () => performance.now(),
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  mul: (a, b) => a * b,
  div: (a, b) => a / b,
  max: (a, b) => Math.max(a, b),
  min: (a, b) => Math.min(a, b)
};
var Second = {
  zero: 0,
  fromNano: (ns) => ns / 1e9,
  fromMicro: (us) => us / 1e6,
  fromMilli: (ms) => ms / 1e3,
  toNano: (s) => s * 1e9,
  toMicro: (s) => s * 1e6,
  toMilli: (s) => s * 1e3,
  now: () => performance.now() / 1e3,
  add: (a, b) => a + b,
  sub: (a, b) => a - b,
  mul: (a, b) => a * b,
  div: (a, b) => a / b,
  max: (a, b) => Math.max(a, b),
  min: (a, b) => Math.min(a, b)
};

// ../net/src/index.ts
init_varint();

// src/audio/ring-buffer.ts
var AudioRingBuffer = class {
  #buffer;
  #writeIndex = 0;
  #readIndex = 0;
  rate;
  channels;
  #stalled = true;
  // Buffered mode: anchor to the first sample, play through without skipping ahead.
  #buffered;
  // Un-stall threshold in samples (how much to buffer before playback starts).
  #latencySamples;
  // Whether the read/write indices have been anchored to the first inserted sample.
  #anchored = false;
  constructor(props) {
    if (props.channels <= 0) throw new Error("invalid channels");
    if (props.rate <= 0) throw new Error("invalid sample rate");
    if (props.latency <= 0) throw new Error("invalid latency");
    this.#latencySamples = Math.ceil(props.rate * time_exports.Second.fromMilli(props.latency));
    if (this.#latencySamples === 0) throw new Error("empty buffer");
    this.rate = props.rate;
    this.channels = props.channels;
    this.#buffered = props.buffered ?? false;
    const capacity = this.#capacityFor(this.#latencySamples);
    this.#buffer = [];
    for (let i = 0; i < this.channels; i++) {
      this.#buffer[i] = new Float32Array(capacity);
    }
  }
  #capacityFor(latencySamples) {
    return this.#buffered ? latencySamples * 2 : latencySamples;
  }
  get stalled() {
    return this.#stalled;
  }
  get timestamp() {
    return time_exports.Micro.fromSecond(this.#readIndex / this.rate);
  }
  get length() {
    return this.#writeIndex - this.#readIndex;
  }
  get capacity() {
    return this.#buffer[0]?.length;
  }
  resize(latency) {
    this.#latencySamples = Math.ceil(this.rate * time_exports.Second.fromMilli(latency));
    const newCapacity = this.#capacityFor(this.#latencySamples);
    if (newCapacity === this.capacity) return;
    if (newCapacity === 0) throw new Error("empty buffer");
    const newBuffer = [];
    for (let i = 0; i < this.channels; i++) {
      newBuffer[i] = new Float32Array(newCapacity);
    }
    const samplesToKeep = Math.min(this.length, newCapacity);
    if (samplesToKeep > 0) {
      const copyStart = this.#writeIndex - samplesToKeep;
      for (let channel = 0; channel < this.channels; channel++) {
        const src = this.#buffer[channel];
        const dst = newBuffer[channel];
        for (let i = 0; i < samplesToKeep; i++) {
          const srcPos = (copyStart + i) % src.length;
          const dstPos = (copyStart + i) % dst.length;
          dst[dstPos] = src[srcPos];
        }
      }
    }
    this.#buffer = newBuffer;
    this.#readIndex = this.#writeIndex - samplesToKeep;
    if (samplesToKeep === 0) this.#stalled = true;
  }
  write(timestamp, data) {
    if (data.length !== this.channels) throw new Error("wrong number of channels");
    let start = Math.round(time_exports.Second.fromMicro(timestamp) * this.rate);
    let samples = data[0].length;
    if (this.#buffered && !this.#anchored) {
      this.#readIndex = start;
      this.#writeIndex = start;
      this.#anchored = true;
    }
    let offset = this.#readIndex - start;
    if (offset > samples) {
      return;
    } else if (offset > 0) {
      samples -= offset;
      start += offset;
    } else {
      offset = 0;
    }
    const end = start + samples;
    const overflow = end - this.#readIndex - this.#buffer[0].length;
    if (overflow >= 0) {
      this.#stalled = false;
      this.#readIndex += overflow;
    }
    if (start > this.#writeIndex) {
      const gapSize = Math.min(start - this.#writeIndex, this.#buffer[0].length);
      if (gapSize === 1) {
        console.warn("floating point inaccuracy detected");
      }
      for (let channel = 0; channel < this.channels; channel++) {
        const dst = this.#buffer[channel];
        for (let i = 0; i < gapSize; i++) {
          const writePos = (this.#writeIndex + i) % dst.length;
          dst[writePos] = 0;
        }
      }
    }
    for (let channel = 0; channel < this.channels; channel++) {
      let src = data[channel];
      src = src.subarray(src.length - samples);
      const dst = this.#buffer[channel];
      if (src.length !== samples) throw new Error("mismatching number of samples");
      for (let i = 0; i < samples; i++) {
        const writePos = (start + i) % dst.length;
        dst[writePos] = src[i];
      }
    }
    if (end > this.#writeIndex) {
      this.#writeIndex = end;
    }
    if (this.#buffered && this.length >= this.#latencySamples) {
      this.#stalled = false;
    }
  }
  // Flush all buffered samples and re-stall, ready to anchor the next utterance.
  reset() {
    this.#readIndex = 0;
    this.#writeIndex = 0;
    this.#stalled = true;
    this.#anchored = false;
  }
  read(output) {
    if (output.length !== this.channels) throw new Error("wrong number of channels");
    if (this.#stalled) return 0;
    const samples = Math.min(this.#writeIndex - this.#readIndex, output[0].length);
    if (samples === 0) return 0;
    for (let channel = 0; channel < this.channels; channel++) {
      const dst = output[channel];
      const src = this.#buffer[channel];
      if (dst.length !== output[0].length) throw new Error("mismatching number of samples");
      for (let i = 0; i < samples; i++) {
        const readPos = (this.#readIndex + i) % src.length;
        dst[i] = src[readPos];
      }
    }
    this.#readIndex += samples;
    return samples;
  }
};

// src/audio/shared-ring-buffer.ts
var WRITE = 0;
var READ = 1;
var LATENCY = 2;
var STALLED = 3;
var CONTROL_SLOTS = 4;
function allocSharedRingBuffer(channels, capacity, rate, buffered = false) {
  if (channels <= 0) throw new Error("invalid channels");
  if (capacity <= 0) throw new Error("invalid capacity");
  if (rate <= 0) throw new Error("invalid sample rate");
  const samples = new SharedArrayBuffer(channels * capacity * Float32Array.BYTES_PER_ELEMENT);
  const control = new SharedArrayBuffer(CONTROL_SLOTS * Int32Array.BYTES_PER_ELEMENT);
  const ctrl = new Int32Array(control);
  Atomics.store(ctrl, STALLED, 1);
  return { channels, capacity, rate, samples, control, buffered };
}
function i32Max(a, b) {
  return (a - b | 0) > 0 ? a : b;
}
function slot(idx, capacity) {
  return (idx % capacity + capacity) % capacity;
}
function casAdvance(arr, idx, candidate) {
  for (; ; ) {
    const current = Atomics.load(arr, idx);
    if ((candidate - current | 0) <= 0) return current;
    const witnessed = Atomics.compareExchange(arr, idx, current, candidate);
    if (witnessed === current) return candidate;
  }
}
var SharedRingBuffer = class _SharedRingBuffer {
  channels;
  capacity;
  rate;
  buffered;
  init;
  #control;
  #samples;
  // Whether READ/WRITE have been anchored to the first inserted sample (buffered mode).
  #anchored = false;
  constructor(init) {
    this.channels = init.channels;
    this.capacity = init.capacity;
    this.rate = init.rate;
    this.buffered = init.buffered;
    this.init = init;
    this.#control = new Int32Array(init.control);
    this.#samples = [];
    for (let i = 0; i < this.channels; i++) {
      this.#samples.push(
        new Float32Array(init.samples, i * this.capacity * Float32Array.BYTES_PER_ELEMENT, this.capacity)
      );
    }
  }
  /**
   * Insert audio samples at the given timestamp.
   * Main thread only. Handles out-of-order writes, gap filling, and overflow.
   */
  insert(timestamp, data) {
    if (data.length !== this.channels) throw new Error("wrong number of channels");
    let start = Math.round(time_exports.Second.fromMicro(timestamp) * this.rate);
    const originalLength = data[0].length;
    let offset = 0;
    if (this.buffered && !this.#anchored) {
      Atomics.store(this.#control, READ, start | 0);
      Atomics.store(this.#control, WRITE, start | 0);
      this.#anchored = true;
    }
    const end = start + originalLength | 0;
    const read = Atomics.load(this.#control, READ);
    const behind = read - start | 0;
    if (behind > 0) {
      if (behind >= originalLength) {
        return;
      }
      offset = behind;
      start = start + behind | 0;
    }
    const samples = originalLength - offset;
    if ((end - read | 0) > this.capacity) {
      casAdvance(this.#control, READ, end - this.capacity | 0);
    }
    const write = Atomics.load(this.#control, WRITE);
    const gap = start - write | 0;
    if (gap > 0) {
      const gapSize = Math.min(gap, this.capacity);
      for (let channel = 0; channel < this.channels; channel++) {
        const dst = this.#samples[channel];
        for (let i = 0; i < gapSize; i++) {
          dst[slot(write + i | 0, this.capacity)] = 0;
        }
      }
    }
    for (let channel = 0; channel < this.channels; channel++) {
      const src = data[channel];
      const dst = this.#samples[channel];
      for (let i = 0; i < samples; i++) {
        dst[slot(start + i | 0, this.capacity)] = src[offset + i];
      }
    }
    Atomics.store(this.#control, WRITE, i32Max(Atomics.load(this.#control, WRITE), end));
    const currentRead = Atomics.load(this.#control, READ);
    const currentWrite = Atomics.load(this.#control, WRITE);
    const latency = Atomics.load(this.#control, LATENCY);
    if ((currentWrite - currentRead | 0) >= latency && latency > 0) {
      Atomics.store(this.#control, STALLED, 0);
    }
  }
  /**
   * Read audio samples into the output buffers.
   * AudioWorklet only. Returns the number of samples read.
   */
  read(output) {
    if (Atomics.load(this.#control, STALLED) === 1) return 0;
    let read = Atomics.load(this.#control, READ);
    const write = Atomics.load(this.#control, WRITE);
    const latency = Atomics.load(this.#control, LATENCY);
    const buffered = write - read | 0;
    if (!this.buffered && latency > 0 && buffered > latency) {
      const skipTo = write - latency | 0;
      read = casAdvance(this.#control, READ, skipTo);
    }
    const available = write - read | 0;
    const count = Math.min(available, output[0].length);
    if (count <= 0) return 0;
    for (let channel = 0; channel < this.channels; channel++) {
      const src = this.#samples[channel];
      const dst = output[channel];
      for (let i = 0; i < count; i++) {
        dst[i] = src[slot(read + i | 0, this.capacity)];
      }
    }
    casAdvance(this.#control, READ, read + count | 0);
    return count;
  }
  /** Update the target latency in samples. */
  setLatency(samples) {
    Atomics.store(this.#control, LATENCY, samples);
  }
  /**
   * Flush buffered samples and re-stall, ready to anchor the next utterance (buffered mode).
   * Main thread only. The worklet reader sees STALLED and stops until the next insert.
   */
  reset() {
    this.#anchored = false;
    Atomics.store(this.#control, STALLED, 1);
    const write = Atomics.load(this.#control, WRITE);
    Atomics.store(this.#control, READ, write);
  }
  /**
   * Allocate a new ring with \`newCapacity\` samples and copy the unread window
   * [READ, WRITE) plus control state into it. Used when growing capacity so
   * we don't drop buffered audio. If \`newCapacity\` is smaller than the unread
   * span, the oldest samples are truncated.
   *
   * Main thread only. \`resize()\` reads from the source \`SharedRingBuffer\` and
   * writes into a freshly allocated buffer from \`allocSharedRingBuffer\`, so it
   * relies on the same invariant as \`insert()\`: no concurrent main-thread
   * writers. The AudioWorklet reader is tolerated via the CAS discipline used
   * by READ/WRITE elsewhere.
   */
  resize(newCapacity) {
    const init = allocSharedRingBuffer(this.channels, newCapacity, this.rate, this.buffered);
    const dst = new _SharedRingBuffer(init);
    dst.#anchored = this.#anchored;
    const read = Atomics.load(this.#control, READ);
    const write = Atomics.load(this.#control, WRITE);
    const latency = Atomics.load(this.#control, LATENCY);
    const stalled = Atomics.load(this.#control, STALLED);
    const available = write - read | 0;
    const copyCount = Math.max(0, Math.min(available, dst.capacity));
    const copyStart = write - copyCount | 0;
    for (let channel = 0; channel < this.channels; channel++) {
      const src = this.#samples[channel];
      const out = dst.#samples[channel];
      for (let i = 0; i < copyCount; i++) {
        const idx = copyStart + i | 0;
        out[slot(idx, dst.capacity)] = src[slot(idx, this.capacity)];
      }
    }
    Atomics.store(dst.#control, READ, copyStart);
    Atomics.store(dst.#control, WRITE, write);
    Atomics.store(dst.#control, LATENCY, latency);
    Atomics.store(dst.#control, STALLED, stalled);
    return dst;
  }
  /** Current playback timestamp derived from READ position. */
  get timestamp() {
    const read = Atomics.load(this.#control, READ);
    return time_exports.Micro.fromSecond(read / this.rate);
  }
  /** Whether the buffer is stalled (waiting to fill). */
  get stalled() {
    return Atomics.load(this.#control, STALLED) === 1;
  }
  /**
   * Number of buffered samples (WRITE - READ).
   *
   * Non-atomic: WRITE and READ are loaded separately, so a concurrent
   * writer/reader can make the two loads inconsistent. Intended for
   * tests and diagnostics, not control-flow decisions.
   */
  get length() {
    return Atomics.load(this.#control, WRITE) - Atomics.load(this.#control, READ) | 0;
  }
};

// src/audio/render-worklet.ts
var Render = class extends AudioWorkletProcessor {
  // Set after init, depending on which path the main thread chose.
  #backend;
  #underflow = 0;
  #stateCounter = 0;
  constructor() {
    super();
    this.port.onmessage = (event) => {
      const msg = event.data;
      if (msg.type === "init-shared") {
        console.log("[audio-worklet] init-shared: using SharedArrayBuffer path");
        this.#backend = new SharedRingBuffer(msg);
        this.#underflow = 0;
      } else if (msg.type === "init-post") {
        console.log("[audio-worklet] init-post: using postMessage path");
        this.#backend = new AudioRingBuffer(msg);
        this.#underflow = 0;
      } else if (msg.type === "data") {
        if (this.#backend instanceof AudioRingBuffer) this.#backend.write(msg.timestamp, msg.data);
      } else if (msg.type === "latency") {
        if (this.#backend instanceof AudioRingBuffer) this.#backend.resize(msg.latency);
      } else if (msg.type === "reset") {
        if (this.#backend instanceof AudioRingBuffer) this.#backend.reset();
      }
    };
  }
  process(_inputs, outputs, _parameters) {
    const output = outputs[0];
    const backend = this.#backend;
    const samplesRead = backend?.read(output) ?? 0;
    if (samplesRead < output[0].length) {
      this.#underflow += output[0].length - samplesRead;
    } else if (this.#underflow > 0 && backend) {
      console.debug(\`audio underflow: \${Math.round(1e3 * this.#underflow / backend.rate)}ms\`);
      this.#underflow = 0;
    }
    if (backend instanceof AudioRingBuffer) {
      this.#stateCounter++;
      if (this.#stateCounter >= 5) {
        this.#stateCounter = 0;
        const state = {
          type: "state",
          timestamp: backend.timestamp,
          stalled: backend.stalled
        };
        this.port.postMessage(state);
      }
    }
    return true;
  }
};
registerProcessor("render", Render);
`], { type: "application/javascript" });
var D = URL.createObjectURL(re);
var O2 = class {
  source;
  enabled;
  #e = new Signal(undefined);
  context = this.#e;
  #t = new Signal(undefined);
  root = this.#t;
  #n = new Signal(undefined);
  sampleRate = this.#n;
  #r = new Signal(undefined);
  stats = this.#r;
  #i = new Signal(undefined);
  timestamp = this.#i;
  #a = new Signal(true);
  stalled = this.#a;
  #o = new Signal([]);
  #s = new Signal([]);
  buffered = this.#s;
  #c;
  #l = 0;
  #u = new Effect;
  #d = new Signal(exports_time.Milli.zero);
  constructor(e5, t2) {
    this.source = e5, this.source.supported.set(k2), this.enabled = Signal.from(t2?.enabled ?? false), this.#u.run((e6) => {
      this.#d.set(e6.get(this.source.sync.maxBuffer));
    }), this.#u.run(this.#f.bind(this)), this.#u.run(this.#p.bind(this)), this.#u.run(this.#m.bind(this)), this.#u.run(this.#h.bind(this));
  }
  #f(e5) {
    let t2 = e5.get(this.source.config);
    if (!t2)
      return;
    let { sampleRate: n, numberOfChannels: i3 } = t2, a2 = new AudioContext({
      latencyHint: "interactive",
      sampleRate: n
    });
    e5.set(this.#e, a2), e5.cleanup(() => a2.close()), e5.spawn(async () => {
      if (await a2.audioWorklet.addModule(D), a2.state === "closed")
        return;
      let t3 = new AudioWorkletNode(a2, "render", {
        channelCount: i3,
        channelCountMode: "explicit",
        outputChannelCount: [i3]
      });
      e5.cleanup(() => t3.disconnect());
      let o2 = this.source.sync.buffer.peek(), s2 = ee(t3, i3, n, Math.ceil(n * exports_time.Second.fromMilli(o2)), this.source.sync.buffered.peek());
      this.#c = s2, e5.cleanup(() => {
        s2.close(), this.#c = undefined;
      }), e5.run((e6) => {
        let t4 = exports_time.Milli.fromMicro(e6.get(s2.timestamp));
        this.#i.set(t4), this.#b(t4);
      }), e5.run((e6) => {
        this.#a.set(e6.get(s2.stalled));
      }), e5.set(this.#t, t3);
    });
  }
  #p(e5) {
    let t2 = e5.getAll([this.enabled, this.#e]);
    if (!t2)
      return;
    let [n, r2] = t2;
    r2.resume();
  }
  #m(e5) {
    if (!e5.get(this.#t))
      return;
    let t2 = this.#c;
    if (!t2)
      return;
    let n = e5.get(this.source.sync.buffer), i3 = Math.ceil(t2.rate * exports_time.Second.fromMilli(n));
    t2.setLatency(i3);
  }
  #h(e5) {
    if (!e5.get(this.enabled))
      return;
    let t2 = e5.get(this.source.broadcast);
    if (!t2)
      return;
    let n = e5.get(this.source.track);
    if (!n)
      return;
    let r2 = e5.get(this.source.config);
    if (!r2)
      return;
    let i3 = e5.get(t2.active);
    if (!i3)
      return;
    let a2 = i3.subscribe(n, PRIORITY.audio);
    e5.cleanup(() => a2.close()), r2.container.kind === "cmaf" ? this.#_(e5, a2, r2) : this.#g(e5, a2, r2);
  }
  #g(e5, t2, n) {
    let i3 = n.container.kind === "loc" ? new exports_loc.Format : new exports_legacy.Format, a2 = new Consumer3(t2, {
      format: i3,
      latency: this.#d
    });
    e5.cleanup(() => a2.close()), e5.run((e6) => {
      let t3 = e6.get(a2.buffered), n2 = e6.get(this.#o);
      this.#s.update(() => mergeBufferedRanges(t3, n2));
    }), e5.spawn(async () => {
      if (!await exports_libav.polyfill())
        return;
      let t3 = 0, i4 = new AudioDecoder({
        output: (e6) => {
          if (t3++, t3 <= 3) {
            e6.close();
            return;
          }
          this.#v(e6);
        },
        error: (e6) => console.error(e6)
      });
      e5.cleanup(() => {
        i4.state !== "closed" && i4.close();
      });
      let o2 = n.codec === "opus" ? undefined : n.description ? exports_hex2.toBytes(n.description) : undefined;
      for (i4.configure({
        ...n,
        description: o2
      });; ) {
        let e6 = await a2.next();
        if (!e6)
          break;
        this.#x(e6.discontinuity);
        let { frame: t4 } = e6;
        if (!t4)
          continue;
        let n2 = exports_time.Milli.fromMicro(t4.timestamp);
        this.source.sync.received(n2, "audio"), this.#r.update((e7) => ({ bytesReceived: (e7?.bytesReceived ?? 0) + t4.data.byteLength })), await this.#c?.wait(t4.timestamp);
        let o3 = new EncodedAudioChunk({
          type: t4.keyframe ? "key" : "delta",
          data: t4.data,
          timestamp: t4.timestamp
        });
        i4.decode(o3);
      }
    });
  }
  #_(e5, t2, n) {
    if (n.container.kind !== "cmaf")
      return;
    let i3 = p2(n.container.init), a2 = exports_cmaf.decodeInitSegment(i3), o2 = n.codec === "opus" ? undefined : n.description ? exports_hex2.toBytes(n.description) : a2.description, s2 = new Consumer3(t2, {
      format: new exports_cmaf.Format(a2),
      latency: this.#d
    });
    e5.cleanup(() => s2.close()), e5.run((e6) => {
      let t3 = e6.get(s2.buffered), n2 = e6.get(this.#o);
      this.#s.update(() => mergeBufferedRanges(t3, n2));
    }), e5.spawn(async () => {
      if (!await exports_libav.polyfill())
        return;
      let t3 = new AudioDecoder({
        output: (e6) => this.#v(e6),
        error: (e6) => console.error(e6)
      });
      for (e5.cleanup(() => {
        t3.state !== "closed" && t3.close();
      }), t3.configure({
        codec: n.codec,
        sampleRate: n.sampleRate,
        numberOfChannels: n.numberOfChannels,
        description: o2
      });; ) {
        let e6 = await s2.next();
        if (!e6)
          break;
        this.#x(e6.discontinuity);
        let { frame: n2 } = e6;
        if (!n2)
          continue;
        let i4 = exports_time.Milli.fromMicro(n2.timestamp);
        if (this.source.sync.received(i4, "audio"), this.#r.update((e7) => ({ bytesReceived: (e7?.bytesReceived ?? 0) + n2.data.byteLength })), await this.#c?.wait(n2.timestamp), t3.state === "closed")
          break;
        t3.decode(new EncodedAudioChunk({
          type: n2.keyframe ? "key" : "delta",
          data: n2.data,
          timestamp: n2.timestamp
        }));
      }
    });
  }
  #v(e5) {
    let t2 = e5.timestamp, n = exports_time.Milli.fromMicro(t2), i3 = this.#c;
    if (!i3) {
      e5.close();
      return;
    }
    let a2 = e5.numberOfFrames / e5.sampleRate * 1e6, o2 = exports_time.Milli.fromMicro(a2), s2 = exports_time.Milli.add(n, o2);
    this.#y(n, s2);
    let c = Math.min(e5.numberOfChannels, i3.channels), l3 = [];
    for (let t3 = 0;t3 < c; t3++) {
      let n2 = new Float32Array(e5.numberOfFrames);
      e5.copyTo(n2, {
        format: "f32-planar",
        planeIndex: t3
      }), l3.push(n2);
    }
    i3.insert(t2, l3), e5.close();
  }
  #y(e5, t2) {
    e5 > t2 || this.#o.mutate((n) => {
      for (let i3 of n)
        if (e5 <= i3.end + 1 && t2 >= i3.start) {
          i3.start = exports_time.Milli.min(i3.start, e5), i3.end = exports_time.Milli.max(i3.end, t2);
          return;
        }
      n.push({
        start: e5,
        end: t2
      }), n.sort((e6, t3) => e6.start - t3.start);
    });
  }
  #b(e5) {
    this.#o.mutate((t2) => {
      for (;t2.length > 0; ) {
        if (t2[0].end >= e5) {
          t2[0].start = exports_time.Milli.max(t2[0].start, e5);
          break;
        }
        t2.shift();
      }
    });
  }
  reset() {
    this.#c?.reset();
  }
  #x(e5) {
    e5 !== this.#l && (this.#l = e5, this.#c?.reset(), this.source.sync.reset());
  }
  close() {
    this.#u.close();
  }
};
async function k2(e5) {
  let t2;
  if (e5.codec !== "opus") {
    if (e5.description)
      t2 = exports_hex2.toBytes(e5.description);
    else if (e5.container.kind === "cmaf")
      try {
        t2 = exports_cmaf.decodeInitSegment(p2(e5.container.init)).description;
      } catch (t3) {
        return console.warn(`audio: malformed CMAF init segment for codec ${e5.codec}`, t3), false;
      }
  }
  return (await AudioDecoder.isConfigSupported({
    ...e5,
    description: t2
  })).supported ?? false;
}
var A = 0.001;
var j2 = 0.2;
var M2 = class {
  source;
  volume;
  muted;
  paused;
  #e = new Effect;
  #t = 0.5;
  #n = new Signal(undefined);
  constructor(e5, t2) {
    this.source = e5, this.volume = Signal.from(t2?.volume ?? 0.5), this.muted = Signal.from(t2?.muted ?? false), this.paused = Signal.from(t2?.paused ?? t2?.muted ?? false), this.#e.run((e6) => {
      e6.get(this.muted) ? (this.#t = this.volume.peek() || 0.5, this.volume.set(0)) : this.volume.set(this.#t);
    }), this.#e.run((e6) => {
      let t3 = !e6.get(this.paused) && !e6.get(this.muted);
      this.source.enabled.set(t3);
    }), this.#e.run((e6) => {
      let t3 = e6.get(this.volume);
      this.muted.set(t3 === 0);
    }), this.#e.run((e6) => {
      let t3 = e6.get(this.source.root);
      if (!t3)
        return;
      let n = new GainNode(t3.context, { gain: e6.get(this.volume) });
      t3.connect(n), e6.set(this.#n, n), e6.run((e7) => {
        e7.get(this.source.enabled) && (n.connect(t3.context.destination), e7.cleanup(() => n.disconnect()));
      });
    }), this.#e.run((e6) => {
      let t3 = e6.get(this.#n);
      if (!t3)
        return;
      e6.cleanup(() => t3.gain.cancelScheduledValues(t3.context.currentTime));
      let n = e6.get(this.volume);
      n < A ? (t3.gain.exponentialRampToValueAtTime(A, t3.context.currentTime + j2), t3.gain.setValueAtTime(0, t3.context.currentTime + j2 + 0.01)) : t3.gain.exponentialRampToValueAtTime(n, t3.context.currentTime + j2);
    });
  }
  close() {
    this.#e.close();
  }
};
function N2(e5) {
  let n = [];
  for (let r2 = 0;r2 < e5.length; r2++) {
    let i3 = exports_time.Milli.fromSecond(e5.start(r2)), a2 = exports_time.Milli.fromSecond(e5.end(r2));
    n.push({
      start: i3,
      end: a2
    });
  }
  return n;
}
var P2 = class {
  muxer;
  source;
  volume;
  muted;
  #e = new Signal(undefined);
  stats = this.#e;
  #t = new Signal([]);
  buffered = this.#t;
  context = new Signal(undefined);
  #n = new Effect;
  constructor(e5, t2, n) {
    this.muxer = e5, this.source = t2, this.source.supported.set(ie), this.volume = Signal.from(n?.volume ?? 0.5), this.muted = Signal.from(n?.muted ?? false), this.#n.run(this.#r.bind(this)), this.#n.run(this.#s.bind(this));
  }
  #r(e5) {
    let t2 = e5.get(this.muxer.element);
    if (!t2)
      return;
    let n = e5.get(this.muxer.mediaSource);
    if (!n)
      return;
    let r2 = e5.get(this.source.broadcast);
    if (!r2)
      return;
    let i3 = e5.get(r2.active);
    if (!i3)
      return;
    let a2 = e5.get(this.source.track);
    if (!a2)
      return;
    let s2 = e5.get(this.source.config);
    if (!s2)
      return;
    let c = `audio/mp4; codecs="${s2.codec}"`, l3 = n.addSourceBuffer(c);
    e5.cleanup(() => {
      n.removeSourceBuffer(l3), l3.abort();
    }), e5.event(l3, "error", (e6) => {
      console.error("[MSE] SourceBuffer error:", e6);
    }), e5.event(l3, "updateend", () => {
      this.#t.set(N2(l3.buffered));
    });
    let u3 = i3.subscribe(a2, PRIORITY.audio);
    e5.cleanup(() => u3.close()), s2.container.kind === "cmaf" ? this.#a(e5, u3, s2, l3, t2) : this.#o(e5, u3, s2, l3, t2);
  }
  async#i(e5, t2) {
    for (;e5.updating; )
      await new Promise((t3) => e5.addEventListener("updateend", t3, { once: true }));
    for (e5.appendBuffer(t2);e5.updating; )
      await new Promise((t3) => e5.addEventListener("updateend", t3, { once: true }));
  }
  #a(e5, n, r2, i3, a2) {
    if (r2.container.kind !== "cmaf")
      throw Error("unreachable");
    let o2 = p2(r2.container.init), s2 = exports_cmaf.decodeInitSegment(o2);
    e5.spawn(async () => {
      for (await this.#i(i3, o2);; ) {
        let e6 = await n.readFrame();
        if (!e6)
          return;
        let r3 = exports_cmaf.decodeTimestamp(e6, s2);
        this.source.sync.received(exports_time.Milli.fromMicro(r3), "audio"), await this.#i(i3, e6), a2.buffered.length > 0 && a2.currentTime < a2.buffered.start(0) && (a2.currentTime = a2.buffered.start(0));
      }
    });
  }
  #o(e5, n, r2, i3, a2) {
    let o2 = r2.container.kind === "loc" ? new exports_loc.Format : new exports_legacy.Format, s2 = new Consumer3(n, {
      format: o2,
      latency: this.source.sync.buffer
    });
    e5.cleanup(() => s2.close()), e5.spawn(async () => {
      let e6 = exports_cmaf.createAudioInitSegment(r2);
      await this.#i(i3, e6);
      let n2 = 1, o3, l3;
      for (;; ) {
        let e7 = await s2.next();
        if (!e7)
          return;
        if (!e7.frame)
          continue;
        l3 = e7.frame;
        let n3 = exports_time.Milli.fromMicro(l3.timestamp);
        this.source.sync.received(n3, "audio");
        break;
      }
      for (;; ) {
        let e7 = await s2.next();
        if (e7 && !e7.frame)
          continue;
        let r3 = e7?.frame;
        if (r3) {
          o3 = exports_time.Micro.sub(r3.timestamp, l3.timestamp);
          let e8 = exports_time.Milli.fromMicro(r3.timestamp);
          this.source.sync.received(e8, "audio");
        }
        let u3 = exports_cmaf.encodeDataSegment({
          data: l3.data,
          timestamp: l3.timestamp,
          duration: o3 ?? 0,
          keyframe: l3.keyframe,
          sequence: n2++
        });
        if (await this.#i(i3, u3), a2.buffered.length > 0 && a2.currentTime < a2.buffered.start(0) && (a2.currentTime = a2.buffered.start(0)), !r3)
          return;
        l3 = r3;
      }
    });
  }
  #s(e5) {
    let t2 = e5.get(this.muxer.element);
    if (!t2)
      return;
    let n = e5.get(this.volume), r2 = e5.get(this.muted);
    r2 && !t2.muted ? t2.muted = true : !r2 && t2.muted && (t2.muted = false), n !== t2.volume && (t2.volume = n), e5.event(t2, "volumechange", () => {
      this.volume.set(t2.volume);
    });
  }
  close() {
    this.#n.close();
  }
};
async function ie(e5) {
  return MediaSource.isTypeSupported(`audio/mp4; codecs="${e5.codec}"`);
}
var ae = 128;
var F2 = class {
  broadcast;
  target;
  catalog;
  #e = new Signal({});
  available = this.#e;
  #t = new Signal(undefined);
  track = this.#t;
  #n = new Signal(undefined);
  config = this.#n;
  supported;
  sync;
  #r = new Effect;
  constructor(e5, t2) {
    this.sync = e5, this.broadcast = Signal.from(t2?.broadcast), this.target = Signal.from(t2?.target), this.supported = Signal.from(t2?.supported), this.catalog = this.#r.computed((e6) => {
      let t3 = e6.get(this.broadcast);
      return t3 ? e6.get(t3.catalog)?.audio : undefined;
    }), this.#r.run(this.#i.bind(this)), this.#r.run(this.#a.bind(this));
  }
  #i(e5) {
    let t2 = e5.get(this.catalog)?.renditions ?? {}, n = e5.get(this.supported);
    n && e5.spawn(async () => {
      let e6 = {};
      for (let [r2, i3] of Object.entries(t2))
        await n(i3) && (e6[r2] = i3);
      Object.keys(e6).length === 0 && Object.keys(t2).length > 0 && console.warn("no supported audio renditions found:", t2), this.#e.set(e6);
    });
  }
  #a(e5) {
    let t2 = e5.get(this.#e);
    if (Object.keys(t2).length === 0)
      return;
    let n = e5.get(this.target), r2;
    if (n?.name && n.name in t2)
      r2 = {
        track: n.name,
        config: t2[n.name]
      };
    else if (r2 = this.#o(t2), !r2)
      return;
    e5.set(this.#t, r2.track), e5.set(this.#n, r2.config);
    let i3 = (r2.config.jitter ?? I2(r2.config) ?? 0) + Math.ceil(ae / r2.config.sampleRate * 1000);
    e5.set(this.sync.audio, i3);
  }
  #o(e5) {
    let t2 = Object.entries(e5);
    if (t2.length !== 0) {
      for (let [e6, n] of t2)
        if (n.container.kind === "legacy")
          return {
            track: e6,
            config: n
          };
      for (let [e6, n] of t2)
        if (n.container.kind === "loc")
          return {
            track: e6,
            config: n
          };
      for (let [e6, n] of t2)
        if (n.container.kind === "cmaf")
          return {
            track: e6,
            config: n
          };
    }
  }
  close() {
    this.#r.close();
  }
};
function I2(e5) {
  if (e5.codec.startsWith("opus"))
    return 20;
  if (e5.codec.startsWith("mp4a"))
    return Math.ceil(1024 / e5.sampleRate * 1000);
}
var z = class {
  element;
  paused;
  #e;
  #t = new Signal(undefined);
  mediaSource = this.#t;
  #n = new Effect;
  constructor(e5, t2) {
    this.element = Signal.from(t2?.element), this.paused = Signal.from(t2?.paused ?? false), this.#e = e5, this.#n.run(this.#r.bind(this)), this.#n.run(this.#i.bind(this)), this.#n.run(this.#a.bind(this)), this.#n.run(this.#o.bind(this)), this.#n.run(this.#s.bind(this));
  }
  #r(e5) {
    let t2 = e5.get(this.element);
    if (!t2)
      return;
    let n = new MediaSource;
    t2.src = URL.createObjectURL(n), e5.cleanup(() => URL.revokeObjectURL(t2.src)), e5.event(n, "sourceopen", () => {
      e5.set(this.#t, n);
    }, { once: true }), e5.event(n, "error", (e6) => {
      console.error("[MSE] MediaSource error event:", e6);
    });
  }
  #i(e5) {
    let t2 = e5.get(this.element);
    if (!t2 || e5.get(this.paused))
      return;
    let n = exports_time.Milli.toSecond(e5.get(this.#e.buffer));
    e5.interval(() => {
      let e6 = t2.buffered;
      if (e6.length === 0)
        return;
      let r2 = e6.end(e6.length - 1) - n, i3 = r2 - t2.currentTime;
      (i3 > 0.1 || i3 < -0.1) && (console.warn("seeking", i3 > 0 ? "forward" : "backward", Math.abs(i3).toFixed(3), "seconds"), t2.currentTime = r2);
    }, 100);
  }
  #a(e5) {
    let t2 = e5.get(this.element);
    if (!t2)
      return;
    let n = e5.get(this.mediaSource);
    n && e5.interval(() => {
      for (let e6 of n.sourceBuffers)
        e6.updating || t2.currentTime > 10 && e6.remove(0, t2.currentTime - 10);
    }, 1000);
  }
  #o(e5) {
    let t2 = e5.get(this.element);
    if (!t2)
      return;
    let n = e5.get(this.paused);
    n && !t2.paused ? t2.pause() : !n && t2.paused && t2.play().catch((e6) => {
      console.error("[MSE] MediaElement play error:", e6);
    });
  }
  #s(e5) {
    let t2 = e5.get(this.element);
    if (!t2 || e5.get(this.paused))
      return;
    let n = e5.get(this.#e.reference);
    if (n === undefined)
      return;
    let i3 = e5.get(this.#e.buffer), a2 = exports_time.Milli.sub(exports_time.Milli.sub(exports_time.Milli.now(), n), i3);
    t2.currentTime = exports_time.Milli.toSecond(a2);
  }
  close() {
    this.#n.close();
  }
};
var B = 500;
var V = 100;
var H = class {
  enabled;
  source;
  #e = new Signal(undefined);
  #t = new Signal(undefined);
  frame = this.#t;
  #n = new Signal(undefined);
  timestamp = this.#n;
  #r = new Signal(undefined);
  display = this.#r;
  #i = new Signal(false);
  stalled = this.#i;
  #a = new Signal(undefined);
  stats = this.#a;
  #o = new Signal([]);
  buffered = this.#o;
  #s = new Effect;
  #c() {
    this.#t.update((e5) => {
      e5?.close();
    }), this.#n.set(undefined);
  }
  constructor(e5, t2) {
    this.enabled = Signal.from(t2?.enabled ?? false), this.source = e5, this.source.supported.set(W), this.#s.run(this.#l.bind(this)), this.#s.run(this.#u.bind(this)), this.#s.run(this.#d.bind(this)), this.#s.run(this.#f.bind(this));
  }
  #l(e5) {
    let t2 = e5.getAll([
      this.enabled,
      this.source.broadcast,
      this.source.track,
      this.source.config
    ]);
    if (!t2) {
      this.#e.set(undefined);
      return;
    }
    let [n, r2, i3, a2] = t2, o2 = e5.get(r2.active);
    if (!o2) {
      this.#e.set(undefined), this.#c(), this.#o.set([]);
      return;
    }
    let s2 = new U({
      source: this.source,
      broadcast: o2,
      track: i3,
      config: a2,
      stats: this.#a
    });
    e5.cleanup(() => s2?.close()), e5.run((e6) => {
      if (!s2)
        return;
      let t3 = e6.get(this.#e);
      if (t3) {
        let n2 = e6.get(s2.timestamp), r3 = e6.get(t3.timestamp);
        if (!n2 || r3 && r3 > n2 + V)
          return;
      }
      this.#e.set(s2), s2 = undefined, e6.close();
    });
  }
  #u(e5) {
    let t2 = e5.get(this.#e);
    if (!t2) {
      this.#o.set([]);
      return;
    }
    e5.cleanup(() => t2.close()), e5.run((e6) => {
      let n = e6.get(t2.frame);
      this.#t.update((e7) => (e7?.close(), n?.clone()));
    }), e5.proxy(this.#n, t2.timestamp), e5.proxy(this.#o, t2.buffered);
  }
  #d(e5) {
    let t2 = e5.get(this.source.catalog);
    if (!t2)
      return;
    let n = t2.display;
    if (n) {
      e5.set(this.#r, {
        width: n.width,
        height: n.height
      });
      return;
    }
    let r2 = e5.get(this.frame);
    r2 && e5.set(this.#r, {
      width: r2.displayWidth,
      height: r2.displayHeight
    });
  }
  #f(e5) {
    if (e5.get(this.enabled)) {
      if (!e5.get(this.frame)) {
        this.#i.set(true);
        return;
      }
      this.#i.set(false), e5.timer(() => {
        this.#i.set(true);
      }, B);
    }
  }
  close() {
    this.#c(), this.#s.close();
  }
};
var U = class {
  source;
  broadcast;
  track;
  config;
  stats;
  timestamp = new Signal(undefined);
  frame = new Signal(undefined);
  buffered = new Signal([]);
  #e = new Signal([]);
  #t = 0;
  signals = new Effect;
  constructor(e5) {
    let { codedWidth: t2, codedHeight: n, ...r2 } = e5.config;
    this.source = e5.source, this.broadcast = e5.broadcast, this.track = e5.track, this.config = r2, this.stats = e5.stats, this.signals.run(this.#n.bind(this));
  }
  #n(e5) {
    let t2 = this.broadcast.subscribe(this.track, PRIORITY.video);
    e5.cleanup(() => t2.close());
    let n = new VideoDecoder({
      output: async (t3) => {
        try {
          let n2 = this.#t, i3 = exports_time.Milli.fromMicro(t3.timestamp);
          if (i3 < (this.timestamp.peek() ?? 0))
            return;
          this.frame.peek() === undefined && this.frame.set(t3.clone());
          let a2 = this.source.sync.wait(i3).then(() => true);
          if (!await Promise.race([a2, e5.cancel]) || n2 !== this.#t || i3 < (this.timestamp.peek() ?? 0))
            return;
          this.timestamp.set(i3), this.#s(i3), this.frame.update((e6) => (e6?.close(), t3.clone()));
        } finally {
          t3.close();
        }
      },
      error: (t3) => {
        console.error(t3), e5.close();
      }
    });
    e5.cleanup(() => {
      n.state !== "closed" && n.close();
    }), this.config.container.kind === "cmaf" ? this.#i(e5, t2, n) : this.#r(e5, t2, n);
  }
  #r(e5, t2, n) {
    let i3 = this.config.container.kind === "loc" ? new exports_loc.Format : new exports_legacy.Format, a2 = new Consumer3(t2, {
      format: i3,
      latency: this.source.sync.buffer
    });
    e5.cleanup(() => a2.close()), e5.run((e6) => {
      let t3 = e6.get(a2.buffered), n2 = e6.get(this.#e);
      this.buffered.update(() => mergeBufferedRanges(t3, n2));
    }), n.configure({
      ...this.config,
      description: this.config.description ? exports_hex2.toBytes(this.config.description) : undefined,
      optimizeForLatency: this.config.optimizeForLatency ?? true,
      flip: false
    });
    let o2;
    e5.spawn(async () => {
      for (;; ) {
        let e6 = await a2.next();
        if (!e6)
          break;
        this.#a(e6.discontinuity) && (o2 = undefined);
        let { frame: t3, group: i4 } = e6;
        if (!t3) {
          o2 && (o2.final = true);
          continue;
        }
        let s2 = exports_time.Milli.fromMicro(t3.timestamp);
        this.source.sync.received(s2, "video");
        let c = new EncodedVideoChunk({
          type: t3.keyframe ? "key" : "delta",
          data: t3.data,
          timestamp: t3.timestamp
        });
        this.stats.update((e7) => ({
          frameCount: (e7?.frameCount ?? 0) + 1,
          bytesReceived: (e7?.bytesReceived ?? 0) + t3.data.byteLength
        }));
        let l3 = o2;
        if (l3 && (l3.group === i4 || l3.final && l3.group + 1 === i4)) {
          let e7 = exports_time.Milli.fromMicro(l3.timestamp), n2 = exports_time.Milli.fromMicro(t3.timestamp);
          this.#o(e7, n2);
        }
        o2 = {
          timestamp: t3.timestamp,
          group: i4,
          final: false
        }, n.decode(c);
      }
    });
  }
  #i(e5, t2, n) {
    if (this.config.container.kind !== "cmaf")
      return;
    let i3 = p2(this.config.container.init), a2 = exports_cmaf.decodeInitSegment(i3), o2 = this.config.description ? exports_hex2.toBytes(this.config.description) : a2.description, s2 = new Consumer3(t2, {
      format: new exports_cmaf.Format(a2),
      latency: this.source.sync.buffer
    });
    e5.cleanup(() => s2.close()), e5.run((e6) => {
      let t3 = e6.get(s2.buffered), n2 = e6.get(this.#e);
      this.buffered.update(() => mergeBufferedRanges(t3, n2));
    }), n.configure({
      codec: this.config.codec,
      description: o2,
      optimizeForLatency: this.config.optimizeForLatency ?? true,
      flip: false
    });
    let u3;
    e5.spawn(async () => {
      for (;; ) {
        let e6 = await s2.next();
        if (!e6)
          break;
        this.#a(e6.discontinuity) && (u3 = undefined);
        let { frame: t3, group: i4 } = e6;
        if (!t3) {
          u3 && (u3.final = true);
          continue;
        }
        let a3 = exports_time.Milli.fromMicro(t3.timestamp);
        this.source.sync.received(a3, "video"), this.stats.update((e7) => ({
          frameCount: (e7?.frameCount ?? 0) + 1,
          bytesReceived: (e7?.bytesReceived ?? 0) + t3.data.byteLength
        }));
        let o3 = u3;
        if (o3 && (o3.group === i4 || o3.final && o3.group + 1 === i4)) {
          let e7 = exports_time.Milli.fromMicro(o3.timestamp), n2 = exports_time.Milli.fromMicro(t3.timestamp);
          this.#o(e7, n2);
        }
        if (u3 = {
          timestamp: t3.timestamp,
          group: i4,
          final: false
        }, n.state === "closed")
          break;
        n.decode(new EncodedVideoChunk({
          type: t3.keyframe ? "key" : "delta",
          data: t3.data,
          timestamp: t3.timestamp
        }));
      }
    });
  }
  #a(e5) {
    return e5 === this.#t ? false : (this.#t = e5, this.timestamp.set(undefined), this.#e.set([]), this.source.sync.reset(), true);
  }
  #o(e5, t2) {
    e5 > t2 || this.#e.mutate((n) => {
      for (let i3 of n)
        if (i3.start <= t2 && i3.end >= e5) {
          i3.start = exports_time.Milli.min(i3.start, e5), i3.end = exports_time.Milli.max(i3.end, t2);
          return;
        }
      n.push({
        start: e5,
        end: t2
      }), n.sort((e6, t3) => e6.start - t3.start);
    });
  }
  #s(e5) {
    this.#e.mutate((t2) => {
      for (;t2.length > 0; ) {
        if (t2[0].end >= e5) {
          t2[0].start = exports_time.Milli.max(t2[0].start, e5);
          break;
        }
        t2.shift();
      }
    });
  }
  close() {
    this.signals.close(), this.frame.update((e5) => {
      e5?.close();
    });
  }
};
async function W(e5) {
  let t2;
  if (e5.description)
    t2 = exports_hex2.toBytes(e5.description);
  else if (e5.container.kind === "cmaf")
    try {
      t2 = exports_cmaf.decodeInitSegment(p2(e5.container.init)).description;
    } catch (t3) {
      return console.warn(`video: malformed CMAF init segment for codec ${e5.codec}`, t3), false;
    }
  let { supported: n } = await VideoDecoder.isConfigSupported({
    codec: e5.codec,
    description: t2,
    optimizeForLatency: e5.optimizeForLatency ?? true
  });
  if (n)
    return true;
  if (e5.codec.startsWith("avc3.")) {
    let n2 = `avc1.${e5.codec.slice(5)}`;
    if ((await VideoDecoder.isConfigSupported({
      codec: n2,
      description: t2,
      optimizeForLatency: e5.optimizeForLatency ?? true
    })).supported)
      return e5.codec = n2, true;
  }
  return false;
}
var G = class {
  muxer;
  source;
  #e = new Signal(undefined);
  stats = this.#e;
  #t = new Signal([]);
  buffered = this.#t;
  #n = new Signal(false);
  stalled = this.#n;
  #r = new Signal(exports_time.Milli.zero);
  timestamp = this.#r;
  signals = new Effect;
  constructor(e5, t2) {
    this.muxer = e5, this.source = t2, this.source.supported.set(K), this.signals.run(this.#i.bind(this)), this.signals.run(this.#c.bind(this)), this.signals.run(this.#l.bind(this));
  }
  #i(e5) {
    let t2 = e5.get(this.muxer.element);
    if (!t2)
      return;
    let n = e5.get(this.muxer.mediaSource);
    if (!n)
      return;
    let r2 = e5.get(this.source.broadcast);
    if (!r2)
      return;
    let i3 = e5.get(r2.active);
    if (!i3)
      return;
    let a2 = e5.get(this.source.track);
    if (!a2)
      return;
    let o2 = e5.get(this.source.config);
    if (!o2)
      return;
    let s2 = `video/mp4; codecs="${o2.codec}"`, c = n.addSourceBuffer(s2);
    e5.cleanup(() => {
      n.removeSourceBuffer(c), c.abort();
    }), e5.event(c, "error", (e6) => {
      console.error("[MSE] SourceBuffer error:", e6);
    }), e5.event(c, "updateend", () => {
      this.#t.set(N2(c.buffered));
    }), o2.container.kind === "cmaf" ? this.#o(e5, i3, a2, o2, c, t2) : this.#s(e5, i3, a2, o2, c, t2);
  }
  async#a(e5, t2) {
    for (;e5.updating; )
      await new Promise((t3) => e5.addEventListener("updateend", t3, { once: true }));
    for (e5.appendBuffer(t2);e5.updating; )
      await new Promise((t3) => e5.addEventListener("updateend", t3, { once: true }));
  }
  #o(e5, n, r2, i3, a2, s2) {
    if (i3.container.kind !== "cmaf")
      throw Error("unreachable");
    let l3 = n.subscribe(r2, PRIORITY.video);
    e5.cleanup(() => l3.close());
    let u3 = p2(i3.container.init), d3 = exports_cmaf.decodeInitSegment(u3);
    e5.spawn(async () => {
      for (await this.#a(a2, u3);; ) {
        let e6 = await l3.readFrame();
        if (!e6)
          return;
        let n2 = exports_cmaf.decodeTimestamp(e6, d3);
        this.source.sync.received(exports_time.Milli.fromMicro(n2), "video"), await this.#a(a2, e6), s2.buffered.length > 0 && s2.currentTime < s2.buffered.start(0) && (s2.currentTime = s2.buffered.start(0));
      }
    });
  }
  #s(e5, n, r2, i3, a2, s2) {
    let l3 = n.subscribe(r2, PRIORITY.video);
    e5.cleanup(() => l3.close());
    let u3 = i3.container.kind === "loc" ? new exports_loc.Format : new exports_legacy.Format, d3 = new Consumer3(l3, {
      format: u3,
      latency: this.source.sync.buffer
    });
    e5.cleanup(() => d3.close()), e5.spawn(async () => {
      let e6 = exports_cmaf.createVideoInitSegment(i3);
      await this.#a(a2, e6);
      let n2 = 1, r3, o2;
      for (;; ) {
        let e7 = await d3.next();
        if (!e7)
          return;
        if (!e7.frame)
          continue;
        o2 = e7.frame;
        let n3 = exports_time.Milli.fromMicro(o2.timestamp);
        this.source.sync.received(n3, "video");
        break;
      }
      for (;; ) {
        let e7 = await d3.next();
        if (e7 && !e7.frame)
          continue;
        let i4 = e7?.frame;
        if (i4) {
          r3 = exports_time.Micro.sub(i4.timestamp, o2.timestamp);
          let e8 = exports_time.Milli.fromMicro(i4.timestamp);
          this.source.sync.received(e8, "video");
        }
        let l4 = exports_cmaf.encodeDataSegment({
          data: o2.data,
          timestamp: o2.timestamp,
          duration: r3 ?? 0,
          keyframe: o2.keyframe,
          sequence: n2++
        });
        if (await this.#a(a2, l4), s2.buffered.length > 0 && s2.currentTime < s2.buffered.start(0) && (s2.currentTime = s2.buffered.start(0)), !i4)
          return;
        o2 = i4;
      }
    });
  }
  #c(e5) {
    let t2 = e5.get(this.muxer.element);
    if (!t2)
      return;
    let n = () => {
      this.#n.set(t2.readyState <= HTMLMediaElement.HAVE_CURRENT_DATA);
    };
    n(), e5.event(t2, "waiting", n), e5.event(t2, "playing", n), e5.event(t2, "seeking", n);
  }
  #l(e5) {
    let n = e5.get(this.muxer.element);
    if (n)
      if ("requestVideoFrameCallback" in n) {
        let r2 = n, i3, a2 = () => {
          let e6 = exports_time.Milli.fromSecond(r2.currentTime);
          this.#r.set(e6), i3 = r2.requestVideoFrameCallback(a2);
        };
        i3 = r2.requestVideoFrameCallback(a2), e5.cleanup(() => r2.cancelVideoFrameCallback(i3));
      } else
        e5.event(n, "timeupdate", () => {
          let e6 = exports_time.Milli.fromSecond(n.currentTime);
          this.#r.set(e6);
        });
  }
  close() {
    this.source.close(), this.signals.close();
  }
};
async function K(e5) {
  return MediaSource.isTypeSupported(`video/mp4; codecs="${e5.codec}"`);
}
var q = 0.01;
var J = class {
  decoder;
  canvas;
  paused;
  visible;
  frame = new Signal(undefined);
  timestamp = new Signal(undefined);
  #e = new Signal(undefined);
  #t = new Signal(false);
  #n = new Effect;
  constructor(e5, t2) {
    this.decoder = e5, this.canvas = Signal.from(t2?.canvas), this.paused = Signal.from(t2?.paused ?? false), this.visible = Signal.from(t2?.visible ?? "0px"), this.#n.run((e6) => {
      let t3 = e6.get(this.canvas);
      this.#e.set(t3?.getContext("2d") ?? undefined);
    }), this.#n.run(this.#i.bind(this)), this.#n.run(this.#a.bind(this)), this.#n.run(this.#o.bind(this)), this.#n.run(this.#r.bind(this));
  }
  #r(e5) {
    let t2 = e5.getAll([this.canvas, this.decoder.display]);
    if (!t2)
      return;
    let [n, r2] = t2;
    (n.width !== r2.width || n.height !== r2.height) && (n.width = r2.width, n.height = r2.height);
  }
  #i(e5) {
    let t2 = e5.get(this.visible);
    if (t2 === "never") {
      this.#t.set(false);
      return;
    }
    if (t2 === "always") {
      this.#t.set(true), e5.cleanup(() => this.#t.set(false));
      return;
    }
    let n = e5.get(this.canvas);
    if (!n) {
      this.#t.set(false);
      return;
    }
    let r2 = false, i3 = () => {
      this.#t.set(r2 && !document.hidden);
    }, a2 = (e6) => {
      for (let t3 of e6)
        r2 = t3.isIntersecting, i3();
    }, o2;
    try {
      o2 = new IntersectionObserver(a2, {
        threshold: q,
        rootMargin: t2
      });
    } catch {
      console.warn(`moq-watch: invalid visible margin "${t2}", using "0px"`), o2 = new IntersectionObserver(a2, { threshold: q });
    }
    i3(), e5.event(document, "visibilitychange", i3), o2.observe(n), e5.cleanup(() => o2.disconnect()), e5.cleanup(() => this.#t.set(false));
  }
  #a(e5) {
    let t2 = e5.get(this.paused), n = e5.get(this.#t);
    if (e5.cleanup(() => this.decoder.enabled.set(false)), !t2) {
      this.decoder.enabled.set(n);
      return;
    }
    let r2 = e5.get(this.decoder.frame);
    this.decoder.enabled.set(!r2);
  }
  #o(e5) {
    let t2 = e5.get(this.#e);
    if (!t2)
      return;
    let n = e5.get(this.decoder.frame), i3 = requestAnimationFrame(() => {
      this.#s(t2, n), n ? (this.frame.update((e6) => (e6?.close(), n.clone())), this.timestamp.set(exports_time.Milli.fromMicro(n.timestamp))) : (this.frame.update((e6) => {
        e6?.close();
      }), this.timestamp.set(undefined)), i3 = undefined;
    });
    e5.cleanup(() => {
      i3 && cancelAnimationFrame(i3);
    });
  }
  #s(e5, t2) {
    if (!t2) {
      e5.fillStyle = "#000", e5.fillRect(0, 0, e5.canvas.width, e5.canvas.height);
      return;
    }
    e5.save(), e5.fillStyle = "#000", e5.fillRect(0, 0, e5.canvas.width, e5.canvas.height), this.decoder.source.catalog.peek()?.flip && (e5.scale(-1, 1), e5.translate(-e5.canvas.width, 0)), e5.drawImage(t2, 0, 0, e5.canvas.width, e5.canvas.height), e5.restore();
  }
  close() {
    this.frame.update((e5) => {
      e5?.close();
    }), this.timestamp.set(undefined), this.#n.close();
  }
};
function oe(e5) {
  return (t2) => {
    let n = [], r2 = [];
    for (let [i3, a2] of t2)
      if (a2.codedWidth && a2.codedHeight) {
        let t3 = a2.codedWidth * a2.codedHeight;
        t3 <= e5 ? n.push({
          name: i3,
          size: t3
        }) : r2.push({
          name: i3,
          size: t3
        });
      }
    return n.sort((e6, t3) => t3.size - e6.size), n.length > 0 ? n.map((e6) => e6.name) : r2.length > 0 ? (r2.sort((e6, t3) => e6.size - t3.size), [r2[0].name]) : t2.map(([e6]) => e6);
  };
}
function se(e5, t2) {
  return (n) => {
    let r2 = [], i3 = [];
    for (let [a2, o2] of n) {
      if (!o2.codedWidth || !o2.codedHeight)
        continue;
      let n2 = o2.codedWidth * o2.codedHeight, s2 = e5 == null || o2.codedWidth <= e5, c = t2 == null || o2.codedHeight <= t2;
      s2 && c ? r2.push({
        name: a2,
        size: n2
      }) : i3.push({
        name: a2,
        size: n2
      });
    }
    return r2.sort((e6, t3) => t3.size - e6.size), r2.length > 0 ? r2.map((e6) => e6.name) : i3.length > 0 ? (i3.sort((e6, t3) => e6.size - t3.size), [i3[0].name]) : n.map(([e6]) => e6);
  };
}
function ce(e5) {
  return (t2) => {
    let n = [], r2 = [];
    for (let [i3, a2] of t2)
      a2.bitrate != null && a2.bitrate <= e5 ? n.push({
        name: i3,
        bitrate: a2.bitrate
      }) : a2.bitrate != null && r2.push({
        name: i3,
        bitrate: a2.bitrate
      });
    return n.sort((e6, t3) => t3.bitrate - e6.bitrate), n.length > 0 ? n.map((e6) => e6.name) : r2.length > 0 ? (r2.sort((e6, t3) => e6.bitrate - t3.bitrate), [r2[0].name]) : t2.map(([e6]) => e6);
  };
}
function le(e5) {
  let t2 = e5[0];
  for (let n of e5) {
    let [, e6] = n, [, r2] = t2, i3 = (e6.codedWidth ?? 0) * (e6.codedHeight ?? 0), a2 = (r2.codedWidth ?? 0) * (r2.codedHeight ?? 0);
    if (i3 !== a2) {
      i3 > a2 && (t2 = n);
      continue;
    }
    (e6.bitrate ?? 0) > (r2.bitrate ?? 0) && (t2 = n);
  }
  return t2[0];
}
var Y = class {
  broadcast;
  target;
  catalog;
  #e = new Signal({});
  available = this.#e;
  #t = new Signal(undefined);
  track = this.#t;
  #n = new Signal(undefined);
  config = this.#n;
  sync;
  supported;
  #r = new Effect;
  constructor(e5, t2) {
    this.broadcast = Signal.from(t2?.broadcast), this.target = Signal.from(t2?.target), this.sync = e5, this.supported = Signal.from(t2?.supported), this.catalog = this.#r.computed((e6) => {
      let t3 = e6.get(this.broadcast);
      return t3 ? e6.get(t3.catalog)?.video : undefined;
    }), this.#r.run(this.#i.bind(this)), this.#r.run(this.#a.bind(this));
  }
  #i(e5) {
    let t2 = e5.get(this.supported);
    if (!t2)
      return;
    let n = e5.get(this.catalog)?.renditions ?? {};
    e5.spawn(async () => {
      let e6 = {};
      for (let [r2, i3] of Object.entries(n))
        await t2(i3) && (e6[r2] = i3);
      Object.keys(e6).length === 0 && Object.keys(n).length > 0 && console.warn("[Source] No supported video renditions found:", n), this.#e.set(e6);
    });
  }
  #a(e5) {
    let t2 = e5.get(this.#e);
    if (Object.keys(t2).length === 0)
      return;
    let n = e5.get(this.target);
    if (n?.name && n.name in t2) {
      let r3 = t2[n.name];
      e5.set(this.#t, n.name), e5.set(this.#n, r3), e5.set(this.sync.video, r3.jitter);
      return;
    }
    let r2 = n;
    if (!n?.bitrate) {
      let t3 = e5.get(this.broadcast), i4 = (t3 ? e5.get(t3.connection) : undefined)?.recvBandwidth;
      if (i4) {
        let t4 = e5.get(i4);
        if (t4 != null) {
          let e6 = Math.round(t4 * 0.8);
          r2 = {
            ...n,
            bitrate: e6
          };
        }
      }
    }
    let i3 = this.#o(t2, r2);
    if (!i3)
      return;
    let a2 = t2[i3];
    e5.set(this.#t, i3), e5.set(this.#n, a2);
    let o2 = a2.jitter ?? (a2.framerate ? Math.ceil(1000 / a2.framerate) : undefined);
    e5.set(this.sync.video, o2);
  }
  #o(e5, t2) {
    let n = Object.entries(e5);
    if (n.length === 0)
      return;
    if (n.length === 1)
      return n[0][0];
    let r2 = [];
    if (t2?.pixels != null && r2.push(oe(t2.pixels)), (t2?.width != null || t2?.height != null) && r2.push(se(t2.width, t2.height)), t2?.bitrate != null && r2.push(ce(t2.bitrate)), r2.length === 0)
      return le(n);
    let i3 = r2.map((e6) => e6(n)), a2 = i3.map((e6) => new Set(e6));
    for (let e6 of i3[0])
      if (a2.every((t3) => t3.has(e6)))
        return e6;
    console.warn("conflicting rendition filters, no rendition satisfies all criteria");
  }
  close() {
    this.#r.close();
  }
};
var de = class {
  source;
  stats = new Signal(undefined);
  stalled = new Signal(false);
  buffered = new Signal([]);
  timestamp = new Signal(exports_time.Milli.zero);
  constructor(e5) {
    this.source = e5;
  }
};
var fe = class {
  source;
  volume = new Signal(0.5);
  muted = new Signal(false);
  stats = new Signal(undefined);
  buffered = new Signal([]);
  context = new Signal(undefined);
  constructor(e5) {
    this.source = e5;
  }
};
var pe = class {
  element = new Signal(undefined);
  broadcast;
  latency;
  jitter;
  buffered;
  paused;
  visible;
  video;
  #e;
  audio;
  #t;
  #n;
  sync;
  signals = new Effect;
  constructor(t2) {
    this.element = Signal.from(t2?.element), this.broadcast = Signal.from(t2?.broadcast), this.sync = new s({
      latency: t2?.latency,
      connection: t2?.connection
    }), this.latency = this.sync.latency, this.jitter = this.sync.jitter, this.buffered = this.sync.buffered, this.#e = new Y(this.sync, { broadcast: this.broadcast }), this.#t = new F2(this.sync, { broadcast: this.broadcast }), this.video = new de(this.#e), this.audio = new fe(this.#t), this.paused = Signal.from(t2?.paused ?? false), this.visible = Signal.from(t2?.visible ?? "0px"), this.signals.run(this.#r.bind(this));
  }
  #r(e5) {
    let t2 = e5.get(this.element);
    t2 && (t2 instanceof HTMLCanvasElement ? this.#i(e5, t2) : t2 instanceof HTMLVideoElement && this.#a(e5, t2));
  }
  #i(e5, t2) {
    let n = new H(this.#e), r2 = new O2(this.#t);
    this.#n = r2;
    let i3 = new M2(r2, {
      volume: this.audio.volume,
      muted: this.audio.muted,
      paused: this.paused
    }), a2 = new J(n, {
      canvas: t2,
      paused: this.paused,
      visible: this.visible
    });
    e5.cleanup(() => {
      n.close(), r2.close(), i3.close(), a2.close(), this.#n = undefined;
    }), e5.proxy(this.video.stats, n.stats), e5.proxy(this.video.buffered, n.buffered), e5.proxy(this.video.stalled, n.stalled), e5.proxy(this.video.timestamp, n.timestamp), e5.proxy(this.audio.stats, r2.stats), e5.proxy(this.audio.buffered, r2.buffered), e5.proxy(this.audio.context, r2.context);
  }
  #a(e5, t2) {
    let n = new z(this.sync, {
      paused: this.paused,
      element: t2
    }), r2 = new G(n, this.#e), i3 = new P2(n, this.#t, {
      volume: this.audio.volume,
      muted: this.audio.muted
    });
    e5.cleanup(() => {
      r2.close(), i3.close(), n.close();
    }), e5.proxy(this.video.stats, r2.stats), e5.proxy(this.video.buffered, r2.buffered), e5.proxy(this.video.stalled, r2.stalled), e5.proxy(this.video.timestamp, r2.timestamp), e5.proxy(this.audio.stats, i3.stats), e5.proxy(this.audio.buffered, i3.buffered), e5.proxy(this.audio.context, i3.context);
  }
  reset() {
    this.sync.reset(), this.#n?.reset();
  }
  close() {
    this.signals.close(), this.#e.close(), this.#t.close(), this.sync.close();
  }
};
var me = 48000;
var X = 2;
function he(e5) {
  let t2 = "";
  for (let n = 0;n < e5.length; n++)
    t2 += e5[n].toString(16).padStart(2, "0");
  return t2;
}
function Z(e5) {
  let t2;
  try {
    t2 = e5.initData ? p2(e5.initData) : undefined;
  } catch {
    t2 = undefined;
  }
  return e5.packaging === "cmaf" && e5.initData && t2 ? {
    container: {
      kind: "cmaf",
      init: e5.initData
    },
    description: undefined
  } : {
    container: { kind: "legacy" },
    description: t2 ? he(t2) : undefined
  };
}
function ge(e5) {
  if (!e5.codec)
    return;
  let { container: t2, description: n } = Z(e5);
  return {
    codec: e5.codec,
    container: t2,
    description: n,
    codedWidth: e5.width == null ? undefined : u53(e5.width),
    codedHeight: e5.height == null ? undefined : u53(e5.height),
    framerate: e5.framerate,
    bitrate: e5.bitrate == null ? undefined : u53(e5.bitrate),
    jitter: e5.jitter == null ? undefined : u53(e5.jitter)
  };
}
function _e(e5) {
  if (!e5.codec)
    return;
  let t2 = (() => {
    if (!e5.channelConfig)
      return X;
    let t3 = Number.parseInt(e5.channelConfig, 10);
    return Number.isFinite(t3) ? t3 : X;
  })(), { container: n, description: r2 } = Z(e5);
  return {
    codec: e5.codec,
    container: n,
    description: r2,
    sampleRate: u53(e5.samplerate ?? me),
    numberOfChannels: u53(t2),
    bitrate: e5.bitrate == null ? undefined : u53(e5.bitrate),
    jitter: e5.jitter == null ? undefined : u53(e5.jitter)
  };
}
function Q(e5) {
  let t2 = {}, n = {};
  for (let r3 of e5.tracks)
    if (r3.role === "video") {
      let e6 = ge(r3);
      e6 && (t2[r3.name] = e6);
    } else if (r3.role === "audio") {
      let e6 = _e(r3);
      e6 && (n[r3.name] = e6);
    }
  let r2 = {};
  return Object.keys(t2).length > 0 && (r2.video = { renditions: t2 }), Object.keys(n).length > 0 && (r2.audio = { renditions: n }), r2;
}
var $ = [
  ...FORMATS,
  "hangz",
  "manual"
];
function ve(e5) {
  if (e5 !== null)
    return $.find((t2) => t2 === e5);
}
var ye = class {
  connection;
  enabled;
  name;
  status = new Signal("offline");
  reload;
  catalogFormat;
  #e = new Signal(undefined);
  active = this.#e;
  catalog;
  #t;
  #n = new Signal(false);
  signals = new Effect;
  constructor(e5) {
    this.connection = Signal.from(e5?.connection), this.name = Signal.from(e5?.name ?? exports_path.empty()), this.enabled = Signal.from(e5?.enabled ?? false), this.reload = Signal.from(e5?.reload ?? false), this.catalogFormat = Signal.from(e5?.catalogFormat), this.catalog = Signal.from(e5?.catalog), this.#t = e5?.announced ?? new Signal(/* @__PURE__ */ new Set), this.signals.run(this.#r.bind(this)), this.signals.run(this.#i.bind(this)), this.signals.run(this.#a.bind(this));
  }
  #r(e5) {
    if (!e5.get(this.reload)) {
      this.#n.set(true);
      return;
    }
    if (e5.get(this.connection)?.url.hostname.endsWith("mediaoverquic.com")) {
      console.warn("Cloudflare relay does not support broadcast discovery yet; ignoring reload signal."), this.#n.set(true);
      return;
    }
    let t2 = e5.get(this.name), n = e5.get(this.#t);
    this.#n.set(n.has(t2));
  }
  #i(e5) {
    if (!e5.get(this.enabled) || !e5.get(this.#n))
      return;
    let t2 = e5.get(this.connection);
    if (!t2)
      return;
    let n = e5.get(this.name), r2 = t2.consume(n);
    e5.cleanup(() => r2.close()), e5.set(this.#e, r2, undefined);
  }
  #a(e5) {
    if (!e5.get(this.enabled))
      return;
    let t2 = e5.get(this.catalogFormat), n = e5.get(this.name), r2 = t2 ?? detectFormat(n) ?? DEFAULT_FORMAT;
    if (r2 === "manual") {
      let t3 = e5.get(this.catalog);
      this.status.set(t3 ? "live" : "loading");
      return;
    }
    let i3 = e5.get(this.active);
    if (!i3)
      return;
    this.status.set("loading");
    let a2 = r2 === "hang" ? TRACK : r2 === "hangz" ? TRACK_COMPRESSED : "catalog", s2 = i3.subscribe(a2, PRIORITY.catalog);
    e5.cleanup(() => s2.close());
    let c;
    if (r2 === "hang" || r2 === "hangz") {
      let e6 = new Consumer2(s2, { compression: r2 === "hangz" });
      c = () => e6.next();
    } else
      c = async () => {
        let e6 = await fetch2(s2);
        return e6 ? Q(e6) : undefined;
      };
    e5.spawn(async () => {
      try {
        for (;; ) {
          let t3 = await Promise.race([e5.cancel, c()]);
          if (!t3)
            break;
          console.debug("received catalog", r2, this.name.peek(), t3), this.catalog.set(t3), this.status.set("live");
        }
      } catch (e6) {
        console.warn("error fetching catalog", this.name.peek(), e6);
      } finally {
        this.catalog.set(undefined), this.status.set("offline");
      }
    });
  }
  subscribeTrack(e5, t2, n) {
    let r2 = new Effect;
    return r2.run((r3) => {
      let i3 = r3.get(this.active);
      if (!i3)
        return;
      let a2 = i3.subscribe(e5, t2);
      r3.cleanup(() => a2.close()), n(a2, r3);
    }), this.signals.cleanup(() => r2.close()), () => r2.close();
  }
  close() {
    this.signals.close();
  }
};

// node_modules/@moq/watch/element.js
var c = [
  "url",
  "name",
  "paused",
  "volume",
  "muted",
  "visible",
  "reload",
  "latency",
  "latency-min",
  "latency-max",
  "jitter",
  "catalog-format"
];
function l3(e5) {
  let t2 = e5?.trim();
  return t2 ? t2 === "never" || t2 === "always" || /^-?\d+(\.\d+)?(px|%)$/.test(t2) ? t2 : /^-?\d+(\.\d+)?$/.test(t2) ? `${t2}px` : (console.warn(`moq-watch: invalid visible="${e5}", expected "never", "always", or a CSS length like "200px"`), "0px") : "0px";
}
var u3 = new FinalizationRegistry((e5) => e5.close());
var d3 = class extends HTMLElement {
  static observedAttributes = c;
  connection;
  broadcast;
  backend;
  #e = new Signal(false);
  signals = new Effect;
  constructor() {
    super(), u3.register(this, this.signals), this.connection = new exports_connection.Reload({ enabled: this.#e }), this.signals.cleanup(() => this.connection.close()), this.broadcast = new ye({
      connection: this.connection.established,
      announced: this.connection.announced,
      enabled: this.#e
    }), this.signals.cleanup(() => this.broadcast.close()), this.backend = new pe({
      broadcast: this.broadcast,
      connection: this.connection.established
    }), this.signals.cleanup(() => this.backend.close());
    let t2 = () => {
      let e5 = this.querySelector("canvas"), t3 = this.querySelector("video");
      if (e5 && t3)
        throw Error("Cannot have both canvas and video elements");
      this.backend.element.set(e5 ?? t3);
    }, i3 = new MutationObserver(t2);
    i3.observe(this, {
      childList: true,
      subtree: true
    }), this.signals.cleanup(() => i3.disconnect()), t2(), this.signals.run((e5) => {
      let t3 = e5.get(this.connection.url);
      t3 ? this.setAttribute("url", t3.toString()) : this.removeAttribute("url");
    }), this.signals.run((e5) => {
      let t3 = e5.get(this.broadcast.name);
      this.setAttribute("name", t3.toString());
    }), this.signals.run((e5) => {
      e5.get(this.backend.audio.muted) ? this.setAttribute("muted", "") : this.removeAttribute("muted");
    }), this.signals.run((e5) => {
      e5.get(this.backend.paused) ? this.setAttribute("paused", "true") : this.removeAttribute("paused");
    }), this.signals.run((e5) => {
      let t3 = e5.get(this.backend.visible);
      this.setAttribute("visible", t3);
    }), this.signals.run((e5) => {
      let t3 = e5.get(this.backend.audio.volume);
      this.setAttribute("volume", t3.toString());
    }), this.signals.run((e5) => {
      let { min: t3, max: n } = r(e5.get(this.backend.latency));
      if (t3 === n)
        if (t3 === "real-time")
          this.setAttribute("latency", "real-time");
        else {
          let t4 = Math.floor(e5.get(this.backend.jitter));
          this.setAttribute("latency", t4.toString());
        }
    });
    let o2 = (e5, t3) => {
      if (e5 <= 0 || t3 <= 0)
        return;
      let n = window.devicePixelRatio || 1;
      this.backend.video.source.target.update((r2) => ({
        ...r2,
        width: Math.round(e5 * n),
        height: Math.round(t3 * n)
      }));
    }, s2 = new ResizeObserver((e5) => {
      let t3 = e5[0];
      t3 && o2(t3.contentRect.width, t3.contentRect.height);
    });
    s2.observe(this), this.signals.cleanup(() => s2.disconnect());
    let c2 = this.getBoundingClientRect();
    o2(c2.width, c2.height);
  }
  connectedCallback() {
    this.#e.set(true), this.style.display = "block", this.style.position = "relative";
  }
  disconnectedCallback() {
    this.#e.set(false);
  }
  #t(e5) {
    if (!e5 || e5 === "real-time")
      return "real-time";
    let t2 = Number.parseFloat(e5);
    return Number.isFinite(t2) ? t2 : 100;
  }
  attributeChangedCallback(e5, n, r2) {
    if (n !== r2)
      if (e5 === "url")
        this.connection.url.set(r2 ? new URL(r2) : undefined);
      else if (e5 === "name")
        this.broadcast.name.set(exports_path.from(r2 ?? ""));
      else if (e5 === "paused")
        this.backend.paused.set(r2 !== null);
      else if (e5 === "volume") {
        let e6 = r2 ? Number.parseFloat(r2) : 0.5;
        this.backend.audio.volume.set(e6);
      } else if (e5 === "muted")
        this.backend.audio.muted.set(r2 !== null);
      else if (e5 === "visible")
        this.backend.visible.set(l3(r2));
      else if (e5 === "reload")
        this.broadcast.reload.set(r2 !== null);
      else if (e5 === "latency")
        this.latency = this.#t(r2);
      else if (e5 === "latency-min")
        this.latencyMin = this.#t(r2);
      else if (e5 === "latency-max")
        this.latencyMax = this.#t(r2);
      else if (e5 === "jitter")
        this.latency = this.#t(r2);
      else if (e5 === "catalog-format")
        this.broadcast.catalogFormat.set(ve(r2));
      else
        throw Error(`Invalid attribute: ${e5}`);
  }
  get url() {
    return this.connection.url.peek();
  }
  set url(e5) {
    this.connection.url.set(e5 ? new URL(e5) : undefined);
  }
  get name() {
    return this.broadcast.name.peek();
  }
  set name(e5) {
    this.broadcast.name.set(exports_path.from(e5));
  }
  get paused() {
    return this.backend.paused.peek();
  }
  set paused(e5) {
    this.backend.paused.set(e5);
  }
  get volume() {
    return this.backend.audio.volume.peek();
  }
  set volume(e5) {
    this.backend.audio.volume.set(e5);
  }
  get muted() {
    return this.backend.audio.muted.peek();
  }
  set muted(e5) {
    this.backend.audio.muted.set(e5);
  }
  get visible() {
    return this.backend.visible.peek();
  }
  set visible(e5) {
    this.backend.visible.set(e5);
  }
  get reload() {
    return this.broadcast.reload.peek();
  }
  set reload(e5) {
    this.broadcast.reload.set(e5);
  }
  get latency() {
    return this.backend.latency.peek();
  }
  set latency(e5) {
    this.backend.latency.set(e5);
  }
  get latencyMin() {
    return r(this.backend.latency.peek()).min;
  }
  set latencyMin(e5) {
    let { max: t2 } = r(this.backend.latency.peek());
    this.backend.latency.set(i(e5, t2));
  }
  get latencyMax() {
    return r(this.backend.latency.peek()).max;
  }
  set latencyMax(e5) {
    let { min: t2 } = r(this.backend.latency.peek());
    this.backend.latency.set(i(t2, e5));
  }
  get jitter() {
    return this.backend.jitter.peek();
  }
  set jitter(e5) {
    this.latency = e5;
  }
  reset() {
    this.backend.reset();
  }
  get catalogFormat() {
    return this.broadcast.catalogFormat.peek();
  }
  set catalogFormat(e5) {
    this.broadcast.catalogFormat.set(e5);
  }
  get catalog() {
    return this.broadcast.catalog.peek();
  }
  set catalog(e5) {
    this.broadcast.catalog.set(e5);
  }
};
customElements.define("moq-watch", d3);
