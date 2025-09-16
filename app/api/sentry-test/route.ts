import * as Sentry from "@sentry/nextjs";

export const runtime = "nodejs";

export async function GET() {
  try {
    throw new Error("DMV test server error");
  } catch (err) {
    const id = Sentry.captureException(err);
    return Response.json({ ok: true, eventId: id });
  }
}
