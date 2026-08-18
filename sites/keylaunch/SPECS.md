# KeyLaunch (键启) 官网设计与交互规范文档 (Website Specs & Guidelines)

本文档归档了 KeyLaunch 产品独立官网（`homebrew-apps/sites/keylaunch`）的架构设计、macOS 原生 1:1 视觉标准、键盘交互仿真逻辑与多语言规范。

---

## 1. 技术栈与架构 (Architecture)

- **框架体系**：Astro SSG（组件化静态站点生成），与 Studio 旗下应用（如 ClipBar）标准保持统一。
- **构建输出**：全静态生成（Static Output），构建产物位于 `dist/`。
- **零外部运行时依赖**：无重型前端 UI 框架运行时代价，首屏 CSS/JS 极速直出。
- **SEO & 语义化**：JSON-LD 结构化数据、多语言 hreflang、OpenGraph 社交卡片。

---

## 2. 视觉设计与 1:1 macOS 原生标准 (Design System)

1. **Light Theme 纯白浅色质感**：
   - 整体背景为柔和亮白渐变系统（`#f8fafc` 至 `#eef2f6`），模拟 macOS Tahoe / Sonoma 浅色模式系统窗口。
2. **沉降式原生按键井（Keyboard Well）**：
   - 内凹阴影（`inset 0 1px 3px rgba(0,0,0,0.06)`）与 1px 细腻内描边；
   - 键帽采用原生圆角 Squircle Chiclet 键帽，带有三层立体阴影（`box-shadow: 0 1px 0 rgba(0,0,0,0.1), 0 2px 5px rgba(0,0,0,0.05), inset 0 1px 0 #fff`）；
   - 按下态（Active/Keydown）产生 `translateY(1.5px)` 下沉与阴影内缩效果。
3. **按键尺寸与行距绝对统一**：
   - 所有标准按键（数字键、字母键）与顶部 F 键行（`F1`~`F12`）保持完全一致的宽高（`width: 48px; height: 50px;`）与间距（`gap: 7px`）；
   - 移除所有额外的外边距，展开/折叠时动画平滑过度。
4. **首屏紧凑布局（Above-the-Fold）**：
   - 紧凑精简的 Hero 头部与标题排版，确保即使同时展开 F 键行和数字键行，整个仿真窗口与控制栏也能在标准 Mac 屏幕上完整呈现在首屏内。

---

## 3. 键盘按键映射与交互仿真规则 (Keyboard Simulation Logic)

1. **按键映射规则**：
   - **默认绑定核心按键**：
     - `W`：微信 (WeChat)
     - `E`：Safari 浏览器
     - `Y`：音乐 (Music / Apple Music)
     - `O`：Obsidian
     - `P`：IINA 播放器
     - `A`：Google Drive
     - `D`：Surge 网络调试工具
     - `F`：Finder 访达
     - `G`：Ghostty 终端
     - `X`：Xcode
     - `C`：Google Chrome
   - **默认未绑定白键（Unmapped）**：
     - `Q`、`V`、`B`、`Z`、`S` 等按键保持纯白无图标默认键帽。
   - **数字键行**：直接由 `1` 开始至 `0`（无 `~` 键）。
2. **按键偏好开关与逻辑联动（重要）**：
   - **开关状态**：右下角“按键偏好”提供“使用 F 键”和“使用数字键”开关；
   - **关闭时**：
     - 对应行自动折叠隐藏；
     - 实体键盘按下或点击该行按键时，快捷键判定为**已暂停/未激活**，不会触发应用启动或弹跳；
     - 若当前已处于该行拉起的弹窗，关闭开关会同步自动安全收起弹窗；
   - **开启时**：该行快捷键立即激活并恢复响应。
3. **智能 Ping-Pong 弹跳机制**：
   - 首次按下快捷键（如 `⌥ + W` 或点击 `W`）：拉起微信窗口；
   - 再次按下相同快捷键（`⌥ + W`）：触发 Ping-Pong 弹跳，自动隐藏并切回上一个工作窗口。
4. **调整模式与拖拽交换（Adjust Mode & Drag-to-Swap）**：
   - 点击右下角“调整”模式或长按拖拽任意按键：
     - 可将应用自由拖拽至目标按键对调位置；
     - 可连续点击两个按键实现秒级对调；
     - 未分配按键支持一键删除或重新分配应用。
5. **7日使用热力图（Usage Stats & Heatmap）**：
   - 真实记录各按键点击与触发频次；
   - 支持根据主界面的 F 键/数字键开关动态显示或隐藏对应行统计。

---

## 4. 多语言与品牌呈现规则 (Internationalization & Branding)

1. **严格限定 5 种语言**：
   - 仅支持：`简体中文 (zh-Hans)`、`繁體中文 (zh-Hant)`、`English (en)`、`日本語 (ja)`、`한국어 (ko)`。
2. **品牌标题多语言逻辑**：
   - **中文环境**：显示为 `KeyLaunch 键启`（或繁体 `KeyLaunch 鍵啟`）；
   - **非中文环境（en, ja, ko）**：副标题留空并自动隐藏，仅显示纯粹的 `KeyLaunch`，严禁出现 `KeyLaunch KeyLaunch` 重复问题。
3. **版本号微章（Brand Version Pill）**：
   - 顶部导航栏品牌旁展示系统等宽字体微章 `v1.3.18`，与当前发版版本完全同步。
4. **CTA 按钮与文案语义**：
   - Homebrew 按钮在所有语言下统一为快捷安装命令语义；
   - 官网 DMG 下载按钮明确提示“官网下载”或“公式サイトダウンロード”，消除歧义。

---

## 5. 全局轻量通知（Global Toast）体验

- **动态自适应时长**：基础展示时长 4.2 秒，长文本按字符数动态增加至 7~8 秒，确保充裕阅读时间。
- **Hover 悬停暂停**：鼠标移入 Toast 时倒计时自动挂起暂停，鼠标移出后额外保留缓冲。
- **即点即关**：点击气泡即可立即关闭。

---

## 6. 构建与部署规范 (Build & Deploy)

- **本地开发**：
  ```bash
  cd homebrew-apps/sites/keylaunch
  npm run dev # 端口 8089, 支持局域网 0.0.0.0
  ```
- **生产构建**：
  ```bash
  npm run build # 输出到 dist/
  ```
- **线上发布**（需用户明确授权后执行）：
  ```bash
  npx wrangler pages deploy dist --project-name keylaunch --branch main --commit-dirty=true
  ```
