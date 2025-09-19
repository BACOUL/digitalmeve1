// lib/email.ts
import nodemailer from "nodemailer";

type SendEmailArgs = {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
};

export async function sendEmail({ to, subject, html, text, from }: SendEmailArgs) {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";
  // Pour Gmail, garde from = SMTP_USER par défaut
  const fromAddr = from || process.env.EMAIL_FROM || user || "no-reply@example.com";

  if (!user || !pass) {
    console.warn("[email] Missing SMTP_USER / SMTP_PASS → simulate send in logs.");
    console.log({ to, subject, html, text, from: fromAddr });
    return { ok: true, simulated: true };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 = TLS implicite, sinon STARTTLS
    auth: { user, pass },
    // Optionnel : timeouts raisonnables
    connectionTimeout: 15_000,
    socketTimeout: 20_000,
  });

  // Vérifie la connexion/auth avant l’envoi
  try {
    await transporter.verify();
  } catch (e: any) {
    console.error("[email] SMTP verify failed:", e?.message || e);
    throw new Error("SMTP verification failed");
  }

  try {
    const info = await transporter.sendMail({
      from: fromAddr,
      to,
      subject,
      html,
      text,
    });

    return {
      ok: true,
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
      envelope: info.envelope,
    };
  } catch (e: any) {
    console.error("[email] sendMail error:", e?.message || e);
    throw new Error("Email send failed");
  }
}

/** Helper pour éviter les injections HTML dans les emails */
export function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
    }
