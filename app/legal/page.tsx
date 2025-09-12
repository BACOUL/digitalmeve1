// app/legal/page.tsx
import type { Metadata } from "next";
import { Page, PageHeader, Section, H2, P, A, Highlight } from "@/components/Page";

export const metadata: Metadata = {
  title: "Legal – DigitalMeve",
  description:
    "Site notice and legal information for DigitalMeve: company details, hosting, editorial responsibility, IP, and contact.",
};

export default function LegalPage() {
  const lastUpdated = new Date().toLocaleDateString("en-US");

  return (
    <Page>
      <PageHeader title="Legal" subtitle={`Last updated: ${lastUpdated}`} />

      <div className="mt-10 space-y-10">
        <Section>
          <H2>Publisher / Company</H2>
          <P>
            <Highlight>DigitalMeve</Highlight> (the “Publisher”).<br />
            Registered office: <em>To be completed</em>.<br />
            Registration / Company No.: <em>To be completed</em>.<br />
            VAT / Tax ID: <em>To be completed</em>.
          </P>
          <P>
            Contact:{" "}
            <A href="mailto:contact@digitalmeve.com">contact@digitalmeve.com</A> ·{" "}
            <A href="mailto:legal@digitalmeve.com">legal@digitalmeve.com</A>
          </P>
        </Section>

        <Section>
          <H2>Hosting Provider</H2>
          <P>
            The website is hosted by <Highlight>Vercel Inc.</Highlight><br />
            440 N Barranca Ave #4133, Covina, CA 91723, USA.<br />
            Website:{" "}
            <A href="https://vercel.com/" target="_blank" rel="noreferrer">
              vercel.com
            </A>
          </P>
        </Section>

        <Section>
          <H2>Editorial Responsibility</H2>
          <P>
            The Publisher is responsible for editorial content. For any request related to content on this
            website, please write to{" "}
            <A href="mailto:legal@digitalmeve.com">legal@digitalmeve.com</A>.
          </P>
        </Section>

        <Section>
          <H2>Intellectual Property</H2>
          <P>
            Unless otherwise stated, all texts, graphics, logos, icons, and software components on this site
            are the exclusive property of the Publisher or its licensors and are protected by applicable
            intellectual property laws. Any reproduction or representation, in whole or in part, without
            prior written consent is prohibited.
          </P>
          <P className="text-sm">
            “DigitalMeve” and “.MEVE” may be trademarks or trade names. Other names may be trademarks of
            their respective owners.
          </P>
        </Section>

        <Section>
          <H2>Disclaimer of Liability</H2>
          <P>
            The information provided on this site is for general information purposes only. Although we make
            reasonable efforts to keep the content accurate and up to date, we make no representations or
            warranties of any kind, express or implied, about the completeness, accuracy, reliability,
            suitability, or availability with respect to the website or the information, products, services,
            or related graphics contained on the website for any purpose.
          </P>
          <P>
            The DigitalMeve service embeds tamper-evident metadata into supported file formats. It does not
            constitute legal advice and does not by itself establish identity, authorship, ownership, or any
            legal status. Users remain solely responsible for their use of the service and their compliance
            with applicable laws and third-party rights.
          </P>
        </Section>

        <Section>
          <H2>Abuse Reports & Takedown</H2>
          <P>
            To report unlawful content, security issues, or abuse, contact{" "}
            <A href="mailto:abuse@digitalmeve.com">abuse@digitalmeve.com</A>. Provide a precise description,
            the URL, and any supporting evidence. We will assess and respond in a reasonable timeframe.
          </P>
        </Section>

        <Section>
          <H2>Governing Law & Jurisdiction</H2>
          <P>
            This site notice is governed by the laws applicable at the Publisher’s registered office. Any
            dispute shall be submitted to the competent courts of that jurisdiction, unless mandatory
            consumer protection rules provide otherwise.
          </P>
        </Section>

        <Section>
          <H2>Related Policies</H2>
          <P>
            • <A href="/privacy">Privacy Policy</A> · <A href="/cookies">Cookies</A> ·{" "}
            <A href="/terms">Terms of Service</A> · <A href="/security">Security</A> ·{" "}
            <A href="/status">Status</A> · <A href="/changelog">Changelog</A>
          </P>
        </Section>
      </div>
    </Page>
  );
}
