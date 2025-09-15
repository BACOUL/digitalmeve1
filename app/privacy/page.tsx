// app/privacy/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy – DigitalMeve",
  description:
    "How DigitalMeve handles your data: no file storage, privacy by design, transparent telemetry, and user controls.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      {/* HEADER */}
      <section className="border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="container-max px-4 py-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
          <p className="mt-2 sub">
            Privacy by design. No account required. No file storage.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section-dark">
        <div className="container-max px-4 py-10 space-y-10">
          <div className="card p-6">
            <h2 className="h2">1) What we do</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              DigitalMeve embeds an invisible <span className="font-semibold">.MEVE</span> proof in
              your document and optionally generates a human-readable certificate. Your file remains
              readable everywhere; we never alter its visible content.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="h2">2) Files & processing</h2>
            <ul className="mt-2 list-disc pl-5 text-[var(--fg-muted)] space-y-2">
              <li><span className="font-medium">No upload by default:</span> processing happens in your browser.</li>
              <li><span className="font-medium">No storage:</span> we do not keep your files on our servers.</li>
              <li><span className="font-medium">Supported:</span> PDF &amp; DOCX (others coming).</li>
            </ul>
          </div>

          <div className="card p-6">
            <h2 className="h2">3) Telemetry</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              We collect minimal, aggregated metrics to keep the service reliable (e.g., feature usage,
              error rates). We do not build individual profiles. IPs are discarded or obfuscated in logs.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="h2">4) Cookies</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              Essential cookies only (session & security). No third-party advertising cookies.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="h2">5) Certificates & verification</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              Certificates may include a file hash, a timestamp, and optional issuer information that you
              provide (e.g., email or domain). Keep certificates in a safe place.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="h2">6) Your choices</h2>
            <ul className="mt-2 list-disc pl-5 text-[var(--fg-muted)] space-y-2">
              <li>Use the service without creating an account.</li>
              <li>Skip issuer details if you prefer anonymity.</li>
              <li>Delete local files and certificates anytime.</li>
            </ul>
          </div>

          <div className="card p-6">
            <h2 className="h2">7) Security</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              We use modern encryption in transit, strict access controls, and regular dependency reviews.
              Report issues to <a className="link" href="mailto:security@digitalmeve.com">security@digitalmeve.com</a>.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="h2">8) Contact</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              Questions? Reach us at <a className="link" href="mailto:privacy@digitalmeve.com">privacy@digitalmeve.com</a>.
              For legal terms, see{" "}
              <Link href="/terms" className="link">Terms of Service</Link>.
            </p>
          </div>

          <p className="text-xs text-[var(--fg-muted)]">
            Last updated: {new Date().toISOString().slice(0, 10)}
          </p>
        </div>
      </section>
    </main>
  );
}
