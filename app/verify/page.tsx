// app/verify/page.tsx
"use client";

import { useMemo, useState, useCallback, useRef } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ShieldX,
  FileCheck2,
  Lock,
  BadgeCheck,
  Clipboard,
  XCircle,
  Loader2,
} from "lucide-react";
import FileDropzone from "@/components/FileDropzone";
import { exportHtmlCertificate } from "@/lib/certificate-html";
import { readInvisibleWatermarkPdf } from "@/lib/wm/pdf";
import { readInvisibleWatermarkDocx } from "@/lib/wm/docx";
import { readInvisibleWatermarkImage } from "@/lib/wm/image"; // NEW: PNG/JPG

/** --- Constants / helpers --- */
const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

type VerifyResult = {
  ok: boolean;
  reason?: string;
  fileName?: string;
  hash?: string;
  whenISO?: string;
  issuer?: string;
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
    mt ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    name.endsWith(".docx")
  );
}
function isImg(f: File) {
  const mt = (f.type || "").toLowerCase();
  const name = f.name.toLowerCase();
  return (
    mt === "image/png" ||
    mt === "image/jpeg" ||
    name.endsWith(".png") ||
    name.endsWith(".jpg") ||
    name.endsWith(".jpeg")
  );
}
function guessKind(f: File): "pdf" | "docx" | "image" | "other" {
  if (isPdf(f)) return "pdf";
  if (isDocx(f)) return "docx";
  if (isImg(f)) return "image";
  return "other";
}
function formatWhen(iso?: string) {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    const date = new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(d);
    const time = new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
    return `${date} — ${time}`;
  } catch {
    return iso;
  }
}

