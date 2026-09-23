import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/mbc_teamproject/',
  plugins: [react()],
});
