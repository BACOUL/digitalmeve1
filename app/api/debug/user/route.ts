import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = (searchParams.get("email") || "").toLowerCase().trim();
    if (!email) return NextResponse.json({ ok: false, error: "Missing email" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ ok: false, error: "User not found" }, { status: 404 });

    // ✅ conversion BigInt → string
    const safeUser = JSON.parse(
      JSON.stringify(user, (_, v) => (typeof v === "bigint" ? v.toString() : v))
    );

    return NextResponse.json({ ok: true, user: safeUser });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
