// app/privacy/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — DigitalMeve",
  description:
    "Learn how DigitalMeve handles data: no accounts required for individuals, no file storage by default, and transparent analytics.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">
            Privacy Policy
          </h1>
          <p className="mt-3 text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10 space-y-10">
        {/* 1. Overview */}
        <article className="prose prose-gray max-w-none">
          <h2>1. Overview</h2>
          <p>
            DigitalMeve provides a simple, universal proof embedded directly in
            your files. For individuals, we do not require accounts and we do
            not store your files by default. Processing is designed to be
            streaming-only where possible.
          </p>
        </article>

        {/* 2. Data we do (not) store */}
        <article className="prose prose-gray max-w-none">
          <h2>2. Data We Do (Not) Store</h2>
          <ul>
            <li>
              <strong>Files:</strong> By default, files are processed in-memory
              and not stored on our servers. Output is delivered back to your
              device.
            </li>
            <li>
              <strong>Hashes &amp; metadata:</strong> Embedded into your file
              (XMP/EXIF/OOXML) and provided to you; not stored server-side for
              Individuals.
            </li>
            <li>
              <strong>Accounts:</strong> Not required for Individuals (V1).
              Business features may require authentication in future versions.
            </li>
          </ul>
        </article>

        {/* 3. Analytics */}
        <article className="prose prose-gray max-w-none">
          <h2>3. Analytics</h2>
          <p>
            We use privacy-friendly analytics (e.g., Plausible) to understand
            basic usage (page views, referrers). These analytics do not track
            individuals across sites and do not use invasive cookies.
          </p>
        </article>

        {/* 4. Cookies */}
        <article className="prose prose-gray max-w-none">
          <h2>4. Cookies</h2>
          <p>
            We aim to run with essential cookies only. If optional cookies are
            introduced, you will be able to provide consent and manage your
            choices. See our{" "}
            <Link className="underline text-sky-600" href="/cookies">
              Cookies Policy
            </Link>
            .
          </p>
        </article>

        {/* 5. Security */}
        <article className="prose prose-gray max-w-none">
          <h2>5. Security</h2>
          <p>
            We follow industry best practices to protect data in transit and at
            rest where applicable. Learn more on our{" "}
            <Link className="underline text-sky-600" href="/security">
              Security
            </Link>{" "}
            page.
          </p>
        </article>

        {/* 6. Data subject rights */}
        <article className="prose prose-gray max-w-none">
          <h2>6. Your Rights</h2>
          <p>
            Depending on your jurisdiction, you may have rights of access,
            rectification, deletion, objection, and portability. Contact us to
            exercise your rights.
          </p>
        </article>

        {/* 7. Contact */}
        <article className="prose prose-gray max-w-none">
          <h2>7. Contact</h2>
          <p>
            For privacy inquiries, email{" "}
            <a className="underline" href="mailto:privacy@digitalmeve.com">
              privacy@digitalmeve.com
            </a>
            .
          </p>
        </article>

        {/* 8. Changes */}
        <article className="prose prose-gray max-w-none">
          <h2>8. Changes to this Policy</h2>
          <p>
            We may update this Privacy Policy to reflect product or legal
            changes. The “Last updated” date above indicates the latest revision.
          </p>
        </article>
      </section>
    </main>
  );
}
