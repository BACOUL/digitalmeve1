// components/StructuredData.tsx
// (Server Component — pas de "use client")
export default function StructuredData({ data }: { data: Record<string, any> }) {
  const json = JSON.stringify(data);
  return (
    <script
      type="application/ld+json"
      // Pas de risque XSS ici car on contrôle le contenu
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
