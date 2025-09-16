import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || "",
  // Route toutes les requêtes via Next (évite les blocages réseau) :
  tunnel: "/api/sentry",
  // Observabilité raisonnable
  tracesSampleRate: 0.1,
  replaysSessionSampleRate: 0.0,
  replaysOnErrorSampleRate: 0.1,
  integrations: (integrations) => integrations,
  environment:
    process.env.NEXT_PUBLIC_RUNTIME_ENV ||
    process.env.NODE_ENV ||
    "production",
  release: process.env.NEXT_PUBLIC_COMMIT_SHA || undefined,
});
