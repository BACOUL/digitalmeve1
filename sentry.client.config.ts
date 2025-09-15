// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";

/**
 * Init Sentry côté client.
 * - Ne casse pas si le DSN est vide (ex: env local)
 * - Tunnel via /api/sentry pour éviter l’URL publique et les ad-blockers
 */
const DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || "";
if (DSN) {
  Sentry.init({
    dsn: DSN,
    tracesSampleRate: 0.1,               // ajuste selon trafic
    replaysSessionSampleRate: 0.0,       // activer si tu veux Sentry Replay
    replaysOnErrorSampleRate: 0.1,
    integrations: (integrations) => integrations,
    environment: process.env.NEXT_PUBLIC_RUNTIME_ENV || process.env.NODE_ENV || "production",
    release: process.env.NEXT_PUBLIC_COMMIT_SHA || undefined,
    tunnel: "/api/sentry",               // ✅ tunnel local
    sendClientReports: true,             // envoie “outcomes” via le tunnel aussi
  });
}
