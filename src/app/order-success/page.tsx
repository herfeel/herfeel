import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

type OrderSuccessPageProps = {
  searchParams?: Promise<{
    orderId?: string;
    orderNumber?: string;
  }>;
};

export default async function OrderSuccessPage({ searchParams }: OrderSuccessPageProps) {
  const params = await searchParams;
  const orderCode = params?.orderNumber || params?.orderId;

  return (
    <Section>
      <Container className="max-w-3xl py-16 text-center md:py-24">
        <p className="text-sm font-bold uppercase tracking-normal text-[var(--color-green)]">COD</p>
        <h1 className="mt-3 text-4xl font-medium md:text-5xl">Đặt hàng thành công</h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[var(--color-muted)]">Herfeel đã nhận đơn hàng của bạn. Đội ngũ vận hành sẽ xác nhận thông tin trước khi giao.</p>
        {orderCode ? <p className="mt-6 rounded-[8px] bg-[var(--color-surface)] px-5 py-4 text-lg font-bold">Mã đơn: {orderCode}</p> : null}
        <Link href="/shop" className="mt-8 inline-flex h-12 items-center justify-center rounded-full border border-transparent bg-[var(--color-ink)] px-6 text-sm font-bold text-white transition-[background-color,border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-[#347447] hover:bg-[var(--color-green-soft)] hover:text-black">
          Tiếp tục mua sắm
        </Link>
      </Container>
    </Section>
  );
}
