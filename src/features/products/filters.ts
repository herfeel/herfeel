import type { ProductCategory, ProductNeed } from "./product-types";

export type ProductFilters = {
  category?: ProductCategory;
  needs?: ProductNeed[];
  inStock?: boolean;
};
