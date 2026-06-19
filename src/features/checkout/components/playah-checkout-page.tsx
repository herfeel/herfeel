"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, ChevronDown, CircleAlert, HelpCircle, PackageCheck, Search } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import type { AccountCustomer } from "@/features/account/auth-service";
import { checkoutFormSchema, type CheckoutFormValues } from "@/features/checkout/address-schema";
import { mockCheckoutCart, mockCheckoutMainProduct } from "@/features/checkout/mock-checkout-data";
import type { CartState } from "@/features/cart/cart-types";
import { getCartItemCount } from "@/features/cart/cart-utils";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format-price";

type HerfeelCheckoutPageProps = {
  customer?: AccountCustomer;
};

export function HerfeelCheckoutPage({ customer }: HerfeelCheckoutPageProps) {
  const checkoutCart = mockCheckoutCart;
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: customer?.email,
      firstName: customer?.firstName,
      lastName: customer?.lastName,
      phone: customer?.phone,
      country: "Việt Nam",
      billingSame: true,
      marketingEmail: false,
      marketingText: false,
      saveInfo: false,
    },
  });

  const errors = form.formState.errors;
  const submitLabel = useMemo(() => (submitted ? "Đơn COD đã sẵn sàng" : "Đặt hàng COD"), [submitted]);

  function onSubmit() {
    setSubmitted(true);
  }

  return (
    <div className="playah-checkout-page min-h-screen bg-[#F7F5F2] text-[#111111]">
      <div className="md:hidden">
        <MobileLogo />
        <MobileSummaryBar open={summaryOpen} total={checkoutCart.totals.total.value} onToggle={() => setSummaryOpen((value) => !value)} />
        {summaryOpen ? <div className="border-b border-[#E8E4DD] bg-[#F7F5F2] px-3 pb-4"><OrderSummary cart={checkoutCart} compact /></div> : null}
      </div>

      <div className="grid min-h-screen md:grid-cols-[55%_45%]">
        <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white lg:bg-white">
          <div className="mx-auto w-full max-w-[596px] px-4 pb-8 pt-6 sm:px-8 md:ml-9 md:mr-0 md:max-w-[440px] md:px-0 md:pb-14 md:pt-14 xl:ml-[54px] xl:max-w-[596px]">
            <div className="hidden md:block">
              <Logo />
            </div>

            <WarningCard />


            {!customer ? (
              <>
                <section className="checkout-section">
                  <div className="mb-4 flex items-end justify-between">
                    <h2 className="checkout-title">Thông tin liên hệ</h2>
                    <a className="text-sm font-medium underline" href="/login">Đăng nhập</a>
                  </div>
                  <TextInput placeholder="Email" error={errors.email?.message} {...form.register("email")} />
                  <a href="/account" className="mt-4 inline-block text-sm font-medium underline">Chính sách bảo mật</a>
                  <Checkbox className="mt-5" label="Không nhận email Herfeel về ưu đãi kín đáo, hướng dẫn chọn sản phẩm và nội dung chăm sóc." {...form.register("marketingEmail")} />
                </section>

                <SectionRule />
              </>
            ) : null}

            <section className="checkout-section">
              <h2 className="checkout-title mb-4">Giao hàng</h2>
              <SelectInput label="Quốc gia/Khu vực" {...form.register("country")}>
                <option>Việt Nam</option>
                <option>Hoa Kỳ</option>
              </SelectInput>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <TextInput placeholder="Tên" error={errors.firstName?.message} {...form.register("firstName")} />
                <TextInput placeholder="Họ" error={errors.lastName?.message} {...form.register("lastName")} />
              </div>
              <TextInput className="mt-3" placeholder="Công ty (không bắt buộc)" {...form.register("company")} />
              <div className="relative mt-3">
                <TextInput placeholder="Địa chỉ" error={errors.address?.message} {...form.register("address")} />
                <Search className="pointer-events-none absolute right-4 top-4 h-5 w-5 text-[#555]" aria-hidden="true" />
              </div>
              <TextInput className="mt-3" placeholder="Căn hộ, tầng, ghi chú thêm (không bắt buộc)" {...form.register("apartment")} />
              <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_1fr_1fr]">
                <TextInput placeholder="Tỉnh/Thành phố" error={errors.city?.message} {...form.register("city")} />
                <SelectInput aria-label="Quận/Huyện" error={errors.state?.message} {...form.register("state")}>
                  <option value="">Quận/Huyện</option>
                  <option>Quận 1</option>
                  <option>Quận 3</option>
                  <option>Thành phố Thủ Đức</option>
                </SelectInput>
                <TextInput placeholder="Mã bưu chính" error={errors.zip?.message} {...form.register("zip")} />
              </div>
              <div className="relative mt-3">
                <TextInput placeholder="Số điện thoại *" error={errors.phone?.message} {...form.register("phone")} />
                <HelpCircle className="pointer-events-none absolute right-4 top-4 h-5 w-5 text-[#555]" aria-hidden="true" />
              </div>
              <Checkbox className="mt-4" label="Lưu thông tin cho lần sau" {...form.register("saveInfo")} />
              <Checkbox className="mt-3" label="Nhận ưu đãi và tin mới qua tin nhắn." {...form.register("marketingText")} />
            </section>

            <section className="checkout-section mt-7">
              <h2 className="checkout-title mb-4">Phương thức vận chuyển</h2>
              <div className="rounded-[4px] bg-[#F4F4F4] px-8 py-5 text-center text-sm text-[#666]">Nhập địa chỉ giao hàng để xem các phương thức vận chuyển khả dụng.</div>
            </section>

            <SectionRule />

            <section className="checkout-section">
              <h2 className="checkout-title">Thanh toán</h2>
              <p className="mb-4 text-sm text-[#666]">Hiện tại Herfeel chỉ nhận thanh toán khi giao hàng.</p>
              <PaymentMock billingProps={form.register("billingSame")} />
            </section>

            <div className="mt-8 md:hidden">
              <MobileDiscountAndTotal cart={checkoutCart} />
            </div>

            {submitted ? <p className="mt-5 rounded-[8px] border border-[#9beb8b] bg-[#DDF4D8] px-4 py-3 text-sm font-medium">Đơn COD thử nghiệm đã được ghi nhận. Không có thanh toán online nào được thu.</p> : null}

            <button type="submit" className="mt-8 h-[56px] w-full rounded-full bg-black px-5 text-sm font-bold text-white transition hover:bg-[#222] md:mt-12">
              {submitLabel}
            </button>

            <FooterLinks />
          </div>
        </form>

        <aside className="hidden min-h-screen bg-[#F2EFE8] md:block">
          <div className="sticky top-0 ml-6 max-w-[350px] px-0 py-12 xl:ml-[52px] xl:max-w-[472px]">
            <OrderSummary cart={checkoutCart} />
          </div>
        </aside>
      </div>
    </div>
  );
}

