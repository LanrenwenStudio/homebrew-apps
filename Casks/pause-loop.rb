cask "pause-loop" do
  version "1.0.3"
  sha256 "5b55322199a6c21128664871c041ca7807591b67380230b708ce81412e762419"

  url "https://github.com/LanrenwenStudio/homebrew-apps/releases/download/pause-loop-v#{version}/pause-loop-#{version}.dmg"
  name "PauseLoop"
  desc "Build a healthier focus and break rhythm"
  homepage "https://lanrenwenstudio.github.io/pauseloop-site/"

  depends_on macos: :sonoma

  app "PauseLoop.app"
end
