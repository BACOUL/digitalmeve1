// Filigrane invisible (agnostique du format de fichier)
// - Encode un payload (hash + date/heure + email) en Base64 compact
// - Décode ce payload à partir d'une chaîne encodée
// - Normalise l'email pour assurer une comparaison robuste

export type InvisibleWatermarkPayload = {
  alg: "sha256";        // algo de hachage (pour l’instant fixé à sha256)
  hash: string;         // 64 hex chars
  ts: string;           // ISO 8601 UTC (ex: 2025-03-01T12:34:56.789Z)
  issuer?: string;      // email normalisé (optionnel)
};

// Encapsulation texte autour du Base64 (pour repérage dans un flux binaire/texte)
export const MARKER_PREFIX = "MEVE{";
export const MARKER_SUFFIX = "}EVEM";

// Validation rapide d’un hex SHA-256
export function isSha256Hex(s: string): boolean {
  return /^[0-9a-f]{64}$/i.test(s);
}

// Normalisation d'email (RFC-lite) : trim, toLowerCase.
export function normalizeEmail(email?: string): string | undefined {
  if (!email) return undefined;
  const n = email.trim().toLowerCase();
  // Sécurité minimale : présence d'un "@"
  if (!n.includes("@")) return undefined;
  return n;
}

// Encodage JSON -> Base64 (utf-8), encapsulé par MARKER_PREFIX/SUFFIX
export function encodeInvisibleWatermark(p: InvisibleWatermarkPayload): string {
  if (p.alg !== "sha256") throw new Error("Unsupported alg (only sha256)");
  if (!isSha256Hex(p.hash)) throw new Error("hash must be 64 hex chars (sha256)");
  if (!/^\d{4}-\d{2}-\d{2}T/.test(p.ts)) throw new Error("ts must be ISO-8601");

  const payload: InvisibleWatermarkPayload = {
    alg: "sha256",
    hash: p.hash.toLowerCase(),
    ts: p.ts,
    issuer: normalizeEmail(p.issuer),
  };

  const json = JSON.stringify(payload);
  const b64 = base64FromUtf8(json);

  return `${MARKER_PREFIX}${b64}${MARKER_SUFFIX}`;
}

// Décodage à partir d’une chaîne contenant MEVE{...}EVEM
// - Retourne le premier payload trouvé (ou null)
export function decodeInvisibleWatermark(text: string): InvisibleWatermarkPayload | null {
  const i = text.indexOf(MARKER_PREFIX);
  if (i < 0) return null;
  const j = text.indexOf(MARKER_SUFFIX, i + MARKER_PREFIX.length);
  if (j < 0) return null;

  const b64 = text.slice(i + MARKER_PREFIX.length, j);
  try {
    const json = utf8FromBase64(b64);
    const obj = JSON.parse(json);

    if (obj?.alg !== "sha256") return null;
    if (!isSha256Hex(obj?.hash)) return null;
    if (!/^\d{4}-\d{2}-\d{2}T/.test(obj?.ts)) return null;

    const issuer = normalizeEmail(obj?.issuer);

    return {
      alg: "sha256",
      hash: String(obj.hash).toLowerCase(),
      ts: String(obj.ts),
      issuer,
    };
  } catch {
    return null;
  }
}

// ---------- helpers Base64 / UTF-8 ----------

function base64FromUtf8(s: string): string {
  // btoa attend du latin1 ; on encode d’abord en UTF-8
  const utf8 = new TextEncoder().encode(s);
  let bin = "";
  for (let i = 0; i < utf8.length; i++) bin += String.fromCharCode(utf8[i]);
  return btoa(bin);
}

function utf8FromBase64(b64: string): string {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder("utf-8", { fatal: false }).decode(bytes);
    }
