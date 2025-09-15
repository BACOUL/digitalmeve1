// app/error.tsx
"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  RefreshCw,
  Home,
  Activity,
  Mail,
  Copy,
  CheckCircle2,
} from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Log technique côté client (facultatif, non-bloquant)
  useEffect(() => {
    // Console pour debug
    // eslint-disable-next-line no-console
    console.error("GlobalError boundary:", error);

    // Optionnel : ping une route d’analytics / log si tu en as une
    // (on ignore toutes erreurs pour ne pas perturber l’UI d’erreur)
    (async () => {
      try {
        await fetch("/api/client-error", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: error?.message ?? "Unknown error",
            digest: error?.digest,
            stack: process.env.NODE_ENV === "development" ? error?.stack : undefined,
            path: typeof window !== "undefined" ? window.location.href : undefined,
          }),
        });
      } catch {
        // no-op
      }
    })();
  }, [error]);

  const canShowDetails = process.env.NODE_ENV === "development";
  const supportEmail = "support@digitalmeve.com";

  const digestLabel = useMemo(
    () => (error?.digest ? `#${String(error.digest).slice(0, 8)}` : undefined),
    [error?.digest]
  );

  function copyDigest() {
    if (!error?.digest) return;
    try {
      navigator.clipboard.writeText(error.digest);
      const el = document.getElementById("dm-copy-toast");
      if (el) {
        el.classList.remove("opacity-0", "translate-y-1");
        el.classList.add("opacity-100", "translate-y-0");
        setTimeout(() => {
          el.classList.add("opacity-0", "translate-y-1");
          el.classList.remove("opacity-100", "translate-y-0");
        }, 1400);
      }
    } catch {
      /* no-op */
    }
  }

  return (
    <html lang="fr">
      <body className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
        <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-4 text-center">
          {/* Badge / Titre */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-amber-300">
            <AlertTriangle className="h-4 w-4" />
            Erreur inattendue
            {digestLabel && (
              <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-xs text-slate-300">
                {digestLabel}
              </span>
            )}
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Oups, quelque chose a mal tourné.
          </h1>
          <p className="sub mt-2 max-w-xl">
            Pas de panique — votre document reste intact. Vous pouvez réessayer,
            revenir à l’accueil, ou consulter l’état du service.
          </p>

          {/* Actions principales */}
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row">
            <button
              onClick={reset}
              className="btn btn-primary-strong btn-glow inline-flex items-center gap-2"
            >
              <RefreshCw className="h-5 w-5" />
              Réessayer
            </button>
            <Link href="/" className="btn-outline inline-flex items-center gap-2">
              <Home className="h-5 w-5" />
              Retour à l’accueil
            </Link>
            <Link
              href="/status"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-white/10"
            >
              <Activity className="h-5 w-5 text-emerald-400" />
              État du service
            </Link>
          </div>

          {/* Bloc support */}
          <div className="mt-8 w-full rounded-2xl border border-white/10 bg-white/5 p-5 text-left">
            <h2 className="text-base font-semibold">Besoin d’aide ?</h2>
            <p className="mt-2 text-sm text-[var(--fg-muted)]">
              Contactez-nous et mentionnez l’identifiant d’erreur pour une prise en charge plus rapide.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${supportEmail}`}
                className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-3 py-1.5 text-sm hover:bg-white/10"
              >
                <Mail className="h-4 w-4 text-sky-400" />
                {supportEmail}
              </a>

              {!!error?.digest && (
                <button
                  onClick={copyDigest}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200 hover:bg-white/10"
                  title="Copier l’identifiant d’erreur"
                >
                  <Copy className="h-4 w-4" />
                  Copier l’ID d’erreur
                </button>
              )}
            </div>

            {!!error?.digest && (
              <p className="mt-2 text-xs text-[var(--fg-muted)]">
                ID d’erreur : <span className="font-mono">{error.digest}</span>
              </p>
            )}

            {/* Détails visibles uniquement en développement */}
            {canShowDetails && (
              <details className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <summary className="cursor-pointer text-sm font-medium">
                  Détails techniques (dev uniquement)
                </summary>
                <pre className="mt-3 max-h-64 overflow-auto rounded bg-black/30 p-3 text-xs leading-relaxed text-slate-200">
                  {String(error?.stack || error?.message || "No stack")}
                </pre>
              </details>
            )}
          </div>

          {/* Petit toast de feedback copy */}
          <div
            id="dm-copy-toast"
            aria-live="polite"
            className="pointer-events-none fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transform rounded-full bg-emerald-600/90 px-3 py-1.5 text-sm text-white shadow transition-all duration-200 opacity-0 translate-y-1"
          >
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> ID copié
            </span>
          </div>
        </main>
      </body>
    </html>
  );
}
