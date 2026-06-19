"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { commerceConfig } from "@/config/commerce";
import { siteConfig } from "@/config/site";
import { categoryTiles, mainNav, megaTabs, needTiles, type MegaTab, type MenuTile } from "@/data/mock/navigation";
import { accountAuthChangedEvent, notifyAccountAuthChanged } from "@/features/account/auth-client-events";
import { useCart } from "@/features/cart/cart-provider";
import { getCartItemCount } from "@/features/cart/cart-utils";
import { formatPrice } from "@/lib/format-price";
import { durations, easeOutExpo, overlayVariants } from "@/lib/motion";
import { TopPromoBar } from "./top-promo-bar";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { state: cartState } = useCart();
  const [navValue, setNavValue] = useState("");
  const [activeTab, setActiveTab] = useState<MegaTab>(megaTabs[0]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [customer, setCustomer] = useState<HeaderCustomer | null>(null);
  const [accountLoading, setAccountLoading] = useState(true);
  const [mobileTab, setMobileTab] = useState<MegaTab>(megaTabs[0]);
  const megaOpen = navValue === "shop";
  const hasOverlay = megaOpen || mobileOpen || cartOpen || accountOpen;
  const cartItemCount = getCartItemCount(cartState.items);

  useEffect(() => {
    let active = true;

    async function refreshCustomer() {
      setAccountLoading(true);
      const response = await fetch("/api/account/me", { cache: "no-store" }).catch(() => null);
      const data = response ? ((await response.json().catch(() => ({}))) as { ok?: boolean; user?: HeaderCustomer }) : undefined;
      if (!active) return;
      setCustomer(response?.ok && data?.ok && data.user ? data.user : null);
      setAccountLoading(false);
    }

    void refreshCustomer();
    window.addEventListener(accountAuthChangedEvent, refreshCustomer);
    window.addEventListener("focus", refreshCustomer);

    return () => {
      active = false;
      window.removeEventListener(accountAuthChangedEvent, refreshCustomer);
      window.removeEventListener("focus", refreshCustomer);
    };
  }, []);

  async function handleLogout() {
    await fetch("/api/account/logout", { method: "POST" });
    setCustomer(null);
    setAccountOpen(false);
    setMobileOpen(false);
    notifyAccountAuthChanged();
    router.refresh();
  }

  useEffect(() => {
    if (!hasOverlay) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setNavValue("");
      setMobileOpen(false);
      setCartOpen(false);
      setAccountOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [hasOverlay]);

  useEffect(() => {
    if (!mobileOpen && !cartOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen, cartOpen]);

  const utilityLabel = useMemo(() => (cartOpen ? "Đóng giỏ hàng" : "Giỏ hàng"), [cartOpen]);

  function handleNavValueChange(value: string) {
    setNavValue(value);
    if (value) {
      setCartOpen(false);
      setMobileOpen(false);
      setAccountOpen(false);
    }
  }

  function handleHashNavClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (pathname !== "/" || !href.startsWith("/#")) return;

    const target = document.getElementById(href.slice(2));
    if (!target) return;

    event.preventDefault();
    setNavValue("");
    setMobileOpen(false);
    setCartOpen(false);
    setAccountOpen(false);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    window.history.pushState(null, "", href);
  }

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-white)]">
      <TopPromoBar />
      <div className="relative" onMouseLeave={() => setNavValue("")}>
        {megaOpen ? <button type="button" aria-label="Đóng menu" className="fixed inset-x-0 bottom-0 top-[106px] z-0 hidden cursor-default bg-black/45 backdrop-blur-[3px] lg:block" onClick={() => setNavValue("")} /> : null}
        <div className="relative z-20 border-b border-[#eeeae4] bg-[var(--color-white)]">
          <div className="grid h-[56px] w-full grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 text-[13px] font-medium sm:px-6 lg:grid-cols-[auto_1fr_auto] lg:px-10 2xl:px-10">
            <div className="flex items-center gap-4 lg:gap-6">
              <button
                type="button"
                className="group grid h-10 w-10 place-items-center rounded-full transition-colors duration-200 hover:bg-[var(--color-ink)] hover:text-white lg:hidden"
                aria-label="Mở menu"
                aria-expanded={mobileOpen}
                onClick={() => {
                  setMobileOpen(true);
                  setCartOpen(false);
                  setNavValue("");
                  setAccountOpen(false);
                }}
              >
                <span className="relative block h-3.5 w-5 border-y-2 border-[var(--color-ink)] transition-colors duration-200 group-hover:border-white" />
              </button>
              <Link href="/" className="hidden text-[31px] font-black leading-none tracking-normal lg:inline-flex" aria-label={`${siteConfig.name} trang chủ`}>
                {siteConfig.name}
              </Link>
              <NavigationMenu.Root value={navValue} onValueChange={handleNavValueChange} delayDuration={160} skipDelayDuration={280} className="relative hidden lg:flex">
                <NavigationMenu.List className="flex items-center gap-7 xl:gap-9">
                  {mainNav.map((link) => {
                    const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));

                    if (link.menu) {
                      return (
                        <NavigationMenu.Item key={link.href} value={link.value}>
                          <NavigationMenu.Trigger
                            className="site-nav-trigger group"
                            data-active={active || megaOpen ? "true" : undefined}
                            onFocus={() => setNavValue(link.value)}
                            onKeyDown={(event) => {
                              if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") setNavValue(link.value);
                            }}
                          >
                            {link.label}
                            <NavChevron />
                          </NavigationMenu.Trigger>
                          <NavigationMenu.Content className="site-nav-content">
                            <MegaPanel activeTab={activeTab} setActiveTab={setActiveTab} />
                          </NavigationMenu.Content>
                        </NavigationMenu.Item>
                      );
                    }

                    return (
                      <NavigationMenu.Item key={link.href}>
                        <NavigationMenu.Link asChild active={active}>
                          <Link href={link.href} className="site-nav-link" data-active={active ? "true" : undefined} onClick={(event) => handleHashNavClick(event, link.href)}>
                            {link.label}
                          </Link>
                        </NavigationMenu.Link>
                      </NavigationMenu.Item>
                    );
                  })}
                </NavigationMenu.List>
                <NavigationMenu.Indicator className="site-nav-indicator">
                  <span />
                </NavigationMenu.Indicator>
                <div className="fixed left-0 top-[106px] z-10 flex w-screen justify-center overflow-hidden">
                  <NavigationMenu.Viewport className="site-nav-viewport" />
                </div>
              </NavigationMenu.Root>
            </div>

            <div className="justify-self-center">
              <Link href="/" className="text-[27px] font-black leading-none tracking-normal lg:hidden" aria-label={`${siteConfig.name} trang chủ`}>
                {siteConfig.name}
              </Link>
            </div>

            <nav aria-label="Tiện ích" className="flex h-[56px] justify-end gap-1 lg:gap-2">
              <Link href="/account" className="site-utility-icon" aria-label="Trợ giúp">
                <HelpIcon />
              </Link>
              <div className="relative hidden sm:block">
                <button
                  type="button"
                  className="site-utility-icon border-0 bg-transparent"
                  aria-label="Tài khoản"
                  aria-expanded={accountOpen}
                  aria-haspopup="menu"
                  onClick={() => {
                    setAccountOpen((open) => !open);
                    setCartOpen(false);
                    setMobileOpen(false);
                    setNavValue("");
                  }}
                >
                  <AccountIcon />
                </button>
                <AccountPopover open={accountOpen} customer={customer} loading={accountLoading} onClose={() => setAccountOpen(false)} onLogout={handleLogout} />
              </div>
              <button
                type="button"
                className="site-utility-icon relative border-0 bg-transparent"
                aria-label={utilityLabel}
                aria-expanded={cartOpen}
                onClick={() => {
                  setCartOpen(true);
                  setMobileOpen(false);
                  setNavValue("");
                  setAccountOpen(false);
                }}
              >
                <BagIcon />
                {cartItemCount > 0 ? <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[var(--color-green)] px-1 text-[10px] font-bold leading-none text-[var(--color-ink)]">{cartItemCount}</span> : null}
              </button>
            </nav>
          </div>
        </div>
      </div>

      <MobileMenu open={mobileOpen} customer={customer} loading={accountLoading} onLogout={handleLogout} onClose={() => setMobileOpen(false)} activeTab={mobileTab} setActiveTab={setMobileTab} onHashNavClick={handleHashNavClick} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}

