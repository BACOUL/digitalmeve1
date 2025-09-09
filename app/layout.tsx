import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "DigitalMeve — The .MEVE Standard",
  description:
    "Portable proof of existence, integrity (SHA-256) and authenticity for any file. Privacy-first.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-[#0B1220] text-white antialiased">
        {/* décor très léger */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute -top-40 -left-40 h-[34rem] w-[34rem] rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(closest-side, #22D3EE, transparent 70%)" }}
          />
          <div
            className="absolute -bottom-40 -right-40 h-[34rem] w-[34rem] rounded-full opacity-10 blur-3xl"
            style={{ background: "radial-gradient(closest-side, #20C997, transparent 70%)" }}
          />
        </div>

        <Header />

        {/* marge pour passer sous le header */}
        <div className="pt-28 md:pt-32">{children}</div>
      </body>
    </html>
  );
}
