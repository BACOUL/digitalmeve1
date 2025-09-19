// app/api/auth/verify-email/resend/route.ts
import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { prisma } from "@/lib/prisma"; // ✅ Prisma singleton

/**
 * ENV requises :
 * - RESEND_API_KEY (optionnel en dev/preview : on logge le lien)
 * - EMAIL_FROM (ex: 'DigitalMeve <no-reply@digitalmeve.com>')
 * - NEXT_PUBLIC_APP_URL (ex: 'https://digitalmeve.com' ou ton Vercel)
 *
 * Politique :
 * - Toujours répondre 200 pour éviter l’énumération d’emails.
 * - Throttle : 60s entre deux envois + plafond 5/jour/email.
 * - On invalide les anciens tokens avant d’en créer un nouveau.
 * - Token valable 24h. L’URL contient UNIQUEMENT le token (pas l’email).
 */
export const runtime = "nodejs";

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

    // Validation simple (mais on renvoie 200 quoiqu’il arrive)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(okResp(), { status: 200 });
    }

    // IP best-effort (pour logs / throttling avancé)
    const ip =
      (req.headers.get("x-forwarded-for") || "").split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // Vérifie l’existence de l’utilisateur (sans rien révéler)
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
    if (!user) {
      return NextResponse.json(okResp(), { status: 200 });
    }

    // —— Throttle & quotas ——
    const since = new Date(Date.now() - 60_000); // 60s
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 1) Dernier envoi récent (<60s)
    const recent = await prisma.verificationToken.findFirst({
      where: {
        email,
        type: "email_verification",
        // @ts-ignore (schéma snake_case)
        created_at: { gt: since },
      },
      select: { id: true },
    });
    if (recent) {
      return NextResponse.json(okResp("Please wait before retrying."), { status: 200 });
    }

    // 2) Max 5 envois dans la journée
    const countToday = await prisma.verificationToken.count({
      where: {
        email,
        type: "email_verification",
        // @ts-ignore (schéma snake_case)
        created_at: { gte: today },
      },
    });
    if (countToday >= 5) {
      return NextResponse.json(okResp("Daily limit reached."), { status: 200 });
    }

    // Invalide les tokens précédents
    await prisma.verificationToken.deleteMany({
      where: { email, type: "email_verification" },
    });

    // Nouveau token (base64url), valable 24h
    const token = crypto.randomBytes(32).toString("base64url");
    const expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.verificationToken.create({
      data: {
        email,
        token,
        type: "email_verification",
        // @ts-ignore (schéma snake_case)
        expires_at,
        ip,
      },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://digitalmeve.com";
    const verifyUrl = new URL(`${appUrl}/verify-email`);
    verifyUrl.searchParams.set("token", token); // ✅ pas d’email dans l’URL

    const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
    const EMAIL_FROM = process.env.EMAIL_FROM || "DigitalMeve <no-reply@digitalmeve.com>";

    // En dev/preview sans clé → log utile
    if (!RESEND_API_KEY) {
      console.log("[DEV] Verify link:", verifyUrl.toString());
      return NextResponse.json(okResp(), { status: 200 });
    }

    // Email HTML (dark)
    const html = renderVerifyEmailHTML({
      verifyUrl: verifyUrl.toString(),
      email,
      appName: "DigitalMeve",
    });

    // Envoi via Resend (HTTP direct)
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
      return NextResponse.json(okResp(), { status: 200 });
    }

    return NextResponse.json(okResp(), { status: 200 });
  } catch (err) {
    console.error("verify-email/resend error:", err);
    return NextResponse.json(okResp(), { status: 200 });
  }
}

function okResp(message?: string) {
  return { ok: true, message: message || "If the address exists, a verification email will be sent." };
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
