import { commerceConfig } from "@/config/commerce";
import { isValidOrderCartLine } from "./cart-line-builder";
import type { AppliedCoupon, CartItem, CartLineItem, CartState, CartTotals } from "./cart-types";

const maxSyncedCartItems = 24;

export function getCartItemCount(items: CartItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}

export function mergeCartLineItem(items: CartLineItem[], incoming: CartLineItem): CartLineItem[] {
  const existing = items.find((item) => item.key === incoming.key);

  if (!existing) return [...items, incoming];

  return items.map((item) => {
    if (item.key !== incoming.key) return item;
    const quantity = item.quantity + incoming.quantity;
    return {
      ...item,
      quantity,
      lineSubtotal: {
        ...item.lineSubtotal,
        value: item.unitPrice.value * quantity,
      },
    };
  });
}

export function calculateCartTotals(items: CartLineItem[], coupons: AppliedCoupon[], currency: string): CartTotals {
  const subtotal = items.reduce((total, item) => total + item.unitPrice.value * item.quantity, 0);
  const discountTotal = coupons.reduce((total, coupon) => total + coupon.amount.value, 0);
  const shippingTotal = 0;
  const taxTotal = 0;
  const total = Math.max(subtotal - discountTotal + shippingTotal + taxTotal, 0);

  return {
    subtotal: { value: subtotal, currency },
    discountTotal: { value: discountTotal, currency },
    shippingTotal: { value: shippingTotal, currency },
    taxTotal: { value: taxTotal, currency },
    total: { value: total, currency },
  };
}

export function mergeAccountCartStates(localCart: CartState, savedCart: CartState | null): CartState {
  const validLocalCart = clampCartState(localCart);
  const validSavedCart = savedCart ? clampCartState(savedCart) : null;

  if (!validSavedCart) return withSyncedTotals(validLocalCart);

  const localItemsByKey = new Map(validLocalCart.items.map((item) => [item.key, item]));
  const savedItemsByKey = new Map(validSavedCart.items.map((item) => [item.key, item]));
  const mergedItems: CartLineItem[] = [];

  for (const savedItem of validSavedCart.items) {
    const localItem = localItemsByKey.get(savedItem.key);
    mergedItems.push({
      ...(localItem ?? savedItem),
      quantity: clampLineQuantity((localItem ?? savedItem).quantity),
    });
  }

  for (const localItem of validLocalCart.items) {
    if (!savedItemsByKey.has(localItem.key) && mergedItems.length < maxSyncedCartItems) {
      mergedItems.push({ ...localItem, quantity: clampLineQuantity(localItem.quantity) });
    }
  }

  return withSyncedTotals({
    ...validLocalCart,
    items: mergedItems.slice(0, maxSyncedCartItems).map(withLineSubtotal),
    coupons: localCart.coupons,
    isLoading: false,
    error: undefined,
  });
}

export function clampCartState(cart: CartState): CartState {
  return withSyncedTotals({
    ...cart,
    items: cart.items
      .filter(isValidOrderCartLine)
      .slice(0, maxSyncedCartItems)
      .map((item) => withLineSubtotal({ ...item, quantity: clampLineQuantity(item.quantity) })),
    isLoading: false,
    error: undefined,
  });
}

function withSyncedTotals(cart: CartState): CartState {
  const currency = cart.totals?.total.currency || commerceConfig.currency;

  return {
    ...cart,
    totals: calculateCartTotals(cart.items, cart.coupons, currency),
    updatedAt: new Date().toISOString(),
  };
}

function withLineSubtotal(item: CartLineItem): CartLineItem {
  return {
    ...item,
    lineSubtotal: {
      ...item.lineSubtotal,
      value: item.unitPrice.value * item.quantity,
    },
  };
}

function clampLineQuantity(quantity: number) {
  return Math.max(1, Math.min(maxSyncedCartItems, Math.trunc(quantity)));
}
