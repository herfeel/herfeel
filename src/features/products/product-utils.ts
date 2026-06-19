import type { Product, ProductCategory } from "./product-types";

export function getProductsByCategory(products: Product[], category: ProductCategory) {
  return products.filter((product) => product.category === category);
}

export function getProductBySlug(products: Product[], slug: string) {
  return products.find((product) => product.slug === slug);
}
