"use client";

import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* halo doux derrière les CTA */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-start justify-center"
      >
        <div className="mt-16 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          <span className="text-slate-100">The </span>
          <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
            .MEVE
          </span>{" "}
          <span className="text-slate-100">Standard</span>
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
          A simple, portable proof that certifies{" "}
          <strong className="text-slate-100">existence</strong>,{" "}
          <strong className="text-slate-100">integrity</strong> (SHA-256), and{" "}
          <strong className="text-slate-100">authenticity</strong> of any file — in seconds.
        </p>

        {/* CTA row */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/generate" className="inline-flex">
            <CTAButton aria-label="Generate a proof">Generate a proof</CTAButton>
          </Link>
          <Link
            href="/verify"
            className="inline-flex rounded-2xl border border-white/15 bg-slate-900/70 px-5 py-2.5 text-slate-100 backdrop-blur-md transition hover:border-emerald-400/60"
          >
            Verify a proof
          </Link>
        </div>

        {/* Pills */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center">
          {["Open standard", "No file storage", "Privacy-first", "API & CLI"].map((label) => (
            <span
              key={label}
              className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-2 text-sm text-slate-300 backdrop-blur-md"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
