cask "key-launch" do
  version "1.3.26"
  sha256 "e12938c8380859e469feaffef31339cc4d5edfd69ee7139651d03a022d16389b"

  url "https://github.com/LanrenwenStudio/homebrew-apps/releases/download/key-launch-v#{version}/key-launch-#{version}.dmg"
  name "KeyLaunch"
  desc "Launch apps with global keyboard shortcuts"
  homepage "https://keylaunch.lanrenwen.com/"

  depends_on :macos

  app "KeyLaunch.app"
end
