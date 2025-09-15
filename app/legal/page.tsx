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
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero */}
      <section className="border-b border-[var(--border,rgba(255,255,255,0.08))]">
        <div className="container-max px-4 py-14 sm:py-20">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Legal{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
              DigitalMeve
            </span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            Core legal information about the service, hosting, and how to contact us.
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container-max px-4 py-10">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Company */}
          <Card>
            <h2 className="text-2xl font-semibold">Company</h2>
            <p className="mt-2 text-slate-300">
              DigitalMeve focuses on providing a simple, universal proof layer for documents.
              Final company registration details will be added here once incorporated for production.
            </p>
          </Card>

          {/* Contact */}
          <Card>
            <h2 className="text-2xl font-semibold">Contact</h2>
            <p className="mt-2 text-slate-300">
              For legal inquiries, email{" "}
              <a
                href="mailto:legal@digitalmeve.com"
                className="underline decoration-emerald-400/60 underline-offset-4 hover:text-slate-50"
              >
                legal@digitalmeve.com
              </a>
              .
            </p>
            <p className="mt-2 text-sm text-slate-400">
              For general questions, see{" "}
              <Link href="/contact" className="text-sky-300 hover:underline">
                Contact
              </Link>
              .
            </p>
          </Card>

          {/* Hosting */}
          <Card>
            <h2 className="text-2xl font-semibold">Hosting</h2>
            <p className="mt-2 text-slate-300">
              DigitalMeve is hosted on infrastructure provided by Vercel Inc.
            </p>
            <ul className="mt-3 text-slate-300 text-sm space-y-1">
              <li>
                Mailing address: 440 N Barranca Ave #4133, Covina, CA 91723, USA
              </li>
              <li>
                Website:{" "}
                <a
                  href="https://vercel.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-sky-400/60 underline-offset-4 hover:text-slate-50"
                >
                  vercel.com
                </a>
              </li>
            </ul>
          </Card>

          {/* Policies */}
          <Card>
            <h2 className="text-2xl font-semibold">Terms, Privacy & Cookies</h2>
            <p className="mt-2 text-slate-300">Please review our policies for more details:</p>
            <ul className="mt-3 list-disc pl-5 text-slate-300">
              <li>
                <Link href="/terms" className="text-emerald-300 hover:underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-emerald-300 hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-emerald-300 hover:underline">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </Card>

          {/* IP */}
          <Card>
            <h2 className="text-2xl font-semibold">Intellectual Property</h2>
            <p className="mt-2 text-slate-300">
              “DigitalMeve” and “.MEVE” may be trademarks or trade names. All product names,
              logos, and brands are property of their respective owners. Use of these names,
              logos, and brands does not imply endorsement.
            </p>
          </Card>

          {/* Liability & Use */}
          <Card>
            <h2 className="text-2xl font-semibold">Liability & Use</h2>
            <p className="mt-2 text-slate-300">
              DigitalMeve is provided “as is”. We do not store your files on our servers and
              focus on tamper-evident markers embedded into supported formats. Users remain
              responsible for their content and compliance with applicable laws.
            </p>
          </Card>
        </div>

        {/* Footer links */}
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/security" className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm ring-1 ring-white/10 hover:bg-white/5">
            Security & Compliance
          </Link>
          <Link href="/developers" className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm ring-1 ring-white/10 hover:bg-white/5">
            Developers
          </Link>
        </div>
      </section>
    </main>
  );
}

/* --- Local UI helper --- */

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
      {children}
    </div>
  );
            }
