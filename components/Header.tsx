"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, LogIn, UserPlus, LogOut, LayoutDashboard, User2 } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Header() {
  // ✅ on ne déstructure pas useSession
  const sessionState = useSession();
  const session = sessionState?.data;
  const [open, setOpen] = useState(false);

  // Ferme le drawer si on change de route via hash (comportement simple côté mobile)
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

  return (
    <>
      {/* HEADER noir + verre dépoli */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 glass">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 text-slate-100">
          {/* Logo */}
          <Link href="/" className="mr-1 text-lg font-semibold">
            <span className="text-emerald-400">Digital</span>
            <span className="text-sky-400">Meve</span>
          </Link>

          {/* Nav (desktop) */}
          <nav className="ml-2 hidden items-center gap-6 text-sm md:flex">
            <Link className="text-slate-300 hover:text-white" href="/generate">Generate</Link>
            <Link className="text-slate-300 hover:text-white" href="/verify">Verify</Link>
            <Link className="text-slate-300 hover:text-white" href="/personal">For Individuals</Link>
            <Link className="text-slate-300 hover:text-white" href="/pro">For Business</Link>
            <Link className="text-slate-300 hover:text-white" href="/pricing">Pricing</Link>
          </nav>

          <div className="flex-1" />

          {/* Auth zone (desktop) */}
          <div className="hidden items-center gap-3 md:flex">
            {!session?.user ? (
              <>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-100 hover:bg-white/10"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-sky-400 px-3 py-1.5 text-sm font-semibold text-slate-900 shadow-glow hover:brightness-110"
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
                    {role && (
                      <p className="text-xs leading-tight text-slate-400">{role}</p>
                    )}
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-100 hover:bg-white/10"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="inline-flex items-center gap-2 rounded-xl bg-rose-500/15 px-3 py-1.5 text-sm font-medium text-rose-300 hover:bg-rose-500/25"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 md:hidden"
          >
            <Menu className="h-5 w-5 text-slate-100" />
          </button>
        </div>
      </header>

      {/* Drawer */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
