"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { CheckCircle2, Eye, EyeOff, LockKeyhole, PackageSearch, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { notifyAccountAuthChanged } from "@/features/account/auth-client-events";
import type { AuthMode } from "../auth-types";

type AuthPageProps = {
  mode: AuthMode;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubmitState = {
  status: "idle" | "loading" | "success" | "error";
  message?: string;
};

async function submitAccountAuth(mode: AuthMode, payload: Record<string, string | boolean>) {
  const response = await fetch(`/api/account/${mode}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = (await response.json().catch(() => ({}))) as { ok?: boolean; message?: string };

  return {
    ok: response.ok && data.ok === true,
    message: data.message ?? "Chưa thể xử lý tài khoản. Vui lòng thử lại sau.",
  };
}

export function AuthPage({ mode }: AuthPageProps) {
  const isRegister = mode === "register";

  return (
    <main className="bg-white">
      <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <Container>
          <nav className="flex min-w-0 flex-wrap items-center gap-2 py-4 text-[13px] font-medium text-[var(--color-muted)]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[var(--color-ink)] hover:underline">Trang chủ</Link>
            <span aria-hidden="true">/</span>
            <span className="text-[var(--color-ink)]">{isRegister ? "Đăng ký" : "Đăng nhập"}</span>
          </nav>
        </Container>
      </section>
      <section className="bg-white py-5 md:py-8 lg:py-10">
        <Container>
          <div className="grid overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border)] bg-white lg:min-h-[680px] lg:grid-cols-[minmax(0,1fr)_460px] xl:grid-cols-[minmax(0,1fr)_500px]">
            <VisualPanel />
            <AuthPanel mode={mode} />
          </div>
        </Container>
      </section>
    </main>
  );
}

function VisualPanel() {
  return (
    <div className="relative min-h-[300px] overflow-hidden bg-[var(--color-ink)] md:min-h-[420px] lg:min-h-full">
      <Image
        src="/images/playah/home/standards/sensitive-care-standard.jpeg"
        alt="PlayAh sản phẩm chăm sóc riêng tư được đóng gói kín đáo"
        fill
        priority
        sizes="(min-width: 1024px) 55vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.10),rgb(0_0_0/0.62)),linear-gradient(90deg,rgb(0_0_0/0.34),transparent)]" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8 lg:p-10">
        <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-white/72">Tài khoản PlayAh</p>
        <h1 className="mt-3 max-w-[620px] text-[42px] font-semibold leading-[1.02] tracking-normal md:text-[58px] lg:text-[68px]">Mua sắm riêng tư, theo dõi gọn gàng.</h1>
        <div className="mt-6 grid gap-3 text-sm font-medium text-white/88 sm:grid-cols-3 lg:max-w-[640px]">
          <span className="inline-flex items-center gap-2"><ShieldCheck aria-hidden="true" className="h-4 w-4" /> Giao hàng kín đáo</span>
          <span className="inline-flex items-center gap-2"><PackageSearch aria-hidden="true" className="h-4 w-4" /> Theo dõi đơn</span>
          <span className="inline-flex items-center gap-2"><LockKeyhole aria-hidden="true" className="h-4 w-4" /> Dữ liệu bảo mật</span>
        </div>
      </div>
    </div>
  );
}

function AuthPanel({ mode }: AuthPageProps) {
  return (
    <aside className="flex flex-col bg-white p-5 md:p-8 lg:p-9">
      <div className="grid grid-cols-2 rounded-[var(--radius-pill)] bg-[var(--color-surface)] p-1" role="tablist" aria-label="Tài khoản">
        <Link href="/login" role="tab" aria-selected={mode === "login"} className={mode === "login" ? "flex h-11 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-ink)] text-sm font-semibold !text-white" : "flex h-11 items-center justify-center rounded-[var(--radius-pill)] text-sm font-semibold text-[var(--color-ink)]"}>Đăng nhập</Link>
        <Link href="/register" role="tab" aria-selected={mode === "register"} className={mode === "register" ? "flex h-11 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-ink)] text-sm font-semibold !text-white" : "flex h-11 items-center justify-center rounded-[var(--radius-pill)] text-sm font-semibold text-[var(--color-ink)]"}>Đăng ký</Link>
      </div>
      <div className="mt-8">
        {mode === "register" ? <RegisterForm /> : <LoginForm />}
      </div>
      <div className="mt-auto pt-8">
        <div className="rounded-[var(--radius-md)] bg-[var(--color-surface)] p-4">
          <p className="text-sm font-semibold text-[var(--color-ink)]">Bảo mật phiên đăng nhập</p>
          <p className="mt-2 text-xs leading-5 text-[var(--color-muted)]">Form gọi Next API trước; token WordPress được giữ trong cookie HttpOnly và không đưa vào client state.</p>
        </div>
      </div>
    </aside>
  );
}

function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const emailValid = emailPattern.test(email);
  const canContinue = emailValid && password.length >= 6;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canContinue || submitState.status === "loading") return;

    setSubmitState({ status: "loading" });
    const result = await submitAccountAuth("login", { email, password });
    setSubmitState({ status: result.ok ? "success" : "error", message: result.message });
    if (result.ok) {
      notifyAccountAuthChanged();
      router.refresh();
      router.push("/account");
    }
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
      <div>
        <h2 className="text-[30px] font-semibold leading-tight text-[var(--color-ink)]">Đăng nhập</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">Nhập email để chuẩn bị xem đơn hàng, địa chỉ giao kín đáo và thông tin đã lưu.</p>
      </div>
      <Field label="Email" type="email" value={email} onChange={setEmail} error={email && !emailValid ? "Email chưa đúng định dạng." : undefined} autoComplete="email" />
      <PasswordField label="Mật khẩu" value={password} onChange={setPassword} show={showPassword} setShow={setShowPassword} autoComplete="current-password" />
      <Button type="submit" disabled={!canContinue || submitState.status === "loading"} className="mt-2 min-h-12 text-sm !text-white">{submitState.status === "loading" ? "Đang kiểm tra..." : "Tiếp tục"}</Button>
      <SubmitNotice state={submitState} />
      <Link href="/register" className="text-center text-sm font-semibold underline-offset-4 hover:underline">Chưa có tài khoản? Đăng ký</Link>
    </form>
  );
}

function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [submitState, setSubmitState] = useState<SubmitState>({ status: "idle" });
  const emailValid = emailPattern.test(email);
  const phoneValid = phone.replace(/\D/g, "").length >= 9;
  const canCreate = emailValid && firstName.trim() && lastName.trim() && phoneValid && password.length >= 6 && privacy;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canCreate || submitState.status === "loading") return;

    setSubmitState({ status: "loading" });
    const result = await submitAccountAuth("register", { email, firstName, lastName, phone, password, marketing, privacy });
    setSubmitState({ status: result.ok ? "success" : "error", message: result.message });
    if (result.ok) {
      notifyAccountAuthChanged();
      router.refresh();
      router.push("/account");
    }
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
      <div>
        <h2 className="text-[30px] font-semibold leading-tight text-[var(--color-ink)]">Tạo tài khoản</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">Lưu thông tin giao hàng, xem trạng thái đơn và nhận hỗ trợ riêng tư nhanh hơn.</p>
      </div>
      <Field label="Email" type="email" value={email} onChange={setEmail} error={email && !emailValid ? "Email chưa đúng định dạng." : undefined} autoComplete="email" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Tên" value={firstName} onChange={setFirstName} autoComplete="given-name" />
        <Field label="Họ" value={lastName} onChange={setLastName} autoComplete="family-name" />
      </div>
      <Field label="Số điện thoại" type="tel" value={phone} onChange={setPhone} error={phone && !phoneValid ? "Số điện thoại cần ít nhất 9 chữ số." : undefined} autoComplete="tel" />
      <PasswordField label="Mật khẩu" value={password} onChange={setPassword} show={showPassword} setShow={setShowPassword} autoComplete="new-password" />
      <Checkbox label="Tôi đồng ý nhận cập nhật về đơn hàng, giao hàng và hỗ trợ tài khoản." checked={privacy} onChange={setPrivacy} required />
      <Checkbox label="Nhận ưu đãi và hướng dẫn chọn sản phẩm kín đáo qua email/SMS." checked={marketing} onChange={setMarketing} />
      <Button type="submit" disabled={!canCreate || submitState.status === "loading"} className="mt-2 min-h-12 text-sm !text-white">{submitState.status === "loading" ? "Đang tạo..." : "Tạo tài khoản"}</Button>
      <SubmitNotice state={submitState} />
      <p className="flex items-start gap-2 text-xs leading-5 text-[var(--color-muted)]"><CheckCircle2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-green)]" /> Tài khoản được tạo qua PlayAh auth bridge; browser không giữ quyền admin.</p>
    </form>
  );
}

function SubmitNotice({ state }: { state: SubmitState }) {
  if (state.status === "idle" || state.status === "loading") return null;

  const isSuccess = state.status === "success";

  return (
    <p className={isSuccess ? "rounded-[var(--radius-sm)] bg-[var(--color-green-soft)] px-3 py-2 text-xs font-medium leading-5 text-[var(--color-ink)]" : "rounded-[var(--radius-sm)] bg-[#fff4e6] px-3 py-2 text-xs font-medium leading-5 text-[#9a3412]"} role="status" aria-live="polite">
      {state.message}
    </p>
  );
}

function Field({ label, value, onChange, error, type = "text", autoComplete }: { label: string; value: string; onChange: (value: string) => void; error?: string; type?: string; autoComplete?: string }) {
  const id = useMemo(() => label.toLowerCase().replace(/\s+/g, "-"), [label]);
  return (
    <label className="grid gap-2 text-sm font-semibold text-[var(--color-ink)]" htmlFor={id}>
      {label}
      <input id={id} type={type} value={value} autoComplete={autoComplete} onChange={(event) => onChange(event.target.value)} className="h-12 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-white px-4 text-[15px] font-normal outline-none transition-colors focus:border-[var(--color-ink)]" />
      {error ? <span className="text-xs font-medium text-[#9a3412]">{error}</span> : null}
    </label>
  );
}

function PasswordField({ label, value, onChange, show, setShow, autoComplete }: { label: string; value: string; onChange: (value: string) => void; show: boolean; setShow: (value: boolean) => void; autoComplete: string }) {
  return (
    <div className="grid gap-2 text-sm font-semibold text-[var(--color-ink)]">
      <label htmlFor="password">{label}</label>
      <span className="relative block">
        <input id="password" type={show ? "text" : "password"} value={value} autoComplete={autoComplete} onChange={(event) => onChange(event.target.value)} className="h-12 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-white px-4 pr-12 text-[15px] font-normal outline-none transition-colors focus:border-[var(--color-ink)]" />
        <button type="button" className="absolute right-1.5 top-1.5 grid h-9 w-9 place-items-center rounded-full hover:bg-[var(--color-surface)]" aria-label={show ? "Ẩn mật khẩu" : "Hiện mật khẩu"} onClick={() => setShow(!show)}>
          {show ? <EyeOff aria-hidden="true" className="h-4 w-4" /> : <Eye aria-hidden="true" className="h-4 w-4" />}
        </button>
      </span>
      {value && value.length < 6 ? <span className="text-xs font-medium text-[#9a3412]">Mật khẩu cần ít nhất 6 ký tự.</span> : null}
    </div>
  );
}

function Checkbox({ label, checked, onChange, required }: { label: string; checked: boolean; onChange: (value: boolean) => void; required?: boolean }) {
  return (
    <label className="flex items-start gap-3 text-xs font-medium leading-5 text-[var(--color-muted)]">
      <input type="checkbox" checked={checked} required={required} onChange={(event) => onChange(event.target.checked)} className="mt-1 h-4 w-4 accent-[var(--color-ink)]" />
      <span>{label}</span>
    </label>
  );
}
