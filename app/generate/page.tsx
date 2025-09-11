"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import { CTAButton } from "@/components/CTAButton";
import ProgressBar from "@/components/ProgressBar";
import { buildProofObject } from "@/lib/proof";
import { buildProofHtml } from "@/lib/proof-html";
import { FileDown, FileText, ShieldCheck } from "lucide-react";
import { addPdfWatermark } from "@/lib/watermark-pdf";

// util: nom depuis Content-Disposition
function filenameFromCD(cd: string | null, fallback: string) {
  const m = cd?.match(/filename="?([^"]+)"?/i);
  return m?.[1] ?? fallback;
}
function splitName(name?: string) {
  if (!name) return { base: "file", ext: "bin" };
  const m = name.match(/^(.+)\.([^.]+)$/);
  return m ? { base: m[1], ext: m[2] } : { base: name, ext: "bin" };
}

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

    const form = new FormData();
    form.append("file", file);
    if (issuer.trim()) form.append("issuer", issuer.trim());
    if (alsoHtml) form.append("also_json", "1"); // on réutilise ce flag

    try {
      // ---- Upload avec barre de progression (XMLHttpRequest) ----
      const xhr = new XMLHttpRequest();
      const promise = new Promise<{ blob: Blob; headers: Headers }>((resolve, reject) => {
        xhr.open("POST", "/api/proxy/generate", true);
        xhr.responseType = "blob";

        xhr.upload.onprogress = (ev) => {
          if (ev.lengthComputable) {
            const pct = Math.round((ev.loaded / ev.total) * 100);
            setUploadPct(pct);
          }
        };

        xhr.onloadstart = () => {
          setUploadPct(0);
          setProcessing(false);
        };

        xhr.onreadystatechange = () => {
          if (xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
            setProcessing(true);
          }
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
            reader.onload = () => reject(new Error(String(reader.result || "Generation failed.")));
            reader.onerror = () => reject(new Error("Generation failed."));
            reader.readAsText(xhr.response ?? new Blob());
          }
        };

        xhr.send(form);
      });

      let { blob, headers } = await promise;

      const cd = headers.get("Content-Disposition");
      const { base, ext } = splitName(file.name);
      const primaryName = filenameFromCD(cd, `${base}.meve.${ext}`);
      const primaryLower = primaryName.toLowerCase();

      // ✅ Filigrane si le fichier final est un PDF (pas seulement via Content-Type)
      if (primaryLower.endsWith(".pdf")) {
        try {
          blob = await addPdfWatermark(blob, "DigitalMeve");
        } catch {
          // ne bloque pas le download si échec du watermark
        }
      }

      // ---- Téléchargement du document (toujours en priorité) ----
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = primaryName; // force download
      a.rel = "noopener";
      a.target = "_self";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setMsg(`Downloaded ${primaryName}`);
      setProcessing(false);

      // ---- Ensuite (optionnel) proposer la preuve HTML, en FORÇANT le téléchargement ----
      if (alsoHtml) {
        try {
          const proof = await buildProofObject(file, issuer.trim());
          const html = buildProofHtml(proof);

          // ❗️Type du blob en "application/octet-stream" pour éviter l'ouverture dans l'onglet
          const proofBlob = new Blob([html], { type: "application/octet-stream" });

          // Légère attente pour que le premier download soit bien traité
          setTimeout(() => {
            const proofUrl = URL.createObjectURL(proofBlob);
            const proofA = document.createElement("a");
            proofA.href = proofUrl;
            proofA.download = `${base}.meve.html`; // download obligatoire
            proofA.rel = "noopener";
            proofA.target = "_self";
            document.body.appendChild(proofA);
            proofA.click();
            proofA.remove();
            URL.revokeObjectURL(proofUrl);
          }, 250);
        } catch {
          /* ignore */
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
        <FileDropzone onSelected={setFile} />

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

      {/* mini-légende des actions */}
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
