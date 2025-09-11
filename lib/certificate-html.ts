// lib/certificate-html.ts

// Fonction utilitaire locale : découpe un nom en base + extension
function splitName(name?: string) {
  if (!name) return { base: "file", ext: "pdf" };
  const m = name.match(/^(.+)\.([^.]+)$/);
  return m ? { base: m[1], ext: m[2] } : { base: name, ext: "pdf" };
}

/**
 * Exporte un certificat HTML à partir des métadonnées de preuve.
 * - Télécharge automatiquement le fichier `${base}.meve.html`
 * - Ouvre aussi dans un nouvel onglet (le navigateur propose « ouvrir »)
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
  :root{--bg:#0b1220;--card:#0f172a;--border:#243045;--text:#e2e8f0;--muted:#94a3b8;--key:#cbd5e1;--ok:#34d399}
  *{box-sizing:border-box}
  body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,'Helvetica Neue',Arial;color:var(--text);background:var(--bg);margin:0}
  .wrap{max-width:880px;margin:0 auto;padding:28px}
  .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:22px;box-shadow:0 8px 30px rgba(0,0,0,.35)}
  h1{margin:0 0 10px;font-size:22px;line-height:1.2}
  .ok{display:inline-block;margin-left:8px;padding:.25rem .6rem;border:1px solid color-mix(in srgb, var(--ok) 40%, transparent);border-radius:999px;color:var(--ok);font-size:12px}
  .grid{display:grid;grid-template-columns:160px 1fr;gap:12px;margin:10px 0}
  .k{color:var(--key)}
  code{color:var(--muted);word-break:break-all}
  @media (max-width:640px){.grid{grid-template-columns:1fr;gap:4px}}
</style>
<div class="wrap">
  <div class="card">
    <h1>.MEVE Certificate <span class="ok">VALID</span></h1>
    <div class="grid"><div class="k">File</div><div>${base}.meve.pdf</div></div>
    <div class="grid"><div class="k">Date</div><div>${new Date(proofWhen).toLocaleDateString()}</div></div>
    <div class="grid"><div class="k">Time</div><div>${new Date(proofWhen).toLocaleTimeString()}</div></div>
    <div class="grid"><div class="k">Issuer</div><div>${issuerShown}</div></div>
    <div class="grid"><div class="k">SHA-256</div><div><code>${proofHash}</code></div></div>
    <p style="color:var(--muted);font-size:14px;margin-top:14px">
      This page summarizes the information stored in the PDF’s XMP metadata by DigitalMeve.
    </p>
  </div>
</div>
</html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  // 1) Téléchargement
  const a = document.createElement("a");
  a.href = url;
  a.download = `${base}.meve.html`;
  document.body.appendChild(a);
  a.click();
  a.remove();

  // 2) Ouverture dans un nouvel onglet
  window.open(url, "_blank", "noopener,noreferrer");

  // 3) Nettoyage
  setTimeout(() => URL.revokeObjectURL(url), 15000);
}
