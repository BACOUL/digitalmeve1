// lib/watermark-pdf.ts
// Usage côté client uniquement
import { PDFDocument, rgb, degrees } from "pdf-lib";

/**
 * Filigrane discret sur chaque page du PDF.
 * Renvoie un nouveau File prêt à être envoyé au backend (même nom, même type).
 */
export async function watermarkPdfFile(input: File, text = "DigitalMeve"): Promise<File> {
  if (input.type !== "application/pdf") return input;

  const ab = await input.arrayBuffer();
  const pdfDoc = await PDFDocument.load(ab, { ignoreEncryption: true });

  const pages = pdfDoc.getPages();
  for (const page of pages) {
    const { width, height } = page.getSize();

    // watermark en bas-droit, petite opacité
    page.drawText(text, {
      x: width - 180,
      y: 20,
      size: 10,
      color: rgb(0.6, 0.9, 0.9),
      opacity: 0.45,
      rotate: degrees(0),
    });
  }

  const bytes = await pdfDoc.save(); // Uint8Array
  // On garde le même nom & type pour que l’API renvoie name.meve.pdf
  return new File([bytes], input.name, { type: "application/pdf" });
}
