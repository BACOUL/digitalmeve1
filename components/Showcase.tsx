// components/Showcase.tsx — v2.1 (accurate, non-jargon, clickable steps, no “anywhere”)
"use client";

import { useEffect, useState, useMemo } from "react";
import { Upload, ShieldCheck, FileCheck2, Radar } from "lucide-react";
import Link from "next/link";

type Step = {
  key: string;
  title: string;
  desc: string;
  icon: JSX.Element;
  cta?: { href: string; label: string };
};

export default function Showcase() {
  const STEPS: Step[] = useMemo(
    () => [
      {
        key: "upload",
        title: "Drop your file",
        desc: "Works with common formats. Everything happens on your device.",
        icon: <Upload className="h-5 w-5" aria-hidden />,
        cta: { href: "/generate", label: "Get started for free" },
      },
      {
        key: "protect",
        title: "Protection added",
        desc: "An invisible .MEVE proof + a small visible watermark are embedded. Stays readable & portable.",
        icon: <ShieldCheck className="h-5 w-5" aria-hidden />,
        cta: { href: "/generate", label: "Protect a file" },
      },
      {
        key: "protected-file",
        title: "Protected file",
        desc: "You keep your file with proof inside (e.g., .meve.pdf). No account, no storage.",
        icon: <FileCheck2 className="h-5 w-5" aria-hidden />,
      },
      {
        key: "quick-check",
        title: "Quick check",
        desc: "Anyone can confirm authenticity in seconds — right in the browser.",
        icon: <Radar className="h-5 w-5" aria-hidden />,
        cta: { href: "/verify", label: "Verify a document" },
      },
    ],
    []
  );

  const [active, setActive] = useState(0);

  // Autoplay: change step every 3s
  useEffect(() => {
    const id = setInterval(() => setActive((i) => (i + 1) % STEPS.length), 3000);
    return () => clearInterval(id);
  }, [STEPS.length]);

  const handleKey = (e: React.KeyboardEvent<HTMLLIElement>, i: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActive(i);
    }
  };

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:py-24" aria-label="How protection flows">
      {/* subtle bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(900px 420px at 12% 10%, rgba(16,185,129,.06), transparent 45%), radial-gradient(760px 360px at 88% 20%, rgba(56,189,248,.06), transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
            Demo / Showcase
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            From file to trusted — live preview
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-400">
            See the flow: import → protection added → protected file → quick check. No account, no storage — all on your device.
          </p>
        </div>

        {/* Demo card */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/50 p-5 sm:p-6 backdrop-blur">
          {/* Steps bar */}
          <ol className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STEPS.map((s, i) => {
              const isActive = i === active;
              return (
                <li
                  key={s.key}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => handleKey(e, i)}
                  className={[
                    "group relative rounded-xl border bg-white/5 p-4 transition outline-none",
                    "border-white/10",
                    isActive
                      ? "shadow-[0_0_40px_rgba(56,189,248,.18)] ring-1 ring-emerald-400/40"
                      : "hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-emerald-400/40"
                  ].join(" ")}
                >
                  {/* Active glow */}
                  <div
                    aria-hidden
                    className={[
                      "pointer-events-none absolute -inset-px rounded-xl blur-xl transition-opacity",
                      isActive ? "opacity-40" : "opacity-0"
                    ].join(" ")}
                    style={{
                      background:
                        "radial-gradient(240px 120px at 50% 50%, rgba(16,185,129,.25), rgba(56,189,248,.20), transparent 70%)",
                    }}
                  />
                  <div className="relative z-10">
                    <div
                      className={[
                        "inline-flex h-10 w-10 items-center justify-center rounded-lg ring-1 ring-white/10",
                        "bg-gradient-to-br from-emerald-500/15 to-sky-500/15 text-emerald-300",
                        "transition-transform",
                        isActive ? "scale-110" : "group-hover:scale-105"
                      ].join(" ")}
                    >
                      {s.icon}
                    </div>
                    <h3 className="mt-3 text-sm font-semibold text-white">{s.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">{s.desc}</p>

                    {s.cta && (
                      <Link
                        href={s.cta.href}
                        className={[
                          "mt-3 inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200",
                          "transition hover:bg-white/10 hover:brightness-110"
                        ].join(" ")}
                        aria-label={s.cta.label}
                      >
                        {s.cta.label} <span aria-hidden>→</span>
                      </Link>
                    )}
                  </div>

                  {/* Progress */}
                  <ProgressBar active={isActive} durationMs={3000} />
                </li>
              );
            })}
          </ol>

          {/* Legend + CTA */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-slate-400">
              The demo cycles every 3 seconds. You can also click any step.
            </p>
            <div className="flex gap-2">
              <Link
                href="/generate"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 text-sm font-medium text-white shadow-[0_0_30px_rgba(56,189,248,.22)] hover:brightness-105"
                aria-label="Get started for free"
              >
                Get started for free
              </Link>
              <Link
                href="/verify"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-white/10"
                aria-label="Verify a document"
              >
                Verify a document
              </Link>
            </div>
          </div>
        </div>

        {/* A11y manual nav (screen readers) */}
        <nav className="sr-only" aria-label="Showcase steps">
          {STEPS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}>
              Step {i + 1}
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}

function ProgressBar({ active, durationMs = 3000 }: { active: boolean; durationMs?: number }) {
  return (
    <div className="relative mt-4 h-1 w-full overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full w-0 rounded-full"
        style={{
          transition: `width ${durationMs}ms linear`,
          width: active ? "100%" : "0%",
          background: "linear-gradient(90deg, rgba(16,185,129,.9), rgba(56,189,248,.9))",
          boxShadow: "0 0 14px rgba(56,189,248,.35)",
        }}
      />
    </div>
  );
  }
