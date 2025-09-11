// app/generate/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import FileDropzone from "@/components/FileDropzone";
import { CTAButton } from "@/components/CTAButton";
import ProgressBar from "@/components/ProgressBar";
import { FileDown, ShieldCheck, FileText } from "lucide-react";
import { watermarkPdfFile } from "@/lib/watermark-pdf";
import { embedMeveXmp, sha256Hex } from "@/lib/meve-xmp";

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
  const [err, setErr] = useState<string | null>(null);

  // Preuve affichée
  const [proofHash, setProofHash] = useState<string | null>(null);
  const [proofWhen, setProofWhen] = useState<string | null>(null);
  const [meveUrl, setMeveUrl] = useState<string | null>(null);

  const proofRef = useRef<HTMLDivElement>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setUploadPct(undefined);
    setProcessing(false);
    setProofHash(null);
    setProofWhen(null);
    setMeveUrl(null);

    if (!file) {
      setErr("Please select a PDF file.");
      return;
    }
    if (file.type !== "application/pdf") {
      setErr("Only PDF files are supported for now.");
      return;
    }

    try {
      setProcessing(true);
      setUploadPct(15);

      // 1) Compute SHA-256
      const originalHash = await sha256Hex(file);
      setProofHash(originalHash);

      // 2) Watermark
      const watermarked = await watermarkPdfFile(file, "DigitalMeve");
      setUploadPct(50);

      // 3) XMP embedding
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

      // 4) Keep in memory, no auto-download
      const url = URL.createObjectURL(pdfWithMeve);
      setMeveUrl(url);

      setProcessing(false);
      setUploadPct(100);

      // scroll automatique vers la preuve
      setTimeout(() => {
        proofRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } catch (e: any) {
      setErr(e?.message ?? "Failed to generate.");
      setProcessing(false);
    }
  }

  function exportHtmlCertificate() {
    if (!file || !proofHash || !proofWhen) return;
    const { base } = splitName(file.name);
    const issuerShown = issuer.trim() || "—";
    const html = `<!doctype html>
<html lang="en"><meta charset="utf-8">
<title>.MEVE Certificate — ${base}</title>
<style>
  body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,'Helvetica Neue',Arial;color:#e2e8f0;background:#0b1220;margin:0}
  .wrap{max-width:880px;margin:0 auto;padding:28px}
  .card{background:#0f172a;border:1px solid #243045;border-radius:16px;padding:22px;box-shadow:0 8px 30px rgba(0,0,0,.35)}
  h1{margin:0 0 10px;font-size:22px}
  .ok{display:inline-block;margin-left:8px;padding:.25rem .6rem;border:1px solid #34d39955;border-radius:999px;color:#34d399;font-size:12px}
  .row{display:grid;grid-template-columns:160px 1fr;gap:12px;margin:10px 0}
  .k{color:#cbd5e1}
  code{color:#94a3b8;word-break:break-all}
</style>
<div class="wrap">
  <div class="card">
    <h1>.MEVE Certificate <span class="ok">VALID</span></h1>
    <div class="row"><div class="k">File</div><div>${base}.meve.pdf</div></div>
    <div class="row"><div class="k">Date</div><div>${new Date(proofWhen).toLocaleDateString()}</div></div>
    <div class="row"><div class="k">Time</div><div>${new Date(proofWhen).toLocaleTimeString()}</div></div>
    <div class="row"><div class="k">Issuer</div><div>${issuerShown}</div></div>
    <div class="row"><div class="k">SHA-256</div><div><code>${proofHash}</code></div></div>
    <p style="color:#94a3b8;font-size:14px;margin-top:14px">
      This certificate contains the information stored in the PDF’s XMP metadata.
    </p>
  </div>
</div>
</html>`;
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${base}.meve.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-100">Generate a .MEVE proof</h1>
      <p className="mt-2 text-slate-400">
        Upload your document. We’ll add a light DigitalMeve watermark and record a secure marker inside it 
        (date, time, and a unique fingerprint). You’ll receive a new file 
        <code className="text-slate-300"> name.meve.pdf</code>. 
        You can also download a human-readable certificate.
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
            <div className="mt-3"><ProgressBar value={processing ? undefined : uploadPct} /></div>
          )}
        </div>

        {err && <p className="text-sm text-rose-400">{err}</p>}
      </form>

      {(proofHash || proofWhen) && (
        <div ref={proofRef} className="mt-10 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
          <h3 className="text-slate-100 font-semibold">Your .MEVE proof</h3>
          <ul className="mt-2 text-sm text-slate-400 space-y-1">
            {file && (
              <li><span className="text-slate-300">File:</span> {splitName(file.name).base}.meve.pdf</li>
            )}
            {proofWhen && (
              <li>
                <span className="text-slate-300">Date:</span> {new Date(proofWhen).toLocaleDateString()} —{" "}
                <span className="text-slate-300">Time:</span> {new Date(proofWhen).toLocaleTimeString()}
              </li>
            )}
            <li><span className="text-slate-300">Issuer:</span> {issuer.trim() || "—"}</li>
            {proofHash && (
              <li className="break-all">
                <span className="text-slate-300">SHA-256:</span> {proofHash}
              </li>
            )}
          </ul>

          <div className="mt-4 flex flex-wrap gap-3">
            {meveUrl && (
              <a
                href={meveUrl}
                download={`${splitName(file?.name).base}.meve.pdf`}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-100 hover:bg-white/10"
              >
                <FileDown className="h-4 w-4" /> Download .MEVE file
              </a>
            )}
            <button
              type="button"
              onClick={exportHtmlCertificate}
              className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-100 hover:bg-white/10"
            >
              <FileText className="h-4 w-4" /> Download certificate (.html)
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-3 sm:grid-cols-2 text-sm text-slate-400">
        <div className="flex items-center gap-2"><FileDown className="h-5 w-5" /><span>.MEVE document download</span></div>
        <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5" /><span>Embedded proof (XMP)</span></div>
      </div>
    </section>
  );
}
