// components/FAQ.tsx — v3.1 (public-friendly, product-true, on-device, 5/mo, PDF+DOCX now)
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "Is it really free for individuals?",
    a: "Yes. You can protect up to 5 files per month for free. That’s a fair-use limit to prevent abuse — you can upgrade anytime if you need more.",
  },
  {
    q: "Do you store or see my files?",
    a: "No. Everything runs on your device, in your browser. We never upload, store or access your files.",
  },
  {
    q: "Which file types are supported?",
    a: "Today: PDF and DOCX. Your protected files remain fully readable and shareable. Image formats (PNG/JPG) and more are coming soon.",
  },
  {
    q: "What changes to my file?",
    a: "We add a small visible watermark and embed an invisible .MEVE proof. Your content stays intact and opens exactly as usual. You can also download an optional shareable receipt (.html).",
  },
  {
    q: "How does verification work?",
    a: "Open the Verify page and drop the file. The built-in proof is checked in seconds — no account required, and it works offline.",
  },
  {
    q: "How is this different from a digital signature?",
    a: "It keeps your file simple to open and share, adds a durable proof that travels with the file, and makes checks instant for anyone. For businesses, you can add your issuer name and bind trust to your domain.",
  },
  {
    q: "Can I use it with my team or clients?",
    a: "Yes. Teams and organizations can protect documents at scale, brand their issuer, and enable instant client checks — with simple, privacy-first workflows.",
  },
  {
    q: "Is it GDPR-friendly?",
    a: "Yes. We process files on-device and don’t store your data. You stay in control — privacy by design.",
  },
  {
    q: "What happens if I hit the free limit?",
    a: "You’ll see a friendly notice. You can wait for the monthly reset or upgrade to a paid plan if you need more volume.",
  },
  {
    q: "Do I need to be online to verify?",
    a: "No. Local verification works offline. Some pro features (like domain trust checks) may use the network, but basic verification does not.",
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
            Clear answers about privacy, formats, verification and pricing.
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
