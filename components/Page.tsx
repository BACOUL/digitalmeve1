// app/page.tsx
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Briefcase,
  ShieldCheck,
  BadgeCheck,
  FileDown,
  Upload,
  Sparkles,
} from "lucide-react";
import Hero from "@/components/Hero";           // ✅ déjà en charte
import HowItWorks from "@/components/HowItWorks"; // ✅ 3 étapes en charte

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">

      {/* ================= HERO ================= */}
      <Hero />

      {/* ======== BANG FOR BUCK / PROOF BAR (sombre) ======== */}
      <section className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
            <BadgeCheck className="h-4 w-4 text-emerald-400" />
            Free for individuals
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
            <ShieldCheck className="h-4 w-4 text-sky-400" />
            No account · No storage
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            Certificate included
          </span>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <HowItWorks />

      {/* ============== USE-CASES (INDIVIDUALS) ============== */}
      <section className="mx-auto max-w-6xl px-4 pb-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-semibold">For Individuals</h2>
            <span className="ml-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-xs text-emerald-300">
              Free
            </span>
          </div>
          <p className="mt-2 text-slate-300">
            Protect your everyday documents in seconds. Your files stay the same, you get
            an official certificate to share when needed.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "CV & Résumé", desc: "Partagez une version authentifiée que les recruteurs peuvent vérifier en un clic." },
              { title: "Attestations & Devis", desc: "Ajoutez une preuve à vos PDFs envoyés à l’administration ou à vos clients." },
              { title: "Diplômes & Certificats", desc: "Préservez l’intégrité de vos justificatifs numériques." },
              { title: "Photos d’œuvre / Créations", desc: "Protégez vos visuels avant de les partager." },
              { title: "Contrats signés", desc: "Document lisible partout + certificat simple à transmettre." },
              { title: "Documents administratifs", desc: "Pour des échanges clairs, sans compte ni plateforme." },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-white/10 bg-slate-900/50 p-5">
                <h3 className="font-semibold text-slate-100">{c.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-5 py-2.5 font-semibold text-slate-900 shadow-[0_0_30px_rgba(34,211,238,0.35)] hover:brightness-110 transition"
            >
              Protect a file now
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/pricing#individuals"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 font-semibold text-slate-100 hover:bg-white/10 transition"
            >
              Learn about personal use
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============== USE-CASES (BUSINESS) ============== */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-sky-400" />
            <h2 className="text-xl sm:text-2xl font-semibold">For Businesses</h2>
            <span className="ml-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-2 py-0.5 text-xs text-sky-300">
              API & Dashboard
            </span>
          </div>
          <p className="mt-2 text-slate-300">
            Bring trust to your digital workflows. Automate certification, verify at scale,
            and show a trust badge to your audience.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "RH / Recrutement", desc: "CV certifiés, attestations internes, dossiers candidats." },
              { title: "Juridique", desc: "Versions horodatées, pièces jointes scellées, envoi à forte confiance." },
              { title: "Éducation", desc: "Diplômes numériques, relevés, certificats étudiants." },
              { title: "Immobilier", desc: "Contrats, états des lieux, documents sensibles partagés en confiance." },
              { title: "Finance / Assurance", desc: "Comptes-rendus, offres, documents chiffrés + certificat." },
              { title: "Créateurs & Médias", desc: "Visuels et livrables avec preuve intégrée + certificat." },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl border border-white/10 bg-slate-900/50 p-5">
                <h3 className="font-semibold text-slate-100">{c.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{c.desc}</p>
              </div>
            ))}
          </div>

          <ul className="mt-5 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
              API, SDKs & webhooks for automation
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
              Verification at scale (batch, internal tools)
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
              Domain/email checks for a visible trust badge
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-400" />
              SLA, support & roadmap alignment
            </li>
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/pro"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 font-semibold text-slate-100 hover:bg-white/10 transition"
            >
              Discover Pro
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-5 py-2.5 font-semibold text-white hover:bg-sky-600 transition"
            >
              Contact sales
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Note: “Official” tier is not part of the current offering.
          </p>
        </div>
      </section>

      {/* ================= WHY DIGITALMEVE ================= */}
      <section className="mx-auto max-w-6xl px-4 pb-10">
        <h2 className="text-2xl font-semibold">Why DigitalMeve</h2>
        <p className="mt-2 text-slate-400">
          Designed for everyone — simple to use, built for trust.
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: <ShieldCheck className="h-5 w-5 text-emerald-400" />,
              title: "Built-in proof",
              desc: "A durable proof lives with the file. No viewer or plugin required.",
            },
            {
              icon: <BadgeCheck className="h-5 w-5 text-emerald-400" />,
              title: "Readable everywhere",
              desc: "Your files remain clean and portable — open them as usual.",
            },
            {
              icon: <Users className="h-5 w-5 text-emerald-400" />,
              title: "Free for individuals",
              desc: "Protect personal files at no cost. Pro plans scale your workflows.",
            },
            {
              icon: <FileDown className="h-5 w-5 text-emerald-400" />,
              title: "No account. No storage.",
              desc: "We never keep your files. Generate and check in seconds.",
            },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2 text-sm text-emerald-400">
                {f.icon}
                <span className="font-medium">{f.title}</span>
              </div>
              <p className="mt-2 text-sm text-slate-300">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-400 px-5 py-2.5 font-semibold text-slate-900 shadow-[0_0_30px_rgba(34,211,238,0.35)] hover:brightness-110 transition"
          >
            Protect a file now
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/verify"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-2.5 font-semibold text-slate-100 hover:bg-white/10 transition"
          >
            Verify a file
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* ================= DEVELOPERS / SAMPLE ================= */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Sample file */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <h3 className="text-xl font-semibold">Try a sample</h3>
            <p className="mt-2 text-slate-300">
              Download a sample file and see how the certificate works in practice.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/sample.pdf"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-2 font-semibold hover:bg-white/10"
              >
                <FileDown className="h-5 w-5 text-emerald-400" />
                Download sample
              </Link>
              <Link
                href="/verify"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-2 font-semibold hover:bg-white/10"
              >
                Verify now
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Developers */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <h3 className="text-xl font-semibold">Developers</h3>
            <p className="mt-2 text-slate-300">
              Integrate DigitalMeve into your apps with our upcoming SDKs and webhook
              notifications. Ship trust by default.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/developers"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-2 font-semibold hover:bg-white/10"
              >
                Explore docs
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-2xl bg-sky-500 px-4 py-2 font-semibold text-white hover:bg-sky-600"
              >
                Talk to us
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======= MINI-FAQ (court, grand public) ======= */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="text-2xl font-semibold">FAQ (quick)</h2>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {[
            {
              q: "Do I need an account?",
              a: "No. You can generate and verify without creating an account.",
            },
            {
              q: "Do you store my files?",
              a: "No. Files stay on your device. We only prepare your certificate.",
            },
            {
              q: "Are my files still readable?",
              a: "Yes. Nothing changes for how you open or share them.",
            },
          ].map((f) => (
            <div key={f.q} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h4 className="font-semibold text-slate-100">{f.q}</h4>
              <p className="mt-1 text-sm text-slate-300">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
              }
