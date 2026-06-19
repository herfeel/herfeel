"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import type { ProductDetail } from "@/features/products/product-types";

type ProductGalleryProps = {
  product: ProductDetail;
};

export function ProductGallery({ product }: ProductGalleryProps) {
  const images = useMemo(() => (product.images.length ? product.images : [product.thumbnail]), [product.images, product.thumbnail]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pointerStart, setPointerStart] = useState<{ x: number; y: number; id: number } | null>(null);
  const safeActiveIndex = Math.min(activeIndex, images.length - 1);
  const activeImage = images[safeActiveIndex] ?? images[0];
  const hasMultipleImages = images.length > 1;

  const goToPrevious = useCallback(() => {
    setActiveIndex((index) => (Math.min(index, images.length - 1) - 1 + images.length) % images.length);
  }, [images.length]);

  const goToNext = useCallback(() => {
    setActiveIndex((index) => (Math.min(index, images.length - 1) + 1) % images.length);
  }, [images.length]);

  return (
    <div
      className="relative touch-pan-y select-none overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-surface)]"
      aria-roledescription="carousel"
      aria-label={`Hình ảnh sản phẩm ${product.name}`}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") goToPrevious();
        if (event.key === "ArrowRight") goToNext();
      }}
      onPointerDown={(event) => {
        if (!hasMultipleImages || event.pointerType === "mouse") return;
        setPointerStart({ x: event.clientX, y: event.clientY, id: event.pointerId });
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerUp={(event) => {
        if (!pointerStart || pointerStart.id !== event.pointerId) return;
        const distanceX = pointerStart.x - event.clientX;
        const distanceY = pointerStart.y - event.clientY;

        if (Math.abs(distanceX) > 42 && Math.abs(distanceX) > Math.abs(distanceY)) {
          if (distanceX > 0) goToNext();
          else goToPrevious();
        }

        setPointerStart(null);
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
      }}
      onPointerCancel={() => setPointerStart(null)}
    >
      <div className="relative aspect-[0.92/1] md:aspect-[1.02/1] lg:min-h-[620px]" aria-live="polite">
        <Image
          key={activeImage.src}
          src={activeImage.src}
          alt={activeImage.alt}
          width={activeImage.width}
          height={activeImage.height}
          priority={safeActiveIndex === 0}
          sizes="(min-width: 1280px) 820px, (min-width: 1024px) 58vw, 100vw"
          className="pointer-events-none h-full w-full object-contain transition-opacity duration-200  "
          draggable={false}
        />
      </div>

      {hasMultipleImages ? (
        <>
          <button
            type="button"
            className="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-[var(--color-ink)] shadow-sm transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-green)] md:left-4 md:h-10 md:w-10"
            aria-label="Xem ảnh trước"
            onClick={goToPrevious}
          >
            <ChevronLeft aria-hidden="true" size={19} strokeWidth={2.4} />
          </button>
          <button
            type="button"
            className="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-[var(--color-ink)] shadow-sm transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-green)] md:right-4 md:h-10 md:w-10"
            aria-label="Xem ảnh tiếp theo"
            onClick={goToNext}
          >
            <ChevronRight aria-hidden="true" size={19} strokeWidth={2.4} />
          </button>
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1 rounded-full bg-white/88 p-1.5 shadow-sm backdrop-blur md:bottom-4 md:left-4" role="tablist" aria-label="Chọn hình ảnh sản phẩm">
            {images.map((image, index) => {
              const isActive = index === safeActiveIndex;
              return (
                <button
                  key={image.src}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Xem ảnh ${index + 1}`}
                  className="grid h-8 min-w-8 place-items-center rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-green)]"
                  onClick={() => setActiveIndex(index)}
                >
                  <span className={`h-1.5 rounded-full transition-all ${isActive ? "w-6 bg-[var(--color-ink)]" : "w-1.5 bg-[var(--color-muted)]/35"}`} />
                </button>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}
