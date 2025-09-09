// components/ValueProps.tsx
'use client';

import Link from 'next/link';

function IconShield() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3l7 3v6c0 4.418-3.582 8-7 8s-7-3.582-7-8V6l7-3z" fill="currentColor" />
      <path d="M9 12l2 2 4-4" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconHash() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 3L7 21M17 3l-2 18M4 9h16M3 15h18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v5l3 2" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function ValueProps() {
  const items = [
    {
      title: 'Existence',
      desc: 'UTC ISO-8601 timestamp proves your document existed at a specific moment.',
      Icon: IconClock,
    },
    {
      title: 'Integrity',
      desc: 'SHA-256 cryptographic hash guarantees tamper-evidence across the lifecycle.',
      Icon: IconHash,
    },
    {
      title: 'Authenticity',
      desc: 'Issuer levels — Personal, Pro, Official — computed by the verifier, not self-declared.',
      Icon: IconShield,
    },
  ];

  return (
    <section
      aria-labelledby="value-proposition"
      className="mx-auto max-w-7xl px-4 py-14 md:py-20"
    >
      <h2 id="value-proposition" className="text-2xl md:text-3xl font-semibold tracking-tight">
        Why the .MEVE standard?
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map(({ title, desc, Icon }) => (
          <div
            key={title}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md p-6 shadow-lg"
          >
            {/* top gradient accent */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-dm-emerald via-dm-accent to-dm-sky" />

            <div className="flex items-start gap-4">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-200">
                <Icon />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <p className="mt-1 text-sm text-slate-300">{desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* secondary CTA row */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/docs" className="rounded-2xl border border-white/10 px-5 py-3 text-slate-200 hover:bg-white/5 transition text-center">
          Read the docs
        </Link>
        <Link href="/pricing" className="btn-primary text-center">
          Get started free
        </Link>
      </div>
    </section>
  );
}
