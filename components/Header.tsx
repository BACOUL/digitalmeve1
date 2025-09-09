// components/Header.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/generate", label: "Generate" },
  { href: "/verify", label: "Verify" },
  { href: "/docs", label: "Docs" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fermer si clic en dehors
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fermer avec Escape + lock du scroll body
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Shadow quand on scrolle
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b border-white/10 transition",
        scrolled ? "glass shadow-lg" : "glass",
      ].join(" ")}
      aria-label="Site header"
    >
      <div className="container-max h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-2" aria-label="Go to homepage">
          <span className="h-2.5 w-2.5 rounded-md bg-emerald-400 shadow-[0_0_18px_rgba(16,185,129,0.8)]" />
          <span className="font-semibold tracking-tight text-white">
            Digital<span className="text-emerald-400">Meve</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={[
                  "text-sm transition",
                  active ? "text-white" : "text-white/80 hover:text-white",
                ].join(" ")}
                aria-current={active ? "page" : undefined}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/generate"
            className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-900
                       bg-gradient-to-r from-emerald-400 to-sky-400 hover:brightness-110
                       shadow-[0_0_30px_rgba(56,189,248,0.35)] transition"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile burger */}
        <div className="md:hidden relative" ref={menuRef}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="rounded-lg p-2 text-white/90 hover:bg-white/5 active:bg-white/10"
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" className="fill-current">
              {open ? (
                <path d="M6 6L18 18M6 18L18 6" />
              ) : (
                <path d="M3 6h18v2H3zM3 11h18v2H3zM3 16h18v2H3z" />
              )}
            </svg>
          </button>

          {open && (
            <div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              className="absolute right-0 mt-2 w-64 rounded-2xl border border-white/10
                         bg-slate-900/95 backdrop-blur shadow-xl p-2 animate-slideDown"
            >
              {links.map((l) => {
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={[
                      "block rounded-lg px-3 py-2 text-sm hover:bg-white/5",
                      active ? "text-white" : "text-white/90",
                    ].join(" ")}
                    aria-current={active ? "page" : undefined}
                  >
                    {l.label}
                  </Link>
                );
              })}
              <Link
                href="/generate"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-xl px-3 py-2 text-center text-sm font-semibold text-slate-900
                           bg-gradient-to-r from-emerald-400 to-sky-400 hover:brightness-110"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
