"use client";

import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </div>
    </SessionProvider>
  );
}
