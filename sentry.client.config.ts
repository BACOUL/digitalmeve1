import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,   // clé publique DSN
  tunnel: "/api/sentry",                     // passe par ton proxy Next.js
  environment: process.env.NEXT_PUBLIC_APP_ENV || process.env.NODE_ENV,

  // Performance (client)
  tracesSampleRate: 0.2, // 20% des transactions pour commencer

  // Session Replay (optionnel, très utile en debug)
  integrations: [Sentry.replayIntegration()],
  replaysSessionSampleRate: 0.05,   // 5% des sessions
  replaysOnErrorSampleRate: 1.0,    // 100% des sessions si erreur

  // Filtres et nettoyage
  ignoreErrors: [
    "ResizeObserver loop limit exceeded",
    "Non-Error promise rejection captured",
  ],
  denyUrls: [/chrome-extension:\/\//, /extensions\//],
  beforeSend(event) {
    // Exemple : on ignore les erreurs générées par les bots/headless
    if (navigator?.userAgent?.includes("HeadlessChrome")) return null;
    return event;
  },
});
