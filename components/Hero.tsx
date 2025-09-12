// components/Hero.tsx
"use client";

import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";
import FileDropzone from "@/components/FileDropzone"; // ✅ corrigé : import par défaut

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
          <span className="text-slate-100">DigitalMeve — </span>
          <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
            The reference for your documents’ authenticity
          </span>
        </h1>

        {/* Sous-titre demandé */}
        <p className="mx-auto mt-3 max-w-2xl text-base text-slate-300">
          <span className="font-semibold text-slate-100">Simple</span> •{" "}
          <span className="font-semibold text-slate-100">Universelle</span> •{" "}
          <span className="font-semibold text-slate-100">Gratuite</span>
        </p>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
          DigitalMeve delivers a simple, universal digital proof — free for
          everyone.
        </p>

        {/* CTA ligne classique */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/generate" className="inline-flex">
            <CTAButton aria-label="Generate a proof">Get Started Free</CTAButton>
          </Link>
          <Link
            href="/verify"
            className="inline-flex rounded-2xl border border-white/15 bg-slate-900/70 px-5 py-2.5 text-slate-100 backdrop-blur-md transition hover:border-emerald-400/60"
          >
            Verify a proof
          </Link>
        </div>

        {/* Exemple d’intégration Dropzone (optionnel) */}
        <div className="mt-10">
          <FileDropzone onSelected={(f) => console.log("Selected:", f)} />
        </div>
      </div>
    </section>
  );
}
