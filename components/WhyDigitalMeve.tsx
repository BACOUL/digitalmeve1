"use client";

import { ShieldCheck, Fingerprint, FileCheck2, Sparkles } from "lucide-react";

export default function WhyDigitalMeve() {
  const feats = [
    {
      icon: <ShieldCheck className="h-5 w-5 text-emerald-400" />,
      title: "Proof built into the file",
      desc: "A durable .MEVE proof lives with your document. No viewer or plugin required.",
    },
    {
      icon: <FileCheck2 className="h-5 w-5 text-emerald-400" />,
      title: "Readable everywhere",
      desc: "Open and share files as usual. Nothing breaks, nothing looks different.",
    },
    {
      icon: <Fingerprint className="h-5 w-5 text-sky-400" />,
      title: "Private by design",
      desc: "Processing happens in your browser. Files never leave your device.",
    },
    {
      icon: <Sparkles className="h-5 w-5 text-sky-400" />,
      title: "Fast & lightweight",
      desc: "Seconds to protect or verify. Minimal overhead, maximum clarity.",
    },
  ];

  return (
    <section
      id="why-digitalmeve"
      aria-label="Why choose DigitalMeve"
      className="mx-auto max-w-6xl px-4 py-14 sm:py-18"
    >
      <div className="text-center">
        <p className="kicker">WHY DIGITALMEVE</p>
        <h2 className="heading-2 mt-2">Trust you can ship, without friction</h2>
        <p className="mx-auto mt-3 max-w-2xl text-[var(--fg-muted)]">
          We turn your everyday files into trustworthy proofs—clean, portable, and verifiable by anyone.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {feats.map((f) => (
          <article key={f.title} className="surface p-5 sm:p-6">
            <div className="flex items-center gap-2 text-sm">
              {f.icon}
              <span className="font-semibold">{f.title}</span>
            </div>
            <p className="mt-2 text-sm text-[var(--fg-muted)]">{f.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
