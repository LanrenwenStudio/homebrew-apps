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
  refreshBoardStatus();
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

const rows = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"]
];

const layers = {
  none: {
    F: ["Finder", "find"],
    S: ["Safari", "safari"],
    M: ["Mail", "mail"],
    C: ["Calendar", "cal"],
    T: ["Terminal", "term"],
    N: ["Notes", "notes"],
    P: ["Photos", "photos"],
    G: ["Settings", "set"]
  },
  opt: {
    4: ["Calendar", "cal"],
    6: ["Notes", "notes"],
    8: ["Messages", "msg"],
    R: ["Music", "music"],
    T: ["Terminal", "term"],
    Y: ["Finder", "find"],
    U: ["Photos", "photos"],
    F: ["Finder", "find"]
  },
  cmd: {
    W: ["Safari", "safari"],
    T: ["Terminal", "term"],
    C: ["Calendar", "cal"],
    V: ["Notes", "notes"],
    S: ["Safari", "safari"]
  },
  ctrl: {
    C: ["Calendar", "cal"],
    M: ["Mail", "mail"],
    N: ["Notes", "notes"],
    P: ["Photos", "photos"]
  }
};

let activeLayer = "none";

function liveBoard() {
  return document.querySelector("#liveBoard");
}

function boardStatus() {
  return document.querySelector("#boardStatus");
}

function buildBoard() {
  const board = liveBoard();
  if (!board) return;
  board.replaceChildren();
  rows.forEach(row => {
    const rowEl = document.createElement("div");
    rowEl.className = "board-row";
    row.forEach(key => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cap";
      btn.dataset.k = key;
      const legend = document.createElement("span");
      legend.className = "legend";
      legend.textContent = key;
      const app = document.createElement("span");
      app.className = "app";
      btn.append(legend, app);
      btn.addEventListener("click", () => pressKey(key, btn));
      rowEl.append(btn);
    });
    board.append(rowEl);
  });
  paintLayer(activeLayer);
}

function paintLayer(layer) {
  activeLayer = layer;
  const map = layers[layer] || layers.none;
  liveBoard()?.querySelectorAll(".cap").forEach(btn => {
    const binding = map[btn.dataset.k];
    const chip = btn.querySelector(".app");
    btn.classList.toggle("is-bound", Boolean(binding));
    if (binding) {
      btn.dataset.tone = binding[1];
      btn.setAttribute("aria-label", `${btn.dataset.k} ${binding[0]}`);
      if (chip) chip.textContent = "";
    } else {
      delete btn.dataset.tone;
      btn.removeAttribute("aria-label");
      if (chip) chip.textContent = "";
    }
  });
  document.querySelectorAll(".layer").forEach(tab => {
    const on = tab.dataset.layer === layer;
    tab.classList.toggle("is-on", on);
    tab.setAttribute("aria-selected", on ? "true" : "false");
  });
  refreshBoardStatus();
}

function refreshBoardStatus() {
  const status = boardStatus();
  if (!status || status.dataset.locked === "1") return;
  status.textContent = t("board.idle", "按有 App 的键试试");
}

function pressKey(key, btn) {
  const binding = (layers[activeLayer] || layers.none)[key];
  if (!binding || !btn) return;
  liveBoard()?.querySelectorAll(".cap").forEach(el => el.classList.remove("is-pressed"));
  btn.classList.add("is-pressed");
  const status = boardStatus();
  if (status) {
    status.dataset.locked = "1";
    status.textContent = `${key} · ${binding[0]}`;
  }
  window.setTimeout(() => {
    btn.classList.remove("is-pressed");
    const next = boardStatus();
    if (next) {
      next.dataset.locked = "0";
      refreshBoardStatus();
    }
  }, 700);
}

document.querySelectorAll(".layer").forEach(tab => {
  tab.addEventListener("click", () => paintLayer(tab.dataset.layer));
});

buildBoard();


const cycleKey = document.querySelector("#cycleKey");
const cycleItems = [...document.querySelectorAll("#cycleStates li")];
let cycleIndex = 0;

function setCycle(index) {
  cycleIndex = (index + cycleItems.length) % cycleItems.length;
  cycleItems.forEach((item, i) => item.classList.toggle("is-on", i === cycleIndex));
  cycleKey?.classList.add("is-pressed");
  window.setTimeout(() => cycleKey?.classList.remove("is-pressed"), 160);
}

cycleKey?.addEventListener("click", () => setCycle(cycleIndex + 1));
cycleItems.forEach((item, i) => {
  item.addEventListener("click", () => setCycle(i));
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
