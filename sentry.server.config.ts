import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN || "",
  tracesSampleRate: 0.1,
  environment: process.env.NEXT_PUBLIC_RUNTIME_ENV || process.env.NODE_ENV || "production",
  release: process.env.NEXT_PUBLIC_COMMIT_SHA || undefined,
});
