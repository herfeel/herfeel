# Huel Design Master Reference

This document is the master UI/UX reference audited from Huel. It is not the final PlayAh brand guide and must not be treated as copy/content to publish verbatim. Use it to preserve Huel's ecommerce structure, interaction model, visual hierarchy, spacing, PDP behavior, cart behavior, and responsive patterns before adapting the content/assets to PlayAh.

Nutrition-specific claims, Huel product naming, Huel prices, Huel badges, Huel guarantees, and Huel copy are reference-only unless explicitly mapped in `docs/playah/playah-adaptation.md`.

---

# Huel-Inspired Design System Notes

Source reviewed: https://huel.com/  
Date reviewed: 2026-06-09

## Design Intent

Build a commerce experience that feels direct, nutritional, modern, and high-conversion. The interface should make product choice feel simple: strong product photography, clear goal-based entry points, dense benefits, short proof points, and repeated purchase CTAs.

The visual language is not luxury wellness or soft lifestyle. It is clean, bold, practical, and confident: black-and-white foundation, warm off-white product surfaces, sharp editorial typography moments, and a small green signal for health/progress.

## Brand Personality

- Confident, plainspoken, science-backed.
- Practical over aspirational: save time, complete nutrition, no unnecessary fuss.
- High-trust: reviews, expert endorsement, press logos, guarantees, certifications.
- Product-first: real packs, bottles, meals, bars, ingredient closeups.
- Efficient shopping: goal cards, category pills, product cards, bundles, guarantees.

## Color Palette

Use a restrained palette with high contrast.

| Role | Hex | Usage |
| --- | --- | --- |
| Ink black | `#0C0C0D` | Header bars, footer, primary buttons, dark sections |
| Pure black | `#000000` | Logo, strong text, icon strokes |
| White | `#FFFFFF` | Page bg, card bg, inverse text |
| Warm surface | `#F5F2EC` | Editorial bands, product-card backgrounds, soft panels |
| Warm border | `#E7E1D8` | Thin dividers, subtle card outlines |
| Text muted | `#6E6E6E` | Metadata, descriptions, nav secondary text |
| Huel green | `#46BE6A` | Progress, health accents, promo pill, success icons |
| Pale green | `#C7F1C5` | Discount/promo chips, secondary positive surface |
| Orange signal | `#FF8A00` | Bestseller flame/tag accent only |

Rules:

- Keep most UI black, white, and warm off-white.
- Use green sparingly for credibility, nutrition, discount, success.
- Use orange only for tiny commerce urgency markers.
- Avoid large gradients except image overlays on dark promotional cards.

## Typography

Primary font observed: `suisseIntl` or a close grotesk fallback.  
Editorial italic/display moments use a serif italic similar to `suisseWorks`.

Recommended stack:

```css
--font-sans: "Suisse Intl", "Inter", "Helvetica Neue", Arial, sans-serif;
--font-serif: "Suisse Works", Georgia, "Times New Roman", serif;
--font-mono: "Suisse Intl Mono", "IBM Plex Mono", monospace;
```

Type scale:

- Hero/section H2 desktop: `54px`, line-height `1.12`, weight `500`.
- Large footer/newsletter H2: `42px`, line-height `1.12`, weight `500`.
- Card title: `18px`, line-height `1.4`, weight `500`.
- Body: `16px`, line-height `1.5`, weight `400`.
- Nav/button: `13px`, line-height `1`, weight `500`.
- Eyebrow/meta: `12px`, mono, muted.

Editorial styling:

- Use italic serif for one or two words inside headings: `Food to fuel your goals`, `Shop our Bestsellers`, `nutrition experts`.
- Do not make every heading fancy. The contrast works because most type is plain sans.

## Layout Principles

- Page max width: about `1200px-1280px`, centered.
- Desktop gutters: `40px-64px`.
- Mobile gutters: `16px-20px`.
- Section vertical rhythm: `64px-96px` desktop, `40px-56px` mobile.
- Use full-width black bands for proof/benefits/footer.
- Use warm off-white bands for editorial/recommendation areas.
- Product/category grids should feel dense but breathable.

Responsive behavior:

- Desktop hero goal cards: 4 columns.
- Category shortcuts: 3 columns x 2 rows on desktop, stacked/2-column on mobile.
- Product cards: 4 columns desktop, horizontal carousel or 2-column mobile.
- Expert/testimonial cards: horizontal carousel with visible overflow.
- Footer: multi-column desktop, accordion columns on mobile.

## Header And Navigation

Structure:

- Top promo strip: black bg, tiny uppercase offers repeated horizontally.
- Main sticky nav: white bg, compact height, logo left, nav groups center, utility icons right.
- Promo chip in nav: pale green pill with discount text.
- Product mega menu: dense, image-led category list with small product thumbnails.

