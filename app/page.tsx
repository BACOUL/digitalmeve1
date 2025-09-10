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

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full blur-3xl opacity-30 bg-emerald-400/30" />
          <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full blur-3xl opacity-30 bg-sky-400/30" />
        </div>

        <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-emerald-300">
            <Users className="h-5 w-5" aria-hidden />
            Private by design <span className="text-slate-400">·</span> No signup
          </span>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            DigitalMeve —{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
              The reference for your documents’ authenticity
            </span>
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            DigitalMeve delivers a simple, universal digital proof — free for everyone.
            <br className="hidden sm:block" />
            <span className="text-slate-400">
              We never store your documents — they’re used to create the proof, then discarded.
            </span>
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/generate"
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-medium text-slate-900 bg-gradient-to-r from-emerald-400 to-sky-400 shadow-[0_0_40px_rgba(34,211,238,0.35)] hover:brightness-110 transition"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5" aria-hidden />
            </a>
            <a
              href="/pro"
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-medium border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              <Briefcase className="h-5 w-5" aria-hidden />
              For Professionals
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span className="inline-flex items-center gap-2">
              <BadgeCheck className="h-5 w-5 text-emerald-300" aria-hidden /> Embedded for PDF & PNG
            </span>
            <span className="hidden sm:inline">•</span>
            <a href="/verify" className="inline-flex items-center gap-2 underline decoration-sky-400/60 hover:text-slate-200">
              <ShieldCheck className="h-5 w-5" aria-hidden />
              Verify a proof
            </a>
            <span className="hidden sm:inline">•</span>
            <a href="/personal" className="inline-flex items-center gap-2 underline decoration-sky-400/60 hover:text-slate-200">
              <Users className="h-5 w-5" aria-hidden />
              For Individuals
            </a>
          </div>
        </div>
      </section>

      {/* 3 SIMPLE STEPS */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <p className="mt-2 text-slate-400">Three simple steps. No jargon.</p>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>Step 1</span>
              <Upload className="h-6 w-6" aria-hidden />
            </div>
            <h3 className="mt-2 text-lg font-medium">Upload your document</h3>
            <p className="mt-2 text-slate-400">Drop any document — PDF, image, or more.</p>
            <a href="/generate" className="mt-4 inline-flex items-center gap-2 text-sm underline decoration-emerald-400/60 hover:text-slate-200">
              Try now <ArrowRight className="h-5 w-5" aria-hidden />
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>Step 2</span>
              <BadgeCheck className="h-6 w-6" aria-hidden />
            </div>
            <h3 className="mt-2 text-lg font-medium">Get your certified copy</h3>
            <p className="mt-2 text-slate-400">
              We add an invisible proof to your document. It stays fully readable and uniquely yours.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>Step 3</span>
              <FileDown className="h-6 w-6" aria-hidden />
            </div>
            <h3 className="mt-2 text-lg font-medium">Download & share</h3>
            <p className="mt-2 text-slate-400">
              Keep a portable certificate (<code className="text-slate-300">.meve.json</code>) or share the verified document anytime.
            </p>
            <a href="/verify" className="mt-4 inline-flex items-center gap-2 text-sm underline decoration-sky-400/60 hover:text-slate-200">
              Verify a document <ArrowRight className="h-5 w-5" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {/* CLEAR SPLIT: INDIVIDUALS vs PROFESSIONALS */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Individuals */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
              <Users className="h-5 w-5" aria-hidden />
              Individuals — Free forever
            </span>
            <h3 className="mt-3 text-xl font-semibold">Protect your documents in seconds</h3>
            <ul className="mt-3 space-y-2 text-slate-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" aria-hidden /> Unlimited personal use
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" aria-hidden /> Readable documents with built-in proof (PDF/PNG)
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" aria-hidden /> Optional portable certificate (.meve.json)
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" aria-hidden /> No accounts. No storage. Instant.
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a
                href="/personal"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/10 transition"
              >
                Explore personal <ArrowRight className="h-5 w-5" aria-hidden />
              </a>
              <a
                href="/generate"
                className="inline-flex items-center gap-2 rounded-xl bg-white text-slate-900 px-4 py-2 text-sm font-medium hover:opacity-90 transition"
              >
                Start free <ArrowRight className="h-5 w-5" aria-hidden />
              </a>
            </div>
          </div>

          {/* Professionals */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs text-sky-300">
              <Briefcase className="h-5 w-5" aria-hidden />
              Professionals — API & Dashboard
            </span>
            <h3 className="mt-3 text-xl font-semibold">Integrate .MEVE into your workflow</h3>
            <ul className="mt-3 space-y-2 text-slate-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-sky-300" aria-hidden /> API & SDKs for automated certification
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-sky-300" aria-hidden /> Verification at scale
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-sky-300" aria-hidden /> Email/domain verification for <span className="text-slate-300">Pro</span> badge
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-sky-300" aria-hidden /> SLA, support & roadmap alignment
              </li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a
                href="/pro"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm hover:bg-white/10 transition"
              >
                Learn more <ArrowRight className="h-5 w-5" aria-hidden />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-white text-slate-900 px-4 py-2 text-sm font-medium hover:opacity-90 transition"
              >
                Contact us <ArrowRight className="h-5 w-5" aria-hidden />
              </a>
            </div>
            <p className="mt-3 text-xs text-slate-500">Note: “Official” tier is not part of the current offering.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
