// app/debug/sentry/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Debug Sentry",
};

export default function SentryDebugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
