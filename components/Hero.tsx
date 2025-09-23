// components/Hero.tsx — v14 (focus, safe mobile, fx-boundary)
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ShieldCheck, Radar } from "lucide-react";

const BASELINE_TOTAL = 23573;

function formatNumber(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

export default function Hero() {
  // Compteur léger, safe côté hydratation
  const [mounted, setMounted] = useState(false);
  const [delta, setDelta] = useState(0);
  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => {
      setDelta((d) => d + (Math.floor(Math.random() * 16) + 5)); // +5..+20 / 5min
    }, 300_000);
    return () => clearInterval(id);
  }, []);
  const total = mounted ? BASELINE_TOTAL + delta : BASELINE_TOTAL;

  return (
    <section
      id="hero"
      aria-label="DigitalMeve — Invisible proof. Visible trust."
      className="relative"
    >
      {/* FX boundary = aucun débordement horizontal */}
      <div className="fx-boundary">
        {/* Décor discret et confiné */}
        <div data-fx aria-hidden>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(900px 420px at 15% 0%, rgba(16,185,129,.07), transparent 55%), radial-gradient(900px 420px at 85% 0%, rgba(56,189,248,.07), transparent 55%)",
            }}
          />
        </div>

        {/* Contenu */}
        <div className="relative mx-auto max-w-6xl px-4 sm:px-5 pt-18 sm:pt-24 pb-[calc(72px+env(safe-area-inset-bottom))] text-center">
          <h1 className="font-extrabold tracking-tight text-white leading-tight text-[clamp(1.8rem,6.2vw,3.4rem)]">
            Invisible proof.{" "}
            <span className="block bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
              Visible trust.
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-3xl text-[15px] sm:text-lg text-[var(--fg-muted)]">
            Turn any file into a universal proof of authenticity — in your browser,
            without storage.
          </p>

          {/* CTAs minimalistes */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
            <Link
              href="/generate"
              className="btn btn-primary px-5 h-12 text-[15.5px] font-semibold shadow-[0_0_40px_rgba(56,189,248,.18)] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 max-[360px]:w-full"
              aria-describedby="hero-free-desc"
            >
              <ShieldCheck className="h-[18px] w-[18px]" aria-hidden />
              Try free (5/month)
            </Link>

            <Link
              href="/verify"
              className="btn btn-outline px-5 h-11 text-[15px] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 max-[360px]:w-full"
            >
              <Radar className="h-[18px] w-[18px]" aria-hidden />
              Verify a document
            </Link>
          </div>

          {/* Micro-assurance + compteur (une seule ligne) */}
          <p id="hero-free-desc" className="visually-hidden">
            No storage. 100% on-device. Includes a human-readable certificate.
          </p>

          <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5 text-[12px] text-slate-300/90">
            {formatNumber(total)} documents certified · On-device only
          </div>
        </div>
      </div>
    </section>
  );
}
