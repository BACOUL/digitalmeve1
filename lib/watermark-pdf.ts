// lib/watermark-pdf.ts
import { PDFDocument, rgb, degrees } from "pdf-lib";

type WatermarkOpts = {
  opacity?: number;   // 0..1
  size?: number;      // font size approx
  angleDeg?: number;  // angle in degrees
};

/**
 * Ajoute un filigrane texte simple sur chaque page d’un PDF.
 * Entrée: ArrayBuffer | Uint8Array | Blob
 * Sortie: Blob (application/pdf)
 */
export async function addWatermarkToPdf(
  input: ArrayBuffer | Uint8Array | Blob,
  text: string,
  opts: WatermarkOpts = {}
): Promise<Blob> {
  // Normalise l’entrée en ArrayBuffer
  const srcBuf = await toArrayBuffer(input);

  const pdfDoc = await PDFDocument.load(srcBuf);
  const pages = pdfDoc.getPages();

  const {
    opacity = 0.15,
    size = 42,
    angleDeg = -30,
  } = opts;

  for (const page of pages) {
    const { width, height } = page.getSize();

    // Position approximative: centre
    const textWidth = text.length * (size * 0.6); // estimation simple
    const x = (width - textWidth) / 2;
    const y = height / 2;

    page.drawText(text, {
      x,
      y,
      size,
      color: rgb(0.2, 0.8, 0.7), // vert/bleu harmonisé au site
      opacity,
      rotate: degrees(angleDeg),
    });
  }

  // pdf-lib renvoie un Uint8Array. On fabrique un ArrayBuffer net pour Blob.
  const bytes = await pdfDoc.save();
  const ab = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;

  return new Blob([ab], { type: "application/pdf" });
}

/** Helpers */
async function toArrayBuffer(input: ArrayBuffer | Uint8Array | Blob): Promise<ArrayBuffer> {
  if (input instanceof ArrayBuffer) return input;
  if (input instanceof Uint8Array) {
    // S’assure d’un ArrayBuffer propre (sans SharedArrayBuffer)
    return input.buffer.slice(input.byteOffset, input.byteOffset + input.byteLength) as ArrayBuffer;
  }
  // Blob → ArrayBuffer
  return await input.arrayBuffer();
                                }
