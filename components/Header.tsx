"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import MobileMenu from "@/components/MobileMenu";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Fermer le menu dès qu’on change de page (fiabilise le retour du scroll)
  useEffect(() => {
    if (open) setOpen(false);
    // sécurité : remet le body comme il faut si un style traîne
    document.body.style.overflow = "";
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="DigitalMeve Home">
          <span className="text-lg font-semibold tracking-tight">
            <span className="text-emerald-600">Digital</span>
            <span className="text-sky-600">Meve</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/generate" className="text-gray-700 hover:text-emerald-700 transition-colors">Generate</Link>
          <Link href="/verify" className="text-gray-700 hover:text-emerald-700 transition-colors">Verify</Link>
          <Link href="/pricing" className="text-gray-700 hover:text-sky-700 transition-colors">Pricing</Link>
          <Link href="/developers" className="text-gray-700 hover:text-sky-700 transition-colors">Developers</Link>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
          >
            Login
          </Link>
          <Link
            href="/generate"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 text-sm font-medium text-white hover:brightness-105"
          >
            Get Started Free
          </Link>
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-haspopup="dialog"
          aria-expanded={open}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
        >
          <Menu className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
