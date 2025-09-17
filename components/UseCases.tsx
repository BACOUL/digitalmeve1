// components/UseCases.tsx
export const UseCases = () => {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold text-slate-100 mb-8">Use Cases</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-xl bg-slate-800 p-6 shadow">
            <h3 className="text-xl font-semibold text-emerald-400 mb-2">
              Individuals
            </h3>
            <p className="text-slate-300">
              Verify diplomas, documents, and identity proofs with ease.
            </p>
          </div>
          <div className="rounded-xl bg-slate-800 p-6 shadow">
            <h3 className="text-xl font-semibold text-sky-400 mb-2">
              Businesses
            </h3>
            <p className="text-slate-300">
              Ensure employee credentials, contracts, and compliance checks.
            </p>
          </div>
          <div className="rounded-xl bg-slate-800 p-6 shadow">
            <h3 className="text-xl font-semibold text-violet-400 mb-2">
              Institutions
            </h3>
            <p className="text-slate-300">
              Manage verification flows for universities, hospitals, and more.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
