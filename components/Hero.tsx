// components/Hero.tsx
"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative border-b border-[color:var(--border)] bg-[var(--bg)]">
      {/* soft glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl md:h-80 md:w-80" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-16 pb-20 text-center sm:pt-20 sm:pb-24">
        {/* Headline */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
          <span className="text-[color:var(--text)]">Invisible proof. </span>
          <span className="bg-gradient-to-r from-[var(--cta-from)] to-[var(--cta-to)] bg-clip-text text-transparent">
            Visible trust.
          </span>
        </h1>

        {/* Subheading (final agreed copy) */}
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[color:var(--muted)]">
          DigitalMeve adds an invisible proof to your documents and delivers an
          official certificate. They remain identical, always readable, and easy
          to check — no account, no storage.
        </p>

        {/* Primary CTA */}
        <div className="mt-8">
          <Link
            href="/generate"
            className="inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold text-slate-900 shadow-[0_0_32px_rgba(56,189,248,0.35)] transition hover:brightness-105
                       bg-gradient-to-r from-[var(--cta-from)] to-[var(--cta-to)]"
          >
            Get started for free
          </Link>
        </div>

        {/* Micro-badges (concise, non-controversial) */}
        <div className="mx-auto mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-[color:var(--muted)]">
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-white/5 px-3 py-1">
            Free for individuals
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-white/5 px-3 py-1">
            No account
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-white/5 px-3 py-1">
            No storage
          </span>
        </div>
      </div>
    </section>
  );
}
