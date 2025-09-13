"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, LogIn, UserPlus, LogOut, LayoutDashboard, User2 } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  // ferme le drawer si on change de route via Link
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
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
          {/* Logo */}
          <Link href="/" className="mr-1 text-lg font-semibold">
            <span className="text-emerald-600">Digital</span>
            <span className="text-sky-600">Meve</span>
          </Link>

          {/* Nav (desktop) */}
          <nav className="ml-2 hidden items-center gap-6 text-sm text-slate-700 md:flex">
            <Link className="hover:text-slate-900" href="/generate">
              Generate
            </Link>
            <Link className="hover:text-slate-900" href="/verify">
              Verify
            </Link>
            <Link className="hover:text-slate-900" href="/personal">
              For Individuals
            </Link>
            <Link className="hover:text-slate-900" href="/pro">
              For Business
            </Link>
            <Link className="hover:text-slate-900" href="/pricing">
              Pricing
            </Link>
          </nav>

          <div className="flex-1" />

          {/* Auth zone (desktop) */}
          <div className="hidden items-center gap-3 md:flex">
            {!session?.user ? (
              <>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-900 hover:bg-gray-50"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-3 py-1.5 text-sm font-medium text-white shadow-md hover:brightness-105"
                >
                  <UserPlus className="h-4 w-4" />
                  Register
                </Link>
              </>
            ) : (
              <>
                <div className="hidden items-center gap-3 md:flex">
                  <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-1.5">
                    <User2 className="h-4 w-4 text-slate-700" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-900 leading-tight">
                        {session.user.email}
                      </p>
                      {role && (
                        <p className="text-xs text-slate-500 leading-tight">{role}</p>
                      )}
                    </div>
                  </div>

                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-900 hover:bg-gray-50"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>

                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="inline-flex items-center gap-2 rounded-xl bg-rose-50 px-3 py-1.5 text-sm font-medium text-rose-700 hover:bg-rose-100"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Hamburger (mobile) */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 bg-white hover:bg-gray-50 md:hidden"
          >
            <Menu className="h-5 w-5 text-slate-700" />
          </button>
        </div>
      </header>

      {/* Drawer */}
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
