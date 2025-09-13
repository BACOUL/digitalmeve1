// components/MobileMenu.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  return (
    <div className="md:hidden">
      {/* Bouton burger */}
      <button
        onClick={toggleMenu}
        aria-label="Toggle menu"
        className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400"
      >
        {open ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        />
      )}

      {/* Drawer */}
      <nav
        className={`fixed top-0 right-0 z-50 h-full w-64 bg-slate-900 shadow-lg transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col gap-6">
          <Link href="/" onClick={closeMenu} className="text-slate-100 hover:text-emerald-400">
            Home
          </Link>
          <Link href="/generate" onClick={closeMenu} className="text-slate-100 hover:text-emerald-400">
            Generate
          </Link>
          <Link href="/verify" onClick={closeMenu} className="text-slate-100 hover:text-emerald-400">
            Verify
          </Link>
          <Link href="/pricing" onClick={closeMenu} className="text-slate-100 hover:text-emerald-400">
            Pricing
          </Link>
          <Link href="/contact" onClick={closeMenu} className="text-slate-100 hover:text-emerald-400">
            Contact
          </Link>
        </div>
      </nav>
    </div>
  );
}
