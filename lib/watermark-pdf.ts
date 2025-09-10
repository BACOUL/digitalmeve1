// lib/watermark-client.ts
// ✅ UTILISATION NAVIGATEUR UNIQUEMENT (pas côté server/edge)
// Ajoute un filigrane discret sur PDF (toutes pages) et sur PNG/JPG.

export async function addPdfWatermark(input: Blob, text = "DigitalMeve") {
  // Import dynamique pour éviter que Next l’analyse côté serveur
  const { PDFDocument, rgb, degrees, StandardFonts } = await import("pdf-lib");

  const buf = await input.arrayBuffer();
  const pdfDoc = await PDFDocument.load(buf);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const color = rgb(0.6, 0.9, 0.8); // vert/bleu doux
  const size = 18;                  // assez discret
  const opacity = 0.22;             // subtil mais visible

  const pages = pdfDoc.getPages();
  for (const p of pages) {
    const { width, height } = p.getSize();
    // bande diagonale
    p.drawText(text, {
      x: width * 0.08,
      y: height * 0.08,
      rotate: degrees(315),
      size,
      font,
      color,
      opacity,
    });
    // coin bas-droit
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

  const bytes = await pdfDoc.save();               // Uint8Array
  // ⭐️ Conversion sûre en Blob (navigateur)
  return new Blob([bytes], { type: "application/pdf" });
}

export async function addImageWatermark(input: Blob, text = "DigitalMeve") {
  // Gère PNG/JPG
  const imgBitmap = await createImageBitmap(input);
  const canvas = document.createElement("canvas");
  canvas.width = imgBitmap.width;
  canvas.height = imgBitmap.height;
  const ctx = canvas.getContext("2d")!;

  // image d’origine
  ctx.drawImage(imgBitmap, 0, 0);

  // style watermark
  const fontSize = Math.max(12, Math.floor(Math.min(canvas.width, canvas.height) * 0.035));
  ctx.font = `${fontSize}px ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial`;
  ctx.fillStyle = "rgba(56,189,248,0.28)"; // sky-400 ~
  ctx.rotate((-45 * Math.PI) / 180);
  // texte diagonal au centre
  ctx.fillText(text, -canvas.height * 0.4, canvas.width * 0.45);

  // petit label coin bas-droit
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.font = `${Math.round(fontSize * 0.7)}px ui-sans-serif, system-ui`;
  ctx.fillStyle = "rgba(16,185,129,0.55)"; // emerald-400 ~
  const label = "· meve";
  const metrics = ctx.measureText(label);
  ctx.fillText(label, canvas.width - metrics.width - 12, canvas.height - 12);

  // même type de sortie que l’entrée si possible
  const type = /png/i.test((input as any).type) ? "image/png" : "image/jpeg";
  const blob = await new Promise<Blob>((res) => canvas.toBlob((b) => res(b!), type, 0.95));
  return blob;
}
