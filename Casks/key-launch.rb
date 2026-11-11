cask "key-launch" do
  version "1.3.28"
  sha256 "8733b5148cb393b5e932c73f01c8364512d96c311eb9fa3c3f3809c3acfb82dd"

  url "https://github.com/LanrenwenStudio/homebrew-apps/releases/download/key-launch-v#{version}/key-launch-#{version}.dmg"
  name "KeyLaunch"
  desc "Launch apps with global keyboard shortcuts"
  homepage "https://keylaunch.lanrenwen.com/"

  depends_on :macos

  app "KeyLaunch.app"
end
