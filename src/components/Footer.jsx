import React from 'react';

export default function Footer({ t }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="colophon">
      <div className="colophon-left">
        <span className="colophon-author">
          © {currentYear} Kevin · {t('footer.mark')}
        </span>
        <span className="colophon-dot" aria-hidden="true">·</span>
        <span className="colophon-craft">Handcrafted with care</span>
      </div>

      <div className="colophon-right">
        <span className="footer-badge">
          <span className="footer-badge-dot"></span>
          <span className="footer-version">v1.3.42</span>
        </span>
      </div>
    </footer>
  );
}
