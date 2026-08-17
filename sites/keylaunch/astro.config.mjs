import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://keylaunch.lanrenwen.com',
  server: {
    port: 8089,
    host: '0.0.0.0'
  },
  devToolbar: {
    enabled: false
  }
});
