export type MegaTab = "Mua theo danh mục" | "Mua theo nhu cầu";

export type MenuTile = {
  title: string;
  href: string;
  image: string;
  visual?: "tube" | "box" | "bottle" | "combo";
  tone?: "mint" | "charcoal" | "amber" | "blue" | "rose" | "cream";
  body?: string;
};

export const mainNav = [
  { label: "Mua sắm", href: "/shop", menu: true, value: "shop" },
  { label: "Chăm sóc cá nhân", href: "/category/dung-dich-ve-sinh" },
  { label: "Vì sao Herfeel?", href: "/#why-herfeel" },
  { label: "Hướng dẫn", href: "/collections/mong-nhe" },
];

export const megaTabs: MegaTab[] = ["Mua theo danh mục", "Mua theo nhu cầu"];

export const categoryTiles: MenuTile[] = [
  { title: "Bao cao su", href: "/category/bao-cao-su", image: "/images/playah/home/categories/category-condoms.webp", visual: "box", tone: "mint" },
  { title: "Dung dịch vệ sinh", href: "/category/dung-dich-ve-sinh", image: "/images/playah/home/categories/category-personal-care.webp", visual: "bottle", tone: "cream" },
  { title: "Gel bôi trơn", href: "/category/gel-boi-tron", image: "/images/playah/home/categories/category-lubricant.webp", visual: "tube", tone: "blue" },
  { title: "Mùi hương", href: "/category/mui-thom", image: "/images/highlight-product/mui-huong.webp", visual: "bottle", tone: "rose" },
];

export const needTiles: MenuTile[] = [
  { title: "Mỏng nhẹ", href: "/collections/mong-nhe", image: "/images/playah/home/feelings/ultra-thin-feeling.webp", visual: "box", tone: "charcoal" },
  { title: "Kéo dài", href: "/collections/keo-dai", image: "/images/playah/home/feelings/long-lasting-feeling.webp", visual: "combo", tone: "amber" },
  { title: "Ấm nóng", href: "/collections/am-nong", image: "/images/navigation/keo-dai.webp", visual: "tube", tone: "rose" },
  { title: "Dưỡng ẩm", href: "/collections/gel-boi-tron", image: "/images/playah/home/feelings/moisture-ha-gel.webp", visual: "bottle", tone: "blue" },
];

export const guideTiles: MenuTile[] = [
  { title: "Chưa biết chọn gì?", body: "Gợi ý kín đáo theo nhu cầu", href: "/collections/mong-nhe", image: "/images/playah/home/promo/promo-playbook-prebiotic-care.webp", visual: "combo", tone: "charcoal" },
  { title: "Bộ sản phẩm cho người mới", body: "Dễ bắt đầu, ít phải đoán", href: "/category/combo", image: "/images/playah/home/promo/promo-combo-last-long.webp", visual: "combo", tone: "mint" },
  { title: "Giao hàng kín đáo", body: "Đóng gói riêng tư", href: "/checkout", image: "/images/playah/home/categories/category-personal-care.webp", visual: "box", tone: "cream" },
  { title: "The PlayBook", body: "Hướng dẫn sử dụng an toàn", href: "/collections/mong-nhe", image: "/images/playah/home/standards/sensitive-care-standard.jpeg", visual: "tube", tone: "blue" },
];

export const mobileGroups = [
  { title: "Mua sắm", links: categoryTiles.map(({ title, href }) => ({ title, href })) },
  { title: "Nhu cầu", links: needTiles.map(({ title, href }) => ({ title, href })) },
  { title: "Hướng dẫn", links: [{ title: "Vì sao Herfeel?", href: "/#why-herfeel" }, ...guideTiles.map(({ title, href }) => ({ title, href }))] },
  { title: "Hỗ trợ", links: [{ title: "Giao hàng kín đáo", href: "/checkout" }, { title: "Tư vấn riêng tư", href: "/collections/mong-nhe" }, { title: "Theo dõi đơn", href: "/account" }] },
];
