"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import { CTAButton } from "@/components/CTAButton";
import ProgressBar from "@/components/ProgressBar";

// Utilitaire pour extraire le nom de fichier depuis Content-Disposition
function filenameFromCD(cd: string | null, fallback: string) {
  const m = cd?.match(/filename="?([^"]+)"?/i);
  return m?.[1] ?? fallback;
}

export default function GeneratePage() {
  const [file, setFile] = useState<File | null>(null);
  const [issuer, setIssuer] = useState("");
  const [alsoJson, setAlsoJson] = useState(false);

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
    if (alsoJson) form.append("also_json", "1");

    try {
      // ---- Upload avec barre de progression (XMLHttpRequest) ----
      const xhr = new XMLHttpRequest();
      const promise = new Promise<{ blob: Blob; headers: Headers }>((resolve, reject) => {
        xhr.open("POST", "/api/proxy/generate", true);
        xhr.responseType = "blob";

        // progression d'upload
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
          // une fois l'upload fini et la réponse en cours -> état "processing"
          if (xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
            setProcessing(true);
          }
        };

        xhr.onerror = () => reject(new Error("Network error"));
        xhr.ontimeout = () => reject(new Error("Request timeout"));
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            // reconstruire les headers
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
            // lire l'erreur texte si possible
            const reader = new FileReader();
            reader.onload = () => reject(new Error(String(reader.result || "Generation failed.")));
            reader.onerror = () => reject(new Error("Generation failed."));
            reader.readAsText(xhr.response ?? new Blob());
          }
        };

        xhr.send(new FormData(form));
      });

      const { blob, headers } = await promise;

      // ---- Téléchargement du résultat ----
      const cd = headers.get("Content-Disposition");
      const ct = headers.get("Content-Type") || "";
      const ext = file.name.split(".").pop() || "bin";
      const base = file.name.replace(new RegExp(`\\.${ext}$`, "i"), "");

      // si le proxy n'a pas fixé le nom, fallback propre :
      // - binaire intégré => name.meve.ext
      // - json => name.ext.meve.json (le proxy peut aussi le donner en CD)
      const defaultName = ct.includes("application/json")
        ? `${base}.${ext}.meve.json`
        : `${base}.meve.${ext}`;

      const primaryName = filenameFromCD(cd, defaultName);

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = primaryName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setMsg(`Downloaded ${primaryName}`);
      setProcessing(false);
    } catch (e: any) {
      setErr(e?.message ?? "Generation failed.");
      setProcessing(false);
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-100">Generate a .MEVE proof</h1>
      <p className="mt-2 text-slate-400">
        Upload any document. You’ll get <code className="text-slate-300">name.meve.ext</code> (proof embedded).
        Optionally, download a separate <code className="text-slate-300">name.ext.meve.json</code>.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        {/* Dropzone */}
        <FileDropzone onSelected={setFile} />

        {/* NOM DU FICHIER SÉLECTIONNÉ */}
        <div className="rounded-xl border border-white/10 bg-slate-900/60 p-3 text-sm text-slate-300">
          {file ? (
            <div className="flex items-center justify-between gap-3">
              <span className="truncate">Selected: <strong className="text-slate-100">{file.name}</strong></span>
              <span className="shrink-0 text-slate-400">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>
          ) : (
            <span className="text-slate-400">No file selected yet.</span>
          )}
        </div>

        {/* Options */}
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
                checked={alsoJson}
                onChange={(e) => setAlsoJson(e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-slate-900"
              />
              Also download a separate <code>.meve.json</code>
            </label>
          </div>
        </div>

        {/* CTA + barre de progression */}
        <div className="w-full sm:w-auto">
          <CTAButton
            type="submit"
            aria-label="Generate proof"
            disabled={!file || processing || (uploadPct !== undefined && uploadPct < 100)}
            className={!file ? "opacity-60 cursor-not-allowed" : ""}
          >
            {processing ? "Processing…" : uploadPct !== undefined && uploadPct < 100 ? `Uploading ${uploadPct}%` : "Generate Proof"}
          </CTAButton>

          {(uploadPct !== undefined || processing) && (
            <div className="mt-2">
              <ProgressBar value={processing ? undefined : uploadPct} />
            </div>
          )}
        </div>

        {msg && <p className="text-sm text-emerald-300">{msg}</p>}
        {err && <p className="text-sm text-rose-400">{err}</p>}

        <p className="mt-6 text-xs text-slate-500">
          Your document remains readable. Proof is embedded in metadata or saved as a portable <code>.meve.json</code>.
        </p>
      </form>
    </section>
  );
          }
