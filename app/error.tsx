// app/error.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { RefreshCw, Home, Bug, Clipboard } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [copied, setCopied] = useState(false);

  // Keep a minimal, privacy-safe payload
  const payload = useMemo(
    () => ({
      message: error?.message ?? "unknown",
      stack: process.env.NODE_ENV !== "production" ? error?.stack ?? null : null,
      digest: (error as any)?.digest ?? null,
      at:
        typeof window !== "undefined"
          ? window.location.href
          : null,
    }),
    [error]
  );

  useEffect(() => {
    // Local console (useful in dev) + best-effort background log
    try {
      // eslint-disable-next-line no-console
      console.error("Route error boundary:", error);
      // Optional: post to your backend (no await, no UI block)
      fetch("/api/errlog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    } catch {
      /* no-op */
    }
  }, [error, payload]);

  async function copyDigest() {
    try {
      const txt =
        payload.digest ||
        (process.env.NODE_ENV !== "production" ? payload.message : "") ||
        "N/A";
      await navigator.clipboard.writeText(String(txt));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* no-op */
    }
  }

  return (
    <div
      className="min-h-[60vh] bg-[var(--bg)] text-[var(--fg)]"
      role="main"
      aria-labelledby="error-title"
    >
      {/* SR-only live status for screen readers */}
      <p className="sr-only" aria-live="polite">
        An error occurred on this page.
      </p>

      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <div
          aria-hidden="true"
          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/15"
        >
          <Bug className="h-6 w-6 text-rose-300" />
        </div>

        <h1 id="error-title" className="mt-4 text-2xl font-bold">
          Something went wrong
        </h1>
        <p className="mt-2 text-[var(--fg-muted)]">
          The error was recorded. You can try again, go back home, or report it
          with the reference below.
        </p>

        {/* Reference row */}
        <div
          className="mx-auto mt-4 inline-flex flex-wrap items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs"
          aria-label="Error reference"
        >
          <span className="opacity-70">Reference:</span>
          <code className="rounded bg-black/30 px-2 py-0.5">
            {(payload.digest as string) || "N/A"}
          </code>
          <button
            type="button"
            onClick={copyDigest}
            className="inline-flex items-center gap-1 rounded bg-white/10 px-2 py-0.5 hover:bg-white/15"
            aria-label="Copy error reference"
          >
            <Clipboard className="h-3.5 w-3.5" />
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        {/* Dev-only details */}
        {process.env.NODE_ENV !== "production" && (
          <details className="mx-auto mt-4 w-full text-left">
            <summary className="cursor-pointer text-sm underline-offset-2 hover:underline">
              Show technical details (dev only)
            </summary>
            <pre className="mt-2 overflow-x-auto rounded-xl border border-white/10 bg-white/5 p-3 text-xs">
              {payload.message}
              {"\n"}
              {payload.stack}
            </pre>
          </details>
        )}

        {/* Actions */}
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-[0_0_30px_rgba(34,211,238,0.45)] hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-100 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>

          <a
            href={`mailto:hello@digitalmeve.com?subject=DigitalMeve%20error%20${encodeURIComponent(
              String(payload.digest || "")
            )}&body=Hi%20DigitalMeve%20team,%0D%0A%0D%0AAn%20error%20occurred%20on:%20${encodeURIComponent(
              String(payload.at || "")
            )}%0D%0AReference:%20${encodeURIComponent(
              String(payload.digest || "")
            )}%0D%0ADetails%20(optional):%0D%0A`}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-100 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            Report issue
          </a>
        </div>
      </div>
    </div>
  );
            }
