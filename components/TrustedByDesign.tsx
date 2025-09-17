// components/TrustedByDesign.tsx
"use client";

import { useEffect } from "react";
import { ShieldCheck, Eye, Infinity } from "lucide-react";

export default function TrustedByDesign() {
  const PILLARS = [
    {
      icon: <ShieldCheck className="h-6 w-6" aria-hidden />,
      title: "Proven cryptography",
      desc: "Built on modern, auditable algorithms — the same principles trusted by banks and governments.",
    },
    {
      icon: <Eye className="h-6 w-6" aria-hidden />,
      title: "Independent verification",
      desc: "Anyone can confirm authenticity in seconds — no hidden servers, no vendor lock-in.",
    },
    {
      icon: <Infinity className="h-6 w-6" aria-hidden />,
      title: "Future-proof",
      desc: "Certificates remain valid across time, formats, and devices — designed to last.",
    },
  ];

  // Fade-in + zoom au scroll
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const i = Number(el.dataset.index || 0);
            el.classList.add("opacity-100", "scale-100");
            el.style.transitionDelay = `${100 + i * 120}ms`;
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll<HTMLElement>(".trust-card").forEach((el) => io.observe(el));
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
            "radial-gradient(900px 400px at 20% 20%, rgba(16,185,129,.05), transparent 50%), radial-gradient(700px 360px at 80% 20%, rgba(56,189,248,.05), transparent 50%)",
        }}
      />

      <div className="mx-auto max-w-6xl relative text-center">
        {/* Eyebrow */}
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
          Trusted by design
        </p>

        {/* Titre */}
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Security, transparency, and speed — built in.
        </h2>

        {/* Sous-titre */}
        <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-400">
          DigitalMeve follows the same cryptographic principles used by banks and governments —
          but makes them invisible and effortless for everyone.
        </p>

        {/* Pilars */}
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {PILLARS.map((p, i) => (
            <div
              key={p.title}
              data-index={i}
              className="trust-card opacity-0 scale-95 transition-all duration-700 rounded-2xl border border-white/8 bg-slate-900/50 p-6 backdrop-blur"
            >
              <div
                className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-emerald-500/10 to-sky-500/10 text-emerald-300 ring-1 ring-white/6 mx-auto
                           transition-transform group-hover:scale-110 group-hover:shadow-[0_0_12px_rgba(56,189,248,.4)]"
              >
                {p.icon}
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
              }
