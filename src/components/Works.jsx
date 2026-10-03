import React, { useRef } from 'react';
import { sound } from '../utils/sound';

const WORKS = [
  {
    id: 'englishcc',
    num: '01',
    name: 'EnglishCC',
    category: 'Extension / Web',
    href: 'https://englishcc.com/',
    icon: 'assets/englishcc-icon.webp',
    lineKey: 'works.englishcc',
  },
  {
    id: 'keylaunch',
    num: '02',
    name: 'KeyLaunch',
    category: 'macOS MenuBar',
    href: 'https://keylaunch.lanrenwen.com',
    icon: 'assets/keylaunch-icon.webp',
    lineKey: 'works.keylaunch',
  },
  {
    id: 'pauseloop',
    num: '03',
    name: 'PauseLoop',
    category: 'macOS Utility',
    href: 'https://pauseloop.lanrenwen.com',
    icon: 'assets/pauseloop-icon.webp',
    lineKey: 'works.pauseloop',
  },
  {
    id: 'xtoeagle',
    num: '04',
    name: 'X to Eagle',
    category: 'Chrome Extension',
    href: 'https://xtoeagle.lanrenwen.com/',
    icon: 'assets/x-to-eagle-icon.webp',
    lineKey: 'works.xtoeagle',
  },
];

export default function Works({ t }) {
  const containerRef = useRef(null);

  const handlePointerMove = (e, cardEl) => {
    if (!cardEl) return;
    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardEl.style.setProperty('--mouse-x', `${x}px`);
    cardEl.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section className="works-shelf" aria-label={t('works.label')}>
      <div className="works-grid" ref={containerRef}>
        {WORKS.map((work) => (
          <a
            key={work.id}
            className="work-card"
            href={work.href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.playHover()}
            onClick={() => sound.playTap()}
            onPointerMove={(e) => handlePointerMove(e, e.currentTarget)}
          >
            {/* Specular spotlight overlay driven by pointer */}
            <div className="card-spotlight" aria-hidden="true" />
            <div className="card-inner">
              <div className="card-header">
                <div className="icon-wrapper">
                  <img
                    src={work.icon}
                    alt=""
                    width="44"
                    height="44"
                    loading="lazy"
                    className="card-app-icon"
                  />
                  <div className="icon-rim" aria-hidden="true" />
                </div>
                <div className="card-meta">
                  <span className="card-index">{work.num}</span>
                  <span className="card-category">{work.category}</span>
                </div>
              </div>

              <div className="card-body">
                <div className="card-title-row">
                  <strong className="card-name">{work.name}</strong>
                  <span className="card-arrow-pill" aria-hidden="true">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="arrow-svg"
                    >
                      <path
                        d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                <p className="card-desc">{t(work.lineKey)}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
