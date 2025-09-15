"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="DigitalMeve — Invisible proof, visible trust"
      className="relative overflow-hidden bg-slate-950"
    >
      {/* BACKDROP — radial glow + vignette + subtle grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* radial halo center */}
        <div className="absolute inset-0 [background:radial-gradient(1100px_520px_at_50%_-10%,rgba(16,185,129,0.28),transparent_60%)]" />
        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:48px_48px]" />
        {/* vertical vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 py-18 text-center sm:py-24">
        {/* Eyebrow / standard tag */}
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
          THE .MEVE STANDARD
        </div>

        {/* Headline */}
        <h1 className="mt-4 text-balance font-extrabold leading-tight text-white text-5xl sm:text-6xl md:text-7xl">
          Invisible proof.<br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
            Visible trust.
          </span>
        </h1>

        {/* Subheading — crisp, enterprise-grade */}
        <p className="mx-auto mt-5 max-w-3xl text-lg sm:text-xl text-slate-300">
          DigitalMeve embeds a lightweight, invisible{" "}
          <span className="font-semibold">.MEVE</span> proof inside your file and issues an
          official certificate. Your document stays identical and readable everywhere — and anyone
          can verify it in seconds. No account. No storage.
        </p>

        {/* Micro-claims (clean, not redundant) */}
        <p id="hero-claims" className="mx-auto mt-3 max-w-2xl text-sm text-slate-400">
          Private by design · In-browser processing · Free for individuals
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4" aria-describedby="hero-claims">
          <Link
            href="/generate"
            className="btn-cta"
            aria-label="Get started for free with DigitalMeve"
          >
            Get started for free
          </Link>

          <Link
            href="/verify"
            className="btn-ghost-dark"
            aria-label="Verify a document with DigitalMeve"
          >
            Verify a document
          </Link>
        </div>

        {/* Trust badges */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="chip">Certificate included</span>
          <span className="chip">PDF &amp; DOCX preserved</span>
          <span className="chip">No account • No storage</span>
        </div>
      </div>
    </section>
  );
}
