import { NextRequest, NextResponse } from "next/server";
import db from "@/config/db";
import { cookies } from "next/headers";
import { storeCookie } from "@/util/auth";
import { ClientResponseError } from "pocketbase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function POST(req: NextRequest, res: NextResponse) {
  // validate input -> auth with body request -> set cookie
  const body = await req.json();
  if (!body.identity || !body.password)
    return NextResponse.json(
      { error: true, message: "Please fill out required fields!", data: {} },
      { status: 400 }
    );

  try {
    const { token, record: model } = await db
      .collection("users")
      .authWithPassword(body.identity, body.password);
    await storeCookie(token, model);
    revalidatePath("/", "layout");
    return NextResponse.json({ token, model, error: false }, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        token: null,
        model: null,
        error: true,
        message: (error as ClientResponseError).response.message,
      },
      { status: (error as ClientResponseError).status }
    );
  }
}
