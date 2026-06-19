# Huel Home Interaction Audit

## Summary

- Huel was audited directly with local Google Chrome via Chrome DevTools Protocol.
- The audit used real mouse hover/click/key events, not static HTML reading.
- Evidence files:
  - `docs/interactions/huel-evidence.json`
  - `docs/interactions/huel-evidence-pass6.json`
  - `docs/interactions/screenshots/`
- Confirmed interactions: promo strip hover has no visible transition; desktop Shop mega menu opens on hover with `aria-expanded`; mega panel uses class toggles plus height/opacity/visibility transition; mobile menu button toggles `aria-expanded`; hero cards zoom image and slide action icon; category pills subtly scale image/icon/pill.
- Not fully confirmed: product-card hover image swap, review carousel arrow behavior, footer mobile accordion. Product card selector was not reliably reached in automation, so image swap is not treated as fact.
- Newsletter popup appeared during later passes and was removed after observation to continue page-level hover audit. This is documented as an audit condition.

## Interaction Inventory

| Area | Trigger | Observed Effect | Evidence | Mechanism | Duration | Easing | Priority for PlayAh |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Promo strip | Hover | No visual transition confirmed; marquee remained running in computed style | `huel-promo-before.png`, `huel-promo-after.png` | CSS/DOM strip, no hover class observed | `0s` on inspected wrapper | `ease` | Medium |
| Header nav | Hover Shop | Trigger becomes active; `aria-expanded=false` to `true`; active class added | `huel-header-shop-before.png`, `huel-megamenu-open.png` | JS state/class toggle | `0.2s` on trigger | `cubic-bezier(0.4, 0, 0.2, 1)` | High |
| Desktop MegaMenu | Hover Shop | Full-width panel opens under header, white panel, shadow | `huel-megamenu-open.png`, `huel-evidence.json` | Class toggle: `panel--is-open`; height/opacity/visibility transition | `0.3s` | `ease-out` | High |
| Mobile menu | Click menu button | Button `aria-expanded=false` to `true`; nav structure present | `huel-mobile-before.png`, `huel-mobile-menu-open.png` | JS state/ARIA toggle | Not visible on captured button | Not confirmed | Later |
| Hero cards | Hover | Image grows from about `268px` to `294.8px`; action icon row shifts horizontally | `huel-hero-coordinate-clean-before.png`, `huel-hero-coordinate-clean-after.png` | CSS hover affecting child image/action icons | `0.3s` on action icons | `cubic-bezier(0.4, 0, 0.2, 1)` | High |
| Category pills | Hover | Pill/card expands slightly; thumbnail grows about `68px` to `69.02px`; action icon shifts/grows slightly | `huel-category-coordinate-clean-before.png`, `huel-category-coordinate-clean-after.png` | CSS hover affecting pill child elements | `0.15s` pill, `0.3s` icon | `cubic-bezier(0.4, 0, 0.2, 1)` | High |
| Bento cards | Hover | Not confirmed by selector; screenshot evidence inconclusive | `huel-bento-coordinate-clean-before.png`, `huel-bento-coordinate-clean-after.png` | Not confirmed | Not confirmed | Not confirmed | Medium |
| Review carousel | Arrow click | Not confirmed; automation found bento carousel candidate, no next button clicked | `huel-carousel-before.png`, `huel-carousel-after.png` | Not confirmed | Not confirmed | Not confirmed | Later |
| Promo story cards | Hover | Not separately confirmed in this audit | Not confirmed | Not confirmed | Not confirmed | Not confirmed | Medium |
| Product cards | Hover | Product image swap not confirmed; automation did not reliably reach a product card | `huel-product-card-before.png`, `huel-product-card-after.png` fallback screenshots | Not confirmed | Not confirmed | Not confirmed | High later |
| Footer | Hover | Footer CTA/link transition duration visible, no major transform observed | `huel-footer-link-before.png`, `huel-footer-link-after.png` | CSS transition on button/link | `0.32s` | `cubic-bezier(0.4, 0, 0.2, 1)` | Low |

## Detailed Findings

### Promo Strip

