// app/api/auth/reset/request/route.ts
import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { PrismaClient } from "@prisma/client";

export const runtime = "nodejs"; // on veut l'environnement Node (crypto, etc.)
const prisma = new PrismaClient();

/**
 * ENV attendues :
 * - RESEND_API_KEY
 * - EMAIL_FROM (ex: 'DigitalMeve <no-reply@digitalmeve.com>')
 * - NEXT_PUBLIC_APP_URL (ex: 'https://digitalmeve.com')
 *
 * Notes sécurité :
 * - Toujours répondre 200 (pas d'énumération d’emails).
 * - On invalide les anciens tokens pour cet email (type = "password_reset").
 * - Expiration du token: 60 minutes.
 */
export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let email = "";

    if (contentType.includes("application/json")) {
      const body = await req.json().catch(() => ({}));
      email = (body?.email || "").toString().trim().toLowerCase();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const form = await req.formData();
      email = String(form.get("email") || "").trim().toLowerCase();
    } else {
      const body = await req.json().catch(() => ({}));
      email = (body?.email || "").toString().trim().toLowerCase();
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ ok: true, message: "If the address exists, a reset email will be sent." });
    }

    // On tente de trouver l’utilisateur mais on ne révèle jamais le résultat
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    // Même si l'utilisateur n'existe pas, on répond 200
    if (!user) {
      return NextResponse.json({ ok: true, message: "If the address exists, a reset email will be sent." });
    }

    // Invalider anciens tokens reset
    await prisma.verificationToken.deleteMany({
      where: { email, type: "password_reset" },
    });

    // Générer un token + stocker
    const tokenRaw = crypto.randomBytes(32).toString("base64url");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 60 minutes
    await prisma.verificationToken.create({
      data: {
        email,
        token: tokenRaw,
        type: "password_reset",
        expiresAt,
      },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://digitalmeve.com";
    const resetUrl = new URL(`${appUrl}/reset/confirm`);
    resetUrl.searchParams.set("token", tokenRaw);
    resetUrl.searchParams.set("email", email);

    // Envoi email via Resend
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const EMAIL_FROM = process.env.EMAIL_FROM || "DigitalMeve <no-reply@digitalmeve.com>";

    if (RESEND_API_KEY) {
      const html = renderResetEmailHTML({ resetUrl: resetUrl.toString(), email, appName: "DigitalMeve" });

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: EMAIL_FROM,
          to: [email],
          subject: "Reset your password",
          html,
          text: `Reset your password: ${resetUrl.toString()}`,
        }),
      }).catch(() => {});
    } else {
      console.error("Missing RESEND_API_KEY — reset email not sent");
    }

    return NextResponse.json({ ok: true, message: "If the address exists, a reset email will be sent." });
  } catch (err) {
    console.error("reset/request error:", err);
    return NextResponse.json({ ok: true, message: "If the address exists, a reset email will be sent." });
  }
}

function renderResetEmailHTML({
  resetUrl,
  email,
  appName,
}: {
  resetUrl: string;
  email: string;
  appName: string;
}) {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="color-scheme" content="dark light">
    <meta name="supported-color-schemes" content="dark light">
    <title>${escapeHtml(appName)} – Reset your password</title>
  </head>
  <body style="background:#0b1220;color:#e6f1ff;font-family:Inter,system-ui,Arial,sans-serif;padding:24px">
    <table role="presentation" width="100%" style="max-width:560px;margin:auto;background:#0f172a;border:1px solid #1f2a44;border-radius:16px;padding:24px">
      <tr><td>
        <h1 style="margin:0 0 8px 0;font-size:22px;line-height:1.3;color:#e6f1ff;">Reset your password</h1>
        <p style="margin:0 0 16px 0;font-size:14px;color:#c7d2fe;">
          We received a request to reset the password for <strong>${escapeHtml(email)}</strong>.
        </p>
        <a href="${resetUrl}" style="display:inline-block;margin-top:8px;background:linear-gradient(90deg,#10b981,#0ea5e9);color:#0b1220;text-decoration:none;padding:12px 16px;border-radius:10px;font-weight:600">
          Create a new password
        </a>
        <p style="margin:16px 0 0 0;font-size:12px;color:#93a4bf;">
          This link expires in 60 minutes. If you didn’t request this, you can safely ignore this email.
        </p>
        <hr style="border:none;border-top:1px solid #1f2a44;margin:20px 0" />
        <p style="margin:0;font-size:12px;color:#8aa0c6;word-break:break-all">
          Or paste this URL in your browser:<br/>
          <span>${escapeHtml(resetUrl)}</span>
        </p>
        <p style="margin:24px 0 0 0;font-size:11px;color:#6e85a6">
          © ${new Date().getFullYear()} ${escapeHtml(appName)} — All rights reserved.
        </p>
      </td></tr>
    </table>
  </body>
</html>`;
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
