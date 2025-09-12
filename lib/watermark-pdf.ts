// /lib/watermark-pdf.ts
// Ajoute un filigrane visible "DigitalMeve" + un marqueur invisible MEVE
// Retourne un ArrayBuffer (PDF final)

import { PDFDocument, rgb, StandardFonts, degrees } from "pdf-lib";

// Encodage Base64URL minimal (sans padding)
function toBase64Url(u8: Uint8Array): string {
  let b64 = typeof btoa !== "undefined"
    ? btoa(String.fromCharCode(...u8))
    : Buffer.from(u8).toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function utf8(s: string): Uint8Array {
  return new TextEncoder().encode(s);
}

function insertCommentBeforeEOF(pdfBytes: Uint8Array, commentLine: string): Uint8Array {
  // On insère avant %%EOF (séquence finale PDF)
  const eof = utf8("%%EOF");
  const idx = (() => {
    for (let i = pdfBytes.length - eof.length; i >= 0; i--) {
      let ok = true;
      for (let j = 0; j < eof.length; j++) {
        if (pdfBytes[i + j] !== eof[j]) { ok = false; break; }
      }
      if (ok) return i;
    }
    return -1;
  })();

  const lineBytes = utf8(`\n%${commentLine}\n`);
  if (idx < 0) {
    // Pas trouvé (rare) → on append quand même
    const out = new Uint8Array(pdfBytes.length + lineBytes.length);
    out.set(pdfBytes, 0);
    out.set(lineBytes, pdfBytes.length);
    return out;
  }

  const out = new Uint8Array(pdfBytes.length + lineBytes.length);
  out.set(pdfBytes.subarray(0, idx), 0);
  out.set(lineBytes, idx);
  out.set(pdfBytes.subarray(idx), idx + lineBytes.length);
  return out;
}

export type MeveInvisiblePayload = {
  v: 1;
  alg: "sha-256";
  hash: string;          // 64 hex
  ts: string;            // ISO8601
  issuer?: string;       // email/issuer
};

// API principale : on garde la signature simple + options
export async function addWatermarkPdf(
  file: Blob,
  opts?: {
    visibleText?: string;           // défaut: "DigitalMeve"
    invisiblePayload?: MeveInvisiblePayload;
    opacity?: number;               // défaut: 0.08
    scale?: number;                 // défaut: 0.75
    position?: "center" | "top-left" | "bottom-right";
  }
): Promise<ArrayBuffer> {
  const {
    visibleText = "DigitalMeve",
    invisiblePayload,
    opacity = 0.08,
    scale = 0.75,
    position = "center",
  } = opts || {};

  const src = new Uint8Array(await file.arrayBuffer());
  const pdfDoc = await PDFDocument.load(src);
  const pages = pdfDoc.getPages();

  // Police standard (fallback propre)
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Dépose un watermark très léger sur chaque page
  for (const p of pages) {
    const { width, height } = p.getSize();
    const textSize = Math.min(width, height) * 0.06 * scale;
    const text = visibleText;

    // Coordonnées selon position
    let x = width / 2;
    let y = height / 2;
    if (position === "top-left") {
      x = width * 0.08;
      y = height * 0.9;
    } else if (position === "bottom-right") {
      x = width * 0.92;
      y = height * 0.08;
    }

    p.drawText(text, {
      x: x - (font.widthOfTextAtSize(text, textSize) / 2),
      y: y - textSize / 2,
      size: textSize,
      font,
      color: rgb(0, 0, 0),
      opacity,
      rotate: position === "center" ? degrees(30) : undefined,
    });
  }

  // Sauvegarde PDF (sans ligne invisible pour le moment)
  const bytes = await pdfDoc.save(); // Uint8Array

  // Si pas de payload, on renvoie tel quel
  if (!invisiblePayload) {
    const copy = bytes.slice(0);     // ← force un vrai ArrayBuffer
    return copy.buffer;
  }

  // Construit le marqueur invisible MEVE
  const json = JSON.stringify(invisiblePayload);
  const marker = `MEVE|v1|${toBase64Url(utf8(json))}`;

  // Insère en commentaire PDF (invisible) juste avant %%EOF
  const withMarker = insertCommentBeforeEOF(bytes, marker);

  const copyMarked = withMarker.slice(0); // ← idem, buffer propre garanti
  return copyMarked.buffer;
}
