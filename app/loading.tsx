// app/loading.tsx
'use client';

import { Loader2 } from 'lucide-react';

export default function GlobalLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="min-h-[70vh] bg-[var(--bg)] text-[var(--fg)]"
    >
      {/* HERO skeleton */}
      <section className="border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="container-max px-4 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto h-8 w-60 rounded-xl bg-white/5 animate-pulse" />
            <div className="mx-auto mt-3 h-4 w-80 rounded-xl bg-white/5 animate-pulse" />
            <div className="mx-auto mt-1 h-4 w-64 rounded-xl bg-white/5 animate-pulse" />
            <div className="mx-auto mt-6 flex items-center justify-center gap-3">
              <div className="h-10 w-36 rounded-2xl bg-white/8 animate-pulse" />
              <div className="h-10 w-36 rounded-2xl border border-white/10 bg-white/5 animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION skeleton cards */}
      <section className="section-dark">
        <div className="container-max px-4 py-12">
          <div className="h-6 w-48 rounded-xl bg-white/5 animate-pulse" />
          <div className="mt-2 h-4 w-80 rounded-xl bg-white/5 animate-pulse" />

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="card p-6 border border-white/10 bg-white/5 animate-pulse"
              >
                <div className="h-5 w-28 rounded bg-white/8" />
                <div className="mt-3 h-4 w-full rounded bg-white/6" />
                <div className="mt-2 h-4 w-2/3 rounded bg-white/6" />
                <div className="mt-6 h-9 w-32 rounded-2xl bg-white/8" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPINNER fallback (toujours visible) */}
      <div className="py-12">
        <div className="mx-auto flex items-center justify-center gap-3 text-[var(--fg-muted)]">
          <Loader2 className="h-5 w-5 animate-spin text-[var(--accent-1)]" aria-hidden />
          <span className="text-sm">Chargement…</span>
        </div>
      </div>
    </div>
  );
}
