function percentile(values: Array<number | undefined>, p: number): number | null {
  // 1) Ne garder que des nombres valides
  const numbers = values.filter(
    (v): v is number => typeof v === "number" && Number.isFinite(v)
  );
  if (numbers.length === 0) return null;

  // 2) Trier ascendant
  const sorted = numbers.slice().sort((a, b) => a - b);

  // 3) Calcul d’index borné [0 .. length-1]
  const idx = Math.min(
    sorted.length - 1,
    Math.max(0, Math.ceil((p / 100) * sorted.length) - 1)
  );

  // 4) Retourne un nombre arrondi
  return Math.round(sorted[idx]!);
}
