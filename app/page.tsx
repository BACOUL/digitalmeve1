import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section className="px-6 sm:px-8 md:px-12 pb-16 md:pb-24">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            The <span className="text-emerald-300">.MEVE</span> Standard
          </h1>

          <p className="mt-4 text-xl leading-8 text-white/85">
            Verify any document in <span className="font-semibold text-white">seconds</span> — worldwide.
          </p>

          <p className="mt-4 text-base leading-7 text-white/70 max-w-prose">
            A simple, portable proof that certifies <strong>existence</strong>,{" "}
            <strong>integrity</strong> (SHA-256), and <strong>authenticity</strong> of any file.
          </p>

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

      {/* How it works – compact */}
      <section className="px-6 sm:px-8 md:px-12 pb-24">
        <div className="mx-auto max-w-5xl grid gap-4 sm:grid-cols-3">
          {[
            { n: "1", t: "Upload", d: "Drop a file or take a photo." },
            { n: "2", t: "Proof", d: "Cryptographic proof (SHA-256 + time)." },
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
