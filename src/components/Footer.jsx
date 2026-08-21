import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div>
          <span>© {currentYear} Kevin / Lanrenwen Studio · Independent Software</span>
          <span className="footer-version">v1.3.27</span>
        </div>
        <div className="footer-sub">
          <span>Crafted with passion &amp; Apple HIG Aesthetics</span>
        </div>
      </div>
    </footer>
  );
}
