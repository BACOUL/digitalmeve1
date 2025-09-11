// lib/sha256.ts
export async function sha256HexFromBlob(blob: Blob): Promise<string> {
  const buf = await blob.arrayBuffer();
  const hash = await crypto.subtle.digest("SHA-256", buf);
  const bytes = new Uint8Array(hash);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
}
