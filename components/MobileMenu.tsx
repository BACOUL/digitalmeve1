"use client";

import Link from "next/link";
import { useState } from "react";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Bouton hamburger (SVG inline) */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        className="p-2 text-slate-200 hover:text-emerald-400 transition"
      >
        {open ? (
          // X icon
          <svg width="24" height="24" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          // Menu icon
          <svg width="24" height="24" viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        )}
      </button>

      {/* Menu déroulant */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-slate-900/95 backdrop-blur-md border-t border-white/10 shadow-lg z-40">
          <nav className="flex flex-col items-center gap-6 py-6 text-slate-200 font-medium">
            <Link href="/generate" onClick={() => setOpen(false)}>Generate</Link>
            <Link href="/verify" onClick={() => setOpen(false)}>Verify</Link>
            <Link href="/docs" onClick={() => setOpen(false)}>Docs</Link>
            <Link href="/pricing" onClick={() => setOpen(false)}>Pricing</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
          </nav>
        </div>
      )}
    </div>
  );
}
