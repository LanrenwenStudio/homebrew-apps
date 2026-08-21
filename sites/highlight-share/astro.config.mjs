import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://highlightshare.lanrenwen.com',
  integrations: [react()],
  server: {
    port: 8091,
    host: '0.0.0.0'
  },
  devToolbar: {
    enabled: false
  }
});
