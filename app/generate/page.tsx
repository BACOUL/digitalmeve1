// app/generate/page.tsx
"use client";

import { useMemo, useRef, useState, useCallback } from "react";
import Link from "next/link";
import {
  Upload,
  FileDown,
  FileCheck2,
  Clipboard,
  XCircle,
  Lock,
  BadgeCheck,
  FileCheck,
} from "lucide-react";
import FileDropzone from "@/components/FileDropzone";
import { addWatermarkPdf } from "@/lib/watermark-pdf";
import { sha256Hex } from "@/lib/meve-xmp";
import { exportHtmlCertificate } from "@/lib/certificate-html";
import { embedInvisibleWatermarkPdf } from "@/lib/wm/pdf";
import { embedInvisibleWatermarkDocx } from "@/lib/wm/docx";

import LimitModal from "@/components/LimitModal";
import { checkFreeQuota } from "@/lib/quotaClient";

/** --- Constants / helpers --- */
const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

type GenResult = {
  pdfBlob?: Blob;
  fileName?: string;
  hash?: string;
  whenISO?: string;
};

type Toast = { type: "success" | "error" | "info"; message: string } | null;

function isPdf(f: File) {
  const mt = (f.type || "").toLowerCase();
  const name = f.name.toLowerCase();
  return mt === "application/pdf" || name.endsWith(".pdf");
}
function isDocx(f: File) {
  const mt = (f.type || "").toLowerCase();
  const name = f.name.toLowerCase();
  return (
    mt === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    name.endsWith(".docx")
  );
}
function guessKind(f: File): "pdf" | "docx" | "other" {
  if (isPdf(f)) return "pdf";
  if (isDocx(f)) return "docx";
  return "other";
}
function toMeveName(name: string, kind: "pdf" | "docx") {
  const m = name.match(/^(.+)\.([^.]+)$/);
  const base = m ? m[1] : name;
  return `${base}.meve.${kind}`;
}
function formatWhen(iso?: string) {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  } catch {
    return iso;
  }
}

