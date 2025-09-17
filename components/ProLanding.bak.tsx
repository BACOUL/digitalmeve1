import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";

export default function ProLanding() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
      <header className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-100 sm:text-5xl">
          DigitalMeve <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent">Pro</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
          For professionals, teams, and institutions who need API access, higher limits,
          and support you can rely on.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-4 py-1.5 text-sm text-slate-400 backdrop-blur">
          Coming soon — join the waitlist or contact us.
        </div>
      </header>

      {/* Value bullets */}
      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {[
          { title: "API & Keys", desc: "Integrate .MEVE into your product with secure API keys and server-side proxy." },
          { title: "Higher Limits", desc: "Increased file size and rate-limits for production workloads." },
          { title: "Reliability", desc: "Monitored health, SLAs, and priority support for business-critical use." },
        ].map((b) => (
          <div key={b.title} className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur hover:border-emerald-400/50 transition">
            <h3 className="text-lg font-semibold text-slate-100">{b.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* Pro vs Official */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
          <h3 className="text-xl font-semibold text-slate-100">Pro</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>• Everything in Personal</li>
            <li>• API access & keys</li>
            <li>• Higher limits (e.g. 50 MB+)</li>
            <li>• Priority support (SLA)</li>
            <li>• Dashboard (coming soon)</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
          <h3 className="text-xl font-semibold text-slate-100">Official (Institutions)</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>• Everything in Pro</li>
            <li>• Institution-grade validation</li>
            <li>• Custom policies & limits</li>
            <li>• Audit & compliance options</li>
            <li>• Dedicated support</li>
          </ul>
        </div>
      </div>

      {/* CTA row */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
        {/* Quand tu auras une waitlist, remplace /contact par /waitlist */}
        <Link href="/contact" className="inline-flex">
          <CTAButton aria-label="Contact sales">Contact sales</CTAButton>
        </Link>
        <a
          href="mailto:hello@digitalmeve.com?subject=DigitalMeve%20Pro%20—%20Request%20info"
          className="rounded-2xl border border-white/15 bg-slate-900/70 px-5 py-2.5 text-slate-100 backdrop-blur-md transition hover:border-emerald-400/60"
        >
          Email us
        </a>
      </div>

      {/* Note privacy */}
      <p className="mt-10 text-center text-sm text-slate-400">
        DigitalMeve does not store your documents. Files are processed in memory only.
      </p>
    </section>
  );
}
