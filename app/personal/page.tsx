// app/personal/page.tsx
import Link from "next/link";
import {
  CheckCircle2,
  ShieldCheck,
  Lock,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";

export default function PersonalPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      {/* Hero */}
      <section className="border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-20 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Protect your documents —{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
              free forever
            </span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-[var(--fg-muted)]">
            Add an invisible <strong>.MEVE</strong> proof to your files. No
            account. No storage. 100% private.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/generate"
              className="btn btn-primary inline-flex items-center gap-2"
            >
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/verify" className="btn btn-ghost inline-flex items-center gap-2">
              Verify a Document
            </Link>
          </div>

          {/* Micro-assurance + samples */}
          <p className="mt-3 text-sm text-[var(--fg-muted)]">
            Everything runs locally.{" "}
            <Link href="/samples" className="underline hover:opacity-90">
              Try with sample files
            </Link>
            .
          </p>

          {/* Trust badges */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="badge">
              <Lock className="h-4 w-4 text-[var(--accent-1)]" />
              No storage — runs locally
            </span>
            <span className="badge">
              <ShieldCheck className="h-4 w-4 text-[var(--accent-2)]" />
              Verifiable anywhere
            </span>
            <span className="badge">
              <CheckCircle2 className="h-4 w-4 text-[var(--accent-1)]" />
              Free forever
            </span>
            <span className="badge">
              <BadgeCheck className="h-4 w-4 text-[var(--accent-2)]" />
              Works offline
            </span>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-2xl font-semibold text-center">Three simple steps</h2>
        <ol className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "Upload",
              desc: "Drop your file (PDF, DOCX, PNG soon). Nothing is stored.",
            },
            {
              step: "2",
              title: "Generate",
              desc: "We compute a SHA-256 fingerprint and embed a .MEVE proof.",
            },
            {
              step: "3",
              title: "Verify",
              desc: "Anyone can confirm authenticity instantly — anywhere.",
            },
          ].map(({ step, title, desc }) => (
            <li key={step} className="card p-6">
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-white/5 text-sm font-semibold">
                {step}
              </div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-[var(--fg-muted)]">{desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Benefits (trust) */}
      <section className="mx-auto max-w-5xl px-4 py-12 border-t border-[var(--border)]">
        <div className="grid gap-6 sm:grid-cols-3 text-center">
          <div className="flex flex-col items-center">
            <Lock className="h-8 w-8 text-[var(--accent-1)]" />
            <p className="mt-2 text-sm font-medium">No storage</p>
            <p className="text-xs text-[var(--fg-muted)]">
              Your file never leaves your device.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="h-8 w-8 text-[var(--accent-2)]" />
            <p className="mt-2 text-sm font-medium">Verifiable anywhere</p>
            <p className="text-xs text-[var(--fg-muted)]">
              Files stay readable and portable.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <CheckCircle2 className="h-8 w-8 text-[var(--accent-1)]" />
            <p className="mt-2 text-sm font-medium">Free forever</p>
            <p className="text-xs text-[var(--fg-muted)]">
              Basic proof will always be free.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing - Individuals */}
      <section className="mx-auto max-w-5xl px-4 py-16 border-t border-[var(--border)]">
        <h2 className="text-2xl font-semibold text-center">Plans for individuals</h2>
        <p className="mt-3 text-center text-[var(--fg-muted)]">
          Start free, upgrade anytime for more documents or advanced options.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            {
              name: "Free",
              price: "$0",
              desc: "Forever free, perfect for personal use.",
              features: ["Up to 5 files/day", "Basic .MEVE proof", "No account required"],
              cta: "Get Started",
              href: "/generate",
              highlight: false,
            },
            {
              name: "Plus",
              price: "$4.99/mo",
              desc: "For power users who need more volume.",
              features: ["Up to 50 files/day", "Priority verification", "Email support"],
              cta: "Upgrade",
              href: "/pricing",
              highlight: true,
            },
            {
              name: "Premium",
              price: "$9.99/mo",
              desc: "For freelancers & professionals.",
              features: ["Unlimited files", "Advanced proof options", "Priority support"],
              cta: "Go Premium",
              href: "/pricing",
              highlight: false,
            },
          ].map(({ name, price, desc, features, cta, href, highlight }) => (
            <div
              key={name}
              className={`relative rounded-2xl border p-6 shadow-sm ${
                highlight
                  ? "border-[var(--accent-1)] bg-[color-mix(in_oklab,white,transparent_92%)]"
                  : "border-[var(--border)] bg-white/5"
              }`}
            >
              {highlight && (
                <span className="absolute -top-3 right-4 inline-flex items-center rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 px-2.5 py-1 text-xs font-medium text-white shadow">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="mt-1 text-3xl font-bold">{price}</p>
              <p className="mt-2 text-sm text-[var(--fg-muted)]">{desc}</p>
              <ul className="mt-4 space-y-1 text-sm">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--accent-1)]" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                href={href}
                className={`mt-6 inline-flex w-full justify-center rounded-xl px-4 py-2 text-sm font-medium transition ${
                  highlight
                    ? "bg-gradient-to-r from-emerald-500 to-sky-500 text-white hover:brightness-105"
                    : "ring-1 ring-[var(--border)] hover:bg-white/5"
                }`}
              >
                {cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-5xl px-4 py-16 border-t border-[var(--border)]">
        <h2 className="text-2xl font-semibold text-center">FAQ</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {[
            {
              q: "Do I need an account?",
              a: "No. Everything runs locally in your browser — no signup, no login.",
            },
            {
              q: "Can my file be read normally?",
              a: "Yes. Your PDF/DOCX remains fully compatible, with a lightweight .MEVE proof inside.",
            },
            {
              q: "What happens if I reach my daily limit?",
              a: "You can upgrade to Plus or Premium for higher limits and extra features.",
            },
            {
              q: "Can I cancel anytime?",
              a: "Yes. Subscriptions are flexible and you can cancel whenever you want.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="card p-5">
              <h3 className="text-base font-semibold">{q}</h3>
              <p className="mt-2 text-sm text-[var(--fg-muted)]">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
      }
