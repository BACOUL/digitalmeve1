"use client";

import { useState } from "react";

export default function GeneratePage() {
  const [file, setFile] = useState<File | null>(null);
  const [issuer, setIssuer] = useState("");
  const [res, setRes] = useState<{
    pdfBlob?: Blob;
    certBlob?: Blob;
    fileName?: string;
  }>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleGenerate = async () => {
    if (!file) return;

    // Simule un appel backend qui renvoie le PDF + le certificat
    const pdfBlob = new Blob([`Fake content for ${file.name}`], {
      type: "application/pdf",
    });
    const certBlob = new Blob(
      [
        `
        <html>
        <head><title>.MEVE Certificate</title></head>
        <body style="font-family: Arial, sans-serif; background:#fff; color:#000; padding:20px;">
          <h2>.MEVE Certificate <span style="color:green;">VALID</span></h2>
          <p><strong>File:</strong> ${file.name}.meve.pdf</p>
          <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${new Date().toLocaleTimeString()}</p>
          <p><strong>Issuer:</strong> ${issuer || "Unknown"}</p>
          <p><strong>SHA-256:</strong> 123abc456def789...</p>
          <p>This page summarizes the information stored in the PDF’s XMP metadata by DigitalMeve.</p>
        </body>
        </html>
      `,
      ],
      { type: "text/html" }
    );

    setRes({
      pdfBlob,
      certBlob,
      fileName: file.name.replace(/\.pdf$/i, "") + ".meve.pdf",
    });
  };

  const downloadPDF = () => {
    if (!res.pdfBlob || !res.fileName) return;
    const url = URL.createObjectURL(res.pdfBlob);

    // Ouvre un onglet avec le PDF pendant 10 secondes
    const w = window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => {
      try {
        w?.close();
      } catch {}
      URL.revokeObjectURL(url);
    }, 10000);

    // Fallback : déclenche aussi le téléchargement forcé
    const a = document.createElement("a");
    a.href = url;
    a.download = res.fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const downloadCert = () => {
    if (!res.certBlob) return;
    const url = URL.createObjectURL(res.certBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "certificate.html";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">
        Generate a <span className="text-teal-600">.MEVE proof</span>
      </h1>
      <p className="text-gray-600 mb-6">
        Upload your document (PDF for now). We add a light DigitalMeve watermark
        and store a tamper-proof marker inside the file (date, time, and a
        unique fingerprint). You’ll get{" "}
        <code className="text-teal-600">name.meve.pdf</code>. You can also
        download a human-readable certificate.
      </p>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-4"
      />

      <input
        type="email"
        placeholder="Issuer (optional)"
        value={issuer}
        onChange={(e) => setIssuer(e.target.value)}
        className="border rounded px-3 py-2 w-full mb-4"
      />

      <button
        onClick={handleGenerate}
        className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700"
      >
        Generate Proof
      </button>

      {res.pdfBlob && (
        <div className="mt-8 border rounded bg-gray-50 p-4">
          <h2 className="text-lg font-semibold mb-2">Proof Preview</h2>
          <p>
            <strong>File:</strong> {res.fileName}
          </p>
          <p>
            <strong>Date:</strong> {new Date().toLocaleDateString()} —{" "}
            <strong>Time:</strong> {new Date().toLocaleTimeString()}
          </p>
          <p>
            <strong>Issuer:</strong> {issuer || "Unknown"}
          </p>
          <p>
            <strong>SHA-256:</strong> 123abc456def789...
          </p>

          <div className="flex gap-3 mt-4">
            <button
              onClick={downloadPDF}
              className="px-4 py-2 rounded bg-teal-600 text-white hover:bg-teal-700"
            >
              Download .MEVE document
            </button>
            <button
              onClick={downloadCert}
              className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-800"
            >
              Download Certificate (.html)
            </button>
          </div>
        </div>
      )}
    </div>
  );
        }
