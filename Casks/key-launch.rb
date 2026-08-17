cask "key-launch" do
  version "1.3.17"
  sha256 "e055daaf1b9bfa7b34c0061483714ab42bebfc658bc1e736f3e0cba93d0eafd0"

  url "https://github.com/LanrenwenStudio/homebrew-apps/releases/download/key-launch-v#{version}/key-launch-#{version}.dmg"
  name "KeyLaunch"
  desc "Launch apps with global keyboard shortcuts"
  homepage "https://lanrenwenstudio.github.io/keylaunch-site/"

  depends_on :macos

  app "KeyLaunch.app"
end
