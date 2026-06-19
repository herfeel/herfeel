export type VisualTone = "dark" | "warm" | "amber" | "green" | "soft" | "mono";

export type HomeVisual = {
  label: string;
  tone: VisualTone;
  motif: "pack" | "bottle" | "drop" | "box" | "portrait" | "bundle" | "care";
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
  imageFit?: "cover" | "contain";
};

export const heroCards = [
  {
    title: "Mỏng da chạm da",
    href: "/collections/mong-nhe",
    visual: {
      label: "Siêu mỏng",
      tone: "dark",
      motif: "box",
      imageSrc: "/images/highlight-product/bao-cao-su.webp",
      imageAlt: "Hộp bao cao su siêu mỏng Herfeel",
      imagePosition: "35% center",
      imageFit: "contain",
    } satisfies HomeVisual,
  },
  {
    title: "Dưỡng ẩm căng mọng",
    href: "/category/gel-boi-tron",
    visual: {
      label: "Gốc nước",
      tone: "warm",
      motif: "drop",
      imageSrc: "/images/highlight-product/gel-boi-tron.webp",
      imageAlt: "Gel bôi trơn Herfeel với kết cấu nước",
      imagePosition: "72% center",
      imageFit: "contain",
    } satisfies HomeVisual,
  },
  {
    title: "Kéo dài sướng sung",
    href: "/collections/keo-dai",
    visual: {
      label: "Kéo dài",
      tone: "amber",
      motif: "pack",
      imageSrc: "/images/navigation/last-long.webp",
      imageAlt: "Hộp sản phẩm kéo dài Herfeel",
      imagePosition: "35% center",
      imageFit: "contain",
    } satisfies HomeVisual,
  },
  {
    title: "Kích thích mới mẻ",
    href: "/collections/am-nong",
    visual: {
      label: "Ấm nóng",
      tone: "soft",
      motif: "bottle",
      imageSrc: "/images/navigation/am-nong.webp",
      imageAlt: "Sản phẩm cảm giác ấm nóng Herfeel",
      imagePosition: "35% center",
      imageFit: "contain",
    } satisfies HomeVisual,
  },
];

export const shortcutPills = [
  { label: "Bán chạy", href: "/collections/ban-chay", visual: { label: "Bán chạy", tone: "dark", motif: "pack", imageSrc: "/images/highlight-product/ban-chay.webp", imageAlt: "Hộp bao cao su siêu mỏng Herfeel", imagePosition: "35% center" } satisfies HomeVisual },
  { label: "Bao cao su", href: "/category/bao-cao-su", visual: { label: "Bao cao su", tone: "mono", motif: "box", imageSrc: "/images/highlight-product/bao-cao-su.webp", imageAlt: "Hộp bao cao su Herfeel", imagePosition: "35% center" } satisfies HomeVisual },
  { label: "Gel bôi trơn", href: "/category/gel-boi-tron", visual: { label: "Gel", tone: "warm", motif: "drop", imageSrc: "/images/highlight-product/gel-boi-tron.webp", imageAlt: "Gel bôi trơn Herfeel", imagePosition: "35% center" } satisfies HomeVisual },
  { label: "Chăm sóc cá nhân", href: "/category/dung-dich-ve-sinh", visual: { label: "Chăm sóc", tone: "green", motif: "care", imageSrc: "/images/highlight-product/gel-boi-tron.webp", imageAlt: "Sản phẩm chăm sóc cá nhân Herfeel", imagePosition: "35% center" } satisfies HomeVisual },
  { label: "Mùi hương", href: "/category/mui-thom", visual: { label: "Mùi hương", tone: "soft", motif: "bottle", imageSrc: "/images/highlight-product/mui-huong.webp", imageAlt: "Sản phẩm mùi hương Herfeel", imagePosition: "35% center" } satisfies HomeVisual },
  { label: "Combo tiết kiệm", href: "/category/combo", visual: { label: "Combo", tone: "amber", motif: "bundle", imageSrc: "/images/highlight-product/combo.webp", imageAlt: "Combo sản phẩm Herfeel", imagePosition: "35% center" } satisfies HomeVisual },
];

export const benefits = [
  { icon: "box", title: "Giao hàng kín đáo", description: "Đóng gói riêng tư, không hiển thị tên sản phẩm nhạy cảm." },
  { icon: "standard", title: "Hàng chính hãng", description: "Sản phẩm Herfeel chính hãng từ nguồn phân phối rõ ràng." },
  { icon: "check", title: "Chọn theo nhu cầu", description: "Dễ chọn theo cảm giác, chất liệu và mục đích sử dụng." },
  { icon: "guide", title: "Tiêu chuẩn rõ ràng", description: "Thông tin sản phẩm minh bạch, dễ kiểm tra trước khi mua." },
  { icon: "value", title: "Giá tốt theo combo", description: "Tiết kiệm hơn khi mua theo combo phù hợp." },
  { icon: "privacy", title: "Hỗ trợ riêng tư", description: "Tư vấn tinh tế, tôn trọng sự riêng tư của bạn." },
];

