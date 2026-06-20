import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { CheckCircle2, LockKeyhole, PackageSearch, ShieldCheck, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { customerSessionCookieName, getCurrentCustomer } from "@/features/account/auth-service";
import { LogoutButton } from "@/features/account/components/logout-button";

export const metadata: Metadata = {
  title: "Tài khoản và hỗ trợ đơn hàng",
  description: "Tài khoản PlayAh ở trạng thái chưa đăng nhập, với lựa chọn đăng nhập, đăng ký và hỗ trợ đơn hàng riêng tư.",
};

export const dynamic = "force-dynamic";

const supportCards = [
  {
    title: "Theo dõi đơn",
    body: "Chuẩn bị bề mặt tra cứu đơn hàng khi endpoint thật sẵn sàng. Hiện dùng đơn mock để kiểm tra luồng.",
    href: "/order-success",
    cta: "Xem đơn mẫu",
    icon: PackageSearch,
  },
  {
    title: "Tiếp tục thanh toán",
    body: "Quay lại checkout mock để kiểm tra giao hàng, tổng tiền và ghi chú riêng tư.",
    href: "/checkout",
    cta: "Vào checkout",
    icon: CheckCircle2,
  },
  {
    title: "Hỗ trợ riêng tư",
    body: "Xem sản phẩm và hướng dẫn chọn gọn, không cần đăng nhập hoặc lưu thông tin cá nhân.",
    href: "/shop",
    cta: "Mua sắm",
    icon: ShieldCheck,
  },
];

export default async function AccountPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(customerSessionCookieName)?.value;
  const currentCustomer = token ? await getCurrentCustomer(token) : undefined;
  const user = currentCustomer?.ok ? currentCustomer.user : undefined;
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");

  return (
    <main className="bg-white">
      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <Container>
          <nav className="flex min-w-0 flex-wrap items-center gap-2 py-4 text-[13px] font-medium text-[var(--color-muted)]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[var(--color-ink)] hover:underline">Trang chủ</Link>
            <span aria-hidden="true">/</span>
            <span className="text-[var(--color-ink)]">Tài khoản</span>
          </nav>
        </Container>
      </section>

      <section className="py-10 md:py-16 lg:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_420px] lg:items-start">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">{user ? "Đã đăng nhập" : "Chưa đăng nhập"}</p>
              <h1 className="mt-3 max-w-[760px] text-[42px] font-semibold leading-[1.02] tracking-normal text-[var(--color-ink)] md:text-[64px] lg:text-[76px]">Tài khoản PlayAh</h1>
              <p className="mt-5 max-w-[680px] text-[16px] leading-7 text-[var(--color-muted)] md:text-[18px]">
                {user ? `Xin chào ${fullName || user.email}. Phiên đăng nhập được xác thực qua WordPress auth bridge.` : "Đăng nhập hoặc đăng ký để lưu thông tin giao hàng, theo dõi đơn và nhận hỗ trợ riêng tư."}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                {user ? (
                  <LogoutButton />
                ) : (
                  <>
                    <Button href="/login" className="min-h-11 px-6 text-sm !text-white">Đăng nhập</Button>
                    <Button href="/register" variant="secondary" className="min-h-11 px-6 text-sm !text-black">Đăng ký</Button>
                  </>
                )}
              </div>
            </div>

            <aside className="rounded-[var(--radius-md)] bg-[var(--color-ink)] p-6 text-white">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-white/10">
                <UserRound aria-hidden="true" className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-[24px] font-semibold leading-tight">{user ? "Thông tin tài khoản" : "Phiên riêng tư"}</h2>
              <p className="mt-3 text-sm leading-6 text-white/72">{user ? user.email : "Đăng nhập qua Next API; cookie HttpOnly giữ phiên, browser không đọc được token."}</p>
              <div className="mt-5 flex items-start gap-2 rounded-[var(--radius-sm)] bg-white/10 p-3 text-xs leading-5 text-white/78">
                <LockKeyhole aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" /> Token phiên không render trong HTML hoặc client state.
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-t border-[var(--color-border)] bg-white py-8 md:py-12">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {supportCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link key={card.title} href={card.href} className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                  <Icon aria-hidden="true" className="h-6 w-6 stroke-[1.6] text-[var(--color-ink)]" />
                  <h2 className="mt-5 text-[20px] font-semibold leading-tight text-[var(--color-ink)]">{card.title}</h2>
                  <p className="mt-2 min-h-[72px] text-sm leading-6 text-[var(--color-muted)]">{card.body}</p>
                  <span className="mt-5 inline-flex min-h-9 items-center rounded-[var(--radius-pill)] border border-transparent bg-[var(--color-ink)] px-4 text-xs font-semibold text-white transition-[background-color,border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-[#347447] hover:bg-[var(--color-green-soft)] hover:text-black">
                    {card.cta}
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </main>
  );
}
