import type { CartAction, CartState } from "@/features/cart/cart-types";
import type { BillingAddress, ShippingAddress } from "@/features/checkout/address-schema";
import type { CheckoutState, ShippingRate } from "@/features/checkout/checkout-types";
import type { CouponResult } from "@/features/checkout/coupon-system";
import type { PaymentMethod } from "@/features/checkout/payment-methods";

export type CommerceClient = {
  getCart: () => Promise<CartState>;
  mutateCart: (cart: CartState, action: CartAction) => Promise<CartState>;
  applyCoupon: (cart: CartState, code: string) => Promise<CouponResult>;
  updateCustomer: (checkout: CheckoutState, addresses: { shipping: ShippingAddress; billing: BillingAddress }) => Promise<CheckoutState>;
  getShippingRates: (checkout: CheckoutState) => Promise<ShippingRate[]>;
  getPaymentMethods: (checkout: CheckoutState) => Promise<PaymentMethod[]>;
  submitMockOrder: (checkout: CheckoutState) => Promise<{ orderId: string }>;
};
