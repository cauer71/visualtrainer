/**
 * Platzhalter für Übungen, die gerade entwickelt werden.
 * Zeigt einen Hinweis und beendet sich nach kurzer Zeit.
 */
import { background, C, text } from '../core/draw';
import type { CategoryId, ExerciseContext, ExerciseDefinition, ExerciseTexts } from '../core/types';

function texts(title: string, tagline: string): ExerciseTexts {
  return {
    title,
    tagline,
    steps: ['…'],
    why: '…',
    goodFor: [],
    captions: {},
    metrics: { score: 'Punkte' },
    tips: {},
    feedback: {},
  };
}

export function stub(id: string, category: CategoryId, color: string, de: [string, string], it: [string, string]): ExerciseDefinition {
  return {
    id,
    category,
    minutes: 1,
    color,
    icon: '<circle cx="24" cy="24" r="14" fill="none" stroke="currentColor" stroke-width="4" stroke-dasharray="6 6"/>',
    texts: { de: texts(...de), it: texts(...it) },
    create: (ctx: ExerciseContext) => {
      let t0 = 0;
      return {
        start: (t) => {
          t0 = t;
        },
        update: (_dt, t) => {
          if (t - t0 > 2500) {
            ctx.finish({ primary: { key: 'score', value: 0, unit: 'points', better: 'higher' }, secondary: [], score: 0, level: 1 });
          }
        },
        render: (g) => {
          const { w, h, dpr, u } = ctx.stage;
          background(g, w, h, dpr);
          text(g, '🚧', w / 2, h / 2 - u * 8, u * 10, C.fg);
          text(g, ctx.texts.title, w / 2, h / 2 + u * 6, u * 5, C.fg);
        },
      };
    },
  };
}
