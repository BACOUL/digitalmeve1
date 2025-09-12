// components/Hero.tsx
"use client";

import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";
import FileDropzone from "@/components/FileDropzone"; // ✅ fix import

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* halo doux */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 flex items-start justify-center"
      >
        <div className="mt-16 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          <span className="text-slate-900">Your files. </span>
          <span className="bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent">
            Verified. Anywhere.
          </span>
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600">
          No storage. Tamper-evident. Instant proof.
        </p>

        {/* Dropzone directement dans le Hero */}
        <div className="mt-8">
          <FileDropzone onSelected={() => {}} />
          <p className="mt-2 text-xs text-slate-500">
            Max 10 MB · 5 files/day (free plan)
          </p>
        </div>

        {/* CTA ligne */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/generate" className="inline-flex">
            <CTAButton aria-label="Generate a proof">Get Started Free</CTAButton>
          </Link>
          <Link
            href="/verify"
            className="inline-flex rounded-2xl border border-slate-300 bg-white px-5 py-2.5 text-slate-700 hover:border-emerald-400/60 hover:text-emerald-700"
          >
            Verify a proof
          </Link>
        </div>
      </div>
    </section>
  );
}
