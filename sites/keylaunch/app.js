document.documentElement.classList.add("js");

const supportedLanguages = ["zh-Hans", "zh-Hant", "en", "ja", "ko"];
const languageSelect = document.querySelector("#languageSelect");
const metaDescription = document.querySelector('meta[name="description"]');
const ogDescMeta = document.querySelector('meta[property="og:description"]');

const browserLocale = (navigator.languages && navigator.languages[0]) || navigator.language || "en";
let currentLang = "zh-Hans";

if (supportedLanguages.includes(browserLocale)) {
  currentLang = browserLocale;
} else if (browserLocale.startsWith("zh")) {
  currentLang = browserLocale.includes("Hant") || browserLocale.includes("TW") || browserLocale.includes("HK") ? "zh-Hant" : "zh-Hans";
} else {
  const prefix = browserLocale.split("-")[0];
  if (supportedLanguages.includes(prefix)) {
    currentLang = prefix;
  }
}

// App SVG Icons
const appIcons = {
  raycast: `<svg viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#8B5CF6"/><rect x="8" y="8" width="8" height="8" rx="2.5" fill="#FF453A"/><rect x="20" y="8" width="8" height="8" rx="2.5" fill="#FF453A"/><rect x="8" y="20" width="8" height="8" rx="2.5" fill="#FF453A"/><rect x="20" y="20" width="8" height="8" rx="2.5" fill="#FF453A"/></svg>`,
  wechat: `<svg viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#07C160"/><path d="M15.5 10C11.358 10 8 12.91 8 16.5c0 2.012 1.05 3.82 2.688 5.01L10 24.5l3.375-1.688c.67.188 1.38.288 2.125.288.167 0 .332-.006.495-.018A5.92 5.92 0 0 1 16 21c0-3.314 3.134-6 7-6 .506 0 .996.048 1.467.137C23.635 12.18 19.866 10 15.5 10z" fill="#FFFFFF"/><path d="M23 16c-3.314 0-6 2.239-6 5s2.686 5 6 5c.594 0 1.163-.078 1.696-.222L27 27l-.696-2.088C27.915 23.97 29 22.58 29 21c0-2.761-2.686-5-6-5z" fill="#FFFFFF"/></svg>`,
  safari: `<svg viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#007AFF"/><circle cx="18" cy="18" r="13" fill="#FFFFFF"/><path d="M24 12l-3.5 8.5L12 24l3.5-8.5L24 12z" fill="#FF3B30"/><path d="M15.5 15.5l5 5" stroke="#FFFFFF" stroke-width="1.5"/></svg>`,
  netease: `<svg viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#D43C33"/><path d="M18 10a7 7 0 0 0-7 7c0 3.5 2.5 6 6 6.5V20c-1.5-.5-2.5-1.8-2.5-3.5a4 4 0 0 1 7.5-1.8l2.5-1.2A6.9 6.9 0 0 0 18 10z" fill="#FFFFFF"/></svg>`,
  obsidian: `<svg viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#6C31E3"/><path d="M18 7l9 9-4 13-10-3-4-10 9-9z" fill="#9353FF"/><path d="M18 7l5 9-6 13-4-10 5-12z" fill="#FFFFFF" fill-opacity="0.3"/></svg>`,
  iina: `<svg viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#FF9500"/><circle cx="18" cy="18" r="10" fill="#FFFFFF"/><polygon points="16,13 23,18 16,23" fill="#FF9500"/></svg>`,
  gdrive: `<svg viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#F1F5F9"/><path d="M14 9l-7 12 4 7 7-12-4-7z" fill="#0066DA"/><path d="M22 9H14l7 12h8l-7-12z" fill="#FFBA00"/><path d="M22 28H11l4-7h15l-8 7z" fill="#00AC47"/></svg>`,
  surge: `<svg viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#FFFFFF"/><path d="M7 24a11 11 0 0 1 22 0z" fill="url(#surgeDome)"/><defs><linearGradient id="surgeDome" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#38BDF8"/><stop offset="0.5" stop-color="#FB923C"/><stop offset="1" stop-color="#F43F5E"/></linearGradient></defs></svg>`,
  finder: `<svg viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#1C86EE"/><path d="M0 8a8 8 0 0 1 8-8h20a8 8 0 0 1 8 8v10H0V8z" fill="#63B8FF"/><path d="M12 15c0 1.5 1.5 2.5 3 2.5s3-1 3-2.5V11h-6v4zm9 0c0 1.5 1.5 2.5 3 2.5s3-1 3-2.5V11h-6v4z" fill="#1A2B4C"/><path d="M10 23c2.5 3 13.5 3 16 0" stroke="#1A2B4C" stroke-width="2.5" stroke-linecap="round"/><path d="M18 13v9" stroke="#1A2B4C" stroke-width="2" stroke-linecap="round"/></svg>`,
  ghostty: `<svg viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#0B132B"/><circle cx="14" cy="15" r="2.8" fill="#FFFFFF"/><circle cx="22" cy="15" r="2.8" fill="#FFFFFF"/><path d="M11 23l4-3-4-3m6 6h6" stroke="#38BDF8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  zed: `<svg viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#18181B"/><rect x="8" y="8" width="20" height="20" rx="4" stroke="#FFFFFF" stroke-width="1.5"/><path d="M12 13h12l-12 10h12" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  xcode: `<svg viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#147EFB"/><path d="M12 24l12-12m-8-2l10 10" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/><path d="M22 9l5 5-2 2-5-5 2-2z" fill="#E2E8F0"/></svg>`,
  chrome: `<svg viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#FFFFFF"/><circle cx="18" cy="18" r="14" fill="#EA4335"/><path d="M18 18l7.5-13A14 14 0 0 1 32 18H18z" fill="#FBBC05"/><path d="M18 18l-6.5 11.26A14 14 0 0 1 4 18h14z" fill="#34A853"/><circle cx="18" cy="18" r="6.5" fill="#FFFFFF"/><circle cx="18" cy="18" r="5" fill="#1A73E8"/></svg>`,
  obs: `<svg viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#1E293B"/><rect x="8" y="11" width="14" height="14" rx="3" fill="#38BDF8"/><path d="M22 15l6-3v12l-6-3v-6z" fill="#38BDF8"/><circle cx="15" cy="18" r="2.5" fill="#1E293B"/></svg>`,
  chatgpt: `<svg viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#FFFFFF"/><path d="M26.8 16.2a5.5 5.5 0 0 0-.5-4.4 5.6 5.6 0 0 0-5-2.7 5.3 5.3 0 0 0-2.3.5 5.5 5.5 0 0 0-4.2-1.9 5.6 5.6 0 0 0-5.3 3.8 5.5 5.5 0 0 0-3.3 2.4 5.6 5.6 0 0 0 .7 6.3 5.5 5.5 0 0 0 .5 4.4 5.6 5.6 0 0 0 5 2.7 5.3 5.3 0 0 0 2.3-.5 5.5 5.5 0 0 0 4.2 1.9 5.6 5.6 0 0 0 5.3-3.8 5.5 5.5 0 0 0 3.3-2.4 5.6 5.6 0 0 0-.7-6.3zm-8.8 11.3a4.2 4.2 0 0 1-2.7-.9l3-1.7a.7.7 0 0 0 .4-.6v-4.3l3.6 2.1v4a4.3 4.3 0 0 1-4.3 1.4zm-8.3-4.2a4.2 4.2 0 0 1-.5-2.8l3 1.7a.7.7 0 0 0 .7 0l3.7-2.1v4.2l-3.5 2a4.3 4.3 0 0 1-3.4-3zm-1.8-8.8a4.2 4.2 0 0 1 2.2-1.9v3.5a.7.7 0 0 0 .4.6l3.7 2.1-3.6 2.1-3.5-2a4.3 4.3 0 0 1 .8-4.4zm12.3-1.4l-3.7 2.1-3.6-2.1 3.5-2a4.3 4.3 0 0 1 6.1 1.5l-2.3 1.3zm6.5 5.2a4.2 4.2 0 0 1 .5 2.8l-3-1.7a.7.7 0 0 0-.7 0l-3.7 2.1v-4.2l3.5-2a4.3 4.3 0 0 1 3.4 3zm-2.4 4.5l-3.7-2.1 3.6-2.1 3.5 2a4.3 4.3 0 0 1-6.1-1.5l2.3-1.3l.4.5zm-5.7-1.3l-3.1-1.8 3.1-1.8 3.1 1.8-3.1 1.8z" fill="#000000"/></svg>`
};

