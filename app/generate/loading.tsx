// app/generate/page.tsx
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
  Loader2,
} from "lucide-react";
import FileDropzone from "@/components/FileDropzone";
import { addWatermarkPdf } from "@/lib/watermark-pdf";
import { sha256Hex } from "@/lib/meve-xmp";
import { exportHtmlCertificate } from "@/lib/certificate-html";
import { embedInvisibleWatermarkPdf } from "@/lib/wm/pdf"; // PDF invisible watermark
import { embedInvisibleWatermarkDocx } from "@/lib/wm/docx"; // DOCX invisible watermark

// 🔹 Quota invité
import LimitModal from "@/components/LimitModal";
import { checkFreeQuota } from "@/lib/quotaClient";

type GenResult = {
  pdfBlob?: Blob; // utilisé pour PDF *et* DOCX
  fileName?: string;
  hash?: string;
  whenISO?: string;
};

type Toast = { type: "success" | "error" | "info"; message: string } | null;

export default function GeneratePage() {
  const [file, setFile] = useState<File | null>(null);
  const [issuer, setIssuer] = useState("");
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<GenResult>({});

  // UI quota
  const [limitOpen, setLimitOpen] = useState(false);
  const [quotaCount, setQuotaCount] = useState<number | undefined>(undefined);
  const [quotaResetDay, setQuotaResetDay] = useState<string | undefined>(undefined);
  const [quotaRemaining, setQuotaRemaining] = useState<number | undefined>(undefined);

  // UX: toasts & annulation douce
  const [toast, setToast] = useState<Toast>(null);
  const cancelRef = useRef(false);

  const kind = useMemo<"pdf" | "docx" | "other">(() => {
    if (!file) return "other";
    const mt = (file.type || "").toLowerCase();
    const name = file.name.toLowerCase();
    if (mt === "application/pdf" || name.endsWith(".pdf")) return "pdf";
    if (
      mt ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      name.endsWith(".docx")
    )
      return "docx";
    return "other";
  }, [file]);

  function guessKind(f: File): "pdf" | "docx" | "other" {
    const mt = (f.type || "").toLowerCase();
    const name = f.name.toLowerCase();
    if (mt === "application/pdf" || name.endsWith(".pdf")) return "pdf";
    if (
      mt ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      name.endsWith(".docx")
    )
      return "docx";
    return "other";
  }

  function humanError(e: unknown) {
    const msg = (e as any)?.message || "";
    if (/pdf|docx|type/i.test(msg)) return "Only PDF or DOCX are supported.";
    if (/size|10 ?mb/i.test(msg)) return "Max size is 10 MB.";
    return "Something went wrong while generating the proof.";
  }

  async function onGenerate() {
    if (!file) return;
    setBusy(true);
    setToast(null);
    cancelRef.current = false;

    const end = (opts?: Toast) => {
      setBusy(false);
      if (opts) setToast(opts);
      if (opts) setTimeout(() => setToast(null), 3500); // auto-hide toast
    };

    try {
      // 0) Vérifier quota invité AVANT toute opération
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
          return end(); // stoppe le flux
        }
        // erreur réseau ponctuelle : on laisse passer pour ne pas bloquer l’utilisateur
      }

      if (cancelRef.current) return end({ type: "info", message: "Cancelled." });

      const k = guessKind(file);
      if (k === "other")
        return end({ type: "error", message: "Only PDF and DOCX are supported for now." });

      // 1) Hash de l’original (spéc MEVE)
      const t0 = performance.now();
      const hash = await sha256Hex(file);
      const whenISO = new Date().toISOString();

      if (cancelRef.current) return end({ type: "info", message: "Cancelled." });

      let outBlob: Blob;
      let outName: string;

      if (k === "pdf") {
        // 2) PDF : watermark visuel → ArrayBuffer → Blob
        const watermarkedAB = await addWatermarkPdf(file);
        const watermarkedBlob = new Blob([watermarkedAB], { type: "application/pdf" });

        if (cancelRef.current) return end({ type: "info", message: "Cancelled." });

        // 3) Filigrane *invisible* %MEVE{...}EVEM
        outBlob = await embedInvisibleWatermarkPdf(watermarkedBlob, {
          hash,
          ts: whenISO,
          issuer: issuer || undefined,
        });

        outName = toMeveName(file.name, "pdf");
      } else {
        // DOCX : insertion du marqueur invisible dans docProps/custom.xml
        outBlob = await embedInvisibleWatermarkDocx(file, {
          hash,
          ts: whenISO,
          issuer: issuer || undefined,
        });

        outName = toMeveName(file.name, "docx");
      }

      setRes({ pdfBlob: outBlob, fileName: outName, hash, whenISO });

      end({
        type: "success",
        message: `Proof ready in ${Math.max(1, Math.round(performance.now() - t0))} ms`,
      });
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

  function toMeveName(name: string, kind: "pdf" | "docx") {
    const m = name.match(/^(.+)\.([^.]+)$/);
    const base = m ? m[1] : name;
    return `${base}.meve.${kind}`;
  }

  // Téléchargement direct
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
    (window as any).requestIdleCallback
      ? (window as any).requestIdleCallback(revoke)
      : setTimeout(revoke, 15000);
  }

  // Certificat HTML
  function downloadCert() {
    if (!res.fileName || !res.hash || !res.whenISO) return;
    exportHtmlCertificate(
      res.fileName.replace(/\.(pdf|docx)$/i, ""),
      res.hash,
      res.whenISO,
      issuer
    );
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      {/* Fond premium façon home */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-50"
        style={{
          background:
            "radial-gradient(1200px 600px at 10% -10%, rgba(16,185,129,.08), transparent 60%), radial-gradient(1000px 520px at 85% 0%, rgba(56,189,248,.08), transparent 60%)",
        }}
      />

      {/* SR status pour lecteurs d’écran */}
      <p aria-live="polite" className="sr-only">
        {busy ? "Generating…" : res.hash ? "Proof ready." : "Idle"}
      </p>

      <section className="border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:py-12">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Generate a <span className="text-[var(--accent-1)]">.MEVE</span> proof
          </h1>

          {/* Subtitle */}
          <p className="mt-3 text-lg text-[var(--fg-muted)]">
            Upload your document (PDF or DOCX). We add a lightweight, invisible proof inside. You’ll
            receive{" "}
            <span className="font-semibold">
              name<span className="opacity-60">.meve</span>.pdf/.docx
            </span>{" "}
            and an optional human-readable certificate (.html).
          </p>

          <p className="mt-2 text-sm text-[var(--fg-muted)]">
            No upload. Everything runs locally in your browser.{" "}
            <Link href="/samples" className="underline hover:opacity-80">
              Try with sample files
            </Link>
            .
          </p>

          {/* Trust badges */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="badge">
              <Lock className="h-4 w-4 text-[var(--accent-1)]" />
              No storage — runs locally
            </span>
            <span className="badge">
              <ShieldCheck className="h-4 w-4 text-[var(--accent-2)]" />
              Portable — stays readable
            </span>
            {file && kind !== "other" && (
              <span className="badge">
                <FileCheck2 className="h-4 w-4 text-[var(--accent-1)]" />
                {kind.toUpperCase()} detected
              </span>
            )}
            {typeof quotaRemaining === "number" && (
              <span className="badge">{quotaRemaining} free left today</span>
            )}
          </div>

          {/* Dropzone wrapper avec glow hover */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur transition hover:bg-white/10 hover:shadow-[0_0_36px_rgba(56,189,248,.18)]">
            <FileDropzone
              onSelected={setFile}
              label="Choose a file"
              maxSizeMB={10}
              hint="Drag & drop or tap to select. Max {SIZE} MB."
              accept=".pdf,application/pdf,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              role="button"
              tabIndex={0}
            />
          </div>

          {/* Issuer */}
          <div className="mt-5">
            <label htmlFor="issuer" className="block text-sm font-medium">
              Issuer (optional)
            </label>
            <input
              id="issuer"
              type="email"
              placeholder="e.g. alice@company.com"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              className="input mt-1"
              autoComplete="email"
              inputMode="email"
            />
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={onGenerate}
              disabled={!file || busy}
              className="btn btn-primary shadow-glow disabled:opacity-50"
              aria-disabled={!file || busy}
            >
              {busy ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating…
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5" />
                  Generate Proof
                </>
              )}
            </button>

            <button
              onClick={onCancel}
              disabled={!busy}
              className="btn btn-ghost"
              aria-disabled={!busy}
            >
              <XCircle className="h-5 w-5" />
              Cancel
            </button>

            {/* Cross-CTA vers Verify */}
            <Link href="/verify" className="ml-auto text-sm text-[var(--fg-muted)] underline hover:text-[var(--fg)]">
              Want to check a file instead? Verify a document →
            </Link>
          </div>

          {/* Result */}
          {res.pdfBlob && res.fileName && (
            <div className="mt-8 card p-5">
              <h2 className="text-lg font-semibold">Proof Preview</h2>

              <dl className="mt-3 grid gap-y-2 text-sm">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 items-start">
                  <dt className="text-[var(--fg-muted)]">
                    <span className="mr-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 ring-1 ring-emerald-400/20">
                      FILE
                    </span>
                  </dt>
                  <dd className="col-span-2 sm:col-span-3 break-words">{res.fileName}</dd>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 items-start">
                  <dt className="text-[var(--fg-muted)]">
                    <span className="mr-1 rounded-full bg-sky-500/15 px-2 py-0.5 text-[10px] font-semibold text-sky-300 ring-1 ring-sky-400/20">
                      DATE
                    </span>
                  </dt>
                  <dd className="col-span-2 sm:col-span-3">
                    {new Date(res.whenISO!).toLocaleDateString()} —{" "}
                    {new Date(res.whenISO!).toLocaleTimeString()}
                  </dd>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 items-start">
                  <dt className="text-[var(--fg-muted)]">
                    <span className="mr-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold text-white/80 ring-1 ring-white/20">
                      ISSUER
                    </span>
                  </dt>
                  <dd className="col-span-2 sm:col-span-3">{issuer || "—"}</dd>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 items-start">
                  <dt className="text-[var(--fg-muted)]">
                    <span className="mr-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 ring-1 ring-emerald-400/20">
                      SHA-256
                    </span>
                  </dt>
                  <dd className="col-span-2 sm:col-span-3 break-words">
                    <div className="flex items-center gap-2 flex-wrap">
                      <code className="text-xs break-all">{res.hash}</code>
                      <button
                        onClick={() => {
                          if (res.hash) {
                            navigator.clipboard.writeText(res.hash);
                            setToast({
                              type: "info",
                              message: "SHA-256 copied to clipboard",
                            });
                            setTimeout(() => setToast(null), 2000);
                          }
                        }}
                        className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-white/5 ring-1 ring-white/10 hover:bg-white/10"
                        aria-label="Copy SHA-256 to clipboard"
                      >
                        <Clipboard className="h-3.5 w-3.5" /> Copy
                      </button>
                      <Link href={`/verify?hash=${encodeURIComponent(res.hash || "")}`} className="btn btn-ghost text-xs">
                        Verify now →
                      </Link>
                    </div>
                  </dd>
                </div>
              </dl>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button onClick={downloadFile} className="btn">
                  <FileDown className="h-4 w-4 text-[var(--accent-1)]" />
                  Download .MEVE document
                </button>
                <button onClick={downloadCert} className="btn">
                  <FileCheck2 className="h-4 w-4 text-[var(--accent-2)]" />
                  Download Certificate (.html)
                </button>
              </div>

              <p className="mt-3 text-xs text-[var(--fg-muted)]">
                The file downloads directly to preserve integrity. The certificate may briefly open
                in a new tab (~10s) so you can choose “Open”.
              </p>
            </div>
          )}

          {/* Micro-claims (cohérence home) */}
          <p className="mt-10 text-center text-xs text-[var(--fg-muted)]">
            Privacy by design · In-browser only · Works with all file types
          </p>
        </div>
      </section>

      {/* Toast simple */}
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

      {/* Modal quota (si limite atteinte) */}
      <LimitModal
        open={limitOpen}
        onClose={() => setLimitOpen(false)}
        count={quotaCount}
        resetDayUTC={quotaResetDay}
      />
    </main>
  );
      }
