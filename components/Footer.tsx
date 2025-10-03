// components/Footer.tsx — v4 (routes existantes uniquement, cohérent Header/MobileMenu, a11y)

"use client";

import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-100 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Branding */}
          <div>
            <Link
              href="/"
              className="text-xl font-extrabold tracking-tight"
              aria-label="DigitalMeve – Home"
            >
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                Digital
              </span>
              <span className="bg-gradient-to-r from-sky-400 to-sky-300 bg-clip-text text-transparent">
                Meve
              </span>
            </Link>
            <p className="mt-3 text-sm text-slate-400">
              Invisible proof. Visible trust. Protect & verify files with on-device certification.
            </p>
            <p className="mt-2 text-xs text-slate-500">
              No storage • In-browser • Verifiable anywhere
            </p>
          </div>

          {/* Explore (pages existantes) */}
          <nav aria-label="Explore">
            <h4 className="text-sm font-semibold text-white">Explore</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              <li><Link href="/generate" className="hover:text-white">Protect a file</Link></li>
              <li><Link href="/verify" className="hover:text-white">Verify a document</Link></li>
              <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link href="/security" className="hover:text-white">Security</Link></li>
            </ul>
          </nav>

          {/* Resources (site ↔ GitHub) */}
          <nav aria-label="Resources">
            <h4 className="text-sm font-semibold text-white">Resources</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-400">
              {/* Quand /docs, /roadmap, /faq seront prêts, dé-commente :
              <li><Link href="/docs" className="hover:text-white">Standard</Link></li>
              <li><Link href="/roadmap" className="hover:text-white">Roadmap</Link></li>
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              */}
              <li>
                <a
                  href="https://github.com/BACOUL/Digitalmeve-standard-"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                  aria-label="Open GitHub repository in a new tab"
                >
                  GitHub
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">Contact</Link>
              </li>
            </ul>
          </nav>

          {/* Company + Legal */}
          <div>
            <nav aria-label="Company">
              <h4 className="text-sm font-semibold text-white">Company</h4>
              <ul className="mt-3 space-y-2 text-sm text-slate-400">
                <li>
                  <a
                    href="mailto:support@digitalmeve.com"
                    className="underline hover:text-white"
                    aria-label="Contact support via email"
                  >
                    support@digitalmeve.com
                  </a>
                </li>
                {/* Quand /partners sera prêt :
                <li><Link href="/partners" className="hover:text-white">Partners</Link></li>
                */}
              </ul>
            </nav>

            <nav aria-label="Legal" className="mt-6">
              <h4 className="text-sm font-semibold text-white">Legal</h4>
              <ul className="mt-3 space-y-2 text-sm text-slate-400">
                <li><Link href="/terms" className="hover:text-white">Terms</Link></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy</Link></li>
                {/* Si tu crées ces pages plus tard :
                <li><Link href="/refunds" className="hover:text-white">Refund Policy</Link></li>
                <li><Link href="/cookies" className="hover:text-white">Cookies</Link></li>
                */}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <div className="rounded-full bg-white px-5 py-2 text-xs font-semibold text-slate-900 shadow-sm">
            © {year} DigitalMeve
          </div>
          <p className="text-xs text-slate-500">
            Security reports →{" "}
            <Link href="/security" className="underline hover:text-white">
              Responsible Disclosure
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
            }
