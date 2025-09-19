// lib/email.ts
import nodemailer from "nodemailer";

type SendEmailArgs = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
};

export async function sendEmailNero({ to, subject, html, text }: SendEmailArgs) {
  const host = process.env.NERO_SMTP_HOST;
  const port = Number(process.env.NERO_SMTP_PORT || 587);
  const user = process.env.NERO_SMTP_USER;
  const pass = process.env.NERO_SMTP_PASS;
  const from = process.env.EMAIL_FROM || "DigitalMeve <no-reply@digitalmeve.com>";

  if (!host || !user || !pass) {
    throw new Error("Nero SMTP is not configured (NERO_SMTP_HOST / USER / PASS).");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true pour 465, sinon TLS STARTTLS
    auth: { user, pass },
  });

  const info = await transporter.sendMail({
    from,
    to,
    subject,
    html,
    text: text || stripHtml(html),
  });

  return info;
}

function stripHtml(input: string) {
  return input
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
