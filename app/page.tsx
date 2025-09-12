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

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* HERO */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          {/* Title (updated slogan) */}
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl text-gray-900">
            Invisible proof.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-500">
              Visible trust.
            </span>
          </h1>

          {/* Subtitle (simple, grand public) */}
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            DigitalMeve protects your documents by adding a built-in, unique proof
            (date, time, and a file fingerprint). No storage. Your file stays
            fully readable and easy to verify anywhere.
          </p>

          {/* Limits + sample */}
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span>Max 10&nbsp;MB · 5 files/day (free)</span>
            <span className="hidden sm:inline">•</span>
            <a
              href="/sample.pdf"
              className="inline-flex items-center gap-2 underline decoration-emerald-400 hover:text-gray-700"
            >
              Try with sample file
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/generate"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium text-white bg-emerald-500 hover:bg-emerald-600 transition"
            >
              Get started
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
            <Link
              href="/pro"
              className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium text-sky-600 ring-1 ring-sky-200 hover:bg-sky-50 transition"
            >
              <Briefcase className="h-5 w-5" aria-hidden />
              For professionals
            </Link>
          </div>

          {/* Quick links */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="inline-flex items-center gap-2">
              <BadgeCheck className="h-5 w-5 text-emerald-500" aria-hidden />
              Built-in for PDF & PNG
            </span>
            <span className="hidden sm:inline">•</span>
            <Link
              href="/verify"
              className="inline-flex items-center gap-2 underline decoration-sky-400 hover:text-gray-700"
            >
              <ShieldCheck className="h-5 w-5 text-sky-500" aria-hidden />
              Verify a document
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link
              href="/pricing#individuals"
              className="inline-flex items-center gap-2 underline decoration-emerald-400 hover:text-gray-700"
            >
              <Users className="h-5 w-5 text-emerald-500" aria-hidden />
              For individuals
            </Link>
          </div>
        </div>
      </section>

      {/* 3 SIMPLE STEPS */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-semibold text-gray-900">How it works</h2>
        <p className="mt-2 text-gray-600">Three simple steps. No jargon.</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Step 1</span>
              <Upload className="h-5 w-5 text-emerald-500" aria-hidden />
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              Upload your document
            </h3>
            <p className="mt-2 text-gray-600">Works with PDFs, images, and more.</p>
            <Link
              href="/generate"
              className="mt-4 inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700"
            >
              Try now <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Step 2</span>
              <BadgeCheck className="h-5 w-5 text-emerald-500" aria-hidden />
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              Get your certified copy
            </h3>
            <p className="mt-2 text-gray-600">
              We compute a SHA-256 fingerprint and embed a .MEVE marker — file stays
              clean and readable.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Step 3</span>
              <FileDown className="h-5 w-5 text-emerald-500" aria-hidden />
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              Download & share
            </h3>
            <p className="mt-2 text-gray-600">
              Share the certified document anytime — anyone can verify it.
            </p>
            <Link
              href="/verify"
              className="mt-4 inline-flex items-center gap-2 text-sm text-sky-600 hover:text-sky-700"
            >
              Verify a document <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* CLEAR SPLIT: INDIVIDUALS vs PROFESSIONALS */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Individuals */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs text-emerald-700">
              <Users className="h-4 w-4" aria-hidden />
              Individuals — Free forever
            </span>
            <h3 className="mt-3 text-xl font-semibold text-gray-900">
              Protect your documents in seconds
            </h3>
            <ul className="mt-3 space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" aria-hidden />
                Unlimited personal use
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" aria-hidden />
                Readable files with built-in proof (PDF/PNG)
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" aria-hidden />
                Optional human-readable certificate
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-500" aria-hidden />
                No accounts. No storage. Instant.
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              <Link
                href="/pricing#individuals"
                className="inline-flex items-center gap-2 rounded-xl ring-1 ring-gray-200 px-4 py-2 text-sm hover:bg-gray-50 transition"
              >
                Explore personal
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
              <Link
                href="/generate"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 text-white px-4 py-2 text-sm font-medium hover:bg-emerald-600 transition"
              >
                Start free
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
            </div>
          </div>

          {/* Professionals */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs text-sky-700">
              <Briefcase className="h-4 w-4" aria-hidden />
              Professionals — API & Dashboard
            </span>
            <h3 className="mt-3 text-xl font-semibold text-gray-900">
              Integrate .MEVE into your workflow
            </h3>
            <ul className="mt-3 space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-sky-500" aria-hidden />
                API & SDKs for automated certification
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-sky-500" aria-hidden />
                Verification at scale
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-sky-500" aria-hidden />
                Email/domain checks for Pro badge
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-sky-500" aria-hidden />
                SLA, support, and roadmap alignment
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              <Link
                href="/pro"
                className="inline-flex items-center gap-2 rounded-xl ring-1 ring-gray-200 px-4 py-2 text-sm hover:bg-gray-50 transition"
              >
                Learn more
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-sky-600 text-white px-4 py-2 text-sm font-medium hover:bg-sky-700 transition"
              >
                Contact us
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
            </div>
            <p className="mt-3 text-xs text-gray-500">
              Note: “Official” tier is not part of the current offering.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
