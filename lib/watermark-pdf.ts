// lib/watermark-pdf.ts
import { PDFDocument, rgb } from "pdf-lib";

/**
 * Ajoute un filigrane discret en bas à gauche de chaque page.
 * Retourne un File PDF (même nom, type application/pdf).
 */
export async function watermarkPdfFile(input: File, text = "DigitalMeve"): Promise<File> {
  if (input.type !== "application/pdf") return input;

  const ab = await input.arrayBuffer();
  const pdfDoc = await PDFDocument.load(ab);

  const pages = pdfDoc.getPages();
  for (const p of pages) {
    const { width } = p.getSize();
    const fontSize = Math.max(10, Math.min(14, Math.round(width * 0.018)));
    const margin = Math.max(8, Math.round(width * 0.015));

    const bandHeight = fontSize + margin;
    p.drawRectangle({
      x: margin,
      y: margin,
      width: Math.min(260, width * 0.5),
      height: bandHeight,
      color: rgb(0, 0, 0),
      opacity: 0.25,
    });

    p.drawText(text, {
      x: margin + 8,
      y: margin + bandHeight / 2 - fontSize / 2,
      size: fontSize,
      color: rgb(1, 1, 1),
      opacity: 0.85,
    });
  }

  const bytes = await pdfDoc.save(); // Uint8Array
  // ✅ fournir un ArrayBuffer "propre" au constructeur de File
  const base = bytes.buffer as ArrayBuffer;
  const cleanAB = base.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
  return new File([cleanAB], input.name, { type: "application/pdf" });
}
