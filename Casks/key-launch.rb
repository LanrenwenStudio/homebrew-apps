cask "key-launch" do
  version "1.3.27"
  sha256 "a23e25475aeaaf7d1eac668135bc332ad4259e5ce399a7adf65bc6e86c9022b1"

  url "https://github.com/LanrenwenStudio/homebrew-apps/releases/download/key-launch-v#{version}/key-launch-#{version}.dmg"
  name "KeyLaunch"
  desc "Launch apps with global keyboard shortcuts"
  homepage "https://keylaunch.lanrenwen.com/"

  depends_on :macos

  app "KeyLaunch.app"
end
