// extrait à mettre dans login/page.tsx
import { useSearchParams } from "next/navigation";
// ...
const sp = useSearchParams();
const error = sp.get("error");
const showVerify = error === "EMAIL_NOT_VERIFIED";
// ...
{showVerify && (
  <p className="mt-2 rounded-lg bg-amber-500/10 p-2 text-sm text-amber-200">
    Please verify your email first. Check your inbox or <a href="/verify-email" className="underline">resend the link</a>.
  </p>
)}
