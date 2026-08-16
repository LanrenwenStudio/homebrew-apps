import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://clipbar.lanrenwen.com',
  server: {
    port: 8092,
    host: '0.0.0.0'
  }
});
