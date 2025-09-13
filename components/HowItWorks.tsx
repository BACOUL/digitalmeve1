"use client";

import { Upload, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "1",
      title: "Upload",
      desc: "Drop your document. We never store it.",
      icon: <Upload className="h-6 w-6 text-emerald-400" />,
    },
    {
      step: "2",
      title: "Protect",
      desc: "A .MEVE proof is generated in ~2s, embedding a fingerprint inside.",
      icon: <ShieldCheck className="h-6 w-6 text-sky-400" />,
    },
    {
      step: "3",
      title: "Verify",
      desc: "Anyone can confirm authenticity instantly, online or offline.",
      icon: <CheckCircle2 className="h-6 w-6 text-emerald-400" />,
    },
  ];

  return (
    <section className="mx-auto max-w-5xl px-4 py-20" id="how-it-works">
      {/* Title */}
      <h2 className="text-center text-3xl font-bold text-slate-100 sm:text-4xl">
        Proof in seconds. Verified forever.
      </h2>
      <p className="mt-3 text-center text-slate-400">
        Three simple steps to protect and verify your documents with the{" "}
        <span className="font-semibold text-slate-200">.MEVE</span> standard.
      </p>

      {/* Steps */}
      <ol className="mt-12 grid gap-6 sm:grid-cols-3">
        {steps.map(({ step, title, desc, icon }) => (
          <li
            key={step}
            className="relative rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md shadow-md transition hover:border-emerald-400/50"
          >
            {/* Step number */}
            <div className="mb-4 flex items-center gap-3">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-slate-800/60 text-sm font-semibold text-slate-200">
                {step}
              </div>
              {icon}
            </div>
            {/* Title */}
            <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
            {/* Description */}
            <p className="mt-2 text-sm text-slate-400">{desc}</p>

            {/* Arrow indicator (desktop only, except last) */}
            {step !== "3" && (
              <div className="hidden sm:block absolute right-[-20px] top-1/2 -translate-y-1/2 text-slate-600">
                →
              </div>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
