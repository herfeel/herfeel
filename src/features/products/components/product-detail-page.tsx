import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ProductGallery } from "@/features/products/components/product-gallery";
import { ProductPurchasePanel } from "@/features/products/components/product-purchase-panel";
import type { Product, ProductDetail } from "@/features/products/product-types";
import { formatPrice } from "@/lib/format-price";

type ProductDetailPageProps = {
  product: ProductDetail;
  relatedProducts: Product[];
};

export function ProductDetailPage({ product, relatedProducts }: ProductDetailPageProps) {
  return (
    <main className="bg-white">
      <Hero product={product} />
      <RelatedProducts products={relatedProducts} />
      <DescriptionSection product={product} />
    </main>
  );
}

function Hero({ product }: { product: ProductDetail }) {
  return (
    <section className="border-b border-[var(--color-border)] bg-white pb-8 pt-2 md:pb-12">
      <div className="mx-auto w-full max-w-[1380px] px-[var(--gutter-mobile)] md:px-[var(--gutter-tablet)] lg:px-[var(--gutter-desktop)]">
        <nav className="mb-3 flex gap-2 text-[11px] text-[var(--color-muted)] md:mb-5" aria-label="Breadcrumb">
          <Link href="/">Trang chủ</Link>
          <span>/</span>
          <Link href="/shop">Sản phẩm</Link>
          <span>/</span>
          <span className="text-[var(--color-ink)]">{product.badge}</span>
        </nav>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(336px,420px)] lg:items-start lg:gap-8 xl:gap-12">
          <ProductGallery product={product} />
          <ProductPurchasePanel product={product} />
        </div>
      </div>
    </section>
  );
}

function RelatedProducts({ products }: { products: Product[] }) {
  if (!products.length) return null;

  return (
    <section className="bg-white py-12 md:py-16">
      <Container>
        <div className="mb-6 flex items-end justify-between gap-5">
          <h2 className="text-[28px] font-semibold leading-tight md:text-[42px]">
            Gợi ý <em className="font-serif font-normal italic">sản phẩm</em>
          </h2>
          <Button href="/shop" className="hidden min-h-9 px-4 text-xs md:inline-flex">Xem tất cả</Button>
        </div>
        <div className="flex snap-x gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-4 md:overflow-visible">
          {products.map((product) => {
            const productHref = `/products/${product.slug}`;

            return (
              <article key={product.id} className="group min-w-[72%] snap-start md:min-w-0">
                <Link href={productHref} className="block rounded-[var(--radius-md)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-green)]">
                  <div className="relative aspect-square overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-surface)]">
                    <Badge tone="urgent" className="absolute left-3 top-3 z-10 bg-transparent px-0 text-[10px] uppercase text-[var(--color-orange)]">Mẫu</Badge>
                    <Image src={product.thumbnail.src} alt={product.thumbnail.alt} width={product.thumbnail.width} height={product.thumbnail.height} sizes="(min-width: 768px) 25vw, 72vw" className="h-full w-full object-contain p-8 transition-transform duration-300 group-hover:scale-[1.05]" />
                  </div>
                  <h3 className="mt-3 text-sm font-semibold leading-tight">{product.name}</h3>
                  <p className="mt-1 min-h-9 text-xs leading-snug text-[var(--color-muted)]">{product.shortDescription}</p>
                  <p className="mt-2 text-xs font-semibold">Từ {formatPrice(product.price, product.currency)}</p>
                </Link>
                <Button href={productHref} className="mt-3 min-h-8 px-4 py-1 text-xs font-bold">
                  Xem chi tiết
                </Button>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function DescriptionSection({ product }: { product: ProductDetail }) {
  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-12 md:py-16">
      <Container>
        <div className="grid gap-8 md:grid-cols-[0.72fr_1fr] md:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">Mô tả</p>
            <h2 className="mt-3 max-w-[560px] text-[32px] font-semibold leading-tight text-[var(--color-ink)] md:text-[46px]">
              Mô tả <em className="font-serif font-normal italic">sản phẩm</em>
            </h2>
            <p className="mt-5 max-w-[560px] text-sm leading-6 text-[var(--color-muted)] md:text-base md:leading-7">{product.longDescription}</p>
          </div>
          <div className="overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white">
            {product.details.map((detail) => (
              <div key={detail.title} className="border-b border-[var(--color-border)] px-5 py-4 last:border-b-0 md:px-6 md:py-5">
                <h3 className="text-sm font-semibold text-[var(--color-ink)]">{detail.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{detail.content}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
