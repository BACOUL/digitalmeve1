// components/MobileMenu.tsx
"use client";

import Link from "next/link";

type Props = { open: boolean; onClose: () => void };

export default function MobileMenu({ open, onClose }: Props) {
  if (!open) return null;

  const close: React.MouseEventHandler = () => onClose();

  return (
    <>
      {/* Overlay cliquable */}
      <div
        aria-hidden
        onClick={onClose}
        className="fixed inset-0 z-[999] bg-black/50"
      />

      {/* Panneau minimal (aucune logique annexe) */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className="fixed inset-0 z-[1000] flex flex-col bg-white"
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
          <Link href="/" onClick={close} className="text-lg font-semibold">
            <span className="text-emerald-600">Digital</span>
            <span className="text-sky-600">Meve</span>
          </Link>
          <button
            onClick={onClose}
            className="rounded border px-3 py-1 text-sm"
            aria-label="Close menu"
          >
            Close
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 text-slate-800">
          <p className="mb-2 text-xs font-semibold uppercase text-slate-500">
            Products
          </p>
          <ul className="space-y-2 mb-4">
            <li><Link href="/generate" onClick={close} className="block rounded px-3 py-2 hover:bg-gray-50">Generate</Link></li>
            <li><Link href="/verify" onClick={close} className="block rounded px-3 py-2 hover:bg-gray-50">Verify</Link></li>
          </ul>

          <p className="mb-2 text-xs font-semibold uppercase text-slate-500">
            Solutions
          </p>
          <ul className="space-y-2 mb-4">
            <li><Link href="/personal" onClick={close} className="block rounded px-3 py-2 hover:bg-gray-50">For Individuals</Link></li>
            <li><Link href="/pro" onClick={close} className="block rounded px-3 py-2 hover:bg-gray-50">For Business</Link></li>
          </ul>

          <p className="mb-2 text-xs font-semibold uppercase text-slate-500">
            Resources
          </p>
          <ul className="space-y-2 mb-4">
            <li><Link href="/pricing" onClick={close} className="block rounded px-3 py-2 hover:bg-gray-50">Pricing</Link></li>
            <li><Link href="/developers" onClick={close} className="block rounded px-3 py-2 hover:bg-gray-50">Developers</Link></li>
            <li><Link href="/security" onClick={close} className="block rounded px-3 py-2 hover:bg-gray-50">Security</Link></li>
            <li><Link href="/status" onClick={close} className="block rounded px-3 py-2 hover:bg-gray-50">Status</Link></li>
            <li><Link href="/changelog" onClick={close} className="block rounded px-3 py-2 hover:bg-gray-50">Changelog</Link></li>
          </ul>

          <p className="mb-2 text-xs font-semibold uppercase text-slate-500">
            Company
          </p>
          <ul className="space-y-2">
            <li><Link href="/about" onClick={close} className="block rounded px-3 py-2 hover:bg-gray-50">About</Link></li>
            <li><Link href="/contact" onClick={close} className="block rounded px-3 py-2 hover:bg-gray-50">Contact</Link></li>
            <li><Link href="/legal" onClick={close} className="block rounded px-3 py-2 hover:bg-gray-50">Legal</Link></li>
          </ul>
        </nav>
      </div>
    </>
  );
}
