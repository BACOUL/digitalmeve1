// app/privacy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy – DigitalMeve",
  description:
    "Learn how DigitalMeve protects your privacy and handles data responsibly.",
};

export default function PrivacyPage() {
  // date figée côté build pour éviter tout flicker d’hydratation
  const lastUpdated = new Date().toLocaleDateString("en-US");

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 bg-white text-gray-800">
      <header>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-gray-500">Last updated: {lastUpdated}</p>
      </header>

      <article className="mt-10 space-y-10">
        <section className="space-y-4">
          <p className="text-lg leading-7 text-gray-700">
            At <span className="font-semibold text-gray-900">DigitalMeve</span>, your
            privacy is a priority. Our system is designed to provide{" "}
            <span className="font-semibold text-emerald-600">digital proof</span> with{" "}
            <span className="font-semibold text-gray-900">no storage</span> of your files.
            You stay in control at all times.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-gray-900">Information We Collect</h2>
          <p className="text-gray-700">
            We collect the minimum data necessary to operate our service, such as
            technical logs to maintain security. We{" "}
            <span className="font-semibold">do not store</span> your uploaded
            documents or proofs.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-gray-900">How We Use Data</h2>
          <p className="text-gray-700">
            Data is only used to provide and improve the DigitalMeve service. It is never
            sold or shared with third parties.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-gray-900">Data Retention</h2>
          <p className="text-gray-700">
            Uploaded files are processed in real time and never stored. Minimal metadata
            (e.g., proof identifiers) may be kept briefly to enable verification and to
            prevent abuse.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-gray-900">Your Rights</h2>
          <p className="text-gray-700">
            You can request access, correction, or deletion of your personal data at any
            time by contacting{" "}
            <a
              href="mailto:privacy@digitalmeve.com"
              className="text-emerald-600 hover:text-emerald-700 underline"
            >
              privacy@digitalmeve.com
            </a>.
          </p>
        </section>
      </article>
    </main>
  );
}
