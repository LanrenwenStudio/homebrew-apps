cask "pause-loop" do
  version "1.0.4"
  sha256 "f569f622cc91003edd7a4190a340d073aad040580af1695d80153ac8757fc2a4"

  url "https://github.com/LanrenwenStudio/homebrew-apps/releases/download/pause-loop-v#{version}/pause-loop-#{version}.dmg"
  name "PauseLoop"
  desc "Build a healthier focus and break rhythm"
  homepage "https://lanrenwenstudio.github.io/pauseloop-site/"

  depends_on macos: :sonoma

  app "PauseLoop.app"
end
