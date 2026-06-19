import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ClipboardCheck, Factory, Leaf, PackageCheck, RotateCcw, ShieldCheck, Truck, WalletCards, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";

type ProductLine = {
  number: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  href: string;
  reverse?: boolean;
};

type FeatureItem = {
  title: string;
  body: string;
  icon: LucideIcon;
};

const anchors = [
  { label: "Câu chuyện", href: "#cau-chuyen" },
  { label: "Sứ mệnh", href: "#su-menh" },
  { label: "Sản phẩm", href: "#san-pham" },
  { label: "Chất lượng", href: "#chat-luong" },
  { label: "Cam kết", href: "#cam-ket" },
];

const productLines: ProductLine[] = [
  {
    number: "01.",
    title: "PlayAh",
    body: "Dòng phổ thông: Bao cao su Super Invisible, Last Long, True Fit, Extra Dots, Giant Invisible, Rainbow Gel, Non-Latex 0.01; Gel Pleasure; DDVS nam Mint Whisper, Franklin; Xịt thơm miệng Kissing Spray.",
    image: "/images/playah/home/products/baocaosu.jpg",
    imageAlt: "PlayAh",
    href: "/collections/all",
  },
  {
    number: "02.",
    title: "Her Feel",
    body: "Dòng cao cấp cho phụ nữ: BCS HA Dưỡng Ẩm, Ultra Thin 0.03, Eternal Pleasure, Warm Sensation, Cat Tongue; Gel HA Pleasure, Stimulating, Warm Lub; DDVS Prebiotic Rose, Sensitive.",
    image: "/images/playah/home/hero/her-feel-ha-hero.jpeg",
    imageAlt: "Her Feel",
    href: "/collections/her-feel",
    reverse: true,
  },
  {
    number: "03.",
    title: "Memoir",
    body: "Nước hoa vùng kín: Memoir Cửa Son, Memoir Đánh Đu. Eau de Parfum cao cấp, hương dịu nhẹ tự nhiên, an toàn cho vùng nhạy cảm.",
    image: "/images/highlight-product/mui-huong.webp",
    imageAlt: "Memoir",
    href: "/collections/memoir",
  },
];

const qualityItems: FeatureItem[] = [
  {
    title: "ISO 4074",
    body: "tất cả bao cao su PlayAh đạt chuẩn quốc tế về độ bền, độ kín, độ thẩm thấu.",
    icon: ShieldCheck,
  },
  {
    title: "5 bước kiểm định",
    body: "mỗi lô được test căng, nổ, kín, độ dày, gel trước khi xuất xưởng.",
    icon: ClipboardCheck,
  },
  {
    title: "Nguyên liệu sạch",
    body: "latex tự nhiên cao cấp, gel gốc nước, không paraben, không hương liệu kích ứng.",
    icon: Leaf,
  },
  {
    title: "Sản xuất tại nhà máy đạt GMP",
    body: "hợp tác đối tác sản xuất quốc tế, kiểm soát chặt từ nguyên liệu đến đóng gói.",
    icon: Factory,
  },
];

const commitmentItems: FeatureItem[] = [
  {
    title: "Đóng gói kín đáo",
    body: "hộp không nhãn, không in tên thương hiệu bên ngoài.",
    icon: PackageCheck,
  },
  {
    title: "COD an tâm",
    body: "kiểm hàng trước khi thanh toán, bảo mật tuyệt đối.",
    icon: WalletCards,
  },
  {
    title: "Đổi trả 7 ngày",
    body: "sản phẩm lỗi đổi miễn phí, hỗ trợ 24/7 qua hotline.",
    icon: RotateCcw,
  },
  {
    title: "Giao hàng toàn quốc",
    body: "miễn phí ship đơn từ 500K, 1-3 ngày làm việc.",
    icon: Truck,
  },
];

export function AboutPage() {
  return (
    <div className="bg-[var(--color-white)] text-[var(--color-ink)]">
      <Hero />
      <AnchorNav />
      <StoryBlock />
      <MissionBlock />
      <ProductLines />
      <FeatureGrid id="chat-luong" title="Chất lượng quốc tế" items={qualityItems} />
      <FeatureGrid id="cam-ket" title="Cam kết với khách hàng" items={commitmentItems} tone="surface" />
      <StatCallout />
      <CTASection />
      <FooterLegal />
    </div>
  );
}

