// components/Hero.tsx
"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { ShieldCheck, Radar, Sparkles, ArrowRight, UploadCloud } from "lucide-react";

export default function Hero() {
  const [dragActive, setDragActive] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const onDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      // On ne traite pas ici, on envoie l'utilisateur vers l’expérience complète
      setStatusMsg("Fichier détecté. Redirection vers l’outil…");
      window.location.assign("/generate");
    }
  }, []);

  return (
    <section
      id="hero"
      aria-label="DigitalMeve — Invisible proof, visible trust"
      className="relative overflow-hidden"
    >
      {/* ==== FX de fond (auroras + beam + grain) ==== */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
        <div className="beam motion-safe:animate-pulse" />
        <div className="noise" />
        {/* bandeau blanc pour fondre avec le header blanc */}
        <div className="absolute inset-x-0 top-0 h-12 bg-white/90 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </div>

      {/* ==== Contenu ==== */}
      <div className="relative mx-auto max-w-6xl px-5 pt-16 pb-12 text-center sm:pt-24 sm:pb-20">
        {/* Eyebrow */}
        <div
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-[6px] text-[.7rem] font-bold tracking-wide text-slate-200 backdrop-blur"
          role="note"
          aria-label=".MEVE standard"
        >
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
          THE .MEVE STANDARD
        </div>

        {/* Titre */}
        <h1 className="mt-3 text-balance font-extrabold tracking-tight text-white leading-[1.06] text-[clamp(2.2rem,6.2vw,3.75rem)] sm:text-6xl md:text-7xl">
          Invisible proof.
          <span className="block bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
            Visible trust.
          </span>
        </h1>

        {/* Sous-titre (micro-copy outcome-driven) */}
        <p className="mx-auto mt-4 max-w-3xl text-[15.5px] sm:text-lg text-[var(--fg-muted)]">
          Add a lightweight, invisible <span className="font-semibold">.MEVE</span> proof to any file and get an official certificate.
          Your document stays identical and readable everywhere — verification takes seconds.
        </p>

        {/* Claims => liste accessible */}
        <ul
          id="hero-claims"
          className="mx-auto mt-3 flex max-w-2xl flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-slate-400"
          aria-label="Key guarantees"
        >
          <li className="before:content-['•'] before:mx-1 before:text-slate-500">Privacy by design</li>
          <li className="before:content-['•'] before:mx-1 before:text-slate-500">In-browser processing</li>
          <li className="before:content-['•'] before:mx-1 before:text-slate-500">No account</li>
          <li className="before:content-['•'] before:mx-1 before:text-slate-500">No storage</li>
        </ul>

        {/* CTAs */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3" aria-describedby="hero-claims">
          <Link
            href="/generate"
            className="btn btn-primary px-5 py-2.5 text-[15px] font-semibold shadow-[0_0_40px_rgba(56,189,248,.22)] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
          >
            <ShieldCheck aria-hidden className="h-[18px] w-[18px]" />
            Get started for free
          </Link>
          <Link
            href="/verify"
            className="btn btn-outline px-5 py-2.5 text-[15px] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <Radar aria-hidden className="h-[18px] w-[18px]" />
            Verify a document
          </Link>
        </div>

        {/* Mini dropzone (démo immédiate) */}
        <div
          onDragEnter={onDrag}
          onDragOver={onDrag}
          onDragLeave={onDrag}
          onDrop={onDrop}
          role="button"
          tabIndex={0}
          aria-label="Drop a file to try DigitalMeve"
          className={[
            "mt-6 mx-auto w-full max-w-xl rounded-2xl border p-4 sm:p-5",
            "transition-all duration-150",
            dragActive
              ? "border-emerald-400/70 bg-emerald-400/10 shadow-[0_0_0_3px_rgba(52,211,153,0.25)]"
              : "border-white/10 bg-white/5 hover:bg-white/10"
          ].join(" ")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              window.location.assign("/generate");
            }
          }}
        >
          <div className="flex items-center justify-center gap-3">
            <UploadCloud aria-hidden className="h-5 w-5 opacity-90" />
            <div className="text-sm sm:text-[15px] text-slate-200">
              <span className="font-semibold">Drop a file</span> to try — or{" "}
              <Link href="/generate" className="underline hover:no-underline">
                pick one
              </Link>
              .
            </div>
          </div>
          <div className="mt-2 text-xs text-slate-400">
            PNG, JPG, PDF, DOCX, ZIP… Your file stays on your device.
          </div>
          <div className="sr-only" aria-live="polite">
            {statusMsg ?? ""}
          </div>
        </div>

        {/* Badges */}
        <div className="badge-group mt-5">
          <span className="badge badge--brand">
            <Sparkles aria-hidden className="opacity-90" />
            Free for individuals
          </span>
          <span className="badge badge--success">
            <ShieldCheck aria-hidden />
            Certificate included
          </span>
          <span className="badge badge--info">
            <ArrowRight aria-hidden />
            All file types
          </span>
        </div>

        {/* Preuve sociale (placeholder) */}
        <div className="mt-8 opacity-90">
          <p className="text-xs uppercase tracking-wide text-slate-400">Trusted by creators & teams</p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-6 opacity-80">
            <span className="h-6 w-24 rounded bg-white/10" aria-label="Logo placeholder" />
            <span className="h-6 w-24 rounded bg-white/10" aria-label="Logo placeholder" />
            <span className="h-6 w-24 rounded bg-white/10" aria-label="Logo placeholder" />
            <span className="h-6 w-24 rounded bg-white/10" aria-label="Logo placeholder" />
          </div>
        </div>
      </div>

      {/* séparateur doux */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </section>
  );
}
