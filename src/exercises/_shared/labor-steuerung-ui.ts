/**
 * Startbildschirm für „Gerät kippen“ (Slalom, Invasoren): Die Person schaltet das Kippen selbst ein – erst dann fragt der
 * Browser (iOS/iPadOS) nach der Erlaubnis. Danach wird die Haltung „in der Mitte“ übernommen (kurzer Countdown). Gibt es
 * keine Erlaubnis oder keinen Sensor, gilt Zeiger/Pfeiltasten, mit einem Hinweis.
 *
 * Ablauf: choose → (Tippen auf „Kippen einschalten“, Anfrage beim Loslassen) → listening → countdown → done.
 * Die Anfrage geht bewusst erst beim Loslassen (pointerup/touchend/click) hinaus, weil iOS sie nur aus solchen
 * Berührungen heraus annimmt; lehnt der Browser sie ab (`retry`), versucht die nächste Berührung es noch einmal.
 */
import { C, font, rrPath } from '../../core/draw';
import { clamp } from '../../core/stats';
import type { Hud, StageInfo } from '../../core/types';
import type { Rect } from '../labor-wahlreaktion/logic';
import type { EventTargetLike, Steering } from './labor-steuerung';

export interface TiltGateTexts {
  title: string;
  /** Erklärung unter dem Titel (eine bis zwei Zeilen, getrennt durch \n) */
  body: string;
  enable: string;
  usePointer: string;
  asking: string;
  waiting: string;
  /** Countdown-Text; {n} = Sekunden */
  hold: string;
  /** Hinweis (Toast), wenn Kippen nicht geht */
  fallback: string;
}

export type TiltGatePhase = 'choose' | 'asking' | 'listening' | 'countdown' | 'done';

/** Wartezeit auf den ersten gültigen Kippwert nach der Erlaubnis (ms, virtuelle Zeit) */
export const TILT_LISTEN_MS = 1800;
/** Countdown, in dem die Person das Gerät in die gewünschte Mitte-Lage bringt (ms) */
export const TILT_COUNTDOWN_MS = 3000;

const ACTIVATION_EVENTS = ['pointerup', 'touchend', 'click'] as const;

export class TiltGate {
  phase: TiltGatePhase = 'choose';
  /** `true`, wenn statt Kippen Zeiger/Tasten gelten */
  usedFallback = false;
  private armed = false;
  private requesting = false;
  private armedAt = -1e9;
  private lastT = 0;
  private listenFrom = 0;
  private countdownEnd = 0;
  private readonly subs: Array<() => void> = [];

  constructor(
    private readonly steering: Steering,
    private readonly stage: StageInfo,
    private readonly texts: TiltGateTexts,
    private readonly hud: Hud,
    target?: EventTargetLike | null,
  ) {
    if (target) {
      const on = () => this.activate();
      for (const type of ACTIVATION_EVENTS) {
        target.addEventListener(type, on);
        this.subs.push(() => target.removeEventListener(type, on));
      }
    }
  }

  /** Läuft der Startbildschirm noch? (Solange ja, startet die Übung nicht.) */
  get active(): boolean {
    return this.phase !== 'done';
  }

  /** Die beiden Tasten (≥ 56 px) */
  buttons(): { enable: Rect; pointer: Rect } {
    const { w, h, u } = this.stage;
    const bw = clamp(w * 0.86, 120, 440);
    const bh = Math.max(64, Math.min(96, u * 10));
    const x = (w - bw) / 2;
    const y0 = h * 0.5;
    return {
      enable: { x, y: y0, w: bw, h: bh },
      pointer: { x, y: y0 + bh + Math.max(12, u * 2), w: bw, h: Math.max(56, Math.min(72, u * 8)) },
    };
  }

  /** Berührung auf dem Startbildschirm (Koordinaten der Bühne) */
  pointerDown(x: number, y: number, t: number): void {
    if (this.phase !== 'choose') return;
    const b = this.buttons();
    const inR = (r: Rect) => x >= r.x - 4 && x <= r.x + r.w + 4 && y >= r.y - 4 && y <= r.y + r.h + 4;
    if (inR(b.enable)) {
      this.armed = true;
      this.armedAt = t;
    } else if (inR(b.pointer)) {
      this.fallback(false);
    }
  }

