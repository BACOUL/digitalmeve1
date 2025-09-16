// app/api/errlog/route.ts
import type { NextRequest } from "next/server";

export const runtime = "edge"; // compatible Vercel Edge

type ErrLogPayload = {
  message?: string;
  stack?: string | null;
  digest?: string | null;
  at?: string | null;
  extra?: Record<string, unknown>;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as ErrLogPayload;

    // IP côté Edge/Proxy: on tente les entêtes usuels puis fallback
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      req.headers.get("cf-connecting-ip") || // Cloudflare
      req.headers.get("x-client-ip") ||
      req.headers.get("fastly-client-ip") ||
      undefined;

    const ua = req.headers.get("user-agent") || "";

    // Log minimal côté serveur (visible dans Vercel > Functions logs)
    // eslint-disable-next-line no-console
    console.error("[client-error]", {
      message: body?.message ?? "unknown",
      digest: body?.digest ?? null,
      at: body?.at ?? null,
      ip,
      ua,
      // stack peut être volumineuse : on la met quand même pour debug
      stack: body?.stack ?? null,
      extra: body?.extra ?? undefined,
    });

    // Réponse vide, succès (no content)
    return new Response(null, { status: 204 });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("[errlog-endpoint-failed]", e);
    // On ne casse jamais l’UX : on renvoie 204 quand même
    return new Response(null, { status: 204 });
  }
}
