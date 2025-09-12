export const runtime = "edge";

export function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://digitalmeve.com";
  return new Response(
    `User-agent: *
Allow: /
Sitemap: ${base}/sitemap.xml
`,
    { headers: { "Content-Type": "text/plain" } }
  );
}
