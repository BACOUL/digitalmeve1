"use client";

import Link from "next/link";
import { useEffect } from "react";
import { X, LogIn, UserPlus, LogOut, LayoutDashboard, User2 } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

type Props = { open: boolean; onClose: () => void };

export default function MobileMenu({ open, onClose }: Props) {
  const { data: session } = useSession();

  // Bloque le scroll derrière le menu
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const role =
    (session?.user as any)?.role === "BUSINESS"
      ? "Business"
      : (session?.user as any)?.role === "INDIVIDUAL"
      ? "Individual"
      : undefined;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[1000] flex bg-black/20"
      onClick={onClose}
    >
      {/* Drawer */}
      <div
        role="document"
        className="ml-auto h-dvh w-full max-w-sm bg-white outline-none md:rounded-l-2xl md:shadow-2xl animate-[slideIn_220ms_cubic-bezier(0.22,0.61,0.36,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-4">
          <Link href="/" onClick={onClose} className="text-lg font-semibold">
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

        {/* Content */}
        <div className="flex h-[calc(100dvh-4rem)] flex-col">
          <nav className="flex-1 overflow-y-auto overscroll-y-contain px-4 py-6">
            {/* CTA rapides */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <Link
                href="/generate"
                onClick={onClose}
                className="text-center rounded-xl bg-emerald-600/90 px-3 py-2.5 text-sm font-medium text-white hover:brightness-105"
              >
                Generate
              </Link>
              <Link
                href="/verify"
                onClick={onClose}
                className="text-center rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-900 hover:bg-gray-50"
              >
                Verify
              </Link>
            </div>

            <Section title="Products">
              <Item href="/generate" onClose={onClose} label="Generate" />
              <Item href="/verify" onClose={onClose} label="Verify" />
            </Section>

            <Section title="Solutions">
              <Item href="/personal" onClose={onClose} label="For Individuals" />
              <Item href="/pro" onClose={onClose} label="For Business" />
            </Section>

            <Section title="Resources">
              <Item href="/pricing" onClose={onClose} label="Pricing" />
              <Item href="/developers" onClose={onClose} label="Developers" />
              <Item href="/security" onClose={onClose} label="Security" />
              <Item href="/status" onClose={onClose} label="Status" />
              <Item href="/changelog" onClose={onClose} label="Changelog" />
            </Section>

            <Section title="Company">
              <Item href="/about" onClose={onClose} label="About" />
              <Item href="/contact" onClose={onClose} label="Contact" />
              <Item href="/legal" onClose={onClose} label="Legal" />
            </Section>
          </nav>

          {/* Account panel (toujours visible en bas) */}
          <div className="border-t border-gray-200 p-4">
            {session?.user ? (
              <div className="space-y-3">
                <div className="rounded-xl border border-gray-200 p-3">
                  <div className="flex items-center gap-3">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-gray-100">
                      <User2 className="h-5 w-5 text-slate-700" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-900">
                        {session.user.email}
                      </p>
                      {role && (
                        <p className="text-xs text-slate-500 leading-tight">{role}</p>
                      )}
                    </div>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  onClick={onClose}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-gray-50"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 hover:bg-rose-100"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/login"
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-gray-50"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 text-sm font-medium text-white shadow-md hover:brightness-105"
                >
                  <UserPlus className="h-4 w-4" />
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* petite anim CSS */}
      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(8%);
            opacity: 0.4;
          }
          to {
            transform: translateX(0%);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </p>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function Item({
  href,
  label,
  onClose,
}: {
  href: string;
  label: string;
  onClose: () => void;
}) {
  return (
    <li>
      <Link href={href} onClick={onClose} className="block py-2 text-[15px]">
        {label}
      </Link>
    </li>
  );
                    }