// Active Mapped Key Dictionary
const appDictionary = {
  W: { app: "微信 WeChat", iconKey: "wechat", desc: "即时通讯与社群沟通" },
  E: { app: "Safari 浏览器", iconKey: "safari", desc: "Apple 原生极速浏览器" },
  Y: { app: "音乐", iconKey: "netease", desc: "音乐流媒体播放" },
  O: { app: "Obsidian", iconKey: "obsidian", desc: "双链笔记与本地知识库" },
  P: { app: "IINA 播放器", iconKey: "iina", desc: "macOS 现代全能视频播放器" },
  A: { app: "Google Drive", iconKey: "gdrive", desc: "云端硬盘与文件同步" },
  D: { app: "Surge 网络", iconKey: "surge", desc: "高级网络调试与代理引擎" },
  F: { app: "Finder 访达", iconKey: "finder", desc: "macOS 原生文件管理器" },
  G: { app: "Ghostty 终端", iconKey: "ghostty", desc: "极速 GPU 加速现代终端" },
  X: { app: "Xcode", iconKey: "xcode", desc: "Apple 官方集成开发环境" },
  C: { app: "Google Chrome", iconKey: "chrome", desc: "全功能网络浏览器" }
};

let currentModifier = "Option";
let activeKeyChar = "F";
let isModalOpen = false;
let isStatsOpen = false;
let isAdjustMode = false;
let adjustSourceKey = null;

