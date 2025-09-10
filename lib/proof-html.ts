// lib/proof-html.ts

type ProofShape = {
  version?: string;
  created_at?: string;
  doc?: { name?: string; mime?: string; size?: number; sha256?: string };
  issuer?: { name?: string; identity?: string; type?: string; website?: string; verified_domain?: boolean };
  // on accepte des champs supplémentaires, ils seront placés dans “technical details”
  [k: string]: any;
};

export function buildProofHtml(proof: ProofShape): string {
  const esc = (s: any) =>
    String(s ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const prettyJson = esc(JSON.stringify(proof, null, 2));

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>.MEVE Certificate — DigitalMeve</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  :root{
    --bg:#0b1220; --panel:#0f172a; --muted:#94a3b8; --txt:#e2e8f0;
    --emerald:#34d399; --cyan:#22d3ee; --rose:#fb7185;
    --ring: rgba(34,211,238,.35);
  }
  *{box-sizing:border-box}
  html,body{margin:0;padding:0;background:var(--bg);color:var(--txt);font:16px/1.5 ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,"Helvetica Neue","Noto Sans",Arial,"Apple Color Emoji","Segoe UI Emoji";}
  .wrap{min-height:100vh;display:grid;place-items:center;padding:40px 16px;}
  .card{width:min(860px,100%);background:linear-gradient(180deg,rgba(255,255,255,.02),rgba(255,255,255,.01));border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:28px;box-shadow:0 0 40px var(--ring)}
  h1{margin:0 0 6px;font-size:24px}
  .sub{margin:0 0 18px;color:var(--muted)}
  .grid{display:grid;gap:14px}
  @media(min-width:900px){ .grid{grid-template-columns:1fr 1fr 1fr} }
  .box{border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:14px;background:var(--panel)}
  .ttl{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}
  .kv{margin:6px 0 0 0;font-size:14px}
  .kv code{color:#cbd5e1;word-break:break-all}
  .badge{display:inline-flex;gap:8px;align-items:center;padding:6px 10px;border-radius:999px;border:1px solid rgba(52,211,153,.4);background:rgba(52,211,153,.12);color:#a7f3d0;font-size:12px}
  .hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
  .btn{border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.06);color:var(--txt);padding:8px 12px;border-radius:10px;font-size:12px;cursor:pointer}
  .btn:hover{background:rgba(255,255,255,.1)}
  pre{max-height:340px;overflow:auto;border-radius:12px;border:1px solid rgba(255,255,255,.08);background:#0a0f1a;margin:0;padding:14px}
  details summary{cursor:pointer;list-style:none}
  details summary::-webkit-details-marker{display:none}
  .brand{font-weight:600}
  .brand .d{color:var(--emerald)} .brand .m{color:var(--cyan)}
</style>
</head>
<body>
  <div class="wrap">
    <article class="card" role="article" aria-label=".MEVE certificate">
      <header>
        <div class="badge">✅ Valid .MEVE proof</div>
        <h1>.MEVE Certificate</h1>
        <p class="sub">Issued by <span class="brand"><span class="d">Digital</span><span class="m">Meve</span></span>${
          proof?.created_at ? " • " + esc(proof.created_at) : ""
        }</p>
      </header>

      <section class="grid" aria-label="overview">
        <div class="box">
          <div class="ttl">Document</div>
          <p class="kv">Name: <code>${esc(proof?.doc?.name)}</code></p>
          <p class="kv">Type: <code>${esc(proof?.doc?.mime)}</code></p>
          <p class="kv">SHA-256: <code>${esc(proof?.doc?.sha256)}</code></p>
          <p class="kv">Size: <code>${esc(proof?.doc?.size)}</code></p>
        </div>
        <div class="box">
          <div class="ttl">Issuer</div>
          <p class="kv">Name: <code>${esc(proof?.issuer?.name)}</code></p>
          <p class="kv">Identity: <code>${esc(proof?.issuer?.identity)}</code></p>
          <p class="kv">Type: <code>${esc(proof?.issuer?.type)}</code></p>
          <p class="kv">Website: <code>${esc(proof?.issuer?.website)}</code></p>
        </div>
        <div class="box">
          <div class="ttl">Metadata</div>
          <p class="kv">Version: <code>${esc(proof?.version)}</code></p>
          <p class="kv">Created at: <code>${esc(proof?.created_at)}</code></p>
        </div>
      </section>

      <section style="margin-top:18px" aria-label="technical">
        <div class="hdr">
          <div class="ttl">Technical details (JSON)</div>
          <button class="btn" id="copy">Copy JSON</button>
        </div>
        <pre id="json">${prettyJson}</pre>
      </section>
    </article>
  </div>

<script>
  document.getElementById('copy')?.addEventListener('click', ()=>{
    const txt = document.getElementById('json')?.innerText || '';
    navigator.clipboard.writeText(txt).then(()=>{
      const b = document.getElementById('copy'); if(!b) return;
      const t = b.innerText; b.innerText = 'Copied!'; setTimeout(()=> b.innerText = t, 1000);
    });
  });
</script>
</body>
</html>`;
                         }