export const trustCards = [
  {
    title: "Thông tin rõ ràng",
    body: "Mọi thứ bày ngay trước mặt — không cần đoán, không cần google thêm.",
    visual: { label: "Thông tin rõ", tone: "soft", motif: "pack", imageSrc: "/images/highlight-product/ban-chay.webp", imageAlt: "Sản phẩm Herfeel bán chạy", imagePosition: "center bottom" } satisfies HomeVisual,
    layout: "hero",
  },
  {
    title: "Chất liệu dễ chọn",
    body: "0.03mm? Không latex? Lưỡi mèo? — chọn theo cảm giác, không theo may rủi.",
    visual: { label: "Không latex", tone: "mono", motif: "box", imageSrc: "/images/highlight-product/bao-cao-su.webp", imageAlt: "Bao cao su Herfeel không latex", imagePosition: "center bottom" } satisfies HomeVisual,
    stats: ["Không latex", "Siêu mỏng", "Hợp bao cao su"],
  },
  {
    title: "Chăm sóc tinh tế",
    body: "Gel, bọt, xịt thơm — đủ thứ để chăm bản thân đúng cách, không rườm rà.",
    visual: { label: "Chăm sóc", tone: "dark", motif: "care", imageSrc: "/images/highlight-product/gel-boi-tron.webp", imageAlt: "Sản phẩm chăm sóc Herfeel", imagePosition: "center bottom" } satisfies HomeVisual,
  },
  {
    title: "Giao hàng kín đáo",
    body: "Ship về nhà, không ai biết trong hộp có gì — kể cả người giao hàng 😌",
    // TODO: Replace placeholder motif with an approved discreet delivery/parcel image when available.
    visual: { label: "Kín đáo", tone: "mono", motif: "box" } satisfies HomeVisual,
  },
  {
    title: "Danh mục kín đáo",
    body: "Tìm đúng thứ mình cần — không phải lướt qua cả trang rồi đỏ mặt.",
    visual: { label: "Mùi hương", tone: "green", motif: "bottle", imageSrc: "/images/highlight-product/mui-huong.webp", imageAlt: "Sản phẩm mùi hương Herfeel", imagePosition: "center bottom" } satisfies HomeVisual,
  },
];

export const celebrities = [
  {
    name: "Saabirose",
    visual: { label: "Saabirose", tone: "soft", motif: "portrait", imageSrc: "/images/celebrity/saabirose.jpg", imageAlt: "Saabirose", imagePosition: "center top" } satisfies HomeVisual,
  },
  {
    name: "24K.Right",
    visual: { label: "24K.Right", tone: "dark", motif: "portrait", imageSrc: "/images/celebrity/24k.jpg", imageAlt: "24K.Right", imagePosition: "center top" } satisfies HomeVisual,
  },
  {
    name: "Giang Ơi",
    visual: { label: "Giang Ơi", tone: "warm", motif: "portrait", imageSrc: "/images/celebrity/giangoi.jpg", imageAlt: "Giang Ơi", imagePosition: "center top" } satisfies HomeVisual,
  },
  {
    name: "Phương Nam",
    visual: { label: "Phương Nam", tone: "green", motif: "portrait", imageSrc: "/images/celebrity/phuongnam.jpeg", imageAlt: "Phương Nam", imagePosition: "center top" } satisfies HomeVisual,
  },
];

export const pressQuotes = [
  { outlet: "GỢI Ý", quote: "Thông tin sản phẩm gọn, dễ so sánh, không gây quá tải." },
  { outlet: "CHĂM SÓC", quote: "Mua sắm riêng tư cần rõ ràng, nhanh và lịch sự." },
  { outlet: "TIN CẬY", quote: "Herfeel đặt chính sách giao hàng kín đáo ở đúng vị trí." },
];

export const promoStories = [
  {
    title: "Combo tiết kiệm",
    kicker: "Chọn bộ sản phẩm phù hợp và tiết kiệm hơn.",
    cta: "Xem combo",
    href: "/category/combo",
    visual: { label: "Combo", tone: "soft", motif: "bundle", imageSrc: "/images/playah/home/promo/promo-combo-last-long.webp", imageAlt: "Combo sản phẩm Herfeel", imagePosition: "35% center" } satisfies HomeVisual,
  },
  {
    title: "Giao hàng kín đáo",
    kicker: "Đóng gói riêng tư, nhận hàng thoải mái hơn.",
    cta: "Xem chính sách",
    href: "/checkout",
    // TODO: Replace placeholder motif with an approved discreet delivery/parcel image when available.
    visual: { label: "Kín đáo", tone: "mono", motif: "box" } satisfies HomeVisual,
  },
  {
    title: "The PlayBook",
    kicker: "Hướng dẫn chăm sóc và lựa chọn sản phẩm dễ hiểu.",
    cta: "Đọc hướng dẫn",
    href: "/collections/mong-nhe",
    visual: { label: "Hướng dẫn", tone: "green", motif: "care", imageSrc: "/images/playah/home/promo/promo-playbook-prebiotic-care.webp", imageAlt: "Hướng dẫn chăm sóc Herfeel", imagePosition: "center" } satisfies HomeVisual,
  },
];

export const guaranteeCards = [
  { title: "Miễn phí giao hàng từ 120.000đ", description: "Áp dụng cho đơn hàng đủ điều kiện.", cta: "Mua ngay", href: "/shop" },
  { title: "Hỗ trợ sau mua", description: "Tư vấn đơn hàng, cách dùng và bảo quản sản phẩm.", cta: "Xem sản phẩm", href: "/shop" },
];
