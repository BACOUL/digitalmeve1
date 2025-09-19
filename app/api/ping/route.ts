// app/api/ping/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(
    { ok: true, pong: true, ts: Date.now() },
    { headers: { "Cache-Control": "no-store" } }
  );
}
