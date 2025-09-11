// lib/watermark-pdf.ts
// V1: ne change pas le PDF, on renvoie le fichier identique
export async function addWatermarkPdf(file: File | ArrayBuffer): Promise<ArrayBuffer> {
  return file instanceof File ? await file.arrayBuffer() : file;
}
