"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FileDropzone from "@/components/FileDropzone";
import { CTAButton } from "@/components/CTAButton";
import ProgressBar from "@/components/ProgressBar";
import { FileText, FileDown, ShieldCheck, Download } from "lucide-react";

import { addWatermarkPdf } from "@/lib/watermark-pdf";
import { embedMeveXmp, sha256Hex } from "@/lib/meve-xmp";
import { exportHtmlCertificate } from "@/lib/certificate-html";

function splitName(name?: string) {
  if (!name) return { base: "file", ext: "pdf" };
  const m = name.match(/^(.+)\.([^.]+)$/);
  return m ? { base: m[1], ext: m[2] } : { base: name, ext: "pdf" };
}

export default function GeneratePage() {
  const [file, setFile] = useState<File | null>(null);
  const [issuer, setIssuer] = useState("");

  const [uploadPct, setUploadPct] = useState<number | undefined>(undefined);
  const [processing, setProcessing] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  // Aperçu
  const [proofHash, setProofHash] = useState<string | null>(null);
  const [proofWhen, setProofWhen] = useState<string | null>(null);

  // Lien de téléchargement du .meve.pdf (pas d’auto-open)
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outName, setOutName] = useState<string | null>(null);

  const proofRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (proofHash && proofWhen && proofRef.current) {
      proofRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [proofHash, proofWhen]);

  // Nettoyage URL objet si on change de fichier ou démonte
  useEffect(() => {
    return () => {
      if (outUrl) URL.revokeObjectURL(outUrl);
    };
  }, [outUrl]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    setUploadPct(undefined);
    setProcessing(false);
    setProofHash(null);
    setProofWhen(null);
    if (outUrl) {
      URL.revokeObjectURL(outUrl);
      setOutUrl(null);
      setOutName(null);
    }

    if (!file) {
      setErr("Please select a document (PDF for now).");
      return;
    }
    if (file.type !== "application/pdf") {
      setErr("V1 supports PDF only. More formats are coming soon.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setErr("File too large. Max 10 MB.");
      return;
    }

    try {
      setProcessing(true);
      setUploadPct(10);

      const originalHash = await sha256Hex(file);
      setProofHash(originalHash);

      const watermarked = await addWatermarkPdf(file);
      setUploadPct(55);

      const createdAtISO = new Date().toISOString();
      const pdfWithMeve = await embedMeveXmp(watermarked, {
        docSha256: originalHash,
        createdAtISO,
        issuer: issuer.trim(),
        issuerType: "personal",
        issuerWebsite: "https://digitalmeve.com",
      });
      setProofWhen(createdAtISO);
      setUploadPct(85);

      // ⬇️ Nouveau : on prépare juste l’URL + nom, pas d’ouverture / auto-download
      const { base, ext } = splitName(file.name);
      const name = `${base}.meve.${ext}`;
      const url = URL.createObjectURL(pdfWithMeve);
      setOutUrl(url);
      setOutName(name);

      setMsg(`Ready: ${name}`);
      setProcessing(false);
      setUploadPct(100);
    } catch (e: any) {
      setErr(e?.message ?? "Generation failed.");
      setProcessing(false);
    }
  }

  // Téléchargement manuel du .meve.pdf
  function downloadMeve() {
    if (!outUrl || !outName) return;
    const a = document.createElement("a");
    a.href = outUrl;
    a.download = outName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  return (
    <main className="bg-white text-slate-900">
      <section className="mx-auto max-w-3xl px-4 py-10 sm:py-12">
        <header className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Products
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Generate a <span className="text-emerald-600">.MEVE</span> proof
          </h1>
          <p className="mt-3 text-slate-600">
            Upload your document (PDF for now). We add a light DigitalMeve watermark and store a
            tamper-proof marker inside the file (date, time, and a unique fingerprint). You’ll get{" "}
            <code className="font-semibold text-slate-800">name.meve.pdf</code>. You can also
            download a human-readable certificate.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            <span className="font-medium text-slate-700">Limits (V1):</span> Max 10 MB · 5 files/day (free plan).
          </p>
        </header>

        <form onSubmit={onSubmit} className="space-y-6">
          <FileDropzone
            onSelected={setFile}
            accept=".pdf,application/pdf"
            maxSizeMB={10}
            label="Choose a file"
            hint="Drag & drop or tap to select. Max {SIZE} MB. PDF only in V1."
          />

          <div>
            <label htmlFor="issuer" className="block text-sm font-medium text-slate-700">
              Issuer (optional)
            </label>
            <input
              id="issuer"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              placeholder="e.g. alice@company.com"
              className="input mt-1"
            />
          </div>

          <div className="w-full sm:w-auto">
            <CTAButton type="submit" aria-label="Generate proof">
              Generate Proof
            </CTAButton>
            {(uploadPct !== undefined || processing) && (
              <div className="mt-3">
                <ProgressBar value={processing ? undefined : uploadPct} />
              </div>
            )}
          </div>

          {msg && <p className="text-sm text-emerald-700">{msg}</p>}
          {err && <p className="text-sm text-rose-600">{err}</p>}

          {(proofHash || proofWhen) && (
            <div
              ref={proofRef}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <h3 className="font-semibold text-slate-900">Proof Preview</h3>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                {file && (
                  <li>
                    <span className="text-slate-500">File:</span>{" "}
                    {splitName(file.name).base}.meve.pdf
                  </li>
                )}
                {proofWhen && (
                  <li>
                    <span className="text-slate-500">Date:</span>{" "}
                    {new Date(proofWhen).toLocaleDateString()} —{" "}
                    <span className="text-slate-500">Time:</span>{" "}
                    {new Date(proofWhen).toLocaleTimeString()}
                  </li>
                )}
                <li>
                  <span className="text-slate-500">Issuer:</span>{" "}
                  {issuer.trim() || "—"}
                </li>
                {proofHash && (
                  <li className="break-all">
                    <span className="text-slate-500">SHA-256:</span> {proofHash}
                  </li>
                )}
              </ul>

              {/* ⬇️ Nouveaux boutons de téléchargement manuels */}
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  disabled={!outUrl}
                  onClick={downloadMeve}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-slate-800 hover:bg-gray-50 disabled:opacity-50"
                >
                  <Download className="h-4 w-4" />
                  Download .MEVE document
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!file || !proofHash || !proofWhen) return;
                    exportHtmlCertificate(file.name, proofHash, proofWhen, issuer);
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-slate-800 hover:bg-gray-50"
                >
                  <FileText className="h-4 w-4" /> Download Certificate (.html)
                </button>
              </div>
            </div>
          )}
        </form>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <FileDown className="h-5 w-5 text-slate-500" />
            <span>Download the .MEVE document</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-slate-500" />
            <span>Proof embedded (XMP)</span>
          </div>
        </div>

        <div className="mt-10">
          <Link
            href="/verify"
            className="text-sky-700 underline decoration-sky-300 underline-offset-4 hover:text-sky-900"
          >
            Already have a file? Verify it here →
          </Link>
        </div>
      </section>
    </main>
  );
}
