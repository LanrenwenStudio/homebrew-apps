cask "key-launch" do
  version "1.3.29"
  sha256 "143db3ef6094dd07c94a3398509de7753763f7f2afb3106e3ab14961dcbcde4e"

  url "https://github.com/LanrenwenStudio/homebrew-apps/releases/download/key-launch-v#{version}/key-launch-#{version}.dmg"
  name "KeyLaunch"
  desc "Launch apps with global keyboard shortcuts"
  homepage "https://keylaunch.lanrenwen.com/"

  depends_on :macos

  app "KeyLaunch.app"
end
