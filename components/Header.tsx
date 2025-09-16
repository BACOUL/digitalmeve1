// components/Header.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  // Bloque le scroll quand le menu est ouvert (meilleur UX mobile)
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  const links = [
    { href: "/generate", label: "Generate" },
    { href: "/verify", label: "Verify" },
    { href: "/personal", label: "For Individuals" },
    { href: "/pro", label: "For Business" },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur shadow">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo dégradé émeraude → bleu */}
        <Link
          href="/"
          className="text-xl font-extrabold bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent"
          aria-label="DigitalMeve — home"
          onClick={closeMenu}
        >
          DigitalMeve
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-slate-700 hover:text-slate-900">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Bouton burger */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="md:hidden p-2 rounded-lg hover:bg-slate-100"
        >
          {open ? <X className="h-6 w-6 text-slate-700" /> : <Menu className="h-6 w-6 text-slate-700" />}
        </button>
      </div>

      {/* Drawer mobile plein-largeur */}
      {open && (
        <div className="md:hidden fixed inset-x-0 top-16 z-40 max-h-[calc(100dvh-4rem)] overflow-auto bg-white border-t border-slate-200 shadow-lg">
          <nav className="flex flex-col">
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={closeMenu}
                className="px-6 py-4 text-lg text-slate-800 hover:bg-slate-50 active:bg-slate-100 border-b border-slate-200/70"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
