"use client";

import Link from "next/link";
import CTAButton from "@/components/CTAButton";
import { ArrowRight, Users, Briefcase, CheckCircle2, ShieldCheck } from "lucide-react";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden border-b border-[var(--border)] bg-[var(--bg)]">
      {/* subtle aura */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 flex items-start justify-center">
        <div className="mt-16 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl md:h-80 md:w-80" />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
        {/* Title */}
        <h1 className="heading-1">
          Invisible proof. <span className="text-[var(--cta)]">Visible trust.</span>
        </h1>

        {/* Subtitle (no jargon, certificate + no account/storage) */}
        <p className="mx-auto mt-4 max-w-2xl body-base">
          DigitalMeve adds an invisible proof to your documents and delivers an official certificate.
          They remain identical, always readable, and easy to check — no account, no storage.
        </p>

        {/* Primary CTA */}
        <div className="mt-8 flex items-center justify-center">
          <Link href="/generate" aria-label="Get started for free">
            <CTAButton variant="primary">Get started for free</CTAButton>
          </Link>
        </div>

        {/* Two cards under the main CTA */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {/* Individuals */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-300">
              <Users className="h-4 w-4" />
              For Individuals — Free forever
            </div>
            <ul className="mt-3 space-y-2 body-sm">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--accent)]" />
                Protect your personal documents in seconds
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--accent)]" />
                No account, no storage
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--accent)]" />
                Always readable, easy to check
              </li>
            </ul>
            <div className="mt-4">
              <Link href="/generate" aria-label="Start now" className="btn btn-neutral">
                Start now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Business */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/30 bg-sky-400/10 px-2.5 py-1 text-xs text-sky-300">
              <Briefcase className="h-4 w-4" />
              For Businesses — API & Integration
            </div>
            <ul className="mt-3 space-y-2 body-sm">
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-[var(--cta)]" />
                Automate large-scale certification
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-[var(--cta)]" />
                API, SDK & dedicated dashboard
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 h-4 w-4 text-[var(--cta)]" />
                Trust badge for your customers
              </li>
            </ul>
            <div className="mt-4">
              <Link href="/pro" aria-label="Discover Pro" className="btn btn-primary">
                Discover Pro <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
