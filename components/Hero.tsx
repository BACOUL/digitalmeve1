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
      {/* ==== FX de fond (auroras + beam + grain) ==== */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
        <div className="beam" />
        <div className="noise" />
        {/* bandeau blanc pour fondre avec le header blanc */}
        <div className="absolute inset-x-0 top-0 h-12 bg-white/90 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </div>

      {/* ==== Contenu ==== */}
      <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-12 text-center sm:pt-24 sm:pb-20">
        {/* Eyebrow */}
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-[6px] text-[.7rem] font-bold tracking-wide text-slate-200 backdrop-blur">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
          THE .MEVE STANDARD
        </div>

        {/* Titre — plus compact sur mobile */}
        <h1 className="mt-3 text-balance font-extrabold tracking-tight text-white leading-[1.06] text-[clamp(2.2rem,6.2vw,3.75rem)] sm:text-6xl md:text-7xl">
          Invisible proof.
          <span className="block bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
            Visible trust.
          </span>
        </h1>

        {/* Sous-titre — compact */}
        <p className="mx-auto mt-4 max-w-3xl text-[15.5px] sm:text-lg text-[var(--fg-muted)]">
          DigitalMeve embeds a lightweight, invisible <span className="font-semibold">.MEVE</span> proof
          into your file and issues an official certificate. Your document remains identical and readable
          everywhere — anyone can verify it in seconds. No account. No storage.
        </p>

        {/* Micro-claims (plus courts, sans “free”) */}
        <p id="hero-claims" className="mx-auto mt-2 max-w-2xl text-sm text-slate-400">
          Privacy by design · In-browser processing · No account • No storage
        </p>

        {/* CTAs — tailles réduites pour tenir à l’écran */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3" aria-describedby="hero-claims">
          <Link
            href="/generate"
            className="btn btn-primary px-5 py-2.5 text-[15px] font-semibold shadow-[0_0_40px_rgba(56,189,248,.22)] hover:brightness-110"
          >
            <ShieldCheck className="h-[18px] w-[18px]" />
            Get started for free
          </Link>
          <Link
            href="/verify"
            className="btn btn-outline px-5 py-2.5 text-[15px]"
          >
            <Radar className="h-[18px] w-[18px]" />
            Verify a document
          </Link>
        </div>

        {/* Badges premium — UNE seule mention “Free” */}
        <div className="badge-group mt-5">
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
        </div>
      </div>

      {/* séparateur doux */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </section>
  );
}
