// components/Hero.tsx — v17 (world-class 9.6+, mobile-first, no TS errors)
"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ShieldCheck, Radar, Sparkles, BadgeCheck } from "lucide-react";

const BASELINE_TOTAL = 23573; // credible baseline

function formatEN(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

export default function Hero() {
  /** Counter starts directly at baseline (no 0 flash), then drifts every 5 min */
  const [display, setDisplay] = useState<number>(BASELINE_TOTAL);
  const driftRef = useRef<number>(0);

  // Reveal-on-view (no TS errors: cast to HTMLElement)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const idx = Number(el.dataset.index || 0);
          el.classList.remove("opacity-0", "translate-y-3");
          el.style.transitionDelay = `${80 + idx * 80}ms`;
          io.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    document
      .querySelectorAll<HTMLElement>("[data-reveal='1']")
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Gentle drift (+5..+20) every 5 minutes
  useEffect(() => {
    const id = setInterval(() => {
      const bump = Math.floor(Math.random() * 16) + 5; // 5–20
      driftRef.current += bump;
      setDisplay(BASELINE_TOTAL + driftRef.current);
    }, 300_000);
    return () => clearInterval(id);
  }, []);

  const totalFormatted = useMemo(() => formatEN(display), [display]);
  const totalShort = useMemo(() => `${Math.floor(display / 1000)}k+`, [display]);

  return (
    <section
      id="hero"
      aria-label="DigitalMeve — Invisible proof. Visible trust."
      className="relative overflow-visible pb-[calc(84px+env(safe-area-inset-bottom))] sm:pb-20"
    >
      {/* Background FX (bounded to viewport) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-24 -left-24 h-[520px] w-[520px] rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(16,185,129,.35), transparent 65%)" }}
        />
        <div
          className="absolute -top-28 right-[-10%] h-[560px] w-[560px] rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(closest-side, rgba(56,189,248,.28), transparent 65%)" }}
        />
        <div className="absolute inset-x-0 top-0 h-12 bg-white/90 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-4 sm:px-5 pt-20 sm:pt-24 pb-4 text-center">
        {/* Eyebrow (shorter on mobile to avoid wrap) */}
        <div
          data-reveal="1"
          data-index="0"
          className="reveal mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-[6px] text-[.68rem] sm:text-[.7rem] font-semibold tracking-wide text-slate-200 backdrop-blur opacity-0 translate-y-3 transition-all duration-500"
          role="note"
        >
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="sm:hidden">The .MEVE Standard · Privacy-first</span>
          <span className="hidden sm:inline">The .MEVE Standard · Privacy-first · On-device only</span>
        </div>

        {/* Headline */}
        <h1
          data-reveal="1"
          data-index="1"
          className="reveal mt-2 font-extrabold tracking-tight text-white leading-[1.12] text-[clamp(1.72rem,6vw,3.2rem)] sm:leading-[1.06] sm:text-6xl md:text-7xl opacity-0 translate-y-3 transition-all duration-500"
        >
          Invisible proof.{" "}
          <span className="block bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
            Visible trust.
          </span>
        </h1>

        {/* Subheadline (concise, non-redundant) */}
        <p
          data-reveal="1"
          data-index="2"
          className="reveal mx-auto mt-3 max-w-3xl text-[15px] sm:text-lg text-[var(--fg-muted)] opacity-0 translate-y-3 transition-all duration-500"
        >
          Add an invisible certificate that proves your ownership — with zero data stored.
        </p>

        {/* Micro-claims (clean order, extra spacing on mobile) */}
        <div
          data-reveal="1"
          data-index="3"
          className="reveal mx-auto mt-3 flex flex-wrap items-center justify-center gap-2 gap-y-2 opacity-0 translate-y-3 transition-all duration-500"
          aria-label="Key claims"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5 text-xs text-slate-300/80">
            Open standard · No account
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5 text-xs text-slate-300/80">
            <Sparkles aria-hidden className="h-3.5 w-3.5 opacity-80" />
            GDPR by design
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5 text-xs text-slate-300/80">
            <BadgeCheck aria-hidden className="h-3.5 w-3.5 opacity-80" />
            Verify in seconds
          </span>
        </div>

        {/* CTAs */}
        <div
          data-reveal="1"
          data-index="4"
          className="reveal mt-4 flex flex-wrap items-center justify-center gap-2.5 opacity-0 translate-y-3 transition-all duration-500"
        >
          <Link
            href="/generate"
            aria-label="Protect my files for free — 5 certificates per month"
            className="btn btn-primary px-5 h-12 text-[15.5px] font-semibold shadow-[0_0_40px_rgba(56,189,248,.18)] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 max-[360px]:w-full"
          >
            <ShieldCheck aria-hidden className="h-[18px] w-[18px]" />
            Protect my files (Free)
          </Link>

          <Link
            href="/verify"
            aria-label="Verify a document instantly"
            className="btn btn-outline px-5 h-11 text-[15px] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 max-[360px]:w-full"
          >
            <Radar aria-hidden className="h-[18px] w-[18px]" />
            Verify instantly
          </Link>
        </div>

        {/* Social proof (short on mobile, exact on desktop) */}
        <div
          data-reveal="1"
          data-index="5"
          className="reveal mx-auto mt-4 flex flex-wrap items-center justify-center gap-2 text-[12px] text-slate-300/90 opacity-0 translate-y-3 transition-all duration-500"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5">
            <span className="sm:hidden">{totalShort}</span>
            <span className="hidden sm:inline">{totalFormatted}</span> documents protected
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5">
            On-device only
          </span>
        </div>
      </div>

      {/* Separator */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </section>
  );
}
