"use client";

import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  FileCheck,
  Eye,
  Database,
  Key,
  CheckCircle2,
  Server,
  Globe2,
  Bug,
  TimerReset,
  Activity,
  FileText,
  Bell,
  ArrowRight,
  Info,
} from "lucide-react";

export default function SecurityPage() {
  const toc = [
    { id: "principles", label: "Principles", icon: <ShieldCheck className="h-4 w-4" /> },
    { id: "model", label: "Security model", icon: <Lock className="h-4 w-4" /> },
    { id: "privacy", label: "Privacy & data", icon: <Eye className="h-4 w-4" /> },
    { id: "crypto", label: "Cryptography", icon: <Key className="h-4 w-4" /> },
    { id: "flow", label: "Data flow", icon: <Server className="h-4 w-4" /> },
    { id: "compliance", label: "Compliance", icon: <FileText className="h-4 w-4" /> },
    { id: "status", label: "Status & uptime", icon: <Activity className="h-4 w-4" /> },
    { id: "disclosure", label: "Responsible disclosure", icon: <Bug className="h-4 w-4" /> },
    { id: "faq", label: "FAQ", icon: <Info className="h-4 w-4" /> },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* HERO */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl text-gray-900">
            Security & Trust
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-gray-600">
            DigitalMeve provides invisible, universal proof for your files — without storing or sharing your data.
            Proofs are built on open cryptography and can be verified instantly, anywhere.
          </p>

          {/* Quick links / badges */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Badge>Privacy by design</Badge>
            <Badge>Zero document storage</Badge>
            <Badge>Built-in proof (PDF/DOCX)</Badge>
            <Badge>Offline verification</Badge>
          </div>

          {/* TOC */}
          <nav className="mt-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-9">
            {toc.map((t) => (
              <a
                key={t.id}
                href={`#${t.id}`}
                className="group inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 hover:bg-white"
              >
                {t.icon}
                <span className="group-hover:text-gray-900">{t.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-14">
        {/* PRINCIPLES */}
        <Section id="principles" title="Our principles" icon={<ShieldCheck className="h-5 w-5 text-emerald-600" />}>
          <div className="grid gap-6 sm:grid-cols-3">
            <Card
              icon={<ShieldCheck className="h-8 w-8 text-emerald-600" />}
              title="No storage"
              desc="We never store your documents. The proof lives inside the file, so it remains portable and readable."
            />
            <Card
              icon={<Lock className="h-8 w-8 text-emerald-600" />}
              title="Open & strong crypto"
              desc="SHA-256 fingerprints and open algorithms. No proprietary black boxes."
            />
            <Card
              icon={<Eye className="h-8 w-8 text-emerald-600" />}
              title="Transparent verification"
              desc="Anyone can verify authenticity. No account, no lock-in."
            />
          </div>
        </Section>

        {/* SECURITY MODEL */}
        <Section id="model" title="Security model" icon={<Lock className="h-5 w-5 text-emerald-600" />}>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
              <span><b>Built-in proof:</b> we embed a timestamped fingerprint inside the file. The file stays a valid PDF/DOCX.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
              <span><b>Tamper-evident:</b> any single-byte change alters the fingerprint and fails verification.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
              <span><b>Local by default:</b> for individuals, hashing runs in the browser — your content doesn’t leave your device.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
              <span><b>Enterprise controls:</b> SLAs/DPA, SSO/SCIM, audit logs, webhooks, and region pinning/on-prem (roadmap).</span>
            </li>
          </ul>

          <Callout
            title="Threat model (high level)"
            icon={<ShieldCheck className="h-5 w-5 text-emerald-600" />}
            items={[
              "Integrity: detect any post-issuance modification of a document.",
              "Authenticity: bind an issuer identifier and optional metadata.",
              "Replay/Impersonation: proofs include timestamps and issuer context.",
            ]}
          />
        </Section>

        {/* PRIVACY & DATA */}
        <Section id="privacy" title="Privacy & data handling" icon={<Eye className="h-5 w-5 text-emerald-600" />}>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <h3 className="text-base font-semibold text-gray-900">Individuals (browser)</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2"><Database className="mt-0.5 h-5 w-5 text-sky-600" /> No uploads of your content; hashing runs locally.</li>
                <li className="flex items-start gap-2"><TimerReset className="mt-0.5 h-5 w-5 text-sky-600" /> No retention: nothing is persisted on our servers.</li>
                <li className="flex items-start gap-2"><FileCheck className="mt-0.5 h-5 w-5 text-sky-600" /> The output is a <span className="font-mono">.meve.pdf</span> or a JSON proof you control.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <h3 className="text-base font-semibold text-gray-900">Business (API)</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2"><Globe2 className="mt-0.5 h-5 w-5 text-sky-600" /> You choose the mode: hash-only or file upload.</li>
                <li className="flex items-start gap-2"><Lock className="mt-0.5 h-5 w-5 text-sky-600" /> TLS in transit; encrypted storage only if/when strictly required (e.g., async bulk jobs).</li>
                <li className="flex items-start gap-2"><Bell className="mt-0.5 h-5 w-5 text-sky-600" /> Webhooks signed with HMAC; audit logs available.</li>
              </ul>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            See our <Link href="/legal" className="text-sky-700 hover:underline">Legal & Privacy</Link> for details and DPA.
          </div>
        </Section>

        {/* CRYPTO */}
        <Section id="crypto" title="Cryptography details" icon={<Key className="h-5 w-5 text-emerald-600" />}>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2"><Key className="mt-0.5 h-5 w-5 text-emerald-600" /> SHA-256 fingerprinting of the file content.</li>
            <li className="flex items-start gap-2"><FileCheck className="mt-0.5 h-5 w-5 text-emerald-600" /> Timestamp + issuer + optional metadata sealed into an embedded marker.</li>
            <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" /> Verification recomputes the digest and compares with the embedded claim.</li>
          </ul>
          <p className="mt-3 text-sm text-gray-600">
            Files remain valid PDFs/DOCX; the marker is human-readable via an exported certificate.
          </p>
        </Section>

        {/* DATA FLOW */}
        <Section id="flow" title="Data flow (overview)" icon={<Server className="h-5 w-5 text-emerald-600" />}>
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2">
              <li><b>Protect:</b> compute SHA-256 → embed marker → return <span className="font-mono">.meve.pdf</span> or JSON proof.</li>
              <li><b>Share:</b> distribute the protected file via your usual channels (email, LMS, DMS…).</li>
              <li><b>Verify:</b> recompute digest → compare claims → display validity, issuer, timestamp, metadata.</li>
            </ol>
            <p className="mt-3 text-xs text-gray-500">
              Diagram coming soon. For API flow, see <Link href="/developers#endpoints" className="text-sky-700 hover:underline">Developers → Endpoints</Link>.
            </p>
          </div>
        </Section>

        {/* COMPLIANCE */}
        <Section id="compliance" title="Compliance & enterprise" icon={<FileText className="h-5 w-5 text-emerald-600" />}>
          <ul className="space-y-2 text-gray-700">
            <li><b>DPA & SLAs:</b> available for Business/Enterprise. Contact sales.</li>
            <li><b>SSO/SCIM:</b> supported for Enterprise (SSO now, SCIM roadmap).</li>
            <li><b>Region pinning / on-prem:</b> roadmap item; cloud by default.</li>
            <li><b>Subprocessors:</b> minimal and listed in Legal. No ad trackers.</li>
            <li><b>Audit:</b> changelog, signed webhooks, and internal controls.</li>
            <li><b>Standards:</b> SOC 2 Type II / ISO 27001 — on roadmap; we follow controls aligned with these standards.</li>
          </ul>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
            >
              Request DPA & SLAs <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/changelog"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-sky-700 ring-1 ring-sky-200 hover:bg-sky-50"
            >
              View changelog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Section>

        {/* STATUS */}
        <Section id="status" title="Status & uptime" icon={<Activity className="h-5 w-5 text-emerald-600" />}>
          <p className="text-gray-700">
            We aim for <b>99.9%+</b> uptime. Incidents and maintenance are posted on our status page.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/status"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Status page
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/developers#status"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-sky-700 ring-1 ring-sky-200 hover:bg-sky-50"
            >
              API status endpoint
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Section>

        {/* DISCLOSURE */}
        <Section id="disclosure" title="Responsible disclosure" icon={<Bug className="h-5 w-5 text-emerald-600" />}>
          <p className="text-gray-700">
            Found a vulnerability? Please report it responsibly. We’ll acknowledge your report and keep you updated.
          </p>
          <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 space-y-1">
            <li>Do not access data that isn’t yours, degrade service, or affect other users.</li>
            <li>Give us reasonable time to remediate before public disclosure.</li>
            <li>We prioritize issues affecting confidentiality, integrity, and availability.</li>
          </ul>
          <div className="mt-4 text-sm text-gray-600">
            Contact: <a href="mailto:security@digitalmeve.com" className="text-sky-700 hover:underline">security@digitalmeve.com</a>
          </div>
        </Section>

        {/* FAQ */}
        <Section id="faq" title="Security FAQ" icon={<Info className="h-5 w-5 text-emerald-600" />}>
          <div className="grid gap-6 md:grid-cols-2">
            <QA
              q="Do you store my documents?"
              a="No. For individual use, everything runs locally in your browser. For Business API, you can choose hash-only mode."
            />
            <QA
              q="Can anyone verify a .MEVE file?"
              a="Yes. Files remain valid PDFs/DOCX. Anyone can verify online on our Verify page or offline with open tooling."
            />
            <QA
              q="What happens if the file changes?"
              a="Even a one-byte change alters the SHA-256 fingerprint. Verification will fail and report tampering."
            />
            <QA
              q="Do you support enterprise controls?"
              a="Yes. SLAs/DPA, SSO/SCIM, audit logs, and region pinning/on-prem (roadmap) are available for Enterprise."
            />
          </div>
        </Section>
      </div>
    </main>
  );
}

/* ---------------- Reusable UI bits ---------------- */

function Section({
  id,
  title,
  icon,
  children,
}: {
  id: string;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-10">
      <div className="mb-4 flex items-center gap-2">
        {icon}
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Card({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {icon}
      <h3 className="mt-3 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600">{desc}</p>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200">
      {children}
    </span>
  );
}

function Callout({
  title,
  icon,
  items,
}: {
  title: string;
  icon?: React.ReactNode;
  items: string[];
}) {
  return (
    <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
      <div className="flex items-center gap-2 text-emerald-700">
        {icon}
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
      <ul className="mt-2 list-disc pl-5 text-sm text-emerald-800 space-y-1">
        {items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

function QA({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <h3 className="text-base font-semibold text-gray-900">{q}</h3>
      <p className="mt-2 text-sm text-gray-600">{a}</p>
    </div>
  );
              }
