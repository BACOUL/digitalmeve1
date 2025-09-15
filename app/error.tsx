// app/error.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Log minimal (Sentry/console) — tu pourras brancher Sentry ici plus tard
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error('[GlobalError]', { message: error?.message, digest: error?.digest });
  }, [error]);

  const errId = error?.digest || 'N/A';

  return (
    <html>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
        <main className="container-max px-4 py-20">
          <div className="mx-auto max-w-xl rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 shadow-sm">
            <div className="flex items-center gap-2 text-[var(--accent-1)]">
              <AlertTriangle className="h-5 w-5" aria-hidden />
              <h1 className="text-xl font-semibold">Une erreur est survenue</h1>
            </div>

            <p className="mt-3 text-[var(--fg-muted)]">
              Désolé, quelque chose n’a pas fonctionné. Vous pouvez réessayer ou revenir à l’accueil.
            </p>

            {/* Détail minimal pour le support */}
            <div className="mt-4 rounded-xl border border-[var(--border)] bg-[color-mix(in_oklab,var(--bg),white_4%)] p-3">
              <p className="text-xs text-[var(--fg-muted)]">
                <span className="font-medium">ID d’erreur&nbsp;:</span> {errId}
              </p>
              {process.env.NODE_ENV !== 'production' && error?.message && (
                <p className="mt-1 text-xs text-[var(--fg-muted)]">
                  <span className="font-medium">Détails (dev)&nbsp;:</span> {error.message}
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => reset()}
                className="btn btn-primary-strong inline-flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" aria-hidden />
                Réessayer
              </button>

              <Link href="/" className="btn-outline inline-flex items-center gap-2">
                <Home className="h-4 w-4" aria-hidden />
                Retour à l’accueil
              </Link>
            </div>

            <p className="mt-4 text-xs text-[var(--fg-muted)]">
              Si le problème persiste, contactez&nbsp;
              <a className="link" href="mailto:support@digitalmeve.com">
                support@digitalmeve.com
              </a>
              &nbsp;avec l’ID d’erreur.
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
