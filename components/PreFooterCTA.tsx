// components/PreFooterCTA.tsx
import Link from "next/link";

export default function PreFooterCTA() {
  return (
    <section aria-label="Get started" className="mx-auto max-w-6xl px-4 pb-16">
      <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-emerald-400/10 to-sky-400/10 p-6 sm:p-8">
        <div className="grid items-center gap-4 sm:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold">Ready to add trust to every file?</h3>
            <p className="mt-1 text-slate-300">Start free, upgrade anytime.</p>
          </div>
          <div className="flex flex-wrap justify-start gap-3 sm:justify-end">
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-5 py-2.5 font-semibold text-slate-900 hover:brightness-110"
            >
              Protect a file now
            </Link>
            <Link
              href="/verify"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 font-semibold text-slate-100 hover:bg-white/10"
            >
              Verify a file
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
