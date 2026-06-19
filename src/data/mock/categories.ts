import type { ProductCategory, ProductNeed } from "@/features/products/product-types";

export type MockCategory = {
  slug: ProductCategory;
  label: string;
  needs: ProductNeed[];
};

export const mockCategories: MockCategory[] = [
  { slug: "bao-cao-su", label: "Bao cao su", needs: ["sieu-mong", "keo-dai", "nhieu-gel", "gai-gan", "khong-latex", "sensitive"] },
  { slug: "gel-boi-tron", label: "Gel bôi trơn", needs: ["nhieu-gel", "am-nong", "sensitive"] },
  { slug: "dung-dich-ve-sinh", label: "Chăm sóc cá nhân", needs: ["sensitive"] },
  { slug: "mui-thom", label: "Mùi hương", needs: [] },
  { slug: "combo", label: "Combo", needs: ["combo-tiet-kiem"] },
];
