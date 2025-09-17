// components/WhyDigitalMeve.tsx
"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Lock, FileText, Zap, Globe } from "lucide-react";

export default function WhyDigitalMeve() {
  const FEATURES = [
    {
      icon: <Lock className="h-5 w-5" aria-hidden />,
      title: "Privacy first",
      desc: "All processing runs in the browser — your files never leave your device.",
    },
    {
      icon: <FileText className="h-5 w-5" aria-hidden />,
      title: "Universal",
      desc: "Works with any file type; certificates readable and verifiable everywhere.",
    },
    {
      icon: <Zap className="h-5 w-5" aria-hidden />,
      title: "Zero friction",
      desc: "No account, no setup, no storage — start in seconds and share instantly.",
    },
    {
      icon: <Globe className="h-5 w-5" aria-hidden />,
      title: "Open standard",
      desc: ".MEVE is transparent and future-proof — auditable, simple, and interoperable.",
    },
  ];

  // Fade-in au scroll
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const i = Number(el.dataset.index || 0);
            el.classList.add("opacity-100", "translate-y-0");
            el.style.transitionDelay = `${80 + i * 90}ms`;
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll<HTMLElement>(".why-card").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:py-24">
      {/* fond subtil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(800px 360px at 10% 10%, rgba(16,185,129,.06), transparent 40%), radial-gradient(700px 320px at 95% 30%, rgba(56,189,248,.04), transparent 40%)",
        }}
      />

      <div className="mx-auto max-w-6xl relative">
        <div className="text-center">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
            Why DigitalMeve
          </p>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Proof without compromise
          </h2>

          <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-400">
            DigitalMeve makes proofs invisible, private and universal — so you can protect and share files with confidence.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              data-index={i}
              className="why-card relative rounded-2xl border border-white/8 bg-slate-900/50 p-5 backdrop-blur transition-all duration-700 opacity-0 translate-y-6
                         hover:scale-[1.02] hover:shadow-[0_12px_30px_rgba(16,185,129,.08),0_6px_18px_rgba(56,189,248,.08)]"
            >
              <div className="inline-flex items-center justify-center h-11 w-11 rounded-lg bg-gradient-to-br from-emerald-500/10 to-sky-500/10 text-emerald-300 ring-1 ring-white/6 transition-transform group-hover:-translate-y-0.5">
                {f.icon}
              </div>
              <h3 className="mt-4 text-sm font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/generate"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 text-sm font-medium text-white shadow-[0_0_30px_rgba(56,189,248,.22)] hover:brightness-105"
            aria-label="Get started for free — add a .MEVE certificate"
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
    </section>
  );
            }
