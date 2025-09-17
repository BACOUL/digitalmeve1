"use client";

import { Upload, ShieldCheck, BadgeCheck } from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      icon: <Upload className="h-5 w-5 text-emerald-400" />,
      title: "Drop your file",
      desc: "Drag & drop a PDF, DOCX or image. Everything stays on your device.",
      cta: { href: "/generate", label: "Protect a file" },
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-sky-400" />,
      title: "We embed the .MEVE proof",
      desc: "We add a tiny, invisible proof and prepare your official certificate.",
      cta: { href: "/generate#how", label: "See details" },
    },
    {
      icon: <BadgeCheck className="h-5 w-5 text-emerald-400" />,
      title: "Share & verify anywhere",
      desc: "Your file stays readable everywhere. Anyone can verify in seconds.",
      cta: { href: "/verify", label: "Verify a file" },
    },
  ];

  return (
    <section
      id="how-it-works"
      aria-label="How DigitalMeve works"
      className="mx-auto max-w-6xl px-4 py-14 sm:py-18"
    >
      <div className="text-center">
        <p className="kicker">HOW IT WORKS</p>
        <h2 className="heading-2 mt-2">Invisible proof. Instant trust.</h2>
        <p className="mx-auto mt-3 max-w-2xl text-[var(--fg-muted)]">
          Three simple steps. No account. No storage. Your files remain clean and portable.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((s) => (
          <article
            key={s.title}
            className="surface p-5 sm:p-6 transition hover:shadow-[0_8px_30px_rgba(0,0,0,.35)]"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs">
              {s.icon}
              <span className="font-semibold">{s.title}</span>
            </div>
            <p className="mt-3 text-sm text-[var(--fg-muted)]">{s.desc}</p>

            <div className="mt-4">
              <Link
                href={s.cta.href}
                className="btn btn-outline"
                aria-label={s.cta.label}
              >
                {s.cta.label}
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs">
        <span className="badge badge-solid">Certificate included</span>
        <span className="badge badge-green">Free for individuals</span>
        <span className="badge badge-sky">Works offline • Browser-first</span>
      </div>
    </section>
  );
}
