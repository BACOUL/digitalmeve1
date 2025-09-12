// app/verify/page.tsx
"use client";

import { useState } from "react";
import { ShieldCheck, ShieldX, FileCheck2 } from "lucide-react";
import FileDropzone from "@/components/FileDropzone";
import { sha256Hex, parseMeveXmp } from "@/lib/meve-xmp";
import { exportHtmlCertificate } from "@/lib/certificate-html";

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
      const buf = await file.arrayBuffer();
      const hash = await sha256Hex(file);

      // Récupérer métadonnées .MEVE (XMP / EXIF / OOXML)
      const meta = await parseMeveXmp(buf);

      if (!meta) {
        setRes({ ok: false, reason: "No MEVE metadata found.", fileName: file.name });
      } else if (meta.hash !== hash) {
        setRes({ ok: false, reason: "Hash mismatch — file was modified.", fileName: file.name });
      } else {
        setRes({
          ok: true,
          fileName: file.name,
          hash,
          whenISO: meta.createdAtISO,
          issuer: meta.issuer,
        });
      }
    } catch (e) {
      console.error(e);
      setRes({ ok: false, reason: "Error while verifying the file.", fileName: file?.name });
    } finally {
      setBusy(false);
    }
  }

  function downloadCert() {
    if (!res?.ok || !res.fileName || !res.hash || !res.whenISO) return;
    exportHtmlCertificate(res.fileName.replace(/\.pdf$/i, ""), res.hash, res.whenISO, res.issuer || "");
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:py-12">
          {/* Titre */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Verify a <span className="text-emerald-600">.MEVE</span> file
          </h1>
          <p className="mt-3 text-lg text-slate-700">
            Upload a .MEVE file (PDF with embedded proof). We’ll check its fingerprint and show whether the document is <strong>valid</strong> or <strong>tampered</strong>.
          </p>

          {/* Dropzone */}
          <div className="mt-8">
            <FileDropzone
              onSelected={setFile}
              label="Choose a file"
              maxSizeMB={10}
              hint="Drag & drop or tap to select. Max {SIZE} MB."
              accept=".pdf,application/pdf"
            />
          </div>

          {/* CTA */}
          <button
            onClick={onVerify}
            disabled={!file || busy}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-sky-500 px-5 py-2.5 font-medium text-white shadow-md hover:brightness-105 disabled:opacity-50"
          >
            {busy ? "Verifying…" : "Verify Proof"}
          </button>

          {/* Résultat */}
          {res && (
            <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                {res.ok ? (
                  <ShieldCheck className="h-6 w-6 text-emerald-600" />
                ) : (
                  <ShieldX className="h-6 w-6 text-red-600" />
                )}
                <h2 className="text-lg font-semibold text-slate-900">
                  {res.ok ? "Verified" : "Invalid"}
                </h2>
              </div>

              <dl className="mt-3 grid gap-y-1 text-sm">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  <dt className="text-slate-600">File</dt>
                  <dd className="col-span-2 sm:col-span-3 break-words text-slate-900">{res.fileName}</dd>
                </div>
                {res.whenISO && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    <dt className="text-slate-600">Date / Time</dt>
                    <dd className="col-span-2 sm:col-span-3 text-slate-900">
                      {new Date(res.whenISO).toLocaleDateString()} — {new Date(res.whenISO).toLocaleTimeString()}
                    </dd>
                  </div>
                )}
                {res.issuer && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    <dt className="text-slate-600">Issuer</dt>
                    <dd className="col-span-2 sm:col-span-3 text-slate-900">{res.issuer}</dd>
                  </div>
                )}
                {res.hash && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    <dt className="text-slate-600">SHA-256</dt>
                    <dd className="col-span-2 sm:col-span-3 text-slate-900 break-words">{res.hash}</dd>
                  </div>
                )}
                {!res.ok && res.reason && (
                  <p className="mt-2 text-sm text-red-600">{res.reason}</p>
                )}
              </dl>

              {/* Boutons si vérifié */}
              {res.ok && (
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={downloadCert}
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-gray-50"
                  >
                    <FileCheck2 className="h-4 w-4 text-sky-600" />
                    Download Certificate (.html)
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