type HeaderCustomer = {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
};

function customerDisplayName(customer: HeaderCustomer) {
  return [customer.firstName, customer.lastName].filter(Boolean).join(" ") || customer.email;
}

function NavChevron() {
  return (
    <svg aria-hidden="true" className="site-nav-chevron ml-1 h-2.5 w-2.5 translate-y-px text-[var(--color-ink)]" viewBox="0 0 10 10" fill="none">
      <path d="M2 3.75L5 6.75L8 3.75" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg aria-hidden="true" className="h-[21px] w-[21px]" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9.6 9.5a2.55 2.55 0 0 1 4.9.95c0 1.85-2.5 2.05-2.5 3.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M12 17.2h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg aria-hidden="true" className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none">
      <path d="M12 12.2a4.4 4.4 0 1 0 0-8.8 4.4 4.4 0 0 0 0 8.8Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4.5 21a7.5 7.5 0 0 1 15 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg aria-hidden="true" className="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none">
      <path d="M6.5 8.5h11l-.8 11H7.3l-.8-11Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MegaPanel({ activeTab, setActiveTab }: { activeTab: MegaTab; setActiveTab: (tab: MegaTab) => void }) {
  return (
    <div className="grid h-[340px] w-screen grid-cols-[272px_1fr] overflow-hidden rounded-b-[8px] border-b border-black/10 bg-white text-[var(--color-ink)] shadow-[var(--shadow-menu)] xl:grid-cols-[292px_1fr]">
      <aside className="grid h-[340px] grid-rows-[1fr_auto] bg-[var(--color-surface)]">
        <div className="pt-7">
          {megaTabs.map((item) => (
            <button
              key={item}
              type="button"
              onMouseEnter={() => setActiveTab(item)}
              onFocus={() => setActiveTab(item)}
              onClick={() => setActiveTab(item)}
              className={item === activeTab ? "flex h-[54px] w-full items-center bg-white px-8 text-left text-sm font-semibold text-[var(--color-ink)]" : "flex h-[54px] w-full items-center px-8 text-left text-sm font-semibold text-[var(--color-ink)] transition-[background-color,padding] duration-200 hover:bg-white/70 hover:pl-9 focus-visible:bg-white/70"}
            >
              {item}
            </button>
          ))}
          <Link href="/collections/combo" className="mx-8 mt-6 inline-flex min-h-9 items-center rounded-[var(--radius-pill)] border border-[var(--color-green)] bg-[var(--color-green-soft)] px-4 text-xs font-semibold text-[var(--color-ink)] transition-transform duration-200 hover:-translate-y-0.5">
            Ưu đãi kín đáo
          </Link>
        </div>
        <div className="border-t border-[var(--color-border)] p-7">
          <Link href="/shop" className="inline-flex min-h-10 items-center rounded-[var(--radius-pill)] bg-[var(--color-ink)] px-5 text-xs font-semibold !text-white transition-transform duration-200 hover:-translate-y-0.5">
            Mua tất cả
          </Link>
        </div>
      </aside>
      <div className="px-7 pb-7 pt-8 xl:px-9">
        <MegaContent tab={activeTab} />
      </div>
    </div>
  );
}

function MegaContent({ tab }: { tab: MegaTab }) {
  const tiles = tab === "Mua theo nhu cầu" ? needTiles : categoryTiles;
  return (
    <div className="grid grid-cols-4 gap-5 xl:gap-6">
      {tiles.map((tile) => (
        <MenuTile key={tile.title} tile={tile} variant={tab === "Mua theo nhu cầu" ? "goal" : "category"} />
      ))}
    </div>
  );
}

function MenuTile({ tile, variant }: { tile: MenuTile; variant: "category" | "goal" | "editorial" }) {
  const dark = tile.tone === "charcoal" || tile.tone === "amber" || tile.tone === "rose" || tile.tone === "blue";
  const titleColor = tile.tone === "charcoal" ? "text-white" : "text-[var(--color-ink)]";
  const surface = getTileSurface(tile.tone);

  return (
    <NavigationMenu.Link asChild>
      <Link href={tile.href} className={`group relative h-[246px] overflow-hidden rounded-[8px] p-5 font-semibold transition-[background,box-shadow] duration-200 hover:shadow-[0_12px_28px_rgb(0_0_0/0.10)] xl:h-[252px] ${dark ? "text-white" : "text-[var(--color-ink)]"}`} style={{ background: surface }}>
        {variant !== "category" ? <span className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgb(255_255_255/0.32),transparent_28%),linear-gradient(180deg,rgb(0_0_0/0.02),rgb(0_0_0/0.20))]" /> : null}

        <span className={`relative z-10 block max-w-[190px] text-[19px] leading-tight xl:text-[20px] ${titleColor}`}>{tile.title}</span>
        {tile.body ? <span className={`relative z-10 mt-2 block max-w-[150px] text-[12px] leading-5 ${dark ? "text-white/78" : "text-[var(--color-muted)]"}`}>{tile.body}</span> : null}
        <span className="pointer-events-none absolute inset-x-8 bottom-5 top-[68px] z-0 flex items-end justify-center">
          {tile.image ? (
            <Image
              src={tile.image}
              alt={tile.title}
              fill
              sizes="(min-width: 1280px) 18vw, 22vw"
              className="object-contain object-bottom transition-transform duration-300 ease-out group-hover:scale-[1.04]"
            />
          ) : tile.visual ? (
            <MenuPackshot visual={tile.visual} tone={tile.tone} variant={variant} />
          ) : null}
        </span>
        <span className="absolute bottom-6 left-5 z-10 grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-white text-[var(--color-ink)] shadow-[0_4px_14px_rgb(0_0_0/0.08)]">
          <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
        </span>
      </Link>
    </NavigationMenu.Link>
  );
}

