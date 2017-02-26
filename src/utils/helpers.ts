// TODO: These conversion functions still need to be refined.

export function toArrayBuffer(buf: Buffer): ArrayBuffer {
  let ab = new ArrayBuffer(buf.length)
  let view = new Uint8Array(ab)

  for (let i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }

  return ab
}

export function toBuffer(ab): Buffer {
  let buf = new Buffer(ab.byteLength);
  let view = new Uint8Array(ab);

  for (let i = 0; i < buf.length; ++i) {
    buf[i] = view[i];
  }

  return buf;
}
