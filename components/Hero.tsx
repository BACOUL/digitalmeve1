// components/Hero.tsx — v15 premium (clean, mobile-first, coherent with globals.css)
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShieldCheck, Radar, Sparkles } from "lucide-react";

const BASELINE_TOTAL = 23573; // seed crédible; remplacera plus tard /api/stats

function formatNumber(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

export default function Hero() {
  // compteur “vivant” (simulation +5..+20 / 5 min)
  const [totalDelta, setTotalDelta] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      const bump = Math.floor(Math.random() * 16) + 5;
      setTotalDelta((x) => x + bump);
    }, 300_000);
    return () => clearInterval(id);
  }, []);
  const totalDisplay = BASELINE_TOTAL + totalDelta;

  // animation d’apparition douce sans framer
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-fade]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.index || 0);
            e.target.classList.remove("opacity-0", "translate-y-3");
            e.target.style.transitionDelay = `${80 + i * 80}ms`;
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="hero"
      aria-label="DigitalMeve — Invisible proof. Visible trust."
      className="relative overflow-hidden"
    >
      {/* FX de fond (contraints au viewport pour éviter tout débordement) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(1200px 520px at 10% -10%, rgba(16,185,129,.10), transparent 60%), radial-gradient(1000px 460px at 85% -5%, rgba(56,189,248,.10), transparent 60%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-16 opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent)]"
          style={{ background: "rgba(255,255,255,.9)" }}
        />
        <div
          className="absolute inset-0 mix-blend-soft-light opacity-[0.06]"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><path d=%22M0 40L40 0%22 stroke=%22%23ffffff%22 stroke-opacity=%220.35%22 stroke-width=%220.5%22/></svg>')",
          }}
        />
      </div>

      {/* Contenu */}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-5 pt-16 sm:pt-24 pb-12 sm:pb-16 text-center">
        {/* Eyebrow */}
        <div
          data-fade
          data-index={0}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-[6px] text-[.70rem] font-semibold tracking-wide text-slate-200 backdrop-blur opacity-0 translate-y-3 transition-all duration-700"
          role="note"
        >
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
          THE .MEVE STANDARD · Privacy-first · Certified integrity
        </div>

        {/* Titre */}
        <h1
          data-fade
          data-index={1}
          className="mt-3 font-extrabold tracking-tight text-white leading-[1.12] text-[clamp(1.9rem,6vw,3.4rem)] sm:leading-[1.06] sm:text-6xl md:text-7xl opacity-0 translate-y-3 transition-all duration-700"
        >
          Invisible proof.
          <span className="block text-gradient">Visible trust.</span>
        </h1>

        {/* Sous-titre (simple) */}
        <p
          data-fade
          data-index={2}
          className="mx-auto mt-3 max-w-2xl text-[15px] sm:text-[17px] text-[var(--fg-muted)] opacity-0 translate-y-3 transition-all duration-700"
        >
          Turn any file into a universal proof of authenticity — directly in your browser,
          without storage.
        </p>

        {/* CTAs */}
        <div
          data-fade
          data-index={3}
          className="mt-5 flex flex-wrap items-center justify-center gap-2.5 opacity-0 translate-y-3 transition-all duration-700"
        >
          <Link
            href="/generate"
            aria-label="Try for free — 5 certificates included per month"
            className="btn btn-primary px-5 h-12 text-[15.5px] font-semibold shadow-[0_0_40px_rgba(56,189,248,.18)] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 w-full max-w-xs sm:w-auto"
          >
            <ShieldCheck aria-hidden className="h-[18px] w-[18px]" />
            Try free (5/month)
          </Link>
          <Link
            href="/verify"
            aria-label="Verify a document"
            className="btn btn-outline px-5 h-11 text-[15px] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 w-full max-w-xs sm:w-auto"
          >
            <Radar aria-hidden className="h-[18px] w-[18px]" />
            Verify a document
          </Link>
        </div>

        {/* Social proof compact */}
        <div
          data-fade
          data-index={4}
          className="mx-auto mt-4 flex flex-wrap items-center justify-center gap-2 text-[12px] text-slate-300/90 opacity-0 translate-y-3 transition-all duration-700"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5">
            {formatNumber(totalDisplay)} documents certified
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5">
            On-device only
          </span>
        </div>

        {/* Badges confiance (2 max pour rester clean) */}
        <div
          data-fade
          data-index={5}
          className="mt-2.5 flex flex-wrap items-center justify-center gap-2 opacity-0 translate-y-3 transition-all duration-700"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5 text-xs text-slate-300/80">
            <Sparkles aria-hidden className="h-3.5 w-3.5 opacity-80" />
            GDPR & Privacy-by-design
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5 text-xs text-slate-300/80">
            <ShieldCheck aria-hidden className="h-3.5 w-3.5 opacity-80" />
            Certificate included
          </span>
        </div>

        {/* Micro-claim */}
        <p
          data-fade
          data-index={6}
          className="mx-auto mt-2 max-w-xl text-[12.5px] text-slate-400 opacity-0 translate-y-3 transition-all duration-700"
        >
          Open standard · Verify anywhere in seconds
        </p>
      </div>

      {/* Séparateur */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </section>
  );
}
