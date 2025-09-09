// config/site.ts
export const site = {
  name: "DigitalMeve",
  cta: { href: "/generate", label: "Get Started" },
  nav: [
    { href: "/generate", label: "Generate" },
    { href: "/verify",   label: "Verify" },
    { href: "/docs",     label: "Docs" },
    { href: "/pricing",  label: "Pricing" },
    { href: "/contact",  label: "Contact" },
  ],
  socials: {
    github: "https://github.com/BACOUL/digitalmeve",
  },
} as const;
