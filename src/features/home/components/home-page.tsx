import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, Check, PackageCheck, Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  benefits,
  celebrities,
  homeBuildKit,
  heroCards,
  shortcutPills,
  trustCards,
} from "@/data/mock/home";
import { playKitSteps } from "@/data/mock/play-kit";
import { mockProducts } from "@/data/mock/products";
import { ProductCardActions } from "@/features/products/components/product-card-actions";
import type { Product } from "@/features/products/product-types";
import { formatPrice } from "@/lib/format-price";
import { cn } from "@/lib/cn";
import { HomeEditorialCarousel } from "./home-editorial-carousel";
import { HeroReveal, RevealItem, RevealSection, StaggerReveal } from "./home-scroll-animations";
import { HomeVisual } from "./home-visual";

const bestsellers = mockProducts.slice(0, 4);

export function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryShortcuts />
      <BenefitsBand />
      <TrustBentoSection />
      <ReviewsSection />
      <BuildKitTeaser />
      <BestsellersSection />
    </>
  );
}

function HeroSection() {
  return (
    <section className="bg-[var(--color-white)] pb-14 pt-9 md:pb-20 md:pt-16">
      <Container>
        <HeroReveal className="mb-8 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <RevealItem>
              <h1 className="max-w-[315px] text-[32px] font-semibold leading-[1.08] tracking-normal sm:max-w-[760px] sm:text-[34px] md:text-[54px] md:leading-[1.08]">
                Chọn đúng <em className="font-serif font-normal italic">cảm giác</em> bạn muốn
              </h1>
            </RevealItem>
            <RevealItem>
              <p className="mt-3 max-w-[620px] text-base leading-snug text-[var(--color-ink)] md:text-[17px]">
                Khám phá bao cao su, gel bôi trơn và sản phẩm chăm sóc chính hãng — chọn theo cảm giác, giao hàng kín đáo.
              </p>
            </RevealItem>
          </div>
          <RevealItem>
            <Button href="/shop" className="min-h-11 border border-transparent px-7 text-[15px] !text-white transition-[background-color,border-color,color] duration-200 hover:border-[#347447] hover:bg-[var(--color-green-soft)] hover:!text-black md:min-h-10 md:px-6 md:text-sm">
              Chọn nhanh theo cảm giác
            </Button>
          </RevealItem>
        </HeroReveal>
        <StaggerReveal className="grid gap-3 sm:grid-cols-2 md:grid-cols-4 md:gap-5" childVariant="scale" trigger="early">
          {heroCards.map((card, index) => (
            <Link
              key={card.title}
              href={card.href}
              className={cn(
                "hero-card group relative isolate block min-h-[310px] overflow-hidden rounded-[var(--radius-md)] shadow-[0_16px_40px_rgb(0_0_0_/_0.10)] transition-[box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_24px_58px_rgb(0_0_0_/_0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-green)] sm:aspect-[4/5] sm:min-h-0 md:aspect-[0.78]",
                card.backgroundClass,
                card.textClass,
              )}
            >
              <span className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(180deg,rgb(255_255_255_/_0.20),transparent_32%,rgb(0_0_0_/_0.10))] opacity-70" />
              <span className="relative z-20 block max-w-[82%] px-4 pt-4 md:px-5 md:pt-5">
                <span className="block text-[22px] font-semibold leading-[1.02] tracking-normal md:text-[24px] lg:text-[25px]">{card.title}</span>
                <span className={cn("mt-2 block max-w-[210px] text-[13px] font-medium leading-snug md:text-sm", card.subtitleClass)}>{card.subtitle}</span>
              </span>
              <span className={cn("hero-card-visual absolute z-10 block transition-transform duration-300 ease-out group-hover:scale-[1.06]", card.imageClass)}>
                <Image
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 92vw"
                  priority={index === 0}
                  className={cn(card.imageObjectClass ?? "object-contain", "drop-shadow-[0_22px_26px_rgb(0_0_0_/_0.28)]")}
                />
              </span>
              <span className="interactive-action absolute bottom-4 left-4 z-20 grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-white text-[var(--color-black)] shadow-[0_10px_24px_rgb(0_0_0_/_0.16)] md:h-11 md:w-11">
                <span className="hero-card-action-icons" aria-hidden="true">
                  <ArrowRight className="h-5 w-5 shrink-0" strokeWidth={1.8} />
                  <ArrowRight className="h-5 w-5 shrink-0" strokeWidth={1.8} />
                </span>
              </span>
            </Link>
          ))}
        </StaggerReveal>
      </Container>
    </section>
  );
}

