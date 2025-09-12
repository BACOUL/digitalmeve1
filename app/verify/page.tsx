// app/verify/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import FileDropzone from "@/components/FileDropzone";
import { CTAButton } from "@/components/CTAButton";
import ProgressBar from "@/components/ProgressBar";
import { ShieldCheck, AlertTriangle, XCircle, FileText } from "lucide-react";
import { readMeveXmp, verifyMevePdf, MeveXmpInfo } from "@/lib/meve-xmp";
import { exportHtmlCertificate } from "@/lib/certificate-html";

type Status = "idle" | "checking" | "valid" | "valid_document_missing" | "invalid" | "error";

export default function VerifyPage() {
  const [certified, setCertified] = useState<File | null>(null);
  const [original, setOriginal] = useState<File | null>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [details, setDetails] = useState<MeveXmpInfo | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [progress, setProgress] = useState<number | undefined>();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ((status === "valid" || status === "valid_document_missing" || status === "invalid") && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [status]);

  async function onVerify(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");
    setMessage(null);
    setDetails(null);
    setProgress(10);

    try {
      if (!certified) {
        setStatus("error");
        setMessage("Please select the certified document first.");
        setProgress(undefined);
        return;
      }

      // Lecture XMP pour afficher les infos même sans original
      const { meve } = await readMeveXmp(certified);
      setProgress(40);

      // Vérification complète si original fourni
      const res = await verifyMevePdf(certified, original ?? undefined);
      setProgress(85);

      setDetails(meve ?? null);
      setStatus(res.status);
      if (res.status === "invalid") {
        setMessage(res.reason ?? "Invalid proof.");
      } else if (res.status === "valid_document_missing") {
        setMessage("Proof found. Add the original document to confirm integrity.");
      } else if (res.status === "valid") {
        setMessage("Verified. This .MEVE file is authentic.");
      }
      setProgress(100);
    } catch (err: any) {
      setStatus("error");
      setMessage(err?.message ?? "Verification failed.");
      setProgress(undefined);
    }
  }

  const canDownloadCertificate =
    (status === "valid" || status === "valid_document_missing") &&
    !!details?.doc_sha256 &&
    !!details?.created_at &&
    !!certified;

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900">Verify a .MEVE file</h1>
      <p className="mt-2 text-gray-600">
        Drop your certified document. Optionally add the original file to confirm integrity (byte-for-byte).
      </p>

      <form onSubmit={onVerify} className="mt-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">Certified document</label>
          <FileDropzone
            onSelected={setCertified}
            accept=".pdf,application/pdf"
            maxSizeMB={10}
            label="Select the certified PDF"
            hint="Drag & drop or tap to select. Max {SIZE} MB."
          />
          <p className="mt-1 text-xs text-gray-500">Expected: <code>*.meve.pdf</code> (or any PDF containing MEVE XMP).</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">Original document (optional)</label>
          <FileDropzone
            onSelected={setOriginal}
            // On autorise tout type en V1 : PDF/PNG/JPG/DOCX… (l’original)
            accept={[
              ".pdf",".png",".jpg",".jpeg",".webp",".txt",".csv",".json",
              ".doc",".docx",".xls",".xlsx",".ppt",".pptx",
              "application/pdf","image/png","image/jpeg","image/webp","text/plain","text/csv","application/json",
              "application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              "application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              "application/vnd.ms-powerpoint","application/vnd.openxmlformats-officedocument.presentationml.presentation",
            ].join(",")}
            maxSizeMB={10}
            label="Select the original file"
            hint="Optional: add the original to fully verify. Max {SIZE} MB."
          />
        </div>

        <div className="w-full sm:w-auto">
          <CTAButton type="submit" aria-label="Verify .MEVE file">Verify</CTAButton>
          {progress !== undefined && (
            <div className="mt-3">
              <ProgressBar value={progress === 100 ? 100 : progress} />
            </div>
          )}
        </div>
      </form>

      {/* Résultat */}
      {status !== "idle" && (
        <div ref={cardRef} className="mt-8 rounded-xl border border-gray-200 bg-white p-5 shadow-md">
          <div className="flex items-center gap-2">
            {status === "valid" && (
              <>
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <span className="text-emerald-700 font-medium">Verified</span>
              </>
            )}
            {status === "valid_document_missing" && (
              <>
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <span className="text-amber-700 font-medium">Proof found — original missing</span>
              </>
            )}
            {status === "invalid" && (
              <>
                <XCircle className="h-5 w-5 text-rose-600" />
                <span className="text-rose-700 font-medium">Invalid</span>
              </>
            )}
            {status === "error" && (
              <>
                <XCircle className="h-5 w-5 text-rose-600" />
                <span className="text-rose-700 font-medium">Error</span>
              </>
            )}
          </div>

          {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}

          {/* Détails MEVE */}
          {details && (
            <ul className="mt-4 grid gap-2 text-sm text-gray-700 sm:grid-cols-2">
              <li>
                <span className="text-gray-500">Version:</span>{" "}
                {details.version ?? "—"}
              </li>
              <li>
                <span className="text-gray-500">Date:</span>{" "}
                {details.created_at ? new Date(details.created_at).toLocaleString() : "—"}
              </li>
              <li className="sm:col-span-2 break-all">
                <span className="text-gray-500">SHA-256:</span>{" "}
                {details.doc_sha256 ?? "—"}
              </li>
              <li>
                <span className="text-gray-500">Issuer:</span>{" "}
                {details.issuer_identity || "—"}
              </li>
              <li>
                <span className="text-gray-500">Issuer type:</span>{" "}
                {details.issuer_type || "—"}
              </li>
              <li className="sm:col-span-2">
                <span className="text-gray-500">Issuer website:</span>{" "}
                {details.issuer_website || "—"}
              </li>
            </ul>
          )}

          {/* Télécharger le certificat HTML quand on a assez d’infos */}
          {canDownloadCertificate && (
            <button
              type="button"
              onClick={() => {
                if (!certified || !details?.doc_sha256 || !details?.created_at) return;
                exportHtmlCertificate(certified.name, details.doc_sha256, details.created_at, details.issuer_identity || "");
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
            >
              <FileText className="h-4 w-4" />
              Download certificate (.html)
            </button>
          )}
        </div>
      )}
    </section>
  );
      }
