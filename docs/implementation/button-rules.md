# Button Rules

## Scope

Use this rule for PlayAh commerce CTAs, card CTAs, account actions, cart actions, and inline purchase/navigation buttons.

## Base CTA

- Primary CTAs use a compact black pill: `bg-[var(--color-ink)]`, white text, `var(--radius-pill)`.
- Keep button text short and action-led.
- Keep padding compact; do not make oversized marketing buttons inside cards or utility surfaces.
- Use `border border-transparent` on black CTAs when they need the standard hover treatment.
- Use `transition-[background-color,border-color,color,transform] duration-200` for hoverable CTAs.

## Hover CTA

- Primary CTA hover follows the home page pattern:
  - border: `#347447`
  - background: `var(--color-green-soft)`
  - text: `var(--color-black)`
- Card CTAs may use `group-hover:*` only when the full card should visually trigger the CTA state.
- When the request says button-only hover, put hover classes on the CTA element itself and keep the parent card background unchanged.
- Subtle lift is allowed for CTAs: `hover:-translate-y-0.5` or `group-hover:-translate-y-0.5` depending on the intended trigger area.
- Do not use green as the default fill for primary CTAs; reserve it for hover, promo, success, and small accents.

## Focus And Disabled

- Focus rings use `var(--color-green)` with visible offset.
- Disabled buttons must remove pointer action and use muted background/text.
- Hover state must never reduce text contrast or hide the button boundary.

## Account Page Cards

The three account support card CTAs must match the home CTA hover behavior only when the pointer is on the pill: black pill at rest, green-soft pill with black text on button hover. The account card background stays warm surface on hover.
