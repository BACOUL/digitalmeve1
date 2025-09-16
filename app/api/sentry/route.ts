// app/api/sentry/route.ts
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || "";
    if (!DSN)
      return new Response(
        JSON.stringify({ ok: false, reason: "DSN missing" }),
        { status: 200, headers: { "content-type": "application/json" } }
      );

    const ingestUrl = new URL(DSN);
    ingestUrl.username = ""; // nettoie userinfo
    const parts = ingestUrl.pathname.split("/").filter(Boolean);
    const projectId = parts[parts.length - 1];
    ingestUrl.pathname = `/api/${projectId}/envelope/`;

    const body = await req.text();
    const res = await fetch(ingestUrl.toString(), {
      method: "POST",
      body,
      headers: {
        "Content-Type":
          req.headers.get("content-type") || "application/x-sentry-envelope",
      },
    });

    const xErr = res.headers.get("x-sentry-error");
    const xRate = res.headers.get("x-sentry-rate-limits");
    const payload = {
      ok: res.ok,
      status: res.status,
      x_sentry_error: xErr || null,
      x_sentry_rate_limits: xRate || null,
    };

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ ok: false, reason: "proxy_exception" }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  }
}
