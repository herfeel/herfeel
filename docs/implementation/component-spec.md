# Component Spec

## Implementation Readiness

This spec is sufficient to start a first Next.js implementation after docs approval if the initial build uses mock PlayAh catalog data from `product-taxonomy.md`.

Shared rules for all components:

- Use typed props derived from product/category/navigation data.
- Keep static sections server-renderable unless the component needs local interaction.
- Preserve fixed dimensions for images, cards, icon buttons, counters, and sticky CTAs.
- Add accessible names for icon-only controls and keyboard support for menu, modal, carousel, quantity, and accordion controls.
- Do not copy Huel nutrition copy into rendered PlayAh UI.

Missing final inputs allowed in v1 mock phase:

- Final product images, exact prices, shipping threshold, review count, policy URLs, and payment provider.
- These must be isolated in mock data/config, not hard-coded inside components.

## TopPromoBar

Purpose: show repeating commercial messages above the header.

Behavior:

- Horizontal marquee/repeating links.
- Pause animation button.
- Links can route to promo, referral, shipping, or savings pages.

Desktop/mobile:

- Desktop: single black strip with repeated offers.
- Mobile: same strip, shorter visible text, still compact.

Props/data:

- `items[]`: label, href, icon.
- `isPaused`.

Acceptance criteria:

- Height remains stable.
- Text does not wrap.
- Pause control is keyboard accessible.

## Header

Purpose: global ecommerce navigation.

Behavior:

- Sticky below promo bar.
- Logo left, nav center, promo chip, utility icons right.
- Opens mega menus on hover/focus.

Desktop/mobile:

- Desktop: full nav visible.
- Mobile: logo, menu button, cart/account; nav moves into MobileMenu.

Props/data:

- `logo`, `navItems`, `promoChip`, `utilityLinks`, `cartCount`.

Acceptance criteria:

- Matches Huel header density.
- Active nav has underline/chevron state.
- No layout shift when cart count changes.

## MegaMenu

Purpose: large desktop dropdown for product discovery.

Behavior:

- Full-width panel attached to header.
- Backdrop dim + blur behind content.
- Nav chevron rotates up when open.
- Left rail tabs switch content without closing menu.

Desktop/mobile:

- Desktop only.
- Mobile equivalent is MobileMenu.

Props/data:

- `mode`: collection, feeling, help.
- `tabs[]`, `tiles[]`, `links[]`, `promoCards[]`.

Acceptance criteria:

- Opens on hover/focus/click as required.
- Closes on pointer leave, Escape, or another nav item.
- `Shop by Feeling` and `Help me choose` states match Huel behavior.

## MobileMenu

Purpose: mobile navigation and shop discovery.

Behavior:

- Slide-in or full-screen menu.
- Collection/need tabs.
- Accordion groups for Science/About/help links.

Desktop/mobile:

- Hidden on desktop.
- Mobile-first, thumb-friendly controls.

Props/data:

- `navItems`, `categories`, `needs`, `helpLinks`, `promoLinks`.

Acceptance criteria:

- Can reach every desktop menu destination.
- Close button and Escape/back behavior work.

## Hero

Purpose: first commerce entry point.

Behavior:

- Headline with one italic serif word/phrase.
- Small support copy.
- Primary CTA.
- Goal/need image cards below.

Desktop/mobile:

- Desktop: heading + CTA row, 4-card grid.
- Mobile: stacked heading, horizontal/stacked cards.

Props/data:

- `headline`, `italicText`, `body`, `cta`, `cards[]`.

Acceptance criteria:

- First viewport is product/need-led, not a generic landing page.
- Cards maintain fixed ratio.

## CategoryShortcuts

Purpose: fast category navigation using Huel-like pill rows.

Behavior:

- Thumbnail + label + plus/arrow icon.
- Navigates to category pages.

Desktop/mobile:

- Desktop: 3 columns x 2 rows.
- Mobile: 1 or 2 columns.

Props/data:

