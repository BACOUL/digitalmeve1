// components/ExamplesGallery.tsx
"use client";

import Link from "next/link";
import { FileText, FileCheck2, FileArchive, ArrowRight } from "lucide-react";

const EXAMPLES = [
  {
    icon: <FileText className="h-5 w-5" />,
    name: "Diploma.pdf",
    desc: "Official diploma, ready to share with proof.",
  },
  {
    icon: <FileCheck2 className="h-5 w-5" />,
    name: "Contract.docx",
    desc: "Signed agreement with embedded .MEVE proof.",
  },
  {
    icon: <FileArchive className="h-5 w-5" />,
    name: "Press-kit.zip",
    desc: "Bundle with certificate — portable & verifiable.",
  },
];

export default function ExamplesGallery() {
  return (
    <section className="section-dark" aria-labelledby="examples">
      <div className="container-max pb-14">
        <h2 id="examples" className="h2">Examples</h2>
        <p className="sub mt-2">See what protected files look like — then try with yours.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {EXAMPLES.map((x) => (
            <div
              key={x.name}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.04] p-5
                         backdrop-blur-sm hover:-translate-y-0.5 transition
                         shadow-[0_10px_30px_rgba(0,0,0,.25)] hover:shadow-[0_20px_60px_rgba(0,0,0,.35)]"
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10 [mask-image:linear-gradient(black,transparent)]" />
              <div className="flex items-center gap-2 text-[var(--accent-1)]">{x.icon}<span className="font-semibold">{x.name}</span></div>
              <p className="mt-1 text-sm text-[var(--fg-muted)]">{x.desc}</p>

              <div className="mt-4 flex gap-2">
                <Link href="/generate" className="btn btn-primary-strong">
                  Protect this <ArrowRight className="h-5 w-5" />
                </Link>
                <Link href="/verify" className="btn-outline">
                  See certificate <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
