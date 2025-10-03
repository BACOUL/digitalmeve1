// lib/proof.ts
// ============================================================
// DigitalMeve — Construction & sérialisation de la preuve .MEVE
// - 100% navigateur (aucun stockage serveur)
// - Free : aucune info d’identité dans la preuve
// - Personal (payant) : email dans issuer + certification (placeholder)
// - Business (payant) : domaine + signature locale (clé EC P-256) + certification (placeholder)
// - Garde les utilitaires existants (hash, JSON canonique, rendu lisible)
// ============================================================

/* ──────────────────────────────────────────────────────────────
 * 1) Hash & helpers
 * ────────────────────────────────────────────────────────────── */

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

/* ──────────────────────────────────────────────────────────────
 * 2) Types & “plan” (mode d’utilisation)
 * ────────────────────────────────────────────────────────────── */

export type Plan = "free" | "personal_paid" | "business_paid";

/** Placeholder très simple (à remplacer plus tard par la vraie logique billing/session) */
export function getCurrentPlan(): Plan {
  try {
    const v = typeof window !== "undefined" ? localStorage.getItem("dm-plan") : null;
    if (v === "personal_paid" || v === "business_paid") return v;
  } catch {}
  return "free";
}

/* ──────────────────────────────────────────────────────────────
 * 3) Objet de preuve .MEVE (canonique à embarquer)
 * ────────────────────────────────────────────────────────────── */

export type MeveProof = {
  v: 1;
  kind: "dm-proof";
  hash: string;      // SHA-256 du fichier d’origine (hex)
  ts: string;        // ISO 8601 (création)
  issuer?: string;   // Personal: email ; Business: domaine
  org?: {            // Présent uniquement en Business
    domain: string;
    kid: string;     // identifiant de la clé locale
    alg: "ES256";
    sig: string;     // base64url(ECDSA-SHA256( "MEVE|domain|hash|ts" ))
  };
  cert?: {           // Certification DigitalMeve (placeholder pour le moment)
    label: string;   // pour affichage
    attestation?: string; // (plus tard) renvoyée par l’API
  };
};

/* ──────────────────────────────────────────────────────────────
 * 4) Gestion de la clé locale Business (EC P-256 via WebCrypto)
 * ────────────────────────────────────────────────────────────── */

const LS_PRIV = "dm_org_priv_jwk_v1";
const LS_PUB  = "dm_org_pub_jwk_v1";
const LS_KID  = "dm_org_kid_v1";

type OrgKeyBundle = {
  kid: string;
  privateKey: CryptoKey;
  publicJwk: JsonWebKey;
};

async function ensureOrgKey(): Promise<OrgKeyBundle> {
  if (typeof window === "undefined" || !window.crypto?.subtle) {
    throw new Error("WebCrypto not available");
  }
  const subtle = window.crypto.subtle;

  const privJwkRaw = localStorage.getItem(LS_PRIV);
  const pubJwkRaw  = localStorage.getItem(LS_PUB);
  const kidStored  = localStorage.getItem(LS_KID);

  if (privJwkRaw && pubJwkRaw && kidStored) {
    const privJwk = JSON.parse(privJwkRaw) as JsonWebKey;
    const pubJwk  = JSON.parse(pubJwkRaw) as JsonWebKey;
    const privateKey = await subtle.importKey(
      "jwk",
      privJwk,
      { name: "ECDSA", namedCurve: "P-256" },
      true,
      ["sign"]
    );
    return { kid: kidStored, privateKey, publicJwk: pubJwk };
  }

  // Génère une nouvelle paire
  const keyPair = await subtle.generateKey(
    { name: "ECDSA", namedCurve: "P-256" },
    true,
    ["sign", "verify"]
  );
  const privJwk = await subtle.exportKey("jwk", keyPair.privateKey);
  const pubJwk  = await subtle.exportKey("jwk", keyPair.publicKey);

  // kid = hash base64url du JWK public minimal
  const kidSrc = JSON.stringify({ kty: (pubJwk as any).kty, crv: (pubJwk as any).crv, x: (pubJwk as any).x, y: (pubJwk as any).y });
  const kid = await sha256TextBase64url(kidSrc);

  localStorage.setItem(LS_PRIV, JSON.stringify(privJwk));
  localStorage.setItem(LS_PUB, JSON.stringify(pubJwk));
  localStorage.setItem(LS_KID, kid);

  return { kid, privateKey: keyPair.privateKey, publicJwk: pubJwk };
}

