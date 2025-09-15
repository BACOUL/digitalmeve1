// lib/safe-auth.ts
// Soft wrappers pour éviter les crashes en SSG/prerender
type UseSessionResult = { data: any; status?: "authenticated" | "unauthenticated" | "loading" };

let mod: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  mod = require("next-auth/react");
} catch {
  // noop (build / prerender)
}

export const useSessionSafe: () => UseSessionResult =
  mod?.useSession ?? (() => ({ data: null, status: "unauthenticated" }));

export const signOutSafe: (args?: any) => Promise<void> | void =
  mod?.signOut ?? (async () => {});
