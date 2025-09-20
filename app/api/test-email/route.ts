import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { to, subject, text } = await req.json();

    if (!to) {
      return NextResponse.json({ ok: false, error: "Missing 'to'" }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || "no-reply@resend.dev",
      to,
      subject: subject || "Test DigitalMeve 🚀",
      text: text || "Hello depuis Resend, ça marche !",
    });

    return NextResponse.json({ ok: true, data });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
