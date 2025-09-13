import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";

// Évite tout cache/prérendu
export const dynamic = "force-dynamic";
export const revalidate = 0;

type Body = {
  email?: string;
  password?: string;
  role?: "INDIVIDUAL" | "BUSINESS";
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const email = (body.email || "").trim().toLowerCase();
    const password = body.password || "";
    const role = body.role === "BUSINESS" ? "BUSINESS" : "INDIVIDUAL";

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashed = hashPassword(password);

    const user = await prisma.user.create({
      data: { email, password: hashed, role },
      select: { id: true, email: true, role: true, createdAt: true },
    });

    return NextResponse.json({ ok: true, user }, { status: 201 });
  } catch (err: any) {
    console.error("REGISTER ERROR:", err);
    return NextResponse.json(
      { error: "Internal error", details: String(err?.message ?? err) },
      { status: 500 }
    );
  }
}
