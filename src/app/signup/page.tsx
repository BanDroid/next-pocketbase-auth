import PageClient from "./page-client";
import { redirect } from "next/navigation";
import { auth } from "@/util/auth";

export default async function Page() {
  const { token } = await auth();
  if (token) return redirect("/");
  return (
    <>
      <main>
        <PageClient />
      </main>
    </>
  );
}
