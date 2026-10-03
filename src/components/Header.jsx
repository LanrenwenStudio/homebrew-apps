import React from 'react';
import { sound } from '../utils/sound';

export default function Header({
  currentLang,
  onChangeLang,
  onCopyCmd,
  soundEnabled,
  onToggleSound,
  t,
}) {
  return (
    <header className="topbar">
      <a
        href="#stage"
        className="mark"
        onMouseEnter={() => sound.playHover()}
        onClick={() => sound.playTap()}
      >
        <span className="mark-emblem" aria-hidden="true">
          <span className="mark-dot"></span>
        </span>
        <span className="mark-text">烂人文</span>
      </a>

      <nav className="links" aria-label="Site Navigation">
        <button
          type="button"
          className={`control-pill sound-pill ${soundEnabled ? 'active' : ''}`}
          onClick={onToggleSound}
          onMouseEnter={() => sound.playHover()}
          title={soundEnabled ? 'Mute sound' : 'Enable sound effects'}
          aria-label={t('nav.sound')}
        >
          <span className="sound-waves" aria-hidden="true">
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
            <span className="wave-bar"></span>
          </span>
          <span className="pill-label">{t('nav.sound')}</span>
        </button>

        <button
          type="button"
          className="control-pill"
          onClick={() => {
            sound.playTap();
            onChangeLang(currentLang === 'zh-Hans' ? 'en' : 'zh-Hans');
          }}
          onMouseEnter={() => sound.playHover()}
          aria-label="Toggle language"
        >
          <span className="pill-label">{currentLang === 'zh-Hans' ? 'EN' : '中文'}</span>
        </button>

        <button
          type="button"
          className="control-pill"
          onClick={() => {
            sound.playTap();
            onCopyCmd('kevinxft@gmail.com');
          }}
          onMouseEnter={() => sound.playHover()}
        >
          <span className="pill-label">{t('nav.write')}</span>
        </button>

        <a
          href="https://github.com/LanrenwenStudio"
          target="_blank"
          rel="noopener noreferrer"
          className="control-pill github-pill"
          onMouseEnter={() => sound.playHover()}
          onClick={() => sound.playTap()}
        >
          <span className="pill-label">{t('nav.github')}</span>
          <span className="pill-arrow" aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
