// components/Providers.tsx
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  // Ajoute ici tes providers globaux (SessionProvider, Theme, Query, etc.)
  return <>{children}</>;
}
