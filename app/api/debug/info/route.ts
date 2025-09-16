// app/api/debug/info/route.ts
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const ua = req.headers.get("user-agent") || "";
  const country = req.headers.get("x-vercel-ip-country") || null;

  const payload = {
    ok: true,
    now: new Date().toISOString(),
    url: url.toString(),
    runtime: process.env.NEXT_RUNTIME || "node",
    nodeEnv: process.env.NODE_ENV,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || null,
    sentryEnabled: Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),
    commit: process.env.NEXT_PUBLIC_COMMIT_SHA || null,
    country,
    ua: ua.slice(0, 120),
  };

  return NextResponse.json(payload, { headers: { "Cache-Control": "no-store" } });
}
