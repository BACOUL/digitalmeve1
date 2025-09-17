"use client";

import Link from "next/link";
import { User, Briefcase } from "lucide-react";

export default function UseCases() {
  const personal = [
    { t: "CV & Résumé", d: "Share an authenticated version recruiters can verify in one click." },
    { t: "Diplomas & Certificates", d: "Preserve the integrity of your academic records." },
    { t: "Contracts & Quotes", d: "Keep files readable everywhere with a separate certificate." },
  ];

  const business = [
    { t: "HR / Recruiting", d: "Certified resumes and internal attestations at scale." },
    { t: "Legal & Compliance", d: "Timestamped versions, sealed attachments, high-trust share." },
    { t: "Education & Training", d: "Digital diplomas, transcripts, student certificates." },
  ];

  const Block = ({
    icon,
    title,
    items,
    label,
    href,
  }: {
    icon: React.ReactNode;
    title: string;
    items: { t: string; d: string }[];
    label: string;
    href: string;
  }) => (
    <div className="surface p-6 sm:p-8" data-reveal>
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-xl font-semibold">{title}</h3>
        <span className="ml-2 badge badge-solid">{label}</span>
      </div>
      <div className="mt-4 grid gap-3">
        {items.map((c) => (
          <div key={c.t} className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="font-medium">{c.t}</p>
            <p className="text-sm text-[var(--fg-muted)]">{c.d}</p>
          </div>
        ))}
      </div>
      <Link href={href} className="mt-5 inline-flex items-center gap-2 btn btn-secondary">
        Explore {label.toLowerCase()} →
      </Link>
    </div>
  );

  return (
    <section aria-label="Use cases & examples" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
      <h2 className="text-2xl sm:text-3xl font-semibold">Use cases & examples</h2>
      <p className="mt-2 text-[var(--fg-muted)]">What people do with .MEVE — in seconds.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Block
          icon={<User className="h-5 w-5 text-emerald-400" />}
          title="Individuals"
          items={personal}
          label="Personal"
          href="/personal"
        />
        <Block
          icon={<Briefcase className="h-5 w-5 text-sky-400" />}
          title="Business"
          items={business}
          label="Business"
          href="/pro"
        />
      </div>
    </section>
  );
}
