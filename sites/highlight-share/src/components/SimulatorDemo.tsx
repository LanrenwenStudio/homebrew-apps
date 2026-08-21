import React, { useState, useEffect, useRef, type CSSProperties } from 'react';

export type DemoHighlight = {
  id: string;
  text: string;
  color: string;
  colorId: string;
  timeAgo: string;
  timeAgoEn: string;
};

const PRESET_COLORS = [
  { id: 'yellow', name: '黄', nameEn: 'Yellow', value: '#facc15' },
  { id: 'green', name: '绿', nameEn: 'Green', value: '#4ade80' },
  { id: 'teal', name: '青', nameEn: 'Teal', value: '#2dd4bf' },
  { id: 'blue', name: '蓝', nameEn: 'Blue', value: '#38bdf8' },
  { id: 'violet', name: '紫', nameEn: 'Violet', value: '#a78bfa' },
  { id: 'pink', name: '粉', nameEn: 'Pink', value: '#f472b6' },
  { id: 'coral', name: '橙', nameEn: 'Coral', value: '#fb923c' },
];

const INITIAL_HIGHLIGHTS_ZH: DemoHighlight[] = [
  {
    id: 'hl-1',
    text: '有效的数字阅读，始于在关键段落留下清晰的高亮标记，将漫长的文章提炼出核心脉络。',
    color: '#facc15',
    colorId: 'yellow',
    timeAgo: '刚刚',
    timeAgoEn: 'Just now',
  },
  {
    id: 'hl-2',
    text: 'Highlight Share 借助现代浏览器的 Text Fragment 协议，将你选中的段落编码进链接中，对方打开时视口将自动平滑滚动并高亮该句。',
    color: '#38bdf8',
    colorId: 'blue',
    timeAgo: '1分钟前',
    timeAgoEn: '1 min ago',
  },
  {
    id: 'hl-3',
    text: '轻巧、克制、尊重隐私，让你重新找回专注而高效的深度阅读心流。',
    color: '#4ade80',
    colorId: 'green',
    timeAgo: '2分钟前',
    timeAgoEn: '2 mins ago',
  },
];

const INITIAL_HIGHLIGHTS_EN: DemoHighlight[] = [
  {
    id: 'hl-1',
    text: 'Effective digital reading begins with clear highlighting on key passages, distilling sprawling articles into core takeaways.',
    color: '#facc15',
    colorId: 'yellow',
    timeAgo: 'Just now',
    timeAgoEn: 'Just now',
  },
  {
    id: 'hl-2',
    text: 'Highlight Share harnesses the W3C Text Fragment protocol to encode selected passages into links. When opened, modern browsers scroll smoothly to the target sentence and highlight it.',
    color: '#38bdf8',
    colorId: 'blue',
    timeAgo: '1 min ago',
    timeAgoEn: '1 min ago',
  },
  {
    id: 'hl-3',
    text: 'Lightweight, refined, and privacy-focused, restoring deep reading flow.',
    color: '#4ade80',
    colorId: 'green',
    timeAgo: '2 mins ago',
    timeAgoEn: '2 mins ago',
  },
];

const ARTICLE_PARAGRAPHS_ZH = [
  '信息过载的时代，网页文章动辄数千字，真正值得反复咀嚼的往往只有那几句闪光的洞察。传统的网页分享方式往往只是扔出一个粗糙的页面链接，接收方需要在一整屏密密麻麻的文字中迷茫翻找。',
  '有效的数字阅读，始于在关键段落留下清晰的高亮标记，将漫长的文章提炼出核心脉络。阅读不再是被动的信息接受过程，而是在字里行间建立起属于你的结构化索引。',
  'Highlight Share 借助现代浏览器的 Text Fragment 协议，将你选中的段落编码进链接中，对方打开时视口将自动平滑滚动并高亮该句。无需第三方服务器转发，也不用要求对方安装任何插件，链接在 Chrome、Edge、Safari 等主流现代浏览器上均能开箱即用。',
  '轻巧、克制、尊重隐私，让你重新找回专注而高效的深度阅读心流。所有标注数据均完整沉淀在本地，支持多选导出为清晰排版的 Markdown 笔记。',
];

