// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
// on ne tente l'init que si le DSN ressemble à une URL
const isValidDsn = typeof dsn === "string" && /^https?:\/\//.test(dsn);

if (isValidDsn) {
  Sentry.init({
    dsn,
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
}
// sinon : pas d'init → aucune erreur côté client si la variable manque
