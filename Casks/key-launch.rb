cask "key-launch" do
  version "1.3.19"
  sha256 "bbeaeae0d0b5c2a15ebd848323d5433eab84669953cca3c952d302056424d22d"

  url "https://github.com/LanrenwenStudio/homebrew-apps/releases/download/key-launch-v#{version}/key-launch-#{version}.dmg"
  name "KeyLaunch"
  desc "Launch apps with global keyboard shortcuts"
  homepage "https://lanrenwenstudio.github.io/keylaunch-site/"

  depends_on :macos

  app "KeyLaunch.app"
end
