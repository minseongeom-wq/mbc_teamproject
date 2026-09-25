import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { routePaths, previewProductId } from './src/routes/routePaths.js';

// GitHub Pages serves files rather than rewriting SPA routes to index.html.
function pageRouteEntries() {
  let output;
  return {
    name: 'page-route-entries',
    apply: 'build',
    configResolved(config) { output = resolve(config.root, config.build.outDir); },
    async closeBundle() {
      const routes = Object.values(routePaths).flatMap(route => route.includes(':slug')
        ? ['mario', 'zelda', 'splatoon'].map(slug => route.replace(':slug', slug))
        : [route.replace(':id', previewProductId)]);
      for (const route of routes.filter(route => route !== '/')) {
        const directory = resolve(output, `.${route}`);
        await mkdir(directory, { recursive: true });
        await copyFile(resolve(output, 'index.html'), resolve(directory, 'index.html'));
      }
      // Other dynamic IDs still render through the Pages 404 fallback.
      await copyFile(resolve(output, 'index.html'), resolve(output, '404.html'));
    },
  };
}

export default defineConfig({ plugins: [react(), pageRouteEntries()] });
