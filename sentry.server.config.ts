// sentry.server.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  // Si tu as SENTRY_DSN côté serveur, garde-le en priorité.
  dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN,

  environment:
    process.env.VERCEL_ENV ||
    process.env.NODE_ENV ||
    'production',

  release:
    process.env.SENTRY_RELEASE ||
    process.env.VERCEL_GIT_COMMIT_SHA ||
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,

  // Tracing côté serveur (HTTP, route handlers, RSC…)
  tracesSampleRate: 0.2,

  // (optionnel) Profils de perf
  // profilesSampleRate: 0.1,
});
