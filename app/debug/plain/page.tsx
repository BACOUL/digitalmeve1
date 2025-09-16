// app/debug/plain/page.tsx
// Page 100% Server Component, aucune interactivité, pas de "use client"
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Debug Plain",
  description: "Plain server-only debug page (no JS).",
};

export default function DebugPlain() {
  const build = process.env.NEXT_PUBLIC_COMMIT_SHA || "unknown";
  const env = process.env.NODE_ENV || "unknown";
  const site = process.env.NEXT_PUBLIC_SITE_URL || "unset";

  return (
    <main style={{ padding: 24, fontFamily: "system-ui, sans-serif", color: "#e5e7eb", background: "#0b1220" }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Debug / Plain</h1>
      <p>Cette page est rendue uniquement côté serveur (pas de JS).</p>

      <ul style={{ marginTop: 16, lineHeight: 1.8 }}>
        <li><strong>NODE_ENV</strong>: {env}</li>
        <li><strong>Commit</strong>: {build}</li>
        <li><strong>NEXT_PUBLIC_SITE_URL</strong>: {site}</li>
      </ul>

      <hr style={{ margin: "24px 0", borderColor: "#1f2937" }} />

      <p>Endpoints utiles :</p>
      <ul>
        <li><a href="/api/healthz" style={{ color: "#7dd3fc" }}>/api/healthz</a></li>
        <li><a href="/api/debug/info" style={{ color: "#7dd3fc" }}>/api/debug/info</a></li>
        <li><a href="/api/debug/echo" style={{ color: "#7dd3fc" }}>/api/debug/echo</a></li>
      </ul>

      <p style={{ marginTop: 16, opacity: .8 }}>Si tu vois cette page en prod, le SSR fonctionne.</p>
    </main>
  );
}
