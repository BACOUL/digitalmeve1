// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative">
      {/* Fond : gradient radial + grille subtile */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% -10%, rgba(34,211,238,0.15), rgba(2,6,23,0) 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(900px 600px at 50% 0%, black, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(900px 600px at 50% 0%, black, transparent 70%)",
        }}
      />

      {/* HERO */}
      <section className="px-6 sm:px-8 md:px-12 pt-24 pb-20">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge build (discret) */}
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" />
            <span>Open, private & verifiable</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            The <span className="text-emerald-300">.MEVE</span> Standard
          </h1>

          <p className="mt-5 text-lg sm:text-xl leading-7 text-white/80">
            A simple, portable proof that certifies{" "}
            <strong className="text-white">existence</strong>,{" "}
            <strong className="text-white">integrity</strong> (SHA-256), and{" "}
            <strong className="text-white">authenticity</strong> of any file —
            in seconds.
          </p>

          {/* CTA */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/generate"
              className="inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold text-slate-900
                         bg-gradient-to-r from-emerald-400 to-sky-400 shadow-[0_0_40px_rgba(34,211,238,0.35)]
                         hover:brightness-110 transition"
            >
              Generate a proof
            </Link>
            <Link
              href="/verify"
              className="inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold
                         border border-white/10 text-white bg-white/5 hover:bg-white/10 transition"
            >
              Verify a proof
            </Link>
          </div>

          {/* accroches */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-white/70">
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              Open standard
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              No file storage
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              Privacy-first
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              API & CLI
            </div>
          </div>

          {/* liens secondaires */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/docs"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white/90 hover:bg-white/10 transition"
            >
              Docs
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white/90 hover:bg-white/10 transition"
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white/90 hover:bg-white/10 transition"
            >
              Contact
            </Link>
            <Link
              href="/demo"
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white/90 hover:bg-white/10 transition"
            >
              Live demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
