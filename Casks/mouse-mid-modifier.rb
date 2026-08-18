cask "mouse-mid-modifier" do
  version "1.0.0"
  sha256 "9e9369f5b4994e756c21a7a668f13a8fc2c152cf860d9ebb9755d3de8077c54b"

  url "https://github.com/LanrenwenStudio/homebrew-apps/releases/download/mouse-mid-modifier-v#{version}/mouse-mid-modifier-#{version}.dmg"
  name "MouseMidModifier"
  desc "Remap mouse middle click to any keyboard key"
  homepage "https://mousemidmodifier.lanrenwen.com"

  depends_on macos: :ventura

  app "MouseMidModifier.app"
end
