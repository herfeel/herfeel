import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PackageCheck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { mockProducts } from "@/data/mock/products";
import { ProductCardActions } from "@/features/products/components/product-card-actions";
import type { Product } from "@/features/products/product-types";
import { mapWooCommerceProduct } from "@/features/products/woocommerce-mapper";
import { getProducts } from "@/features/products/woocommerce-service";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format-price";

export const metadata: Metadata = {
  title: "Tất cả sản phẩm",
  description: "Khám phá tất cả sản phẩm Herfeel với bộ lọc theo danh mục và nhu cầu.",
};

const collectionShortcuts = [
  { label: "Bán chạy", href: "/collections/ban-chay" },
  { label: "Combo", href: "/collections/combo" },
  { label: "Mỏng nhẹ", href: "/collections/mong-nhe" },
  { label: "Kéo dài", href: "/collections/keo-dai" },
  { label: "Gel bôi trơn", href: "/collections/gel-boi-tron" },
  { label: "Ấm nóng", href: "/collections/am-nong" },
  { label: "Sensitive", href: "/collections/sensitive" },
];

type ShopPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const query = (await searchParams) ?? {};
  const products = await getProducts({
      page: getSingleNumberParam(query.page),
      perPage: getSingleNumberParam(query.per_page) ?? 24,
      search: getSingleParam(query.search),
      category: getSingleParam(query.category),
      order: getOrderParam(query.order),
      orderBy: getOrderByParam(query.orderby),
    })
    .then((items) => items.map(mapWooCommerceProduct))
    .catch(() => mockProducts.slice(0, 24));

  return (
    <div className="bg-white">
      <ShopHero />
      <CollectionShortcuts resultCount={products.length} />
      <ProductGrid products={products} />
    </div>
  );
}

function ShopHero() {
  return (
    <section className="border-b border-[var(--color-border)] bg-white">
      <div className="bg-[var(--color-surface)]">
        <Container>
          <nav className="flex min-w-0 flex-wrap items-center gap-2 py-4 text-[13px] font-medium text-[var(--color-muted)]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[var(--color-ink)] hover:underline">
              Trang chủ
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[var(--color-ink)]">Tất cả sản phẩm</span>
          </nav>
        </Container>
      </div>
      <div className="relative min-h-[260px] overflow-hidden bg-[linear-gradient(90deg,rgb(12_12_13_/_0.68),rgb(12_12_13_/_0.14)_46%,rgb(12_12_13_/_0.05)),url('/images/playah/home/hero/her-feel-ha-hero.jpeg')] bg-cover bg-center md:min-h-[360px] lg:min-h-[410px]">
        <Container className="relative flex min-h-[260px] items-end py-8 md:min-h-[360px] md:py-12 lg:min-h-[410px]">
          <div className="max-w-[720px] text-white">
            <h1 className="text-[44px] font-semibold leading-[1.02] tracking-normal md:text-[72px] lg:text-[84px]">Tất cả sản phẩm</h1>
            <p className="mt-3 max-w-[560px] text-[16px] leading-snug text-white/88 md:text-[20px]">Lọc nhanh theo danh mục hoặc nhu cầu, xem rõ quy cách và mua sắm kín đáo.</p>
          </div>
        </Container>
      </div>
    </section>
  );
}

