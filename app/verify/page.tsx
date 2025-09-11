// app/verify/page.tsx
"use client";

import { useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import { CTAButton } from "@/components/CTAButton";
import ProgressBar from "@/components/ProgressBar";
import { CheckCircle2, XCircle, Info, ShieldCheck } from "lucide-react";
import { verifyMevePdf, readMeveXmp, type MeveXmpInfo } from "@/lib/meve-xmp";

export default function VerifyPage() {
  const [mevePdf, setMevePdf] = useState<File | null>(null);
  const [original, setOriginal] = useState<File | null>(null);

  const [verifying, setVerifying] = useState(false);
  const [progress, setProgress] = useState<number | undefined>(undefined);

  const [status, setStatus] =
    useState<"idle" | "valid" | "valid_document_missing" | "invalid">("idle");
  const [reason, setReason] = useState<string | undefined>(undefined);
  const [meve, setMeve] = useState<MeveXmpInfo | undefined>(undefined);
  const [err, setErr] = useState<string | null>(null);

  async function onVerify(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setStatus("idle");
    setReason(undefined);
    setMeve(undefined);
    setVerifying(true);
    setProgress(10);

    try {
      if (!mevePdf) {
        setErr("Please choose a .meve.pdf file to verify.");
        setVerifying(false);
        setProgress(undefined);
        return;
      }

      // lecture MEVE rapide (infos à afficher même si original absent)
      const { meve: meta } = await readMeveXmp(mevePdf);
      setMeve(meta);
      setProgress(40);

      // vérification complète
      const res = await verifyMevePdf(mevePdf, original ?? undefined);
      setProgress(90);

      setStatus(res.status);
      setReason(res.reason);
      setMeve(res.meve ?? meta);
    } catch (e: any) {
      setErr(e?.message ?? "Verification failed.");
    } finally {
      setVerifying(false);
      setProgress(100);
      setTimeout(() => setProgress(undefined), 400);
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-10 text-slate-100">
      {/* Titre + sous-titre très lisibles */}
      <h1 className="text-3xl font-bold">Verify a .MEVE proof</h1>
      <p className="mt-2 text-slate-300">
        Drop your <span className="font-semibold">name.meve.pdf</span>. Optional: add the
        original file to confirm integrity (SHA-256 comparison).
      </p>

      <form onSubmit={onVerify} className="mt-8 space-y-6">
        {/* Cartes contrastées */}
        <div>
          <label className="mb-2 block text-sm text-slate-200">
            PDF to verify
          </label>
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-3">
            <FileDropzone
              onSelected={setMevePdf}
              accept=".pdf,application/pdf"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-200">
            Original (optional but recommended)
          </label>
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-3">
            <FileDropzone onSelected={setOriginal} />
          </div>
        </div>

        <div className="w-full sm:w-auto">
          <CTAButton type="submit" aria-label="Verify .MEVE">
            Verify
          </CTAButton>
          {(progress !== undefined || verifying) && (
            <div className="mt-3">
              <ProgressBar value={verifying ? undefined : progress} />
            </div>
          )}
        </div>

        {err && (
          <p className="text-sm text-rose-400">
            {err}
          </p>
        )}

        {/* Résultat */}
        {status !== "idle" && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-slate-900/70 p-5">
            <div className="mb-3 flex items-center gap-2">
              {status === "valid" && (
                <>
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <span className="inline-flex items-center rounded-full border border-emerald-400/40 bg-emerald-400/10 px-2.5 py-0.5 text-xs text-emerald-300">
                    VALID
                  </span>
                </>
              )}
              {status === "valid_document_missing" && (
                <>
                  <ShieldCheck className="h-5 w-5 text-sky-300" />
                  <span className="inline-flex items-center rounded-full border border-sky-400/40 bg-sky-400/10 px-2.5 py-0.5 text-xs text-sky-300">
                    PROOF FOUND — ORIGINAL MISSING
                  </span>
                </>
              )}
              {status === "invalid" && (
                <>
                  <XCircle className="h-5 w-5 text-rose-400" />
                  <span className="inline-flex items-center rounded-full border border-rose-400/40 bg-rose-400/10 px-2.5 py-0.5 text-xs text-rose-300">
                    INVALID
                  </span>
                </>
              )}
            </div>

            {reason && (
              <p className="text-sm text-slate-300">{reason}</p>
            )}

            {/* Détails MEVE */}
            <div className="mt-4 grid gap-2 text-sm text-slate-300">
              <div className="flex gap-2">
                <span className="w-36 text-slate-400">Version</span>
                <span>{meve?.version || "—"}</span>
              </div>
              <div className="flex gap-2">
                <span className="w-36 text-slate-400">Created</span>
                <span>{meve?.created_at || "—"}</span>
              </div>
              <div className="flex gap-2">
                <span className="w-36 text-slate-400">Issuer</span>
                <span>{meve?.issuer_identity || "—"}</span>
              </div>
              <div className="flex gap-2">
                <span className="w-36 text-slate-400">SHA-256</span>
                <span className="break-all">{meve?.doc_sha256 || "—"}</span>
              </div>
            </div>

            <p className="mt-4 flex items-start gap-2 text-xs text-slate-500">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              The proof is stored in the PDF’s XMP metadata. Any change to the
              original document will break the integrity check.
            </p>
          </div>
        )}
      </form>
    </section>
  );
}
