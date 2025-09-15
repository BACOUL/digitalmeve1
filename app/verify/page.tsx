// app/verify/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ShieldX,
  FileCheck2,
  Lock,
  BadgeCheck,
  Clipboard,
  XCircle,
} from "lucide-react";
import FileDropzone from "@/components/FileDropzone";
import { exportHtmlCertificate } from "@/lib/certificate-html";
import { readInvisibleWatermarkPdf } from "@/lib/wm/pdf";
import { readInvisibleWatermarkDocx } from "@/lib/wm/docx"; // DOCX

type VerifyResult = {
  ok: boolean;
  reason?: string;
  fileName?: string;
  hash?: string;
  whenISO?: string;
  issuer?: string;
};

type Toast = { type: "success" | "error" | "info"; message: string } | null;

export default function VerifyPage() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<VerifyResult | null>(null);
  const [toast, setToast] = useState<Toast>(null);

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
    const m = (e as any)?.message || "";
    if (/pdf|docx|type/i.test(m))
      return "Only PDF or DOCX with a .MEVE proof are supported.";
    if (/size|10 ?mb/i.test(m)) return "Max size is 10 MB.";
    return "Unable to verify this file.";
  }

  async function onVerify() {
    if (!file) return;
    setBusy(true);
    setRes(null);
    setToast(null);

    const end = (t?: Toast) => {
      setBusy(false);
      if (t) {
        setToast(t);
        setTimeout(() => setToast(null), 3000);
      }
    };

    try {
      const k = guessKind(file);
      if (k === "other") {
        setRes({
          ok: false,
          reason: "Unsupported file. Use a .meve.pdf or .meve.docx file.",
          fileName: file.name,
        });
        return end({ type: "error", message: "Unsupported file." });
      }

      const meta: any =
        k === "pdf"
          ? await readInvisibleWatermarkPdf(file)
          : await readInvisibleWatermarkDocx(file);

      if (!meta) {
        setRes({
          ok: false,
          reason: "No MEVE watermark found.",
          fileName: file.name,
        });
        return end({ type: "error", message: "No MEVE watermark found." });
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

      end(
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
      end({ type: "error", message: humanError(e) });
    }
  }

  function downloadCert() {
    if (!res?.ok || !res.hash || !res.whenISO || !res.fileName) return;
    const issuer = res.issuer ?? "";
    exportHtmlCertificate(
      res.fileName.replace(/\.(pdf|docx)$/i, ""),
      res.hash,
      res.whenISO,
      issuer
    );
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      {/* SR status pour lecteurs d’écran */}
      <p aria-live="polite" className="sr-only">
        {busy ? "Checking…" : res ? "Verification done." : "Idle"}
      </p>

      <section className="border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:py-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Verify a <span className="text-[var(--accent-1)]">.MEVE</span> file
          </h1>
          <p className="mt-3 text-lg text-[var(--fg-muted)]">
            Upload a .MEVE file (PDF or DOCX with embedded proof). We’ll check its
            invisible watermark and show whether the document is{" "}
            <span className="font-semibold">valid</span> or{" "}
            <span className="font-semibold">tampered</span>.
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

          <div className="mt-8">
            <FileDropzone
              onSelected={(f) => {
                setFile(f);
                setRes(null);
              }}
              label="Choose a file"
              maxSizeMB={10}
              hint="Drag & drop or tap to select. Max {SIZE} MB."
              accept=".pdf,application/pdf,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              role="button"
              tabIndex={0}
            />
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={onVerify}
              disabled={!file || busy}
              className="btn btn-primary shadow-glow disabled:opacity-50"
              aria-disabled={!file || busy}
            >
              {busy ? "Checking…" : "Verify Proof"}
            </button>

            {file && (
              <button
                onClick={() => {
                  setFile(null);
                  setRes(null);
                }}
                disabled={busy}
                className="btn btn-ghost"
                aria-disabled={busy}
              >
                <XCircle className="h-5 w-5" />
                Reset
              </button>
            )}

            {/* Lien utile : générer un fichier si l’utilisateur s’est trompé */}
            <Link href="/generate" className="btn btn-ghost">
              Need a .MEVE file? Generate →
            </Link>
          </div>

          {/* Résultat */}
          {res && (
            <div className="mt-8 card p-5">
              <div className="flex items-center gap-2">
                {res.ok ? (
                  <>
                    <ShieldCheck className="h-5 w-5 text-[var(--accent-1)]" />
                    <h2 className="text-lg font-semibold text-[var(--accent-1)]">
                      Valid
                    </h2>
                  </>
                ) : (
                  <>
                    <ShieldX className="h-5 w-5 text-rose-600" />
                    <h2 className="text-lg font-semibold text-rose-600">
                      Invalid
                    </h2>
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
                        {new Date(res.whenISO!).toLocaleDateString()} —{" "}
                        {new Date(res.whenISO!).toLocaleTimeString()}
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
                              onClick={() => {
                                navigator.clipboard.writeText(res.hash!);
                                setToast({
                                  type: "info",
                                  message: "SHA-256 copied to clipboard",
                                });
                                setTimeout(() => setToast(null), 2000);
                              }}
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
                      <button onClick={downloadCert} className="btn">
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
                  uploading the <span className="font-medium">.meve.pdf</span> or{" "}
                  <span className="font-medium">.meve.docx</span> file (not the original).
                </p>
              )}
            </div>
          )}
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
    </main>
  );
            }
