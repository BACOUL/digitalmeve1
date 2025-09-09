export const metadata = {
  title: "Contact — DigitalMeve",
  description: "Reach out for Pro and Official inquiries.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-slate-100">Contact</h1>
      <p className="mt-3 text-slate-300">
        For Pro and Official inquiries, email us at{" "}
        <a href="mailto:hello@digitalmeve.com" className="underline decoration-emerald-400/60 underline-offset-4">
          hello@digitalmeve.com
        </a>.
      </p>
      <p className="mt-4 text-sm text-slate-400">
        We’ll get back to you as soon as possible.
      </p>
    </section>
  );
}
