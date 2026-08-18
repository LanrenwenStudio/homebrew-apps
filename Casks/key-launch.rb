cask "key-launch" do
  version "1.3.18"
  sha256 "c2ea0cfb0be5235e68de54692ceddf3e479c8d56141d2f1a8f404678e0eb8ba7"

  url "https://github.com/LanrenwenStudio/homebrew-apps/releases/download/key-launch-v#{version}/key-launch-#{version}.dmg"
  name "KeyLaunch"
  desc "Launch apps with global keyboard shortcuts"
  homepage "https://lanrenwenstudio.github.io/keylaunch-site/"

  depends_on :macos

  app "KeyLaunch.app"
end
