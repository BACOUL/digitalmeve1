// lib/wm/image.ts
// Invisible watermark for images (PNG/JPG) — browser-only, no deps.

type ImgKind = "png" | "jpg" | "jpeg";

/* ============================================================
 *  EMBED (invisible)
 *  - PNG  : iTXt "meve" (JSON)
 *  - JPEG : COM "MEVE:<base64(json)>"
 * ============================================================ */
export async function embedInvisibleWatermarkImage(
  blobIn: Blob,
  payload: { hash: string; ts: string; issuer?: string; kind: ImgKind }
): Promise<Blob> {
  const ab = await blobIn.arrayBuffer();
  const bytes = new Uint8Array(ab);

  if (isPng(bytes)) {
    const json = JSON.stringify({
      meve: 1,
      hash: payload.hash,
      ts: payload.ts,
      issuer: payload.issuer ?? null,
      type: "image",
    });
    const out = insertPngITXt(bytes, "meve", json);
    // ⚠️ Blob n'accepte pas toujours directement Uint8Array typée → on passe un ArrayBuffer propre
    return new Blob([toArrayBufferView(out)], { type: "image/png" });
  }

  if (isJpeg(bytes)) {
    const json = JSON.stringify({
      meve: 1,
      hash: payload.hash,
      ts: payload.ts,
      issuer: payload.issuer ?? null,
      type: "image",
    });
    const b64 = utf8ToBase64(json);
    const out = insertJpegCOM(bytes, `MEVE:${b64}`);
    return new Blob([toArrayBufferView(out)], { type: "image/jpeg" });
  }

  // format non géré ici → retourne d’origine
  return blobIn;
}

/* ============================================================
 *  READ (invisible)
 *  - PNG  : lire iTXt "meve"
 *  - JPEG : lire COM et décoder "MEVE:<base64(json)>"
 * ============================================================ */
export async function readInvisibleWatermarkImage(
  blobIn: Blob
): Promise<{ hash?: string; ts?: string; issuer?: string } | null> {
  const ab = await blobIn.arrayBuffer();
  const bytes = new Uint8Array(ab);

  if (isPng(bytes)) {
    const txt = readPngITXt(bytes, "meve");
    if (!txt) return null;
    try {
      const obj = JSON.parse(txt);
      return {
        hash: obj?.hash ?? obj?.sha256,
        ts: obj?.ts ?? obj?.timestamp ?? obj?.created_at,
        issuer: obj?.issuer ?? obj?.issuerEmail,
      };
    } catch {
      return null;
    }
  }

  if (isJpeg(bytes)) {
    const payload = readJpegCOM(bytes);
    if (!payload || !payload.startsWith("MEVE:")) return null;
    try {
      const json = base64ToUtf8(payload.slice(5));
      const obj = JSON.parse(json);
      return {
        hash: obj?.hash ?? obj?.sha256,
        ts: obj?.ts ?? obj?.timestamp ?? obj?.created_at,
        issuer: obj?.issuer ?? obj?.issuerEmail,
      };
    } catch {
      return null;
    }
  }

  return null;
}

/* ================= JPEG helpers ================= */
function isJpeg(b: Uint8Array) {
  return b.length >= 2 && b[0] === 0xff && b[1] === 0xd8;
}

function insertJpegCOM(src: Uint8Array, comment: string): Uint8Array {
  if (!isJpeg(src)) return src;
  const encoder = new TextEncoder();
  const comPayload = encoder.encode(comment);
  const segLen = comPayload.length + 2; // includes length field
  if (segLen > 0xffff) throw new Error("MEVE comment too large for JPEG COM");

  const out = new Uint8Array(src.length + 2 + 2 + comPayload.length);
  let p = 0;

  // SOI
  out[p++] = src[0];
  out[p++] = src[1];

  // COM
  out[p++] = 0xff;
  out[p++] = 0xfe;
  out[p++] = (segLen >> 8) & 0xff;
  out[p++] = segLen & 0xff;
  out.set(comPayload, p);
  p += comPayload.length;

  // reste
  out.set(src.subarray(2), p);
  return out;
}

function readJpegCOM(src: Uint8Array): string | null {
  if (!isJpeg(src)) return null;
  let i = 2; // après SOI
  while (i + 4 <= src.length) {
    if (src[i] !== 0xff) {
      i++;
      continue;
    }
    const marker = src[i + 1];

    if (marker === 0xfe) {
      const len = (src[i + 2] << 8) | src[i + 3];
      const start = i + 4;
      const end = start + len - 2;
      if (end <= src.length) {
        return new TextDecoder().decode(src.subarray(start, end)) || null;
      }
      return null;
    } else if (marker === 0xda) {
      // SOS → fin des segments
      break;
    } else {
      const len = (src[i + 2] << 8) | src[i + 3];
      i += 2 + len;
    }
  }
  return null;
}

