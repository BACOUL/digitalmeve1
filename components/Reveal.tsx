// components/Reveal.tsx
"use client";

import { useEffect, useRef } from "react";

type Props = {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  delay?: number; // ms
  children: React.ReactNode;
};

export default function Reveal({ as: Tag = "div", className, delay = 0, children }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current as HTMLElement | null;
    if (!el) return;

    el.setAttribute("data-reveal", "");
    if (delay) el.style.transitionDelay = `${delay}ms`;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("is-revealed");
            io.unobserve(el);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  // @ts-expect-error: dynamic tag
  return <Tag ref={ref} className={className}>{children}</Tag>;
}
