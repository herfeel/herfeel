# Page Flow

## Required Routes

| Route | Purpose | Required For V1 |
| --- | --- | --- |
| `/` | Home commerce entry | Yes |
| `/shop` | Shop all listing | Yes |
| `/category/[slug]` | Category listing | Yes |
| `/product/[slug]` | PDP | Yes |
| `/cart` | Cart page/drawer fallback | Yes |
| `/checkout` | Mock checkout | Yes |
| `/order-success` | Mock confirmation | Yes |

All routes must use PlayAh content/data. Huel remains a structure and behavior reference only.

## Home

Section order:

1. TopPromoBar
2. Header
3. Hero
4. CategoryShortcuts
5. ShopByFeeling
6. BenefitsBand
7. TrustBentoSection
8. Recommended/social proof section
9. Press/trust quote band or PlayAh trust band
10. Promo story cards
11. Bestseller ProductGrid
12. Guarantee/free-gift cards
13. NewsletterBlock
14. Footer

Components used:

- TopPromoBar, Header, MegaMenu, Hero, CategoryShortcuts, ShopByFeeling, BenefitsBand, TrustBentoSection, ProductGrid, ProductCard, NewsletterBlock, Footer.

Data needed:

- Categories, needs/feelings, featured products, promo cards, trust benefits, footer links.

CTA behavior:

- Hero and need cards route to filtered shop/category pages.
- Product CTAs route to PDP.
- Promo CTAs route to relevant collection or education page.

Responsive requirements:

- Preserve Huel-like first viewport.
- Mobile cards either stack or carousel with next-card peek.

## Shop All

Section order:

1. TopPromoBar/Header
2. Breadcrumb/title
3. Category/need filter controls
4. ProductGrid
5. Pagination/load more
6. Newsletter/Footer

Components used:

- Header, FilterSortBar, ProductGrid, ProductCard, Footer.

Data needed:

- All products, filters, sort options, pagination.

CTA behavior:

- Product click opens PDP.
- Filter updates URL/query state.

Responsive requirements:

- Desktop 4-column grid.
- Mobile 2-column grid.

## Category Page

Section order:

1. Header
2. Category hero/title
3. Category shortcuts or need chips
4. ProductGrid
5. Related needs/education links
6. Footer

Components used:

- Header, CategoryShortcuts, FilterSortBar, ProductGrid, ProductCard, Footer.

Data needed:

- Category metadata, products, related needs.

CTA behavior:

- Need chips refine product list.
- Product CTA opens PDP.

Responsive requirements:

- Fixed product card ratios.
- Filters remain accessible without taking over first viewport.

## Product Detail Page

Section order:

1. Header
2. Breadcrumb
3. ProductGallery + ProductPurchasePanel
4. Product accordions
5. Related products / `We know you'll love these too`
6. Newsletter/Footer

Components used:

- Header, ProductGallery, ProductPurchasePanel, ProductAccordion, CartModal, ProductGrid, Footer.

Data needed:

- Product detail, images, variants, specs, badges, reviews, upsells, related products.

CTA behavior:

- Empty state prompts variant selection.
- Selected variant enables add-to-cart.
- Add-to-cart opens CartModal.

Responsive requirements:

- Desktop: gallery left, sticky purchase panel right.
- Mobile: gallery first, purchase panel below, optional sticky CTA.

## Cart

Section order:

1. Header
2. Cart item list
3. Shipping threshold
4. Upsell groups
5. Totals
6. Checkout CTA
7. Footer

Components used:

- Header, CartDrawer/CartPage, ProductCard, CheckoutSummary, Footer.

Data needed:

- Cart items, discounts, shipping threshold, upsells, totals.

CTA behavior:

- Quantity controls update cart.
- Upsell buttons add items.
- Checkout CTA routes to checkout mock.

Responsive requirements:

- Mobile cart can be full-screen.

## Checkout Mock

Section order:

1. Header/minimal checkout header
2. Contact/shipping mock form
3. Delivery method mock
4. Payment placeholder mock
5. Order summary
6. Place order mock CTA

Components used:

- CheckoutSummary, CheckoutMockForm, form primitives.

Data needed:

- Cart items, totals, mock shipping methods.

CTA behavior:

- No real payment.
- Place order mock routes to order success mock.

Responsive requirements:

- Desktop summary sticky right.
- Mobile summary collapsible or stacked.

## Order Success Mock

Section order:

1. Confirmation message
2. Order number mock
3. Summary
4. Continue shopping CTA
5. Recommended products

Components used:

- OrderSuccess, CheckoutSummary, ProductGrid, ProductCard.

Data needed:

- Mock order id, cart snapshot, recommended products.

CTA behavior:

- Continue shopping routes home/shop.

Responsive requirements:

- Keep concise and trust-focused.
