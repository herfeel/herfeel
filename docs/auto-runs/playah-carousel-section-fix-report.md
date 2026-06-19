# PlayAh Carousel Section Fix Report

## Scope

- Section fixed: Home editorial/testimonial-style carousel under heading `Được chọn cho những trải nghiệm tinh tế hơn`.
- Implementation task: scoped Home section refinement only. No Shop/PDP/Cart/Checkout changes.

## Why The Old Section Was Weak

- Cards used large `portrait` motif placeholders, so the section looked unfinished and less premium.
- Overlay was a basic bottom gradient, not the Huel-style glass/blur panel.
- Dots were decorative and arrows were missing, so the section did not read as a real carousel.
- Card sizing/spacing was smaller and flatter than the Huel social proof section.

## Files Changed

- `src/features/home/components/home-page.tsx`
  - Kept the Home page as a Server Component.
  - Replaced the inline review card row with a dedicated carousel component.
  - Tuned section padding, heading scale, subcopy width, and left axis.
- `src/features/home/components/home-editorial-carousel.tsx`
  - Added a narrow Client Component for scroll-snap carousel behavior.
  - Added active dots, circular arrows, disabled arrow opacity, hover image scale, and glass overlay.
- `src/features/home/components/home-visual.tsx`
  - Added `imageSizes` support.
  - Improved abstract fallback visuals with subtle texture when no approved image exists.
- `src/data/mock/home.ts`
  - Replaced avatar/person-placeholder carousel data with ambassador/editorial/product/trust cards.
- `src/app/globals.css`
  - Added carousel scrollbar hiding, scroll padding, and shared hover timing.
- `public/images/playah/home/editorial/playah-ez-collab-facebook.jpg`
  - Added local image downloaded from the public PlayAh Facebook post `og:image`.

## Image Replacement

- Removed giant avatar/person silhouette placeholder usage from carousel data.
- Used a PlayAh official Facebook visual for `Saabirose` and `7Dnight` crops.
- Used existing PlayAh product imagery for `24K.Right` / Giant Invisible product-led card.
- Kept abstract/product-led fallback only for the discreet-shopping trust card where no clean person/product image was available.

## Card Data Now Includes

- `Saabirose` — role: `Đại sứ PlayAh`; image: PlayAh EZ collab Facebook visual.
- `7Dnight` — role: `Đại sứ PlayAh`; image: PlayAh EZ collab Facebook visual.
- `24K.Right` — role: `Đại sứ PlayAh`; image: existing PlayAh Giant Invisible product visual.
- `Chọn kín đáo` — role: `Gợi ý mua sắm`; abstract discreet/product block visual.
- `Thông tin rõ` — role: `Tiêu chí sản phẩm`; existing PlayAh gel/water visual.

Notes:

- Overlay body text is editorial descriptor copy, not quoted as real customer review.
- No celebrity review or endorsement quote was invented.

## Interactions Added

- Horizontal scroll-snap carousel.
- Arrow buttons scroll one card at a time.
- Active dot reflects nearest visible card.
- Dots are clickable.
- Disabled arrows show reduced opacity.
- Card hover scales image/visual and lifts the glass overlay slightly.
- Mobile uses wide horizontal cards with next-card peek.

## Local Self-Check

- Local dev server: available at `http://localhost:3000` from an existing Next dev process.
- Chrome DevTools Protocol QA completed for:
  - Desktop `1440x1000`
  - Tablet `820x920`
  - Mobile `390x844`
- Screenshots saved:
  - `docs/auto-runs/screenshots/playah-carousel-desktop.png`
  - `docs/auto-runs/screenshots/playah-carousel-desktop-hover.png`
  - `docs/auto-runs/screenshots/playah-carousel-tablet.png`
  - `docs/auto-runs/screenshots/playah-carousel-mobile.png`
- Arrow click check: next arrow moved carousel to active dot/card 2.
- Console: no runtime errors observed. Next emitted LCP warnings during forced section-in-viewport screenshots; this is from the QA scroll position, not a first-load Home regression.

## Lint / Build

- `npm run lint`: pass.
- `npm run build`: pass.

## Sources Used

- PlayAh official Facebook post: `https://www.facebook.com/PlayAh.Official/posts/688416657274972/`
- Downloaded image source: public `og:image` from that Facebook post.
- YouTube oEmbed used only to cross-check the EZ collab metadata: `https://www.youtube.com/watch?v=6bCPKS0VrWU`

## Still Not Perfect Versus Huel

- Huel uses clean high-resolution portrait photography per card. PlayAh currently has one square campaign composite reused with different crops for two ambassadors.
- The `24K.Right` card is product-led because a clean verified portrait/card image was not found in accessible public assets.
- Some PlayAh source imagery still includes marketplace-style text; future final assets should be cleaner campaign/portrait crops.
