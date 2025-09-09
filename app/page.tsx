// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-[70vh] px-6 sm:px-8 md:px-12 py-14 md:py-20">
      <div className="max-w-3xl">
        {/* Build badge to confirm the deployed version */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
          <span>Build</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block" />
          <span className="font-medium">{new Date().toISOString()}</span>
        </div>

        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
          Verify any document <span className="opacity-80">— worldwide.</span>
        </h1>

        <p className="mt-6 text-lg leading-7 text-white/80">
          A simple, portable proof that certifies <strong>existence</strong>,{" "}
          <strong>integrity</strong> (SHA-256), and <strong>authenticity</strong>{" "}
          of any file. <span className="text-emerald-300">Live build check ✅</span>
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/generate"
            className="inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold text-slate-900
                       bg-gradient-to-r from-dm-emerald to-dm-sky shadow-glow
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
    </main>
  );
}
