// app/generate/page.tsx
"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import { CTAButton } from "@/components/CTAButton";
import ProgressBar from "@/components/ProgressBar";
import { FileDown, ShieldCheck, FileText } from "lucide-react";
import { watermarkPdfFile } from "@/lib/watermark-pdf";
import { embedMeveXmp, sha256Hex } from "@/lib/meve-xmp";

function splitName(name?: string) {
  if (!name) return { base: "file", ext: "bin" };
  const m = name.match(/^(.+)\.([^.]+)$/);
  return m ? { base: m[1], ext: m[2] } : { base: name, ext: "bin" };
}

export default function GeneratePage() {
  const [file, setFile] = useState<File | null>(null);
  const [issuer, setIssuer] = useState("");
  const [openAfter, setOpenAfter] = useState(true);      // ✅ ouvrir dans un onglet

  const [uploadPct, setUploadPct] = useState<number | undefined>(undefined);
  const [processing, setProcessing] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  // aperçu de la “preuve” à l’écran
  const [proofHash, setProofHash] = useState<string | null>(null);
  const [proofWhen, setProofWhen] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    setUploadPct(undefined);
    setProcessing(false);
    setProofHash(null);
    setProofWhen(null);

    if (!file) {
      setErr("Sélectionne un fichier PDF.");
      return;
    }
    if (file.type !== "application/pdf") {
      setErr("Pour l’instant, seul le PDF est supporté.");
      return;
    }

    try {
      setProcessing(true);
      setUploadPct(10);

      // 1) SHA-256 de l’original (preuve d’intégrité)
      const originalHash = await sha256Hex(file);
      setProofHash(originalHash);

      // 2) Filigrane visible
      const watermarked = await watermarkPdfFile(file, "DigitalMeve");
      setUploadPct(60);

      // 3) XMP MEVE avec doc_sha256 + date/heure + issuer
      const createdAtISO = new Date().toISOString();
      const pdfWithMeveBlob = await embedMeveXmp(watermarked, {
        docSha256: originalHash,
        createdAtISO,
        issuer: issuer.trim(),
        issuerType: "personal",
        issuerWebsite: "https://digitalmeve.com",
      });
      setProofWhen(createdAtISO);
      setUploadPct(85);

      // 4) Téléchargement + (option) ouverture dans un onglet
      const { base, ext } = splitName(file.name);
      const outName = `${base}.meve.${ext}`;
      const url = URL.createObjectURL(pdfWithMeveBlob);

      // téléchargement
      const a = document.createElement("a");
      a.href = url;
      a.download = outName;
      document.body.appendChild(a);
      a.click();
      a.remove();

      // ouverture dans un onglet (si PDF, utile sur mobile)
      if (openAfter) {
        window.open(url, "_blank", "noopener,noreferrer");
      }
      // on libère après un petit délai si onglet ouvert
      setTimeout(() => URL.revokeObjectURL(url), 15_000);

      setMsg(`Téléchargé : ${outName}`);
      setProcessing(false);
      setUploadPct(100);
    } catch (e: any) {
      setErr(e?.message ?? "Échec de génération.");
      setProcessing(false);
    }
  }

  // export facultatif d’un certificat HTML (juste la mise en page du hash + date/heure)
  function exportHtmlCertificate() {
    if (!proofHash || !proofWhen || !file) return;
    const { base } = splitName(file.name);
    const html = `<!doctype html>
<html lang="fr"><meta charset="utf-8">
<title>Certificat .MEVE — ${base}</title>
<style>
  body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,'Helvetica Neue',Arial;color:#0f172a;background:#0b1220;margin:0;padding:32px}
  .card{max-width:760px;margin:auto;background:#0f172a;border:1px solid #243045;border-radius:16px;padding:24px;box-shadow:0 8px 30px rgba(0,0,0,.35)}
  h1{margin:0 0 8px;font-size:22px;color:#e2e8f0}
  p,li,code{color:#94a3b8;font-size:14px;line-height:1.5}
  code{word-break:break-all}
  .row{display:grid;grid-template-columns:160px 1fr;gap:12px;margin:10px 0}
  .k{color:#cbd5e1}
  .ok{display:inline-block;padding:.25rem .6rem;border:1px solid #34d39955;border-radius:999px;color:#34d399}
</style>
<div class="card">
  <h1>Certificat .MEVE <span class="ok">VALIDE</span></h1>
  <div class="row"><div class="k">Fichier</div><div>${base}.meve.pdf</div></div>
  <div class="row"><div class="k">Date</div><div>${new Date(proofWhen).toLocaleDateString()}</div></div>
  <div class="row"><div class="k">Heure</div><div>${new Date(proofWhen).toLocaleTimeString()}</div></div>
  <div class="row"><div class="k">SHA-256</div><div><code>${proofHash}</code></div></div>
  <p>Ce certificat reprend les informations inscrites dans les métadonnées XMP du PDF.</p>
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
        On calcule le <b>SHA-256</b> de ton PDF, on applique un filigrane visible puis on inscrit une marque <b>MEVE (XMP)</b>
        contenant le hash et la date/heure. Tu récupères <code className="text-slate-300">name.meve.pdf</code>.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <FileDropzone onSelected={setFile} accept=".pdf,application/pdf" />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="issuer" className="text-sm text-slate-300">Issuer (optionnel)</label>
            <input
              id="issuer"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              placeholder="e.g. alice@company.com"
              className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
          <label className="flex items-end gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-white/20 bg-slate-900"
              checked={openAfter}
              onChange={(e) => setOpenAfter(e.target.checked)}
            />
            Ouvrir le PDF généré dans un onglet
          </label>
        </div>

        <div className="w-full sm:w-auto">
          <CTAButton type="submit" aria-label="Generate proof">Generate Proof</CTAButton>
          {(uploadPct !== undefined || processing) && (
            <div className="mt-3"><ProgressBar value={processing ? undefined : uploadPct} /></div>
          )}
        </div>

        {msg && <p className="text-sm text-emerald-300">{msg}</p>}
        {err && <p className="text-sm text-rose-400">{err}</p>}

        {/* Aperçu “preuve” */}
        {(proofHash || proofWhen) && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <h3 className="text-slate-100 font-semibold">Aperçu du certificat</h3>
            <ul className="mt-2 text-sm text-slate-400 space-y-1">
              {proofWhen && (
                <li>
                  <span className="text-slate-300">Date :</span> {new Date(proofWhen).toLocaleDateString()} —{" "}
                  <span className="text-slate-300">Heure :</span> {new Date(proofWhen).toLocaleTimeString()}
                </li>
              )}
              {proofHash && (
                <li className="break-all">
                  <span className="text-slate-300">SHA-256 :</span> {proofHash}
                </li>
              )}
            </ul>
            <button
              type="button"
              onClick={exportHtmlCertificate}
              className="mt-3 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-100 hover:bg-white/10"
            >
              <FileText className="h-4 w-4" /> Exporter en .html (facultatif)
            </button>
          </div>
        )}
      </form>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 text-sm text-slate-400">
        <div className="flex items-center gap-2"><FileDown className="h-5 w-5" /><span>Télécharger le document meve</span></div>
        <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5" /><span>Preuve intégrée (XMP)</span></div>
      </div>
    </section>
  );
            }
