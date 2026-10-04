# Cursor marketing reference for Knowledge landing

Captured 2026-10-04 using Chrome through `mcp__cua_repl`. Requested `https://cursor.com` redirected to the signed-in `/agents` app. A single focused Google search exposed the official `https://cursor.com/home` sitelink; all marketing measurements and screenshots are from that verified URL.

These are design references, not Knowledge screenshots. Keep Cursor branding, coding claims, testimonials, statistics, unrelated photos, and sample code out of the implementation. No app implementation was performed. No localhost access was attempted. No credentials/environment files were inspected. No remote videos or assets were downloaded.

## Values

| Element | Desktop value |
| --- | --- |
| Page | background #14120B; text #EDECEC |
| Card/footer | #1B1913; hover #201E18; raised #26241E; accent #F54E00 |
| Secondary/tertiary text | 60% / 40% of #EDECEC |
| Container | max-width 1300px; 20px minimum horizontal gutters |
| Header | fixed, 52px high; nav14px/21px regular; 15px horizontal nav hit padding |
| Font | CursorGothic on source; system font required by app AGENTS.md |
| Marketing base | 16px/24px regular |
| Hero top | 112px below header; h1 max-width658.32px |
| Hero h1 | 26px/32.5px regular; tracking -0.325px; bottom margin22.4px |
| Hero CTA | primary #EDECEC / #14120B; secondary #26241E / #EDECEC; pill radius; 43.27px high; 16px/16px regular; padding12.48px21.6px12.8px; 10px gap |
| Text block to hero media | 56px |
| Hero media | 1300×756 at1920 viewport,1225×720 at1280; 4px radius; no shadow |
| Section rhythm | 67.2px top/bottom standard padding |
| Feature outer card | 1300×715 at1920; #1B1913; 17.5px padding; 4px radius; 10px grid gap |
| Feature arrangement | one-third copy / two-thirds demo, alternate left/right; vertically centered copy |
| Feature title AND description | 22px/28.6px regular; title primary text and description60% opacity; no margin between title/description |
| Feature link | orange accent, placed below description |
| Smaller cards | three equal columns; 16px/24px heading; compact inset media |
| Closing CTA | centered72px/79.2px regular; tracking-2.16px; bottom22.4px; section bottom134.4px |
| Footer | five columns; headings/links14px/21px; padding67.2px20px30px |

At1920×1080 browser viewport, page content width1905 includes a15px scrollbar; 1300px container starts x302.5. Hero h1 starts y164; CTAs y251.39; media y350.66. At1280×717 default viewport, page content1265; container x20.

## Mobile375×812

Observed page content width360px (15px scrollbar), gutters18.75px, header56px, base15px/22.5px. Hero top padding105px, h1 24.375px/30.4688px, width322.5px, three lines in source. Secondary desktop CTA is hidden. Main navigation is replaced with mobile controls. Feature copy stacks above media and uses15px/22.5px. Standard section spacing63px. Footer wraps to narrower columns and padding63px18.75px. Desktop card pattern begins at source `lg` layout; mobile source DOM contains stacked feature rows.

## Assets and provenance

`sources.json` records screenshot source URL, creator, capture time, and media kind. Screenshots remain in `screenshots/` as JPEG files emitted by the browser; no generated illustrations or fake preview images were made.

`relevant-metadata.json` stores the observed @font-face declarations and exact public font URLs. Source regular font: `https://cursor.com/marketing-static/_next/static/media/CursorGothic_Regular-s.p.05-84umc_47y9.woff2?dpl=dpl_6do5ENNoLBrX8jH5ewChTERLrkpj`. No font download/reuse performed. System font is suitable for the actual app's existing scale.

`detail-metrics.json` has DOM-observed image/video URL inventory. Those assets are Cursor wallpaper/photos/avatars/logo animation and are unrelated to this product; no assets were collected for use in the app. Use the actual Knowledge application or its already-provenanced source media for product demonstration. A live `/app` iframe is a concrete product surface, provided it displays the real app and offers a direct open-workspace action.

## Screenshot inventory

- Full page desktop1920×1080, tablet1024×768, mobile375×812.
- Hero viewport screenshots at all three sizes.
- Desktop nav, primaryCTA, first feature, three-card section, closingCTA, and footer.
- Default1280×717 hero and full-page reference.

Full-page captures may include unloaded lower lazy image assets, and animated source demos progress between captures. They document authentic source rendering at capture time; they are not pixel-perfect claims about the implementation. Individual feature crop was visually verified. Local rendered implementation QA remains blocked by browser URL policy.

## Product adaptation

Keep the same calm compact header, restrained two-line left-aligned hero, large actual product surface, warm near-black cards, alternating copy/media sections, and compact footer. Use factual sections for URL import and connected sources, searchable notes/files, editable drafts, and a configured free-model agent. Labels should remain Library, Images, Notes, Files, Editorial. No invented customer counts, endorsements, or capabilities.
