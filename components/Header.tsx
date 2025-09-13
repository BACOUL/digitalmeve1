// components/Header.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import MobileMenu from "@/components/MobileMenu";

type NavItem = { href: string; label: string; tone?: "emerald" | "sky" };

const NAV: NavItem[] = [
  { href: "/generate", label: "Generate", tone: "emerald" },
  { href: "/verify", label: "Verify", tone: "emerald" },
  { href: "/pricing", label: "Pricing", tone: "sky" },
  { href: "/developers", label: "Developers", tone: "sky" },
];

function cx(...cls: Array<string | false | undefined>) {
  return cls.filter(Boolean).join(" ");
}

function NavLink({ item, currentPath }: { item: NavItem; currentPath: string }) {
  const isActive =
    item.href === "/"
      ? currentPath === "/"
      : currentPath === item.href || currentPath.startsWith(item.href + "/");

  const color =
    item.tone === "emerald"
      ? "focus-visible:ring-emerald-400/40 hover:text-emerald-700"
      : "focus-visible:ring-sky-400/40 hover:text-sky-700";

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={cx(
        "relative inline-flex items-center px-1.5 py-1 text-sm font-medium text-gray-700 transition-colors focus:outline-none focus-visible:outline-none focus-visible:ring-2 rounded-lg",
        color
      )}
    >
      <span>{item.label}</span>
      {/* Soulignement actif discret */}
      <span
        aria-hidden
        className={cx(
          "absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] w-0 rounded-full transition-all",
          isActive &&
            (item.tone === "emerald"
              ? "w-6 bg-emerald-500"
              : "w-6 bg-sky-500")
        )}
      />
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Fermer le menu mobile si on navigue
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Scroll-lock + fermeture via ESC
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener("keydown", onKey);
      };
    }
  }, [open]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      {/* Skip link accessible */}
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-black focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2"
          aria-label="DigitalMeve Home"
        >
          {/* Marque typographique simple et nette */}
          <span className="text-lg font-semibold tracking-tight text-gray-900">
            <span className="text-emerald-600">Digital</span>
            <span className="text-sky-600">Meve</span>
          </span>
          <span className="sr-only">DigitalMeve</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <NavLink key={item.href} item={item} currentPath={pathname} />
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/40"
          >
            Login
          </Link>
          <Link
            href="/generate"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 text-sm font-medium text-white shadow-md hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
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
          aria-controls="mobile-menu"
          aria-expanded={open}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
        >
          <Menu className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      {/* Mobile menu (slide-over) */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
