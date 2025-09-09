// app/page.tsx
"use client";

import Link from "next/link";
import { useRef } from "react";

export default function HomePage() {
  // Parallaxe : on stocke la cible pour ne pas rafraîchir toute la page
  const heroRef = useRef<HTMLDivElement>(null);

  function onPointerMove(e: React.PointerEvent) {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;  // 0..1
    const y = (e.clientY - rect.top) / rect.height;  // 0..1
    el.style.setProperty("--mx", (x * 2 - 1).toFixed(3)); // -1..1
    el.style.setProperty("--my", (y * 2 - 1).toFixed(3));
  }

  return (
    <main className="relative">
      {/* HERO */}
      <section
        ref={heroRef}
        onPointerMove={onPointerMove}
        className="relative overflow-hidden px-6 sm:px-8 md:px-12 pt-28 pb-24"
      >
        {/* --- Fond WOW (calques) --- */}
        {/* Halo radial */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-20"
          style={{
            background:
              "radial-gradient(1200px 600px at 50% -10%, rgba(34,211,238,0.18), rgba(2,6,23,0) 60%)",
          }}
        />
        {/* Grille subtile masquée */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-20 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(900px 600px at 50% 0%, black, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(900px 600px at 50% 0%, black, transparent 70%)",
          }}
        />
        {/* Aurora animée (3 blobs) */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="aurora aurora-1" />
          <div className="aurora aurora-2" />
          <div className="aurora aurora-3" />
          {/* Grain très léger pour la matière */}
          <div className="noise" />
        </div>

        {/* --- Contenu --- */}
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge discreet */}
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
            Open, private & verifiable
          </div>

          <h1
            className="
              text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white
              [text-wrap:balance]
            "
          >
            The <span className="text-emerald-300">.MEVE</span> Standard
          </h1>

          <p className="mt-5 text-lg sm:text-xl leading-7 text-white/80">
            A simple, portable proof that certifies{" "}
            <strong className="text-white">existence</strong>,{" "}
            <strong className="text-white">integrity</strong> (SHA-256), and{" "}
            <strong className="text-white">authenticity</strong> of any file —
            in seconds.
          </p>

          {/* CTA : magnetic */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/generate"
              className="
                group relative inline-flex items-center justify-center rounded-2xl px-7 py-3 font-semibold
                text-slate-900 bg-gradient-to-r from-emerald-400 to-sky-400
                shadow-[0_10px_40px_-10px_rgba(34,211,238,0.55)]
                transition-transform will-change-transform
                hover:scale-[1.02] active:scale-[0.99]
              "
            >
              <span className="relative z-10">Generate a proof</span>
              {/* highlight gloss */}
              <span className="pointer-events-none absolute inset-0 rounded-2xl bg-white/40 opacity-0 mix-blend-overlay blur-[12px] transition-opacity group-hover:opacity-40" />
            </Link>

            <Link
              href="/verify"
              className="
                inline-flex items-center justify-center rounded-2xl px-7 py-3 font-semibold
                border border-white/10 text-white bg-white/5 hover:bg-white/10 transition
                backdrop-blur
              "
            >
              Verify a proof
            </Link>
          </div>

          {/* chips preuves */}
          <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-white/70">
            <div className="chip">Open standard</div>
            <div className="chip">No file storage</div>
            <div className="chip">Privacy-first</div>
            <div className="chip">API & CLI</div>
          </div>

          {/* liens secondaires */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/docs" className="pill">
              Docs
            </Link>
            <Link href="/pricing" className="pill">
              Pricing
            </Link>
            <Link href="/contact" className="pill">
              Contact
            </Link>
            <Link href="/demo" className="pill">
              Live demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
          }
