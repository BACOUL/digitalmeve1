// components/TrustedByDesign.tsx — v3 (4 pillars, proofs bar, partners link, sync-ready counter)
"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ShieldCheck, Eye, Infinity, Lock, Globe, Zap } from "lucide-react";

type Props = {
  /** Optional: pass counters from a shared hook/context to stay perfectly in sync with the Hero */
  totalCertified?: number; // e.g. BASELINE_TOTAL + delta
  todayCreated?: number;   // optional
};

export default function TrustedByDesign({ totalCertified, todayCreated }: Props) {
  const PILLARS = [
    {
      icon: <Lock className="h-6 w-6" aria-hidden />,
      title: "Zero storage",
      desc: "Your files never leave your device. No cloud copies, no leaks.",
    },
    {
      icon: <Globe className="h-6 w-6" aria-hidden />,
      title: "Open standard",
      desc: "Self-contained .MEVE certificates — verifiable by anyone, anywhere.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6" aria-hidden />,
      title: "Proven cryptography",
      desc: "SHA-256 fingerprint, signed timestamp, and issuer identity (personal or DNS).",
    },
    {
      icon: <Zap className="h-6 w-6" aria-hidden />,
      title: "GDPR & EU-ready",
      desc: "Privacy by design, no vendor lock-in, full key control.",
    },
  ];

  // Fade-in + scale on scroll (respects prefers-reduced-motion via user settings)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const i = Number(el.dataset.index || 0);
          el.classList.add("opacity-100", "translate-y-0", "scale-100");
          el.style.transitionDelay = `${100 + i * 110}ms`;
          io.unobserve(el);
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll<HTMLElement>(".trust-card").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="trusted-by-design"
      className="relative overflow-hidden px-4 py-16 sm:py-20"
      aria-label="Trusted by design"
    >
      {/* Subtle aurora veil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(900px 400px at 20% 20%, rgba(16,185,129,.05), transparent 50%), radial-gradient(700px 360px at 80% 20%, rgba(56,189,248,.05), transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl text-center">
        {/* Eyebrow */}
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300 backdrop-blur">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
          TRUSTED BY DESIGN
        </p>

        {/* Heading */}
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Security, transparency, and speed — built in.
        </h2>

        {/* Subheading */}
        <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-400">
          DigitalMeve turns robust cryptography into an invisible, universal proof — so every file can be trusted without friction.
        </p>

        {/* Pillars */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <div
              key={p.title}
              data-index={i}
              className="trust-card opacity-0 translate-y-2 scale-[0.98] transition-all duration-700 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur hover:bg-white/10"
            >
              {/* Tiny halo */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "radial-gradient(60% 120% at 50% -20%, rgba(56,189,248,.06), transparent 60%)",
                  mask:
                    "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
                  WebkitMask:
                    "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
                  padding: 1,
                }}
              />
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-emerald-300">
                {p.icon}
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-300/90 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Proofs bar */}
        <ul className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-2 text-[12.5px] text-slate-300/90">
          <li className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">GDPR & Privacy by design</li>
          <li className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Works offline</li>
          <li className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">All file types</li>
          <li className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">Made in Europe</li>
        </ul>

        {/* Optional synced counter (only shown if you pass props from the same hook as Hero) */}
        {typeof totalCertified === "number" && (
          <div className="mx-auto mt-3 flex flex-wrap items-center justify-center gap-2 text-[12px] text-slate-300/90">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5">
              {new Intl.NumberFormat("en-US").format(totalCertified)} documents certified
            </span>
            {typeof todayCreated === "number" && (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-3 py-1.5">
                {new Intl.NumberFormat("en-US").format(todayCreated)} today
              </span>
            )}
          </div>
        )}

        {/* Early partners (no logos) */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-sm text-slate-200">
            We’re onboarding early partners to co-design the .MEVE standard for business.
          </p>
          <div className="mt-3 flex items-center justify-center">
            <Link
              href="/partners"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              Become a partner
            </Link>
          </div>
        </div>

        {/* CTA row */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/verify"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2.5 text-sm font-medium text-white shadow-[0_0_24px_rgba(56,189,248,.22)] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
          >
            Verify a document
          </Link>
          <Link
            href="/security"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            Learn more about security
          </Link>
        </div>
      </div>
    </section>
  );
          }
