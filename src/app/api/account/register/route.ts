import { NextResponse } from "next/server";
import { customerSessionCookieName, getCustomerSessionCookieOptions, registerWordPressCustomerViaAuthApi } from "@/features/account/auth-service";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  };
  const email = body.email?.trim().toLowerCase() ?? "";
  const password = body.password ?? "";
  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const phone = body.phone?.trim();

  if (!emailPattern.test(email) || password.length < 6 || !firstName || !lastName) {
    return NextResponse.json({ ok: false, message: "Thông tin đăng ký chưa hợp lệ." }, { status: 400 });
  }

  const result = await registerWordPressCustomerViaAuthApi({ email, password, firstName, lastName, phone });
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
