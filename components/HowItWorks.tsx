"use client";

import { useEffect, useRef } from "react";
import { Upload, ShieldCheck, Share2 } from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
  // Révélation au scroll (stagger léger)
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.index || 0);
            e.target.classList.add("opacity-100", "translate-y-0");
            e.target.style.transitionDelay = `${80 + i * 60}ms`;
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18 }
    );

    items.forEach((el, idx) => {
      el.dataset.index = String(idx);
      el.classList.add(
        "opacity-0",
        "translate-y-4",
        "transition",
        "duration-500",
        "ease-out"
      );
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return (
    <section
      aria-labelledby="how-title"
      className="relative border-t border-white/10 bg-[var(--bg,#0B1220)]"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20" ref={rootRef}>
        {/* Titre + sous-titre façon Hero */}
        <div className="mb-8 text-center">
          <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300/80">
            Three steps. No jargon.
          </p>
          <h2
            id="how-title"
            className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            How it works
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Upload. Protect. Share. Instant verification, anywhere.
          </p>
        </div>

        {/* Les 3 cartes */}
        <div className="grid gap-4 sm:grid-cols-3">
          <StepCard
            icon={<Upload className="h-5 w-5" />}
            title="Upload your document"
            desc="Works with common formats; your file stays on your device."
            cta={<Link href="/generate" className="step-cta">Try now →</Link>}
            dataStep
          />
          <StepCard
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Get your protected copy"
            desc=".MEVE proof is embedded invisibly. We also prepare your certificate."
            dataStep
          />
          <StepCard
            icon={<Share2 className="h-5 w-5" />}
            title="Download & share"
            desc="Share file + certificate. Anyone can verify it in seconds."
            cta={<Link href="/verify" className="step-cta">Verify a document →</Link>}
            dataStep
          />
        </div>
      </div>
    </section>
  );
}

/** Carte “step” au style Hero */
function StepCard({
  icon,
  title,
  desc,
  cta,
  dataStep,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  cta?: React.ReactNode;
  dataStep?: boolean;
}) {
  return (
    <article
      {...(dataStep ? { "data-step": "" } : {})}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur
                 transition will-change-transform hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(0,0,0,0.35)]"
    >
      {/* bordure dégradée subtile */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
      <div className="absolute -inset-x-6 -inset-y-12 bg-gradient-to-r from-emerald-500/10 via-transparent to-sky-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <header className="relative z-10 mb-3 flex items-center gap-2">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-sky-500/20 text-emerald-300 ring-1 ring-white/10">
          {icon}
        </span>
        <h3 className="text-base font-semibold text-slate-100">{title}</h3>
      </header>

      <p className="relative z-10 text-sm text-slate-400">{desc}</p>

      {cta && (
        <div className="relative z-10 mt-4">
          {cta}
        </div>
      )}
    </article>
  );
}

/* Petite classe utilitaire (tu peux la déplacer dans globals.css si tu préfères)
.step-cta {
  @apply inline-flex items-center text-sm font-medium text-sky-300 hover:text-sky-200 transition;
}
*/
