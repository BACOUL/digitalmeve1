"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import ProgressBar from "@/components/ProgressBar";
import ProofPreview from "@/components/ProofPreview";
import { generateProofForFile, downloadBlob, downloadJson, stringifyCanonical } from "@/lib/meve";
import { watermarkImage } from "@/lib/watermark";
import { watermarkPdf } from "@/lib/watermark-pdf";

// Utilitaire nom à partir des headers
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
  const [alsoJson, setAlsoJson] = useState(true);
  const [addMark, setAddMark] = useState(true);

  const [uploadPct, setUploadPct] = useState<number | undefined>(undefined);
  const [processing, setProcessing] = useState(false);

  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const [proofPreviewOpen, setProofPreviewOpen] = useState(false);
  const [lastProof, setLastProof] = useState<any | null>(null);

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

    // 1) Toujours fabriquer la preuve côté client (sidecar)
    const proof = await generateProofForFile(file, issuer.trim() || undefined);
    setLastProof(proof);

    // 2) Option : filigraner le fichier côté client si c’est une image/PDF
    let preparedFile: File | Blob = file;
    try {
      if (addMark) {
        if (file.type.startsWith("image/")) {
          preparedFile = await watermarkImage(file);
        } else if (file.type === "application/pdf") {
          preparedFile = await watermarkPdf(file);
        }
        // sinon : on laisse tel quel (autres formats)
      }
    } catch {
      // filigrane non bloquant
    }

    // 3) Appel API proxy pour obtenir le binaire “.meve.ext” (si dispo)
    //    On envoie le fichier préparé (filigrané si applicable)
    try {
      const form = new FormData();
      const inputName = file.name;
      const { base, ext } = splitName(inputName);
      const uploadName = addMark
        ? `${base}-marked.${ext}`
        : inputName;

      form.append("file", preparedFile, uploadName);
      if (issuer.trim()) form.append("issuer", issuer.trim());

      const xhr = new XMLHttpRequest();
      const promise = new Promise<{ blob: Blob; headers: Headers }>((resolve, reject) => {
        xhr.open("POST", "/api/proxy/generate", true);
        xhr.responseType = "blob";

        xhr.upload.onprogress = (ev) => {
          if (ev.lengthComputable) setUploadPct(Math.round((ev.loaded / ev.total) * 100));
        };
        xhr.onloadstart = () => { setUploadPct(0); setProcessing(false); };
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
            // si backend pas prêt → on ne bloque pas, on tombera sur la preuve sidecar
            resolve({ blob: new Blob([], { type: "application/octet-stream" }), headers: new Headers() });
          }
        };
        xhr.send(form);
      });

      const { blob, headers } = await promise;

      const cd = headers.get("Content-Disposition");
      const ct = headers.get("Content-Type") || "";
      const { base, ext } = splitName(file.name);
      // nom cible quand binaire renvoyé
      const primaryName = cd?.match(/filename="?([^"]+)"?/i)?.[1] ?? `${base}.meve.${ext}`;

      if (blob.size > 0 && !ct.includes("application/json")) {
        downloadBlob(blob, primaryName);
        setMsg(`Downloaded ${primaryName}`);
      } else {
        // Fallback si l’API n’a pas renvoyé le binaire
        setMsg("Server binary not available — using local proof only.");
      }
    } catch (e: any) {
      // On ne bloque pas la suite : la preuve sidecar reste dispo
      setErr(e?.message ?? "Generation error (binary). Proof sidecar still available.");
    } finally {
      setProcessing(false);
    }

    // 4) Télécharger la preuve .meve.json si coché
    if (alsoJson) {
      const { base, ext } = splitName(file.name);
      downloadJson(proof, `${base}.${ext}.meve.json`, true /* pretty */);
    }

    // 5) Ouvrir la prévisualisation
    setProofPreviewOpen(true);
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-100">Generate a .MEVE proof</h1>
      <p className="mt-2 text-slate-400">
        Your document stays readable. Get a <code className="text-slate-300">name.meve.ext</code> (metadata-embedded) and optionally a portable
        <code className="text-slate-300"> .meve.json</code> certificate.
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

          <div className="flex flex-col justify-end gap-2">
            <label className="flex items-center gap-3 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={alsoJson}
                onChange={(e) => setAlsoJson(e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-slate-900"
              />
              Also download <code>.meve.json</code> certificate
            </label>

            <label className="flex items-center gap-3 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={addMark}
                onChange={(e) => setAddMark(e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-slate-900"
              />
              Add a discreet corner mark
            </label>
          </div>
        </div>

        <div className="w-full sm:w-auto">
          <button
            type="submit"
            className="rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-5 py-2.5 font-semibold text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.45)] hover:brightness-110 transition"
          >
            Generate Proof
          </button>
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

      {/* Modal de prévisualisation */}
      <ProofPreview
        open={proofPreviewOpen}
        onClose={() => setProofPreviewOpen(false)}
        json={lastProof}
        onDownload={() => {
          if (!file || !lastProof) return;
          const { base, ext } = splitName(file.name);
          downloadJson(lastProof, `${base}.${ext}.meve.json`, true);
        }}
      />
    </section>
  );
                                }