async function sha256TextBase64url(txt: string) {
  const enc = new TextEncoder().encode(txt);
  const h = await crypto.subtle.digest("SHA-256", enc);
  return base64url(new Uint8Array(h));
}
function base64url(u8: Uint8Array) {
  let s = "";
  for (let i = 0; i < u8.length; i++) s += String.fromCharCode(u8[i]);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
async function signES256(privateKey: CryptoKey, data: Uint8Array): Promise<string> {
  const sig = await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, privateKey, data);
  return base64url(new Uint8Array(sig));
}

/** Construit org{domain,kid,alg,sig} si plan Business */
async function maybeBuildOrgBlock(
  plan: Plan,
  businessDNS: string | null | undefined,
  hash: string,
  ts: string
): Promise<MeveProof["org"] | undefined> {
  if (plan !== "business_paid") return undefined;
  const domain = (businessDNS || "").trim().toLowerCase();
  if (!domain) return undefined;

  const bundle = await ensureOrgKey();
  const msg = `MEVE|${domain}|${hash}|${ts}`;
  const sig = await signES256(bundle.privateKey, new TextEncoder().encode(msg));

  return { domain, kid: bundle.kid, alg: "ES256", sig };
}

/* ──────────────────────────────────────────────────────────────
 * 5) Certification DigitalMeve (placeholder — rien côté gratuit)
 * ────────────────────────────────────────────────────────────── */

async function maybeGetDmCertification(plan: Plan): Promise<{ label: string; attestation?: string } | undefined> {
  if (plan === "free") return undefined;
  // Quand l’API existera, on échangera (hash, ts, issuer/org) contre une “attestation” signée DM.
  return { label: "DigitalMeve Certification" };
}

/* ──────────────────────────────────────────────────────────────
 * 6) Construction de la preuve (API principale)
 * ────────────────────────────────────────────────────────────── */

export async function buildMeveProof(input: {
  file: File;
  plan?: Plan;                 // défaut: getCurrentPlan()
  issuerEmail?: string | null; // perso payant
  businessDNS?: string | null; // pro payant
}): Promise<{ proof: MeveProof; hash: string; ts: string }> {
  const plan = input.plan ?? getCurrentPlan();

  // 1) hash + ts
  const [hash, ts] = await Promise.all([sha256Hex(input.file), Promise.resolve(new Date().toISOString())]);

  // 2) identité selon plan (NE RIEN METTRE en free)
  let issuer: string | undefined = undefined;
  if (plan === "personal_paid" && input.issuerEmail) {
    issuer = String(input.issuerEmail).trim();
  }
  if (plan === "business_paid" && input.businessDNS) {
    issuer = String(input.businessDNS).trim().toLowerCase();
  }

  // 3) bloc org (business uniquement)
  const org = await maybeBuildOrgBlock(plan, input.businessDNS, hash, ts);

  // 4) certification (placeholder pour paid)
  const cert = await maybeGetDmCertification(plan);

  // 5) objet de preuve
  const proof: MeveProof = {
    v: 1,
    kind: "dm-proof",
    hash,
    ts,
    issuer,
    org,
    cert,
  };

  return { proof, hash, ts };
}

/* ──────────────────────────────────────────────────────────────
 * 7) Aides de rendu / téléchargement (compatibles avec ton code)
 * ────────────────────────────────────────────────────────────── */

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

/** Nom conseillé pour la preuve sidecar */
export function proofFilenameFor(originalName: string) {
  const { base, ext } = splitName(originalName);
  return `${base}.${ext}.meve.json`;
}

/* ──────────────────────────────────────────────────────────────
 * 8) Variante historique (garde la compatibilité si déjà utilisée)
 *    -> construit un objet “descriptif” lisible, non signé
 * ────────────────────────────────────────────────────────────── */
export async function buildProofObject(file: File, issuer?: string) {
  const head = file.slice(0, 256); // petit aperçu optionnel
  const [sha256, previewB64] = await Promise.all([sha256Hex(file), blobToBase64(head)]);

  const mime = file.type || guessMime(file.name) || "application/octet-stream";

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

/* ──────────────────────────────────────────────────────────────
 * 9) Utilitaires internes
 * ────────────────────────────────────────────────────────────── */
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
