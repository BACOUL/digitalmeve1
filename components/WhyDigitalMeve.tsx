// components/WhyDigitalMeve.tsx — v3 (links to /individuals & /professionals)
"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Lock, Globe, Zap, ShieldCheck } from "lucide-react";

export default function WhyDigitalMeve() {
  const FEATURES = [
    {
      icon: <Lock className="h-5 w-5" aria-hidden />,
      title: "No storage. Ever.",
      desc: "All processing runs in your browser — files never leave your device.",
    },
    {
      icon: <Globe className="h-5 w-5" aria-hidden />,
      title: "Universal & portable",
      desc: "Self-contained .MEVE certificates — verifiable anywhere in seconds.",
    },
    {
      icon: <ShieldCheck className="h-5 w-5" aria-hidden />,
      title: "Cryptography that lasts",
      desc: "SHA-256 fingerprint, signed timestamp, and issuer identity (personal or DNS).",
    },
    {
      icon: <Zap className="h-5 w-5" aria-hidden />,
      title: "Built for real life",
      desc: "All file types. Fast for daily use — and reliable at scale.",
    },
  ];

  // Reveal-on-scroll (fade + slide), respects prefers-reduced-motion
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const i = Number(el.dataset.index || 0);
          el.classList.add("opacity-100", "translate-y-0");
          if (!prefersReduced) el.style.transitionDelay = `${80 + i * 90}ms`;
          io.unobserve(el);
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll<HTMLElement>(".why-card").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="why-digitalmeve"
      className="relative overflow-hidden px-4 py-16 sm:py-20"
      aria-label="Why DigitalMeve"
    >
      {/* Subtle aurora veil (coherent with Hero) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(900px 420px at 12% 0%, rgba(16,185,129,.06), transparent 42%), radial-gradient(840px 360px at 88% 18%, rgba(56,189,248,.05), transparent 44%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Eyebrow */}
        <p className="mx-auto w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] tracking-wide text-slate-300 backdrop-blur">
          WHY DIGITALMEVE
        </p>

        {/* Heading */}
        <h2 className="mt-3 text-center text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
          Why this is different — and indispensable
        </h2>

        <p className="mx-auto mt-2 max-w-3xl text-center text-[15px] sm:text-[17px] text-[var(--fg-muted)]">
          A universal proof layer for every file: private by design, verifiable anywhere, owned by you.
        </p>

        {/* Benefits grid */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <article
              key={f.title}
              data-index={i}
              className="why-card group relative rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition-all duration-700 opacity-0 translate-y-4 hover:bg-white/10 motion-safe:will-change-transform"
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
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-emerald-300">
                {f.icon}
              </div>
              <h3 className="mt-4 text-sm font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-slate-300/90 leading-relaxed">{f.desc}</p>
            </article>
          ))}
        </div>

        {/* Dual audience teaser blocks (now linking to dedicated pages) */}
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-slate-300">For Individuals</p>
            <h3 className="mt-1 text-sm font-semibold text-white">
              Protect CVs, invoices, photos, and creative work — in one click.
            </h3>
            <p className="mt-1 text-sm text-slate-300/90">
              Free to start (5 certificates/month). No account, no storage.
            </p>
            <Link
              href="/individuals"
              className="mt-3 inline-block text-sm font-medium text-emerald-400 underline decoration-dotted underline-offset-4 hover:opacity-90"
            >
              Learn more →
            </Link>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-slate-300">For Professionals</p>
            <h3 className="mt-1 text-sm font-semibold text-white">
              DNS integration, private keys, and trusted certificates for your business.
            </h3>
            <p className="mt-1 text-sm text-slate-300/90">
              Reduce fraud, protect revenue, and pass audits faster — with instant verification.
            </p>
            <Link
              href="/professionals"
              className="mt-3 inline-block text-sm font-medium text-emerald-400 underline decoration-dotted underline-offset-4 hover:opacity-90"
            >
              Learn more →
            </Link>
          </div>
        </div>

        {/* CTA row (routes toward the two dedicated pages) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/individuals"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2.5 text-sm font-medium text-white shadow-[0_0_24px_rgba(56,189,248,.22)] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
          >
            Explore Individuals
          </Link>
          <Link
            href="/professionals"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            Explore Professionals
          </Link>
        </div>
      </div>
    </section>
  );
      }
