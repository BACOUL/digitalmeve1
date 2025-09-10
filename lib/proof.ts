// lib/proof.ts
export async function sha256Hex(blob: Blob): Promise<string> {
  const buf = await blob.arrayBuffer();
  const hash = await crypto.subtle.digest("SHA-256", buf);
  const bytes = new Uint8Array(hash);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

// JSON Canonicalization (clés triées, minifié)
export function stringifyCanonical(obj: any): string {
  if (obj === null || typeof obj !== "object") return JSON.stringify(obj);
  if (Array.isArray(obj)) return "[" + obj.map(stringifyCanonical).join(",") + "]";
  const keys = Object.keys(obj).sort();
  return "{" + keys.map((k) => JSON.stringify(k) + ":" + stringifyCanonical(obj[k])).join(",") + "}";
}

export async function buildProofObject(file: File, issuer?: string) {
  const head = file.slice(0, 256); // petit aperçu optionnel
  const [sha256, previewB64] = await Promise.all([
    sha256Hex(file),
    blobToBase64(head),
  ]);

  // déduction MIME simple
  const mime = file.type || guessMime(file.name) || "application/octet-stream";

  return {
    version: "meve/1",
    created_at: new Date().toISOString(),
    doc: {
      name: file.name,
      mime,
      size: file.size,
      sha256,
      preview_b64: previewB64,
    },
    issuer: {
      name: "DigitalMeve",
      identity: issuer || "",
      type: "personal",           // MVP : on calcule vraiment côté vérif
      website: "https://digitalmeve.com",
      verified_domain: false,
    },
    // meta: {}  // retiré comme tu voulais
  };
}

function guessMime(name: string): string | undefined {
  const ext = name.split(".").pop()?.toLowerCase();
  if (!ext) return;
  if (ext === "pdf") return "application/pdf";
  if (ext === "png") return "image/png";
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  return;
}

function blobToBase64(b: Blob): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res((r.result as string).split(",")[1] || "");
    r.onerror = rej;
    r.readAsDataURL(b);
  });
}