/* ================= PNG helpers ================= */
function isPng(b: Uint8Array) {
  if (b.length < 8) return false;
  const sig = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
  for (let i = 0; i < sig.length; i++) if (b[i] !== sig[i]) return false;
  return true;
}

function insertPngITXt(src: Uint8Array, keyword: string, text: string): Uint8Array {
  if (!isPng(src)) return src;

  const type_iTXt = [0x69, 0x54, 0x58, 0x74]; // "iTXt"
  const encoder = new TextEncoder();

  const key = encoder.encode(keyword);
  const compFlag = new Uint8Array([0]);
  const compMethod = new Uint8Array([0]);
  const lang = new Uint8Array([0]);
  const translated = new Uint8Array([0]);
  const nul = new Uint8Array([0]);
  const txt = encoder.encode(text);

  const data = concatU8(key, nul, compFlag, compMethod, lang, translated, txt);

  const lenBuf = new Uint8Array(4);
  writeU32BE(lenBuf, data.length);

  const typeBuf = new Uint8Array(type_iTXt);
  const crc = crc32(concatU8(typeBuf, data));
  const crcBuf = new Uint8Array(4);
  writeU32BE(crcBuf, crc >>> 0);

  const chunk = concatU8(lenBuf, typeBuf, data, crcBuf);

  // insérer avant IEND
  const iendIndex = findPngChunk(src, "IEND");
  if (iendIndex < 0) return src;

  const before = src.subarray(0, iendIndex);
  const after = src.subarray(iendIndex);
  return concatU8(before, chunk, after);
}

function readPngITXt(src: Uint8Array, keyword: string): string | null {
  if (!isPng(src)) return null;
  let off = 8; // skip signature
  while (off + 8 <= src.length) {
    const len = readU32BE(src, off);
    const t0 = src[off + 4],
      t1 = src[off + 5],
      t2 = src[off + 6],
      t3 = src[off + 7];
    const type = String.fromCharCode(t0, t1, t2, t3);

    if (type === "iTXt") {
      const dataStart = off + 8;
      const dataEnd = dataStart + len;
      const data = src.subarray(dataStart, dataEnd);
      // Format iTXt: keyword\0 compressionFlag(1)\0 compressionMethod(1)\0 lang\0 translated\0 text
      const nul = 0;
      let i = 0;

      // keyword
      while (i < data.length && data[i] !== nul) i++;
      const kw = new TextDecoder().decode(data.subarray(0, i));
      if (kw === keyword) {
        i++; // skip NUL
        const compFlag = data[i++] || 0;
        i++; // compMethod (ignored)
        // lang
        while (i < data.length && data[i] !== nul) i++;
        i++;
        // translated
        while (i < data.length && data[i] !== nul) i++;
        i++;
        // text
        const textBytes = data.subarray(i);
        if (compFlag === 0) {
          return new TextDecoder().decode(textBytes);
        }
        return null; // (pas de compression utilisée pour MEVE)
      }
    }
    off += 12 + len; // len + type + data + crc
  }
  return null;
}

function findPngChunk(src: Uint8Array, type: string): number {
  let off = 8; // après signature
  while (off + 8 <= src.length) {
    const len = readU32BE(src, off);
    const t0 = src[off + 4],
      t1 = src[off + 5],
      t2 = src[off + 6],
      t3 = src[off + 7];
    const tStr = String.fromCharCode(t0, t1, t2, t3);
    if (tStr === type) return off;
    off += 12 + len; // len + type + data + crc
  }
  return -1;
}

/* ================= utils ================= */
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
function utf8ToBase64(s: string): string {
  const enc = new TextEncoder().encode(s);
  let bin = "";
  for (let i = 0; i < enc.length; i++) bin += String.fromCharCode(enc[i]);
  return btoa(bin);
}
function base64ToUtf8(b64: string): string {
  const bin = atob(b64.replace(/-/g, "+").replace(/_/g, "/"));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(out);
}
/** Convertit un Uint8Array en ArrayBuffer propre (sans SharedArrayBuffer) */
function toArrayBufferView(u8: Uint8Array): ArrayBuffer {
  // slice pour garantir un ArrayBuffer standard compatible BlobPart
  return u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength);
                             }
