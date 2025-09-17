// components/PreFooterCTA.tsx
"use client";

import Link from "next/link";

export default function PreFooterCTA() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:py-28">
      {/* Fond animé doux */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(900px 500px at 50% 100%, rgba(16,185,129,.08), transparent 70%), radial-gradient(700px 400px at 20% 20%, rgba(56,189,248,.08), transparent 70%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Start protecting your files today
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-400">
          Invisible proof. Visible trust. Free for individuals.  
          Powerful for teams and professionals.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/generate"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_40px_rgba(56,189,248,.22)] hover:brightness-110"
            aria-label="Get started for free — add a .MEVE certificate"
          >
            Get started for free
          </Link>
          <Link
            href="/verify"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"
            aria-label="Verify a document"
          >
            Verify a document
          </Link>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          No account • No storage • Works with all file types
        </p>
      </div>
    </section>
  );
}
