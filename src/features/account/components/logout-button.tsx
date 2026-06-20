"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { notifyAccountAuthChanged } from "@/features/account/auth-client-events";

export function LogoutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleLogout() {
    if (pending) return;
    setPending(true);
    await fetch("/api/account/logout", { method: "POST" });
    notifyAccountAuthChanged();
    router.refresh();
  }

  return (
    <Button type="button" variant="secondary" disabled={pending} onClick={handleLogout} className="min-h-11 px-6 text-sm !text-black">
      {pending ? "Đang đăng xuất..." : "Đăng xuất"}
    </Button>
  );
}
