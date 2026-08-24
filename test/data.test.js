import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PERSONNAGES, LIEUX, PERSONNAGE, LIEU } from '../js/data.js';

const HEX = /^#[0-9a-f]{6}$/;
const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/;

test('ids uniques et en kebab-case', () => {
  const ids = [...PERSONNAGES, ...LIEUX].map(e => e.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) assert.match(id, KEBAB);
});

test('effectifs : 25 personnages, 10 lieux', () => {
  assert.equal(PERSONNAGES.length, 25);
  assert.equal(LIEUX.length, 10);
});

test('chaque personnage est complet', () => {
  for (const p of PERSONNAGES) {
    assert.ok(p.nom, p.id);
    assert.ok(p.espece, p.id);
    assert.match(p.couleurs.robe, HEX, p.id);
    assert.ok(Array.isArray(p.couleurs.criniere), p.id);
    assert.match(p.couleurs.yeux, HEX, p.id);
    assert.ok(p.texte.length >= 40, p.id);
    assert.ok(p.lieuId === null || LIEU[p.lieuId], `${p.id} → lieu ${p.lieuId}`);
  }
});

test('les liens pointent vers des personnages existants', () => {
  for (const p of PERSONNAGES) {
    for (const id of [...(p.liens.famille ?? []), ...(p.liens.amis ?? [])])
      assert.ok(PERSONNAGE[id], `${p.id} → ${id}`);
    if (p.liens.animal) assert.equal(PERSONNAGE[p.liens.animal].liens.proprietaire, p.id);
    if (p.liens.proprietaire) assert.equal(PERSONNAGE[p.liens.proprietaire].liens.animal, p.id);
  }
});

test('la famille est réciproque', () => {
  for (const p of PERSONNAGES)
    for (const id of p.liens.famille ?? [])
      assert.ok(PERSONNAGE[id].liens.famille.includes(p.id), `${p.id} ↔ ${id}`);
});

test('chaque lieu est complet et ses habitants existent', () => {
  for (const l of LIEUX) {
    assert.ok(l.nom && l.texte.length >= 40, l.id);
    assert.ok(l.carte.x >= 0 && l.carte.x <= 100 && l.carte.y >= 0 && l.carte.y <= 100, l.id);
    for (const id of l.habitants) assert.ok(PERSONNAGE[id], `${l.id} → ${id}`);
  }
});

test('tout personnage avec lieuId figure dans les habitants de ce lieu', () => {
  for (const p of PERSONNAGES)
    if (p.lieuId) assert.ok(LIEU[p.lieuId].habitants.includes(p.id), p.id);
});
