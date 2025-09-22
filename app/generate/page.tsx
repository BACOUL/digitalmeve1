// app/generate/page.tsx — Generate v1 (PDF/DOCX complets, autres formats en attente)
// Aligne wording, quota mensuel, nom de sortie *.certified.ext, et prépare l’élargissement de formats.

"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Upload,
  FileDown,
  FileCheck2,
  ShieldCheck,
  Lock,
  Clipboard,
  XCircle,
  Info,
} from "lucide-react";
import FileDropzone from "@/components/FileDropzone";
// EXISTANTS (PDF/DOCX)
import { addWatermarkPdf } from "@/lib/watermark-pdf";
import { sha256Hex } from "@/lib/meve-xmp";
import { exportHtmlCertificate } from "@/lib/certificate-html";
import { embedInvisibleWatermarkPdf } from "@/lib/wm/pdf";
import { embedInvisibleWatermarkDocx } from "@/lib/wm/docx";
// QUOTA
import LimitModal from "@/components/LimitModal";
import { checkFreeQuota } from "@/lib/quotaClient";

// --- Détection étendue (placeholders pour futurs adaptateurs) ---
type Kind =
  | "pdf" | "docx" | "pptx" | "xlsx"
  | "png" | "jpg" | "jpeg"
  | "mp4" | "zip"
  | "other";

function guessKindFromNameAndType(f: File): Kind {
  const name = (f.name || "").toLowerCase();
  const mt = (f.type || "").toLowerCase();
  if (mt === "application/pdf" || name.endsWith(".pdf")) return "pdf";
  if (mt === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || name.endsWith(".docx")) return "docx";
  if (mt === "application/vnd.openxmlformats-officedocument.presentationml.presentation" || name.endsWith(".pptx")) return "pptx";
  if (mt === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || name.endsWith(".xlsx")) return "xlsx";
  if (mt.startsWith("image/png") || name.endsWith(".png")) return "png";
  if (mt.startsWith("image/jpeg") || name.endsWith(".jpg") || name.endsWith(".jpeg")) return "jpeg";
  if (mt.startsWith("video/mp4") || name.endsWith(".mp4")) return "mp4";
  if (mt === "application/zip" || name.endsWith(".zip")) return "zip";
  return "other";
}

type GenResult = {
  outBlob?: Blob;
  fileName?: string;
  hash?: string;
  whenISO?: string;
};

type Toast =
  | { type: "success" | "error" | "info"; message: string }
  | null;

