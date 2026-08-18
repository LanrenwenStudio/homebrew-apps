cask "mouse-mid-modifier" do
  version "1.0.0"
  sha256 "8c55aa5ad48446d8a8c9559f49986ceee06069d8142282c7a8ce88d493e91187"

  url "https://github.com/LanrenwenStudio/homebrew-apps/releases/download/mouse-mid-modifier-v#{version}/mouse-mid-modifier-#{version}.dmg"
  name "MouseMidModifier"
  desc "Remap mouse middle click to any keyboard key"
  homepage "https://lanrenwen.com"

  depends_on macos: ">= :ventura"

  app "MouseMidModifier.app"
end
