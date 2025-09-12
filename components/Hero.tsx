// components/Hero.tsx
"use client";

import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";
import { FileDropzone } from "@/components/FileDropzone";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
        {/* Titre principal */}
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Your files. <span className="text-emerald-600">Verified.</span>{" "}
          Anywhere.
        </h1>

        {/* Sous-texte */}
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          No storage. Tamper-evident. Instant proof.
        </p>

        {/* Dropzone */}
        <div className="mt-10">
          <FileDropzone />
          <p className="mt-3 text-sm text-slate-500">
            Max 10 MB · 5 files/day (free plan)
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/generate" className="inline-flex">
            <CTAButton aria-label="Generate a proof">
              Get Started Free
            </CTAButton>
          </Link>
          <Link
            href="/verify"
            className="inline-flex rounded-2xl border border-slate-300 bg-white px-5 py-2.5 text-slate-700 shadow-sm transition hover:border-emerald-400 hover:text-emerald-700"
          >
            Already have a file? Verify it here
          </Link>
        </div>
      </div>
    </section>
  );
}
