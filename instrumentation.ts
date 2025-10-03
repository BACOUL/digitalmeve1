// instrumentation.ts
import * as Sentry from "@sentry/nextjs";

export async function register() {
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) return;

  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    // Capture aussi bien server, edge, que client
    integrations: [],
    tracesSampleRate: 0.1, // ajuste si besoin
    replaysOnErrorSampleRate: 1.0,
    replaysSessionSampleRate: 0.0,
    enabled: process.env.NODE_ENV === "production",
  });
}
