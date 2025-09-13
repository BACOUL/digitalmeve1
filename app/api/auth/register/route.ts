// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import prisma from "@/lib/prisma";

type Body = {
  email?: string;
  password?: string;
  role?: "INDIVIDUAL" | "BUSINESS";
};

export async function POST(req: Request) {
  try {
    const { email, password, role }: Body = await req.json();

    if (!email || !password) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ ok: false, error: "Password too short" }, { status: 400 });
    }

    const lowerEmail = email.trim().toLowerCase();

    // existe déjà ?
    const exists = await prisma.user.findUnique({ where: { email: lowerEmail } });
    if (exists) {
      return NextResponse.json({ ok: false, error: "User already exists" }, { status: 400 });
    }

    const hashed = await hash(password, 10);

    await prisma.user.create({
      data: {
        email: lowerEmail,
        password: hashed,
        role: role === "BUSINESS" ? "BUSINESS" : "INDIVIDUAL",
      },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json({ ok: false, error: "Internal error" }, { status: 500 });
  }
}
