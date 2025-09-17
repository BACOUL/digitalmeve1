"use client";

import Link from "next/link";
import { Upload, ShieldCheck, Download, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const card =
    "rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 transition hover:bg-white/[0.08]";
  const stepBadge =
    "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-200";

  return (
    <section
      id="how"
      aria-label="How DigitalMeve works"
      className="mx-auto max-w-6xl px-4 py-10 sm:py-14"
    >
      <h2 className="text-2xl sm:text-3xl font-semibold">How it works</h2>
      <p className="mt-2 text-slate-400">Three simple steps. No jargon.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {/* Step 1 */}
        <div className={card}>
          <span className={stepBadge}>
            <Upload className="h-3.5 w-3.5 text-emerald-400" />
            Step 1
          </span>
          <h3 className="mt-3 text-lg font-semibold">Upload your document</h3>
          <p className="mt-1 text-sm text-slate-300">
            Works with common formats; your file stays on your device.
          </p>
          <Link
            href="/generate"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-100 hover:opacity-90"
          >
            Try now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Step 2 */}
        <div className={card}>
          <span className={stepBadge}>
            <ShieldCheck className="h-3.5 w-3.5 text-sky-400" />
            Step 2
          </span>
          <h3 className="mt-3 text-lg font-semibold">Get your protected copy</h3>
          <p className="mt-1 text-sm text-slate-300">
            We add a lightweight, invisible <span className="font-semibold">.MEVE</span> proof and
            prepare your official certificate.
          </p>
        </div>

        {/* Step 3 */}
        <div className={card}>
          <span className={stepBadge}>
            <Download className="h-3.5 w-3.5 text-emerald-400" />
            Step 3
          </span>
          <h3 className="mt-3 text-lg font-semibold">Download &amp; share</h3>
          <p className="mt-1 text-sm text-slate-300">
            Share the file and its certificate. Anyone can check it in seconds.
          </p>
          <Link
            href="/verify"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-100 hover:opacity-90"
          >
            Verify a document <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Slim CTA bar (cohérent avec le hero) */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm sm:text-base text-slate-300">
          Add invisible proof to your file — in seconds.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/generate" className="btn btn-primary">Protect a file now</Link>
          <Link href="/verify" className="btn btn-outline">Verify a file</Link>
        </div>
      </div>
    </section>
  );
}
