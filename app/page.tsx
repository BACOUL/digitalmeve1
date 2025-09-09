// app/page.tsx
export default function HomePage() {
  return (
    <main style={{ minHeight: '70vh', padding: 24, background: '#ff0033' }}>
      <h1 style={{ fontSize: 42, fontWeight: 900, color: '#fff' }}>
        TEST BUILD — SHOULD BE RED 🔴
      </h1>
      <p style={{ color: '#fff', marginTop: 12 }}>
        {new Date().toISOString()}
      </p>
    </main>
  );
}
