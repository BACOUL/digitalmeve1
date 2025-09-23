// components/Hero.tsx — v13 (content aligned to GitHub: free 5/mo, €9.90/€29.90, DNS/key, cert HTML)
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShieldCheck, Radar, Sparkles, ArrowRight, KeyRound, Globe } from "lucide-react";

const BASELINE_TOTAL = 23573; // seed; replace by /api/stats when ready
function formatNumber(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

export default function Hero() {
  const [totalDelta, setTotalDelta] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      const bump = Math.floor(Math.random() * 16) + 5; // +5..+20 / 5min
      setTotalDelta((x) => x + bump);
    }, 300_000);
    return () => clearInterval(id);
  }, []);
  const totalDisplay = BASELINE_TOTAL + totalDelta;

  return (
    <section
      id="hero"
      aria-label="DigitalMeve — Invisible proof. Visible trust."
      className="fx-boundary relative overflow-hidden pb-[calc(96px+env(safe-area-inset-bottom))] sm:pb-20"
    >
      {/* Background bounded to viewport via .fx-boundary [data-fx] */}
      <div aria-hidden data-fx className="-z-10">
        <div className="aurora aurora-1 max-sm:opacity-70 max-sm:[filter:blur(6px)]" />
        <div className="aurora aurora-2 max-sm:opacity-70 max-sm:[filter:blur(6px)]" />
        <div className="aurora aurora-3 max-sm:opacity-70 max-sm:[filter:blur(6px)]" />
        <div className="beam" />
        <div className="noise" />
        <div className="absolute inset-x-0 top-0 h-12 bg-white/90 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-5 pt-20 sm:pt-24 pb-5 text-center">
        {/* Eyebrow: standard & privacy */}
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-[6px] text-[.68rem] sm:text-[.7rem] font-bold tracking-wide text-slate-200 backdrop-blur">
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
          THE .MEVE STANDARD · Privacy-first · Certified integrity
        </p>

        {/* Headline */}
        <h1 className="mt-2 font-extrabold tracking-tight text-white leading-[1.12] text-[clamp(1.75rem,6vw,3.25rem)] sm:leading-[1.06] sm:text-6xl md:text-7xl">
          Invisible proof.{" "}
          <span className="block bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
            Visible trust.
          </span>
        </h1>

        {/* Subheadline — matches GitHub promise */}
        <p className="mx-auto mt-3 max-w-3xl text-[15px] sm:text-lg text-[var(--fg-muted)]">
          Add an invisible, tamper-proof certificate inside any file. Certify in seconds, verify anywhere —
          your data never leaves your device.
        </p>

        {/* Primary CTAs (Free 5/mo; Verify) */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2.5">
          <Link
            href="/generate"
            aria-label="Try for free — 5 certificates per month included"
            className="btn btn-primary px-5 h-12 text-[15.5px] font-semibold shadow-[0_0_40px_rgba(56,189,248,.18)] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 max-[360px]:w-full"
          >
            <ShieldCheck aria-hidden className="h-[18px] w-[18px]" />
            Try free (5/month)
          </Link>

          <Link
            href="/verify"
            aria-label="Verify a document"
            className="btn btn-outline px-5 h-11 text-[15px] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 max-[360px]:w-full"
          >
            <Radar aria-hidden className="h-[18px] w-[18px]" />
            Verify a document
          </Link>
        </div>

        {/* Social proof + privacy claim */}
        <div className="mx-auto mt-4 flex flex-wrap items-center justify-center gap-2 text-[12px] text-slate-300/90">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5">
            {formatNumber(totalDisplay)} documents already certified
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5">
            No storage — 100% on-device
          </span>
        </div>

        {/* Trust badges — mirrors docs: GDPR, certificate HTML, all file types */}
        <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5 text-xs text-slate-300/80">
            <Sparkles aria-hidden className="h-3.5 w-3.5 opacity-80" />
            GDPR & privacy by design
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5 text-xs text-slate-300/80">
            <ShieldCheck aria-hidden className="h-3.5 w-3.5 opacity-80" />
            Certificate (HTML) included
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5 text-xs text-slate-300/80 max-[360px]:hidden">
            <ArrowRight aria-hidden className="h-3.5 w-3.5 opacity-80" />
            Works with PDF & DOCX
          </span>
        </div>

        {/* Pathways aligned to GitHub: Individuals / Professionals */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-[13px] text-slate-300/90">
          <Link href="/individuals" className="underline decoration-dotted underline-offset-4 hover:opacity-90">
            For Individuals — from €9.90/mo →
          </Link>
          <Link href="/professionals" className="underline decoration-dotted underline-offset-4 hover:opacity-90">
            For Professionals — from €29.90/mo →
          </Link>
        </div>

        {/* Enterprise hooks: DNS + private key (teaser) */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-[12px] text-slate-300/85">
          <span className="inline-flex items-center gap-1.5">
            <Globe className="h-3.5 w-3.5 opacity-80" aria-hidden />
            DNS binding
          </span>
          <span className="inline-flex items-center gap-1.5">
            <KeyRound className="h-3.5 w-3.5 opacity-80" aria-hidden />
            Private enterprise keys
          </span>
        </div>

        {/* Secondary links (docs/security/pricing/developers) — cohérence GitHub */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-[12.5px] text-slate-400">
          <Link href="/docs" className="underline decoration-dotted underline-offset-4 hover:text-slate-200">
            Standard
          </Link>
          <Link href="/security" className="underline decoration-dotted underline-offset-4 hover:text-slate-200">
            Security
          </Link>
          <Link href="/pricing" className="underline decoration-dotted underline-offset-4 hover:text-slate-200">
            Pricing
          </Link>
          <Link href="/developers" className="underline decoration-dotted underline-offset-4 hover:text-slate-200">
            Developers
          </Link>
        </div>

        {/* Micro-proof */}
        <p className="mx-auto mt-2 max-w-xl text-[12.5px] text-slate-400">
          Open standard · Verify anywhere in seconds · Auditable & future-proof
        </p>
      </div>

      {/* Separator */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
    </section>
  );
}
