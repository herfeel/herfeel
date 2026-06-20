"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { buildCartLineItem, isProductOrderable } from "@/features/cart/cart-line-builder";
import { useCart } from "@/features/cart/cart-provider";
import type { ProductDetail } from "@/features/products/product-types";
import { formatPrice } from "@/lib/format-price";

type ProductPurchasePanelProps = {
  product: ProductDetail;
};

export function ProductPurchasePanel({ product }: ProductPurchasePanelProps) {
  const { dispatch } = useCart();
  const defaultVariant = product.variants[0];
  const [selectedVariantId, setSelectedVariantId] = useState(defaultVariant?.id ?? "");
  const [quantity, setQuantity] = useState(defaultVariant?.defaultQuantity || 1);
  const [added, setAdded] = useState(false);
  const selectedVariant = useMemo(
    () => product.variants.find((variant) => variant.id === selectedVariantId) ?? defaultVariant,
    [defaultVariant, product.variants, selectedVariantId],
  );
  const unitPrice = selectedVariant?.price ?? product.price;
  const totalPrice = unitPrice * quantity;
  const canAddToCart = isProductOrderable(product);

  function handleAddToCart() {
    if (!canAddToCart) return;

    const lineItem = buildCartLineItem(product, { variant: selectedVariant, quantity });
    if (!lineItem) return;

    dispatch({ type: "cart/add-item", payload: lineItem });
    setAdded(true);
  }

  return (
    <aside className="lg:sticky lg:top-[96px]">
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 text-[12px] font-semibold text-[var(--color-green)]">
            <span aria-hidden="true">★★★★★</span>
            <span className="text-[var(--color-muted)]">{product.reviewCount} đánh giá</span>
          </div>
          <h1 className="mt-2 text-[31px] font-semibold leading-[1.03] md:text-[34px] xl:text-[36px]">{product.name}</h1>
          <p className="mt-2 text-[14px] leading-snug text-[var(--color-ink)]/78">{product.shortDescription}</p>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-[13px] font-semibold">Chọn quy cách</h2>
            <span className="text-xs text-[var(--color-muted)]">Chọn 1 lựa chọn</span>
          </div>
          <div className="space-y-1.5" role="radiogroup" aria-label="Chọn quy cách sản phẩm">
            {product.variants.map((variant) => {
              const selected = variant.id === selectedVariant?.id;
              return (
                <label key={variant.id} className="grid min-h-[58px] cursor-pointer grid-cols-[42px_1fr_30px] items-center gap-2.5 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white px-2.5 py-2 transition-colors hover:bg-[var(--color-surface)] has-[:checked]:border-[var(--color-green)] has-[:checked]:bg-[var(--color-green-soft)]/45">
                  <span className="relative h-[42px] w-[42px] overflow-hidden rounded-full bg-[var(--color-surface)]">
                    {variant.image ? <Image src={variant.image.src} alt={variant.image.alt} width={variant.image.width} height={variant.image.height} sizes="42px" className="h-full w-full object-contain p-1.5" /> : null}
                  </span>
                  <span>
                    <span className="flex flex-wrap items-center gap-1.5 text-[13px] font-semibold leading-tight">
                      {variant.label}
                      {variant.badge ? <span className="rounded-[var(--radius-pill)] bg-[var(--color-warning-soft)] px-1.5 py-0.5 text-[9px] uppercase leading-none">{variant.badge}</span> : null}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-[var(--color-muted)]">{formatPrice(variant.price, product.currency)}</span>
                  </span>
                  <span className="grid h-[30px] w-[30px] place-items-center rounded-full bg-[var(--color-ink)] text-xs font-semibold text-white">
                    {selected ? quantity : "+"}
                  </span>
                  <input className="sr-only" type="radio" name="variant" checked={selected} onChange={() => setSelectedVariantId(variant.id)} />
                </label>
              );
            })}
          </div>
        </div>

        <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] p-3">
          <div className="flex items-center justify-between gap-3 text-[13px]">
            <span className="font-semibold">Mua một lần</span>
            <span className="flex flex-wrap justify-end gap-1.5">
              <span>{formatPrice(totalPrice, product.currency)}</span>
              {product.compareAtPrice ? <span className="text-[var(--color-muted)] line-through">{formatPrice(product.compareAtPrice * quantity, product.currency)}</span> : null}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2.5">
            <div className="flex h-12 w-[112px] shrink-0 items-center justify-between rounded-[var(--radius-pill)] border border-[var(--color-border)] px-2 text-sm font-semibold" aria-label="Số lượng">
              <button type="button" className="grid h-8 w-8 place-items-center rounded-full" aria-label="Giảm số lượng" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>-</button>
              <span aria-live="polite">{quantity}</span>
              <button type="button" className="grid h-8 w-8 place-items-center rounded-full" aria-label="Tăng số lượng" onClick={() => setQuantity((value) => Math.min(9, value + 1))}>+</button>
            </div>
            <Button className="min-h-12 flex-1" disabled={!canAddToCart} onClick={handleAddToCart}>{canAddToCart ? "Thêm vào giỏ" : "Chưa thể đặt"}</Button>
          </div>
          <p className="mt-2.5 rounded-sm bg-[var(--color-green-soft)] px-3 py-2 text-[11px] font-semibold leading-snug">{product.stockLabel ?? "Cập nhật tồn kho"}. Chỉ sản phẩm WooCommerce có giá và cho phép mua mới được đặt COD.</p>
        </div>

        <div className="space-y-1">
          {product.details.map((detail, index) => (
            <details key={detail.title} className="group border-t border-[var(--color-border)] py-3" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between text-[13px] font-semibold">
                {detail.title}
                <span className="text-lg transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-muted)]">{detail.content}</p>
            </details>
          ))}
        </div>
      </div>

      {added ? (
        <div className="fixed inset-0 z-[1000] grid place-items-center bg-black/45 px-4 backdrop-blur-[2px]" role="dialog" aria-modal="true" aria-labelledby="added-title" onClick={() => setAdded(false)}>
          <div className="relative z-[1] w-full max-w-[420px] rounded-[var(--radius-md)] bg-white p-5 shadow-[var(--shadow-modal)]" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p id="added-title" className="text-[20px] font-semibold leading-tight">Đã thêm vào giỏ</p>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{quantity} x {selectedVariant?.label ?? product.name}</p>
              </div>
              <button type="button" className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-ink)] text-white" aria-label="Đóng" onClick={() => setAdded(false)}>×</button>
            </div>
            <div className="mt-5 rounded-sm bg-[var(--color-surface)] p-4 text-sm">
              <div className="flex justify-between gap-4 font-semibold">
                <span>Tạm tính</span>
                <span>{formatPrice(totalPrice, product.currency)}</span>
              </div>
              <p className="mt-2 text-xs leading-5 text-[var(--color-muted)]">Mock cart xác nhận thao tác PDP; checkout thật chưa kết nối.</p>
            </div>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <Button href="/cart">Xem giỏ hàng</Button>
              <button type="button" className="min-h-11 rounded-[var(--radius-pill)] border border-[var(--color-border)] px-5 text-sm font-semibold" onClick={() => setAdded(false)}>Tiếp tục mua</button>
            </div>
          </div>
        </div>
      ) : null}
    </aside>
  );
}
