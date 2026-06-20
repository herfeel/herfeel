import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PackageCheck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { mockCategories } from "@/data/mock/categories";
import { mockProducts } from "@/data/mock/products";
import { ProductCardActions } from "@/features/products/components/product-card-actions";
import type { Product } from "@/features/products/product-types";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format-price";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

const needLabels: Record<string, string> = {
  "sieu-mong": "Siêu mỏng",
  "keo-dai": "Kéo dài",
  "nhieu-gel": "Nhiều gel",
  "am-nong": "Ấm nóng",
  "gai-gan": "Gai/gân",
  "khong-latex": "Không latex",
  sensitive: "Sensitive",
  "combo-tiet-kiem": "Combo tiết kiệm",
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = mockCategories.find((item) => item.slug === slug);

  if (!category) {
    return {
      title: "Danh mục không tồn tại",
    };
  }

  return {
    title: category.label,
    description: `Mua ${category.label.toLowerCase()} Herfeel với thông tin sản phẩm rõ ràng và giao hàng kín đáo.`,
  };
}

export function generateStaticParams() {
  return mockCategories.map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = mockCategories.find((item) => item.slug === slug);

  if (!category) notFound();

  const products = mockProducts.filter((product) => product.category === category.slug).slice(0, 24);
  const relatedCategories = mockCategories.filter((item) => item.slug !== category.slug).slice(0, 4);

  return (
    <div className="bg-white">
      <CategoryHero category={category} productCount={products.length} />
      <CategoryNavigation needs={category.needs} relatedCategories={relatedCategories} />
      <CategoryProductGrid products={products} categoryLabel={category.label} />
    </div>
  );
}

function CategoryHero({ category, productCount }: { category: (typeof mockCategories)[number]; productCount: number }) {
  return (
    <section className="border-b border-[var(--color-border)] bg-white">
      <div className="bg-[var(--color-surface)]">
        <Container>
          <nav className="flex min-w-0 flex-wrap items-center gap-2 py-4 text-[13px] font-medium text-[var(--color-muted)]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[var(--color-ink)] hover:underline">
              Trang chủ
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/shop" className="hover:text-[var(--color-ink)] hover:underline">
              Tất cả sản phẩm
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[var(--color-ink)]">{category.label}</span>
          </nav>
        </Container>
      </div>
      <Container>
        <div className="grid gap-8 py-9 md:grid-cols-[1fr_320px] md:items-end md:py-12 lg:grid-cols-[1fr_420px] lg:py-16">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">Danh mục</p>
            <h1 className="mt-3 max-w-[760px] text-[42px] font-semibold leading-[1.02] tracking-normal text-[var(--color-ink)] md:text-[64px] lg:text-[76px]">{category.label}</h1>
            <p className="mt-4 max-w-[620px] text-[16px] leading-7 text-[var(--color-muted)] md:text-[18px]">
              Xem nhanh sản phẩm Herfeel theo danh mục, kiểm tra quy cách, chất liệu và lựa chọn phù hợp trong một listing gọn.
            </p>
          </div>
          <div className="rounded-[var(--radius-md)] bg-[var(--color-ink)] p-5 text-white">
            <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-white/62">{productCount} sản phẩm mẫu</p>
            <p className="mt-3 text-[24px] font-semibold leading-tight">Thông tin rõ, mua sắm kín đáo.</p>
            <p className="mt-3 text-sm leading-6 text-white/72">Dữ liệu hiện dùng cho mock storefront; giá, chính sách và copy thương mại cần được Herfeel duyệt trước khi bán thật.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function CategoryNavigation({ needs, relatedCategories }: { needs: (typeof mockCategories)[number]["needs"]; relatedCategories: typeof mockCategories }) {
  return (
    <section className="border-b border-[var(--color-border)] bg-white py-5 md:py-6">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">Lọc nhanh</p>
          <Link href="/shop" className="text-xs font-semibold underline">
            Xem tất cả
          </Link>
        </div>
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {needs.map((need) => (
            <ShortcutChip key={need} href={needToHref(need)} label={needLabels[need] ?? need} />
          ))}
          {relatedCategories.map((category) => (
            <ShortcutChip key={category.slug} href={`/category/${category.slug}`} label={category.label} muted />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ShortcutChip({ href, label, muted = false }: { href: string; label: string; muted?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 shrink-0 items-center rounded-[var(--radius-pill)] border-2 border-transparent px-6 text-[14px] font-semibold leading-none transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-green)] md:min-h-[52px] md:px-8 md:text-[16px]",
        muted ? "bg-white ring-1 ring-[var(--color-border)] hover:bg-[var(--color-surface)]" : "bg-[#eeeeee] hover:border-[#36764c] hover:bg-[var(--color-green-soft)]",
      )}
    >
      {label}
    </Link>
  );
}

function CategoryProductGrid({ products, categoryLabel }: { products: Product[]; categoryLabel: string }) {
  return (
    <section className="bg-white py-8 md:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-[1160px] px-5 md:px-12 lg:px-[var(--gutter-desktop)]">
        {products.length ? (
          <div className="grid grid-cols-2 gap-x-2 gap-y-14 md:gap-x-4 md:gap-y-10 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-12">
            {products.map((product) => (
              <CategoryProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-12 text-center">
            <h2 className="text-[24px] font-semibold leading-tight text-[var(--color-ink)]">Chưa có sản phẩm trong {categoryLabel}</h2>
            <p className="mx-auto mt-2 max-w-[520px] text-sm text-[var(--color-muted)]">Danh mục này đang chờ dữ liệu sản phẩm. Bạn có thể xem tất cả sản phẩm hoặc chuyển sang collection liên quan.</p>
            <Button href="/shop" className="mt-6 min-h-10 px-5 text-xs font-bold">
              Xem tất cả
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function CategoryProductCard({ product }: { product: Product }) {
  const [firstSpec, secondSpec] = product.specs;
  const productHref = `/products/${product.slug}`;

  return (
    <article className="group min-w-0">
      <Link href={productHref} className="block rounded-[var(--radius-md)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-green)]">
        <div className="product-card-media relative aspect-square overflow-hidden rounded-[var(--radius-md)] bg-white ring-1 ring-[#ece8df]">
          {product.badges[0] ? <span className="absolute left-2 top-2 z-10 rounded-[var(--radius-pill)] bg-white px-2.5 py-1 text-[9px] font-semibold text-[var(--color-ink)] ring-1 ring-[#ece8df] md:text-[10px]">{product.badges[0]}</span> : null}
          <Image
            src={product.thumbnail.src}
            alt={product.thumbnail.alt}
            width={product.thumbnail.width}
            height={product.thumbnail.height}
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 312px, calc((100vw - 56px) / 2)"
            className="product-card-image h-full w-full object-contain"
          />
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

function needToHref(need: string) {
  if (need === "sieu-mong") return "/collections/mong-nhe";
  if (need === "keo-dai") return "/collections/keo-dai";
  if (need === "am-nong") return "/collections/am-nong";
  if (need === "nhieu-gel") return "/collections/gel-boi-tron";
  if (need === "combo-tiet-kiem") return "/collections/combo";
  if (need === "sensitive") return "/collections/sensitive";

  return "/shop";
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
