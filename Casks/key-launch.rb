cask "key-launch" do
  version "1.3.19"
  sha256 "590c6576c2521414666d579343a72135271b4ca7d8b74b2415fe6cf4bbaeaebc"

  url "https://github.com/LanrenwenStudio/homebrew-apps/releases/download/key-launch-v#{version}/key-launch-#{version}.dmg"
  name "KeyLaunch"
  desc "Launch apps with global keyboard shortcuts"
  homepage "https://lanrenwenstudio.github.io/keylaunch-site/"

  depends_on :macos

  app "KeyLaunch.app"
end
