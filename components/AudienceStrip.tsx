// components/AudienceStrip.tsx
"use client";

import Link from "next/link";
import { User, Building2, Check } from "lucide-react";

export default function AudienceStrip() {
  const items = [
    {
      key: "individuals",
      icon: <User className="h-5 w-5" aria-hidden />,
      eyebrow: "For individuals",
      title: "Protect your work in seconds",
      bullets: [
        "Free for individuals",
        "No account, no storage",
        "Photos, docs, invoices, portfolios",
      ],
      cta: { href: "/generate", label: "Get started for free" },
      note: "Perfect for creators, freelancers and students.",
    },
    {
      key: "teams",
      icon: <Building2 className="h-5 w-5" aria-hidden />,
      eyebrow: "For teams & pros",
      title: "Trust at scale",
      bullets: [
        "Bulk & workflow friendly",
        "Works with any file type",
        "Instant verification for clients",
      ],
      // On reste safe côté routes existantes : /generate /verify
      ctas: [
        { href: "/generate", label: "Try with a file" },
        { href: "/verify", label: "Verify a document" },
      ],
      note: "Great for studios, agencies, legal & ops.",
    },
  ];

  return (
    <section className="relative overflow-hidden px-4 py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          background:
            "radial-gradient(800px 360px at 10% 0%, rgba(16,185,129,.06), transparent 40%), radial-gradient(700px 320px at 95% 30%, rgba(56,189,248,.05), transparent 40%)",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-4 sm:grid-cols-2">
        {items.map((it) => (
          <article
            key={it.key}
            className="rounded-2xl border border-white/10 bg-slate-900/55 p-5 backdrop-blur transition hover:bg-white/10"
          >
            <div className="flex items-center gap-2 text-slate-300 text-xs">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/10 to-sky-500/10 ring-1 ring-white/10 text-emerald-300">
                {it.icon}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
                {it.eyebrow}
              </span>
            </div>

            <h3 className="mt-3 text-lg font-semibold">{it.title}</h3>

            <ul className="mt-2 space-y-1.5 text-sm text-slate-400">
              {it.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-emerald-400" aria-hidden />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {"cta" in it && it.cta && (
                <Link
                  href={it.cta.href}
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-3.5 py-2 text-sm font-medium text-white shadow-[0_0_24px_rgba(56,189,248,.22)] hover:brightness-105"
                >
                  {it.cta.label}
                </Link>
              )}

              {"ctas" in it &&
                it.ctas?.map((c) => (
                  <Link
                    key={c.label}
                    href={c.href}
                    className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm font-medium text-slate-200 hover:bg-white/10"
                  >
                    {c.label}
                  </Link>
                ))}
            </div>

            <p className="mt-2 text-xs text-slate-400">{it.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
