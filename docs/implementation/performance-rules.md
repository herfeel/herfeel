# Performance Rules

## Image Rules

- Product grid must not use full-size product images.
- Product cards use thumbnail images only.
- PDP gallery can use medium/large images.
- Lazy-load images below the fold.
- Preload the hero image only if it is the LCP image.
- Always set `width`, `height`, and `sizes` for images.
- Use fixed aspect ratios for product cards, hero cards, gallery frames, and promo cards.
- Avoid layout shift when images load.
- Use responsive image formats (`avif`/`webp` when available) and serve only the needed crop/size.
- Do not render hidden carousel slides with large eager images; only the active/nearby slides should load early.
- Product thumbnails should have dedicated thumbnail URLs or transforms, not resized originals in CSS.

## Listing Rules

- Product listing limit: 12 or 24 products per page/load.
- Use pagination or load more instead of rendering all products.
- Filters should update URL/query state without forcing full page reload when possible.
- Keep product card data compact in listing views.
- Test with at least 100 mock products even if a page only renders 12 or 24 at once.
- Debounce expensive filter updates if filtering happens client-side.
- Keep filter metadata separate from full PDP product data.
- Use stable keys and avoid re-mounting the whole grid on sort/filter changes.

## Client Component Rules

Use client-side interactivity only where needed:

- Cart state.
- Mega menu open/close state.
- Mobile menu.
- Filters/sort controls.
- Quantity controls.
- PDP gallery carousel.
- Variant picker.
- Accordions.

Static sections should remain server-renderable where possible.

Avoid making the full page a client component just to support cart/menu state. Keep providers narrow and move client boundaries down to the interactive surfaces.

## Caching Rules

Do not cache public/private dynamic commerce states:

- Cart
- Checkout
- Account
- Order
- Payment-related routes

Safe to cache or statically generate if data is mock/static:

- Home content
- Category metadata
- Product catalog pages
- PDP content without cart/user state
- Docs/static content

## Bundle Rules

- Keep carousel/menu/cart logic scoped.
- Avoid importing cart logic into static marketing sections.
- Avoid global client wrappers around the entire app unless required.
- Use icon libraries carefully; tree-shake icons.
- Avoid shipping all carousel, modal, or animation code to pages that do not use it.
- Keep mock data imports route-scoped; do not bundle PDP-only details into listing cards.
- Prefer CSS transitions for menu/cart surfaces unless richer animation is explicitly required.

## UX Performance Rules

- Header and promo bar must not shift after hydration.
- Mega menu should open within `120ms-180ms` visual transition.
- Cart modal should appear quickly after add-to-cart.
- Quantity clicks should give immediate UI feedback.
- Skeletons should preserve card dimensions.
- Filter sheets, mobile menu, and cart sheet should avoid body scroll jank.
- Sticky header and sticky CTA should not trigger repeated layout recalculation while scrolling.

## QA Performance Checks

- Lighthouse or equivalent pass after implementation.
- Check mobile LCP image.
- Check CLS on product grid and PDP.
- Check product listing memory/perf with 24 products.
- Check shop/category filter interaction with 100 mock products.
- Check cart modal open/close responsiveness.
- Check that listing pages do not download PDP gallery-sized assets.