function Logo() {
  return <div className="mb-7 text-[40px] font-black leading-none tracking-normal">{siteConfig.name}</div>;
}

function MobileLogo() {
  return <div className="bg-white px-3 pb-1 pt-1 text-[35px] font-black leading-none tracking-normal">{siteConfig.name}</div>;
}

function MobileSummaryBar({ open, total, onToggle }: { open: boolean; total: number; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle} className="sticky top-0 z-30 flex h-[56px] w-full items-center justify-between border-y border-[#E8E4DD] bg-[#F7F5F2] px-3 text-left text-sm font-semibold">
      <span className="inline-flex items-center gap-1">Tóm tắt đơn hàng <ChevronDown className={cn("h-4 w-4 transition", open && "rotate-180")} /></span>
      <span className="text-lg">{formatPrice(total)}</span>
    </button>
  );
}

function WarningCard() {
  return (
    <section className="mb-5 flex gap-3 rounded-[4px] border border-[#E8E4DD] bg-[#FBF8F3] px-4 py-4 md:mb-6 md:px-5">
      <CircleAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#777]" />
      <div className="text-sm leading-[1.45]">
        <p className="font-bold">Vui lòng kiểm tra lại thông tin</p>
        <p className="mt-2 font-semibold">Đơn hàng hiện chỉ hỗ trợ COD. Nhân viên Herfeel sẽ xác nhận lại thông tin trước khi giao.</p>
      </div>
    </section>
  );
}

