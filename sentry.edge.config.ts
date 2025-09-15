// sentry.edge.config.ts
import * as Sentry from "@sentry/nextjs";

const DSN = process.env.NEXT_PUBLIC_SENTRY_DSN || "";
if (DSN) {
  Sentry.init({
    dsn: DSN,
    tracesSampleRate: 0.05,
    environment: process.env.NEXT_PUBLIC_RUNTIME_ENV || process.env.NODE_ENV || "production",
    release: process.env.NEXT_PUBLIC_COMMIT_SHA || undefined,
    tunnel: "/api/sentry",
    sendClientReports: true,
  });
}
