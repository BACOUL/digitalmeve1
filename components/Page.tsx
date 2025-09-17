// app/page.tsx
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhyDigitalMeve from "@/components/WhyDigitalMeve";
import FAQ from "@/components/FAQ";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* 1) HERO */}
      <Hero />

      {/* 2) HOW IT WORKS (3 steps) */}
      <HowItWorks />

      {/* 3) WHY DIGITALMEVE (4 benefits) */}
      <WhyDigitalMeve />

      {/* 4) BUILT FOR (inline, pas d’imports supplémentaires) */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-2xl font-semibold">Built for</h2>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Individuals */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold">Individuals</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
                Unlimited personal use
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
                Files stay readable & portable
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
                Optional human-readable certificate
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/generate"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-5 py-2.5 font-semibold text-slate-900 shadow-[0_0_30px_rgba(34,211,238,0.35)] hover:brightness-110 transition"
              >
                Start free <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/personal"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 font-semibold hover:bg-white/10 transition"
              >
                Explore personal <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Teams & Business */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold">Teams & Business</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
                APIs & SDKs for automation
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
                Verification at scale & webhooks
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
                Email/domain checks for a trust badge
              </li>
            </ul>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/pro"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 font-semibold hover:bg-white/10 transition"
              >
                Learn more <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-5 py-2.5 font-semibold text-white hover:bg-sky-600 transition"
              >
                Contact sales <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5) FAQ (short) */}
      <FAQ />
    </main>
  );
}
