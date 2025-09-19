// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email"; // ← ICI: on importe sendEmail (pas sendEmailNero)

export const runtime = "nodejs";

/**
 * Flux :
 * - POST { email, password }
 * - Création User si inexistant (ou 409 si email déjà pris)
 * - Génération token "email_verification" (24h) + envoi email via SMTP (Nero) via sendEmail()
 * - Réponse neutre (pas d’info sensible)
 *
 * ENV:
 * - SMTP_HOST / SMTP_PORT / SMTP_USER / SMTP_PASS
 * - EMAIL_FROM (ex: 'DigitalMeve <no-reply@digitalmeve.com>')
 * - NEXT_PUBLIC_APP_URL (ex: 'https://digitalmeve1.vercel.app')
 */

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let email = "";
    let password = "";

    if (contentType.includes("application/json")) {
      const body = await req.json().catch(() => ({}));
      email = (body?.email || "").toString().trim().toLowerCase();
      password = (body?.password || "").toString();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const form = await req.formData();
      email = String(form.get("email") || "").trim().toLowerCase();
      password = String(form.get("password") || "");
    } else {
      const body = await req.json().catch(() => ({}));
      email = (body?.email || "").toString().trim().toLowerCase();
      password = (body?.password || "").toString();
    }

    // Validation basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!email || !emailRegex.test(email) || !password || password.length < 8) {
      return NextResponse.json(
        { ok: false, error: "Invalid email or password (min 8 chars)." },
        { status: 400 }
      );
    }

    // Email déjà pris ?
    const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } });
    if (existing) {
      return NextResponse.json(
        { ok: false, error: "Email already registered." },
        { status: 409 }
      );
    }

    // Création user
    const hash = await bcrypt.hash(password, 12);
    await prisma.user.create({
      data: {
        email,
        password: hash,
      },
    });

    // Invalide anciens tokens
    await prisma.verificationToken.deleteMany({
      where: { email, type: "email_verification" },
    });

    // Nouveau token (24h)
    const token = crypto.randomBytes(32).toString("base64url");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.verificationToken.create({
      data: {
        email,
        token,
        type: "email_verification",
        expiresAt,
        ip: (req.headers.get("x-forwarded-for") || "").split(",")[0]?.trim() || "unknown",
      },
    });

    // Lien de vérification
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://digitalmeve.com";
    const verifyUrl = new URL(`${appUrl}/verify-email`);
    verifyUrl.searchParams.set("token", token);

    // Corps email
    const html = renderVerifyEmailHTML({
      verifyUrl: verifyUrl.toString(),
      email,
      appName: "DigitalMeve",
    });

    const from = process.env.EMAIL_FROM || "DigitalMeve <no-reply@digitalmeve.com>";

    // Envoi via SMTP (Nero) – via sendEmail()
    try {
      await sendEmail({
        to: email,
        subject: "Confirm your email",
        html,
        text: `Confirm your email: ${verifyUrl.toString()}`,
        from,
      });
    } catch (e) {
      console.error("[REGISTER] SMTP send error:", e);
      // On n’échoue pas le flux côté client pour éviter de révéler la config
    }

    return NextResponse.json(
      { ok: true, message: "Account created. Check your email to verify." },
      { status: 200 }
    );
  } catch (e) {
    console.error("[REGISTER] error:", e);
    return NextResponse.json({ ok: false, error: "Unable to register." }, { status: 500 });
  }
}

/** -------- Email HTML (dark) -------- */
function renderVerifyEmailHTML({
  verifyUrl,
  email,
  appName,
}: {
  verifyUrl: string;
  email: string;
  appName: string;
}) {
  return `<!doctype html>
<html>
  <head>
    <meta name="color-scheme" content="dark light">
    <meta name="supported-color-schemes" content="dark light">
    <meta charset="utf-8">
    <title>${escapeHtml(appName)} – Verify your email</title>
  </head>
  <body style="background:#0b1220;color:#e6f1ff;font-family:Inter,system-ui,Arial,sans-serif;padding:24px">
    <table role="presentation" width="100%" style="max-width:560px;margin:auto;background:#0f172a;border:1px solid #1f2a44;border-radius:16px;padding:24px">
      <tr><td>
        <h1 style="margin:0 0 8px 0;font-size:22px;line-height:1.3;color:#e6f1ff;">Verify your email</h1>
        <p style="margin:0 0 16px 0;font-size:14px;color:#c7d2fe;">
          Hi, we just need to confirm <strong>${escapeHtml(email)}</strong> belongs to you.
        </p>

        <a href="${verifyUrl}"
           style="display:inline-block;margin-top:8px;background:linear-gradient(90deg,#10b981,#0ea5e9);color:#0b1220;text-decoration:none;padding:12px 16px;border-radius:10px;font-weight:600">
          Confirm email
        </a>

        <p style="margin:16px 0 0 0;font-size:12px;color:#93a4bf;">
          This link expires in 24 hours. If you didn’t request this, you can safely ignore this email.
        </p>

        <hr style="border:none;border-top:1px solid #1f2a44;margin:20px 0" />

        <p style="margin:0;font-size:12px;color:#8aa0c6;word-break:break-all">
          Or paste this URL in your browser:<br/>
          <span>${escapeHtml(verifyUrl)}</span>
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
