import React from 'react';
import { Sun, Moon, Globe, Mail } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function Header({ currentTheme, currentLang, onToggleTheme, onChangeLang, onCopyCmd, t }) {
  return (
    <header className="site-header">
      <nav className="nav-container">
        <a href="#hero" className="nav-brand">
          <img 
            src="assets/avatar.webp" 
            alt="Kevin Avatar" 
            className="brand-avatar-img is-loaded" 
            width="34" 
            height="34" 
          />
          <span className="brand-name">
            Kevin <span className="brand-badge">· Lanrenwen</span>
          </span>
        </a>

        <ul className="nav-menu">
          <li><a href="#apps" className="nav-link active">{t('nav.all')}</a></li>
          <li><a href="#contact" className="nav-link">{t('nav.contact')}</a></li>
        </ul>

        <div className="nav-actions">
          <button 
            type="button"
            className="nav-control-btn icon-only" 
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            title={currentTheme === 'dark' ? t('theme.togglePaper') : t('theme.toggleDark')}
          >
            {currentTheme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            type="button"
            className="nav-control-btn" 
            onClick={() => onChangeLang(currentLang === 'zh-Hans' ? 'en' : 'zh-Hans')}
            aria-label="Language Selector"
          >
            <Globe size={14} />
            <span>{currentLang === 'zh-Hans' ? '中' : 'EN'}</span>
          </button>

          <button
            id="copy-email-btn"
            type="button"
            className="nav-control-btn"
            onClick={() => onCopyCmd('kevinxft@gmail.com')}
            aria-label={t('common.copyEmail')}
            title="kevinxft@gmail.com"
          >
            <Mail size={14} />
            <span>{t('common.copyEmail')}</span>
          </button>

          <a 
            href="https://github.com/LanrenwenStudio" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="nav-control-btn icon-only"
            aria-label="GitHub Profile"
            title="GitHub @LanrenwenStudio"
          >
            <GithubIcon size={16} />
          </a>
        </div>
      </nav>
    </header>
  );
}
