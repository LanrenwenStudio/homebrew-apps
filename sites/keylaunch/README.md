# KeyLaunch Website (Astro SSG)

Official product website for [KeyLaunch](https://apps.apple.com/app/id6759540480), a lightning-fast native macOS keyboard launcher.

Detailed design system, interactive simulator rules, and multi-language specifications are documented in [SPECS.md](./SPECS.md).

## Development

```bash
# Start local dev server (port 8089, LAN accessible)
npm run dev
```

## Production Build

```bash
npm run build
```

## Deploy to Cloudflare Pages

```bash
npx wrangler pages deploy dist --project-name keylaunch --branch main --commit-dirty=true
```
