// app/api/debug/echo/route.ts
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const headers: Record<string, string> = {};
  req.headers.forEach((v, k) => { headers[k] = v; });

  return NextResponse.json({
    ok: true,
    method: "GET",
    path: new URL(req.url).pathname,
    headers,
  }, { headers: { "Cache-Control": "no-store" } });
}
