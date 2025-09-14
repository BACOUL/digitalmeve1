// app/generate/page.tsx
"use client";

import { useMemo, useState } from "react";
import { Upload, FileDown, FileCheck2, ShieldCheck, Lock } from "lucide-react";
import FileDropzone from "@/components/FileDropzone";
import { addWatermarkPdf } from "@/lib/watermark-pdf";
import { sha256Hex } from "@/lib/meve-xmp";
import { exportHtmlCertificate } from "@/lib/certificate-html";
import { embedInvisibleWatermarkPdf } from "@/lib/wm/pdf";   // PDF invisible watermark
import { embedInvisibleWatermarkDocx } from "@/lib/wm/docx"; // DOCX invisible watermark

// 🔹 Ajouts “soft” pour le quota invité (étape 2 faite précédemment)
import LimitModal from "@/components/LimitModal";
import { checkFreeQuota } from "@/lib/quotaClient";

type GenResult = {
  pdfBlob?: Blob; // on réutilise ce champ pour PDF *et* DOCX
  fileName?: string;
  hash?: string;
  whenISO?: string;
};

export default function GeneratePage() {
  const [file, setFile] = useState<File | null>(null);
  const [issuer, setIssuer] = useState("");
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<GenResult>({});

  // UI quota
  const [limitOpen, setLimitOpen] = useState(false);
  const [quotaCount, setQuotaCount] = useState<number | undefined>(undefined);
  const [quotaResetDay, setQuotaResetDay] = useState<string | undefined>(undefined);
  const [quotaRemaining, setQuotaRemaining] = useState<number | undefined>(undefined);

  const kind = useMemo<"pdf" | "docx" | "other">(() => {
    if (!file) return "other";
    const mt = (file.type || "").toLowerCase();
    const name = file.name.toLowerCase();
    if (mt === "application/pdf" || name.endsWith(".pdf")) return "pdf";
    if (
      mt === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
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
      mt === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      name.endsWith(".docx")
    )
      return "docx";
    return "other";
  }

  async function onGenerate() {
    if (!file) return;
    setBusy(true);
    try {
      // 0) Vérifier quota invité AVANT toute opération
      try {
        const q = await checkFreeQuota();
        setQuotaRemaining(q.remaining);
        setQuotaCount(q.count);
        setQuotaResetDay(q.resetDayUTC);
      } catch (err: any) {
        if (err?.quota?.reason === "limit_reached") {
          setQuotaCount(err.quota.count);
          setQuotaResetDay(err.quota.resetDayUTC);
          setLimitOpen(true);
          return; // stoppe le flux
        }
        // erreur réseau ponctuelle : on laisse passer pour ne pas bloquer l’utilisateur
      }

      const k = guessKind(file);
      if (k === "other") {
        alert("Only PDF and DOCX are supported for now.");
        return;
      }

      // 1) Hash de l’original (spéc MEVE)
      const hash = await sha256Hex(file);
      const whenISO = new Date().toISOString();

      let outBlob: Blob;
      let outName: string;

      if (k === "pdf") {
        // 2) PDF : watermark visuel → ArrayBuffer → Blob
        const watermarkedAB = await addWatermarkPdf(file);
        const watermarkedBlob = new Blob([watermarkedAB], { type: "application/pdf" });

        // 3) Filigrane *invisible* %MEVE{...}EVEM avant %%EOF
        outBlob = await embedInvisibleWatermarkPdf(watermarkedBlob, {
          hash,
          ts: whenISO,
          issuer: issuer || undefined,
        });

        outName = toMeveName(file.name, "pdf");
      } else {
        // DOCX : pas de watermark visuel, insertion du marqueur invisible dans docProps/custom.xml
        outBlob = await embedInvisibleWatermarkDocx(file, {
          hash,
          ts: whenISO,
          issuer: issuer || undefined,
        });

        outName = toMeveName(file.name, "docx");
      }

      setRes({ pdfBlob: outBlob, fileName: outName, hash, whenISO });
    } catch (e) {
      console.error(e);
      alert("Error while generating the proof.");
    } finally {
      setBusy(false);
    }
  }

  function toMeveName(name: string, kind: "pdf" | "docx") {
    const m = name.match(/^(.+)\.([^.]+)$/);
    const base = m ? m[1] : name;
    return `${base}.meve.${kind}`;
  }

  // Téléchargement direct
  function downloadPDF() {
    if (!res.pdfBlob || !res.fileName) return;
    const url = URL.createObjectURL(res.pdfBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = res.fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 15000);
  }

  // Certificat HTML
  function downloadCert() {
    if (!res.fileName || !res.hash || !res.whenISO) return;
    exportHtmlCertificate(res.fileName.replace(/\.(pdf|docx)$/i, ""), res.hash, res.whenISO, issuer);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-3xl px-4 py-10 sm:py-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Generate a <span className="text-emerald-400">.MEVE</span> proof
          </h1>
          <p className="mt-3 text-lg text-slate-300">
            Upload your document (PDF or DOCX). We add a lightweight, invisible proof inside.
            You’ll receive{" "}
            <span className="font-semibold">
              name<span className="text-slate-400">.meve</span>.pdf/.docx
            </span>{" "}
            and an optional human-readable certificate (.html).
          </p>

          {/* Trust badges */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900 px-2.5 py-1 text-slate-300">
              <Lock className="h-4 w-4 text-emerald-400" />
              No storage — runs locally
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900 px-2.5 py-1 text-slate-300">
              <ShieldCheck className="h-4 w-4 text-sky-400" />
              Portable — stays readable
            </span>
            {file && kind !== "other" && (
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900 px-2.5 py-1 text-slate-300">
                <FileCheck2 className="h-4 w-4 text-emerald-400" />
                {kind.toUpperCase()} detected
              </span>
            )}
            {typeof quotaRemaining === "number" && (
              <span className="inline-flex items-center gap-1 rounded-full border border-slate-800 bg-slate-900 px-2.5 py-1 text-slate-300">
                {quotaRemaining} free left today
              </span>
            )}
          </div>

          <div className="mt-8">
            <FileDropzone
              onSelected={setFile}
              label="Choose a file"
              maxSizeMB={10}
              hint="Drag & drop or tap to select. Max {SIZE} MB."
              accept=".pdf,application/pdf,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            />
          </div>

          <div className="mt-5">
            <label className="block text-sm font-medium text-slate-200">Issuer (optional)</label>
            <input
              type="email"
              placeholder="e.g. alice@company.com"
              value={issuer}
              onChange={(e) => setIssuer(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/40"
            />
          </div>

          <button
            onClick={onGenerate}
            disabled={!file || busy}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-sky-500 px-5 py-2.5 font-medium text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.35)] hover:brightness-110 disabled:opacity-50"
          >
            <Upload className="h-5 w-5" />
            {busy ? "Generating…" : "Generate Proof"}
          </button>

          {res.pdfBlob && res.fileName && (
            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-100">Proof Preview</h2>

              <dl className="mt-3 grid gap-y-1 text-sm">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  <dt className="text-slate-400">File</dt>
                  <dd className="col-span-2 sm:col-span-3 break-words text-slate-100">{res.fileName}</dd>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  <dt className="text-slate-400">Date / Time</dt>
                  <dd className="col-span-2 sm:col-span-3 text-slate-100">
                    {new Date(res.whenISO!).toLocaleDateString()} — {new Date(res.whenISO!).toLocaleTimeString()}
                  </dd>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  <dt className="text-slate-400">Issuer</dt>
                  <dd className="col-span-2 sm:col-span-3 text-slate-100">{issuer || "—"}</dd>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  <dt className="text-slate-400">SHA-256</dt>
                  <dd className="col-span-2 sm:col-span-3 text-slate-100 break-words">{res.hash}</dd>
                </div>
              </dl>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={downloadPDF}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-800"
                >
                  <FileDown className="h-4 w-4 text-emerald-400" />
                  Download .MEVE document
                </button>
                <button
                  onClick={downloadCert}
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-800"
                >
                  <FileCheck2 className="h-4 w-4 text-sky-400" />
                  Download Certificate (.html)
                </button>
              </div>

              <p className="mt-3 text-xs text-slate-400">
                The file downloads directly to preserve integrity. The certificate may briefly
                open in a new tab (~10s) so you can choose “Open”.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Modal quota (si limite atteinte) */}
      <LimitModal
        open={limitOpen}
        onClose={() => setLimitOpen(false)}
        count={quotaCount}
        resetDayUTC={quotaResetDay}
      />
    </main>
  );
      }
