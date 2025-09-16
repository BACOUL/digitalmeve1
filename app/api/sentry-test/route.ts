import * as Sentry from "@sentry/nextjs";

export const runtime = "nodejs"; // (edge possible aussi, mais restons simple)

export async function POST() {
  try {
    throw new Error("DM test: exception côté serveur");
  } catch (err) {
    Sentry.captureException(err);
    // Laissez Sentry flusher rapidement
    await Sentry.flush(2000);
    return new Response("captured", { status: 200 });
  }
}
