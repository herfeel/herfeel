import { commerceConfig } from "@/config/commerce";
import { mockProducts } from "@/data/mock/products";
import type { CartLineItem, CartState } from "@/features/cart/cart-types";

const productsById = new Map(mockProducts.map((product) => [product.id, product]));

export const mockCheckoutMainProduct = productsById.get("prod-playah-air") ?? mockProducts[0];
export const mockCheckoutGelProduct = productsById.get("prod-playah-smooth") ?? mockProducts[1];
export const mockCheckoutComboProduct = productsById.get("prod-playah-starter") ?? mockProducts[3];

export const mockCheckoutLineItems: CartLineItem[] = [
  {
    key: "mock-air-10-pack",
    productId: mockCheckoutMainProduct.id,
    variationId: mockCheckoutMainProduct.variants[0]?.id,
    name: "Bao cao su Herfeel Air",
    variantLabel: "Hộp 10 cái",
    quantity: 1,
    unitPrice: { value: mockCheckoutMainProduct.price, currency: commerceConfig.currency },
    lineSubtotal: { value: mockCheckoutMainProduct.price, currency: commerceConfig.currency },
    image: mockCheckoutMainProduct.thumbnail,
    attributes: [{ name: "Quy cách", value: "Hộp 10 cái" }],
  },
];

export const mockCheckoutCart: CartState = {
  source: "mock",
  items: mockCheckoutLineItems,
  coupons: [],
  totals: {
    subtotal: { value: mockCheckoutMainProduct.price, currency: commerceConfig.currency },
    discountTotal: { value: 0, currency: commerceConfig.currency },
    shippingTotal: { value: 0, currency: commerceConfig.currency },
    taxTotal: { value: 0, currency: commerceConfig.currency },
    total: { value: mockCheckoutMainProduct.price, currency: commerceConfig.currency },
  },
  isLoading: false,
};

export const mockCheckoutUpsells = [
  { product: mockCheckoutGelProduct, title: "Gel HA", option: "100 ml", price: mockCheckoutGelProduct.price },
  { product: mockCheckoutComboProduct, title: "Combo", option: "Gói khởi đầu", price: mockCheckoutComboProduct.price },
];
