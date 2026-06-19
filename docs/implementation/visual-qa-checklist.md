# Visual QA Checklist

## Required Screenshots

- [ ] Desktop and mobile Home.
- [ ] Desktop and mobile Shop all.
- [ ] Desktop and mobile Category page.
- [ ] Desktop and mobile PDP before variant selection.
- [ ] Desktop and mobile PDP after variant selection.
- [ ] Desktop and mobile Cart modal/drawer/page.
- [ ] Desktop and mobile Checkout mock.
- [ ] Desktop and mobile Order success mock.

Use Huel screenshots only as structural reference. Final text, products, claims, and imagery must be PlayAh-safe.

## Global

- [ ] UI structure matches Huel reference before brand deviations.
- [ ] Black/white/off-white foundation is preserved.
- [ ] Green/accent usage is sparse.
- [ ] Typography scale matches Huel density.
- [ ] Serif italic words are used selectively.
- [ ] Cards use stable dimensions and mostly `8px` radius.

## Header And Promo Bar

- [ ] Promo bar is black, compact, repeated horizontally.
- [ ] Pause button exists if marquee animates.
- [ ] Header is sticky and compact.
- [ ] Logo, nav, promo chip, utility icons align like Huel.
- [ ] Header does not shift when cart count changes.

## Mega Menu

- [ ] Opens from desktop nav on hover/focus/click as intended.
- [ ] Backdrop dims and blurs page content.
- [ ] Active nav underline appears.
- [ ] Chevron rotates upward.
- [ ] `Shop by Collection` shows image-led grid.
- [ ] `Shop by Feeling` shows large need image cards.
- [ ] `Help me choose` shows learn links and 2 promo cards.
- [ ] Escape and pointer leave close menu.

## Hero

- [ ] First viewport is commerce/product-led.
- [ ] Heading uses Huel-like scale.
- [ ] CTA is compact black pill.
- [ ] Goal/need cards have image backgrounds and circular arrow buttons.
- [ ] Mobile hero does not crop important product content.

## Category Shortcuts

- [ ] Pill rows have thumbnail, label, icon.
- [ ] Desktop grid matches Huel density.
- [ ] Mobile layout remains tappable.

## Benefits / Trust

- [ ] BenefitsBand is full-width black.
- [ ] Icons are thin and green/accent.
- [ ] TrustBento uses warm cards and asymmetric grid.
- [ ] Huel nutrition-specific claims are replaced with PlayAh trust/spec content.

## Product Cards And Grid

- [ ] Product image area ratio is fixed.
- [ ] Listing uses thumbnails.
- [ ] Badge/title/spec/price/CTA hierarchy matches Huel.
- [ ] Desktop grid is 4 columns.
- [ ] Mobile grid/carousel is stable and readable.
- [ ] Empty, loading, no-results, and filtered states preserve dimensions.

## PDP

- [ ] Breadcrumb appears under header.
- [ ] Desktop has gallery left and sticky purchase panel right.
- [ ] Gallery has arrows, dots, large product image, promo banner.
- [ ] Rating stars and count appear above title.
- [ ] Price chips match Huel style.
- [ ] Variant rows use thumbnail, badge, title, price, plus button.
- [ ] Selected variant becomes `- quantity +`.
- [ ] CTA changes from choose variants to add-to-cart.
- [ ] Accordions expand inline without overlap.
- [ ] Mobile PDP order is gallery then purchase panel.

## Cart Modal / Drawer

- [ ] Add-to-cart opens centered modal or mobile sheet.
- [ ] Backdrop dims/blurs page.
- [ ] Shipping threshold banner appears.
- [ ] Progress bar and milestones are visible.
- [ ] Upsell cards show product image/spec/CTA.
- [ ] Sticky bottom `Go to cart`/checkout CTA exists.
- [ ] Checkout is not triggered during UI QA.

## Checkout / Order Success

- [ ] Checkout clearly reads as mock/non-payment in v1.
- [ ] Summary totals align and remain sticky only where intended.
- [ ] Required-field errors are readable and do not shift the page heavily.
- [ ] Order success has mock order number, summary, continue-shopping CTA, and recommendations.

## Performance Visual Checks

- [ ] No visible layout shift when product images load.
- [ ] No horizontal overflow at mobile widths.
- [ ] Header, promo bar, cart count, and sticky CTAs do not jump after hydration.
- [ ] Listing thumbnails are visibly cropped/sized consistently, not browser-shrunk originals.

## Mobile Menu

- [ ] Mobile menu exposes all desktop destinations.
- [ ] Accordions/tabs are thumb-friendly.
- [ ] Close/back controls are visible.
- [ ] No horizontal overflow.

## Footer

- [ ] Footer is dark, dense, and useful.
- [ ] PlayAh trust/privacy/discreet shipping info is visible.
- [ ] Link groups become accordions on mobile.
- [ ] Payment/social/legal areas are compact.
