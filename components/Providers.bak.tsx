"use client";

import * as React from "react";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  // You can extend here later (Theme, QueryClient, etc.)
  return <SessionProvider>{children}</SessionProvider>;
}
