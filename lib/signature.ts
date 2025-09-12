// lib/signature.ts
// Ed25519: vérif côté client + appel au signer côté Edge (/api/sign)

const PUB_SPKI_B64 = process.env.NEXT_PUBLIC_MEVE_ED25519_PUB_SPKI_BASE64 ?? "";

function b64ToBytes(b64: string): Uint8Array {
  // support base64url & base64
  const normalized = b64.replace(/-/g, "+").replace(/_/g, "/");
  const pad = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  const bin = atob(normalized + pad);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

export async function importPublicKeyFromBase64(spkiB64: string): Promise<CryptoKey> {
  if (!spkiB64) throw new Error("Missing NEXT_PUBLIC_MEVE_ED25519_PUB_SPKI_BASE64");
  const spki = b64ToBytes(spkiB64).buffer;
  return crypto.subtle.importKey(
    "spki",
    spki,
    { name: "Ed25519" },
    false,
    ["verify"]
  );
}

/**
 * Vérifie une signature Ed25519 sur `payload`.
 * - payload: bytes (Uint8Array)
 * - sig: 64 bytes (Uint8Array)
 */
export async function verifyPayloadSignature(payload: Uint8Array, sig: Uint8Array): Promise<boolean> {
  if (sig.byteLength !== 64) return false;
  const pub = await importPublicKeyFromBase64(PUB_SPKI_B64);
  return crypto.subtle.verify(
    { name: "Ed25519" },
    pub,
    sig,
    payload
  );
}

/**
 * Signe le payload côté Edge (route /api/sign).
 * Retourne la signature (64 bytes).
 */
export async function signPayloadOnEdge(payload: Uint8Array): Promise<Uint8Array> {
  const res = await fetch("/api/sign", {
    method: "POST",
    headers: { "Content-Type": "application/octet-stream" },
    body: payload
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Signing failed (${res.status}): ${txt}`);
  }
  const buf = await res.arrayBuffer();
  return new Uint8Array(buf);
}