The top strip rendered repeated messages such as shipping, subscribe/save, and referral offers. Hovering the inspected wrapper did not pause animation in computed style and did not change opacity/transform. This audit only confirms no visible hover transition on the inspected wrapper; nested marquee details were not fully isolated.

### Header/Nav

The desktop `Shop all` trigger opened on hover. Before hover, the trigger had `aria-expanded="false"`; after hover, `aria-expanded="true"` and an active class were present. The trigger transition was `0.2s` with `cubic-bezier(0.4, 0, 0.2, 1)`.

### Desktop MegaMenu

The mega menu is full-width, attached below the header, and opened by a class toggle. Evidence showed `navbar...panel--is-open` and a panel transition on `height, opacity, visibility` at `0.3s ease-out`. The panel was white with a soft shadow. A separate backdrop/dim layer was not confirmed from computed panel data in this run.

### Mobile Menu

The mobile menu button toggled `aria-expanded` from `false` to `true` on click. The captured open DOM showed mobile nav menu items, but computed drawer transform/overlay animation was not confirmed. Body overflow stayed inspectable but scroll-lock was not conclusively verified.

### Hero Cards

Hovering the first goal card was confirmed. The image kept the same URL, so this was zoom, not image swap. The image visual rect expanded from about `268x268` to `294.8x294.8`. The action icon row shifted horizontally and had a `0.3s` transform transition.

### Category Pills

Hovering the first visible pill was confirmed. The pill wrapper expanded slightly, the thumbnail grew from about `68x68` to `69.02x69.02`, and the action icon shifted slightly. The pill child transition was `0.15s`; the action icon transition was `0.3s`.

### Bento Cards

Not confirmed. The audit attempted coordinate and text targeting, but the final computed target was null after modal cleanup/scroll variance. PlayAh bento hover should be treated as an approximation unless later screenshots confirm exact Huel behavior.

### Review Carousel

Not confirmed. Automation detected a carousel-like bento wrapper, not the intended review carousel, and no next-arrow click was confirmed. Do not add a JS carousel library from this audit alone.

### Promo Story Cards

Not confirmed separately. Use the same image zoom/CTA motion pattern only as an approximation.

### Product Cards

Product-card image swap was not confirmed. The audit did not reliably reach a product card in the dynamic page. No PlayAh `hoverImage` field should be invented from this evidence.

### Footer

A footer/CTA link exposed CSS transition timing of `0.32s` with Tailwind-like cubic easing. No heavy transform was observed.

## Image Swap Findings

- Hero cards: confirmed no URL swap on audited first card; image zoom only.
- Category pills: confirmed no URL swap on audited first pill; thumbnail scale only.
- Product cards: not confirmed. No evidence for two-layer crossfade, JS `src` swap, or CSS background swap.
- PlayAh data does not currently need `hoverImage` for Home bestsellers. If later Huel product-card audit confirms image swap, add `hoverImage` deliberately to listing data.

## Motion Recommendation

### Dung Tailwind/CSS

- Promo strip hover/pause behavior.
- Nav underline/opacity.
- Hero card image zoom and action arrow translate.
- Category pill background, thumbnail scale, icon translate.
- Bento/promo/product card image zoom where no stateful enter/exit exists.
- Footer link hover.

### Dung Motion

- Desktop mega menu dropdown enter/exit.
- Page overlay fade for open menus/drawers.
- Future mobile drawer/cart drawer mount/unmount.

## PlayAh Implementation Plan

### Apply Now

- Install `motion`.
- Add shared motion timings/variants.
- Use Motion only for Header mega menu overlay/dropdown enter/exit.
- Tune Home hero/category/product/promo micro-interactions with CSS/Tailwind.
- Keep Home page as a Server Component.

### Later With Menu/Cart/PDP

- Full mobile menu drawer motion if/when MobileMenu structure is expanded.
- Cart drawer/modal overlay and enter/exit.
- PDP gallery/accordion motion after PDP task scope.

### Needs More Screenshots/Assets

- Product-card hover image swap.
- Review carousel arrows/dots.
- Mobile menu accordion animation.
- Footer mobile accordion.
