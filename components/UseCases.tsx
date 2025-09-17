// components/UseCases.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Users, Briefcase, Building2, ArrowRight } from "lucide-react";

type CaseItem = { title: string; desc: string; cta?: { href: string; label: string } };

const DATA: Record<"individuals" | "business" | "institutions", CaseItem[]> = {
  individuals: [
    { title: "Diplomas & transcripts", desc: "Protect PDF diplomas and share a certificate anyone can verify." },
    { title: "IDs & documents", desc: "Add a portable proof to scans (PDF) without changing how they open." },
    { title: "Creative work", desc: "Stamp portfolios, scripts or treatments with a verifiable fingerprint." },
  ],
  business: [
    { title: "Employee credentials", desc: "Issue protected PDFs/DOCX for onboarding and compliance." },
    { title: "Contracts & proposals", desc: "Share trusted documents; recipients verify in under a second." },
    { title: "Automation", desc: "Use API/SDKs to certify at scale with logs and webhooks." },
  ],
  institutions: [
    { title: "Universities", desc: "Streamline degree verification without changing your student portal." },
    { title: "Hospitals", desc: "Share policies and training docs with built-in authenticity." },
    { title: "Public agencies", desc: "Publish PDFs with a tamper-evident, human-readable certificate." },
  ],
};

export default function UseCases() {
  const [tab, setTab] = useState<"individuals" | "business" | "institutions">("individuals");

  const tabs = [
    { id: "individuals" as const, label: "Individuals", icon: <Users className="h-4 w-4" /> },
    { id: "business" as const, label: "Business", icon: <Briefcase className="h-4 w-4" /> },
    { id: "institutions" as const, label: "Institutions", icon: <Building2 className="h-4 w-4" /> },
  ];

  const chips = [
    "No uploads — processed locally",
    "GDPR-friendly, privacy by design",
    "Human-readable certificate provided",
  ];

  return (
    <section className="section-dark" aria-labelledby="use-cases">
      <div className="container-max py-14">
        <h2 id="use-cases" className="h2">Use Cases</h2>

        {/* Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition
                ${tab === t.id
                  ? "bg-white/10 text-white ring-1 ring-white/15"
                  : "bg-white/5 text-[var(--fg-muted)] hover:text-[var(--fg)] ring-1 ring-white/10"
                }`}
              aria-pressed={tab === t.id}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DATA[tab].map((item, idx) => (
            <article
              key={item.title}
              style={{ transitionDelay: `${idx * 80}ms` }}
              className="opacity-0 translate-y-2 animate-[fadeIn_.5s_ease_forwards] card p-5"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-[var(--fg-muted)]">{item.desc}</p>
            </article>
          ))}
        </div>

        {/* Chips */}
        <div className="mt-6 flex flex-wrap gap-2 text-xs text-[var(--fg-muted)]">
          {chips.map(c => (
            <span key={c} className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 ring-1 ring-white/10">
              <CheckCircle2 className="h-4 w-4 text-[var(--accent-1)]" /> {c}
            </span>
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/generate" className="btn btn-primary-strong btn-glow">
            Protect a file now <ArrowRight className="h-5 w-5" aria-hidden />
          </Link>
          <Link href={tab === "business" || tab === "institutions" ? "/pro" : "/verify"} className="btn-outline">
            {tab === "business" || tab === "institutions" ? "Talk to us" : "Verify a file"} <ArrowRight className="h-5 w-5" aria-hidden />
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn { to { opacity: 1; transform: none; } }
      `}</style>
    </section>
  );
}
