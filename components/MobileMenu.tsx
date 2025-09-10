"use client";

import Link from "next/link";
import { useEffect } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  // Bloquer le scroll quand le menu est ouvert
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={[
          "absolute right-0 top-0 h-full w-80 max-w-[86%] overflow-y-auto",
          "border-l border-white/10 bg-slate-900/95",
          "shadow-[0_0_40px_rgba(34,211,238,0.25)] backdrop-blur-xl",
          "animate-[slidein_.25s_ease] will-change-transform"
        ].join(" ")}
      >
        {/* Header du menu */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2"
          >
            <BrandLogo />
            <span className="font-medium text-slate-100">DigitalMeve</span>
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-2 hover:bg-white/10 focus:outline-none"
          >
            <XMarkIcon className="h-6 w-6 text-slate-200" />
          </button>
        </div>

        {/* Liens Particuliers */}
        <nav className="px-6 py-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-400/80 mb-3">
              For Individuals
            </h3>
            <div className="flex flex-col space-y-3">
              <Link
                href="/generate"
                onClick={onClose}
                className="hover:text-emerald-400 transition"
              >
                Generate Proof
              </Link>
              <Link
                href="/verify"
                onClick={onClose}
                className="hover:text-emerald-400 transition"
              >
                Verify Proof
              </Link>
              <Link
                href="/docs"
                onClick={onClose}
                className="hover:text-emerald-400 transition"
              >
                Documentation
              </Link>
              <Link
                href="/contact"
                onClick={onClose}
                className="hover:text-emerald-400 transition"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Liens Professionnels */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-sky-400/80 mb-3">
              For Professionals
            </h3>
            <div className="flex flex-col space-y-3">
              <Link
                href="/pro"
                onClick={onClose}
                className="hover:text-sky-400 transition"
              >
                Pro Solutions
              </Link>
              <Link
                href="/pricing"
                onClick={onClose}
                className="hover:text-sky-400 transition"
              >
                Pricing
              </Link>
              <Link
                href="/support"
                onClick={onClose}
                className="hover:text-sky-400 transition"
              >
                Support
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
            }
