// app/legal/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Legal — DigitalMeve",
  description:
    "Legal information for DigitalMeve: company details, hosting, and contact.",
  alternates: { canonical: "/legal" },
  openGraph: {
    title: "Legal — DigitalMeve",
    description:
      "Legal information for DigitalMeve: company details, hosting, and contact.",
    url: "/legal",
    type: "article",
  },
};

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Hero */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-18">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl text-gray-900">
            Legal{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-500">
              DigitalMeve
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Core legal information about the service, hosting, and how to
            contact us.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="prose prose-gray max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900">Company</h2>
          <p className="text-gray-700">
            DigitalMeve is a project focused on providing a simple, universal
            proof layer for documents. Final company details will be updated
            here once incorporated in production.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-8">Contact</h3>
          <p className="text-gray-700">
            For legal inquiries, please email{" "}
            <a
              href="mailto:legal@digitalmeve.com"
              className="underline decoration-emerald-300 hover:text-gray-900"
            >
              legal@digitalmeve.com
            </a>
            .
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-8">Hosting</h3>
          <p className="text-gray-700">
            DigitalMeve is hosted on infrastructure provided by Vercel Inc.
            Mailing address: 440 N Barranca Ave #4133, Covina, CA 91723, USA.
            <br />
            Website:{" "}
            <a
              href="https://vercel.com/"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-sky-300 hover:text-gray-900"
            >
              vercel.com
            </a>
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-8">
            Terms, Privacy & Cookies
          </h3>
          <p className="text-gray-700">
            Please review our policies for more details:
          </p>
          <ul className="list-disc pl-6 text-gray-700">
            <li>
              <Link
                href="/terms"
                className="underline decoration-emerald-300 hover:text-gray-900"
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="underline decoration-emerald-300 hover:text-gray-900"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/cookies"
                className="underline decoration-emerald-300 hover:text-gray-900"
              >
                Cookie Policy
              </Link>
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mt-8">
            Intellectual Property
          </h3>
          <p className="text-gray-700">
            “DigitalMeve” and “.MEVE” may be trademarks or trade names. All
            product names, logos, and brands are property of their respective
            owners. Use of these names, logos, and brands does not imply
            endorsement.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 mt-8">
            Liability & Use
          </h3>
          <p className="text-gray-700">
            DigitalMeve is provided “as is”. We do not store your files on our
            servers and we focus on tamper-evident markers embedded into
            supported formats. Users remain responsible for their content and
            compliance with applicable laws.
          </p>
        </div>
      </section>
    </main>
  );
}
