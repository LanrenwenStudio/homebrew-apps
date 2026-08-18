import { translations } from "./translations.js";

let currentLang = localStorage.getItem("mouse_lang") || (navigator.language.startsWith("zh") ? "zh-Hans" : "en-US");
if (!translations[currentLang]) currentLang = "zh-Hans";

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("mouse_lang", lang);
  document.documentElement.lang = lang;
  
  const dict = translations[lang] || translations["zh-Hans"];
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const key = el.getAttribute("data-i18n-html");
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  const langBtn = document.getElementById("langBtn");
  if (langBtn) {
    langBtn.textContent = lang === "zh-Hans" ? "🌐 English" : "🌐 简体中文";
  }
}

// Interactive Simulator State
let currentKey = "Right Control";
let isCapturing = false;
const availableKeys = ["Right Control", "Left Control", "Space", "Return", "Delete", "Left Command", "Escape"];
let keyIndex = 0;

function triggerMiddleClickVisual() {
  const wheelBtn = document.getElementById("mouseWheelBtn");
  const rays = document.getElementById("mouseRays");
  const statusCapsule = document.getElementById("statusCapsule");
  const statusText = document.getElementById("statusText");

  if (wheelBtn) wheelBtn.classList.add("active");
  if (rays) rays.classList.add("visible");
  
  if (statusCapsule && statusText) {
    statusCapsule.classList.add("captured");
    const dict = translations[currentLang] || translations["zh-Hans"];
    statusText.textContent = dict["badge.status"] || "已捕获";
  }

  setTimeout(() => {
    if (wheelBtn) wheelBtn.classList.remove("active");
    if (rays) rays.classList.remove("visible");
  }, 180);

  setTimeout(() => {
    if (statusCapsule && statusText) {
      statusCapsule.classList.remove("captured");
      const dict = translations[currentLang] || translations["zh-Hans"];
      statusText.textContent = dict["badge.listening"] || "监听中";
    }
  }, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  applyLanguage(currentLang);

  // Language Toggle
  const langBtn = document.getElementById("langBtn");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      applyLanguage(currentLang === "zh-Hans" ? "en-US" : "zh-Hans");
    });
  }

  // Homebrew Copy
  const copyBtn = document.getElementById("copyBrewBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const code = "brew install --cask mouse-mid-modifier";
      try {
        await navigator.clipboard.writeText(code);
        const originalText = copyBtn.textContent;
        const dict = translations[currentLang] || translations["zh-Hans"];
        copyBtn.textContent = dict["brew.copied"] || "已复制";
        setTimeout(() => {
          copyBtn.textContent = dict["brew.copy"] || "复制";
        }, 2000);
      } catch (err) {
        console.error("Copy failed", err);
      }
    });
  }

  // Interactive Mouse Wheel Button
  const wheelBtn = document.getElementById("mouseWheelBtn");
  if (wheelBtn) {
    wheelBtn.addEventListener("click", (e) => {
      e.preventDefault();
      triggerMiddleClickVisual();
    });
    // 监听真实鼠标中键按下
    wheelBtn.addEventListener("auxclick", (e) => {
      if (e.button === 1) {
        e.preventDefault();
        triggerMiddleClickVisual();
      }
    });
  }

  // 网页上全局监听真实鼠标中键点击演示
  window.addEventListener("auxclick", (e) => {
    if (e.button === 1) {
      triggerMiddleClickVisual();
    }
  });

  // Cycle Key Mapping on Box Click
  const keyDisplayBox = document.getElementById("keyDisplayBox");
  const keyTextEl = document.getElementById("targetKeyText");
  if (keyDisplayBox && keyTextEl) {
    keyDisplayBox.addEventListener("click", () => {
      keyIndex = (keyIndex + 1) % availableKeys.length;
      currentKey = availableKeys[keyIndex];
      keyTextEl.textContent = currentKey;
      triggerMiddleClickVisual();
    });
  }

  // Reset Button
  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn && keyTextEl) {
    resetBtn.addEventListener("click", () => {
      currentKey = "Right Control";
      keyIndex = 0;
      keyTextEl.textContent = currentKey;
    });
  }
});
