import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || "",
  tracesSampleRate: 0.1,     // ajuste suivant trafic
  replaysSessionSampleRate: 0.0,
  replaysOnErrorSampleRate: 0.1,
  integrations: (integrations) => integrations,
  environment: process.env.NEXT_PUBLIC_RUNTIME_ENV || process.env.NODE_ENV || "production",
  release: process.env.NEXT_PUBLIC_COMMIT_SHA || undefined,
});