function Hero() {
  return (
    <section className="bg-[var(--color-white)] pb-8 pt-10 md:pb-12 md:pt-16">
      <Container>
        <div className="mx-auto max-w-[940px] text-center">
          <h1 className="text-[42px] font-semibold leading-[1.02] tracking-normal md:text-[64px] md:font-medium lg:text-[76px]">Về PlayAh</h1>
          <p className="mx-auto mt-4 max-w-[760px] text-[18px] leading-snug text-[var(--color-ink)]/82 md:text-[24px]">
            Brand Việt chuẩn quốc tế cho chuyện chăm sóc vùng kín — vì cảm xúc thật, an toàn thật.
          </p>
          <div className="mx-auto mt-6 flex w-full max-w-[820px] flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-[var(--radius-pill)] bg-[var(--color-surface)] px-5 py-3 text-center text-[11px] font-semibold uppercase leading-tight tracking-[0.06em] text-[var(--color-ink)] ring-1 ring-[var(--color-border)] md:text-[13px]">
            <span>10 TRIỆU+ sản phẩm đã bán</span>
            <span aria-hidden="true">·</span>
            <span>ISO 4074</span>
            <span aria-hidden="true">·</span>
            <span>★ 4.8/5 rating</span>
          </div>
        </div>
        <div className="relative mt-9 aspect-[16/10] overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-surface)] md:mt-12 md:aspect-[16/7]">
          <Image
            src="/images/playah/home/editorial/playah-ez-collab-facebook.jpg"
            alt="PlayAh"
            fill
            priority
            sizes="(min-width: 1280px) 1184px, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
    </section>
  );
}

function AnchorNav() {
  return (
    <nav className="sticky top-[106px] z-30 border-y border-[var(--color-border)] bg-[var(--color-white)]/95 backdrop-blur" aria-label="Contents">
      <Container>
        <div className="flex min-h-14 items-center gap-4 overflow-x-auto text-[12px] font-semibold uppercase leading-none tracking-[0.08em] text-[var(--color-muted)] md:justify-center md:gap-8">
          {anchors.map((item) => (
            <a key={item.href} href={item.href} className="shrink-0 py-5 transition-colors hover:text-[var(--color-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-[var(--color-green)]">
              {item.label}
            </a>
          ))}
        </div>
      </Container>
    </nav>
  );
}

