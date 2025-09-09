// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      {/* Eyebrow */}
      <p className="text-sm uppercase tracking-widest text-slate-500">The .MEVE Standard</p>

      {/* Headline */}
      <h1 className="mt-3 text-4xl md:text-6xl font-extrabold leading-tight text-slate-900">
        Verify any document <span className="whitespace-nowrap">in seconds.</span>
      </h1>

      {/* Subheadline */}
      <p className="mt-5 max-w-2xl text-lg md:text-xl text-slate-600">
        A simple, portable proof that certifies <strong>existence</strong>, <strong>integrity</strong> (SHA-256),
        and <strong>authenticity</strong> of any file. Free for individuals. API for professionals.
      </p>

      {/* CTAs */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <Link
          href="/generate"
          className="inline-flex items-center justify-center px-6 py-3 rounded-2xl font-semibold text-slate-900
                     bg-gradient-to-r from-emerald-400 to-sky-400 shadow-[0_0_30px_rgba(34,211,238,0.35)]
                     hover:brightness-110 transition"
        >
          Generate a proof
        </Link>
        <Link
          href="/verify"
          className="inline-flex items-center justify-center px-6 py-3 rounded-2xl border border-slate-300 text-slate-800 hover:bg-slate-50 transition"
        >
          Verify a proof
        </Link>
      </div>

      {/* Trust line */}
      <p className="mt-4 text-sm text-slate-500">
        Open standard • No file storage • Privacy-first
      </p>

      {/* Pillars */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-slate-200 p-6 bg-white/80 backdrop-blur">
          <h3 className="text-lg font-semibold text-slate-900">SHA-256 Integrity</h3>
          <p className="mt-2 text-slate-600">
            A 256-bit cryptographic fingerprint ensures tamper-evidence across the lifecycle.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 p-6 bg-white/80 backdrop-blur">
          <h3 className="text-lg font-semibold text-slate-900">UTC Timestamp</h3>
          <p className="mt-2 text-slate-600">
            ISO-8601 timestamp proves the document existed at a specific moment in time.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 p-6 bg-white/80 backdrop-blur">
          <h3 className="text-lg font-semibold text-slate-900">Issuer Levels</h3>
          <p className="mt-2 text-slate-600">
            Personal, Pro (email-verified), and Official (DNS-verified) — computed by the verifier.
          </p>
        </div>
      </div>
    </section>
  );
        }
