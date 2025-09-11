// lib/watermark-pdf.ts
import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";

/**
 * Applique un filigrane discret “DigitalMeve” en diagonale,
 * légèrement coloré (couleurs DigitalMeve) avec faible opacité.
 * Retourne un Blob PDF (même contenu, juste filigrané).
 */
export async function watermarkPdfFile(
  input: Blob,
  text = "DigitalMeve"
): Promise<Blob> {
  const ab = await input.arrayBuffer();
  const pdfDoc = await PDFDocument.load(ab);
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Couleurs DM : émeraude & bleu (on alterne légèrement)
  const emerald = rgb(52 / 255, 211 / 255, 153 / 255); // #34d399
  const blue    = rgb(96 / 255, 165 / 255, 250 / 255); // #60a5fa
  const opacity = 0.12; // “très léger”

  for (const page of pdfDoc.getPages()) {
    const { width, height } = page.getSize();

    // Taille texte en fonction de la largeur de page
    const size = Math.max(36, Math.min(64, width * 0.06));
    const textWidth = font.widthOfTextAtSize(text, size);
    const stepX = textWidth * 1.6;
    const stepY = size * 3;

    // Grille diagonale
    for (let y = -height; y < height * 1.5; y += stepY) {
      let toggle = 0;
      for (let x = -width; x < width * 1.5; x += stepX) {
        page.drawText(text, {
          x,
          y,
          size,
          font,
          rotate: degrees(-30),
          color: toggle % 2 === 0 ? emerald : blue,
          opacity,
        });
        toggle++;
      }
    }
  }

  const bytes = await pdfDoc.save(); // Uint8Array
  // conversion propre en ArrayBuffer pour satisfaire les typages lors du build
  const cleanAB = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
  return new Blob([cleanAB], { type: "application/pdf" });
}
