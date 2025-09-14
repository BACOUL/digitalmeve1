// components/MobileMenu.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  X,
  LogIn,
  UserPlus,
  LogOut,
  LayoutDashboard,
  User2,
  ChevronDown,
  Globe,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";

type Props = { open: boolean; onClose: () => void };

export default function MobileMenu({ open, onClose }: Props) {
  const { data: session } = useSession();

  // Empêche le scroll derrière le menu (⚠️ cleanup retourne bien void)
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
      className="fixed inset-0 z-[1000] flex bg-black/30"
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

            {/* GROUPES + ACCORDÉONS */}
            <Accordion title="Products" defaultOpen>
              <Item href="/generate" onClose={onClose} label="Generate" />
              <Item href="/verify" onClose={onClose} label="Verify" />
            </Accordion>

            <Accordion title="Solutions" defaultOpen>
              <Item href="/personal" onClose={onClose} label="For Individuals" />
              <Item href="/pro" onClose={onClose} label="For Business" />
            </Accordion>

            <Accordion title="Resources">
              <Item href="/pricing" onClose={onClose} label="Pricing" />
              <Item href="/developers" onClose={onClose} label="Developers" />
              <Item href="/security" onClose={onClose} label="Security" />
              {/* Sous-groupe "More" pour garder le menu court */}
              <Subgroup label="More">
                <Item href="/status" onClose={onClose} label="Status" />
                <Item href="/changelog" onClose={onClose} label="Changelog" />
                {/* Tu pourras ajouter ici: /how-it-works, /formats, /trust-center */}
              </Subgroup>
            </Accordion>

            <Accordion title="Company">
              <Item href="/about" onClose={onClose} label="About" />
              <Item href="/contact" onClose={onClose} label="Contact" />
              <Item href="/legal" onClose={onClose} label="Legal" />
            </Accordion>
          </nav>

          {/* PIED : langue + compte */}
          <div className="border-t border-gray-200 p-4 space-y-4">
            <LanguagePicker />

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
                        <p className="text-xs text-slate-500 leading-tight">
                          {role}
                        </p>
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

/* --------- Composants internes --------- */

function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-4">
      <button
        className="flex w-full items-center justify-between rounded-lg px-1.5 py-2 text-left text-sm font-semibold text-slate-700 hover:bg-gray-50"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="uppercase tracking-wide text-xs text-slate-500">
          {title}
        </span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div className={open ? "mt-2" : "hidden"}>{children}</div>
    </div>
  );
}

function Subgroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-1 pl-2">
      <button
        className="inline-flex items-center gap-2 rounded-md px-1 py-1 text-xs font-medium text-slate-600 hover:text-slate-900"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
        {label}
      </button>
      <div className={open ? "mt-1" : "hidden"}>{children}</div>
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
      <Link
        href={href}
        onClick={onClose}
        className="block py-2 text-[15px] hover:underline underline-offset-4"
      >
        {label}
      </Link>
    </li>
  );
}

function LanguagePicker() {
  // Détecte le cookie existant (simple et robuste)
  const current =
    typeof document !== "undefined" &&
    /(?:^|;\s*)dm_lang=(en|fr)/.exec(document.cookie || "")?.[1];

  function setLang(lang: "en" | "fr") {
    // 1 an
    document.cookie = `dm_lang=${lang}; Max-Age=31536000; Path=/; SameSite=Lax`;
    // Recharge la même page (même route) – le middleware/layout peut lire ce cookie
    window.location.reload();
  }

  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 px-3 py-2">
      <div className="flex items-center gap-2 text-sm text-slate-700">
        <Globe className="h-4 w-4" />
        Language
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => setLang("en")}
          className={`rounded-lg px-2 py-1 text-xs ${
            current !== "fr" ? "bg-gray-900 text-white" : "ring-1 ring-gray-200"
          }`}
          aria-pressed={current !== "fr"}
        >
          EN
        </button>
        <span className="px-1 text-slate-400">/</span>
        <button
          onClick={() => setLang("fr")}
          className={`rounded-lg px-2 py-1 text-xs ${
            current === "fr" ? "bg-gray-900 text-white" : "ring-1 ring-gray-200"
          }`}
          aria-pressed={current === "fr"}
        >
          FR
        </button>
      </div>
    </div>
  );
      }
