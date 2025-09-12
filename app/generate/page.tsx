// app/generate/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import FileDropzone from "@/components/FileDropzone";
import { CTAButton } from "@/components/CTAButton";
import ProgressBar from "@/components/ProgressBar";
import { FileDown, ShieldCheck, FileText } from "lucide-react";
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

  // Proof metadata (preview card)
  const [proofHash, setProofHash] = useState<string | null>(null);
  const [proofWhen, setProofWhen] = useState<string | null>(null);

  // Sortie (.meve.pdf) – on ne télécharge plus automatiquement
  const [outUrl, setOutUrl] = useState<string | null>(null);
  const [outName, setOutName] = useState<string | null>(null);

  // Scroll to preview when ready (good for mobile)
  const proofRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (proofHash && proofWhen && proofRef.current) {
      proofRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [proofHash, proofWhen]);

  // Nettoyage si on régénère (révoquer l’ancienne URL)
  useEffect(() => {
    return () => {
      if (outUrl) URL.revokeObjectURL(outUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    setUploadPct(undefined);
    setProcessing(false);
    setProofHash(null);
    setProofWhen(null);

    // reset sortie précédente
    if (outUrl) URL.revokeObjectURL(outUrl);
    setOutUrl(null);
    setOutName(null);

    if (!file) {
      setErr("Please select a document (PDF for now).");
      return;
    }
    if (file.type !== "application/pdf") {
      setErr("Currently we support PDF. More formats coming soon.");
      return;
    }

    try {
      setProcessing(true);
      setUploadPct(10);

      // 1) Hash de l’original (ancre anti-altération)
      const originalHash = await sha256Hex(file);
      setProofHash(originalHash);

      // 2) Filigrane léger (V1: no-op)
      const watermarked = await addWatermarkPdf(file);
      setUploadPct(55);

      // 3) XMP MEVE : hash + timestamp + issuer (optionnel)
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

      // 4) Préparer la sortie (sans auto-download)
      const { base, ext } = splitName(file.name);
      const name = `${base}.meve.${ext}`;
      const url = URL.createObjectURL(pdfWithMeve);
      setOutName(name);
      setOutUrl(url);

      setMsg(`Ready: ${name}`);
      setProcessing(false);
      setUploadPct(100);
    } catch (e: any) {
      setErr(e?.message ?? "Generation failed.");
      setProcessing(false);
    }
  }

  function downloadMeve() {
    if (!outUrl || !outName) return;

    // 1) Déclencher le téléchargement
    const a = document.createElement("a");
    a.href = outUrl;
    a.download = outName;
    document.body.appendChild(a);
    a.click();
    a.remove();

    // 2) Proposer l’ouverture : onglet temporaire (10s)
    const preview = window.open(outUrl, "_blank", "noopener,noreferrer");
    setTimeout(() => {
      try {
        preview?.close();
      } catch {}
      // NB: on NE révoque PAS l’URL ici pour permettre un second download si besoin.
      // Elle sera révoquée à la prochaine génération ou au démontage.
    }, 10000);
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-100">Generate a .MEVE proof</h1>

      {/* Simple, user-friendly copy (English, no jargon) */}
      <p className="mt-2 text-slate-400">
        Upload your document (PDF for now). We add a light DigitalMeve watermark and store a tamper-proof
        marker inside the file (date, time, and a unique fingerprint). You’ll get{" "}
        <code className="text-slate-300">name.meve.pdf</code>. You can also download a human-readable certificate.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <FileDropzone onSelected={setFile} accept=".pdf,application/pdf" />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="issuer" className="text-sm text-slate-300">
              Issuer (optional)
            </label>
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
          <CTAButton type="submit" aria-label="Generate proof">
            Generate Proof
          </CTAButton>
          {(uploadPct !== undefined || processing) && (
            <div className="mt-3">
              <ProgressBar value={processing ? undefined : uploadPct} />
            </div>
          )}
        </div>

        {/* Bouton de téléchargement (manuel) quand prêt */}
        {outUrl && outName && (
          <div className="mt-2">
            <button
              type="button"
              onClick={downloadMeve}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 font-medium text-white hover:brightness-105"
            >
              <FileDown className="h-5 w-5" />
              Download .MEVE document
            </button>
          </div>
        )}

        {msg && <p className="text-sm text-emerald-300">{msg}</p>}
        {err && <p className="text-sm text-rose-400">{err}</p>}

        {/* Proof preview card (stays visible on mobile; we auto-scroll here when ready) */}
        {(proofHash || proofWhen) && (
          <div
            ref={proofRef}
            className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-5"
          >
            <h3 className="text-slate-100 font-semibold">Proof Preview</h3>
            <ul className="mt-2 text-sm text-slate-400 space-y-1">
              {file && (
                <li>
                  <span className="text-slate-300">File:</span>{" "}
                  {splitName(file.name).base}.meve.pdf
                </li>
              )}
              {proofWhen && (
                <li>
                  <span className="text-slate-300">Date:</span>{" "}
                  {new Date(proofWhen).toLocaleDateString()} —{" "}
                  <span className="text-slate-300">Time:</span>{" "}
                  {new Date(proofWhen).toLocaleTimeString()}
                </li>
              )}
              <li>
                <span className="text-slate-300">Issuer:</span>{" "}
                {issuer.trim() || "—"}
              </li>
              {proofHash && (
                <li className="break-all">
                  <span className="text-slate-300">SHA-256:</span> {proofHash}
                </li>
              )}
            </ul>

            <button
              type="button"
              onClick={() => {
                if (!file || !proofHash || !proofWhen) return;
                exportHtmlCertificate(file.name, proofHash, proofWhen, issuer);
              }}
              className="mt-3 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-100 hover:bg-white/10"
            >
              <FileText className="h-4 w-4" /> Download Certificate (.html)
            </button>
          </div>
        )}
      </form>

      {/* Helper legend */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <FileDown className="h-5 w-5" />
          <span>Download the .MEVE document</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5" />
          <span>Proof embedded (XMP)</span>
        </div>
      </div>
    </section>
  );
}