const liveAppBadge = document.querySelector("#liveAppBadge");
const liveAppName = document.querySelector("#liveAppName");
const liveAppTag = document.querySelector("#liveAppTag");
const liveAppDesc = document.querySelector("#liveAppDesc");
const liveKeyHint = document.querySelector("#liveKeyHint");

// Fake Modal Elements
const fakeAppModal = document.querySelector("#fakeAppModal");
const fakeModalStatusText = document.querySelector("#fakeModalStatusText");
const fakePingPongTip = document.querySelector("#fakePingPongTip");
const fakeTitleIcon = document.querySelector("#fakeTitleIcon");
const fakeWindowTitle = document.querySelector("#fakeWindowTitle");
const fakeWindowBody = document.querySelector("#fakeWindowBody");
const fakeTrafficClose = document.querySelector("#fakeTrafficClose");

// Stats Modal Elements
const statsModal = document.querySelector("#statsModal");
const statsCloseBtn = document.querySelector("#statsCloseBtn");
const openStatsBtn = document.querySelector("#openStatsBtn");
const bentoStatsBtn = document.querySelector("#bentoStatsBtn");
const statsClearBtn = document.querySelector("#statsClearBtn");
const statsTotalCount = document.querySelector("#statsTotalCount");
const statsSummaryText = document.querySelector("#statsSummaryText");

function getModifierSymbol(mod) {
  if (mod === "Option") return "⌥";
  if (mod === "Command") return "⌘";
  if (mod === "Control") return "⌃";
  return "⌥";
}

