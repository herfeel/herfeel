import { commerceConfig } from "@/config/commerce";
import { isValidOrderCartLine } from "./cart-line-builder";
import type { CartAction, CartLineItem, CartState } from "./cart-types";
import { calculateCartTotals, mergeCartLineItem } from "./cart-utils";

export const initialCartState: CartState = {
  source: "mock",
  items: [],
  coupons: [],
  totals: {
    subtotal: { value: 0, currency: commerceConfig.currency },
    discountTotal: { value: 0, currency: commerceConfig.currency },
    shippingTotal: { value: 0, currency: commerceConfig.currency },
    taxTotal: { value: 0, currency: commerceConfig.currency },
    total: { value: 0, currency: commerceConfig.currency },
  },
  isLoading: false,
};

function withTotals(state: CartState): CartState {
  return {
    ...state,
    totals: calculateCartTotals(state.items, state.coupons, commerceConfig.currency),
    updatedAt: new Date().toISOString(),
  };
}

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "cart/hydrate":
      return action.payload;
    case "cart/add-item":
      if (!isValidOrderCartLine(action.payload) || action.payload.unitPrice.value <= 0) return { ...state, error: "Sản phẩm trong giỏ hàng không còn hợp lệ. Vui lòng xóa và thêm lại sản phẩm." };
      return withTotals({ ...state, items: mergeCartLineItem(state.items, action.payload), error: undefined });
    case "cart/update-quantity":
      return withTotals({
        ...state,
        items: state.items
          .map((item) => (item.key === action.payload.key ? updateLineQuantity(item, action.payload.quantity) : item))
          .filter((item) => item.quantity > 0),
      });
    case "cart/remove-item":
      return withTotals({ ...state, items: state.items.filter((item) => item.key !== action.payload.key) });
    case "cart/apply-coupon":
      return withTotals({
        ...state,
        coupons: [...state.coupons.filter((coupon) => coupon.code.toLowerCase() !== action.payload.code.toLowerCase()), action.payload],
      });
    case "cart/remove-coupon":
      return withTotals({ ...state, coupons: state.coupons.filter((coupon) => coupon.code.toLowerCase() !== action.payload.code.toLowerCase()) });
    case "cart/set-loading":
      return { ...state, isLoading: action.payload };
    case "cart/set-error":
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
}

function updateLineQuantity(item: CartLineItem, quantity: number): CartLineItem {
  return {
    ...item,
    quantity,
    lineSubtotal: {
      ...item.lineSubtotal,
      value: item.unitPrice.value * quantity,
    },
  };
}
