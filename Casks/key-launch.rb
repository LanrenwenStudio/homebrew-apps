cask "key-launch" do
  version "1.3.22"
  sha256 "365e02e4b5825d4df803afa3d9beb9a5faeef8d243023cb2903c4a7646ff7035"

  url "https://github.com/LanrenwenStudio/homebrew-apps/releases/download/key-launch-v#{version}/key-launch-#{version}.dmg"
  name "KeyLaunch"
  desc "Launch apps with global keyboard shortcuts"
  homepage "https://keylaunch.lanrenwen.com/"

  depends_on :macos

  app "KeyLaunch.app"
end
