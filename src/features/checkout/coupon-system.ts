import { commerceConfig } from "@/config/commerce";
import type { AppliedCoupon, CartState } from "@/features/cart/cart-types";

export type CouponKind = "fixed-cart" | "percent" | "free-shipping";

export type CouponDefinition = {
  code: string;
  label: string;
  kind: CouponKind;
  amount: number;
  minimumSubtotal?: number;
  active: boolean;
};

export type CouponResult =
  | { ok: true; coupon: AppliedCoupon }
  | { ok: false; reason: "not-found" | "inactive" | "minimum-not-met" | "already-applied" };

export const mockCoupons: CouponDefinition[] = [
  { code: "HERFEEL10", label: "10% off mock coupon", kind: "percent", amount: 10, minimumSubtotal: 100000, active: true },
  { code: "KINDAO", label: "Discreet shipping perk", kind: "fixed-cart", amount: 30000, minimumSubtotal: 200000, active: true },
  { code: "DRAFTONLY", label: "Inactive test coupon", kind: "fixed-cart", amount: 50000, active: false },
];

export function validateCoupon(code: string, cart: CartState, coupons = mockCoupons): CouponResult {
  const normalizedCode = code.trim().toUpperCase();
  const definition = coupons.find((coupon) => coupon.code === normalizedCode);

  if (!definition) return { ok: false, reason: "not-found" };
  if (!definition.active) return { ok: false, reason: "inactive" };
  if (cart.coupons.some((coupon) => coupon.code === normalizedCode)) return { ok: false, reason: "already-applied" };
  if (definition.minimumSubtotal && cart.totals.subtotal.value < definition.minimumSubtotal) return { ok: false, reason: "minimum-not-met" };

  const amount = definition.kind === "percent" ? Math.round((cart.totals.subtotal.value * definition.amount) / 100) : definition.amount;

  return {
    ok: true,
    coupon: {
      code: normalizedCode,
      label: definition.label,
      amount: { value: amount, currency: commerceConfig.currency },
      source: "mock",
    },
  };
}
