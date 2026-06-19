# Implementation Tasks

Do not start these tasks until the code phase begins in a new session.

## 1. Scaffold Project

Goal: create the app foundation.

Dependencies: docs approval.

Acceptance criteria:

- Next.js + TypeScript scaffold exists if approved.
- No UI beyond minimal shell.
- Lint/build scripts configured.

Build/lint requirement: initial build and lint pass.

What not to change: do not rewrite docs content unless required.

## 2. Setup Design Tokens

Goal: implement tokens from `design-tokens.md`.

Dependencies: scaffold.

Acceptance criteria:

- Colors, type, spacing, radius, breakpoints available globally.
- Tokens match Huel reference defaults.

Build/lint requirement: lint pass.

What not to change: do not invent a new palette.

## 3. Layout Shell

Goal: build root layout, containers, page bands.

Dependencies: tokens.

Acceptance criteria:

- Global shell supports promo/header/footer.
- Container/gutters match docs.

Build/lint requirement: build pass.

What not to change: no page-specific product logic yet.

## 4. Header + MegaMenu

Goal: implement Huel-like header and mega menu states.

Dependencies: layout shell.

Acceptance criteria:

- Promo bar, sticky header, mega menu tabs, backdrop blur.
- Mobile menu available.

Build/lint requirement: build/lint pass; visual screenshot check.

What not to change: do not alter Huel menu behavior without approval.

## 5. Mock Data And Types

Goal: create temporary PlayAh catalog, category, navigation, footer, and policy data for UI implementation.

Dependencies: layout shell.

Acceptance criteria:

- Product/category fields follow `product-taxonomy.md`.
- Mock data contains enough products to test listings, filters, PDP variants, upsells, cart, checkout, and success.
- Huel nutrition terms are not present in rendered mock PlayAh data.

Build/lint requirement: typecheck/lint pass.

What not to change: do not treat mock names/prices as final business data.

## 6. Home Page Skeleton

Goal: implement home sections without final product backend.

Dependencies: header/menu, mock data.

Acceptance criteria:

- Hero, shortcuts, benefits, trust bento, promo cards, bestseller area, newsletter, footer.
- Uses mock PlayAh content.

Build/lint requirement: build/lint pass.

What not to change: do not build a marketing-only landing page.

## 7. ProductCard + ProductGrid

Goal: implement reusable listing components.

Dependencies: mock product data.

Acceptance criteria:

- Fixed ratio cards.
- Thumbnail images in grid.
- Specs/price/CTA hierarchy matches Huel.

Build/lint requirement: build/lint pass.

What not to change: do not load full-size images in grid.

## 8. Shop / Category Page

Goal: implement listing pages.

Dependencies: ProductGrid.

Acceptance criteria:

- Shop all and category pages render 12 or 24 products.
- Filters/sort behave predictably.

Build/lint requirement: build/lint pass.

What not to change: no real checkout/account logic.

## 9. Product Detail Page

Goal: implement Huel-like PDP.

Dependencies: ProductGallery, ProductPurchasePanel, mock product data.

Acceptance criteria:

- Gallery left, purchase panel right desktop.
- Variant picker, selected state, purchase option, accordions.
- Mobile order correct.

Build/lint requirement: build/lint pass; desktop/mobile screenshots.

What not to change: do not create medical/unsupported claims.

## 10. Cart Modal / Drawer

Goal: implement add-to-cart modal and cart state.

Dependencies: PDP variant selection.

Acceptance criteria:

- Add-to-cart opens modal.
- Free shipping progress and upsells visible.
- Cart quantity updates.

Build/lint requirement: build/lint pass; no checkout trigger in tests.

What not to change: do not connect real payment.

## 11. Checkout Mock

Goal: implement mock checkout flow.

Dependencies: cart.

Acceptance criteria:

- Mock form, summary, place order mock, success page.
- No real payment data collected.

Build/lint requirement: build/lint pass.

What not to change: no production payment integration.

## 12. Performance Pass

Goal: apply `performance-rules.md`.

Dependencies: core pages implemented.

Acceptance criteria:

- Image sizing/lazy/preload rules applied.
- Listing limit enforced.
- Client components scoped.

Build/lint requirement: build/lint pass; Lighthouse/perf check if available.

What not to change: do not over-optimize by removing required UX.

## 13. Visual QA Pass

Goal: compare implementation against Huel reference and checklist.

Dependencies: performance pass.

Acceptance criteria:

- `visual-qa-checklist.md` completed.
- Desktop/mobile screenshots reviewed.
- Obvious spacing/type/card/PDP/cart mismatches fixed.

Build/lint requirement: final build/lint pass.

What not to change: do not introduce layout deviations without user approval.