function SectionRule() {
  return <div className="my-7 h-px bg-[#E8E4DD] md:my-8" />;
}

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & { error?: string };

function TextInput({ className, error, ...props }: FieldProps) {
  return (
    <label className={cn("block", className)}>
      <input {...props} className={cn("h-[52px] w-full rounded-[8px] border border-[#E5E5E5] bg-white px-4 text-[16px] outline-none transition placeholder:text-[#777] focus:border-[#111]", error && "border-[#b3261e]")} />
      {error ? <span className="mt-1 block text-xs font-medium text-[#b3261e]">{error}</span> : null}
    </label>
  );
}

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string; error?: string };

function SelectInput({ className, label, error, children, ...props }: SelectProps) {
  return (
    <label className={cn("relative block", className)}>
      {label ? <span className="pointer-events-none absolute left-4 top-2 text-[12px] leading-none text-[#777]">{label}</span> : null}
      <select {...props} className={cn("h-[52px] w-full appearance-none rounded-[8px] border border-[#E5E5E5] bg-white px-4 text-[16px] font-medium outline-none transition focus:border-[#111]", label && "pt-4", error && "border-[#b3261e]")}>{children}</select>
      <ChevronDown className="pointer-events-none absolute right-4 top-[18px] h-4 w-4" />
      {error ? <span className="mt-1 block text-xs font-medium text-[#b3261e]">{error}</span> : null}
    </label>
  );
}

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & { label: string };

function Checkbox({ className, label, ...props }: CheckboxProps) {
  return (
    <label className={cn("flex items-start gap-3 text-sm font-medium leading-[1.35]", className)}>
      <input type="checkbox" {...props} className="mt-0.5 h-[18px] w-[18px] rounded-[3px] border border-[#DADADA] accent-black" />
      <span>{label}</span>
    </label>
  );
}

function PaymentMock({ billingProps }: { billingProps: UseFormRegisterReturn }) {
  return (
    <div className="overflow-hidden rounded-[8px] border border-[#111] bg-white">
      <div className="flex min-h-[64px] items-center justify-between border-b border-[#DADADA] bg-white px-4 py-3">
        <div className="flex items-center gap-3 text-sm font-bold"><span className="grid h-5 w-5 place-items-center rounded-full border border-black"><span className="h-2.5 w-2.5 rounded-full bg-black" /></span>Thanh toán khi nhận hàng (COD)</div>
        <PackageCheck className="h-5 w-5 text-[#347447]" aria-hidden="true" />
      </div>
      <div className="grid gap-3 bg-[#F4F4F4] p-4">
        <p className="text-sm font-medium leading-[1.5] text-[#555]">Không cần nhập QR, tài khoản ngân hàng, thẻ tín dụng hoặc ví điện tử. Thanh toán tiền mặt/chuyển khoản cho đơn vị giao hàng theo quy trình vận hành sau.</p>
        <Checkbox label="Dùng địa chỉ giao hàng làm địa chỉ thanh toán" defaultChecked {...billingProps} />
      </div>
    </div>
  );
}

function OrderSummary({ cart, compact = false }: { cart: CartState; compact?: boolean }) {
  const cartItems = cart.items;
  return (
    <div className={cn("text-[#111]", compact && "mx-auto max-w-[430px]")}> 
      {cartItems.map((item) => (
        <div key={item.key} className="mb-6 grid grid-cols-[82px_1fr_auto] gap-4">
          <div className="relative rounded-[4px] border border-[#E8E4DD] bg-white p-2">
            <Image src={item.image?.src ?? mockCheckoutMainProduct.thumbnail.src} alt={item.image?.alt ?? item.name} width={item.image?.width ?? mockCheckoutMainProduct.thumbnail.width} height={item.image?.height ?? mockCheckoutMainProduct.thumbnail.height} sizes="82px" className="aspect-square object-contain" />
            <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-[4px] bg-black text-xs font-bold text-white">{item.quantity}</span>
          </div>
          <div className="pt-2"><p className="text-sm font-bold">{item.name}</p><p className="mt-1 text-sm text-[#666]">{item.variantLabel}</p></div>
          <p className="pt-3 text-sm font-semibold">{formatPrice(item.lineSubtotal.value)}</p>
        </div>
      ))}

      <DiscountBlock />
      <RewardBlock total={cart.totals.total.value} />
      <PriceSummary subtotal={cart.totals.subtotal.value} total={cart.totals.total.value} />
    </div>
  );
}

