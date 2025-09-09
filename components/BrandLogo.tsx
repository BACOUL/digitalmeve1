// components/BrandLogo.tsx
'use client';

export default function BrandLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-dm-emerald to-dm-sky shadow-glow" />
      <span className="font-semibold tracking-tight">
        Digital<span className="text-dm-accent">Meve</span>
      </span>
    </div>
  );
}
