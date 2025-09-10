// lib/proof-pretty.ts
import { stringifyCanonical } from "./proof";

export function proofToHtml(proof: any) {
  const json = stringifyCanonical(proof);
  const esc = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>DigitalMeve — .MEVE Proof</title>
<style>
  body{margin:0;background:#0b1220;color:#e2e8f0;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Inter,Arial}
  .wrap{max-width:900px;margin:32px auto;padding:0 16px}
  .header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
  .brand{font-weight:700;font-size:18px}
  .brand .a{color:#34d399}
  .brand .b{color:#38bdf8}
  .card{background:rgba(15,23,42,.7);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:20px;backdrop-filter:blur(6px)}
  h1{font-size:22px;margin:0 0 8px}
  .muted{color:#94a3b8;font-size:14px;margin:0 0 16px}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
  .item{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:12px}
  .label{color:#94a3b8;font-size:12px;margin-bottom:4px}
  .value{font-size:14px;word-break:break-all}
  pre{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:12px;overflow:auto;font-size:12px;line-height:1.4}
  .badge{display:inline-flex;gap:8px;align-items:center;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);color:#34d399;border-radius:999px;padding:4px 10px;font-size:12px}
</style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <div class="brand"><span class="a">Digital</span><span class="b">Meve</span></div>
      <div class="badge">.MEVE Proof</div>
    </div>

    <div class="card">
      <h1>Document proof</h1>
      <p class="muted">Version: ${esc(proof.version)} · Created: ${esc(proof.created_at)}</p>

      <div class="grid">
        <div class="item"><div class="label">File name</div><div class="value">${esc(proof.doc?.name ?? "—")}</div></div>
        <div class="item"><div class="label">MIME</div><div class="value">${esc(proof.doc?.mime ?? "—")}</div></div>
        <div class="item"><div class="label">Size</div><div class="value">${(proof.doc?.size ?? 0).toLocaleString()} bytes</div></div>
        <div class="item"><div class="label">SHA-256</div><div class="value">${esc(proof.doc?.sha256 ?? "—")}</div></div>
      </div>

      <div style="height:12px"></div>
      <div class="item">
        <div class="label">Issuer</div>
        <div class="value">
          ${esc(proof.issuer?.name ?? "—")}
          ${proof.issuer?.identity ? " · " + esc(proof.issuer.identity) : ""}
        </div>
      </div>

      <div style="height:16px"></div>
      <div class="label">Canonical JSON</div>
      <pre>${esc(json)}</pre>
    </div>
  </div>
</body>
</html>`;
}
