import * as Sentry from '@sentry/nextjs';

if (!Sentry.isInitialized()) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    // Baisse l’échantillonnage en prod pour éviter le bruit
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.05 : 1.0,
    replaysOnErrorSampleRate: 0.2,
    replaysSessionSampleRate: 0.0,
    release: process.env.NEXT_PUBLIC_COMMIT_SHA, // défini via Vercel (voir ci-dessous)
  });
}
