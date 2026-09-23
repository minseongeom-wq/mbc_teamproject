# Basic page routing

- `App.jsx` registers public basic screens; `main.jsx` supplies BrowserRouter with Vite's base URL.
- Shared route paths live in `components/common/navigation/navigationLinks.js`.
- `pages/<feature>/*Page.jsx` composes the matching `components/<feature>/*Content.jsx`.
- `components/common/basic-page/FeatureOverview.jsx` provides the starter layout. Static copy is read through `services/basicPageService.js`.
- `components/layout/BasicPageLayout.jsx` supplies the shared Navigation and footer for the new pages. Home keeps its existing layout.
- Login, signup, payment, profile and inquiry screens are placeholders only. They do not authenticate, charge, save or expose account data. Add authentication/authorization before implementing those features.
- `admin` files are prepared but deliberately not imported or registered. `/admin` and its children resolve to NotFoundPage.
- Vercel rewrites deep links to index.html; GitHub Pages uses the generated 404.html fallback (GitHub returns HTTP 404 even though the app renders the correct route).
- The `sample-*` routes linked from list screens are explicit page previews, not actual records.
