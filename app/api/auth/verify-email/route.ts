// app/api/auth/verify-email/route.ts
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * POST:
 *  - JSON { token, email }
 *  - ou form-data token,email
 */
export async function POST(req: Request) {
  try {
    const ct = req.headers.get("content-type") || "";
    let token = "";
    let email = "";

    if (ct.includes("application/json")) {
      const body = await req.json().catch(() => ({}));
      token = (body?.token || "").toString();
      email = (body?.email || "").toString().toLowerCase();
    } else {
      const form = await req.formData();
      token = String(form.get("token") || "");
      email = String(form.get("email") || "").toLowerCase();
    }

    if (!token || !email) {
      return NextResponse.json({ ok: false, status: "invalid" }, { status: 400 });
    }

    const now = new Date();
    const vt = await prisma.verificationToken.findFirst({
      where: {
        email,
        token,
        type: "email_verification",
        expiresAt: { gt: now }
      },
      select: { id: true }
    });

    if (!vt) {
      return NextResponse.json({ ok: false, status: "invalid" }, { status: 200 });
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { email },
        data: { emailVerifiedAt: now }
      }),
      prisma.verificationToken.deleteMany({
        where: { email, type: "email_verification" }
      })
    ]);

    return NextResponse.json({ ok: true, status: "ok" }, { status: 200 });
  } catch (e) {
    console.error("verify-email POST error:", e);
    return NextResponse.json({ ok: false, status: "invalid" }, { status: 200 });
  }
}
