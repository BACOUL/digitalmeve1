// sentry.client.config.ts
'use client';

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Contexte utile dans Sentry
  environment:
    (process.env.NEXT_PUBLIC_VERCEL_ENV as string) ||
    (process.env.NODE_ENV as string) ||
    'production',
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,

  // Tracing côté client (baisse si tu veux consommer moins de quota)
  tracesSampleRate: 0.2,

  // Nettoyage du bruit courant
  ignoreErrors: [
    'ResizeObserver loop limit exceeded',
    'Network Error',
    'Failed to fetch',
  ],
  denyUrls: [
    /extensions\//i,
    /^chrome:\/\//i,
    /safari-extension:/i,
  ],
});
