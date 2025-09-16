// sentry.server.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  sampleRate: 1.0,
  tracesSampleRate: 1.0,
  environment:
    process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV || "production",
  debug: true, // logs côté serveur
  integrations: [],
});
