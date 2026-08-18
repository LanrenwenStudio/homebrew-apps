import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://mousemidmodifier.lanrenwen.com',
  server: {
    port: 8093,
    host: '0.0.0.0'
  },
  devToolbar: {
    enabled: false
  }
});
