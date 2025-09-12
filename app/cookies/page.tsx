// app/cookies/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookies — DigitalMeve",
  description:
    "DigitalMeve uses a minimal set of cookies to keep the experience simple and privacy-friendly.",
  alternates: { canonical: "/cookies" },
  openGraph: {
    title: "Cookies — DigitalMeve",
    description:
      "DigitalMeve uses a minimal set of cookies to keep the experience simple and privacy-friendly.",
    url: "/cookies",
    type: "article",
  },
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-18">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl text-gray-900">
            Cookie Policy{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-500">
              DigitalMeve
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            We keep cookies to the strict minimum needed for a fast and private
            experience.
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="prose prose-gray max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900">What we use</h2>
          <p className="text-gray-700">
            DigitalMeve uses only essential cookies and privacy-friendly
            telemetry. We do <strong>not</strong> store your files on our
            servers and we do <strong>not</strong> use advertising cookies.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-8">
            Essential cookies
          </h3>
          <ul className="list-disc pl-6 text-gray-700">
            <li>
              <span className="font-medium text-gray-900">
                Rate-limit/session:
              </span>{" "}
              to enforce free-tier limits (e.g., 5 files/day) using IP + a small
              cookie. No personal profile is created.
            </li>
            <li>
              <span className="font-medium text-gray-900">Preferences:</span>{" "}
              basic UI choices (language toggle EN/FR when available).
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mt-8">
            Analytics (cookieless)
          </h3>
          <p className="text-gray-700">
            We use{" "}
            <a
              href="https://plausible.io/data-policy"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-emerald-300 hover:text-gray-900"
            >
              Plausible
            </a>{" "}
            for aggregated usage metrics without cookies and without tracking
            across sites.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-8">
            Error monitoring
          </h3>
          <p className="text-gray-700">
            We use Sentry to monitor errors and improve reliability. Payloads
            are minimized and exclude file contents.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-8">
            Managing cookies
          </h3>
          <p className="text-gray-700">
            You can clear or block cookies at the browser level. Some essential
            features (like free-tier limits) may require a basic cookie to work
            as intended.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/privacy"
              className="inline-flex items-center gap-2 rounded-xl ring-1 ring-gray-200 px-4 py-2 text-sm hover:bg-gray-50 transition"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="inline-flex items-center gap-2 rounded-xl ring-1 ring-gray-200 px-4 py-2 text-sm hover:bg-gray-50 transition"
            >
              Terms of Service
            </Link>
            <Link
              href="/security"
              className="inline-flex items-center gap-2 rounded-xl ring-1 ring-gray-200 px-4 py-2 text-sm hover:bg-gray-50 transition"
            >
              Security
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
      }
