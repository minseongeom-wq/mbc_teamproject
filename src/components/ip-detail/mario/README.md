# Mario content

`MarioContent` retains its default export and takes no props. The existing Mario page imports this component; no route or page changes are included here.

The component includes the hero, character selector, five worlds, power-ups, and store link. CSS selectors are scoped to `mario-content`. Local assets are bundled by Vite and support deployment under a base path. Asset provenance is recorded in `assets/SOURCES.md`.

Run `npm run dev` and open `/ip/mario`. Check all six character buttons, previous/next wraparound, world anchors, the store link, and mobile layouts. There is no filter in this component.

Integration note for the team lead: the full-width layout, navigation variant, and shared footer are owned by the common layout. Existing local changes to `src/components/layout/BasicPageLayout.jsx` and `.css` are intentionally excluded from the Mario commit. Without those changes, this component renders within the existing shared content container. Character selections other than Mario use the available Figma card artwork rather than new full-body artwork.
