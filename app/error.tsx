"use client";

import * as Sentry from "@sentry/nextjs";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <html>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
        <main className="mx-auto max-w-2xl px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            Unexpected error
          </div>
          <h1 className="mt-4 text-3xl font-extrabold">Something went wrong</h1>
          <p className="mt-2 text-[var(--fg-muted)]">
            Our team has been notified. You can retry or go back home.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => reset()}
              className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/15"
            >
              <RefreshCw className="h-4 w-4" /> Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10"
            >
              <Home className="h-4 w-4" /> Home
            </Link>
          </div>

          {process.env.NODE_ENV !== "production" && (
            <p className="mt-4 text-xs text-slate-500">Digest: {error.digest}</p>
          )}
        </main>
      </body>
    </html>
  );
}