function CategoryShortcuts() {
  return (
    <RevealSection className="bg-[var(--color-white)] pb-16 md:pb-20" trigger="early">
      <Container>
        <h2 className="mb-7 text-[30px] font-medium leading-tight tracking-normal md:mb-10 md:text-[46px]">
          Mua theo <em className="font-serif font-normal italic">nhu cầu</em>
        </h2>
        <StaggerReveal className="grid gap-2.5 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {shortcutPills.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="category-pill group flex min-h-14 items-center gap-3 rounded-[var(--radius-pill)] border border-transparent bg-[var(--color-surface)] px-4 pr-3 text-center text-[17px] font-medium leading-none shadow-none transition-[background-color,border-color,box-shadow,transform] duration-300 ease-out hover:scale-[1.018] hover:border-[#d5c8ad] hover:bg-[#f3f0e9] hover:shadow-[0_14px_28px_rgb(0_0_0_/_0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-green)] md:min-h-[64px] md:px-6 md:text-[19px]"
            >
              <span className="category-pill-thumb relative h-9 w-9 shrink-0 overflow-hidden rounded-full transition-transform duration-300 group-hover:scale-[1.09] md:h-11 md:w-11">
                <HomeVisual visual={item.visual} className="h-full w-full rounded-full" showLabel={false} />
              </span>
              <span className="flex-1">{item.label}</span>
              <span className="interactive-action grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-base font-normal text-[var(--color-black)] md:h-9 md:w-9">
                →
              </span>
            </Link>
          ))}
        </StaggerReveal>
      </Container>
    </RevealSection>
  );
}

function BenefitsBand() {
  return (
    <RevealSection className="bg-[var(--color-ink)] py-10 text-white md:py-12">
      <Container>
        <h2 className="mb-8 text-center text-[28px] font-medium leading-tight tracking-normal md:mb-10 md:text-[38px]">
          Herfeel giúp bạn chọn <em className="font-serif font-normal italic">dễ hơn</em>
        </h2>
        <StaggerReveal className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 md:gap-y-10">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="text-center">
              <BenefitIcon icon={benefit.icon} />
              <h3 className="mx-auto mt-3 max-w-[260px] text-[18px] font-medium leading-[1.08] tracking-normal md:mt-4 md:text-[22px]">{benefit.title}</h3>
              <p className="mx-auto mt-2 max-w-[240px] text-[12px] font-normal leading-snug text-white/78 md:text-[13px]">{benefit.description}</p>
            </div>
          ))}
        </StaggerReveal>
      </Container>
    </RevealSection>
  );
}

