import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock3, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { playbookArticles, playbookFaqs, playbookGuides, playbookTopics, type PlaybookGuide } from "@/data/mock/playbook";
import { cn } from "@/lib/cn";

const guideToneClass: Record<PlaybookGuide["tone"], string> = {
  ink: "bg-[var(--color-ink)] text-white",
  green: "bg-[var(--color-green-soft)] text-[var(--color-ink)]",
  blue: "bg-[#e6f4f7] text-[var(--color-ink)]",
  cream: "bg-[var(--color-surface)] text-[var(--color-ink)]",
};

export function PlaybookPage() {
  return (
    <div className="overflow-x-hidden bg-white text-[var(--color-ink)]">
      <HeroSection />
      <FeaturedGuides />
      <TopicChips />
      <ArticleGrid />
      <FaqSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="border-b border-[var(--color-border)] bg-white">
      <Container>
        <div className="grid min-w-0 gap-8 py-12 md:grid-cols-[minmax(0,0.96fr)_minmax(320px,0.64fr)] md:items-end md:py-16 lg:py-20">
          <div className="min-w-0">
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--color-muted)]">THE PLAYBOOK</p>
            <h1 className="mt-4 max-w-[18rem] break-words text-[38px] font-semibold leading-[1.04] tracking-normal sm:max-w-[820px] sm:text-[44px] md:text-[72px] md:leading-[1.02] lg:text-[86px]">
              <span className="block">Chọn đúng,</span>
              <span className="block">dùng đúng,</span>
              <span className="block">thoải mái hơn</span>
            </h1>
            <p className="mt-5 max-w-[18rem] break-words text-[17px] leading-7 text-[var(--color-muted)] sm:max-w-[680px] md:text-[20px] md:leading-8">
              Những hướng dẫn ngắn gọn về bao cao su Herfeel, gel bôi trơn và chăm sóc cá nhân - dễ hiểu, riêng tư, không làm bạn ngại.
            </p>
            <div className="mt-7 flex max-w-[18rem] flex-col gap-3 sm:max-w-none sm:flex-row">
              <Button href="/shop" className="gap-2 px-6 !text-white hover:!text-black">
                Bắt đầu chọn sản phẩm
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Button>
              <Button href="#articles" variant="secondary" className="gap-2 px-6">
                Xem bài mới nhất
                <BookOpen aria-hidden="true" className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="min-w-0 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:w-auto md:p-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-md)] bg-white">
              <Image
                src="/images/highlight-product/bao-cao-su.webp"
                alt="Sản phẩm Herfeel trong PlayBook"
                fill
                priority
                sizes="(min-width: 1024px) 34vw, (min-width: 768px) 42vw, 100vw"
                className="object-contain object-center p-5"
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm font-semibold">
              <span className="flex min-h-11 items-center gap-2 rounded-[var(--radius-pill)] bg-white px-4"><Sparkles aria-hidden="true" className="h-4 w-4" /> Vui nhẹ</span>
              <span className="flex min-h-11 items-center gap-2 rounded-[var(--radius-pill)] bg-white px-4"><ShieldCheck aria-hidden="true" className="h-4 w-4" /> Riêng tư</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FeaturedGuides() {
  return (
    <section id="nguoi-moi" className="bg-white py-10 md:py-14 lg:py-16">
      <Container>
        <div className="mb-6 flex flex-col justify-between gap-3 md:mb-8 md:flex-row md:items-end">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--color-muted)]">Bắt đầu nhanh</p>
            <h2 className="mt-2 text-[34px] font-semibold leading-tight md:text-[52px] md:font-medium">Chọn lối vào phù hợp</h2>
          </div>
          <p className="max-w-[420px] text-sm leading-6 text-[var(--color-muted)] md:text-base">Không cần đọc quá nhiều. Vào đúng chủ đề, xem nhanh, rồi quay lại mua sắm khi thấy ổn.</p>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {playbookGuides.map((guide) => (
            <Link key={guide.title} href={guide.href} className={cn("group flex min-h-[320px] max-w-[22rem] flex-col overflow-hidden rounded-[var(--radius-md)] p-5 transition-transform duration-200 hover:-translate-y-1 sm:max-w-none", guideToneClass[guide.tone])}>
              <span className="relative mb-5 block aspect-square overflow-hidden rounded-[var(--radius-md)] bg-white/70">
                <Image src={guide.image} alt="" fill sizes="(min-width: 1024px) 22vw, (min-width: 768px) 45vw, 100vw" className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.04]" />
              </span>
              <span className="mt-auto block text-[22px] font-semibold leading-tight">{guide.title}</span>
              <span className={cn("mt-2 block text-sm leading-6", guide.tone === "ink" ? "text-white/76" : "text-[var(--color-muted)]")}>{guide.subtitle}</span>
              <span className={cn("mt-4 inline-flex h-9 w-9 items-center justify-center rounded-full", guide.tone === "ink" ? "bg-white text-[var(--color-ink)]" : "bg-white text-[var(--color-ink)]")}>→</span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

function TopicChips() {
  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)] py-6">
      <Container>
        <div className="flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {playbookTopics.map((topic) => (
            <Link key={topic} href="#articles" className="inline-flex min-h-11 shrink-0 items-center rounded-[var(--radius-pill)] bg-white px-5 text-sm font-semibold ring-1 ring-[var(--color-border)] transition-colors hover:bg-[var(--color-green-soft)]">
              {topic}
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

function ArticleGrid() {
  return (
    <section id="articles" className="scroll-mt-[120px] bg-white py-10 md:py-14 lg:py-16">
      <Container>
        <div className="mb-7 flex flex-col justify-between gap-3 md:mb-10 md:flex-row md:items-end">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--color-muted)]">Bài mới nhất</p>
            <h2 className="mt-2 text-[34px] font-semibold leading-tight md:text-[52px] md:font-medium">Đọc nhanh, chọn tự tin</h2>
          </div>
          <Button href="/shop" variant="ghost" className="w-fit gap-2 px-5">
            Mua sắm
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid gap-x-5 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
          {playbookArticles.map((article) => (
            <article key={article.slug} id={article.slug} className="group min-w-0 max-w-[22rem] scroll-mt-[120px] sm:max-w-none">
              <Link href={`/playbook/${article.slug}`} className="block rounded-[var(--radius-md)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-green)]">
                <span className="relative block aspect-[4/3] overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-surface)] ring-1 ring-[var(--color-border)]">
                  <Image src={article.image} alt="" fill sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw" className="object-cover transition-transform duration-300 group-hover:scale-[1.04]" />
                </span>
                <span className="mt-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">
                  {article.category}
                  <span aria-hidden="true">·</span>
                  <Clock3 aria-hidden="true" className="h-3.5 w-3.5" />
                  {article.readingTime}
                </span>
                <h3 className="mt-2 text-[24px] font-semibold leading-tight md:text-[28px]">{article.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)] md:text-[15px]">{article.excerpt}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">Đọc tiếp <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-[120px] bg-[var(--color-surface)] py-10 md:py-14 lg:py-16">
      <Container>
        <div className="grid gap-8 md:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)] md:gap-12 lg:gap-16">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--color-muted)]">FAQ</p>
            <h2 className="mt-2 max-w-[9ch] text-[34px] font-semibold leading-[1.02] md:text-[52px] md:font-medium">Câu hỏi ngại hỏi</h2>
          </div>
          <div className="rounded-[var(--radius-md)] bg-white px-5 md:px-7">
            {playbookFaqs.map((faq, index) => (
              <details key={faq.question} className="group border-b border-[var(--color-border)] py-5 last:border-b-0 md:py-6" open={index === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[16px] font-semibold leading-tight marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-green)] md:text-[18px] [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--color-surface)] text-xl leading-none transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-[720px] text-[15px] leading-7 text-[var(--color-muted)]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
