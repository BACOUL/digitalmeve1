// app/api/healthz/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    ts: new Date().toISOString(),
    env: process.env.NODE_ENV,
    commit: process.env.NEXT_PUBLIC_COMMIT_SHA || null,
  }, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
