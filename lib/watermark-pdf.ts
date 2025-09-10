// lib/watermark-pdf.ts
import { PDFDocument, rgb } from "pdf-lib";

export async function watermarkPdf(original: File): Promise<Blob> {
  const src = await original.arrayBuffer();
  const pdfDoc = await PDFDocument.load(src);
  const pages = pdfDoc.getPages();

  for (const page of pages) {
    const { width, height } = page.getSize();
    const margin = Math.max(12, Math.round(Math.min(width, height) * 0.02));
    const text = ".MEVE • DigitalMeve.com";
    const fontSize = Math.max(10, Math.round(width * 0.02));
    page.drawText(text, {
      x: width - margin - text.length * (fontSize * 0.55),
      y: margin,
      size: fontSize,
      color: rgb(0.64, 0.97, 0.46), // vert clair approx
      opacity: 0.9,
    });
  }

  const bytes = await pdfDoc.save();
  return new Blob([bytes], { type: "application/pdf" });
}
