// app/privacy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy – DigitalMeve",
  description: "Learn how DigitalMeve protects your privacy and handles data responsibly.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-slate-200">
      <h1 className="text-4xl font-bold tracking-tight text-slate-100">
        Privacy Policy
      </h1>
      <p className="mt-4 text-slate-400">
        Last updated: {new Date().toLocaleDateString("en-US")}
      </p>

      <section className="mt-10 space-y-6">
        <p>
          At <span className="font-semibold">DigitalMeve</span>, your privacy is
          a priority. Our system is designed to provide{" "}
          <span className="text-emerald-400">digital proof</span> with{" "}
          <span className="font-semibold">no storage</span> of your files. You
          stay in control at all times.
        </p>

        <h2 className="text-2xl font-semibold text-slate-100">
          Information We Collect
        </h2>
        <p>
          We collect the minimum data necessary to operate our service, such as
          technical logs to maintain security. We do not store your uploaded
          documents or proofs.
        </p>

        <h2 className="text-2xl font-semibold text-slate-100">
          How We Use Data
        </h2>
        <p>
          Data is only used to provide and improve the DigitalMeve service. It
          is never sold or shared with third parties.
        </p>

        <h2 className="text-2xl font-semibold text-slate-100">
          Data Retention
        </h2>
        <p>
          Uploaded files are processed in real time and never stored. Metadata
          (such as proof identifiers) may be kept briefly to allow verification.
        </p>

        <h2 className="text-2xl font-semibold text-slate-100">Your Rights</h2>
        <p>
          You can request access, correction, or deletion of your personal data
          at any time by contacting us at{" "}
          <a
            href="mailto:privacy@digitalmeve.com"
            className="text-emerald-400 hover:underline"
          >
            privacy@digitalmeve.com
          </a>
          .
        </p>
      </section>
    </main>
  );
}
