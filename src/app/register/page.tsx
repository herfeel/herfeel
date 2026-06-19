import type { Metadata } from "next";
import { AuthPage } from "@/features/account/components/auth-page";

export const metadata: Metadata = {
  title: "Đăng ký",
  description: "Tạo tài khoản PlayAh mock để chuẩn bị lưu thông tin giao hàng và hỗ trợ riêng tư.",
};

export default function RegisterPage() {
  return <AuthPage mode="register" />;
}
