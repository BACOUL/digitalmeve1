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
      {/* FX de fond */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
        <div className="beam" />
        <div className="noise" />
        <div className="absolute inset-x-0 top-0 h-12 bg-white/90 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </div>

      {/* Contenu */}
      <div className="relative mx-auto max-w-6xl px-4 pt-12 pb-8 text-center sm:px-5 sm:pt-24 sm:pb-20">
        {/* Eyebrow */}
        <div
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-[6px] text-[.68rem] sm:text-[.7rem] font-bold tracking-wide text-slate-200 backdrop-blur"
          role="note"
        >
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
          THE .MEVE STANDARD · Privacy-first · Certified integrity
        </div>

        {/* Titre */}
        <h1 className="mt-2 font-extrabold tracking-tight text-white leading-[1.12] text-[clamp(1.9rem,6vw,3.25rem)] sm:leading-[1.06] sm:text-6xl md:text-7xl">
          Invisible proof.
          <span className="block bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
            Visible trust.
          </span>
        </h1>

        {/* Sous-titre */}
        <p className="mx-auto mt-3 max-w-3xl text-[15px] sm:text-lg text-[var(--fg-muted)]">
          Protect any file with an invisible{" "}
          <span className="font-semibold">.MEVE</span> certificate — 100% private,
          verified anywhere in seconds.
        </p>

        {/* CTAs */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
          <Link
            href="/generate"
            className="btn btn-primary px-5 h-11 text-[15px] font-semibold shadow-[0_0_40px_rgba(56,189,248,.22)] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
          >
            <ShieldCheck aria-hidden className="h-[18px] w-[18px]" />
            Get started free
          </Link>
          <Link
            href="/verify"
            className="btn btn-outline px-5 h-11 text-[15px] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <Radar aria-hidden className="h-[18px] w-[18px]" />
            Verify a document
          </Link>
        </div>

        {/* Mini demo (statique pour l’instant) */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Drop a file to try DigitalMeve"
          className="mt-4 mx-auto w-full max-w-md sm:max-w-xl rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-5 hover:bg-white/10 transition-colors"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") window.location.assign("/generate");
          }}
          onClick={() => window.location.assign("/generate")}
        >
          <div className="text-sm sm:text-[15px] text-slate-200">
            <span className="font-semibold underline decoration-dotted underline-offset-4">
              Drop a file
            </span>{" "}
            to try — or pick one.
          </div>
          <div className="mt-1.5 text-xs text-slate-400">
            Your file never leaves your device.
          </div>
        </div>

        {/* Badges */}
        <div className="badge-group mt-4 flex flex-wrap justify-center gap-2">
          <span className="badge badge--brand">
            <Sparkles aria-hidden className="opacity-90" />
            Privacy by design
          </span>
          <span className="badge badge--success">
            <ShieldCheck aria-hidden />
            Certificate included
          </span>
          <span className="badge badge--info max-[360px]:hidden">
            <ArrowRight aria-hidden />
            All file types
          </span>
        </div>
      </div>

      {/* séparateur */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </section>
  );
}
