"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { X, LogIn, UserPlus, LogOut, LayoutDashboard, User2 } from "lucide-react";
import { useSessionSafe as useSession, signOutSafe as signOut } from "@/lib/safe-auth";

type Props = { open: boolean; onClose: () => void };

export default function MobileMenu({ open, onClose }: Props) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false); // évite mismatch SSR/CSR

  const role =
    (session?.user as any)?.role === "BUSINESS"
      ? "Business"
      : (session?.user as any)?.role === "INDIVIDUAL"
      ? "Individual"
      : undefined;

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setMounted(true), []);

  // Scroll lock simple (client only)
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!open) return null;

  const links = useMemo(
    () => [
      { href: "/generate", label: "Generate" },
      { href: "/verify", label: "Verify" },
      { href: "/personal", label: "For Individuals" },
      { href: "/pro", label: "For Business" },
      { href: "/contact", label: "Contact" }, // ajouté
    ],
    []
  );

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(href + "/");

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobilemenu-title"
      className="fixed inset-0 z-[1000] flex bg-black/40 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="document"
        className="ml-auto flex h-dvh w-full max-w-sm flex-col bg-slate-950 text-slate-100 md:rounded-l-2xl md:shadow-2xl animate-[mmSlideIn_220ms_cubic-bezier(0.22,0.61,0.36,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-4">
          <Link
            href="/"
            onClick={onClose}
            className="text-lg font-extrabold bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent"
          >
            DigitalMeve
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800"
          >
            <X className="h-5 w-5 text-slate-200" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2">
          <h2 id="mobilemenu-title" className="sr-only">Main navigation</h2>
          {links.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              onClick={onClose}
              className={[
                "block rounded-lg px-3 py-2 text-base font-medium transition",
                isActive(it.href)
                  ? "bg-slate-900 text-white"
                  : "text-slate-200 hover:text-white hover:bg-slate-900",
              ].join(" ")}
              aria-current={isActive(it.href) ? "page" : undefined}
            >
              {it.label}
            </Link>
          ))}
        </nav>

        {/* Account – client-only */}
        <div className="border-t border-slate-800 p-4" suppressHydrationWarning>
          {mounted ? (
            session?.user ? (
              <div className="space-y-3">
                <div className="rounded-xl border border-slate-700 bg-slate-900 p-3 flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-slate-800">
                    <User2 className="h-5 w-5 text-slate-200" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-100">
                      {session.user.email}
                    </p>
                    {role && <p className="text-xs text-slate-400">{role}</p>}
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  onClick={onClose}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
                >
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600/20 px-4 py-2 text-sm font-medium text-rose-300 hover:bg-rose-600/30"
                >
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/login?callbackUrl=/dashboard"
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
                >
                  <LogIn className="h-4 w-4" /> Login
                </Link>
                <Link
                  href="/register?callbackUrl=/dashboard"
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 text-sm font-medium text-white shadow-md hover:brightness-105"
                >
                  <UserPlus className="h-4 w-4" /> Register
                </Link>
              </div>
            )
          ) : (
            <div className="h-10 w-full rounded-xl bg-transparent" aria-hidden />
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes mmSlideIn {
          from { transform: translateX(8%); opacity: 0.4; }
          to { transform: translateX(0%); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-[mmSlideIn_220ms_cubic-bezier(0.22,0.61,0.36,1)] { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
