import type { ImageAsset } from "@/lib/image";
import { formatPrice } from "@/lib/format-price";
import type { Product, ProductCategory, ProductDetail, ProductNeed, StockStatus } from "./product-types";
import { decodeHtmlEntities, excerptFromHtml, htmlToText } from "./html-utils";
import type { WooCommerceImage, WooCommerceProductResponse, WooCommerceTaxonomy } from "./woocommerce-types";

const placeholderImage: ImageAsset = {
  src: "/placeholder-product.svg",
  alt: "Ảnh sản phẩm đang được cập nhật",
  width: 1200,
  height: 1200,
};

const categoryMap: Record<string, ProductCategory> = {
  "bao-cao-su": "bao-cao-su",
  "gel-boi-tron": "gel-boi-tron",
  "dung-dich-ve-sinh": "dung-dich-ve-sinh",
  "mui-thom": "mui-thom",
  combo: "combo",
};

const needMap: Record<string, ProductNeed> = {
  "sieu-mong": "sieu-mong",
  "super-invisible": "sieu-mong",
  "giant-invisible": "sieu-mong",
  "snake-invisible": "sieu-mong",
  "keo-dai": "keo-dai",
  "last-long": "keo-dai",
  gel: "nhieu-gel",
  "nhieu-gel": "nhieu-gel",
  "am-nong": "am-nong",
  warming: "am-nong",
  "gai-gan": "gai-gan",
  dots: "gai-gan",
  "cat-tongue": "gai-gan",
  sensitive: "sensitive",
  combo: "combo-tiet-kiem",
};

export function mapWooCommerceProduct(product: WooCommerceProductResponse): Product {
  const name = decodeHtmlEntities(product.name);
  const currency = product.prices.currency_code || "VND";
  const price = parseWooAmount(product.prices.price, product.prices.currency_minor_unit);
  const isOrderable = product.is_purchasable && product.is_in_stock && price > 0;
  const regularPrice = parseWooAmount(product.prices.regular_price, product.prices.currency_minor_unit);
  const hasCompareAtPrice = product.on_sale && regularPrice > 0 && regularPrice !== price;
  const compareAtPrice = hasCompareAtPrice ? regularPrice : undefined;
  const category = mapCategory(product.categories);
  const images = mapImages(product.images, name);
  const thumbnail = images[0] ?? placeholderImage;
  const stockStatus = mapStockStatus(product);
  const stockLabel = product.is_in_stock ? "Còn hàng" : "Hết hàng";
  const shortDescriptionSource = product.short_description || product.description;
  const shortDescription = shortDescriptionSource ? excerptFromHtml(shortDescriptionSource, 138) : "Thông tin sản phẩm đang được cập nhật.";
  const longDescription = htmlToText(product.description || product.short_description || "");
  const brand = product.brands[0]?.name ? decodeHtmlEntities(product.brands[0].name) : undefined;
  const specs = buildSpecs(product, brand, stockLabel);

  return {
    id: String(product.id),
    slug: product.slug,
    name,
    sku: product.sku || undefined,
    permalink: product.permalink || undefined,
    brand,
    category,
    needs: mapNeeds(product),
    shortDescription,
    longDescription,
    price,
    compareAtPrice,
    currency,
    formattedPrice: formatPrice(price, currency),
    formattedCompareAtPrice: compareAtPrice ? formatPrice(compareAtPrice, currency) : undefined,
    images: images.length ? images : [placeholderImage],
    thumbnail,
    badges: buildBadges(product, stockStatus),
    variants: [
      {
        id: `${product.id}-default`,
        label: "Quy cách mặc định",
        type: "pack-size",
        price,
        compareAtPrice,
        image: thumbnail,
        stockStatus,
        defaultQuantity: product.add_to_cart.minimum || 1,
      },
    ],
    specs,
    onSale: product.on_sale,
    inStock: product.is_in_stock,
    purchasable: isOrderable,
    stockLabel,
    rating: Number.parseFloat(product.average_rating) || 0,
    reviewCount: product.review_count,
    categories: product.categories,
    tags: product.tags,
    brands: product.brands,
    discreetShippingEligible: true,
    freeShippingEligible: price >= 500000,
  };
}

