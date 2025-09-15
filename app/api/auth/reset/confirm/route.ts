// app/api/auth/reset/confirm/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export const runtime = "nodejs"; // bcryptjs OK côté Node
const prisma = new PrismaClient();

/**
 * Reçoit: { email, token, password }
 * - Valide le token (existe, type=password_reset, non expiré, email match)
 * - Hash le mot de passe et met à jour l'utilisateur
 * - Invalide tous les tokens "password_reset" pour cet email
 */
export async function POST(req: Request) {
  try {
    // 1) Lire le corps (JSON ou x-www-form-urlencoded)
    const contentType = req.headers.get("content-type") || "";
    let email = "";
    let token = "";
    let password = "";

    if (contentType.includes("application/json")) {
      const body = await req.json().catch(() => ({}));
      email = String(body?.email || "").trim().toLowerCase();
      token = String(body?.token || "").trim();
      password = String(body?.password || "");
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const form = await req.formData();
      email = String(form.get("email") || "").trim().toLowerCase();
      token = String(form.get("token") || "").trim();
      password = String(form.get("password") || "");
    } else {
      const body = await req.json().catch(() => ({}));
      email = String(body?.email || "").trim().toLowerCase();
      token = String(body?.token || "").trim();
      password = String(body?.password || "");
    }

    // 2) Validations minimales
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email." },
        { status: 400 },
      );
    }
    if (!token) {
      return NextResponse.json(
        { ok: false, error: "Missing token." },
        { status: 400 },
      );
    }
    if (typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { ok: false, error: "Password must be at least 8 characters." },
        { status: 400 },
      );
    }

    // 3) Récupérer le token
    const vt = await prisma.verificationToken.findFirst({
      where: {
        email,
        token,
        type: "password_reset",
      },
    });

    if (!vt) {
      return NextResponse.json(
        { ok: false, error: "Invalid or already used token." },
        { status: 400 },
      );
    }

    // 4) Vérifier expiration
    const now = new Date();
    if (vt.expiresAt && vt.expiresAt.getTime() < now.getTime()) {
      // Token expiré -> on le supprime pour propreté
      await prisma.verificationToken.deleteMany({
        where: { email, type: "password_reset" },
      });
      return NextResponse.json(
        { ok: false, error: "This link has expired. Please request a new reset email." },
        { status: 400 },
      );
    }

    // 5) Vérifier que l'utilisateur existe (sécurité: on peut répondre générique,
    //    mais ici on a déjà un token valide -> on peut être explicite)
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
    if (!user) {
      // Nettoyage conservateur des tokens
      await prisma.verificationToken.deleteMany({
        where: { email, type: "password_reset" },
      });
      return NextResponse.json(
        { ok: false, error: "User not found." },
        { status: 404 },
      );
    }

    // 6) Hash + update
    const hash = await bcrypt.hash(password, 12);

    await prisma.$transaction([
      prisma.user.update({
        where: { email },
        data: { password: hash },
      }),
      prisma.verificationToken.deleteMany({
        where: { email, type: "password_reset" },
      }),
    ]);

    return NextResponse.json({ ok: true, message: "Password updated successfully." });
  } catch (err) {
    console.error("reset/confirm error:", err);
    return NextResponse.json(
      { ok: false, error: "Unexpected error." },
      { status: 500 },
    );
  }
}