export default function GeneratePage() {
  const [file, setFile] = useState<File | null>(null);
  const [issuer, setIssuer] = useState("");
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<GenResult>({});

  // quota (mensuel)
  const [limitOpen, setLimitOpen] = useState(false);
  const [quotaCount, setQuotaCount] = useState<number | undefined>();
  const [quotaResetDay, setQuotaResetDay] = useState<string | undefined>();
  const [quotaRemaining, setQuotaRemaining] = useState<number | undefined>();

  const [toast, setToast] = useState<Toast>(null);
  const cancelRef = useRef(false);

  const kind = useMemo<Kind>(() => (file ? guessKindFromNameAndType(file) : "other"), [file]);

  function humanError(e: unknown) {
    const msg = (e as any)?.message || "";
    if (/pdf|docx|type/i.test(msg)) return "Only PDF or DOCX are supported right now. Other formats are coming soon.";
    if (/size|10 ?mb/i.test(msg)) return "Max size is 10 MB.";
    return "Something went wrong while generating the certificate.";
  }

  function toCertifiedName(name: string, ext: string) {
    const m = name.match(/^(.+)\.([^.]+)$/);
    const base = m ? m[1] : name;
    return `${base}.certified.${ext}`;
  }

  async function onGenerate() {
    if (!file) return;
    setBusy(true);
    setToast(null);
    cancelRef.current = false;

    const end = (opts?: Toast) => {
      setBusy(false);
      if (opts) setToast(opts);
      if (opts) setTimeout(() => setToast(null), 3500);
    };

    try {
      // Quota check (mensuel)
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

      const k = kind;
      const t0 = performance.now();
      const hash = await sha256Hex(file);
      const whenISO = new Date().toISOString();

      if (cancelRef.current) return end({ type: "info", message: "Cancelled." });

      let outBlob: Blob | undefined;
      let outName = file.name;

      if (k === "pdf") {
        // Filigrane visible + marqueurs invisibles (PDF)
        const watermarkedAB = await addWatermarkPdf(file);
        const watermarkedBlob = new Blob([watermarkedAB], { type: "application/pdf" });
        if (cancelRef.current) return end({ type: "info", message: "Cancelled." });

        outBlob = await embedInvisibleWatermarkPdf(watermarkedBlob, {
          hash,
          ts: whenISO,
          issuer: issuer || undefined,
        });
        outName = toCertifiedName(file.name, "pdf");

      } else if (k === "docx") {
        // Marqueurs invisibles (DOCX) + watermark selon implémentation
        outBlob = await embedInvisibleWatermarkDocx(file, {
          hash,
          ts: whenISO,
          issuer: issuer || undefined,
        });
        outName = toCertifiedName(file.name, "docx");

      } else {
        // Les autres formats seront ajoutés Pack 3
        return end({
          type: "info",
          message: "This file type will be supported soon (PNG, JPEG, MP4, ZIP, PPTX, XLSX). Try PDF or DOCX for now.",
        });
      }

      setRes({ outBlob, fileName: outName, hash, whenISO });

      const elapsed = performance.now() - t0;
      const pretty = elapsed < 1000 ? `${Math.round(elapsed)} ms` : `${(elapsed / 1000).toFixed(1)} s`;

      end({ type: "success", message: `Certificate generated in ${pretty}` });
    } catch (e) {
      console.error(e);
      end({ type: "error", message: humanError(e) });
    }
  }

  function onCancel() {
    if (!busy) return;
    cancelRef.current = true;
    setToast({ type: "info", message: "Cancelling…" });
    setTimeout(() => setToast(null), 2000);
  }

  function downloadFile() {
    if (!res.outBlob || !res.fileName) return;
    const url = URL.createObjectURL(res.outBlob);
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
    const base = res.fileName.replace(/\.(pdf|docx)$/i, "");
    exportHtmlCertificate(base, res.hash, res.whenISO, issuer);
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]" aria-busy={busy}>
      <p aria-live="polite" className="sr-only">
        {busy ? "Generating…" : res.hash ? "Certificate ready." : "Idle"}
      </p>

      <section className="border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:py-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Generate a <span className="text-[var(--accent-1)]">DigitalMeve</span> certificate
          </h1>

          <p className="mt-3 text-lg text-[var(--fg-muted)]">
            We add a <strong>visible watermark</strong>, an <strong>invisible SHA-256</strong> and an{" "}
            <strong>invisible DigitalMeve key</strong> to your file. You also get a portable{" "}
            <strong>HTML certificate</strong>.
          </p>

          <p className="mt-2 text-sm text-[var(--fg-muted)]">
            No upload — everything runs in your browser.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="badge">
              <Lock className="h-4 w-4 text-[var(--accent-1)]" />
              On-device · No storage
            </span>
            <span className="badge">
              <ShieldCheck className="h-4 w-4 text-[var(--accent-2)]" />
              Certificate included (HTML)
            </span>
            {file && kind !== "other" && (
              <span className="badge">
                <FileCheck2 className="h-4 w-4 text-[var(--accent-1)]" />
                {kind.toUpperCase()} detected
              </span>
            )}
            {typeof quotaRemaining === "number" && (
              <span
                className="badge"
                title={quotaResetDay ? `Resets on ${quotaResetDay}` : undefined}
              >
                {quotaRemaining} free left this month
              </span>
            )}
          </div>

          <div className="mt-8">
            <FileDropzone
              onSelected={setFile}
              label="Choose a file"
              maxSizeMB={10}
              hint="Drag & drop or tap to select. Max 10 MB."
              accept={[
                ".pdf", "application/pdf",
                ".docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                ".pptx","application/vnd.openxmlformats-officedocument.presentationml.presentation",
                ".xlsx","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                ".png","image/png",
                ".jpg",".jpeg","image/jpeg",
                ".mp4","video/mp4",
                ".zip","application/zip",
              ].join(",")}
              role="button"
              tabIndex={0}
            />
          </div>

          <div className="mt-5">
            <label htmlFor="issuer" className="block text-sm font-medium">
              Issuer (optional)
            </label>
            <input
              id="issuer"
              type="text"
              placeholder="e.g. alice@company.com"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              className="input mt-1"
              autoComplete="off"
            />
            <p className="mt-1 flex items-center gap-1.5 text-xs text-[var(--fg-muted)]">
              <Info className="h-3.5 w-3.5" /> Included in the certificate. Paid plans show the name/email or company.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={onGenerate}
              disabled={!file || busy}
              className="btn btn-primary shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
              aria-disabled={!file || busy}
              aria-label="Generate certificate"
            >
              <Upload className="h-5 w-5" />
              {busy ? "Generating…" : "Generate certificate"}
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

          {res.outBlob && res.fileName && (
            <div className="mt-8 card p-5">
              <h2 className="text-lg font-semibold">Certificate / Integrity</h2>

              <dl className="mt-3 grid gap-y-1 text-sm">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  <dt className="text-[var(--fg-muted)]">File</dt>
                  <dd className="col-span-2 sm:col-span-3 break-words">{res.fileName}</dd>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  <dt className="text-[var(--fg-muted)]">Date / Time</dt>
                  <dd className="col-span-2 sm:col-span-3">
                    {new Date(res.whenISO!).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" })} —{" "}
                    {new Date(res.whenISO!).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
                  </dd>
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
                      <button
                        onClick={() => {
                          if (res.hash) {
                            navigator.clipboard.writeText(res.hash);
                            setToast({ type: "info", message: "SHA-256 copied to clipboard" });
                            setTimeout(() => setToast(null), 2000);
                          }
                        }}
                        className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-white/5 ring-1 ring-white/10 hover:bg-white/10"
                        aria-label="Copy SHA-256 to clipboard"
                      >
                        <Clipboard className="h-3.5 w-3.5" /> Copy
                      </button>
                      {!busy && (
                        <Link href={`/verify?hash=${encodeURIComponent(res.hash || "")}`} className="btn btn-ghost text-xs">
                          Verify now →
                        </Link>
                      )}
                    </div>
                  </dd>
                </div>
              </dl>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button onClick={downloadFile} className="btn" aria-label="Download certified file">
                  <FileDown className="h-4 w-4 text-[var(--accent-1)]" />
                  Download certified file
                </button>
                <button onClick={downloadCert} className="btn" aria-label="Download HTML certificate">
                  <FileCheck2 className="h-4 w-4 text-[var(--accent-2)]" />
                  Download certificate (.html)
                </button>
              </div>

              <p className="mt-3 text-xs text-[var(--fg-muted)]">
                The file downloads directly to preserve integrity. The certificate may briefly open in a new tab so you can save it.
              </p>
            </div>
          )}
        </div>
      </section>

      {toast && (
        <div
          role="status"
          className={`fixed bottom-4 left-1/2 -translate-x-1/2 rounded-md px-3 py-2 text-white text-sm shadow-lg ${
            toast.type === "error" ? "bg-red-600/90" : toast.type === "success" ? "bg-emerald-600/90" : "bg-sky-600/90"
          }`}
        >
          {toast.message}
        </div>
      )}

      <LimitModal open={limitOpen} onClose={() => setLimitOpen(false)} count={quotaCount} resetDayUTC={quotaResetDay} />
    </main>
  );
    }
