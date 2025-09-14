"use client";

import Link from "next/link";
import { Users, Briefcase, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden">
      {/* subtle glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 flex items-start justify-center"
      >
        <div className="mt-24 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl md:h-96 md:w-96" />
      </div>

      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:py-20">
        {/* Headline */}
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
          <span className="text-white">Invisible proof.</span>{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
            Visible trust.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-5 max-w-3xl text-lg text-slate-300">
          DigitalMeve adds an invisible proof to your documents and delivers an
          official certificate. They remain identical, always readable, and easy
          to check — no account, no storage.
        </p>

        {/* Primary CTA */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/generate"
            className="rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-6 py-3 text-base font-semibold text-slate-900 shadow-[0_0_40px_rgba(34,211,238,0.35)] hover:brightness-110"
          >
            Get started for free
          </Link>
        </div>

        {/* Micro claims (pills) */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            Free for individuals
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            No account
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            No storage
          </span>
        </div>

        {/* Split cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {/* Individuals */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur-sm">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-300">
              <Users className="h-4 w-4" />
              For Individuals
            </div>

            <h3 className="text-lg font-semibold text-white">
              Protect your personal documents in seconds
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
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
              <Link
                href="/generate"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10"
              >
                Start now
              </Link>
            </div>
          </div>

          {/* Businesses */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur-sm">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-xs text-sky-300">
              <Briefcase className="h-4 w-4" />
              For Businesses — API & Integration
            </div>

            <h3 className="text-lg font-semibold text-white">
              Integrate .MEVE into your workflow
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-sky-400" />
                Automate large-scale certification
              </li>
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
              <Link
                href="/pro"
                className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:brightness-110"
              >
                Discover Pro
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
                }
