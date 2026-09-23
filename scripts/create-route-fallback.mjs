import { copyFile } from 'node:fs/promises';

// GitHub Pages serves 404.html for deep links; BrowserRouter then renders the URL.
// Vercel uses its rewrite instead, so direct requests return HTTP 200 there.
await copyFile(new URL('../dist/index.html', import.meta.url), new URL('../dist/404.html', import.meta.url));
