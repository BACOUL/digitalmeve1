"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = useMemo(
    () => [
      { href: "/generate", label: "Generate" },
      { href: "/verify", label: "Verify" },
      { href: "/personal", label: "For Individuals" },
      { href: "/pro", label: "For Business" },
    ],
    []
  );

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <>
      <header
        role="banner"
        className={`sticky top-0 z-50 w-full border-b border-gray-200 bg-white transition-shadow ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 text-slate-900">
          {/* Logo gradient */}
          <Link
            href="/"
            className="mr-1 -mx-1 rounded-lg px-1 text-[1.25rem] font-extrabold bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent"
            aria-label="DigitalMeve – Home"
          >
            DigitalMeve
          </Link>

          {/* Nav desktop */}
          <nav className="ml-2 hidden items-center gap-6 text-sm md:flex" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`px-1 -mx-1 rounded-lg transition ${
                  isActive(item.href)
                    ? "text-emerald-600 font-semibold"
                    : "text-slate-700 hover:text-emerald-600"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Login/Register visible desktop */}
            <Link
              href="/login?callbackUrl=/dashboard"
              className="rounded-lg px-3 py-1 text-slate-700 hover:text-emerald-600"
            >
              Login
            </Link>
            <Link
              href="/register?callbackUrl=/dashboard"
              className="rounded-lg bg-gradient-to-r from-emerald-500 to-sky-500 px-3 py-1 text-white font-medium shadow hover:brightness-105"
            >
              Register
            </Link>
          </nav>

          <div className="flex-1" />

          {/* Burger mobile */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 md:hidden"
          >
            <Menu className="h-5 w-5 text-slate-700" />
          </button>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
