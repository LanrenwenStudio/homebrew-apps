cask "key-launch" do
  version "1.3.25"
  sha256 "3c92fb06e8da737ddce0d1567bd5e234e74ddc83461afe06864a26e501167a15"

  url "https://github.com/LanrenwenStudio/homebrew-apps/releases/download/key-launch-v#{version}/key-launch-#{version}.dmg"
  name "KeyLaunch"
  desc "Launch apps with global keyboard shortcuts"
  homepage "https://keylaunch.lanrenwen.com/"

  depends_on :macos

  app "KeyLaunch.app"
end
