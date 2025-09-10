// lib/proof.ts

/** ──────────────────────────────────────────────────────────────
 *  Hash & helpers
 *  ────────────────────────────────────────────────────────────── */
export async function sha256Hex(blob: Blob): Promise<string> {
  const buf = await blob.arrayBuffer();
  const hash = await crypto.subtle.digest("SHA-256", buf);
  const bytes = new Uint8Array(hash);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Tri récursif des clés (copie immuable) pour un rendu stable
function sortKeysDeep<T>(value: T): T {
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(sortKeysDeep) as unknown as T;
  const obj = value as Record<string, unknown>;
  const sorted: Record<string, unknown> = {};
  for (const k of Object.keys(obj).sort()) {
    sorted[k] = sortKeysDeep(obj[k]);
  }
  return sorted as unknown as T;
}

/** Canonical JSON (clés triées, minifié) — utile côté machine */
export function stringifyCanonical(obj: unknown): string {
  if (obj === null || typeof obj !== "object") return JSON.stringify(obj);
  if (Array.isArray(obj)) return "[" + obj.map(stringifyCanonical).join(",") + "]";
  const keys = Object.keys(obj as Record<string, unknown>).sort();
  return (
    "{" +
    keys
      .map((k) => JSON.stringify(k) + ":" + stringifyCanonical((obj as any)[k]))
      .join(",") +
    "}"
  );
}

/** ──────────────────────────────────────────────────────────────
 *  Construction de la preuve
 *  ────────────────────────────────────────────────────────────── */
export async function buildProofObject(file: File, issuer?: string) {
  const head = file.slice(0, 256); // petit aperçu optionnel
  const [sha256, previewB64] = await Promise.all([sha256Hex(file), blobToBase64(head)]);

  const mime = file.type || guessMime(file.name) || "application/octet-stream";

  // On ordonne déjà “humainement” pour le rendu lisible
  return sortKeysDeep({
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
      type: "personal",
      website: "https://digitalmeve.com",
      verified_domain: false,
    },
  });
}

/** ──────────────────────────────────────────────────────────────
 *  Rendus / téléchargement
 *  ────────────────────────────────────────────────────────────── */

/** JSON lisible “pro” (trié + indentation + en-tête explicatif) */
export async function proofReadableBlob(proof: unknown): Promise<Blob> {
  const pretty = JSON.stringify(sortKeysDeep(proof), null, 2);
  const header =
    "// DigitalMeve — .MEVE Proof (human-readable)\n" +
    "// More: https://digitalmeve.com/docs/proof\n\n";
  return new Blob([header, pretty, "\n"], { type: "application/json;charset=utf-8" });
}

/** JSON canonical minifié (pour vérification machine/empreinte) */
export async function proofCanonicalBlob(proof: unknown): Promise<Blob> {
  const min = stringifyCanonical(proof);
  return new Blob([min], { type: "application/json;charset=utf-8" });
}

/** Nom conseillé pour la preuve sidecar (lisible/canonical partagent le même nom) */
export function proofFilenameFor(originalName: string) {
  const { base, ext } = splitName(originalName);
  return `${base}.${ext}.meve.json`;
}

/** ──────────────────────────────────────────────────────────────
 *  Utilitaires internes
 *  ────────────────────────────────────────────────────────────── */
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

function splitName(name?: string) {
  if (!name) return { base: "file", ext: "bin" };
  const m = name.match(/^(.+)\.([^.]+)$/);
  return m ? { base: m[1], ext: m[2] } : { base: name, ext: "bin" };
  }
