// components/Header.tsx
"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { useSessionSafe as useSession, signOutSafe as signOut } from "@/lib/safe-auth";
import { Menu, LogIn, UserPlus, LogOut, LayoutDashboard, User2, Globe } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const sessionState = useSession();
  const session = sessionState?.data;

  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // fermer le drawer sur changement d’ancre
  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  // ombre au scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const role =
    (session?.user as any)?.role === "BUSINESS"
      ? "Business"
      : (session?.user as any)?.role === "INDIVIDUAL"
      ? "Individual"
      : undefined;

  const nav = useMemo(
    () => [
      { href: "/generate", label: "Generate" },
      { href: "/verify", label: "Verify" },
      { href: "/personal", label: "For Individuals" },
      { href: "/pro", label: "For Business" },
      { href: "/pricing", label: "Pricing" },
    ],
    []
  );

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus-ring fixed left-3 top-3 z-[1001] rounded-xl bg-white/90 px-3 py-2 text-sm font-medium text-slate-900 shadow"
      >
        Skip to content
      </a>

      {/* >>> VERSION D’ORIGINE : fond sombre + verre dépoli */}
      <header
        className={`sticky top-0 z-50 w-full border-b border-white/10 glass transition-shadow ${
          scrolled ? "shadow-[0_6px_24px_rgba(0,0,0,.25)]" : ""
        }`}
        role="banner"
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 text-slate-100">
          {/* LOGO — dégradé émeraude→bleu, sans capsule */}
          <Link
            href="/"
            className="mr-1 -mx-1 px-1 rounded-lg focus-ring text-lg font-extrabold bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent"
            aria-label="DigitalMeve — Home"
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
                className={`relative focus-ring rounded-lg px-1 -mx-1 text-slate-300 hover:text-white transition
                  after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:h-[2px] after:w-0 after:rounded-full
                  after:bg-gradient-to-r after:from-emerald-400 after:to-sky-400 after:transition-all hover:after:w-3/5
                  ${isActive(item.href) ? "text-white after:w-3/5" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex-1" />

          {/* Lang switcher */}
          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/?lang=en"
              className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-slate-200 hover:bg-white/10 focus-ring"
              aria-label="Switch to English"
            >
              <Globe className="h-3.5 w-3.5 text-emerald-400" />
              EN
            </Link>
            <span className="text-slate-600">/</span>
            <Link
              href="/?lang=fr"
              className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-slate-200 hover:bg-white/10 focus-ring"
              aria-label="Basculer en français"
            >
              FR
            </Link>
          </div>

          {/* Auth (desktop) */}
          <div className="hidden items-center gap-3 md:flex">
            {!session?.user ? (
              <>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-100 hover:bg-white/10 focus-ring"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-sky-400 px-3 py-1.5 text-sm font-semibold text-slate-900 shadow-[0_0_30px_rgba(34,211,238,0.35)] hover:brightness-110 focus-ring"
                >
                  <UserPlus className="h-4 w-4" />
                  Register
                </Link>
              </>
            ) : (
              <div className="hidden items-center gap-3 md:flex">
                <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5">
                  <User2 className="h-4 w-4 text-slate-200" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium leading-tight text-slate-100">
                      {session.user.email}
                    </p>
                    {role && <p className="text-xs leading-tight text-slate-400">{role}</p>}
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-100 hover:bg-white/10 focus-ring"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="inline-flex items-center gap-2 rounded-xl bg-rose-500/15 px-3 py-1.5 text-sm font-medium text-rose-300 hover:bg-rose-500/25 focus-ring"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>

          {/* Burger mobile */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 focus-ring md:hidden"
          >
            <Menu className="h-5 w-5 text-slate-100" />
          </button>
        </div>
      </header>

      {/* Drawer mobile (ta version qui marchait) */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />

      <span id="main" className="sr-only" />
    </>
  );
}
