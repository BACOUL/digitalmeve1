// lib/watermark-pdf.ts
import { PDFDocument, rgb, degrees } from "pdf-lib";

/**
 * Ajoute un filigrane "DigitalMeve" dans un PDF (toutes les pages).
 * @param input Blob (PDF d'origine)
 * @returns Blob (PDF filigrané)
 */
export async function addWatermark(input: Blob): Promise<Blob> {
  // 1) Charger le PDF source
  const sourceAb = await input.arrayBuffer();
  const pdfDoc = await PDFDocument.load(sourceAb);

  // 2) Appliquer le filigrane sur chaque page
  const pages = pdfDoc.getPages();
  for (const page of pages) {
    const { width, height } = page.getSize();

    page.drawText("DigitalMeve", {
      x: width - 160, // coin bas-droite
      y: 30,
      size: 18,
      color: rgb(0.2, 0.8, 0.7),
      rotate: degrees(-15),
      opacity: 0.6,
    });
  }

  // 3) Sauver → Uint8Array
  const bytes = await pdfDoc.save(); // Uint8Array

  // 4) ✅ Créer un ArrayBuffer “neuf” pour éviter toute union ArrayBuffer|SharedArrayBuffer
  const buf = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buf).set(bytes);

  // 5) Retourner un Blob PDF propre
  return new Blob([buf], { type: "application/pdf" });
}
