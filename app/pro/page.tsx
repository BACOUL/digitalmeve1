import { Briefcase, ServerCog, CheckCircle2, Mail, ArrowRight, ShieldCheck, Boxes } from "lucide-react";

export default function ProPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full blur-3xl opacity-30 bg-sky-400/30" />
          <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full blur-3xl opacity-30 bg-emerald-400/30" />
        </div>

        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs text-sky-300">
            <Briefcase className="h-3.5 w-3.5" aria-hidden />
            For Professionals & Institutions
          </span>
          <h1 className="mt-3 text-3xl font-semibold sm:text-5xl">Integrate .MEVE into your workflow</h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Automate certification and verification at scale. Keep your files readable and verifiable across systems.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <h3 className="text-lg font-medium">What you’ll get</h3>
              <ul className="mt-3 space-y-2 text-slate-400">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-sky-300" aria-hidden /> REST API & SDKs
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-sky-300" aria-hidden /> Email/Domain verification for Pro badge
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-sky-300" aria-hidden /> Dashboard & usage analytics
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-sky-300" aria-hidden /> SLA & support options
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
              <h3 className="text-lg font-medium">Use cases</h3>
              <ul className="mt-3 space-y-2 text-slate-400">
                <li className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 text-sky-300" aria-hidden /> Contracts & HR documents
                </li>
                <li className="flex items-start gap-2">
                  <ServerCog className="mt-0.5 h-4 w-4 text-sky-300" aria-hidden /> Archival & audit trails
                </li>
                <li className="flex items-start gap-2">
                  <Boxes className="mt-0.5 h-4 w-4 text-sky-300" aria-hidden /> Media & creative assets
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-slate-900 px-6 py-3 text-sm font-medium hover:opacity-90 transition"
            >
              Contact us <Mail className="h-4 w-4" aria-hidden />
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm hover:bg-white/10 transition"
            >
              Back to Home <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>

          <p className="mt-6 text-xs text-slate-500">Note: “Official” tier is not part of the current offering.</p>
        </div>
      </section>
    </main>
  );
}
