cask "key-launch" do
  version "1.3.16"
  sha256 "a97367eeac63c53a334577f9c0266f7f1a5d664eb85dccbd9095b055f678a8e8"

  url "https://github.com/LanrenwenStudio/homebrew-apps/releases/download/key-launch-v#{version}/key-launch-#{version}.dmg"
  name "KeyLaunch"
  desc "Launch apps with global keyboard shortcuts"
  homepage "https://lanrenwenstudio.github.io/keylaunch-site/"

  depends_on :macos

  app "KeyLaunch.app"
end