// Generate rich simulated app UI inside the fake window body
function renderFakeAppContent(char, data) {
  if (!fakeWindowBody) return;
  const modSymbol = getModifierSymbol(currentModifier);

  switch (data.iconKey) {
    case "finder":
      fakeWindowBody.innerHTML = `
        <div class="fake-finder-layout">
          <div class="fake-finder-sidebar">
            <div class="fake-side-header">个人收藏</div>
            <div class="fake-side-item active">📁 应用程序</div>
            <div class="fake-side-item">🖥️ 桌面</div>
            <div class="fake-side-item">📄 文稿</div>
            <div class="fake-side-item">📥 下载</div>
            <div class="fake-side-header">位置</div>
            <div class="fake-side-item">💻 Macintosh HD</div>
            <div class="fake-side-item">☁️ iCloud 云盘</div>
          </div>
          <div class="fake-finder-main">
            <div class="fake-file-card">
              <div class="fake-file-icon">⚡️</div>
              <span class="fake-file-name">KeyLaunch.app</span>
            </div>
            <div class="fake-file-card">
              <div class="fake-file-icon">📁</div>
              <span class="fake-file-name">Projects</span>
            </div>
            <div class="fake-file-card">
              <div class="fake-file-icon">📄</div>
              <span class="fake-file-name">shortcuts.json</span>
            </div>
            <div class="fake-file-card">
              <div class="fake-file-icon">🖼️</div>
              <span class="fake-file-name">Wallpaper.png</span>
            </div>
          </div>
        </div>
      `;
      break;

    case "wechat":
      fakeWindowBody.innerHTML = `
        <div class="fake-wechat-layout">
          <div class="fake-wechat-nav">
            <div class="wechat-nav-act active">💬</div>
            <div class="wechat-nav-act">👥</div>
            <div class="wechat-nav-act">📁</div>
            <div class="wechat-nav-act">⚙️</div>
          </div>
          <div class="fake-wechat-list">
            <div class="fake-chat-item active">
              <div class="fake-avatar" style="background:#07c160;color:#fff;">K</div>
              <div class="fake-chat-meta">
                <div class="chat-meta-top"><span class="chat-name">KeyLaunch 交流群</span><span class="chat-time">刚刚</span></div>
                <div class="chat-msg">⌥+W 一秒唤出微信，太爽了！</div>
              </div>
            </div>
            <div class="fake-chat-item">
              <div class="fake-avatar" style="background:#3b82f6;color:#fff;">L</div>
              <div class="fake-chat-meta">
                <div class="chat-meta-top"><span class="chat-name">Lanrenwen Studio</span><span class="chat-time">10:24</span></div>
                <div class="chat-msg">新版本 v1.3.17 已经发布。</div>
              </div>
            </div>
          </div>
        </div>
      `;
      break;

    case "ghostty":
      fakeWindowBody.innerHTML = `
        <div class="fake-terminal-layout">
          <div class="term-line"><span class="term-prompt">kevin@MacBook-Pro ~ %</span> <span class="term-cmd">brew install --cask key-launch</span></div>
          <div class="term-line term-dim">==> Downloading KeyLaunch.dmg from GitHub releases...</div>
          <div class="term-line term-dim">==> Installing Cask key-launch</div>
          <div class="term-line term-success">🍺 key-launch was successfully installed!</div>
          <div class="term-line"><span class="term-prompt">kevin@MacBook-Pro ~ %</span> <span class="term-cursor"></span></div>
        </div>
      `;
      break;

    case "safari":
    case "chrome":
      fakeWindowBody.innerHTML = `
        <div class="fake-browser-layout">
          <div class="fake-browser-bar">
            <div class="fake-nav-btns"><span class="nav-b">&lt;</span><span class="nav-b">&gt;</span></div>
            <div class="fake-url-box">🔒 https://lanrenwen.com/keylaunch/</div>
          </div>
          <div class="fake-web-content">
            <div style="text-align:center;max-width:480px;margin:30px auto;">
              <h2 style="font-size:22px;color:#0f172a;font-weight:800;margin-bottom:10px;">KeyLaunch 键启 · 官网</h2>
              <p style="color:#64748b;font-size:13.5px;line-height:1.6;">
                通过快捷键 <strong>${modSymbol} + ${char}</strong> 0.1 秒秒级拉起，随时查阅文档与网页。
              </p>
            </div>
          </div>
        </div>
      `;
      break;

    case "obsidian":
      fakeWindowBody.innerHTML = `
        <div style="display:flex;width:100%;height:100%;background:#1e1e24;color:#e2e8f0;padding:20px;gap:20px;">
          <div style="width:180px;border-right:1px solid #333;padding-right:14px;font-size:12.5px;color:#94a3b8;display:flex;flex-direction:column;gap:6px;">
            <div style="font-weight:700;color:#c084fc;">🗂️ 知识库 (Vault)</div>
            <div>📄 [[Daily Notes]]</div>
            <div>📄 [[Mac Workflow]]</div>
            <div style="color:#fff;font-weight:600;">📄 [[KeyLaunch Design]]</div>
          </div>
          <div style="flex:1;display:flex;flex-direction:column;gap:10px;">
            <h2 style="font-size:18px;color:#c084fc;"># KeyLaunch: 把常用 App 放到键盘上</h2>
            <p style="font-size:13px;line-height:1.6;color:#cbd5e1;">
              - 触发键：<code>${modSymbol} + O</code><br>
              - 核心优势：基于肌肉记忆，无需使用眼睛在 Dock 或窗口列表中搜寻。<br>
              - 再次按下：切回上一应用，不中断思路。
            </p>
          </div>
        </div>
      `;
      break;
    case "chatgpt":
      fakeWindowBody.innerHTML = `
        <div style="flex:1;display:flex;flex-direction:column;background:#202123;color:#ececf1;padding:24px;justify-content:space-between;">
          <div style="display:flex;flex-direction:column;gap:14px;max-width:520px;margin:0 auto;width:100%;">
            <div style="display:flex;gap:12px;align-items:flex-start;">
              <div style="width:28px;height:28px;border-radius:50%;background:#10a37f;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:12px;">AI</div>
              <div style="background:#2f2f32;padding:12px 16px;border-radius:12px;font-size:13.5px;line-height:1.6;">
                您好！已通过 KeyLaunch 快捷键 <strong>${modSymbol} + B</strong> 唤醒 ChatGPT 桌面助手。有什么我可以帮您的？
              </div>
            </div>
          </div>
          <div style="max-width:520px;margin:0 auto;width:100%;background:#2f2f32;border:1px solid #4d4d4f;border-radius:12px;padding:12px 16px;color:#8e8ea0;font-size:13px;">
            输入任何问题...
          </div>
        </div>
      `;
      break;

    case "zed":
      fakeWindowBody.innerHTML = `
        <div style="flex:1;display:flex;flex-direction:column;background:#18181b;color:#e4e4e7;font-family:var(--font-mono);font-size:13px;padding:16px;">
          <div style="color:#71717a;margin-bottom:12px;">// src/main.rs — Zed Editor (${modSymbol} + Z)</div>
          <div style="line-height:1.7;"><span style="color:#f43f5e;">fn</span> <span style="color:#38bdf8;">main</span>() {</div>
          <div style="line-height:1.7;padding-left:20px;"><span style="color:#a855f7;">println!</span>(<span style="color:#22c55e;">"Hello from Zed & KeyLaunch!"</span>);</div>
          <div style="line-height:1.7;">}</div>
        </div>
      `;
      break;

    case "raycast":
      fakeWindowBody.innerHTML = `
        <div style="flex:1;display:flex;flex-direction:column;background:#0f172a;color:#f8fafc;padding:24px;align-items:center;justify-content:center;">
          <div style="width:100%;max-width:440px;background:#1e293b;border:1px solid #334155;border-radius:12px;padding:14px 18px;display:flex;align-items:center;gap:12px;box-shadow:0 12px 32px rgba(0,0,0,0.4);">
            <div style="width:20px;height:20px;">${appIcons.raycast}</div>
            <div style="color:#94a3b8;font-size:14px;">Search applications and commands...</div>
          </div>
        </div>
      `;
      break;


    default:
      fakeWindowBody.innerHTML = `
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px;text-align:center;gap:14px;background:#f8fafc;">
          <div class="app-squircle-icon" style="width:64px;height:64px;box-shadow:0 8px 24px rgba(0,0,0,0.12);">
            ${appIcons[data.iconKey] || `<span style="font-size:28px;">${char}</span>`}
          </div>
          <div>
            <h3 style="font-size:20px;font-weight:700;color:#0f172a;">${data.app}</h3>
            <p style="font-size:13.5px;color:#64748b;margin-top:4px;">${data.desc}</p>
          </div>
          <div style="background:#eff6ff;border:1px solid #bfdbfe;color:#1d4ed8;padding:8px 18px;border-radius:var(--radius-pill);font-size:13px;font-weight:600;">
            ⚡️ 已通过快捷键 ${modSymbol} + ${char} 激活并置顶
          </div>
        </div>
      `;
      break;
  }
}

