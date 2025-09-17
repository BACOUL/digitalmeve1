"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Upload, ShieldCheck, Download } from "lucide-react";

type Step = {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  desc: string;
  cta?: { href: string; label: string };
};

const STEPS: Step[] = [
  {
    icon: <Upload className="h-5 w-5" />,
    eyebrow: "Step 1",
    title: "Upload your document",
    desc: "Works with common formats; your file stays on your device.",
    cta: { href: "/generate", label: "Try now" },
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    eyebrow: "Step 2",
    title: "Get your protected copy",
    desc: "We add a lightweight, invisible proof and prepare your certificate.",
    cta: { href: "/generate", label: "Protect a file" },
  },
  {
    icon: <Download className="h-5 w-5" />,
    eyebrow: "Step 3",
    title: "Download & share",
    desc: "Share your file and certificate. Anyone can check it in seconds.",
    cta: { href: "/verify", label: "Verify a document" },
  },
];

export default function HowItWorks() {
  const lineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Stagger reveal on cards
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
      { threshold: 0.18 }
    );
    document.querySelectorAll<HTMLElement>(".hiw-step").forEach((el) => io.observe(el));

    // Progress line animation
    const ioLine = new IntersectionObserver(
      (entries) => {
        const ent = entries[0];
        if (ent?.isIntersecting && lineRef.current) {
          lineRef.current.style.width = "100%";
          ioLine.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    if (lineRef.current) ioLine.observe(lineRef.current.parentElement as Element);

    return () => {
      io.disconnect();
      ioLine.disconnect();
    };
  }, []);

  return (
    <section className="relative overflow-hidden px-4 py-20">
      {/* arrière-plan doux façon Hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(1000px 500px at 20% 0%, rgba(16,185,129,.12), transparent 60%), radial-gradient(900px 500px at 90% 20%, rgba(56,189,248,.10), transparent 60%)",
        }}
      />

      <div className="mx-auto max-w-6xl relative">
        <div className="text-center">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
            3 steps • under 20s • no storage
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="sub mt-2 text-slate-400">Three simple steps. No jargon.</p>
        </div>

        {/* ligne de progression (desktop) */}
        <div className="relative mt-12 hidden md:block">
          <div className="absolute left-[10%] right-[10%] top-10 h-[2px] bg-white/5" />
          <div
            ref={lineRef}
            className="absolute left-[10%] top-10 h-[2px] w-0 rounded-full transition-[width] duration-[1200ms] ease-out"
            style={{
              background:
                "linear-gradient(90deg, rgba(16,185,129,.8), rgba(56,189,248,.8))",
            }}
          />
        </div>

        {/* cartes */}
        <div className="mt-6 grid gap-6 md:mt-10 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <article
              key={s.title}
              data-index={i}
              className="hiw-step group relative isolate opacity-0 translate-y-6 transition-all duration-700"
            >
              {/* border gradient */}
              <div className="rounded-2xl p-[1px] bg-gradient-to-br from-emerald-500/40 via-emerald-500/0 to-sky-500/40">
                <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-sky-500/20 text-emerald-300 ring-1 ring-white/10 transition group-hover:scale-105">
                      {s.icon}
                    </div>
                    <span className="text-xs font-medium text-slate-400">{s.eyebrow}</span>
                  </div>

                  <h3 className="mt-3 text-xl font-bold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.desc}</p>

                  {s.cta && (
                    <Link
                      href={s.cta.href}
                      className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10 hover:brightness-110"
                    >
                      {s.cta.label} <span aria-hidden>→</span>
                    </Link>
                  )}
                </div>
              </div>

              {/* effet tilt très léger */}
              <div className="pointer-events-none absolute inset-0 -z-[1] rounded-2xl opacity-0 transition group-hover:opacity-100"
                   style={{ boxShadow: "0 20px 60px rgba(56,189,248,.08), 0 8px 30px rgba(16,185,129,.06)" }} />
            </article>
          ))}
        </div>

        {/* CTA bas */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/generate"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 text-sm font-medium text-white shadow hover:brightness-105"
          >
            Protect a file now
          </Link>
          <Link
            href="/verify"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-white/10"
          >
            Verify a file
          </Link>
        </div>
      </div>
    </section>
  );
}
