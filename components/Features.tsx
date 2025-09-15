// components/Features.tsx
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ShieldCheck,
  FileCheck2,
  Globe,
  FileDown,
  Users,
  Briefcase,
} from "lucide-react";

type FeatureItem = {
  key: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
};

type FeaturesProps = {
  title?: string;
  subtitle?: string;
  items?: FeatureItem[];
  className?: string;
  /** réduit les paddings et le rayon — utile dans une page dense */
  compact?: boolean;
  /** nb de colonnes à partir de lg */
  columns?: 2 | 3 | 4;
  /** id pour ancrage */
  id?: string;
};

const DEFAULT_ITEMS: FeatureItem[] = [
  {
    key: "builtin-proof",
    icon: <ShieldCheck className="h-6 w-6 text-emerald-400" aria-hidden />,
    title: "Built-in proof",
    desc: "A lightweight proof lives with the file. Nothing extra to install.",
  },
  {
    key: "readable-everywhere",
    icon: <Globe className="h-6 w-6 text-sky-400" aria-hidden />,
    title: "Readable everywhere",
    desc: "Your files stay clean and portable — open and share as usual.",
  },
  {
    key: "human-certificate",
    icon: <FileCheck2 className="h-6 w-6 text-emerald-400" aria-hidden />,
    title: "Human-readable certificate",
    desc: "We generate an optional certificate you can share alongside the file.",
  },
  {
    key: "free-individuals",
    icon: <Users className="h-6 w-6 text-emerald-400" aria-hidden />,
    title: "Free for individuals",
    desc: "Protect personal documents at no cost. No account. No storage.",
  },
  {
    key: "privacy-by-design",
    icon: <FileDown className="h-6 w-6 text-sky-400" aria-hidden />,
    title: "Privacy by design",
    desc: "Everything runs in your browser — we never keep your files.",
  },
  {
    key: "api-pro",
    icon: <Briefcase className="h-6 w-6 text-sky-400" aria-hidden />,
    title: "API & dashboard (Pro)",
    desc: "Automate at scale with SDKs, webhooks and a dedicated dashboard.",
  },
];

export default function Features({
  title = "Why DigitalMeve",
  subtitle = "Designed for everyone — simple to use, built for trust.",
  items = DEFAULT_ITEMS,
  className,
  compact = false,
  columns = 3,
  id = "features",
}: FeaturesProps) {
  const sectionId = id;
  const headingId = `${sectionId}-heading`;
  const subId = `${sectionId}-sub`;

  // classe responsive pour le nombre de colonnes
  const colClass =
    columns === 4
      ? "lg:grid-cols-4"
      : columns === 2
      ? "lg:grid-cols-2"
      : "lg:grid-cols-3";

  return (
    <section
      id={sectionId}
      aria-labelledby={headingId}
      className={cn("mx-auto max-w-6xl px-4 py-20", className)}
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 id={headingId} className="text-3xl font-bold text-slate-100 sm:text-4xl">
          {title}
        </h2>
        <p id={subId} className="mt-3 text-slate-400">
          {subtitle}
        </p>
      </div>

      <ul
        aria-describedby={subId}
        className={cn("mt-10 grid gap-6 sm:grid-cols-2", colClass)}
      >
        {items.map(({ key, icon, title, desc }) => (
          <li key={key} className="group outline-none">
            <article
              tabIndex={0}
              className={cn(
                "rounded-2xl border border-white/10 bg-white/5 shadow-sm backdrop-blur-md transition",
                compact ? "p-5" : "p-6",
                // hover + focus ring doux
                "hover:border-emerald-400/40 focus-visible:border-emerald-400/40",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/30"
              )}
            >
              <div className="flex items-center gap-3">
                {/* halo animé discret sur l’icône */}
                <span className="relative grid place-items-center">
                  <span className="absolute inset-0 scale-0 rounded-full bg-emerald-400/0 transition group-hover:scale-100 group-hover:bg-emerald-400/10" />
                  {icon}
                </span>
                <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{desc}</p>
            </article>
          </li>
        ))}
      </ul>

      {/* Animations respectueuses de prefers-reduced-motion */}
      <style jsx>{`
        @media (prefers-reduced-motion: no-preference) {
          article {
            transform: translateY(0);
          }
          li:nth-child(1) article { animation: featIn 520ms 40ms both; }
          li:nth-child(2) article { animation: featIn 520ms 90ms both; }
          li:nth-child(3) article { animation: featIn 520ms 140ms both; }
          li:nth-child(4) article { animation: featIn 520ms 190ms both; }
          li:nth-child(5) article { animation: featIn 520ms 240ms both; }
          li:nth-child(6) article { animation: featIn 520ms 290ms both; }
        }
        @keyframes featIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

/* =========================
 * Variantes prêtes à l'emploi
 * ========================= */
// Exemple d’utilisation custom :
// <Features
//   columns={4}
//   compact
//   items={[
//     { key: "k1", icon: <ShieldCheck ... />, title: "…", desc: "…" },
//     // ...
//   ]}
// />