function StoryBlock() {
  return (
    <section id="cau-chuyen" className="scroll-mt-[180px] bg-[var(--color-white)] py-14 md:py-20">
      <Container>
        <div className="grid gap-8 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:items-start md:gap-14">
          <h2 className="max-w-[9ch] text-[36px] font-semibold leading-[1.04] tracking-normal md:text-[54px] md:font-medium">Câu chuyện của PlayAh</h2>
          <div className="max-w-[720px] text-[18px] leading-[1.45] text-[var(--color-ink)]/84 md:text-[22px] md:leading-[1.42]">
            <p>
              PlayAh ra đời từ một niềm tin đơn giản: người Việt xứng đáng với sản phẩm chăm sóc vùng kín tốt nhất — không phải hàng nhập đắt đỏ, không phải hàng chợ rẻ tiền, mà là một brand Việt làm ra cho người Việt với chuẩn chất lượng quốc tế.
            </p>
            <p className="mt-6">
              Chúng tôi không né tránh chuyện ấy. Chúng tôi tin chăm sóc vùng kín là chăm sóc bản thân — thẳng thắn, tự tin, và đầy cảm xúc. Mỗi sản phẩm PlayAh được làm vì niềm vui trọn vẹn của cả hai người, không phải chỉ vì doanh số.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function MissionBlock() {
  return (
    <section id="su-menh" className="scroll-mt-[180px] bg-[var(--color-surface)] py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-[1000px] text-center">
          <h2 className="text-[38px] font-semibold leading-[1.04] tracking-normal md:text-[60px] md:font-medium lg:text-[72px]">
            Level Up Your Care <span className="font-serif font-normal italic">— nâng cấp cách bạn chăm sóc bản thân và người yêu thương.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[840px] text-[16px] leading-[1.55] text-[var(--color-ink)]/78 md:text-[19px]">
            Chúng tôi tin chuyện chăm sóc vùng kín không nên là chủ đề né tránh trong văn hóa Việt. Mỗi sản phẩm PlayAh là một bước nhỏ để xã hội nói về chuyện ấy thoải mái và đúng đắn hơn — vì cảm xúc thật, an toàn thật, bình đẳng thật giữa his pleasure và her feel.
          </p>
        </div>
      </Container>
    </section>
  );
}

function ProductLines() {
  return (
    <section id="san-pham" className="scroll-mt-[180px] bg-[var(--color-white)] py-12 md:py-20">
      <Container>
        <div className="grid gap-5 md:gap-8">
          {productLines.map((line) => (
            <ProductLineBlock key={line.title} line={line} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProductLineBlock({ line }: { line: ProductLine }) {
  return (
    <article className="grid overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] md:grid-cols-2">
      <div className={cn("relative min-h-[280px] md:min-h-[520px]", line.reverse && "md:order-2")}>
        <Image src={line.image} alt={line.imageAlt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      </div>
      <div className="flex min-h-[360px] flex-col justify-between p-6 md:min-h-[520px] md:p-10 lg:p-12">
        <div>
          <p className="font-mono text-[12px] font-semibold leading-none text-[var(--color-muted)]">{line.number}</p>
          <h3 className="mt-5 text-[38px] font-semibold leading-[1.02] tracking-normal md:text-[58px] md:font-medium">{line.title}</h3>
          <p className="mt-5 max-w-[560px] text-[16px] leading-[1.55] text-[var(--color-ink)]/78 md:text-[18px]">{line.body}</p>
        </div>
        <Link href={line.href} className="mt-8 inline-flex w-fit items-center gap-2 rounded-[var(--radius-pill)] bg-[var(--color-ink)] px-5 py-3 text-sm font-semibold leading-none !text-white transition-colors hover:bg-[var(--color-black)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-green)]">
          Khám phá <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
        </Link>
      </div>
    </article>
  );
}

function FeatureGrid({ id, title, items, tone = "white" }: { id: string; title: string; items: FeatureItem[]; tone?: "white" | "surface" }) {
  return (
    <section id={id} className={cn("scroll-mt-[180px] py-14 md:py-20", tone === "surface" ? "bg-[var(--color-surface)]" : "bg-[var(--color-white)]")}>
      <Container>
        <h2 className="mb-8 max-w-[760px] text-[36px] font-semibold leading-[1.04] tracking-normal md:mb-10 md:text-[54px] md:font-medium">{title}</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} className="min-h-[230px] rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-white)] p-5 md:p-6">
                <Icon aria-hidden="true" className="h-8 w-8 stroke-[1.65] text-[var(--color-green)]" />
                <h3 className="mt-8 text-[20px] font-semibold leading-[1.08] md:text-[24px]">{item.title}</h3>
                <p className="mt-3 text-[14px] leading-[1.45] text-[var(--color-muted)] md:text-[15px]">{item.body}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function StatCallout() {
  return (
    <section className="bg-[var(--color-ink)] py-16 text-[var(--color-white)] md:py-24">
      <Container>
        <div className="mx-auto max-w-[1000px] text-center">
          <h2 className="text-[46px] font-semibold leading-[0.98] tracking-normal md:text-[84px] md:font-medium lg:text-[104px]">10 triệu+ niềm vui</h2>
          <p className="mx-auto mt-6 max-w-[780px] text-[16px] leading-[1.55] text-white/76 md:text-[20px]">
            Tính đến nay, hơn 10 triệu sản phẩm PlayAh đã đến tay người dùng Việt Nam. Mỗi sản phẩm là một khoảnh khắc trọn vẹn — và là một bước nhỏ để xã hội nói về chuyện ấy thoải mái hơn. Cảm ơn bạn đã cùng PlayAh nâng cấp cách chăm sóc bản thân.
          </p>
        </div>
      </Container>
    </section>
  );
}

function CTASection() {
  return (
    <section className="bg-[var(--color-white)] py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-[760px] text-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">SẴN SÀNG KHÁM PHÁ?</p>
          <h2 className="mt-3 text-[38px] font-semibold leading-[1.02] tracking-normal md:text-[64px] md:font-medium">LEVEL UP YOUR CARE</h2>
          <Button href="/collections/all" className="mt-7 min-h-12 px-7 text-sm !text-white">
            Khám phá sản phẩm <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" strokeWidth={1.8} />
          </Button>
        </div>
      </Container>
    </section>
  );
}

function FooterLegal() {
  return (
    <section className="border-t border-[var(--color-border)] bg-[var(--color-white)] py-6">
      <Container>
        <div className="flex flex-col gap-2 text-[11px] leading-relaxed text-[var(--color-muted)] md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-6">
          <p>Công ty TNHH ROI Việt Nam, địa chỉ Số 28 Đường 18, KDC Ven Sông Tân Phong, P. Tân Hưng, TP.HCM</p>
          <p>MST: 0316717844 · Email: cskh@playahvietnam.com · Hotline: +84 765 880 136</p>
        </div>
      </Container>
    </section>
  );
}