const ARTICLE_PARAGRAPHS_EN = [
  'In an era of information overload, web articles easily run thousands of words, yet what truly matters are often just a few brilliant insights. Traditional link sharing forces recipients to hunt through dense walls of text.',
  'Effective digital reading begins with clear highlighting on key passages, distilling sprawling articles into core takeaways. Reading transforms from passive consumption into building your structured index.',
  'Highlight Share harnesses the W3C Text Fragment protocol to encode selected passages into links. When opened, modern browsers scroll smoothly to the target sentence and highlight it. Zero server dependency, zero required extensions for recipients.',
  'Lightweight, refined, and privacy-focused, restoring deep reading flow. All highlights stay local, ready to copy as formatted notes or share as precise deep links.',
];

export function SimulatorDemo({ lang = 'zh' }: { lang?: 'zh' | 'en' }) {
  const [currentLang, setCurrentLang] = useState<'zh' | 'en'>(lang);
  const [highlights, setHighlights] = useState<DemoHighlight[]>(
    lang === 'zh' ? INITIAL_HIGHLIGHTS_ZH : INITIAL_HIGHLIGHTS_EN
  );
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeColor, setActiveColor] = useState(PRESET_COLORS[0]);
  const [showSettings, setShowSettings] = useState(false);
  const [showColorPopover, setShowColorPopover] = useState(false);
  const [showNumbers, setShowNumbers] = useState(true);
  const [syncUrl, setSyncUrl] = useState(true);
  const [toast, setToast] = useState<{ msg: string; visible: boolean }>({ msg: '', visible: false });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Selection Toolbar State
  const [toolbarState, setToolbarState] = useState<{
    visible: boolean;
    x: number;
    y: number;
    text: string;
  }>({ visible: false, x: 0, y: 0, text: '' });

  // Highlight Edit Toolbar State
  const [editToolbarState, setEditToolbarState] = useState<{
    visible: boolean;
    x: number;
    y: number;
    highlightId: string;
  }>({ visible: false, x: 0, y: 0, highlightId: '' });

  const articleRef = useRef<HTMLDivElement>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  const isZh = currentLang === 'zh';

  useEffect(() => {
    const handleLangChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ lang?: string }>;
      if (customEvent.detail?.lang) {
        const nextLang = customEvent.detail.lang.startsWith('zh') ? 'zh' : 'en';
        setCurrentLang(nextLang);
        setHighlights((prev) => {
          const isDefaultState =
            prev.length === 3 &&
            prev.some((h) => h.id === 'hl-1') &&
            prev.some((h) => h.id === 'hl-2') &&
            prev.some((h) => h.id === 'hl-3');
          if (isDefaultState) {
            return nextLang === 'zh' ? INITIAL_HIGHLIGHTS_ZH : INITIAL_HIGHLIGHTS_EN;
          }
          return prev;
        });
      }
    };
    window.addEventListener('site-lang-changed', handleLangChange);
    return () => window.removeEventListener('site-lang-changed', handleLangChange);
  }, []);

  const showFeedback = (msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ msg, visible: true });
    toastTimeoutRef.current = window.setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2400);
  };

  // Handle Text Selection in Article
  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      return;
    }

    const text = selection.toString().trim();
    if (!text || text.length < 2) {
      setToolbarState((prev) => ({ ...prev, visible: false }));
      return;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const articleRect = articleRef.current?.getBoundingClientRect();

    if (!articleRect) return;

    if (
      rect.bottom < articleRect.top ||
      rect.top > articleRect.bottom ||
      rect.right < articleRect.left ||
      rect.left > articleRect.right
    ) {
      return;
    }

    setEditToolbarState((prev) => ({ ...prev, visible: false }));
    setToolbarState({
      visible: true,
      x: rect.left - articleRect.left + rect.width / 2,
      y: rect.top - articleRect.top + (articleRef.current?.scrollTop || 0) - 10,
      text,
    });
  };

  const handleDocumentClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      !target.closest('.highlight-share-toolbar') &&
      !target.closest('.highlight-share-edit-toolbar') &&
      !target.closest('.highlight-interactive-mark')
    ) {
      setToolbarState((prev) => ({ ...prev, visible: false }));
      setEditToolbarState((prev) => ({ ...prev, visible: false }));
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick);
    return () => document.removeEventListener('mousedown', handleDocumentClick);
  }, []);

  // Highlight Selection
  const applyHighlight = (color = activeColor) => {
    if (!toolbarState.text) return;
    const textToHighlight = toolbarState.text;
    const newId = `hl-${Date.now()}`;
    const newHl: DemoHighlight = {
      id: newId,
      text: textToHighlight,
      color: color.value,
      colorId: color.id,
      timeAgo: isZh ? '刚刚' : 'Just now',
      timeAgoEn: 'Just now',
    };
    setHighlights((prev) => [newHl, ...prev]);
    setToolbarState((prev) => ({ ...prev, visible: false }));
    window.getSelection()?.removeAllRanges();
    showFeedback(isZh ? '✨ 已添加高亮并沉淀至侧边栏！' : '✨ Highlight added & saved to sidepanel!');
  };

  const selectChipText = (snippet: string) => {
    const found = highlights.find((h) => h.text.includes(snippet));
    if (found) {
      scrollToHighlight(found.id);
    } else {
      const marks = articleRef.current?.querySelectorAll('mark');
      if (marks) {
        for (const mark of Array.from(marks)) {
          if (mark.textContent?.includes(snippet)) {
            mark.scrollIntoView({ behavior: 'smooth', block: 'center' });
            mark.classList.remove('animate-target-highlight');
            void mark.offsetWidth;
            mark.classList.add('animate-target-highlight');
            showFeedback(isZh ? '🎯 已平滑定位到段落并高亮！' : '🎯 Scrolled to target passage!');
            return;
          }
        }
      }
    }
  };

  const scrollToHighlight = (id: string) => {
    const el = document.getElementById(id);
    if (el && articleRef.current) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.remove('animate-target-highlight');
      void el.offsetWidth;
      el.classList.add('animate-target-highlight');
      showFeedback(isZh ? '🎯 已平滑定位到段落并高亮！' : '🎯 Scrolled and highlighted target passage!');
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isAllSelected = highlights.length > 0 && selectedIds.size === highlights.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(highlights.map((h) => h.id)));
    }
  };

  const copyHighlightLink = (hl: DemoHighlight) => {
    const url = `https://highlightshare.lanrenwen.com/article/demo#:~:text=${encodeURIComponent(hl.text.slice(0, 30))}`;
    navigator.clipboard.writeText(url);
    setCopiedId(hl.id);
    setTimeout(() => setCopiedId(null), 1200);
    showFeedback(isZh ? '🔗 已复制 W3C Text Fragment 直达链接!' : '🔗 W3C Text Fragment deep link copied!');
  };

  const copyHighlightText = (text: string) => {
    navigator.clipboard.writeText(text);
    showFeedback(isZh ? '📋 已复制段落文字!' : '📋 Highlight text copied!');
  };

  const deleteHighlight = (id: string) => {
    setHighlights((prev) => prev.filter((h) => h.id !== id));
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setEditToolbarState((prev) => ({ ...prev, visible: false }));
    showFeedback(isZh ? '🗑️ 已删除该条高亮' : '🗑️ Highlight deleted');
  };

  const shareSelected = () => {
    const selected = highlights.filter((h) => selectedIds.has(h.id));
    if (selected.length === 0) return;
    const combined = selected.map((s) => s.text).join(' ');
    const url = `https://highlightshare.lanrenwen.com/article/demo#:~:text=${encodeURIComponent(combined.slice(0, 50))}`;
    navigator.clipboard.writeText(url);
    showFeedback(
      isZh
        ? `🔗 已生成包含 ${selected.length} 条高亮的直达链接！`
        : `🔗 Generated deep link for ${selected.length} highlights!`
    );
  };

  const copySelected = () => {
    const selected = highlights.filter((h) => selectedIds.has(h.id));
    if (selected.length === 0) return;
    const text = selected.map((h, i) => `${i + 1}. ${h.text}`).join('\n\n');
    navigator.clipboard.writeText(text);
    showFeedback(
      isZh
        ? `📋 已复制选中的 ${selected.length} 条高亮笔记！`
        : `📋 Copied ${selected.length} highlights to clipboard!`
    );
  };

  const deleteSelected = () => {
    const count = selectedIds.size;
    if (count === 0) return;
    setHighlights((prev) => prev.filter((h) => !selectedIds.has(h.id)));
    setSelectedIds(new Set());
    showFeedback(isZh ? `🗑️ 已删除选中的 ${count} 条高亮` : `🗑️ Deleted ${count} highlights`);
  };

  const selectedCount = selectedIds.size;
  const actionCountText =
    highlights.length === 0
      ? isZh
        ? '暂无高亮'
        : 'No highlights'
      : selectedCount === 0
      ? isZh
        ? `${highlights.length} 处高亮`
        : `${highlights.length} highlights`
      : isZh
      ? `已选 ${selectedCount} 项`
      : `${selectedCount} selected`;

  const paragraphs = isZh ? ARTICLE_PARAGRAPHS_ZH : ARTICLE_PARAGRAPHS_EN;

  // Dynamic paragraph highlighter function
  const renderParagraph = (pText: string, pIdx: number) => {
    type HighlightMatch = {
      start: number;
      end: number;
      hl: DemoHighlight;
    };

    const matches: HighlightMatch[] = [];
    for (const hl of highlights) {
      if (!hl.text) continue;
      let searchIdx = 0;
      while (searchIdx < pText.length) {
        const idx = pText.indexOf(hl.text, searchIdx);
        if (idx === -1) break;
        matches.push({
          start: idx,
          end: idx + hl.text.length,
          hl,
        });
        searchIdx = idx + hl.text.length;
      }
    }

    // Sort matches: earlier start first, longer match first if starts equal
    matches.sort((a, b) => a.start - b.start || b.end - a.end);

    // Keep only non-overlapping matches
    const nonOverlapping: HighlightMatch[] = [];
    let lastEnd = 0;
    for (const m of matches) {
      if (m.start >= lastEnd) {
        nonOverlapping.push(m);
        lastEnd = m.end;
      }
    }

    const nodes: React.ReactNode[] = [];
    let cursor = 0;

    nonOverlapping.forEach((m, mIdx) => {
      if (m.start > cursor) {
        nodes.push(pText.slice(cursor, m.start));
      }
      nodes.push(
        <mark
          key={`${m.hl.id}-${mIdx}`}
          id={m.hl.id}
          className="highlight-interactive-mark"
          style={{
            '--mark-color': m.hl.color,
          } as CSSProperties}
          title={isZh ? '点击编辑高亮或更改颜色' : 'Click to edit or change color'}
          onClick={(e) => {
            e.stopPropagation();
            const rect = e.currentTarget.getBoundingClientRect();
            const articleRect = articleRef.current?.getBoundingClientRect();
            if (articleRect) {
              setToolbarState((p) => ({ ...p, visible: false }));
              setEditToolbarState({
                visible: true,
                x: rect.left - articleRect.left + rect.width / 2,
                y: rect.top - articleRect.top + (articleRef.current?.scrollTop || 0) - 10,
                highlightId: m.hl.id,
              });
            }
          }}
        >
          {m.hl.text}
        </mark>
      );
      cursor = m.end;
    });

    if (cursor < pText.length) {
      nodes.push(pText.slice(cursor));
    }

    return <p key={pIdx}>{nodes}</p>;
  };

  return (
    <div className="simulator-workbench">
      {/* Toast Feedback */}
      {toast.visible && (
        <div className="simulator-toast" role="alert">
          {toast.msg}
        </div>
      )}

      <div className="sim-split-grid">
        {/* Left Side: Mock Web Article */}
        <div className="sim-article-pane" ref={articleRef} onMouseUp={handleMouseUp}>
          {/* Article Browser Topbar */}
          <div className="sim-browser-topbar">
            <div className="sim-window-dots">
              <span className="dot dot-red" />
              <span className="dot dot-yellow" />
              <span className="dot dot-green" />
            </div>
            <div className="sim-url-pill">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>highlightshare.lanrenwen.com/article/digital-reading</span>
            </div>
            <div className="sim-topbar-actions">
              <span className="sim-hint-tag">{isZh ? '划选文字体验' : 'Select text to test'}</span>
            </div>
          </div>
          {/* Article Body */}
          <div className="sim-article-content">
            <header className="article-inner-header">
              <div className="article-meta-row">
                <span className="article-category">{isZh ? '深度阅读思考' : 'Deep Reading'}</span>
                <span className="article-date">2026-08-18</span>
              </div>
              <h1 className="article-headline">
                {isZh ? '数字化阅读时代的段落萃取与知识流转' : 'Digital Curation & Frictionless Knowledge Sharing'}
              </h1>
            </header>

            <div className="article-prose">
              {paragraphs.map((p, idx) => renderParagraph(p, idx))}
            </div>

            {/* Quick Pick Chips */}
            <div className="article-quick-chips">
              <span className="quick-chip-label">{isZh ? '快捷体验：' : 'Quick jump:'}</span>
              <button
                type="button"
                className="quick-chip-btn"
                onClick={() => selectChipText(isZh ? '有效的数字阅读' : 'Effective digital reading')}
              >
                #1 {isZh ? '数字阅读' : 'Reading'}
              </button>
              <button
                type="button"
                className="quick-chip-btn"
                onClick={() => selectChipText(isZh ? 'Text Fragment' : 'Text Fragment')}
              >
                #2 {isZh ? 'Text Fragment' : 'Deep Link'}
              </button>
              <button
                type="button"
                className="quick-chip-btn"
                onClick={() => selectChipText(isZh ? '轻巧、克制、尊重隐私' : 'Lightweight, refined')}
              >
                #3 {isZh ? '隐私与克制' : 'Privacy'}
              </button>
            </div>
          </div>

          {/* Floating Selection Toolbar */}
          {toolbarState.visible && (
            <div
              className="highlight-share-toolbar is-floating-anim"
              style={{
                left: toolbarState.x,
                top: toolbarState.y,
                transform: 'translate(-50%, -100%)',
              }}
            >
              <button
                type="button"
                className="highlight-share-btn-primary"
                onClick={() => applyHighlight(activeColor)}
                title={isZh ? '高亮选中文本' : 'Highlight selection'}
              >
                <span className="color-dot-indicator" style={{ backgroundColor: activeColor.value }} />
                <span>{isZh ? '高亮' : 'Highlight'}</span>
              </button>

              <div className="toolbar-swatches-divider" />
              <div className="toolbar-preset-dots">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`preset-swatch-dot ${activeColor.id === c.id ? 'active' : ''}`}
                    style={{ backgroundColor: c.value }}
                    onClick={() => {
                      setActiveColor(c);
                      applyHighlight(c);
                    }}
                    title={isZh ? c.name : c.nameEn}
                  />
                ))}
              </div>

              <div className="toolbar-swatches-divider" />

              <button
                type="button"
                className="highlight-share-btn-icon"
                onClick={() => {
                  const url = `https://highlightshare.lanrenwen.com/article/demo#:~:text=${encodeURIComponent(toolbarState.text.slice(0, 30))}`;
                  navigator.clipboard.writeText(url);
                  showFeedback(isZh ? '🔗 已复制直达段落链接！' : '🔗 Deep link to selection copied!');
                  setToolbarState((p) => ({ ...p, visible: false }));
                }}
                title={isZh ? '复制段落直达链接' : 'Copy link to selection'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </button>

              <button
                type="button"
                className="highlight-share-btn-icon"
                onClick={() => {
                  copyHighlightText(toolbarState.text);
                  setToolbarState((p) => ({ ...p, visible: false }));
                }}
                title={isZh ? '复制文本' : 'Copy text'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
              </button>
            </div>
          )}

          {/* Highlight Edit Toolbar */}
          {editToolbarState.visible && (
            <div
              className="highlight-share-edit-toolbar is-floating-anim"
              style={{
                left: editToolbarState.x,
                top: editToolbarState.y,
                transform: 'translate(-50%, -100%)',
              }}
            >
              <div className="edit-toolbar-dots">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className="preset-swatch-dot"
                    style={{ backgroundColor: c.value }}
                    onClick={() => {
                      setHighlights((prev) =>
                        prev.map((h) =>
                          h.id === editToolbarState.highlightId
                            ? { ...h, color: c.value, colorId: c.id }
                            : h
                        )
                      );
                      setEditToolbarState((p) => ({ ...p, visible: false }));
                      showFeedback(isZh ? '✨ 已更改高亮颜色！' : '✨ Highlight color updated!');
                    }}
                    title={isZh ? `改为${c.name}` : `Change to ${c.nameEn}`}
                  />
                ))}
              </div>

              <div className="toolbar-swatches-divider" />

              <button
                type="button"
                className="highlight-share-btn-icon"
                onClick={() => {
                  const targetHl = highlights.find((h) => h.id === editToolbarState.highlightId);
                  if (targetHl) copyHighlightLink(targetHl);
                  setEditToolbarState((p) => ({ ...p, visible: false }));
                }}
                title={isZh ? '复制直达链接' : 'Copy link'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
              </button>

              <button
                type="button"
                className="highlight-share-btn-icon btn-danger"
                onClick={() => {
                  deleteHighlight(editToolbarState.highlightId);
                }}
                title={isZh ? '删除高亮' : 'Delete highlight'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Native Sidepanel Container */}
        <div className="sim-sidepanel-shell">
          <main className="shell">
            {/* Native Extension Header */}
            <header className="header">
              {/* Page Card: 2-Column Icon + Text Info */}
              <div className="page-card">
                <div className="page-icon">
                  <img src="/icon-32.png" alt="Favicon" className="page-favicon" />
                </div>
                <div className="page-info">
                  <div className="page-domain">HIGHLIGHTSHARE.LANRENWEN.COM</div>
                  <div className="page-title">{isZh ? '数字化阅读时代的段落萃取' : 'Digital Curation & Knowledge'}</div>
                </div>
              </div>

              {/* Controls Bar: Pill selection badge on left, batch action buttons on right */}
              <div className="controls-bar">
                <div className="selection-control">
                  <span className="action-count">{actionCountText}</span>
                  {highlights.length > 0 && (
                    <button
                      type="button"
                      className="select-all-btn"
                      onClick={toggleSelectAll}
                    >
                      {isAllSelected ? (isZh ? '清除' : 'Clear') : (isZh ? '全选' : 'Select all')}
                    </button>
                  )}
                </div>

                <div className="batch-actions">
                  <button
                    type="button"
                    className="batch-act-btn"
                    onClick={shareSelected}
                    disabled={selectedCount === 0}
                    title={isZh ? '复制所选直达链接' : 'Share selected links'}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    {selectedCount > 0 && <span className="batch-badge">{selectedCount}</span>}
                  </button>

                  <button
                    type="button"
                    className="batch-act-btn"
                    onClick={copySelected}
                    disabled={selectedCount === 0}
                    title={isZh ? '复制选中内容' : 'Copy selected text'}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="batch-act-btn danger"
                    onClick={deleteSelected}
                    disabled={selectedCount === 0}
                    title={isZh ? '删除选中高亮' : 'Delete selected'}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    </svg>
                  </button>
                </div>
              </div>
            </header>

            {/* Scrollable Highlight Card List (Extension Native .highlights + .highlight-item) */}
            <ol className="highlights">
              {highlights.length === 0 ? (
                <div className="sidepanel-empty-state">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="m9 11-6 6v3h3l6-6" />
                    <path d="m22 2-2 2-4-4 2-2a2.828 2.828 0 1 1 4 4z" />
                  </svg>
                  <p>{isZh ? '本页暂无高亮' : 'No highlights on this page'}</p>
                  <span style={{ fontSize: '0.6875rem', opacity: 0.7 }}>
                    {isZh ? '在左侧文章中划选文字即可添加' : 'Select text in the left article to highlight'}
                  </span>
                </div>
              ) : (
                highlights.map((hl, index) => {
                  const isSelected = selectedIds.has(hl.id);
                  const isCopied = copiedId === hl.id;

                  return (
                    <li
                      key={hl.id}
                      className="highlight-item"
                      tabIndex={0}
                      role="checkbox"
                      aria-checked={isSelected}
                      style={{
                        '--accent-color': hl.color,
                        '--highlight-color': hl.color,
                        '--accent-light': hl.color,
                      } as CSSProperties}
                      onClick={() => {
                        toggleSelect(hl.id);
                        scrollToHighlight(hl.id);
                      }}
                    >
                      <div className="highlight-item-header">
                        {showNumbers && (
                          <span className="highlight-index">
                            {index + 1}
                          </span>
                        )}
                        <div className="highlight-actions" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            className={`highlight-copy${isCopied ? ' is-copied' : ''}`}
                            onClick={() => copyHighlightLink(hl)}
                            title={isZh ? '复制段落直达链接' : 'Copy deep link'}
                          >
                            {isCopied ? (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            ) : (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                              </svg>
                            )}
                          </button>

                          <button
                            type="button"
                            className="highlight-remove"
                            onClick={() => deleteHighlight(hl.id)}
                            title={isZh ? '删除此条' : 'Delete'}
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M3 6h18" />
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <p className="highlight-text">{hl.text.trim()}</p>
                    </li>
                  );
                })
              )}
            </ol>

            {/* Bottom Settings Dock */}
            <footer className="settings-dock">
              <div className="settings-dock-row">
                <button
                  type="button"
                  className="dock-trigger-btn"
                  onClick={() => {
                    setShowColorPopover((prev) => !prev);
                    setShowSettings(false);
                  }}
                  title={isZh ? '更换默认高亮色' : 'Change default highlight color'}
                >
                  <span className="dock-color-bubble" style={{ backgroundColor: activeColor.value }} />
                  <span className="dock-label">{isZh ? `默认色 · ${activeColor.name}` : `Color · ${activeColor.nameEn}`}</span>
                </button>

                <button
                  type="button"
                  className="dock-icon-btn"
                  onClick={() => {
                    setShowSettings((prev) => !prev);
                    setShowColorPopover(false);
                  }}
                  title={isZh ? '偏好设置' : 'Preferences'}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </button>
              </div>

              {/* Color picker expand row */}
              {showColorPopover && (
                <div className="demo-color-picker-dropdown">
                  <div className="color-swatches-grid">
                    {PRESET_COLORS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`color-swatch-circle ${activeColor.id === c.id ? 'active' : ''}`}
                    style={{ backgroundColor: c.value }}
                    onClick={() => {
                      setActiveColor(c);
                      setShowColorPopover(false);
                      showFeedback(isZh ? `✨ 默认高亮色已设为 ${c.name}` : `✨ Default color set to ${c.nameEn}`);
                    }}
                    title={isZh ? c.name : c.nameEn}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Settings expand box */}
          {showSettings && (
            <div className="demo-settings-dropdown">
              <div className="setting-toggle-row">
                <span>{isZh ? '显示卡片序号' : 'Show card numbers'}</span>
                <button
                  type="button"
                  className={`quick-toggle-switch ${showNumbers ? 'on' : ''}`}
                  onClick={() => setShowNumbers((prev) => !prev)}
                >
                  <span className="switch-knob" />
                </button>
              </div>
              <div className="setting-toggle-row">
                <span>{isZh ? '开启页面滚动同步' : 'Sync page scroll'}</span>
                <button
                  type="button"
                  className={`quick-toggle-switch ${syncUrl ? 'on' : ''}`}
                  onClick={() => setSyncUrl((prev) => !prev)}
                >
                  <span className="switch-knob" />
                </button>
              </div>
            </div>
          )}
        </footer>
      </main>
    </div>
  </div>
</div>
);
}
