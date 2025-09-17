"use client";

import Link from "next/link";
import { ShieldCheck, Sparkles, BadgeCheck, File } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" aria-label="DigitalMeve — Invisible proof, visible trust" className="relative overflow-hidden">
      {/* décor (auroras / beam / grain) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
        <div className="beam" />
        <div className="noise" />
      </div>

      <div className="relative container-max text-center pt-28 pb-14 sm:pt-36 sm:pb-18">
        {/* Eyebrow */}
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-slate-200 backdrop-blur">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
          THE .MEVE STANDARD
        </div>

        {/* Headline — clamp pour éviter le “coupé” sur mobile */}
        <h1 className="mt-4 font-extrabold tracking-tight text-white leading-[1.08] [text-wrap:balance]
                       text-[clamp(2rem,6.2vw,3.5rem)] sm:text-[clamp(2.5rem,4.2vw,4.25rem)]">
          <span className="block">Invisible proof.</span>
          <span className="block bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
            Visible trust.
          </span>
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-5 max-w-3xl text-[15.5px] sm:text-lg text-[var(--fg-muted)]">
          DigitalMeve embeds a lightweight, invisible <span className="font-semibold">.MEVE</span> proof inside your file
          and issues an official certificate. Your document remains identical and readable everywhere — anyone can verify
          it in seconds. No account. No storage.
        </p>

        {/* Micro-claims */}
        <p id="hero-claims" className="mx-auto mt-3 max-w-2xl text-sm text-slate-400">
          Privacy by design · In-browser processing · Free for individuals
        </p>

        {/* CTAs */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5" aria-describedby="hero-claims">
          <Link href="/generate" className="btn btn-primary shadow-[0_0_38px_rgba(56,189,248,.22)]">
            <ShieldCheck className="h-4 w-4" />
            Protect a file
          </Link>
          <Link href="/verify" className="btn btn-ghost">
            <Sparkles className="h-4 w-4" />
            Verify a file
          </Link>
        </div>

        {/* Badges — style unifié, même taille/rythme */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          <span className="badge">
            <BadgeCheck className="h-3.5 w-3.5" />
            Certificate included
          </span>
          <span className="badge">
            <File className="h-3.5 w-3.5" />
            Files preserved
          </span>
          <span className="badge">No account • No storage</span>
          <span className="badge">Free for individuals</span>
        </div>
      </div>

      {/* fine divider */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </section>
  );
}
