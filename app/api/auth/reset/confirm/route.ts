// app/api/auth/reset/confirm/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

/**
 * POST { token, email, password }
 * - Vérifie token `password_reset` non expiré
 * - Met à jour password (bcrypt)
 * - Supprime tous les tokens `password_reset` de cet email
 */
export async function POST(req: Request) {
  try {
    const { token = "", email = "", password = "" } = await req.json().catch(() => ({}));
    const valueEmail = String(email).trim().toLowerCase();
    const valueToken = String(token).trim();
    const valuePass = String(password);

    if (!valueEmail || !valueToken || valuePass.length < 8) {
      return NextResponse.json({ ok: false, error: "Invalid payload." }, { status: 400 });
    }

    // 1) Token check
    const record = await prisma.verificationToken.findFirst({
      where: {
        email: valueEmail,
        token: valueToken,
        type: "password_reset",
        expiresAt: { gt: new Date() },
      },
      select: { id: true, email: true },
    });

    if (!record) {
      return NextResponse.json({ ok: false, error: "Invalid or expired link." }, { status: 400 });
    }

    // 2) Update password
    const hash = await bcrypt.hash(valuePass, 12);
    await prisma.user.update({
      where: { email: valueEmail },
      data: { password: hash },
    });

    // 3) Consume tokens
    await prisma.verificationToken.deleteMany({
      where: { email: valueEmail, type: "password_reset" },
    });

    return NextResponse.json({ ok: true, message: "Password updated." }, { status: 200 });
  } catch (e) {
    console.error("[RESET CONFIRM] error:", e);
    return NextResponse.json({ ok: false, error: "Unable to reset password." }, { status: 500 });
  }
}
