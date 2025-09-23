// components/AudienceStrip.tsx — FINAL (v6)
// Goal: 9.6+ — ultra clair, cohérent GitHub, FX discrets, no overflow, a11y OK

"use client";

import Link from "next/link";
import { useEffect } from "react";
import { User, Building2, Check } from "lucide-react";

export default function AudienceStrip() {
  // Révélation douce des cartes au scroll
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const idx = Number(el.dataset.index || 0);
          el.classList.remove("opacity-0", "translate-y-3");
          el.style.transitionDelay = `${100 + idx * 100}ms`;
          io.unobserve(el);
        }
      },
      { threshold: 0.18 }
    );
    document.querySelectorAll<HTMLElement>("[data-as-reveal='1']").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const items: {
    key: string;
    icon: JSX.Element;
    eyebrow: string;
    title: string;
    bullets: string[];
    primary: { href: string; label: string };
    secondary: { href: string; label: string };
    note?: string;
  }[] = [
    {
      key: "individuals",
      icon: <User className="h-5 w-5" aria-hidden />,
      eyebrow: "For Individuals",
      title: "Protect your documents in seconds",
      bullets: [
        "Add a visible watermark + invisible proof",
        "No account, no storage — all on your device",
        "Free plan: 5 protected files / month",
      ],
      primary: { href: "/generate", label: "Protect a file" },
      secondary: { href: "/individuals", label: "Learn more" },
      note: "Perfect for CVs, artworks, invoices, contracts.",
    },
    {
      key: "professionals",
      icon: <Building2 className="h-5 w-5" aria-hidden />,
      eyebrow: "For Professionals",
      title: "Trust at scale for your business",
      bullets: [
        "Enterprise key + certificate branding",
        "DNS binding for instant verification",
        "Team workflows — simple and fast",
      ],
      primary: { href: "/generate", label: "Try with a file" },
      secondary: { href: "/professionals", label: "Learn more" },
      note: "Ideal for studios, agencies, legal, operations.",
    },
  ];

  return (
    <section
      aria-label="DigitalMeve — Solutions for individuals and professionals"
      className="relative fx-boundary overflow-hidden px-4 py-12 sm:py-16"
    >
      {/* FX discrets, contraints au viewport */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-40"
        style={{
          background:
            "radial-gradient(900px 420px at 12% -10%, rgba(16,185,129,.06), transparent 55%), radial-gradient(780px 360px at 88% 0%, rgba(56,189,248,.05), transparent 55%)",
        }}
      />

      {/* Titre section */}
      <div className="mx-auto max-w-6xl text-center">
        <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-[6px] text-[.68rem] sm:text-[.7rem] font-semibold tracking-wide text-slate-200 backdrop-blur">
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Choose your path
        </p>
        <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Individuals or Professionals — same invisible proof, tailored to you
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-sm sm:text-[15px] text-[var(--fg-muted)]">
          Start free in seconds, or scale trust across your company with enterprise features.
        </p>
      </div>

      {/* Cartes */}
      <div className="relative mx-auto mt-8 grid max-w-6xl gap-4 sm:grid-cols-2">
        {items.map((it, idx) => (
          <article
            key={it.key}
            data-as-reveal="1"
            data-index={idx}
            className="opacity-0 translate-y-3 transition-all duration-600
                       rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur
                       hover:bg-white/8 hover:shadow-[0_12px_30px_rgba(16,185,129,.10),0_6px_18px_rgba(56,189,248,.10)]"
          >
            <header className="flex items-center gap-2 text-xs text-slate-300">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/10 to-sky-500/10 ring-1 ring-white/10 text-emerald-300">
                {it.icon}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
                {it.eyebrow}
              </span>
            </header>

            <h3 className="mt-3 text-lg font-semibold text-white">{it.title}</h3>

            <ul className="mt-2 space-y-1.5 text-sm text-slate-300/90">
              {it.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-emerald-400" aria-hidden />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href={it.primary.href}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-3.5 py-2 text-sm font-medium text-white shadow-[0_0_24px_rgba(56,189,248,.22)] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                {it.primary.label}
              </Link>
              <Link
                href={it.secondary.href}
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-medium text-slate-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                {it.secondary.label}
              </Link>
            </div>

            {it.note && <p className="mt-2 text-xs text-slate-400">{it.note}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}
