export type PlaybookGuide = {
  title: string;
  subtitle: string;
  href: string;
  image: string;
  tone: "ink" | "green" | "blue" | "cream";
};

export type PlaybookArticle = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readingTime: string;
  image: string;
};

export const playbookGuides: PlaybookGuide[] = [
  {
    title: "Chọn bao cao su Herfeel",
    subtitle: "Size, độ mỏng, cảm giác và nhu cầu - xem nhanh để chọn đúng hơn.",
    href: "/playbook#articles",
    image: "/images/playah/home/categories/category-condoms.webp",
    tone: "ink",
  },
  {
    title: "Gel bôi trơn",
    subtitle: "Khi nào nên dùng gel, chọn loại nào và dùng sao cho thoải mái.",
    href: "/playbook#articles",
    image: "/images/playah/home/categories/category-lubricant.webp",
    tone: "blue",
  },
  {
    title: "Chăm sóc cá nhân",
    subtitle: "DDVS, mùi hương và routine chăm sóc trước/sau cuộc vui.",
    href: "/playbook#articles",
    image: "/images/playah/home/categories/category-personal-care.webp",
    tone: "cream",
  },
  {
    title: "Mua sắm riêng tư",
    subtitle: "Giao kín đáo, combo tiết kiệm, chính hãng và những câu hỏi thường gặp.",
    href: "/playbook#faq",
    image: "/images/highlight-product/combo.webp",
    tone: "green",
  },
];

export const playbookTopics = [
  "Người mới bắt đầu",
  "Chọn size",
  "Mỏng nhẹ",
  "Kéo dài",
  "Gel",
  "Chăm sóc cá nhân",
  "Giao hàng kín đáo",
  "Câu hỏi ngại hỏi",
];

export const playbookArticles: PlaybookArticle[] = [
  {
    slug: "chon-size-bao-cao-su",
    category: "Chọn đúng",
    title: "Hướng dẫn chọn size bao cao su Herfeel",
    excerpt: "Cách đọc size, khi nào nên đổi loại và vài dấu hiệu giúp bạn chọn thoải mái hơn.",
    readingTime: "4 phút đọc",
    image: "/images/playah/home/products/baocaosu.jpg",
  },
  {
    slug: "gan-gai-co-gi-khac",
    category: "Cảm giác",
    title: "Bao cao su gân gai có thật sự khác biệt?",
    excerpt: "Một bản giải thích gọn về texture, cảm giác mới mẻ và cách thử mà không quá áp lực.",
    readingTime: "3 phút đọc",
    image: "/images/playah/home/feelings/warm-sensation-feeling.webp",
  },
  {
    slug: "gel-boi-tron-la-gi",
    category: "Gel",
    title: "Gel bôi trơn là gì, dùng khi nào?",
    excerpt: "Gel không chỉ dành cho lúc khô rát. Chọn đúng công thức giúp trải nghiệm êm và dễ chịu hơn.",
    readingTime: "5 phút đọc",
    image: "/images/playah/home/products/product-pleasure-gel.webp",
  },
  {
    slug: "vi-sao-nen-dung-herfeel",
    category: "Herfeel",
    title: "Tại sao nên chọn bao cao su Herfeel?",
    excerpt: "Cách Herfeel sắp xếp sản phẩm theo cảm giác, nhu cầu và thông tin cần biết trước khi mua.",
    readingTime: "3 phút đọc",
    image: "/images/playah/home/hero/her-feel-ha-hero.jpeg",
  },
  {
    slug: "playah-va-herfeel",
    category: "PlayAh",
    title: "PlayAh và dòng bao cao su Herfeel",
    excerpt: "Herfeel là dòng sản phẩm bao cao su của PlayAh, dành cho nhiều nhu cầu và nhiều người dùng khác nhau.",
    readingTime: "2 phút đọc",
    image: "/images/playah/home/standards/sensitive-care-standard.jpeg",
  },
  {
    slug: "mua-sam-rieng-tu",
    category: "Riêng tư",
    title: "Mua sản phẩm nhạy cảm sao cho không ngại?",
    excerpt: "Những điểm nên kiểm tra: đóng gói, combo, thông tin sản phẩm và kênh hỗ trợ trước khi đặt hàng.",
    readingTime: "4 phút đọc",
    image: "/images/playah/home/promo/promo-combo-last-long.webp",
  },
];

export const playbookFaqs = [
  {
    question: "Người mới nên chọn loại nào?",
    answer: "Bắt đầu với lựa chọn mỏng nhẹ, dễ dùng hoặc combo nhỏ để thử. Nếu còn phân vân, ưu tiên sản phẩm có thông tin size, chất liệu và cảm giác rõ ràng.",
  },
  {
    question: "Gel bôi trơn có dùng với bao cao su được không?",
    answer: "Nhiều loại gel gốc nước có thể dùng kèm bao cao su, nhưng hãy đọc nhãn sản phẩm để kiểm tra tương thích và hướng dẫn sử dụng cụ thể.",
  },
  {
    question: "Giao hàng có kín đáo không?",
    answer: "Herfeel ưu tiên trải nghiệm mua sắm riêng tư với đóng gói trung tính. Chính sách vận chuyển cuối cùng nên theo nội dung được duyệt tại checkout.",
  },
  {
    question: "Chọn size bao cao su như thế nào?",
    answer: "Xem thông tin size/nominal width trên sản phẩm, cảm giác khi dùng và đổi loại nếu quá chật, quá lỏng hoặc không thoải mái.",
  },
  {
    question: "Sản phẩm Herfeel phù hợp cho nam hay nữ?",
    answer: "Herfeel không phải brand chỉ dành cho nữ. Đây là dòng sản phẩm của PlayAh cho nhiều người dùng, nhiều nhu cầu và nhiều cảm giác khác nhau.",
  },
];
