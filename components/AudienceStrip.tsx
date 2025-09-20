// components/AudienceStrip.tsx — v3 (exact wording + anchors + micro-animations)
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { User, Building2, Check } from "lucide-react";

type Item =
  | {
      key: "individuals";
      icon: JSX.Element;
      eyebrow: string;
      title: string;
      body: string;
      bullets: string[];
      primaryCta: { href: string; label: string };
      learnMoreHref: string;
      note?: string;
    }
  | {
      key: "professionals";
      icon: JSX.Element;
      eyebrow: string;
      title: string;
      body: string;
      bullets: string[];
      primaryCta?: { href: string; label: string };
      secondaryCtas?: { href: string; label: string }[];
      learnMoreHref: string;
      note?: string;
    };

export default function AudienceStrip() {
  const items: Item[] = [
    {
      key: "individuals",
      icon: <User className="h-5 w-5 opacity-90" aria-hidden />,
      eyebrow: "For Individuals",
      title: "Protect your files, artworks, contracts or CVs with one click.",
      body:
        "Every file carries an invisible DigitalMeve certificate — verifiable anywhere in seconds.",
      bullets: ["Free to start (5/month)", "No account, no storage", "Photos, docs, invoices, portfolios"],
      primaryCta: { href: "/generate", label: "Get started for free" },
      learnMoreHref: "#individuals",
      note: "Perfect for students, creators and everyday documents.",
    },
    {
      key: "professionals",
      icon: <Building2 className="h-5 w-5 opacity-90" aria-hidden />,
      eyebrow: "For Professionals",
      title: "DNS integration, private keys, and trusted certificates for your business.",
      body:
        "Prove origin at scale. Certify invoices, contracts and reports without ever storing your files.",
      bullets: ["DNS-verified identity", "API & private keys", "Instant verification for clients"],
      secondaryCtas: [
        { href: "/generate", label: "Try with a file" },
        { href: "/verify", label: "Verify a document" },
      ],
      learnMoreHref: "#professionals",
      note: "Great for studios, agencies, legal and ops teams.",
    },
  ];

  // Reveal-on-scroll (no external lib)
  const sectionRef = useRef<HTMLElement | null>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setRevealed(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setRevealed(true);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-10 sm:py-12"
      aria-label="Choose your path: Individuals or Professionals"
    >
      {/* Background halo (cohérent avec Hero auroras) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          background:
            "radial-gradient(900px 420px at 8% 0%, rgba(16,185,129,.06), transparent 40%), radial-gradient(780px 360px at 94% 28%, rgba(56,189,248,.05), transparent 42%)",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-4 sm:grid-cols-2">
        {items.map((it, idx) => (
          <article
            key={it.key}
            className={[
              "group relative rounded-2xl border border-white/10 bg-slate-900/55 p-5 backdrop-blur",
              "transition-colors hover:bg-white/10",
              "motion-safe:transition-transform motion-safe:duration-200 hover:-translate-y-0.5",
              "motion-safe:transform motion-safe:transition-all",
              revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
              revealed ? `motion-safe:[transition-delay:${idx * 90}ms]` : "",
            ].join(" ")}
          >
            {/* Halo subtile */}
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

            {/* Eyebrow */}
            <div className="flex items-center gap-2 text-slate-300 text-xs">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/10 to-sky-500/10 ring-1 ring-white/10 text-emerald-300">
                {it.icon}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
                {it.eyebrow}
              </span>
            </div>

            {/* Title (exact wording) */}
            <h3 className="mt-3 text-base sm:text-lg font-semibold text-slate-100">
              {it.title}
            </h3>

            {/* Short body line */}
            <p className="mt-1 text-sm text-slate-300/90">{it.body}</p>

            {/* Bullets */}
            <ul className="mt-2 space-y-1.5 text-sm text-slate-400">
              {it.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-emerald-400 opacity-90" aria-hidden />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {"primaryCta" in it && it.primaryCta && (
                <Link
                  href={it.primaryCta.href}
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-3.5 py-2 text-sm font-medium text-white shadow-[0_0_24px_rgba(56,189,248,.22)] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 max-[360px]:w-full"
                >
                  {it.primaryCta.label}
                </Link>
              )}
              {"secondaryCtas" in it &&
                it.secondaryCtas?.map((c) => (
                  <Link
                    key={c.label}
                    href={c.href}
                    className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-medium text-slate-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 max-[360px]:w-full"
                  >
                    {c.label}
                  </Link>
                ))}

              {/* Learn more → anchor */}
              <Link
                href={it.learnMoreHref}
                className="ml-auto text-xs text-slate-300 underline decoration-dotted underline-offset-4 hover:opacity-90"
              >
                Learn more →
              </Link>
            </div>

            {it.note && <p className="mt-2 text-xs text-slate-400">{it.note}</p>}
          </article>
        ))}
      </div>
    </section>
  );
              }
