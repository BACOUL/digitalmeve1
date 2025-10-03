// lib/proof.ts
// Centrale: plan courant, construction de la preuve (.MEVE), utilitaires crypto.
// Aucune donnée n'est stockée côté serveur — tout est local.

/* ──────────────────────────────────────────────────────────────
 * Types & plan courant
 * ────────────────────────────────────────────────────────────── */
export type Plan = "free" | "personal_paid" | "business_paid";

export function getCurrentPlan(): Plan {
  // 🔧 À brancher plus tard sur ta session/billing réelle.
  // Ordre de priorité: window.__DM_PLAN (dev), localStorage('dm-plan'), sinon 'free'.
  if (typeof window !== "undefined") {
    const anyWin = window as any;
    const fromWin = anyWin.__DM_PLAN as Plan | undefined;
    if (fromWin === "free" || fromWin === "personal_paid" || fromWin === "business_paid") {
      return fromWin;
    }
    try {
      const ls = window.localStorage?.getItem("dm-plan");
      if (ls === "free" || ls === "personal_paid" || ls === "business_paid") return ls;
    } catch {
      /* no-op */
    }
  }
  return "free";
}

/* ──────────────────────────────────────────────────────────────
 * Hash & helpers
 * ────────────────────────────────────────────────────────────── */
export async function sha256Hex(blob: Blob): Promise<string> {
  const buf = await blob.arrayBuffer();
  const hash = await crypto.subtle.digest("SHA-256", buf);
  const bytes = new Uint8Array(hash);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
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

function splitName(name?: string) {
  if (!name) return { base: "file", ext: "bin" };
  const m = name.match(/^(.+)\.([^.]+)$/);
  return m ? { base: m[1], ext: m[2] } : { base: name, ext: "bin" };
}

function guessMime(name: string): string | undefined {
  const ext = name.split(".").pop()?.toLowerCase();
  if (!ext) return;
  if (ext === "pdf") return "application/pdf";
  if (ext === "png") return "image/png";
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  if (ext === "docx") {
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  }
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

function base64url(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

/* ──────────────────────────────────────────────────────────────
 * Signatures locales (business) — optionnelles, futures
 * ────────────────────────────────────────────────────────────── */
async function importES256Private(pkcs8Der: ArrayBuffer): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "pkcs8",
    pkcs8Der,
    { name: "ECDSA", namedCurve: "P-256" },
    false,
    ["sign"]
  );
}

// ✅ FIX CRYPTO: passer un ArrayBuffer "pur" à subtle.sign
async function signES256(privateKey: CryptoKey, data: Uint8Array): Promise<string> {
  // On découpe l’ArrayBuffer sous-jacent pour n’avoir que la fenêtre utile
  const ab = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength) as ArrayBuffer;
  const sig = await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, privateKey, ab);
  return base64url(new Uint8Array(sig));
}

/* ──────────────────────────────────────────────────────────────
 * Preuve centrale (.MEVE)
 * ────────────────────────────────────────────────────────────── */
export type BuildMeveProofInput = {
  file: File;
  plan: Plan;
  issuerEmail?: string | null;  // personal_paid
  businessDNS?: string | null;  // business_paid
  // Optionnellement: clé pro locale (futur)
  businessKeyPkcs8Der?: ArrayBuffer; // si fourni, on signera org.signature
};

export type BuildMeveProofOutput = {
  proof: {
    version: "meve/1";
    created_at: string;
    doc: {
      name: string;
      mime: string;
      size: number;
      sha256: string;
      preview_b64: string;
    };
    // identité légère (affichable)
    issuer?: string; // email (personal) ou domaine (business), absent en free
    // bloc business optionnel prêt pour l’avenir
    org?: {
      domain: string;
      key_id?: string; // TODO
      signature?: string; // base64url ECDSA
      algo?: "ES256";
    };
  };
  hash: string;
  ts: string; // created_at
};

export async function buildMeveProof(input: BuildMeveProofInput): Promise<BuildMeveProofOutput> {
  const { file, plan, issuerEmail, businessDNS, businessKeyPkcs8Der } = input;

  // 1) Empreinte du fichier original (spéc MEVE)
  const [sha256, preview_b64] = await Promise.all([
    sha256Hex(file),
    blobToBase64(file.slice(0, 256)),
  ]);
  const ts = new Date().toISOString();
  const mime = file.type || guessMime(file.name) || "application/octet-stream";

  // 2) Identité légère selon le plan (free = aucune)
  let issuer: string | undefined = undefined;
  if (plan === "personal_paid" && issuerEmail) issuer = issuerEmail;
  if (plan === "business_paid" && businessDNS) issuer = businessDNS;

  // 3) Bloc organisation (pro) – optionnel, sans stockage
  let org:
    | {
        domain: string;
        key_id?: string;
        signature?: string;
        algo?: "ES256";
      }
    | undefined = undefined;

  if (plan === "business_paid" && businessDNS) {
    org = { domain: businessDNS };

    // Signature locale (facultative pour l’instant) :
    // on signe le tuple canonique "domain + sha256 + ts"
    if (businessKeyPkcs8Der) {
      const key = await importES256Private(businessKeyPkcs8Der);
      const payload = stringifyCanonical({ domain: businessDNS, sha256, ts });
      const bytes = new TextEncoder().encode(payload);
      const signature = await signES256(key, bytes);
      org.signature = signature;
      org.algo = "ES256";
      // key_id à gérer plus tard (rotation de clés)
    }
  }

  // 4) Assemble la preuve lisible + stable
  const proof = sortKeysDeep({
    version: "meve/1" as const,
    created_at: ts,
    doc: {
      name: file.name,
      mime,
      size: file.size,
      sha256,
      preview_b64,
    },
    ...(issuer ? { issuer } : {}),
    ...(org ? { org } : {}),
  });

  return { proof, hash: sha256, ts };
}

/* ──────────────────────────────────────────────────────────────
 * Rendus / téléchargement de preuves (optionnel)
 * ────────────────────────────────────────────────────────────── */
export async function proofReadableBlob(proof: unknown): Promise<Blob> {
  const pretty = JSON.stringify(sortKeysDeep(proof), null, 2);
  const header =
    "// DigitalMeve — .MEVE Proof (human-readable)\n" +
    "// More: https://digitalmeve.com/docs/proof\n\n";
  return new Blob([header, pretty, "\n"], { type: "application/json;charset=utf-8" });
}

export async function proofCanonicalBlob(proof: unknown): Promise<Blob> {
  const min = stringifyCanonical(proof);
  return new Blob([min], { type: "application/json;charset=utf-8" });
}

export function proofFilenameFor(originalName: string) {
  const { base, ext } = splitName(originalName);
  return `${base}.${ext}.meve.json`;
  }
