# PlayAh Motion Effects Report

## Scope

- Implementation task scope: `4. Header + MegaMenu` and `6. Home Page Skeleton` interaction pass, with narrow `12. Performance Pass` and `13. Visual QA Pass` checks.
- No Shop/PDP/Cart/Checkout work was added.

## Huel Audit

- Method: local Google Chrome via Chrome DevTools Protocol.
- Actions: real hover, click, Escape key, mobile menu click, screenshots, computed style/DOM attribute capture.
- Evidence:
  - `docs/interactions/huel-evidence.json`
  - `docs/interactions/huel-evidence-pass6.json`
  - `docs/interactions/screenshots/`

## Confirmed Interactions

- Desktop Shop nav opens mega menu on hover and toggles `aria-expanded` from `false` to `true`.
- Mega panel opens with active class and `height, opacity, visibility` transition around `0.3s ease-out`.
- Mobile menu button toggles `aria-expanded` from `false` to `true` on click.
- Hero cards use same image URL on hover and zoom the image; action icon shifts horizontally.
- Category pills use same thumbnail URL on hover, with slight pill/thumb/icon scale/shift.
- Footer CTA/link has CSS transition timing around `0.32s`.

## Approximation / Not Confirmed

- Product-card hover image swap was not confirmed. PlayAh only scales the existing thumbnail.
- Review carousel arrow/dot behavior was not confirmed. No carousel library added.
- Bento/promo-story card hover is an approximation based on Huel-like image/card micro-interaction patterns.
- Mobile drawer/accordion animation was not implemented because PlayAh currently has only a basic mobile menu button, not a full MobileMenu structure.

## Motion Setup

- Installed package: `motion`.
- Did not install `framer-motion`.
- Added `src/lib/motion.ts` with shared easing, durations, dropdown variants, and overlay variants.

## Motion Components

- `src/components/layout/site-header.tsx`
  - Uses `AnimatePresence` and `motion` from `motion/react`.
  - Motion is scoped to stateful mega menu overlay and dropdown enter/exit.
  - Escape closes the menu.
  - Overlay click closes the menu.
  - Nav item exposes `aria-expanded`/`aria-haspopup`.

## CSS/Tailwind Components

- `src/components/layout/top-promo-bar.tsx`
  - Existing CSS marquee/pause remains unchanged.
- `src/features/home/components/home-page.tsx`
  - Hero cards: image scale and action arrow translate.
  - Category pills: background change, subtle scale, thumbnail scale, arrow translate.
  - Trust bento: small translate-y hover.
  - Review/promo cards: image scale.
  - Product cards: thumbnail scale only, no fake hover image.
  - Guarantee cards: CTA translate.

## Files Created / Modified

- Created `docs/interactions/huel-home-interaction-audit.md`.
- Created `docs/interactions/huel-evidence.json`.
- Created `docs/interactions/huel-evidence-pass2.json` through `huel-evidence-pass6.json` during audit refinement.
- Created screenshots under `docs/interactions/screenshots/`.
- Created `docs/auto-runs/playah-motion-effects-report.md`.
- Created `src/lib/motion.ts`.
- Modified `package.json` and `package-lock.json` to add `motion`.
- Modified `src/components/layout/site-header.tsx`.
- Modified `src/features/home/components/home-page.tsx`.

## Existing Dirty Files Not Owned By This Task

Pre-flight found these already changed before this task and they were not reverted:

- `next-env.d.ts`
- `src/data/mock/home.ts`
- `src/data/mock/products.ts`
- `src/features/home/components/home-visual.tsx`
- `docs/assets/`
- `public/images/`

This task touched `home-page.tsx` because interaction styling was in scope.

## Validation Status

