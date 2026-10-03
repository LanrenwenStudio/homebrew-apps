import React, { useRef, useEffect, useState } from 'react';
import { sound } from '../utils/sound';

export default function Hero({ t }) {
  const lines = (t('hero.line') || '').split('\n');
  const mascotRef = useRef(null);
  const [petCount, setPetCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = mascotRef.current;
    if (!el) return;

    let rafId;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReducedMotion) return;

    const handlePointerMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      // Normalized distance from center (-1 to 1)
      const dx = (e.clientX - centerX) / (window.innerWidth * 0.5);
      const dy = (e.clientY - centerY) / (window.innerHeight * 0.5);

      // Subtle tilt: max 12 degrees tilt, 14px parallax translate
      targetX = Math.max(-1, Math.min(1, dx)) * 10;
      targetY = Math.max(-1, Math.min(1, dy)) * 10;
    };

    const handlePointerLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (el) {
        el.style.transform = `perspective(1000px) rotateY(${currentX}deg) rotateX(${-currentY}deg) translate3d(${currentX * 0.8}px, ${currentY * 0.8}px, 0)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleMascotClick = () => {
    setPetCount((prev) => prev + 1);
    sound.playPurr();
  };

  return (
    <section id="stage" className="stage">
      <div className="stage-copy">
        <div className="kicker-group">
          <span className="status-badge" aria-label="Status">
            <span className="pulse-dot"></span>
            <span className="status-label">{t('hero.badge')}</span>
          </span>
          <span className="kicker-divider">/</span>
          <span className="kicker-name">{t('hero.kicker')}</span>
        </div>

        <h1 className="display-title">
          <span className="title-text">{t('hero.title')}</span>
        </h1>

        <div className="line-wrapper">
          {lines.map((segment, idx) => (
            <p key={idx} className="line-item">
              {segment}
            </p>
          ))}
        </div>

        <p className="note-text">
          <span className="note-accent-dot" aria-hidden="true">✦</span>
          <span>{t('hero.note')}</span>
        </p>
      </div>

      <div className="stage-visual">
        <div
          ref={mascotRef}
          className={`mascot-card ${isHovered ? 'hovered' : ''}`}
          onClick={handleMascotClick}
          onMouseEnter={() => {
            setIsHovered(true);
            sound.playHover();
          }}
          onMouseLeave={() => setIsHovered(false)}
          title="点击互动"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleMascotClick();
            }
          }}
        >
          <div className="mascot-backdrop-glow" aria-hidden="true" />
          <figure className="mascot-figure">
            <img
              src="assets/logo.webp"
              alt="一只端着咖啡、夹着电脑的橘白猫"
              width="1254"
              height="1254"
              className="mascot-img"
              draggable="false"
            />
          </figure>
          {petCount > 0 && (
            <div key={petCount} className="pet-toast" aria-hidden="true">
              ☕️ +1
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
