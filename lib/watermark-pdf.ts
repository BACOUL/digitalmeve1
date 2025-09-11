// lib/watermark-pdf.ts
import { PDFDocument, rgb } from "pdf-lib";

/**
 * Ajoute un filigrane texte discret en bas à gauche de chaque page.
 * Retourne un **File** PDF tout neuf (même nom, type application/pdf).
 *
 * IMPORTANT: à appeler côté client (le fichier initial vient d’un <input type="file">).
 */
export async function watermarkPdfFile(input: File, text = "DigitalMeve"): Promise<File> {
  if (input.type !== "application/pdf") return input;

  const ab = await input.arrayBuffer();
  const pdfDoc = await PDFDocument.load(ab);

  const pages = pdfDoc.getPages();
  for (const p of pages) {
    const { width, height } = p.getSize();
    const fontSize = Math.max(10, Math.min(14, Math.round(width * 0.018)));
    const margin = Math.max(8, Math.round(width * 0.015));

    // Bande semi-transparente
    const bandHeight = fontSize + margin;
    p.drawRectangle({
      x: margin,
      y: margin,
      width: Math.min(260, width * 0.5),
      height: bandHeight,
      color: rgb(0, 0, 0),
      opacity: 0.25,
      borderOpacity: 0,
    });

    // Texte
    p.drawText(text, {
      x: margin + 8,
      y: margin + bandHeight / 2 - fontSize / 2,
      size: fontSize,
      color: rgb(1, 1, 1),
      opacity: 0.85,
    });
  }

  const bytes = await pdfDoc.save(); // Uint8Array

  // ✅ Fournir un ArrayBuffer “propre” en BlobPart (évite SharedArrayBuffer typings)
  const baseBuffer = bytes.buffer as ArrayBuffer;
  const cleanAB = baseBuffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);

  // ✅ Construire un File avec un BlobPart valide
  return new File([cleanAB], input.name, { type: "application/pdf" });
}
