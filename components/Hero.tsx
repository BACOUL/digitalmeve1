// components/Hero.tsx — v8 (no demo card, clean CTAs, generous mobile padding)
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShieldCheck, Radar, Sparkles, ArrowRight } from "lucide-react";

const BASELINE_TOTAL = 23573; // credible starting number

function formatNumber(n: number) {
  return new Intl.NumberFormat(undefined).format(n);
}

export default function Hero() {
  // Counters (temporary simulated growth every 5 min; remove when backend is ready)
  const [totalDelta, setTotalDelta] = useState(0);
  const [today, setToday] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      const bump = Math.floor(Math.random() * 16) + 5; // 5–20
      setTotalDelta((x) => x + bump);
      setToday((t) => t + bump);
    }, 300_000); // 5 min
    return () => clearInterval(id);
  }, []);

  const totalDisplay = BASELINE_TOTAL + totalDelta;

  return (
    <section
      id="hero"
      aria-label="DigitalMeve — Invisible proof. Visible trust."
      // Pas de min-height forcée, pas d'overflow qui coupe; padding bas généreux + safe area
      className="relative overflow-visible pb-[calc(128px+env(safe-area-inset-bottom))]"
    >
      {/* Background FX */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora aurora-1 max-sm:opacity-70 max-sm:[filter:blur(6px)]" />
        <div className="aurora aurora-2 max-sm:opacity-70 max-sm:[filter:blur(6px)]" />
        <div className="aurora aurora-3 max-sm:opacity-70 max-sm:[filter:blur(6px)]" />
        <div className="beam" />
        <div className="noise" />
        <div className="absolute inset-x-0 top-0 h-12 bg-white/90 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-5 pt-20 sm:pt-24 pb-5 sm:pb-20 text-center">
        {/* Eyebrow */}
        <div
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-[6px] text-[.68rem] sm:text-[.7rem] font-bold tracking-wide text-slate-200 backdrop-blur"
          role="note"
        >
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
          THE .MEVE STANDARD · Privacy-first · Certified integrity
        </div>

        {/* Headline */}
        <h1 className="mt-2 font-extrabold tracking-tight text-white leading-[1.12] text-[clamp(1.75rem,6vw,3.25rem)] sm:leading-[1.06] sm:text-6xl md:text-7xl">
          Invisible proof.{" "}
          <span className="block bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
            Visible trust.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-3 max-w-3xl text-[15px] sm:text-lg text-[var(--fg-muted)]">
          Protect & verify any file in seconds — <span className="font-semibold">right on your device</span>. Your file
          never leaves your browser.
        </p>

        {/* CTAs — simples, sans doublon */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2.5">
          <Link
            href="/verify"
            aria-label="Verify a document"
            className="btn btn-primary px-5 h-12 text-[15.5px] font-semibold shadow-[0_0_40px_rgba(56,189,248,.18)] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
          >
            <ShieldCheck aria-hidden className="h-[18px] w-[18px]" />
            Verify a document
          </Link>

          <Link
            href="/generate"
            aria-label="Protect a file (.MEVE)"
            className="btn btn-outline px-5 h-11 text-[15px] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <Radar aria-hidden className="h-[18px] w-[18px]" />
            Protect a file (.MEVE)
          </Link>
        </div>

        {/* Live counters */}
        <div className="mx-auto mt-4 flex flex-wrap items-center justify-center gap-2 text-[12px] text-slate-300/90">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5">
            {formatNumber(totalDisplay)} files verified
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5">
            {formatNumber(today)} today
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5">
            On-device only
          </span>
        </div>

        {/* Badges */}
        <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5 text-xs text-slate-300/80">
            <Sparkles aria-hidden className="h-3.5 w-3.5 opacity-80" />
            Privacy by design
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5 text-xs text-slate-300/80">
            <ShieldCheck aria-hidden className="h-3.5 w-3.5 opacity-80" />
            Certificate included
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5 text-xs text-slate-300/80 max-[360px]:hidden">
            <ArrowRight aria-hidden className="h-3.5 w-3.5 opacity-80" />
            All file types
          </span>
        </div>

        {/* Trust bar */}
        <div className="mx-auto mt-3 flex flex-wrap items-center justify-center gap-3 text-[12.5px] text-slate-300">
          <span className="opacity-90">Trusted by creators & teams</span>
          <Link href="/early-partner" className="underline decoration-dotted underline-offset-4 hover:opacity-90">
            Become an early partner →
          </Link>
        </div>

        {/* Micro-proof */}
        <p className="mx-auto mt-2 max-w-xl text-[12.5px] text-slate-400">
          Open standard · 100% transparent · Verify anywhere in seconds
        </p>
      </div>

      {/* Separator */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </section>
  );
}
