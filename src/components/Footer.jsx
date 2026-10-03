import React from 'react';

export default function Footer({ t }) {
  return (
    <footer className="colophon">
      <span>© {new Date().getFullYear()} Kevin · {t('footer.mark')}</span>
      <span className="footer-version">v1.3.41</span>
    </footer>
  );
}
