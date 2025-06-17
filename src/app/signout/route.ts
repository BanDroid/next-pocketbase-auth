import { deleteCookie } from "@/util/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function GET() {
  await deleteCookie();
  revalidatePath("/signin", "layout");
  return redirect("/signin");
}