- `categories[]`: label, href, thumbnail.

Acceptance criteria:

- Pill height stable.
- Images are thumbnails, not full-size.

## ShopByFeeling

Purpose: PlayAh replacement for Huel Shop by Goal.

Behavior:

- Visual cards for needs/feelings.
- Circular arrow action.

Desktop/mobile:

- Desktop: 4-card row.
- Mobile: carousel or 2-column grid.

Props/data:

- `needs[]`: label, href, image, textColor.

Acceptance criteria:

- Uses PlayAh-safe imagery.
- Labels stay readable over images.

## BenefitsBand

Purpose: black proof band with 6 compact benefits.

Behavior:

- Green line icons, short titles, one-line explanations.

Desktop/mobile:

- Desktop: 3x2 grid.
- Mobile: 2 columns or stacked.

Props/data:

- `benefits[]`: icon, title, description.

Acceptance criteria:

- Dark contrast passes visual QA.
- Copy is short, non-explicit, practical.

## TrustBentoSection

Purpose: PlayAh replacement for Huel science/bento proof.

Behavior:

- Bento grid mixing product/spec/trust cards.
- CTA to education or standards page.

Desktop/mobile:

- Desktop: asymmetric bento grid.
- Mobile: stacked cards.

Props/data:

- `cards[]`: title, body, image, stats, cta.

Acceptance criteria:

- Nutrition claims are replaced with PlayAh specs/trust.

## ProductCard

Purpose: reusable commerce card.

Behavior:

- Image surface, badge, title, descriptor, spec facts, price, CTA.

Desktop/mobile:

- Fixed image ratio on all viewports.
- Mobile carousel cards show next card peek when horizontal.

Props/data:

- Product fields from `product-taxonomy.md`.

Acceptance criteria:

- Thumbnail used in grid.
- CTA is compact black pill.

## ProductGrid

Purpose: product listing on home/shop/category pages.

Behavior:

- 12 or 24 products per page/load.
- Optional sort/filter controls.

Desktop/mobile:

- Desktop: 4 columns.
- Mobile: 2 columns or horizontal carousel by section.

Props/data:

- `products[]`, `filters`, `sort`, `pagination`.

Acceptance criteria:

- No full-size images in listing.
- Layout does not shift on load.
- Empty, loading, and no-results states exist.
- Filter/sort state can be represented in URL query params.

## FilterSortBar

Purpose: category/shop filtering without overwhelming the first viewport.

Behavior:

- Shows category, need/feeling, price, material/compatibility, and sort controls.
- Desktop can use compact inline controls; mobile uses a filter sheet.

Desktop/mobile:

- Desktop: sticky or near-title compact row.
- Mobile: button opens sheet; active filters show as removable chips.

Props/data:

- `filters`, `activeFilters`, `sortOptions`, `resultCount`.

Acceptance criteria:

- URL/query state updates predictably.
- Controls do not cause product grid layout shift.
- Mobile sheet traps focus and closes with Escape/back.

## ProductGallery

Purpose: PDP media gallery.

Behavior:

- Large warm-surface image frame.
- Previous/next arrows and pagination dots.
- Optional in-frame promo banner.

Desktop/mobile:

- Desktop: left PDP column.
- Mobile: top carousel.

Props/data:

- `images[]`, `alt`, `badges`, `promoBanner`.

Acceptance criteria:

- Medium/large images only on PDP.
- Width/height/sizes defined.

## ProductPurchasePanel

Purpose: sticky PDP buying surface.

Behavior:

- Rating, title, price chips, copy, variant rows, purchase option, CTA, trust links.
- Variant row plus changes empty CTA to active CTA.

Desktop/mobile:

- Desktop: sticky right column.
- Mobile: normal flow plus optional sticky bottom CTA.

Props/data:

- Product, variants, purchase options, shipping threshold, trust links.

Acceptance criteria:

- Empty state CTA says choose variants.
- Selected state shows `- quantity +` and active CTA.

