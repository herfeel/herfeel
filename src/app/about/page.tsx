import type { Metadata } from "next";
import { AboutPage } from "@/features/about/components/about-page";

export const metadata: Metadata = {
  title: "Về PlayAh",
  description: "Brand Việt chuẩn quốc tế cho chuyện chăm sóc vùng kín — vì cảm xúc thật, an toàn thật.",
};

export default function Page() {
  return <AboutPage />;
}
