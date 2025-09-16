"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, LogIn, UserPlus, LogOut, LayoutDashboard, User2, Globe } from "lucide-react";
// Garde ces helpers si tu les as déjà (sinon remplace par next-auth classiques)
import { useSessionSafe as useSession, signOutSafe as signOut } from "@/lib/safe-auth";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const { data: session } = useSession() ?? {};
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
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
      { href: "/pricing", label: "Pricing" },
    ],
    []
  );

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  return (
    <>
      {/* Lien accessibilité */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-sky-400 fixed left-3 top-3 z-[1001] rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow"
      >
        Aller au contenu
      </a>

      {/* HEADER blanc premium */}
      <header
        role="banner"
        className={`sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/95 backdrop-blur transition-shadow ${
          scrolled ? "shadow-[0_10px_30px_rgba(2,6,23,0.06)]" : ""
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 text-slate-900 md:h-20">
          {/* Logo gradient (émeraude → bleu) */}
          <Link
            href="/"
            aria-label="Accueil DigitalMeve"
            className="mr-1 -mx-1 rounded-lg px-1 font-extrabold tracking-tight"
          >
            <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500 bg-clip-text text-transparent text-xl sm:text-2xl">
              DigitalMeve
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="ml-4 hidden items-center gap-6 text-sm md:flex" aria-label="Navigation principale">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`relative -mx-1 rounded-lg px-1 transition hover:text-slate-950
                after:absolute after:left-1/2 after:-bottom-1 after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-full
                after:bg-gradient-to-r after:from-emerald-500 after:to-sky-500 after:transition-all hover:after:w-3/5
                ${isActive(item.href) ? "font-semibold text-slate-950 after:w-3/5" : "text-slate-600"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex-1" />

          {/* Switcher langue (optionnel, gardé simple) */}
          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/?lang=en"
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-700 hover:bg-slate-50"
              aria-label="Switch to English"
            >
              <Globe className="h-3.5 w-3.5 text-emerald-500" />
              EN
            </Link>
            <span className="text-slate-300">/</span>
            <Link
              href="/?lang=fr"
              className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-700 hover:bg-slate-50"
              aria-label="Basculer en français"
            >
              FR
            </Link>
          </div>

          {/* Auth desktop */}
          <div className="hidden items-center gap-3 md:flex">
            {!session?.user ? (
              <>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-900 hover:bg-slate-50"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-xl border-0 bg-gradient-to-r from-emerald-400 to-sky-400 px-3 py-1.5 text-sm font-semibold text-slate-900 shadow-[0_10px_30px_rgba(56,189,248,0.35)] hover:brightness-110"
                >
                  <UserPlus className="h-4 w-4" />
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5">
                  <User2 className="h-4 w-4 text-slate-700" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium leading-tight text-slate-900">
                      {session.user.email}
                    </p>
                  </div>
                </div>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-900 hover:bg-slate-50"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="inline-flex items-center gap-2 rounded-xl bg-rose-500/10 px-3 py-1.5 text-sm font-medium text-rose-600 hover:bg-rose-500/15"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </>
            )}
          </div>

          {/* Bouton mobile */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Drawer mobile */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />
      <span id="main" className="sr-only" />
    </>
  );
}
