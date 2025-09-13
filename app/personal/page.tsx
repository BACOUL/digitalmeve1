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

      {/* FAQ light */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-2xl font-semibold text-gray-900 text-center">FAQ</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="text-base font-semibold text-gray-900">
              Do I need an account?
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              No. Everything runs locally in your browser — no signup, no login.
            </p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5">
            <h3 className="text-base font-semibold text-gray-900">
              Can my file be read normally?
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Yes. Your PDF/DOCX remains fully compatible, with a lightweight .MEVE proof inside.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
