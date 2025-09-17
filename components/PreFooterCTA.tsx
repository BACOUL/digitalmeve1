"use client";

import Link from "next/link";

export default function PreFooterCTA() {
  return (
    <section aria-label="Get started" className="mx-auto max-w-6xl px-4 pb-20">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 p-6 sm:p-8">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 opacity-[0.9] bg-[var(--surface-strong)]" />
          <div className="absolute inset-0" style={{ background: "var(--grad-brand)", opacity: 0.15 }} />
        </div>

        <div className="relative">
          <h3 className="text-xl sm:text-2xl font-semibold">Ready to add trust to every file?</h3>
          <p className="mt-2 text-[var(--fg-muted)]">Start free, upgrade anytime.</p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/generate" className="btn btn-primary">Get started free</Link>
            <Link href="/verify" className="btn btn-outline">Verify a document</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
