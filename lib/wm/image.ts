// lib/wm/image.ts
// Invisible watermark for images (PNG/JPG) — browser-only, no deps.

export type ImgKind = "png" | "jpg" | "jpeg";

export type MeveImagePayload = {
  meve: 1;
  type: "image";
  hash: string;
  ts: string;
  issuer?: string | null;
};

const PNG_IXT_KEYWORD = "meve";
const JPEG_COM_PREFIX = "MEVE:";

/* ──────────────────────────────────────────────────────────────
 * Public API
 * ────────────────────────────────────────────────────────────── */

/** Écrit un watermark invisible dans PNG/JPEG (iTXt / COM). */
export async function embedInvisibleWatermarkImage(
  blobIn: Blob,
  payload: { hash: string; ts: string; issuer?: string; kind: ImgKind }
): Promise<Blob> {
  const ab = await blobIn.arrayBuffer();
  const bytes = new Uint8Array(ab);

  const json = JSON.stringify({
    meve: 1,
    hash: payload.hash,
    ts: payload.ts,
    issuer: payload.issuer ?? null,
    type: "image",
  } satisfies MeveImagePayload);

  if (isPng(bytes)) {
    const out = insertPngITXt(bytes, PNG_IXT_KEYWORD, json);
    // IMPORTANT: fournir un ArrayBuffer standard à BlobPart
    return new Blob([toArrayBufferView(out)], { type: "image/png" });
  }

  if (isJpeg(bytes)) {
    const base64 = utf8ToBase64(json);
    const out = insertJpegCOM(bytes, JPEG_COM_PREFIX + base64);
    return new Blob([toArrayBufferView(out)], { type: "image/jpeg" });
  }

  // format non géré → retourne d’origine
  return blobIn;
}

/** Lit un watermark invisible depuis PNG/JPEG. Renvoie l’objet MEVE ou null. */
export async function readInvisibleWatermarkImage(
  fileOrBlob: Blob
): Promise<MeveImagePayload | null> {
  const ab = await fileOrBlob.arrayBuffer();
  const bytes = new Uint8Array(ab);

  try {
    if (isPng(bytes)) {
      const txt = extractPngITXt(bytes, PNG_IXT_KEYWORD);
      if (!txt) return null;
      const obj = JSON.parse(txt);
      if (isMeveImagePayload(obj)) return obj;
      return null;
    }

    if (isJpeg(bytes)) {
      const txt = extractJpegCOM(bytes);
      if (!txt || !txt.startsWith(JPEG_COM_PREFIX)) return null;
      const base64 = txt.slice(JPEG_COM_PREFIX.length);
      const json = base64ToUtf8(base64);
      const obj = JSON.parse(json);
      if (isMeveImagePayload(obj)) return obj;
      return null;
    }
  } catch {
    /* ignore parse errors → null */
  }
  return null;
}

/* ──────────────────────────────────────────────────────────────
 * PNG helpers (iTXt)
 * ────────────────────────────────────────────────────────────── */

function isPng(b: Uint8Array) {
  if (b.length < 8) return false;
  const sig = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  for (let i = 0; i < sig.length; i++) if (b[i] !== sig[i]) return false;
  return true;
}

function insertPngITXt(src: Uint8Array, keyword: string, text: string): Uint8Array {
  if (!isPng(src)) return src;

  const type_iTXt = new Uint8Array([0x69, 0x54, 0x58, 0x74]); // "iTXt"
  const encoder = new TextEncoder();

  const key = encoder.encode(keyword);
  const nul = new Uint8Array([0]);
  const compFlag = new Uint8Array([0]);
  const compMethod = new Uint8Array([0]);
  const lang = new Uint8Array([0]);
  const translated = new Uint8Array([0]);
  const txt = encoder.encode(text);

  // iTXt data layout:
  // Keyword\0 CompressionFlag(0) CompressionMethod(0) LanguageTag\0 TranslatedKeyword\0 Text
  const data = concatU8(key, nul, compFlag, compMethod, lang, translated, txt);

  const lenBuf = new Uint8Array(4);
  writeU32BE(lenBuf, data.length);

  const crc = crc32(concatU8(type_iTXt, data));
  const crcBuf = new Uint8Array(4);
  writeU32BE(crcBuf, crc >>> 0);

  const chunk = concatU8(lenBuf, type_iTXt, data, crcBuf);

  // Insert before IEND
  const iendIndex = findPngChunk(src, "IEND");
  if (iendIndex < 0) return src;

  const before = src.subarray(0, iendIndex);
  const after = src.subarray(iendIndex);
  return concatU8(before, chunk, after);
}

