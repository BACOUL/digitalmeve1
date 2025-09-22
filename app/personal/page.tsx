// app/individuals/page.tsx — Individuals (developer-grade, aligned with GitHub)
"use client";

import Link from "next/link";
import { CheckCircle2, ShieldCheck, Lock, ArrowRight, BadgeCheck, FileCheck, Fingerprint } from "lucide-react";

export default function IndividualsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero */}
      <section className="border-b border-white/10 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Protect your files —{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
              private, instant, verifiable
            </span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-300/90">
            Add an invisible proof to any document with a visible watermark for trust.{" "}
            <strong>All processing runs in your browser</strong> — no storage, no account required.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/generate" className="btn btn-primary inline-flex items-center gap-2">
              Protect a file <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/verify" className="btn btn-outline inline-flex items-center gap-2">
              Verify a document
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              <Lock className="h-4 w-4 text-emerald-300" />
              On-device only · No storage
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              <ShieldCheck className="h-4 w-4 text-sky-300" />
              Certificate included (HTML)
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
              <BadgeCheck className="h-4 w-4 text-emerald-300" />
              Works with PDF, DOCX, JPG, PNG, MP4
            </span>
          </div>
        </div>
      </section>

      {/* How it works (developer-grade clarity) */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-semibold text-center">How it works</h2>
        <ol className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "Generate",
              desc: (
                <>
                  Drop your file. We compute a <strong>SHA-256</strong> fingerprint locally and attach an{" "}
                  <strong>invisible DigitalMeve key</strong>, plus an optional <strong>visible watermark</strong>.
                </>
              ),
              icon: <Fingerprint className="h-6 w-6 text-emerald-300" />,
            },
            {
              step: "2",
              title: "Certificate",
              desc: (
                <>
                  A portable <strong>HTML certificate</strong> is produced with timestamp, issuer type and integrity
                  details. Share it or keep it for your records.
                </>
              ),
              icon: <FileCheck className="h-6 w-6 text-sky-300" />,
            },
            {
              step: "3",
              title: "Verify",
              desc: (
                <>
                  Anyone can verify in seconds at <code>/verify</code>. No server dependency — integrity checks run in
                  the browser.
                </>
              ),
              icon: <ShieldCheck className="h-6 w-6 text-emerald-300" />,
            },
          ].map(({ step, title, desc, icon }) => (
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

        <div className="mt-8 text-center">
          <Link href="/security" className="text-sm underline decoration-dotted underline-offset-4 hover:opacity-90">
            Read the security model
          </Link>{" "}
          <span className="text-slate-500">·</span>{" "}
          <Link href="/docs" className="text-sm underline decoration-dotted underline-offset-4 hover:opacity-90">
            Read the standard
          </Link>
        </div>
      </section>

      {/* Benefits (why it matters) */}
      <section className="mx-auto max-w-6xl px-4 py-12 border-t border-white/10">
        <div className="grid gap-6 sm:grid-cols-3 text-center">
          <div className="flex flex-col items-center">
            <Lock className="h-8 w-8 text-emerald-300" />
            <p className="mt-2 text-sm font-medium">Privacy-first</p>
            <p className="text-xs text-slate-400">Your file never leaves your device.</p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="h-8 w-8 text-sky-300" />
            <p className="mt-2 text-sm font-medium">Universal</p>
            <p className="text-xs text-slate-400">Verify anywhere, without vendor lock-in.</p>
          </div>
          <div className="flex flex-col items-center">
            <CheckCircle2 className="h-8 w-8 text-emerald-300" />
            <p className="mt-2 text-sm font-medium">Zero friction</p>
            <p className="text-xs text-slate-400">No account, no setup, start in seconds.</p>
          </div>
        </div>
      </section>

      {/* Pricing — Individuals (aligned with PRICING.md) */}
      <section className="mx-auto max-w-6xl px-4 py-16 border-t border-white/10">
        <h2 className="text-2xl font-semibold text-center">Plans for individuals</h2>
        <p className="mt-3 text-center text-slate-300/90">
          Start free. Upgrade anytime for unlimited certifications and named certificates.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {[
            {
              name: "Free",
              price: "€0",
              period: "forever",
              desc: "Try the standard. No account required.",
              features: ["5 files / month", "Visible watermark", "Invisible SHA-256 + DM key", "Browser-only processing"],
              cta: { href: "/generate", label: "Get started free" },
              highlight: false,
            },
            {
              name: "Individual",
              price: "€9.90",
              period: "month · or €99/year",
              desc: "Unlimited certifications with named certificates.",
              features: [
                "Unlimited files",
                "Name/email in certificate",
                "Visible watermark · Invisible SHA-256 + DM key",
                "Priority support",
              ],
              cta: { href: "/pricing#individual", label: "Subscribe" },
              highlight: true,
            },
          ].map(({ name, price, period, desc, features, cta, highlight }) => (
            <div
              key={name}
              className={`relative rounded-2xl border p-6 ${
                highlight
                  ? "border-emerald-400/40 bg-white/5 shadow-[0_0_30px_rgba(16,185,129,.08)]"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {highlight && (
                <span className="absolute -top-3 right-4 inline-flex items-center rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 px-2.5 py-1 text-xs font-medium text-white shadow">
                  Recommended
                </span>
              )}
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="mt-1 text-3xl font-bold">
                {price}
                <span className="ml-1 align-middle text-sm font-normal text-slate-400">{period}</span>
              </p>
              <p className="mt-2 text-sm text-slate-400">{desc}</p>
              <ul className="mt-4 space-y-1 text-sm">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-300" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                href={cta.href}
                className={`mt-6 inline-flex w-full justify-center rounded-xl px-4 py-2 text-sm font-medium transition ${
                  highlight
                    ? "bg-gradient-to-r from-emerald-500 to-sky-500 text-white hover:brightness-105"
                    : "ring-1 ring-white/10 hover:bg-white/5"
                }`}
              >
                {cta.label}
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-5 text-center text-xs text-slate-500">
          Secure payments via Stripe · Pricing adapts by country · Cancel anytime
        </p>
      </section>

      {/* FAQ (focused for Individuals) */}
      <section className="mx-auto max-w-6xl px-4 py-16 border-t border-white/10">
        <h2 className="text-2xl font-semibold text-center">FAQ</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {[
            {
              q: "Do I need an account?",
              a: "No. Everything runs locally in your browser — no signup, no storage.",
            },
            {
              q: "What’s embedded in my file?",
              a: "A visible watermark, an invisible SHA-256 fingerprint and an invisible DigitalMeve key. Paid users can include their name/email in the certificate.",
            },
            {
              q: "Can anyone verify my file?",
              a: "Yes. Anyone can drag & drop your file at /verify and get a result in seconds.",
            },
            {
              q: "What if I upgrade?",
              a: "You get unlimited certifications and named certificates. You can cancel anytime.",
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

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-8">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-sky-500/10 p-6 text-center">
          <h3 className="text-xl font-semibold">Protect your next document in seconds</h3>
          <p className="mt-1 text-sm text-slate-300/90">
            No account, no storage — your file never leaves your device.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link href="/generate" className="btn btn-primary inline-flex items-center gap-2">
              Protect a file <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/verify" className="btn btn-outline inline-flex items-center gap-2">
              Verify a document
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
              }
