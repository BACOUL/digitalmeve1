"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";
import { useSessionSafe as useSession, signOutSafe as signOut } from "@/lib/safe-auth";

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    { href: "/generate", label: "Generate" },
    { href: "/verify", label: "Verify" },
    { href: "/personal", label: "For Individuals" },
    { href: "/pro", label: "For Business" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only fixed left-3 top-3 z-[1001] rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow outline-none ring-2 ring-emerald-500"
      >
        Skip to content
      </a>

      <header
        role="banner"
        className={`sticky top-0 z-50 w-full border-b border-gray-200 bg-white transition-shadow ${scrolled ? "shadow-md" : ""}`}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 text-slate-900">
          {/* Logo */}
          <Link
            href="/"
            className="mr-2 -mx-1 rounded-lg px-1 text-[1.25rem] font-extrabold bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent"
            aria-label="DigitalMeve – Home"
          >
            DigitalMeve
          </Link>

          {/* Nav desktop */}
          <nav className="ml-4 hidden items-center gap-6 text-sm md:flex" aria-label="Primary">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`px-1 -mx-1 rounded-lg transition ${
                  isActive(item.href) ? "text-emerald-600 font-semibold" : "text-slate-700 hover:text-emerald-600"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex-1" />

          {/* Auth zone (desktop) */}
          {!session?.user ? (
            <div className="hidden items-center gap-3 md:flex">
              <Link
                href="/login?callbackUrl=/dashboard"
                className="text-sm font-medium hover:text-emerald-600"
              >
                Log in
              </Link>
              <Link
                href="/register?callbackUrl=/dashboard"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow hover:brightness-110"
              >
                Sign up
              </Link>
            </div>
          ) : (
            <div className="hidden items-center gap-3 md:flex">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-gray-100"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm font-medium text-slate-600 hover:text-rose-600"
              >
                Sign out
              </button>
            </div>
          )}

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
      <span id="main" className="sr-only" />
    </>
  );
}
