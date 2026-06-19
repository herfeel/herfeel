"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import type { HomeVisual as HomeVisualData } from "@/data/mock/home";
import { HomeVisual } from "./home-visual";

type EditorialCarouselItem = {
  name: string;
  visual: HomeVisualData;
};

type HomeEditorialCarouselProps = {
  items: EditorialCarouselItem[];
};

export function HomeEditorialCarousel({ items }: HomeEditorialCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(items.length > 1);

  const updateState = useCallback(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const children = Array.from(scroller.children) as HTMLElement[];
    const scrollerLeft = scroller.getBoundingClientRect().left;
    const nearest = children.reduce(
      (closest, child, index) => {
        const distance = Math.abs(child.getBoundingClientRect().left - scrollerLeft);
        return distance < closest.distance ? { index, distance } : closest;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY },
    );

    setActiveIndex(nearest.index);
    setCanScrollPrev(scroller.scrollLeft > 4);
    setCanScrollNext(scroller.scrollLeft + scroller.clientWidth < scroller.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    updateState();
    scroller.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);

    return () => {
      scroller.removeEventListener("scroll", updateState);
      window.removeEventListener("resize", updateState);
    };
  }, [updateState]);

  const scrollToIndex = (index: number) => {
    const scroller = scrollerRef.current;
    const target = scroller?.children[index] as HTMLElement | undefined;

    target?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };

  const scrollByCard = (direction: -1 | 1) => {
    const targetIndex = Math.min(Math.max(activeIndex + direction, 0), items.length - 1);
    scrollToIndex(targetIndex);
  };

  return (
    <div className="mt-10 md:mt-14">
      <div
        ref={scrollerRef}
        className="editorial-carousel-scroll flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter-mobile)] pb-2 md:gap-6 md:px-[max(var(--gutter-tablet),calc((100vw-var(--container))/2+var(--gutter-desktop)))]"
      >
        {items.map((item) => (
          <article
            key={item.name}
            className="editorial-card group relative h-[460px] w-[82vw] shrink-0 snap-start overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-ink)] text-white shadow-[0_18px_50px_rgb(0_0_0_/_0.14)] md:h-[500px] md:w-[290px]"
          >
            <HomeVisual
              visual={item.visual}
              className="editorial-card-visual h-full rounded-none transition-transform duration-500 group-hover:scale-[1.055]"
              imageSizes="(min-width: 768px) 290px, 82vw"
              showLabel={false}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0_/_0.02),rgb(0_0_0_/_0.08)_54%,rgb(0_0_0_/_0.42))]" />
            <div className="editorial-card-overlay absolute inset-x-3 bottom-3 rounded-[var(--radius-md)] border border-white/16 bg-black/48 px-4 py-3 text-white shadow-[0_14px_34px_rgb(0_0_0_/_0.18)] backdrop-blur-md transition-[background-color,transform] duration-300 group-hover:-translate-y-1 group-hover:bg-black/60 md:inset-x-3.5 md:bottom-3.5 md:px-[18px] md:py-4">
              <h3 className="text-[17px] font-semibold leading-tight md:text-[18px]">{item.name}</h3>
            </div>
          </article>
        ))}
      </div>

      <div className="mx-auto mt-5 flex max-w-[var(--container)] items-center justify-between px-[var(--gutter-mobile)] md:px-[var(--gutter-desktop)]">
        <div className="flex items-center gap-2" aria-label="Vị trí carousel">
          {items.map((item, index) => (
            <button
              key={item.name}
              type="button"
              className={cn(
                "h-2 rounded-full transition-[width,background-color] duration-200",
                index === activeIndex ? "w-6 bg-[var(--color-ink)]" : "w-2 bg-[#d5cec4] hover:bg-[var(--color-muted)]",
              )}
              aria-label={`Đến thẻ ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => scrollToIndex(index)}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] bg-white text-lg text-[var(--color-ink)] transition-[opacity,background-color,transform] duration-200 hover:-translate-x-0.5 hover:bg-[var(--color-ink)] hover:text-white disabled:pointer-events-none disabled:opacity-35"
            aria-label="Xem thẻ trước"
            disabled={!canScrollPrev}
            onClick={() => scrollByCard(-1)}
          >
            ←
          </button>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] bg-white text-lg text-[var(--color-ink)] transition-[opacity,background-color,transform] duration-200 hover:translate-x-0.5 hover:bg-[var(--color-ink)] hover:text-white disabled:pointer-events-none disabled:opacity-35"
            aria-label="Xem thẻ tiếp theo"
            disabled={!canScrollNext}
            onClick={() => scrollByCard(1)}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
