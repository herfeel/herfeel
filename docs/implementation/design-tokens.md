# Design Tokens

## Token Strategy

Default tokens should match Huel closely for structure and visual parity. Brand-facing tokens can later be adjusted to PlayAh without changing layout behavior.

## Colors

| Token | Value | Purpose | Status |
| --- | --- | --- | --- |
| `--color-ink` | `#0C0C0D` | Header bars, footer, primary buttons | Match Huel |
| `--color-black` | `#000000` | Logo/text/icon strokes | Match Huel |
| `--color-white` | `#FFFFFF` | Page/card bg, inverse text | Match Huel |
| `--color-surface` | `#F5F2EC` | Warm product surfaces/cards | Match Huel |
| `--color-border` | `#E7E1D8` | Dividers/card borders | Match Huel |
| `--color-muted` | `#6E6E6E` | Meta/secondary text | Match Huel |
| `--color-green` | `#46BE6A` | Success/promo/progress | Can become PlayAh brand accent |
| `--color-green-soft` | `#C7F1C5` | Promo chips/selected surfaces | Can become PlayAh brand accent |
| `--color-orange` | `#FF8A00` | Bestseller/urgency tiny badges | Match Huel behavior |
| `--color-warning-soft` | `#F7E7A8` | Free-shipping cart threshold banner | Match Huel behavior |

## Typography

```css
--font-sans: "Suisse Intl", "Inter", "Helvetica Neue", Arial, sans-serif;
--font-serif: "Suisse Works", Georgia, "Times New Roman", serif;
--font-mono: "Suisse Intl Mono", "IBM Plex Mono", monospace;
```

- `--text-hero`: `54px / 1.12`, weight `500`.
- `--text-section`: `54px / 1.12`, weight `500`.
- `--text-footer-lg`: `42px / 1.12`, weight `500`.
- `--text-card-title`: `18px / 1.4`, weight `500`.
- `--text-body`: `16px / 1.5`, weight `400`.
- `--text-nav`: `13px / 1`, weight `500`.
- `--text-meta`: `12px / 1.3`, mono, muted.

Serif italic words are used to match Huel. They may be retained for PlayAh if the brand direction stays editorial and premium.

## Spacing

- `--space-1`: `4px`
- `--space-2`: `8px`
- `--space-3`: `12px`
- `--space-4`: `16px`
- `--space-5`: `20px`
- `--space-6`: `24px`
- `--space-8`: `32px`
- `--space-10`: `40px`
- `--space-12`: `48px`
- `--space-16`: `64px`
- `--space-24`: `96px`

## Radius

- `--radius-sm`: `4px`
- `--radius-md`: `8px`
- `--radius-lg`: `12px` for modal only when needed.
- `--radius-pill`: `9999px`

Cards should usually stay at `8px` to match Huel.

## Shadow

- `--shadow-menu`: soft dropdown shadow under mega menu.
- `--shadow-modal`: soft centered modal shadow.
- `--shadow-card`: subtle shadow only for cart upsell cards, not normal product cards.

Avoid heavy ecommerce card shadows.

## Containers And Gutters

- `--container`: `1280px`
- Desktop gutter: `48px`
- Tablet gutter: `32px`
- Mobile gutter: `16px`

## Breakpoints

- `sm`: `640px`
- `md`: `768px`
- `lg`: `1024px`
- `xl`: `1280px`
- `2xl`: `1440px`

## Button Styles

- Primary: black bg, white text, pill radius, compact padding.
- Secondary inverse: white bg, black text, pill radius.
- Promo: soft green bg, black text, pill radius.
- Icon: circular or square-rounded, fixed size, icon centered.
- Disabled: muted bg, muted text, no pointer action.

## Card Styles

- Product image surface: warm off-white, fixed aspect ratio.
- Product card body: white, left-aligned, dense facts.
- Goal card: image full-bleed with dark/text overlay and circular arrow.
- Mega menu tile: warm surface, product image, title, arrow.
- Cart upsell card: white card, thumbnail side, specs, CTA.

## Changeable For PlayAh Brand

Can change later:

- Green accent colors.
- Serif font choice.
- Product imagery tone.
- Promo chip copy.

Should not change without approval:

- Header structure.
- Mega menu behavior.
- PDP 2-column layout.
- Flavor/variant row behavior.
- Cart modal threshold/upsell pattern.
