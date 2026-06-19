# PlayAh Vietnamese Copy Report

## Scope

- Task: Home page Vietnamese copy pass for PlayAh.
- Implementation task reference: Task 6, Home Page Skeleton, copy-only follow-up.
- Layout, section order, images, routes, cart, PDP, checkout, and effects were not redesigned.

## Files Changed

- `src/data/mock/home.ts`
- `src/features/home/components/home-page.tsx`
- `src/data/mock/products.ts`
- `src/data/mock/categories.ts`
- `src/data/mock/navigation.ts`
- `src/data/mock/footer.ts`
- `src/components/layout/top-promo-bar.tsx`
- `src/components/layout/site-header.tsx`
- `src/components/layout/site-footer.tsx`
- `src/config/site.ts`

## Sections Localized

- Top promo bar.
- Header nav, utility labels, mega menu tabs, category tiles, feeling tiles, and guide promos.
- Hero headline, subheadline, primary CTA, and hero goal cards.
- Category shortcuts.
- Benefits band.
- Trust bento section.
- Editorial/social proof carousel.
- Trust quote band.
- Promo story cards.
- Bestseller heading, product card labels, price prefix, product CTA, and rendered mock product text.
- Guarantee/free-gift cards.
- Footer groups, footer CTA, legal/disclaimer copy, and metadata description.

## Copy To Review

- Hero headline: `Chọn đúng cảm giác bạn muốn`.
- Hero card labels: `Mỏng da chạm da`, `Dưỡng ẩm căng mọng`, `Kéo dài sướng sung`, `Kích thích mới mẻ`.
- Category label: `Chăm sóc cá nhân` chosen over `Dung dịch vệ sinh` to reduce layout pressure.
- Reviews/social proof was changed from fake named reviews to editorial/general cards, because there are no verified real reviews yet.
- Footer disclaimer keeps the mock-data caveat and no-unsupported-medical-claim guardrail.

## Layout Impact

- Desktop screenshot: `docs/auto-runs/screenshots/home-vietnamese-copy-desktop.png`.
- Mobile screenshot: `docs/auto-runs/screenshots/home-vietnamese-copy-mobile.png`.
- No section order changes.
- No horizontal overflow observed in screenshot review.
- Vietnamese text wraps in expected places on mobile, especially `Chăm sóc cá nhân`, benefits, and footer headline. No broken cards or abnormal section height observed.
- Footer CTA text initially inherited white text on white background; fixed with explicit dark text.

## Remaining English Text

- `PlayAh` remains as brand text.
- `The PlayBook` remains as a named content series from the requested copy direction.
- Product line names `Air`, `Smooth`, `Long`, and `Starter` remain as mock SKU/product names.
- Technical route/query strings, internal ids, type names, and comments may still contain English but are not Home UI copy.

## Checks

- `npm run lint`: pass.
- `npm run build`: pass, exit code `0` captured in `/tmp/playah-build-rc.txt`.
- `npx playwright screenshot --full-page --viewport-size=1440,1200 http://localhost:3000/ docs/auto-runs/screenshots/home-vietnamese-copy-desktop.png`: pass.
- `npx playwright screenshot --full-page --viewport-size=390,1200 http://localhost:3000/ docs/auto-runs/screenshots/home-vietnamese-copy-mobile.png`: pass.

