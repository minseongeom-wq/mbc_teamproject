# Splatoon

- Route: `/ip/splatoon`
- Design: https://www.figma.com/design/e0m4kzzInBhdHR8Hrp5jPN/?node-id=2492-12432
- `SplatoonContent.jsx` reuses shared Navigation, NintendoFooter and useDesignScale.
- `SplatoonContent.jsx` includes the layered Figma artwork and its internal scene component. All styles are consolidated in `style.css`.
- `assets/` contains original image/SVG exports from the linked Figma node (downloaded 2026-09-23). Assets are local and do not depend on expiring Figma URLs.
- The Figma SplatoonK font was not provided. The project Korean display font, DeltaGlassKR, is used instead.
- The design's video areas use the exported still images; no video source was supplied.
- Gameplay stills were exported from nodes `2492:12481`, `2563:19476`, and `2492:12482`.
- The desktop composition scales to the viewport; there is no separate mobile layout. Weapon cards open an accessible native image dialog; related-information links use existing project routes.

## Local review

- Run `npm run dev` from the project root and open `/ip/splatoon` at the URL printed by Vite (normally `http://127.0.0.1:5173/ip/splatoon`).
- Check the nine artwork sections, all seven weapon previews, both hair preview buttons, Escape/close-button dismissal, and related-information links.
- At narrow viewport widths, check the scaled desktop composition and horizontal overflow. A separate mobile layout was intentionally removed.
- Both hair buttons currently open the same image preview; they do not change the hairstyle. No filtering control is implemented.
- Keep `SplatoonK` and the source video files as outstanding design assets; neither is included in this folder.
- Scoped scene styles require the `.splatoon-content` ancestor. The existing `:has(.splatoon-content)` layout overrides apply only while this content is mounted.

## Validation (2026-09-23)

- ESLint and whitespace checks include all source files, including untracked additions.
- Edge: all 86 image assets decode; 7 weapon previews and 2 hair previews open; Escape and the close button dismiss the dialog.
- Checked 1440px and 390px viewports: all sections render, with no horizontal page overflow or runtime errors. Text scales down on narrow screens; this is not a dedicated mobile layout.
- Information-card destinations remain the existing project routes. The Mario page retains its shared header.
- The transparent weapon-selection decoration ignores pointer events so it cannot block the cards below it.
- Default `npm run build` currently exits with native status `0xC0000409` on this Windows machine. In-memory builds and builds that skip clearing the existing output directory succeed, which points to the output cleanup stage rather than a Splatoon compilation error. No shared build configuration was changed.
- `npm run build -- --outDir <new temporary directory>` and the existing postbuild script succeed. Do not delete or reset existing project files to work around the default build failure; share the cleanup issue with the team lead.
