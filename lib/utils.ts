// utilitaire simple pour concaténer des classes conditionnelles
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
