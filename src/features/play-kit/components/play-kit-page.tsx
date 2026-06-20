import Link from "next/link";
import { ArrowRight, Check, Copy, PackageCheck, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { playKitStarterPacks, playKitSteps, playKitTerms, type PlayKitPack, type PlayKitStep } from "@/data/mock/play-kit";

export function PlayKitPage() {
  return (
    <div className="bg-white text-[var(--color-ink)]">
      <PlayKitHero />
      <PlayKitSteps />
      <StarterPacksSection />
      <TermsSection />
    </div>
  );
}

function PlayKitHero() {
  return (
    <section className="border-b border-[var(--color-border)] bg-white py-10 md:py-16 lg:py-20">
      <Container>
        <div className="mx-auto grid max-w-[1120px] gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <Badge tone="promo" className="mb-5 gap-2 px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em]">
              Build your loadout
            </Badge>
            <h1 className="max-w-[720px] text-[42px] font-semibold leading-[1.02] tracking-normal md:text-[68px] lg:text-[82px]">
              Play <em className="font-serif font-normal italic">Kit</em>
            </h1>
            <p className="mt-4 max-w-[600px] text-[16px] leading-snug text-[var(--color-ink)]/78 md:text-[20px]">
              Chọn 3 sản phẩm bất kỳ cho một bộ kit kín đáo, dễ dùng và nhận ưu đãi 15% với mã promo.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/shop" className="min-h-12 px-7 text-[15px] sm:w-auto">
                Shop ngay
                <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" strokeWidth={1.8} />
              </Button>
              <Button href="#starter-packs" variant="secondary" className="min-h-12 px-7 text-[15px] sm:w-auto">
                Xem gợi ý kit
              </Button>
            </div>
          </div>

          <aside className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 md:p-6">
            <div className="flex items-center justify-between gap-4 border-b border-[var(--color-border)] pb-5">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">Promo code</p>
                <p className="mt-2 break-all font-mono text-[34px] font-semibold leading-none tracking-normal text-[var(--color-black)] md:text-[44px]">PLAYKIT15</p>
              </div>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-[var(--color-black)] ring-1 ring-[var(--color-border)]" aria-hidden="true">
                <Copy className="h-5 w-5" strokeWidth={1.8} />
              </span>
            </div>
            <div className="grid gap-3 pt-5 text-sm leading-snug text-[var(--color-ink)]/82">
              <p className="flex gap-3"><CheckIcon /> Chọn đủ 3 sản phẩm trong giỏ hàng.</p>
              <p className="flex gap-3"><CheckIcon /> Giảm 15% khi ưu đãi được áp dụng trong checkout.</p>
              <p className="flex gap-3"><CheckIcon /> Giao hàng kín đáo theo chính sách Herfeel.</p>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}

function PlayKitSteps() {
  return (
    <section className="bg-white py-12 md:py-16">
      <Container>
        <div className="mb-8 flex flex-col justify-between gap-4 md:mb-10 md:flex-row md:items-end">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">Cách build kit</p>
            <h2 className="mt-2 text-[32px] font-semibold leading-tight tracking-normal md:text-[54px] md:font-medium">
              Ba bước, <em className="font-serif font-normal italic">một kit</em>
            </h2>
          </div>
          <p className="max-w-[430px] text-sm leading-snug text-[var(--color-muted)] md:text-base">
            Chọn theo danh mục trước, sau đó tinh chỉnh bằng nhu cầu và quy cách trên từng trang sản phẩm.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-3 md:gap-5">
          {playKitSteps.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function StepCard({ step }: { step: PlayKitStep }) {
  return (
    <article className="flex min-h-[260px] flex-col rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 md:min-h-[300px] md:p-6">
      <p className="text-[48px] font-semibold leading-none text-[var(--color-green)]/65 md:text-[60px]">{step.number}</p>
      <h3 className="mt-6 text-[23px] font-semibold leading-tight tracking-normal md:text-[27px]">{step.title}</h3>
      <p className="mt-3 text-sm leading-snug text-[var(--color-ink)]/75 md:text-[15px]">{step.description}</p>
      <Link href={step.href} className="mt-auto inline-flex min-h-10 items-center gap-2 pt-6 text-sm font-semibold text-[var(--color-black)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-green)]">
        {step.ctaLabel}
        <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
      </Link>
    </article>
  );
}

function StarterPacksSection() {
  return (
    <section id="starter-packs" className="scroll-mt-[120px] bg-[var(--color-surface)] py-12 md:py-16">
      <Container>
        <div className="mb-8 text-center md:mb-10">
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">Starter packs</p>
          <h2 className="mt-2 text-[32px] font-semibold leading-tight tracking-normal md:text-[54px] md:font-medium">
            Gợi ý <em className="font-serif font-normal italic">bắt đầu</em>
          </h2>
        </div>
        <div className="grid gap-3 md:grid-cols-3 md:gap-5">
          {playKitStarterPacks.map((pack) => (
            <StarterPackCard key={pack.eyebrow} pack={pack} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function StarterPackCard({ pack }: { pack: PlayKitPack }) {
  return (
    <article className="flex min-h-[330px] flex-col rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white p-5 md:min-h-[380px] md:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-green)]">{pack.eyebrow}</p>
          <h3 className="mt-2 text-[24px] font-semibold leading-tight tracking-normal md:text-[29px]">{pack.title}</h3>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[var(--color-surface)] text-[var(--color-black)]" aria-hidden="true">
          <PackageCheck className="h-5 w-5" strokeWidth={1.7} />
        </span>
      </div>
      <ul className="grid gap-2 border-y border-[var(--color-border)] py-4 text-sm leading-snug text-[var(--color-ink)]/82">
        {pack.products.map((product) => (
          <li key={product} className="flex gap-2">
            <CheckIcon />
            <span>{product}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm leading-snug text-[var(--color-muted)] md:text-[15px]">{pack.description}</p>
      <Button href={pack.href} variant="secondary" className="min-h-11 px-5 text-sm mt-5">
        Xem pack
      </Button>
    </article>
  );
}

function TermsSection() {
  return (
    <section className="bg-white py-12 md:py-16">
      <Container>
        <div className="grid gap-6 rounded-[var(--radius-md)] bg-[var(--color-ink)] p-5 text-white md:grid-cols-[0.85fr_1.15fr] md:p-8">
          <div>
            <span className="mb-4 grid h-11 w-11 place-items-center rounded-full bg-[var(--color-green-soft)] text-[var(--color-black)]" aria-hidden="true">
              <ShieldCheck className="h-5 w-5" strokeWidth={1.8} />
            </span>
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-white/62">Điều kiện áp dụng</p>
            <h2 className="mt-2 max-w-[420px] text-[28px] font-semibold leading-tight tracking-normal md:text-[42px] md:font-medium">
              Rõ ưu đãi, <em className="font-serif font-normal italic">không thêm logic</em>
            </h2>
          </div>
          <ul className="grid content-center gap-3 text-sm leading-snug text-white/82 md:text-base">
            {playKitTerms.map((term) => (
              <li key={term} className="flex gap-3">
                <CheckIcon />
                <span>{term}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function CheckIcon() {
  return (
    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--color-green-soft)] text-[var(--color-black)]" aria-hidden="true">
      <Check className="h-3.5 w-3.5" strokeWidth={2.2} />
    </span>
  );
}
