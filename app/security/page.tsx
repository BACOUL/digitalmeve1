// app/security/page.tsx
import {
  ShieldCheck,
  Lock,
  FileCheck,
  Eye,
  Database,
  Key,
  CheckCircle2,
} from "lucide-react";

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* HERO */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl text-gray-900">
            Security & Trust
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            DigitalMeve provides invisible, universal proof for your files —
            without storing or sharing your data. Every proof is based on open
            cryptography and verified instantly.
          </p>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-semibold text-gray-900">Our Principles</h2>
        <p className="mt-2 text-gray-600">
          Built with simplicity, transparency, and privacy at its core.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <ShieldCheck className="h-8 w-8 text-emerald-500" />
            <h3 className="mt-3 text-lg font-medium text-gray-900">No storage</h3>
            <p className="mt-2 text-gray-600">
              We never store your documents. The proof is embedded directly
              inside the file.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <Lock className="h-8 w-8 text-emerald-500" />
            <h3 className="mt-3 text-lg font-medium text-gray-900">
              Strong cryptography
            </h3>
            <p className="mt-2 text-gray-600">
              Every proof is generated with SHA-256 and public algorithms —
              industry standard.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <Eye className="h-8 w-8 text-emerald-500" />
            <h3 className="mt-3 text-lg font-medium text-gray-900">100% transparent</h3>
            <p className="mt-2 text-gray-600">
              Anyone can verify the integrity of a file — no account, no lock-in.
            </p>
          </div>
        </div>
      </section>

      {/* DETAILS */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-semibold text-gray-900">Technical details</h2>
        <p className="mt-2 text-gray-600">
          DigitalMeve is designed to be open, verifiable, and future-proof.
        </p>

        <ul className="mt-6 space-y-4 text-gray-700">
          <li className="flex items-start gap-3">
            <Database className="h-6 w-6 text-sky-500 mt-0.5" />
            <span>
              <strong>No external databases:</strong> everything happens in your
              browser or via our API.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Key className="h-6 w-6 text-sky-500 mt-0.5" />
            <span>
              <strong>Unique fingerprint:</strong> each file gets a SHA-256 hash,
              sealed with a .MEVE marker.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <FileCheck className="h-6 w-6 text-sky-500 mt-0.5" />
            <span>
              <strong>Readable documents:</strong> the file remains fully
              compatible (PDF, PNG, DOCX…).
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-6 w-6 text-sky-500 mt-0.5" />
            <span>
              <strong>Instant verification:</strong> drag and drop a file to
              check its authenticity anytime.
            </span>
          </li>
        </ul>
      </section>
    </main>
  );
}
