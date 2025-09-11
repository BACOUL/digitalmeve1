// app/verify/page.tsx
"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import { CTAButton } from "@/components/CTAButton";
import {
  verifyFromHtmlCertificate,
  VerifyOutcome,
} from "@/lib/verify-local";

type RemoteVerifyResult = {
  status: "valid" | "valid_document_missing" | "invalid";
  reason?: string;
  created_at?: string;
  doc?: { name?: string; mime?: string; size?: number; sha256?: string };
  issuer?: {
    name?: string;
    identity?: string;
    type?: string;
    website?: string;
    verified_domain?: boolean;
  };
};

function looksLikeHtmlCert(file: File) {
  const name = file.name.toLowerCase();
  return name.endsWith(".meve.html") || file.type.includes("html");
}

export default function VerifyPage() {
  const [file, setFile] = useState<File | null>(null);
  const [original, setOriginal] = useState<File | null>(null); // utile pour .meve.html
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [localResult, setLocalResult] = useState<VerifyOutcome | null>(null);
  const [remoteResult, setRemoteResult] = useState<RemoteVerifyResult | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLocalResult(null);
    setRemoteResult(null);

    if (!file) {
      setErr("Choisissez un fichier à vérifier.");
      return;
    }

    setLoading(true);
    try {
      if (looksLikeHtmlCert(file)) {
        // ✅ Vérification locale d’un certificat HTML
        const outcome = await verifyFromHtmlCertificate(file, original || undefined);
        setLocalResult(outcome);
      } else {
        // ✅ Vérification côté serveur pour PDF/PNG avec preuve intégrée
        const form = new FormData();
        form.append("file", file);
        // (pour PDF/PNG on n'a pas besoin de 'original' ici)
        const res = await fetch("/api/verify", { method: "POST", body: form });
        if (!res.ok) {
          const t = await res.text().catch(() => "");
          throw new Error(t || `Erreur API (${res.status})`);
        }
        const data = (await res.json()) as RemoteVerifyResult;
        setRemoteResult(data);
      }
    } catch (e: any) {
      setErr(e?.message ?? "Échec de la vérification.");
    } finally {
      setLoading(false);
    }
  }

  const renderBadge = (status: "valid" | "valid_document_missing" | "invalid") => {
    const map = {
      valid: {
        text: "VALIDE",
        cls: "bg-emerald-400/10 text-emerald-300 border-emerald-400/30",
      },
      valid_document_missing: {
        text: "VALIDE (document manquant)",
        cls: "bg-amber-400/10 text-amber-300 border-amber-400/30",
      },
      invalid: {
        text: "INVALIDE",
        cls: "bg-rose-400/10 text-rose-300 border-rose-400/30",
      },
    } as const;
    const cfg = map[status];
    return (
      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border ${cfg.cls}`}>
        {cfg.text}
      </span>
    );
  };

  const statusLocal = localResult?.status;
  const statusRemote = remoteResult?.status;

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-100">Vérifier une preuve .MEVE</h1>
      <p className="mt-2 text-slate-400">
        Déposez un fichier vérifié (<code className="text-slate-300">name.meve.pdf/png</code>) ou un certificat
        HTML (<code className="text-slate-300">name.meve.html</code>). Pour un certificat HTML, vous pouvez joindre
        le document original pour une vérification d’intégrité complète.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-300">Fichier ou certificat HTML</label>
            <FileDropzone onSelected={setFile} accept=".pdf,.png,.html,text/html" />
          </div>

          {file && looksLikeHtmlCert(file) && (
            <div>
              <label className="text-sm text-slate-300">Document original (optionnel mais recommandé)</label>
              <FileDropzone onSelected={setOriginal} />
              <p className="mt-1 text-xs text-slate-500">
                Ajoutez le document utilisé à l’origine pour confirmer que son empreinte correspond au certificat.
              </p>
            </div>
          )}
        </div>

        <div>
          <CTAButton type="submit" disabled={loading} aria-label="Verify proof">
            {loading ? "Vérification…" : "Vérifier"}
          </CTAButton>
        </div>

        {err && <p className="text-sm text-rose-400">{err}</p>}

        {/* Résultat LOCAL (certificat HTML) */}
        {localResult && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-100">Résultat (certificat HTML)</h2>
              {renderBadge(localResult.status)}
            </div>

            {localResult.reason && (
              <p className="mt-2 text-sm text-slate-400">
                <span className="text-slate-300">Détails :</span> {localResult.reason}
              </p>
            )}

            {"proof" in localResult && localResult.proof?.doc?.sha256 && (
              <p className="mt-3 text-xs text-slate-500 break-all">
                SHA-256 attendu (depuis le certificat) : {localResult.proof.doc.sha256}
              </p>
            )}
          </div>
        )}

        {/* Résultat API (PDF/PNG intégrés) */}
        {remoteResult && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-100">Résultat (fichier intégré)</h2>
              {renderBadge(remoteResult.status)}
            </div>

            {remoteResult.reason && (
              <p className="mt-2 text-sm text-slate-400">
                <span className="text-slate-300">Détails :</span> {remoteResult.reason}
              </p>
            )}

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 p-4">
                <h3 className="text-sm font-medium text-slate-200">Document</h3>
                <ul className="mt-2 text-sm text-slate-400 space-y-1">
                  {remoteResult.doc?.name && (
                    <li><span className="text-slate-300">Nom :</span> {remoteResult.doc.name}</li>
                  )}
                  {remoteResult.doc?.mime && (
                    <li><span className="text-slate-300">MIME :</span> {remoteResult.doc.mime}</li>
                  )}
                  {typeof remoteResult.doc?.size === "number" && (
                    <li><span className="text-slate-300">Taille :</span> {remoteResult.doc.size} bytes</li>
                  )}
                  {remoteResult.doc?.sha256 && (
                    <li className="break-all"><span className="text-slate-300">SHA-256 :</span> {remoteResult.doc.sha256}</li>
                  )}
                </ul>
              </div>

              <div className="rounded-xl border border-white/10 p-4">
                <h3 className="text-sm font-medium text-slate-200">Émetteur</h3>
                <ul className="mt-2 text-sm text-slate-400 space-y-1">
                  {remoteResult.issuer?.name && (
                    <li><span className="text-slate-300">Nom :</span> {remoteResult.issuer.name}</li>
                  )}
                  {remoteResult.issuer?.identity && (
                    <li className="break-all"><span className="text-slate-300">Identité :</span> {remoteResult.issuer.identity}</li>
                  )}
                  {remoteResult.issuer?.type && (
                    <li><span className="text-slate-300">Type :</span> {remoteResult.issuer.type}</li>
                  )}
                  {remoteResult.issuer?.website && (
                    <li className="break-all"><span className="text-slate-300">Site :</span> {remoteResult.issuer.website}</li>
                  )}
                </ul>
              </div>
            </div>

            {remoteResult.created_at && (
              <p className="mt-4 text-xs text-slate-500">
                Créé le : {new Date(remoteResult.created_at).toUTCString()}
              </p>
            )}
          </div>
        )}

        {(statusLocal || statusRemote) && (
          <p className="mt-4 text-xs text-slate-500">
            • <span className="text-emerald-300">Vert</span> : preuve valide. •{" "}
            <span className="text-amber-300">Ambre</span> : certificat lisible mais document manquant. •{" "}
            <span className="text-rose-300">Rouge</span> : fichier falsifié ou certificat invalide.
          </p>
        )}
      </form>
    </section>
  );
      }
