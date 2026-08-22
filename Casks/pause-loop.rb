cask "pause-loop" do
  version "1.0.2"
  sha256 "ae83fd0fbc66902d33b7fe829ae6b0969311eb4be99f76ae79566829f770166c"

  url "https://github.com/LanrenwenStudio/homebrew-apps/releases/download/pause-loop-v#{version}/pause-loop-#{version}.dmg"
  name "PauseLoop"
  desc "Build a healthier focus and break rhythm"
  homepage "https://lanrenwenstudio.github.io/pauseloop-site/"

  depends_on macos: :sonoma

  app "PauseLoop.app"
end
