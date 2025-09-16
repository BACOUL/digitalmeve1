import { NextRequest } from "next/server";

export const runtime = "edge"; // rapide & scalable

// Petite fonction de redaction pour éviter tout PII accidentel
function sanitize(input: unknown) {
  try {
    const obj = typeof input === "string" ? JSON.parse(input) : input;
    if (!obj || typeof obj !== "object") return obj;

    const clone: Record<string, unknown> = { ...(obj as any) };
    const lowerKeys = Object.keys(clone).map((k) => k.toLowerCase());

    // champs potentiellement sensibles
    const suspect = ["email", "password", "token", "authorization", "cookie"];
    for (const key of Object.keys(clone)) {
      if (suspect.includes(key.toLowerCase())) {
        clone[key] = "[redacted]";
      }
    }

    // tronque stack/strings trop longues
    if (typeof clone.stack === "string" && clone.stack.length > 5000) {
      clone.stack = clone.stack.slice(0, 5000) + "…[truncated]";
    }
    if (typeof clone.message === "string" && clone.message.length > 2000) {
      clone.message = clone.message.slice(0, 2000) + "…[truncated]";
    }
    return clone;
  } catch {
    return { note: "sanitize-failed" };
  }
}

export async function POST(req: NextRequest) {
  // Rate-limit léger (5 req / 10s / IP) — best-effort en Edge
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.ip ||
    "0.0.0.0";
  const key = `errlog:${ip}:${Math.floor(Date.now() / 10_000)}`; // bucket de 10s
  // @ts-expect-error Deno KV n’existe pas ici — fallback noop (Vercel Edge n’a pas de KV par défaut)
  const count = (globalThis as any)[key] ?? 0;
  // @ts-expect-error idem
  (globalThis as any)[key] = count + 1;
  if (count > 5) {
    return new Response(null, { status: 204 }); // on ignore silencieusement
  }

  let payload: any = null;
  try {
    payload = await req.json();
  } catch {
    // no-op (mal formé)
  }

  const safe = sanitize(payload);
  // Log non bloquant (visible dans Vercel > Functions logs)
  // eslint-disable-next-line no-console
  console.log("[client-error]", {
    at: new Date().toISOString(),
    ip,
    url: safe?.at ?? null,
    message: safe?.message ?? null,
    digest: safe?.digest ?? null,
    stack: safe?.stack ?? null,
  });

  // On ne renvoie rien (pas de fuite d’info côté client)
  return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}

export function GET() {
  // Désactivé (read only)
  return new Response("Method Not Allowed", { status: 405 });
}
