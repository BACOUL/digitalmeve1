import { NextResponse } from "next/server";

// Optionnel : limiter les logs (ex: 1 req / IP / 10s) → à raffiner si besoin
let lastLog: Record<string, number> = {};

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    const now = Date.now();
    if (lastLog[ip] && now - lastLog[ip] < 10_000) {
      return NextResponse.json({ ok: true, skipped: true });
    }
    lastLog[ip] = now;

    const body = await req.json();

    // Ici tu pourrais envoyer ça à un service de logs externe (Sentry, Logtail, etc.)
    console.error("[client-error]", {
      ip,
      time: new Date().toISOString(),
      ...body,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error logging client-error", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
