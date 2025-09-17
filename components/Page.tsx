// app/page.tsx
import Link from "next/link";
import Script from "next/script";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Briefcase,
  ShieldCheck,
  Lock,
  FileCheck2,
  ServerOff,
  Globe2,
} from "lucide-react";

import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";

export default function HomePage() {
  // --- FAQ for JSON-LD (SEO) ---
  const faq = [
    {
      q: "Do I need an account?",
      a: "No. You can generate and verify without creating an account.",
    },
    {
      q: "Do you store my files?",
      a: "No. Everything runs locally in your browser. Files never leave your device.",
    },
    {
      q: "What file types are supported?",
      a: "Common formats like PDF, DOCX, PNG/JPG and more. Your files remain readable and portable.",
    },
    {
      q: "Is this an e-signature?",
      a: "No. .MEVE is a lightweight integrity signal embedded in your file, plus a human-readable certificate.",
    },
    {
      q: "Can anyone verify a .MEVE file?",
      a: "Yes. Anyone can verify online or offline in seconds — no account required.",
    },
    {
      q: "Is this legally binding?",
      a: "It’s an integrity proof. See Legal/Terms for guidance per jurisdiction and recommended use cases.",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map(({ q, a }) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a },
    })),
  };

  const individualExamples = [
    {
      title: "Résumé / CV",
      desc:
        "Share a clean, verified résumé recruiters can check in a click — no viewer or plugin needed.",
    },
    {
      title: "Invoices & quotes",
      desc:
        "Send lightweight PDFs with an embedded integrity proof and a certificate you can attach.",
    },
    {
      title: "Diplomas & certificates",
      desc:
        "Keep your academic records readable everywhere while adding a durable, human-readable proof.",
    },
  ];

  const businessExamples = [
    {
      title: "HR onboarding packs",
      desc:
        "Issue protected document bundles for candidates and employees; verify at scale internally.",
    },
    {
      title: "Legal & contracts",
      desc:
        "Timestamped versions and sealed attachments; share externally with confidence and traceability.",
    },
    {
      title: "Media & creative assets",
      desc:
        "Ship visuals and deliverables with an invisible proof + certificate your clients can verify.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* ===== HERO (kept minimal: 2 CTAs) ===== */}
      <Hero />

      {/* ===== HOW IT WORKS (3 steps) ===== */}
      <HowItWorks />

      {/* ===== BENEFITS (concise, no repetition) ===== */}
      <section className="mx-auto max-w-6xl px-4 pb-10">
        <h2 className="text-2xl font-semibold">Why DigitalMeve</h2>
        <p className="mt-2 text-slate-400">
          Simple for everyone — from individuals to enterprises. Built for trust, not lock-in.
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <ShieldCheck className="h-5 w-5 text-emerald-400" />,
              title: "Built-in proof",
              desc:
                "A durable .MEVE integrity signal lives with your file. Your document stays clean.",
            },
            {
              icon: <FileCheck2 className="h-5 w-5 text-emerald-400" />,
              title: "Readable everywhere",
              desc:
                "No special viewer or plugin. Open, copy, and share files as usual — nothing breaks.",
            },
            {
              icon: <Users className="h-5 w-5 text-emerald-400" />,
              title: "Free for individuals",
              desc:
                "Protect personal files at no cost. Pro plans scale automation and collaboration.",
            },
            {
              icon: <ServerOff className="h-5 w-5 text-emerald-400" />,
              title: "No account. No storage.",
              desc:
                "Everything runs in the browser. We never keep your files; checks take seconds.",
            },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2 text-sm text-emerald-400">
                {f.icon}
                <span className="font-medium">{f.title}</span>
              </div>
              <p className="mt-2 text-sm text-slate-300">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-5 py-2.5 font-semibold text-slate-900 shadow-[0_0_30px_rgba(34,211,238,0.35)] hover:brightness-110 transition"
          >
            Protect a file
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/verify"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 font-semibold text-slate-100 hover:bg-white/10 transition"
          >
            Verify a file
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* ===== USE CASES — INDIVIDUALS ===== */}
      <section className="mx-auto max-w-6xl px-4 pb-6">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-semibold">For Individuals</h2>
            <span className="ml-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-300">
              Free
            </span>
          </div>
          <p className="mt-2 text-slate-300">
            Protect everyday documents in seconds. Your files remain identical and portable.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {individualExamples.map((c) => (
              <div key={c.title} className="rounded-2xl border border-white/10 bg-slate-900/50 p-5">
                <h3 className="font-semibold text-slate-100">{c.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-5 py-2.5 font-semibold text-slate-900 shadow-[0_0_30px_rgba(34,211,238,0.35)] hover:brightness-110 transition"
            >
              Protect a file now
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/pricing#individuals"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 font-semibold text-slate-100 hover:bg-white/10 transition"
            >
              Personal use details
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== USE CASES — BUSINESS ===== */}
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-sky-400" />
            <h2 className="text-xl sm:text-2xl font-semibold">For Business</h2>
            <span className="ml-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-2 py-0.5 text-xs text-sky-300">
              API & Dashboard
            </span>
          </div>
          <p className="mt-2 text-slate-300">
            Bring trust to your workflows. Automate certification, verify at scale, show a trust badge.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {businessExamples.map((c) => (
              <div key={c.title} className="rounded-2xl border border-white/10 bg-slate-900/50 p-5">
                <h3 className="font-semibold text-slate-100">{c.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{c.desc}</p>
              </div>
            ))}
          </div>

          <ul className="mt-5 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
            {[
              "API, SDKs & webhooks for automation",
              "Verification at scale (batch & internal tools)",
              "Domain/email checks for a visible trust badge",
              "SLA, support & roadmap alignment",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/pro"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 font-semibold text-slate-100 hover:bg-white/10 transition"
            >
              Discover Pro
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-5 py-2.5 font-semibold text-white hover:bg-sky-600 transition"
            >
              Contact sales
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SECURITY & TRUST (concise, credible) ===== */}
      <section className="mx-auto max-w-6xl px-4 pb-14">
        <h2 className="text-2xl font-semibold">Security & Trust</h2>
        <p className="mt-2 text-slate-400">
          Privacy by design. Transparent by default.
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <Lock className="h-5 w-5 text-emerald-400" />,
              title: "Local processing",
              desc: "Files never leave your device. We only prepare your certificate.",
            },
            {
              icon: <ServerOff className="h-5 w-5 text-emerald-400" />,
              title: "No file storage",
              desc: "We don’t keep, index, or upload your documents. Generate, share, verify.",
            },
            {
              icon: <FileCheck2 className="h-5 w-5 text-emerald-400" />,
              title: "Human-readable certificate",
              desc: "A clear, portable certificate you can attach or archive.",
            },
            {
              icon: <Globe2 className="h-5 w-5 text-emerald-400" />,
              title: "Readable anywhere",
              desc: "Your files remain identical — open them as usual on any device.",
            },
          ].map((b) => (
            <div key={b.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2 text-sm text-emerald-400">
                {b.icon}
                <span className="font-medium">{b.title}</span>
              </div>
              <p className="mt-2 text-sm text-slate-300">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl font-semibold">FAQ</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {faq.map((f) => (
            <div key={f.q} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-semibold text-slate-100">{f.q}</h3>
              <p className="mt-1 text-sm text-slate-300">{f.a}</p>
            </div>
          ))}
        </div>

        {/* JSON-LD for FAQ */}
        <Script id="faq-jsonld" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify(faqJsonLd)}
        </Script>
      </section>

      {/* ===== PRE-FOOTER CTA (single touchpoint) ===== */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Ready to add trust to every file?</h2>
            <p className="mt-1 text-slate-300">Start free. Upgrade anytime.</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-5 py-2.5 font-semibold text-slate-900 shadow-[0_0_30px_rgba(34,211,238,0.35)] hover:brightness-110 transition"
            >
              Protect a file
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/verify"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 font-semibold text-slate-100 hover:bg-white/10 transition"
            >
              Verify a document
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
