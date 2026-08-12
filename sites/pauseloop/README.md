# PauseLoop Website

Official website for [PauseLoop](https://apps.apple.com/app/id6790401487?mt=12), a native focus and break rhythm for macOS.

The site is a dependency-free static build using HTML, CSS, and JavaScript. It includes localized content and product screenshots for English, Simplified Chinese, Traditional Chinese, Japanese, and Korean.

## Local preview

```bash
python3 -m http.server 8080
```

Open <http://localhost:8080>.

## Structure

- `index.html` — semantic page structure and SEO metadata
- `styles.css` — responsive visual system and motion
- `translations.js` — localized website copy
- `app.js` — locale selection, screenshot switching, and scroll effects
- `assets/` — optimized product screenshots and the PauseLoop icon

## Deployment

The production site is deployed from `sites/pauseloop` to the existing Cloudflare Pages project by the monorepo workflow.