export function mapWooCommerceProductDetail(product: WooCommerceProductResponse): ProductDetail {
  const mapped = mapWooCommerceProduct(product);
  const categoryName = product.categories[0]?.name ? decodeHtmlEntities(product.categories[0].name) : "Sản phẩm";
  const brandName = product.brands[0]?.name ? decodeHtmlEntities(product.brands[0].name) : "Herfeel";
  const description = mapped.longDescription || mapped.shortDescription;

  return {
    ...mapped,
    badge: mapped.badges[0] ?? categoryName,
    highlights: [mapped.stockLabel ?? "Cập nhật tồn kho", brandName, categoryName, "Giao hàng kín đáo"],
    details: [
      { title: "Mô tả sản phẩm", content: description },
      { title: "Tình trạng", content: mapped.stockLabel ?? "Đang cập nhật" },
      { title: "Danh mục", content: categoryName },
      { title: "Giao hàng kín đáo", content: "Đơn hàng được đóng gói trung tính để bảo vệ riêng tư." },
    ],
    story: {
      eyebrow: "Thông tin từ WooCommerce Store API",
      title: mapped.shortDescription,
      stats: buildStoryStats(product, mapped.stockLabel ?? "Đang cập nhật"),
    },
    standards: [
      { title: "Thương hiệu", body: brandName },
      { title: "Danh mục", body: categoryName },
      { title: "Tồn kho", body: mapped.stockLabel ?? "Đang cập nhật" },
      { title: "Giao hàng", body: "Kín đáo" },
    ],
    comparison: mapped.specs.map((spec) => ({ label: spec.label, value: spec.value })),
    faqs: [
      { title: "Sản phẩm còn hàng không?", content: mapped.stockLabel ?? "Đang cập nhật." },
      { title: "Có giao hàng kín đáo không?", content: "Có. Đơn hàng được đóng gói trung tính theo hướng kín đáo." },
      { title: "Thông tin sản phẩm lấy từ đâu?", content: "Dữ liệu được lấy từ WooCommerce Store API của HerFeel." },
    ],
  };
}

function parseWooAmount(rawAmount: string, currencyMinorUnit: number) {
  const parsed = Number(rawAmount);

  if (!Number.isFinite(parsed)) return 0;

  return parsed / Math.pow(10, currencyMinorUnit);
}

function mapImages(images: WooCommerceImage[], productName: string): ImageAsset[] {
  return images.flatMap((image) => {
    const src = typeof image.src === "string" ? image.src : null;

    if (!src) return [];

    const alt = typeof image.alt === "string" && image.alt ? decodeHtmlEntities(image.alt) : productName;

    return [
      {
        src,
        alt,
        width: 1200,
        height: 1200,
      },
    ];
  });
}

function mapCategory(categories: WooCommerceTaxonomy[]): ProductCategory {
  const mapped = categories.map((category) => categoryMap[category.slug]).find(Boolean);

  return mapped ?? "combo";
}

function mapNeeds(product: WooCommerceProductResponse): ProductNeed[] {
  const sourceSlugs = [...product.tags, ...product.categories].map((item) => item.slug);
  const needs = sourceSlugs.map((slug) => needMap[slug]).filter((need): need is ProductNeed => Boolean(need));

  return [...new Set(needs)];
}

function mapStockStatus(product: WooCommerceProductResponse): StockStatus {
  if (!product.is_in_stock) return "out-of-stock";
  if (product.low_stock_remaining !== null) return "low-stock";

  return "in-stock";
}

function buildBadges(product: WooCommerceProductResponse, stockStatus: StockStatus) {
  const badges: string[] = [];

  if (stockStatus === "out-of-stock") badges.push("Hết hàng");
  if (product.on_sale) badges.push("Đang sale");
  if (product.brands[0]?.name) badges.push(decodeHtmlEntities(product.brands[0].name));

  return badges;
}

function buildSpecs(product: WooCommerceProductResponse, brand: string | undefined, stockLabel: string) {
  return [
    product.categories[0]?.name ? { label: "Danh mục", value: decodeHtmlEntities(product.categories[0].name) } : null,
    brand ? { label: "Thương hiệu", value: brand } : null,
    product.sku ? { label: "SKU", value: product.sku } : null,
    { label: "Tồn kho", value: stockLabel },
  ].filter((spec): spec is { label: string; value: string } => Boolean(spec));
}

function buildStoryStats(product: WooCommerceProductResponse, stockLabel: string) {
  return [
    { label: "Giá", value: formatPrice(parseWooAmount(product.prices.price, product.prices.currency_minor_unit), product.prices.currency_code || "VND") },
    { label: "Tồn kho", value: stockLabel },
    { label: "Đánh giá", value: `${Number.parseFloat(product.average_rating) || 0}/5` },
    { label: "Reviews", value: String(product.review_count) },
  ];
}
