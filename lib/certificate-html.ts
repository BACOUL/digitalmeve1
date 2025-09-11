// lib/certificate-html.ts

export function buildMeveCertificateHtml(opts: {
  fileName: string;
  createdAtISO: string;      // e.g. new Date().toISOString()
  issuer?: string;
  sha256: string;
}) {
  const { fileName, createdAtISO, issuer = "", sha256 } = opts;

  const d = new Date(createdAtISO);
  const date = d.toLocaleDateString(undefined, { year: "numeric", month: "2-digit", day: "2-digit" });
  const time = d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });

  // Clean, responsive, dark certificate (no external assets)
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>.MEVE Certificate — ${escapeHtml(fileName)}</title>
<style>
  :root{
    --bg:#0b1220;
    --card:#0f172a;
    --muted:#94a3b8;
    --text:#e2e8f0;
    --border:rgba(255,255,255,.08);
    --emerald:#34d399;
    --blue:#60a5fa;
  }
  *{box-sizing:border-box}
  html,body{margin:0;background:var(--bg);color:var(--text);font:400 16px/1.5 ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,"Helvetica Neue",Arial}
  .wrap{max-width:920px;margin:32px auto;padding:16px}
  .title{font-weight:700;font-size:20px;display:flex;align-items:center;gap:10px;margin:0 0 14px}
  .badge{font-weight:700;font-size:12px;padding:4px 10px;border-radius:9999px;border:1px solid rgba(52,211,153,.35);background:rgba(52,211,153,.1);color:var(--emerald)}
  .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:18px;box-shadow:0 10px 25px rgba(0,0,0,.25)}
  .grid{display:grid;gap:10px}
  @media(min-width:560px){ .grid{grid-template-columns:140px 1fr} }
  .label{color:var(--muted)}
  .value{word-break:break-all}
  .hashRow{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
  button.copy{border:1px solid var(--border);background:transparent;color:var(--text);border-radius:10px;padding:6px 10px;cursor:pointer}
  .hint{margin-top:14px;color:var(--muted);font-size:14px}
  .brand{margin-top:22px;font-size:12px;color:var(--muted)}
  .hr{height:1px;background:var(--border);margin:14px 0}
</style>
</head>
<body>
  <div class="wrap">
    <div class="title">.MEVE Certificate <span class="badge">VALID</span></div>

    <div class="card">
      <div class="grid">
        <div class="label">File</div>
        <div class="value">${escapeHtml(fileName)}</div>

        <div class="label">Date</div>
        <div class="value">${date}</div>

        <div class="label">Time</div>
        <div class="value">${time}</div>

        ${issuer ? `<div class="label">Issuer</div><div class="value">${escapeHtml(issuer)}</div>` : ""}

        <div class="label">SHA-256</div>
        <div class="value hashRow">
          <code>${sha256}</code>
          <button class="copy" onclick="copyHash()">Copy</button>
        </div>
      </div>

      <div class="hr"></div>
      <div class="hint">This certificate mirrors the integrity data stored in the PDF’s XMP metadata (MEVE marker).</div>
      <div class="brand">DigitalMeve</div>
    </div>
  </div>

<script>
function copyHash(){
  const el=document.querySelector('.hashRow code');
  if(!el) return;
  const txt=el.textContent||"";
  navigator.clipboard.writeText(txt).then(()=>{ alert("Hash copied");});
}
</script>
</body>
</html>`;
}

function escapeHtml(s: string){
  return s
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#39;");
}