// Open Fake App Window
function openFakeAppModal(char, data) {
  if (!fakeAppModal) return;
  const modSymbol = getModifierSymbol(currentModifier);

  // Update Title & Icon
  if (fakeWindowTitle) fakeWindowTitle.textContent = data.app;
  if (fakeTitleIcon) {
    if (data.iconKey && appIcons[data.iconKey]) {
      fakeTitleIcon.innerHTML = `<div style="width:18px;height:18px;">${appIcons[data.iconKey]}</div>`;
    } else {
      fakeTitleIcon.innerHTML = `<span>⚡️</span>`;
    }
  }

  if (fakeModalStatusText) {
    fakeModalStatusText.textContent = `⚡️ 快捷键 ${modSymbol} + ${char} 瞬间拉起应用`;
  }
  if (fakePingPongTip) {
    fakePingPongTip.textContent = `（再次按下 ${modSymbol} + ${char} 即可秒级隐藏回弹）`;
  }

  renderFakeAppContent(char, data);

  fakeAppModal.classList.add("open");
  fakeAppModal.setAttribute("aria-hidden", "false");
  isModalOpen = true;
}

// Close Fake App Modal
function closeFakeAppModal(reason) {
  if (!fakeAppModal || !isModalOpen) return;
  fakeAppModal.classList.remove("open");
  fakeAppModal.setAttribute("aria-hidden", "true");
  isModalOpen = false;

  if (reason === "pingpong") {
    showToast("🏓 Ping-Pong 机制触发：应用已秒级隐退，返回上一个工作窗口！");
  }
}

