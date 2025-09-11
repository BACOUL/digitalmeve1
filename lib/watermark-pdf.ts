import { PDFDocument, StandardFonts, rgb, degrees } from "pdf-lib";

/**
 * Filigrane discret “DigitalMeve” (dégradé émeraude/bleu, faible opacité)
 * et renvoie un Blob PDF.
 */
export async function watermarkPdfFile(input: Blob, text = "DigitalMeve"): Promise<Blob> {
  const ab = await input.arrayBuffer();
  const pdfDoc = await PDFDocument.load(ab);
  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const emerald = rgb(52 / 255, 211 / 255, 153 / 255); // #34d399
  const blue    = rgb(96 / 255, 165 / 255, 250 / 255); // #60a5fa
  const opacity = 0.12;

  for (const page of pdfDoc.getPages()) {
    const { width, height } = page.getSize();
    const size = Math.max(36, Math.min(64, width * 0.06));
    const textWidth = font.widthOfTextAtSize(text, size);
    const stepX = textWidth * 1.6;
    const stepY = size * 3;

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

  // ✅ IMPORTANT : forcer le type en ArrayBuffer (sinon TS croit à SharedArrayBuffer)
  const cleanAB = bytes.buffer.slice(
    bytes.byteOffset,
    bytes.byteOffset + bytes.byteLength
  ) as ArrayBuffer;

  return new Blob([cleanAB], { type: "application/pdf" });
}
