import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function makeTransport() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) throw new Error("Missing SMTP_USER / SMTP_PASS");

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 = TLS direct, sinon STARTTLS
    auth: { user, pass },
  });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const to = url.searchParams.get("to");
  if (!to) {
    return NextResponse.json(
      { ok: false, error: "Add ?to=you@example.com" },
      { status: 400 }
    );
  }

  try {
    const transporter = makeTransport();
    const verifyRes = await transporter.verify();

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.SMTP_USER!,
      to,
      subject: "DigitalMeve • Test email",
      html: `<p>✅ Test OK. Si vous voyez cet email, SMTP fonctionne.</p>`,
      text: "Test OK",
    });

    return NextResponse.json({
      ok: true,
      verify: verifyRes,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
