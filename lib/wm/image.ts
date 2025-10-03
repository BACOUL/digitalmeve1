// lib/wm/image.ts
// Invisible watermark for images (PNG/JPG) — browser-only, no deps.

type ImgKind = "png" | "jpg" | "jpeg";

export async function embedInvisibleWatermarkImage(
  blobIn: Blob,
  payload: { hash: string; ts: string; issuer?: string; kind: ImgKind }
): Promise<Blob> {
  const ab = await blobIn.arrayBuffer();
  const bytes = new Uint8Array(ab);

  const jsonObj = {
    meve: 1,
    hash: payload.hash,
    ts: payload.ts,
    issuer: payload.issuer ?? null,
    type: "image",
  };
  const json = JSON.stringify(jsonObj);

  // PNG → iTXt "meve"
  if (isPng(bytes) || payload.kind === "png") {
    const out = insertPngITXt(bytes, "meve", json);
    return new Blob([toArrayBuffer(out)], { type: "image/png" });
  }

  // JPEG → COM segment "MEVE:<base64(json)>"
  if (isJpeg(bytes) || payload.kind === "jpg" || payload.kind === "jpeg") {
    const base64 = utf8ToBase64(json);
    const out = insertJpegCOM(bytes, `MEVE:${base64}`);
    return new Blob([toArrayBuffer(out)], { type: "image/jpeg" });
  }

  // format non géré → retourne l’original
  return blobIn;
}

/* ---------- JPEG ---------- */

function isJpeg(b: Uint8Array) {
  return b.length >= 2 && b[0] === 0xff && b[1] === 0xd8;
}

function insertJpegCOM(src: Uint8Array, comment: string): Uint8Array {
  if (!isJpeg(src)) return src;

  const encoder = new TextEncoder();
  const comPayload = encoder.encode(comment);

  // longueur du segment (inclut les 2 octets de longueur)
  const segLen = comPayload.length + 2;
  if (segLen > 0xffff) throw new Error("MEVE comment too large for JPEG COM");

  // Nouveau tableau: SOI + COM + reste
  const out = new Uint8Array(src.length + 2 + 2 + comPayload.length);
  let p = 0;

  // SOI
  out[p++] = src[0];
  out[p++] = src[1];

  // COM marker
  out[p++] = 0xff;
  out[p++] = 0xfe;
  out[p++] = (segLen >> 8) & 0xff;
  out[p++] = segLen & 0xff;
  out.set(comPayload, p);
  p += comPayload.length;

  // reste du JPEG
  out.set(src.subarray(2), p);
  return out;
}

/* ---------- PNG ---------- */

function isPng(b: Uint8Array) {
  if (b.length < 8) return false;
  const sig = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  for (let i = 0; i < sig.length; i++) if (b[i] !== sig[i]) return false;
  return true;
}

// Insère un chunk iTXt (clé "keyword", texte UTF-8 "text") juste avant IEND
function insertPngITXt(src: Uint8Array, keyword: string, text: string): Uint8Array {
  if (!isPng(src)) return src;

  const TYPE_iTXt = new Uint8Array([0x69, 0x54, 0x58, 0x74]); // "iTXt"
  const encoder = new TextEncoder();

  // iTXt data layout:
  // keyword\0 compressionFlag(0) compressionMethod(0) languageTag\0 translatedKeyword\0 text(UTF-8)
  const key = encoder.encode(keyword);
  const nul = new Uint8Array([0]);
  const compressionFlag = new Uint8Array([0]);   // 0 = uncompressed
  const compressionMethod = new Uint8Array([0]); // 0 = n/a
  const languageTag = new Uint8Array([0]);       // empty + NUL
  const translatedKeyword = new Uint8Array([0]); // empty + NUL
  const txt = encoder.encode(text);

  const data = concatU8(
    key,
    nul,
    compressionFlag,
    compressionMethod,
    languageTag,        // already NUL-terminated
    translatedKeyword,  // already NUL-terminated
    txt
  );

  const lenBuf = new Uint8Array(4);
  writeU32BE(lenBuf, data.length);

  const crc = crc32(concatU8(TYPE_iTXt, data));
  const crcBuf = new Uint8Array(4);
  writeU32BE(crcBuf, crc >>> 0);

  const itxtChunk = concatU8(lenBuf, TYPE_iTXt, data, crcBuf);

  // Insertion avant IEND
  const iendIndex = findPngChunk(src, "IEND");
  if (iendIndex < 0) {
    // PNG corrompu → append
    return concatU8(src, itxtChunk);
  }
  const before = src.subarray(0, iendIndex);
  const after = src.subarray(iendIndex);
  return concatU8(before, itxtChunk, after);
}

function findPngChunk(src: Uint8Array, type: string): number {
  let off = 8; // signature
  while (off + 8 <= src.length) {
    const len = readU32BE(src, off);
    const t0 = src[off + 4],
      t1 = src[off + 5],
      t2 = src[off + 6],
      t3 = src[off + 7];
    const tStr = String.fromCharCode(t0, t1, t2, t3);
    if (tStr === type) return off;
    off += 12 + len; // length(4) + type(4) + data(len) + crc(4)
  }
  return -1;
}

/* ---------- utils ---------- */

function writeU32BE(buf: Uint8Array, value: number) {
  buf[0] = (value >>> 24) & 0xff;
  buf[1] = (value >>> 16) & 0xff;
  buf[2] = (value >>> 8) & 0xff;
  buf[3] = value & 0xff;
}

function readU32BE(buf: Uint8Array, off: number) {
  return ((buf[off] << 24) | (buf[off + 1] << 16) | (buf[off + 2] << 8) | buf[off + 3]) >>> 0;
}

function concatU8(...parts: Uint8Array[]): Uint8Array {
  const total = parts.reduce((n, p) => n + p.length, 0);
  const out = new Uint8Array(total);
  let o = 0;
  for (const p of parts) {
    out.set(p, o);
    o += p.length;
  }
  return out;
}

// Table CRC32
const _crcTable = (() => {
  const tbl = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    tbl[n] = c >>> 0;
  }
  return tbl;
})();

function crc32(bytes: Uint8Array): number {
  let c = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    c = _crcTable[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function utf8ToBase64(s: string): string {
  const enc = new TextEncoder().encode(s);
  let bin = "";
  for (let i = 0; i < enc.length; i++) bin += String.fromCharCode(enc[i]);
  return btoa(bin);
}

// IMPORTANT : fournir un ArrayBuffer "classique" à Blob() pour éviter les soucis de typings (ArrayBufferLike / SharedArrayBuffer).
function toArrayBuffer(u8: Uint8Array): ArrayBuffer {
  const ab = new ArrayBuffer(u8.byteLength);
  new Uint8Array(ab).set(u8);
  return ab;
}
