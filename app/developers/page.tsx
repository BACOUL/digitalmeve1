"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import {
  Copy,
  Check,
  BookOpen,
  ShieldCheck,
  Zap,
  ServerCog,
  Webhook,
  KeyRound,
  Info,
  ArrowRight,
  Terminal,
  FileCheck2,
} from "lucide-react";

/** Developers Docs — DigitalMeve (.MEVE) */
export default function DevelopersPage() {
  const sections = useMemo(
    () => [
      { id: "quickstart", label: "Quickstart", icon: <Zap className="h-4 w-4" /> },
      { id: "auth", label: "Authentication", icon: <KeyRound className="h-4 w-4" /> },
      { id: "endpoints", label: "Endpoints", icon: <ServerCog className="h-4 w-4" /> },
      { id: "webhooks", label: "Webhooks", icon: <Webhook className="h-4 w-4" /> },
      { id: "sdks", label: "SDKs & Snippets", icon: <Terminal className="h-4 w-4" /> },
      { id: "errors", label: "Errors & Limits", icon: <Info className="h-4 w-4" /> },
      { id: "security", label: "Security model", icon: <ShieldCheck className="h-4 w-4" /> },
    ],
    []
  );

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl text-gray-900">
              Developers{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-500">
                .MEVE Docs
              </span>
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Protect and verify documents at scale. Clean REST API, lightweight proofs, privacy-by-design.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/generate"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
              >
                Try in browser <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-sky-700 ring-1 ring-sky-200 hover:bg-sky-50"
              >
                Get API access <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* TOC */}
          <nav className="mt-10 grid gap-3 sm:grid-cols-3 lg:grid-cols-7">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="group inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 hover:bg-white"
              >
                {s.icon}
                <span className="group-hover:text-gray-900">{s.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-10">
        {/* Quickstart */}
        <Section id="quickstart" title="Quickstart" icon={<BookOpen className="h-5 w-5 text-emerald-600" />}>
          <p className="text-gray-600">
            The <span className="font-semibold text-gray-800">.MEVE</span> proof embeds a timestamped fingerprint
            inside a standard file (PDF/DOCX). Files remain fully readable and portable. Start with a sandbox key and
            protect your first document in minutes.
          </p>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <CodeBlock
              label="cURL — Protect"
              lang="bash"
              code={`curl -X POST https://api.digitalmeve.com/v1/proof \\
  -H "Authorization: Bearer $MEVE_API_KEY" \\
  -F "file=@/path/to/document.pdf" \\
  -F "issuer=acme-inc" \\
  -F "metadata={\\"case\\":\\"onboarding-42\\"}" \\
  --output protected.meve.pdf`}
            />
            <CodeBlock
              label="JavaScript — Verify"
              lang="js"
              code={`import fetch from "node-fetch";

const res = await fetch("https://api.digitalmeve.com/v1/verify", {
  method: "POST",
  headers: { Authorization: \`Bearer \${process.env.MEVE_API_KEY}\` },
  body: createFormData({ file: fs.createReadStream("protected.meve.pdf") })
});

const result = await res.json();
console.log(result.valid, result.fingerprint, result.timestamp);`}
            />
            <CodeBlock
              label="Python — Verify"
              lang="python"
              code={`import requests

with open("protected.meve.pdf", "rb") as f:
    r = requests.post(
        "https://api.digitalmeve.com/v1/verify",
        headers={"Authorization": f"Bearer {MEVE_API_KEY}"},
        files={"file": ("protected.meve.pdf", f, "application/pdf")},
    )
print(r.json())`}
            />
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Need a sandbox key?{" "}
            <Link href="/contact" className="text-sky-700 hover:underline">
              Request access →
            </Link>
          </div>
        </Section>

        {/* Auth */}
        <Section id="auth" title="Authentication" icon={<KeyRound className="h-5 w-5 text-emerald-600" />}>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>Use <code className="font-mono text-sm text-gray-800">Authorization: Bearer &lt;API_KEY&gt;</code>.</li>
            <li>Rotate keys regularly. Keep them out of client-side code.</li>
            <li>Sandbox and production keys are distinct.</li>
          </ul>
        </Section>

        {/* Endpoints */}
        <Section id="endpoints" title="Endpoints" icon={<ServerCog className="h-5 w-5 text-emerald-600" />}>
          <div className="rounded-2xl border border-gray-200 bg-white p-5">
            <h3 className="text-base font-semibold text-gray-900">POST /v1/proof — Protect a document</h3>
            <p className="mt-2 text-sm text-gray-600">
              Returns a <span className="font-mono">.meve.pdf</span> or a standalone JSON proof.
            </p>
            <ul className="mt-3 text-sm text-gray-700 space-y-1">
              <li>
                <b>Body (multipart/form-data)</b> — <code className="font-mono">file</code> (required),{" "}
                <code className="font-mono">issuer</code> (optional),{" "}
                <code className="font-mono">metadata</code> (JSON, optional),{" "}
                <code className="font-mono">mode</code> = <code>embed|json</code> (default <code>embed</code>).
              </li>
              <li><b>Response</b> — <i>binary</i> (<code>.meve.pdf</code>) or <i>application/json</i> (proof).</li>
            </ul>
            <CodeBlock
              className="mt-4"
              lang="bash"
              code={`curl -X POST https://api.digitalmeve.com/v1/proof \\
  -H "Authorization: Bearer $MEVE_API_KEY" \\
  -F "file=@/path/file.pdf" \\
  -F "issuer=acme-inc" \\
  -F "metadata={\\"case\\":\\"onboarding-42\\"}" \\
  -F "mode=embed" \\
  --output protected.meve.pdf`}
            />
          </div>

          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
            <h3 className="text-base font-semibold text-gray-900">POST /v1/verify — Verify a document</h3>
            <p className="mt-2 text-sm text-gray-600">Checks existence, integrity and authenticity.</p>
            <CodeBlock
              className="mt-4"
              lang="bash"
              code={`curl -X POST https://api.digitalmeve.com/v1/verify \\
  -H "Authorization: Bearer $MEVE_API_KEY" \\
  -F "file=@protected.meve.pdf"`}
            />
            <div className="mt-3 rounded-lg bg-gray-50 p-3 text-xs text-gray-700">
              <p className="font-mono">200 OK</p>
              <pre className="mt-2 overflow-x-auto">{`{
  "valid": true,
  "fingerprint": "sha256-9f7a…c2",
  "timestamp": "2025-08-12T09:24:13Z",
  "issuer": "acme-inc",
  "metadata": {"case":"onboarding-42"},
  "reason": null
}`}</pre>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
            <h3 className="text-base font-semibold text-gray-900">GET /v1/status — API status</h3>
            <p className="mt-2 text-sm text-gray-600">Service health & current version.</p>
            <div className="mt-3 rounded-lg bg-gray-50 p-3 text-xs text-gray-700">
              <p className="font-mono">200 OK</p>
              <pre className="mt-2 overflow-x-auto">{`{"status":"ok","uptime":"99.99%","version":"2025.9.0"}`}</pre>
            </div>
          </div>
        </Section>

        {/* Webhooks */}
        <Section id="webhooks" title="Webhooks" icon={<Webhook className="h-5 w-5 text-emerald-600" />}>
          <p className="text-gray-600">
            Receive events for asynchronous processing (e.g., bulk verification). We sign payloads with an HMAC secret.
          </p>
          <ul className="mt-3 list-disc pl-5 text-sm text-gray-700 space-y-1">
            <li>Header <code className="font-mono">X-Meve-Signature</code> contains a timestamp and signature.</li>
            <li>Compute HMAC-SHA256 over the raw body with your webhook secret; compare in constant time.</li>
          </ul>
          <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-5">
            <h4 className="font-semibold text-gray-900">Event: <span className="font-mono">verify.completed</span></h4>
            <div className="mt-3 rounded-lg bg-gray-50 p-3 text-xs text-gray-700">
              <pre className="overflow-x-auto">{`{
  "id":"evt_01H...",
  "type":"verify.completed",
  "created":"2025-09-12T08:30:12Z",
  "data":{
    "valid":true,
    "fingerprint":"sha256-9f7a…c2",
    "issuer":"acme-inc",
    "metadata":{"case":"onboarding-42"}
  }
}`}</pre>
            </div>
          </div>
        </Section>

        {/* SDKs & Snippets */}
        <Section id="sdks" title="SDKs & Snippets" icon={<Terminal className="h-5 w-5 text-emerald-600" />}>
          <p className="text-gray-600">Use our REST API directly or the lightweight SDK clients.</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <CodeBlock
              label="Node.js (fetch)"
              lang="js"
              code={`import fs from "node:fs";
import fetch from "node-fetch";
import FormData from "form-data";

const form = new FormData();
form.append("file", fs.createReadStream("doc.pdf"));
form.append("issuer", "acme-inc");

const res = await fetch("https://api.digitalmeve.com/v1/proof", {
  method: "POST",
  headers: { Authorization: \`Bearer \${process.env.MEVE_API_KEY}\` },
  body: form
});
if (!res.ok) throw new Error(await res.text());
fs.writeFileSync("doc.meve.pdf", Buffer.from(await res.arrayBuffer()));`}
            />
            <CodeBlock
              label="Python (requests)"
              lang="python"
              code={`import requests

files = {"file": ("doc.pdf", open("doc.pdf","rb"), "application/pdf")}
data = {"issuer": "acme-inc", "mode": "embed"}

r = requests.post(
    "https://api.digitalmeve.com/v1/proof",
    headers={"Authorization": f"Bearer {MEVE_API_KEY}"},
    files=files, data=data
)
open("doc.meve.pdf","wb").write(r.content)`}
            />
            <CodeBlock
              label="cURL (JSON proof)"
              lang="bash"
              code={`curl -X POST https://api.digitalmeve.com/v1/proof \\
  -H "Authorization: Bearer $MEVE_API_KEY" \\
  -F "file=@doc.pdf" -F "mode=json" | jq`}
            />
          </div>
        </Section>

        {/* Errors & Limits */}
        <Section id="errors" title="Errors & Limits" icon={<Info className="h-5 w-5 text-emerald-600" />}>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <h3 className="text-base font-semibold text-gray-900">Error model</h3>
              <div className="mt-3 rounded-lg bg-gray-50 p-3 text-xs text-gray-700">
                <pre className="overflow-x-auto">{`{
  "error": {
    "type": "invalid_request",
    "message": "file is required",
    "param": "file",
    "code": "missing_file"
  }
}`}</pre>
              </div>
              <ul className="mt-3 text-sm text-gray-700 space-y-1">
                <li><span className="font-mono">400</span> invalid request · <span className="font-mono">401</span> unauthorized · <span className="font-mono">429</span> rate limited · <span className="font-mono">5xx</span> server.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <h3 className="text-base font-semibold text-gray-900">Rate limits</h3>
              <ul className="mt-3 text-sm text-gray-700 space-y-1">
                <li>Starter: standard limits suitable for pilots.</li>
                <li>Growth: higher limits and concurrency.</li>
                <li>Enterprise: custom SLAs and quotas.</li>
              </ul>
              <p className="mt-2 text-xs text-gray-500">Actual quotas are shown in your dashboard.</p>
            </div>
          </div>
        </Section>

        {/* Security model */}
        <Section id="security" title="Security model" icon={<ShieldCheck className="h-5 w-5 text-emerald-600" />}>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li>
              <span className="font-semibold">Privacy-by-design:</span> individuals run fully in-browser; no file upload
              to our servers for personal use.
            </li>
            <li>
              <span className="font-semibold">Built-in proof:</span> the marker lives inside the file; documents remain
              readable and portable (PDF/DOCX).
            </li>
            <li>
              <span className="font-semibold">Verification anywhere:</span> check on our Verify page or with open tooling;
              even offline with local hashing.
            </li>
            <li>
              <span className="font-semibold">Integrity:</span> any single-byte change alters the fingerprint and fails
              verification.
            </li>
            <li>
              <span className="font-semibold">Enterprise controls:</span> SLAs/DPA, SSO/SCIM, region pinning/on-prem (roadmap).
            </li>
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/verify"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              <FileCheck2 className="h-4 w-4" />
              Verify a file
            </Link>
            <Link
              href="/security"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-sky-700 ring-1 ring-sky-200 hover:bg-sky-50"
            >
              Security & Compliance
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Section>
      </div>
    </main>
  );
}

/* ---------- Reusable presentation components ---------- */

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

function CodeBlock({
  code,
  lang,
  label,
  className,
}: {
  code: string;
  lang: "bash" | "js" | "python" | "json" | "ts";
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  }, [code]);

  return (
    <div className={`relative rounded-xl border border-gray-200 bg-white p-0.5 ${className || ""}`}>
      <div className="flex items-center justify-between rounded-t-[11px] bg-gray-50 px-3 py-2">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <span className="rounded bg-white px-2 py-0.5 font-mono text-[10px] ring-1 ring-gray-200">{lang}</span>
          {label && <span className="text-gray-700">{label}</span>}
        </div>
        <button
          onClick={onCopy}
          className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-gray-700 ring-1 ring-gray-200 hover:bg-white"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-3 text-xs leading-relaxed text-gray-800">
        <code>{code}</code>
      </pre>
    </div>
  );
      }
