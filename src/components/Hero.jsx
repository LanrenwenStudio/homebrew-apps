import React from 'react';

export default function Hero({ t }) {
  return (
    <section id="stage" className="stage">
      <div className="copy">
        <p className="kicker">{t('hero.kicker')}</p>
        <h1>{t('hero.title')}</h1>
        <p className="line">{t('hero.line')}</p>
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
