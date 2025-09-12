// app/cookies/page.tsx
import type { Metadata } from "next";
import { Page, PageHeader, Section, H2, P, A, Highlight } from "@/components/Page";

export const metadata: Metadata = {
  title: "Cookies – DigitalMeve",
  description:
    "Learn how DigitalMeve uses cookies and local storage. Minimal, privacy-first, and compliant.",
};

export default function CookiesPage() {
  const lastUpdated = new Date().toLocaleDateString("en-US");

  return (
    <Page>
      <PageHeader title="Cookies" subtitle={`Last updated: ${lastUpdated}`} />

      <div className="mt-10 space-y-10">
        <Section>
          <P>
            DigitalMeve is built with a <Highlight>privacy-first</Highlight> approach. We keep cookies to
            the minimum required for the site to function and for compliant, privacy-respecting analytics.
          </P>
        </Section>

        <Section>
          <H2>What we use</H2>
          <P>
            • <Highlight>Essential cookies</Highlight> (functional): used to remember your basic choices
            (e.g., language) and to operate features like the mobile menu.  
            <br />
            • <Highlight>Local storage</Highlight>: may store lightweight usage counters such as
            per-device/day limits in V1 (e.g., “5 files/day”), without identifying you.
          </P>
        </Section>

        <Section>
          <H2>Analytics</H2>
          <P>
            We use <Highlight>Plausible</Highlight> for aggregated, cookie-free analytics (no personal data,
            no cross-site tracking). This helps us understand overall usage and improve the product while
            preserving your privacy.
          </P>
          <P className="text-sm">
            Learn more at{" "}
            <A href="https://plausible.io/data-policy" target="_blank" rel="noreferrer">
              plausible.io/data-policy
            </A>.
          </P>
        </Section>

        <Section>
          <H2>What we do not use</H2>
          <P>
            • No advertising cookies. <br />
            • No third-party trackers for profiling. <br />
            • No fingerprinting or cross-site identifiers.
          </P>
        </Section>

        <Section>
          <H2>Your choices</H2>
          <P>
            You can block or delete cookies in your browser settings at any time. Essential features of the
            site should continue to work, but some preferences may reset. If you have questions, contact us at{" "}
            <A href="mailto:privacy@digitalmeve.com">privacy@digitalmeve.com</A>.
          </P>
        </Section>

        <Section>
          <H2>Updates</H2>
          <P>
            We may update this notice as we evolve. Material changes will be reflected here. Your continued
            use of the site after updates constitutes acceptance of the revised notice.
          </P>
        </Section>
      </div>
    </Page>
  );
}