function MenuPackshot({ visual, tone, variant }: { visual: NonNullable<MenuTile["visual"]>; tone: MenuTile["tone"]; variant: "category" | "goal" | "editorial" }) {
  const isDark = tone === "charcoal" || tone === "amber" || tone === "rose" || tone === "blue";
  const accent = tone === "amber" || tone === "rose" ? "bg-[var(--color-warning-soft)]" : tone === "blue" ? "bg-[#dff3f8]" : "bg-[var(--color-green-soft)]";
  const shadow = variant === "category" ? "shadow-[0_18px_32px_rgb(0_0_0/0.10)]" : "shadow-[0_22px_38px_rgb(0_0_0/0.20)]";
  const label = isDark ? "bg-white/92" : "bg-white";

  if (visual === "tube") {
    return (
      <span aria-hidden="true" className="relative block h-full w-full">
        <span className={`absolute bottom-2 left-[86px] h-[146px] w-[62px] -rotate-6 rounded-b-[26px] rounded-t-[12px] border border-black/10 ${label} ${shadow}`} />
        <span className="absolute bottom-[130px] left-[100px] h-8 w-9 -rotate-6 rounded-t-[8px] bg-[var(--color-ink)]" />
        <span className={`absolute bottom-[58px] left-[96px] h-9 w-[50px] -rotate-6 rounded-[6px] ${accent}`} />
      </span>
    );
  }

  if (visual === "bottle") {
    return (
      <span aria-hidden="true" className="relative block h-full w-full">
        <span className={`absolute bottom-2 left-[92px] h-[150px] w-[58px] rounded-b-[18px] rounded-t-[28px] border border-black/10 ${label} ${shadow}`} />
        <span className="absolute bottom-[140px] left-[89px] h-7 w-[32px] rounded-t-[8px] bg-[var(--color-ink)]" />
        <span className={`absolute bottom-[66px] left-[100px] h-10 w-10 rounded-full ${accent}`} />
      </span>
    );
  }

  if (visual === "combo") {
    return (
      <span aria-hidden="true" className="relative block h-full w-full">
        <span className={`absolute bottom-3 left-12 h-[112px] w-[88px] rounded-[10px] border border-black/10 ${label} ${shadow}`} />
        <span className={`absolute bottom-[78px] left-[66px] h-7 w-14 rounded-full ${accent}`} />
        <span className={`absolute bottom-3 left-[124px] h-[138px] w-[64px] rounded-b-[22px] rounded-t-[28px] border border-black/10 ${label} ${shadow}`} />
        <span className="absolute bottom-[62px] left-[136px] h-9 w-11 rounded-[6px] bg-[var(--color-ink)]" />
      </span>
    );
  }

  return (
    <span aria-hidden="true" className="relative block h-full w-full">
      <span className={`absolute bottom-4 left-[72px] h-[122px] w-[114px] rounded-[10px] border border-black/10 ${label} ${shadow}`} />
      <span className="absolute bottom-[106px] left-[74px] h-7 w-[82px] rounded-full bg-[var(--color-ink)]" />
      <span className={`absolute bottom-[62px] left-[90px] h-9 w-[78px] rounded-[6px] ${accent}`} />
    </span>
  );
}

