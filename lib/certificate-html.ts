// lib/certificate-html.ts

// Fonction utilitaire locale : découpe un nom en base + extension
function splitName(name?: string) {
  if (!name) return { base: "file", ext: "pdf" };
  const m = name.match(/^(.+)\.([^.]+)$/);
  return m ? { base: m[1], ext: m[2] } : { base: name, ext: "pdf" };
}

/**
 * Exporte un certificat HTML (fond blanc, lisible) et ouvre une prévisualisation 10 s.
 * - Télécharge automatiquement le fichier `${base}.meve.html`
 * - Ouvre aussi dans un nouvel onglet pendant 10 s (puis ferme l’onglet)
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
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  :root{
    --bg:#ffffff; --ink:#0f172a; --muted:#475569; --border:rgba(15,23,42,.12);
    --emerald:#10b981; --sky:#0ea5e9;
  }
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--ink);
    font:16px/1.55 ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,"Helvetica Neue",Arial;}
  .wrap{max-width:960px;margin:0 auto;padding:28px}
  .brand{font-weight:800;letter-spacing:-.02em;margin-bottom:16px}
  .brand .g1{color:var(--emerald)} .brand .g2{color:var(--sky)}
  .card{background:#fff;border:1px solid var(--border);border-radius:16px;padding:24px}
  h1{margin:0 0 6px;font-size:26px;line-height:1.2;letter-spacing:-.01em}
  .sub{margin:0 0 18px;color:var(--muted)}
  .badge{display:inline-block;vertical-align:middle;margin-left:8px;padding:.25rem .6rem;
    border:1px solid color-mix(in srgb, var(--emerald) 40%, transparent);border-radius:999px;color:var(--emerald);font-size:12px;font-weight:700}
  .meta{display:grid;grid-template-columns:180px 1fr;gap:10px;margin-top:6px}
  .k{color:#0f172a;font-weight:600}
  .v{color:#111827;word-break:break-all}
  .v.muted{color:var(--muted)}
  @media (max-width:640px){.meta{grid-template-columns:1fr;gap:6px}}
  .hl{font-weight:700}
  .hash{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace}
  .row{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}
  .btn{display:inline-flex;align-items:center;gap:.5rem;padding:.55rem .9rem;border:1px solid var(--border);
    border-radius:12px;background:#fff;color:#0f172a;text-decoration:none}
  .btn:hover{box-shadow:0 0 0 3px rgba(14,165,233,.25)}
  .btn-primary{background:linear-gradient(90deg,var(--emerald),var(--sky));border-color:transparent;color:#fff}
  .note{margin-top:14px;color:var(--muted);font-size:14px}
  .hr{height:1px;background:var(--border);margin:18px 0}
  @media print {.btn,.row,.note{display:none} body{background:#fff}}
</style>

<div class="wrap">
  <div class="brand"><span class="g1">Digital</span><span class="g2">Meve</span></div>

  <div class="card">
    <h1>.MEVE Certificate <span class="badge">VALID</span></h1>
    <p class="sub">All information at a glance. White background, no extra visuals.</p>

    <div class="meta">
      <div class="k">File</div><div class="v">${base}.meve.pdf</div>
      <div class="k">Date</div><div class="v">${new Date(proofWhen).toLocaleDateString()}</div>
      <div class="k">Time</div><div class="v">${new Date(proofWhen).toLocaleTimeString()}</div>
      <div class="k">Issuer</div><div class="v">${issuerShown}</div>
      <div class="k">SHA-256</div><div class="v hash">${proofHash}</div>
    </div>

    <div class="row">
      <button class="btn" id="copyBtn" type="button">Copy hash</button>
      <button class="btn" id="printBtn" type="button">Print</button>
      <a class="btn btn-primary" href="/verify" target="_blank" rel="noreferrer">Open /verify</a>
    </div>

    <p class="note">
      This page summarizes the information stored in the PDF’s XMP metadata by DigitalMeve.
    </p>

    <div class="hr"></div>

    <div class="meta" style="margin-top:0">
      <div class="k">MEVE version</div><div class="v">1</div>
      <div class="k">Algorithm</div><div class="v">SHA-256</div>
      <div class="k">Timestamp (UTC)</div><div class="v">${new Date(proofWhen).toISOString()}</div>
      <div class="k">Issuer type</div><div class="v muted">personal</div>
      <div class="k">Issuer website</div><div class="v muted">https://digitalmeve.com</div>
    </div>
  </div>
</div>

<!-- JSON MEVE embarqué (utile pour outils/automatisation) -->
<script type="application/meve+json">
${JSON.stringify(
  {
    meve: {
      version: 1,
      algo: "SHA-256",
      hash: proofHash,
      created_at: new Date(proofWhen).toISOString(),
      issuer: issuerShown,
      issuer_type: "personal",
      issuer_website: "https://digitalmeve.com",
      file: `${base}.meve.pdf`,
      mime: "application/pdf",
    },
  },
  null,
  2
)}
</script>

<script>
  // Copy hash
  (function(){
    const btn = document.getElementById('copyBtn');
    const hashEl = document.querySelector('.hash');
    if(btn && hashEl){
      btn.addEventListener('click', async () => {
        try{
          await navigator.clipboard.writeText(hashEl.textContent || '');
          const old = btn.textContent; btn.textContent = 'Copied!'; setTimeout(()=>btn.textContent = old, 1200);
        }catch{}
      });
    }
  })();

  // Print
  (function(){
    const btn = document.getElementById('printBtn');
    if(btn){ btn.addEventListener('click', () => window.print()); }
  })();
</script>
</html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  // 1) Téléchargement du certificat
  const a = document.createElement("a");
  a.href = url;
  a.download = `${base}.meve.html`;
  document.body.appendChild(a);
  a.click();
  a.remove();

  // 2) Prévisualisation 10 s dans un nouvel onglet
  const preview = window.open(url, "_blank", "noopener,noreferrer");
  setTimeout(() => { try { preview?.close(); } catch {} }, 10000);
}
