// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,   // on garde le DSN public
  tunnel: "/api/sentry",                     // envoi via le proxy Next
  environment: process.env.NEXT_PUBLIC_APP_ENV || process.env.NODE_ENV,

  // Performance (client)
  tracesSampleRate: 0.2,                     // 20% d’échantillonnage (ajuste selon trafic)
  // Session Replay (optionnel – utile pour débug)
  integrations: [Sentry.replayIntegration()],
  replaysSessionSampleRate: 0.05,            // 5% des sessions
  replaysOnErrorSampleRate: 1.0,             // 100% si erreur

  // Qualité du signal
  ignoreErrors: ["ResizeObserver loop limit exceeded"],
  denyUrls: [/chrome-extension:\/\//, /extensions\//],
  beforeSend(event) {
    // filtre simple des bots
    if (navigator?.userAgent?.includes("HeadlessChrome")) return null;
    return event;
  },
});
