"use client";

import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Layers visuels (légers et désactivés si reduced motion) */}
      <div aria-hidden className="hero-layers -z-10">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
        <div className="beam" />
        <div className="noise" />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
        {/* Headline */}
        <h1 className="heading-1">
          <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
            Invisible proof. Visible trust.
          </span>
        </h1>

        {/* Subheading (sans jargon, avec certificat) */}
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
          DigitalMeve adds an invisible proof to your documents and delivers an official certificate. 
          They remain identical, always readable, and easy to check — no account, no storage.
        </p>

        {/* Micro-claims */}
        <p id="hero-claims" className="mx-auto mt-3 max-w-2xl text-sm text-muted">
          Free for individuals · No account · No storage
        </p>

        {/* CTAs – style global cohérent */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4" aria-describedby="hero-claims">
          <Link href="/generate" className="btn-primary--glow">Get started for free</Link>

          <Link
            href="/verify"
            className="btn-ghost"
          >
            Verify a document
          </Link>
        </div>

        {/* Deux cartes sous-CTA */}
        <div className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-2">
          {/* Individuals */}
          <div className="card-elevated text-left">
            <span className="badge">
              For Individuals — Free
            </span>
            <h3 className="mt-3 text-lg font-semibold">Protect your personal documents in seconds</h3>
            <ul className="mt-3 space-y-1 text-sm text-muted">
              <li>• No account, no storage</li>
              <li>• Always readable, easy to check</li>
            </ul>
            <Link href="/generate" className="mt-4 inline-block link-accent">Start now →</Link>
          </div>

          {/* Business */}
          <div className="card-elevated text-left">
            <span className="badge">
              For Businesses — API & Integration
            </span>
            <h3 className="mt-3 text-lg font-semibold">Automate large-scale certification</h3>
            <ul className="mt-3 space-y-1 text-sm text-muted">
              <li>• API, SDK & dashboard</li>
              <li>• Trust badge for your customers</li>
            </ul>
            <Link href="/pro" className="mt-4 inline-block link-accent">Discover Pro →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
