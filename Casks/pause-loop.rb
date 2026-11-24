cask "pause-loop" do
  version "1.0.8"
  sha256 "18d9a08d5c510f039a0beaeabf7cb26adabfa71b265bf5be434e47a128b62c09"

  url "https://github.com/LanrenwenStudio/homebrew-apps/releases/download/pause-loop-v#{version}/pause-loop-#{version}.dmg"
  name "PauseLoop"
  desc "Build a healthier focus and break rhythm"
  homepage "https://lanrenwenstudio.github.io/pauseloop-site/"

  depends_on macos: :sonoma

  app "PauseLoop.app"
end
