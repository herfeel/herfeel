"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { commerceConfig } from "@/config/commerce";
import { useCart } from "@/features/cart/cart-provider";
import { formatPrice } from "@/lib/format-price";

export default function CartPage() {
  const { state, dispatch } = useCart();
  const subtotal = state.totals.subtotal.value;
  const remainingForShipping = Math.max(commerceConfig.freeShippingThreshold - subtotal, 0);
  const progress = Math.min((subtotal / commerceConfig.freeShippingThreshold) * 100, 100);

  return (
    <Section className="bg-white py-10 md:py-14">
      <Container>
        <h1 className="text-[34px] font-semibold leading-tight md:text-[48px]">Giỏ hàng</h1>
        {state.items.length ? (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="grid gap-4">
              {state.items.map((item) => (
                <article key={item.key} className="grid gap-4 rounded-[var(--radius-md)] border border-[var(--color-border)] p-4 sm:grid-cols-[132px_1fr]">
                  <div className="relative aspect-square overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-surface)]">
                    {item.image ? <Image src={item.image.src} alt={item.image.alt} fill sizes="132px" className="object-contain p-3" /> : null}
                  </div>
                  <div className="flex min-w-0 flex-col justify-between gap-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-semibold leading-tight">{item.name}</h2>
                        {item.variantLabel ? <p className="mt-1 text-sm text-[var(--color-muted)]">{item.variantLabel}</p> : null}
                        {item.attributes?.length ? <p className="mt-2 text-xs leading-5 text-[var(--color-muted)]">{item.attributes.map((attr) => `${attr.name}: ${attr.value}`).join(" · ")}</p> : null}
                      </div>
                      <button type="button" className="text-sm font-semibold text-[var(--color-muted)] underline-offset-4 hover:text-[var(--color-ink)] hover:underline" onClick={() => dispatch({ type: "cart/remove-item", payload: { key: item.key } })}>Xóa</button>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex h-11 w-[126px] items-center justify-between rounded-[var(--radius-pill)] border border-[var(--color-border)] px-2 text-sm font-semibold">
                        <button type="button" className="grid h-8 w-8 place-items-center rounded-full hover:bg-[var(--color-surface)]" aria-label="Giảm số lượng" onClick={() => dispatch({ type: "cart/update-quantity", payload: { key: item.key, quantity: item.quantity - 1 } })}>-</button>
                        <span>{item.quantity}</span>
                        <button type="button" className="grid h-8 w-8 place-items-center rounded-full hover:bg-[var(--color-surface)]" aria-label="Tăng số lượng" onClick={() => dispatch({ type: "cart/update-quantity", payload: { key: item.key, quantity: item.quantity + 1 } })}>+</button>
                      </div>
                      <p className="font-semibold">{formatPrice(item.unitPrice.value * item.quantity, item.unitPrice.currency)}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <aside className="h-fit rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 lg:sticky lg:top-[118px]">
              <h2 className="text-xl font-semibold">Tóm tắt</h2>
              <div className="mt-5 rounded-sm bg-white p-4">
                <div className="flex justify-between gap-4 text-sm font-semibold">
                  <span>{remainingForShipping > 0 ? `Còn ${formatPrice(remainingForShipping, commerceConfig.currency)} để freeship` : "Đã đủ điều kiện freeship"}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-[var(--color-surface)]">
                  <div className="h-full rounded-full bg-[var(--color-green)]" style={{ width: `${progress}%` }} />
                </div>
              </div>
              <div className="mt-5 grid gap-3 border-t border-[#ded6cc] pt-5 text-sm">
                <div className="flex justify-between"><span>Tạm tính</span><span>{formatPrice(state.totals.subtotal.value, state.totals.subtotal.currency)}</span></div>
                <div className="flex justify-between text-[var(--color-muted)]"><span>Giao hàng</span><span>Tính ở bước sau</span></div>
                <div className="flex justify-between text-lg font-semibold"><span>Tổng mock</span><span>{formatPrice(state.totals.total.value, state.totals.total.currency)}</span></div>
              </div>
              <Link href="/checkout" className="mt-5 flex h-12 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-ink)] text-sm font-semibold !text-white">Thanh toán mock</Link>
            </aside>
          </div>
        ) : (
          <div className="mt-8 rounded-[var(--radius-md)] bg-[var(--color-surface)] p-8 text-center">
            <h2 className="text-2xl font-semibold">Giỏ hàng đang trống</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--color-muted)]">Thêm sản phẩm từ PDP để xem giao diện cart mock, cập nhật số lượng và tạm tính.</p>
            <Link href="/shop" className="mt-6 inline-flex h-12 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-ink)] px-7 text-sm font-semibold !text-white">Mua sắm ngay</Link>
          </div>
        )}
      </Container>
    </Section>
  );
}
