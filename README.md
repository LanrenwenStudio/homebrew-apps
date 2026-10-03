# homebrew-apps

Homebrew tap, studio showcase, and product websites for Lanrenwen Studio apps and browser extensions.

🌐 **Official Site**: [https://lanrenwen.com](https://lanrenwen.com)

## Install via Homebrew

```bash
# Add Lanrenwen Studio apps tap
brew tap LanrenwenStudio/apps

# Install macOS Casks
brew install --cask LanrenwenStudio/apps/key-launch
brew install --cask LanrenwenStudio/apps/pause-loop
```

If macOS blocks an app on first launch, remove its quarantine attribute:

```bash
xattr -dr com.apple.quarantine /Applications/KeyLaunch.app
xattr -dr com.apple.quarantine /Applications/PauseLoop.app
```

## Included casks

- `key-launch`
- `pause-loop`

## Product websites

- `sites/keylaunch` → `keylaunch.lanrenwen.com`
- `sites/pauseloop` → `pauseloop.lanrenwen.com`
- `sites/highlight-share` → `highlightshare.lanrenwen.com`

Each site is built and deployed locally after explicit user authorization; directory changes and Git pushes do not deploy it. GitHub Actions must remain disabled. Cloudflare operations use `cf` only. The installed cf CLI does not support legacy Pages directory upload, so uploads to the existing Pages projects are currently blocked; do not use Wrangler or migrate production projects as a workaround.
