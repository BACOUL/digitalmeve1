// app/generate/page.tsx
"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import { CTAButton } from "@/components/CTAButton";
import ProgressBar from "@/components/ProgressBar";
import { FileDown, ShieldCheck } from "lucide-react";
import { watermarkPdfFile } from "@/lib/watermark-pdf";
import { embedMeveXmp, sha256Hex } from "@/lib/meve-xmp";

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

    try {
      // ---------- 1) Prépare le fichier à envoyer ----------
      let toSend: Blob | File = file;

      if (file.type === "application/pdf") {
        // a) hash de l'original (avant toute modif)
        const originalSha = await sha256Hex(file);

        // b) filigrane
        const watermarked = await watermarkPdfFile(file, "DigitalMeve");

        // c) XMP MEVE (doc_sha256 + meta)
        toSend = await embedMeveXmp(watermarked, {
          docSha256: originalSha,
          createdAtISO: new Date().toISOString(),
          issuer: issuer.trim(),
          issuerType: "personal",
          issuerWebsite: "https://digitalmeve.com",
        });
      }

      // ---------- 2) Préparer form ----------
      const form = new FormData();
      // IMPORTANT: FormData attend un File. Convertir Blob → File si besoin
      const toSendFile =
        toSend instanceof File ? toSend : new File([toSend], file.name, { type: file.type || "application/octet-stream" });

      form.append("file", toSendFile);
      if (issuer.trim()) form.append("issuer", issuer.trim());

      // ---------- 3) Upload avec vraie progression (XHR) ----------
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
            const r = new FileReader();
            r.onload = () => reject(new Error(String(r.result || "Generation failed.")));
            r.onerror = () => reject(new Error("Generation failed."));
            r.readAsText(xhr.response ?? new Blob());
          }
        };

        xhr.send(form);
      });

      const { blob, headers } = await promise;

      // ---------- 4) Télécharger le .meve.ext retourné ----------
      const cd = headers.get("Content-Disposition");
      const { base, ext } = splitName(file.name);
      const primaryName = filenameFromCD(cd, `${base}.meve.${ext}`);

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
        Upload any file. For PDFs, we’ll watermark it and embed a MEVE marker (XMP) with integrity data,
        then return <code className="text-slate-300">name.meve.ext</code>.
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
        </div>

        <div className="w-full sm:w-auto">
          <CTAButton type="submit" aria-label="Generate proof">Generate Proof</CTAButton>
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

      <div className="mt-8 grid gap-3 sm:grid-cols-2 text-sm text-slate-400">
        <div className="flex items-center gap-2"><FileDown className="h-5 w-5" /><span>Download meve document</span></div>
        <div className="flex items-center gap-2"><ShieldCheck className="h-5 w-5" /><span>Embedded proof (XMP)</span></div>
      </div>
    </section>
  );
                 }
