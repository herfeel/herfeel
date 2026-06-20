import type { Metadata } from "next";
import { PlaybookPage } from "@/features/playbook/components/playbook-page";

export const metadata: Metadata = {
  title: "PlayBook",
  description: "Hướng dẫn chọn bao cao su Herfeel, gel bôi trơn và chăm sóc cá nhân theo cách dễ hiểu, riêng tư.",
};

export default function Page() {
  return <PlaybookPage />;
}
