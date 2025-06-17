import createPocketbase from "@/config/db";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { isTokenExpired, RecordModel } from "pocketbase";

const auth_cookie_key = "pb_auth";

export async function middlewareAuth(req: NextRequest) {
  const cookie = req.cookies.get(auth_cookie_key);
  let token: string | null = cookie?.value
    ? JSON.parse(cookie.value).token
    : null;
  let model = null;
  let isAuthenticated = false;
  if (token && !isTokenExpired(token)) {
    const { token: newToken, record } = await createPocketbase()
      .collection("users")
      .authRefresh({ headers: { Authorization: token } });
    storeCookie(newToken, record);
    isAuthenticated = true;
    token = newToken;
    model = record;
  } else if (token && isTokenExpired(token)) {
    await deleteCookie();
  }
  return { isAuthenticated, token, model };
}

export async function auth() {
  const cookie = await cookies();
  const data: { token: string; model: RecordModel } | null = cookie.get(
    auth_cookie_key
  )
    ? JSON.parse(cookie.get(auth_cookie_key)!.value)
    : null;

  if (data == null || isTokenExpired(data.token))
    return { token: null, model: null };
  return data;
}

export async function storeCookie(token: string, model: RecordModel) {
  const cookieString = JSON.stringify({
    token,
    model,
  });
  const cookie = await cookies();
  cookie.set(auth_cookie_key, cookieString, {
    secure: true,
    path: "/",
    sameSite: "strict",
    httpOnly: true,
  });
}

export async function deleteCookie() {
  const cookie = await cookies();
  cookie.delete(auth_cookie_key);
}
