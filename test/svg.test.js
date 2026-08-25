import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, statSync } from 'node:fs';
import { PERSONNAGES, LIEUX } from '../js/data.js';

const RACINE = new URL('..', import.meta.url);

// Les personnages ne sont plus des modules SVG mais des images officielles détourées
// (amendement du 25/08) : la complétude se vérifie sur les fichiers PNG.
test('chaque personnage a son image détourée', () => {
  for (const p of PERSONNAGES) {
    const png = new URL(`img/poneys/${p.id}.png`, RACINE);
    assert.ok(existsSync(png), `img/poneys/${p.id}.png manquant`);
    // 2 Ko : en dessous, ce n'est pas un personnage plein pied mais un fichier tronqué.
    assert.ok(statSync(png).size > 2048, `img/poneys/${p.id}.png trop léger`);
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
