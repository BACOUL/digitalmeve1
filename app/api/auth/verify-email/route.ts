// app/api/auth/verify-email/resend/route.ts
import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

/**
 * ENV attendues :
 * - RESEND_API_KEY (optionnel en dev/preview → si absent on log seulement)
 * - EMAIL_FROM                      (ex: 'DigitalMeve <no-reply@digitalmeve.com>')
 * - NEXT_PUBLIC_APP_URL             (ex: 'https://digitalmeve.com' ou ton Vercel)
 *
 * Notes:
 * - Toujours répondre 200 pour éviter l’énumération d’emails.
 * - Invalide les anciens tokens pour cet email.
 * - Expiration du token : 60 minutes.
 */
export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let email = "";

    if (contentType.includes("application/json")) {
      const body = (await req.json().catch(() => ({}))) as any;
      email = (body?.email || "").toString().trim().toLowerCase();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const form = await req.formData();
      email = String(form.get("email") || "").trim().toLowerCase();
    } else {
      const body = (await req.json().catch(() => ({}))) as any;
      email = (body?.email || "").toString().trim().toLowerCase();
    }

    // Validation minimale
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { ok: true, message: "If the address exists, a verification email will be sent." },
        { status: 200 }
      );
    }

    // IP best-effort
    const ip =
      (req.headers.get("x-forwarded-for") || "").split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // Vérifie si l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (!user) {
      return NextResponse.json(
        { ok: true, message: "If the address exists, a verification email will be sent." },
        { status: 200 }
      );
    }

    // Invalide les anciens tokens
    await prisma.verificationToken.deleteMany({
      where: { email, type: "email_verification" },
    });

    // Génère un nouveau token
    const tokenRaw = crypto.randomBytes(32).toString("base64url");

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

    // ✅ Patch ici : lien vers l’API, pas la page
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://digitalmeve.com";
    const verifyUrl = new URL(`${appUrl}/api/auth/verify-email`);
    verifyUrl.searchParams.set("token", tokenRaw);
    verifyUrl.searchParams.set("email", email);

    const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
    const EMAIL_FROM = process.env.EMAIL_FROM || "DigitalMeve <no-reply@digitalmeve.com>";

    if (!RESEND_API_KEY) {
      console.log("[RESEND VERIFY][DEV] Link:", verifyUrl.toString());
      return NextResponse.json(
        { ok: true, message: "If the address exists, a verification email will be sent." },
        { status: 200 }
      );
    }

    // Email HTML
    const html = renderVerifyEmailHTML({
      verifyUrl: verifyUrl.toString(),
      email,
      appName: "DigitalMeve",
    });

    // Envoi via Resend
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
    }

    return NextResponse.json(
      { ok: true, message: "If the address exists, a verification email will be sent." },
      { status: 200 }
    );
  } catch (err) {
    console.error("verify-email/resend error:", err);
    return NextResponse.json(
      { ok: true, message: "If the address exists, a verification email will be sent." },
      { status: 200 }
    );
  }
}

/** -------- Email HTML -------- */
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
    <meta charset="utf-8">
    <title>${escapeHtml(appName)} – Verify your email</title>
  </head>
  <body>
    <h1>Verify your email</h1>
    <p>Hi, we just need to confirm <strong>${escapeHtml(email)}</strong> belongs to you.</p>
    <p><a href="${verifyUrl}">Confirm email</a></p>
    <p>This link expires in 60 minutes.</p>
    <p>Or paste this URL in your browser:<br/>${escapeHtml(verifyUrl)}</p>
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
