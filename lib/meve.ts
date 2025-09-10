// lib/meve.ts
export type MeveProof = {
  version: "meve/1";
  created_at: string; // ISO-8601 UTC
  doc: {
    name?: string;
    mime?: string;
    size: number;
    sha256: string;
    preview_b64?: string;
  };
  issuer: {
    name?: string;
    identity?: string;
    type: "personal" | "pro"; // "official" retiré pour le moment
    website?: string;
    verified_domain?: boolean;
  };
  meta?: Record<string, any>;
};

// SHA-256 (hex) via Web Crypto
export async function sha256Hex(buf: ArrayBuffer): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", buf);
  const view = new Uint8Array(digest);
  return [...view].map(b => b.toString(16).padStart(2, "0")).join("");
}

// JSON canonique (clés triées)
export function stringifyCanonical(obj: any): string {
  if (obj === null || typeof obj !== "object") return JSON.stringify(obj);
  if (Array.isArray(obj)) return "[" + obj.map(stringifyCanonical).join(",") + "]";
  const keys = Object.keys(obj).sort();
  return "{" + keys.map(k => JSON.stringify(k) + ":" + stringifyCanonical(obj[k])).join(",") + "}";
}

// Base64 d’un petit extrait (pour debug humain non sensible)
export async function previewBase64(file: File, max = 300): Promise<string | undefined> {
  const slice = file.slice(0, max);
  const buf = await slice.arrayBuffer();
  // browser-safe base64
  let str = "";
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i]);
  return btoa(str);
}

// Génère l’objet preuve (côté client)
export async function generateProofForFile(file: File, issuerIdentity?: string): Promise<MeveProof> {
  const buf = await file.arrayBuffer();
  const hash = await sha256Hex(buf);
  const mime = file.type || undefined;

  // Aperçu optionnel (en-tête court)
  const preview_b64 = await previewBase64(file, 320);

  const proof: MeveProof = {
    version: "meve/1",
    created_at: new Date().toISOString().replace(/\.\d{3}Z$/, "Z"),
    doc: {
      name: file.name,
      mime,
      size: file.size,
      sha256: hash,
      preview_b64
    },
    issuer: {
      name: "DigitalMeve",
      identity: issuerIdentity || undefined,
      type: "personal",
      website: "https://digitalmeve.com",
      verified_domain: false
    }
  };
  return proof;
}

// Téléchargement utilitaire
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function downloadJson(obj: any, filename: string, pretty = false) {
  const json = pretty ? JSON.stringify(obj, null, 2) : stringifyCanonical(obj);
  const blob = new Blob([json], { type: "application/json;charset=utf-8" });
  downloadBlob(blob, filename);
}
