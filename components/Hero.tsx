"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden">
      {/* soft aura */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 flex items-start justify-center">
        <div className="mt-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl md:h-96 md:w-96" />
      </div>

      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
        {/* H1 */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
            Invisible proof. Visible trust.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
          DigitalMeve adds an invisible proof to your documents and delivers an official certificate.
          They remain identical, always readable, and easy to check — <span className="font-semibold">no account, no storage</span>.
        </p>

        {/* Micro-claims */}
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400">
          Free for individuals · ~2s per document
        </p>

        {/* Primary CTA */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/generate"
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_0_30px_rgba(34,211,238,0.45)] hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            Get started for free
          </Link>
        </div>

        {/* Two cards under main CTA */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {/* Individuals */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-400/20">
              For Individuals — Free forever
            </div>
            <h3 className="mt-3 text-lg font-semibold text-slate-100">Protect your personal documents in 2 seconds</h3>
            <ul className="mt-2 space-y-1 text-sm text-slate-300">
              <li>• No account, no storage</li>
              <li>• Always readable, easy to check</li>
            </ul>
            <Link
              href="/generate"
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600"
            >
              Start now
            </Link>
          </div>

          {/* Businesses */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-sky-400/10 px-2.5 py-1 text-xs font-medium text-sky-300 ring-1 ring-sky-400/20">
              For Businesses — API & Integration
            </div>
            <h3 className="mt-3 text-lg font-semibold text-slate-100">Automate large-scale certification</h3>
            <ul className="mt-2 space-y-1 text-sm text-slate-300">
              <li>• API, SDK & dedicated dashboard</li>
              <li>• Trust badge for your customers</li>
            </ul>
            <Link
              href="/pro"
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
            >
              Discover Pro
            </Link>
          </div>
        </div>

        {/* Helper link (optional) */}
        <div className="mt-6">
          <Link
            href="/sample.pdf"
            className="text-sm text-slate-300 underline decoration-sky-400/60 underline-offset-4 hover:text-slate-100"
          >
            Try with a sample file
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
