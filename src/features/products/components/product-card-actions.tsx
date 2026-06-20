"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { buildCartLineItem, isProductOrderable } from "@/features/cart/cart-line-builder";
import { useCart } from "@/features/cart/cart-provider";
import type { Product } from "@/features/products/product-types";

type ProductCardActionsProps = {
  product: Product;
  className?: string;
};

export function ProductCardActions({ product, className }: ProductCardActionsProps) {
  const router = useRouter();
  const { dispatch } = useCart();
  const [added, setAdded] = useState(false);
  const canAddToCart = isProductOrderable(product);
  const productHref = `/products/${product.slug}`;

  function addToCart() {
    if (!canAddToCart) return false;

    const lineItem = buildCartLineItem(product, { variant: product.variants[0], quantity: 1 });
    if (!lineItem) return false;

    dispatch({ type: "cart/add-item", payload: lineItem });
    setAdded(true);
    return true;
  }

  function handleBuyNow() {
    if (addToCart()) router.push("/cart");
  }

  return (
    <div className={className}>
      {canAddToCart ? (
        <div className="grid grid-cols-2 gap-1.5">
          <Button type="button" className="!h-9 !min-h-9 !px-2.5 !py-0 !text-[11px] !leading-none md:!h-10 md:!min-h-10 md:!px-3 md:!text-xs" onClick={handleBuyNow}>
            Mua ngay
          </Button>
          <Button type="button" className="!h-9 !min-h-9 !px-2.5 !py-0 !text-[11px] !leading-none md:!h-10 md:!min-h-10 md:!px-3 md:!text-xs" onClick={addToCart}>
            Thêm vào giỏ
          </Button>
        </div>
      ) : (
        <Button href={productHref} className="!h-9 !min-h-9 w-full !px-2.5 !py-0 !text-[11px] !font-bold !leading-none md:!h-10 md:!min-h-10 md:!px-3 md:!text-xs">
          Xem chi tiết
        </Button>
      )}
      <p className="mt-1 min-h-3 text-[9px] font-medium leading-tight text-[var(--color-green)]" aria-live="polite">
        {added ? "Đã thêm vào giỏ" : ""}
      </p>
    </div>
  );
}
