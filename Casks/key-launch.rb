cask "key-launch" do
  version "1.3.15"
  sha256 "54c8b521eca32f8649e15f7a2accaee65056024b51fdee1d3589bf2698d5f0fc"

  url "https://github.com/LanrenwenStudio/homebrew-apps/releases/download/key-launch-v#{version}/key-launch-#{version}.dmg"
  name "KeyLaunch"
  desc "Launch apps with global keyboard shortcuts"
  homepage "https://lanrenwenstudio.github.io/keylaunch-site/"

  depends_on :macos

  app "KeyLaunch.app"
end
