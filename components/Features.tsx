"use client";

import {
  ShieldCheck,
  FileCheck2,
  Globe,
  FileDown,
  Users,
  Briefcase,
} from "lucide-react";

export default function Features() {
  const items = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-emerald-400" />,
      title: "Built-in proof",
      desc: "A lightweight proof lives with the file. Nothing extra to install.",
    },
    {
      icon: <Globe className="h-6 w-6 text-sky-400" />,
      title: "Readable everywhere",
      desc: "Your files stay clean and portable — open and share as usual.",
    },
    {
      icon: <FileCheck2 className="h-6 w-6 text-emerald-400" />,
      title: "Human-readable certificate",
      desc: "We generate an optional certificate you can share alongside the file.",
    },
    {
      icon: <Users className="h-6 w-6 text-emerald-400" />,
      title: "Free for individuals",
      desc: "Protect personal documents at no cost. No account. No storage.",
    },
    {
      icon: <FileDown className="h-6 w-6 text-sky-400" />,
      title: "Privacy by design",
      desc: "Everything runs in your browser — we never keep your files.",
    },
    {
      icon: <Briefcase className="h-6 w-6 text-sky-400" />,
      title: "API & dashboard (Pro)",
      desc: "Automate at scale with SDKs, webhooks and a dedicated dashboard.",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-20" id="features">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-slate-100 sm:text-4xl">
          Why DigitalMeve
        </h2>
        <p className="mt-3 text-slate-400">
          Designed for everyone — simple to use, built for trust.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon, title, desc }) => (
          <div
            key={title}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm backdrop-blur-md transition hover:border-emerald-400/40"
          >
            <div className="flex items-center gap-3">
              {icon}
              <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
