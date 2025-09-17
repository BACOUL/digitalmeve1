"use client";

import Link from "next/link";
import { ShieldCheck, Sparkles, BadgeCheck, File as FileIcon } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="DigitalMeve — Invisible proof, visible trust"
      className="relative overflow-hidden"
    >
      {/* ===== Décor (auroras + beam + vignette + grain) ===== */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
        <div className="beam" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/50" />
        <div className="noise" />
      </div>

      {/* ===== Contenu ===== */}
      <div className="relative mx-auto max-w-5xl px-6 pt-20 pb-16 text-center sm:pt-24 sm:pb-20">
        {/* Eyebrow */}
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200 backdrop-blur">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
          THE .MEVE STANDARD
        </div>

        {/* Headline (harmonisé avec le DS) */}
        <h1 className="heading-1 [text-wrap:balance] mt-4">
          <span className="block">Invisible proof.</span>
          <span className="block bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
            Visible trust.
          </span>
        </h1>

        {/* Subheading (EN) */}
        <p className="mx-auto mt-5 max-w-3xl text-lg sm:text-xl text-[var(--fg-muted)]">
          DigitalMeve embeds a lightweight, invisible <span className="font-semibold">.MEVE</span> proof inside your
          file and issues an official certificate. Your document remains identical and readable everywhere — anyone can
          verify it in seconds. No account. No storage.
        </p>

        {/* Micro-claims */}
        <p id="hero-claims" className="mx-auto mt-3 max-w-2xl text-sm text-slate-400">
          Privacy by design · In-browser processing · Free for individuals
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4" aria-describedby="hero-claims">
          <Link href="/generate" className="btn btn-primary shadow-[0_0_45px_rgba(56,189,248,.25)]">
            <ShieldCheck className="h-4 w-4" />
            Protect a file
          </Link>
          <Link href="/verify" className="btn btn-secondary">
            <Sparkles className="h-4 w-4" />
            Verify a file
          </Link>
        </div>

        {/* Badges — colorés & uniformes */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="badge badge-solid">
            <BadgeCheck />
            Certificate included
          </span>
          <span className="badge badge-emerald">
            <FileIcon />
            Files preserved
          </span>
          <span className="badge badge-sky">Free for individuals</span>
          <span className="badge">No account • No storage</span>
        </div>
      </div>

      {/* Séparateur doux */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </section>
  );
}
