// Validateur d'arité des tracés SVG — versionné en test permanent (finding 10 de
// la vague de correctifs finale). Reprend le protocole documenté dans NOTES.md
// § « Pièges rencontrés » / § « Vérifications » des vagues précédentes : ce
// script tournait à la main à chaque itération de dessin, jamais commité comme
// test. Il parcourt les 37 modules SVG du livre (26 poneys + 10 lieux + la
// carte), rendus avec leurs VRAIES couleurs de `js/data.js`, et vérifie que
// chaque commande de chaque tracé `d="…"` a un nombre de paramètres qui est un
// multiple de son arité — sinon le navigateur abandonne silencieusement la fin
// du tracé (piège du `C` à 5 paires au lieu de 6, NOTES.md § vague 1).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PERSONNAGES, LIEUX } from '../js/data.js';

// Arité de chaque commande de path SVG (nombre de paramètres par occurrence,
// les commandes se répètent implicitement sans répéter la lettre).
const ARITE = { M: 2, L: 2, T: 2, H: 1, V: 1, C: 6, S: 4, Q: 4, A: 7, Z: 0 };
const LETTRES = Object.keys(ARITE).join('');
const RE_COMMANDE = new RegExp(`([${LETTRES}])([^${LETTRES}]*)`, 'gi');
const RE_NOMBRE = /-?\d*\.?\d+(?:[eE]-?\d+)?/g;
// Motif de capture des tracés : exige un blanc ou un guillemet devant `d="…"`,
// sinon la fin de `id="…"` (ex. un gradient) est comptée comme un tracé invalide
// (NOTES.md § carte, correction du motif de capture).
const RE_TRACE = /[\s"]d="([^"]+)"/g;

function tracesDe(svg) {
  return [...svg.matchAll(RE_TRACE)].map(m => m[1]);
}

function validerTrace(d, contexte) {
  for (const [, lettre, params] of d.matchAll(RE_COMMANDE)) {
    const arite = ARITE[lettre.toUpperCase()];
    const nombres = params.match(RE_NOMBRE) ?? [];
    if (arite === 0) {
      assert.equal(nombres.length, 0, `${contexte} : commande "${lettre}" ne prend aucun paramètre (${nombres.length} trouvés)`);
      continue;
    }
    assert.equal(nombres.length % arite, 0,
      `${contexte} : commande "${lettre}" a ${nombres.length} paramètre(s), pas un multiple de ${arite} — d="${d}"`);
  }
}

function validerSortie(svg, contexte) {
  assert.ok(!/undefined/.test(svg), `${contexte} : "undefined" dans le SVG rendu`);
  assert.ok(!/NaN/.test(svg), `${contexte} : "NaN" dans le SVG rendu`);
  const traces = tracesDe(svg);
  for (const d of traces) validerTrace(d, contexte);
  return traces.length;
}

test('les 26 modules de poneys ont des tracés d\'arité valide', async () => {
  let total = 0;
  for (const p of PERSONNAGES) {
    const mod = await import(`../svg/poneys/${p.id}.js`);
    total += validerSortie(mod.default(p.couleurs), p.id);
    if (p.cutieMark) total += validerSortie(mod.cutieMark(p.couleurs), `${p.id} (marque de beauté)`);
  }
  assert.ok(total > 0);
});

test('les 10 modules de lieux ont des tracés d\'arité valide', async () => {
  let total = 0;
  for (const l of LIEUX) {
    const mod = await import(`../svg/lieux/${l.id}.js`);
    total += validerSortie(mod.default(), l.id);
  }
  assert.ok(total > 0);
});

test('la carte a des tracés d\'arité valide', async () => {
  const mod = await import('../svg/carte.js');
  const total = validerSortie(mod.default(), 'carte');
  assert.ok(total > 0);
});
