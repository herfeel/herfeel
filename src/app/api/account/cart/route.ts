import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { customerSessionCookieName, getAccountAuthApiUrl } from "@/features/account/auth-service";
import type { CartState } from "@/features/cart/cart-types";

const wordpressRequestTimeoutMs = 8000;
const maxCartItems = 24;

export const dynamic = "force-dynamic";

type WordPressCartResponse = {
  ok?: boolean;
  cart?: CartState | null;
  code?: string;
  message?: string;
};

export async function GET() {
  const token = await getSessionToken();
  if (!token) return unauthenticatedResponse();

  const result = await callWordPressCart("GET", token);

  return NextResponse.json({ ok: result.ok, cart: result.cart ?? null, code: result.code, message: result.message }, { status: result.status });
}

export async function PUT(request: Request) {
  const token = await getSessionToken();
  if (!token) return unauthenticatedResponse();

  const body = (await request.json().catch(() => ({}))) as { cart?: unknown };
  if (!isCartStateLike(body.cart)) {
    return NextResponse.json({ ok: false, message: "Giỏ hàng chưa hợp lệ." }, { status: 400 });
  }

  const result = await callWordPressCart("PUT", token, { cart: body.cart });

  return NextResponse.json({ ok: result.ok, cart: result.cart ?? null, code: result.code, message: result.message }, { status: result.status });
}

async function getSessionToken() {
  const cookieStore = await cookies();
  return cookieStore.get(customerSessionCookieName)?.value;
}

function unauthenticatedResponse() {
  return NextResponse.json({ ok: false, message: "Chưa đăng nhập." }, { status: 401 });
}

async function callWordPressCart(method: "GET" | "PUT", token: string, body?: { cart: CartState }) {
  try {
    const response = await fetch(new URL("cart", withTrailingSlash(getAccountAuthApiUrl())), {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
      signal: AbortSignal.timeout(wordpressRequestTimeoutMs),
    });
    const data = (await response.json().catch(() => ({}))) as WordPressCartResponse;
    const message = data.code === "rest_no_route" ? "WordPress auth bridge chưa có cart endpoint. Cần cập nhật plugin PlayAh Auth Bridge." : data.message;

    return {
      ok: response.ok && data.ok !== false,
      status: response.status,
      cart: data.cart ?? null,
      code: data.code,
      message,
    };
  } catch {
    return {
      ok: false,
      status: 502,
      cart: null,
      code: "playah_wordpress_cart_unavailable",
      message: "Không kết nối được WordPress cart endpoint.",
    };
  }
}

function isCartStateLike(value: unknown): value is CartState {
  if (!value || typeof value !== "object") return false;

  const cart = value as Partial<CartState>;
  if (!Array.isArray(cart.items) || cart.items.length > maxCartItems) return false;
  if (!Array.isArray(cart.coupons)) return false;
  if (!cart.totals || typeof cart.totals !== "object") return false;

  return cart.items.every((item) => {
    if (!item || typeof item !== "object") return false;

    const line = item as Partial<CartState["items"][number]>;
    const quantity = line.quantity;

    return typeof line.key === "string" && typeof line.productId === "string" && typeof line.name === "string" && typeof quantity === "number" && Number.isInteger(quantity) && quantity > 0;
  });
}

function withTrailingSlash(value: string) {
  return value.endsWith("/") ? value : `${value}/`;
}
