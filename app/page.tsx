// app/page.tsx
import {
  Upload,
  BadgeCheck,
  ShieldCheck,
  FileDown,
  ArrowRight,
  Users,
  Briefcase,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import Hero from "@/components/Hero"; // ✅ default export (fix build)

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* HERO (déjà conforme à la charte via components/Hero.tsx) */}
      <Hero />

      {/* 3 SIMPLE STEPS */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-semibold text-white">How it works</h2>
        <p className="mt-2 text-slate-400">Three simple steps. No jargon.</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {/* Step 1 */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>Step 1</span>
              <Upload className="h-5 w-5 text-emerald-400" aria-hidden />
            </div>
            <h3 className="mt-2 text-lg font-medium text-white">
              Upload your document
            </h3>
            <p className="mt-2 text-slate-300">
              Works with common formats; your file stays on your device.
            </p>
            <Link
              href="/generate"
              className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300"
            >
              Try now <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </div>

          {/* Step 2 */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>Step 2</span>
              <BadgeCheck className="h-5 w-5 text-emerald-400" aria-hidden />
            </div>
            <h3 className="mt-2 text-lg font-medium text-white">
              Get your protected copy
            </h3>
            <p className="mt-2 text-slate-300">
              We add a lightweight, invisible proof and prepare your certificate.
            </p>
          </div>

          {/* Step 3 */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>Step 3</span>
              <FileDown className="h-5 w-5 text-emerald-400" aria-hidden />
            </div>
            <h3 className="mt-2 text-lg font-medium text-white">
              Download & share
            </h3>
            <p className="mt-2 text-slate-300">
              Share your file and certificate. Anyone can check it in seconds.
            </p>
            <Link
              href="/verify"
              className="mt-4 inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300"
            >
              Verify a document <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY DIGITALMEVE */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl font-semibold text-white">Why DigitalMeve</h2>
        <p className="mt-2 text-slate-400">
          Designed for everyone — from individuals to enterprises. Simple to use, built for trust.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* 1 */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-emerald-400">
              <ShieldCheck className="h-5 w-5" aria-hidden />
              <span className="font-medium">Built-in proof</span>
            </div>
            <p className="mt-2 text-sm text-slate-300">
              A durable proof lives with the file. No viewer or plugin required.
            </p>
          </div>

          {/* 2 */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-emerald-400">
              <BadgeCheck className="h-5 w-5" aria-hidden />
              <span className="font-medium">Readable everywhere</span>
            </div>
            <p className="mt-2 text-sm text-slate-300">
              Your files remain clean and portable — open them as usual.
            </p>
          </div>

          {/* 3 */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-emerald-400">
              <Users className="h-5 w-5" aria-hidden />
              <span className="font-medium">Free for individuals</span>
            </div>
            <p className="mt-2 text-sm text-slate-300">
              Protect personal files at no cost. Pro plans scale your workflows.
            </p>
          </div>

          {/* 4 */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-emerald-400">
              <FileDown className="h-5 w-5" aria-hidden />
              <span className="font-medium">No account. No storage.</span>
            </div>
            <p className="mt-2 text-sm text-slate-300">
              We never keep your files. Generate and check in seconds.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/generate"
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-5 py-2.5 font-semibold text-slate-900 shadow-[0_0_30px_rgba(34,211,238,0.35)] hover:brightness-110 transition"
          >
            Protect a file now
            <ArrowRight className="h-5 w-5" aria-hidden />
          </Link>
          <Link
            href="/verify"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 font-semibold text-slate-100 hover:bg-white/10 transition"
          >
            Verify a file
            <ArrowRight className="h-5 w-5" aria-hidden />
          </Link>
        </div>
      </section>

      {/* CLEAR SPLIT: INDIVIDUALS vs PROFESSIONALS */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Individuals */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
              <Users className="h-4 w-4" aria-hidden />
              For Individuals — Free
            </span>
            <h3 className="mt-3 text-xl font-semibold text-white">
              Protect your files in seconds
            </h3>
            <ul className="mt-3 space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" aria-hidden />
                Unlimited personal use
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" aria-hidden />
                Files remain readable and portable
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" aria-hidden />
                Optional human-readable certificate
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" aria-hidden />
                No account. No storage.
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              <Link
                href="/pricing#individuals"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10 transition"
              >
                Explore personal
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
              <Link
                href="/generate"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow hover:brightness-110 transition"
              >
                Start free
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
            </div>
          </div>

          {/* Professionals */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs text-sky-300">
              <Briefcase className="h-4 w-4" aria-hidden />
              For Businesses — API & Dashboard
            </span>
            <h3 className="mt-3 text-xl font-semibold text-white">
              Integrate .MEVE into your workflow
            </h3>
            <ul className="mt-3 space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-sky-300" aria-hidden />
                API & SDKs for automated certification
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-sky-300" aria-hidden />
                Verification at scale & webhooks
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-sky-300" aria-hidden />
                Email/domain checks for a trust badge
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-sky-300" aria-hidden />
                SLA, support & roadmap alignment
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              <Link
                href="/pro"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10 transition"
              >
                Learn more
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-600 transition"
              >
                Contact sales
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              Note: “Official” tier is not part of the current offering.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
          }