- `npm run lint`: pass.
- `npm run build`: pass. Build log confirmed static routes generated.
- Hydration/browser check: pass for Header/Home interaction smoke check; no React hydration error observed in captured console events.
- Broken images: pass for loaded Home images; `document.images` returned no complete image with `naturalWidth === 0`.
- Hover layout shift: pass for checked Hero card; link rect stayed `278x278` before/after hover.
- Header interaction: pass; desktop menu opened with one `aria-expanded="true"` item and closed to zero after Escape.
- Console note: local dev reported `/favicon.ico` 404. This appears unrelated to this task.
- Reduced motion: Home hover affordances now use explicit CSS hover classes so visual states remain visible even when device reduced motion is enabled.

## Manual Checks Needed

- Hover desktop Header Shop and Shop by feeling.
- Escape and overlay click close the mega menu.
- Hero/card/pill hover does not shift layout.
- Mobile header still behaves as expected; full mobile menu remains future scope.
- Confirm Home images load from current user-added assets.

## Visible Interaction Fix Pass

### Root Cause

- The previous pass relied heavily on `motion-safe:group-hover:*`; with Reduced Motion enabled, scale/translate states were suppressed and effects looked absent.
- Several hover states were too subtle: static overlay opacity, low-contrast arrow buttons, and small image scale values.
- `src/lib/motion.ts` was used for the header dropdown only; Home card surfaces were CSS/Tailwind, not Motion components.
- The actual rendered Home UI lives in `src/features/home/components/home-page.tsx`; `HomeVisual` only renders the image/motif primitive.
- MegaMenu structure exists for desktop header, but mobile drawer/full MobileMenu structure is still not implemented.

### Implemented Visible Effects

- Hero cards: image wrapper scales to `1.05`, overlay opacity increases, circular arrow translates and flips to dark contrast.
- Category pills: pill background shifts, pill scales slightly, thumbnail scales to `1.09`, arrow translates/rotates and flips contrast, focus-visible retained.
- Product cards: product image scales to `1.06`, image frame background/ring changes, CTA turns green and shifts. No fake hover image added because product data has no `hoverImage`.
- Promo/story cards: visual scales to `1.05`, overlay opacity increases, CTA shifts and flips to dark contrast.
- Bento cards: card lifts slightly/background warms; visual cards scale to `1.035` where a visual exists.
- Header/nav: nav underline/text hover is visible, utility icons invert contrast, promo chip lifts, desktop mega menu keeps Motion fade/slide via `motion/react`.

### Self Check

- Local dev server: yes. Existing Next dev server was already running at `http://localhost:3000`; attempted `npm run dev` fell back to `3001` then exited because Next reported the existing `3000` server for this repo.
- Browser hover test: yes, via Playwright Chromium from npm cache, desktop viewport `1440x1100`, `reducedMotion: 'reduce'`.
- Hover observations: Hero transform changed `none -> matrix(1.05...)`; category thumb `none -> matrix(1.09...)`; product image `none -> matrix(1.06...)`; promo visual `none -> matrix(1.05...)`; header nav screenshot shows desktop mega menu open with blurred/dimmed page.
- Console during final Playwright pass: no hydration, mismatch, nesting, or Motion warning messages captured.
- Screenshot paths:
  - `docs/auto-runs/screenshots/home-hero-hover.png`
  - `docs/auto-runs/screenshots/home-category-hover.png`
  - `docs/auto-runs/screenshots/home-product-hover.png`
  - `docs/auto-runs/screenshots/home-promo-hover.png`
  - `docs/auto-runs/screenshots/home-nav-hover.png`
- Hydration mismatch mitigation: `src/app/layout.tsx` now suppresses body-level extension attr mismatch and runs a short `beforeInteractive` cleanup for known extension attrs `bis_*` and `__processed_*` before hydration.

### Still Not Done

- Full mobile drawer/menu remains a separate task; current mobile button does not have a full MobileMenu structure.
- Product hover image swap remains unavailable because mock product data has no `hoverImage`.
- Shop/PDP/Cart/Checkout interactions were intentionally not touched.
- Browser-extension mutations outside the known `bis_*`/`__processed_*` attrs may still need user-side extension disablement or a broader policy decision.
