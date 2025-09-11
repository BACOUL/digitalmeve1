// app/generate/page.tsx
"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import { CTAButton } from "@/components/CTAButton";
import ProgressBar from "@/components/ProgressBar";
import { buildProofObject } from "@/lib/proof";
import { buildProofHtml } from "@/lib/proof-html";
import { FileDown, FileText, ShieldCheck } from "lucide-react";
import { addPdfWatermark } from "@/lib/watermark-pdf";

// ---------------- utils ----------------
function filenameFromCD(cd: string | null, fallback: string) {
  const m = cd?.match(/filename="?([^"]+)"?/i);
  return m?.[1] ?? fallback;
}
function splitName(name?: string) {
  if (!name) return { base: "file", ext: "bin" };
  const m = name?.match(/^(.+)\.([^.]+)$/);
  return m ? { base: m[1], ext: m[2] } : { base: name!, ext: "bin" };
}
async function looksLikePdfBlob(b: Blob): Promise<boolean> {
  if (!b || b.size < 5) return false;
  try {
    const head = await b.slice(0, 5).text(); // "%PDF-"
    return head.startsWith("%PDF-");
  } catch {
    return false;
  }
}
function isPdfName(name: string) {
  return name.toLowerCase().endsWith(".pdf");
}
function safeDownload(name: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
// ---------------------------------------

export default function GeneratePage() {
  const [file, setFile] = useState<File | null>(null);
  const [issuer, setIssuer] = useState("");
  const [alsoHtml, setAlsoHtml] = useState(false);

  const [uploadPct, setUploadPct] = useState<number | undefined>(undefined);
  const [processing, setProcessing] = useState(false);

  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    setUploadPct(undefined);
    setProcessing(false);

    if (!file) {
      setErr("Please select a file first.");
      return;
    }

    // Prépare le POST vers le proxy (⚠️ on n’envoie PLUS de flag also_json au backend)
    const form = new FormData();
    form.append("file", file);
    if (issuer.trim()) form.append("issuer", issuer.trim());

    try {
      // ---- Upload avec progression (XHR pour onprogress) ----
      const xhr = new XMLHttpRequest();
      const result = await new Promise<{ blob: Blob; headers: Headers }>((resolve, reject) => {
        xhr.open("POST", "/api/proxy/generate", true);
        xhr.responseType = "blob";

        xhr.upload.onprogress = (ev) => {
          if (ev.lengthComputable) {
            setUploadPct(Math.round((ev.loaded / ev.total) * 100));
          }
        };
        xhr.onloadstart = () => {
          setUploadPct(0);
          setProcessing(false);
        };
        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) setProcessing(true);
        };
        xhr.onerror = () => reject(new Error("Network error"));
        xhr.ontimeout = () => reject(new Error("Request timeout"));
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const h = new Headers();
            const raw = xhr.getAllResponseHeaders().trim().split(/[\r\n]+/);
            for (const line of raw) {
              const parts = line.split(": ");
              const key = parts.shift();
              const value = parts.join(": ");
              if (key) h.append(key, value);
            }
            resolve({ blob: xhr.response, headers: h });
          } else {
            const reader = new FileReader();
            reader.onload = () =>
              reject(new Error(String(reader.result || "Generation failed.")));
            reader.onerror = () => reject(new Error("Generation failed."));
            reader.readAsText(xhr.response ?? new Blob());
          }
        };

        xhr.send(form);
      });

      // ---- Analyse de la réponse ----
      let { blob, headers } = result;
      const contentType = (headers.get("Content-Type") || "").toLowerCase();
      const cd = headers.get("Content-Disposition");
      const { base, ext } = splitName(file.name);

      // 1) CAS API renvoie JSON (sidecar) -> on NE télécharge PAS le JSON brut.
      //    On fabrique une preuve HTML élégante, et c’est tout (évite le doublon).
      if (contentType.includes("application/json")) {
        try {
          const text = await blob.text();
          const proofObj = JSON.parse(text);
          const html = buildProofHtml(proofObj); // rendu HTML propre
          const htmlBlob = new Blob([html], { type: "text/html;charset=utf-8" });
          safeDownload(`${base}.meve.html`, htmlBlob);
          setMsg(`Downloaded ${base}.meve.html`);
        } catch {
          // fallback ultra-safe : on retombe sur la version "fichier meve" annoncée
          const fallbackName = filenameFromCD(cd, `${base}.${ext}.meve.json`);
          safeDownload(fallbackName, blob);
          setMsg(`Downloaded ${fallbackName}`);
        } finally {
          setProcessing(false);
        }
        return;
      }

      // 2) CAS API renvoie un binaire (PDF/PNG/...) -> document prioritaire
      let primaryName = filenameFromCD(cd, `${base}.meve.${ext}`);

      // Filigrane uniquement si PDF (nom OU sniff)
      try {
        if (isPdfName(primaryName) || (await looksLikePdfBlob(blob))) {
          blob = await addPdfWatermark(blob, "DigitalMeve");
        }
      } catch {
        /* si le filigrane échoue, on continue quand même */
      }

      // Télécharge le document en premier (toujours)
      safeDownload(primaryName, blob);
      setMsg(`Downloaded ${primaryName}`);
      setProcessing(false);

      // Ensuite, éventuellement la preuve HTML (OPTIONNELLE)
      if (alsoHtml) {
        try {
          const proof = await buildProofObject(file, issuer.trim());
          const html = buildProofHtml(proof);
          const proofBlob = new Blob([html], { type: "text/html;charset=utf-8" });

          // petite pause pour éviter d’enchaîner 2 downloads sur le même tick
          setTimeout(() => {
            safeDownload(`${base}.meve.html`, proofBlob);
          }, 50);
        } catch {
          /* ne bloque pas */
        }
      }
    } catch (e: any) {
      setErr(e?.message ?? "Generation failed.");
      setProcessing(false);
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-100">Generate a .MEVE proof</h1>
      <p className="mt-2 text-slate-400">
        Upload any file. You’ll get <code className="text-slate-300">name.meve.ext</code> (proof embedded in metadata).
        Optionally, also download a formatted <code className="text-slate-300">name.meve.html</code> proof.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <FileDropzone
          onSelected={setFile}
          accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
          maxSizeMB={100}
        />

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

          <div className="flex items-end">
            <label className="flex items-center gap-3 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={alsoHtml}
                onChange={(e) => setAlsoHtml(e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-slate-900"
              />
              Also download formatted <code>.meve.html</code>
            </label>
          </div>
        </div>

        <div className="w-full sm:w-auto">
          <CTAButton type="submit" aria-label="Generate proof">
            Generate Proof
          </CTAButton>
          {(uploadPct !== undefined || processing) && (
            <ProgressBar value={processing ? undefined : uploadPct} />
          )}
        </div>

        {msg && <p className="text-sm text-emerald-300">{msg}</p>}
        {err && <p className="text-sm text-rose-400">{err}</p>}

        <p className="mt-6 text-xs text-slate-500">
          DigitalMeve does not store your documents. Files are processed in memory only.
        </p>
      </form>

      {/* Légende des actions */}
      <div className="mt-8 grid gap-3 sm:grid-cols-3 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <FileDown className="h-5 w-5" />
          <span>Download meve document</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5" />
          <span>Embedded proof</span>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          <span>Optional HTML proof</span>
        </div>
      </div>
    </section>
  );
    }
