// lib/watermark-pdf.ts
// Applique un filigrane "DigitalMeve" aux PDFs (détection robuste + typage sûr pour le build).
// Fonctionne uniquement côté client (utilise pdf-lib dans le navigateur).

import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";

/**
 * Petite détection “sniff” pour s’assurer qu’on traite bien un PDF,
 * même si le Content-Type est générique (octet-stream).
 */
async function looksLikePdf(blob: Blob): Promise<boolean> {
  if (!blob || blob.size < 5) return false;
  try {
    const head = await blob.slice(0, 5).text(); // "%PDF-"
    return head.startsWith("%PDF-");
  } catch {
    return false;
  }
}

/**
 * Ajoute un filigrane discret et lisible sur chaque page du PDF.
 * - Diagonal, semi-transparent
 * - Centré, taille proportionnelle
 */
export async function addPdfWatermark(input: Blob, text = "DigitalMeve"): Promise<Blob> {
  // Si ce n’est pas un PDF, on rend tel quel (évite toute corruption)
  const isPdf = await looksLikePdf(input);
  if (!isPdf) return input;

  try {
    // Charge le PDF
    const src = await input.arrayBuffer();
    const pdfDoc = await PDFDocument.load(src, { ignoreEncryption: true });

    // Police standard, évite d’embarquer une police lourde
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const pages = pdfDoc.getPages();
    for (const page of pages) {
      const { width, height } = page.getSize();

      // Taille et style volontairement discrets mais visibles
      const fontSize = Math.min(width, height) * 0.07; // ~7% de la dimension
      const opacity = 0.18;

      const textWidth = font.widthOfTextAtSize(text, fontSize);
      const textHeight = font.heightAtSize(fontSize);

      // Position centrée (puis rotation)
      const x = (width - textWidth) / 2;
      const y = (height - textHeight) / 2;

      // Couleur douce (cyan) + rotation
      page.drawText(text, {
        x,
        y,
        size: fontSize,
        font,
        color: rgb(0.24, 0.85, 0.88),
        rotate: degrees(-32),
        opacity,
      });

      // Petit rappel en bas à droite, plus petit
      const cornerSize = Math.max(10, fontSize * 0.32);
      const cw = font.widthOfTextAtSize(text, cornerSize);
      const ch = font.heightAtSize(cornerSize);
      page.drawText(text, {
        x: width - cw - 18,
        y: 14,
        size: cornerSize,
        font,
        color: rgb(0.24, 0.85, 0.88),
        opacity: 0.22,
      });
    }

    // Sauvegarde
    const bytes = await pdfDoc.save(); // Uint8Array

    // ✅ Typage compatible build Vercel (Node typings stricts) :
    // on passe un ArrayBuffer “propre” au Blob au lieu d’un Uint8Array direct.
    const ab = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;

    return new Blob([ab], { type: "application/pdf" });
  } catch {
    // En cas d’échec (PDF protégé, corrompu, etc.) → ne bloque pas
    return input;
  }
}
