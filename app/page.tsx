// app/page.tsx
import Link from "next/link";
import ValueProps from "@/components/ValueProps";
import HowItWorks from "@/components/HowItWorks";

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24">
        <p className="text-xs uppercase tracking-widest text-slate-400">
          The .MEVE Standard
        </p>
        <h1 className="mt-3 text-4xl md:text-6xl font-semibold tracking-tight">
          Verify any document <span className="whitespace-nowrap">in seconds.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg md:text-xl text-slate-300">
          A simple, portable proof that certifies{" "}
          <strong>existence</strong>, <strong>integrity</strong> (SHA-256), and{" "}
          <strong>authenticity</strong> of any file.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link href="/generate" className="btn-primary">
            Generate a proof
          </Link>
          <Link
            href="/verify"
            className="rounded-2xl border border-white/10 px-5 py-3 text-slate-200 hover:bg-white/5 transition text-center"
          >
            Verify a proof
          </Link>
        </div>
        <p className="mt-4 text-sm text-slate-400">
          Open standard • No file storage • Privacy-first
        </p>
      </section>

      {/* VALUE PROPOSITION */}
      <ValueProps />

      {/* HOW IT WORKS */}
      <HowItWorks />
      <div className="mt-8 rounded-2xl p-6 bg-gradient-to-r from-dm-emerald to-dm-sky text-slate-900 font-semibold text-center">
  Tailwind OK — custom colors loaded (.dm-emerald → .dm-sky)
</div>
    </>
  );
}
