cask "pause-loop" do
  version "1.0.7"
  sha256 "226c0807a0f8faf71687dff54052733f5d3389cfc6606b9262b3e49182867368"

  url "https://github.com/LanrenwenStudio/homebrew-apps/releases/download/pause-loop-v#{version}/pause-loop-#{version}.dmg"
  name "PauseLoop"
  desc "Build a healthier focus and break rhythm"
  homepage "https://lanrenwenstudio.github.io/pauseloop-site/"

  depends_on macos: :sonoma

  app "PauseLoop.app"
end
