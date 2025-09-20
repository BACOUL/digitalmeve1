// components/HowItWorks.tsx — v1 (world-class: simple, accessible, animated, no libs)
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Upload, ShieldCheck, Radar } from "lucide-react";

type Step = {
  icon: JSX.Element;
  title: string;
  text: string;
};

export default function HowItWorks() {
  const steps: Step[] = [
    {
      icon: <Upload className="h-6 w-6 opacity-90" aria-hidden />,
      title: "Drop your file",
      text: "Your file never leaves your device. Work privately in your browser.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 opacity-90" aria-hidden />,
      title: "Invisible .MEVE certificate added",
      text: "SHA-256 fingerprint, timestamp, and issuer identity — fully self-contained.",
    },
    {
      icon: <Radar className="h-6 w-6 opacity-90" aria-hidden />,
      title: "Verify anywhere",
      text: "Open standard. Anyone can verify in seconds — zero servers required.",
    },
  ];

  // Reveal-on-scroll, no external libs, respects prefers-reduced-motion
  const ref = useRef<HTMLElement | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setOn(true);
      return;
    }
    if (!ref.current) return;

    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setOn(true),
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={ref}
      aria-label="How DigitalMeve works"
      className="relative overflow-hidden px-4 py-12 sm:py-16"
    >
      {/* Subtle background veil to match Hero auroras */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          background:
            "radial-gradient(900px 420px at 12% -10%, rgba(16,185,129,.06), transparent 42%), radial-gradient(840px 360px at 88% 10%, rgba(56,189,248,.05), transparent 44%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Eyebrow */}
        <div className="mx-auto w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] tracking-wide text-slate-300 backdrop-blur">
          HOW IT WORKS
        </div>

        {/* Heading + subheading */}
        <h2 className="mt-3 text-center text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
          3 simple steps to protect and verify any file.
        </h2>
        <p className="mx-auto mt-2 max-w-3xl text-center text-[15px] sm:text-[17px] text-[var(--fg-muted)]">
          Invisible by design, universal by default — no storage, no accounts required to try.
        </p>

        {/* Steps */}
        <ol
          className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4"
          aria-label="Steps"
        >
          {steps.map((s, i) => (
            <li
              key={s.title}
              className={[
                "group relative rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur",
                "hover:bg-white/10 transition-colors",
                // reveal micro-motion
                "motion-safe:transform motion-safe:transition-all",
                on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
                on ? `motion-safe:[transition-delay:${i * 90}ms]` : "",
              ].join(" ")}
            >
              {/* Tiny halo */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "radial-gradient(60% 120% at 50% -20%, rgba(56,189,248,.06), transparent 60%)",
                  mask:
                    "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
                  WebkitMask:
                    "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
                  padding: 1,
                }}
              />
              <div className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-emerald-300">
                {s.icon}
              </div>
              <h3 className="mt-3 font-semibold text-slate-100">
                {i + 1}. {s.title}
              </h3>
              <p className="mt-1 text-sm text-slate-300/90">{s.text}</p>
            </li>
          ))}
        </ol>

        {/* CTA row */}
        <div className="mt-6 flex items-center justify-center">
          <Link
            href="/generate"
            aria-label="Try DigitalMeve now"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2.5 text-sm font-medium text-white shadow-[0_0_24px_rgba(56,189,248,.22)] hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 max-[360px]:w-full"
          >
            Try now
          </Link>
        </div>

        {/* Micro-footnote */}
        <p className="mt-3 text-center text-xs text-slate-400">
          Files are processed on-device. Certificates are self-contained and verifiable anywhere.
        </p>
      </div>
    </section>
  );
}
