cask "key-launch" do
  version "1.3.21"
  sha256 "6b31f6f108e7bcc48e37d8c4ae7cf8f959346f10dc56893cb9b1d1d0ffca42d2"

  url "https://github.com/LanrenwenStudio/homebrew-apps/releases/download/key-launch-v#{version}/key-launch-#{version}.dmg"
  name "KeyLaunch"
  desc "Launch apps with global keyboard shortcuts"
  homepage "https://keylaunch.lanrenwen.com/"

  depends_on :macos

  app "KeyLaunch.app"
end
