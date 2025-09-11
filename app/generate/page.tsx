"use client";

import { useState, useRef, useEffect } from "react";
import FileDropzone from "@/components/FileDropzone";
import { CTAButton } from "@/components/CTAButton";
import ProgressBar from "@/components/ProgressBar";
import { FileText } from "lucide-react";
import { watermarkPdfFile } from "@/lib/watermark-pdf";
import { embedMeveXmp, sha256Hex } from "@/lib/meve-xmp";

function splitName(name?: string) {
  if (!name) return { base: "file", ext: "pdf" };
  const m = name.match(/^(.+)\.([^.]+)$/);
  return m ? { base: m[1], ext: m[2] } : { base: name, ext: "pdf" };
}

export default function GeneratePage() {
  const [file, setFile] = useState<File | null>(null);
  const [issuer, setIssuer] = useState("");

  const [uploadPct, setUploadPct] = useState<number | undefined>(undefined);
  const [processing, setProcessing] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const [proofHash, setProofHash] = useState<string | null>(null);
  const [proofWhen, setProofWhen] = useState<string | null>(null);
  const [proofUrl, setProofUrl] = useState<string | null>(null);

  const proofRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (proofUrl && proofRef.current) {
      proofRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [proofUrl]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    setUploadPct(undefined);
    setProcessing(false);
    setProofHash(null);
    setProofWhen(null);

    if (!file) {
      setErr("Please select a document.");
      return;
    }
    if (file.type !== "application/pdf") {
      setErr("Currently, only PDF documents are supported.");
      return;
    }

    try {
      setProcessing(true);
      setUploadPct(15);

      const originalHash = await sha256Hex(file);
      setProofHash(originalHash);

      const watermarked = await watermarkPdfFile(file, "DigitalMeve");
      setUploadPct(55);

      const createdAtISO = new Date().toISOString();
      const pdfWithMeve = await embedMeveXmp(watermarked, {
        docSha256: originalHash,
        createdAtISO,
        issuer: issuer.trim(),
        issuerType: "personal",
        issuerWebsite: "https://digitalmeve.com",
      });
      setProofWhen(createdAtISO);
      setUploadPct(85);

      const { base, ext } = splitName(file.name);
      const outName = `${base}.meve.${ext}`;
      const url = URL.createObjectURL(pdfWithMeve);
      setProofUrl(url);

      const a = document.createElement("a");
      a.href = url;
      a.download = outName;
      document.body.appendChild(a);
      a.click();
      a.remove();

      setMsg(`Downloaded: ${outName}`);
      setProcessing(false);
      setUploadPct(100);
    } catch (e: any) {
      setErr(e?.message ?? "Generation failed.");
      setProcessing(false);
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-slate-100">Generate a .MEVE Proof</h1>
      <p className="mt-2 text-slate-400">
        Upload your document. We’ll add a light DigitalMeve watermark and store
        a secure marker inside the file (date, time and a unique fingerprint).
        You will receive <code className="text-slate-300">name.meve.pdf</code>{" "}
        and you can also download a human-readable certificate.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-6">
        <FileDropzone onSelected={setFile} accept=".pdf,application/pdf" />

        <div>
          <label htmlFor="issuer" className="text-sm text-slate-300">
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
      </form>

      {(proofHash || proofWhen) && (
        <div
          ref={proofRef}
          className="mt-10 rounded-2xl border border-white/10 bg-slate-900/60 p-5"
        >
          <h3 className="text-slate-100 font-semibold">Your Proof</h3>
          <ul className="mt-2 text-sm text-slate-400 space-y-1">
            {file && (
              <li>
                <span className="text-slate-300">File:</span>{" "}
                {splitName(file.name).base}.meve.pdf
              </li>
            )}
            {proofWhen && (
              <li>
                <span className="text-slate-300">Date:</span>{" "}
                {new Date(proofWhen).toLocaleDateString()} —{" "}
                <span className="text-slate-300">Time:</span>{" "}
                {new Date(proofWhen).toLocaleTimeString()}
              </li>
            )}
            <li>
              <span className="text-slate-300">Issuer:</span>{" "}
              {issuer.trim() || "—"}
            </li>
            {proofHash && (
              <li className="break-all">
                <span className="text-slate-300">SHA-256:</span> {proofHash}
              </li>
            )}
          </ul>

          <div className="mt-4 flex flex-wrap gap-3">
            {proofUrl && (
              <>
                <a
                  href={proofUrl}
                  download={`${splitName(file?.name).base}.meve.pdf`}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-emerald-500/20 px-3 py-1.5 text-sm text-emerald-300 hover:bg-emerald-500/30"
                >
                  Download PDF
                </a>
                <button
                  type="button"
                  onClick={() =>
                    exportHtmlCertificate(
                      proofUrl,
                      `${splitName(file?.name).base}.meve.pdf`
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-100 hover:bg-white/10"
                >
                  <FileText className="h-4 w-4" /> Download Certificate (.html)
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