function CollectionShortcuts({ resultCount }: { resultCount: number }) {
  return (
    <section className="border-b border-[var(--color-border)] bg-white py-5 md:py-6">
      <Container>
        <div className="flex items-center gap-4">
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">{resultCount} sản phẩm</p>
        </div>
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {collectionShortcuts.map((shortcut) => (
            <ShortcutChip key={shortcut.href} href={shortcut.href} label={shortcut.label} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ShortcutChip({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-12 shrink-0 items-center rounded-[var(--radius-pill)] border-2 border-transparent bg-[#eeeeee] px-7 text-[15px] font-semibold leading-none text-[var(--color-ink)] transition-colors duration-150 hover:border-[#36764c] hover:bg-[var(--color-green-soft)] focus-visible:border-[#36764c] focus-visible:bg-[var(--color-green-soft)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-green)] md:min-h-[56px] md:px-9 md:text-[18px]",
      )}
    >
      {label}
    </Link>
  );
}

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <section className="bg-white py-8 md:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-[1160px] px-5 md:px-12 lg:px-[var(--gutter-desktop)]">
        {products.length ? (
          <div className="grid grid-cols-2 gap-x-2 gap-y-14 md:gap-x-4 md:gap-y-10 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-12">
            {products.map((product) => (
              <ShopProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-12 text-center">
            <h2 className="text-[24px] font-semibold leading-tight text-[var(--color-ink)]">Chưa có sản phẩm phù hợp</h2>
            <p className="mx-auto mt-2 max-w-[520px] text-sm text-[var(--color-muted)]">Hãy thử bỏ bộ lọc hoặc chọn một danh mục khác để xem thêm sản phẩm Herfeel.</p>
            <Button href="/shop" className="mt-6 min-h-10 px-5 text-xs">
              Xem tất cả
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function ShopProductCard({ product }: { product: Product }) {
  const [firstSpec, secondSpec] = product.specs;
  const primaryImage = product.thumbnail;
  const hoverImage = product.hoverImage;
  const productHref = `/products/${product.slug}`;

  return (
    <article className="group min-w-0">
      <Link href={productHref} className="block rounded-[var(--radius-md)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-green)]">
        <div className="product-card-media relative aspect-square overflow-hidden rounded-[var(--radius-md)] bg-white ring-1 ring-[#ece8df]">
          {product.badges[0] ? <span className="absolute left-2 top-2 z-10 rounded-[var(--radius-pill)] bg-white px-2.5 py-1 text-[9px] font-semibold text-[var(--color-ink)] ring-1 ring-[#ece8df] md:text-[10px]">{product.badges[0]}</span> : null}
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            width={primaryImage.width}
            height={primaryImage.height}
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 312px, calc((100vw - 56px) / 2)"
            className={`product-card-image h-full w-full object-contain ${hoverImage ? "group-hover:opacity-0" : ""}`}
          />
          {hoverImage ? (
            <Image
              src={hoverImage.src}
              alt={hoverImage.alt}
              width={hoverImage.width}
              height={hoverImage.height}
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 312px, calc((100vw - 56px) / 2)"
              className="product-card-image absolute inset-0 h-full w-full object-contain opacity-0 group-hover:opacity-100"
            />
          ) : null}
        </div>
        <h2 className="mt-3 text-[11px] font-medium leading-[1.24] text-[var(--color-ink)] md:mt-4 md:text-[13px] md:leading-[1.28]">{product.name}</h2>
        <p className="mt-1 min-h-[30px] text-[10px] leading-snug text-[#727272] md:min-h-8 md:text-[11px]">{product.shortDescription}</p>
        <div className="mt-3 grid gap-1.5 border-y border-[#e9e3da] py-2.5 text-[9px] font-normal leading-tight text-[#777] md:text-[10px]">
          {firstSpec ? <SpecLine icon="package" label={firstSpec.label} value={firstSpec.value} /> : null}
          {secondSpec ? <SpecLine icon="shield" label={secondSpec.label} value={secondSpec.value} /> : null}
        </div>
        <p className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px] font-medium text-[var(--color-ink)] md:text-xs">
          <span>Từ {formatPrice(product.price, product.currency)}</span>
          {product.compareAtPrice ? <span className="text-[10px] text-[var(--color-muted)] line-through md:text-[11px]">{formatPrice(product.compareAtPrice, product.currency)}</span> : null}
        </p>
      </Link>
      <ProductCardActions product={product} className="mt-2" />
    </article>
  );
}

function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function getSingleNumberParam(value: string | string[] | undefined) {
  const rawValue = getSingleParam(value);
  const parsed = rawValue ? Number.parseInt(rawValue, 10) : Number.NaN;

  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

function getOrderParam(value: string | string[] | undefined) {
  const rawValue = getSingleParam(value);

  return rawValue === "asc" || rawValue === "desc" ? rawValue : undefined;
}

function getOrderByParam(value: string | string[] | undefined) {
  const rawValue = getSingleParam(value);
  const supported = ["date", "id", "include", "title", "slug", "price", "popularity", "rating"] as const;

  return supported.find((item) => item === rawValue);
}

function SpecLine({ icon, label, value }: { icon: "package" | "shield"; label: string; value: string }) {
  const Icon = icon === "package" ? PackageCheck : ShieldCheck;

  return (
    <span className="flex min-h-4 items-center gap-1.5">
      <Icon aria-hidden="true" className="h-3.5 w-3.5 shrink-0 stroke-[1.45] text-[#7b7b7b]" />
      <span className="min-w-0 truncate">
        {label}: {value}
      </span>
    </span>
  );
}
