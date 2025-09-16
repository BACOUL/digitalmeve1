// sentry.server.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tunnel: "/api/sentry",
  environment: process.env.NEXT_PUBLIC_APP_ENV || process.env.NODE_ENV,

  // Performance (serveur)
  tracesSampleRate: 0.2,
});
