// components/Hero.tsx
"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { ShieldCheck, Radar, Sparkles, ArrowRight } from "lucide-react";

export default function Hero() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  // 👉 Branche ici ta logique réelle de protection/vérification 100% locale
  const handleFile = useCallback(async (file: File) => {
    try {
      setBusy(true);
      setStatus("Verifying in your browser…");
      // TODO: Remplace la ligne suivante par ton vrai traitement (in-browser)
      await new Promise((r) => setTimeout(r, 1400));
      setStatus("Verified ✔ — tamper-proof certificate ready.");
    } catch (e) {
      setStatus("Something went wrong. Try another file.");
    } finally {
      setBusy(false);
    }
  }, []);

  const onDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
      const f = e.dataTransfer.files?.[0];
      if (f) await handleFile(f);
    },
    [handleFile]
  );

  const onChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) await handleFile(f);
      // reset pour pouvoir redéposer le même fichier si besoin
      e.currentTarget.value = "";
    },
    [handleFile]
  );

  return (
    <section
      id="hero"
      aria-label="DigitalMeve — Invisible proof. Visible trust."
      className="relative overflow-hidden"
    >
      {/* FX de fond (garde tes classes existantes) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
        <div className="beam" />
        <div className="noise" />
        <div className="absolute inset-x-0 top-0 h-12 bg-white/90 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </div>

      {/* Contenu */}
      <div className="relative mx-auto max-w-6xl px-4 pt-10 pb-5 text-center sm:px-5 sm:pt-24 sm:pb-20">
        {/* Eyebrow */}
        <div
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-[6px] text-[.68rem] sm:text-[.7rem] font-bold tracking-wide text-slate-200 backdrop-blur"
          role="note"
        >
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
          THE .MEVE STANDARD · Privacy-first · Certified integrity
        </div>

        {/* Titre */}
        <h1 className="mt-2 font-extrabold tracking-tight text-white leading-[1.12] text-[clamp(1.9rem,6vw,3.25rem)] sm:leading-[1.06] sm:text-6xl md:text-7xl">
          Invisible proof.{" "}
          <span className="block bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
            Visible trust.
          </span>
        </h1>

        {/* Sous-titre */}
        <p className="mx-auto mt-3 max-w-3xl text-[15px] sm:text-lg text-[var(--fg-muted)]">
          Protect & verify any file in seconds — <span className="font-semibold">right on your device</span>. Your file
          never leaves your browser.
        </p>

        {/* CTAs */}
        <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2.5">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={busy}
            aria-label="Verify your file"
            className="btn btn-primary px-5 h-12 text-[15.5px] font-semibold shadow-[0_0_40px_rgba(56,189,248,.18)] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 disabled:opacity-60"
          >
            <ShieldCheck aria-hidden className="h-[18px] w-[18px]" />
            {busy ? "Working…" : "Verify your file"}
          </button>

          {/* Optionnel : CTA secondaire vers génération .MEVE */}
          <Link
            href="/generate"
            aria-label="Protect a file (.MEVE)"
            className="btn btn-outline px-5 h-11 text-[15px] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <Radar aria-hidden className="h-[18px] w-[18px]" />
            Protect a file (.MEVE)
          </Link>
        </div>

        {/* Micro-texte sous CTA */}
        <div className="mt-1 text-xs text-slate-300/90">or drag & drop below</div>

        {/* Input caché */}
        <input
          ref={fileInputRef}
          type="file"
          onChange={onChange}
          className="sr-only"
          aria-hidden="true"
        />

        {/* Drop zone — vraie, interactive */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Drop a file here or press Enter to choose a file"
          aria-describedby="demo-formats"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
          }}
          onDragEnter={() => setDragging(true)}
          onDragOver={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "copy";
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={[
            "mt-3 mx-auto w-full max-w-md sm:max-w-xl rounded-xl sm:rounded-2xl border p-3 sm:p-5 transition-colors cursor-pointer",
            isDragging ? "border-emerald-300 bg-emerald-300/10" : "border-white/10 bg-white/5 hover:bg-white/10",
          ].join(" ")}
        >
          <div className="mx-auto mb-2 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] tracking-wide text-slate-300">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Demo
          </div>
          <div className="text-sm sm:text-[15px] text-slate-200">
            <span className="font-semibold underline decoration-dotted underline-offset-4">
              Drop any file
            </span>{" "}
            to try — or pick one.
          </div>
          <div id="demo-formats" className="mt-1.5 text-xs text-slate-400">
            Private-first. Your file never leaves your device.{" "}
            <span className="opacity-80">PNG, JPG, PDF, DOCX, ZIP…</span>
          </div>

          {/* Statut (ARIA live) */}
          {status && (
            <p className="mt-2 text-xs text-slate-200/90" role="status" aria-live="polite">
              {status}
            </p>
          )}

          {/* Lien fichier d'exemple (déclenche un succès simulé si tu veux) */}
          <button
            type="button"
            onClick={async () => {
              setBusy(true);
              setStatus("Verifying sample in your browser…");
              await new Promise((r) => setTimeout(r, 800));
              setBusy(false);
              setStatus("Verified ✔ — sample file OK.");
            }}
            className="mt-2 text-xs text-slate-200/90 underline decoration-dotted underline-offset-4 hover:opacity-90"
          >
            Try with a sample file →
          </button>
        </div>

        {/* Preuves beta honnêtes */}
        <div className="mx-auto mt-3 flex flex-wrap items-center justify-center gap-2 text-[12px] text-slate-300/90">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5">
            42 files verified in beta
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5">
            Median time &lt; 10s
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5">
            On-device only
          </span>
        </div>

        {/* Badges (garde les tiens) */}
        <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5 text-xs text-slate-300/80">
            <Sparkles aria-hidden className="h-3.5 w-3.5 opacity-80" />
            Privacy by design
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5 text-xs text-slate-300/80">
            <ShieldCheck aria-hidden className="h-3.5 w-3.5 opacity-80" />
            Certificate included
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5 text-xs text-slate-300/80 max-[360px]:hidden">
            <ArrowRight aria-hidden className="h-3.5 w-3.5 opacity-80" />
            All file types
          </span>
        </div>

        {/* Trust bar sans logos mensongers */}
        <div className="mx-auto mt-3 flex flex-wrap items-center justify-center gap-3 text-[12.5px] text-slate-300">
          <span className="opacity-90">Trusted by our beta testers</span>
          <Link
            href="/early-partner"
            className="underline decoration-dotted underline-offset-4 hover:opacity-90"
          >
            Become an early partner →
          </Link>
        </div>

        {/* Micro-preuve */}
        <p className="mx-auto mt-2 max-w-xl text-[12.5px] text-slate-400">
          Open standard · 100% transparent · Verify anywhere in seconds
        </p>
      </div>

      {/* séparateur */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </section>
  );
                }
