// lib/wm/image.ts (extrait à AJOUTER si absent)

// --- LECTURE du watermark invisible image (PNG iTXt "meve" / JPEG COM "MEVE:<b64>") ---
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
    if (!payload) return null;
    if (!payload.startsWith("MEVE:")) return null;
    try {
      const b64 = payload.slice(5);
      const json = base64ToUtf8(b64);
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

// Helpers lecture PNG iTXt
function readPngITXt(src: Uint8Array, keyword: string): string | null {
  if (!isPng(src)) return null;
  let off = 8; // skip signature
  while (off + 8 <= src.length) {
    const len = readU32BE(src, off);
    const t0 = src[off + 4], t1 = src[off + 5], t2 = src[off + 6], t3 = src[off + 7];
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
        // compressionFlag
        const compFlag = data[i++] || 0;
        // compressionMethod (ignored)
        i++;
        // lang (NUL-terminated)
        while (i < data.length && data[i] !== nul) i++;
        i++;
        // translated (NUL-terminated)
        while (i < data.length && data[i] !== nul) i++;
        i++;
        // text
        const textBytes = data.subarray(i);
        if (compFlag === 0) {
          return new TextDecoder().decode(textBytes);
        } else {
          // (on n’utilise pas de compression pour MEVE)
          return null;
        }
      }
    }
    off += 12 + len;
  }
  return null;
}

// Helpers lecture JPEG COM
function readJpegCOM(src: Uint8Array): string | null {
  if (!isJpeg(src)) return null;
  let i = 2; // après SOI
  while (i + 4 <= src.length) {
    if (src[i] !== 0xff) { i++; continue; }
    const marker = src[i + 1];
    // marqueur COM = 0xFE
    if (marker === 0xfe && i + 4 <= src.length) {
      const len = (src[i + 2] << 8) | src[i + 3];
      const start = i + 4;
      const end = start + len - 2;
      if (end <= src.length) {
        const payload = new TextDecoder().decode(src.subarray(start, end));
        return payload || null;
      } else {
        return null;
      }
    } else if (marker === 0xda) {
      // SOS → fin des segments, stop
      break;
    } else {
      // autres segments : sauter
      const len = (src[i + 2] << 8) | src[i + 3];
      i += 2 + len;
    }
  }
  return null;
}

function base64ToUtf8(b64: string): string {
  const bin = atob(b64.replace(/-/g, "+").replace(/_/g, "/"));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(out);
}
