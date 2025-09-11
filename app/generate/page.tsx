// app/generate/page.tsx
"use client";

import { useRef, useState } from "react";
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
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  // Aperçu de la preuve
  const [proofHash, setProofHash] = useState<string | null>(null);
  const [proofWhen, setProofWhen] = useState<string | null>(null);

  // Ancre pour faire défiler vers la carte de résultat (mobile)
  const resultRef = useRef<HTMLDivElement | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    setUploadPct(undefined);
    setProcessing(false);
    setProofHash(null);
    setProofWhen(null);

    if (!file) {
      setErr("Select a document first.");
      return;
    }
    if (file.type !== "application/pdf") {
      setErr("Right now we support PDFs only.");
      return;
    }

    try {
      setProcessing(true);
      setUploadPct(10);

      // 1) Hash de l’original (preuve d’intégrité)
      const originalHash = await sha256Hex(file);
      setProofHash(originalHash);

      // 2) Filigrane discret coloré
      const watermarked = await watermarkPdfFile(file, "DigitalMeve");
      setUploadPct(55);

      // 3) XMP MEVE : hash + date/heure + issuer
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

      // 4) Téléchargement du .meve.pdf
      const { base, ext } = splitName(file.name);
      const outName = `${base}.meve.${ext}`;
      const url = URL.createObjectURL(pdfWithMeve);

      const a = document.createElement("a");
      a.href = url;
      a.download = outName;
      document.body.appendChild(a);
      a.click();
      a.remove();

      // Nettoyage URL + message
      setTimeout(() => URL.revokeObjectURL(url), 15000);
      setMsg(`Downloaded: ${outName}`);
      setProcessing(false);
      setUploadPct(100);

      // 👉 Amélioration mobile : faire défiler vers la carte “Your proof is ready”
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    } catch (e: any) {
      setErr(e?.message ?? "Generation failed.");
      setProcessing(false);
    }
  }

  // Export du certificat HTML (pro, lisible)
  function exportHtmlCertificate() {
    if (!file || !proofHash || !proofWhen) return;
    const { base } = splitName(file.name);
    const issuerShown = issuer.trim() || "—";
    const html = `<!doctype html>
<html lang="en"><meta charset="utf-8">
<title>.MEVE Certificate — ${base}</title>
<style>
  :root{--bg:#0b1220;--card:#0f172a;--muted:#94a3b8;--text:#e2e8f0;--border:#243045;--ok:#34d399}
  *{box-sizing:border-box} body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,'Helvetica Neue',Arial;color:var(--text);background:var(--bg);margin:0}
  .wrap{max-width:880px;margin:0 auto;padding:28px}
  .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:22px;box-shadow:0 8px 30px rgba(0,0,0,.35)}
  h1{margin:0 0 10px;font-size:22px}
  .ok{display:inline-block;margin-left:8px;padding:.25rem .6rem;border:1px solid color-mix(in oklab, var(--ok), transparent 55%);border-radius:999px;color:var(--ok);font-size:12px}
  .row{display:grid;grid-template-columns:160px 1fr;gap:12px;margin:10px 0}
  .k{color:#cbd5e1}
  code{color:var(--muted);word-break:break-all}
</style>
<div class="wrap">
  <div class="card">
    <h1>.MEVE Certificate <span class="ok">VALID</span></h1>
    <div class="row"><div class="k">File</div><div>${base}.meve.pdf</div></div>
    <div class="row"><div class="k">Date</div><div>${new Date(proofWhen).toLocaleDateString("en-GB")}</div></div>
    <div class="row"><div class="k">Time</div><div>${new Date(proofWhen).toLocaleTimeString("en-GB")}</div></div>
    <div class="row"><div class="k">Issuer</div><div>${issuerShown}</div></div>
    <div class="row"><div class="k">SHA-256</div><div><code>${proofHash}</code></div></div>
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
    <section className="mx-auto max-w-3xl px-4 py-12 pb-28"> {/* pb-28 => évite que ça coupe en bas sur mobile */}
      <h1 className="text-3xl font-bold text-slate-100">Generate a .MEVE proof</h1>

      {/* ✅ Texte simple, non technique, “document” (pas que PDF) */}
      <p className="mt-2 text-slate-400 leading-relaxed">
        Upload your document (PDF recommended). We’ll add a light DigitalMeve watermark (for PDFs) and
        store a tamper-evident marker inside the file: the date, time and a unique SHA-256 fingerprint.
        You’ll receive a copy named <code className="text-slate-300">name.meve.ext</code>.
        You can also download a human-readable certificate.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        {/* Accept PDF pour l’instant, mais wording “document” côté texte */}
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

        {msg && <p className="text-sm text-emerald-300">{msg}</p>}
        {err && <p className="text-sm text-rose-400">{err}</p>}

        {/* 📌 Carte résultat bien visible ; ancre pour scrollIntoView */}
        {(proofHash || proofWhen) && (
          <div ref={resultRef} className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <h3 className="text-slate-100 font-semibold">Your proof is ready</h3>
            <ul className="mt-2 text-sm text-slate-400 space-y-1">
              {file && (
                <li><span className="text-slate-300">File:</span> {splitName(file.name).base}.meve.pdf</li>
              )}
              {proofWhen && (
                <li>
                  <span className="text-slate-300">Date:</span> {new Date(proofWhen).toLocaleDateString("en-GB")} —{" "}
                  <span className="text-slate-300">Time:</span> {new Date(proofWhen).toLocaleTimeString("en-GB")}
                </li>
              )}
              <li><span className="text-slate-300">Issuer:</span> {issuer.trim() || "—"}</li>
              {proofHash && (
                <li className="break-all">
                  <span className="text-slate-300">SHA-256:</span> {proofHash}
                </li>
              )}
            </ul>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={exportHtmlCertificate}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100 hover:bg-white/10"
              >
                <FileText className="h-4 w-4" /> Download certificate (.html)
              </button>
            </div>

            {/* Badges de réassurance */}
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-300">
                Watermarked
              </span>
              <span className="rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-sky-300">
                .MEVE marker embedded (XMP)
              </span>
            </div>
          </div>
        )}
      </form>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <FileDown className="h-5 w-5" />
          <span>Download .meve document</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5" />
          <span>Embedded proof (XMP)</span>
        </div>
      </div>
    </section>
  );
}
