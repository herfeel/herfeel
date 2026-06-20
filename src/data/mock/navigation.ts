export type ShopNavigationGroupId = "category" | "feeling" | "newcomer";

export type ShopNavigationItem = {
  label: string;
  href: string;
  description?: string;
  badge?: string;
  image?: string;
  imageClassName?: string;
  tone?: "surface" | "mint" | "blue" | "rose" | "amber" | "charcoal";
};

export type ShopNavigationGroup = {
  id: ShopNavigationGroupId;
  label: string;
  description: string;
  items: ShopNavigationItem[];
};

export const mainNav = [
  { label: "Mua sắm", href: "/shop", menu: true, value: "shop" },
  { label: "Build Kit", href: "/play-kit" },
  { label: "Vì sao Herfeel?", href: "/#why-herfeel" },
  { label: "PlayBook", href: "/playbook" },
] as const;

export const shopNavigationGroups: ShopNavigationGroup[] = [
  {
    id: "category",
    label: "Theo danh mục",
    description: "Đi thẳng tới nhóm sản phẩm cần mua.",
    items: [
      { label: "Tất cả sản phẩm", href: "/shop", description: "Toàn bộ catalog Herfeel", badge: "All", image: "/images/navigation/tat-ca-san-pham.webp", imageClassName: "object-contain object-[72%_78%] p-4", tone: "mint" },
      { label: "Bao cao su Herfeel", href: "/category/bao-cao-su", description: "Mỏng nhẹ, kéo dài, cảm giác mới", image: "/images/navigation/last-long.webp", imageClassName: "object-contain object-[72%_78%] p-5", tone: "surface" },
      { label: "Gel bôi trơn", href: "/category/gel-boi-tron", description: "Thêm mượt, thêm ẩm", image: "/images/navigation/am-nong.webp", imageClassName: "object-contain object-[76%_78%] p-5", tone: "rose" },
      { label: "Dung dịch vệ sinh", href: "/category/dung-dich-ve-sinh", description: "Chăm sóc cá nhân kín đáo", image: "/images/navigation/bot-ve-sinh.webp", imageClassName: "object-contain object-[72%_82%] p-5", tone: "surface" },
      { label: "Mùi hương", href: "/category/mui-thom", description: "Dễ chịu trước/sau cuộc vui", image: "/images/navigation/mui-huong.webp", imageClassName: "object-contain object-[72%_82%] p-5", tone: "rose" },
      { label: "Combo tiết kiệm", href: "/collections/combo", description: "Gộp sản phẩm dễ chọn", badge: "Deal", image: "/images/navigation/combo.webp", imageClassName: "object-contain object-[72%_78%] p-4", tone: "charcoal" },
    ],
  },
  {
    id: "feeling",
    label: "Theo cảm giác",
    description: "Chọn theo nhu cầu, không cần nhớ tên sản phẩm.",
    items: [
      { label: "Siêu mỏng 0.03", href: "/collections/mong-nhe", description: "Ưu tiên cảm giác tự nhiên", image: "/images/navigation/mood/sieu-mong.webp", imageClassName: "object-contain object-[84%_76%] p-3", tone: "mint" },
      { label: "Kéo dài, thong thả", href: "/collections/keo-dai", description: "Nhịp chậm hơn, dễ kiểm soát", image: "/images/navigation/mood/keo-dai.webp", imageClassName: "object-contain object-[84%_78%] p-3", tone: "rose" },
      { label: "Dưỡng ẩm căng mọng", href: "/collections/gel-boi-tron", description: "Thêm ẩm, mượt hơn", image: "/images/navigation/mood/duong-am.webp", imageClassName: "object-contain object-[84%_78%] p-3", tone: "blue" },
      { label: "Ấm nóng", href: "/collections/am-nong", description: "Cảm giác ấm rõ hơn", image: "/images/navigation/mood/am-nong.webp", imageClassName: "object-contain object-[84%_78%] p-3", tone: "amber" },
      { label: "Gai lưỡi mèo", href: "/collections/gai-gan", description: "Thêm bề mặt chạm khác lạ", image: "/images/navigation/mood/gai-luoi-meo.webp", imageClassName: "object-contain object-[84%_78%] p-3", tone: "rose" },
    ],
  },
  // {
  //   id: "newcomer",
  //   label: "Dành cho người mới",
  //   description: "Các lối vào dễ bắt đầu, ít ngại hỏi.",
  //   items: [
  //     { label: "Dễ bắt đầu", href: "/playbook#nguoi-moi", description: "Chọn nhanh theo tình huống", image: "/images/navigation/combo.png", imageClassName: "object-contain object-[72%_78%] p-4", tone: "mint" },
  //     { label: "Combo cơ bản", href: "/collections/combo", description: "Những món nên có trước", image: "/images/navigation/combo.png", imageClassName: "object-contain object-[72%_78%] p-4", tone: "surface" },
  //     { label: "Bao + gel", href: "/collections/combo", description: "Cặp đôi thực tế, dễ dùng", image: "/images/navigation/last-long.webp", imageClassName: "object-contain object-[72%_78%] p-5", tone: "blue" },
  //     { label: "Câu hỏi ngại hỏi", href: "/playbook#cau-hoi-ngai-hoi", description: "Giải thích thẳng, riêng tư", image: "/images/navigation/bot-ve-sinh.webp", imageClassName: "object-contain object-[72%_82%] p-5", tone: "rose" },
  //   ],
  // },
];

export const shopNavigationTrustNote = "Giao hàng kín đáo · Chính hãng · Dễ chọn";
