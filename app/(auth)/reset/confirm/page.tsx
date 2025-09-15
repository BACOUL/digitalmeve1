// app/(auth)/reset/confirm/page.tsx
import ResetConfirmClient from "./ResetConfirmClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// searchParams is a Promise in Next 15 server pages
export default async function Page(props: any) {
  const sp = (await props.searchParams) as Record<string, string | string[] | undefined>;

  const token =
    typeof sp?.token === "string" ? sp.token : Array.isArray(sp?.token) ? sp?.token[0] ?? "" : "";
  const emailRaw =
    typeof sp?.email === "string" ? sp.email : Array.isArray(sp?.email) ? sp?.email[0] ?? "" : "";
  const email = emailRaw.toLowerCase();

  return <ResetConfirmClient token={token} email={email} />;
}
