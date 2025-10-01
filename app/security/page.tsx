// app/security/page.tsx
import type { Metadata } from "next";
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
  ShieldAlert,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Security & Trust – DigitalMeve",
  description:
    "Privacy by design, on-device by default, and open cryptography. Learn how DigitalMeve protects integrity and authenticity without storing your files.",
};

export default function SecurityPage() {
  const toc = [
    { id: "principles", label: "Principles", icon: <ShieldCheck className="h-4 w-4" /> },
    { id: "disclaimer", label: "Legal disclaimer", icon: <ShieldAlert className="h-4 w-4" /> },
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
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      {/* HERO */}
      <section className="border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Security &amp; Trust
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-[var(--fg-muted)]">
            DigitalMeve provides invisible, universal proof for your files — without storing or sharing your data.
            Proofs are built on open cryptography and can be verified instantly, anywhere.
          </p>

          {/* Quick badges */}
          <div className="mt-6 flex flex-wrap gap-2 text-xs">
            <Badge>Privacy by design</Badge>
            <Badge>Zero document storage</Badge>
            <Badge>Built-in proof (PDF/DOCX)</Badge>
            <Badge>Offline verification</Badge>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
          {/* TOC */}
          <aside className="top-24 hidden lg:sticky lg:block">
            <nav aria-label="On this page" className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--fg-muted)]">
                On this page
              </p>
              {toc.map((t) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className="group flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-[var(--fg-muted)] hover:bg-white/5 hover:text-[var(--fg)]"
                >
                  {t.icon}
                  <span className="group-hover:underline">{t.label}</span>
                </a>
              ))}
            </nav>

            {/* Contact box */}
            <div className="mt-8 card p-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-[var(--accent-2)]" />
                <h4 className="text-sm font-semibold">Security contact</h4>
              </div>
              <p className="mt-2 text-xs text-[var(--fg-muted)]">
                Report a vulnerability:{" "}
                <a
                  href="mailto:security@digitalmeve.com"
                  className="underline hover:opacity-90"
                >
                  security@digitalmeve.com
                </a>
              </p>
            </div>
          </aside>

          {/* Content */}
          <div>
            {/* PRINCIPLES */}
            <Section
              id="principles"
              title="Our principles"
              icon={<ShieldCheck className="h-5 w-5 text-[var(--accent-1)]" />}
            >
              <div className="grid gap-6 sm:grid-cols-3">
                <Card
                  icon={<ShieldCheck className="h-8 w-8 text-[var(--accent-1)]" />}
                  title="No storage"
                  desc="We never store your documents. The proof lives inside the file, so it remains portable and readable."
                />
                <Card
                  icon={<Lock className="h-8 w-8 text-[var(--accent-1)]" />}
                  title="Open & strong crypto"
                  desc="SHA-256 fingerprints and open algorithms. No proprietary black boxes."
                />
                <Card
                  icon={<Eye className="h-8 w-8 text-[var(--accent-1)]" />}
                  title="Transparent verification"
                  desc="Anyone can verify authenticity. No account, no lock-in."
                />
              </div>
            </Section>

            {/* DISCLAIMER */}
            <Section
              id="disclaimer"
              title="Legal disclaimer"
              icon={<ShieldAlert className="h-5 w-5 text-[var(--accent-1)]" />}
            >
              <Callout
                title="Not legal advice — Not a legal proof by itself"
                items={[
                  "DigitalMeve is not a law firm and does not provide legal advice.",
                  "DigitalMeve is not a Qualified Trust Service Provider (QTSP) and does not issue Qualified Electronic Signatures (QES).",
                  "Any proof or verification artifact created with DigitalMeve does not, by itself, constitute legally binding evidence.",
                  "Admissibility and legal weight depend on applicable laws and context. Consult a qualified attorney.",
                ]}
              />
              <p className="mt-3 text-sm text-[var(--fg-muted)]">
                See <Link href="/terms" className="underline hover:opacity-90">Terms of Service</Link> and{" "}
                <Link href="/privacy" className="underline hover:opacity-90">Privacy Policy</Link>.
              </p>
            </Section>

            {/* SECURITY MODEL */}
            <Section
              id="model"
              title="Security model"
              icon={<Lock className="h-5 w-5 text-[var(--accent-1)]" />}
            >
              <ul className="space-y-3">
                <Bullet text={<><b>Built-in proof:</b> we embed a timestamped SHA-256 fingerprint inside the file. The file stays a valid PDF/DOCX.</>} />
                <Bullet text={<><b>Tamper-evident:</b> any single-byte change alters the fingerprint and fails verification.</>} />
                <Bullet text={<><b>Local by default:</b> for individuals, hashing runs in the browser — your content doesn’t leave your device.</>} />
                <Bullet text={<><b>Enterprise controls:</b> SLAs/DPA, SSO/SCIM, audit logs, and region pinning/on-prem (roadmap).</>} />
              </ul>
            </Section>

            {/* PRIVACY & DATA */}
            <Section
              id="privacy"
              title="Privacy & data handling"
              icon={<Eye className="h-5 w-5 text-[var(--accent-1)]" />}
            >
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="card p-5">
                  <h3 className="text-base font-semibold">Individuals (browser)</h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    <Line icon={<Database className="h-5 w-5 text-[var(--accent-2)]" />} text="No uploads of your content; hashing runs locally." />
                    <Line icon={<TimerReset className="h-5 w-5 text-[var(--accent-2)]" />} text="No retention: nothing is persisted on our servers." />
                    <Line icon={<FileCheck className="h-5 w-5 text-[var(--accent-2)]" />} text={<>The output is a <span className="font-mono">.meve.pdf</span> or a JSON proof you control.</>} />
                  </ul>
                </div>
                <div className="card p-5">
                  <h3 className="text-base font-semibold">Business (API)</h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    <Line icon={<Globe2 className="h-5 w-5 text-[var(--accent-2)]" />} text="You choose the mode: hash-only or file upload." />
                    <Line icon={<Lock className="h-5 w-5 text-[var(--accent-2)]" />} text="TLS in transit; encrypted storage only if/when strictly required (e.g., async bulk jobs)." />
                    <Line icon={<Bell className="h-5 w-5 text-[var(--accent-2)]" />} text="Webhooks signed with HMAC; audit logs available." />
                  </ul>
                </div>
              </div>

              <p className="mt-4 text-sm text-[var(--fg-muted)]">
                See our{" "}
                <Link href="/privacy" className="underline hover:opacity-90">
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link href="/terms" className="underline hover:opacity-90">
                  Terms of Service
                </Link>
                .
              </p>
            </Section>

            {/* CRYPTO */}
            <Section
              id="crypto"
              title="Cryptography details"
              icon={<Key className="h-5 w-5 text-[var(--accent-1)]" />}
            >
              <ul className="space-y-2">
                <Bullet icon={<Key className="h-5 w-5 text-[var(--accent-1)]" />} text="SHA-256 fingerprinting of the file content." />
                <Bullet icon={<FileCheck className="h-5 w-5 text-[var(--accent-1)]" />} text="Timestamp + issuer + optional metadata sealed into an embedded marker." />
                <Bullet icon={<CheckCircle2 className="h-5 w-5 text-[var(--accent-1)]" />} text="Verification recomputes the digest and compares with the embedded claim." />
              </ul>
              <p className="mt-3 text-sm text-[var(--fg-muted)]">
                Files remain valid PDFs/DOCX; the marker is human-readable via an exported certificate.
              </p>
            </Section>

            {/* DATA FLOW */}
            <Section
              id="flow"
              title="Data flow (overview)"
              icon={<Server className="h-5 w-5 text-[var(--accent-1)]" />}
            >
              <div className="card p-5">
                <ol className="list-decimal pl-5 text-sm space-y-2">
                  <li>
                    <b>Protect:</b> compute SHA-256 → embed marker → return{" "}
                    <span className="font-mono">.meve.pdf</span> or JSON proof.
                  </li>
                  <li>
                    <b>Share:</b> distribute the protected file via your usual channels (email, LMS, DMS…).
                  </li>
                  <li>
                    <b>Verify:</b> recompute digest → compare claims → display validity, issuer, timestamp, metadata.
                  </li>
                </ol>
                <p className="mt-3 text-xs text-[var(--fg-muted)]">
                  Diagram coming soon. For API flow, see{" "}
                  <Link href="/developers#endpoints" className="underline hover:opacity-90">
                    Developers → Endpoints
                  </Link>
                  .
                </p>
              </div>
            </Section>

            {/* COMPLIANCE */}
            <Section
              id="compliance"
              title="Compliance & enterprise"
              icon={<FileText className="h-5 w-5 text-[var(--accent-1)]" />}
            >
              <ul className="space-y-2">
                <li>
                  <b>DPA &amp; SLAs:</b> available for Business/Enterprise. Contact sales.
                </li>
                <li>
                  <b>SSO/SCIM:</b> supported for Enterprise (SSO now, SCIM roadmap).
                </li>
                <li>
                  <b>Region pinning / on-prem:</b> roadmap item; cloud by default.
                </li>
                <li>
                  <b>Subprocessors:</b> minimal and listed in Legal. No ad trackers.
                </li>
                <li>
                  <b>Audit:</b> changelog, signed webhooks, and internal controls.
                </li>
                <li>
                  <b>Standards:</b> SOC 2 Type II / ISO 27001 — on roadmap; we follow controls aligned with these standards.
                </li>
              </ul>

              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/contact" className="btn inline-flex items-center gap-2">
                  Request DPA &amp; SLAs <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/changelog" className="btn btn-ghost inline-flex items-center gap-2">
                  View changelog <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Section>

            {/* STATUS */}
            <Section
              id="status"
              title="Status & uptime"
              icon={<Activity className="h-5 w-5 text-[var(--accent-1)]" />}
            >
              <p>
                We aim for <b>99.9%+</b> uptime. Incidents and maintenance are posted on our status page.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/status" className="btn inline-flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800">
                  Status page <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/developers#status" className="btn btn-ghost inline-flex items-center gap-2">
                  API status endpoint <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </Section>

            {/* DISCLOSURE */}
            <Section
              id="disclosure"
              title="Responsible disclosure"
              icon={<Bug className="h-5 w-5 text-[var(--accent-1)]" />}
            >
              <p>
                Found a vulnerability? Please report it responsibly. We’ll acknowledge your report and keep you updated.
              </p>
              <ul className="mt-3 list-disc pl-5 text-sm space-y-1">
                <li>Do not access data that isn’t yours, degrade service, or affect other users.</li>
                <li>Give us reasonable time to remediate before public disclosure.</li>
                <li>We prioritize issues affecting confidentiality, integrity, and availability.</li>
              </ul>
              <p className="mt-4 text-sm text-[var(--fg-muted)]">
                Contact:{" "}
                <a href="mailto:security@digitalmeve.com" className="underline hover:opacity-90">
                  security@digitalmeve.com
                </a>
              </p>
            </Section>

            {/* FAQ */}
            <Section
              id="faq"
              title="Security FAQ"
              icon={<Info className="h-5 w-5 text-[var(--accent-1)]" />}
            >
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

            {/* Back to top */}
            <div className="mt-10">
              <a href="#principles" className="text-sm underline hover:opacity-90">
                Back to top
              </a>
            </div>
          </div>
        </div>
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
    <section id={id} className="scroll-mt-24 py-8">
      <div className="mb-4 flex items-center gap-2">
        {icon}
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      <div className="space-y-4 text-[var(--fg)]">{children}</div>
    </section>
  );
}

function Card({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="card p-6">
      {icon}
      <h3 className="mt-3 text-lg font-medium">{title}</h3>
      <p className="mt-2 text-[var(--fg-muted)]">{desc}</p>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-medium ring-1 ring-[var(--border)]">
      {children}
    </span>
  );
}

function Callout({
  title,
  items,
  icon,
}: {
  title: string;
  items: string[];
  icon?: React.ReactNode;
}) {
  return (
    <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5">
      <div className="flex items-center gap-2 text-emerald-700">
        {icon ?? <ShieldCheck className="h-5 w-5" />}
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
    <div className="card p-5">
      <h3 className="text-base font-semibold">{q}</h3>
      <p className="mt-2 text-sm text-[var(--fg-muted)]">{a}</p>
    </div>
  );
}

function Bullet({
  text,
  icon,
}: {
  text: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3 text-[var(--fg)]">
      {icon ?? <CheckCircle2 className="mt-0.5 h-5 w-5 text-[var(--accent-1)]" />}
      <span>{text}</span>
    </li>
  );
}

function Line({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-2">
      {icon}
      <span>{text}</span>
    </li>
  );
                }
