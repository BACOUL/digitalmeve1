// components/Header.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  LogIn,
  UserPlus,
  LogOut,
  LayoutDashboard,
  User2,
} from "lucide-react";

// ✅ wrappers safe pour éviter les erreurs côté build/SSG
import {
  useSessionSafe as useSession,
  signOutSafe as signOut,
} from "@/lib/safe-auth";

import MobileMenu from "./MobileMenu";

export default function Header() {
  const { data: session } = useSession() ?? {};
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Ombre quand on scrolle
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
      {/* Skip link a11y */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus-ring fixed left-3 top-3 z-[1001] rounded-lg bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow"
      >
        Aller au contenu
      </a>

      {/* ===== Header clair premium ===== */}
      <header
        role="banner"
        className={[
          "sticky top-0 z-50 w-full",
          "border-b border-slate-200/70",
          // fond blanc translucide + blur pour garder le hero visible en dessous
          "bg-white/90 backdrop-blur",
          scrolled ? "shadow-[0_8px_24px_rgba(2,6,23,0.08)]" : "",
          "transition-shadow",
        ].join(" ")}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 text-slate-900">
          {/* Logo brand (sans pastille) */}
          <Link
            href="/"
            aria-label="DigitalMeve — retour à l’accueil"
            className="mr-1 -mx-1 rounded-md px-1 focus-ring"
          >
            <span className="text-xl font-extrabold tracking-tight">
              <span className="text-emerald-500">Digital</span>
              <span className="text-sky-500">Meve</span>
            </span>
          </Link>

          {/* Nav desktop */}
          <nav
            aria-label="Navigation principale"
            className="ml-4 hidden items-center gap-6 text-sm md:flex"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={[
                  "relative -mx-1 rounded-md px-1 transition",
                  "text-slate-600 hover:text-slate-900",
                  // soulignement dégradé
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

          {/* Zone droite (desktop) */}
          <div className="hidden items-center gap-3 md:flex">
            {!session?.user ? (
              <>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-900 hover:bg-slate-50 focus-ring"
                >
                  <LogIn className="h-4 w-4" />
                  Connexion
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-semibold text-white focus-ring"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--tw-gradient-from,#10B981), var(--tw-gradient-to,#38BDF8))",
                  }}
                >
                  <UserPlus className="h-4 w-4" />
                  Créer un compte
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5">
                  <User2 className="h-4 w-4 text-slate-700" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium leading-tight">
                      {session.user.email}
                    </p>
                    {role && (
                      <p className="text-xs leading-tight text-slate-500">
                        {role}
                      </p>
                    )}
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-900 hover:bg-slate-50 focus-ring"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Tableau de bord
                </Link>

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="inline-flex items-center gap-2 rounded-xl bg-rose-500/10 px-3 py-1.5 text-sm font-medium text-rose-600 hover:bg-rose-500/15 focus-ring"
                >
                  <LogOut className="h-4 w-4" />
                  Déconnexion
                </button>
              </>
            )}
          </div>

          {/* Burger mobile */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 focus-ring md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Drawer mobile (on garde ton composant existant) */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />

      {/* Ancre pour le skip link */}
      <span id="main" className="sr-only" />
    </>
  );
}
