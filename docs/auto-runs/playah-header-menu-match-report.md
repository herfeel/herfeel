# PlayAh Header / MegaMenu Match Report

## Previous Issues

- top strip sai height/spacing, chữ quá dày và thiếu icon rhythm.
- header nav khác Huel, right utility dùng ký hiệu khó hiểu.
- menu không đúng layout Huel open-state.
- cards vertical thay vì landscape.
- ảnh marketplace banner quá xấu, bị crop chữ và phóng to.
- left rail/right grid sai nhịp, panel quá cao và không premium.

## Fixed

- top promo strip cao hơn, đen rõ, text uppercase mono-like, item spacing rộng, có icon nhỏ và pause control gọn.
- closed header giữ white row 56px, logo lớn, nav gọn còn `Mua sắm`, `Chăm sóc cá nhân`, `Vì sao PlayAh?`, `Hướng dẫn`.
- desktop MegaMenu full-width, attached dưới header, overlay blur/dim phía sau, border/shadow nhẹ.
- left rail 300-320px sát viewport trái, warm off-white, active tab rõ, có `Ưu đãi kín đáo` và `Mua tất cả`.
- right content chuyển sang 4 landscape cards cao 260-276px, gap 20-24px, radius 8px.
- ảnh/banner marketplace bị loại khỏi MegaMenu; thay bằng packshot/placeholder product-led sạch, nhiều whitespace.
- tab `Mua theo danh mục`, `Mua theo nhu cầu`, `Gợi ý chọn nhanh` đều dùng card landscape.
- interaction/motion giữ fade + slide, Escape close, outside close, chevron rotate, active underline, hover card/arrow nhẹ.
- mobile drawer giữ cấu trúc accordion: `Mua sắm`, `Nhu cầu`, `Hướng dẫn`, `Hỗ trợ`.

## Screenshot Paths

- `docs/auto-runs/screenshots/playah-header-closed-after-1440.png`
- `docs/auto-runs/screenshots/playah-megamenu-category-after-1440.png`
- `docs/auto-runs/screenshots/playah-megamenu-goal-after-1440.png`
- `docs/auto-runs/screenshots/playah-megamenu-help-after-1440.png`
- `docs/auto-runs/screenshots/playah-megamenu-card-hover-after-1440.png`
- `docs/auto-runs/screenshots/playah-mobile-header-after-390.png`

## Remaining Differences

- Huel dùng packshot/photo thật; PlayAh vẫn thiếu isolated product assets nên MegaMenu dùng premium placeholder/packshot CSS.
- Vietnamese labels dài hơn nên strip/nav vẫn dày chữ hơn Huel một chút.
- Goal cards dùng gradient/abstract product-led visuals, chưa thể giống photo-real Huel.
- Existing Home content bên dưới vẫn còn banner marketplace cũ; task này chỉ sửa Header/MegaMenu.

## Checks

- `npm run lint` pass.
- `npm run build` pass after sandbox escalation for Turbopack internal bind permission.
- Screenshot QA captured from `next start -p 3001`.

## Next Step

Có thể bắt đầu Collection page sau khi review screenshot header/menu này.
