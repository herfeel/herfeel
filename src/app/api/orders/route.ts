import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { customerSessionCookieName, getAccountAuthApiUrl } from "@/features/account/auth-service";
import { isValidOrderCartLine } from "@/features/cart/cart-line-builder";
import type { CartState } from "@/features/cart/cart-types";
import type { CheckoutFormValues } from "@/features/checkout/address-schema";

const wordpressRequestTimeoutMs = 10000;
const maxCartItems = 24;
const invalidCartProductMessage = "Sản phẩm trong giỏ hàng không còn hợp lệ. Vui lòng xóa và thêm lại sản phẩm.";

export const dynamic = "force-dynamic";

type CreateOrderRequest = {
  cart: CartState;
  checkout: Pick<CheckoutFormValues, "email" | "firstName" | "lastName" | "phone" | "address" | "apartment" | "city" | "state" | "zip" | "country" | "billingSame">;
  paymentMethod: "cod";
};

type CreateOrderResponse = {
  ok?: boolean;
  message?: string;
  code?: string;
  orderId?: number;
  orderNumber?: string;
};

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get(customerSessionCookieName)?.value;

  if (!token) return NextResponse.json({ ok: false, message: "Bạn cần đăng nhập để đặt hàng." }, { status: 401 });

  const body = (await request.json().catch(() => ({}))) as Partial<CreateOrderRequest>;
  if (!isCreateOrderRequest(body)) {
    return NextResponse.json({ ok: false, message: "Thông tin đơn hàng chưa hợp lệ." }, { status: 400 });
  }

  if (!body.cart.items.every(isValidOrderCartLine)) {
    return NextResponse.json({ ok: false, message: invalidCartProductMessage, code: "playah_invalid_cart_product" }, { status: 400 });
  }

  try {
    const response = await fetch(new URL("orders", withTrailingSlash(getAccountAuthApiUrl())), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(wordpressRequestTimeoutMs),
    });
    const data = (await response.json().catch(() => ({}))) as CreateOrderResponse;
    const message = data.code === "rest_no_route" ? "Plugin PlayAh Auth Bridge V2 trên WordPress chưa được cập nhật. Vui lòng cập nhật plugin rồi thử lại." : data.message;

    return NextResponse.json(
      {
        ok: response.ok && data.ok !== false,
        message: message || (response.ok ? "Đã tạo đơn hàng." : "Không thể tạo đơn."),
        orderId: data.orderId,
        orderNumber: data.orderNumber,
        code: data.code,
      },
      { status: response.status },
    );
  } catch {
    return NextResponse.json({ ok: false, message: "Không thể tạo đơn. Vui lòng thử lại sau.", code: "playah_wordpress_orders_unavailable" }, { status: 502 });
  }
}

function isCreateOrderRequest(value: Partial<CreateOrderRequest>): value is CreateOrderRequest {
  return value.paymentMethod === "cod" && isCartStateLike(value.cart) && isCheckoutLike(value.checkout);
}

function isCartStateLike(value: unknown): value is CartState {
  if (!value || typeof value !== "object") return false;

  const cart = value as Partial<CartState>;
  if (!Array.isArray(cart.items) || cart.items.length < 1 || cart.items.length > maxCartItems) return false;
  if (!Array.isArray(cart.coupons)) return false;
  if (!cart.totals || typeof cart.totals !== "object") return false;

  return cart.items.every((item) => {
    if (!item || typeof item !== "object") return false;
    const line = item as Partial<CartState["items"][number]>;
    return typeof line.productId === "string" && typeof line.name === "string" && Number.isInteger(line.quantity) && (line.quantity ?? 0) > 0;
  });
}

function isCheckoutLike(value: unknown): value is CreateOrderRequest["checkout"] {
  if (!value || typeof value !== "object") return false;
  const checkout = value as Partial<CreateOrderRequest["checkout"]>;
  return [checkout.email, checkout.firstName, checkout.lastName, checkout.phone, checkout.address, checkout.city, checkout.state, checkout.country].every((field) => typeof field === "string" && field.trim().length > 0);
}

function withTrailingSlash(value: string) {
  return value.endsWith("/") ? value : `${value}/`;
}
