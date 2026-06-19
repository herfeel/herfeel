import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { customerSessionCookieName, getClearCustomerSessionCookieOptions, logoutCustomer } from "@/features/account/auth-service";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get(customerSessionCookieName)?.value;

  if (token) {
    await logoutCustomer(token);
  }

  const response = NextResponse.json({ ok: true, message: "Đã đăng xuất." });
  response.cookies.set(customerSessionCookieName, "", getClearCustomerSessionCookieOptions());

  return response;
}
