// lib/proof-html.ts
export function buildProofHTML(prettyJson: string) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>DigitalMeve — Proof</title>
<style>
  :root { color-scheme: dark; }
  body {
    margin: 0; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
    background: #0b1220; color: #e5e7eb;
  }
  .wrap { max-width: 960px; margin: 40px auto; padding: 0 16px; }
  .card {
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px; padding: 20px;
    box-shadow: 0 0 30px rgba(34,211,238,0.12);
  }
  .title {
    font-weight: 700; font-size: 20px; margin: 0 0 6px;
    background: linear-gradient(90deg,#34d399,#38bdf8);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .sub { color: #94a3b8; font-size: 12px; margin-bottom: 12px; }
  pre {
    margin: 0; padding: 16px; overflow-x: auto;
    background: rgba(2,6,23,0.6); border-radius: 12px;
    border: 1px solid rgba(255,255,255,0.06);
    font-size: 12px; line-height: 1.5;
  }
  code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
  .footer {
    margin-top: 12px; color:#64748b; font-size: 12px;
  }
  .badge {
    display:inline-flex; gap:8px; align-items:center; font-size:12px; color:#10b981;
    border:1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.05);
    padding:6px 10px; border-radius:999px;
  }
</style>
</head>
<body>
  <div class="wrap">
    <div class="card">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:8px">
        <h1 class="title">DigitalMeve — Proof</h1>
        <span class="badge">Verified structure • .MEVE</span>
      </div>
      <div class="sub">A portable, readable representation of your proof. Keep this file with your document for easy auditing.</div>
      <pre><code>${escapeHtml(prettyJson)}</code></pre>
      <div class="footer">Learn more at digitalmeve.com • Version: meve/1</div>
    </div>
  </div>
<script>
  function escapeHtml(s){return s.replace(/[&<>"]/g,c=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c]));}
</script>
</body>
</html>`;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]!));
}
