"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import MobileMenu from "@/components/MobileMenu";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Bloque le scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  // Ferme le menu dès qu’on change de page
  useEffect(() => {
    if (open) setOpen(false);
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="DigitalMeve Home"
        >
          <span className="text-lg font-semibold tracking-tight">
            <span className="text-emerald-600">Digital</span>
            <span className="text-sky-600">Meve</span>
          </span>
          <span className="ml-2 hidden rounded-full bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-700 md:inline">
            beta
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/generate"
            className={`transition-colors ${
              isActive("/generate")
                ? "text-emerald-600 font-semibold"
                : "text-gray-700 hover:text-emerald-700"
            }`}
          >
            Generate
          </Link>
          <Link
            href="/verify"
            className={`transition-colors ${
              isActive("/verify")
                ? "text-emerald-600 font-semibold"
                : "text-gray-700 hover:text-emerald-700"
            }`}
          >
            Verify
          </Link>
          <Link
            href="/pricing"
            className={`transition-colors ${
              isActive("/pricing")
                ? "text-sky-600 font-semibold"
                : "text-gray-700 hover:text-sky-700"
            }`}
          >
            Pricing
          </Link>
          <Link
            href="/developers"
            className={`transition-colors ${
              isActive("/developers")
                ? "text-sky-600 font-semibold"
                : "text-gray-700 hover:text-sky-700"
            }`}
          >
            Developers
          </Link>
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
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 text-sm font-medium text-white transition hover:brightness-105 hover:scale-105 hover:shadow-lg"
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
