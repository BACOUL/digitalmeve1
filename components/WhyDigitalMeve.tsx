"use client";

import { ShieldCheck, BadgeCheck, FileCheck2, Lock } from "lucide-react";

export default function WhyDigitalMeve() {
  const items = [
    {
      icon: <ShieldCheck className="h-5 w-5 text-emerald-400" />,
      title: "Built-in proof",
      desc: "A durable .MEVE proof lives with the file. No viewer or plugin required.",
    },
    {
      icon: <BadgeCheck className="h-5 w-5 text-emerald-400" />,
      title: "Readable everywhere",
      desc: "Files remain clean and portable — open and share them as usual.",
    },
    {
      icon: <FileCheck2 className="h-5 w-5 text-emerald-400" />,
      title: "Certificate included",
      desc: "Every protected file comes with a human-readable certificate.",
    },
    {
      icon: <Lock className="h-5 w-5 text-emerald-400" />,
      title: "No account. No storage.",
      desc: "Everything runs in your browser. We never keep your files.",
    },
  ];

  return (
    <section aria-label="Why DigitalMeve" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <h2 className="text-2xl sm:text-3xl font-semibold">Why DigitalMeve</h2>
      <p className="mt-2 text-[var(--fg-muted)]">
        Designed for everyone — simple to use, built for trust.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((f) => (
          <div key={f.title} className="surface p-5 sm:p-6" data-reveal>
            <div className="flex items-center gap-2 text-sm">{f.icon}<span className="font-medium">{f.title}</span></div>
            <p className="mt-2 text-sm text-[var(--fg-muted)]">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
