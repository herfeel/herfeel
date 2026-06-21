"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type MouseEvent } from "react";
import { commerceConfig } from "@/config/commerce";
import { siteConfig } from "@/config/site";
import { mainNav, shopNavigationGroups, shopNavigationTrustNote, type ShopNavigationGroupId, type ShopNavigationItem } from "@/data/mock/navigation";
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
  const [activeGroup, setActiveGroup] = useState<ShopNavigationGroupId>(shopNavigationGroups[0].id);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [customer, setCustomer] = useState<HeaderCustomer | null>(null);
  const [accountLoading, setAccountLoading] = useState(true);
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
                    const href = link.href as string;
                    const active = href.startsWith("/#") ? false : pathname === href || pathname.startsWith(`${href}/`);

                    if ("menu" in link && link.menu) {
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
                            <MegaPanel activeGroup={activeGroup} setActiveGroup={setActiveGroup} />
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

      <MobileMenu open={mobileOpen} customer={customer} loading={accountLoading} onLogout={handleLogout} onClose={() => setMobileOpen(false)} onHashNavClick={handleHashNavClick} />
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

function MegaPanel({ activeGroup, setActiveGroup }: { activeGroup: ShopNavigationGroupId; setActiveGroup: (group: ShopNavigationGroupId) => void }) {
  const currentGroup = shopNavigationGroups.find((group) => group.id === activeGroup) ?? shopNavigationGroups[0];

  return (
    <div className="grid min-h-[472px] w-screen grid-cols-[252px_1fr] overflow-hidden rounded-b-[8px] border-b border-black/10 bg-white text-[var(--color-ink)] shadow-[var(--shadow-menu)] xl:grid-cols-[282px_1fr] 2xl:grid-cols-[352px_1fr]">
      <aside className="grid grid-rows-[1fr_auto] bg-[var(--color-surface)]">
        <div className="px-6 pt-8 xl:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">Mua sắm Herfeel</p>
          <div className="mt-5 grid gap-0" role="tablist" aria-label="Nhóm mua sắm">
            {shopNavigationGroups.map((group) => (
              <button
                key={group.id}
                type="button"
                role="tab"
                aria-selected={group.id === activeGroup}
                onMouseEnter={() => setActiveGroup(group.id)}
                onFocus={() => setActiveGroup(group.id)}
                onClick={() => setActiveGroup(group.id)}
                className={group.id === activeGroup ? "rounded-[8px] bg-white px-4 py-4 text-left shadow-[0_8px_22px_rgb(0_0_0/0.06)]" : "rounded-[8px] px-4 py-4 text-left transition-[background-color,transform] duration-200 hover:translate-x-1 hover:bg-white/75 focus-visible:bg-white"}
              >
                <span className="block text-[15px] font-semibold leading-none">{group.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="border-t border-[var(--color-border)] p-6 xl:p-7">
          <p className="mb-4 text-xs font-semibold text-[var(--color-muted)]">{shopNavigationTrustNote}</p>
          <Link href="/shop" className="inline-flex min-h-10 items-center rounded-[var(--radius-pill)] bg-[var(--color-ink)] px-5 text-xs font-semibold !text-white transition-transform duration-200 hover:-translate-y-0.5">
            Xem tất cả sản phẩm
          </Link>
        </div>
      </aside>
      <div className="px-6 pb-7 pt-8 xl:px-8 2xl:px-10">
        <div className="mb-5 flex min-h-[52px] items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">{currentGroup.label}</p>
            <h2 className="mt-2 text-[24px] font-semibold leading-tight">Chọn đúng nhanh hơn</h2>
          </div>
          <Link href="/playbook" className="text-sm font-semibold underline-offset-4 hover:underline">Cần gợi ý?</Link>
        </div>
        <div className="grid grid-cols-3 gap-4 xl:grid-cols-4 xl:gap-5">
          {currentGroup.items.map((item) => (
            <MegaMenuLink key={item.label} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MegaMenuLink({ item }: { item: ShopNavigationItem }) {
  const dark = item.tone === "charcoal";
  const surface = getNavigationSurface(item.tone);

  return (
    <NavigationMenu.Link asChild>
      <Link href={item.href} className={`group relative grid min-h-[143px] overflow-hidden rounded-[8px] border border-black/5 p-4 transition-[box-shadow,transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-black/10 hover:shadow-[0_12px_28px_rgb(0_0_0/0.10)] xl:min-h-[194px] ${dark ? "text-white" : "text-[var(--color-ink)]"}`} style={{ background: surface }}>
        <span className={`pointer-events-none absolute inset-0 z-[1] ${dark ? "bg-[linear-gradient(90deg,rgb(0_0_0/0.58)_0%,rgb(0_0_0/0.24)_42%,rgb(0_0_0/0)_76%)]" : "bg-[linear-gradient(90deg,rgb(255_255_255/0.82)_0%,rgb(255_255_255/0.48)_38%,rgb(255_255_255/0)_72%)]"}`} />
        <span className="relative z-[2] max-w-[44%] xl:max-w-[42%]">
          <span className="flex flex-wrap items-center gap-2">
            <span className="text-[16px] font-semibold leading-tight xl:text-[18px]">{item.label}</span>
            {item.badge ? <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.04em] ${dark ? "bg-white text-[var(--color-ink)]" : "bg-white/80 text-[var(--color-ink)]"}`}>{item.badge}</span> : null}
          </span>
        </span>
        {item.image ? <Image src={item.image} alt="" fill sizes="(min-width: 1280px) 25vw, 33vw" className={`pointer-events-none z-0 select-none transition-transform duration-300 group-hover:scale-[1.035] ${item.imageClassName ?? "object-contain object-[88%_78%] p-5"}`} /> : null}
        <span className={`absolute bottom-4 left-4 z-[2] inline-grid h-10 w-10 place-items-center rounded-full text-[22px] leading-none transition-transform duration-200 group-hover:translate-x-1 ${dark ? "bg-white text-[var(--color-ink)]" : "bg-white"}`}>→</span>
      </Link>
    </NavigationMenu.Link>
  );
}

function getNavigationSurface(tone: ShopNavigationItem["tone"]) {
  if (tone === "charcoal") return "linear-gradient(135deg, #050505 0%, #171717 58%, #2c2823 100%)";
  if (tone === "amber") return "linear-gradient(135deg, #fff9ed 0%, #f6dcab 100%)";
  if (tone === "blue") return "linear-gradient(135deg, #f5fbff 0%, #d8eef8 100%)";
  if (tone === "rose") return "linear-gradient(135deg, #fff5f0 0%, #f2d2c7 100%)";
  if (tone === "mint") return "linear-gradient(135deg, #f8f5ee 0%, #dcefd3 100%)";
  return "linear-gradient(135deg, #ffffff 0%, #f7f4ee 100%)";
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
            <div className="grid border-t border-[var(--color-border)] p-3 text-sm font-semibold">
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

function MobileMenu({ open, customer, loading, onLogout, onClose, onHashNavClick }: { open: boolean; customer: HeaderCustomer | null; loading: boolean; onLogout: () => void; onClose: () => void; onHashNavClick: (event: MouseEvent<HTMLAnchorElement>, href: string) => void }) {
  const loggedIn = Boolean(customer);
  const [openGroups, setOpenGroups] = useState<ShopNavigationGroupId[]>(shopNavigationGroups.map((group) => group.id));

  function toggleGroup(groupId: ShopNavigationGroupId) {
    setOpenGroups((current) => (current.includes(groupId) ? current.filter((id) => id !== groupId) : [...current, groupId]));
  }

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
                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-muted)]">Mua sắm</p>
                <div className="mt-4 grid gap-3">
                  {shopNavigationGroups.map((group) => {
                    const expanded = openGroups.includes(group.id);
                    return (
                      <section key={group.id} className="overflow-hidden rounded-[12px] border border-[var(--color-border)] bg-white">
                        <button type="button" className="flex min-h-[58px] w-full items-center justify-between gap-4 px-4 text-left" aria-expanded={expanded} onClick={() => toggleGroup(group.id)}>
                          <span>
                            <span className="block text-[16px] font-bold leading-tight">{group.label}</span>
                          </span>
                          <span className={`text-[22px] leading-none transition-transform duration-200 ${expanded ? "rotate-45" : ""}`}>+</span>
                        </button>
                        <AnimatePresence initial={false}>
                          {expanded ? (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.18, ease: easeOutExpo }} className="overflow-hidden">
                              <div className="grid gap-1 border-t border-[var(--color-border)] p-2">
                                {group.items.map((item) => (
                                  <Link key={item.label} href={item.href} className="grid min-h-[58px] grid-cols-[48px_1fr_auto] items-center gap-3 rounded-[8px] px-3 py-2 hover:bg-[var(--color-surface)]" onClick={onClose}>
                                    <span className="relative block aspect-square overflow-hidden rounded-[8px] bg-[var(--color-surface)]">
                                      {item.image ? <Image src={item.image} alt="" fill sizes="48px" className={item.imageClassName ?? "object-contain p-2"} /> : null}
                                    </span>
                                    <span>
                                      <span className="block text-[15px] font-semibold leading-tight">{item.label}</span>
                                    </span>
                                    <span className="text-[18px] leading-none">→</span>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </section>
                    );
                  })}
                </div>
                <div className="mt-5 grid gap-3">
                  <Link href="/shop" className="flex h-[46px] items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-ink)] text-[17px] font-bold !text-white" onClick={onClose}>Xem tất cả sản phẩm</Link>
                  <p className="text-center text-xs font-semibold text-[var(--color-muted)]">{shopNavigationTrustNote}</p>
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
                  {mainNav.slice(1).map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="grid min-h-[64px] grid-cols-[1fr_auto] items-center gap-3 rounded-[12px] bg-white px-5 py-3"
                      onClick={(event) => {
                        onHashNavClick(event, link.href);
                        if (!event.defaultPrevented) onClose();
                      }}
                    >
                      <span className="block text-[17px] font-bold leading-tight">{link.label}</span>
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--color-surface)] text-[18px] leading-none">→</span>
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
