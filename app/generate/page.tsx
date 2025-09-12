// app/generate/page.tsx
"use client";

import { useState } from "react";
import { Upload, FileDown, FileCheck2 } from "lucide-react";
import FileDropzone from "@/components/FileDropzone";
import { addWatermarkPdf } from "@/lib/watermark-pdf";
import { embedMeveXmp, sha256Hex } from "@/lib/meve-xmp";
import { exportHtmlCertificate } from "@/lib/certificate-html";

type GenResult = {
  pdfBlob?: Blob;
  fileName?: string;
  hash?: string;
  whenISO?: string;
};

export default function GeneratePage() {
  const [file, setFile] = useState<File | null>(null);
  const [issuer, setIssuer] = useState("");
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<GenResult>({});

  async function onGenerate() {
    if (!file) return;
    setBusy(true);
    try {
      // 1) Hash du fichier source (spéc MEVE)
      const hash = await sha256Hex(file);

      // 2) Watermark -> ArrayBuffer
      const watermarkedAB = await addWatermarkPdf(file); // ArrayBuffer

      // 3) Convertir en Blob PDF pour embedMeveXmp (qui accepte Blob | ArrayBuffer)
      const watermarkedBlob = new Blob([watermarkedAB], { type: "application/pdf" });

      const whenISO = new Date().toISOString();

      // 4) Embedding XMP avec Blob en entrée
      const xmpOut = await embedMeveXmp(watermarkedBlob, {
        docSha256: hash,
        createdAtISO: whenISO,
        issuer,
        issuerType: "personal",
        issuerWebsite: "https://digitalmeve.com",
      });

      // 5) Normaliser la sortie en Blob (PDF)
      const outBlob =
        xmpOut instanceof Blob
          ? xmpOut
          : new Blob([xmpOut as ArrayBuffer | Uint8Array], { type: "application/pdf" });

      const outName = toMeveName(file.name);
      setRes({ pdfBlob: outBlob, fileName: outName, hash, whenISO });
    } catch (e) {
      console.error(e);
      alert("Error while generating the proof.");
    } finally {
      setBusy(false);
    }
  }

  function toMeveName(name: string) {
    const m = name.match(/^(.+)\.([^.]+)$/);
    const base = m ? m[1] : name;
    return `${base}.meve.pdf`;
  }

  // Ouverture 10s + fallback téléchargement (inchangé)
  function downloadPDF() {
    if (!res.pdfBlob || !res.fileName) return;
    const url = URL.createObjectURL(res.pdfBlob);

    const w = window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => {
      try {
        w?.close();
      } catch {}
      URL.revokeObjectURL(url);
    }, 10000);

    const a = document.createElement("a");
    a.href = url;
    a.download = res.fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function downloadCert() {
    if (!res.fileName || !res.hash || !res.whenISO) return;
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
          {/* Titre très lisible */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Generate a <span className="text-emerald-600">.MEVE</span> proof
          </h1>
          <p className="mt-3 text-lg text-slate-700">
            Upload your document (PDF for now). We add a lightweight DigitalMeve
            marker (date, time, and a unique fingerprint). You’ll get{" "}
            <span className="font-semibold">
              name<span className="text-slate-400">.meve</span>.pdf
            </span>{" "}
            and an optional human-readable certificate (.html).
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

          {/* Issuer */}
          <div className="mt-5">
            <label className="block text-sm font-medium text-slate-800">
              Issuer (optional)
            </label>
            <input
              type="email"
              placeholder="e.g. alice@company.com"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              className="mt-1 w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            />
          </div>

          {/* CTA */}
          <button
            onClick={onGenerate}
            disabled={!file || busy}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-sky-500 px-5 py-2.5 font-medium text-white shadow-md hover:brightness-105 disabled:opacity-50"
          >
            <Upload className="h-5 w-5" />
            {busy ? "Generating…" : "Generate Proof"}
          </button>

          {/* Proof Preview — les deux téléchargements dans la carte */}
          {res.pdfBlob && res.fileName && (
            <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Proof Preview</h2>

              <dl className="mt-3 grid gap-y-1 text-sm">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  <dt className="text-slate-600">File</dt>
                  <dd className="col-span-2 sm:col-span-3 break-words text-slate-900">
                    {res.fileName}
                  </dd>
                </div>
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
                    {issuer || "—"}
                  </dd>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  <dt className="text-slate-600">SHA-256</dt>
                  <dd className="col-span-2 sm:col-span-3 text-slate-900 break-words">
                    {res.hash}
                  </dd>
                </div>
              </dl>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={downloadPDF}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-gray-50"
                >
                  <FileDown className="h-4 w-4 text-emerald-600" />
                  Download .MEVE document
                </button>
                <button
                  onClick={downloadCert}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-gray-50"
                >
                  <FileCheck2 className="h-4 w-4 text-sky-600" />
                  Download Certificate (.html)
                </button>
              </div>

              <p className="mt-3 text-xs text-slate-500">
                Your browser may briefly open a preview tab (~10s) so you can
                choose “Open” if needed.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
          }
