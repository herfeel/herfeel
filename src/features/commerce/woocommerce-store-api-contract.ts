import type { CartState } from "@/features/cart/cart-types";
import type { CheckoutState } from "@/features/checkout/checkout-types";

export type WooStoreApiCartResponse = unknown;
export type WooStoreApiCheckoutResponse = unknown;

export type WooStoreApiAdapter = {
  cartFromStoreApi: (response: WooStoreApiCartResponse) => CartState;
  checkoutFromStoreApi: (response: WooStoreApiCheckoutResponse, current: CheckoutState) => CheckoutState;
};

export const wooStoreApiEndpoints = {
  cart: "/wp-json/wc/store/v1/cart",
  coupons: "/wp-json/wc/store/v1/cart/apply-coupon",
  removeCoupon: "/wp-json/wc/store/v1/cart/remove-coupon",
  checkout: "/wp-json/wc/store/v1/checkout",
} as const;
