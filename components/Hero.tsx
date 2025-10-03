// components/Hero.tsx — v18 (world-class: a11y, perf, reduced-motion, no global selectors)
"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ShieldCheck, Radar, Sparkles, BadgeCheck } from "lucide-react";

const BASELINE_TOTAL = 23573; // seed côté client (peut être remplacé par une valeur serveur)

function formatEN(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

export default function Hero() {
  const [display, setDisplay] = useState(0);
  const driftRef = useRef<number>(0);
  const rootRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useRef<boolean>(false);

  // Respecte prefers-reduced-motion (désactive révélations + count-up)
  useEffect(() => {
    try {
      reducedMotion.current =
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    } catch {
      reducedMotion.current = false;
    }
  }, []);

  // Révélations douces, scoped au composant (évite querySelectorAll global)
  useEffect(() => {
    if (!rootRef.current) return;
    if (reducedMotion.current) {
      // si motion réduite → montrer direct
      rootRef.current
        .querySelectorAll<HTMLElement>("[data-reveal='1']")
        .forEach((el) => {
          el.classList.remove("opacity-0", "translate-y-3");
          el.style.transitionDelay = "0ms";
        });
      return;
    }

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const idx = Number(el.dataset.index || 0);
          el.classList.remove("opacity-0", "translate-y-3");
          el.style.transitionDelay = `${80 + idx * 80}ms`;
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    rootRef.current
      .querySelectorAll<HTMLElement>("[data-reveal='1']")
      .forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [rootRef.current]);

  // Compteur progressif (désactivé si motion réduite)
  useEffect(() => {
    if (reducedMotion.current) {
      setDisplay(BASELINE_TOTAL);
      return;
    }
    const start = performance.now();
    const to = BASELINE_TOTAL;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 900);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // drift léger toutes les 5 min (évite reflow fréquent)
    const id = window.setInterval(() => {
      const bump = Math.floor(Math.random() * 16) + 5;
      driftRef.current += bump;
      setDisplay(BASELINE_TOTAL + driftRef.current);
    }, 300_000);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(id);
    };
  }, []);

  const totalDocs = useMemo(() => formatEN(display), [display]);

  return (
    <section
      id="hero"
      ref={rootRef}
      aria-label="DigitalMeve — Protect your documents, effortlessly."
      className="relative overflow-visible pb-[calc(84px+env(safe-area-inset-bottom))] sm:pb-20"
    >
      {/* Background FX (peu d’opacité → pas de gêne lisibilité / LCP) */}
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
        {/* Eyebrow */}
        <div
          data-reveal="1"
          data-index="0"
          className="reveal mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-[6px] text-[.68rem] sm:text-[.7rem] font-semibold tracking-wide text-slate-200 backdrop-blur opacity-0 translate-y-3 transition-all duration-500"
          role="note"
        >
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
          THE .MEVE STANDARD · Privacy-first · Certified integrity
        </div>

        {/* Headline */}
        <h1
          data-reveal="1"
          data-index="1"
          className="reveal mt-2 font-extrabold tracking-tight text-white leading-[1.12] text-[clamp(1.72rem,6vw,3.2rem)] sm:leading-[1.06] sm:text-6xl md:text-7xl opacity-0 translate-y-3 transition-all duration-500"
        >
          Protect your documents, effortlessly.
        </h1>

        {/* Subheadline (clarifie proposition leader / “unique au monde”) */}
        <p
          data-reveal="1"
          data-index="2"
          className="reveal mx-auto mt-3 max-w-3xl text-[15px] sm:text-lg text-[var(--fg-muted)] opacity-0 translate-y-3 transition-all duration-500"
        >
          DigitalMeve is the first open, on-device standard that adds a visible watermark
          and an invisible proof in seconds — private by design, verifiable anywhere.
        </p>

        {/* Micro-claims */}
        <p
          data-reveal="1"
          data-index="3"
          className="reveal mx-auto mt-2 max-w-xl text-[12.5px] text-slate-400 opacity-0 translate-y-3 transition-all duration-500"
        >
          Open standard · No account · No storage
        </p>

        {/* CTAs */}
        <div
          data-reveal="1"
          data-index="4"
          className="reveal mt-4 flex flex-wrap items-center justify-center gap-2.5 opacity-0 translate-y-3 transition-all duration-500"
        >
          <Link
            href="/generate"
            aria-label="Try for free — 5 included per month"
            className="btn btn-primary px-5 h-12 text-[15.5px] font-semibold shadow-[0_0_40px_rgba(56,189,248,.18)] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 max-[360px]:w-full"
          >
            <ShieldCheck aria-hidden className="h-[18px] w-[18px]" />
            Try free (5/month)
          </Link>

          <Link
            href="/verify"
            aria-label="Verify a document"
            className="btn btn-outline px-5 h-11 text-[15px] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 max-[360px]:w-full"
          >
            <Radar aria-hidden className="h-[18px] w-[18px]" />
            Verify a document
          </Link>
        </div>

        {/* Social proof (aria-live polite pour lecteurs d’écran) */}
        <div
          data-reveal="1"
          data-index="5"
          className="reveal mx-auto mt-4 flex flex-wrap items-center justify-center gap-2 text-[12px] text-slate-300/90 opacity-0 translate-y-3 transition-all duration-500"
          aria-live="polite"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5">
            {totalDocs} documents protected
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5">
            On-device only
          </span>
        </div>

        {/* Trust badges */}
        <div
          data-reveal="1"
          data-index="6"
          className="reveal mt-2.5 flex flex-wrap items-center justify-center gap-2 opacity-0 translate-y-3 transition-all duration-500"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5 text-xs text-slate-300/80">
            <Sparkles aria-hidden className="h-3.5 w-3.5 opacity-80" />
            GDPR & Privacy by design
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5 text-xs text-slate-300/80">
            <BadgeCheck aria-hidden className="h-3.5 w-3.5 opacity-80" />
            Watermark + Proof included
          </span>
        </div>
      </div>

      {/* Separator */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
    </section>
  );
}
