// lib/watermark-image.ts
// Visual watermark for images (PNG/JPG) using Canvas — no deps, browser-only.

type VisualOpts = {
  text?: string;        // watermark text
  opacity?: number;     // 0..1
  scale?: number;       // relative text size vs width (e.g. 0.028)
  marginPx?: number;    // margin from edges
  repeat?: boolean;     // if true, paint faint diagonal repeats
};

export async function addWatermarkImage(
  file: File,
  opts: VisualOpts = {}
): Promise<ArrayBuffer> {
  const type = (file.type || "").toLowerCase();
  if (!/^image\/(png|jpe?g)$/.test(type)) {
    throw new Error("Unsupported image type (PNG/JPG only).");
  }

  const {
    text = ".MEVE proof",
    opacity = 0.18,
    scale = 0.028,
    marginPx = 16,
    repeat = false,
  } = opts;

  const url = URL.createObjectURL(file);
  try {
    const img = await loadImage(url);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported.");

    canvas.width = img.naturalWidth || img.width;
    canvas.height = img.naturalHeight || img.height;

    // Draw original
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Compute font size from image width
    const fontPx = Math.max(12, Math.round(canvas.width * scale));
    ctx.font = `600 ${fontPx}px ${cssFallbackFont()}`;
    ctx.textBaseline = "bottom";

    // Measure text
    const metrics = ctx.measureText(text);
    const textW = metrics.width;
    const textH = fontPx;

    // Watermark color
    ctx.globalAlpha = opacity;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "rgba(0,0,0,0.35)";
    ctx.lineWidth = Math.max(1, Math.round(fontPx * 0.08));

    // Single bottom-right label
    const x = canvas.width - marginPx - textW;
    const y = canvas.height - marginPx;

    // Outline for readability
    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);

    // Optional diagonal repeats (very faint)
    if (repeat) {
      ctx.globalAlpha = Math.max(0, opacity * 0.45);
      ctx.save();
      ctx.translate(canvas.width * 0.5, canvas.height * 0.5);
      ctx.rotate((-18 * Math.PI) / 180);
      const step = textW + 160;
      for (let yy = -canvas.height; yy < canvas.height; yy += 220) {
        for (let xx = -canvas.width; xx < canvas.width; xx += step) {
          ctx.strokeText(text, xx, yy);
          ctx.fillText(text, xx, yy);
        }
      }
      ctx.restore();
    }

    // Export with same mime
    const mime = type.includes("png") ? "image/png" : "image/jpeg";
    const blob = await canvasToBlob(canvas, mime, 0.92);
    return blob.arrayBuffer();
  } finally {
    URL.revokeObjectURL(url);
  }
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = rej;
    img.src = url;
  });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number
): Promise<Blob> {
  return new Promise((res, rej) => {
    canvas.toBlob((b) => (b ? res(b) : rej(new Error("toBlob failed"))), type, quality);
  });
}

function cssFallbackFont() {
  // use system-ui stack so no external font is required on canvas
  return `system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial, sans-serif`;
      }
