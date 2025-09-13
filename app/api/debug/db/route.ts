import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const now = await prisma.$queryRaw<{ now: Date }[]>`SELECT now()`;
    const users = await prisma.$queryRaw<{ count: bigint }[]>`SELECT COUNT(*)::bigint as count FROM "User"`;
    return NextResponse.json({ ok: true, now: now?.[0]?.now, users: users?.[0]?.count ?? 0 });
  } catch (e: any) {
    console.error("DB DEBUG ERROR:", e);
    return NextResponse.json({ ok: false, error: String(e?.message ?? e) }, { status: 500 });
  }
}
