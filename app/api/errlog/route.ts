// app/api/errlog/route.ts
import type { NextRequest } from "next/server";

// Tu peux passer en "edge" si tu veux (latence + faible coût)
// export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json().catch(() => null);

    // Nettoyage minimal
    const event = {
      message: json?.message ?? "unknown",
      stack: json?.stack ?? null,
      digest: json?.digest ?? null,
      at: json?.at ?? null,
      ua: req.headers.get("user-agent") || null,
      referer: req.headers.get("referer") || null,
      ts: new Date().toISOString(),
      rid: req.headers.get("x-request-id") || null,
      ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null,
    };

    // 👉 Ici on se contente de logger serveur (console = capturé par Vercel)
    // Si tu veux relayer vers Sentry/Logtail/Datadog, fais-le ici.
    console.warn("[client-errlog]", JSON.stringify(event));

    // 204 = pas de corps, succès silencieux
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 204 });
  }
}

// Optionnel : refuse GET
export function GET() {
  return new Response("Method Not Allowed", { status: 405 });
}
