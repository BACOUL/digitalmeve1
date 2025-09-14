"use client";

import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";
// Optional: enable when you want inline demo
// import FileDropzone from "@/components/FileDropzone";

export function Hero() {
  return (
    <section className="relative overflow-hidden" id="hero">
      {/* subtle aura (kept very light for perf) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 flex items-start justify-center">
        <div className="mt-16 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl md:h-80 md:w-80" />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
        {/* Headline */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
            Add invisible proof. Earn visible trust.
          </span>
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
          <span className="font-semibold text-slate-100">.MEVE</span> embeds a timestamped fingerprint into your
          PDF &amp; DOCX—privacy-by-design and readable anywhere. No account. No storage.
        </p>

        {/* Micro-claims */}
        <p id="hero-claims" className="mx-auto mt-3 max-w-2xl text-sm text-slate-400">
          Free for individuals · ~2s per file · Works offline
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4" aria-describedby="hero-claims">
          <CTAButton href="/generate">Get started free</CTAButton>
          <Link
            href="/pro"
            className="rounded-2xl border border-slate-700/50 bg-slate-800/40 px-6 py-3 text-sm font-semibold text-slate-200 shadow hover:bg-slate-800/60"
          >
            For Business
          </Link>
        </div>
      </div>
    </section>
  );
}
