// lib/watermark-pdf.ts
import { PDFDocument, rgb, degrees } from "pdf-lib";

/**
 * Ajoute un filigrane discret en bas-droite sur CHAQUE page d'un PDF.
 * - badge ".MEVE CERTIFIED"
 * - texte DigitalMeve (semi-transparent)
 */
export async function addMeveWatermarkToPdf(pdfBlob: Blob): Promise<Blob> {
  const srcBytes = new Uint8Array(await pdfBlob.arrayBuffer());
  const pdfDoc = await PDFDocument.load(srcBytes, { ignoreEncryption: true });

  const pages = pdfDoc.getPages();
  for (const page of pages) {
    const { width, height } = page.getSize();

    // Ruban bas-droite
    const ribbonW = 170;
    const ribbonH = 28;
    const pad = 16;

    // Fond ruban (dégradé simulé par deux rectangles)
    page.drawRectangle({
      x: width - ribbonW - pad,
      y: pad,
      width: ribbonW,
      height: ribbonH,
      color: rgb(0.06, 0.10, 0.20), // slate-900 approx
      opacity: 0.78,
      borderColor: rgb(0.9, 0.9, 0.9),
      borderWidth: 0.2,
    });

    // Texte ruban
    page.drawText(".MEVE CERTIFIED", {
      x: width - ribbonW - pad + 12,
      y: pad + 8,
      size: 10,
      color: rgb(0.70, 0.95, 0.90), // vert clair
    });

    // Surlignage discret (ligne accent)
    page.drawRectangle({
      x: width - ribbonW - pad,
      y: pad + ribbonH - 3,
      width: ribbonW,
      height: 2,
      color: rgb(0.30, 0.85, 0.95), // cyan
      opacity: 0.6,
    });

    // “DigitalMeve” en filigrane très léger sur le coin
    const wm = "DigitalMeve";
    page.drawText(wm, {
      x: width - ribbonW - pad + 10,
      y: pad + ribbonH + 6,
      size: 12,
      color: rgb(0.8, 0.95, 0.95),
      opacity: 0.14,
      rotate: degrees(0),
    });
  }

  const bytes = await pdfDoc.save();
  // Important: utiliser bytes.buffer pour satisfaire le typage BlobPart en Node/Edge
  return new Blob([bytes.buffer], { type: "application/pdf" });
}
