// app/api/auth/forgot-password/route.ts
import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

/**
 * POST { email }
 * - Répond TOUJOURS 200 (anti-enumératon)
 * - Crée un token type "password_reset" (60 min)
 * - Envoie un email via Resend si RESEND_API_KEY existe; sinon log le lien en console
 *
 * ENV:
 * - NEXT_PUBLIC_APP_URL
 * - RESEND_API_KEY (optionnel en dev)
 * - EMAIL_FROM (ex: 'DigitalMeve <no-reply@digitalmeve.com>')
 */
export async function POST(req: Request) {
  try {
    const { email = "" } = await req.json().catch(() => ({}));
    const value = String(email).trim().toLowerCase();

    // Toujours 200
    const done = () =>
      NextResponse.json(
        { ok: true, message: "If the address exists, a reset email has been sent." },
        { status: 200 }
      );

    // Validation grossière
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!value || !emailRegex.test(value)) return done();

    // L’utilisateur existe ?
    const user = await prisma.user.findUnique({ where: { email: value }, select: { id: true } });
    if (!user) return done();

    // Invalide anciens tokens password_reset
    await prisma.verificationToken.deleteMany({
      where: { email: value, type: "password_reset" },
    });

    // Nouveau token (60 min)
    const token = crypto.randomBytes(32).toString("base64url");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.verificationToken.create({
      data: {
        email: value,
        token,
        type: "password_reset",
        expiresAt,
        ip:
          (req.headers.get("x-forwarded-for") || "").split(",")[0]?.trim() ||
          req.headers.get("x-real-ip") ||
          "unknown",
      },
    });

    // Compose URL reset
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://digitalmeve.com";
    const resetUrl = new URL(`${appUrl}/reset`);
    resetUrl.searchParams.set("token", token);
    resetUrl.searchParams.set("email", value);

    const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
    const EMAIL_FROM = process.env.EMAIL_FROM || "DigitalMeve <no-reply@digitalmeve.com>";

    const html = renderResetEmailHTML({
      resetUrl: resetUrl.toString(),
      email: value,
      appName: "DigitalMeve",
    });

    if (!RESEND_API_KEY) {
      console.log("[FORGOT][DEV] Reset link:", resetUrl.toString());
      return done();
    }

    // Envoi via Resend
    const sendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: [value],
        subject: "Reset your password",
        html,
        text: `Reset your password: ${resetUrl.toString()}`,
      }),
    });

    if (!sendRes.ok) {
      const text = await sendRes.text().catch(() => "");
      console.error("[FORGOT] Resend error:", sendRes.status, text);
    }

    return done();
  } catch (e) {
    console.error("[FORGOT] error:", e);
    // Toujours 200
    return NextResponse.json(
      { ok: true, message: "If the address exists, a reset email has been sent." },
      { status: 200 }
    );
  }
}

/** --- Email HTML --- */
function renderResetEmailHTML({ resetUrl, email, appName }: { resetUrl: string; email: string; appName: string }) {
  return `<!doctype html>
<html>
<head>
  <meta name="color-scheme" content="dark light">
  <meta charset="utf-8">
  <title>${escapeHtml(appName)} – Reset your password</title>
</head>
<body style="background:#0b1220;color:#e6f1ff;font-family:Inter,system-ui,Arial,sans-serif;padding:24px">
  <table role="presentation" width="100%" style="max-width:560px;margin:auto;background:#0f172a;border:1px solid #1f2a44;border-radius:16px;padding:24px">
    <tr><td>
      <h1 style="margin:0 0 8px 0;font-size:22px;line-height:1.3;color:#e6f1ff;">Reset your password</h1>
      <p style="margin:0 0 16px 0;font-size:14px;color:#c7d2fe;">Hi, we received a request to reset the password for <strong>${escapeHtml(
        email
      )}</strong>.</p>
      <a href="${resetUrl}" style="display:inline-block;margin-top:8px;background:linear-gradient(90deg,#10b981,#0ea5e9);color:#0b1220;text-decoration:none;padding:12px 16px;border-radius:10px;font-weight:600">Choose a new password</a>
      <p style="margin:16px 0 0 0;font-size:12px;color:#93a4bf;">This link expires in 60 minutes. If you didn’t request this, ignore this email.</p>
      <hr style="border:none;border-top:1px solid #1f2a44;margin:20px 0" />
      <p style="margin:0;font-size:12px;color:#8aa0c6;word-break:break-all">
        Or paste this URL in your browser:<br/><span>${escapeHtml(resetUrl)}</span>
      </p>
      <p style="margin:24px 0 0 0;font-size:11px;color:#6e85a6">© ${new Date().getFullYear()} ${escapeHtml(
        appName
      )} — All rights reserved.</p>
    </td></tr>
  </table>
</body>
</html>`;
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
                               }
