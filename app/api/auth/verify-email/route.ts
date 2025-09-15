// app/api/auth/verify-email/route.ts
export const runtime = "nodejs"; // <-- force Node runtime
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import crypto from "crypto";

/**
 * Petit endpoint d’exemple : émet un token de vérification et renvoie l’URL.
 * Si tu as déjà un endpoint plus avancé, garde sa logique et applique juste :
 *  - runtime = "nodejs"
 *  - import crypto depuis "crypto"
 *  - retire l’utilisation de zod ou installe la dépendance
 */

type Body = {
  email?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let email = "";

    if (contentType.includes("application/json")) {
      const body = (await req.json().catch(() => ({}))) as Body;
      email = (body?.email || "").trim().toLowerCase();
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const form = await req.formData();
      email = String(form.get("email") || "").trim().toLowerCase();
    } else {
      const body = (await req.json().catch(() => ({}))) as Body;
      email = (body?.email || "").trim().toLowerCase();
    }

    // Validation légère (remplace zod)
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { ok: true, message: "If the address exists, a verification email will be sent." },
        { status: 200 }
      );
    }

    // Génère un token
    const token = crypto.randomBytes(32).toString("base64url");

    // Construit l’URL de vérification
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://digitalmeve.com";
    const verifyUrl = new URL(`${appUrl}/verify-email`);
    verifyUrl.searchParams.set("token", token);
    verifyUrl.searchParams.set("email", email);

    // TODO: ici, persiste le token en DB (Prisma) + envoie l’email (Resend)
    // Tu peux réutiliser le code de /api/auth/verify-email/resend/route.ts que je t’ai donné.

    return NextResponse.json(
      { ok: true, verifyUrl: verifyUrl.toString() },
      { status: 200 }
    );
  } catch (err) {
    console.error("verify-email POST error:", err);
    return NextResponse.json(
      { ok: true, message: "If the address exists, a verification email will be sent." },
      { status: 200 }
    );
  }
}
