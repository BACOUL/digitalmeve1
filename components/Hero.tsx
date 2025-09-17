// components/Hero.tsx
"use client";

import Link from "next/link";
import { ShieldCheck, Radar, Sparkles, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="DigitalMeve — Invisible proof, visible trust"
      className="relative overflow-hidden"
    >
      {/* ===== Background FX (emerald/sky auroras + beam + grain) ===== */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
        <div className="beam" />
        <div className="noise" />

        {/* Top white band (to blend with your white header) */}
        <div className="absolute inset-x-0 top-0 h-16 bg-white/90 mix-blend-normal [mask-image:linear-gradient(to_bottom,black,transparent)]" />
        {/* Subtle vertical vignette for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/15 to-black/50" />
      </div>

      {/* ===== Content ===== */}
      <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-16 text-center sm:pt-28 sm:pb-24">
        {/* Eyebrow */}
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[.7rem] font-bold tracking-wide text-slate-200 backdrop-blur animate-[fadeIn_300ms_ease-out_both]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
          THE .MEVE STANDARD
        </div>

        {/* Headline */}
        <h1 className="mt-4 text-balance font-extrabold tracking-tight text-white leading-[1.05] text-5xl sm:text-6xl md:text-7xl animate-[fadeIn_420ms_ease-out_both]">
          Invisible proof.{" "}
          <span className="block bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
            Visible trust.
          </span>
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-5 max-w-3xl text-lg sm:text-xl text-[var(--fg-muted)] animate-[fadeIn_520ms_ease-out_both]">
          DigitalMeve embeds a lightweight, invisible <span className="font-semibold">.MEVE</span> proof
          into your file and issues an official certificate. Your document stays identical and readable
          everywhere — and anyone can verify it in seconds. No account. No storage.
        </p>

        {/* CTAs */}
        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-4 animate-[fadeIn_640ms_ease-out_both]"
          aria-describedby="hero-claims"
        >
          <Link
            href="/generate"
            className="btn btn-primary px-6 py-3 text-base font-semibold shadow-[0_0_45px_rgba(56,189,248,.25)] hover:brightness-110"
            aria-label="Get started for free with DigitalMeve"
          >
            <ShieldCheck className="h-5 w-5" />
            Get started for free
          </Link>

          <Link
            href="/verify"
            className="btn btn-outline px-6 py-3 text-base"
            aria-label="Verify a document with DigitalMeve"
          >
            <Radar className="h-5 w-5" />
            Verify a document
          </Link>
        </div>

        {/* Micro-claims */}
        <p
          id="hero-claims"
          className="mx-auto mt-3 max-w-2xl text-sm text-slate-400 animate-[fadeIn_720ms_ease-out_both]"
        >
          Privacy by design · In-browser processing · Free for individuals
        </p>

        {/* Premium badges row */}
        <div className="badge-group mt-6 animate-[fadeIn_800ms_ease-out_both]">
          <span className="badge badge--brand">
            <Sparkles className="opacity-90" />
            Free for individuals
          </span>
          <span className="badge badge--success">
            <ShieldCheck />
            Certificate included
          </span>
          <span className="badge badge--info">
            <ArrowRight />
            All file types
          </span>
          <span className="badge badge--neutral">
            No account • No storage
          </span>
        </div>
      </div>

      {/* Soft separator to next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
    </section>
  );
}
