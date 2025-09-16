// components/Header.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  useSessionSafe as useSession,
  signOutSafe as signOut,
} from "@/lib/safe-auth";
import {
  Menu,
  LogIn,
  UserPlus,
  LogOut,
  LayoutDashboard,
  User2,
  Globe,
} from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const sessionState = useSession();
  const session = sessionState?.data;
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  const role =
    (session?.user as any)?.role === "BUSINESS"
      ? "Business"
      : (session?.user as any)?.role === "INDIVIDUAL"
      ? "Individual"
      : undefined;

  const nav = useMemo(
    () => [
      { href: "/generate", label: "Protéger" },
      { href: "/verify", label: "Vérifier" },
      { href: "/personal", label: "Particuliers" },
      { href: "/pro", label: "Entreprises" },
      { href: "/pricing", label: "Tarifs" },
    ],
    []
  );

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <>
      {/* Lien accessibilité pour sauter au contenu */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only fixed left-3 top-3 z-[1001] rounded-xl bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow focus:outline-none focus:ring-2 focus:ring-sky-400"
      >
        Aller au contenu
      </a>

      {/* HEADER clair premium */}
      <header
        role="banner"
        className={[
          "sticky top-0 z-50 w-full border-b border-gray-200",
          "bg-white/95 supports-[backdrop-filter]:bg-white/80 backdrop-blur",
          scrolled ? "shadow-[0_6px_24px_rgba(2,6,23,.10)]" : "shadow-none",
          "transition-shadow",
        ].join(" ")}
      >
        <div className="container-max flex h-16 items-center gap-3 text-slate-900">
          {/* Logo marque */}
          <Link
            href="/"
            className="mr-1 -mx-1 px-1 rounded-lg font-extrabold text-[1.25rem] tracking-tight focus:outline-none focus:ring-2 focus:ring-emerald-400"
            aria-label="DigitalMeve - Accueil"
          >
            <span className="text-emerald-500">Digital</span>
            <span className="text-sky-500">Meve</span>
          </Link>

          {/* Navigation (desktop) */}
          <nav
            aria-label="Navigation principale"
            className="ml-4 hidden items-center gap-7 text-[0.95rem] md:flex"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={[
                  "relative -mx-1 px-1 font-medium text-slate-700 hover:text-slate-900 transition-colors",
                  "after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-1 after:h-[2px] after:w-0 after:rounded-full",
                  "after:bg-gradient-to-r after:from-emerald-500 after:to-sky-500 after:transition-all",
                  "hover:after:w-3/5",
                  isActive(item.href) ? "text-slate-900 after:w-3/5" : "",
                ].join(" ")}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex-1" />

          {/* Langues (desktop) */}
          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/?lang=fr"
              className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs text-slate-700 hover:bg-gray-50"
              aria-label="Passer en français"
            >
              <Globe className="h-3.5 w-3.5 text-emerald-500" />
              FR
            </Link>
            <span className="text-slate-300">/</span>
            <Link
              href="/?lang=en"
              className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs text-slate-700 hover:bg-gray-50"
              aria-label="Switch to English"
            >
              EN
            </Link>
          </div>

          {/* Auth (desktop) */}
          <div className="hidden items-center gap-3 md:flex">
            {!session?.user ? (
              <>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 hover:bg-gray-50"
                >
                  <LogIn className="h-4 w-4" />
                  Connexion
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-3 py-2 text-sm font-semibold text-white shadow hover:brightness-105"
                >
                  <UserPlus className="h-4 w-4" />
                  Créer un compte
                </Link>
              </>
            ) : (
              <div className="hidden items-center gap-3 md:flex">
                <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2">
                  <User2 className="h-4 w-4 text-slate-700" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium leading-tight text-slate-900">
                      {session.user.email}
                    </p>
                    {role && (
                      <p className="text-xs leading-tight text-slate-500">{role}</p>
                    )}
                  </div>
                </div>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 hover:bg-gray-50"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="inline-flex items-center gap-2 rounded-xl bg-rose-600/10 px-3 py-2 text-sm font-medium text-rose-700 hover:bg-rose-600/15"
                >
                  <LogOut className="h-4 w-4" />
                  Déconnexion
                </button>
              </div>
            )}
          </div>

          {/* Menu mobile */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-slate-900 hover:bg-gray-50 active:scale-95 transition"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Drawer mobile (tu as déjà le composant) */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />

      {/* Ancre pour le lien “skip” */}
      <span id="main" className="sr-only" />
    </>
  );
}
