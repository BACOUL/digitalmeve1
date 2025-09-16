// app/api/csp-report/route.ts
import type { NextRequest } from "next/server";

// export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    // Les navigateurs envoient soit application/csp-report,
    // soit application/reports+json (Reporting API)
    const ct = req.headers.get("content-type") || "";

    let payload: any = null;
    if (ct.includes("json")) {
      payload = await req.json().catch(() => null);
    } else {
      // vieux navigateurs : parfois text/plain
      const text = await req.text();
      try { payload = JSON.parse(text); } catch { payload = { raw: text }; }
    }

    const report = {
      payload,
      ua: req.headers.get("user-agent") || null,
      referer: req.headers.get("referer") || null,
      ts: new Date().toISOString(),
      rid: req.headers.get("x-request-id") || null,
      ip: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null,
    };

    console.warn("[csp-violation]", JSON.stringify(report));
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 204 });
  }
}

export function GET() {
  return new Response("Method Not Allowed", { status: 405 });
}
