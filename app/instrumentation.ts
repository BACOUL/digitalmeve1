// app/instrumentation.ts
// DigitalMeve — Sentry instrumentation (Next.js App Router)

import * as Sentry from "@sentry/nextjs";

export async function register() {
  // Active uniquement si le DSN est présent
  if (!process.env.NEXT_PUBLIC_SENTRY_DSN) return;

  // Init côté client + serveur via nextjs SDK (unifié)
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV || "development",

    // Traces de perf (ajuste si besoin)
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

    // Replay (optionnel mais utile pour déboguer le front)
    replaysSessionSampleRate: process.env.NODE_ENV === "production" ? 0.05 : 0.2,
    replaysOnErrorSampleRate: 1.0,

    // Meilleure anonymisation par défaut
    autoSessionTracking: true,
    integrations: (integrations) => {
      // Filtre console breadcrumbs trop verbeux si besoin
      return integrations;
    },

    // Respecte CSP stricte (on ne charge rien si pas whitelisté)
    // Sentry utilisera le CDN déclaré dans la CSP de next.config.mjs
    // browser: { cdn: "https://browser.sentry-cdn.com" }, // non requis si DSN public et CSP OK
  });

  // Bonnes pratiques de filtrage
  Sentry.setTag("app", "digitalmeve");
  Sentry.setTag("runtime", "nextjs-app-router");
}
