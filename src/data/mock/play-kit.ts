export type PlayKitStep = {
  number: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
};

export type PlayKitPack = {
  eyebrow: string;
  title: string;
  products: string[];
  description: string;
  href: string;
};

export const playKitSteps: PlayKitStep[] = [
  {
    number: "01",
    title: "Chọn bao cao su",
    description: "Bắt đầu với loại phù hợp nhu cầu: mỏng nhẹ, kéo dài, nhiều gel, gai/gân hoặc sensitive.",
    ctaLabel: "Xem bao cao su",
    href: "/category/bao-cao-su",
  },
  {
    number: "02",
    title: "Thêm gel bôi trơn",
    description: "Chọn công thức gốc nước, ấm nóng hoặc dịu nhẹ để bộ kit đủ dùng và dễ kết hợp.",
    ctaLabel: "Xem gel",
    href: "/category/gel-boi-tron",
  },
  {
    number: "03",
    title: "Hoàn tất bằng add-on",
    description: "Bổ sung chăm sóc cá nhân, mùi hương hoặc combo nhỏ để đơn hàng tròn bộ hơn.",
    ctaLabel: "Xem add-on",
    href: "/shop",
  },
];

export const playKitStarterPacks: PlayKitPack[] = [
  {
    eyebrow: "Date Night",
    title: "Gọn nhẹ cho buổi hẹn",
    products: ["Bao cao su mỏng nhẹ", "Gel gốc nước", "Add-on chăm sóc cá nhân"],
    description: "Một bộ dễ bắt đầu, kín đáo, đủ các món cơ bản để không phải đoán nhiều.",
    href: "/collections/combo",
  },
  {
    eyebrow: "Her Feel",
    title: "Êm dịu và dễ kết hợp",
    products: ["Bao cao su sensitive", "Gel HA", "Dung dịch vệ sinh"],
    description: "Tập trung vào cảm giác nhẹ, thông tin tương thích rõ ràng và chăm sóc sau khi dùng.",
    href: "/collections/sensitive",
  },
  {
    eyebrow: "Bachelor",
    title: "Bộ sẵn sàng hằng ngày",
    products: ["Bao cao su kéo dài", "Gel ấm nóng", "Combo tiết kiệm"],
    description: "Phù hợp khi muốn chuẩn bị nhiều lựa chọn trong một lần mua, vẫn giữ giỏ hàng gọn.",
    href: "/collections/combo",
  },
];

export const playKitTerms = [
  "Chọn đủ 3 sản phẩm bất kỳ trong đơn hàng để dùng ưu đãi Play Kit.",
  "Mã PLAYKIT15 hiển thị như thông tin khuyến mãi; xử lý giảm giá thực tế thuộc hệ thống bán hàng.",
  "Ưu đãi không kết hợp với mã giảm giá khác và có thể thay đổi theo chính sách hiện hành.",
];
