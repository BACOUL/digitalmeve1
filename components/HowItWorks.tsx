"use client";

import { Upload, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "1",
      title: "Upload",
      desc: "Drop your file. It never leaves your device.",
      icon: <Upload className="h-6 w-6 text-emerald-400" />,
    },
    {
      step: "2",
      title: "Protect",
      desc: "We add an invisible proof and prepare your certificate.",
      icon: <ShieldCheck className="h-6 w-6 text-sky-400" />,
    },
    {
      step: "3",
      title: "Share & check",
      desc: "Share the file and certificate. Anyone can check it in seconds.",
      icon: <CheckCircle2 className="h-6 w-6 text-emerald-400" />,
    },
  ];

  return (
    <section
      className="mx-auto max-w-5xl px-4 py-20"
      id="how-it-works"
      aria-describedby="how-sub"
    >
      {/* Title */}
      <h2 className="text-center text-3xl font-extrabold text-white sm:text-4xl">
        Proof in seconds. Easy to check anytime.
      </h2>
      <p id="how-sub" className="mt-3 text-center text-slate-400">
        Three simple steps — no jargon, no account, no storage.
      </p>

      {/* Steps */}
      <ol className="mt-12 grid gap-6 sm:grid-cols-3">
        {steps.map(({ step, title, desc, icon }, i) => (
          <li
            key={step}
            className="relative rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-md shadow-md transition
                       hover:border-emerald-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]"
          >
            {/* Step number + icon */}
            <div className="mb-4 flex items-center gap-3">
              <div
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15
                           bg-slate-800/60 text-sm font-semibold text-slate-200"
                aria-hidden
              >
                {step}
              </div>
              {icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-slate-100">{title}</h3>

            {/* Description */}
            <p className="mt-2 text-sm text-slate-400">{desc}</p>

            {/* Connector arrow (desktop except last card) */}
            {i < steps.length - 1 && (
              <div
                className="pointer-events-none absolute right-[-18px] top-1/2 hidden -translate-y-1/2 select-none sm:block"
                aria-hidden
              >
                <span className="text-slate-600">→</span>
              </div>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
