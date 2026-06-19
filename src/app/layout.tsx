import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { RouteProgressBar } from "@/components/layout/route-progress-bar";
import { siteConfig } from "@/config/site";
import { CartProvider } from "@/features/cart/cart-provider";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CartProvider>
          <Suspense fallback={null}>
            <RouteProgressBar />
          </Suspense>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </CartProvider>
      </body>
    </html>
  );
}
