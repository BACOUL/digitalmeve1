"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { X, LayoutDashboard, LogOut, LogIn, UserPlus } from "lucide-react";
import { useSessionSafe as useSession, signOutSafe as signOut } from "@/lib/safe-auth";

type Props = { open: boolean; onClose: () => void };

export default function MobileMenu({ open, onClose }: Props) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const panelRef = useRef<HTMLDivElement | null>(null);

  // scroll lock
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!open) return null;

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
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobilemenu-title"
      className="fixed inset-0 z-[1000] flex bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="document"
        className="ml-auto flex h-full w-full max-w-sm flex-col bg-slate-950 text-slate-100 shadow-xl animate-[mmSlideIn_220ms_cubic-bezier(0.22,0.61,0.36,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top */}
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-4">
          <Link
            href="/"
            onClick={onClose}
            className="text-lg font-extrabold bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent"
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
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <h2 id="mobilemenu-title" className="sr-only">Main navigation</h2>
          <ul className="space-y-2 text-base font-medium">
            {nav.map((it) => (
              <li key={it.href}>
                <Link
                  href={it.href}
                  onClick={onClose}
                  className={`block rounded-lg px-3 py-2 transition ${
                    isActive(it.href)
                      ? "bg-slate-900 text-white"
                      : "text-slate-200 hover:bg-slate-900 hover:text-white"
                  }`}
                  aria-current={isActive(it.href) ? "page" : undefined}
                >
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Account */}
        <div className="border-t border-slate-800 p-4">
          {!session?.user ? (
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/login?callbackUrl=/dashboard"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
              >
                <LogIn className="h-4 w-4" /> Log in
              </Link>
              <Link
                href="/register?callbackUrl=/dashboard"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 text-sm font-semibold text-white shadow hover:brightness-110"
              >
                <UserPlus className="h-4 w-4" /> Sign up
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/dashboard"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
              >
                <LayoutDashboard className="h-4 w-4" /> Dashboard
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600/20 px-4 py-2 text-sm font-medium text-rose-300 hover:bg-rose-600/30"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </div>
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
