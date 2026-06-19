# PlayAh Radix Navigation Menu Report

## Summary

Desktop Header/MegaMenu was migrated from custom hover state + Motion dropdown to Radix NavigationMenu behavior. The closed header, promo strip, active underline, full-width dropdown panel, left rail, and landscape cards were tuned against the Huel reference screenshots captured in this run.

## Radix Migration

- Installed package: `@radix-ui/react-navigation-menu` via npm.
- Changed components/data: `src/components/layout/site-header.tsx`, `src/data/mock/navigation.ts`, `src/app/globals.css`.
- Radix parts used: `NavigationMenu.Root`, `NavigationMenu.List`, `NavigationMenu.Item`, `NavigationMenu.Trigger`, `NavigationMenu.Content`, `NavigationMenu.Link`, `NavigationMenu.Viewport`, `NavigationMenu.Indicator`.
- Radix behavior used: controlled `value`, `delayDuration={160}`, `skipDelayDuration={280}`, `data-state`, `data-motion`, and `--radix-navigation-menu-viewport-width/height` driven viewport transitions.

## Huel vs PlayAh Screenshot Comparison

### Huel screenshots

- `docs/auto-runs/screenshots/huel-header-closed-1440.png`
- `docs/auto-runs/screenshots/huel-megamenu-shopall-1440.png`
- `docs/auto-runs/screenshots/huel-megamenu-goal-1440.png`

### PlayAh screenshots

- `docs/auto-runs/screenshots/playah-header-closed-after-1440.png`
- `docs/auto-runs/screenshots/playah-megamenu-category-after-1440.png`
- `docs/auto-runs/screenshots/playah-megamenu-goal-after-1440.png`
- `docs/auto-runs/screenshots/playah-megamenu-help-after-1440.png`
- `docs/auto-runs/screenshots/playah-mobile-header-after-390.png`
- `docs/auto-runs/screenshots/playah-mobile-menu-after-390.png`

### Side-by-side screenshots if available

- `docs/auto-runs/screenshots/header-compare-closed-1440.png`
- `docs/auto-runs/screenshots/megamenu-compare-open-1440.png`

## Closed Header Comparison

- Before: desktop nav/dropdown was custom state, header active state was less Radix-accessible, and menu content still depended on a manually positioned Motion dropdown.
- After: promo strip remains black and compact; white header row is 56px; logo is larger; nav is reduced to `Mua sắm`, `Chăm sóc cá nhân`, `Vì sao PlayAh?`, `Hướng dẫn`; open trigger has black underline + rotated chevron; right CTA/icons align with Huel-like spacing.
- Remaining differences: PlayAh Vietnamese promo copy is longer than Huel copy, so the top strip still feels slightly denser. Huel also has a centered green utility pill with an icon; PlayAh keeps the requested `Gợi ý chọn nhanh` pill.

## MegaMenu Comparison

- Before: dropdown behavior was ad-hoc hover state and Motion; some menu imagery looked like enlarged marketplace banners.
- After: Radix viewport renders a full-width panel directly under the header row, with a 320px left rail, warm active rail state, `Ưu đãi kín đáo` pill, `Mua tất cả` black pill, 400px panel height, and four landscape cards in the right content area.
- After imagery: menu cards now use clean product silhouettes/placeholders instead of zoomed/cropped marketplace banners, preserving whitespace and Huel-like product-first composition.
- Remaining differences: Huel collection menu shows 8 tiles in a denser 2-row grid; this PlayAh task requested 4 cards per tab, so PlayAh is intentionally lighter. Huel imagery is real packshot photography; PlayAh still needs approved product-only packshots for exact parity.

## Interaction / Accessibility

- Hover: `Mua sắm` opens the Radix menu; left rail hover/focus swaps tab content.
- Keyboard: Tab focus lands on `Mua sắm`; focus opens the Radix menu with `aria-expanded="true"`; Escape closes it and clears expanded state.
- Focus: visible focus outline remains on nav links/triggers through `.site-nav-trigger:focus-visible` and `.site-nav-link:focus-visible`.
- Active state: open trigger underline and chevron rotation use Radix `data-state="open"`; current route support is wired for simple route matching.
- Outside behavior: backdrop click closes the menu; pointer leaving the header/menu wrapper closes desktop menu.

## Remaining Issues

- Exact Huel parity still needs PlayAh-approved product-only packshots, because current local product/category images include marketplace text/badges.
- Huel has 8-card collection layout; PlayAh now uses the requested 4 landscape cards, so density differs by design.
- `npm install` reported 2 moderate vulnerabilities in the existing dependency tree; not addressed because the task scope was navigation migration.
- Existing Home content below the header still includes marketplace-style images; out of scope for this Header/MegaMenu task.
