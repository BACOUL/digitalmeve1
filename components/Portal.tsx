// components/Portal.tsx
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [container, setContainer] = useState<Element | null>(null);

  useEffect(() => {
    setMounted(true);
    setContainer(document.body);
    return () => setMounted(false);
  }, []);

  if (!mounted || !container) return null;
  return createPortal(children, container);
}
