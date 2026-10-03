import React from 'react';

export default function Hero({ t }) {
  const lines = (t('hero.line') || '').split('\n');
  return (
    <section id="stage" className="stage">
      <div className="copy">
        <p className="kicker">{t('hero.kicker')}</p>
        <h1>{t('hero.title')}</h1>
        <p className="line">
          {lines.map((segment, idx) => (
            <span key={idx} className="line-item">{segment}</span>
          ))}
        </p>
        <p className="note">{t('hero.note')}</p>
      </div>

      <figure className="mascot">
        <img
          src="assets/logo.webp"
          alt="一只端着咖啡、夹着电脑的橘白猫"
          width="1254"
          height="1254"
        />
      </figure>
    </section>
  );
}
