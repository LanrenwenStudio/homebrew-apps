# KeyLaunch Website (Astro SSG)

Official product website for [KeyLaunch](https://apps.apple.com/app/id6759540480), a lightning-fast native macOS keyboard launcher.

Detailed design system, interactive simulator rules, and multi-language specifications are documented in [SPECS.md](./SPECS.md).

## Development

```bash
# Start local dev server (port 8089, LAN accessible)
npm run dev
```

## Production Build
Production builds require explicit user release/deployment authorization.


```bash
npm run build
```

## Deploy to Cloudflare Pages

Deploy locally through `cf` only after explicit authorization. The installed cf CLI does not support legacy Pages directory upload, so uploading `dist/` to the existing `keylaunch` Pages project is currently blocked. Do not use Wrangler, enable GitHub Actions or migrate the production project automatically.
