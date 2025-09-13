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
          <Link href="/generate" className="inline-flex">
            <CTAButton aria-label="Start protecting a document">Start free</CTAButton>
          </Link>
          <Link
            href="/verify"
            className="inline-flex rounded-2xl border border-white/15 bg-slate-900/70 px-5 py-2.5 text-slate-100 backdrop-blur-md transition hover:border-emerald-400/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
            aria-label="Verify a document"
          >
            Verify a document
          </Link>
          <Link
            href="/#how-it-works"
            className="inline-flex rounded-2xl border border-white/10 px-5 py-2.5 text-slate-200 hover:text-white hover:border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40"
            aria-label="Scroll to how it works"
          >
            How it works
          </Link>
        </div>

        {/* Instant try (lightweight placeholder; wire later) */}
        <div className="mt-6 text-sm text-slate-400">
          <Link
            href="/samples/sample.pdf"
            className="underline decoration-slate-500 underline-offset-4 hover:text-slate-200"
            aria-label="Download a sample PDF to try"
          >
            Try with a sample PDF
          </Link>
          <span className="mx-2">·</span>
          <Link
            href="/verify"
            className="underline decoration-slate-500 underline-offset-4 hover:text-slate-200"
            aria-label="See verification flow"
          >
            See verification
          </Link>
        </div>

        {/* Optional inline dropzone demo — enable when ready */}
        {/*
        <div className="mt-10">
          <FileDropzone onSelected={(f) => console.log("Selected:", f)} />
        </div>
        */}
      </div>
    </section>
  );
}
