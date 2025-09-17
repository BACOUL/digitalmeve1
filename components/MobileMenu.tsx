"use client";

import Link from "next/link";

export default function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg)]">
      <nav className="flex flex-col space-y-1 px-4 py-4">
        <Link href="/personal" onClick={onClose} className="mobile-link">For Individuals</Link>
        <Link href="/pro" onClick={onClose} className="mobile-link">For Business</Link>
        <Link href="/generate" onClick={onClose} className="mobile-link">Generate</Link>
        <Link href="/verify" onClick={onClose} className="mobile-link">Verify</Link>
        <Link href="/contact" onClick={onClose} className="mobile-link">Contact</Link>
      </nav>

      <div className="border-t border-[var(--border)] px-4 py-4 flex flex-col gap-3">
        <Link
          href="/login"
          onClick={onClose}
          className="w-full rounded-lg border border-[var(--border)] px-4 py-2 text-center text-sm font-medium hover:bg-white/5"
        >
          Log in
        </Link>
        <Link
          href="/register"
          onClick={onClose}
          className="w-full rounded-lg bg-gradient-to-r from-emerald-500 to-sky-500 px-4 py-2 text-center text-sm font-semibold text-white shadow hover:brightness-110"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
