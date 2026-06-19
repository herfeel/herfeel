import { mockProducts } from "@/data/mock/products";
import type { Product, ProductDetail } from "@/features/products/product-types";

const herFeelImage = {
  src: "/images/playah/home/feelings/ultra-thin-feeling.webp",
  alt: "Hộp bao cao su Herfeel Ultra Thin 0.03",
  width: 1500,
  height: 1500,
};

const gelImage = {
  src: "/images/playah/home/feelings/moisture-ha-gel.webp",
  alt: "Gel bôi trơn Herfeel đặt trên nền sáng",
  width: 1500,
  height: 1500,
};

const comboImage = {
  src: "/images/playah/home/promo/promo-combo-last-long.webp",
  alt: "Combo sản phẩm Herfeel đóng gói kín đáo",
  width: 1500,
  height: 1500,
};

export const productDetails: ProductDetail[] = [
  {
    id: "prod-playah-her-feel-ultra-thin",
    slug: "her-feel-ultra-thin",
    name: "Bao cao su Herfeel Ultra Thin 0.03",
    brand: "Herfeel",
    badge: "Mỏng nhẹ",
    category: "bao-cao-su",
    needs: ["sieu-mong", "sensitive"],
    shortDescription: "Mỏng nhẹ, dễ dùng và phù hợp cho những trải nghiệm cần cảm giác tự nhiên hơn.",
    longDescription: "Dữ liệu mẫu cho PDP Herfeel. Nội dung, hình ảnh, giá và cam kết cuối cùng cần được Herfeel duyệt trước khi bán thật.",
    price: 129000,
    compareAtPrice: 159000,
    currency: "VND",
    images: [herFeelImage, gelImage, comboImage],
    thumbnail: herFeelImage,
    badges: ["Mỏng nhẹ", "Kín đáo"],
    variants: [
      {
        id: "her-feel-10-pack",
        label: "Hộp 10 bao",
        type: "pack-size",
        price: 129000,
        compareAtPrice: 159000,
        image: herFeelImage,
        badge: "Phổ biến",
        stockStatus: "in-stock",
        defaultQuantity: 1,
      },
      {
        id: "her-feel-3-pack",
        label: "Gói 3 bao",
        type: "pack-size",
        price: 49000,
        image: herFeelImage,
        stockStatus: "in-stock",
        defaultQuantity: 0,
      },
      {
        id: "her-feel-combo",
        label: "Combo kèm gel gốc nước",
        type: "bundle",
        price: 249000,
        compareAtPrice: 288000,
        image: comboImage,
        badge: "Tiết kiệm",
        stockStatus: "in-stock",
        defaultQuantity: 0,
      },
    ],
    options: [
      { name: "Quy cách", values: ["Hộp 10 bao", "Gói 3 bao", "Combo"] },
      { name: "Cảm giác", values: ["Siêu mỏng", "Trơn", "Dễ dùng"] },
    ],
    specs: [
      { label: "Độ mỏng", value: "0.03mm" },
      { label: "Chất liệu", value: "Latex" },
      { label: "Quy cách", value: "Hộp 10 bao" },
      { label: "Phù hợp", value: "Cảm giác mỏng nhẹ" },
      { label: "Giao hàng", value: "Kín đáo" },
    ],
    highlights: [
      "Mỏng nhẹ, cảm giác tự nhiên hơn",
      "Thông tin sản phẩm rõ ràng",
      "Đóng gói kín đáo",
      "Hàng chính hãng Herfeel",
    ],
    details: [
      { title: "Mô tả sản phẩm", content: "Thiết kế mỏng nhẹ cho người muốn cảm giác tự nhiên hơn, với thông tin quy cách và chất liệu được trình bày rõ để dễ lựa chọn." },
      { title: "Cách sử dụng & bảo quản", content: "Đọc hướng dẫn trên bao bì, kiểm tra hạn dùng và tình trạng gói trước khi sử dụng. Bảo quản nơi khô mát, tránh nắng trực tiếp." },
      { title: "Tương thích", content: "Có thể dùng cùng gel bôi trơn gốc nước. Tránh dùng với sản phẩm gốc dầu nếu bao cao su làm từ latex." },
      { title: "Giao hàng kín đáo", content: "Đơn hàng được đóng gói trung tính, không hiển thị tên sản phẩm nhạy cảm ở mặt ngoài kiện hàng." },
    ],
    story: {
      eyebrow: "Không cần phức tạp. Chỉ cần chọn đúng.",
      title: "Mỏng nhẹ cho cảm giác tự nhiên hơn, trong một thiết kế dễ mua và kín đáo.",
      stats: [
        { label: "Độ mỏng", value: "0.03mm" },
        { label: "Quy cách", value: "10 bao" },
        { label: "Chất liệu", value: "Latex" },
        { label: "Giao hàng", value: "Kín đáo" },
      ],
    },
    standards: [
      { title: "Thông tin rõ ràng", body: "Nêu rõ chất liệu, quy cách và lưu ý tương thích để người mua so sánh nhanh." },
      { title: "Trải nghiệm kín đáo", body: "Từ trang sản phẩm đến đóng gói, nội dung được giữ thực tế và không phô trương." },
      { title: "Dễ kết hợp", body: "Có thể mua riêng hoặc kèm gel gốc nước trong combo mẫu." },
      { title: "Herfeel chính hãng", body: "Dữ liệu mẫu ưu tiên luồng mua hàng rõ ràng; thông tin thương mại cuối cùng cần được duyệt." },
    ],
    comparison: [
      { label: "Cảm giác", value: "Mỏng nhẹ" },
      { label: "Chất liệu", value: "Latex" },
      { label: "Bề mặt", value: "Trơn" },
      { label: "Quy cách", value: "10 bao" },
      { label: "Nhu cầu", value: "Tự nhiên hơn" },
      { label: "Giao hàng", value: "Kín đáo" },
    ],
    faqs: [
      { title: "Sản phẩm này phù hợp với ai?", content: "Phù hợp với người muốn ưu tiên cảm giác mỏng nhẹ và cần thông tin sản phẩm dễ kiểm tra trước khi mua." },
      { title: "Có giao hàng kín đáo không?", content: "Có. Đơn hàng được đóng gói trung tính theo hướng kín đáo." },
      { title: "Có dùng được với gel bôi trơn không?", content: "Có thể dùng với gel gốc nước. Hãy kiểm tra hướng dẫn trên bao bì sản phẩm đi kèm." },
      { title: "Đây có phải thông tin bán hàng cuối cùng không?", content: "Chưa. Đây là dữ liệu mẫu cho giao diện; nội dung cuối cùng cần được Herfeel duyệt." },
    ],
    inStock: true,
    rating: 4.8,
    reviewCount: 128,
    packCount: 10,
    material: "Latex",
    texture: "Trơn",
    sensation: "Mỏng nhẹ",
    discreetShippingEligible: true,
    freeShippingEligible: false,
    upsellGroup: "condom-basics",
    relatedProductIds: ["prod-playah-smooth", "prod-playah-starter", "prod-playah-long", "prod-playah-warm-sensation"],
  },
];

