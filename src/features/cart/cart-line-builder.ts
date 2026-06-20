import type { Product, ProductVariant } from "@/features/products/product-types";
import type { CartLineItem } from "./cart-types";

export function isPositiveIntegerString(value: unknown): value is string {
  return typeof value === "string" && /^[1-9]\d*$/.test(value);
}

export function isProductOrderable(product: Product) {
  return isPositiveIntegerString(product.id) && product.inStock && product.purchasable === true && product.price > 0;
}

export function buildCartLineItem(product: Product, options: { variant?: ProductVariant; quantity?: number } = {}): CartLineItem | null {
  if (!isProductOrderable(product)) return null;

  const variant = options.variant;
  const variationId = isPositiveIntegerString(variant?.id) ? variant.id : undefined;
  const quantity = Math.max(1, Math.trunc(options.quantity ?? variant?.defaultQuantity ?? 1));
  const unitPrice = variant?.price && variant.price > 0 ? variant.price : product.price;
  const image = variant?.image ?? product.thumbnail;

  if (unitPrice <= 0) return null;

  return {
    key: variationId ? `${product.id}:${variationId}` : product.id,
    productId: product.id,
    variationId,
    sku: product.sku,
    name: product.name,
    variantLabel: variant?.label,
    quantity,
    unitPrice: { value: unitPrice, currency: product.currency },
    lineSubtotal: { value: unitPrice * quantity, currency: product.currency },
    image: image ? { src: image.src, alt: image.alt, width: image.width, height: image.height } : undefined,
    attributes: product.specs.slice(0, 3).map((spec) => ({ name: spec.label, value: spec.value })),
  };
}

export function isValidOrderCartLine(line: Pick<CartLineItem, "productId" | "variationId" | "quantity">) {
  return isPositiveIntegerString(line.productId) && (!line.variationId || isPositiveIntegerString(line.variationId)) && Number.isInteger(line.quantity) && line.quantity > 0;
}
