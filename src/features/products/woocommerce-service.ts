import type { WooCommerceProductResponse } from "./woocommerce-types";

const DEFAULT_STORE_URL = "https://herfeel.vn";
const STORE_API_TIMEOUT_MS = 5000;

export type GetProductsParams = {
  page?: number;
  perPage?: number;
  search?: string;
  category?: string;
  order?: "asc" | "desc";
  orderBy?: "date" | "id" | "include" | "title" | "slug" | "price" | "popularity" | "rating";
};

export async function getProducts(params: GetProductsParams = {}) {
  const url = buildStoreApiUrl("/wp-json/wc/store/v1/products");
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.set("page", String(params.page));
  if (params.perPage) searchParams.set("per_page", String(params.perPage));
  if (params.search) searchParams.set("search", params.search);
  if (params.category) searchParams.set("category", params.category);
  if (params.order) searchParams.set("order", params.order);
  if (params.orderBy) searchParams.set("orderby", params.orderBy);

  url.search = searchParams.toString();

  const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(STORE_API_TIMEOUT_MS) });

  if (!response.ok) {
    throw new Error(`WooCommerce products request failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as WooCommerceProductResponse[];
}

export async function getProductBySlug(slug: string) {
  const url = buildStoreApiUrl("/wp-json/wc/store/v1/products");
  const searchParams = new URLSearchParams({ slug, per_page: "1" });
  url.search = searchParams.toString();

  const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(STORE_API_TIMEOUT_MS) });

  if (!response.ok) {
    throw new Error(`WooCommerce product request failed: ${response.status} ${response.statusText}`);
  }

  const products = (await response.json()) as WooCommerceProductResponse[];

  return products[0] ?? null;
}

export async function getRelatedProducts(product: WooCommerceProductResponse, limit = 4) {
  const category = product.categories[0]?.id;

  if (!category) return [];

  const products = await getProducts({ category: String(category), perPage: limit + 1 });

  return products.filter((item) => item.id !== product.id).slice(0, limit);
}

function buildStoreApiUrl(pathname: string) {
  const baseUrl = process.env.WOOCOMMERCE_STORE_URL || DEFAULT_STORE_URL;

  return new URL(pathname, baseUrl);
}
