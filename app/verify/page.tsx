// app/verify/page.tsx
"use client";

import { useState } from "react";
import { ShieldCheck, ShieldX, FileCheck2 } from "lucide-react";
import FileDropzone from "@/components/FileDropzone";
import { exportHtmlCertificate } from "@/lib/certificate-html";
import { readInvisibleWatermarkPdf } from "@/lib/wm/pdf"; // ✅ fonction de lecture du filigrane invisible

type VerifyResult = {
  ok: boolean;
  reason?: string;
  fileName?: string;
  hash?: string;
  whenISO?: string;
  issuer?: string;
};

export default function VerifyPage() {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<VerifyResult | null>(null);

  async function onVerify() {
    if (!file) return;
    setBusy(true);
    try {
      // ✅ lecture du filigrane invisible dans le PDF (Blob attendu)
      const meta = await readInvisibleWatermarkPdf(file);

      if (!meta) {
        setRes({
          ok: false,
          reason: "No MEVE watermark found.",
          fileName: file.name,
        });
        return;
      }

      // Métadonnées présentes → on considère VALID
      setRes({
        ok: true,
        fileName: file.name,
        hash: meta.hash,
        whenISO: meta.createdAtISO,
        issuer: meta.issuer,
      });
    } catch (e) {
      console.error(e);
      setRes({
        ok: false,
        reason: "Unable to read the file.",
        fileName: file?.name,
      });
    } finally {
      setBusy(false);
    }
  }

  function downloadCert() {
    if (!res?.ok || !res.hash || !res.whenISO || !res.fileName) return;
    const issuer = res.issuer ?? "";
    exportHtmlCertificate(
      res.fileName.replace(/\.pdf$/i, ""),
      res.hash,
      res.whenISO,
      issuer
    );
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:py-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Verify a <span className="text-emerald-600">.MEVE</span> file
          </h1>
          <p className="mt-3 text-lg text-slate-700">
            Upload a .MEVE file (PDF with embedded proof). We’ll check its
            invisible watermark and show whether the document is{" "}
            <span className="font-semibold">valid</span> or{" "}
            <span className="font-semibold">tampered</span>.
          </p>

          <div className="mt-8">
            <FileDropzone
              onSelected={setFile}
              label="Choose a file"
              maxSizeMB={10}
              hint="Drag & drop or tap to select. Max {SIZE} MB."
              accept=".pdf,application/pdf"
            />
          </div>

          <button
            onClick={onVerify}
            disabled={!file || busy}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-sky-500 px-5 py-2.5 font-medium text-white shadow-md hover:brightness-105 disabled:opacity-50"
          >
            {busy ? "Checking…" : "Verify Proof"}
          </button>

          {/* Résultat */}
          {res && (
            <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                {res.ok ? (
                  <>
                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                    <h2 className="text-lg font-semibold text-emerald-700">
                      Valid
                    </h2>
                  </>
                ) : (
                  <>
                    <ShieldX className="h-5 w-5 text-rose-600" />
                    <h2 className="text-lg font-semibold text-rose-700">
                      Invalid
                    </h2>
                  </>
                )}
              </div>

              <dl className="mt-3 grid gap-y-1 text-sm">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  <dt className="text-slate-600">File</dt>
                  <dd className="col-span-2 sm:col-span-3 break-words text-slate-900">
                    {res.fileName ?? "—"}
                  </dd>
                </div>

                {res.ok ? (
                  <>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      <dt className="text-slate-600">Date / Time</dt>
                      <dd className="col-span-2 sm:col-span-3 text-slate-900">
                        {new Date(res.whenISO!).toLocaleDateString()} —{" "}
                        {new Date(res.whenISO!).toLocaleTimeString()}
                      </dd>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      <dt className="text-slate-600">Issuer</dt>
                      <dd className="col-span-2 sm:col-span-3 text-slate-900">
                        {res.issuer || "—"}
                      </dd>
                    </div>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      <dt className="text-slate-600">SHA-256</dt>
                      <dd className="col-span-2 sm:col-span-3 text-slate-900 break-words">
                        {res.hash}
                      </dd>
                    </div>

                    <div className="mt-5">
                      <button
                        onClick={downloadCert}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-gray-50"
                      >
                        <FileCheck2 className="h-4 w-4 text-sky-600" />
                        Download Certificate (.html)
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    <dt className="text-slate-600">Reason</dt>
                    <dd className="col-span-2 sm:col-span-3 text-rose-700">
                      {res.reason}
                    </dd>
                  </div>
                )}
              </dl>

              {!res.ok && (
                <p className="mt-3 text-xs text-slate-500">
                  If you generated this file with DigitalMeve, make sure you are
                  uploading the <span className="font-medium">.meve.pdf</span>{" "}
                  file (not the original PDF).
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
