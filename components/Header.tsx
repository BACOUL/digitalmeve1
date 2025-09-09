// components/Header.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const nav = [
  { href: '/generate', label: 'Generate' },
  { href: '/verify',   label: 'Verify' },
  { href: '/docs',     label: 'Docs' },
  { href: '/pricing',  label: 'Pricing' },
  { href: '/contact',  label: 'Contact' },
];

function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        'text-sm transition-colors',
        active ? 'text-teal-700 font-medium' : 'text-slate-700 hover:text-teal-700',
      ].join(' ')}
    >
      {label}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);

  // Ombre subtile au scroll
  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 2);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'sticky top-0 z-50 border-b border-slate-200',
        'bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60',
        elevated ? 'shadow-sm' : '',
      ].join(' ')}
    >
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        {/* Brand (texte pour l’instant ; remplace par <img src="/logo.svg" .../> si tu ajoutes un logo dans /public) */}
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Digital<span className="text-teal-600">Meve</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {nav.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              active={pathname === item.href}
            />
          ))}
          <Link
            href="/generate"
            className="ml-2 rounded-lg bg-teal-600 px-4 py-2 text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          aria-label="Open menu"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100"
          onClick={() => setOpen((v) => !v)}
        >
          {/* Icône burger simple */}
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-4">
            {nav.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                active={pathname === item.href}
                onClick={() => setOpen(false)}
              />
            ))}
            <Link
              href="/generate"
              onClick={() => setOpen(false)}
              className="rounded-lg bg-teal-600 px-4 py-2 text-white text-center hover:bg-teal-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
          }
