// app/professionals/page.tsx — Professionals (enterprise-grade, 9.6+ polish, a11y & overflow-safe)
"use client";

import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Lock,
  Globe,
  KeyRound,
  Fingerprint,
  FileCheck2,
  Building2,
  CheckCircle2,
  ServerOff,
} from "lucide-react";

export default function ProfessionalsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* HERO */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Trust at scale for{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-sky-400">
              teams & businesses
            </span>
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-300/90">
            Issue enterprise-grade certificates with a <strong>private key</strong>, bind them to your{" "}
            <strong>DNS domain</strong>, and verify anywhere in seconds. All processing runs in the browser —{" "}
            <strong>no storage</strong>, no vendor lock-in.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/pricing#professional" className="btn btn-primary inline-flex items-center gap-2">
              View pricing <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/generate" className="btn btn-outline inline-flex items-center gap-2">
              Try with a file
            </Link>
            <Link href="/verify" className="btn btn-outline inline-flex items-center gap-2">
              Verify a document
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              <KeyRound className="h-4 w-4 text-emerald-300" />
              Enterprise private key
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              <Globe className="h-4 w-4 text-sky-300" />
              DNS domain binding
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-300" />
              Certificate included (HTML)
            </span>
          </div>

          {/* Proofs micro-bar (cohérence Home) */}
          <ul className="mx-auto mt-3 flex flex-wrap items-center justify-center gap-2 text-[12px] text-slate-300/90">
            <li className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">On-device only</li>
            <li className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">No storage</li>
            <li className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">PDF & DOCX today</li>
          </ul>
        </div>
      </section>

      {/* WHY (EXEC / TECH) */}
      <section className="mx-auto max-w-6xl px-4 py-16" aria-labelledby="why-pro">
        <h2 id="why-pro" className="text-2xl font-semibold text-center">Why it works for business</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3 overflow-hidden">
          {[
            {
              icon: <KeyRound className="h-7 w-7 text-emerald-300" />,
              title: "Signed by your company",
              desc: "Certificates are issued with your enterprise private key — recipients immediately see your legal entity as issuer.",
            },
            {
              icon: <Globe className="h-7 w-7 text-sky-300" />,
              title: "DNS binding for trust",
              desc: "Link verification to your domain (e.g., company.com) with a public record. No opaque servers required.",
            },
            {
              icon: <Lock className="h-7 w-7 text-emerald-300" />,
              title: "Privacy-first by design",
              desc: "On-device processing. Files never leave the browser. No storage, no tracking, no lock-in.",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-3">{icon}</div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-slate-300/90">{desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center text-sm">
          <Link href="/security" className="underline decoration-dotted underline-offset-4 hover:opacity-90">
            Read the security model
          </Link>{" "}
          <span className="text-slate-500">·</span>{" "}
          <Link href="/docs" className="underline decoration-dotted underline-offset-4 hover:opacity-90">
            Read the standard
          </Link>
        </div>
      </section>

      {/* HOW IT WORKS (BUSINESS) */}
      <section
        className="mx-auto max-w-6xl px-4 py-16 border-t border-white/10 overflow-hidden"
        aria-labelledby="hiw-pro"
      >
        <h2 id="hiw-pro" className="text-2xl font-semibold text-center">How it works for businesses</h2>
        <ol className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "Issue",
              icon: <Fingerprint className="h-6 w-6 text-emerald-300" />,
              desc: (
                <>
                  Generate on-device: add a <strong>visible watermark</strong>, and an{" "}
                  <strong>invisible proof</strong> (unique fingerprint + time) embedded in the file. A certificate (HTML)
                  is created and names your company as the issuer.
                </>
              ),
            },
            {
              step: "2",
              title: "Bind",
              icon: <Globe className="h-6 w-6 text-sky-300" />,
              desc: (
                <>
                  Bind your <strong>DNS domain</strong> to your public verification record. Clients can confirm
                  authenticity against your domain — independently.
                </>
              ),
            },
            {
              step: "3",
              title: "Verify",
              icon: <ShieldCheck className="h-6 w-6 text-emerald-300" />,
              desc: (
                <>
                  Recipients drag & drop the file at <code>/verify</code>. Validation runs in the browser —{" "}
                  <strong>no servers</strong>, no uploads.
                </>
              ),
            },
          ].map(({ step, title, icon, desc }) => (
            <li key={step} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10 text-sm font-semibold">
                {step}
              </div>
              <div className="mb-2">{icon}</div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-slate-300/90">{desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* USE CASES */}
      <section
        className="mx-auto max-w-6xl px-4 py-16 border-t border-white/10 overflow-hidden"
        aria-labelledby="use-pro"
      >
        <h2 id="use-pro" className="text-2xl font-semibold text-center">Where businesses use DigitalMeve</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            {
              icon: <Building2 className="h-7 w-7 text-emerald-300" />,
              title: "Contracts & invoices",
              desc: "Certify agreements and billing documents with enterprise identity.",
            },
            {
              icon: <FileCheck2 className="h-7 w-7 text-sky-300" />,
              title: "Reports & certificates",
              desc: "Issue audit reports, compliance confirmations, HR letters.",
            },
            {
              icon: <ServerOff className="h-7 w-7 text-emerald-300" />,
              title: "No-server workflows",
              desc: "Embed proofs in-browser; verify anywhere without central services.",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="mb-3">{icon}</div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-slate-300/90">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING (mirror of PRICING.md) */}
      <section
        className="mx-auto max-w-6xl px-4 py-16 border-t border-white/10 overflow-hidden"
        aria-labelledby="pricing-pro"
      >
        <h2 id="pricing-pro" className="text-2xl font-semibold text-center">Professional plan</h2>
        <p className="mt-3 text-center text-slate-300/90">
          Unlimited certifications with enterprise identity and DNS binding.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {/* Free (for teams to try) */}
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold">Free</h3>
            <p className="mt-1 text-3xl font-bold">€0</p>
            <p className="mt-2 text-sm text-slate-400">Evaluate the standard. No account required.</p>
            <ul className="mt-4 space-y-1 text-sm">
              {[
                "5 files / month",
                "Visible watermark",
                "Invisible proof (embedded)",
                "On-device processing · No storage",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" /> {f}
                </li>
              ))}
            </ul>
            <Link
              href="/generate"
              className="mt-6 inline-flex w-full justify-center rounded-xl ring-1 ring-white/10 px-4 py-2 text-sm font-medium hover:bg-white/5"
            >
              Get started free
            </Link>
          </div>

          {/* Professional */}
          <div className="relative rounded-2xl border border-emerald-400/40 bg-white/5 p-6 shadow-[0_0_30px_rgba(16,185,129,.08)]">
            <span className="absolute -top-3 right-4 inline-flex items-center rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 px-2.5 py-1 text-xs font-medium text-white shadow">
              Recommended
            </span>
            <h3 className="text-lg font-semibold">Professional</h3>
            <p className="mt-1 text-3xl font-bold">
              €29.90{" "}
              <span className="ml-1 align-middle text-sm font-normal text-slate-400">
                / month · or €299/year
              </span>
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Unlimited certifications with enterprise identity.
            </p>
            <ul className="mt-4 space-y-1 text-sm">
              {[
                "Unlimited files · Priority checks",
                "Enterprise private key (per org)",
                "DNS binding (domain-level trust)",
                "Certificates naming your company (HTML)",
                "Optional branded watermark",
                "Support & onboarding",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" /> {f}
                </li>
              ))}
            </ul>
            <Link
              href="/pricing#professional"
              className="mt-6 inline-flex w-full justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 text-sm font-medium text-white shadow hover:brightness-105"
            >
              Subscribe
            </Link>
            <p className="mt-3 text-xs text-slate-500 text-center">
              Secure payments via Stripe · Pricing adapts by country · Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* COMPLIANCE */}
      <section
        className="mx-auto max-w-6xl px-4 py-16 border-t border-white/10 overflow-hidden"
        aria-labelledby="compliance-pro"
      >
        <h2 id="compliance-pro" className="text-2xl font-semibold text-center">Security & Compliance</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            { title: "GDPR (EU)", desc: "Privacy by design. No storage or tracking; on-device processing." },
            { title: "CCPA (US-CA)", desc: "Transparent data handling with user control and opt-out." },
            { title: "PCI DSS / PSD2", desc: "Payments processed by Stripe; card data never touches our servers." },
          ].map(({ title, desc }) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
              <h3 className="text-base font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-slate-300/90">{desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm">
          Read more in{" "}
          <Link href="/security" className="underline decoration-dotted underline-offset-4 hover:opacity-90">
            Security
          </Link>{" "}
          and{" "}
          <Link href="/docs" className="underline decoration-dotted underline-offset-4 hover:opacity-90">
            Standard
          </Link>
          .
        </p>
      </section>

      {/* FAQ (PRO) */}
      <section
        className="mx-auto max-w-6xl px-4 py-16 border-t border-white/10 overflow-hidden"
        aria-labelledby="faq-pro"
      >
        <h2 id="faq-pro" className="text-2xl font-semibold text-center">FAQ for professionals</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {[
            {
              q: "Where is the private key stored?",
              a: "Keys are generated and stored client-side. We do not keep private keys. Rotation & revocation are supported.",
            },
            {
              q: "How does DNS binding work?",
              a: "You publish a public verification record under your domain. Verifiers can check authenticity against it independently.",
            },
            {
              q: "What is embedded in each file?",
              a: "A visible watermark and an invisible proof (unique fingerprint + time) are embedded. Certificates (HTML) name your company.",
            },
            {
              q: "Can we integrate with workflows?",
              a: "Yes. Today via the web app; API & dashboard are planned (see Roadmap).",
            },
          ].map(({ q, a }) => (
            <div key={q} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-base font-semibold">{q}</h3>
              <p className="mt-2 text-sm text-slate-300/90">{a}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/faq" className="text-sm underline decoration-dotted underline-offset-4 hover:opacity-90">
            Read the full FAQ
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-8">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-sky-500/10 p-6 text-center">
          <h3 className="text-xl font-semibold">Start issuing enterprise certificates today</h3>
          <p className="mt-1 text-sm text-slate-300/90">
            Sign with your company identity, bind to your domain, and verify anywhere — in seconds.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link href="/pricing#professional" className="btn btn-primary inline-flex items-center gap-2">
              Subscribe <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/generate" className="btn btn-outline inline-flex items-center gap-2">
              Try with a file
            </Link>
            <Link href="/verify" className="btn btn-outline inline-flex items-center gap-2">
              Verify
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
              }
