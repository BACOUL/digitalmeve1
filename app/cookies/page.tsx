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
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      {/* HEADER */}
      <section className="border-b border-[var(--border)]">
        <div className="container-max px-4 py-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Cookie Policy
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
              DigitalMeve
            </span>
          </h1>
          <p className="mt-2 sub max-w-2xl">
            We keep cookies to the strict minimum needed for a fast, private experience.
          </p>
          <p className="mt-1 text-xs text-[var(--fg-muted)]">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* SUMMARY */}
      <section className="section-dark">
        <div className="container-max px-4">
          <div className="card p-6">
            <h2 className="h2">At a glance</h2>
            <ul className="mt-3 list-disc pl-5 text-sm text-[var(--fg-muted)] space-y-1">
              <li>No advertising or cross-site tracking cookies.</li>
              <li>No file contents ever leave your device (generation and checks run locally).</li>
              <li>Only essential cookies for quota & preferences. Analytics is cookieless.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* DETAILS */}
      <section className="section-dark">
        <div className="container-max px-4 grid gap-6 lg:grid-cols-2">
          {/* Essential cookies */}
          <div className="card p-6">
            <h3 className="h2">Essential cookies</h3>
            <p className="mt-2 text-[var(--fg-muted)]">
              These are required for core features to work and cannot be turned off in-app.
            </p>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-[var(--fg-muted)] border-b border-[var(--border)]">
                  <tr>
                    <th className="py-2 pr-3">Name</th>
                    <th className="py-2 pr-3">Purpose</th>
                    <th className="py-2">Retention</th>
                  </tr>
                </thead>
                <tbody className="align-top">
                  <tr className="border-b border-[var(--border)]">
                    <td className="py-3 pr-3 font-medium">dm_quota</td>
                    <td className="py-3 pr-3">
                      Enforces free-tier rate limits (e.g., daily usage). No personal profile is created.
                    </td>
                    <td className="py-3">Up to 24h (rolling)</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-3 font-medium">dm_pref_lang</td>
                    <td className="py-3 pr-3">
                      Stores your language preference (EN/FR) when available.
                    </td>
                    <td className="py-3">Until cleared</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Analytics & Reliability */}
          <div className="card p-6">
            <h3 className="h2">Analytics & reliability</h3>
            <h4 className="mt-2 font-semibold">Cookieless analytics</h4>
            <p className="mt-1 text-sm text-[var(--fg-muted)]">
              We use{" "}
              <a
                href="https://plausible.io/data-policy"
                target="_blank"
                rel="noreferrer"
                className="link"
              >
                Plausible
              </a>{" "}
              for aggregated usage metrics — no cookies, no cross-site tracking.
            </p>

            <h4 className="mt-4 font-semibold">Error monitoring</h4>
            <p className="mt-1 text-sm text-[var(--fg-muted)]">
              We use Sentry to monitor errors and improve reliability. Event payloads are minimized and
              exclude file contents.
            </p>
          </div>

          {/* Managing cookies */}
          <div className="card p-6 lg:col-span-2">
            <h3 className="h2">Managing cookies</h3>
            <p className="mt-2 text-[var(--fg-muted)]">
              You can clear or block cookies at the browser level. Some essential features
              (like free-tier limits) may require a basic cookie to work as intended.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/privacy" className="btn-outline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="btn-outline">
                Terms of Service
              </Link>
              <Link href="/security" className="btn-outline">
                Security
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
