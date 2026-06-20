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

type HeroCard = {
  title: string;
  subtitle: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  backgroundClass: string;
  textClass: string;
  subtitleClass: string;
  imageClass: string;
  imageObjectClass?: string;
  visual: HomeVisual;
};

export const heroCards: HeroCard[] = [
  {
    title: "Mỏng nhẹ, gần thật",
    subtitle: "Cho cảm giác tự nhiên hơn, dễ bắt đầu hơn.",
    href: "/collections/mong-nhe",
    imageSrc: "/images/playah/home/mood-cards/ultra-thin-001-card.webp",
    imageAlt: "Hộp bao cao su Herfeel 001 mỏng nhẹ",
    backgroundClass: "bg-[radial-gradient(circle_at_72%_68%,rgb(205_169_96_/_0.38),transparent_34%),linear-gradient(145deg,#080808_0%,#22201c_55%,#5b4a30_100%)]",
    textClass: "text-white",
    subtitleClass: "text-white/78",
    imageClass: "right-[-2%] top-[38%] h-[56%] w-[66%] md:right-[-18%] md:top-[31%] md:h-[72%] md:w-[88%]",
    visual: {
      label: "Siêu mỏng",
      tone: "dark",
      motif: "box",
      imageSrc: "/images/playah/home/mood-cards/ultra-thin-001-card.webp",
      imageAlt: "Hộp bao cao su siêu mỏng Herfeel",
      imagePosition: "35% center",
      imageFit: "contain",
    } satisfies HomeVisual,
  },
  {
    title: "Thêm mượt, thêm ẩm",
    subtitle: "Gel và sản phẩm hỗ trợ giúp mọi thứ thoải mái hơn.",
    href: "/category/gel-boi-tron",
    imageSrc: "/images/playah/home/mood-cards/bcs-duong-am.webp",
    imageAlt: "Gel bôi trơn Hyaluronic Acid Herfeel",
    backgroundClass: "bg-[radial-gradient(circle_at_70%_28%,rgb(255_255_255_/_0.82),transparent_28%),linear-gradient(145deg,#eaf9ff_0%,#bdeef4_48%,#7fd4e2_100%)]",
    textClass: "text-[#08252e]",
    subtitleClass: "text-[#164756]",
    imageClass: "right-[-4%] top-[41%] h-[44%] w-[58%] md:right-[-8%] md:top-[42%] md:h-[54%] md:w-[68%]",
    visual: {
      label: "Gốc nước",
      tone: "warm",
      motif: "drop",
      imageSrc: "/images/playah/home/mood-cards/duong-am.webp",
      imageAlt: "Gel bôi trơn Herfeel với kết cấu nước",
      imagePosition: "35% center",
      imageFit: "contain",
    } satisfies HomeVisual,
  },
  {
    title: "Kéo dài, thong thả hơn",
    subtitle: "Lựa chọn phù hợp khi bạn muốn cuộc vui chậm lại một chút.",
    href: "/collections/keo-dai",
    imageSrc: "/images/playah/home/mood-cards/last-long-card.webp",
    imageAlt: "Bao cao su PlayAh Last Long màu vàng",
    backgroundClass: "bg-[radial-gradient(circle_at_72%_64%,rgb(255_238_150_/_0.62),transparent_30%),linear-gradient(145deg,#ffe66b_0%,#f0a526_54%,#a64a24_100%)]",
    textClass: "text-[#241304]",
    subtitleClass: "text-[#4d2b0a]",
    imageClass: "right-[2%] top-[39%] h-[58%] w-[62%] md:right-[-11%] md:top-[29%] md:h-[74%] md:w-[82%]",
    visual: {
      label: "Kéo dài",
      tone: "amber",
      motif: "pack",
      imageSrc: "/images/playah/home/mood-cards/last-long-card.webp",
      imageAlt: "Hộp sản phẩm kéo dài Herfeel",
      imagePosition: "35% center",
      imageFit: "contain",
    } satisfies HomeVisual,
  },
  {
    title: "Đổi mood mới mẻ",
    subtitle: "Thêm cảm giác, thêm tò mò, thêm chút vui.",
    href: "/collections/am-nong",
    imageSrc: "/images/playah/home/mood-cards/warm-sensation-card.webp",
    imageAlt: "Herfeel Sensation màu cam",
    backgroundClass: "bg-[radial-gradient(circle_at_74%_34%,rgb(255_221_194_/_0.7),transparent_27%),linear-gradient(145deg,#ffd1be_0%,#ff7b45_52%,#8f2638_100%)]",
    textClass: "text-[#2d0d08]",
    subtitleClass: "text-[#552118]",
    imageClass: "right-[-8%] top-[40%] h-[52%] w-[62%] md:right-[-10%] md:top-[41%] md:h-[56%] md:w-[72%]",
    visual: {
      label: "Ấm nóng",
      tone: "soft",
      motif: "bottle",
      imageSrc: "/images/playah/home/mood-cards/warm-sensation-card.webp",
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
    name: "Sài gòn tếu",
    visual: { label: "Sài gòn tếu", tone: "green", motif: "portrait", imageSrc: "/images/celebrity/saigonteu.png", imageAlt: "Sài gòn tếu", imagePosition: "center top" } satisfies HomeVisual,
  },
  {
    name: "Tròn Mama",
    visual: { label: "Tròn Mama", tone: "mono", motif: "portrait", imageSrc: "/images/celebrity/tron-mama.jpg", imageAlt: "Tròn Mama", imagePosition: "center top" } satisfies HomeVisual,
  },
];

export const pressQuotes = [
  { outlet: "GỢI Ý", quote: "Thông tin sản phẩm gọn, dễ so sánh, không gây quá tải." },
  { outlet: "CHĂM SÓC", quote: "Mua sắm riêng tư cần rõ ràng, nhanh và lịch sự." },
  { outlet: "TIN CẬY", quote: "Herfeel đặt chính sách giao hàng kín đáo ở đúng vị trí." },
];

export const homeBuildKit = {
  eyebrow: "Tự tạo combo theo ý thích",
  title: "Build Play Kit",
  body: "Chọn 3 sản phẩm theo nhu cầu: bao cao su, gel bôi trơn và add-on chăm sóc. Gọn giỏ hàng, dễ bắt đầu, giao hàng kín đáo.",
  promo: "PLAYKIT15",
  cta: "Bắt đầu build kit",
  href: "/play-kit",
  chips: ["3 sản phẩm", "Giảm 15%", "Giao hàng kín đáo"],
  visual: { label: "Play Kit", tone: "dark", motif: "bundle" } satisfies HomeVisual,
};

export const guaranteeCards = [
  { title: "Miễn phí giao hàng từ 120.000đ", description: "Áp dụng cho đơn hàng đủ điều kiện.", cta: "Mua ngay", href: "/shop" },
  { title: "Hỗ trợ sau mua", description: "Tư vấn đơn hàng, cách dùng và bảo quản sản phẩm.", cta: "Xem sản phẩm", href: "/shop" },
];