function extractPngITXt(src: Uint8Array, keyword: string): string | null {
  if (!isPng(src)) return null;
  let off = 8; // skip signature

  while (off + 8 <= src.length) {
    const len = readU32BE(src, off);
    const t0 = src[off + 4],
      t1 = src[off + 5],
      t2 = src[off + 6],
      t3 = src[off + 7];
    const tStr = String.fromCharCode(t0, t1, t2, t3);
    const dataStart = off + 8;
    const dataEnd = dataStart + len;

    if (dataEnd + 4 > src.length) break; // corrupted

    if (tStr === "iTXt") {
      // Parse the iTXt fields
      const data = src.subarray(dataStart, dataEnd);
      // keyword\0 compFlag compMethod language\0 translated\0 text
      // Find first NUL = end of keyword
      let p = 0;
      const endKeyword = indexOfByte(data, 0x00, p);
      if (endKeyword < 0) continue;
      const kw = new TextDecoder().decode(data.subarray(p, endKeyword));
      p = endKeyword + 1;
      if (p + 2 > data.length) continue; // compFlag + compMethod
      const compFlag = data[p++];
      const compMethod = data[p++]; // eslint-disable-line @typescript-eslint/no-unused-vars
      // language tag (NUL-terminated)
      const endLang = indexOfByte(data, 0x00, p);
      if (endLang < 0) continue;
      // const lang = new TextDecoder().decode(data.subarray(p, endLang));
      p = endLang + 1;
      // translated keyword (NUL-terminated)
      const endTranslated = indexOfByte(data, 0x00, p);
      if (endTranslated < 0) continue;
      // const translated = new TextDecoder().decode(data.subarray(p, endTranslated));
      p = endTranslated + 1;

      if (kw === keyword && compFlag === 0) {
        const txt = new TextDecoder().decode(data.subarray(p));
        return txt;
      }
    }

    off += 12 + len; // len(4) + type(4) + data(len) + crc(4)
  }
  return null;
}

function findPngChunk(src: Uint8Array, type: string): number {
  let off = 8; // skip signature
  while (off + 8 <= src.length) {
    const len = readU32BE(src, off);
    const t0 = src[off + 4],
      t1 = src[off + 5],
      t2 = src[off + 6],
      t3 = src[off + 7];
    const tStr = String.fromCharCode(t0, t1, t2, t3);
    if (tStr === type) return off;
    off += 12 + len;
  }
  return -1;
}

/* ──────────────────────────────────────────────────────────────
 * JPEG helpers (COM)
 * ────────────────────────────────────────────────────────────── */

function isJpeg(b: Uint8Array) {
  return b.length >= 2 && b[0] === 0xff && b[1] === 0xd8;
}

/** Insère un segment COM immédiatement après SOI. */
function insertJpegCOM(src: Uint8Array, comment: string): Uint8Array {
  if (!isJpeg(src)) return src;
  const encoder = new TextEncoder();
  const comPayload = encoder.encode(comment);

  const segLen = comPayload.length + 2; // length includes its own 2 bytes
  if (segLen > 0xffff) throw new Error("MEVE comment too large for JPEG COM");

  const out = new Uint8Array(src.length + 2 + 2 + comPayload.length);
  let p = 0;

  // SOI
  out[p++] = src[0];
  out[p++] = src[1];

  // COM
  out[p++] = 0xff;
  out[p++] = 0xfe; // COM marker
  out[p++] = (segLen >> 8) & 0xff;
  out[p++] = segLen & 0xff;
  out.set(comPayload, p);
  p += comPayload.length;

  // rest
  out.set(src.subarray(2), p);
  return out;
}

/** Extrait le PREMier COM rencontré (chaîne), sinon null. */
function extractJpegCOM(src: Uint8Array): string | null {
  if (!isJpeg(src)) return null;
  let p = 2; // after SOI

  while (p + 4 <= src.length) {
    if (src[p] !== 0xff) {
      // pas un marqueur => fin ou corruption
      return null;
    }

    const marker = src[p + 1];
    p += 2;

    if (marker === 0xd9) {
      // EOI
      return null;
    }

    if (marker === 0xda) {
      // SOS: les données d'image suivent, on s'arrête
      return null;
    }

    if (marker === 0xfe) {
      // COM
      if (p + 2 > src.length) return null;
      const len = (src[p] << 8) | src[p + 1];
      p += 2;
      if (len < 2 || p + (len - 2) > src.length) return null;
      const data = src.subarray(p, p + (len - 2));
      try {
        const txt = new TextDecoder().decode(data);
        return txt;
      } catch {
        return null;
      }
    } else {
      // Segment générique (APPx, DQT, DHT, etc.)
      if (p + 2 > src.length) return null;
      const len = (src[p] << 8) | src[p + 1];
      p += 2 + (len - 2);
    }
  }

  return null;
}

/* ──────────────────────────────────────────────────────────────
 * Utils
 * ────────────────────────────────────────────────────────────── */

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

function indexOfByte(buf: Uint8Array, value: number, from = 0): number {
  for (let i = from; i < buf.length; i++) if (buf[i] === value) return i;
  return -1;
}

function utf8ToBase64(s: string): string {
  const enc = new TextEncoder().encode(s);
  let bin = "";
  for (let i = 0; i < enc.length; i++) bin += String.fromCharCode(enc[i]);
  return btoa(bin);
}
function base64ToUtf8(b64: string): string {
  const bin = atob(b64);
  const u8 = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(u8);
}

/** Convertit un Uint8Array en ArrayBuffer “propre” (jamais SharedArrayBuffer). */
function toArrayBufferView(u8: Uint8Array): ArrayBuffer {
  const ab = new ArrayBuffer(u8.byteLength);
  new Uint8Array(ab).set(u8);
  return ab;
}

/* ──────────────────────────────────────────────────────────────
 * Type guard
 * ────────────────────────────────────────────────────────────── */

function isMeveImagePayload(v: any): v is MeveImagePayload {
  return (
    v &&
    v.meve === 1 &&
    v.type === "image" &&
    typeof v.hash === "string" &&
    typeof v.ts === "string" &&
    (typeof v.issuer === "string" || v.issuer === null || typeof v.issuer === "undefined")
  );
}
