cask "key-launch" do
  version "1.3.20"
  sha256 "864b717cb21e120c2b0f1ef8350c5d22b611248f462b8bc6de5422743ed68133"

  url "https://github.com/LanrenwenStudio/homebrew-apps/releases/download/key-launch-v#{version}/key-launch-#{version}.dmg"
  name "KeyLaunch"
  desc "Launch apps with global keyboard shortcuts"
  homepage "https://keylaunch.lanrenwen.com/"

  depends_on :macos

  app "KeyLaunch.app"
end
