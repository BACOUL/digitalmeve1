// app/privacy/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy – DigitalMeve",
  description:
    "How DigitalMeve handles your data: privacy by design, on-device processing, no file storage by default, minimal analytics, and user controls.",
};

const LAST_UPDATED = "2025-09-25"; // TODO: update when you materially change this policy

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      {/* HEADER */}
      <section className="border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="container-max px-4 py-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
          <p className="mt-2 sub">Privacy by design. On-device processing. No file storage by default.</p>
          <p className="mt-1 text-sm text-[var(--fg-muted)]">
            Last updated: <time dateTime={LAST_UPDATED}>{LAST_UPDATED}</time>
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section-dark">
        <div className="container-max px-4 py-10 space-y-10">
          {/* 0) Disclaimer */}
          <div className="card p-6">
            <h2 className="h2">0) Legal disclaimer — Not legal advice / Not a legal proof by itself</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              DigitalMeve is <b>not a law firm</b> and does <b>not</b> provide legal advice. Any “proof” or
              verification artifact created with DigitalMeve <b>does not, by itself, constitute a legally binding
              proof</b>. Admissibility and legal weight depend on applicable laws and context. See{" "}
              <Link href="/terms" className="link">Terms of Service</Link>.
            </p>
          </div>

          {/* 1) What we do */}
          <div className="card p-6">
            <h2 className="h2">1) What we do</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              DigitalMeve embeds an invisible <span className="font-semibold">.MEVE</span> verification artifact in your
              document (e.g., a cryptographic fingerprint and timestamp) and can generate an optional human-readable
              certificate. Your file remains readable; we do not alter its visible content.
            </p>
          </div>

          {/* 2) Files & processing */}
          <div className="card p-6">
            <h2 className="h2">2) Files & processing</h2>
            <ul className="mt-2 list-disc pl-5 text-[var(--fg-muted)] space-y-2">
              <li><span className="font-medium">On-device by default:</span> processing happens locally in your browser/app.</li>
              <li><span className="font-medium">No storage by default:</span> we do not keep your files on our servers.</li>
              <li><span className="font-medium">Formats:</span> PDF &amp; DOCX (more to come).</li>
              <li className="text-xs">
                Note: If we later introduce optional cloud features (e.g., backup or team workflows), they will be <b>opt-in</b>,
                clearly labeled, and governed by additional terms.
              </li>
            </ul>
          </div>

          {/* 3) Telemetry & analytics */}
          <div className="card p-6">
            <h2 className="h2">3) Telemetry & analytics</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              We collect minimal, aggregated usage metrics (e.g., feature usage, error rates) to keep the service reliable.
              We do <b>not</b> build individual behavioral profiles. IP addresses are discarded or obfuscated in logs.
              We use privacy-friendly analytics and <b>no advertising cookies</b>.
            </p>
          </div>

          {/* 4) Cookies */}
          <div className="card p-6">
            <h2 className="h2">4) Cookies</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              Essential cookies only (session & security) and anonymized analytics if you consent. No cross-site tracking.
              Manage preferences via the cookie banner and your browser settings. See{" "}
              <Link href="/cookies" className="link">Cookie Policy</Link>.
            </p>
          </div>

          {/* 5) Certificates & verification artifacts */}
          <div className="card p-6">
            <h2 className="h2">5) Certificates & verification artifacts</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              Certificates may include a file hash, a timestamp, and optional issuer details you provide (e.g., email or
              domain). Store certificates safely. Anyone verifying a file may learn whether it matches a prior certificate.
            </p>
          </div>

          {/* 6) Your choices & controls */}
          <div className="card p-6">
            <h2 className="h2">6) Your choices & controls</h2>
            <ul className="mt-2 list-disc pl-5 text-[var(--fg-muted)] space-y-2">
              <li>Use the service without creating an account.</li>
              <li>Skip issuer details if you prefer anonymity/pseudonymity.</li>
              <li>Delete local files and certificates at any time.</li>
              <li>Use the cookie banner to opt-in/out of analytics.</li>
            </ul>
          </div>

          {/* 7) Data controller & contact */}
          <div className="card p-6">
            <h2 className="h2">7) Data controller & contact</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              Data controller: <b>TODO: legal name</b> — <b>TODO: legal address</b>.<br />
              Contact: <a className="link" href="mailto:privacy@digitalmeve.com">privacy@digitalmeve.com</a>
              {" "}or <a className="link" href="mailto:support@digitalmeve.com">support@digitalmeve.com</a>.
            </p>
          </div>

          {/* 8) Lawful basis (GDPR) */}
          <div className="card p-6">
            <h2 className="h2">8) Lawful basis (GDPR)</h2>
            <ul className="mt-2 list-disc pl-5 text-[var(--fg-muted)] space-y-2">
              <li><span className="font-medium">Performance of a contract</span> (providing the service you requested).</li>
              <li><span className="font-medium">Legitimate interests</span> (security, preventing abuse, basic analytics).</li>
              <li><span className="font-medium">Consent</span> (only for optional analytics or features that require it).</li>
            </ul>
          </div>

          {/* 9) Your rights (GDPR/CCPA) */}
          <div className="card p-6">
            <h2 className="h2">9) Your rights (GDPR/CCPA)</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              Depending on your jurisdiction, you may have rights to access, rectify, delete, or port your personal data,
              and to object/restrict certain processing. You may also withdraw consent at any time (where applicable).
              To exercise rights, email <a className="link" href="mailto:privacy@digitalmeve.com">privacy@digitalmeve.com</a>.
            </p>
          </div>

          {/* 10) International transfers */}
          <div className="card p-6">
            <h2 className="h2">10) International transfers</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              If personal data is transferred outside your country, we use appropriate safeguards (e.g., Standard Contractual
              Clauses) and minimize the data involved. Our goal is to limit transfers by processing on-device.
            </p>
          </div>

          {/* 11) Processors & retention */}
          <div className="card p-6">
            <h2 className="h2">11) Service providers (processors) & retention</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              We may use vetted providers for infrastructure, payments, or anonymized analytics. They process data under
              our instructions and appropriate safeguards. We keep personal data only as long as necessary for the purposes
              described here or as required by law.
            </p>
          </div>

          {/* 12) Security */}
          <div className="card p-6">
            <h2 className="h2">12) Security</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              We use encryption in transit, strict access controls, dependency monitoring, and security reviews. Report
              issues to <a className="link" href="mailto:security@digitalmeve.com">security@digitalmeve.com</a>.
            </p>
          </div>

          {/* 13) Changes */}
          <div className="card p-6">
            <h2 className="h2">13) Changes to this policy</h2>
            <p className="mt-2 text-[var(--fg-muted)]">
              We may update this policy from time to time. Material changes will be highlighted on this page with a new
              <em> Last updated</em> date. Continued use after changes constitutes acceptance.
            </p>
          </div>

          <p className="text-xs text-[var(--fg-muted)]">
            For legal terms, see <Link href="/terms" className="link">Terms of Service</Link>.
          </p>
        </div>
      </section>
    </main>
  );
          }
