"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-slate-950">
      {/* Halo très subtil sous le CTA */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="hero-halo" />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
        {/* Headline = 2 lignes, contraste fort */}
        <h1 className="text-balance font-extrabold leading-tight text-white text-5xl sm:text-6xl md:text-7xl">
          Invisible proof.<br />
          <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
            Visible trust.
          </span>
        </h1>

        {/* Subheading clair, sans bruit visuel */}
        <p className="mx-auto mt-5 max-w-3xl text-xl text-slate-300">
          DigitalMeve adds an invisible proof to your documents and delivers an official
          certificate. They remain identical, always readable, and easy to check — no account,
          no storage.
        </p>

        {/* Micro-claims */}
        <p id="hero-claims" className="mx-auto mt-3 max-w-2xl text-sm text-slate-400">
          Free for individuals · No account · No storage
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4" aria-describedby="hero-claims">
          <Link
            href="/generate"
            className="btn-cta"
          >
            Get started for free
          </Link>

          <Link
            href="/verify"
            className="btn-ghost-dark"
          >
            Verify a document
          </Link>
        </div>

        {/* Badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="chip">Free for individuals</span>
          <span className="chip">No account</span>
          <span className="chip">No storage</span>
        </div>
      </div>
    </section>
  );
}
