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

Each site is deployed independently to its existing Cloudflare Pages project when its directory changes.
