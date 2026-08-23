cask "key-launch" do
  version "1.3.24"
  sha256 "b0b49c52ff50b0d05c0f00a9112941080f362b8d791b8b0a20a6f48e5429b805"

  url "https://github.com/LanrenwenStudio/homebrew-apps/releases/download/key-launch-v#{version}/key-launch-#{version}.dmg"
  name "KeyLaunch"
  desc "Launch apps with global keyboard shortcuts"
  homepage "https://keylaunch.lanrenwen.com/"

  depends_on :macos

  app "KeyLaunch.app"
end
