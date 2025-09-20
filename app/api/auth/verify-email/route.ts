// app/api/auth/verify-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type VerifyStatus = "ok" | "invalid" | "expired";

/** Redirige vers /verify-email avec ?status=... (+ email optionnel) */
function redirectToVerifyPage(status: VerifyStatus, email?: string | null) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://digitalmeve.com";
  const url = new URL(`${appUrl}/verify-email`);
  url.searchParams.set("status", status);
  if (email) url.searchParams.set("email", email);
  return NextResponse.redirect(url.toString(), 302);
}

/** Vérifie et consomme un token (lookup par token uniquement). */
async function checkAndConsumeTokenByToken(token: string): Promise<{status: VerifyStatus; email?: string | null}> {
  const record = await prisma.verificationToken.findFirst({
    where: { token, type: "email_verification" },
    select: { id: true, email: true, expiresAt: true },
  });

  if (!record) return { status: "invalid" };

  if (record.expiresAt && record.expiresAt.getTime() < Date.now()) {
    // Token expiré → on le supprime
    await prisma.verificationToken.delete({ where: { id: record.id } }).catch(() => {});
    return { status: "expired", email: record.email };
  }

  // Succès → on supprime tous les tokens de ce type pour cet email
  await prisma.verificationToken
    .deleteMany({ where: { email: record.email, type: "email_verification" } })
    .catch(() => {});
  return { status: "ok", email: record.email };
}

/** GET /api/auth/verify-email?token=...  (utilisé par le lien d’email) */
export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token")?.trim() || "";
    if (!token) return redirectToVerifyPage("invalid");

    const { status, email } = await checkAndConsumeTokenByToken(token);
    return redirectToVerifyPage(status, email || undefined);
  } catch (e) {
    console.error("verify-email GET error:", e);
    return redirectToVerifyPage("invalid");
  }
}

/** POST /api/auth/verify-email  (body: { token }) → { status } */
export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let token = "";

    if (contentType.includes("application/json")) {
      const body = (await req.json().catch(() => ({}))) as any;
      token = (body?.token || "").toString().trim();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const form = await req.formData();
      token = String(form.get("token") || "").trim();
    } else {
      const body = (await req.json().catch(() => ({}))) as any;
      token = (body?.token || "").toString().trim();
    }

    if (!token) {
      return NextResponse.json({ status: "invalid" as VerifyStatus }, { status: 400 });
    }

    const { status } = await checkAndConsumeTokenByToken(token);
    return NextResponse.json({ status }, { status: 200 });
  } catch (e) {
    console.error("verify-email POST error:", e);
    return NextResponse.json({ status: "invalid" as VerifyStatus }, { status: 500 });
  }
}
