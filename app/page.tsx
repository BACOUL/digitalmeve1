import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-dm-bg text-dm-text">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-14 md:pt-24 md:pb-20">
          <p className="uppercase tracking-[0.2em] text-xs text-slate-300/70">
            THE .MEVE STANDARD
          </p>

          <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight text-white">
            Verify any document
            <br className="hidden md:block" /> in seconds.
          </h1>

          <p className="mt-5 max-w-2xl text-lg md:text-xl text-slate-200/90">
            A simple, portable proof that certifies{" "}
            <span className="font-semibold text-white">existence</span>,{" "}
            <span className="font-semibold text-white">integrity</span> (SHA-256),
            and <span className="font-semibold text-white">authenticity</span> of any file.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/generate"
              className="inline-flex items-center justify-center rounded-2xl px-6 py-4 font-semibold text-slate-900
                         bg-gradient-to-r from-dm-emerald to-dm-sky shadow-glow hover:brightness-110 transition"
            >
              Generate a proof
            </Link>
            <Link
              href="/verify"
              className="inline-flex items-center justify-center rounded-2xl px-6 py-4 font-semibold
                         border border-white/15 bg-white/5 hover:bg-white/10 transition"
            >
              Verify a proof
            </Link>
          </div>

          <p className="mt-4 text-sm text-slate-300/80">
            Open standard • No file storage • Privacy-first
          </p>
        </div>
      </section>

      {/* VALUE PROPOSITION */}
      <section className="py-16 md:py-20 bg-dm-surface">
        <div className="max-w-6xl mx-auto px-6 grid gap-6 md:gap-8 md:grid-cols-3">
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 text-center">
            <h3 className="text-xl font-semibold mb-2 text-dm-emerald">Existence</h3>
            <p>Timestamped proof that your file existed at a specific moment.</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 text-center">
            <h3 className="text-xl font-semibold mb-2 text-dm-sky">Integrity</h3>
            <p>A SHA-256 cryptographic fingerprint ensures file integrity.</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 text-center">
            <h3 className="text-xl font-semibold mb-2 text-dm-accent">Authenticity</h3>
            <p>Certified issuers validate authenticity: Personal, Pro, or Official.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
