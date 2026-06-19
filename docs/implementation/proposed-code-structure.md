# Proposed Code Structure

This is a proposal only. Do not create code structure until the code phase starts.

## Recommended Stack

Next.js + TypeScript is recommended because:

- Ecommerce pages benefit from server-rendered product/category/PDP routes.
- App Router maps cleanly to home, shop, category, PDP, cart, checkout, success pages.
- Image optimization can enforce thumbnails, sizes, and lazy loading.
- Client components can be scoped to cart/menu/filter/quantity interactions.
- TypeScript helps keep product taxonomy, variants, cart items, and page data stable.

## Proposed Folder Structure

```txt
app/
  layout.tsx
  page.tsx
  shop/
    page.tsx
  category/
    [slug]/
      page.tsx
  product/
    [slug]/
      page.tsx
  cart/
    page.tsx
  checkout/
    page.tsx
  order-success/
    page.tsx

components/
  layout/
    TopPromoBar.tsx
    Header.tsx
    MegaMenu.tsx
    MobileMenu.tsx
    Footer.tsx
  home/
    Hero.tsx
    CategoryShortcuts.tsx
    ShopByFeeling.tsx
    BenefitsBand.tsx
    TrustBentoSection.tsx
    PromoStoryCards.tsx
    NewsletterBlock.tsx
  product/
    ProductCard.tsx
    ProductGrid.tsx
    FilterSortBar.tsx
    ProductGallery.tsx
    ProductPurchasePanel.tsx
    ProductVariantPicker.tsx
    ProductAccordion.tsx
  cart/
    CartModal.tsx
    CartDrawer.tsx
    CartPage.tsx
    CartItem.tsx
    CartUpsells.tsx
    ShippingProgress.tsx
  checkout/
    CheckoutSummary.tsx
    CheckoutMockForm.tsx
    OrderSuccess.tsx
  ui/
    Button.tsx
    IconButton.tsx
    Badge.tsx
    Accordion.tsx
    Carousel.tsx

features/
  cart/
    cart-store.ts
    cart-types.ts
    cart-utils.ts
  products/
    product-types.ts
    product-utils.ts
    filters.ts

config/
  site.ts
  commerce.ts

data/
  mock/
    products.ts
    categories.ts
    navigation.ts
    footer.ts

lib/
  cn.ts
  format-price.ts
  image.ts

styles/
  globals.css
  tokens.css

docs/
  PROJECT-HANDOFF.md
  reference/
  playah/
  implementation/
```

## Route Notes

- `/`: Huel-like home adapted to PlayAh.
- `/shop`: all products.
- `/category/[slug]`: category listing.
- `/product/[slug]`: PDP.
- `/cart`: cart page or drawer fallback.
- `/checkout`: mock checkout only in first implementation.
- `/order-success`: mock success page.

## Component Ownership

- `components/layout`: global shell and navigation.
- `components/home`: home-only sections.
- `components/product`: product listing and PDP components.
- `components/cart`: client cart UI.
- `components/checkout`: mock checkout surfaces.
- `components/ui`: small primitives, no business data.

## Data Ownership

- `data/mock`: temporary PlayAh mock catalog and navigation data.
- `config/site.ts`: site-level labels, policy links, locale, and SEO defaults.
- `config/commerce.ts`: mock shipping threshold, currency, discounts, and checkout flags.
- `features/products`: product types and product helpers.
- `features/cart`: cart state, totals, discounts, and item transforms.

## Client Component Boundaries

Likely client components:

- MegaMenu / MobileMenu
- ProductGallery
- ProductVariantPicker
- ProductPurchasePanel quantity controls
- ProductAccordion
- CartModal / CartDrawer
- Filters/sort controls
- Checkout mock form validation

Likely server/static components:

- Home static sections
- ProductCard display
- ProductGrid shell
- Footer
- Trust/benefit sections
- Route shells that only compose static/data-driven sections

## Guardrails For Code Phase

- Do not create this structure before approval.
- Do not add real payment integration in the first pass.
- Do not cache cart/checkout/account/order routes.
- Do not use full-size images in product listings.
- Keep layout close to Huel unless user requests a change.
- Keep mock data/config replaceable and isolated from component structure.
