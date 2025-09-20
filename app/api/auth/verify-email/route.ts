// app/api/auth/verify-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

type VerifyStatus = "ok" | "invalid" | "expired";

function redirectToVerifyPage(status: VerifyStatus, email?: string | null) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://digitalmeve1.vercel.app";
  const url = new URL(`${appUrl}/verify-email`);
  url.searchParams.set("status", status);
  if (email) url.searchParams.set("email", email);
  return NextResponse.redirect(url.toString(), 302);
}

async function consumeTokenAndVerify(token: string): Promise<{status: VerifyStatus; email?: string | null}> {
  const rec = await prisma.verificationToken.findFirst({
    where: { token, type: "email_verification" },
    select: { id: true, email: true, expiresAt: true },
  });
  if (!rec) return { status: "invalid" };

  if (rec.expiresAt && rec.expiresAt.getTime() < Date.now()) {
    await prisma.verificationToken.delete({ where: { id: rec.id } }).catch(() => {});
    return { status: "expired", email: rec.email };
  }

  // Marque l'utilisateur comme vérifié
  await prisma.user.updateMany({
    where: { email: rec.email.toLowerCase() },
    data: { emailVerified: true, verifiedAt: new Date(), updatedAt: new Date() },
  });

  // Supprime tous les tokens restants pour cet email
  await prisma.verificationToken.deleteMany({
    where: { email: rec.email, type: "email_verification" },
  });

  return { status: "ok", email: rec.email };
}

// GET /api/auth/verify-email?token=...
export async function GET(req: NextRequest) {
  try {
    const token = req.nextUrl.searchParams.get("token")?.trim() || "";
    if (!token) return redirectToVerifyPage("invalid");
    const { status, email } = await consumeTokenAndVerify(token);
    return redirectToVerifyPage(status, email);
  } catch (e) {
    console.error("verify-email GET error:", e);
    return redirectToVerifyPage("invalid");
  }
}

// POST /api/auth/verify-email { token } → { status }
export async function POST(req: Request) {
  try {
    const { token = "" } = await req.json().catch(() => ({}));
    if (!token) return NextResponse.json({ status: "invalid" as VerifyStatus }, { status: 400 });
    const { status } = await consumeTokenAndVerify(token);
    return NextResponse.json({ status }, { status: 200 });
  } catch (e) {
    console.error("verify-email POST error:", e);
    return NextResponse.json({ status: "invalid" as VerifyStatus }, { status: 500 });
  }
}
