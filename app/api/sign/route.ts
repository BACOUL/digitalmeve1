// app/api/sign/route.ts
export const runtime = "edge";

function b64ToBytes(b64: string): Uint8Array {
  const normalized = b64.replace(/-/g, "+").replace(/_/g, "/");
  const pad = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  const bin = atob(normalized + pad);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function importPrivateKeyFromPkcs8Base64(pkcs8B64: string): Promise<CryptoKey> {
  const keyData = b64ToBytes(pkcs8B64).buffer;
  return crypto.subtle.importKey(
    "pkcs8",
    keyData,
    { name: "Ed25519" },
    false,
    ["sign"]
  );
}

export async function POST(req: Request) {
  try {
    const keyB64 = process.env.MEVE_ED25519_PRIV_PKCS8_BASE64;
    if (!keyB64) {
      return new Response("Missing MEVE_ED25519_PRIV_PKCS8_BASE64", { status: 500 });
    }

    const body = await req.arrayBuffer();
    if (!body || body.byteLength === 0) {
      return new Response("Empty body", { status: 400 });
    }
    // petite limite défensive
    if (body.byteLength > 4096) {
      return new Response("Payload too large", { status: 413 });
    }

    const priv = await importPrivateKeyFromPkcs8Base64(keyB64);
    const sig = await crypto.subtle.sign({ name: "Ed25519" }, priv, body);

    return new Response(sig, {
      status: 200,
      headers: { "Content-Type": "application/octet-stream", "Cache-Control": "no-store" }
    });
  } catch (err: any) {
    return new Response(`Sign error: ${err?.message ?? "unknown"}`, { status: 500 });
  }
}
