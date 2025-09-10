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
          {/* BADGE MODIFIÉ */}
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
            <Users className="h-5 w-5" aria-hidden />
            Free · Simple · Instant
          </span>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            DigitalMeve —{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">
              The reference for your documents’ authenticity
            </span>
          </h1>

          {/* SOUS-TITRE MODIFIÉ */}
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            A simple, universal and free digital proof for your documents.
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
            <a
              href="/verify"
              className="inline-flex items-center gap-2 underline decoration-sky-400/60 hover:text-slate-200"
            >
              <ShieldCheck className="h-5 w-5" aria-hidden />
              Verify a proof
            </a>
            <span className="hidden sm:inline">•</span>
            <a
              href="/personal"
              className="inline-flex items-center gap-2 underline decoration-sky-400/60 hover:text-slate-200"
            >
              <Users className="h-5 w-5" aria-hidden />
              For Individuals
            </a>
          </div>
        </div>
      </section>

      {/* RESTE INCHANGÉ */}
    </main>
  );
}
