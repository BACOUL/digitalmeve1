"use client";

import { useState } from "react";
import Link from "next/link";

export default function DiagnosticsPage() {
  const [status, setStatus] = useState<string>("");

  async function sendErrlog() {
    try {
      const r = await fetch("/api/errlog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "Test errlog (mobile)",
          stack: "stack:from-mobile",
          at: typeof window !== "undefined" ? window.location.href : null,
        }),
        keepalive: true,
      });
      setStatus(r.ok ? "Errlog envoyé (204 attendu)" : `Errlog: HTTP ${r.status}`);
      alert("✅ Errlog envoyé. Vérifie les logs Vercel (Functions → /api/errlog).");
    } catch (e: any) {
      setStatus(`Errlog erreur: ${e?.message || e}`);
      alert("❌ Errlog: échec d’envoi");
    }
  }

  async function sendCspReport() {
    try {
      const r = await fetch("/api/csp-report", {
        method: "POST",
        headers: { "Content-Type": "application/reports+json" },
        body: JSON.stringify({
          "csp-report": {
            "violated-directive": "script-src",
            "blocked-uri": "https://evil.example",
            "document-uri": typeof window !== "undefined" ? window.location.href : "",
          },
        }),
        keepalive: true,
      });
      setStatus(r.ok ? "CSP report envoyé (204 attendu)" : `CSP: HTTP ${r.status}`);
      alert("✅ CSP report envoyé. Vérifie les logs Vercel (Functions → /api/csp-report).");
    } catch (e: any) {
      setStatus(`CSP erreur: ${e?.message || e}`);
      alert("❌ CSP report: échec d’envoi");
    }
  }

  function throwClientError() {
    // erreur non interceptée côté client
    setTimeout(() => {
      // @ts-ignore demo
      window.__force_undefined_call__();
    }, 0);
    alert("⏳ Erreur client lancée. Si Sentry est OK, un event doit apparaître sous peu.");
  }

  return (
    <main className="min-h-[80vh] bg-[var(--bg)] text-[var(--fg)] grid place-items-center px-4">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-5 text-center">
        <h1 className="text-xl font-bold">Diagnostics (mobile)</h1>
        <p className="mt-2 text-sm text-[var(--fg-muted)]">
          Utilise ces boutons pour tester sans console.
        </p>

        <div className="mt-5 grid gap-3">
          <button
            onClick={sendErrlog}
            className="rounded-xl bg-gradient-to-r from-emerald-400 to-sky-400 px-4 py-3 text-sm font-semibold text-slate-900"
          >
            1) Envoyer un errlog (POST /api/errlog)
          </button>

          <button
            onClick={sendCspReport}
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-slate-100"
          >
            2) Envoyer un rapport CSP (POST /api/csp-report)
          </button>

          <button
            onClick={throwClientError}
            className="rounded-xl bg-rose-500/20 px-4 py-3 text-sm font-medium text-rose-200"
          >
            3) Throw client error (Sentry)
          </button>
        </div>

        <p className="mt-4 text-xs text-[var(--fg-muted)] break-words">{status}</p>

        <div className="mt-5 text-xs text-[var(--fg-muted)]">
          <p>
            Page Sentry dédiée :{" "}
            <Link href="/debug/sentry" className="link">
              /debug/sentry
            </Link>
          </p>
          <p className="mt-1">
            Retour accueil :{" "}
            <Link href="/" className="link">
              /
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
              }