function DiscountBlock() {
  return (
    <div className="mt-6">
      <div className="mb-5 flex gap-3 rounded-[4px] border border-[#E8E4DD] bg-white px-5 py-4 text-sm font-medium"><CircleAlert className="h-5 w-5 shrink-0 text-[#777]" />Nhập email trước khi áp dụng mã giảm giá</div>
      <div className="grid grid-cols-[1fr_96px] gap-3"><input className="h-[52px] rounded-[8px] border border-[#E5E5E5] bg-white px-4 text-[16px] outline-none focus:border-[#111]" placeholder="Mã giảm giá" /><button type="button" className="h-[52px] rounded-full bg-[#E9E3D9] text-sm font-bold text-[#8A837A]">Áp dụng</button></div>
    </div>
  );
}

function RewardBlock({ total }: { total: number }) {
  return <div className="mt-6 flex items-center gap-3 rounded-[4px] border border-[#99F18E] bg-[#DDF4D8] px-5 py-4 text-sm font-bold"><CheckCircle2 className="h-5 w-5 text-[#46BE6A]" />Bạn sẽ nhận {Math.round(total / 1000)} điểm Herfeel từ đơn hàng này</div>;
}

function PriceSummary({ subtotal, total }: { subtotal: number; total: number }) {
  return (
    <div className="mt-6 grid gap-3 text-sm">
      <div className="flex justify-between font-bold"><span>Tạm tính</span><span>{formatPrice(subtotal)}</span></div>
      <div className="flex justify-between text-[#666]"><span className="inline-flex items-center gap-1 font-semibold text-[#111]">Vận chuyển <HelpCircle className="h-3.5 w-3.5" /></span><span>Nhập địa chỉ giao hàng</span></div>
      <div className="mt-3 flex items-end justify-between"><span className="text-[20px] font-bold">Tổng cộng</span><span className="text-[13px] text-[#666]">VND <strong className="ml-2 text-[28px] text-[#111] md:text-[32px]">{formatPrice(total).replace("₫", "")}</strong></span></div>
    </div>
  );
}

function MobileDiscountAndTotal({ cart }: { cart: CartState }) {
  const firstItem = cart.items[0];
  const itemCount = getCartItemCount(cart.items);

  return <><button type="button" className="mb-5 h-10 rounded-full border border-[#E8E4DD] bg-white px-4 text-sm font-bold">Thêm mã giảm giá</button><div className="grid grid-cols-[44px_1fr_auto_auto] items-center gap-3"><div className="rounded border border-[#E8E4DD] bg-[#F7F5F2] p-1"><Image src={firstItem?.image?.src ?? mockCheckoutMainProduct.thumbnail.src} alt={firstItem?.image?.alt ?? "Sản phẩm trong đơn"} width={44} height={44} className="h-9 w-9 object-contain" /></div><div><p className="text-[20px] font-bold">Tổng cộng</p><p className="text-sm text-[#666]">{itemCount} sản phẩm</p></div><span className="text-xs text-[#666]">VND</span><span className="text-[22px] font-bold">{formatPrice(cart.totals.total.value).replace("₫", "")}</span></div></>;
}

function FooterLinks() {
  return <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium underline lg:mt-14"><a href="/order-success">Chính sách hoàn tiền</a><a href="/checkout">Giao hàng</a><a href="/account">Chính sách bảo mật</a><a href="/checkout">Điều khoản dịch vụ</a><a href="/account">Liên hệ</a></div>;
}
