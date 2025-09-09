// app/components/Header.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/generate", label: "Generate" },
  { href: "/verify", label: "Verify" },
  { href: "/docs", label: "Docs" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Ferme le menu dès qu’on change de page
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Ferme avec la touche Échap
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock du scroll quand menu ouvert
  useEffect(() => {
    const root = document.documentElement;
    if (open) {
      const prev = root.style.overflow;
      root.style.overflow = "hidden";
      return () => {
        root.style.overflow = prev;
      };
    }
  }, [open]);

  // Clic extérieur pour fermer
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!open) return;
      const el = panelRef.current;
      if (el && !el.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(11,18,32,0.6)] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="DigitalMeve Home"
          onClick={() => setOpen(false)}
        >
          <div className="h-7 w-7 rounded-md bg-gradient-to-br from-dm-emerald to-dm-sky shadow-glow" />
          <span className="font-semibold text-white">DigitalMeve</span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-white/80 hover:text-white transition"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/generate"
            className="rounded-2xl bg-gradient-to-r from-dm-emerald to-dm-sky px-4 py-2 text-sm font-semibold text-slate-900 shadow-glow hover:brightness-110 transition"
          >
            Generate
          </Link>
        </nav>

        {/* Burger mobile */}
        <button
          type="button"
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition"
          aria-label="Open navigation"
          aria-controls="mobile-nav"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {/* Icône burger / close */}
          <svg
            className={`h-5 w-5 ${open ? "hidden" : "block"}`}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <svg
            className={`h-5 w-5 ${open ? "block" : "hidden"}`}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          aria-hidden="true"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Panneau mobile */}
      <div
        id="mobile-nav"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        className={`md:hidden fixed inset-x-3 top-16 z-50 origin-top rounded-2xl border border-white/10 bg-[rgba(17,24,39,0.95)] p-3 backdrop-blur-md transition-transform duration-200 ${
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="flex flex-col">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-white/90 hover:bg-white/10 active:bg-white/15 transition"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/generate"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-2xl bg-gradient-to-r from-dm-emerald to-dm-sky px-4 py-3 text-center text-sm font-semibold text-slate-900 shadow-glow hover:brightness-110 transition"
          >
            Generate
          </Link>
        </div>
      </div>
    </header>
  );
                    }
