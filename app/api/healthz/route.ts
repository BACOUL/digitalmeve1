// app/api/healthz/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function json(data: any, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function GET() {
  const started = Date.now();

  // Petit timeout pour éviter de bloquer si la DB est down
  const timeout = new Promise((_, rej) =>
    setTimeout(() => rej(new Error("db-timeout")), 2500)
  );

  let db = { ok: false as boolean, ms: 0 as number, error: null as null | string };

  try {
    const t0 = Date.now();
    // ping ultra léger : SELECT 1
    await Promise.race([
      prisma.$queryRaw`SELECT 1`,
      timeout,
    ]);
    db.ok = true;
    db.ms = Date.now() - t0;
  } catch (e: any) {
    db.ok = false;
    db.error = e?.message || "db-error";
  }

  const body = {
    ok: db.ok,
    uptimeMs: Date.now() - started,
    env: process.env.NODE_ENV,
    commit: process.env.NEXT_PUBLIC_COMMIT_SHA || null,
    db,
  };

  return json(body, db.ok ? 200 : 503);
}
