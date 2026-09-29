import { useState } from 'preact/hooks';
import { brand } from '../../config/brand';
import { clearAll } from '../../core/storage';
import { LANGS } from '../../i18n/lang';
import { UI } from '../../i18n/ui';
import { useApp } from '../app-context';
import { flags, href } from '../router';
import { Icon } from './Icon';

export function Header() {
  const { ui, lang, setLang } = useApp();
  const logo = brand.logoUrl ? <img class="brand-logo" src={brand.logoUrl} alt={brand.opticianName || brand.appName} /> : <BrandMark />;
  return (
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href={href('/')} aria-label={ui.nav.home}>
          {logo}
          <span class="brand-text">
            <span class="brand-name">{brand.appName}</span>
            {brand.opticianName && !flags.embed ? <span class="brand-by">{ui.byline(brand.opticianName)}</span> : null}
          </span>
        </a>
        <nav class="header-nav" aria-label={ui.nav.language}>
          <a class="nav-link hide-sm" href={href('/hintergrund')}>
            <Icon name="book" size={20} />
            <span>{ui.nav.science}</span>
          </a>
          <div class="lang-switch" role="group" aria-label={ui.nav.language}>
            {LANGS.map((l) => (
              <button
                key={l}
                type="button"
                class={`lang-btn${l === lang ? ' is-active' : ''}`}
                aria-pressed={l === lang}
                title={UI[l].langName}
                onClick={() => setLang(l)}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

function BrandMark() {
  return (
    <svg class="brand-mark" viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="12" fill="var(--brand)" />
      <path d="M7 20s5-8.5 13-8.5S33 20 33 20s-5 8.5-13 8.5S7 20 7 20z" fill="none" stroke="#fff" stroke-width="2.6" stroke-linejoin="round" />
      <circle cx="20" cy="20" r="4.6" fill="#fff" />
      <circle cx="21.6" cy="18.4" r="1.4" fill="var(--brand)" />
    </svg>
  );
}

export function Footer() {
  const { ui, bumpData } = useApp();
  const [msg, setMsg] = useState<string | null>(null);
  const reset = () => {
    if (window.confirm(ui.footer.resetConfirm)) {
      clearAll();
      bumpData();
      setMsg(ui.footer.resetDone);
      window.setTimeout(() => setMsg(null), 3000);
    }
  };
  return (
    <footer class="site-footer">
      <div class="container">
        {brand.appointmentUrl ? (
          <div class="cta-box">
            <Icon name="eye" size={28} />
            <p>{ui.footer.cta}</p>
            <a class="btn btn-primary" href={brand.appointmentUrl} target="_blank" rel="noopener">
              {ui.footer.ctaButton}
            </a>
          </div>
        ) : null}
        <div class="footer-grid">
          <p class="footer-note">
            <Icon name="info" size={18} /> {ui.footer.disclaimer}
          </p>
          <p class="footer-note">
            <Icon name="check" size={18} /> {ui.footer.privacy}
          </p>
        </div>
        <div class="footer-links">
          <a href={href('/hintergrund')}>{ui.footer.science}</a>
          {brand.privacyUrl ? (
            <a href={brand.privacyUrl} target="_blank" rel="noopener">
              {ui.footer.privacyLink}
            </a>
          ) : null}
          {brand.imprintUrl ? (
            <a href={brand.imprintUrl} target="_blank" rel="noopener">
              {ui.footer.imprintLink}
            </a>
          ) : null}
          <button type="button" class="link-btn" onClick={reset}>
            <Icon name="trash" size={16} /> {ui.footer.reset}
          </button>
          {msg ? <span class="footer-msg" role="status">{msg}</span> : null}
        </div>
        {brand.opticianName ? <p class="footer-copy">© {new Date().getFullYear()} {brand.opticianName}</p> : null}
      </div>
    </footer>
  );
}
