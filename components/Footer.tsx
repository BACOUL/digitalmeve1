// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <div className="text-lg font-semibold tracking-tight">
              <span className="text-emerald-600">Digital</span>
              <span className="text-sky-600">Meve</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              A simple, universal proof for your documents — free for individuals.
            </p>
          </div>

          {/* Individuals */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800">Individuals</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li><Link className="hover:text-emerald-600" href="/generate">Generate</Link></li>
              <li><Link className="hover:text-emerald-600" href="/verify">Verify</Link></li>
              <li><Link className="hover:text-emerald-600" href="/personal">Overview</Link></li>
              <li><Link className="hover:text-emerald-600" href="/docs">Docs</Link></li>
            </ul>
          </div>

          {/* Professionals */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800">For Professionals</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li><Link className="hover:text-sky-600" href="/pro">Why .MEVE</Link></li>
              <li><Link className="hover:text-sky-600" href="/contact">Contact</Link></li>
              <li><Link className="hover:text-sky-600" href="/docs#api">API</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800">Legal</h3>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li><Link className="hover:text-gray-800" href="/privacy">Privacy</Link></li>
              <li><Link className="hover:text-gray-800" href="/terms">Terms</Link></li>
              <li><Link className="hover:text-gray-800" href="/security">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse items-center justify-between gap-4 border-t border-gray-200 pt-6 text-xs text-gray-500 sm:flex-row">
          <p>© {new Date().getFullYear()} DigitalMeve. All rights reserved.</p>
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-gray-50 px-3 py-1">
            <span className="text-emerald-600">Free for Individuals</span>
            <span className="text-gray-400">•</span>
            <span>EN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
