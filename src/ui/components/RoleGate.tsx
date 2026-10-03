import { useEffect, useRef } from 'preact/hooks';
import { useApp } from '../app-context';
import { Icon } from './Icon';

/** Auswahl Benutzer, Trainer oder Entwickler – beim ersten Öffnen und über den Knopf in der Kopfzeile. */
export function RoleGate({ onClose }: { onClose?: () => void }) {
  const { opt, role, setRole } = useApp();
  const first = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    first.current?.focus();
    if (!onClose) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [onClose]);
  return (
    <div class="role-gate" role="dialog" aria-modal="true" aria-labelledby="role-title">
      <div class="role-card">
        <h2 id="role-title">{opt.roleTitle}</h2>
        <p class="lead">{opt.roleLead}</p>
        <div class="role-options">
          <button ref={first} type="button" class={`role-option${role === 'kunde' ? ' is-current' : ''}`} onClick={() => setRole('kunde')}>
            <Icon name="eye" size={32} />
            <strong>{opt.roleCustomer}</strong>
            <span>{opt.roleCustomerText}</span>
          </button>
          <button type="button" class={`role-option${role === 'optiker' ? ' is-current' : ''}`} onClick={() => setRole('optiker')}>
            <Icon name="book" size={32} />
            <strong>{opt.roleOptician}</strong>
            <span>{opt.roleOpticianText}</span>
          </button>
          <button type="button" class={`role-option${role === 'entwickler' ? ' is-current' : ''}`} onClick={() => setRole('entwickler')}>
            <Icon name="sliders" size={32} />
            <strong>{opt.roleDeveloper}</strong>
            <span>{opt.roleDeveloperText}</span>
          </button>
        </div>
        <p class="muted role-note">{opt.roleNote}</p>
        {onClose ? (
          <button type="button" class="btn btn-ghost btn-sm" onClick={onClose}>
            {opt.backToHome}
          </button>
        ) : null}
      </div>
    </div>
  );
}
