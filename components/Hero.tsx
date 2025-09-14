// components/Hero.tsx
"use client";

import Link from "next/link";
import CTAButton from "@/components/CTAButton";
import { Users, Briefcase, CheckCircle2 } from "lucide-react";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-[var(--bg)] text-[var(--fg)]">
      {/* aura très douce */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-400/8 blur-3xl md:h-96 md:w-96" />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
        {/* H1 lisible & hiérarchisé */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          <span className="text-white">Invisible proof.</span>{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
            Visible trust.
          </span>
        </h1>

        {/* Sous-titre validé (contraste renforcé) */}
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--fg-muted)]">
          DigitalMeve adds an invisible proof to your documents and delivers an official
          certificate. They remain identical, always readable, and easy to check —
          no account, no storage.
        </p>

        {/* CTA principal */}
        <div className="mt-8 flex justify-center">
          <Link href="/generate">
            <CTAButton variant="primary">Get started for free</CTAButton>
          </Link>
        </div>

        {/* Deux cartes sous le CTA */}
        <div className="mt-10 grid gap-5 text-left sm:grid-cols-2">
          {/* Individuals */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-[var(--chip-emerald)] px-3 py-1 text-xs font-medium text-emerald-300">
              <Users className="h-4 w-4" />
              For Individuals — Free forever
            </span>

            <h3 className="mt-3 text-lg font-semibold text-white">
              Protect your personal documents in seconds
            </h3>

            <ul className="mt-3 space-y-2 text-sm text-[var(--fg)]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
                No account, no storage
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
                Always readable, easy to check
              </li>
            </ul>

            <div className="mt-5">
              <Link href="/generate">
                <CTAButton variant="secondary">Start now</CTAButton>
              </Link>
            </div>
          </div>

          {/* Business */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-[var(--chip-sky)] px-3 py-1 text-xs font-medium text-sky-300">
              <Briefcase className="h-4 w-4" />
              For Businesses — API & Integration
            </span>

            <h3 className="mt-3 text-lg font-semibold text-white">
              Automate large-scale certification
            </h3>

            <ul className="mt-3 space-y-2 text-sm text-[var(--fg)]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-sky-400" />
                API, SDK & dedicated dashboard
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-sky-400" />
                Trust badge for your customers
              </li>
            </ul>

            <div className="mt-5">
              <Link href="/pro">
                <CTAButton variant="secondary">Discover Pro</CTAButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
