"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-slate-950">
      {/* halo très subtil */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="hero-halo" />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
        {/* Headline */}
        <h1 className="text-balance font-extrabold leading-tight text-white text-5xl sm:text-6xl md:text-7xl">
          Invisible proof.<br />
          <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
            Visible trust.
          </span>
        </h1>

        {/* Subheading (plus fluide, sans jargon) */}
        <p className="mx-auto mt-5 max-w-3xl text-xl text-slate-300">
          DigitalMeve adds an invisible proof to your documents and issues an official
          certificate. Your files stay unchanged — always readable and simple to check.
          No account. No storage.
        </p>

        {/* Micro-claims (sans redondance avec les chips) */}
        <p id="hero-claims" className="mx-auto mt-3 max-w-2xl text-sm text-slate-400">
          Private by design · In your browser · Free for individuals
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4" aria-describedby="hero-claims">
          <Link href="/generate" className="btn-cta" aria-label="Get started for free with DigitalMeve">
            Get started for free
          </Link>

          <Link href="/verify" className="btn-ghost-dark" aria-label="Verify a document with DigitalMeve">
            Verify a document
          </Link>
        </div>

        {/* Badges (variés pour éviter la répétition) */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="chip">Certificate included</span>
          <span className="chip">Readable anywhere</span>
          <span className="chip">No account • No storage</span>
        </div>
      </div>
    </section>
  );
}
