"use client";

import { useEffect } from "react";

export default function HowItWorks() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement; // ✅ cast en HTMLElement
            const i = Number(el.dataset.index || 0);
            el.classList.add("opacity-100", "translate-y-0");
            el.style.transitionDelay = `${80 + i * 60}ms`; // ✅ corrigé
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.18 }
    );

    document.querySelectorAll(".step").forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  const steps = [
    {
      title: "Téléversez vos documents",
      text: "Glissez-déposez vos fichiers sensibles en toute sécurité.",
    },
    {
      title: "Notre IA les analyse",
      text: "Chaque donnée est vérifiée et transformée automatiquement.",
    },
    {
      title: "Recevez votre preuve",
      text: "Vous obtenez une preuve numérique infalsifiable en quelques secondes.",
    },
  ];

  return (
    <section className="relative mx-auto max-w-6xl px-4 py-20">
      <h2 className="text-center text-3xl font-bold sm:text-4xl">
        Comment ça marche ?
      </h2>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {steps.map((step, i) => (
          <div
            key={i}
            data-index={i}
            className="step opacity-0 translate-y-6 transition-all duration-700"
          >
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl backdrop-blur">
              <div className="text-emerald-400 text-lg font-semibold">
                Étape {i + 1}
              </div>
              <h3 className="mt-2 text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-slate-400">{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
