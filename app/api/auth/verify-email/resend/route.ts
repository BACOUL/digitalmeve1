// app/api/auth/verify-email/resend/route.ts
import { NextResponse } from "next/server";
// IMPORTANT: utiliser "crypto" (Node.js runtime), pas "node:crypto"
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";

export const runtime = "nodejs";

const prisma = new PrismaClient();

/**
 * Expected ENV:
 * - RESEND_API_KEY                (Resend API key)
 * - EMAIL_FROM                    (ex: 'DigitalMeve <no-reply@digitalmeve.com>')
 * - NEXT_PUBLIC_APP_URL           (ex: 'https://digitalmeve.com')
 *
 * Notes:
 * - Always respond 200 to avoid email enumeration.
 * - Invalidate previous verification tokens for the email.
 * - Token expiration: 60 minutes.
 */

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let email = "";

    if (contentType.includes("application/json")) {
      const body = await req.json().catch(() => ({} as any));
      email = (body?.email || "").toString().trim().toLowerCase();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const form = await req.formData();
      email = String(form.get("email") || "").trim().toLowerCase();
    } else {
      // Fallback: try JSON anyway
      const body = await req.json().catch(() => ({} as any));
      email = (body?.email || "").toString().trim().toLowerCase();
    }

    // Minimal email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { ok: true, message: "If the address exists, a verification email will be sent." },
        { status: 200, headers: nocacheHeaders() }
      );
    }

    // Best-effort client IP for logs/rate limiting
    const ip =
      (req.headers.get("x-forwarded-for") || "").split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // Look up user — NEVER reveal the result
    // ⚠️ We only select existing fields from your Prisma model.
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true }, // <-- remove non-existent fields like emailVerifiedAt
    });

    // Always respond 200 even if user does not exist
    if (!user) {
      return NextResponse.json(
        { ok: true, message: "If the address exists, a verification email will be sent." },
        { status: 200, headers: nocacheHeaders() }
      );
    }

    // Invalidate previous verification tokens for this email
    await prisma.verificationToken.deleteMany({
      where: { email, type: "email_verification" },
    });

    // Generate a fresh token (base64url)
    const tokenRaw = crypto.randomBytes(32).toString("base64url");

    // Store token in DB (plaintext for simplicity; consider hashing in prod)
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 60 minutes
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
    const verifyUrl = new URL(`${appUrl.replace(/\/$/, "")}/verify-email`);
    verifyUrl.searchParams.set("token", tokenRaw);
    verifyUrl.searchParams.set("email", email);

    // Send email via Resend
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const EMAIL_FROM = process.env.EMAIL_FROM || "DigitalMeve <no-reply@digitalmeve.com>";

    if (!RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY — email not sent");
      return NextResponse.json(
        { ok: true, message: "If the address exists, a verification email will be sent." },
        { status: 200, headers: nocacheHeaders() }
      );
    }

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
      // Still return 200 to avoid info leaks
      return NextResponse.json(
        { ok: true, message: "If the address exists, a verification email will be sent." },
        { status: 200, headers: nocacheHeaders() }
      );
    }

    return NextResponse.json(
      { ok: true, message: "If the address exists, a verification email will be sent." },
      { status: 200, headers: nocacheHeaders() }
    );
  } catch (err) {
    console.error("verify-email/resend error:", err);
    return NextResponse.json(
      { ok: true, message: "If the address exists, a verification email will be sent." },
      { status: 200, headers: nocacheHeaders() }
    );
  }
}

/** -------- Email HTML (dark, gradient CTA, consistent with brand) -------- */
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

function nocacheHeaders() {
  return {
    "Cache-Control": "no-store, max-age=0",
    Pragma: "no-cache",
  };
}