export default function GeneratePage() {
  const [file, setFile] = useState<File | null>(null);
  const [issuer, setIssuer] = useState("");
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<GenResult>({});

  // quota
  const [limitOpen, setLimitOpen] = useState(false);
  const [quotaCount, setQuotaCount] = useState<number | undefined>();
  const [quotaResetDay, setQuotaResetDay] = useState<string | undefined>();
  const [quotaRemaining, setQuotaRemaining] = useState<number | undefined>();

  const [toast, setToast] = useState<Toast>(null);
  const cancelRef = useRef(false);

  const kind = useMemo<"pdf" | "docx" | "other">(() => (file ? guessKind(file) : "other"), [file]);

  const showToast = useCallback((t: Toast, ms = 2500) => {
    setToast(t);
    if (t) window.setTimeout(() => setToast(null), ms);
  }, []);

  const onSelected = useCallback((f: File | null) => {
    setRes({});
    if (!f) {
      setFile(null);
      return;
    }
    if (f.size > MAX_SIZE_BYTES) {
      showToast({ type: "error", message: `Max size is ${MAX_SIZE_MB} MB.` });
      setFile(null);
      return;
    }
    const k = guessKind(f);
    if (k === "other") {
      showToast({ type: "error", message: "Only PDF and DOCX are supported." });
      setFile(null);
      return;
    }
    setFile(f);
  }, [showToast]);

  function humanError(e: unknown) {
    const msg = (e as any)?.message || "";
    if (/pdf|docx|type/i.test(msg)) return "Only PDF or DOCX are supported.";
    if (/size|10 ?mb/i.test(msg)) return `Max size is ${MAX_SIZE_MB} MB.`;
    return "Something went wrong while generating the proof.";
  }

  async function onGenerate() {
    if (!file) return;
    setBusy(true);
    setToast(null);
    cancelRef.current = false;

    const end = (opts?: Toast) => {
      setBusy(false);
      if (opts) showToast(opts, 3500);
    };

    try {
      // Quota
      try {
        const q = await checkFreeQuota();
        setQuotaRemaining(q.remaining);
        setQuotaCount(q.count);
        setQuotaResetDay(q.resetDayUTC);
      } catch (err: any) {
        if (err?.quota?.reason === "limit_reached") {
          setQuotaCount(err.quota.count);
          setQuotaResetDay(err.quota.resetDayUTC);
          setLimitOpen(true);
          return end();
        }
      }

      if (cancelRef.current) return end({ type: "info", message: "Cancelled." });

      const k = guessKind(file);
      if (k === "other") return end({ type: "error", message: "Only PDF and DOCX are supported." });

      const t0 = performance.now();
      const hash = await sha256Hex(file);
      const whenISO = new Date().toISOString();

      if (cancelRef.current) return end({ type: "info", message: "Cancelled." });

      let outBlob: Blob;
      let outName: string;

      if (k === "pdf") {
        const watermarkedAB = await addWatermarkPdf(file);
        const watermarkedBlob = new Blob([watermarkedAB], { type: "application/pdf" });

        if (cancelRef.current) return end({ type: "info", message: "Cancelled." });

        outBlob = await embedInvisibleWatermarkPdf(watermarkedBlob, {
          hash,
          ts: whenISO,
          issuer: issuer || undefined,
        });

        outName = toMeveName(file.name, "pdf");
      } else {
        outBlob = await embedInvisibleWatermarkDocx(file, {
          hash,
          ts: whenISO,
          issuer: issuer || undefined,
        });

        outName = toMeveName(file.name, "docx");
      }

      setRes({ pdfBlob: outBlob, fileName: outName, hash, whenISO });

      const elapsed = performance.now() - t0;
      const pretty = elapsed < 1000 ? `${Math.round(elapsed)} ms` : `${(elapsed / 1000).toFixed(1)} s`;

      end({ type: "success", message: `Proof ready in ${pretty}` });
    } catch (e) {
      console.error(e);
      end({ type: "error", message: humanError(e) });
    }
  }

  function onCancel() {
    if (!busy) return;
    cancelRef.current = true;
    showToast({ type: "info", message: "Cancelling…" }, 2000);
  }

  async function onCopyHash(h?: string) {
    if (!h) return;
    try {
      await navigator.clipboard.writeText(h);
      showToast({ type: "info", message: "SHA-256 copied" }, 1500);
    } catch {
      window.prompt?.("Copy SHA-256", h);
    }
  }

  function downloadFile() {
    if (!res.pdfBlob || !res.fileName) return;
    const url = URL.createObjectURL(res.pdfBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = res.fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    const revoke = () => URL.revokeObjectURL(url);
    (window as any).requestIdleCallback ? (window as any).requestIdleCallback(revoke) : setTimeout(revoke, 15000);
  }

  function downloadCert() {
    if (!res.fileName || !res.hash || !res.whenISO) return;
    exportHtmlCertificate(res.fileName.replace(/\.(pdf|docx)$/i, ""), res.hash, res.whenISO, issuer);
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)] relative">
      {/* Fond premium (cohérent verify/home) */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-50"
        style={{
          background:
            "radial-gradient(1200px 600px at 10% -10%, rgba(16,185,129,.08), transparent 60%), radial-gradient(1000px 520px at 85% 0%, rgba(56,189,248,.08), transparent 60%)",
        }}
      />

      {/* SR status */}
      <p aria-live="polite" className="sr-only">{busy ? "Generating…" : res.fileName ? "Generation done." : "Idle"}</p>

      <section className="border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:py-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Generate a <span className="text-[var(--accent-1)]">.MEVE</span> proof
          </h1>

          <p className="mt-3 text-lg text-[var(--fg-muted)]">
            Select your document (PDF or DOCX). We embed a lightweight, invisible proof. You’ll get{" "}
            <span className="font-semibold">name<span className="opacity-60">.meve</span>.pdf/.docx</span>{" "}
            and an optional human-readable certificate (.html).
          </p>

          {/* Badges */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="badge"><Lock className="h-4 w-4 text-[var(--accent-1)]" /> No storage — runs locally</span>
            <span className="badge"><BadgeCheck className="h-4 w-4 text-[var(--accent-2)]" /> Works offline</span>
            {file && kind !== "other" && (
              <span className="badge"><FileCheck className="h-4 w-4 text-[var(--accent-1)]" /> {kind.toUpperCase()} detected</span>
            )}
          </div>

          <div className="mt-8">
            <FileDropzone
              onSelected={onSelected}
              label="Choose a file"
              maxSizeMB={MAX_SIZE_MB}
              hint={`Drag & drop or tap to select. Max ${MAX_SIZE_MB} MB.`}
              accept=".pdf,application/pdf,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              role="button"
              tabIndex={0}
            />
          </div>

          <div className="mt-5">
            <label htmlFor="issuer" className="block text-sm font-medium">Issuer (optional)</label>
            <input
              id="issuer"
              type="text"
              placeholder="e.g. alice@company.com"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              className="input mt-1"
              autoComplete="email"
              inputMode="email"
              aria-describedby="issuer-hint"
            />
            <p id="issuer-hint" className="mt-1 text-xs text-[var(--fg-muted)]">
              This identifier will be embedded as issuer metadata (e.g., email or domain).
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={onGenerate}
              disabled={!file || busy}
              className="btn btn-primary shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
              aria-disabled={!file || busy}
              aria-label="Generate a .MEVE proof"
            >
              <Upload className="h-5 w-5" />
              {busy ? "Generating…" : "Generate Proof"}
            </button>

            <button
              onClick={onCancel}
              disabled={!busy}
              className="btn btn-ghost"
              aria-disabled={!busy}
              aria-label="Cancel generation"
            >
              <XCircle className="h-5 w-5" />
              Cancel
            </button>
          </div>

          {res.pdfBlob && res.fileName && (
            <div className="mt-8 card p-5">
              <h2 className="text-lg font-semibold">Proof Preview</h2>

              <dl className="mt-3 grid gap-y-1 text-sm">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  <dt className="text-[var(--fg-muted)]">File</dt>
                  <dd className="col-span-2 sm:col-span-3 break-words">{res.fileName}</dd>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  <dt className="text-[var(--fg-muted)]">Date / Time</dt>
                  <dd className="col-span-2 sm:col-span-3">{formatWhen(res.whenISO)}</dd>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  <dt className="text-[var(--fg-muted)]">Issuer</dt>
                  <dd className="col-span-2 sm:col-span-3">{issuer || "—"}</dd>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  <dt className="text-[var(--fg-muted)]">SHA-256</dt>
                  <dd className="col-span-2 sm:col-span-3 break-words">
                    <div className="flex items-center gap-2 flex-wrap">
                      <code className="text-xs break-all">{res.hash}</code>
                      {res.hash && (
                        <>
                          <button
                            onClick={() => onCopyHash(res.hash)}
                            className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-white/5 ring-1 ring-white/10 hover:bg-white/10"
                            aria-label="Copy SHA-256 to clipboard"
                          >
                            <Clipboard className="h-3.5 w-3.5" /> Copy
                          </button>
                          <Link
                            href={`/verify?hash=${encodeURIComponent(res.hash)}`}
                            className="text-xs underline"
                          >
                            Verify now →
                          </Link>
                        </>
                      )}
                    </div>
                  </dd>
                </div>
              </dl>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button onClick={downloadFile} className="btn" aria-label="Download .MEVE document">
                  <FileDown className="h-4 w-4 text-[var(--accent-1)]" />
                  Download .MEVE document
                </button>
                <button onClick={downloadCert} className="btn" aria-label="Download certificate as HTML">
                  <FileCheck2 className="h-4 w-4 text-[var(--accent-2)]" />
                  Download Certificate (.html)
                </button>
              </div>
            </div>
          )}

          {/* Micro-claims */}
          <p className="mt-10 text-center text-xs text-[var(--fg-muted)]">
            Privacy by design · In-browser only · PDF/DOCX today (more coming)
          </p>
        </div>
      </section>

      {/* Toast */}
      {toast && (
        <div
          role="status"
          className={`fixed bottom-4 left-1/2 -translate-x-1/2 rounded-md px-3 py-2 text-white text-sm shadow-lg ${
            toast.type === "error"
              ? "bg-red-600/90"
              : toast.type === "success"
              ? "bg-emerald-600/90"
              : "bg-sky-600/90"
          }`}
        >
          {toast.message}
        </div>
      )}

      <LimitModal open={limitOpen} onClose={() => setLimitOpen(false)} count={quotaCount} resetDayUTC={quotaResetDay} />
    </main>
  );
                 }
