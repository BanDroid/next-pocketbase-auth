import { auth } from "@/util/auth";
import PageClient from "./page-client";
import { redirect } from "next/navigation";

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
