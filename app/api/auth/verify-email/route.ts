// app/api/auth/verify-email/resend/route.ts
import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { prisma } from "@prisma/client"; // <-- si tu as déjà un export central, remplace par "@/lib/prisma"
import { sendEmailNero } from "@/lib/email";

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!email || !emailRegex.test(email)) {
      // Réponse neutre
      return NextResponse.json(
        { ok: true, message: "If the address exists, a verification email will be sent." },
        { status: 200 }
      );
    }

    const ip =
      (req.headers.get("x-forwarded-for") || "").split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // L'utilisateur existe ?
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    // Toujours 200 même si l'utilisateur n'existe pas (pas d’énumération)
    if (!user) {
      return NextResponse.json(
        { ok: true, message: "If the address exists, a verification email will be sent." },
        { status: 200 }
      );
    }

    // Invalide anciens tokens
    await prisma.verificationToken.deleteMany({
      where: { email, type: "email_verification" },
    });

    // Nouveau token (60 min)
    const tokenRaw = crypto.randomBytes(32).toString("base64url");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
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

    const shouldLogLink = process.env.EMAIL_DEBUG_LOG === "1" || process.env.NODE_ENV !== "production";
    if (shouldLogLink) {
      console.log("[RESEND VERIFY][DEBUG] link:", verifyUrl.toString(), "for", email);
    }

    const html = renderVerifyEmailHTML({
      verifyUrl: verifyUrl.toString(),
      email,
      appName: "DigitalMeve",
    });

    try {
      await sendEmailNero({
        to: email,
        subject: "Confirm your email",
        html,
        text: `Confirm your email: ${verifyUrl.toString()}`,
      });
    } catch (e: any) {
      console.error("[VERIFY RESEND][NERO] send error:", e?.message || e);
      if (process.env.NODE_ENV !== "production") {
        return NextResponse.json(
          { ok: true, message: "Verification email failed (dev). Use debug link.", debugVerifyUrl: verifyUrl.toString() },
          { status: 200 }
        );
      }
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
    .replaceAll('"", "&quot;")
    .replaceAll("'", "&#39;");
  }
