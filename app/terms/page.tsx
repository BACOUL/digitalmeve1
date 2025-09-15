// app/terms/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  ShieldCheck,
  Ban,
  Scale,
  Repeat,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service – DigitalMeve",
  description: "Clear and transparent rules for using DigitalMeve.",
};

export default function TermsPage() {
  const sections = [
    { id: "acceptance", title: "Acceptance" },
    { id: "use", title: "Use of the service" },
    { id: "liability", title: "Limitations of liability" },
    { id: "termination", title: "Suspension & termination" },
    { id: "changes", title: "Changes" },
    { id: "contact", title: "Contact" },
    { id: "disclaimer", title: "Legal Disclaimer – Proof & Evidence" },
  ];

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
      {/* HEADER */}
      <section className="border-b border-[var(--border)] bg-[var(--bg)]">
        <div className="container-max px-4 py-14">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-[var(--accent-2)]" />
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Terms of Service
            </h1>
          </div>
          <p className="mt-2 sub">The rules that govern your use of DigitalMeve.</p>
          <p className="mt-1 text-sm text-[var(--fg-muted)]">
            Last updated: {new Date().toISOString().slice(0, 10)}
          </p>

          {/* TOC */}
          <nav className="mt-6 flex flex-wrap gap-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-[var(--fg-muted)] ring-1 ring-[var(--border)] hover:text-[var(--fg)]"
              >
                <span>{s.title}</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* CONTENT */}
      <section className="section-dark">
        <div className="container-max px-4 py-12 space-y-10">
          <Card id="acceptance" icon={<ShieldCheck className="h-6 w-6 text-[var(--accent-1)]" />} title="1) Acceptance">
            By using DigitalMeve, you agree to these Terms. If you do not agree, please do not use the service.
          </Card>

          <Card id="use" icon={<FileText className="h-6 w-6 text-[var(--accent-1)]" />} title="2) Use of the service">
            You are solely responsible for the content you process. Do not use DigitalMeve for unlawful purposes, to infringe intellectual property rights, or to distribute harmful material.
          </Card>

          <Card id="liability" icon={<Scale className="h-6 w-6 text-[var(--accent-1)]" />} title="3) Limitations of liability">
            The service is provided <em>“as is”</em> without warranties of any kind. To the extent permitted by law, DigitalMeve disclaims all liability for damages arising from your use of the service.
          </Card>

          <Card id="termination" icon={<Ban className="h-6 w-6 text-[var(--accent-1)]" />} title="4) Suspension & termination">
            We may suspend or terminate your access if you misuse the service or breach these Terms. We will make reasonable efforts to notify you in advance unless immediate action is required.
          </Card>

          <Card id="changes" icon={<Repeat className="h-6 w-6 text-[var(--accent-1)]" />} title="5) Changes">
            We may update these Terms from time to time. If changes are significant, we will highlight them on this page or notify you directly.
          </Card>

          <Card id="contact" icon={<Mail className="h-6 w-6 text-[var(--accent-1)]" />} title="6) Contact">
            For any questions, reach us at{" "}
            <a href="mailto:legal@digitalmeve.com" className="link">
              legal@digitalmeve.com
            </a>
            . For privacy matters, see our{" "}
            <Link href="/privacy" className="link">
              Privacy Policy
            </Link>
            .
          </Card>

          {/* 7) Legal Disclaimer – Proof & Evidence */}
          <div id="disclaimer" className="card p-6 scroll-mt-24">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-[var(--accent-1)]" />
              <h2 className="h2">7) Legal Disclaimer – Proof & Evidence</h2>
            </div>

            <p className="mt-2 text-[var(--fg-muted)]">
              DigitalMeve provides <b>technical proofs</b> (cryptographic fingerprint, timestamp, invisible markers) to help
              demonstrate integrity and authenticity of files. However, these do <b>not constitute a legally qualified electronic
              signature</b>, nor a notarized act, nor any other statutory certified record. Admissibility and legal weight depend
              on your jurisdiction, the facts of the case, and judicial assessment. Users are responsible for verifying whether
              a <b>qualified signature</b>, <b>notarial act</b>, or other legally recognized method is required for their use case.
            </p>

            <div className="mt-4 space-y-5 text-[var(--fg-muted)] text-sm">
              {/* EU / France */}
              <div>
                <h3 className="font-semibold text-[var(--fg)]">🇪🇺 European Union / France</h3>
                <p>
                  Only a <b>Qualified Electronic Signature (QES)</b> issued by a{" "}
                  <a
                    href="https://webgate.ec.europa.eu/tl-browser/#/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    Qualified Trust Service Provider
                  </a>{" "}
                  benefits from automatic equivalence with handwritten signatures (Art. 25{" "}
                  <a
                    href="https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX%3A32014R0910"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    eIDAS Regulation
                  </a>, EU 910/2014). See also French Civil Code{" "}
                  <a
                    href="https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032000411"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    Articles 1366–1367
                  </a>
                  . MEVE does not issue QES and therefore cannot guarantee such equivalence.
                </p>
              </div>

              {/* US */}
              <div>
                <h3 className="font-semibold text-[var(--fg)]">🇺🇸 United States</h3>
                <p>
                  Under the{" "}
                  <a
                    href="https://www.govinfo.gov/content/pkg/PLAW-106publ229/pdf/PLAW-106publ229.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    ESIGN Act (2000)
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://www.uniformlaws.org/committees/community-home?CommunityKey=2c04b76c-2b7d-4392-85b9-44c8c58e3a1a"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    UETA
                  </a>
                  , electronic signatures are valid if they show intent and consent. MEVE proofs may support evidence, but they{" "}
                  <b>do not replace notarization</b> nor statutory formalities required for certain acts (e.g. real estate, wills).
                </p>
              </div>

              {/* UK */}
              <div>
                <h3 className="font-semibold text-[var(--fg)]">🇬🇧 United Kingdom</h3>
                <p>
                  Electronic signatures are recognized under the{" "}
                  <a
                    href="https://www.legislation.gov.uk/ukpga/2000/7/contents"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    Electronic Communications Act 2000
                  </a>
                  . Guidance from the{" "}
                  <a
                    href="https://www.lawcom.gov.uk/project/electronic-execution-of-documents/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    Law Commission
                  </a>{" "}
                  confirms validity, but some acts may still require a witness or notary.
                </p>
              </div>

              {/* Canada */}
              <div>
                <h3 className="font-semibold text-[var(--fg)]">🇨🇦 Canada</h3>
                <p>
                  Electronic signatures are governed by{" "}
                  <a
                    href="https://laws-lois.justice.gc.ca/fra/lois/P-8.6/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    PIPEDA
                  </a>{" "}
                  and provincial laws (e.g. Ontario Electronic Commerce Act). Proofs may be admissible, but certain transactions
                  (e.g. land transfers) require specific legal forms.
                </p>
              </div>

              {/* Other jurisdictions */}
              <div>
                <h3 className="font-semibold text-[var(--fg)]">🌍 Other jurisdictions</h3>
                <p>
                  Many countries follow the{" "}
                  <a
                    href="https://uncitral.un.org/en/texts/ecommerce/modellaw/electronic_commerce"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    UNCITRAL Model Law on Electronic Commerce
                  </a>
                  . However, requirements vary widely. Users must verify compliance with their local laws. MEVE provides{" "}
                  <b>no guarantee of statutory equivalence</b>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="border-t border-[var(--border)] bg-[var(--bg)]">
        <div className="container-max px-4 py-10 text-center">
          <p className="text-sm text-[var(--fg-muted)]">
            Questions about our Terms?{" "}
            <Link href="/contact" className="link font-medium">
              Contact us
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}

/* ------------ UI bits ------------ */

function Card({
  id,
  icon,
  title,
  children,
}: {
  id: string;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="card p-6 scroll-mt-24">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="h2">{title}</h2>
      </div>
      <p className="mt-2 text-[var(--fg-muted)]">{children}</p>
    </div>
  );
}
