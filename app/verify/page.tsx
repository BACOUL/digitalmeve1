// app/verify/page.tsx
"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import { CTAButton } from "@/components/CTAButton";
import { ShieldCheck, ShieldX, Info, Copy, ChevronDown, ChevronRight } from "lucide-react";

type VerifyResult = {
  ok: boolean;
  reason?: string;
  created_at?: string;
  version?: string;
  proof?: any; // payload complet (on l’affiche en “Technical details”)
  doc?: {
    name?: string;
    mime?: string;
    size?: number;
    sha256?: string;
  };
  issuer?: {
    name?: string;
    identity?: string;
    type?: "personal" | "pro" | "official";
    website?: string;
    verified_domain?: boolean;
  };
};

export default function VerifyPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [res, setRes] = useState<VerifyResult | null>(null);
  const [showRaw, setShowRaw] = useState(false);
  const [copied, setCopied] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setRes(null);
    setShowRaw(false);
    setCopied(false);

    if (!file) {
      setErr("Please select a file or an HTML certificate first.");
      return;
    }

    try {
      setLoading(true);
      const form = new FormData();
      form.append("file", file);

      const r = await fetch("/api/proxy/verify", { method: "POST", body: form });
      if (!r.ok) {
        const t = await r.text().catch(() => "");
        throw new Error(t || "Verification failed.");
      }
      const data = (await r.json()) as any;

      // Normalisation minimale pour l’affichage
      const normalized: VerifyResult = {
        ok: !!data.ok,
        reason: data.reason,
        created_at: data.created_at ?? data.createdAt,
        version: data.version,
        proof: data.proof ?? data, // on garde tout pour le panneau “Technical details”
        doc: data.doc,
        issuer: data.issuer,
      };
      setRes(normalized);
    } catch (e: any) {
      setErr(e?.message ?? "Verification failed.");
    } finally {
      setLoading(false);
    }
  }

  function copyRaw() {
    if (!res?.proof) return;
    navigator.clipboard.writeText(JSON.stringify(res.proof, null, 2)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  }

  const doc = res?.doc ?? {};
  const issuer = res?.issuer ?? {};
  const createdAt = res?.created_at ?? "";

  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-100">Verify a .MEVE proof</h1>
      <p className="mt-2 text-slate-400">
        Drop a verified file (<code className="text-slate-300">name.meve.pdf/png</code>) or an{" "}
        <span className="text-slate-200">HTML certificate</span> (<code className="text-slate-300">.html</code>). We’ll
        validate integrity and authenticity.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <div>
          <label className="text-sm text-slate-300">File or HTML certificate</label>
          <FileDropzone
            onSelected={setFile}
            accept=".html,.htm,.pdf,.png,.jpg,.jpeg,application/pdf,image/*,text/html"
            label="Choose a file or an HTML certificate"
          />
        </div>

        <div>
          <CTAButton type="submit" disabled={loading} aria-label="Verify proof">
            {loading ? "Verifying…" : "Verify"}
          </CTAButton>
        </div>

        {err && <p className="text-sm text-rose-400">{err}</p>}
      </form>

      {res && (
        <div className="mt-10 space-y-6">
          {/* Banner status */}
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-4">
            {res.ok ? (
              <>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400/15">
                  <ShieldCheck className="h-5 w-5 text-emerald-300" />
                </div>
                <div>
                  <p className="font-medium text-emerald-300">Valid proof</p>
                  {res.reason && <p className="text-sm text-slate-400">{res.reason}</p>}
                </div>
              </>
            ) : (
              <>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-400/15">
                  <ShieldX className="h-5 w-5 text-rose-300" />
                </div>
                <div>
                  <p className="font-medium text-rose-300">Invalid proof</p>
                  {res.reason && <p className="text-sm text-slate-400">{res.reason}</p>}
                </div>
              </>
            )}
          </div>

          {/* 3 cards grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Document</p>
              <div className="mt-2 space-y-1 text-sm">
                <p className="truncate">
                  <span className="text-slate-400">Name:</span>{" "}
                  <span className="text-slate-200">{doc.name || "—"}</span>
                </p>
                <p>
                  <span className="text-slate-400">Type:</span>{" "}
                  <span className="text-slate-200">{doc.mime || "—"}</span>
                </p>
                <p className="break-all">
                  <span className="text-slate-400">SHA-256:</span>{" "}
                  <span className="text-slate-200">{doc.sha256 || "—"}</span>
                </p>
                {typeof doc.size === "number" && (
                  <p>
                    <span className="text-slate-400">Size:</span>{" "}
                    <span className="text-slate-200">{doc.size} B</span>
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Issuer</p>
              <div className="mt-2 space-y-1 text-sm">
                <p>
                  <span className="text-slate-400">Name:</span>{" "}
                  <span className="text-slate-200">{issuer.name || "—"}</span>
                </p>
                <p className="break-all">
                  <span className="text-slate-400">Identity:</span>{" "}
                  <span className="text-slate-200">{issuer.identity || "—"}</span>
                </p>
                <p>
                  <span className="text-slate-400">Type:</span>{" "}
                  <span className="text-slate-200">{issuer.type || "—"}</span>
                </p>
                <p>
                  <span className="text-slate-400">Verified domain:</span>{" "}
                  <span className="text-slate-200">{issuer.verified_domain ? "Yes" : "No"}</span>
                </p>
                {issuer.website && (
                  <p className="break-all">
                    <span className="text-slate-400">Website:</span>{" "}
                    <span className="text-slate-200">{issuer.website}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">Metadata</p>
              <div className="mt-2 space-y-1 text-sm">
                <p>
                  <span className="text-slate-400">Version:</span>{" "}
                  <span className="text-slate-200">{res.version || "—"}</span>
                </p>
                <p>
                  <span className="text-slate-400">Created at:</span>{" "}
                  <span className="text-slate-200">{createdAt || "—"}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Technical details (JSON) */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60">
            <button
              onClick={() => setShowRaw((v) => !v)}
              className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-white/5"
            >
              <span className="inline-flex items-center gap-2 text-sm text-slate-200">
                <Info className="h-4 w-4" /> Technical details (JSON)
              </span>
              {showRaw ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
            {showRaw && (
              <div className="space-y-3 px-4 pb-4">
                <pre className="max-h-80 overflow-auto rounded-xl border border-white/10 bg-black/30 p-3 text-xs text-slate-200">
{JSON.stringify(res.proof ?? {}, null, 2)}
                </pre>
                <button
                  onClick={copyRaw}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs hover:bg-white/10"
                >
                  <Copy className="h-4 w-4" />
                  {copied ? "Copied!" : "Copy JSON"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
