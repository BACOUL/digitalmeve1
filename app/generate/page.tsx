"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import ProgressBar from "@/components/ProgressBar";
import { buildProofObject, stringifyCanonical } from "@/lib/proof";
import { buildProofHTML } from "@/lib/proof-html";
import { FileDown, FileText, ShieldCheck } from "lucide-react";

// util: nom depuis Content-Disposition
function filenameFromCD(cd: string | null, fallback: string) {
  const m = cd?.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/i);
  const name = m?.[1] ? decodeURIComponent(m[1]) : null;
  return name || fallback;
}

function splitName(name?: string) {
  if (!name) return { base: "file", ext: "bin" };
  const m = name.match(/^(.+)\.([^.]+)$/);
  return m ? { base: m[1], ext: m[2] } : { base: name, ext: "bin" };
}

export default function GeneratePage() {
  const [file, setFile] = useState<File | null>(null);
  const [issuer, setIssuer] = useState("");
  const [wantHtmlProof, setWantHtmlProof] = useState(true);

  const [uploadPct, setUploadPct] = useState<number | undefined>(undefined);
  const [processing, setProcessing] = useState(false);
  const [busy, setBusy] = useState(false);

  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setMsg(null);
    setErr(null);
    setUploadPct(undefined);
    setProcessing(false);

    try {
      if (!file) throw new Error("Please select a file first.");

      // ---- construire le FormData
      const form = new FormData();
      form.append("file", file);
      if (issuer.trim()) form.append("issuer", issuer.trim());

      // ---- upload via XHR pour avoir la progression
      const xhr = new XMLHttpRequest();
      const promise = new Promise<{ blob: Blob; headers: Headers }>((resolve, reject) => {
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
          if (xhr.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
            // upload terminé, serveur traite => indéterminé
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
            // lire du texte si possible
            const reader = new FileReader();
            reader.onload = () => reject(new Error(String(reader.result || "Generation failed.")));
            reader.onerror = () => reject(new Error("Generation failed."));
            if (xhr.response) reader.readAsText(xhr.response);
            else reject(new Error("Generation failed."));
          }
        };

        xhr.send(form);
      });

      // ---- document en premier
      const { blob, headers } = await promise;

      const cd = headers.get("Content-Disposition");
      const ct = headers.get("Content-Type") || "";
      const { base, ext } = splitName(file.name);
      const primaryName = filenameFromCD(cd, `${base}.meve.${ext}`);

      const url1 = URL.createObjectURL(blob);
      triggerDownload(url1, primaryName); // 1) DOC D'ABORD
      setProcessing(false);
      setUploadPct(100);

      // ---- preuve HTML lisible (optionnelle)
      if (wantHtmlProof) {
        const proofObj = await buildProofObject(file, issuer.trim() || undefined);
        const pretty = JSON.stringify(proofObj, null, 2); // lisible
        const html = buildProofHTML(pretty);
        const proofBlob = new Blob([html], { type: "text/html;charset=utf-8" });
        const proofUrl = URL.createObjectURL(proofBlob);
        const proofName = `${base}.meve.html`;
        // légère temporisation pour ne pas déclencher 2 téléchargements la même ms
        setTimeout(() => triggerDownload(proofUrl, proofName), 300);
      }

      setMsg(`Downloaded ${primaryName}${wantHtmlProof ? " + proof" : ""}`);
    } catch (e: any) {
      setErr(e?.message ?? "Generation failed.");
    } finally {
      setBusy(false);
      // laisser la barre affichée un court instant, puis la cacher
      setTimeout(() => {
        setUploadPct(undefined);
        setProcessing(false);
      }, 600);
    }
  }

  function triggerDownload(url: string, filename: string) {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-100">Generate a .MEVE proof</h1>
      <p className="mt-2 text-slate-400">
        Upload any file. You’ll get <code className="text-slate-300">name.meve.ext</code> (embedded proof).
        Optionally, also download a clean, human-readable <code className="text-slate-300">name.meve.html</code> certificate.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <FileDropzone onSelected={setFile} accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/*" />

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

          <label className="flex items-end gap-3 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={wantHtmlProof}
              onChange={(e) => setWantHtmlProof(e.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-slate-900"
            />
            Include human-readable proof (<code>.html</code>)
          </label>
        </div>

        <div className="w-full sm:w-auto">
          <button
            type="submit"
            disabled={busy || !file}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-5 py-2.5 font-semibold text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.45)] hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed transition"
            aria-busy={busy}
          >
            <ShieldCheck className="h-5 w-5" aria-hidden />
            Generate Proof
          </button>

          {(uploadPct !== undefined || processing) && (
            <ProgressBar
              value={processing ? undefined : uploadPct}
              label={processing ? "Processing…" : "Uploading"}
              className="sm:w-[420px]"
            />
          )}
        </div>

        {msg && <p className="text-sm text-emerald-300">{msg}</p>}
        {err && <p className="text-sm text-rose-400">{err}</p>}

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-300">
            <FileDown className="h-5 w-5 text-emerald-300" aria-hidden />
            <span>Embedded file (.meve.ext)</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-300">
            <FileText className="h-5 w-5 text-sky-300" aria-hidden />
            <span>Readable proof (.meve.html)</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-300">
            <ShieldCheck className="h-5 w-5 text-emerald-300" aria-hidden />
            <span>Verify anytime</span>
          </div>
        </div>

        <p className="mt-6 text-xs text-slate-500">
          DigitalMeve does not store your documents. Files are processed in memory only.
        </p>
      </form>
    </section>
  );
}
