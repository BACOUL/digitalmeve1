// app/privacy/page.tsx
import type { Metadata } from "next";
import { Page, PageHeader, Section, H2, P, A, Highlight } from "@/components/Page";

export const metadata: Metadata = {
  title: "Privacy Policy – DigitalMeve",
  description: "Learn how DigitalMeve protects your privacy and handles data responsibly.",
};

export default function PrivacyPage() {
  const lastUpdated = new Date().toLocaleDateString("en-US");

  return (
    <Page>
      <PageHeader title="Privacy Policy" subtitle={`Last updated: ${lastUpdated}`} />

      <div className="mt-10 space-y-10">
        <Section>
          <P>
            At <span className="font-semibold text-gray-900">DigitalMeve</span>, your privacy
            is a priority. Our system is designed to provide <Highlight>digital proof</Highlight>{" "}
            with <Highlight>no storage</Highlight> of your files. You stay in control at all times.
          </P>
        </Section>

        <Section>
          <H2>Information We Collect</H2>
          <P>
            We collect the minimum data necessary to operate our service, such as technical logs to
            maintain security. We <Highlight>do not store</Highlight> your uploaded documents or proofs.
          </P>
        </Section>

        <Section>
          <H2>How We Use Data</H2>
          <P>
            Data is only used to provide and improve the DigitalMeve service. It is never sold or shared
            with third parties.
          </P>
        </Section>

        <Section>
          <H2>Data Retention</H2>
          <P>
            Uploaded files are processed in real time and never stored. Minimal metadata (e.g., proof
            identifiers) may be retained briefly to enable verification and to prevent abuse.
          </P>
        </Section>

        <Section>
          <H2>Your Rights</H2>
          <P>
            You can request access, correction, or deletion of your personal data at any time by contacting{" "}
            <A href="mailto:privacy@digitalmeve.com">privacy@digitalmeve.com</A>.
          </P>
        </Section>
      </div>
    </Page>
  );
}
