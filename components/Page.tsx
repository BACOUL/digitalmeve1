// app/page.tsx
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Briefcase,
  ShieldCheck,
  BadgeCheck,
  FileDown,
  Sparkles,
} from "lucide-react";

import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Reveal from "@/components/Reveal";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* ================= HERO ================= */}
      <Hero />

      {/* ======== PROOF BAR (subtle, 3 chips) ======== */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        <Reveal className="flex flex-wrap items-center justify-center gap-3 text-xs">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
            <BadgeCheck className="h-4 w-4 text-emerald-400" />
            Certificate included
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
            <ShieldCheck className="h-4 w-4 text-sky-400" />
            No account · No storage
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            Free for individuals
          </span>
        </Reveal>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <HowItWorks />

      {/* ============== USE-CASES — INDIVIDUALS (3 examples) ============== */}
      <section className="mx-auto max-w-6xl px-4 pb-8">
        <Reveal className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-semibold">For Individuals</h2>
            <span className="ml-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-300">
              Free
            </span>
          </div>
          <p className="mt-2 text-slate-300">
            Protect everyday documents in seconds. Your files stay identical; you get a human-readable certificate to share when needed.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "CV / Résumé",
                desc: "Share a trusted version recruiters can check instantly.",
              },
              {
                title: "Diplomas & Certificates",
                desc: "Keep your credentials portable and verifiable.",
              },
              {
                title: "Signed Agreements",
                desc: "Send clean PDFs plus a simple certificate link.",
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={100 * i} className="rounded-2xl border border-white/10 bg-slate-900/50 p-5">
                <h3 className="font-semibold text-slate-100">{c.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{c.desc}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-5 py-2.5 font-semibold text-slate-900 shadow-[0_0_30px_rgba(34,211,238,0.35)] hover:brightness-110 transition"
            >
              Protect a file now
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/pricing#individuals"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 font-semibold text-slate-100 hover:bg-white/10 transition"
            >
              Learn about personal use
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ============== USE-CASES — BUSINESS (3 examples) ============== */}
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <Reveal className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-sky-400" />
            <h2 className="text-xl sm:text-2xl font-semibold">For Businesses</h2>
            <span className="ml-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-2 py-0.5 text-xs text-sky-300">
              API & Dashboard
            </span>
          </div>
          <p className="mt-2 text-slate-300">
            Bring trust to your digital workflows. Automate certification, verify at scale, and display a visible trust signal.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "HR & Hiring",
                desc: "Trusted résumés, internal attestations, candidate packets.",
              },
              {
                title: "Education",
                desc: "Digital diplomas, transcripts, student certificates.",
              },
              {
                title: "Legal & Contracts",
                desc: "Timestamped versions and sealed attachments for high-trust exchange.",
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={120 * i} className="rounded-2xl border border-white/10 bg-slate-900/50 p-5">
                <h3 className="font-semibold text-slate-100">{c.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{c.desc}</p>
              </Reveal>
            ))}
          </div>

          <ul className="mt-5 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
              API, SDKs & webhooks for automation
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
              Verification at scale (batch, internal tools)
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
              Domain/email checks for a visible trust badge
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
              SLA, support & roadmap alignment
            </li>
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/pro"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 font-semibold text-slate-100 hover:bg-white/10 transition"
            >
              Discover Pro
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-5 py-2.5 font-semibold text-white hover:bg-sky-600 transition"
            >
              Contact sales
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ================= WHY DIGITALMEVE ================= */}
      <section className="mx-auto max-w-6xl px-4 pb-10">
        <Reveal className="">
          <h2 className="text-2xl font-semibold">Why DigitalMeve</h2>
          <p className="mt-2 text-slate-400">
            Designed for everyone — simple to use, built for trust.
          </p>
        </Reveal>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <ShieldCheck className="h-5 w-5 text-emerald-400" />,
              title: "Built-in proof",
              desc: "A durable proof lives with the file. No viewer or plugin required.",
            },
            {
              icon: <BadgeCheck className="h-5 w-5 text-emerald-400" />,
              title: "Readable everywhere",
              desc: "Your files remain clean and portable — open them as usual.",
            },
            {
              icon: <Users className="h-5 w-5 text-emerald-400" />,
              title: "Free for individuals",
              desc: "Protect personal files at no cost. Pro plans scale your workflows.",
            },
            {
              icon: <FileDown className="h-5 w-5 text-emerald-400" />,
              title: "No account. No storage.",
              desc: "We never keep your files. Generate and check in seconds.",
            },
          ].map((f, i) => (
            <Reveal key={f.title} delay={80 * i} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2 text-sm text-emerald-400">
                {f.icon}
                <span className="font-medium">{f.title}</span>
              </div>
              <p className="mt-2 text-sm text-slate-300">{f.desc}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-5 py-2.5 font-semibold text-slate-900 shadow-[0_0_30px_rgba(34,211,238,0.35)] hover:brightness-110 transition"
          >
            Protect a file now
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/verify"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 font-semibold text-slate-100 hover:bg-white/10 transition"
          >
            Verify a file
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Reveal>
      </section>

      {/* ================= DEVELOPERS / SAMPLE ================= */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <h3 className="text-xl font-semibold">Try a sample</h3>
            <p className="mt-2 text-slate-300">
              Download a sample file and see how the certificate works in practice.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/sample.pdf"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-2 font-semibold hover:bg-white/10"
              >
                <FileDown className="h-5 w-5 text-emerald-400" />
                Download sample
              </Link>
              <Link
                href="/verify"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-2 font-semibold hover:bg-white/10"
              >
                Verify now
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120} className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <h3 className="text-xl font-semibold">Developers</h3>
            <p className="mt-2 text-slate-300">
              Integrate DigitalMeve into your apps with our upcoming SDKs and webhook notifications. Ship trust by default.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/developers"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-2 font-semibold hover:bg-white/10"
              >
                Explore docs
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-4 py-2 font-semibold text-white hover:bg-sky-600"
              >
                Talk to us
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ======= MINI-FAQ (concise) ======= */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <Reveal className="">
          <h2 className="text-2xl font-semibold">FAQ (quick)</h2>
        </Reveal>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {[
            { q: "Do I need an account?", a: "No. You can generate and verify without creating an account." },
            { q: "Do you store my files?", a: "No. Files stay on your device. We only prepare your certificate." },
            { q: "Are my files still readable?", a: "Yes. Nothing changes for how you open or share them." },
          ].map((f, i) => (
            <Reveal key={f.q} delay={90 * i} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h4 className="font-semibold text-slate-100">{f.q}</h4>
              <p className="mt-1 text-sm text-slate-300">{f.a}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
              }
