// components/UseCases.tsx
"use client";

import { useEffect, useState } from "react";
import { Users, Briefcase, CheckCircle2 } from "lucide-react";

type TabId = "individuals" | "business";

const TABS: { id: TabId; label: string; color: "emerald" | "sky"; icon: React.ReactNode }[] = [
  { id: "individuals", label: "Individuals", color: "emerald", icon: <Users className="h-4 w-4" /> },
  { id: "business",    label: "Business",    color: "sky",     icon: <Briefcase className="h-4 w-4" /> },
];

export default function UseCases() {
  const [tab, setTab] = useState<TabId>("individuals");

  // Relance l'IO à l'arrivée dans le viewport ET à chaque switch d'onglet
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const i = Number(el.dataset.index || 0);
            el.classList.add("opacity-100", "translate-y-0");
            el.style.transitionDelay = `${80 + i * 60}ms`;
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );

    // Réinitialise l'état visuel puis observe les éléments de l'onglet courant
    document.querySelectorAll<HTMLElement>('[data-reveal="uc"]').forEach((el) => {
      el.classList.remove("opacity-100", "translate-y-0");
      el.classList.add("opacity-0", "translate-y-2");
      el.style.transitionDelay = "0ms";
      io.observe(el);
    });

    return () => io.disconnect();
  }, [tab]);

  return (
    <section className="section-dark" aria-labelledby="use-cases">
      <div className="container-max pb-14">
        <h2 id="use-cases" className="h2">Use Cases</h2>
        <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs ring-1 ring-white/10">
          • real examples • under 20s • no storage
        </p>

        {/* Tabs 2 couleurs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {TABS.map((t) => {
            const active = tab === t.id;
            const color =
              t.color === "emerald"
                ? "from-emerald-500/70 to-emerald-400/70"
                : "from-sky-500/70 to-sky-400/70";

            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`group relative inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm transition
                  ${active
                    ? "bg-white/10 text-white ring-1 ring-white/15"
                    : "bg-white/[0.04] text-[var(--fg-muted)] hover:text-[var(--fg)] ring-1 ring-white/10"}`}
              >
                {t.icon}
                {t.label}
                {active && (
                  <span
                    className={`pointer-events-none absolute left-3 right-3 -bottom-1 h-[2px] rounded-full
                                bg-gradient-to-r ${color}`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Cartes */}
        <div className="mt-6 grid gap-4">
          {tab === "individuals" && (
            <>
              <Card i={0} title="Diplomas & transcripts"
                    desc="Protect PDF diplomas and share a certificate anyone can verify." />
              <Card i={1} title="IDs & documents"
                    desc="Add a portable proof to scans (PDF) without changing how they open." />
              <Card i={2} title="Creative work"
                    desc="Stamp portfolios, scripts or treatments with a verifiable fingerprint." />
            </>
          )}

          {tab === "business" && (
            <>
              <Card i={0} title="HR & onboarding"
                    desc="Automate checks on diplomas/certifications. Issue tamper-evident PDFs." />
              <Card i={1} title="Contracts & compliance"
                    desc="Add a durable proof on generated contracts and policy docs." />
              <Card i={2} title="Customer trust"
                    desc="Share price sheets, proposals or white-papers with verifiable integrity." />
            </>
          )}
        </div>

        {/* Badges crédibilité */}
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            "No uploads — processed locally",
            "GDPR-friendly, privacy by design",
            "Human-readable certificate provided",
          ].map((c, i) => (
            <span
              key={c}
              data-reveal="uc"
              data-index={i}
              className="opacity-0 translate-y-2 transition-all duration-500
                         inline-flex items-center gap-1 rounded-full
                         bg-gradient-to-r from-emerald-500/10 to-sky-500/10
                         px-3 py-1 text-xs ring-1 ring-white/10"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- internals ---------- */

function Card({ i, title, desc }: { i: number; title: string; desc: string }) {
  return (
    <article
      data-reveal="uc"
      data-index={i}
      className="relative opacity-0 translate-y-2 transition-all duration-700
                 rounded-2xl border border-white/10 bg-white/[0.04] p-5
                 backdrop-blur-sm shadow-[0_10px_30px_rgba(0,0,0,.25)]
                 hover:shadow-[0_20px_60px_rgba(0,0,0,.35)] hover:-translate-y-0.5"
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 [mask-image:linear-gradient(black,transparent)]" />
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-1 text-sm text-[var(--fg-muted)]">{desc}</p>
    </article>
  );
                    }
