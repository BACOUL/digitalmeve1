// app/api/auth/verify-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // ✅ utilise un Prisma singleton

/**
 * Vérifie un token de confirmation d'email.
 * - Table: VerificationToken (email, token, type, expiresAt, ip, created_at/at)
 * - Type attendu: "email_verification" (on garde TA convention)
 * - GET: lien depuis l'email → redirige vers /verify-email?status=...&email=...
 * - POST: renvoie JSON { status }
 *
 * ENV:
 * - NEXT_PUBLIC_APP_URL (ex: https://digitalmeve.com ou ton Vercel)
 */

type VerifyStatus = "ok" | "invalid" | "expired";

function redirectToVerifyPage(status: VerifyStatus, email?: string | null) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://digitalmeve.com";
  const url = new URL(`${appUrl}/verify-email`);
  url.searchParams.set("status", status);
  if (email) url.searchParams.set("email", email);
  return NextResponse.redirect(url.toString(), 302);
}

// ✅ Ne demande plus l'email en paramètre : on résout par token
async function checkAndConsumeToken(token: string): Promise<{ status: VerifyStatus; email?: string | null }> {
  // 1) Cherche le token par sa valeur (pas besoin de l'email)
  const row = await prisma.verificationToken.findUnique({
    where: { token }, // suppose token UNIQUE (comme chez toi)
    select: { id: true, email: true, type: true, expiresAt: true },
  });

  if (!row || row.type !== "email_verification") {
    return { status: "invalid" };
  }

  // 2) Expiration ?
  if (row.expiresAt && row.expiresAt.getTime() < Date.now()) {
    // supprime le token expiré uniquement
    await prisma.verificationToken.delete({ where: { id: row.id } }).catch(() => {});
    return { status: "expired", email: row.email };
  }

  const email = (row.email || "").trim().toLowerCase();

  // 3) Active le compte si pas encore actif (on garde 'ACTIVE' comme valeur)
  await prisma.user.updateMany({
    where: { email },
    data: { status: "ACTIVE" },
  });

  // 4) Nettoie tous les tokens de ce type pour cet email
  await prisma.verificationToken
    .deleteMany({ where: { email, type: "email_verification" } })
    .catch(() => {});

  return { status: "ok", email };
}

/** GET /api/auth/verify-email?token=... */
export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token")?.trim() || "";
    if (!token) return redirectToVerifyPage("invalid");

    const { status, email } = await checkAndConsumeToken(token);
    return redirectToVerifyPage(status, email);
  } catch (e) {
    console.error("verify-email GET error:", e);
    return redirectToVerifyPage("invalid");
  }
}

/** POST /api/auth/verify-email  (body: { token }) — email inutile désormais */
export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let token = "";

    if (contentType.includes("application/json")) {
      const body = await req.json().catch(() => ({} as any));
      token = (body?.token || "").toString().trim();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const form = await req.formData();
      token = String(form.get("token") || "").trim();
    } else {
      const body = await req.json().catch(() => ({} as any));
      token = (body?.token || "").toString().trim();
    }

    if (!token) {
      return NextResponse.json({ status: "invalid" as VerifyStatus }, { status: 400 });
    }

    const { status } = await checkAndConsumeToken(token);
    return NextResponse.json({ status }, { status: 200 });
  } catch (e) {
    console.error("verify-email POST error:", e);
    return NextResponse.json({ status: "invalid" as VerifyStatus }, { status: 500 });
  }
}
