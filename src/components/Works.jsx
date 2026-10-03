import React from 'react';

const WORKS = [
  {
    id: 'keylaunch',
    name: 'KeyLaunch',
    href: 'https://keylaunch.lanrenwen.com',
    icon: 'assets/keylaunch-icon.webp',
    lineKey: 'works.keylaunch',
  },
  {
    id: 'englishcc',
    name: 'EnglishCC',
    href: 'https://englishcc.com/',
    icon: 'assets/englishcc-icon.webp',
    lineKey: 'works.englishcc',
  },
  {
    id: 'pauseloop',
    name: 'PauseLoop',
    href: 'https://pauseloop.lanrenwen.com',
    icon: 'assets/pauseloop-icon.webp',
    lineKey: 'works.pauseloop',
  },
];

export default function Works({ t }) {
  return (
    <section className="works" aria-label={t('works.label')}>
      {WORKS.map((work) => (
        <a key={work.id} className="work" href={work.href}>
          <img src={work.icon} alt="" width="36" height="36" />
          <span>
            <strong>{work.name}</strong>
            <em>{t(work.lineKey)}</em>
          </span>
        </a>
      ))}
    </section>
  );
}
