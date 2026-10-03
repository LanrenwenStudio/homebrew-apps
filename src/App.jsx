import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Works from './components/Works';
import Footer from './components/Footer';
import { TRANSLATIONS } from './data/translations';

export default function App() {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('kevoralabs_lang');
    if (saved) return saved;
    const browserLang = navigator.language || navigator.userLanguage || '';
    return browserLang.toLowerCase().startsWith('zh') ? 'zh-Hans' : 'en';
  });
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);
  const toastTimerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('kevoralabs_lang', lang);
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-Hans';
    document.title = TRANSLATIONS[lang]?.['meta.title'] || '烂人文';
  }, [lang]);

  const t = (key) => TRANSLATIONS[lang]?.[key] || TRANSLATIONS['zh-Hans']?.[key] || key;

  const handleCopyCmd = (text) => {
    const showSuccessToast = () => {
      setToastMsg(t('common.copyEmail'));
      setShowToast(true);
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = setTimeout(() => setShowToast(false), 2000);
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
    <div className="sheet">
      <Header
        currentLang={lang}
        onChangeLang={setLang}
        onCopyCmd={handleCopyCmd}
        t={t}
      />
      <main>
        <Hero t={t} />
        <Works t={t} />
      </main>
      <Footer t={t} />
      <div className={`toast ${showToast ? 'show' : ''}`} role="status">{toastMsg}</div>
    </div>
  );
}
