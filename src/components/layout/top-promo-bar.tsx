"use client";

import { useState } from "react";

const promoItems = ["Miễn phí giao hàng từ 120k", "Giao hàng kín đáo", "Combo tiết kiệm", "Hàng chính hãng", "Hỗ trợ riêng tư"];

function PromoIcon({ index }: { index: number }) {
  const kind = index % 5;

  if (kind === 0) {
    return (
      <svg aria-hidden="true" className="h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" fill="none">
        <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM18 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }

  if (kind === 1) {
    return (
      <svg aria-hidden="true" className="h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" fill="none">
        <path d="M5 8h14M7 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="m8 15 8-6M9 9h.01M15 15h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (kind === 3) {
    return (
      <svg aria-hidden="true" className="h-[18px] w-[18px] shrink-0" viewBox="0 0 24 24" fill="none">
        <path d="m12 3 7 3v5c0 4.4-2.8 8-7 10-4.2-2-7-5.6-7-10V6l7-3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="m8.8 12 2 2 4.5-5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/80" />;
}

export function TopPromoBar() {
  const [paused, setPaused] = useState(false);
  const items = [...promoItems, ...promoItems, ...promoItems, ...promoItems];

  return (
    <div className="group relative z-50 flex h-12 items-center overflow-hidden bg-[var(--color-ink)] text-[11px] font-medium uppercase text-white md:h-[50px] md:text-[12px]" data-state={paused ? "paused" : "running"}>
      <div
        className="flex min-w-max animate-[promo-marquee_30s_linear_infinite] items-center gap-10 px-5 tracking-[0.09em] motion-reduce:animate-none group-hover:[animation-play-state:paused] md:gap-14"
        style={{ animationPlayState: paused ? "paused" : "running" }}
      >
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="inline-flex items-center gap-3 whitespace-nowrap font-mono font-medium text-white/90">
            <PromoIcon index={index} />
            {item}
          </span>
        ))}
      </div>
      <button
        type="button"
        aria-pressed={paused}
        onClick={() => setPaused((value) => !value)}
        className="absolute right-3 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-[10px] text-white hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-green)]"
      >
        {paused ? "▶" : "Ⅱ"}
      </button>
    </div>
  );
}
