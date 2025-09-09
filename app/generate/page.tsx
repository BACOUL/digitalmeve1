"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import { CTAButton } from "@/components/CTAButton";

export default function GeneratePage() {
  const [file, setFile] = useState<File | null>(null);
  const [issuer, setIssuer] = useState("");
  const [meta, setMeta] = useState("");
  const [alsoJson, setAlsoJson] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setErr(null);

    if (!file) return setErr("Please select a file first.");

    // meta JSON valide
    let metaJson: any;
    if (meta.trim()) {
      try {
        metaJson = JSON.parse(meta);
      } catch {
        return setErr("Invalid JSON in meta.");
      }
    }

    const form = new FormData();
    form.append("file", file);
    if (issuer.trim()) form.append("issuer", issuer.trim());
    if (metaJson) form.append("meta", new Blob([JSON.stringify(metaJson)], { type: "application/json" }));
    if (alsoJson) form.append("also_json", "1"); // <- option conforme à ta spec

    try {
      setLoading(true);

      // 1) Appel principal : doit retourner un fichier *.meve.<ext> (binaire)
      const res = await fetch("/api/proxy/generate", { method: "POST", body: form });

      const ct = res.headers.get("Content-Type") || "";

      if (res.ok && !ct.includes("application/json")) {
        // => flux binaire (meve.pdf) : on télécharge
        const dispo = res.headers.get("Content-Disposition");
        const fallback = `${file.name.replace(/\.(\w+)$/i, "")}.meve.${file.name.split(".").pop()}`;
        const filename = dispo?.match(/filename="?([^"]+)"?/i)?.[1] ?? fallback;

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);

        setMsg(`Downloaded ${filename}`);
      } else {
        // => JSON (fallback backend actuel) : on propose le .meve.json
        const text = await res.text();
        try {
          const body = JSON.parse(text);
          const proof = body?.proof ?? body;
          const pretty = JSON.stringify(proof, null, 2);
          const jsonName = `${file.name}.meve.json`;
          const blob = new Blob([pretty], { type: "application/json;charset=utf-8" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = jsonName;
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
          setMsg(`Downloaded ${jsonName}`);
        } catch {
          throw new Error(text || "Unexpected response from API.");
        }
      }
    } catch (e: any) {
      setErr(e?.message ?? "Generation failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-100">Generate a .MEVE proof</h1>
      <p className="mt-2 text-slate-400">
        Upload any file. You’ll get a <code className="text-slate-300">name.meve.ext</code> (proof embedded in metadata).  
        Optionally, also download a separate <code className="text-slate-300">.meve.json</code>.
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

        <label className="flex items-center gap-3 text-sm text-slate-300">
          <input
            type="checkbox"
            checked={alsoJson}
            onChange={(e) => setAlsoJson(e.target.checked)}
            className="h-4 w-4 rounded border-white/20 bg-slate-900"
          />
          Also download a separate .meve.json
        </label>

        <div className="flex items-center gap-3">
          <CTAButton type="submit" disabled={loading} aria-label="Generate proof">
            {loading ? "Generating..." : "Generate Proof"}
          </CTAButton>
          {file && <span className="text-sm text-slate-400 truncate">Selected: {file.name}</span>}
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
