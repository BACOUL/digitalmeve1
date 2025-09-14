"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden" id="hero">
      {/* Subtle aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 flex items-start justify-center"
      >
        <div className="mt-16 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl md:h-80 md:w-80" />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
        {/* Headline */}
        <h1 className="heading-1">
          <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
            Invisible proof. Visible trust.
          </span>
        </h1>

        {/* Subtitle – no jargon, mentions certificate & privacy */}
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--fg-muted)]">
          DigitalMeve adds an invisible proof to your documents and delivers an
          official certificate. They remain identical, always readable, and easy
          to check — <span className="font-semibold text-[var(--fg)]">no account, no storage</span>.
        </p>

        {/* Micro-claims (sans “offline”) */}
        <p
          id="hero-claims"
          className="mx-auto mt-3 max-w-2xl text-sm text-[var(--fg-muted)]/80"
        >
          Free for individuals · ~2s per file
        </p>

        {/* CTAs */}
        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
          aria-describedby="hero-claims"
        >
          <Link href="/generate" className="btn btn-primary">
            Get started for free
          </Link>
          <Link href="/verify" className="btn btn-neutral">
            Verify a file
          </Link>
        </div>

        {/* Split cards: Individuals / Business */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {/* Individuals */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-left">
            <span className="badge border-[var(--accent)] text-[var(--accent)]">
              Individuals — Free forever
            </span>
            <h3 className="mt-3 heading-3">Protect your documents in seconds</h3>
            <ul className="mt-2 space-y-1 text-sm text-[var(--fg-muted)]">
              <li>• No account, no storage</li>
              <li>• Files remain readable anywhere</li>
              <li>• Instant certificate you can share</li>
            </ul>
            <div className="mt-4">
              <Link href="/generate" className="btn btn-accent">
                Start now
              </Link>
            </div>
          </div>

          {/* Business */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-left">
            <span className="badge border-[var(--cta)] text-[var(--cta)]">
              Businesses — API & Dashboard
            </span>
            <h3 className="mt-3 heading-3">Scale certification with confidence</h3>
            <ul className="mt-2 space-y-1 text-sm text-[var(--fg-muted)]">
              <li>• API, SDKs & team dashboard</li>
              <li>• Bulk workflows & webhooks</li>
              <li>• Pro trust badge for your brand</li>
            </ul>
            <div className="mt-4 flex gap-3">
              <Link href="/pro" className="btn btn-neutral">
                Discover Pro
              </Link>
              <Link href="/contact" className="btn btn-primary">
                Contact sales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
