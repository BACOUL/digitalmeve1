// app/api/auth/verify-email/resend/route.ts
import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * ENV attendues :
 * - RESEND_API_KEY                (clé API Resend)
 * - EMAIL_FROM                    (ex: 'DigitalMeve <no-reply@digitalmeve.com>')
 * - NEXT_PUBLIC_APP_URL           (ex: 'https://digitalmeve.com')
 *
 * Notes:
 * - Réponse toujours 200 pour éviter l’énumération d’emails.
 * - On invalide les anciens tokens de vérification pour cet email.
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
      // tentative simple: on essaie quand même JSON
      const body = await req.json().catch(() => ({}));
      email = (body?.email || "").toString().trim().toLowerCase();
    }

    // Validation minimale de l'email
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!email || !emailRegex.test(email)) {
      // On renvoie 200 + message générique pour ne rien révéler
      return NextResponse.json(
        { ok: true, message: "If the address exists, a verification email will be sent." },
        { status: 200 }
      );
    }

    // Récupère l’IP pour logs (best-effort)
    const ip =
      (req.headers.get("x-forwarded-for") || "").split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // Vérifie si l'utilisateur existe — ne JAMAIS révéler le résultat
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, emailVerifiedAt: true },
    });

    // Toujours répondre 200 même si l'utilisateur n'existe pas
    if (!user) {
      return NextResponse.json(
        { ok: true, message: "If the address exists, a verification email will be sent." },
        { status: 200 }
      );
    }

    // Invalide les précédents tokens de vérification pour cet email
    await prisma.verificationToken.deleteMany({
      where: { email, type: "email_verification" },
    });

    // Génère un nouveau token (base64url) + hashable si besoin
    const tokenRaw = crypto.randomBytes(32).toString("base64url");

    // Stocke le token (en clair ici pour simplicité; en prod, vous pouvez stocker un hash)
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 60 min
    await prisma.verificationToken.create({
      data: {
        email,
        token: tokenRaw,
        type: "email_verification",
        expiresAt,
        ip,
      },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://digitalmeve.com";
    const verifyUrl = new URL(`${appUrl}/verify-email`);
    verifyUrl.searchParams.set("token", tokenRaw);
    verifyUrl.searchParams.set("email", email);

    // Envoi email via Resend
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const EMAIL_FROM = process.env.EMAIL_FROM || "DigitalMeve <no-reply@digitalmeve.com>";

    if (!RESEND_API_KEY) {
      // On log côté serveur; on répond quand même 200 pour ne rien révéler
      console.error("Missing RESEND_API_KEY — email not sent");
      return NextResponse.json(
        { ok: true, message: "If the address exists, a verification email will be sent." },
        { status: 200 }
      );
    }

    // Appel Resend (HTTP direct pour éviter dépendance SDK)
    const html = renderVerifyEmailHTML({
      verifyUrl: verifyUrl.toString(),
      email,
      appName: "DigitalMeve",
    });

    const sendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: [email],
        subject: "Confirm your email",
        html,
        text: `Confirm your email: ${verifyUrl.toString()}`,
      }),
    });

    if (!sendRes.ok) {
      const errText = await sendRes.text().catch(() => "");
      console.error("Resend error:", sendRes.status, errText);
      // Toujours réponse 200 (pas d’info leak)
      return NextResponse.json(
        { ok: true, message: "If the address exists, a verification email will be sent." },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { ok: true, message: "If the address exists, a verification email will be sent." },
      { status: 200 }
    );
  } catch (err) {
    console.error("verify-email/resend error:", err);
    // Réponse générique
    return NextResponse.json(
      { ok: true, message: "If the address exists, a verification email will be sent." },
      { status: 200 }
    );
  }
}

/** -------- Email HTML (dark, conforme à notre charte) -------- */
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
      <tr>
        <td>
          <h1 style="margin:0 0 8px 0;font-size:22px;line-height:1.3;color:#e6f1ff;">Verify your email</h1>
          <p style="margin:0 0 16px 0;font-size:14px;color:#c7d2fe;">
            Hi, we just need to confirm <strong>${escapeHtml(email)}</strong> belongs to you.
          </p>

          <a href="${verifyUrl}"
             style="display:inline-block;margin-top:8px;background:linear-gradient(90deg,#10b981,#0ea5e9);color:#0b1220;text-decoration:none;padding:12px 16px;border-radius:10px;font-weight:600">
            Confirm email
          </a>

          <p style="margin:16px 0 0 0;font-size:12px;color:#93a4bf;">
            This link expires in 60 minutes. If you didn’t request this, you can safely ignore this email.
          </p>

          <hr style="border:none;border-top:1px solid #1f2a44;margin:20px 0" />

          <p style="margin:0;font-size:12px;color:#8aa0c6;word-break:break-all">
            Or paste this URL in your browser:<br/>
            <span>${escapeHtml(verifyUrl)}</span>
          </p>

          <p style="margin:24px 0 0 0;font-size:11px;color:#6e85a6">
            © ${new Date().getFullYear()} ${escapeHtml(appName)} — All rights reserved.
          </p>
        </td>
      </tr>
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
