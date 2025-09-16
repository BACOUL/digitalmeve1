// app/api/sentry/route.ts
import * as Sentry from "@sentry/nextjs";

export const runtime = "nodejs";

export async function POST() {
  try {
    throw new Error("Test Sentry — server error 💥");
  } catch (err) {
    Sentry.captureException(err);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
