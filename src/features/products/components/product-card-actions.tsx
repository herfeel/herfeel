"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart } from "@/features/cart/cart-provider";
import type { CartLineItem } from "@/features/cart/cart-types";
import type { Product } from "@/features/products/product-types";

type ProductCardActionsProps = {
  product: Product;
  className?: string;
};

export function ProductCardActions({ product, className }: ProductCardActionsProps) {
  const router = useRouter();
  const { dispatch } = useCart();
  const [added, setAdded] = useState(false);
  const canAddToCart = product.inStock && product.purchasable !== false;

  function addToCart() {
    if (!canAddToCart) return false;

    const variant = product.variants[0];
    const unitPrice = variant?.price ?? product.price;
    const image = variant?.image ?? product.thumbnail;
    const lineItem: CartLineItem = {
      key: variant ? `${product.id}:${variant.id}` : product.id,
      productId: product.id,
      variationId: variant?.id,
      sku: product.sku,
      name: product.name,
      variantLabel: variant?.label,
      quantity: 1,
      unitPrice: { value: unitPrice, currency: product.currency },
      lineSubtotal: { value: unitPrice, currency: product.currency },
      image: image ? { src: image.src, alt: image.alt, width: image.width, height: image.height } : undefined,
      attributes: product.specs.slice(0, 3).map((spec) => ({ name: spec.label, value: spec.value })),
    };

    dispatch({ type: "cart/add-item", payload: lineItem });
    setAdded(true);
    return true;
  }

  function handleBuyNow() {
    if (addToCart()) router.push("/cart");
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-1.5">
        <Button type="button" className="!h-9 !min-h-9 !px-2.5 !py-0 !text-[11px] !leading-none md:!h-10 md:!min-h-10 md:!px-3 md:!text-xs" disabled={!canAddToCart} onClick={handleBuyNow}>
          {canAddToCart ? "Mua ngay" : "Hết hàng"}
        </Button>
        <Button type="button" className="!h-9 !min-h-9 !px-2.5 !py-0 !text-[11px] !leading-none md:!h-10 md:!min-h-10 md:!px-3 md:!text-xs" disabled={!canAddToCart} onClick={addToCart}>
          Thêm vào giỏ
        </Button>
      </div>
      <p className="mt-1 min-h-3 text-[9px] font-medium leading-tight text-[var(--color-green)]" aria-live="polite">
        {added ? "Đã thêm vào giỏ" : ""}
      </p>
    </div>
  );
}
