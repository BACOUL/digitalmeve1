import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      {/* --- Décor discret (glow) --- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-32 -left-40 h-[36rem] w-[36rem] rounded-full opacity-20 blur-3xl"
             style={{ background: "radial-gradient(closest-side, #22D3EE, transparent 70%)" }} />
        <div className="absolute -bottom-40 -right-40 h-[36rem] w-[36rem] rounded-full opacity-10 blur-3xl"
             style={{ background: "radial-gradient(closest-side, #20C997, transparent 70%)" }} />
      </div>

      {/* On laisse de l’espace sous le Header */}
      <section className="px-6 sm:px-8 md:px-12 pt-28 md:pt-36 pb-16 md:pb-24">
        <div className="mx-auto max-w-3xl">
          {/* Build badge pour vérifier le déploiement */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            <span>Build</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
            <time className="font-medium">{new Date().toISOString()}</time>
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            The <span className="text-emerald-300">.MEVE</span> Standard
          </h1>

          <p className="mt-4 text-xl leading-8 text-white/80">
            Verify any document in <span className="font-semibold text-white">seconds</span> — worldwide.
          </p>

          <p className="mt-4 text-base leading-7 text-white/70 max-w-prose">
            A simple, portable proof that certifies <strong>existence</strong>,{" "}
            <strong>integrity</strong> (SHA-256), and <strong>authenticity</strong> of any file.
          </p>

          {/* CTAs principaux */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
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

          <p className="mt-6 text-sm text-white/60">
            Open standard · No file storage · Privacy-first
          </p>
        </div>
      </section>

      {/* Bandeau “How it works” très simple (optionnel, compact) */}
      <section className="px-6 sm:px-8 md:px-12 pb-24">
        <div className="mx-auto max-w-4xl grid gap-4 sm:grid-cols-3">
          {[
            { n: "1", t: "Upload", d: "Drop a file or take a photo." },
            { n: "2", t: "Proof", d: "We embed a cryptographic proof (SHA-256 + time)." },
            { n: "3", t: "Verify", d: "Anyone can verify in seconds." },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl bg-white/5 border border-white/10 p-5">
              <div className="text-xs text-white/60">Step {s.n}</div>
              <div className="mt-1 font-semibold text-white">{s.t}</div>
              <div className="mt-2 text-sm text-white/70">{s.d}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
