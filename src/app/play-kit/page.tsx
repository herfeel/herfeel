import type { Metadata } from "next";
import { PlayKitPage } from "@/features/play-kit/components/play-kit-page";

export const metadata: Metadata = {
  title: "Play Kit",
  description: "Build Your Play Kit: chọn 3 sản phẩm bất kỳ và xem ưu đãi PLAYKIT15 của Herfeel.",
};

export default function Page() {
  return <PlayKitPage />;
}
