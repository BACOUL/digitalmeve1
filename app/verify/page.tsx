"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import { CTAButton } from "@/components/CTAButton";

type VerifyResult = {
  status: "valid" | "valid_document_missing" | "invalid";
  reason?: string;
  created_at?: string;
  doc?: {
    name?: string;
    mime?: string;
    size?: number;
    sha256: string;
  };
  issuer?: {
    name?: string;
    identity?: string;
    type?: "personal" | "pro" | "official";
    website?: string;
    verified_domain?: boolean;
  };
  meta?: Record<string, unknown>;
};

export default function VerifyPage() {
  // Un seul input suffit pour la plupart des cas :
  //  - document original (ex: .pdf, .png, .txt, etc.) -> preuve intégrée (meve_proof)
  //  - ou sidecar .meve.json -> vérification partielle
  // Optionnellement, on autorise un "original file" quand l’utilisateur charge un .meve.json
  const [proofOrFile, setProofOrFile] = useState<File | null>(null);
  const [original, setOriginal] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [result, setResult] = useState<VerifyResult | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setResult(null);

    if (!proofOrFile) {
      setErr("Please select a file (.pdf/.png with embedded proof OR a .meve.json).");
      return;
    }

    try {
      setLoading(true);

      const form = new FormData();
      form.append("file", proofOrFile);
      if (original) form.append("original", original);

      const res = await fetch("/api/proxy/verify", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        const t = await res.text().catch(() => "");
        throw new Error(t || "Verification failed.");
      }

      const data = (await res.json()) as VerifyResult;
      setResult(data);
    } catch (e: any) {
      setErr(e?.message ?? "Verification failed.");
    } finally {
      setLoading(false);
    }
  }

  const statusBadge = (s: VerifyResult["status"]) => {
    if (s === "valid")
      return (
        <span className="inline-flex items-center rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-300 border border-emerald-400/30">
          ✅ Valid
        </span>
      );
    if (s === "valid_document_missing")
      return (
        <span className="inline-flex items-center rounded-full bg-amber-400/10 px-2.5 py-1 text-xs font-medium text-amber-300 border border-amber-400/30">
          ⚠️ Valid (document missing)
        </span>
      );
    return (
      <span className="inline-flex items-center rounded-full bg-rose-400/10 px-2.5 py-1 text-xs font-medium text-rose-300 border border-rose-400/30">
        ❌ Invalid
      </span>
    );
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-100">Verify a proof</h1>
      <p className="mt-2 text-slate-400">
        Drop a verified file (e.g. <code className="text-slate-300">name.meve.pdf/png</code>) or a{" "}
        <code className="text-slate-300">.meve.json</code> sidecar. If you upload a sidecar, you may also provide
        the original file for full verification.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-300">File or Proof (.meve.json)</label>
            <FileDropzone onSelected={setProofOrFile} />
          </div>

          <div>
            <label className="text-sm text-slate-300">Original file (optional)</label>
            <FileDropzone onSelected={setOriginal} />
            <p className="mt-1 text-xs text-slate-500">
              Use this only if the first input is a <code>.meve.json</code> and you have the original.
            </p>
          </div>
        </div>

        <div>
          <CTAButton type="submit" disabled={loading} aria-label="Verify proof">
            {loading ? "Verifying…" : "Verify"}
          </CTAButton>
        </div>

        {err && <p className="text-sm text-rose-400">{err}</p>}

        {result && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-100">Result</h2>
              {statusBadge(result.status)}
            </div>

            {result.reason && (
              <p className="mt-2 text-sm text-slate-400">
                <span className="text-slate-300">Details:</span> {result.reason}
              </p>
            )}

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 p-4">
                <h3 className="text-sm font-medium text-slate-200">Document</h3>
                <ul className="mt-2 text-sm text-slate-400 space-y-1">
                  {result.doc?.name && (
                    <li>
                      <span className="text-slate-300">Name:</span> {result.doc.name}
                    </li>
                  )}
                  {result.doc?.mime && (
                    <li>
                      <span className="text-slate-300">MIME:</span> {result.doc.mime}
                    </li>
                  )}
                  {typeof result.doc?.size === "number" && (
                    <li>
                      <span className="text-slate-300">Size:</span> {result.doc.size} bytes
                    </li>
                  )}
                  {result.doc?.sha256 && (
                    <li className="break-all">
                      <span className="text-slate-300">SHA-256:</span> {result.doc.sha256}
                    </li>
                  )}
                </ul>
              </div>

              <div className="rounded-xl border border-white/10 p-4">
                <h3 className="text-sm font-medium text-slate-200">Issuer</h3>
                <ul className="mt-2 text-sm text-slate-400 space-y-1">
                  {result.issuer?.name && (
                    <li>
                      <span className="text-slate-300">Name:</span> {result.issuer.name}
                    </li>
                  )}
                  {result.issuer?.identity && (
                    <li className="break-all">
                      <span className="text-slate-300">Identity:</span> {result.issuer.identity}
                    </li>
                  )}
                  {result.issuer?.type && (
                    <li>
                      <span className="text-slate-300">Type:</span> {result.issuer.type}
                    </li>
                  )}
                  {result.issuer?.website && (
                    <li className="break-all">
                      <span className="text-slate-300">Website:</span> {result.issuer.website}
                    </li>
                  )}
                </ul>
              </div>
            </div>

            {result.created_at && (
              <p className="mt-4 text-xs text-slate-500">
                Created at: {new Date(result.created_at).toUTCString()}
              </p>
            )}
          </div>
        )}
      </form>
    </section>
  );
          }