// Stats Modal Logic
function openStatsModal() {
  if (!statsModal) return;
  statsModal.classList.add("open");
  statsModal.setAttribute("aria-hidden", "false");
  isStatsOpen = true;
}

function closeStatsModal() {
  if (!statsModal || !isStatsOpen) return;
  statsModal.classList.remove("open");
  statsModal.setAttribute("aria-hidden", "true");
  isStatsOpen = false;
}
if (statsCloseBtn) {
  statsCloseBtn.addEventListener("click", closeStatsModal);
}
document.querySelectorAll(".open-stats-btn").forEach(btn => {
  btn.addEventListener("click", openStatsModal);
});
if (statsModal) {
  statsModal.addEventListener("click", (e) => {
    if (e.target === statsModal) closeStatsModal();
  });
}
if (statsClearBtn) {
  statsClearBtn.addEventListener("click", () => {
    if (statsTotalCount) statsTotalCount.textContent = "0";
    if (statsSummaryText) statsSummaryText.textContent = "近七日暂无快捷键使用记录";
    showToast("已清空本机快捷键使用记录！");
  });
}

// Event Listeners for Fake Window Closing
if (fakeTrafficClose) {
  fakeTrafficClose.addEventListener("click", () => closeFakeAppModal("close"));
}

if (fakeAppModal) {
  fakeAppModal.addEventListener("click", (e) => {
    if (e.target === fakeAppModal) {
      closeFakeAppModal("backdrop");
    }
  });
}