## ProductAccordion

Purpose: PDP expandable info rows.

Behavior:

- Toggle inline content.
- Thin divider rows.

Desktop/mobile:

- Same behavior across viewports.

Props/data:

- `items[]`: title, content, defaultOpen.

Acceptance criteria:

- Keyboard accessible.
- Open state does not overlap CTA.

## CartModal

Purpose: immediate add-to-cart confirmation and upsell.

Behavior:

- Centered modal with dim/blur backdrop.
- Threshold progress, upsell sections, carousel, sticky `Go to cart` CTA.

Desktop/mobile:

- Desktop: centered max-width modal.
- Mobile: near full-screen modal or bottom sheet.

Props/data:

- Cart summary, threshold, upsell groups.

Acceptance criteria:

- Does not trigger checkout.
- Close and Escape work.

## CartDrawer

Purpose: cart management surface.

Behavior:

- Item list, quantity controls, discounts, shipping, total, checkout CTA.

Desktop/mobile:

- Desktop: side drawer or cart page.
- Mobile: full-screen drawer/page.

Props/data:

- `items`, `discounts`, `shipping`, `totals`.

Acceptance criteria:

- Quantity updates are stable.
- Public cart/checkout/account/order are not cached.

## CartPage

Purpose: full cart route fallback and checkout entry.

Behavior:

- Shows cart items, quantity controls, shipping progress, upsells, discounts, subtotal, total, checkout CTA.

Desktop/mobile:

- Desktop: item list left, totals/CTA right.
- Mobile: stacked list with sticky checkout CTA.

Props/data:

- `items`, `upsells`, `discounts`, `shipping`, `totals`.

Acceptance criteria:

- Empty cart state routes back to shop.
- Quantity and remove actions preserve layout stability.
- Checkout CTA only routes to mock checkout in v1.

## CheckoutSummary

Purpose: mock checkout review.

Behavior:

- Summary, totals, mock shipping/payment placeholders.

Desktop/mobile:

- Desktop: form + sticky summary.
- Mobile: stacked summary.

Props/data:

- Cart totals, customer info mock, shipping options mock.

Acceptance criteria:

- Mock only until real checkout requirements are provided.

## CheckoutMockForm

Purpose: non-payment checkout form shell for flow validation.

Behavior:

- Contact, shipping, delivery method, and payment placeholder sections.
- Place-order CTA creates a mock order snapshot only.

Desktop/mobile:

- Desktop: form left, sticky summary right.
- Mobile: stacked with collapsible summary.

Props/data:

- Cart snapshot, mock shipping methods, validation messages.

Acceptance criteria:

- Does not collect real payment data.
- Required-field validation is visible and accessible.
- Successful mock submit routes to order success.

## OrderSuccess

Purpose: final mock order confirmation page.

Behavior:

- Confirmation message, mock order number, summary, continue shopping CTA, recommended products.

Desktop/mobile:

- Desktop: concise confirmation layout with recommendation grid.
- Mobile: stacked, no dense form UI.

Props/data:

- Mock order id, cart snapshot, recommended products.

Acceptance criteria:

- No payment or fulfillment promise is implied.
- User can return to home/shop.

## NewsletterBlock

Purpose: email capture/offer block.

Behavior:

- Dark footer band, headline, short copy, input, signup button.

Desktop/mobile:

- Desktop: 2 columns.
- Mobile: stacked.

Props/data:

- `headline`, `body`, `formAction`, `legalCopy`.

Acceptance criteria:

- Legal copy small but readable.
- No blocking popup required unless requested.

## Footer

Purpose: dark information-dense footer.

Behavior:

- Commitment block, link columns, locale/social/payment/legal.

Desktop/mobile:

- Desktop: multi-column.
- Mobile: accordion groups.

Props/data:

- Footer links, policy links, social links, payment icons.

Acceptance criteria:

- Matches Huel footer density.
- PlayAh trust/privacy/discreet shipping stays visible.
