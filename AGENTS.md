# AGENTS.md

Guidance for AI coding agents working in the PlayAh ecommerce storefront repository.

## Project Context

PlayAh is an ecommerce storefront for sexual wellness products. Huel.com is the primary reference for layout, UX, ecommerce flow, header, mega menu, product grid, PDP, cart modal/drawer, and responsive behavior. Huel is a structure and behavior reference only; final content, products, imagery, assets, categories, and commercial language must come from PlayAh.

Current phase: documentation and agent-instruction setup only. Do not scaffold the project, implement UI, or create app/source/component code unless the user explicitly starts the code phase.

## Source Of Truth

Read these docs before code work:

- `docs/PROJECT-HANDOFF.md`
- `docs/reference/huel-design-master.md`
- `docs/playah/playah-adaptation.md`
- `docs/playah/product-taxonomy.md`
- `docs/implementation/design-tokens.md`
- `docs/implementation/component-spec.md`
- `docs/implementation/page-flow.md`
- `docs/implementation/performance-rules.md`
- `docs/implementation/visual-qa-checklist.md`
- `docs/implementation/implementation-tasks.md`
- `docs/implementation/proposed-code-structure.md`

Use `.agents/skills/*/SKILL.md` when a task matches a local skill.

## Workflow Rules

- Do not implement a full UI in one task.
- Follow `docs/implementation/implementation-tasks.md` in order unless the user explicitly changes scope.
- Before coding, state the exact implementation task number/name being worked on.
- After coding, report files changed and commands run.
- Do not add a dependency without explaining why it is needed and why existing tools are insufficient.
- Keep changes scoped to the requested task.
- Do not rewrite approved docs unless the task asks for documentation updates.
- Do not connect real payments in mock checkout work.

## Code Structure Rules

- Prefer Next.js App Router + TypeScript when scaffold is approved.
- Put routes under `src/app`.
- Put shared UI primitives under `src/components/ui`.
- Put global layout components under `src/components/layout`.
- Put feature code under `src/features/{feature}`.
- Keep product, cart, and checkout logic separated.
- Do not hardcode mock data inside UI components; use `src/data/mock` or config/data modules.
- Use kebab-case file names.
- Use PascalCase component names.
- Avoid barrel imports too early; prefer direct imports until module boundaries stabilize.

## React And Next.js Rules

- Prefer Server Components by default.
- Use `"use client"` only for state, browser APIs, event handlers, cart, menu, drawer, modal, localStorage, or client-only animation.
- Do not turn an entire page into a Client Component for a small interactive surface.
- Keep client providers narrow and close to the UI that needs them.
- Do not fetch data in `ProductCard`; pass compact listing data through props.
- Keep listing data separate from PDP detail data.
- Authenticate and isolate any future private/server action behavior like an API route.

## Image And Performance Rules

- Product grids must not use full-size product images.
- Product cards use thumbnails.
- PDP gallery can use medium/large images.
- Set `width`, `height`, and `sizes` for images.
- Lazy-load images below the fold.
- Preload the hero image only when it is the LCP image.
- Limit product listings to 12 or 24 products per page/load.
- Do not render the full catalog at once.
- Do not publicly cache cart, checkout, account, order, or payment-related routes.
- Preserve fixed aspect ratios for product cards, hero cards, galleries, promo cards, counters, and sticky CTAs.

## Design And Visual Rules

- Match Huel structure, spacing, section rhythm, card ratio, button radius, header behavior, mega menu behavior, PDP layout, cart behavior, and ecommerce flow.
- Use PlayAh categories, products, assets, imagery, policies, and final copy.
- Do not invent layouts that significantly diverge from Huel unless requested.
- Keep the black/white/off-white foundation and sparse accent usage from the design docs.
- Keep cards mostly at `8px` radius.
- Use product-first, discreet, tasteful imagery.

## Safety And Copy Rules

- This is sexual wellness ecommerce; keep UX discreet, practical, and non-explicit.
- Avoid overly sensitive or explicit imagery.
- Do not claim products are `100% safe`, `absolute prevention`, or medically guaranteed unless approved evidence exists.
- Emphasize discreet delivery, authentic products, usage guidance, storage, compatibility, and safety notes.
- Do not copy Huel logo, trademarks, prices, claims, product names, or production copy.
- Do not publish nutrition-specific Huel content in PlayAh UI unless it has an approved PlayAh mapping.

