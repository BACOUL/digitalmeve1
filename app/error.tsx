// app/error.tsx
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, Home, Bug } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log local + envoi best-effort au backend (sans bloquer l’UI)
    // Pas de dépendance à Sentry — safe en build.
    try {
      // eslint-disable-next-line no-console
      console.error("Route error boundary:", error);

      const payload = {
        message: error?.message ?? "unknown",
        stack: error?.stack ?? null,
        digest: (error as any)?.digest ?? null,
        at: typeof window !== "undefined" ? window.location.href : null,
      };

      fetch("/api/errlog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    } catch {
      /* no-op */
    }
  }, [error]);

  return (
    <div className="min-h-[60vh] bg-[var(--bg)] text-[var(--fg)]">
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/15">
          <Bug className="h-6 w-6 text-rose-300" />
        </div>
        <h1 className="mt-4 text-2xl font-bold">Oups — quelque chose s’est mal passé</h1>
        <p className="mt-2 text-[var(--fg-muted)]">
          L’erreur a été enregistrée. Vous pouvez réessayer ou revenir à l’accueil.
        </p>

        {/* Détails (dev-friendly, masqués en prod si besoin) */}
        {process.env.NODE_ENV !== "production" && (
          <pre className="mt-4 overflow-x-auto rounded-xl border border-white/10 bg-white/5 p-3 text-left text-xs text-[var(--fg)]">
            {error?.message}
            {"\n"}
            {error?.stack}
          </pre>
        )}

        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-[0_0_30px_rgba(34,211,238,0.45)] hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <RefreshCw className="h-4 w-4" />
            Réessayer
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-100 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <Home className="h-4 w-4" />
            Accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
