// app/api/auth/reset/confirm/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";
const prisma = new PrismaClient();

/**
 * Body attendu (JSON ou x-www-form-urlencoded) :
 * - email: string
 * - token: string
 * - password: string (nouveau mot de passe)
 *
 * Réponse : toujours 200 (évite l’énumération d’emails / tokens).
 */
export async function POST(req: Request) {
  try {
    const ct = (req.headers.get("content-type") || "").toLowerCase();

    let email = "", token = "", password = "";
    if (ct.includes("application/json")) {
      const body = await req.json().catch(() => ({}));
      email = (body?.email || "").toString().trim().toLowerCase();
      token = (body?.token || "").toString().trim();
      password = (body?.password || "").toString();
    } else if (ct.includes("application/x-www-form-urlencoded")) {
      const form = await req.formData();
      email = String(form.get("email") || "").trim().toLowerCase();
      token = String(form.get("token") || "").trim();
      password = String(form.get("password") || "");
    } else {
      const body = await req.json().catch(() => ({}));
      email = (body?.email || "").toString().trim().toLowerCase();
      token = (body?.token || "").toString().trim();
      password = (body?.password || "").toString();
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!email || !emailRegex.test(email) || !token || !password) {
      return NextResponse.json({ ok: true, message: "If valid, your password has been updated." });
    }

    if (password.length < 8) {
      // On reste générique pour éviter les leaks
      return NextResponse.json({ ok: true, message: "If valid, your password has been updated." });
    }

    // Récupération du token
    const vt = await prisma.verificationToken.findFirst({
      where: { email, token, type: "password_reset" },
    });

    // Vérification basique token + expiration
    if (!vt || !vt.expiresAt || vt.expiresAt.getTime() < Date.now()) {
      return NextResponse.json({ ok: true, message: "If valid, your password has been updated." });
    }

    // Hash du nouveau mot de passe
    const hash = await bcrypt.hash(password, 12);

    // Update + purge token dans une transaction
    await prisma.$transaction([
      prisma.user.update({
        where: { email },
        data: { password: hash },
      }),
      prisma.verificationToken.deleteMany({
        where: { email, type: "password_reset" },
      }),
    ]);

    return NextResponse.json({ ok: true, message: "If valid, your password has been updated." });
  } catch (err) {
    console.error("reset/confirm error:", err);
    return NextResponse.json({ ok: true, message: "If valid, your password has been updated." });
  }
}
