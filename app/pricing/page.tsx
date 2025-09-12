// app/pricing/page.tsx
import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 text-gray-900">
      {/* Header */}
      <header className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Pricing</h1>
        <p className="mx-auto mt-2 max-w-2xl text-gray-600">
          DigitalMeve is free for individuals. A Business plan is coming soon with
          API access and domain-verified issuers.
        </p>
      </header>

      {/* Cards */}
      <section className="mt-10 grid gap-6 md:grid-cols-2">
        {/* Free / Individuals */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            Free for Individuals
          </span>
          <h2 className="mt-3 text-xl font-semibold">Personal</h2>
          <p className="mt-1 text-sm text-gray-600">
            Protect your documents in seconds. No account. No storage.
          </p>

          <ul className="mt-5 space-y-2 text-sm text-gray-700">
            <li>• Generate .MEVE files (PDF/PNG today)</li>
            <li>• Tamper-evident XMP metadata</li>
            <li>• Human-readable certificate (.meve.html)</li>
            <li>• Verify anywhere</li>
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/generate"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 text-sm font-medium text-white hover:brightness-105"
            >
              Get Started Free
            </Link>
            <Link
              href="/verify"
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
            >
              Verify a file
            </Link>
          </div>
        </div>

        {/* Business (Coming soon) */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
            Coming soon
          </span>
          <h2 className="mt-3 text-xl font-semibold">Business</h2>
          <p className="mt-1 text-sm text-gray-600">
            Issue .MEVE at scale with your domain verified. SLA & support.
          </p>

          <ul className="mt-5 space-y-2 text-sm text-gray-700">
            <li>• API & SDKs</li>
            <li>• Domain-verified issuer badge</li>
            <li>• Bulk verification</li>
            <li>• Support & SLA</li>
          </ul>

          {/* Waitlist form (no backend in V1) */}
          <form
            className="mt-6 space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks! We’ll contact you soon. (Waitlist — V1 placeholder)");
            }}
          >
            <label htmlFor="email" className="text-sm text-gray-700">
              Join the waitlist (work email)
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="name@company.com"
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            />
            <button
              type="submit"
              className="w-full rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
            >
              Request access
            </button>
          </form>

          <p className="mt-3 text-xs text-gray-500">
            Want to talk now?{" "}
            <Link href="/contact" className="text-sky-600 hover:underline">
              Contact sales
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ mini (placeholder V1) */}
      <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-6">
        <h3 className="text-lg font-semibold">FAQ</h3>
        <dl className="mt-4 space-y-4 text-sm">
          <div>
            <dt className="font-medium text-gray-900">Do I need an account?</dt>
            <dd className="text-gray-600">
              No. Individuals can generate and verify without any account in V1.
            </dd>
          </div>
          <div>
            <dt className="font-medium text-gray-900">Is my file stored?</dt>
            <dd className="text-gray-600">
              No. We process in the browser (and on the edge when needed) with zero storage.
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
