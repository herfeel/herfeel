export type CollectionPage = {
  slug: string;
  title: string;
  eyebrow?: string;
  subtitle: string;
  breadcrumb: {
    label: string;
    href?: string;
  }[];
  productSlugs: string[];
  supportSection: {
    title: string;
    body: string;
    ctaLabel?: string;
    ctaHref?: string;
    image?: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  editorial?: {
    title: string;
    body: string;
  };
};

export const collectionPages: CollectionPage[] = [
  {
    slug: "ban-chay",
    eyebrow: "Collection",
    title: "Sản phẩm được chọn nhiều",
    subtitle: "Các lựa chọn Herfeel dễ bắt đầu, thông tin rõ ràng và phù hợp để so sánh nhanh trước khi mua.",
    breadcrumb: [{ label: "Trang chủ", href: "/" }, { label: "Tất cả sản phẩm", href: "/shop" }, { label: "Sản phẩm được chọn nhiều" }],
    productSlugs: ["combo-last-long", "bao-cao-su-herfeel-last-long", "her-feel-ultra-thin", "gel-boi-tron-her-feel-ha"],
    supportSection: {
      title: "Bắt đầu từ những lựa chọn dễ so sánh",
      body: "Danh sách này gom các sản phẩm mẫu có quy cách, chất liệu và nhu cầu hiển thị rõ để bạn mua sắm riêng tư hơn.",
    },
    faqs: [
      { question: "Danh sách bán chạy dựa trên gì?", answer: "Đây là dữ liệu mẫu để mô phỏng collection. Khi vận hành thật, thứ tự nên lấy từ dữ liệu bán hàng hoặc lượt quan tâm đã duyệt." },
      { question: "Có giao hàng kín đáo không?", answer: "Herfeel ưu tiên trải nghiệm mua sắm riêng tư. Chính sách nhãn vận chuyển cuối cùng cần theo nội dung được duyệt." },
      { question: "Có thể xem chi tiết từng sản phẩm không?", answer: "Có. Chọn sản phẩm bất kỳ để xem quy cách, thông tin sử dụng và lựa chọn mua phù hợp." },
    ],
  },
  {
    slug: "combo",
    eyebrow: "Collection",
    title: "Combo tiết kiệm",
    subtitle: "Các combo mẫu giúp bạn mua kèm sản phẩm bổ trợ và kiểm tra thành phần trong cùng một nơi.",
    breadcrumb: [{ label: "Trang chủ", href: "/" }, { label: "Tất cả sản phẩm", href: "/shop" }, { label: "Combo tiết kiệm" }],
    productSlugs: ["combo-last-long", "gel-boi-tron-her-feel-ha", "her-feel-ultra-thin"],
    supportSection: { title: "Mua kèm gọn hơn", body: "Combo phù hợp khi bạn muốn thử nhiều lựa chọn hoặc mua sản phẩm bổ trợ cùng lúc. Luôn kiểm tra thành phần combo trước khi đặt." },
    faqs: [
      { question: "Combo gồm những gì?", answer: "Thành phần combo cần được hiển thị trong trang chi tiết sản phẩm trước khi bán thật." },
      { question: "Combo có tiết kiệm hơn không?", answer: "Mức tiết kiệm đang là dữ liệu mẫu và cần được Herfeel duyệt trước khi công bố." },
      { question: "Có thể mua từng sản phẩm riêng không?", answer: "Có. Bạn có thể mở từng sản phẩm để xem và mua riêng nếu phù hợp hơn." },
    ],
  },
  {
    slug: "mong-nhe",
    eyebrow: "Shop by feeling",
    title: "Mỏng nhẹ, cảm giác tự nhiên hơn",
    subtitle:
      "Khám phá những sản phẩm Herfeel được chọn cho cảm giác mỏng nhẹ, dễ dùng và thông tin rõ ràng để bạn tự tin hơn khi lựa chọn.",
    breadcrumb: [
      { label: "Trang chủ", href: "/" },
      { label: "Tất cả sản phẩm", href: "/shop" },
      { label: "Mỏng nhẹ, cảm giác tự nhiên hơn" },
    ],
    productSlugs: [
      "her-feel-ultra-thin",
      "bao-cao-su-herfeel-ha",
      "gel-boi-tron-her-feel-ha",
      "bao-cao-su-herfeel-warm-sensation",
      "bao-cao-su-herfeel-last-long",
      "combo-last-long",
    ],
    supportSection: {
      title: "Chọn sản phẩm mỏng nhẹ dễ hơn",
      body:
        "Nếu bạn ưu tiên cảm giác tự nhiên, hãy bắt đầu với các sản phẩm có thông tin độ mỏng, chất liệu và quy cách rõ ràng. Herfeel giúp bạn lọc nhanh theo nhu cầu mà vẫn giữ trải nghiệm mua sắm kín đáo.",
      ctaLabel: "Xem hướng dẫn chọn sản phẩm",
      ctaHref: "/collections/mong-nhe",
      image: "/images/playah/home/hero/her-feel-ha-hero.jpeg",
    },
    faqs: [
      {
        question: "Sản phẩm mỏng nhẹ phù hợp với ai?",
        answer:
          "Phù hợp với người muốn ưu tiên cảm giác tự nhiên hơn và cần thông tin sản phẩm gọn, dễ so sánh trước khi mua.",
      },
      {
        question: "Làm sao chọn đúng quy cách?",
        answer:
          "Hãy xem số lượng trong hộp, chất liệu, độ mỏng hoặc cảm giác được ghi trên card sản phẩm. Nếu phân vân, combo nhỏ thường dễ dùng để thử hơn.",
      },
      {
        question: "Sản phẩm được giao như thế nào?",
        answer:
          "Herfeel ưu tiên đóng gói trung tính và kín đáo. Thông tin cuối cùng về nhãn vận chuyển cần theo chính sách Herfeel được duyệt.",
      },
      {
        question: "Có nên chọn combo không?",
        answer:
          "Combo phù hợp khi bạn muốn so sánh nhiều lựa chọn hoặc mua kèm sản phẩm bổ trợ. Hãy kiểm tra thành phần combo trước khi đặt hàng.",
      },
      {
        question: "Thông tin chất liệu xem ở đâu?",
        answer:
          "Thông tin chất liệu, quy cách và lưu ý dùng kèm nên nằm trong phần specs hoặc trang chi tiết sản phẩm. Luôn đọc nhãn sản phẩm trước khi sử dụng.",
      },
    ],
    editorial: {
      title: "Chọn cảm giác tự nhiên hơn, không cần đoán mò",
      body:
        "Herfeel sắp xếp sản phẩm theo nhu cầu để bạn dễ so sánh độ mỏng, chất liệu, quy cách và trải nghiệm phù hợp. Từ lựa chọn mỏng nhẹ đến combo tiết kiệm, mọi thông tin cần thiết được trình bày rõ ràng để bạn mua sắm riêng tư và tự tin hơn.",
    },
  },
  {
    slug: "keo-dai",
    eyebrow: "Shop by feeling",
    title: "Kéo dài, dễ chọn đúng nhu cầu",
    subtitle: "Những sản phẩm được gắn nhu cầu kéo dài, trình bày ngắn gọn để bạn so sánh quy cách và thông tin sử dụng.",
    breadcrumb: [{ label: "Trang chủ", href: "/" }, { label: "Tất cả sản phẩm", href: "/shop" }, { label: "Kéo dài" }],
    productSlugs: ["bao-cao-su-herfeel-last-long", "combo-last-long"],
    supportSection: { title: "Xem rõ nhu cầu trước khi mua", body: "Hãy đọc kỹ mô tả, quy cách và hướng dẫn sử dụng trên nhãn sản phẩm trước khi quyết định." },
    faqs: [
      { question: "Nên chọn sản phẩm kéo dài như thế nào?", answer: "Bắt đầu bằng việc xem rõ nhu cầu, chất liệu, quy cách và hướng dẫn dùng an toàn trong trang chi tiết." },
      { question: "Có nên mua combo không?", answer: "Combo phù hợp khi bạn muốn mua kèm sản phẩm bổ trợ hoặc thử nhiều lựa chọn." },
      { question: "Thông tin có phải cam kết y tế không?", answer: "Không. Nội dung mẫu chỉ hỗ trợ phân loại sản phẩm và không thay thế hướng dẫn chuyên môn hoặc nhãn sản phẩm." },
    ],
  },
  {
    slug: "gel-boi-tron",
    eyebrow: "Collection",
    title: "Gel bôi trơn",
    subtitle: "Lọc nhanh các sản phẩm gel, xem rõ dung tích, công thức và thông tin tương thích được hiển thị trên card.",
    breadcrumb: [{ label: "Trang chủ", href: "/" }, { label: "Tất cả sản phẩm", href: "/shop" }, { label: "Gel bôi trơn" }],
    productSlugs: ["gel-boi-tron-her-feel-ha", "combo-last-long"],
    supportSection: { title: "Chọn gel theo công thức và tương thích", body: "Ưu tiên xem công thức, dung tích, khả năng dùng kèm bao cao su và lưu ý bảo quản trước khi mua." },
    faqs: [
      { question: "Gel gốc nước nghĩa là gì?", answer: "Đây là thông tin công thức mẫu. Khi bán thật, hãy đọc nhãn sản phẩm để biết hướng dẫn dùng và tương thích." },
      { question: "Có dùng kèm bao cao su không?", answer: "Thông tin tương thích cần được ghi rõ trong specs và trang chi tiết sản phẩm." },
      { question: "Có phù hợp da nhạy cảm không?", answer: "Hãy kiểm tra thành phần, thử lượng nhỏ nếu cần và ngừng dùng nếu có dấu hiệu kích ứng." },
    ],
  },
  {
    slug: "am-nong",
    eyebrow: "Shop by feeling",
    title: "Ấm nóng nhẹ",
    subtitle: "Các lựa chọn có cảm giác ấm nhẹ, hiển thị rõ quy cách và thông tin sản phẩm để bạn kiểm tra trước khi mua.",
    breadcrumb: [{ label: "Trang chủ", href: "/" }, { label: "Tất cả sản phẩm", href: "/shop" }, { label: "Ấm nóng nhẹ" }],
    productSlugs: ["bao-cao-su-herfeel-warm-sensation", "gel-boi-tron-her-feel-ha"],
    supportSection: { title: "Ưu tiên đọc lưu ý sử dụng", body: "Với sản phẩm tạo cảm giác, hãy xem kỹ hướng dẫn dùng, thành phần và khuyến nghị trên nhãn sản phẩm." },
    faqs: [
      { question: "Ấm nóng nhẹ phù hợp với ai?", answer: "Phù hợp khi bạn muốn thử cảm giác khác biệt, nhưng nên đọc kỹ thông tin sản phẩm và dùng theo hướng dẫn." },
      { question: "Có cần lưu ý gì không?", answer: "Ngừng sử dụng nếu có dấu hiệu khó chịu hoặc kích ứng. Nội dung mẫu không thay thế hướng dẫn y tế." },
      { question: "Có sản phẩm dùng kèm không?", answer: "Bạn có thể xem thêm gel hoặc combo liên quan nếu cần mua kèm." },
    ],
  },
  {
    slug: "sensitive",
    eyebrow: "Shop by feeling",
    title: "Sensitive, ưu tiên thông tin rõ ràng",
    subtitle: "Các sản phẩm được gắn nhu cầu sensitive, giúp bạn kiểm tra chất liệu, công thức và lưu ý trước khi chọn.",
    breadcrumb: [{ label: "Trang chủ", href: "/" }, { label: "Tất cả sản phẩm", href: "/shop" }, { label: "Sensitive" }],
    productSlugs: ["her-feel-ultra-thin", "gel-boi-tron-her-feel-ha", "bao-cao-su-herfeel-ha", "combo-last-long"],
    supportSection: { title: "Xem kỹ thành phần và chất liệu", body: "Khi có làn da nhạy cảm, hãy ưu tiên sản phẩm có thông tin chất liệu, công thức và hướng dẫn sử dụng rõ ràng." },
    faqs: [
      { question: "Sensitive có chắc chắn không kích ứng không?", answer: "Không thể cam kết tuyệt đối. Hãy đọc nhãn sản phẩm và ngừng dùng nếu có dấu hiệu bất thường." },
      { question: "Nên xem thông tin nào trước?", answer: "Chất liệu, công thức, khả năng tương thích và hướng dẫn sử dụng là các điểm cần kiểm tra trước." },
      { question: "Có giao hàng kín đáo không?", answer: "Herfeel ưu tiên đóng gói trung tính và riêng tư theo chính sách được duyệt." },
    ],
  },
];

export function getCollectionPageBySlug(slug: string) {
  return collectionPages.find((collection) => collection.slug === slug);
}
