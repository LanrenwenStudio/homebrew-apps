import React from 'react';
import { Mail, Copy } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function Contact({ t, onCopyCmd }) {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-card">
        <span className="section-tag">{t('contact.tag')}</span>
        <h2 className="contact-title">{t('contact.title')}</h2>
        <p className="contact-desc">{t('contact.desc')}</p>

        <div className="contact-actions">
          <div className="contact-email-badge">
            <Mail size={14} className="contact-icon" />
            <span>kevinxft@gmail.com</span>
          </div>

          <button 
            type="button" 
            className="contact-btn primary" 
            onClick={() => onCopyCmd('kevinxft@gmail.com')}
          >
            <Copy size={13} />
            <span>{t('common.copyEmail')}</span>
          </button>

          <a 
            href="https://github.com/kevinxft" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="contact-btn"
          >
            <GithubIcon size={14} />
            <span>@kevinxft</span>
          </a>

          <a 
            href="https://github.com/LanrenwenStudio" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="contact-btn"
          >
            <GithubIcon size={14} />
            <span>@LanrenwenStudio</span>
          </a>
        </div>
      </div>
    </section>
  );
}
