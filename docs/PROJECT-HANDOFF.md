# Project Handoff

## Goal

Build an ecommerce website for PlayAh using Huel.com as the primary UI/UX reference. The target is to clone Huel's structure, ecommerce flow, visual hierarchy, interaction behavior, and responsive patterns as closely as practical, then map the content, products, imagery, and commercial language to PlayAh.

## Current Phase

This repo is currently in documentation phase only.

- Do not scaffold a project yet.
- Do not create app/source/component code yet.
- Do not implement UI yet.
- Only create or edit Markdown documentation.
- Code phase must start in a new session after these docs are approved.

## Reference And Source Of Truth

The source of truth for the next phase is the `docs/` directory.

- `docs/reference/huel-design-master.md`: Huel audit and master UI/UX reference.
- `docs/playah/*`: PlayAh content/product adaptation rules.
- `docs/implementation/*`: implementation specs, page flow, tokens, QA, and task plan.

The old root file `desgin.md` is kept as the original session artifact. The organized master reference lives at `docs/reference/huel-design-master.md` and adds PlayAh/reference-only guardrails on top of the copied audit.

Recommendation after docs approval: remove or archive the root `desgin.md` typo file so future sessions use `docs/reference/huel-design-master.md` as the only Huel master reference. If a correctly named root `design.md` appears later, keep it only if it contains newer information not already copied into the docs tree.

## Huel Role

Huel is the layout and UX reference, not the final brand/content source. Use Huel for:

- Header, promo bar, sticky nav, mega menu behavior.
- Hero structure and goal/need cards.
- Product grid density and card hierarchy.
- PDP gallery, purchase panel, variant selection, accordions.
- Cart modal/drawer, upsells, threshold progress, checkout boundary.
- Mobile menu, carousel, footer, and responsive behavior.

Do not invent a layout that significantly diverges from Huel unless the user explicitly asks.

## PlayAh Role

PlayAh is the product, brand, asset, and final content source. PlayAh images, product names, category names, prices, specs, and trust claims should replace Huel-specific nutrition content.

## Critical Guardrails

- Keep Huel-like structure unless requested otherwise.
- Mark nutrition/Huel-specific content as reference-only or map it to PlayAh.
- Use PlayAh assets/products where available.
- Avoid adding unrelated landing-page marketing sections.
- Do not create source code, config files, or project scaffold in this phase.
- Next session should begin by reading this file and the docs listed above.

## Next Step

After docs approval, start a new code phase session to scaffold the app and implement tasks from `docs/implementation/implementation-tasks.md`.
