// components/Hero.tsx
"use client";

import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";
// import FileDropzone from "@/components/FileDropzone"; // Optionnel: à activer si on veut déposer un fichier depuis le hero

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* halo doux (moins dense pour mobile) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 flex items-start justify-center"
      >
        <div className="mt-16 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl md:h-80 md:w-80" />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
        {/* Slogan validé */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
            Invisible proof. Visible trust.
          </span>
        </h1>

        {/* Sous-titre simple, grand public */}
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
          DigitalMeve adds a unique <span className="font-semibold text-slate-100">.MEVE</span> proof to your files
          (PDF &amp; DOCX today). No accounts. No storage. Share and verify anywhere.
        </p>

        {/* Micro-badges de crédibilité */}
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400">
          Private by design · Free for individuals · Works offline
        </p>

        {/* CTA principaux */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link href="/generate" className="inline-flex">
            <CTAButton aria-label="Generate a proof">Get Started Free</CTAButton>
          </Link>
          <Link
            href="/verify"
            className="inline-flex rounded-2xl border border-white/15 bg-slate-900/70 px-5 py-2.5 text-slate-100 backdrop-blur-md transition hover:border-emerald-400/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
          >
            Verify a document
          </Link>
          <Link
            href="/#how-it-works"
            className="inline-flex rounded-2xl border border-white/10 px-5 py-2.5 text-slate-200 hover:text-white hover:border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40"
          >
            How it works
          </Link>
        </div>

        {/* Dropzone en option (désactivée par défaut pour garder un hero léger)
        <div className="mt-10">
          <FileDropzone onSelected={(f) => console.log("Selected:", f)} />
        </div>
        */}
      </div>
    </section>
  );
}
