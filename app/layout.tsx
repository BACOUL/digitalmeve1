// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'DigitalMeve — The .MEVE Standard',
  description: 'Timestamp, hash and certify any file. Verify in seconds.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://digitalmeve.vercel.app'),
  openGraph: {
    title: 'DigitalMeve — The .MEVE Standard',
    description: 'Timestamp, hash and certify any file. Verify in seconds.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[var(--dm-bg)] text-[var(--dm-text)]">
        <Header />
        <main className="mx-auto max-w-7xl px-4 py-8 md:px-6">{children}</main>
        <footer className="border-t border-white/10 py-8 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} DigitalMeve — .MEVE Standard
        </footer>
      </body>
    </html>
  );
}
