import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PackageCheck, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { collectionPages, getCollectionPageBySlug } from "@/data/mock/collections";
import { mockProducts } from "@/data/mock/products";
import { ProductCardActions } from "@/features/products/components/product-card-actions";
import type { Product } from "@/features/products/product-types";
import { formatPrice } from "@/lib/format-price";

type CollectionPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return collectionPages.filter((collection) => collection.slug !== "mong-nhe").map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionPageBySlug(slug);

  return {
    title: collection?.title ?? "Collection",
    description: collection?.subtitle,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = getCollectionPageBySlug(slug);

  if (!collection) notFound();

  const products = collection.productSlugs
    .map((productSlug) => mockProducts.find((product) => product.slug === productSlug))
    .filter((product): product is Product => Boolean(product));

  return (
    <div className="bg-white">
      <section className="border-b border-[var(--color-border)] bg-white pb-6 md:pb-10">
        <Container>
          <nav className="flex min-w-0 flex-wrap items-center gap-1.5 py-3 text-[11px] text-[var(--color-muted)] md:py-4" aria-label="Breadcrumb">
            {collection.breadcrumb.map((item, index) => (
              <span key={item.label} className="inline-flex min-w-0 items-center gap-1.5">
                {item.href ? (
                  <Link href={item.href} className="hover:text-[var(--color-ink)] hover:underline">
                    {item.label}
                  </Link>
                ) : (
                  <span className="truncate text-[var(--color-ink)]">{item.label}</span>
                )}
                {index < collection.breadcrumb.length - 1 ? <span aria-hidden="true">/</span> : null}
              </span>
            ))}
          </nav>
        </Container>
        <div className="relative overflow-hidden bg-[radial-gradient(circle_at_76%_44%,rgb(199_241_197_/_0.62),transparent_23%),linear-gradient(115deg,#eef5f4_0%,#f8f5ef_54%,#dfeeee_100%)] md:min-h-[250px] lg:min-h-[300px]">
          <Container className="relative md:flex md:min-h-[300px] md:items-center">
            <div className="max-w-[720px] py-6 md:py-10">
              {collection.eyebrow ? <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">{collection.eyebrow}</p> : null}
              <h1 className="max-w-[11.5ch] text-[28px] font-semibold leading-[1.04] tracking-normal sm:max-w-[13ch] md:max-w-[720px] md:text-[52px] md:font-medium lg:text-[60px]">{collection.title}</h1>
              <p className="mt-3 max-w-[640px] text-[14px] leading-snug text-[var(--color-ink)]/78 md:text-[16px]">{collection.subtitle}</p>
            </div>
          </Container>
        </div>
      </section>
      <ProductGrid products={products} />
      <SupportSection title={collection.supportSection.title} body={collection.supportSection.body} ctaLabel={collection.supportSection.ctaLabel} ctaHref={collection.supportSection.ctaHref} />
      <FaqSection faqs={collection.faqs} />
    </div>
  );
}

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <section className="bg-white py-8 md:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-[1160px] px-5 md:px-12 lg:px-[var(--gutter-desktop)]">
        <div className="grid grid-cols-2 gap-x-2 gap-y-14 md:gap-x-4 md:gap-y-10 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-12">
          {products.map((product) => (
            <CollectionProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionProductCard({ product }: { product: Product }) {
  const [firstSpec, secondSpec] = product.specs;
  const productHref = `/products/${product.slug}`;

  return (
    <article className="group min-w-0">
      <Link href={productHref} className="block rounded-[var(--radius-md)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-green)]">
        <div className="product-card-media relative aspect-square overflow-hidden rounded-[var(--radius-md)] bg-white ring-1 ring-[#ece8df]">
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
        <p className="mt-3 text-[11px] font-medium text-[var(--color-ink)] md:text-xs">Từ {formatPrice(product.price, product.currency)}</p>
      </Link>
      <ProductCardActions product={product} className="mt-2" />
    </article>
  );
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

function SupportSection({ title, body, ctaLabel, ctaHref }: { title: string; body: string; ctaLabel?: string; ctaHref?: string }) {
  return (
    <section className="bg-white py-8 md:py-12 lg:py-16">
      <Container>
        <div className="relative min-h-[220px] overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-ink)] text-white md:min-h-[260px]">
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_78%_45%,rgb(199_241_197_/_0.28),transparent_25%),linear-gradient(115deg,#171717_0%,#303633_56%,#eef5f3_140%)]" />
          <div className="relative max-w-[560px] p-6 md:p-10 lg:p-12">
            <h2 className="text-[25px] font-semibold leading-[1.04] md:text-[44px]">{title}</h2>
            <p className="mt-3 text-sm leading-snug text-white/84 md:text-base">{body}</p>
            {ctaLabel && ctaHref ? (
              <Button href={ctaHref} variant="secondary" className="mt-6 min-h-10 px-5 text-xs !text-[var(--color-ink)]">
                {ctaLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

function FaqSection({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <section className="bg-white py-10 md:py-14 lg:py-16">
      <Container>
        <div className="grid gap-8 md:grid-cols-[minmax(320px,0.88fr)_minmax(0,1.12fr)] md:gap-12 lg:gap-16">
          <h2 className="max-w-[9ch] text-[34px] font-semibold leading-[1.02] tracking-normal sm:max-w-none md:text-[48px] md:font-medium lg:text-[54px]">Câu hỏi thường gặp</h2>
          <div>
            {faqs.slice(0, 3).map((faq, index) => (
              <details key={faq.question} className="group border-b border-[var(--color-border)] py-5 first:pt-0 md:py-6" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[16px] font-semibold leading-tight text-[var(--color-ink)] marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-green)] md:text-[18px] [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <span aria-hidden="true" className="text-xl leading-none transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 max-w-[680px] text-[15px] leading-[1.5] text-[var(--color-muted)] md:text-[16px]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
