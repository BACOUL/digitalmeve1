import ResetConfirmClient from "./ResetConfirmClient";

export const dynamic = "force-dynamic"; // évite le SSG pour cette page (safe avec query params)
export const revalidate = 0;

type Search = { token?: string; email?: string };

export default function Page({
  searchParams,
}: {
  searchParams?: Search;
}) {
  const token =
    typeof searchParams?.token === "string" ? searchParams.token : "";
  const email =
    typeof searchParams?.email === "string"
      ? searchParams.email.toLowerCase()
      : "";

  return <ResetConfirmClient token={token} email={email} />;
}
