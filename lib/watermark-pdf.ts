// lib/watermark-pdf.ts
import { PDFDocument, rgb, degrees } from "pdf-lib";

/**
 * Ajoute un filigrane diagonal visible "DigitalMeve" sur chaque page.
 * Retourne un File PDF (même nom, type application/pdf).
 */
export async function watermarkPdfFile(input: File, text = "DigitalMeve"): Promise<File> {
  if (input.type !== "application/pdf") return input;

  const ab = await input.arrayBuffer();
  const pdfDoc = await PDFDocument.load(ab);

  const pages = pdfDoc.getPages();
  for (const p of pages) {
    const { width, height } = p.getSize();

    // Bande transparente au centre pour assurer la lisibilité
    const bandH = Math.max(80, height * 0.18);
    p.drawRectangle({
      x: 0,
      y: height / 2 - bandH / 2,
      width,
      height: bandH,
      color: rgb(0, 0, 0),
      opacity: 0.12,
    });

    // Texte en grand, en diagonale
    const fontSize = Math.max(36, Math.min(96, Math.round(width * 0.09)));
    p.drawText(text, {
      x: width * 0.08,
      y: height * 0.42,
      size: fontSize,
      color: rgb(1, 1, 1),
      opacity: 0.85,
      rotate: degrees(-20),
    });
  }

  const bytes = await pdfDoc.save(); // Uint8Array
  // Fournir un ArrayBuffer "propre" au constructeur de File
  const base = bytes.buffer as ArrayBuffer;
  const cleanAB = base.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
  return new File([cleanAB], input.name, { type: "application/pdf" });
}