  /** Loslassen/Antippen abgeschlossen: erst jetzt die Erlaubnis anfragen (Berührung der Person nötig) */
  activate(): void {
    if (this.phase !== 'choose' || !this.armed || this.requesting) return;
    this.requesting = true;
    this.phase = 'asking';
    void this.steering.requestTilt().then(
      (r) => {
        this.requesting = false;
        if (r === 'listening') {
          this.phase = 'listening';
          this.listenFrom = this.lastT;
        } else if (r === 'retry') {
          this.phase = 'choose'; // die nächste Berührung versucht es erneut
        } else {
          this.fallback(true);
        }
      },
      () => {
        this.requesting = false;
        this.fallback(true);
      },
    );
  }

  private fallback(announce: boolean): void {
    if (this.phase === 'done') return;
    this.usedFallback = true;
    this.phase = 'done';
    this.steering.setActive(['pointer', 'keys']);
    if (announce) this.hud.toast(this.texts.fallback, 'info', { ms: 3200, size: clamp(this.stage.u * 3.6, 15, 24) });
  }

  update(t: number): void {
    this.lastT = t;
    if (this.phase === 'listening') {
      if (this.steering.status === 'ready') {
        this.phase = 'countdown';
        this.countdownEnd = t + TILT_COUNTDOWN_MS;
      } else if (t - this.listenFrom > TILT_LISTEN_MS) {
        this.fallback(true);
      }
    } else if (this.phase === 'countdown' && t >= this.countdownEnd) {
      this.steering.recenter();
      this.phase = 'done';
    }
  }

  private lines(g: CanvasRenderingContext2D, s: string, x: number, y: number, size: number, maxW: number, color: string, weight = 600): number {
    g.font = font(size, weight);
    g.fillStyle = color;
    let yy = y;
    for (const raw of s.split('\n')) {
      // Zeilen umbrechen, wenn sie zu breit sind
      let line = '';
      for (const word of raw.split(' ')) {
        const test = line ? `${line} ${word}` : word;
        if (line && g.measureText(test).width > maxW) {
          g.fillText(line, x, yy, maxW);
          yy += size * 1.3;
          line = word;
        } else line = test;
      }
      if (line) {
        g.fillText(line, x, yy, maxW);
        yy += size * 1.3;
      }
    }
    return yy;
  }

  render(g: CanvasRenderingContext2D, t: number): void {
    if (this.phase === 'done') return;
    const { w, h, u } = this.stage;
    g.save();
    g.fillStyle = 'rgba(11,20,36,0.94)';
    g.fillRect(0, 0, w, h);
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    const maxW = Math.min(w * 0.88, 520);
    const ts = clamp(u * 4.4, 18, 28);
    const bs = clamp(u * 3.2, 14, 20);
    let y = h * 0.12 + ts;
    g.font = font(ts, 800);
    g.fillStyle = C.white;
    y = this.lines(g, this.texts.title, w / 2, y, ts, maxW, C.white, 800);
    this.lines(g, this.texts.body, w / 2, y + bs * 0.4, bs, maxW, C.fg, 600);
    if (this.phase === 'choose' || this.phase === 'asking') {
      const b = this.buttons();
      const draw = (r: Rect, label: string, strong: boolean, pressed: boolean) => {
        rrPath(g, r.x, r.y, r.w, r.h, Math.min(r.h * 0.22, 18));
        g.fillStyle = strong ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.1)';
        g.fill();
        g.lineWidth = pressed ? 4 : 2;
        g.strokeStyle = pressed ? C.white : 'rgba(255,255,255,0.5)';
        g.stroke();
        g.font = font(clamp(r.h * 0.3, 15, 24), 800);
        g.fillStyle = C.white;
        g.fillText(label, r.x + r.w / 2, r.y + r.h / 2, r.w - 24);
      };
      draw(b.enable, this.phase === 'asking' ? this.texts.asking : this.texts.enable, true, this.armed && t - this.armedAt < 600);
      draw(b.pointer, this.texts.usePointer, false, false);
    } else if (this.phase === 'listening') {
      g.font = font(bs * 1.2, 700);
      g.fillStyle = C.white;
      g.fillText(this.texts.waiting, w / 2, h * 0.56, maxW);
    } else {
      const n = Math.max(1, Math.ceil((this.countdownEnd - t) / 1000));
      this.lines(g, this.texts.hold.replace('{n}', String(n)), w / 2, h * 0.52, bs * 1.2, maxW, C.white, 800);
    }
    g.restore();
  }

  destroy(): void {
    for (const f of this.subs) f();
    this.subs.length = 0;
  }
}
