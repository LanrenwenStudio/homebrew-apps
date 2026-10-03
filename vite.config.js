import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const SITE_ASSETS = [
  'logo.png',
  'logo.webp',
  'avatar.webp',
  'keylaunch-icon.webp',
  'englishcc-icon.webp',
  'pauseloop-icon.webp',
  'x-to-eagle-icon.webp',
];

function copyStaticAssets() {
  return {
    name: 'copy-static-assets',
    closeBundle() {
      const dest = resolve('dist/assets');
      mkdirSync(dest, { recursive: true });
      for (const file of SITE_ASSETS) {
        copyFileSync(resolve('assets', file), resolve(dest, file));
      }
      copyFileSync(resolve('_headers'), resolve('dist/_headers'));
    },
  };
}

export default defineConfig({
  plugins: [react(), copyStaticAssets()],
  server: {
    host: 'localhost',
    port: 8088,
  },
});
