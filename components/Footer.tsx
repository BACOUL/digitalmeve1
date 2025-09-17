// components/Footer.tsx
"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-slate-950/95 backdrop-blur px-6 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl">
        {/* Haut du footer */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Branding */}
          <div>
            <h3 className="text-lg font-bold text-white">DigitalMeve</h3>
            <p className="mt-2 text-sm text-slate-400">
              Invisible proof. Visible trust.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white">Product</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li><Link href="/generate" className="hover:text-white">Protect a file</Link></li>
              <li><Link href="/verify" className="hover:text-white">Verify a document</Link></li>
              <li><Link href="/#usecases" className="hover:text-white">Use cases</Link></li>
              <li><Link href="/#faq" className="hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-white">About us</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/legal/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Social (optionnel) */}
          <div>
            <h4 className="text-sm font-semibold text-white">Follow</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white">Twitter</a></li>
              <li><a href="#" className="hover:text-white">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white">GitHub</a></li>
            </ul>
          </div>
        </div>

        {/* Bas du footer */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} DigitalMeve. All rights reserved.</p>
          <p>Privacy by design • No storage • Works in your browser</p>
        </div>
      </div>
    </footer>
  );
}
