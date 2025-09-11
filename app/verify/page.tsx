// app/verify/page.tsx
"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import { CTAButton } from "@/components/CTAButton";
import { verifyMevePdf, readMeveXmp } from "@/lib/meve-xmp";

type Outcome = {
  status: "valid" | "valid_document_missing" | "invalid";
  reason?: string;
};

export default function VerifyPage() {
  const [file, setFile] = useState<File | null>(null);
  const [original, setOriginal] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<Outcome | null>(null);
  const [xmpCreated, setXmpCreated] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setRes(null);
    setXmpCreated(null);

    if (!file) return;

    if (file.type !== "application/pdf") {
      setRes({ status: "invalid", reason: "Seuls les PDF sont supportés pour le moment." });
      return;
    }

    setLoading(true);
    try {
      // lire date/heure pour affichage séparé
      const info = await readMeveXmp(file);
      if (info.meve?.created_at) setXmpCreated(info.meve.created_at);

      const outcome = await verifyMevePdf(file, original ?? undefined);
      setRes(outcome);
    } catch (e: any) {
      setRes({ status: "invalid", reason: e?.message ?? "Échec de la vérification" });
    } finally {
      setLoading(false);
    }
  }

  const badge = (s: Outcome["status"]) => {
    const map = {
      valid: "bg-emerald-400/10 text-emerald-300 border-emerald-400/30",
      valid_document_missing: "bg-amber-400/10 text-amber-300 border-amber-400/30",
      invalid: "bg-rose-400/10 text-rose-300 border-rose-400/30",
    } as const;
    return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold border ${map[s]}`}>{s.toUpperCase()}</span>;
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 pb-24">
      <h1 className="text-3xl font-bold text-slate-100">Vérifier une preuve .MEVE</h1>
      <p className="mt-2 text-slate-400">
        Déposez un PDF <code className="text-slate-300">name.meve.pdf</code>. Nous contrôlons les marqueurs MEVE (XMP) et l’intégrité du document.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <div>
          <label className="text-sm text-slate-300">Fichier</label>
          <FileDropzone onSelected={setFile} accept=".pdf,application/pdf" />
        </div>

        <div>
          <label className="text-sm text-slate-300">Document original (optionnel, recommandé)</label>
          <FileDropzone onSelected={setOriginal} accept=".pdf,application/pdf" />
          <p className="mt-1 text-xs text-slate-500">Ajoutez l’original pour vérifier que son empreinte (SHA-256) correspond au XMP.</p>
        </div>

        <div>
          <CTAButton type="submit" disabled={loading}>
            {loading ? "Vérification…" : "Vérifier"}
          </CTAButton>
        </div>

        {res && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-100">Résultat</h2>
              {badge(res.status)}
            </div>
            {xmpCreated && (
              <p className="mt-2 text-sm text-slate-400">
                <span className="text-slate-300">Date :</span>{" "}
                {new Date(xmpCreated).toLocaleDateString()} — <span className="text-slate-300">Heure :</span>{" "}
                {new Date(xmpCreated).toLocaleTimeString()}
              </p>
            )}
            {res.reason && (
              <p className="mt-2 text-sm text-slate-400">
                <span className="text-slate-300">Détails :</span> {res.reason}
              </p>
            )}
          </div>
        )}
      </form>
    </section>
  );
}
