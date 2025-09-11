// app/verify/page.tsx
"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import { CTAButton } from "@/components/CTAButton";
import { readMeveXmp, sha256Hex } from "@/lib/meve-xmp";

type Result =
  | { status: "valid"; reason?: string; created_at?: string }
  | { status: "valid_document_missing"; reason: string; created_at?: string }
  | { status: "invalid"; reason: string; created_at?: string };

export default function VerifyPage() {
  const [mevePdf, setMevePdf] = useState<File | null>(null);
  const [original, setOriginal] = useState<File | null>(null); // pour comparer le hash
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<Result | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setRes(null);

    if (!mevePdf) {
      setErr("Ajoute le PDF à vérifier (name.meve.pdf).");
      return;
    }
    if (mevePdf.type !== "application/pdf") {
      setErr("Seuls les PDF sont supportés.");
      return;
    }

    setLoading(true);
    try {
      // 1) lire le XMP
      const info = await readMeveXmp(mevePdf);
      const docHash = info.meve?.doc_sha256;
      const created = info.meve?.created_at;

      if (!docHash) {
        setRes({ status: "invalid", reason: "Aucun marqueur MEVE (XMP) trouvé." });
        return;
      }

      // 2) si pas d’original => preuve trouvée mais pas d’intégrité
      if (!original) {
        setRes({
          status: "valid_document_missing",
          reason: "Preuve trouvée. Ajoute l’original pour valider l’intégrité (SHA-256).",
          created_at: created,
        });
        return;
      }

      // 3) comparer SHA-256 de l’original
      const actual = (await sha256Hex(original)).toLowerCase();
      if (actual === docHash.toLowerCase()) {
        setRes({ status: "valid", created_at: created });
      } else {
        setRes({
          status: "invalid",
          reason: "Le SHA-256 de l’original ne correspond pas au doc_sha256 enregistré.",
          created_at: created,
        });
      }
    } catch (e: any) {
      setErr(e?.message ?? "Échec de la vérification.");
    } finally {
      setLoading(false);
    }
  }

  const badge = (s: Result["status"]) => {
    const cls =
      s === "valid"
        ? "bg-emerald-400/10 text-emerald-300 border-emerald-400/30"
        : s === "valid_document_missing"
        ? "bg-amber-400/10 text-amber-300 border-amber-400/30"
        : "bg-rose-400/10 text-rose-300 border-rose-400/30";
    return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold border ${cls}`}>{s.toUpperCase()}</span>;
  };

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 pb-24">
      <h1 className="text-3xl font-bold text-slate-100">Vérifier une preuve .MEVE</h1>
      <p className="mt-2 text-slate-400">
        Dépose ton <code className="text-slate-300">name.meve.pdf</code>. Optionnel : ajoute le document
        original pour valider l’intégrité (comparaison SHA-256).
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <div>
          <label className="text-sm text-slate-300">PDF à vérifier</label>
          <FileDropzone onSelected={setMevePdf} accept=".pdf,application/pdf" />
        </div>

        <div>
          <label className="text-sm text-slate-300">Original (optionnel mais recommandé)</label>
          <FileDropzone onSelected={setOriginal} />
        </div>

        <div>
          <CTAButton type="submit" disabled={loading || !mevePdf}>
            {loading ? "Vérification…" : "Vérifier"}
          </CTAButton>
        </div>

        {err && <p className="text-sm text-rose-400">{err}</p>}

        {res && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-100">Résultat</h2>
              {badge(res.status)}
            </div>

            {res.created_at && (
              <p className="mt-2 text-sm text-slate-400">
                <span className="text-slate-300">Date :</span>{" "}
                {new Date(res.created_at).toLocaleDateString()} —{" "}
                <span className="text-slate-300">Heure :</span>{" "}
                {new Date(res.created_at).toLocaleTimeString()}
              </p>
            )}

            {"reason" in res && res.reason && (
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
