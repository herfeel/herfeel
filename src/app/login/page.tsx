import type { Metadata } from "next";
import { AuthPage } from "@/features/account/components/auth-page";

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập tài khoản PlayAh để chuẩn bị theo dõi đơn hàng và thông tin giao kín đáo.",
};

export default function LoginPage() {
  return <AuthPage mode="login" />;
}