function handleKeyClick(char, name, iconKey, desc) {
  const modSymbol = getModifierSymbol(currentModifier);
  const data = appDictionary[char] || { app: name, iconKey: iconKey, desc: desc };
  const keyEl = document.querySelector(`.app-key[data-key="${char}"]`);

  // Adjust Mode (Swap only, no adding new keys)
  if (isAdjustMode) {
    if (!appDictionary[char]) {
      showToast("调整模式仅支持已有按键对调，添加新应用请下载客户端体验。");
      return;
    }

    if (!adjustSourceKey) {
      adjustSourceKey = char;
      if (keyEl) keyEl.classList.add("adjust-selected");
      showToast(`已选中「${data.app} (${char})」，请点击另一个已有应用按键对调`);
      return;
    }

    if (adjustSourceKey === char) {
      adjustSourceKey = null;
      if (keyEl) keyEl.classList.remove("adjust-selected");
      showToast("已取消按键选择");
      return;
    }

    // Perform Swap between adjustSourceKey and char
    const srcChar = adjustSourceKey;
    const tgtChar = char;
    const srcEl = document.querySelector(`.app-key[data-key="${srcChar}"]`);
    const tgtEl = keyEl;
    const srcData = { ...appDictionary[srcChar] };
    const tgtData = { ...appDictionary[tgtChar] };

    // Swap in dictionary
    appDictionary[srcChar] = tgtData;
    appDictionary[tgtChar] = srcData;

    // Swap in DOM
    if (srcEl && tgtEl) {
      srcEl.classList.remove("adjust-selected");
      srcEl.setAttribute("data-app", tgtData.app);
      srcEl.setAttribute("data-icon", tgtData.iconKey);
      srcEl.setAttribute("data-desc", tgtData.desc);
      const srcSlot = srcEl.querySelector(".app-icon-slot");
      if (srcSlot && appIcons[tgtData.iconKey]) {
        srcSlot.innerHTML = `<div class="app-squircle-icon">${appIcons[tgtData.iconKey]}</div>`;
      }

      tgtEl.setAttribute("data-app", srcData.app);
      tgtEl.setAttribute("data-icon", srcData.iconKey);
      tgtEl.setAttribute("data-desc", srcData.desc);
      const tgtSlot = tgtEl.querySelector(".app-icon-slot");
      if (tgtSlot && appIcons[srcData.iconKey]) {
        tgtSlot.innerHTML = `<div class="app-squircle-icon">${appIcons[srcData.iconKey]}</div>`;
      }

      srcEl.classList.add("adjust-swap-anim");
      tgtEl.classList.add("adjust-swap-anim");
      setTimeout(() => {
        srcEl.classList.remove("adjust-swap-anim");
        tgtEl.classList.remove("adjust-swap-anim");
      }, 400);
    }

    showToast(`已将「${srcData.app}」与「${tgtData.app}」快捷键成功对调！`);
    adjustSourceKey = null;
    return;
  }

  // Highlight Key
  document.querySelectorAll(".app-key").forEach(k => k.classList.remove("active-focus", "key-pressed"));
  if (keyEl) {
    keyEl.classList.add("active-focus", "key-pressed");
    setTimeout(() => keyEl.classList.remove("key-pressed"), 180);
  }

  // Ping-Pong check
  if (isModalOpen && activeKeyChar === char) {
    closeFakeAppModal("pingpong");
    if (liveAppTag) {
      liveAppTag.textContent = "Ping-Pong 去回已触发";
      liveAppTag.className = "live-tag-pill live-tag-pingpong";
    }
    if (liveAppDesc) {
      liveAppDesc.textContent = `再次按下快捷键 ${modSymbol} + ${char}，已将应用隐藏并切回上一个工作窗口。`;
    }
    return;
  }

  activeKeyChar = char;

  // Update Live Card
  if (liveAppBadge) {
    if (data.iconKey && appIcons[data.iconKey]) {
      liveAppBadge.innerHTML = `<div style="width:20px;height:20px;display:flex;align-items:center;justify-content:center;">${appIcons[data.iconKey]}</div>`;
    } else {
      liveAppBadge.innerHTML = `<span style="font-size:12px;font-weight:800;font-family:var(--font-mono);">${char}</span>`;
    }
  }

  if (liveAppName) {
    liveAppName.textContent = `${data.app} · ${modSymbol} + ${char}`;
  }

  if (liveAppTag) {
    liveAppTag.textContent = "已激活置顶";
    liveAppTag.className = "live-tag-pill";
  }

  if (liveAppDesc) {
    liveAppDesc.textContent = data.desc;
  }

  if (liveKeyHint) {
    liveKeyHint.textContent = `${modSymbol} + ${char}`;
  }

  // Open simulated macOS window
  openFakeAppModal(char, data);
}

// Initial Key Click Listeners
function initKeyClicks() {
  document.querySelectorAll(".app-key").forEach(el => {
    el.addEventListener("click", () => {
      const char = el.getAttribute("data-key");
      const app = el.getAttribute("data-app") || `未分配按键 (${char})`;
      const icon = el.getAttribute("data-icon") || "";
      const desc = el.getAttribute("data-desc") || "当前按键未绑定应用，可拖拽或设置进行分配。";
      handleKeyClick(char, app, icon, desc);
    });
  });
}

// Global Keyboard Listener
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (isStatsOpen) closeStatsModal();
    if (isModalOpen) closeFakeAppModal("escape");
    return;
  }

  const pressedKey = e.key.toUpperCase();
  if (appDictionary[pressedKey]) {
    const keyData = appDictionary[pressedKey];
    handleKeyClick(pressedKey, keyData.app, keyData.iconKey, keyData.desc);
  }
});

// Modifier Pill Buttons
document.querySelectorAll(".mod-app-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".mod-app-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentModifier = btn.getAttribute("data-mod") || "Option";
    const modSymbol = getModifierSymbol(currentModifier);
    const data = appDictionary[activeKeyChar] || { app: "Finder 访达", iconKey: "finder", desc: "macOS 原生文件管理器" };

    if (liveAppName) liveAppName.textContent = `${data.app} · ${modSymbol} + ${activeKeyChar}`;
    if (liveKeyHint) liveKeyHint.textContent = `${modSymbol} + ${activeKeyChar}`;

    showToast(`已切换修饰键为 ${btn.querySelector(".mod-text").textContent}`);
  });
});

