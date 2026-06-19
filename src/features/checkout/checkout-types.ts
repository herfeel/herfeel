import type { CartState, MoneyAmount } from "@/features/cart/cart-types";
import type { BillingAddress, ShippingAddress } from "./address-schema";

export type MockCheckoutStatus = "idle" | "submitting" | "success";

export type CheckoutSource = "mock" | "woocommerce-store-api";

export type CheckoutStatus = "idle" | "editing" | "validating" | "ready" | "submitting" | "success" | "error";

export type ShippingRate = {
  id: string;
  label: string;
  description?: string;
  amount: MoneyAmount;
  source: CheckoutSource;
};

export type CheckoutCustomer = {
  email: string;
  acceptsMarketing?: boolean;
  acceptsSms?: boolean;
};

export type CheckoutState = {
  source: CheckoutSource;
  status: CheckoutStatus;
  cart: CartState;
  customer?: CheckoutCustomer;
  shippingAddress?: ShippingAddress;
  billingAddress?: BillingAddress;
  useShippingAsBilling: boolean;
  shippingRates: ShippingRate[];
  selectedShippingRateId?: string;
  selectedPaymentMethodId?: string;
  notes?: string;
  orderId?: string;
  error?: string;
};

export type CheckoutAction =
  | { type: "checkout/hydrate"; payload: CheckoutState }
  | { type: "checkout/set-status"; payload: CheckoutStatus }
  | { type: "checkout/set-customer"; payload: CheckoutCustomer }
  | { type: "checkout/set-shipping-address"; payload: ShippingAddress }
  | { type: "checkout/set-billing-address"; payload: BillingAddress }
  | { type: "checkout/use-shipping-as-billing"; payload: boolean }
  | { type: "checkout/set-shipping-rates"; payload: ShippingRate[] }
  | { type: "checkout/select-shipping-rate"; payload: string }
  | { type: "checkout/select-payment-method"; payload: string }
  | { type: "checkout/set-error"; payload?: string }
  | { type: "checkout/set-order-id"; payload: string };
