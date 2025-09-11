// app/verify/page.tsx
"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import { CTAButton } from "@/components/CTAButton";
import ProgressBar from "@/components/ProgressBar";
import {
  ShieldCheck,
  TriangleAlert,
  XCircle,
  Hash,
  FileCheck2,
  Globe,
  User2,
} from "lucide-react";

type VerifyStatus = "valid" | "valid_document_missing" | "invalid";
type VerifyResult = {
  status: VerifyStatus;
  reason?: string;
  created_at?: string;
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
  meta?: Record<string, unknown>;
};

export default function VerifyPage() {
  const [proofOrFile, setProofOrFile] = useState<File | null>(null);
  const [original, setOriginal] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [uploadPct, setUploadPct] = useState<number | undefined>(undefined);
  const [err, setErr] = useState<string | null>(null);
  const [result, setResult] = useState<VerifyResult | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setResult(null);
    setUploadPct(undefined);

    if (!proofOrFile) {
      setErr("Please select a file (.meve.pdf/.png or a .meve.html/.meve.json).");
      return;
    }

    // Prépare la requête multipart
    const form = new FormData();
    form.append("file", proofOrFile);
    if (original) form.append("original", original);

    setLoading(true);

    try {
      // XHR pour la progression d’upload
      const xhr = new XMLHttpRequest();
      const data = await new Promise<VerifyResult>((resolve, reject) => {
        xhr.open("POST", "/api/proxy/verify", true);
        xhr.responseType = "json";

        xhr.upload.onprogress = (ev) => {
          if (ev.lengthComputable) {
            setUploadPct(Math.round((ev.loaded / ev.total) * 100));
          }
        };
        xhr.onloadstart = () => setUploadPct(0);
        xhr.onerror = () => reject(new Error("Network error"));
        xhr.ontimeout = () => reject(new Error("Request timeout"));
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            // Si le body n’est pas auto-parsé, on tente manuellement
            const res =
              xhr.response ??
              (typeof xhr.responseText === "string"
                ? (JSON.parse(xhr.responseText) as VerifyResult)
                : null);
            if (!res) return reject(new Error("Invalid server response."));
            resolve(res);
          } else {
            const text =
              typeof xhr.responseText === "string" && xhr.responseText
                ? xhr.responseText
                : "Verification failed.";
            reject(new Error(text));
          }
        };

        xhr.send(form);
      });

      setResult(data);
    } catch (e: any) {
      setErr(e?.message ?? "Verification failed.");
    } finally {
      setLoading(false);
      setUploadPct(undefined);
    }
  }

  function StatusPill({ s }: { s: VerifyStatus }) {
    if (s === "valid")
      return (
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
          <ShieldCheck className="h-4 w-4" />
          Valid
        </span>
      );
    if (s === "valid_document_missing")
      return (
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-2.5 py-1 text-xs font-medium text-amber-300">
          <TriangleAlert className="h-4 w-4" />
          Valid (document missing)
        </span>
      );
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-rose-400/40 bg-rose-400/10 px-2.5 py-1 text-xs font-medium text-rose-300">
        <XCircle className="h-4 w-4" />
        Invalid
      </span>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-100">Verify a proof</h1>
      <p className="mt-2 text-slate-400">
        Drop a verified file (<code className="text-slate-300">name.meve.pdf/png</code>) or a{" "}
        <code className="text-slate-300">.meve.html</code> (or legacy <code>.meve.json</code>). If you upload a sidecar proof,
        you may also provide the original file for full verification.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-300">File or Proof</label>
            <FileDropzone
              onSelected={setProofOrFile}
              accept=".pdf,.png,.jpg,.jpeg,.meve.html,.html,.json,application/pdf,image/png,image/jpeg,text/html,application/json"
              maxSizeMB={100}
              label="Choose verified file or proof"
            />
          </div>

          <div>
            <label className="text-sm text-slate-300">Original file (optional)</label>
            <FileDropzone
              onSelected={setOriginal}
              accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
              maxSizeMB={100}
              label="Attach original only if first input is a sidecar proof"
            />
            <p className="mt-1 text-xs text-slate-500">
              Use this only if the first input is a proof (<code>.meve.html</code> or legacy <code>.meve.json</code>) and
              you have the original document.
            </p>
          </div>
        </div>

        <div className="w-full sm:w-auto">
          <CTAButton type="submit" disabled={loading} aria-label="Verify proof">
            {loading ? "Verifying…" : "Verify"}
          </CTAButton>
          {loading && <ProgressBar value={uploadPct} />}
        </div>

        {err && <p className="text-sm text-rose-400">{err}</p>}

        {result && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-100">Result</h2>
              <StatusPill s={result.status} />
            </div>

            {result.reason && (
              <p className="mt-2 text-sm text-slate-400">
                <span className="text-slate-300">Details:</span> {result.reason}
              </p>
            )}

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {/* Document */}
              <div className="rounded-xl border border-white/10 p-4">
                <h3 className="text-sm font-medium text-slate-200 flex items-center gap-2">
                  <FileCheck2 className="h-4 w-4" /> Document
                </h3>
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
                    <li className="break-all inline-flex items-center gap-2">
                      <Hash className="h-4 w-4" />
                      <span className="text-slate-300">SHA-256:</span> {result.doc.sha256}
                    </li>
                  )}
                </ul>
              </div>

              {/* Issuer */}
              <div className="rounded-xl border border-white/10 p-4">
                <h3 className="text-sm font-medium text-slate-200 flex items-center gap-2">
                  <User2 className="h-4 w-4" /> Issuer
                </h3>
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
                    <li className="break-all inline-flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <span className="text-slate-300">Website:</span> {result.issuer.website}
                    </li>
                  )}
                  {typeof result.issuer?.verified_domain === "boolean" && (
                    <li>
                      <span className="text-slate-300">Verified domain:</span>{" "}
                      {result.issuer.verified_domain ? "yes" : "no"}
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
