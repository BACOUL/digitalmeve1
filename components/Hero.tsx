// components/Hero.tsx
"use client";

import Link from "next/link";
import { ShieldCheck, Radar, Sparkles, Lock } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="DigitalMeve — Preuve invisible. Confiance visible."
      className="relative overflow-hidden"
    >
      {/* FX de fond (inchangé) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
        <div className="beam" />
        <div className="noise" />
        <div className="absolute inset-x-0 top-0 h-12 bg-white/90 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </div>

      {/* Contenu */}
      <div className="relative mx-auto max-w-6xl px-4 pt-12 pb-12 text-center sm:px-5 sm:pt-24 sm:pb-20">
        {/* (Eyebrow supprimé) */}

        {/* Titre (inchangé) */}
        <h1 className="mt-2 font-extrabold tracking-tight text-white leading-[1.12] text-[clamp(1.9rem,6vw,3.25rem)] sm:leading-[1.06] sm:text-6xl md:text-7xl">
          Preuve invisible.
          {" "}
          <span className="block bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
            Confiance visible.
          </span>
        </h1>

        {/* Nouveau sous-titre (FR) */}
        <p className="mx-auto mt-3 max-w-3xl text-[15px] sm:text-lg text-[var(--fg-muted)]">
          Certifiez, protégez et horodatez n’importe quel fichier — instantanément, en toute confidentialité.
        </p>

        {/* CTAs (inchangés) */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
          <Link
            href="/generate"
            aria-label="Commencez gratuitement — ajouter un certificat .MEVE"
            className="btn btn-primary px-5 h-12 text-[15.5px] font-semibold shadow-[0_0_40px_rgba(56,189,248,.18)] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
          >
            <ShieldCheck aria-hidden className="h-[18px] w-[18px]" />
            Commencez gratuitement
          </Link>
          <Link
            href="/verify"
            aria-label="Vérifier un document"
            className="btn btn-outline px-5 h-11 text-[15px] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <Radar aria-hidden className="h-[18px] w-[18px]" />
            Vérifier un document
          </Link>
        </div>

        {/* Badges (3 items, dont “Aucun stockage”) */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5 text-xs text-slate-300/80">
            <Sparkles aria-hidden className="h-3.5 w-3.5 opacity-80" />
            Confidentialité dès la conception
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5 text-xs text-slate-300/80">
            <ShieldCheck aria-hidden className="h-3.5 w-3.5 opacity-80" />
            Certificat inclus
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5 text-xs text-slate-300/80">
            <Lock aria-hidden className="h-3.5 w-3.5 opacity-80" />
            Aucun stockage — vos fichiers restent sur votre appareil
          </span>
        </div>
      </div>

      {/* séparateur */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </section>
  );
}
