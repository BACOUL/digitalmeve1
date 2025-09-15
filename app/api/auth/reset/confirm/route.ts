// app/api/auth/reset/confirm/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";
const prisma = new PrismaClient();

/**
 * body attendu: { token: string, email: string, password: string }
 * - token doit exister dans VerificationToken, type="password_reset" et ne pas être expiré.
 * - password min 8 chars (front le force déjà).
 */
export async function POST(req: Request) {
  try {
    const { token, email, password } = await req.json().catch(() => ({}));
    if (!token || !email || !password || String(password).length < 8) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const vt = await prisma.verificationToken.findFirst({
      where: {
        email: String(email).toLowerCase(),
        token: String(token),
        type: "password_reset",
      },
    });

    if (!vt || vt.expiresAt < new Date()) {
      return NextResponse.json({ error: "Invalid or expired link" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.$transaction([
      prisma.user.update({
        where: { email: String(email).toLowerCase() },
        data: { password: passwordHash },
      }),
      prisma.verificationToken.deleteMany({
        where: { email: String(email).toLowerCase(), type: "password_reset" },
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("reset/confirm error:", err);
    return NextResponse.json({ error: "Unable to reset password" }, { status: 400 });
  }
}
