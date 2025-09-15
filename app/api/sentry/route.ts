// app/api/sentry/route.ts
import { NextRequest } from "next/server";

export const runtime = "edge"; // ou "nodejs"

export async function POST(req: NextRequest) {
  try {
    const DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || "";
    if (!DSN) return new Response("Sentry DSN missing", { status: 204 });

    // DSN format: https://<key>@o<orgId>.ingest.sentry.io/<projectId>
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

    return new Response(null, { status: res.status });
  } catch {
    return new Response(null, { status: 204 });
  }
}
