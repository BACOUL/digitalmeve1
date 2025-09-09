// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-25"
             style={{ background: "radial-gradient(closest-side, #20C997, transparent)" }} />
        <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-25"
             style={{ background: "radial-gradient(closest-side, #0EA5E9, transparent)" }} />
      </div>

      <section className="mx-auto max-w-6xl px-6 sm:px-8 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Copy */}
          <div className="lg:col-span-7">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-dm-emerald to-dm-sky">.MEVE</span> Standard
            </h1>

            <p className="mt-6 text-lg md:text-xl leading-7 text-white/85">
              A portable proof of <strong>existence</strong>, <strong>integrity</strong> (SHA-256), and <strong>authenticity</strong> — in seconds.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/generate"
                className="inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold text-slate-900
                           bg-gradient-to-r from-dm-emerald to-dm-sky shadow-glow hover:brightness-110 transition"
                aria-label="Generate a proof"
              >
                Generate a proof
              </Link>

              <Link
                href="/verify"
                className="inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold
                           border border-white/12 text-white bg-white/5 hover:bg-white/10 transition"
                aria-label="Verify a proof"
              >
                Verify a proof
              </Link>
            </div>

            <ul className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/70">
              <li className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                No file storage
              </li>
              <li className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                25 MB limit
              </li>
              <li className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Privacy-first
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-white/60">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Open source
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                Tests & CI
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                MIT License
              </span>
            </div>
          </div>

          {/* Visual placeholder (we met real graphic later) */}
          <div className="lg:col-span-5">
            <div className="aspect-[4/3] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white/50">
              Coming soon: live demo preview
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
