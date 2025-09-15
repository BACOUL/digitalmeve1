// app/personal/page.tsx
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Lock, ArrowRight } from "lucide-react";

export default function PersonalPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:py-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-gray-900">
            Protect your documents —
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-500">
              {" "}free forever
            </span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Add an invisible <strong>.MEVE proof</strong> to your files.  
            No account. No storage. 100% private.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-600"
            >
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/verify"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-50"
            >
              Verify a Document
            </Link>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-2xl font-semibold text-center text-gray-900">
          Three simple steps
        </h2>
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
            <li
              key={step}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-gray-50 text-sm font-semibold text-gray-700">
                {step}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm text-gray-600">{desc}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Trust badges */}
      <section className="mx-auto max-w-5xl px-4 py-12 border-t border-gray-100">
        <div className="grid gap-6 sm:grid-cols-3 text-center">
          <div className="flex flex-col items-center">
            <Lock className="h-8 w-8 text-emerald-600" />
            <p className="mt-2 text-sm font-medium text-gray-900">No storage</p>
            <p className="text-xs text-gray-600">Your file never leaves your device.</p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="h-8 w-8 text-sky-600" />
            <p className="mt-2 text-sm font-medium text-gray-900">Verifiable anywhere</p>
            <p className="text-xs text-gray-600">Files stay readable and portable.</p>
          </div>
          <div className="flex flex-col items-center">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            <p className="mt-2 text-sm font-medium text-gray-900">Free forever</p>
            <p className="text-xs text-gray-600">Basic proof will always be free.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-5xl px-4 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-semibold text-center text-gray-900">
          Plans for individuals
        </h2>
        <p className="mt-3 text-center text-gray-600">
          Start free, upgrade anytime for more documents or advanced options.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            {
              name: "Free",
              price: "$0",
              desc: "Forever free, perfect for personal use.",
              features: [
                "Up to 5 files/day",
                "Basic .MEVE proof",
                "No account required",
              ],
              cta: "Get Started",
              href: "/generate",
              highlight: false,
            },
            {
              name: "Plus",
              price: "$4.99/mo",
              desc: "For power users who need more volume.",
              features: [
                "Up to 50 files/day",
                "Priority verification",
                "Email support",
              ],
              cta: "Upgrade",
              href: "/pricing",
              highlight: true,
            },
            {
              name: "Premium",
              price: "$9.99/mo",
              desc: "For freelancers & professionals.",
              features: [
                "Unlimited files",
                "Advanced proof options",
                "Priority support",
              ],
              cta: "Go Premium",
              href: "/pricing",
              highlight: false,
            },
          ].map(({ name, price, desc, features, cta, href, highlight }) => (
            <div
              key={name}
              className={`rounded-2xl border p-6 shadow-sm ${
                highlight
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
              <p className="mt-1 text-3xl font-bold text-gray-900">{price}</p>
              <p className="mt-2 text-sm text-gray-600">{desc}</p>
              <ul className="mt-4 space-y-1 text-sm text-gray-700">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                href={href}
                className={`mt-6 inline-flex w-full justify-center rounded-xl px-4 py-2 text-sm font-medium transition ${
                  highlight
                    ? "bg-emerald-500 text-white hover:bg-emerald-600"
                    : "border border-gray-300 text-gray-900 hover:bg-gray-50"
                }`}
              >
                {cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-5xl px-4 py-16 border-t border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-900 text-center">FAQ</h2>
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
            <div
              key={q}
              className="rounded-xl border border-gray-200 bg-white p-5"
            >
              <h3 className="text-base font-semibold text-gray-900">{q}</h3>
              <p className="mt-2 text-sm text-gray-600">{a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
      }
