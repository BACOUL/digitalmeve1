// lib/watermark-pdf.ts
import { PDFDocument, rgb, degrees } from "pdf-lib";

/**
 * Ajoute un filigrane "DigitalMeve" dans un PDF.
 * @param input Blob du PDF d’origine
 * @returns Blob du PDF avec filigrane
 */
export async function addWatermark(input: Blob): Promise<Blob> {
  // Charge le PDF d’entrée
  const arrayBuffer = await input.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);

  // Parcourt toutes les pages et applique le filigrane
  const pages = pdfDoc.getPages();
  for (const page of pages) {
    const { width, height } = page.getSize();

    page.drawText("DigitalMeve", {
      x: width - 160,
      y: 30,
      size: 18,
      color: rgb(0.2, 0.8, 0.7), // vert/bleu signature
      rotate: degrees(-15),
      opacity: 0.6,
    });
  }

  // Sauvegarde en Uint8Array
  const bytes = await pdfDoc.save();

  // ✅ Convertit en ArrayBuffer pur pour éviter Node/Edge typing issues
  const ab = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);

  // ✅ Crée le Blob PDF final
  return new Blob([ab], { type: "application/pdf" });
}
