// lib/watermark-pdf.ts
// Filigrane client-side pour PDF via pdf-lib

export async function addPdfWatermark(input: Blob, text = "DigitalMeve"): Promise<Blob> {
  // Chargement dynamique pour éviter de gonfler le bundle serveur
  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");

  const srcAb = await input.arrayBuffer();
  const pdfDoc = await PDFDocument.load(srcAb, {
    ignoreEncryption: true,
    updateMetadata: false,
  });

  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontSize = 11;
  const color = rgb(0.70, 0.93, 0.83); // vert doux
  const opacity = 0.45;
  const margin = 14;

  for (const page of pdfDoc.getPages()) {
    const { width, height } = page.getSize();
    const label = text;
    const tw = font.widthOfTextAtSize(label, fontSize);
    const th = font.heightAtSize(fontSize);

    const x = Math.max(margin, width - tw - margin);
    const y = Math.max(margin, margin + th * 0.2);

    page.drawText(label, { x, y, size: fontSize, font, color, opacity });
  }

  const bytes = await pdfDoc.save(); // Uint8Array
  // Conversion sûre -> ArrayBuffer pour satisfaire TS/navigateur/Edge
  const ab = (bytes.buffer as ArrayBuffer).slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
  return new Blob([ab], { type: "application/pdf" });
}