export default function VerifyPage() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<VerifyResult | null>(null);
  const [toast, setToast] = useState<Toast>(null);
  const resetBtnRef = useRef<HTMLButtonElement | null>(null);

  const kind = useMemo<"pdf" | "docx" | "image" | "other">(
    () => (file ? guessKind(file) : "other"),
    [file]
  );

  const showToast = useCallback((t: Toast, ms = 2500) => {
    setToast(t);
    if (t) window.setTimeout(() => setToast(null), ms);
  }, []);

  const onSelected = useCallback(
    (f: File | null) => {
      setRes(null);
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
        showToast({
          type: "error",
          message: "Only PDF, DOCX, PNG or JPG with a .MEVE proof are supported.",
        });
        setFile(null);
        return;
      }
      setFile(f);
    },
    [showToast]
  );

  function humanError(e: unknown) {
    const m = (e as any)?.message || "";
    if (/pdf|docx|image|png|jpg|jpeg|type/i.test(m))
      return "Only PDF, DOCX, PNG or JPG with a .MEVE proof are supported.";
    if (/size|10 ?mb/i.test(m)) return `Max size is ${MAX_SIZE_MB} MB.`;
    return "Unable to verify this file.";
  }

  const onVerify = useCallback(async () => {
    if (!file) return;
    setBusy(true);
    setRes(null);
    setToast(null);

    try {
      const k = guessKind(file);
      if (k === "other") {
        setRes({
          ok: false,
          reason:
            "Unsupported file. Use a .meve.pdf / .meve.docx / .meve.png / .meve.jpg file.",
          fileName: file.name,
        });
        showToast({ type: "error", message: "Unsupported file." });
        return;
      }

      const meta: any =
        k === "pdf"
          ? await readInvisibleWatermarkPdf(file)
          : k === "docx"
          ? await readInvisibleWatermarkDocx(file)
          : await readInvisibleWatermarkImage(file);

      if (!meta) {
        setRes({
          ok: false,
          reason: "No MEVE watermark found.",
          fileName: file.name,
        });
        showToast({ type: "error", message: "No MEVE watermark found." });
        return;
      }

      const whenISO: string | undefined =
        meta.createdAtISO ??
        meta.tsISO ??
        meta.timestampISO ??
        meta.timestamp ??
        meta.ts ??
        undefined;

      const issuer: string | undefined =
        meta.issuer ?? meta.issuerEmail ?? meta.issuerId ?? undefined;

      const hash: string | undefined =
        meta.hash ?? meta.sha256 ?? meta.docHash ?? undefined;

      const ok = Boolean(hash && whenISO);

      setRes({
        ok,
        reason: !ok ? "Incomplete watermark payload." : undefined,
        fileName: file.name,
        hash,
        whenISO,
        issuer,
      });

      showToast(
        ok
          ? { type: "success", message: "Valid .MEVE proof." }
          : { type: "error", message: "Incomplete watermark payload." }
      );
    } catch (e) {
      console.error(e);
      setRes({
        ok: false,
        reason: "Unable to read the file.",
        fileName: file?.name,
      });
      showToast({ type: "error", message: humanError(e) });
    } finally {
      setBusy(false);
    }
  }, [file, showToast]);

  const onDownloadCert = useCallback(() => {
    if (!res?.ok || !res.hash || !res.whenISO || !res.fileName) return;
    const issuer = res.issuer ?? "";
    exportHtmlCertificate(
      res.fileName.replace(/\.(pdf|docx|png|jpg|jpeg)$/i, ""),
      res.hash,
      res.whenISO,
      issuer
    );
  }, [res]);

  const onCopyHash = useCallback(async () => {
    if (!res?.hash) return;
    try {
      await navigator.clipboard.writeText(res.hash);
      showToast({ type: "info", message: "SHA-256 copied to clipboard" }, 1500);
    } catch {
      window.prompt?.("Copy SHA-256", res.hash);
    }
  }, [res, showToast]);

  const onReset = useCallback(() => {
    setFile(null);
    setRes(null);
    resetBtnRef.current?.focus();
  }, []);

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)] relative">
      {/* Fond premium */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-50"
        style={{
          background:
            "radial-gradient(1200px 600px at 10% -10%, rgba(16,185,129,.08), transparent 60%), radial-gradient(1000px 520px at 85% 0%, rgba(56,189,248,.08), transparent 60%)",
        }}
      />

      {/* SR status */}
      <p aria-live="polite" className="sr-only">
        {busy ? "Checking…" : res ? "Verification done." : "Idle"}
      </p>

      {/* HEADER */}
      <section className="border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:py-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Verify a <span className="text-[var(--accent-1)]">.MEVE</span> file
          </h1>
          <p className="mt-3 text-lg text-[var(--fg-muted)]">
            Select a .MEVE file (PDF, DOCX, PNG or JPG with embedded proof).
            We’ll check its invisible watermark and confirm whether the document is{" "}
            <span className="font-semibold">valid</span>. Everything runs locally.
          </p>

          {/* Trust badges */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="badge">
              <Lock className="h-4 w-4 text-[var(--accent-1)]" />
              No storage — runs locally
            </span>
            <span className="badge">
              <BadgeCheck className="h-4 w-4 text-[var(--accent-2)]" />
              Works offline
            </span>
            {file && kind !== "other" && (
              <span className="badge">
                <FileCheck2 className="h-4 w-4 text-[var(--accent-1)]" />
                {kind.toUpperCase()} detected
              </span>
            )}
          </div>

          {/* DROPZONE */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur transition hover:bg-white/10 hover:shadow-[0_0_36px_rgba(56,189,248,.18)]">
            <FileDropzone
              onSelected={onSelected}
              label="Choose a file"
              maxSizeMB={MAX_SIZE_MB}
              hint={`Drag & drop or tap to select. Max ${MAX_SIZE_MB} MB.`}
              accept={[
                ".pdf",
                "application/pdf",
                ".docx",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                ".png",
                "image/png",
                ".jpg",
                ".jpeg",
                "image/jpeg",
              ].join(",")}
              role="button"
              tabIndex={0}
            />
          </div>

          {/* ACTIONS */}
          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={onVerify}
              disabled={!file || busy}
              className="btn btn-primary shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
              aria-disabled={!file || busy}
              aria-label="Verify a .MEVE proof"
            >
              {busy ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Checking…
                </>
              ) : (
                "Verify Proof"
              )}
            </button>

            {file && (
              <button
                ref={resetBtnRef}
                onClick={onReset}
                disabled={busy}
                className="btn btn-ghost"
                aria-disabled={busy}
                aria-label="Reset selected file"
              >
                <XCircle className="h-5 w-5" />
                Reset
              </button>
            )}

            {!busy && (
              <Link
                href="/generate"
                className="ml-auto text-sm text-[var(--fg-muted)] underline hover:text-[var(--fg)]"
                aria-label="Need a .MEVE file? Generate one"
              >
                Need a .MEVE file instead? Generate →
              </Link>
            )}
          </div>

          {/* RESULT */}
          {res && (
            <div className="mt-8 card p-5">
              <div className="flex items-center gap-2">
                {res.ok ? (
                  <>
                    <ShieldCheck className="h-5 w-5 text-[var(--accent-1)]" />
                    <h2 className="text-lg font-semibold text-[var(--accent-1)]">Valid</h2>
                  </>
                ) : (
                  <>
                    <ShieldX className="h-5 w-5 text-rose-600" />
                    <h2 className="text-lg font-semibold text-rose-600">Invalid</h2>
                  </>
                )}
              </div>

              <dl className="mt-3 grid gap-y-1 text-sm">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  <dt className="text-[var(--fg-muted)]">File</dt>
                  <dd className="col-span-2 sm:col-span-3 break-words">
                    {res.fileName ?? "—"}
                  </dd>
                </div>

                {res.ok ? (
                  <>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      <dt className="text-[var(--fg-muted)]">Date / Time</dt>
                      <dd className="col-span-2 sm:col-span-3">
                        {formatWhen(res.whenISO)}
                      </dd>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      <dt className="text-[var(--fg-muted)]">Issuer</dt>
                      <dd className="col-span-2 sm:col-span-3">
                        {res.issuer || "—"}
                      </dd>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      <dt className="text-[var(--fg-muted)]">SHA-256</dt>
                      <dd className="col-span-2 sm:col-span-3 break-words">
                        <div className="flex items-center gap-2 flex-wrap">
                          <code className="text-xs break-all">{res.hash}</code>
                          {res.hash && (
                            <button
                              onClick={onCopyHash}
                              className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-white/5 ring-1 ring-white/10 hover:bg-white/10"
                              aria-label="Copy SHA-256 to clipboard"
                            >
                              <Clipboard className="h-3.5 w-3.5" /> Copy
                            </button>
                          )}
                        </div>
                      </dd>
                    </div>

                    <div className="mt-5">
                      <button
                        onClick={onDownloadCert}
                        className="btn"
                        aria-label="Download certificate as HTML"
                      >
                        <FileCheck2 className="h-4 w-4 text-[var(--accent-2)]" />
                        Download Certificate (.html)
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    <dt className="text-[var(--fg-muted)]">Reason</dt>
                    <dd className="col-span-2 sm:col-span-3 text-rose-600">
                      {res.reason}
                    </dd>
                  </div>
                )}
              </dl>

              {!res.ok && (
                <p className="mt-3 text-xs text-[var(--fg-muted)]">
                  If you generated this file with DigitalMeve, make sure you are
                  uploading the{" "}
                  <span className="font-medium">.meve.pdf/.meve.docx/.meve.png/.meve.jpg</span>{" "}
                  file (not the original).
                </p>
              )}
            </div>
          )}

          {/* Micro-claims */}
          <p className="mt-10 text-center text-xs text-[var(--fg-muted)]">
            Privacy by design · In-browser only · PDF/DOCX/PNG/JPG
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
    </main>
  );
        }
