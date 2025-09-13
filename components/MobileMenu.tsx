// components/MobileMenu.tsx
"use client";

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Users,
  FilePlus2,
  ShieldCheck,
  BookOpen,
  Briefcase,
  Mail,
  Info,
  X,
} from "lucide-react";

type Props = { open: boolean; onClose: () => void };

function cx(...cls: Array<string | false | null | undefined>) {
  return cls.filter(Boolean).join(" ");
}

export default function MobileMenu({ open, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  if (!open) return null;

  // Empêche le scroll derrière
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  // Mémorise & restaure le focus
  useEffect(() => {
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    return () => lastFocusedRef.current?.focus?.();
  }, []);

  // ESC pour fermer
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Focus initial dans le panneau
  useEffect(() => {
    const first = panelRef.current?.querySelector<HTMLElement>(
      "button,[href],input,select,textarea,[tabindex]:not([tabindex='-1'])"
    );
    first?.focus();
  }, []);

  // Focus trap
  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const nodes = panelRef.current?.querySelectorAll<HTMLElement>(
      "button,[href],input,select,textarea,[tabindex]:not([tabindex='-1'])"
    );
    if (!nodes || nodes.length === 0) return;
    const list = Array.from(nodes).filter((el) => !el.hasAttribute("disabled"));
    const first = list[0];
    const last = list[list.length - 1];
    if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    } else if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    }
  }, []);

  const closeOnClick: React.MouseEventHandler = () => onClose();

  return (
    <>
      {/* Overlay (pas de Portal, rendu direct) */}
      <div
        aria-hidden
        onClick={onClose}
        className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm"
      />
      {/* Panneau */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className="fixed inset-0 z-[1000] flex flex-col bg-white outline-none"
        onKeyDown={onKeyDown}
      >
        {/* Barre supérieure */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <Link href="/" onClick={closeOnClick} className="flex items-center gap-2" aria-label="DigitalMeve Home">
            <span className="text-lg font-semibold tracking-tight">
              <span className="text-emerald-600">Digital</span>
              <span className="text-sky-600">Meve</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
          >
            <X className="h-5 w-5 text-slate-700" />
          </button>
        </div>

        {/* Contenu scrollable */}
        <nav className="flex-1 overflow-y-auto px-2 pb-24 pt-2 text-slate-700" aria-label="Mobile menu">
          {/* Products */}
          <p className="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Products
          </p>
          <ul className="space-y-2 px-1">
            <li>
              <Link
                href="/generate"
                onClick={closeOnClick}
                className={cx(
                  "group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
                )}
              >
                <FilePlus2 className="h-5 w-5 text-emerald-600" />
                <span>Generate</span>
              </Link>
            </li>
            <li>
              <Link
                href="/verify"
                onClick={closeOnClick}
                className={cx(
                  "group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40"
                )}
              >
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <span>Verify</span>
              </Link>
            </li>
          </ul>

          <div className="my-4 h-px bg-gray-200" />

          {/* Solutions */}
          <p className="px-3 pt-1 pb-1 text-xs font-semibold uppercase tracking-wide text-sky-600">
            Solutions
          </p>
          <ul className="space-y-2 px-1">
            <li>
              <Link
                href="/personal"
                onClick={closeOnClick}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40"
              >
                <Users className="h-5 w-5 text-sky-600" />
                <span>For Individuals</span>
              </Link>
            </li>
            <li>
              <Link
                href="/pro"
                onClick={closeOnClick}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40"
              >
                <Briefcase className="h-5 w-5 text-sky-600" />
                <span>For Business</span>
              </Link>
            </li>
          </ul>

          <div className="my-4 h-px bg-gray-200" />

          {/* Resources */}
          <p className="px-3 pt-1 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Resources
          </p>
          <ul className="space-y-2 px-1">
            <li>
              <Link href="/pricing" onClick={closeOnClick} className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50">
                <BookOpen className="h-5 w-5 text-slate-600" />
                <span>Pricing</span>
              </Link>
            </li>
            <li>
              <Link href="/developers" onClick={closeOnClick} className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50">
                <BookOpen className="h-5 w-5 text-slate-600" />
                <span>Developers</span>
              </Link>
            </li>
            <li>
              <Link href="/security" onClick={closeOnClick} className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50">
                <ShieldCheck className="h-5 w-5 text-slate-600" />
                <span>Security</span>
              </Link>
            </li>
            <li>
              <Link href="/status" onClick={closeOnClick} className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50">
                <Info className="h-5 w-5 text-slate-600" />
                <span>Status</span>
              </Link>
            </li>
            <li>
              <Link href="/changelog" onClick={closeOnClick} className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50">
                <BookOpen className="h-5 w-5 text-slate-600" />
                <span>Changelog</span>
              </Link>
            </li>
          </ul>

          <div className="my-4 h-px bg-gray-200" />

          {/* Company */}
          <p className="px-3 pt-1 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Company
          </p>
          <ul className="space-y-2 px-1">
            <li>
              <Link href="/about" onClick={closeOnClick} className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50">
                <Info className="h-5 w-5 text-slate-600" />
                <span>About</span>
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={closeOnClick} className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50">
                <Mail className="h-5 w-5 text-slate-600" />
                <span>Contact</span>
              </Link>
            </li>
            <li>
              <Link href="/legal" onClick={closeOnClick} className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-gray-50">
                <BookOpen className="h-5 w-5 text-slate-600" />
                <span>Legal</span>
              </Link>
            </li>
          </ul>

          {/* Badge */}
          <div className="mt-6 px-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-xs text-slate-600">
              <Users className="h-4 w-4" />
              Private by design · No signup
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
