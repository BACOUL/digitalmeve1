// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  // erreurs (events)
  sampleRate: 1.0,
  // perf (optionnel)
  tracesSampleRate: 1.0,
  // replays (optionnel)
  replaysSessionSampleRate: 0.0,
  replaysOnErrorSampleRate: 1.0,
  environment:
    process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV || "production",
  debug: true, // → logs SDK détaillés
  integrations: [],
});
