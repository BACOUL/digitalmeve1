// components/MobileMenu.tsx
"use client";

import { useEffect, useRef } from "react";
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

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function MobileMenu({ open, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Bloque le scroll de la page quand le menu est ouvert
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Fermer avec ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Focus sur le 1er lien à l'ouverture
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const first = panelRef.current.querySelector<HTMLElement>(
      "button,[href],input,select,textarea,[tabindex]:not([tabindex='-1'])"
    );
    first?.focus();
  }, [open]);

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden={!open}
        className={[
          "fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-200",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={onClose}
      />

      {/* Panneau plein écran */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className={[
          "fixed inset-0 z-[61] flex flex-col bg-slate-950/95",
          "transition-transform duration-200",
          open ? "translate-y-0" : "-translate-y-2",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
      >
        {/* Barre du haut */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          <Link href="/" onClick={onClose} className="flex items-center gap-2">
            <span className="text-lg font-semibold">
              <span className="text-emerald-300">Digital</span>
              <span className="text-sky-300">Meve</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Contenu scrollable */}
        <nav className="flex-1 overflow-y-auto px-2 pb-8 pt-2">
          {/* INDIVIDUALS */}
          <p className="px-3 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-emerald-300/90">
            Individuals
          </p>
          <ul className="space-y-2 px-1">
            <li>
              <Link
                href="/generate"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-white/5"
              >
                <FilePlus2 className="h-5 w-5 text-emerald-300 group-hover:scale-110 transition-transform" />
                <span>Generate</span>
              </Link>
            </li>
            <li>
              <Link
                href="/verify"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-white/5"
              >
                <ShieldCheck className="h-5 w-5 text-emerald-300 group-hover:scale-110 transition-transform" />
                <span>Verify</span>
              </Link>
            </li>
            <li>
              <Link
                href="/docs"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-white/5"
              >
                <BookOpen className="h-5 w-5 text-emerald-300 group-hover:scale-110 transition-transform" />
                <span>Docs</span>
              </Link>
            </li>
          </ul>

          <div className="my-4 h-px bg-white/10" />

          {/* PROFESSIONALS */}
          <p className="px-3 pt-1 pb-1 text-xs font-semibold uppercase tracking-wide text-sky-300/90">
            Professionals
          </p>
          <ul className="space-y-2 px-1">
            <li>
              <Link
                href="/pro"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-white/5"
              >
                <Briefcase className="h-5 w-5 text-sky-300 group-hover:scale-110 transition-transform" />
                <span>For Professionals</span>
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-white/5"
              >
                <Mail className="h-5 w-5 text-sky-300 group-hover:scale-110 transition-transform" />
                <span>Contact</span>
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                onClick={onClose}
                className="group flex items-center gap-3 rounded-2xl px-3 py-3 text-base hover:bg-white/5"
              >
                <Info className="h-5 w-5 text-sky-300 group-hover:scale-110 transition-transform" />
                <span>About</span>
              </Link>
            </li>
          </ul>

          {/* Petit badge en bas */}
          <div className="mt-6 px-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-emerald-300">
              <Users className="h-4 w-4" />
              Private by design · No signup
            </div>
          </div>
        </nav>
      </div>
    </>
  );
            }
