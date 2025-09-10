// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/80">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <div className="text-lg font-semibold">
              <span className="text-emerald-300">Digital</span>
              <span className="text-sky-300">Meve</span>
            </div>
            <p className="text-sm text-slate-400">
              A simple, universal proof for your documents — free for individuals.
            </p>
          </div>

          {/* Individuals */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200">Individuals</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li><Link className="hover:text-emerald-300" href="/generate">Generate</Link></li>
              <li><Link className="hover:text-emerald-300" href="/verify">Verify</Link></li>
              <li><Link className="hover:text-emerald-300" href="/personal">Overview</Link></li>
              <li><Link className="hover:text-emerald-300" href="/docs">Docs</Link></li>
            </ul>
          </div>

          {/* Professionals */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200">For Professionals</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li><Link className="hover:text-sky-300" href="/pro">Why .MEVE</Link></li>
              <li><Link className="hover:text-sky-300" href="/contact">Contact</Link></li>
              <li><Link className="hover:text-sky-300" href="/docs#api">API</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200">Legal</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li><Link className="hover:text-slate-200" href="/privacy">Privacy</Link></li>
              <li><Link className="hover:text-slate-200" href="/terms">Terms</Link></li>
              <li><Link className="hover:text-slate-200" href="/security">Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} DigitalMeve. All rights reserved.</p>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
            <span className="text-emerald-300">Free for Individuals</span>
            <span className="text-slate-600">•</span>
            <span>EN</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
