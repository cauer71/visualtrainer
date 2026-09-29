import { render } from 'preact';
import { brand } from './config/brand';
import { App } from './ui/App';
import { flags } from './ui/router';
import './styles/app.css';

// Markenfarben als CSS-Variablen
const root = document.documentElement;
root.style.setProperty('--primary', brand.colors.primary);
root.style.setProperty('--primary-dark', brand.colors.primaryDark);
root.style.setProperty('--primary-soft', brand.colors.primarySoft);
root.style.setProperty('--brand', brand.colors.brand);
root.style.setProperty('--accent', brand.colors.accent);
root.style.setProperty('--accent-soft', brand.colors.accentSoft);
if (flags.embed) root.classList.add('is-embed');

render(<App />, document.getElementById('app')!);
