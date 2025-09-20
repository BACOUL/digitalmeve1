// app/api/auth/verify-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type VerifyStatus = "ok" | "invalid" | "expired";

// redirige vers la page /verify-email avec le statut (+ email optionnel)
function redirectToVerifyPage(status: VerifyStatus, email?: string | null) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://digitalmeve.com";
  const url = new URL(`${appUrl}/verify-email`);
  url.searchParams.set("status", status);
  if (email) url.searchParams.set("email", email);
  return NextResponse.redirect(url.toString(), 302);
}

// vérifie le token (par token uniquement), supprime le token et marque l'utilisateur vérifié
async function verifyByToken(token: string): Promise<{ status: VerifyStatus; email?: string | null }> {
  const rec = await prisma.verificationToken.findFirst({
    where: { token, type: "email_verification" },
    select: { id: true, email: true, expiresAt: true },
  });

  if (!rec) return { status: "invalid" };

  if (rec.expiresAt && rec.expiresAt.getTime() < Date.now()) {
    await prisma.verificationToken.delete({ where: { id: rec.id } }).catch(() => {});
    return { status: "expired", email: rec.email };
  }

  // supprime tous les tokens de vérif pour cet email
  await prisma.verificationToken.deleteMany({
    where: { email: rec.email, type: "email_verification" },
  }).catch(() => {});

  // ✅ marque l'utilisateur comme vérifié
  await prisma.user.update({
    where: { email: rec.email },
    data: {
      emailVerified: true,         // booléen (ou Date si tu as un champ Date)
      verifiedAt: new Date(),      // si ta colonne existe (TIMESTAMPTZ côté Neon)
    },
  }).catch(() => {});

  return { status: "ok", email: rec.email };
}

// GET /api/auth/verify-email?token=...
export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token")?.trim() || "";
    if (!token) return redirectToVerifyPage("invalid");

    const { status, email } = await verifyByToken(token);
    return redirectToVerifyPage(status, email);
  } catch (e) {
    console.error("verify-email GET error:", e);
    return redirectToVerifyPage("invalid");
  }
}

// POST /api/auth/verify-email  (body: { token }) → { status }
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

    if (!token) return NextResponse.json({ status: "invalid" as VerifyStatus }, { status: 400 });

    const { status } = await verifyByToken(token);
    return NextResponse.json({ status }, { status: 200 });
  } catch (e) {
    console.error("verify-email POST error:", e);
    return NextResponse.json({ status: "invalid" as VerifyStatus }, { status: 500 });
  }
}
