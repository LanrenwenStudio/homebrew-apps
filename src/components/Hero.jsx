import React, { useState, useEffect } from 'react';
import { Coffee, Headphones, Laptop, Music2, Copy, ArrowRight, Terminal } from 'lucide-react';
import { GithubIcon } from './Icons';

const DEFAULT_AVATAR = 'assets/avatar-default.webp';
const RANDOM_AVATARS = [
  'assets/avatar-random-1.webp',
  'assets/avatar-random-2.webp',
  'assets/avatar-random-3.webp'
];

const FLOATING_ICONS = [
  { color: '#FF6B4A', Icon: Coffee },
  { color: '#2563EB', Icon: Laptop },
  { color: '#16A34A', Icon: Music2 },
  { color: '#7C3AED', Icon: Headphones }
];

export default function Hero({ t, onCopyCmd }) {
  const [avatarSrc, setAvatarSrc] = useState(DEFAULT_AVATAR);
  const [floatingIconIndex, setFloatingIconIndex] = useState(0);
  const commandText = 'brew tap LanrenwenStudio/apps';

  // Preload avatars for instant hover switch
  useEffect(() => {
    RANDOM_AVATARS.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Cycle floating icon
  useEffect(() => {
    const timer = setInterval(() => {
      setFloatingIconIndex(index => (index + 1) % FLOATING_ICONS.length);
    }, 2600);
    return () => clearInterval(timer);
  }, []);

  const handleMouseEnter = () => {
    const randomIndex = Math.floor(Math.random() * RANDOM_AVATARS.length);
    setAvatarSrc(RANDOM_AVATARS[randomIndex]);
  };

  const handleMouseLeave = () => {
    setAvatarSrc(DEFAULT_AVATAR);
  };

  const FloatingIcon = FLOATING_ICONS[floatingIconIndex].Icon;

  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <div className="hero-status-pill">
          <span className="status-dot"></span>
          <span>{t('hero.badge')}</span>
        </div>

        <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: t('hero.title') }}></h1>

        <p className="hero-bio">{t('hero.bio')}</p>

        <div className="hero-cmd-box">
          <div className="hero-cmd-text">
            <Terminal size={14} className="hero-cmd-prompt" />
            <span>{commandText}</span>
          </div>
          {onCopyCmd && (
            <button 
              type="button"
              className="hero-cmd-copy-btn"
              onClick={() => onCopyCmd(commandText)}
              title={t('common.copyCmd')}
            >
              <Copy size={13} />
              <span>{t('common.copyCmd')}</span>
            </button>
          )}
        </div>

        <div className="hero-tags-row">
          <span className="hero-tech-tag"><i className="tech-dot swift"></i> Swift &amp; SwiftUI</span>
          <span className="hero-tech-tag"><i className="tech-dot ts"></i> TypeScript</span>
          <span className="hero-tech-tag"><i className="tech-dot rn"></i> React Native</span>
          <span className="hero-tech-tag"><i className="tech-dot harmony"></i> HarmonyOS ArkTS</span>
          <span className="hero-tech-tag"><i className="tech-dot electron"></i> Electron</span>
        </div>

        <div className="hero-actions">
          <a href="#apps" className="btn-hero-primary">
            <span>{t('hero.ctaApps')}</span>
            <ArrowRight size={15} />
          </a>
          <a 
            href="https://github.com/LanrenwenStudio" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-hero-secondary"
          >
            <GithubIcon size={15} />
            <span>{t('hero.ctaGitHub')}</span>
          </a>
        </div>
      </div>

      <div className="hero-avatar-wrapper">
        <div 
          className="hero-avatar-frame"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{ cursor: 'pointer' }}
          title="点击或悬停切换表情"
        >
          <div className="avatar-circle-container">
            <img 
              src={avatarSrc} 
              alt="Kevin Main Avatar" 
              className="avatar-image-main is-loaded" 
              width="260" 
              height="260" 
            />
          </div>

          {/* Floating Doodles & Stickers */}
          <div className="floating-doodle doodle-speech">&lt;/&gt;</div>
          
          <div className="floating-doodle doodle-terminal">
            <span className="terminal-text">$ kevin</span>
            <span className="terminal-cursor"></span>
          </div>

          <div className="floating-doodle doodle-todo">
            <div className="todo-header">⚡ DEV LOOP</div>
            <ul className="todo-list">
              <li>☑ Code</li>
              <li>☑ Test</li>
              <li>☑ Debug</li>
            </ul>
          </div>

          <div className="floating-doodle doodle-binary">9527</div>

          <div
            className="floating-doodle doodle-coffee"
            style={{ backgroundColor: FLOATING_ICONS[floatingIconIndex].color }}
            aria-label="Rotating icon"
          >
            <FloatingIcon size={20} strokeWidth={2.2} />
          </div>
        </div>
      </div>
    </section>
  );
}
