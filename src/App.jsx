import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Works from './components/Works';
import Footer from './components/Footer';
import { TRANSLATIONS } from './data/translations';
import { sound } from './utils/sound';

export default function App() {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('kevoralabs_lang');
    if (saved) return saved;
    const browserLang = navigator.language || navigator.userLanguage || '';
    return browserLang.toLowerCase().startsWith('zh') ? 'zh-Hans' : 'en';
  });
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const toastTimerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('kevoralabs_lang', lang);
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-Hans';
    document.title = TRANSLATIONS[lang]?.['meta.title'] || '烂人文';
  }, [lang]);

  // Ambient mouse aura effect
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId;

    const onPointerMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const aura = document.getElementById('ambient-aura');

    const update = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      if (aura) {
        aura.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      rafId = requestAnimationFrame(update);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    rafId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const t = (key) => TRANSLATIONS[lang]?.[key] || TRANSLATIONS['zh-Hans']?.[key] || key;

  const handleToggleSound = () => {
    const next = sound.toggle();
    setSoundEnabled(next);
  };

  const handleCopyCmd = (text) => {
    const showSuccessToast = () => {
      sound.playSuccess();
      setToastMsg(t('common.copyEmail'));
      setShowToast(true);
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = setTimeout(() => setShowToast(false), 2400);
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(showSuccessToast).catch(() => {
        fallbackCopyText(text, showSuccessToast);
      });
    } else {
      fallbackCopyText(text, showSuccessToast);
    }
  };

  const fallbackCopyText = (text, callback) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      if (callback) callback();
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <div className="canvas-wrapper">
      {/* Dynamic ambient background glow */}
      <div id="ambient-aura" className="ambient-aura" aria-hidden="true" />
      <div className="noise-underlay" aria-hidden="true" />

      <div className="sheet">
        <Header
          currentLang={lang}
          onChangeLang={setLang}
          onCopyCmd={handleCopyCmd}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          t={t}
        />
        <main className="main-content">
          <Hero t={t} />
          <Works t={t} />
        </main>
        <Footer t={t} />

        <div className={`toast ${showToast ? 'show' : ''}`} role="status" aria-live="polite">
          <span className="toast-icon">✓</span>
          <span className="toast-text">{toastMsg}</span>
        </div>
      </div>
    </div>
  );
}
