// lib/certificate-html.ts
import { splitName } from "./utils";

/**
 * Export a clean HTML certificate from proof metadata.
 * The certificate can be downloaded and opened by the user.
 */
export function exportHtmlCertificate(
  fileName: string,
  proofHash: string,
  proofWhen: string,
  issuer: string
) {
  const { base } = splitName(fileName);
  const issuerShown = issuer.trim() || "—";

  const html = `<!doctype html>
<html lang="en"><meta charset="utf-8">
<title>.MEVE Certificate — ${base}</title>
<style>
  body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,'Helvetica Neue',Arial;color:#e2e8f0;background:#0b1220;margin:0}
  .wrap{max-width:880px;margin:0 auto;padding:28px}
  .card{background:#0f172a;border:1px solid #243045;border-radius:16px;padding:22px;box-shadow:0 8px 30px rgba(0,0,0,.35)}
  h1{margin:0 0 10px;font-size:22px}
  .ok{display:inline-block;margin-left:8px;padding:.25rem .6rem;border:1px solid #34d39955;border-radius:999px;color:#34d399;font-size:12px}
  .row{display:grid;grid-template-columns:160px 1fr;gap:12px;margin:10px 0}
  .k{color:#cbd5e1}
  code{color:#94a3b8;word-break:break-all}
</style>
<div class="wrap">
  <div class="card">
    <h1>.MEVE Certificate <span class="ok">VALID</span></h1>
    <div class="row"><div class="k">File</div><div>${base}.meve.pdf</div></div>
    <div class="row"><div class="k">Date</div><div>${new Date(proofWhen).toLocaleDateString()}</div></div>
    <div class="row"><div class="k">Time</div><div>${new Date(proofWhen).toLocaleTimeString()}</div></div>
    <div class="row"><div class="k">Issuer</div><div>${issuerShown}</div></div>
    <div class="row"><div class="k">SHA-256</div><div><code>${proofHash}</code></div></div>
    <p style="color:#94a3b8;font-size:14px;margin-top:14px">
      This certificate contains the information stored in the PDF’s XMP metadata.
    </p>
  </div>
</div>
</html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${base}.meve.html`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);

  // also auto-open in a new tab like the PDF
  window.open(url, "_blank", "noopener,noreferrer");
}
