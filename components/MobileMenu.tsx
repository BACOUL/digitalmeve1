"use client";

import Link from "next/link";
import { X } from "lucide-react";

type Props = { open: boolean; onClose: () => void };

export default function MobileMenu({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
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
      </nav>
    </div>
  );
}
