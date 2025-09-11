// lib/certificate-html.ts
export function buildMeveCertificateHtml(opts: {
  fileName: string;
  createdAtISO: string;
  issuer?: string;
  sha256: string;
  brandName?: string;
  brandTagline?: string;
}) {
  const {
    fileName,
    createdAtISO,
    issuer = "",
    sha256,
    brandName = "DigitalMeve",
    brandTagline = "Trusted Integrity Worldwide",
  } = opts;

  const d = new Date(createdAtISO);
  const date = d.toLocaleDateString("en-GB", { year: "numeric", month: "2-digit", day: "2-digit" });
  const time = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#0b1220">
<title>.MEVE Certificate — ${e(fileName)}</title>
<style>
  :root{--bg:#0b1220;--surface:#0f172a;--surface-2:#0b1220;--text:#e2e8f0;--muted:#94a3b8;--border:rgba(255,255,255,.08);--green:#10b981;--green-soft:rgba(16,185,129,.12);--blue:#60a5fa;--ring:rgba(96,165,250,.35)}
  *{box-sizing:border-box}html,body{height:100%;margin:0}
  body{background:radial-gradient(1200px 600px at 10% -10%, rgba(96,165,250,.14), transparent 50%),radial-gradient(1000px 500px at 110% 20%, rgba(16,185,129,.10), transparent 40%),var(--bg);color:var(--text);font:400 16px/1.5 ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,"Helvetica Neue",Arial;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
  .wrap{min-height:100svh;display:flex;align-items:center;justify-content:center;padding:clamp(12px,3.5vw,32px);padding-bottom:calc(env(safe-area-inset-bottom,0) + 24px)}
  .sheet{width:min(960px,100%);background:linear-gradient(180deg,var(--surface),var(--surface-2));border:1px solid var(--border);border-radius:18px;box-shadow:0 20px 60px rgba(0,0,0,.45);overflow:hidden}
  .brand{display:flex;align-items:center;justify-content:space-between;padding:18px 20px;border-bottom:1px solid var(--border);background:linear-gradient(90deg, rgba(96,165,250,.15), rgba(16,185,129,.12) 50%, transparent)}
  .brand .name{font-weight:800;letter-spacing:.2px;background:linear-gradient(90deg,var(--blue),var(--green));-webkit-background-clip:text;background-clip:text;color:transparent;font-size:18px}
  .brand .tag{color:var(--muted);font-size:12px}
  .header{display:flex;align-items:center;gap:12px;padding:16px 20px 0}
  .title{font-weight:800;font-size:20px;margin:0}
  .badge{display:inline-flex;align-items:center;gap:8px;font-weight:800;font-size:12px;letter-spacing:.3px;padding:6px 12px;border-radius:9999px;border:1px solid rgba(16,185,129,.65);background:linear-gradient(180deg,var(--green-soft), rgba(16,185,129,.18));color:var(--green);text-transform:uppercase;box-shadow:0 0 0 3px rgba(16,185,129,.08) inset}
  .card{padding:20px}
  .grid{display:grid;gap:12px}
  @media(min-width:560px){.grid{grid-template-columns:160px 1fr}}
  .label{color:var(--muted);white-space:nowrap}
  .value{overflow-wrap:anywhere;word-break:break-word}
  .hashRow{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
  code{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;background:rgba(255,255,255,.04);padding:6px 8px;border-radius:8px;border:1px solid var(--border)}
  button.copy{border:1px solid var(--border);background:transparent;color:var(--text);border-radius:10px;padding:6px 10px;cursor:pointer;transition:box-shadow .15s ease,border-color .15s ease}
  button.copy:hover{box-shadow:0 0 0 3px var(--ring)}
  .footer{display:flex;justify-content:space-between;gap:12px;align-items:center;padding:16px 20px;border-top:1px solid var(--border);color:var(--muted);font-size:12px}
  .footer .right{text-align:right}
</style>
</head>
<body>
  <div class="wrap">
    <section class="sheet" role="document" aria-label=".MEVE Certificate">
      <header class="brand">
        <div class="name">${e(brandName)}</div>
        <div class="tag">${e(brandTagline)}</div>
      </header>
      <div class="header">
        <h1 class="title">.MEVE Certificate</h1>
        <span class="badge">VALID</span>
      </div>
      <div class="card">
        <div class="grid" role="table">
          <div class="label" role="rowheader">File</div>
          <div class="value" role="cell">${e(fileName)}</div>

          <div class="label" role="rowheader">Date</div>
          <div class="value" role="cell">${date}</div>

          <div class="label" role="rowheader">Time</div>
          <div class="value" role="cell">${time}</div>

          ${issuer ? `<div class="label" role="rowheader">Issuer</div><div class="value" role="cell">${e(issuer)}</div>` : ""}

          <div class="label" role="rowheader">SHA-256</div>
          <div class="value hashRow" role="cell">
            <code id="hash">${sha256}</code>
            <button class="copy" onclick="copyHash()">Copy</button>
          </div>
        </div>
      </div>
      <footer class="footer">
        <div>Automatically generated certificate</div>
        <div class="right">${e(brandName)} • .MEVE</div>
      </footer>
    </section>
  </div>
<script>
function copyHash(){
  const t = document.getElementById('hash')?.textContent || '';
  if (t) navigator.clipboard.writeText(t);
}
</script>
</body>
</html>`;
}

function e(s: string){
  return s.replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;");
}
