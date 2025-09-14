// components/Hero.tsx
"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Aura subtile */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 flex items-start justify-center">
        <div className="mt-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl md:h-96 md:w-96" />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:py-20">
        {/* Headline */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          <span className="text-slate-100">Invisible proof.</span>{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
            Visible trust.
          </span>
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-300">
          DigitalMeve adds an invisible proof to your documents and delivers an
          official certificate. They remain identical, always readable, and easy
          to check — no account, no storage.
        </p>

        {/* CTA primaire */}
        <div className="mt-8">
          <Link
            href="/generate"
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-6 py-3 text-base font-semibold text-slate-900 shadow-[0_0_30px_rgba(34,211,238,0.35)] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            aria-label="Get started for free"
          >
            Get started for free
          </Link>
        </div>

        {/* Micro-claims (pills) */}
        <ul
          className="mx-auto mt-5 flex max-w-xl flex-wrap items-center justify-center gap-2"
          aria-label="Highlights"
        >
          <li className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-sm font-medium text-emerald-200">
            Free for individuals
          </li>
          <li className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 text-sm font-medium text-sky-200">
            No account
          </li>
          <li className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 text-sm font-medium text-sky-200">
            No storage
          </li>
        </ul>
      </div>
    </section>
  );
}