Navigation tone:

- Labels short: `Shop all`, `Science`, `About`, `Why Huel?`, `Guides & Articles`.
- Use simple icons for account, search, cart.
- Keep nav text small and precise.

Mega menu behavior:

- Opens on hover/focus from desktop nav items.
- Active nav item becomes black, shows bottom underline, and its chevron rotates upward.
- Dropdown is full-width, white, attached directly under sticky nav.
- Page content behind menu gets darkened and blurred; menu remains crisp above the overlay.
- Dropdown bottom corners are rounded, with a soft shadow under the panel.
- Close when pointer leaves menu/header area, when another nav item opens, or on Escape.
- Keep transition fast: `120ms-180ms` fade/slide, no bounce.

Shop menu layout:

- Left rail with tabs: `Shop by Collection`, `Shop by Goal`, `Help me choose`.
- Active left tab has white bg; inactive tabs sit on warm surface.
- Left rail footer has primary black pill CTA: `Shop all`.
- Optional green outline pill in rail: `Shop outlet & save`.
- Main area is an image-led grid, usually 4 columns x 2 rows.
- Each tile uses warm surface, `8px` radius, bold category title top-left, product image bottom/right, circular arrow action.
- `Shop by Collection` shows product/category tiles.
- `Shop by Goal` swaps the grid to 4 large goal image cards: lose weight, more protein, eat healthy, on-the-go.
- `Help me choose` swaps to a hybrid learn panel: small text links on the left plus 2 large warm image promo cards with white pill CTAs.

Text menu layout:

- Used for `Science` and `About`.
- Full-width white panel with 3-column/6-column link groups.
- Group headings use mono uppercase muted text.
- Link rows are bold sans, left-aligned, generous vertical spacing.
- No images in text-led menus.

## Hero / Opening Commerce Block

Pattern:

- Large heading on white: `Food to [italic] your goals`.
- One-line support copy under heading.
- Small black pill CTA aligned right on desktop.
- Four image cards below, each representing a goal.

Goal cards:

- Aspect ratio: square or near-square.
- Rounded corners: `8px`.
- Text overlay top-left in white/black depending image contrast.
- Floating circular arrow button bottom-left.
- Cards use real product/meal photography, not abstract illustration.

Example goals:

- Lose weight
- More protein
- Eat healthy
- On-the-go

## Category Shortcuts

Use rounded pill cards with thumbnail + label + plus icon.

Style:

- Background: `#F5F2EC`.
- Radius: `9999px`.
- Height: `48px-56px`.
- Thumbnail: small square image on left.
- Plus icon: small circle on right.
- Labels medium-weight, compact.

Categories observed:

- Bestsellers
- Powdered Meals
- Bundles
- Greens & Superfoods
- Ready-to-drink Meals
- Hot Instant Meals

## Benefits Band

Full-width black section.

Content:

- Centered heading: `Benefits of Huel`, with serif italic emphasis possible.
- Six benefit items in a 3x2 desktop grid.
- Thin green line icons above each benefit.
- Big short title + one-line explanation.

Benefit copy pattern:

- `100% Complete` / `All the nutrition you need. Every day.`
- `Save Time` / `Meals ready in 15 seconds.`
- `Save Money` / `From $1.52 per meal.`
- `No Bullshit` / `No unnecessary ingredients. No GMO.`
- `Taste Guaranteed` / `Love it or your money back.`
- `Easy` / `No prep. No cooking. No mess.`

## Science / Why It Works Section

Use a modular bento grid.

Style:

- White section bg.
- Cards: warm surface `#F5F2EC`, thin warm border, `8px` radius.
- Mix tall product-image card with smaller evidence cards.
- Use serif italic in card titles to create editorial trust.
- Include simple numeric proof chips.

Card themes:

- Complete nutrition: bottle/product image, vitamins/minerals count.
- Balanced macros: small chips like high fiber/protein/low sugar.
- Scientifically supported: expert/profile avatars, study count.
- Protein for satiety: ingredient/product image, protein value.
- Real ingredients: ingredient photography.

CTA:

- Small black pill: `See the science`.

## Social Proof / Experts

Use a warm off-white section with horizontal cards.

Pattern:

- Heading: `Recommended by top performers & nutrition experts`.
- Small supporting line.
- Carousel of portrait cards.
- Each card: full-bleed person photo, dark gradient overlay bottom, name, role, verified badge, short quote.
- Keep quote compact. One testimonial should fit without scrolling inside card.

## Press Proof

Full black band.

Layout:

