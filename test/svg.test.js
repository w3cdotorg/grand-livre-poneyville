import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PERSONNAGES, LIEUX } from '../js/data.js';

test('chaque personnage a son module SVG conforme', async () => {
  for (const p of PERSONNAGES) {
    const mod = await import(`../svg/poneys/${p.id}.js`);
    const svg = mod.default(p.couleurs);
    assert.ok(svg.includes('<svg'), p.id);
    assert.ok(svg.includes('viewBox="0 0 300 300"'), p.id);
    assert.ok(svg.includes('class="paupieres"'), p.id);
    if (p.cutieMark) {
      const cm = mod.cutieMark(p.couleurs);
      assert.ok(cm.includes('viewBox="0 0 60 60"'), `marque de beauté ${p.id}`);
    }
  }
});

test('chaque lieu a son module SVG conforme', async () => {
  for (const l of LIEUX) {
    const svg = (await import(`../svg/lieux/${l.id}.js`)).default();
    assert.ok(svg.includes('viewBox="0 0 400 300"'), l.id);
  }
});

test('la carte existe', async () => {
  const svg = (await import('../svg/carte.js')).default();
  assert.ok(svg.includes('viewBox="0 0 1000 700"'));
});
