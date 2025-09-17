"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Logo + pitch */}
          <div>
            <Link
              href="/"
              className="text-xl font-extrabold bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent"
            >
              DigitalMeve
            </Link>
            <p className="mt-3 text-sm text-slate-500">
              Proof your documents in seconds. Invisible, portable, secure.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700">Company</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-emerald-600">About</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-600">Contact</Link></li>
              <li><Link href="/legal" className="hover:text-emerald-600">Legal</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700">Resources</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/developers" className="hover:text-emerald-600">Developers</Link></li>
              <li><Link href="/security" className="hover:text-emerald-600">Security</Link></li>
              <li><Link href="/status" className="hover:text-emerald-600">Status</Link></li>
              <li><Link href="/changelog" className="hover:text-emerald-600">Changelog</Link></li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="text-sm font-semibold text-slate-700">Legal</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/terms" className="hover:text-emerald-600">Terms</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-600">Privacy</Link></li>
              <li><Link href="/cookies" className="hover:text-emerald-600">Cookies</Link></li>
            </ul>
            <div className="mt-4 flex gap-4 text-slate-500">
              <Link href="https://github.com" target="_blank" aria-label="GitHub">
                <Github className="h-5 w-5 hover:text-emerald-600" />
              </Link>
              <Link href="https://twitter.com" target="_blank" aria-label="Twitter">
                <Twitter className="h-5 w-5 hover:text-emerald-600" />
              </Link>
              <Link href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 hover:text-emerald-600" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-12 border-t border-gray-200 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} DigitalMeve. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
