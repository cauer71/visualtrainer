import { useEffect, useState } from 'preact/hooks';
import { brand } from '../../config/brand';
import { clearAll } from '../../core/storage';
import { LANGS } from '../../i18n/lang';
import { UI } from '../../i18n/ui';
import { useApp } from '../app-context';
import { fullscreenSupported, initFullscreenPreference, isFullscreen, toggleFullscreen } from '../immersive';
import { flags, href } from '../router';
import { Icon } from './Icon';

function FullscreenButton() {
  const { ui } = useApp();
  const [on, setOn] = useState(isFullscreen());
  useEffect(() => {
    initFullscreenPreference();
    const f = () => setOn(isFullscreen());
    document.addEventListener('fullscreenchange', f);
    return () => document.removeEventListener('fullscreenchange', f);
  }, []);
  if (!fullscreenSupported() || flags.embed) return null;
  const label = on ? ui.nav.exitFullscreen : ui.nav.fullscreen;
  return (
    <button type="button" class="fs-btn" onClick={toggleFullscreen} title={label} aria-label={label} aria-pressed={on}>
      <Icon name={on ? 'shrink' : 'expand'} size={20} />
    </button>
  );
}


export function Header() {
  const { ui, lang, setLang, opt, isOptician, role, askRole } = useApp();
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
          {isOptician ? (
            <>
              <a class="nav-link hide-sm" href={href('/optiker')} title={opt.navOptician}>
                <Icon name="eye" size={20} />
                <span>{opt.navOptician}</span>
              </a>
              <a class="nav-link hide-sm" href={href('/katalog')} title={opt.navCatalog}>
                <Icon name="sparkle" size={20} />
                <span>{opt.navCatalog}</span>
              </a>
              <a class="nav-link hide-sm" href={href('/hintergrund')} title={ui.nav.science}>
                <Icon name="book" size={20} />
                <span>{ui.nav.science}</span>
              </a>
            </>
          ) : null}
          <FullscreenButton />
          {role ? (
            <button type="button" class="role-btn" onClick={askRole} title={opt.roleSwitch} aria-label={`${opt.roleSwitch}: ${isOptician ? opt.roleOpticianShort : opt.roleCustomerShort}`}>
              {isOptician ? opt.roleOpticianShort : opt.roleCustomerShort}
            </button>
          ) : null}
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
  const { ui, bumpData, isOptician } = useApp();
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
          <p class="footer-note">
            <Icon name="eye" size={18} /> {ui.footer.symptoms}
          </p>
          <p class="footer-note">
            <Icon name="warn" size={18} /> {ui.footer.light}
          </p>
        </div>
        <div class="footer-links">
          {isOptician ? <a href={href('/hintergrund')}>{ui.footer.science}</a> : null}
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
      </div>
    </footer>
  );
}
