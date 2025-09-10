"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import { CTAButton } from "@/components/CTAButton";
import ProgressBar from "@/components/ProgressBar";

// Helpers preuve (doivent exister dans /lib)
import { buildProofObject, stringifyCanonical } from "@/lib/proof";
import { proofToHtml } from "@/lib/proof-pretty";

// --- Utils locaux ---
function splitName(name?: string) {
  if (!name) return { base: "file", ext: "bin" };
  const m = name.match(/^(.+)\.([^.]+)$/);
  return m ? { base: m[1], ext: m[2] } : { base: name, ext: "bin" };
}

function filenameFromCD(cd: string | null, fallback: string) {
  const m = cd?.match(/filename="?([^"]+)"?/i);
  return m?.[1] ?? fallback;
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function GeneratePage() {
  const [file, setFile] = useState<File | null>(null);
  const [issuer, setIssuer] = useState("");
  const [alsoJson, setAlsoJson] = useState(true);   // ✅ on par défaut
  const [alsoHtml, setAlsoHtml] = useState(true);   // ✅ on par défaut

  const [uploadPct, setUploadPct] = useState<number | undefined>(undefined);
  const [processing, setProcessing] = useState(false);

  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    setUploadPct(undefined);
    setProcessing(false);

    if (!file) {
      setErr("Please select a file first.");
      return;
    }

    // FormData à envoyer au proxy
    const fd = new FormData();
    fd.append("file", file);
    if (issuer.trim()) fd.append("issuer", issuer.trim());
    // le proxy honorera éventuellement ce hint (et renverra binaire ou JSON)
    if (alsoJson) fd.append("also_json", "1");

    try {
      // -------- Upload via XHR pour la progression --------
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
            setProcessing(true); // upload fini, backend traite
          }
        };
        xhr.onerror = () => reject(new Error("Network error"));
        xhr.ontimeout = () => reject(new Error("Request timeout"));
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            // reconstituer les headers
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
            // lecture d'erreur lisible si fournie
            const reader = new FileReader();
            reader.onload = () => reject(new Error(String(reader.result || "Generation failed.")));
            reader.onerror = () => reject(new Error("Generation failed."));
            reader.readAsText(xhr.response ?? new Blob());
          }
        };

        xhr.send(fd); // ✅ pas de new FormData(form) (erreur de typage résolue)
      });

      const { blob, headers } = await promise;

      // -------- Téléchargement du document (PRIORITAIRE) --------
      const { base, ext } = splitName(file.name);
      const cd = headers.get("Content-Disposition");
      const ct = headers.get("Content-Type") || "";

      // nom proposé par l'API sinon fallback "name.meve.ext"
      const primaryName = filenameFromCD(cd, `${base}.meve.${ext}`);

      downloadBlob(blob, primaryName);
      setMsg(`Downloaded ${primaryName}`);
      setProcessing(false);

      // -------- Téléchargement des preuves après un court délai --------
      // pour laisser le doc prendre le focus (évite ouverture d’un onglet pour la preuve)
      if (alsoJson || alsoHtml) {
        setTimeout(async () => {
          // Si l’API renvoie du JSON (cas temporaire), la preuve est *dans* ce blob
          // mais on veut *aussi* fournir la version canonique depuis le client.
          const proof = await buildProofObject(file, issuer.trim() || undefined);

          if (alsoJson) {
            const jsonStr = stringifyCanonical(proof);
            // Forcer le download : application/octet-stream (sinon certains navigateurs ouvrent un onglet)
            const jsonBlob = new Blob([jsonStr], { type: "application/octet-stream" });
            downloadBlob(jsonBlob, `${base}.${ext}.meve.json`);
          }
          if (alsoHtml) {
            const html = proofToHtml(proof);
            const htmlBlob = new Blob([html], { type: "text/html;charset=utf-8" });
            downloadBlob(htmlBlob, `${base}.${ext}.meve.html`);
          }
        }, 250);
      }

      // Si exceptionnellement le backend renvoie application/json au lieu du binaire,
      // on aura quand même téléchargé 'blob' (JSON), et la double génération ci-dessus
      // assure la cohérence (JSON canonique + HTML lisible).

    } catch (e: any) {
      setErr(e?.message ?? "Generation failed.");
      setProcessing(false);
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-100">Generate a .MEVE proof</h1>
      <p className="mt-2 text-slate-400">
        Upload any document. You’ll get <code className="text-slate-300">name.meve.ext</code> (proof embedded in metadata).
        Optionally, also download a separate <code className="text-slate-300">name.ext.meve.json</code> and a readable
        <code className="text-slate-300"> .meve.html</code> report.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <FileDropzone onSelected={setFile} />
        {file && (
          <p className="text-sm text-slate-400">
            Selected: <span className="text-slate-200">{file.name}</span> · {(file.size / 1024).toFixed(1)} KB
          </p>
        )}

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

          <div className="flex flex-col justify-end gap-3">
            <label className="flex items-center gap-3 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={alsoJson}
                onChange={(e) => setAlsoJson(e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-slate-900"
              />
              Also download <code>.meve.json</code>
            </label>

            <label className="flex items-center gap-3 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={alsoHtml}
                onChange={(e) => setAlsoHtml(e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-slate-900"
              />
              Readable proof (HTML)
            </label>
          </div>
        </div>

        {/* CTA + barre de progression */}
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
    </section>
  );
        }
