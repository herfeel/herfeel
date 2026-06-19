import { commerceConfig } from "@/config/commerce";
import { cartReducer, initialCartState } from "@/features/cart/cart-store";
import type { CartState } from "@/features/cart/cart-types";
import { validateCoupon } from "@/features/checkout/coupon-system";
import { mockPaymentMethods } from "@/features/checkout/payment-methods";
import type { CommerceClient } from "./commerce-client";

let mockCart: CartState = initialCartState;

export const mockCommerceClient: CommerceClient = {
  async getCart() {
    return mockCart;
  },
  async mutateCart(cart, action) {
    mockCart = cartReducer(cart, action);
    return mockCart;
  },
  async applyCoupon(cart, code) {
    return validateCoupon(code, cart);
  },
  async updateCustomer(checkout, addresses) {
    return {
      ...checkout,
      shippingAddress: addresses.shipping,
      billingAddress: addresses.billing,
      status: "ready",
    };
  },
  async getShippingRates() {
    return [
      {
        id: "mock-standard",
        label: "Standard discreet delivery",
        description: "Mock shipping method; WooCommerce rates plug in here later.",
        amount: { value: 0, currency: commerceConfig.currency },
        source: "mock",
      },
    ];
  },
  async getPaymentMethods() {
    return mockPaymentMethods;
  },
  async submitMockOrder() {
    return { orderId: `MOCK-${Date.now()}` };
  },
};
