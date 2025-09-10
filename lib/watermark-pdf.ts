// lib/watermark-pdf.ts
import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";

export type WatermarkOptions = {
  text?: string;                 // texte du filigrane
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center" | "diagonal";
  opacity?: number;              // 0..1
  size?: number;                 // taille de police de base
  margin?: number;               // marge depuis les bords
  color?: { r: number; g: number; b: number }; // 0..1
  allPages?: boolean;            // true = toutes les pages, false = seulement la 1ère
};

/**
 * Ajoute un filigrane texte sur un PDF et retourne un Blob PDF.
 * Compatible Node 20/Edge (utilise Response(...).blob() pour éviter les soucis de types).
 */
export async function watermarkPdf(
  input: Blob,
  {
    text = "DigitalMeve",
    position = "bottom-right",
    opacity = 0.18,
    size = 14,
    margin = 16,
    color = { r: 0.059, g: 0.918, b: 0.776 }, // proche emerald/screen
    allPages = true,
  }: WatermarkOptions = {}
): Promise<Blob> {
  const buf = await input.arrayBuffer();
  const pdfDoc = await PDFDocument.load(buf);
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const pages = pdfDoc.getPages();
  const targetPages = allPages ? pages : [pages[0]];

  for (const page of targetPages) {
    const { width, height } = page.getSize();

    const textWidth = font.widthOfTextAtSize(text, size);
    const textHeight = font.heightAtSize(size);

    let x = margin;
    let y = height - textHeight - margin;
    let rotate = 0;

    switch (position) {
      case "top-left":
        x = margin;
        y = height - textHeight - margin;
        break;
      case "top-right":
        x = width - textWidth - margin;
        y = height - textHeight - margin;
        break;
      case "bottom-left":
        x = margin;
        y = margin;
        break;
      case "bottom-right":
        x = width - textWidth - margin;
        y = margin;
        break;
      case "center":
        x = (width - textWidth) / 2;
        y = (height - textHeight) / 2;
        break;
      case "diagonal":
        // diagonale douce au centre
        rotate = -35;
        x = (width - textWidth) / 2;
        y = (height - textHeight) / 2;
        break;
    }

    page.drawText(text, {
      x,
      y,
      size,
      font,
      color: rgb(color.r, color.g, color.b),
      opacity,
      rotate: rotate ? degrees(rotate) : undefined,
    });
  }

  const bytes = await pdfDoc.save(); // Uint8Array

  // ✅ évite les erreurs de typage BlobPart sous Node/Edge
  const blob = await new Response(bytes, {
    headers: { "Content-Type": "application/pdf" },
  }).blob();

  return blob;
}