- Press logos in white: Vox, GQ, Wired style treatment.
- Short quote beneath each logo.
- Carousel pagination dots below.

Do:

- Let logos breathe.
- Keep quotes small and centered.
- Avoid colorful press logos here.

## Promo Story Cards

Three-card row after press band.

Style:

- Image/video cards with dark overlay.
- Rounded corners: `8px`.
- White title and subcopy top-left.
- White pill CTA anchored bottom.

Use cases:

- Retail availability
- Variety box / bundle
- Greens / drink habit

## Product Cards

Commerce cards should be compact, not decorative.

Structure:

- Product image on warm surface.
- Small orange bestseller tag.
- Product title.
- Short descriptor.
- 2-3 icon facts: protein, calories, vitamins/minerals.
- Price line: `From $45 / $2.65 per meal`.
- Small black pill CTA: `View product`.

Visual rules:

- Image area fixed aspect ratio.
- Product pack should be large and inspectable.
- Text left-aligned.
- Buttons small, black, pill-shaped.
- Keep card border minimal or absent.

## Product Detail Page

Observed PDP: `Black Edition` at `https://huel.com/products/huel-black-edition`.

Top layout:

- Sticky global header remains above the PDP.
- Breadcrumbs sit below nav: `Home > All products > Nutritionally Complete Powders > Black Edition`.
- Desktop uses a 2-column product layout.
- Left column: large warm-surface media gallery with product pack, shake glass, big nutrition numbers, circular previous/next arrows, pagination dots, and offer banner inside the media frame.
- Right column: sticky purchase panel with rating stars, customer count, product title, short descriptor, price chips, benefit copy, nutrition link, flavor picker, subscription cards, and accordions.

PDP visual style:

- Product gallery card uses warm off-white bg and large real product imagery.
- Claim typography mixes bold sans with italic serif words: `High-protein, high in fiber`.
- Nutrition stats are very large and scannable: `40g protein`, `27 vitamins & minerals`, `up to 11g fiber`, `Gluten-free`.
- Rating stars use green fill and sit inline before social proof count.
- Price chips use green outline for primary value and warm outline for secondary count.

Flavor picker:

- Each flavor is a horizontal row with circular flavor/product thumbnail, badge label, title, price, optional `Learn more`, and quantity stepper.
- Plus buttons start as black square buttons with `+`.
- After selecting a flavor, the row exposes `-`, quantity number, and green-outline `+`.
- Rows can include badges: `EXCLUSIVE OFFER`, `OUR FAVORITE`, `NEW`, `BESTSELLER`.
- Out-of-stock rows remain in list but show disabled/error content.
- Caffeine indicator appears above the list as a tiny icon legend.

Purchase option controls:

- Subscription is pre-emphasized with `MOST POPULAR` and green-tinted value treatment.
- `Subscribe & Save` card lists meal count, discounted price, struck-through original price, and compact benefit bullets.
- Frequency selector is a native select-style control with options like `2 weeks`, `4 weeks`, `6 weeks`, `8 weeks`.
- One-time purchase is a separate card below with original price.
- CTA changes based on selection: empty state uses `Choose flavors`; selected state becomes `Add to subscription | $45`.
- Shipping threshold text appears beneath CTA: `Spend $65 to get free shipping`.
- Secondary trust links sit below: shipping info, Huel+ points, free welcome kit.

PDP accordions:

- Accordion rows span the purchase panel width with thin dividers.
- Open state expands inline content under the row.
- Sections observed: free t-shirt & shaker, how to use, science & testing, HSA/FSA eligible, delivery & returns.
- Instructional content uses numbered steps, short paragraphs, and inline links.

PDP button audit:

- Promo strip has repeating offer links and a small pause animation button.
- Country selector opens an all-stores modal.
- Header icons open help, account, cart.
- Gallery arrows change media; dots show current slide.
- Category/menu arrows navigate directly to collection/goal pages.
- Flavor `+/-` buttons update quantity without leaving the page.
- `Learn more` links inside flavor rows open detail/help content or product pages.
- Subscription frequency select updates delivery cadence.
- Accordions toggle inline without page navigation.
- Chat bubble floats bottom-right across PDP.

## Cart / Add-To-Cart Modal

After selecting Chocolate and clicking `Add to subscription | $45`, Huel opens a centered cart modal with dimmed/blurred page backdrop.

Cart modal structure:

