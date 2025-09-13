"use client";

import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  // Aucun param obligatoire : NextAuth gère le fetch de session côté client
  return <SessionProvider>{children}</SessionProvider>;
}
