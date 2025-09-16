// app/api/sentry/route.ts
import * as Sentry from "@sentry/nextjs";

// Edge ou Node: au choix. Si tu utilises déjà @sentry/nextjs, Node est OK.
export const runtime = "nodejs";

export async function POST() {
  try {
    // Provoque une erreur côté serveur
    throw new Error("Test Sentry — server error 💥");
  } catch (err) {
    // Capture par le SDK Sentry (utilise NEXT_PUBLIC_SENTRY_DSN)
    Sentry.captureException(err);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
