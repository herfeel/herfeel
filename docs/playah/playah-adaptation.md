# PlayAh Adaptation

## Adaptation Principle

Use Huel as the ecommerce UX blueprint, then replace nutrition-specific meaning with PlayAh product discovery, product specs, trust, privacy, and convenience.

Huel should guide structure and behavior. PlayAh should determine final categories, imagery, copy, product data, and commercial messaging.

## Core Mapping

| Huel Pattern | PlayAh Adaptation |
| --- | --- |
| Shop by Goal | Shop by Feeling / Need |
| Nutrition facts | Product specs and usage attributes |
| Flavor picker | Variant / pack size picker |
| Subscribe & Save | Combo tiết kiệm / mua nhiều giảm giá |
| Science section | Tiêu chuẩn, chất liệu, hướng dẫn sử dụng, giao hàng kín đáo |
| Cart upsell | Mua kèm gel, combo, freeship threshold |
| Complete nutrition proof | Product safety, origin, material, discretion, fit/feel proof |
| Expert/press proof | Customer trust, discreet delivery, verified reviews, education content |
| Huel+ points | Loyalty points or member perks if PlayAh supports it |

## Section Mapping Checklist

Use this checklist when converting Huel reference sections into PlayAh implementation content.

| Huel Section / Detail | PlayAh Replacement |
| --- | --- |
| `Shop all`, `Shop by Goal`, `Science`, `Why Huel?` nav | `Shop`, `Shop by Feeling`, `Help me choose`, `Trust / Discreet delivery` |
| Promo bar nutrition/savings offers | Free shipping threshold, discreet shipping, combo savings, new-customer gift if approved |
| Hero nutrition goal cards | Need-led shopping cards: Siêu mỏng, Kéo dài, Nhiều gel, Ấm nóng, Gai/gân, Sensitive |
| Product category cards with powders/drinks/bars | Bao cao su, Gel bôi trơn, Dung dịch vệ sinh, Mùi thơm, Combo |
| Benefits of Huel | Benefits of shopping PlayAh: chọn nhanh, giao kín đáo, sản phẩm rõ thông tin, combo tiết kiệm, hỗ trợ chọn loại, đổi trả/hỗ trợ |
| Protein/calorie/vitamin proof tiles | Material, pack count, texture, compatibility, usage guidance, discreet delivery proof |
| Nutrition experts / athlete quotes | Verified reviews, customer trust, education content, support policy |
| Flavor picker | Variant picker: pack size, texture, material, scent, sensation, combo type |
| `Nutrition` link in PDP | `Thông tin sản phẩm`, `Cách chọn`, or `Hướng dẫn sử dụng an toàn` |
| `Subscribe & Save` panel | Combo tiết kiệm, mua nhiều giảm giá, bundle gel + bao cao su |
| Cart nutrition upsells | Complementary products, gel, combo, travel pack, free-shipping add-ons |
| Footer Huel company/science links | Policy, discreet shipping, support, product education, category links |

## Home Page Adaptation

Hero goal cards should become need-led shopping cards:

- Siêu mỏng
- Kéo dài
- Nhiều gel
- Ấm nóng
- Gai/gân
- Sensitive

Use real PlayAh product photography or tasteful product/context imagery. Avoid explicit imagery. Keep the commerce surface clean, discreet, and product-first.

Home must not mention calories, macros, meal replacement, vitamins, protein goals, caffeine, or flavor unless the term is part of a real PlayAh product attribute. Use `scent`, `sensation`, `texture`, `material`, `pack size`, and `compatibility` instead.

## Mega Menu Adaptation

Keep Huel's full-width dropdown behavior:

- `Shop by Collection`: categories such as Bao cao su, Gel bôi trơn, Dung dịch vệ sinh, Mùi thơm, Combo.
- `Shop by Feeling / Need`: Siêu mỏng, Kéo dài, Nhiều gel, Ấm nóng, Gai/gân, Không latex, Sensitive, Combo tiết kiệm.
- `Help me choose`: education links plus two big promo cards, for example `Không biết chọn loại nào?` and `Thử combo bán chạy`.

## PDP Adaptation

Use Huel PDP structure exactly where possible:

- Left media gallery: product pack, lifestyle-safe context, spec callouts, promo banner.
- Right sticky panel: rating, product title, descriptor, price chips, short benefit copy, variant picker, purchase option, accordions.

Replace Huel flavor rows with PlayAh variants:

- Variant type: size, texture, material, pack count, scent, sensation, or combo type.
- Quantity stepper: same `+`, selected `- 1 +` behavior.
- Badges: Bán chạy, Mới, Tiết kiệm, Không latex, Sensitive.
- Variant descriptions should be factual and short; avoid suggestive copy.

Replace nutrition facts with product specs:

- Material: latex, non-latex, silicone-safe, water-based.
- Pack count: 3, 10, 12, 24, combo pack.
- Texture/feel: smooth, dotted, ribbed, ultra thin, warming.
- Compatibility: condom-safe, toy-safe, sensitive-skin note.
- Usage guidance: how to use, storage, warning/disclaimer.
- Privacy: discreet package, invoice/label policy if PlayAh confirms it.

## Purchase Options

Huel `Subscribe & Save` maps to PlayAh:

- Combo tiết kiệm.
- Mua nhiều giảm giá.
- Bundle gel + bao cao su.
- Free shipping threshold.
- First-order/free gift if available.

Do not imply recurring subscription unless PlayAh actually supports subscription.

If subscription is unsupported, remove any delivery cadence selector and use one-time/bundle options only.

## Trust Section Adaptation

Huel science and testing maps to:

- Chất liệu và tiêu chuẩn sản phẩm.
- Hướng dẫn chọn đúng size/need.
- Hướng dẫn sử dụng an toàn.
- Giao hàng kín đáo.
- Đổi trả/chính sách hỗ trợ.
- Reviews verified by buyers.

## Cart Adaptation

Keep Huel's add-to-cart modal behavior:

- Added-to-cart centered modal.
- Free shipping progress.
- Mua kèm gel / combo / bestsellers / travel pack.
- Product facts on upsell cards.
- Sticky `Go to cart` or `Thanh toán` CTA.

Do not trigger real payment during mock implementation.

## Copy Tone

PlayAh tone should be discreet, helpful, confident, and non-cringe.

- Prefer practical copy over suggestive copy.
- Use product benefit language, not explicit language.
- Keep privacy and discreet shipping visible.
- Avoid medical claims unless PlayAh has approved copy.

## Reference-Only Huel Content

The following should not be copied into PlayAh as final content:

- Nutrition claims such as vitamins, minerals, protein, macros, calories.
- Huel prices and product names.
- Huel guarantees and loyalty naming.
- Huel press quotes and expert testimonials.
- Huel sustainability claims unless PlayAh has equivalent proof.

## Implementation Readiness Notes

- Final PlayAh assets, prices, product names, and policy copy can be mocked in the first implementation, but the data model must make those fields replaceable.
- Adult-product content must remain discreet: product-first imagery, neutral language, no explicit lifestyle imagery, and no unsupported medical claims.
- Every Huel nutrition-specific UI slot now has a PlayAh mapping above; if a new Huel section is discovered, add it to `Section Mapping Checklist` before implementation.
