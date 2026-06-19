import { initialCartState } from "@/features/cart/cart-store";
import type { CheckoutAction, CheckoutState } from "./checkout-types";

export const initialCheckoutState: CheckoutState = {
  source: "mock",
  status: "idle",
  cart: initialCartState,
  useShippingAsBilling: true,
  shippingRates: [],
};

export function checkoutReducer(state: CheckoutState, action: CheckoutAction): CheckoutState {
  switch (action.type) {
    case "checkout/hydrate":
      return action.payload;
    case "checkout/set-status":
      return { ...state, status: action.payload };
    case "checkout/set-customer":
      return { ...state, customer: action.payload, status: "editing" };
    case "checkout/set-shipping-address":
      return {
        ...state,
        shippingAddress: action.payload,
        billingAddress: state.useShippingAsBilling ? { ...action.payload, email: state.customer?.email ?? "" } : state.billingAddress,
        status: "editing",
      };
    case "checkout/set-billing-address":
      return { ...state, billingAddress: action.payload, useShippingAsBilling: false, status: "editing" };
    case "checkout/use-shipping-as-billing":
      return { ...state, useShippingAsBilling: action.payload };
    case "checkout/set-shipping-rates":
      return { ...state, shippingRates: action.payload };
    case "checkout/select-shipping-rate":
      return { ...state, selectedShippingRateId: action.payload };
    case "checkout/select-payment-method":
      return { ...state, selectedPaymentMethodId: action.payload };
    case "checkout/set-error":
      return { ...state, error: action.payload, status: action.payload ? "error" : state.status };
    case "checkout/set-order-id":
      return { ...state, orderId: action.payload, status: "success" };
    default:
      return state;
  }
}
