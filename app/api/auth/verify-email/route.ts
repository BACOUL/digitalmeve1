// app/api/auth/verify-email/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "node:crypto";

/**
 * Assumes a Prisma User model with:
 *  - email (string, unique)
 *  - emailVerificationToken (string | null)
 *  - emailVerificationExpiresAt (Date | null)
 *  - emailVerifiedAt (Date | null)
 *
 * And a reusable prisma client at "@/lib/prisma".
 */
import { prisma } from "@/lib/prisma";

export const runtime = "edge"; // ultra-fast, low cold start

const BodySchema = z.object({
  token: z.string().min(16, "invalid token"),
});

/** Extra constant-time comparison to mitigate timing attacks */
function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export async function POST(req: Request) {
  try {
    // Accept both form-data and JSON for flexibility
    const contentType = req.headers.get("content-type") || "";
    let token: string | undefined;

    if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
      const form = await req.formData();
      token = form.get("token")?.toString();
    } else if (contentType.includes("application/json")) {
      const json = await req.json().catch(() => ({}));
      token = json?.token;
    }

    const { token: parsedToken } = BodySchema.parse({ token });

    // Find a user with a matching (and not-expired) token
    const now = new Date();
    const user = await prisma.user.findFirst({
      where: {
        emailVerificationToken: parsedToken, // DB-level filter first
        emailVerificationExpiresAt: { gt: now },
      },
      select: {
        id: true,
        email: true,
        emailVerifiedAt: true,
        emailVerificationToken: true,
        emailVerificationExpiresAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { status: "invalid", message: "Invalid or expired token." },
        { status: 400 }
      );
    }

    // Defense in depth: constant-time compare (covers potential hashing/format drift)
    if (!user.emailVerificationToken || !safeEqual(user.emailVerificationToken, parsedToken)) {
      return NextResponse.json(
        { status: "invalid", message: "Invalid or expired token." },
        { status: 400 }
      );
    }

    // Already verified? Idempotency: succeed gracefully.
    if (user.emailVerifiedAt) {
      return NextResponse.json(
        { status: "ok", message: "Email already verified." },
        { status: 200 }
      );
    }

    // Mark as verified & clear token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerifiedAt: now,
        emailVerificationToken: null,
        emailVerificationExpiresAt: null,
      },
    });

    return NextResponse.json(
      { status: "ok", message: "Email verified successfully." },
      { status: 200 }
    );
  } catch (err: any) {
    if (err?.name === "ZodError") {
      return NextResponse.json(
        { error: { type: "invalid_request", message: err.errors?.[0]?.message || "Invalid request", code: "bad_token" } },
        { status: 400 }
      );
    }

    // Do not leak internals
    return NextResponse.json(
      { error: { type: "server_error", message: "Something went wrong" } },
      { status: 500 }
    );
  }
      }