// Adjust Mode Button
const adjustModeBtn = document.querySelector("#adjustModeBtn");
if (adjustModeBtn) {
  adjustModeBtn.addEventListener("click", () => {
    isAdjustMode = !isAdjustMode;
    if (isAdjustMode) {
      adjustModeBtn.classList.add("active");
      showToast("已开启按键调整模式：点击两个已有应用按键即可互换快捷键！");
    } else {
      adjustModeBtn.classList.remove("active");
      if (adjustSourceKey) {
        const el = document.querySelector(`.app-key[data-key="${adjustSourceKey}"]`);
        if (el) el.classList.remove("adjust-selected");
        adjustSourceKey = null;
      }
      showToast("已退出调整模式");
    }
  });
}

// Key Preferences: F-Keys and Number-Keys Toggles
const toggleFKeys = document.querySelector("#toggleFKeys");
const rowFKeys = document.querySelector("#rowFKeys");
if (toggleFKeys && rowFKeys) {
  toggleFKeys.addEventListener("click", () => {
    const isChecked = toggleFKeys.classList.toggle("checked");
    toggleFKeys.setAttribute("aria-checked", String(isChecked));
    rowFKeys.classList.toggle("active", isChecked);
    showToast(isChecked ? "已启用 F 功能键行" : "已隐藏 F 功能键行");
  });
}

const toggleNumKeys = document.querySelector("#toggleNumKeys");
const rowNumKeys = document.querySelector("#rowNumKeys");
if (toggleNumKeys && rowNumKeys) {
  toggleNumKeys.addEventListener("click", () => {
    const isChecked = toggleNumKeys.classList.toggle("checked");
    toggleNumKeys.setAttribute("aria-checked", String(isChecked));
    rowNumKeys.classList.toggle("active", isChecked);
    showToast(isChecked ? "已启用数字键行" : "已隐藏数字键行");
  });
}


// Toast Helper
function showToast(msg) {
  const toast = document.querySelector("#globalToast");
  if (!toast) return;
  toast.querySelector("span").textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

// Copy Command Helper
function setupCopyButtons() {
  document.querySelectorAll(".copy-cmd-btn, .mini-copy").forEach(btn => {
    btn.addEventListener("click", () => {
      const text = btn.getAttribute("data-copy") || "brew install --cask lanrenwenstudio/tap/key-launch";
      navigator.clipboard.writeText(text).then(() => {
        showToast("已复制命令到剪贴板！");
      }).catch(() => {
        showToast("复制成功！");
      });
    });
  });
}

// Install Tabs Helper
function setupInstallTabs() {
  const tabs = document.querySelectorAll(".inst-tab-btn");
  const panes = document.querySelectorAll(".install-pane");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      panes.forEach(p => p.classList.remove("active"));

      tab.classList.add("active");
      const target = tab.getAttribute("data-tab");
      const targetPane = document.querySelector(`#pane-${target}`);
      if (targetPane) targetPane.classList.add("active");
    });
  });
}

// Language Switcher Helper
function applyLanguage(lang) {
  if (!window.siteTranslations || !window.siteTranslations[lang]) return;
  const dict = window.siteTranslations[lang];

  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  if (dict["meta.title"]) document.title = dict["meta.title"];
  if (metaDescription && dict["meta.description"]) metaDescription.setAttribute("content", dict["meta.description"]);
  if (ogDescMeta && dict["meta.description"]) ogDescMeta.setAttribute("content", dict["meta.description"]);
}

if (languageSelect) {
  languageSelect.value = currentLang;
  languageSelect.addEventListener("change", (e) => {
    currentLang = e.target.value;
    applyLanguage(currentLang);
  });
}

// Reveal on scroll
function initReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    reveals.forEach(el => el.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: "0px 0px 80px 0px" });

  reveals.forEach(el => {
    el.classList.add("will-reveal");
    observer.observe(el);
  });
}

// Init Setup
document.addEventListener("DOMContentLoaded", () => {
  applyLanguage(currentLang);
  initKeyClicks();
  setupCopyButtons();
  setupInstallTabs();
  initReveal();
});

// Also run immediately
applyLanguage(currentLang);
initKeyClicks();
setupCopyButtons();
setupInstallTabs();
initReveal();
