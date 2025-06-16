import { deleteCookie } from "@/util/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  await deleteCookie();
  revalidatePath("/signin", "layout");
  return redirect("/signin");
}
