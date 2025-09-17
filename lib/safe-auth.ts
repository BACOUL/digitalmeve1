// NO-OP client-safe stubs to avoid SSR/SSG crashes
// If you later wire next-auth, you can replace these with real imports.

export type SafeSessionResult = { data?: any };

export function useSessionSafe(): SafeSessionResult {
  // Always return an object so `const { data } = useSessionSafe()` never crashes
  return { data: undefined };
}

export async function signOutSafe(_opts?: any): Promise<void> {
  // No-op stub
  return;
}
