import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const to = req.query.to as string;

  if (!to) {
    return res.status(400).json({ error: "Missing 'to' query parameter" });
  }

  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return res.status(500).json({ error: "Missing SMTP_USER / SMTP_PASS" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject: "Test email depuis Vercel",
      text: "Ceci est un test SMTP envoyé depuis ton API hébergée !",
    });

    res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
}
