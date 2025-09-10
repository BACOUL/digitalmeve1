// lib/watermark.ts
export async function watermarkImage(file: File): Promise<Blob> {
  const img = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);

  const margin = Math.max(12, Math.round(Math.min(img.width, img.height) * 0.015));
  const text = ".MEVE • DigitalMeve.com";
  ctx.font = `bold ${Math.max(12, Math.round(canvas.width * 0.02))}px ui-sans-serif, system-ui, -apple-system`;
  ctx.textBaseline = "bottom";
  ctx.textAlign = "right";

  // halo sombre puis texte clair pour lisibilité
  const x = canvas.width - margin;
  const y = canvas.height - margin;

  ctx.fillStyle = "rgba(2,6,23,0.35)"; // slate-950 alpha
  ctx.fillText(text, x + 1, y + 1);

  ctx.fillStyle = "rgba(203, 248, 118, 0.9)"; // vert clair mix (cohérent thème)
  ctx.fillText(text, x, y);

  const type = file.type.includes("jpeg") ? "image/jpeg" : "image/png";
  const quality = file.type.includes("jpeg") ? 0.92 : undefined;
  return await new Promise<Blob>((resolve) => {
    canvas.toBlob((b) => resolve(b!), type, quality as any);
  });
}
