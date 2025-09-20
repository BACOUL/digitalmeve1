"use client";

import Link from "next/link";
import { ShieldCheck, Radar } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="DigitalMeve — The digital proof of your documents"
      className="relative overflow-hidden"
    >
      {/* Background FX (conserve tes classes utilitaires si elles existent) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
        <div className="beam" />
        <div className="noise" />
        <div className="absolute inset-x-0 top-0 h-12 bg-white/90 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-5xl px-4 pt-14 pb-12 text-center sm:pt-24 sm:pb-16">
        {/* Headline */}
        <h1 className="font-extrabold tracking-tight text-white leading-[1.12] text-[clamp(1.9rem,6vw,3.25rem)] sm:text-6xl md:text-[64px] sm:leading-[1.05]">
          The digital proof of your documents
        </h1>

        {/* Subhead */}
        <p className="mx-auto mt-3 max-w-3xl text-[15px] sm:text-lg text-[var(--fg-muted)]">
          Certify, protect and timestamp any file — instantly, with full privacy.
        </p>

        {/* CTAs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          <Link
            href="/generate"
            aria-label="Protect a file — add a .MEVE certificate"
            className="btn btn-primary px-5 h-12 text-[15.5px] font-semibold shadow-[0_0_40px_rgba(56,189,248,.18)] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
          >
            <ShieldCheck aria-hidden className="h-[18px] w-[18px]" />
            Protect a file
          </Link>

          <Link
            href="/verify"
            aria-label="Verify a file"
            className="btn btn-outline px-5 h-11 text-[15px] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <Radar aria-hidden className="h-[18px] w-[18px]" />
            Verify a file
          </Link>
        </div>

        {/* Micro-proof */}
        <p className="mx-auto mt-4 max-w-xl text-[12.5px] text-slate-400">
          Open standard · 100% transparent · Verify anywhere in seconds
        </p>
      </div>

      {/* Divider */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </section>
  );
}
