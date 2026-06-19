import type { CheckoutState } from "./checkout-types";

export type PaymentProvider = "mock-cod" | "woocommerce-gateway";

export type PaymentMethodAvailability = "available" | "disabled" | "external";

export type PaymentMethod = {
  id: string;
  provider: PaymentProvider;
  label: string;
  availability: PaymentMethodAvailability;
  express: boolean;
  submitLabel?: string;
  gatewayId?: string;
};

export type PaymentMethodAdapter = {
  method: PaymentMethod;
  canUse: (checkout: CheckoutState) => boolean;
  prepare: (checkout: CheckoutState) => Promise<CheckoutState> | CheckoutState;
};

export const mockPaymentMethods: PaymentMethod[] = [
  { id: "mock-cod", provider: "mock-cod", label: "Thanh toán khi nhận hàng (COD)", availability: "available", express: false, submitLabel: "Đặt hàng COD", gatewayId: "mock_cod" },
];

export const mockPaymentAdapters: PaymentMethodAdapter[] = mockPaymentMethods.map((method) => ({
  method,
  canUse: () => method.availability !== "disabled",
  prepare: (checkout) => ({ ...checkout, selectedPaymentMethodId: method.id }),
}));
