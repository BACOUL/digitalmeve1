"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import { CTAButton } from "@/components/CTAButton";

export default function GeneratePage() {
  const [file, setFile] = useState<File | null>(null);
  const [issuer, setIssuer] = useState("");
  const [meta, setMeta] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!file) {
      setError("Please select a file first.");
      return;
    }

    let metaJson: any = undefined;
    if (meta.trim()) {
      try {
        metaJson = JSON.parse(meta);
      } catch {
        setError("Invalid JSON in meta.");
        return;
      }
    }

    const form = new FormData();
    form.append("file", file);
    if (issuer.trim()) form.append("issuer", issuer.trim());
    if (metaJson)
      form.append(
        "meta",
        new Blob([JSON.stringify(metaJson)], { type: "application/json" })
      );

    try {
      setLoading(true);
      const res = await fetch("/api/proxy/generate", { method: "POST", body: form });

      if (!res.ok) {
        const details = await res.text();
        throw new Error(details || "Generation failed.");
      }

      const dispo = res.headers.get("Content-Disposition");
      let filename = "proof.meve.json";
      const m = dispo?.match(/filename="?([^"]+)"?/i);
      if (m?.[1]) filename = m[1];

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setMessage("Your .meve JSON proof has been downloaded.");
    } catch (err: any) {
      setError(err?.message ?? "Unexpected error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-100">Generate a .MEVE proof</h1>
      <p className="mt-2 text-slate-400">
        Drop a file (up to 25 MB). Processed in memory. No storage.
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
          <div>
            <label htmlFor="meta" className="text-sm text-slate-300">Meta (JSON, optional)</label>
            <textarea
              id="meta"
              value={meta}
              onChange={(e) => setMeta(e.target.value)}
              rows={3}
              placeholder='{"documentType":"invoice","version":1}'
              className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CTAButton type="submit" disabled={loading} aria-label="Generate proof">
            {loading ? "Generating..." : "Generate Proof"}
          </CTAButton>
          {file && (
            <span className="text-sm text-slate-400 truncate">Selected: {file.name}</span>
          )}
        </div>

        {message && <p className="text-sm text-emerald-300">{message}</p>}
        {error && <p className="text-sm text-rose-400">{error}</p>}

        <p className="mt-6 text-xs text-slate-500">
          DigitalMeve does not store your documents. Files are processed in memory only.
        </p>
      </form>
    </section>
  );
          }
