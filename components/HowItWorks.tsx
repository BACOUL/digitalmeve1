// components/HowItWorks.tsx
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

type Step = {
  n: number;
  title: string;
  desc: string;
};

const STEPS: Step[] = [
  {
    n: 1,
    title: "Upload",
    desc: "Dépose un fichier (PDF, PNG, etc.) ou prends une photo. Rien n’est stocké : tout est traité en mémoire.",
  },
  {
    n: 2,
    title: "Generate .MEVE",
    desc: "Nous calculons le SHA-256, ajoutons un horodatage UTC et ton émetteur. Télécharge le fichier certifié.",
  },
  {
    n: 3,
    title: "Verify anywhere",
    desc: "Vérifie le fichier *.meve.ext* ou la preuve JSON — sur le site, en API, ou en CLI.",
  },
];

export default function HowItWorks() {
  // Simple “reveal on scroll” sans lib externe
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-revealed");
        });
      },
      { threshold: 0.15 }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={rootRef} id="how-it-works" className="relative py-20 md:py-28">
      {/* fond grille subtile */}
      <div aria-hidden className="absolute inset-0 grid-bg pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative">
        <div className="mb-10 md:mb-14">
          <p className="text-emerald-300/90 text-sm font-semibold tracking-wide uppercase" data-reveal>
            How it works
          </p>
          <h2
            className="mt-2 text-3xl md:text-5xl font-extrabold tracking-tight text-white"
            data-reveal
            style={{ transitionDelay: "60ms" }}
          >
            Verify any document<span className="text-white/70"> in seconds.</span>
          </h2>
          <p
            className="mt-4 max-w-2xl text-white/70"
            data-reveal
            style={{ transitionDelay: "120ms" }}
          >
            Le standard <span className="text-emerald-300 font-semibold">.MEVE</span> fournit une preuve portable
            d’existence, d’intégrité (SHA-256) et d’authenticité — sans stocker tes fichiers.
          </p>
        </div>

        {/* Steps */}
        <ol className="grid gap-4 sm:gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li
              key={s.n}
              data-reveal
              style={{ transitionDelay: `${180 + i * 80}ms` }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6"
            >
              {/* halo */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(120px_80px_at_top_left,rgba(16,185,129,.18),transparent_60%)]" />
              <div className="relative">
                <div className="mb-3 inline-flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-xl border border-white/10 bg-white/5 text-white font-semibold">
                    {s.n}
                  </span>
                  <h3 className="text-lg font-bold text-white">{s.title}</h3>
                </div>
                <p className="text-white/70 leading-relaxed">{s.desc}</p>

                {s.n === 1 && (
                  <div className="mt-4">
                    <Link
                      href="/generate"
                      className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-900 bg-gradient-to-r from-emerald-400 to-sky-400 hover:brightness-110"
                    >
                      Try Generate
                    </Link>
                  </div>
                )}
                {s.n === 3 && (
                  <div className="mt-4">
                    <Link
                      href="/verify"
                      className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white border border-white/15 bg-white/5 hover:bg-white/10"
                    >
                      Try Verify
                    </Link>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
              }
