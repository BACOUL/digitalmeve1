// app/api/auth/verify-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // ✅ Prisma singleton

/**
 * Vérifie un token de confirmation d'email.
 * - Table: VerificationToken(email, token, type, createdAt, expiresAt, ip)
 * - Type attendu: "email_verification"
 * - GET: lien depuis l’email → redirige vers /verify-email?status=...&email=...
 * - POST: renvoie JSON { status }
 *
 * ENV:
 * - NEXT_PUBLIC_APP_URL (ex: https://digitalmeve.com)
 */

type VerifyStatus = "ok" | "invalid" | "expired";

function redirectToVerifyPage(status: VerifyStatus, email?: string | null) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://digitalmeve.com";
  const url = new URL(`${appUrl}/verify-email`);
  url.searchParams.set("status", status);
  if (email) url.searchParams.set("email", email);
  return NextResponse.redirect(url.toString(), 302);
}

// ✅ Résolution par token uniquement
async function checkAndConsumeToken(token: string): Promise<{ status: VerifyStatus; email?: string | null }> {
  // 1) Cherche le token
  const row = await prisma.verificationToken.findUnique({
    where: { token }, // token doit être UNIQUE dans ton schema.prisma
    select: { id: true, email: true, type: true, expiresAt: true },
  });

  if (!row || row.type !== "email_verification") {
    return { status: "invalid" };
    }

  // 2) Expiration
  if (row.expiresAt && row.expiresAt.getTime() < Date.now()) {
    await prisma.verificationToken.delete({ where: { id: row.id } }).catch(() => {});
    return { status: "expired", email: row.email };
  }

  const email = (row.email || "").trim().toLowerCase();

  // 3) (Optionnel) activer le compte si tu as une colonne status — tolérant si elle n’existe pas
  try {
    // @ts-ignore si pas de champ `status` dans User, on ignore
    await prisma.user.updateMany({ where: { email }, data: { status: "ACTIVE" } });
  } catch {}

  // 4) Nettoyage de tous les tokens de ce type
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

/** POST /api/auth/verify-email  (body: { token }) */
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
