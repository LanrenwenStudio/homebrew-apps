document.documentElement.classList.add("js");

const supportedLanguages = ["zh-Hans", "zh-Hant", "en", "ja", "ko", "fr", "de", "es"];
const languageSelect = document.querySelector("#languageSelect");
const productShot = document.querySelector("#productShot");
const descriptionMeta = document.querySelector('meta[name="description"]');
const browserLocale = (navigator.languages?.[0] || navigator.language || "en-US").toLowerCase();

const baseText = {};
document.querySelectorAll("[data-i18n]").forEach(element => {
  baseText[element.dataset.i18n] ??= element.textContent;
});

const baseHTML = {};
document.querySelectorAll("[data-i18n-html]").forEach(element => {
  baseHTML[element.dataset.i18nHtml] ??= element.innerHTML;
});

const appStoreURL = "macappstore://itunes.apple.com/app/id6759540480?mt=12&l=us";

function detectedLanguage(locale) {
  if (/^zh-(tw|hk|mo|hant)/.test(locale)) return "zh-Hant";
  if (locale.startsWith("zh")) return "zh-Hans";
  return supportedLanguages.find(language => language !== "zh-Hans" && language !== "zh-Hant" && locale.startsWith(language)) || "en";
}

function savedLanguage() {
  try {
    const saved = localStorage.getItem("keylaunch.language");
    return supportedLanguages.includes(saved) ? saved : null;
  } catch {
    return null;
  }
}

function persistLanguage(language) {
  try {
    localStorage.setItem("keylaunch.language", language);
  } catch {
    // private browsing still applies the language for this page
  }
}

function currentStrings() {
  const lang = document.documentElement.lang || "zh-Hans";
  return lang === "zh-Hans" ? null : window.siteTranslations?.[lang] || window.siteTranslations.en;
}

function t(key, fallback) {
  return currentStrings()?.[key] ?? baseText[key] ?? fallback;
}

function applyLanguage(language, shouldPersist = false) {
  const resolvedLanguage = supportedLanguages.includes(language) ? language : "en";
  const strings = resolvedLanguage === "zh-Hans" ? null : window.siteTranslations[resolvedLanguage] || window.siteTranslations.en;

  document.documentElement.lang = resolvedLanguage;
  languageSelect.value = resolvedLanguage;

  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    element.textContent = strings?.[key] ?? baseText[key];
  });

  document.querySelectorAll("[data-i18n-html]").forEach(element => {
    const key = element.dataset.i18nHtml;
    element.innerHTML = strings?.[key] ?? baseHTML[key];
  });

  const usesChineseScreenshot = resolvedLanguage === "zh-Hans" || resolvedLanguage === "zh-Hant";
  if (productShot) {
    productShot.src = usesChineseScreenshot ? "assets/keylaunch-window-zh.webp" : "assets/keylaunch-window-en.webp";
    productShot.alt = strings?.["shot.alt"] ?? "键启应用界面，键盘上设置了多个 macOS 系统 App 快捷键";
  }
  const statsShot = document.querySelector("#statsShot");
  if (statsShot) {
    statsShot.alt = strings?.["shot.stats"] ?? "键启使用统计，按键按使用次数显示热力颜色";
  }

  document.title = strings?.["meta.title"] ?? "键启 · 把常用 App 放到键盘上";
  if (descriptionMeta) {
    descriptionMeta.content = strings?.["meta.description"] ?? "键启是一个原生 macOS 键盘启动器，把常用 App 放到你的键盘上，按键即可启动、切换或隐藏。";
  }
  document.querySelectorAll("[data-app-store-link]").forEach(link => {
    link.href = appStoreURL;
  });

  if (shouldPersist) persistLanguage(resolvedLanguage);
}

languageSelect.addEventListener("change", event => {
  applyLanguage(event.target.value, true);
});

applyLanguage(savedLanguage() || detectedLanguage(browserLocale));

let toastTimerRef = null;
function showToast(text) {
  let toastEl = document.querySelector(".toast");
  if (!toastEl) {
    toastEl = document.createElement("div");
    toastEl.className = "toast";
    toastEl.innerHTML = "<span></span>";
    document.body.appendChild(toastEl);
  }
  const spanEl = toastEl.querySelector("span");
  if (spanEl) spanEl.textContent = text;
  toastEl.classList.add("show");
  clearTimeout(toastTimerRef);
  toastTimerRef = setTimeout(() => toastEl.classList.remove("show"), 3200);
}

document.addEventListener("click", async (e) => {
  const copyBtn = e.target.closest("[data-copy]");
  if (copyBtn) {
    const textToCopy = copyBtn.dataset.copy;
    try {
      await navigator.clipboard.writeText(textToCopy);
      const textSpan = copyBtn.querySelector("[data-i18n='install.copy']") || copyBtn.querySelector("span") || copyBtn.querySelector("strong");
      const copiedText = t("install.copied", "已复制！");
      if (textSpan) {
        const originalText = textSpan.textContent;
        textSpan.textContent = copiedText;
        copyBtn.classList.add("copied");
        setTimeout(() => {
          textSpan.textContent = originalText;
          copyBtn.classList.remove("copied");
        }, 2000);
      }
      showToast(`${t("toast.prefix", "已复制：")}${textToCopy}`);
    } catch (err) {
      console.error("Failed to copy command:", err);
    }
    return;
  }

  const directBtn = e.target.closest("#downloadDmgBtn, a[href*='.dmg']");
  if (directBtn) {
    showToast(t("toast.dmgDownloaded", "已开始下载 key-launch-1.3.16.dmg，请查看浏览器下载记录或“下载”文件夹。"));
    const downloadUrl = directBtn.getAttribute("href") || "https://github.com/LanrenwenStudio/homebrew-apps/releases/download/key-launch-v1.3.16/key-launch-1.3.16.dmg";
    setTimeout(() => {
      window.location.href = downloadUrl;
    }, 100);
    return;
  }
});



const productFrame = document.querySelector(".product-shot-frame");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let tiltFrame = 0;

function resetProductTilt() {
  if (!productFrame) return;
  cancelAnimationFrame(tiltFrame);
  productFrame.classList.remove("is-tracking", "is-pressed");
  productFrame.style.setProperty("--tilt-x", "0deg");
  productFrame.style.setProperty("--tilt-y", "0deg");
  productFrame.style.setProperty("--shift-x", "0px");
  productFrame.style.setProperty("--shift-y", "0px");
}

if (productFrame) {
  productFrame.addEventListener("pointermove", event => {
    if (reduceMotion.matches || event.pointerType === "touch") return;
    const bounds = productFrame.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
    cancelAnimationFrame(tiltFrame);
    tiltFrame = requestAnimationFrame(() => {
      productFrame.classList.add("is-tracking");
      productFrame.style.setProperty("--tilt-x", `${(0.5 - y) * 6}deg`);
      productFrame.style.setProperty("--tilt-y", `${(x - 0.5) * 7}deg`);
      productFrame.style.setProperty("--shift-x", `${(x - 0.5) * 5}px`);
      productFrame.style.setProperty("--shift-y", `${(y - 0.5) * 5}px`);
    });
  });
  productFrame.addEventListener("pointerleave", resetProductTilt);
  productFrame.addEventListener("pointerdown", event => {
    if (!reduceMotion.matches && event.pointerType !== "touch") productFrame.classList.add("is-pressed");
  });
  productFrame.addEventListener("pointerup", () => productFrame.classList.remove("is-pressed"));
  productFrame.addEventListener("pointercancel", resetProductTilt);
  reduceMotion.addEventListener("change", resetProductTilt);
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