function getTileSurface(tone: MenuTile["tone"]) {
  if (tone === "charcoal") return "linear-gradient(135deg, #050505 0%, #171717 48%, #3a332c 100%)";
  if (tone === "amber") return "linear-gradient(135deg, #7c3417 0%, #b95c24 52%, #d8a15c 100%)";
  if (tone === "blue") return "linear-gradient(135deg, #eaf5f8 0%, #a9ced8 48%, #315767 100%)";
  if (tone === "rose") return "linear-gradient(135deg, #5d1f21 0%, #a64035 52%, #e19a6f 100%)";
  if (tone === "mint") return "linear-gradient(135deg, #f7f4ec 0%, #dcefd3 54%, #bedbb5 100%)";
  return "linear-gradient(135deg, #f7f4ee 0%, #eee7dc 100%)";
}

function AccountPopover({ open, customer, loading, onClose, onLogout }: { open: boolean; customer: HeaderCustomer | null; loading: boolean; onClose: () => void; onLogout: () => void }) {
  const loggedIn = Boolean(customer);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button className="fixed inset-0 z-30 cursor-default bg-transparent" aria-label="Đóng tài khoản" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }} onClick={onClose} />
          <motion.div
            role="menu"
            aria-label="Tài khoản"
            className="absolute right-0 top-[52px] z-40 w-[292px] overflow-hidden rounded-b-[8px] border border-black/10 bg-white text-[var(--color-ink)] shadow-[var(--shadow-menu)]"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: easeOutExpo }}
          >
            <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">Tài khoản</p>
              <p className="mt-1 text-[18px] font-semibold leading-tight">{loading ? "Đang kiểm tra phiên" : customer ? customerDisplayName(customer) : "Bạn chưa đăng nhập"}</p>
              {customer ? <p className="mt-1 truncate text-xs font-medium text-[var(--color-muted)]">{customer.email}</p> : null}
            </div>
            {loggedIn ? (
              <div className="grid gap-3 p-4">
                <Link href="/account" role="menuitem" className="flex h-11 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-ink)] text-sm font-semibold !text-white" onClick={onClose}>Xem tài khoản</Link>
                <button type="button" role="menuitem" className="flex h-11 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-border)] text-sm font-semibold" onClick={onLogout}>Đăng xuất</button>
              </div>
            ) : (
              <div className="grid gap-3 p-4">
                <Link href="/login" role="menuitem" className="flex h-11 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-ink)] text-sm font-semibold !text-white" onClick={onClose}>Đăng nhập</Link>
                <Link href="/register" role="menuitem" className="flex h-11 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-border)] text-sm font-semibold" onClick={onClose}>Đăng ký</Link>
              </div>
            )}
            <div className="grid border-t border-[var(--color-border)] p-2 text-sm font-semibold">
              <Link href="/account" role="menuitem" className="rounded-[var(--radius-sm)] px-3 py-3 hover:bg-[var(--color-surface)]" onClick={onClose}>Theo dõi đơn</Link>
              <Link href="/account" role="menuitem" className="rounded-[var(--radius-sm)] px-3 py-3 hover:bg-[var(--color-surface)]" onClick={onClose}>Hỗ trợ riêng tư</Link>
              {loggedIn ? <Link href="/checkout" role="menuitem" className="rounded-[var(--radius-sm)] px-3 py-3 hover:bg-[var(--color-surface)]" onClick={onClose}>Tiếp tục thanh toán</Link> : null}
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function MobileMenu({ open, customer, loading, onLogout, onClose, activeTab, setActiveTab, onHashNavClick }: { open: boolean; customer: HeaderCustomer | null; loading: boolean; onLogout: () => void; onClose: () => void; activeTab: MegaTab; setActiveTab: (tab: MegaTab) => void; onHashNavClick: (event: MouseEvent<HTMLAnchorElement>, href: string) => void }) {
  const tiles = activeTab === "Mua theo nhu cầu" ? needTiles : categoryTiles;
  const loggedIn = Boolean(customer);
  const linkCards = [
    { title: "Tư vấn chọn nhanh", body: "Gợi ý kín đáo theo nhu cầu", href: "/collections/mong-nhe", accent: true },
    { title: "Vì sao Herfeel?", href: "/#why-herfeel" },
    { title: "Hướng dẫn", href: "/collections/mong-nhe" },
    { title: "Giao hàng kín đáo", href: "/checkout" },
    { title: "Tài khoản & đơn hàng", href: "/account" },
  ];

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] lg:hidden" aria-label="Đóng menu" initial="closed" animate="open" exit="closed" variants={overlayVariants} transition={{ duration: durations.overlay, ease: easeOutExpo }} onClick={onClose} />
          <motion.aside className="fixed inset-0 z-50 flex h-dvh w-screen flex-col bg-white shadow-[var(--shadow-modal)] lg:hidden" initial={{ x: "-100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "-100%", opacity: 0 }} transition={{ duration: durations.drawer, ease: easeOutExpo }} aria-label="Menu di động">
            <div className="flex h-[68px] shrink-0 items-center justify-between border-b border-[#eeeae4] px-5">
              <Link href="/" className="flex items-center gap-2 text-[16px] font-bold leading-none" onClick={onClose} aria-label={`${siteConfig.name} trang chủ`}>
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--color-surface)] text-[10px] font-black">VN</span>
                <span>{siteConfig.name}</span>
                <span aria-hidden="true" className="text-[14px] leading-none">⌄</span>
              </Link>
              <button type="button" className="grid h-10 w-10 place-items-center text-[34px] font-light leading-none text-[var(--color-ink)]" aria-label="Đóng menu" onClick={onClose}>×</button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="px-5 pb-6 pt-7">
                <div className="grid grid-cols-2 gap-3 rounded-[var(--radius-pill)]" role="tablist" aria-label="Mua sắm theo">
                  {megaTabs.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      role="tab"
                      aria-selected={activeTab === tab}
                      className={activeTab === tab ? "h-10 rounded-[var(--radius-pill)] bg-[var(--color-ink)] px-3 text-[14px] font-bold text-white" : "h-10 rounded-[var(--radius-pill)] bg-[#e9e9e9] px-3 text-[14px] font-bold text-[var(--color-ink)]"}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab === "Mua theo nhu cầu" ? "Nhu cầu" : "Danh mục"}
                    </button>
                  ))}
                </div>
                <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18, ease: easeOutExpo }} className="mt-6 grid grid-cols-2 gap-3">
                  {tiles.map((tile) => (
                    <MobileMenuTile key={tile.title} tile={tile} onClose={onClose} />
                  ))}
                </motion.div>
                <div className="mt-6 grid gap-3">
                  <Link href="/collections/combo" className="flex h-[46px] items-center justify-center rounded-[var(--radius-pill)] border border-[#34824b] bg-[var(--color-green-soft)] text-[18px] font-bold" onClick={onClose}>Combo tiết kiệm</Link>
                  <Link href="/shop" className="flex h-[46px] items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-ink)] text-[18px] font-bold !text-white" onClick={onClose}>Mua tất cả</Link>
                </div>
              </div>
              <div className="bg-[var(--color-surface)] px-5 py-7">
                <div className="mb-5 rounded-[var(--radius-md)] bg-white p-4">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">Tài khoản</p>
                  <p className="mt-1 truncate text-[17px] font-bold leading-tight text-[var(--color-ink)]">{loading ? "Đang kiểm tra phiên" : customer ? customerDisplayName(customer) : "Bạn chưa đăng nhập"}</p>
                  {customer ? <p className="mt-1 truncate text-xs font-medium text-[var(--color-muted)]">{customer.email}</p> : null}
                  {loggedIn ? (
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <Link href="/account" className="flex h-11 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-ink)] text-sm font-bold !text-white" onClick={onClose}>Tài khoản</Link>
                      <button type="button" className="flex h-11 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-border)] text-sm font-bold" onClick={onLogout}>Đăng xuất</button>
                    </div>
                  ) : (
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <Link href="/login" className="flex h-11 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-ink)] text-sm font-bold !text-white" onClick={onClose}>Đăng nhập</Link>
                      <Link href="/register" className="flex h-11 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-border)] text-sm font-bold" onClick={onClose}>Đăng ký</Link>
                    </div>
                  )}
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-semibold text-[var(--color-muted)]">
                    <Link href="/account" className="rounded-[var(--radius-sm)] bg-[var(--color-surface)] px-3 py-2" onClick={onClose}>Theo dõi đơn</Link>
                    <Link href={loggedIn ? "/checkout" : "/account"} className="rounded-[var(--radius-sm)] bg-[var(--color-surface)] px-3 py-2" onClick={onClose}>{loggedIn ? "Tiếp tục thanh toán" : "Hỗ trợ riêng tư"}</Link>
                  </div>
                </div>
                <div className="grid gap-3">
                  {linkCards.map((link) => (
                    <Link
                      key={link.title}
                      href={link.href}
                      className={link.accent ? "grid min-h-[68px] grid-cols-[1fr_auto] items-center gap-3 rounded-[22px] bg-[#e2f9df] px-6 py-3" : "grid min-h-[68px] grid-cols-[1fr_auto] items-center gap-3 rounded-[12px] bg-white px-7 py-3"}
                      onClick={(event) => {
                        onHashNavClick(event, link.href);
                        if (!event.defaultPrevented) onClose();
                      }}
                    >
                      <span className="min-w-0">
                        <span className="block text-[17px] font-bold leading-tight">{link.title}</span>
                        {link.body ? <span className="mt-1 block text-[14px] leading-tight text-[var(--color-muted)]">{link.body}</span> : null}
                      </span>
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-[21px] leading-none">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function MobileMenuTile({ tile, onClose }: { tile: MenuTile; onClose: () => void }) {
  return (
    <Link href={tile.href} className="group relative aspect-[1/1] min-h-[139px] overflow-hidden rounded-[8px] bg-[var(--color-surface)] p-4 text-[var(--color-ink)]" onClick={onClose}>
      <span className="relative z-10 block text-[15px] font-bold leading-tight">{tile.title}</span>
      <span className="pointer-events-none absolute inset-x-4 bottom-5 top-12">
        <Image src={tile.image} alt="" fill sizes="50vw" className="object-contain object-bottom transition-transform duration-300 ease-out group-hover:scale-[1.04]" />
      </span>
      <span className="absolute bottom-4 left-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-[22px] leading-none shadow-[0_4px_14px_rgb(0_0_0/0.08)]">→</span>
    </Link>
  );
}

function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { state, dispatch } = useCart();
  const itemCount = getCartItemCount(state.items);
  const subtotal = state.totals.subtotal.value;
  const remainingForShipping = Math.max(commerceConfig.freeShippingThreshold - subtotal, 0);
  const shippingProgress = Math.min((subtotal / commerceConfig.freeShippingThreshold) * 100, 100);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px]" aria-label="Đóng giỏ hàng" initial="closed" animate="open" exit="closed" variants={overlayVariants} transition={{ duration: durations.overlay, ease: easeOutExpo }} onClick={onClose} />
          <motion.aside className="fixed right-0 top-0 z-50 flex h-dvh w-[min(440px,94vw)] flex-col bg-white shadow-[var(--shadow-modal)]" initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "100%", opacity: 0 }} transition={{ duration: durations.drawer, ease: easeOutExpo }} aria-label="Giỏ hàng">
            <div className="flex h-16 items-center justify-between border-b border-[var(--color-border)] px-5">
              <p className="text-[18px] font-semibold">Giỏ hàng{itemCount ? ` (${itemCount})` : ""}</p>
              <button type="button" className="grid h-10 w-10 place-items-center rounded-full bg-[var(--color-ink)] text-white" aria-label="Đóng giỏ hàng" onClick={onClose}>×</button>
            </div>
            {state.items.length ? (
              <div className="flex min-h-0 flex-1 flex-col">
                <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4">
                  <div className="flex items-center justify-between gap-4 text-sm font-semibold">
                    <span>{remainingForShipping > 0 ? `Còn ${formatPrice(remainingForShipping, commerceConfig.currency)} để miễn phí giao hàng` : "Đã đủ điều kiện miễn phí giao hàng"}</span>
                    <span>{Math.round(shippingProgress)}%</span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                    <div className="h-full rounded-full bg-[var(--color-green)]" style={{ width: `${shippingProgress}%` }} />
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <div className="grid gap-4">
                    {state.items.map((item) => (
                      <article key={item.key} className="grid grid-cols-[86px_1fr] gap-3 border-b border-[var(--color-border)] pb-4 last:border-b-0">
                        <div className="relative aspect-square overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-surface)]">
                          {item.image ? <Image src={item.image.src} alt={item.image.alt} fill sizes="86px" className="object-contain p-2" /> : null}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h2 className="text-sm font-semibold leading-snug">{item.name}</h2>
                              {item.variantLabel ? <p className="mt-1 text-xs text-[var(--color-muted)]">{item.variantLabel}</p> : null}
                            </div>
                            <button type="button" className="text-xs font-semibold text-[var(--color-muted)] underline-offset-4 hover:text-[var(--color-ink)] hover:underline" onClick={() => dispatch({ type: "cart/remove-item", payload: { key: item.key } })}>Xóa</button>
                          </div>
                          {item.attributes?.length ? <p className="mt-2 line-clamp-2 text-[11px] leading-snug text-[var(--color-muted)]">{item.attributes.map((attr) => `${attr.name}: ${attr.value}`).join(" · ")}</p> : null}
                          <div className="mt-3 flex items-center justify-between gap-3">
                            <div className="flex h-9 w-[104px] items-center justify-between rounded-[var(--radius-pill)] border border-[var(--color-border)] px-1.5 text-sm font-semibold">
                              <button type="button" className="grid h-7 w-7 place-items-center rounded-full hover:bg-[var(--color-surface)]" aria-label="Giảm số lượng" onClick={() => dispatch({ type: "cart/update-quantity", payload: { key: item.key, quantity: item.quantity - 1 } })}>-</button>
                              <span>{item.quantity}</span>
                              <button type="button" className="grid h-7 w-7 place-items-center rounded-full hover:bg-[var(--color-surface)]" aria-label="Tăng số lượng" onClick={() => dispatch({ type: "cart/update-quantity", payload: { key: item.key, quantity: item.quantity + 1 } })}>+</button>
                            </div>
                            <p className="text-sm font-semibold">{formatPrice(item.unitPrice.value * item.quantity, item.unitPrice.currency)}</p>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
                <div className="border-t border-[var(--color-border)] p-5">
                  <div className="mb-4 flex items-center justify-between text-base font-semibold">
                    <span>Tạm tính</span>
                    <span>{formatPrice(state.totals.subtotal.value, state.totals.subtotal.currency)}</span>
                  </div>
                  <div className="grid gap-3">
                    <Link href="/checkout" className="flex h-12 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-ink)] text-sm font-semibold !text-white" onClick={onClose}>Thanh toán mock</Link>
                    <Link href="/cart" className="flex h-12 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-border)] text-sm font-semibold" onClick={onClose}>Xem trang giỏ hàng</Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-1 flex-col justify-between p-5">
                <div className="rounded-[var(--radius-md)] bg-[var(--color-surface)] p-6 text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white text-[28px]">▢</div>
                  <h2 className="mt-5 text-[24px] font-semibold leading-tight">Giỏ hàng đang trống</h2>
                  <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">Khám phá sản phẩm bán chạy hoặc dùng gợi ý chọn nhanh để bắt đầu kín đáo.</p>
                </div>
                <div className="grid gap-3">
                  <Link href="/shop" className="flex h-12 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-ink)] text-sm font-semibold !text-white" onClick={onClose}>Mua sắm ngay</Link>
                  <Link href="/collections/mong-nhe" className="flex h-12 items-center justify-center rounded-[var(--radius-pill)] border border-[var(--color-border)] text-sm font-semibold" onClick={onClose}>Cần gợi ý chọn nhanh</Link>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
