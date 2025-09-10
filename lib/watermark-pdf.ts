// lib/watermark-pdf.ts
// Ajoute un filigrane “DigitalMeve” sur chaque page PDF (client-side) avec pdf-lib.
// À importer uniquement depuis des composants client.

export async function addPdfWatermark(input: Blob, text = "DigitalMeve") {
  const { PDFDocument, rgb, degrees, StandardFonts } = await import("pdf-lib");

  // Charge le PDF source
  const buf = await input.arrayBuffer();
  const pdfDoc = await PDFDocument.load(buf);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Style du filigrane
  const color = rgb(0.6, 0.9, 0.8);
  const size = 18;
  const opacity = 0.22;

  // Applique le filigrane sur chaque page + un petit label en bas à droite
  for (const page of pdfDoc.getPages()) {
    const { width, height } = page.getSize();

    page.drawText(text, {
      x: width * 0.08,
      y: height * 0.08,
      rotate: degrees(315),
      size,
      font,
      color,
      opacity,
    });

    const label = "· meve";
    const w2 = font.widthOfTextAtSize(label, 12);
    page.drawText(label, {
      x: width - w2 - 16,
      y: 12,
      size: 12,
      font,
      color,
      opacity: 0.35,
    });
  }

  // Sauvegarde → Uint8Array
  const bytes = await pdfDoc.save(); // Uint8Array

  // ✅ Construit un Blob sans erreur de typage :
  //    on copie dans un nouveau Uint8Array (ArrayBufferView accepté par BlobPart)
  const out = new Uint8Array(bytes.length);
  out.set(bytes);

  return new Blob([out], { type: "application/pdf" });
}
