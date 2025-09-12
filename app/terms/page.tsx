// app/terms/page.tsx
import type { Metadata } from "next";
import { Page, PageHeader, Section, H2, P, A, Highlight } from "@/components/Page";

export const metadata: Metadata = {
  title: "Terms of Service – DigitalMeve",
  description:
    "Read the Terms of Service for DigitalMeve. Simple language, clear responsibilities, and how the service works (no file storage).",
};

export default function TermsPage() {
  const lastUpdated = new Date().toLocaleDateString("en-US");

  return (
    <Page>
      <PageHeader title="Terms of Service" subtitle={`Last updated: ${lastUpdated}`} />

      <div className="mt-10 space-y-10">
        <Section>
          <P>
            These Terms of Service (“Terms”) govern your access to and use of{" "}
            <span className="font-semibold text-gray-900">DigitalMeve</span> (the “Service”).
            By using the Service, you agree to these Terms.
          </P>
        </Section>

        <Section>
          <H2>1. Service Description</H2>
          <P>
            DigitalMeve provides a lightweight, tamper-evident <Highlight>digital proof</Highlight> for
            your files. The Service processes files in real time and stores the proof data inside the file
            (e.g., XMP for PDFs). We operate with <Highlight>no storage</Highlight> of your uploaded files.
          </P>
        </Section>

        <Section>
          <H2>2. Eligibility</H2>
          <P>
            You must be legally capable of entering into agreements to use the Service. If you use the
            Service on behalf of an organization, you represent that you have authority to bind that
            organization to these Terms.
          </P>
        </Section>

        <Section>
          <H2>3. Your Responsibilities</H2>
          <P>
            You are responsible for (a) the content of files you upload, (b) keeping copies of originals,
            and (c) complying with applicable laws. Do not upload illegal, harmful, or infringing content.
          </P>
        </Section>

        <Section>
          <H2>4. Prohibited Use</H2>
          <P>
            You agree not to misuse the Service, including but not limited to: attempting to bypass limits,
            interfering with operation, reverse engineering, or using the Service for unlawful activity.
          </P>
        </Section>

        <Section>
          <H2>5. Intellectual Property</H2>
          <P>
            The Service, including the <Highlight>.MEVE</Highlight> format, software, design, and branding,
            is owned by DigitalMeve and/or its licensors. These Terms do not grant any ownership rights in
            the Service. You retain all rights to your files.
          </P>
        </Section>

        <Section>
          <H2>6. Disclaimers</H2>
          <P>
            THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE”. WE DISCLAIM ALL WARRANTIES, EXPRESS OR
            IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            We do not guarantee that any proof will be accepted by third parties.
          </P>
        </Section>

        <Section>
          <H2>7. Limitation of Liability</H2>
          <P>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, DIGITALMEVE SHALL NOT BE LIABLE FOR ANY INDIRECT,
            INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF DATA, PROFITS, OR
            REVENUE, ARISING FROM OR RELATED TO YOUR USE OF THE SERVICE.
          </P>
        </Section>

        <Section>
          <H2>8. Changes to the Service or Terms</H2>
          <P>
            We may modify the Service and these Terms from time to time. If changes are material, we will
            provide reasonable notice. Your continued use constitutes acceptance of the updated Terms.
          </P>
        </Section>

        <Section>
          <H2>9. Governing Law</H2>
          <P>
            These Terms are governed by applicable laws in your jurisdiction unless mandatory local
            consumer laws provide otherwise.
          </P>
        </Section>

        <Section>
          <H2>10. Contact</H2>
          <P>
            Questions? Contact us at{" "}
            <A href="mailto:legal@digitalmeve.com">legal@digitalmeve.com</A>.
          </P>
        </Section>
      </div>
    </Page>
  );
}
