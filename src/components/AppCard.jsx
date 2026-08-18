import React from 'react';
import { ExternalLink, QrCode, Terminal, Sparkles } from 'lucide-react';

export default function AppCard({ app, t, onOpenQr, onCopyCmd }) {
  const isIOS = typeof navigator !== 'undefined' && /iPhone|iPad|iPod/i.test(navigator.userAgent);

  const getStoreHref = () => {
    if (!app.storeUrl) return null;
    if (isIOS && app.categories.includes('ios')) {
      const idMatch = app.storeUrl.match(/id(\d+)/);
      if (idMatch) return `itms-apps://apps.apple.com/app/id${idMatch[1]}`;
    }
    return app.storeUrl;
  };

  const storeHref = getStoreHref();
  const hasAction = Boolean(
    app.website || app.chromeStoreUrl || storeHref || app.brewCmd || app.miniQr || app.harmonyQr
  );

  const getPlatformInfo = () => {
    if (app.categories.includes('macos')) return { label: 'macOS', cls: 'macos' };
    if (app.categories.includes('ios')) return { label: 'iOS', cls: 'ios' };
    if (app.categories.includes('extension')) return { label: 'Extension', cls: 'extension' };
    if (app.categories.includes('mini')) return { label: 'Mini Program', cls: 'mini' };
    if (app.categories.includes('harmony')) return { label: 'HarmonyOS', cls: 'harmony' };
    if (app.categories.includes('electron')) return { label: 'Electron', cls: 'electron' };
    return { label: 'App', cls: 'macos' };
  };

  const platform = getPlatformInfo();

  return (
    <article className="app-card" data-category={app.categories.join(' ')}>
      <div className="app-card-header">
        <div className="app-icon-wrapper">
          <img 
            src={app.icon} 
            alt={`${t(app.nameKey)} icon`} 
            className="app-icon is-loaded" 
            width="48" 
            height="48" 
            loading="lazy" 
          />
        </div>
        <div className="app-meta">
          <div className="app-title-row">
            <h3 className="app-title">{t(app.nameKey)}</h3>
            <span className={`app-platform-badge ${platform.cls}`}>{platform.label}</span>
          </div>
          {app.tagline && <p className="app-tagline">{app.tagline}</p>}
        </div>
      </div>
      <p className="app-description">{t(app.descKey)}</p>

      {app.features && app.features.length > 0 && (
        <div className="app-features-row">
          {app.features.slice(0, 2).map((featKey, idx) => {
            const featText = t(featKey).replace(/^[\p{Emoji}\u200B-\u3300\s]+/u, '');
            return (
              <span key={idx} className="app-feature-pill">
                <Sparkles size={11} />
                <span>{featText}</span>
              </span>
            );
          })}
        </div>
      )}

      <div className="app-actions">
        {app.website && (
          <a 
            href={app.website} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="app-btn primary"
          >
            <span>{t('common.visitSite').replace(' ↗', '')}</span>
            <ExternalLink size={12} />
          </a>
        )}

        {app.chromeStoreUrl && (
          <a 
            href={app.chromeStoreUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="app-btn"
          >
            <span>{t('common.chromeStore').replace(' ↗', '')}</span>
            <ExternalLink size={12} />
          </a>
        )}

        {storeHref && (
          <a 
            href={storeHref} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="app-btn store-btn"
          >
            <span>{t('common.appStore').replace(' ↗', '')}</span>
            <ExternalLink size={12} />
          </a>
        )}

        {app.brewCmd && (
          <button 
            type="button" 
            className="app-btn" 
            onClick={() => onCopyCmd(app.brewCmd)}
            title={app.brewCmd}
          >
            <Terminal size={12} />
            <span>Homebrew</span>
          </button>
        )}

        {app.miniQr && (
          <button 
            type="button" 
            className="app-btn" 
            onClick={() => onOpenQr(t(app.nameKey), app.miniQr)}
          >
            <QrCode size={12} />
            <span>{t('common.miniProgram')}</span>
          </button>
        )}

        {app.harmonyQr && (
          <button 
            type="button" 
            className="app-btn" 
            onClick={() => onOpenQr(t(app.nameKey), app.harmonyQr)}
          >
            <QrCode size={12} />
            <span>{t('common.harmonyApp')}</span>
          </button>
        )}

        {app.categories.includes('harmony') && !hasAction && (
          <span className="app-btn disabled">HarmonyOS</span>
        )}
      </div>
    </article>
  );
}
