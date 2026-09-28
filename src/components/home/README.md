# Home implementation

Figma sources: [Desktop 1148:6399](https://www.figma.com/design/e0m4kzzInBhdHR8Hrp5jPN/?node-id=1148-6399), [Mobile 2156:6614](https://www.figma.com/design/e0m4kzzInBhdHR8Hrp5jPN/?node-id=2156-6614).

`HomePage.jsx` composes Hero, Game Discovery, What's New, Amiibo, Nintendo Picks, Daily Nintendo and its Banner. MainLayout supplies the existing Navigation / Dropdown / Footer. Their source files and routing are unchanged.

## Layout

| Desktop section | Start Y | Height |
|---|---:|---:|
| Hero | 0 | 1883 |
| Game Discovery | 1883 | 1080 |
| What's New | 2963 | 3173 |
| Amiibo | 6136 | 947 |
| Nintendo Picks | 7083 | 3985 |
| Daily Nintendo | 11068 | 1432 |
| Daily Nintendo Banner | 12500 | 675 |
| Shared Footer | 13175 | existing shared layout |

`home-design.css` records the source layer geometry, cropping, typography and nesting as scoped BEM CSS. Each image and text layer is rendered independently; whole-section screenshots are not used as page content. `home.css` handles only Home layout integration and behavior. Desktop composition is 1920px; below the project's 1024px desktop breakpoint the separate 360px mobile composition is used. Intermediate widths scale the appropriate source composition proportionally. No additional tablet design is invented.

Existing Common Pretendard, Pexel Grotesk and DeltaGlassKR font faces are reused. Design-token.md semantic token names are used with source values as fallbacks because `src/styles/variables.css` is not present in this checkout. Navigation remains 15px from the top, and Dropdown remains 10px below it. Opening Dropdown retains the common component's document-flow behavior.

## Behavior

- Desktop game selection changes the enlarged card and title; supports mouse and arrow keys.
- Play Solo / Play Together switches the displayed card selection.
- Mobile game cards support selection, arrow keys and horizontal drag.
- Mobile news retains the Figma horizontal arrangement with native touch scrolling.
- The Figma-named infinite amiibo track loops all 12 figures; hover pauses it and reduced-motion disables animation.
- Daily Nintendo had no existing slide/drag code, so its source composition stays static.

Assets and callsites are recorded in [ASSETS.md](./ASSETS.md). Home source assets are stored in `public/images/banners/home`; shared component assets remain in `public/images/common`.

## Verification and remaining differences

- Game Discovery update: re-read Figma 1148:6518 and refreshed the left/right controllers and center console shading using three individual layer exports. Console geometry, cards, text and existing interactions remain aligned with the source. Updated comparison and asset audit are saved under `reference/`.

- Edge browser screenshots were compared against Figma; mobile phone artwork omitted by the code response was exported from its exact layer, and the phone backing rotations and news line breaks were corrected.
- Desktop section coordinates and sizes, Footer start, image loading, game selection, keyboard/drag behavior, responsive overflow and common menu spacing are covered by `tests/home.spec.js`.
- Home tests: 6 passed. Existing `tests/common-ui.spec.js`: 6 passed.
- Local visual evidence: [reference/comparison.html](./reference/comparison.html), section PNGs and `reference/browser-report.json`.
- Shared Desktop Footer measures 1031.33px, compared with 1026px in Home Figma. The existing mobile Footer also differs from the separate 289px mobile Figma Footer; its internals are intentionally reused as requested.
- Two static news pixel effects are exported with the original Figma effect baked in. The central mobile Nintendo Today artwork is a static layer export; shader/video playback is not added.
- Browser font rasterization can differ slightly from Figma. Original draft text and spelling are preserved, including the Mario news card's draft copy.
- News arrow artwork has no defined destination in the supplied design; no new news route or fabricated destination is introduced.
