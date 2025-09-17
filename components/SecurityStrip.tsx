"use client";

import { ShieldCheck, Lock, FileCheck2 } from "lucide-react";

export default function SecurityStrip() {
  const items = [
    { icon: <Lock className="h-4 w-4" />, text: "No uploads — processed locally" },
    { icon: <ShieldCheck className="h-4 w-4" />, text: "GDPR-friendly, privacy by design" },
    { icon: <FileCheck2 className="h-4 w-4" />, text: "Human-readable certificate provided" },
  ];

  return (
    <section aria-label="Security & compliance" className="mx-auto max-w-6xl px-4 pb-6">
      <div className="surface-weak grid gap-3 rounded-2xl p-4 sm:grid-cols-3">
        {items.map((i) => (
          <div key={i.text} className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)]">
            <span className="rounded-md bg-emerald-400/10 p-1.5 text-emerald-300 border border-white/10">
              {i.icon}
            </span>
            {i.text}
          </div>
        ))}
      </div>
    </section>
  );
}
