import { NextResponse } from "next/server";
import { getCustomerSessionCookieOptions, customerSessionCookieName, loginWordPressCustomer } from "@/features/account/auth-service";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    email?: string;
    password?: string;
  };
  const email = body.email?.trim().toLowerCase() ?? "";
  const password = body.password ?? "";

  if (!emailPattern.test(email) || password.length < 6) {
    return NextResponse.json({ ok: false, message: "Email hoặc mật khẩu không đúng." }, { status: 400 });
  }

  const result = await loginWordPressCustomer({ email, password });
  const response = NextResponse.json(
    {
      ok: result.ok,
      message: result.message,
      user: result.user,
    },
    { status: result.status },
  );

  if (result.ok && result.token) {
    response.cookies.set(customerSessionCookieName, result.token, getCustomerSessionCookieOptions());
  }

  return response;
}
