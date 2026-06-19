export type CartSource = "mock" | "woocommerce-store-api";

export type MoneyAmount = {
  value: number;
  currency: string;
};

export type CartLineItem = {
  key: string;
  productId: string;
  variationId?: string;
  sku?: string;
  name: string;
  variantLabel?: string;
  quantity: number;
  unitPrice: MoneyAmount;
  lineSubtotal: MoneyAmount;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  attributes?: Array<{
    name: string;
    value: string;
  }>;
  wooCartItemKey?: string;
};

export type AppliedCoupon = {
  code: string;
  label: string;
  amount: MoneyAmount;
  source: CartSource;
};

export type CartTotals = {
  subtotal: MoneyAmount;
  discountTotal: MoneyAmount;
  shippingTotal: MoneyAmount;
  taxTotal: MoneyAmount;
  total: MoneyAmount;
};

export type CartState = {
  source: CartSource;
  cartToken?: string;
  customerId?: string;
  items: CartLineItem[];
  coupons: AppliedCoupon[];
  totals: CartTotals;
  isLoading: boolean;
  error?: string;
  updatedAt?: string;
};

export type CartAction =
  | { type: "cart/hydrate"; payload: CartState }
  | { type: "cart/add-item"; payload: CartLineItem }
  | { type: "cart/update-quantity"; payload: { key: string; quantity: number } }
  | { type: "cart/remove-item"; payload: { key: string } }
  | { type: "cart/apply-coupon"; payload: AppliedCoupon }
  | { type: "cart/remove-coupon"; payload: { code: string } }
  | { type: "cart/set-loading"; payload: boolean }
  | { type: "cart/set-error"; payload?: string };

export type CartItem = CartLineItem;
