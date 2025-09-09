// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main
      className="
        relative overflow-hidden
        bg-[#0B1220] text-white
        "
    >
      {/* Fond “world-class” : gradient subtil + grille */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {/* dégradé radial doux */}
        <div className="absolute -top-1/3 left-1/2 -translate-x-1/2 h-[80vh] w-[80vw] rounded-full blur-3xl opacity-30"
             style={{
               background:
                 "radial-gradient(50% 50% at 50% 50%, rgba(32,201,151,0.40) 0%, rgba(14,165,233,0.18) 45%, rgba(255,255,255,0) 70%)",
             }}
        />
        {/* grille discrète */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.12) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Contenu */}
      <section className="relative mx-auto max-w-6xl px-6 sm:px-8 md:px-12 py-20 md:py-28">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
          <span>Open, private & verifiable</span>
        </div>

        {/* Titre */}
        <h1 className="mt-6 max-w-3xl text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          The <span className="bg-gradient-to-r from-emerald-300 to-sky-300 bg-clip-text text-transparent">.MEVE</span> Standard
        </h1>

        {/* Sous-titre */}
        <p className="mt-6 max-w-2xl text-lg leading-7 text-white/80">
          A simple, portable proof that certifies <strong>existence</strong>,
          <strong> integrity</strong> (SHA-256), and <strong>authenticity</strong> of any file — in seconds.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/generate"
            className="
              inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold text-slate-900
              bg-gradient-to-r from-emerald-400 to-sky-400 shadow-[0_0_40px_rgba(34,211,238,.25)]
              transition will-change-transform hover:brightness-110 hover:scale-[1.02] active:scale-[0.99]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300
            "
          >
            Generate a proof
          </Link>

          <Link
            href="/verify"
            className="
              inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold
              border border-white/10 text-white bg-white/5 hover:bg-white/10
              transition will-change-transform hover:scale-[1.01] active:scale-[0.99]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300
            "
          >
            Verify a proof
          </Link>
        </div>

        {/* Lignes de confiance */}
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60">
          <span>Open standard</span>
          <span className="opacity-40">•</span>
          <span>No file storage</span>
          <span className="opacity-40">•</span>
          <span>Privacy-first</span>
          <span className="opacity-40">•</span>
          <span>API & CLI</span>
        </div>

        {/* Liens rapides */}
        <nav className="mt-10 flex flex-wrap gap-3 text-sm">
          <Link
            href="/docs"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white/80 hover:bg-white/10"
          >
            Docs
          </Link>
          <Link
            href="/pricing"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white/80 hover:bg-white/10"
          >
            Pricing
          </Link>
          <Link
            href="/contact"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white/80 hover:bg-white/10"
          >
            Contact
          </Link>
          <Link
            href="/demo"
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white/80 hover:bg-white/10"
          >
            Live demo
          </Link>
        </nav>
      </section>
    </main>
  );
}