function BenefitIcon({ icon }: { icon: string }) {
  const sharedProps = {
    className: "h-full w-full",
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  return (
    <span className="mx-auto block h-7 w-7 text-[var(--color-green-soft)] md:h-8 md:w-8" aria-hidden="true" data-icon={icon}>
      {icon === "box" ? (
        <svg {...sharedProps}>
          <path d="M8 17.5 24 8l16 9.5-16 9.5L8 17.5Z" />
          <path d="M8 18v18.5L24 46l16-9.5V18" />
          <path d="M24 27v18" />
        </svg>
      ) : null}
      {icon === "standard" ? (
        <svg {...sharedProps}>
          <path d="M17 6h14l3 6 7 2-2 15c-1.4 8.3-7.8 12.3-15 15-7.2-2.7-13.6-6.7-15-15L7 14l7-2 3-6Z" />
          <path d="m16 25 5 5 11-12" />
        </svg>
      ) : null}
      {icon === "check" ? (
        <svg {...sharedProps}>
          <path d="M13 8h22" />
          <path d="M13 24h22" />
          <path d="M13 40h22" />
          <path d="m6 8 2 2 4-5" />
          <path d="m6 24 2 2 4-5" />
          <path d="m6 40 2 2 4-5" />
        </svg>
      ) : null}
      {icon === "guide" ? (
        <svg {...sharedProps}>
          <path d="M10 8h22a6 6 0 0 1 6 6v26H16a6 6 0 0 0-6 6V8Z" />
          <path d="M16 8v32" />
          <path d="M22 18h10" />
          <path d="M22 28h10" />
        </svg>
      ) : null}
      {icon === "value" ? (
        <svg {...sharedProps}>
          <path d="M8 16V9h7" />
          <path d="m8 9 13 13" />
          <path d="M26 31h14" />
          <path d="M26 39h10" />
          <path d="M31 8h8a5 5 0 0 1 5 5v22a5 5 0 0 1-5 5H17a5 5 0 0 1-5-5v-8" />
        </svg>
      ) : null}
      {icon === "privacy" ? (
        <svg {...sharedProps}>
          <path d="M14 22v-6a10 10 0 0 1 20 0v6" />
          <rect x="10" y="22" width="28" height="20" rx="4" />
          <path d="M24 30v5" />
          <path d="M24 30h.01" />
        </svg>
      ) : null}
    </span>
  );
}

function TrustBentoSection() {
  return (
    <RevealSection id="why-herfeel" className="scroll-mt-[120px] bg-white py-12 md:py-16">
      <Container>
        <div className="mb-8 flex items-center justify-between gap-5 md:mb-10">
          <h2 className="text-[34px] font-semibold leading-tight tracking-normal md:text-[54px] md:font-medium">
            Vì sao chọn <em className="font-serif font-normal italic">Herfeel</em>
          </h2>
          <Button href="/playbook" className="hidden min-h-10 shrink-0 border border-transparent px-6 text-sm !text-white transition-[background-color,border-color,color] duration-200 hover:border-[#347447] hover:bg-[var(--color-green-soft)] hover:!text-black md:inline-flex">
            Đọc PlayBook
          </Button>
        </div>
        <div className="reveal-root grid gap-3 md:grid-cols-3 md:grid-rows-[300px_300px] md:gap-5" data-reveal-kind="stagger" data-reveal-visible="true">
          {trustCards.map((card, index) => {
            const layout = "layout" in card ? card.layout : "default";
            const visual = "visual" in card ? card.visual : null;
            const hasImage = Boolean(visual?.imageSrc);
            const [firstTitleWord = "", secondTitleWord = "", ...restTitleWords] = card.title.split(" ");
            const titleEmphasis = [firstTitleWord, secondTitleWord].filter(Boolean).join(" ");
            const titleRest = restTitleWords.join(" ");
            const gridSlot = [
              "md:row-span-2",
              "md:col-start-2 md:row-start-1",
              "md:col-start-3 md:row-start-1",
              "md:col-start-2 md:row-start-2",
              "md:col-start-3 md:row-start-2",
            ][index];

            return (
              <div
                key={card.title}
                className={cn("reveal-item", gridSlot)}
                data-reveal-variant="scale"
                style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}
              >
                <article
                  className={cn(
                    "bento-card group flex min-h-[300px] flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 transition-[background-color,transform] duration-200 hover:-translate-y-1 hover:bg-[#efe9df] md:h-full md:min-h-0 md:p-6",
                  )}
                >
                  <h3 className="text-[23px] font-medium leading-[1.05] tracking-normal antialiased md:text-[26px]">
                    <em className="font-serif font-normal italic">{titleEmphasis}</em>{titleRest ? ` ${titleRest}` : ""}
                  </h3>
                  <p className="mt-3 max-w-[420px] text-sm leading-snug text-[var(--color-ink)]/80 md:text-[15px]">{card.body}</p>
                  {"stats" in card && card.stats ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {card.stats.map((stat) => (
                        <span key={stat} className="rounded-[var(--radius-sm)] bg-white px-4 py-2 text-center text-xs font-bold leading-tight shadow-sm ring-1 ring-black/5 md:text-sm">
                          {stat}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {visual ? (
                    hasImage ? (
                      <div className={cn("relative mt-auto overflow-hidden", layout === "hero" ? "h-[310px] md:h-[395px]" : "h-32 md:h-36")}>
                        <Image
                          src={visual.imageSrc ?? ""}
                          alt={visual.imageAlt ?? visual.label}
                          fill
                          sizes={layout === "hero" ? "(min-width: 768px) 33vw, 90vw" : "(min-width: 768px) 22vw, 90vw"}
                          className="object-contain object-bottom transition-transform duration-300 group-hover:scale-[1.035]"
                          style={{ objectPosition: visual.imagePosition ?? "center bottom" }}
                        />
                      </div>
                    ) : (
                      <HomeVisual visual={visual} className="mt-auto h-32 transition-transform duration-300 group-hover:scale-[1.035] md:h-36" showLabel={false} />
                    )
                  ) : null}
                </article>
              </div>
            );
          })}
        </div>
        <Button href="/playbook" className="mt-5 min-h-11 w-full border border-transparent px-6 text-sm !text-white transition-[background-color,border-color,color] duration-200 hover:border-[#347447] hover:bg-[var(--color-green-soft)] hover:!text-black md:hidden">
          Đọc PlayBook
        </Button>
      </Container>
    </RevealSection>
  );
}

function ReviewsSection() {
  return (
    <RevealSection className="overflow-hidden bg-[var(--color-surface)] py-16 md:py-24" variant="scale">
      <Container className="md:pl-[clamp(var(--gutter-desktop),8vw,132px)]">
        <h2 className="max-w-[820px] text-[38px] font-semibold leading-[1.04] tracking-normal md:text-[54px] md:font-medium">
          Những gương mặt cùng <br className="hidden md:block" /> Herfeel lan tỏa <em className="font-serif font-normal italic">lối sống tinh tế</em>
        </h2>
        <p className="mt-4 max-w-[560px] text-[15px] leading-snug text-[var(--color-ink)]/78 md:text-base">
          Một góc editorial nhẹ nhàng với các celebrity đồng hành cùng tinh thần chọn lựa văn minh, riêng tư và tự tin.
        </p>
      </Container>
      <HomeEditorialCarousel items={celebrities} />
    </RevealSection>
  );
}

function BuildKitTeaser() {
  const kitSlots = playKitSteps.map((step) => {
    const label = step.title.replace(/^Chọn |^Thêm |^Hoàn tất bằng /, "");
    return label.charAt(0).toUpperCase() + label.slice(1);
  });

  return (
    <RevealSection className="bg-white py-10 md:py-14" variant="scale">
      <Container>
        <div className="relative isolate grid min-h-[420px] overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-ink)] text-white md:min-h-[360px] md:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)]">
          <div className="flex min-h-[300px] flex-col justify-between gap-8 p-5 sm:p-7 md:min-h-0 md:p-9 lg:p-10">
            <div>
              <div className="mb-4 inline-flex min-h-9 items-center gap-2 rounded-[var(--radius-pill)] bg-white/8 px-3 text-xs font-semibold uppercase tracking-normal text-[var(--color-green-soft)] ring-1 ring-white/12">
                <PackageCheck className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                {homeBuildKit.eyebrow}
              </div>
              <h2 className="max-w-[520px] text-[34px] font-semibold leading-[1.02] tracking-normal md:text-[48px] md:font-medium">
                {homeBuildKit.title}
              </h2>
              <p className="mt-4 max-w-[600px] text-[15px] leading-snug text-white/76 md:text-base">
                {homeBuildKit.body}
              </p>
            </div>

            <div className="grid gap-4">
              <div className="flex flex-wrap gap-2">
                {homeBuildKit.chips.map((chip) => (
                  <span key={chip} className="inline-flex min-h-8 items-center rounded-[var(--radius-pill)] bg-white px-3 text-xs font-semibold text-[var(--color-ink)]">
                    {chip}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href={homeBuildKit.href} className="min-h-11 w-full gap-2 bg-[var(--color-green-soft)] px-5 text-sm !text-black hover:bg-white sm:w-auto">
                  {homeBuildKit.cta}
                  <ArrowRight className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                </Button>
                <p className="text-xs font-medium leading-snug text-white/66">
                  Mã tham khảo: <span className="text-white">{homeBuildKit.promo}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[300px] border-t border-white/10 bg-[linear-gradient(135deg,rgb(255_255_255_/_0.06),rgb(180_235_177_/_0.12))] p-5 sm:p-7 md:min-h-0 md:border-l md:border-t-0 md:p-8">
            <HomeVisual visual={homeBuildKit.visual} className="absolute inset-0 rounded-none opacity-[0.18]" showLabel={false} />
            <div className="relative z-10 flex h-full min-h-[260px] flex-col justify-center gap-4">
              <p className="text-xs font-semibold uppercase tracking-normal text-white/58">3 món trong kit</p>
              <div className="grid gap-3">
                {kitSlots.map((slot, index) => (
                  <div key={slot} className="grid min-h-[70px] grid-cols-[44px_minmax(0,1fr)_32px] items-center gap-3 rounded-[var(--radius-md)] bg-white px-4 text-[var(--color-ink)] shadow-[0_14px_34px_rgb(0_0_0_/_0.18)]">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--color-surface)] text-sm font-semibold">0{index + 1}</span>
                    <span className="min-w-0 text-[17px] font-semibold leading-tight">{slot}</span>
                    {index < kitSlots.length - 1 ? (
                      <Plus className="h-5 w-5 text-[var(--color-green)]" strokeWidth={2} aria-hidden="true" />
                    ) : (
                      <Check className="h-5 w-5 text-[var(--color-green)]" strokeWidth={2} aria-hidden="true" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </RevealSection>
  );
}

function BestsellersSection() {
  return (
    <RevealSection className="bg-white pb-12 md:pb-16">
      <Container>
        <div className="mb-6 flex items-end justify-between gap-6 md:mb-8">
          <div>
            <h2 className="text-[31px] font-semibold leading-tight tracking-normal md:text-[48px] md:font-medium">
              Sản phẩm <em className="font-serif font-normal italic">bán chạy</em>
            </h2>
            <p className="mt-2 text-sm text-[var(--color-muted)]">Những lựa chọn phổ biến, thông tin gọn để so sánh nhanh.</p>
          </div>
          <Button href="/shop" className="hidden min-h-9 shrink-0 border border-transparent px-4 text-xs !text-white transition-[background-color,border-color,color] duration-200 hover:border-[#347447] hover:bg-[var(--color-green-soft)] hover:!text-black md:inline-flex">
            Xem tất cả
          </Button>
        </div>
        <StaggerReveal className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-5" childVariant="scale">
          {bestsellers.map((product) => (
            <HomeProductCard key={product.id} product={product} />
          ))}
        </StaggerReveal>
      </Container>
    </RevealSection>
  );
}

function HomeProductCard({ product }: { product: Product }) {
  const primaryImage = product.thumbnail;
  const hoverImage = product.hoverImage;
  const productHref = `/products/${product.slug}`;

  return (
    <article className="group">
      <Link href={productHref} className="product-card block rounded-[var(--radius-md)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-green)]">
        <div className="product-card-media relative aspect-square overflow-hidden rounded-[var(--radius-md)] bg-white ring-1 ring-[#ece8df]">
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            width={primaryImage.width}
            height={primaryImage.height}
            sizes="(min-width: 1024px) 25vw, 50vw"
            className={`product-card-image h-full w-full object-contain ${hoverImage ? "group-hover:opacity-0" : ""}`}
          />
          {hoverImage ? (
            <Image
              src={hoverImage.src}
              alt={hoverImage.alt}
              width={hoverImage.width}
              height={hoverImage.height}
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="product-card-image absolute inset-0 h-full w-full object-contain opacity-0 group-hover:opacity-100"
            />
          ) : null}
        </div>
        <h3 className="mt-4 text-sm font-medium leading-snug text-[var(--color-ink)]">{product.name}</h3>
        <p className="mt-1 min-h-9 text-xs leading-snug text-[#727272]">{product.shortDescription}</p>
        <div className="mt-3 grid gap-1 border-t border-[#e9e3da] pt-3 text-[10px] leading-snug text-[#777]">
          {product.specs.slice(0, 2).map((spec) => (
            <span key={spec.label}>{spec.label}: {spec.value}</span>
          ))}
        </div>
        <p className="mt-3 text-xs font-medium text-[var(--color-ink)]">
          Từ {formatPrice(product.price, product.currency)}
        </p>
      </Link>
      <ProductCardActions product={product} className="mt-3" />
    </article>
  );
}
