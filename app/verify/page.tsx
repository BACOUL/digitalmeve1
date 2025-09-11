// app/verify/page.tsx
"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import { CTAButton } from "@/components/CTAButton";

type RemoteVerifyResult = {
  status: "valid" | "valid_document_missing" | "invalid";
  reason?: string;
  created_at?: string;
  doc?: { name?: string; mime?: string; size?: number; sha256?: string };
  issuer?: { name?: string; identity?: string; type?: string; website?: string; verified_domain?: boolean };
};

export default function VerifyPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [resu, setResu] = useState<RemoteVerifyResult | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setResu(null);

    if (!file) {
      setErr("Choisissez un fichier à vérifier (.meve.pdf / .meve.png).");
      return;
    }

    try {
      setLoading(true);

      const form = new FormData();
      form.append("file", file);

      const res = await fetch("/api/proxy/verify", { method: "POST", body: form });
      if (!res.ok) {
        const t = await res.text().catch(() => "");
        throw new Error(t || `Erreur API (${res.status})`);
      }

      const data = (await res.json()) as RemoteVerifyResult;
      setResu(data);
    } catch (e: any) {
      setErr(e?.message ?? "Échec de la vérification.");
    } finally {
      setLoading(false);
    }
  }

  const badge = (s: RemoteVerifyResult["status"]) => {
    const map = {
      valid: { txt: "VALIDE", cls: "bg-emerald-400/10 text-emerald-300 border-emerald-400/30" },
      valid_document_missing: { txt: "VALIDE (document manquant)", cls: "bg-amber-400/10 text-amber-300 border-amber-400/30" },
      invalid: { txt: "INVALIDE", cls: "bg-rose-400/10 text-rose-300 border-rose-400/30" },
    } as const;
    const m = map[s];
    return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border ${m.cls}`}>{m.txt}</span>;
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-100">Vérifier une preuve .MEVE</h1>
      <p className="mt-2 text-slate-400">
        Déposez un fichier vérifié (<code className="text-slate-300">name.meve.pdf/png</code>).
        Nous contrôlons les marqueurs MEVE (XMP) et l’intégrité.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <div>
          <label className="text-sm text-slate-300">Fichier</label>
          <FileDropzone onSelected={setFile} accept=".pdf,.png" />
        </div>

        <div className="flex items-center gap-3">
          <CTAButton type="submit" disabled={loading} aria-label="Verify proof">
            {loading ? "Vérification…" : "Vérifier"}
          </CTAButton>
          {loading && (
            <span className="text-xs text-slate-400 animate-pulse">Analyse en cours…</span>
          )}
        </div>

        {err && <p className="text-sm text-rose-400">{err}</p>}

        {resu && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-100">Résultat (fichier intégré)</h2>
              {badge(resu.status)}
            </div>

            {resu.reason && (
              <p className="mt-2 text-sm text-slate-400">
                <span className="text-slate-300">Détails :</span> {resu.reason}
              </p>
            )}

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 p-4">
                <h3 className="text-sm font-medium text-slate-200">Document</h3>
                <ul className="mt-2 text-sm text-slate-400 space-y-1">
                  {resu.doc?.name && <li><span className="text-slate-300">Nom :</span> {resu.doc.name}</li>}
                  {resu.doc?.mime && <li><span className="text-slate-300">MIME :</span> {resu.doc.mime}</li>}
                  {typeof resu.doc?.size === "number" && <li><span className="text-slate-300">Taille :</span> {resu.doc.size} bytes</li>}
                  {resu.doc?.sha256 && <li className="break-all"><span className="text-slate-300">SHA-256 :</span> {resu.doc.sha256}</li>}
                </ul>
              </div>

              <div className="rounded-xl border border-white/10 p-4">
                <h3 className="text-sm font-medium text-slate-200">Émetteur</h3>
                <ul className="mt-2 text-sm text-slate-400 space-y-1">
                  {resu.issuer?.name && <li><span className="text-slate-300">Nom :</span> {resu.issuer.name}</li>}
                  {resu.issuer?.identity && <li className="break-all"><span className="text-slate-300">Identité :</span> {resu.issuer.identity}</li>}
                  {resu.issuer?.type && <li><span className="text-slate-300">Type :</span> {resu.issuer.type}</li>}
                  {resu.issuer?.website && <li className="break-all"><span className="text-slate-300">Site :</span> {resu.issuer.website}</li>}
                </ul>
              </div>
            </div>

            {resu.created_at && (
              <p className="mt-4 text-xs text-slate-500">
                Créé le : {new Date(resu.created_at).toUTCString()}
              </p>
            )}
          </div>
        )}

        {/* marge pour éviter que ça soit coupé en bas sur mobile */}
        <div className="h-16" />
      </form>
    </section>
  );
}
