// lib/watermark-pdf.ts
// Client-side PDF watermarking with pdf-lib
// Make sure this file is only imported from client components.

export async function addPdfWatermark(input: Blob, text = "DigitalMeve") {
  const { PDFDocument, rgb, degrees, StandardFonts } = await import("pdf-lib");

  const buf = await input.arrayBuffer();
  const pdfDoc = await PDFDocument.load(buf);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const color = rgb(0.6, 0.9, 0.8);
  const size = 18;
  const opacity = 0.22;

  const pages = pdfDoc.getPages();
  for (const p of pages) {
    const { width, height } = p.getSize();

    // diagonal ribbon
    p.drawText(text, {
      x: width * 0.08,
      y: height * 0.08,
      rotate: degrees(315),
      size,
      font,
      color,
      opacity,
    });

    // small corner label
    const label = "· meve";
    const w2 = font.widthOfTextAtSize(label, 12);
    p.drawText(label, {
      x: width - w2 - 16,
      y: 12,
      size: 12,
      font,
      color,
      opacity: 0.35,
    });
  }

  const bytes = await pdfDoc.save(); // Uint8Array

  // ✅ Convert to an ArrayBuffer slice that Blob accepts under Node/Edge typings
  const ab = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
  return new Blob([ab], { type: "application/pdf" });
}
