import type { ImageAsset } from "@/lib/image";

export type ProductCategory = "bao-cao-su" | "gel-boi-tron" | "dung-dich-ve-sinh" | "mui-thom" | "combo";

export type ProductNeed =
  | "sieu-mong"
  | "keo-dai"
  | "nhieu-gel"
  | "am-nong"
  | "gai-gan"
  | "khong-latex"
  | "sensitive"
  | "combo-tiet-kiem";

export type StockStatus = "in-stock" | "low-stock" | "out-of-stock";

export type ProductVariant = {
  id: string;
  label: string;
  type: "pack-size" | "thickness" | "texture" | "material" | "volume" | "formula" | "scent" | "bundle";
  price: number;
  compareAtPrice?: number;
  image?: ImageAsset;
  swatch?: string;
  badge?: string;
  stockStatus: StockStatus;
  defaultQuantity?: number;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  sku?: string;
  permalink?: string;
  brand?: string;
  category: ProductCategory;
  needs: ProductNeed[];
  shortDescription: string;
  longDescription: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  formattedPrice?: string;
  formattedCompareAtPrice?: string;
  images: ImageAsset[];
  thumbnail: ImageAsset;
  hoverImage?: ImageAsset;
  badges: string[];
  variants: ProductVariant[];
  specs: ProductSpec[];
  onSale?: boolean;
  inStock: boolean;
  purchasable?: boolean;
  stockLabel?: string;
  rating: number;
  reviewCount: number;
  categories?: { id: number; name: string; slug: string; link: string }[];
  tags?: { id: number; name: string; slug: string; link: string }[];
  brands?: { id: number; name: string; slug: string; link: string }[];
  packCount?: number;
  material?: string;
  texture?: string;
  sensation?: string;
  size?: string;
  volume?: string;
  scent?: string;
  compatibility?: string;
  skinType?: string;
  discreetShippingEligible?: boolean;
  freeShippingEligible?: boolean;
  bundleSavings?: string;
  upsellGroup?: string;
  relatedProductIds?: string[];
};

export type ProductDetailOption = {
  name: string;
  values: string[];
};

export type ProductDetailSection = {
  title: string;
  content: string;
};

export type ProductDetail = Product & {
  badge?: string;
  options?: ProductDetailOption[];
  highlights: string[];
  details: ProductDetailSection[];
  story: {
    eyebrow: string;
    title: string;
    stats: { label: string; value: string }[];
  };
  standards: { title: string; body: string }[];
  comparison: { label: string; value: string }[];
  faqs: ProductDetailSection[];
};
