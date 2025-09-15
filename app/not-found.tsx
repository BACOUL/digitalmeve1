// app/not-found.tsx
'use client';

import Link from 'next/link';
import { Search, Home, Upload, ShieldCheck, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <html>
      <body className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
        <main className="container-max px-4 py-20">
          <div className="mx-auto max-w-2xl card p-8">
            <p className="text-sm text-[var(--fg-muted)]">Erreur 404</p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
              Page introuvable
            </h1>
            <p className="mt-3 sub">
              Désolé, la ressource demandée n’existe pas ou a été déplacée.
            </p>

            {/* Actions rapides */}
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link href="/" className="btn btn-primary-strong flex items-center gap-2">
                <Home className="h-5 w-5" aria-hidden />
                Retour à l’accueil
              </Link>
              <Link href="/generate" className="btn-outline flex items-center gap-2">
                <Upload className="h-5 w-5" aria-hidden />
                Protéger un fichier
              </Link>
            </div>

            {/* Liens utiles */}
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Link href="/verify" className="chip chip-ok inline-flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" aria-hidden />
                Vérifier un document
              </Link>
              <Link href="/pricing" className="chip chip-info inline-flex items-center gap-2">
                Tarifs
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link href="/developers" className="chip inline-flex items-center gap-2">
                Docs développeurs
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>

            {/* Recherche (placeholder non bloquant) */}
            <div className="mt-8">
              <label htmlFor="nf-q" className="block text-sm font-medium">
                Rechercher sur le site
              </label>
              <div className="mt-2 flex gap-2">
                <div className="flex-1 relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--fg-muted)]" />
                  <input
                    id="nf-q"
                    type="search"
                    placeholder="Ex. .MEVE, API, sécurité…"
                    className="input pl-9"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const q = (e.currentTarget as HTMLInputElement).value.trim();
                        if (q) window.location.href = `/developers#search:${encodeURIComponent(q)}`;
                      }
                    }}
                    aria-describedby="nf-help"
                  />
                </div>
                <button
                  className="btn"
                  onClick={() => {
                    const el = document.getElementById('nf-q') as HTMLInputElement | null;
                    const q = el?.value.trim();
                    if (q) window.location.href = `/developers#search:${encodeURIComponent(q)}`;
                  }}
                >
                  Rechercher
                </button>
              </div>
              <p id="nf-help" className="mt-1 text-xs text-[var(--fg-muted)]">
                Astuce : tapez votre requête et appuyez sur Entrée.
              </p>
            </div>

            <p className="mt-8 text-xs text-[var(--fg-muted)]">
              Besoin d’aide ? Contactez&nbsp;
              <a className="link" href="mailto:support@digitalmeve.com">
                support@digitalmeve.com
              </a>.
            </p>
          </div>
        </main>
      </body>
    </html>
  );
                      }
