"use client";

import Link from "next/link";
import { X, LogIn, UserPlus, LogOut, UserCircle2 } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

type Props = { open: boolean; onClose: () => void };

export default function MobileMenu({ open, onClose }: Props) {
  const { data: session, status } = useSession();

  if (!open) return null;

  async function onSignOut() {
    onClose();
    // Redirige vers l’accueil après déconnexion
    await signOut({ callbackUrl: "/" });
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[1000] bg-white h-dvh overflow-y-auto overscroll-y-contain [-webkit-overflow-scrolling:touch]"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
        <Link href="/" onClick={onClose} className="text-lg font-semibold" aria-label="DigitalMeve Home">
          <span className="text-emerald-600">Digital</span>
          <span className="text-sky-600">Meve</span>
        </Link>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 bg-white hover:bg-gray-50"
        >
          <X className="h-5 w-5 text-slate-700" />
        </button>
      </div>

      {/* Links */}
      <nav className="px-4 py-6 space-y-6">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Products
          </p>
          <ul className="space-y-2">
            <li>
              <Link href="/generate" onClick={onClose} className="block py-2">
                Generate
              </Link>
            </li>
            <li>
              <Link href="/verify" onClick={onClose} className="block py-2">
                Verify
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Solutions
          </p>
          <ul className="space-y-2">
            <li>
              <Link href="/personal" onClick={onClose} className="block py-2">
                For Individuals
              </Link>
            </li>
            <li>
              <Link href="/pro" onClick={onClose} className="block py-2">
                For Business
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Resources
          </p>
          <ul className="space-y-2">
            <li>
              <Link href="/pricing" onClick={onClose} className="block py-2">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/developers" onClick={onClose} className="block py-2">
                Developers
              </Link>
            </li>
            <li>
              <Link href="/security" onClick={onClose} className="block py-2">
                Security
              </Link>
            </li>
            <li>
              <Link href="/status" onClick={onClose} className="block py-2">
                Status
              </Link>
            </li>
            <li>
              <Link href="/changelog" onClick={onClose} className="block py-2">
                Changelog
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Company
          </p>
          <ul className="space-y-2">
            <li>
              <Link href="/about" onClick={onClose} className="block py-2">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={onClose} className="block py-2">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/legal" onClick={onClose} className="block py-2">
                Legal
              </Link>
            </li>
          </ul>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200" />

        {/* Account section */}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Account
          </p>

          {status === "authenticated" && session?.user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-3">
                <UserCircle2 className="h-5 w-5 text-slate-600" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {session.user.email}
                  </p>
                  <p className="text-xs text-slate-500">
                    {(session.user as any).role?.toLowerCase?.() === "business" ? "Business" : "Individual"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Link
                  href="/dashboard"
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-gray-50"
                >
                  <UserCircle2 className="h-4 w-4" />
                  Dashboard
                </Link>
                <button
                  onClick={onSignOut}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 ring-1 ring-rose-200 hover:bg-rose-100"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                href="/login"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>
              <Link
                href="/register"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 text-sm font-medium text-white shadow hover:brightness-105"
              >
                <UserPlus className="h-4 w-4" />
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
