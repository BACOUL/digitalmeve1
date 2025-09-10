"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import { CTAButton } from "@/components/CTAButton";
import ProgressBar from "@/components/ProgressBar";
import { buildProofObject } from "@/lib/proof";
import { buildProofHtml } from "@/lib/proof-html";
import { FileDown, FileText, ShieldCheck } from "lucide-react";

// util: nom depuis Content-Disposition
function filenameFromCD(cd: string | null, fallback: string) {
  const m = cd?.match(/filename="?([^"]+)"?/i);
  return m?.[1] ?? fallback;
}

export default function GeneratePage() {
  const [file, setFile] = useState<File | null>(null);
  const [issuer, setIssuer] = useState("");
  const [withProof, setWithProof] = useState(true);

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

    try {
      // ---- Upload avec barre de progression (XHR) ----
      const xhr = new XMLHttpRequest();
      const promise = new Promise<{ blob: Blob; headers: Headers }>(
        (resolve, reject) => {
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
              reader.onload = () =>
                reject(
                  new Error(
                    String(reader.result || "Generation failed.")
                  )
                );
              reader.onerror = () => reject(new Error("Generation failed."));
              reader.readAsText(xhr.response ?? new Blob());
            }
          };

          xhr.send(form);
        }
      );

      const { blob, headers } = await promise;

      // ---- Téléchargement du document MEVE ----
      const cd = headers.get("Content-Disposition");
      const ct = headers.get("Content-Type") || "";
      const ext = file.name.split(".").pop() || "bin";
      const base = file.name.replace(new RegExp(`\\.${ext}$`, "i"), "");
      const primaryName = filenameFromCD(cd, `${base}.meve.${ext}`);

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = primaryName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      // ---- Génération et téléchargement de la preuve HTML ----
      if (withProof) {
        const proof = await buildProofObject(file, issuer);
        const html = buildProofHtml(proof);
        const proofBlob = new Blob([html], {
          type: "text/html;charset=utf-8",
        });
        const proofUrl = URL.createObjectURL(proofBlob);
        const proofA = document.createElement("a");
        proofA.href = proofUrl;
        proofA.download = `${base}.meve-proof.html`;
        document.body.appendChild(proofA);
        proofA.click();
        proofA.remove();
        URL.revokeObjectURL(proofUrl);
      }

      setMsg(`Downloaded ${primaryName}${withProof ? " + proof" : ""}`);
      setProcessing(false);

      if (ct.includes("application/json")) {
        // cas transitoire
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
        Upload any file. You’ll get <code className="text-slate-300">name.meve.ext</code>{" "}
        (proof embedded in metadata). Optionally, also download a separate{" "}
        <code className="text-slate-300">.meve-proof.html</code>.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <FileDropzone onSelected={setFile} />

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="issuer"
              className="text-sm text-slate-300"
            >
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

          <div className="flex items-end">
            <label className="flex items-center gap-3 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={withProof}
                onChange={(e) => setWithProof(e.target.checked)}
                className="h-4 w-4 rounded border-white/20 bg-slate-900"
              />
              Also download <code>.meve-proof.html</code>
            </label>
          </div>
        </div>

        {/* CTA + ProgressBar */}
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

        {msg && <p className="text-sm text-emerald-300">{msg}</p>}
        {err && <p className="text-sm text-rose-400">{err}</p>}

        <p className="mt-6 text-xs text-slate-500">
          DigitalMeve does not store your documents. Files are processed in memory only.
        </p>
      </form>
    </section>
  );
        }