export function getProductDetailBySlug(slug: string) {
  return productDetails.find((product) => product.slug === slug) ?? buildProductDetailFromMock(slug);
}

export function getRelatedProducts(product: ProductDetail) {
  return product.relatedProductIds?.map((id) => mockProducts.find((item) => item.id === id)).filter((item): item is Product => Boolean(item)) ?? [];
}

function buildProductDetailFromMock(slug: string): ProductDetail | undefined {
  const product = mockProducts.find((item) => item.slug === slug);

  if (!product) return undefined;

  const categoryLabel = getCategoryLabel(product.category);
  const needLabel = product.needs.map(getNeedLabel).filter(Boolean).join(", ") || categoryLabel;
  const primaryVariant = product.variants[0];

  return {
    ...product,
    badge: product.badges[0] ?? categoryLabel,
    images: product.images.length ? product.images : [product.thumbnail],
    variants: product.variants.map((variant) => ({
      ...variant,
      image: variant.image ?? product.thumbnail,
    })),
    options: primaryVariant
      ? [
          { name: "Quy cách", values: product.variants.map((variant) => variant.label) },
          { name: "Nhu cầu", values: product.needs.map(getNeedLabel).filter(Boolean) },
        ]
      : [{ name: "Nhu cầu", values: product.needs.map(getNeedLabel).filter(Boolean) }],
    highlights: [
      product.shortDescription,
      product.brand ? `Hàng chính hãng ${product.brand}` : "Thông tin sản phẩm rõ ràng",
      product.discreetShippingEligible ? "Đóng gói kín đáo" : "Thông tin giao hàng đang cập nhật",
      product.inStock ? "Còn hàng" : "Tạm hết hàng",
    ],
    details: [
      { title: "Mô tả sản phẩm", content: product.longDescription || product.shortDescription },
      { title: "Cách chọn", content: `Sản phẩm thuộc nhóm ${categoryLabel.toLowerCase()} và được gắn nhu cầu ${needLabel.toLowerCase()}. Hãy xem quy cách, chất liệu và hướng dẫn trên bao bì trước khi sử dụng.` },
      { title: "Thông tin quy cách", content: product.specs.map((spec) => `${spec.label}: ${spec.value}`).join(". ") || "Thông tin quy cách đang được cập nhật." },
      { title: "Giao hàng kín đáo", content: "Đơn hàng được đóng gói trung tính, không hiển thị tên sản phẩm nhạy cảm ở mặt ngoài kiện hàng." },
    ],
    story: {
      eyebrow: "Thông tin mẫu từ catalog PlayAh",
      title: `${product.name} được trình bày để so sánh nhanh theo nhu cầu, quy cách và trải nghiệm mua kín đáo.`,
      stats: [
        { label: "Danh mục", value: categoryLabel },
        { label: "Nhu cầu", value: needLabel },
        { label: "Đánh giá", value: `${product.rating}/5` },
        { label: "Reviews", value: String(product.reviewCount) },
      ],
    },
    standards: [
      { title: "Danh mục", body: categoryLabel },
      { title: "Nhu cầu", body: needLabel },
      { title: "Quy cách", body: primaryVariant?.label ?? "Đang cập nhật" },
      { title: "Giao hàng", body: product.discreetShippingEligible ? "Kín đáo" : "Đang cập nhật" },
    ],
    comparison: product.specs.length
      ? product.specs.map((spec) => ({ label: spec.label, value: spec.value }))
      : [
          { label: "Danh mục", value: categoryLabel },
          { label: "Nhu cầu", value: needLabel },
          { label: "Tình trạng", value: product.inStock ? "Còn hàng" : "Tạm hết hàng" },
        ],
    faqs: [
      { title: "Sản phẩm này phù hợp với ai?", content: `Phù hợp khi bạn đang tìm nhóm ${needLabel.toLowerCase()} và muốn xem thông tin sản phẩm rõ trước khi mua.` },
      { title: "Có giao hàng kín đáo không?", content: "Có. Đơn hàng được đóng gói trung tính theo hướng kín đáo." },
      { title: "Thông tin này đã là dữ liệu bán hàng cuối cùng chưa?", content: "Chưa. Đây là dữ liệu mẫu cho giao diện; nội dung thương mại cuối cùng cần được Herfeel duyệt." },
    ],
  };
}

function getCategoryLabel(category: Product["category"]) {
  const labels: Record<Product["category"], string> = {
    "bao-cao-su": "Bao cao su",
    "gel-boi-tron": "Gel bôi trơn",
    "dung-dich-ve-sinh": "Dung dịch vệ sinh",
    "mui-thom": "Mùi thơm",
    combo: "Combo",
  };

  return labels[category];
}

function getNeedLabel(need: Product["needs"][number]) {
  const labels: Record<Product["needs"][number], string> = {
    "sieu-mong": "Siêu mỏng",
    "keo-dai": "Kéo dài",
    "nhieu-gel": "Nhiều gel",
    "am-nong": "Ấm nóng",
    "gai-gan": "Gai/gân",
    "khong-latex": "Không latex",
    sensitive: "Sensitive",
    "combo-tiet-kiem": "Combo tiết kiệm",
  };

  return labels[need];
}
