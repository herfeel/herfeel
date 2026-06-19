import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { customerSessionCookieName, getCurrentCustomer } from "@/features/account/auth-service";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(customerSessionCookieName)?.value;

  if (!token) {
    return NextResponse.json({ ok: false, message: "Chưa đăng nhập." }, { status: 401 });
  }

  const result = await getCurrentCustomer(token);

  return NextResponse.json(
    {
      ok: result.ok,
      message: result.message,
      user: result.user,
    },
    { status: result.status },
  );
}
