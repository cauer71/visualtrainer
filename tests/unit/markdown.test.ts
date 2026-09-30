import { describe, expect, it } from 'vitest';
import { renderMarkdown } from '../../src/ui/markdown';

describe('renderMarkdown', () => {
  it('maskiert HTML und erlaubt keine Skript-Links', () => {
    const html = renderMarkdown('<script>alert(1)</script> [x](javascript:alert(1))');
    expect(html).not.toContain('<script>');
    expect(html).not.toContain('href="javascript');
  });
  it('setzt Überschriften, Listen, Tabellen und Links um', () => {
    const md = '# Titel\n\n- a\n- **b**\n\n| A | B |\n|---|---|\n| 1 | 2 |\n\nSiehe https://doi.org/10.1/x.';
    const html = renderMarkdown(md);
    expect(html).toContain('<h2>Titel</h2>');
    expect(html).toContain('<ul><li>a</li><li><strong>b</strong></li></ul>');
    expect(html).toContain('<table>');
    expect(html).toContain('href="https://doi.org/10.1/x"');
  });
  it('wandelt Verweise auf Katalogdateien in interne Links', () => {
    const html = renderMarkdown('[405](405-zig-zag-path-pursuit.md)', { catalogLink: (nr) => `#/katalog/${nr}` });
    expect(html).toContain('href="#/katalog/405"');
  });
});
