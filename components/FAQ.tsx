// components/FAQ.tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "Is it really free for individuals?",
    a: "Yes. Anyone can protect their files with a .MEVE proof at no cost. Teams and organizations can scale with pro features.",
  },
  {
    q: "Does my file stay private?",
    a: "Absolutely. Everything happens in your browser. Your file never leaves your device — we never store or see it.",
  },
  {
    q: "Which file types are supported?",
    a: "All common file types: PDFs, images, videos, audio, office docs… If it can be opened, it can be protected.",
  },
  {
    q: "How can someone verify my file?",
    a: "Verification is instant: drop the file in our verifier, and the embedded proof is checked against its certificate — in seconds.",
  },
  {
    q: "What’s the difference from a digital signature?",
    a: ".MEVE proofs are invisible, universal and future-proof. Unlike signatures, they don’t alter your file and work across any format.",
  },
  {
    q: "Can I use it with my team or clients?",
    a: "Yes. Teams, agencies and businesses can integrate DigitalMeve into their workflows for bulk protection and instant client verification.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative overflow-hidden px-4 py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(800px 400px at 10% 20%, rgba(16,185,129,.05), transparent 60%), radial-gradient(700px 360px at 90% 10%, rgba(56,189,248,.05), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl">
        <div className="text-center">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            Frequently asked questions
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Everything you need to know
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-slate-400">
            Still have questions? Here are the answers to the most common ones.
          </p>
        </div>

        <dl className="mt-10 space-y-4">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.q}
                className="rounded-xl border border-white/10 bg-slate-900/50 backdrop-blur"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                >
                  <span className="font-medium text-white">{item.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 transition-transform ${
                      isOpen ? "rotate-180 text-emerald-400" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <dd
                    id={`faq-${i}`}
                    className="px-5 pb-4 text-sm leading-relaxed text-slate-400"
                  >
                    {item.a}
                  </dd>
                )}
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