- White rounded modal, max-width about `672px`, centered over page.
- Header says `Added to your cart`, with black circular close button.
- Yellow shipping threshold banner: `Spend another $20 for FREE delivery`.
- Progress bar with milestone pills: `FREE`, percentage discount threshold, dollar marks like `$65`, `$120`.
- Upsell sections are shown before checkout: short-dated stock, snack smart, limited-time offer.
- Upsell cards use product image, flavor swatch, icon facts, price, best-before/serving info, and black pill add buttons.
- Carousel dots and arrow buttons control upsell groups.
- Sticky bottom CTA: black full-width `Go to cart` pill.

Cart drawer/full-cart content:

- Cart also tracks item quantity with compact number options.
- Subscription cart item shows flavor, discounted price, original price, delivery cadence, and unsubscribe option.
- Welcome kit appears as a free included benefit.
- Totals show subtotal, automatic discount, shipping calculated at checkout, and final total.
- `Secure Checkout` exists but should remain the final boundary; do not trigger payment flow in design tests.

## Newsletter Modal / Signup

Observed behavior:

- Dark overlay modal offering `15% off` first order.
- Discount phrase highlighted with pale green bg.
- Email + phone fields.
- Rounded sign-up button.
- Legal copy small and muted.

Use cautiously:

- Delay until user scrolls or shows purchase intent.
- Always provide a clear close button.
- Avoid blocking first impression too early.

Newsletter footer block:

- Black bg.
- Left: bold offer headline and short benefit copy.
- Right: email input + pill signup button.
- Legal copy below, small.

## Footer

Dark, practical, information-dense.

Sections:

- Sustainability/commitment CTA with forest or nature image background.
- Multi-column links: Products & Gear, About Huel, Help & Savings.
- Locale selector, payment icons, social icons.
- Brand wordmark and legal paragraph.

Mobile:

- Use accordion link groups.
- Keep newsletter and sustainability blocks stacked.

## Components

Buttons:

- Primary: black bg, white text, `9999px` radius, compact padding.
- Secondary inverse: white bg, black text, pill radius.
- Promo: pale green bg, black text, pill radius.
- Icon buttons: circular, `32px-40px`, arrow/plus/search/cart.

Cards:

- Default radius: `8px`.
- Product/image cards: fixed aspect ratio, no heavy shadow.
- Dark image cards: use black gradient overlay for readability.
- Do not nest cards inside cards.

Inputs:

- White fill on dark bg.
- Small height, pill or `4px-8px` radius depending context.
- Label above or placeholder, not both if space is tight.

Icons:

- Thin-line utility icons.
- Green stroke for benefits/success.
- Small icon facts in product cards.

## Imagery Direction

Use real photography:

- Product packs/bottles large and clear.
- Food closeups: pasta, grains, shakes, bars, greens.
- Human portraits for expert/social proof.
- Retail/context photos for availability cards.
- Forest/nature imagery only for sustainability footer.

Avoid:

- Abstract blobs, generic wellness stock photos, heavy filters.
- Overly soft beige lifestyle direction.
- Product shots cropped so tightly that label is unreadable.

## Copywriting Rules

- Short, direct, benefit-led.
- Prefer concrete numbers: protein grams, calories, vitamins, savings.
- Use plain confidence: `No prep. No cooking. No mess.`
- Use proof hierarchy: benefit -> number -> guarantee -> expert/press.
- Avoid long brand manifestos above the fold.

## Page Flow Blueprint

1. Promo strip + sticky nav.
2. Goal-led hero with 4 cards.
3. Category shortcut pills.
4. Black benefits band.
5. Science/bento proof section.
6. Expert testimonial carousel.
7. Press quote band.
8. Promo story cards.
9. Bestseller product grid.
10. Guarantee/free-gift cards.
11. Newsletter signup.
12. Sustainability/footer.

## Implementation Tokens

```css
:root {
  --color-ink: #0c0c0d;
  --color-black: #000000;
  --color-white: #ffffff;
  --color-surface: #f5f2ec;
  --color-border: #e7e1d8;
  --color-muted: #6e6e6e;
  --color-green: #46be6a;
  --color-green-soft: #c7f1c5;
  --color-orange: #ff8a00;

  --font-sans: "Suisse Intl", "Inter", "Helvetica Neue", Arial, sans-serif;
  --font-serif: "Suisse Works", Georgia, "Times New Roman", serif;
  --font-mono: "Suisse Intl Mono", "IBM Plex Mono", monospace;

  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-pill: 9999px;

  --container: 1280px;
  --gutter-desktop: 48px;
  --gutter-mobile: 16px;
}
```

## Quality Checklist

- Product visible in first viewport.
- One main CTA appears above the fold.
- Every section has either a shopping action or proof point.
- Cards keep stable dimensions across loading states.
- Mobile carousels show part of the next card.
- Dark image overlays preserve readable text contrast.
- Footer remains useful, not just legal/meta content.
- Green accents never dominate the page.
