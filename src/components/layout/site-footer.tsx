import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { mockFooterLinks } from "@/data/mock/footer";

const footerGroups = [
  {
    title: "Sản phẩm",
    links: ["Bao cao su", "Gel bôi trơn", "Chăm sóc cá nhân", "Mùi hương", "Combo", "Bán chạy"],
  },
  {
    title: "Về Herfeel",
    links: ["Tiêu chuẩn", "Lựa chọn được yêu thích", "Riêng tư", "The PlayBook", "Nguồn gốc sản phẩm", "Đối tác"],
  },
  {
    title: "Hỗ trợ",
    links: ["Câu hỏi thường gặp", "Liên hệ", "Giao hàng và đổi trả", "PlayBook chọn sản phẩm", "Combo tiết kiệm", "Điều khoản"],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-[var(--color-ink)] py-12 text-[var(--color-white)] md:py-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.2fr_1.8fr] md:gap-16">
          <div>
            <h2 className="max-w-[420px] text-[28px] font-semibold leading-[1.05] md:text-[42px] md:font-medium">
              Mua sắm riêng tư, thông tin rõ ràng, giao hàng kín đáo.
            </h2>
            <a href="/shop" className="mt-6 inline-flex min-h-9 items-center rounded-[var(--radius-pill)] bg-white px-4 text-xs font-semibold !text-[var(--color-ink)] hover:bg-[var(--color-surface)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-green)]">
              Xem tiêu chuẩn
            </a>
          </div>

          <div className="hidden grid-cols-3 gap-8 md:grid">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h3 className="mb-4 text-xs font-semibold">{group.title}</h3>
                <ul className="grid gap-3 text-xs text-white/72">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a href="/shop" className="hover:text-white hover:underline">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="grid gap-2 md:hidden">
            {footerGroups.map((group) => (
              <details key={group.title} className="border-b border-white/14 py-3">
                <summary className="cursor-pointer list-none text-xs font-semibold">{group.title}</summary>
                <ul className="mt-3 grid gap-3 text-xs text-white/70">
                  {group.links.map((link) => (
                    <li key={link}>
                      <a href="/shop">{link}</a>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-b border-white/12 pb-8 text-[11px] text-white/62">
          <div className="flex flex-wrap items-center gap-4">
            <span>VN</span>
            <span>© 2026 {siteConfig.name}. Bảo lưu mọi quyền.</span>
          </div>
          <div className="flex gap-2">
            {mockFooterLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-white hover:underline">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <p className="text-[28px] font-black leading-none">{siteConfig.name}</p>
          <p className="mt-6 max-w-[760px] text-[10px] leading-relaxed text-white/50">
            Herfeel giúp bạn chọn sản phẩm thân mật dễ hơn, tinh tế hơn và riêng tư hơn. Tên sản phẩm, giá, chính sách và hình ảnh hiện là dữ liệu mẫu đến khi Herfeel duyệt nội dung thương mại cuối cùng. Không dùng cam kết y tế khi chưa có bằng chứng phê duyệt; luôn đọc nhãn sản phẩm và hướng dẫn sử dụng trước khi mua.
          </p>
        </div>
      </Container>
    </footer>
  );
}
