// components/Hero.tsx
"use client";

import Link from "next/link";
import { ShieldCheck, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="DigitalMeve — Invisible proof, visible trust"
      className="relative overflow-hidden"
    >
      {/* ===== Décor global (halos verts/bleus + beam + grain) ===== */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* Fond de scène très sombre pour contraste */}

        {/* Auroras (déjà stylées dans globals.css) */}
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />

        {/* Beam lumineux transversal */}
        <div className="beam" />

        {/* Vignette douce pour focus central */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/50" />

        {/* Grain subtil */}
        <div className="noise" />
      </div>

      {/* ===== Contenu ===== */}
      <div className="relative mx-auto max-w-5xl px-6 pt-20 pb-16 text-center sm:pt-24 sm:pb-20">
        {/* Eyebrow */}
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200 backdrop-blur">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
          THE .MEVE STANDARD
        </div>

        {/* Headline */}
        <h1 className="mt-4 text-balance font-extrabold leading-tight text-white tracking-tight text-5xl sm:text-6xl md:text-7xl">
          Invisible proof.
          <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
            Visible trust.
          </span>
        </h1>

        {/* Subheading */}
        <p className="mx-auto mt-5 max-w-3xl text-lg sm:text-xl text-[var(--fg-muted)]">
          DigitalMeve intègre une preuve <span className="font-semibold">.MEVE</span> légère et
          invisible dans votre fichier et émet un certificat officiel. Le document reste
          identique et lisible partout — et tout le monde peut le vérifier en quelques secondes.
          Aucun compte. Aucun stockage.
        </p>

        {/* Micro-claims */}
        <p id="hero-claims" className="mx-auto mt-3 max-w-2xl text-sm text-slate-400">
          Privacy by design · Traitement dans le navigateur · Gratuit pour les particuliers
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4" aria-describedby="hero-claims">
          <Link href="/generate" className="btn btn-primary shadow-[0_0_45px_rgba(56,189,248,.25)]">
            <ShieldCheck className="h-4 w-4" />
            Protéger un document
          </Link>
          <Link href="/verify" className="btn btn-outline">
            <Sparkles className="h-4 w-4" />
            Vérifier un document
          </Link>
        </div>

        {/* Badges de confiance */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="chip chip-ok">Certificat inclus</span>
          <span className="chip chip-info">PDF &amp; DOCX préservés</span>
          <span className="chip">Aucun compte • Aucun stockage</span>
        </div>
      </div>

      {/* ===== Bordure douce en bas pour séparer la section suivante ===== */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
    </section>
  );
}
