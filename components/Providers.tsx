"use client";

import * as React from "react";

// Si tu utilises next-auth plus tard :
// import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Si tu n'as pas encore SessionProvider, renvoie juste les children.
  // Quand tu brancheras next-auth, remplace par :
  // return <SessionProvider>{children}</SessionProvider>;
  return <>{children}</>;
}
