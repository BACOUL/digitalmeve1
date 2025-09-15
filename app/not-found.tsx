// app/not-found.tsx
"use client";

import Link from "next/link";
import { ArrowRight, Compass, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] bg-[var(--bg)] text-[var(--fg)] grid place-items-center px-4">
      <section className="max-w-2xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
          <Compass className="h-4 w-4 text-[var(--accent-1)]" />
          Page not found
        </div>

        <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight">
          Oups — impossible de trouver cette page
        </h1>
        <p className="mt-3 text-[var(--fg-muted)]">
          Le lien a peut-être changé ou n’existe plus.
          Essayez l’une des actions ci-dessous.
        </p>

        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/generate" className="btn btn-primary-strong btn-glow inline-flex items-center gap-2">
            Protect a file <ArrowRight className="h-5 w-5" />
          </Link>
          <Link href="/verify" className="btn-outline inline-flex items-center gap-2">
            Verify a file <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-white/10"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
        </div>
      </section>
    </main>
  );
}
