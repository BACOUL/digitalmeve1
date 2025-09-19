// lib/email.ts
import nodemailer from "nodemailer";

type SendEmailArgs = {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: string;
};

export async function sendEmail({
  to,
  subject,
  html,
  text,
  from,
}: SendEmailArgs) {
  const host = process.env.SMTP_HOST || "";
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER || "";
  const pass = process.env.SMTP_PASS || "";
  const fromAddr = from || process.env.EMAIL_FROM || "DigitalMeve <no-reply@digitalmeve.com>";

  if (!host || !port || !user || !pass) {
    console.warn("[email] SMTP env missing → simulate send in logs.");
    console.log({ to, subject, html, text });
    return { ok: true, simulated: true };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 = TLS implicite, sinon STARTTLS
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: fromAddr,
    to,
    subject,
    html,
    text,
  });

  return { ok: true };
}

/** Petit helper pour éviter les injections HTML dans les emails */
export function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
