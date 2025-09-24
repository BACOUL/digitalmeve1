// components/Footer.tsx — v9.8 (world-class, clear IA, full links, a11y, no overflow)
"use client";

import Link from "next/link";

const COLS: {
  title: string;
  links: { href: string; label: string }[];
}[] = [
  {
    title: "Product",
    links: [
      { href: "/generate", label: "Generate" },
      { href: "/verify", label: "Verify" },
      { href: "/pricing", label: "Pricing" },
      { href: "/status", label: "Status" },
      { href: "/changelog", label: "Changelog" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { href: "/individuals", label: "Individuals" },
      { href: "/professionals", label: "Professionals" },
      { href: "/use-cases", label: "Use cases" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/docs", label: "Docs" },
      { href: "/security", label: "Security" },
      { href: "/faq", label: "FAQ" },
      { href: "/partners", label: "Partners" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/legal", label: "Legal" },
      { href: "https://github.com/BACOUL/Digitalmeve-standard-", label: "GitHub" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="relative z-0 border-t border-white/10 bg-slate-950"
      style={{ contain: "layout paint", overscrollBehaviorX: "none" }}
    >
      {/* Subtle background veil */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(900px 420px at 12% 0%, rgba(16,185,129,.06), transparent 42%), radial-gradient(840px 360px at 88% 0%, rgba(56,189,248,.05), transparent 44%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:py-14">
        {/* Top brand + short value prop */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <Link href="/" className="inline-flex items-center gap-2 text-lg font-semibold">
            <span className="text-emerald-400">Digital</span>
            <span className="text-sky-400">Meve</span>
            <span className="sr-only">— Home</span>
          </Link>
          <p className="max-w-xl text-sm text-slate-400">
            Invisible proof. Visible trust. Protect and verify any file — private by design, universal by default.
          </p>
        </div>

        {/* Link columns */}
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {COLS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-sm font-semibold text-white">{col.title}</h2>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    {l.href.startsWith("http") ? (
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-300 hover:text-white"
                      >
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} className="text-sm text-slate-300 hover:text-white">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-5 text-xs text-slate-400 sm:flex-row sm:items-center">
          <p>© {year} DigitalMeve. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/legal#privacy" className="hover:text-white">Privacy</Link>
            <span aria-hidden>·</span>
            <Link href="/legal#terms" className="hover:text-white">Terms</Link>
            <span aria-hidden>·</span>
            <Link href="/security" className="hover:text-white">Security</Link>
            <span aria-hidden>·</span>
            <a
              href="https://github.com/BACOUL/Digitalmeve-standard-"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
       }
