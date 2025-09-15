// app/api/auth/verify-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Vérifie un token de confirmation d'email.
 * - Stockage côté DB : table VerificationToken (email, token, type, expiresAt, ip)
 * - Pas de champ emailVerifiedAt sur User → on se contente d’invalider le token et de retourner un statut.
 * - GET : utilisé par le lien dans l’email → redirige vers /verify-email?status=...
 * - POST : utile si tu veux vérifier depuis un formulaire → renvoie JSON {status}
 *
 * ENV utiles :
 * - NEXT_PUBLIC_APP_URL (par défaut https://digitalmeve.com)
 */

type VerifyStatus = "ok" | "invalid" | "expired";

function redirectToVerifyPage(status: VerifyStatus, email?: string | null) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://digitalmeve.com";
  const url = new URL(`${appUrl}/verify-email`);
  url.searchParams.set("status", status);
  if (email) url.searchParams.set("email", email);
  return NextResponse.redirect(url.toString(), 302);
}

async function checkAndConsumeToken(email: string, token: string): Promise<VerifyStatus> {
  // On cherche le token
  const record = await prisma.verificationToken.findFirst({
    where: { email, token, type: "email_verification" },
    select: { id: true, expiresAt: true, email: true },
  });

  if (!record) return "invalid";
  if (record.expiresAt && record.expiresAt.getTime() < Date.now()) {
    // Token expiré → on le supprime
    await prisma.verificationToken.delete({ where: { id: record.id } }).catch(() => {});
    return "expired";
  }

  // Succès → on supprime tous les tokens de ce type pour cet email
  await prisma.verificationToken
    .deleteMany({ where: { email, type: "email_verification" } })
    .catch(() => {});
  return "ok";
}

/** GET /api/auth/verify-email?token=...&email=... */
export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token")?.trim() || "";
    const email = req.nextUrl.searchParams.get("email")?.trim().toLowerCase() || "";

    if (!token || !email) return redirectToVerifyPage("invalid");

    const status = await checkAndConsumeToken(email, token);
    return redirectToVerifyPage(status, email);
  } catch (e) {
    console.error("verify-email GET error:", e);
    return redirectToVerifyPage("invalid");
  }
}

/** POST /api/auth/verify-email  (body: { email, token }) */
export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let email = "";
    let token = "";

    if (contentType.includes("application/json")) {
      const body = await req.json().catch(() => ({} as any));
      email = (body?.email || "").toString().trim().toLowerCase();
      token = (body?.token || "").toString().trim();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const form = await req.formData();
      email = String(form.get("email") || "").trim().toLowerCase();
      token = String(form.get("token") || "").trim();
    } else {
      const body = await req.json().catch(() => ({} as any));
      email = (body?.email || "").toString().trim().toLowerCase();
      token = (body?.token || "").toString().trim();
    }

    if (!email || !token) {
      return NextResponse.json({ status: "invalid" as VerifyStatus }, { status: 400 });
    }

    const status = await checkAndConsumeToken(email, token);
    return NextResponse.json({ status }, { status: 200 });
  } catch (e) {
    console.error("verify-email POST error:", e);
    return NextResponse.json({ status: "invalid" as VerifyStatus }, { status: 500 });
  }
}
