// app/terms/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service – DigitalMeve",
  description: "Clear and transparent rules for using DigitalMeve.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      {/* HEADER */}
      <section className="border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="container-max px-4 py-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Terms of Service</h1>
          <p className="mt-2 sub">The rules that govern your use of DigitalMeve.</p>
          <p className="mt-1 text-sm text-[var(--fg-muted)]">
            Last updated: {new Date().toISOString().slice(0, 10)}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section-dark">
        <div className="container-max px-4 py-10 space-y-10">
          <div className="card p-6">
            <h2 className="h2">1) Acceptance</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              By using DigitalMeve, you agree to these Terms. If you do not agree, please do not use
              the service.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="h2">2) Use of the service</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              You are solely responsible for the content you process. Do not use DigitalMeve for
              unlawful purposes, to infringe intellectual property rights, or to distribute harmful
              material.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="h2">3) Limitations of liability</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              The service is provided <em>“as is”</em> without warranties of any kind. To the extent
              permitted by law, DigitalMeve disclaims all liability for damages arising from your use
              of the service.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="h2">4) Suspension & termination</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              We may suspend or terminate your access if you misuse the service or breach these
              Terms. We will make reasonable efforts to notify you in advance unless immediate action
              is required.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="h2">5) Changes</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              We may update these Terms from time to time. If changes are significant, we will
              highlight them on this page or notify you directly.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="h2">6) Contact</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              For any questions, reach us at{" "}
              <a href="mailto:legal@digitalmeve.com" className="link">
                legal@digitalmeve.com
              </a>
              . For privacy matters, see our{" "}
              <Link href="/privacy" className="link">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
