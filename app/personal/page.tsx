import {
  Users,
  Upload,
  BadgeCheck,
  FileDown,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  HelpCircle,
  Download,
} from "lucide-react";

export default function PersonalPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full blur-3xl opacity-30 bg-emerald-400/30" />
          <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full blur-3xl opacity-30 bg-sky-400/30" />
        </div>

        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
            <Users className="h-3.5 w-3.5" aria-hidden />
            Free for Individuals — No signup
          </span>
          <h1 className="mt-3 text-3xl font-semibold sm:text-5xl">
            Protect your documents in seconds
          </h1>
          <p className="mt-3 max-w-2xl text-slate-300">
            Certify any file instantly. Your document stays fully readable.
            We never store your files — they’re used to create the proof, then discarded.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href="/generate"
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-medium text-slate-900 bg-gradient-to-r from-emerald-400 to-sky-400 shadow-[0_0_40px_rgba(34,211,238,0.35)] hover:brightness-110 transition"
            >
              Generate a proof <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a
              href="/verify"
              className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-medium border border-white/10 bg-white/5 hover:bg-white/10 transition"
            >
              Verify a file <ShieldCheck className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {/* SOMMAIRE ACCROCHEUR */}
      <section className="mx-auto max-w-6xl px-4 pb-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <a
            href="#how"
            className="rounded-xl border border-white/10 bg-slate-900/60 p-4 hover:bg-white/5 transition flex items-center gap-3"
          >
            <Upload className="h-5 w-5 text-emerald-300" aria-hidden />
            <div>
              <div className="font-medium">How it works</div>
              <div className="text-xs text-slate-400">3 simple steps</div>
            </div>
          </a>
          <a
            href="#examples"
            className="rounded-xl border border-white/10 bg-slate-900/60 p-4 hover:bg-white/5 transition flex items-center gap-3"
          >
            <Sparkles className="h-5 w-5 text-sky-300" aria-hidden />
            <div>
              <div className="font-medium">Try examples</div>
              <div className="text-xs text-slate-400">Invoice, photo, diploma</div>
            </div>
          </a>
          <a
            href="#faq"
            className="rounded-xl border border-white/10 bg-slate-900/60 p-4 hover:bg-white/5 transition flex items-center gap-3"
          >
            <HelpCircle className="h-5 w-5 text-slate-300" aria-hidden />
            <div>
              <div className="font-medium">FAQ</div>
              <div className="text-xs text-slate-400">Clear & non-technical</div>
            </div>
          </a>
        </div>
      </section>

      {/* 3 STEPS */}
      <section id="how" className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-semibold">How it works</h2>
        <p className="mt-2 text-slate-400">Three simple steps. No jargon.</p>

        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>Step 1</span>
              <Upload className="h-4 w-4" aria-hidden />
            </div>
            <h3 className="mt-2 text-lg font-medium">Upload your file</h3>
            <p className="mt-2 text-slate-400">PDF, images, and more.</p>
            <a href="/generate" className="mt-4 inline-flex items-center gap-1 text-sm underline decoration-emerald-400/60 hover:text-slate-200">
              Try now <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>Step 2</span>
              <BadgeCheck className="h-4 w-4" aria-hidden />
            </div>
            <h3 className="mt-2 text-lg font-medium">Get your certified copy</h3>
            <p className="mt-2 text-slate-400">
              We add an invisible proof and keep your document fully readable.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>Step 3</span>
              <FileDown className="h-4 w-4" aria-hidden />
            </div>
            <h3 className="mt-2 text-lg font-medium">Download & share</h3>
            <p className="mt-2 text-slate-400">
              Keep a portable certificate (<code className="text-slate-300">.meve.json</code>) if you need it.
            </p>
            <a href="/verify" className="mt-4 inline-flex items-center gap-1 text-sm underline decoration-sky-400/60 hover:text-slate-200">
              Verify a file <ArrowRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {/* EXAMPLES */}
      <section id="examples" className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-semibold">Examples you can try</h2>
        <p className="mt-2 text-slate-400">Download a sample + its proof, then verify it.</p>

        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {[
            { title: "Invoice (PDF)", file: "/examples/invoice.pdf", proof: "/examples/invoice.pdf.meve.json" },
            { title: "Photo (PNG)", file: "/examples/photo.png", proof: "/examples/photo.png.meve.json" },
            { title: "Diploma (PDF)", file: "/examples/diploma.pdf", proof: "/examples/diploma.pdf.meve.json" },
          ].map((x) => (
            <div key={x.title} className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
              <div className="font-medium">{x.title}</div>
              <div className="mt-3 flex flex-col gap-2 text-sm">
                <a href={x.file} className="inline-flex items-center gap-2 underline decoration-emerald-400/60 hover:text-slate-200">
                  <Download className="h-4 w-4" aria-hidden /> Download sample
                </a>
                <a href={x.proof} className="inline-flex items-center gap-2 underline decoration-sky-400/60 hover:text-slate-200">
                  <ShieldCheck className="h-4 w-4" aria-hidden /> Download proof (.meve.json)
                </a>
              </div>
              <a href="/verify" className="mt-4 inline-flex items-center gap-1 text-xs text-slate-400 underline decoration-sky-400/60 hover:text-slate-200">
                Verify this sample <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Place your files in <code>/public/examples/</code> to activate these links.
        </p>
      </section>

      {/* MINI FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="text-2xl font-semibold">FAQ (quick)</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5">
            <h3 className="font-medium">Is it really free?</h3>
            <p className="mt-1 text-slate-400">Yes — personal use is free, no account needed.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5">
            <h3 className="font-medium">Do you store my files?</h3>
            <p className="mt-1 text-slate-400">No. Files are used to create your proof, then discarded.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5">
            <h3 className="font-medium">What’s the “proof” file?</h3>
            <p className="mt-1 text-slate-400">A small certificate you can keep or share if needed.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5">
            <h3 className="font-medium">How do I verify?</h3>
            <p className="mt-1 text-slate-400">Open the Verify page and upload your certified file or its proof.</p>
          </div>
        </div>
      </section>
    </main>
  );
              }
