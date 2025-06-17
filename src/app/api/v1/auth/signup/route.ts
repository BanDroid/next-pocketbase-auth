import { NextRequest, NextResponse } from "next/server";
import createPocketbase from "@/config/db";
import { storeCookie } from "@/util/auth";
import { revalidatePath } from "next/cache";
import { ClientResponseError } from "pocketbase";

export async function POST(req: NextRequest) {
  // validate input -> create user record -> auth with new record -> set cookie
  const body = await req.json();
  if (!body.username || !body.email || !body.password || !body.passwordConfirm)
    return NextResponse.json(
      { error: true, message: "Please fill out required fields!", data: {} },
      { status: 400 }
    );

  try {
    const pocketbase = createPocketbase();
    const record = await pocketbase
      .collection("users")
      .create({ ...body, name: body.username, emailVisibility: true });
    if (record.status) {
      return NextResponse.json(
        { ...record, error: true },
        { status: record.status }
      );
    }

    const { token, record: model } = await pocketbase
      .collection("users")
      .authWithPassword(record.email, body.password);
    await storeCookie(token, model);
    revalidatePath("/", "layout");
    return NextResponse.json({ token, model, error: false }, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        token: null,
        model: null,
        error: true,
        message: (error as ClientResponseError).message,
      },
      { status: (error as ClientResponseError).status }
    );
  }
}
