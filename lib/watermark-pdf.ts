// lib/watermark-pdf.ts
// Ajout d’un filigrane sur un PDF côté client avec pdf-lib
// ⚠️ À importer uniquement depuis des composants client.

export async function addPdfWatermark(input: Blob, text = "DigitalMeve") {
  const { PDFDocument, rgb, degrees, StandardFonts } = await import("pdf-lib");

  // Charge le PDF d’entrée
  const buf = await input.arrayBuffer();
  const pdfDoc = await PDFDocument.load(buf);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Style du filigrane
  const color = rgb(0.6, 0.9, 0.8);
  const size = 18;
  const opacity = 0.22;

  // Ajoute le texte sur chaque page + petit label bas/droite
  const pages = pdfDoc.getPages();
  for (const p of pages) {
    const { width, height } = p.getSize();

    p.drawText(text, {
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
    p.drawText(label, {
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

  // ✅ Convertit en ArrayBuffer slice (évite les soucis de typage BlobPart sous Node/Edge)
  const ab = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);

  // ✅ Construit un Blob portable via Response, puis renvoie le Blob PDF
  const blob = await new Response(ab, {
    headers: { "Content-Type": "application/pdf" },
  }).blob();

  return blob;
}
