import React from 'react';

export default function Header({ currentLang, onChangeLang, onCopyCmd, t }) {
  return (
    <header className="topbar">
      <a href="#stage" className="mark">
        <span>烂人文</span>
      </a>

      <nav className="links">
        <button
          type="button"
          className="text-btn"
          onClick={() => onChangeLang(currentLang === 'zh-Hans' ? 'en' : 'zh-Hans')}
        >
          {currentLang === 'zh-Hans' ? 'EN' : '中文'}
        </button>
        <button
          type="button"
          className="text-btn"
          onClick={() => onCopyCmd('kevinxft@gmail.com')}
        >
          {t('nav.write')}
        </button>
        <a
          href="https://github.com/LanrenwenStudio"
          target="_blank"
          rel="noopener noreferrer"
          className="text-btn"
        >
          {t('nav.github')}
        </a>
      </nav>
    </header>
  );
}
