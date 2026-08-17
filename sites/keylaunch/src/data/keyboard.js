export const appIcons = {
  wechat: `<svg viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#07C160"/><path d="M15.5 10C11.358 10 8 12.91 8 16.5c0 2.012 1.05 3.82 2.688 5.01L10 24.5l3.375-1.688c.67.188 1.38.288 2.125.288.167 0 .332-.006.495-.018A5.92 5.92 0 0 1 16 21c0-3.314 3.134-6 7-6 .506 0 .996.048 1.467.137C23.635 12.18 19.866 10 15.5 10z" fill="#FFFFFF"/><path d="M23 16c-3.314 0-6 2.239-6 5s2.686 5 6 5c.594 0 1.163-.078 1.696-.222L27 27l-.696-2.088C27.915 23.97 29 22.58 29 21c0-2.761-2.686-5-6-5z" fill="#FFFFFF"/></svg>`,
  safari: `<svg viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#007AFF"/><circle cx="18" cy="18" r="13" fill="#FFFFFF"/><path d="M24 12l-3.5 8.5L12 24l3.5-8.5L24 12z" fill="#FF3B30"/><path d="M15.5 15.5l5 5" stroke="#FFFFFF" stroke-width="1.5"/></svg>`,
  netease: `<svg viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#D43C33"/><path d="M18 10a7 7 0 0 0-7 7c0 3.5 2.5 6 6 6.5V20c-1.5-.5-2.5-1.8-2.5-3.5a4 4 0 0 1 7.5-1.8l2.5-1.2A6.9 6.9 0 0 0 18 10z" fill="#FFFFFF"/></svg>`,
  obsidian: `<svg viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#6C31E3"/><path d="M18 7l9 9-4 13-10-3-4-10 9-9z" fill="#9353FF"/><path d="M18 7l5 9-6 13-4-10 5-12z" fill="#FFFFFF" fill-opacity="0.3"/></svg>`,
  iina: `<svg viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#FF9500"/><circle cx="18" cy="18" r="10" fill="#FFFFFF"/><polygon points="16,13 23,18 16,23" fill="#FF9500"/></svg>`,
  gdrive: `<svg viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#F1F5F9"/><path d="M14 9l-7 12 4 7 7-12-4-7z" fill="#0066DA"/><path d="M22 9H14l7 12h8l-7-12z" fill="#FFBA00"/><path d="M22 28H11l4-7h15l-8 7z" fill="#00AC47"/></svg>`,
  surge: `<svg viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#FFFFFF"/><path d="M7 24a11 11 0 0 1 22 0z" fill="url(#surgeDome)"/><defs><linearGradient id="surgeDome" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#38BDF8"/><stop offset="0.5" stop-color="#FB923C"/><stop offset="1" stop-color="#F43F5E"/></linearGradient></defs></svg>`,
  finder: `<svg viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#1C86EE"/><path d="M0 8a8 8 0 0 1 8-8h20a8 8 0 0 1 8 8v10H0V8z" fill="#63B8FF"/><path d="M12 15c0 1.5 1.5 2.5 3 2.5s3-1 3-2.5V11h-6v4zm9 0c0 1.5 1.5 2.5 3 2.5s3-1 3-2.5V11h-6v4z" fill="#1A2B4C"/><path d="M10 23c2.5 3 13.5 3 16 0" stroke="#1A2B4C" stroke-width="2.5" stroke-linecap="round"/><path d="M18 13v9" stroke="#1A2B4C" stroke-width="2" stroke-linecap="round"/></svg>`,
  ghostty: `<svg viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#0B132B"/><circle cx="14" cy="15" r="2.8" fill="#FFFFFF"/><circle cx="22" cy="15" r="2.8" fill="#FFFFFF"/><path d="M11 23l4-3-4-3m6 6h6" stroke="#38BDF8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  xcode: `<svg viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#147EFB"/><path d="M12 24l12-12m-8-2l10 10" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/><path d="M22 9l5 5-2 2-5-5 2-2z" fill="#E2E8F0"/></svg>`,
  chrome: `<svg viewBox="0 0 36 36" fill="none"><rect width="36" height="36" rx="8" fill="#FFFFFF"/><circle cx="18" cy="18" r="14" fill="#EA4335"/><path d="M18 18l7.5-13A14 14 0 0 1 32 18H18z" fill="#FBBC05"/><path d="M18 18l-6.5 11.26A14 14 0 0 1 4 18h14z" fill="#34A853"/><circle cx="18" cy="18" r="6.5" fill="#FFFFFF"/><circle cx="18" cy="18" r="5" fill="#1A73E8"/></svg>`
};

export const defaultAppMap = {
  W: { app: "微信 WeChat", iconKey: "wechat", desc: "即时通讯与社群沟通" },
  E: { app: "Safari 浏览器", iconKey: "safari", desc: "Apple 原生极速浏览器" },
  Y: { app: "Music", iconKey: "netease", desc: "Apple Music / Audio Streaming" },
  O: { app: "Obsidian", iconKey: "obsidian", desc: "双链笔记与本地知识库" },
  P: { app: "IINA 播放器", iconKey: "iina", desc: "macOS 现代全能视频播放器" },
  A: { app: "Google Drive", iconKey: "gdrive", desc: "云端硬盘与文件同步" },
  D: { app: "Surge 网络", iconKey: "surge", desc: "高级网络调试与代理引擎" },
  F: { app: "Finder 访达", iconKey: "finder", desc: "macOS 原生文件管理器" },
  G: { app: "Ghostty 终端", iconKey: "ghostty", desc: "极速 GPU 加速现代终端" },
  X: { app: "Xcode", iconKey: "xcode", desc: "Apple 官方集成开发环境" },
  C: { app: "Google Chrome", iconKey: "chrome", desc: "全功能网络浏览器" }
};

export const keyboardLayout = {
  fkeys: ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"],
  numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
  qwerty: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]"],
  asdf: ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"],
  zxcv: ["Z", "X", "C", "V", "B", "N", "M", ".", "/"]
};

export const statsData = {
  summaryText: "近七日 2 个快捷键有使用记录，最高 37 次",
  keys: {
    W: { count: 37, percentage: 74, app: "微信 WeChat", heatLevel: "w" },
    F: { count: 12, percentage: 24, app: "Finder 访达", heatLevel: "f" },
    E: { count: 1, percentage: 2, app: "Safari 浏览器", heatLevel: "low" },
    Y: { count: 0, percentage: 0, app: "Music", heatLevel: "low" },
    O: { count: 0, percentage: 0, app: "Obsidian", heatLevel: "low" },
    P: { count: 0, percentage: 0, app: "IINA 播放器", heatLevel: "low" },
    A: { count: 0, percentage: 0, app: "Google Drive", heatLevel: "low" },
    D: { count: 0, percentage: 0, app: "Surge 网络", heatLevel: "low" },
    G: { count: 0, percentage: 0, app: "Ghostty 终端", heatLevel: "low" },
    X: { count: 0, percentage: 0, app: "Xcode", heatLevel: "low" },
    C: { count: 0, percentage: 0, app: "Google Chrome", heatLevel: "low" }
  }
};
