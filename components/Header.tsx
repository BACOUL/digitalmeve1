// components/Header.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/generate", label: "Generate" },
  { href: "/verify", label: "Verify" },
  { href: "/docs", label: "Docs" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
  { href: "/demo", label: "Live demo" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Ferme sur changement de route ou touche ESC
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Verrouille le scroll body quand le drawer est ouvert
  useEffect(() => {
    const { body } = document;
    if (!body) return;
    if (open) {
      const prev = body.style.overflow;
      body.style.overflow = "hidden";
      return () => {
        body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 h-16 bg-slate-900/75 backdrop-blur supports-[backdrop-filter]:bg-slate-900/55 border-b border-white/10"
      role="banner"
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Brand */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-bold text-white"
          aria-label="DigitalMeve home"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
          DigitalMeve <span className="text-white/60 text-sm">.MEVE</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`hover:text-white transition ${
                pathname === l.href ? "text-white" : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA desktop */}
        <div className="hidden md:flex">
          <Link
            href="/generate"
            className="rounded-xl px-4 py-2 font-semibold text-slate-900 bg-gradient-to-r from-emerald-400 to-sky-400 shadow-[0_10px_30px_-10px_rgba(34,211,238,0.55)] hover:brightness-110"
          >
            Generate
          </Link>
        </div>

        {/* Burger */}
        <button
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="md:hidden grid place-items-center h-10 w-10 rounded-xl bg-white/5 border border-white/10 text-white"
        >
          <span className="sr-only">Open menu</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 6h18M3 12h18M3 18h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Drawer mobile */}
      {open && (
        <>
          {/* Backdrop */}
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          />
          {/* Panel */}
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-x-0 top-16 bottom-0 z-50 md:hidden overflow-y-auto bg-slate-950/95 border-t border-white/10"
          >
            <div className="px-4 py-4">
              <div className="flex justify-end">
                <button
                  onClick={() => setOpen(false)}
                  className="grid place-items-center h-10 w-10 rounded-xl bg-white/5 border border-white/10 text-white"
                  aria-label="Close menu"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 6l12 12M18 6l-12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <nav className="mt-2 flex flex-col">
                {NAV_LINKS.map((l) => {
                  const active = pathname === l.href;
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={`-mx-2 my-1 rounded-2xl px-4 py-3 text-lg ${
                        active
                          ? "bg-white/10 text-white"
                          : "text-white/90 hover:bg-white/5"
                      }`}
                    >
                      {l.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-4">
                <Link
                  href="/generate"
                  className="inline-flex w-full items-center justify-center rounded-2xl px-4 py-3 font-semibold text-slate-900 bg-gradient-to-r from-emerald-400 to-sky-400 shadow-[0_10px_30px_-10px_rgba(34,211,238,0.55)] hover:brightness-110"
                >
                  Get started
                </Link>
              </div>

              <p className="mt-6 text-center text-xs text-white/50">
                Tap anywhere outside to close
              </p>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
