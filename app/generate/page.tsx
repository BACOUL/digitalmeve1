// app/generate/page.tsx
"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import { CTAButton } from "@/components/CTAButton";
import ProgressBar from "@/components/ProgressBar";
import { FileDown, ShieldCheck, FileText } from "lucide-react";
import { watermarkPdfFile } from "@/lib/watermark-pdf";
import { embedMeveXmp, sha256Hex } from "@/lib/meve-xmp";
import { buildMeveCertificateHtml } from "@/lib/certificate-html";

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

  // Proof summary (shown after generation)
  const [proofHash, setProofHash] = useState<string | null>(null);
  const [proofWhen, setProofWhen] = useState<string | null>(null);
  const [outputName, setOutputName] = useState<string | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    setUploadPct(undefined);
    setProcessing(false);
    setProofHash(null);
    setProofWhen(null);
    setOutputName(null);
    setPdfBlob(null);

    if (!file) {
      setErr("Please choose a PDF file.");
      return;
    }
    if (file.type !== "application/pdf") {
      setErr("PDF only for now.");
      return;
    }

    try {
      setProcessing(true);
      setUploadPct(10);

      // 1) Hash of the original file (for integrity)
      const originalHash = await sha256Hex(file);
      setProofHash(originalHash);

      // 2) Add a subtle DigitalMeve watermark
      const watermarked = await watermarkPdfFile(file, "DigitalMeve");
      setUploadPct(55);

      // 3) Embed .MEVE data (XMP): hash + date/time + issuer
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

      // 4) Download the .meve.pdf (no auto-open tab)
      const { base, ext } = splitName(file.name);
      const outName = `${base}.meve.${ext}`;
      setOutputName(outName);
      setPdfBlob(pdfWithMeve);

      const url = URL.createObjectURL(pdfWithMeve);
      const a = document.createElement("a");
      a.href = url;
      a.download = outName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setMsg(`Downloaded: ${outName}`);
      setProcessing(false);
      setUploadPct(100);
    } catch (e: any) {
      setErr(e?.message ?? "Generation failed.");
      setProcessing(false);
    }
  }

  // Download the professional HTML certificate (English)
  function downloadCertificate() {
    if (!outputName || !proofHash || !proofWhen) return;
    const certHtml = buildMeveCertificateHtml({
      fileName: outputName,
      createdAtISO: proofWhen,
      issuer: issuer.trim(),
      sha256: proofHash,
      brandName: "DigitalMeve",
      brandTagline: "Trusted Integrity Worldwide",
    });
    const blob = new Blob([certHtml], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Certificate - ${outputName.replace(/\.pdf$/i, "")}.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-100">Generate a .MEVE proof</h1>

      {/* Simple, non-technical explanation */}
      <p className="mt-2 text-slate-400">
        Upload your PDF. We’ll add a light DigitalMeve watermark and store a tamper-evident
        marker inside the file (date, time and a unique fingerprint). You’ll get{" "}
        <code className="text-slate-300">name.meve.pdf</code>. You can also download a
        human-readable certificate.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <FileDropzone onSelected={setFile} accept=".pdf,application/pdf" />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="issuer" className="text-sm text-slate-300">Issuer (optional)</label>
            <input
              id="issuer"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              placeholder="e.g. alice@company.com"
              className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>

        <div className="w-full sm:w-auto">
          <CTAButton type="submit" aria-label="Generate proof">Generate Proof</CTAButton>
          {(uploadPct !== undefined || processing) && (
            <div className="mt-3">
              <ProgressBar value={processing ? undefined : uploadPct} />
            </div>
          )}
        </div>

        {msg && <p className="text-sm text-emerald-300">{msg}</p>}
        {err && <p className="text-sm text-rose-400">{err}</p>}

        {/* Clear “Downloads” section for mobile discoverability */}
        {(outputName || proofHash || proofWhen) && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <h3 className="text-slate-100 font-semibold">Your proof is ready</h3>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border bg-emerald-400/10 text-emerald-300 border-emerald-400/30">
                  Watermarked
                </span>
                <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border bg-blue-400/10 text-blue-300 border-blue-400/30">
                  .MEVE embedded
                </span>
              </div>
            </div>

            <ul className="mt-3 text-sm text-slate-400 space-y-1">
              {outputName && <li><span className="text-slate-300">File:</span> {outputName}</li>}
              {proofWhen && (
                <li>
                  <span className="text-slate-300">Date:</span>{" "}
                  {new Date(proofWhen).toLocaleDateString("en-GB")}{" "}
                  — <span className="text-slate-300">Time:</span>{" "}
                  {new Date(proofWhen).toLocaleTimeString("en-GB")}
                </li>
              )}
              <li><span className="text-slate-300">Issuer:</span> {issuer.trim() || "—"}</li>
              {proofHash && (
                <li className="break-all">
                  <span className="text-slate-300">SHA-256:</span> {proofHash}
                </li>
              )}
            </ul>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Re-download button in case the mobile browser hid the toast */}
              {pdfBlob && outputName && (
                <button
                  type="button"
                  onClick={() => {
                    const url = URL.createObjectURL(pdfBlob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = outputName;
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    URL.revokeObjectURL(url);
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 hover:bg-white/10"
                >
                  <FileDown className="h-4 w-4" /> Download .meve.pdf
                </button>
              )}

              <button
                type="button"
                onClick={downloadCertificate}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 hover:bg-white/10"
              >
                <FileText className="h-4 w-4" /> Download certificate (.html)
              </button>
            </div>
          </div>
        )}
      </form>

      {/* Small legend, English + concise */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2 text-sm text-slate-400">
        <div className="flex items-center gap-2"><FileDown className="h-5 w-5" /><span>Download .meve.pdf</span></div>
        <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5" /><span>Embedded proof (XMP)</span></div>
      </div>
    </section>
  );
}
