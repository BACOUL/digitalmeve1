"use client";

import Link from "next/link";
import { Upload, ShieldCheck, Share2 } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Upload className="h-5 w-5 text-emerald-400" />,
      tag: "Step 1",
      title: "Upload your document",
      desc: "Works with common formats; your file stays on your device.",
      cta: { href: "/generate", label: "Try now" },
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-sky-400" />,
      tag: "Step 2",
      title: "Get your protected copy",
      desc: "We add a lightweight, invisible proof and prepare your certificate.",
    },
    {
      icon: <Share2 className="h-5 w-5 text-emerald-400" />,
      tag: "Step 3",
      title: "Download & share",
      desc: "Share your file and certificate. Anyone can check it in seconds.",
      cta: { href: "/verify", label: "Verify a document" },
    },
  ];

  return (
    <section aria-label="How it works" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <h2 className="text-2xl sm:text-3xl font-semibold">How it works</h2>
      <p className="mt-2 text-[var(--fg-muted)]">Three simple steps. No jargon.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((s) => (
          <div
            key={s.title}
            className="surface p-5 sm:p-6 transition hover:translate-y-[-2px] hover:shadow-[var(--shadow)]"
            data-reveal
          >
            <div className="flex items-center gap-2 text-sm">
              {s.icon}
              <span className="kicker">{s.tag}</span>
            </div>
            <h3 className="mt-2 font-semibold text-lg">{s.title}</h3>
            <p className="mt-1 text-sm text-[var(--fg-muted)]">{s.desc}</p>
            {s.cta && (
              <Link
                href={s.cta.href}
                className="mt-4 inline-flex items-center gap-2 text-sm link"
              >
                {s.cta.label} →
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
