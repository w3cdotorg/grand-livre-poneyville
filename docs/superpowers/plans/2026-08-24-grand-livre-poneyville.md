# Le Grand livre de Poneyville — plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Encyclopédie visuelle statique de l'univers MLP G4 (VF) pour un enfant de 4-5 ans : carte + galeries + fiches croisées, 25 personnages et 10 lieux en SVG dessinés main.

**Architecture:** Site 100 % statique en modules ES sans framework ni build : `data.js` (contenu unique), `app.js` (routing par hash), `render.js` (écrans), un module SVG par entité (fonction `couleurs → chaîne SVG` injectée inline). Tests d'intégrité `node --test`, vérification visuelle Playwright, déploiement GitHub Pages.

**Tech Stack:** HTML/CSS/JS vanilla (modules ES), `node --test` (zéro dépendance), Playwright MCP (vérification visuelle), `gh` CLI (repo + Pages).

**Spec:** `docs/superpowers/specs/2026-08-24-grand-livre-poneyville-design.md`

## Global Constraints

- Tout le contenu affiché est en français (VF : « forêt Désenchantée », « Poneyville » avec « poney » ; les poneys gardent leurs noms VF anglais : Twilight Sparkle…). Titre exact : « Le Grand livre de Poneyville » (capitalisation française).
- Zéro dépendance npm, zéro build, zéro requête réseau externe (pas de Google Fonts — pile système arrondie).
- Public : enfant de 4-5 ans → cibles tactiles ≥ 64 px, ≤ 2 taps depuis l'accueil, aucune imagerie effrayante, textes de 2-3 phrases courtes.
- Aucun asset officiel Hasbro : tous les SVG sont des dessins originaux.
- SVG personnages : `viewBox="0 0 300 300"`, tête centrée autour de (150, 105) rayon ≈ 65 (le portrait est le recadrage `viewBox="60 15 180 180"`), groupe `class="paupieres"` pour le clignement.
- Chaque commande shell commence par `export PATH="/opt/homebrew/bin:$PATH"` (contrainte CLAUDE.md).
- Messages de commit en français, terminés par `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.
- Après chaque vague de dessin : screenshots Playwright de chaque nouvelle fiche + contrôle visuel, trouvailles notées dans `NOTES.md`. Piège connu : cache agressif des modules ES → `page.route()` no-cache ou profil vierge.
- Dev local : `./serve.sh` (port 8123).

---

### Task 1 : Squelette du projet

**Files:**
- Create: `index.html`, `css/style.css`, `serve.sh`, `package.json`, `README.md`, `NOTES.md`, `.gitignore`

**Interfaces:**
- Produces: coquille HTML avec `<main id="app">` et `<script type="module" src="js/app.js">` (app.js créé en Task 4 — la page peut logguer une 404 module d'ici là, c'est attendu) ; `npm test` = `node --test test/`.

- [ ] **Step 1 : créer les fichiers**

`index.html` :

```html
<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Le Grand livre de Poneyville</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='80' font-size='80'>🦄</text></svg>">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<main id="app"></main>
<script type="module" src="js/app.js"></script>
</body>
</html>
```

`css/style.css` (base — les styles d'écrans arrivent en Task 4) :

```css
:root {
  --fond: #eaf6ff;
  --carton: #ffffff;
  --encre: #3d3554;
  --accent: #b388e0;
  --rayon: 24px;
  font-family: ui-rounded, "SF Pro Rounded", Quicksand, "Comic Sans MS", sans-serif;
}
* { box-sizing: border-box; margin: 0; }
body { background: var(--fond); color: var(--encre); min-height: 100vh; }
#app { max-width: 1024px; margin: 0 auto; padding: 16px; }
a { color: inherit; text-decoration: none; -webkit-tap-highlight-color: transparent; }
```

`serve.sh` (puis `chmod +x serve.sh`) :

```bash
#!/bin/sh
cd "$(dirname "$0")" && python3 -m http.server 8123
```

`package.json` :

```json
{
  "name": "grand-livre-poneyville",
  "private": true,
  "type": "module",
  "scripts": { "test": "node --test test/" }
}
```

`README.md` :

```markdown
# Le Grand livre de Poneyville

Encyclopédie visuelle de l'univers de Mon Petit Poney (*Les amies, c'est magique*)
pour les enfants de 4-5 ans. Personnages et lieux cliquables, textes courts à lire
à voix haute. Tous les dessins sont des SVG originaux faits main.

- Dev : `./serve.sh` puis http://localhost:8123
- Tests : `npm test` (node --test, zéro dépendance)
```

`NOTES.md` :

```markdown
# Notes et trouvailles

Journal des découvertes techniques et choix de dessin, au fil de l'eau.

## 2026-08-24 — démarrage
- (les entrées s'ajoutent en tête de section, datées)
```

`.gitignore` :

```
.DS_Store
```

- [ ] **Step 2 : vérifier que le serveur sert la page**

Run : `export PATH="/opt/homebrew/bin:$PATH" && ./serve.sh & sleep 1 && curl -s http://localhost:8123 | grep -c "Grand livre de Poneyville" ; kill %1`
Expected : `1`

- [ ] **Step 3 : commit**

```bash
git add -A && git commit -m "chore: squelette du site (coquille HTML, styles de base, serveur dev)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2 : `data.js` — tout le contenu, avec tests d'intégrité (TDD)

**Files:**
- Create: `js/data.js`
- Test: `test/data.test.js`

**Interfaces:**
- Produces: `export const PERSONNAGES` (array), `export const LIEUX` (array), `export const PERSONNAGE` et `export const LIEU` (objets indexés par id). Schémas ci-dessous — toutes les tâches suivantes en dépendent.

**Schéma personnage** :

```js
{
  id: "twilight",              // kebab-case, unique, = nom du fichier SVG et segment d'URL
  nom: "Twilight Sparkle",
  espece: "licorne",           // terrestre|pegase|licorne|alicorne|dragon|zebre|draconequus|
                               // lapin|alligator|chien|chat|tortue|hibou
  couleurs: { robe: "#c9a7e0", criniere: ["#2a2f6e","#ec5fa4"], yeux: "#7b3fa0" /* + clés libres */ },
  cutieMark: "une grande étoile rose entourée de petites étoiles blanches", // ou null (Spike, CMC, animaux…)
  lieuId: "bibliotheque",      // ou null (Discord, Trixie, Derpy)
  liens: { famille: [], amis: [], animal: "owlowiscious" /* ou proprietaire: "…" */ },
  carte: { x: 48, y: 55 },     // optionnel : position % sur la carte d'accueil (Mane 6 seulement)
  texte: "…",                  // 2-3 phrases
  leSaisTu: "…"                // 1 phrase
}
```

**Schéma lieu** : `{ id, nom, habitants: [ids], carte: { x, y }, texte }`.

**Contenu à rédiger** (textes : prose simple et chaleureuse à partir de ces faits ; couleurs = point de départ, affinées au dessin) :

| id | nom | espèce | robe / crinière / yeux | cutie mark | lieuId | liens & faits pour le texte |
|---|---|---|---|---|---|---|
| twilight | Twilight Sparkle | licorne | #c9a7e0 / [#2a2f6e,#ec5fa4,#7147a8] / #7b3fa0 | étoile rose + petites étoiles | bibliotheque | animal: owlowiscious ; amis: mane 6 + spike ; studieuse, adore les livres, élève de Celestia. Le sais-tu : elle deviendra une princesse alicorne. |
| applejack | Applejack | terrestre | #f8a65d / [#f3dc79] / #4cb157 (+ chapeau #a9742f) | trois pommes rouges | sweet-apple-acres | animal: winona ; famille: big-macintosh, apple-bloom, granny-smith ; honnête, forte, récolte les pommes. Le sais-tu : elle attrape tout au lasso. |
| rainbow-dash | Rainbow Dash | pegase | #9edbf9 / [#ee4144,#f37033,#fdf6af,#62bc4d,#1e98d3,#672f89] / #d2377b | nuage + éclair arc-en-ciel | cloudsdale | animal: tank ; la plus rapide, dégage le ciel, rêve des Wonderbolts. Le sais-tu : son arc-en-ciel supersonique. |
| pinkie-pie | Pinkie Pie | terrestre | #f6b7d2 / [#ed72aa] / #6dc0ea | trois ballons | sugarcube-corner | animal: gummy ; adore organiser des fêtes, travaille à la pâtisserie. Le sais-tu : son « Pinkie sens » prédit les chutes d'objets. |
| fluttershy | Fluttershy | pegase | #fdf6af / [#f7b6cf] / #35c4b5 | trois papillons roses | chaumiere-fluttershy | animal: angel ; timide, douce, s'occupe des animaux. Le sais-tu : son regard calme même les dragons. |
| rarity | Rarity | licorne | #f2f0f7 / [#5b4a8e] / #1f6bb1 | trois diamants bleus | carousel-boutique | animal: opale ; famille: sweetie-belle ; couturière élégante, généreuse. Le sais-tu : sa magie trouve les gemmes cachées. |
| spike | Spike | dragon | #a56fc0 / [#3fa541] (crête) / #2f9e41 (+ ventre #c9ea94) | null | bibliotheque | amis: twilight ; bébé dragon assistant de Twilight, envoie les lettres avec son feu magique, adore les gemmes. |
| big-macintosh | Big Macintosh | terrestre | #c6553b / [#f4a93f] / #77b255 | moitié de pomme verte | sweet-apple-acres | famille: applejack, apple-bloom, granny-smith ; grand, très fort, parle peu. Le sais-tu : il répond presque toujours « Eeyup ». |
| apple-bloom | Apple Bloom | terrestre | #fbf1a6 / [#e8595d] / #f18a44 (+ nœud #f27a9c) | null (flanc vierge !) | sweet-apple-acres | famille: applejack, big-macintosh, granny-smith ; amies: sweetie-belle, scootaloo ; chercheuse de talent. |
| sweetie-belle | Sweetie Belle | licorne | #f5eff7 / [#e8b9de,#c9a2e0] / #a8e06e | null | carousel-boutique | famille: rarity ; amies: apple-bloom, scootaloo ; chante très bien. |
| scootaloo | Scootaloo | pegase | #f19b5b / [#ee4c93] / #8b60c6 | null | ecole-poneyville | amies: apple-bloom, sweetie-belle ; file en trottinette, admire Rainbow Dash. |
| zecora | Zecora | zebre | #8e8e99 (rayures #ededf2) / [#54545e,#ededf2] / #7ecbc4 | soleil gris en spirale | hutte-zecora | prépare des potions, parle en rimes, sage et gentille. |
| celestia | Princesse Celestia | alicorne | #fdfdff / [#9be0dc,#8fcaf0,#f8b3c9] / #d19fe0 (+ or #f7c55c) | soleil doré | canterlot | famille: luna ; lève le soleil chaque matin, dirige Equestria, mentor de Twilight. |
| luna | Princesse Luna | alicorne | #3b4699 / [#232c6b,#3d4fb5] / #9fe6e2 | croissant de lune | canterlot | famille: celestia ; lève la lune, veille sur les rêves des poneys. |
| granny-smith | Granny Smith | terrestre | #c6e5a7 / [#efefef] / #f5a65a | tarte aux pommes | sweet-apple-acres | famille: applejack, big-macintosh, apple-bloom ; grand-mère, fondatrice de Poneyville, reine de la tarte. |
| discord | Discord | draconequus | #a0714f (+ pièces dépareillées) / [#3d3554] / #f9c816 | null | null | ami: fluttershy ; esprit de la pagaille, fait de morceaux d'animaux différents, devenu gentil grâce à Fluttershy. |
| trixie | Trixie | licorne | #99cce8 / [#c8cfe0,#a9b2c8] / #c14fb0 (+ cape #6157b5) | baguette magique et croissant | null | magicienne de spectacle, chapeau et cape étoilés, se dit « la Grande et Puissante Trixie ». |
| derpy | Derpy | pegase | #a5a7ce / [#f3dc79] / #f9c816 | bulles grises | null | adore les muffins, livre le courrier, toujours souriante. |
| cheerilee | Cheerilee | terrestre | #d57ea5 / [#f581b6,#eda9cc] / #7ece73 | trois fleurs souriantes | ecole-poneyville | maîtresse d'école de Poneyville, patiente et joyeuse. |
| angel | Angel | lapin | #f4f4f6 / [] / #74b9e0 | null | chaumiere-fluttershy | proprietaire: fluttershy ; petit lapin blanc au caractère bien trempé. |
| gummy | Gummy | alligator | #a3d46e / [] / #cd8bd6 | null | sugarcube-corner | proprietaire: pinkie-pie ; bébé alligator sans dents, mordille tout. |
| winona | Winona | chien | #b5773f (+ blanc #f6efe3) / [] / #6b4a2b | null | sweet-apple-acres | proprietaire: applejack ; chienne de berger, rassemble le troupeau. |
| opale | Opale | chat | #f0ebf5 / [#c4b7d9] / #4fbfa0 (+ nœud #7a5fb5) | null | carousel-boutique | proprietaire: rarity ; chatte blanche un peu grognon mais très aimée. |
| tank | Tank | tortue | #9bc463 (+ carapace #6e8f4f) / [] / #e8a33d | null | cloudsdale | proprietaire: rainbow-dash ; tortue tranquille, vole grâce à une hélice. |
| owlowiscious | Owlowiscious | hibou | #8e6742 (+ ventre #d8b98c) / [] / #f2c14e | null | bibliotheque | proprietaire: twilight ; hibou de nuit, aide à la bibliothèque, répond « hou-hou ». |

`carte` des Mane 6 : twilight {x:48,y:55}, applejack {x:18,y:58}, rainbow-dash {x:20,y:12}, pinkie-pie {x:58,y:50}, fluttershy {x:68,y:72}, rarity {x:40,y:48}.

| id lieu | nom | habitants (ordre d'affichage) | carte | faits pour le texte |
|---|---|---|---|---|
| bibliotheque | La bibliothèque Golden Oak | twilight, spike, owlowiscious | {x:48,y:55} | maison creusée dans un grand chêne vivant, pleine de livres. |
| sweet-apple-acres | Sweet Apple Acres | applejack, big-macintosh, apple-bloom, granny-smith, winona | {x:18,y:58} | ferme de la famille Apple, vergers à perte de vue, grande grange rouge. |
| carousel-boutique | La Carousel Boutique | rarity, sweetie-belle, opale | {x:40,y:48} | boutique de couture de Rarity, ronde comme un manège. |
| sugarcube-corner | Sugarcube Corner | pinkie-pie, gummy | {x:58,y:50} | pâtisserie qui ressemble à une maison en pain d'épices ; Pinkie habite au grenier. |
| chaumiere-fluttershy | La chaumière de Fluttershy | fluttershy, angel | {x:68,y:72} | petite maison au bord de la forêt, entourée de terriers et de nichoirs. |
| foret-desenchantee | La forêt Désenchantée | zecora | {x:55,y:88} | forêt mystérieuse où la nature pousse toute seule ; les poneys n'y vont pas souvent. |
| hutte-zecora | La hutte de Zecora | zecora | {x:42,y:90} | cabane dans un gros arbre de la forêt, pleine de masques et de potions. |
| canterlot | Canterlot | celestia, luna | {x:80,y:18} | capitale d'Equestria, château blanc et or accroché à la montagne. |
| cloudsdale | Cloudsdale | rainbow-dash, tank | {x:20,y:12} | ville des pégases, posée sur les nuages ; on y fabrique la météo et les arcs-en-ciel. |
| ecole-poneyville | L'école de Poneyville | cheerilee, scootaloo | {x:65,y:60} | école du village avec sa cloche rouge ; la maîtresse est Cheerilee. |

(NB : zecora apparaît dans deux lieux — c'est voulu, `habitants` est une liste d'affichage. Son `lieuId` à elle est `hutte-zecora`.)

- [ ] **Step 1 : écrire les tests d'intégrité (qui échouent)**

`test/data.test.js` :

```js
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
```

- [ ] **Step 2 : vérifier l'échec**

Run : `export PATH="/opt/homebrew/bin:$PATH" && npm test`
Expected : FAIL (`Cannot find module … js/data.js`)

- [ ] **Step 3 : écrire `js/data.js`**

Toutes les entrées des deux tables ci-dessus, textes rédigés (2-3 phrases + `leSaisTu` d'après la colonne « faits »). Fin du fichier :

```js
const parId = (liste) => Object.fromEntries(liste.map(e => [e.id, e]));
export const PERSONNAGE = parId(PERSONNAGES);
export const LIEU = parId(LIEUX);
```

Exemple d'entrée complète (modèle de ton pour toutes les autres) :

```js
{
  id: "twilight",
  nom: "Twilight Sparkle",
  espece: "licorne",
  couleurs: { robe: "#c9a7e0", criniere: ["#2a2f6e", "#ec5fa4", "#7147a8"], yeux: "#7b3fa0" },
  cutieMark: "une grande étoile rose entourée de petites étoiles blanches",
  lieuId: "bibliotheque",
  liens: { famille: [], amis: ["applejack", "rainbow-dash", "pinkie-pie", "fluttershy", "rarity", "spike"], animal: "owlowiscious" },
  carte: { x: 48, y: 55 },
  texte: "Twilight Sparkle est une licorne qui adore les livres et la magie. Elle habite dans la bibliothèque de Poneyville avec son ami Spike. C'est l'élève préférée de la princesse Celestia.",
  leSaisTu: "Un jour, Twilight aura des ailes et deviendra une princesse !"
},
```

(Les 6 amis Mane — twilight, applejack, rainbow-dash, pinkie-pie, fluttershy, rarity — se listent mutuellement dans `amis`, plus spike chez twilight et réciproquement.)

- [ ] **Step 4 : vérifier que tout passe**

Run : `npm test` — Expected : PASS (7 tests)

- [ ] **Step 5 : commit**

```bash
git add -A && git commit -m "feat: data.js — 25 personnages, 10 lieux, textes VF, tests d'intégrité

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3 : modules SVG placeholder + tests de complétude

**Files:**
- Create: `svg/_placeholder-poney.js`, `svg/_placeholder-lieu.js`, `svg/carte.js`, `svg/poneys/<id>.js` × 25, `svg/lieux/<id>.js` × 10
- Test: `test/svg.test.js`

**Interfaces:**
- Produces: contrat SVG — chaque `svg/poneys/<id>.js` a un `export default (couleurs) => string` (SVG `viewBox="0 0 300 300"`, groupe `class="paupieres"`) et, si le personnage a une `cutieMark` non nulle, un `export const cutieMark = (couleurs) => string` (SVG `viewBox="0 0 60 60"`). Chaque `svg/lieux/<id>.js` et `svg/carte.js` : `export default () => string` (lieux : `viewBox="0 0 400 300"` ; carte : `viewBox="0 0 1000 700"`).

- [ ] **Step 1 : écrire le test de complétude (qui échoue)**

`test/svg.test.js` :

```js
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
      assert.ok(cm.includes('viewBox="0 0 60 60"'), `cutie mark ${p.id}`);
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
```

- [ ] **Step 2 : vérifier l'échec** — Run : `npm test` — Expected : FAIL (modules introuvables)

- [ ] **Step 3 : écrire les placeholders et générer les 36 modules**

`svg/_placeholder-poney.js` (silhouette grise génériques aux couleurs du personnage, yeux + paupières pour satisfaire le contrat) :

```js
export default (c) => `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="150" cy="210" rx="75" ry="52" fill="${c.robe}"/>
  <circle cx="150" cy="105" r="62" fill="${c.robe}"/>
  <circle cx="128" cy="105" r="14" fill="#fff"/><circle cx="172" cy="105" r="14" fill="#fff"/>
  <circle cx="128" cy="107" r="7" fill="${c.yeux}"/><circle cx="172" cy="107" r="7" fill="${c.yeux}"/>
  <g class="paupieres">
    <rect x="112" y="89" width="32" height="30" rx="14" fill="${c.robe}"/>
    <rect x="156" y="89" width="32" height="30" rx="14" fill="${c.robe}"/>
  </g>
  <text x="150" y="290" text-anchor="middle" font-size="20" fill="#999">dessin à venir</text>
</svg>`;
export const cutieMark = () => `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
  <path d="M30 8 37 24 54 24 40 34 45 51 30 41 15 51 20 34 6 24 23 24 Z" fill="#d8c9ee"/>
</svg>`;
```

`svg/_placeholder-lieu.js` :

```js
export default () => `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="300" fill="#dcefdc"/>
  <rect x="130" y="110" width="140" height="120" rx="10" fill="#c9b9a2"/>
  <path d="M110 120 200 50 290 120 Z" fill="#a98f6f"/>
  <text x="200" y="280" text-anchor="middle" font-size="22" fill="#889">dessin à venir</text>
</svg>`;
```

`svg/carte.js` (placeholder initial, redessinée en Task 8) :

```js
export default () => `<svg viewBox="0 0 1000 700" xmlns="http://www.w3.org/2000/svg">
  <rect width="1000" height="700" fill="#cde9f7"/>
  <rect y="300" width="1000" height="400" fill="#cfe8b8"/>
  <path d="M0 560 Q500 640 1000 560 L1000 700 0 700 Z" fill="#39543a"/>
</svg>`;
```

Génération des 35 ré-exports :

```bash
cd /Users/willow/Sites/_Claude_output/grand-livre-poneyville
mkdir -p svg/poneys svg/lieux
for id in twilight applejack rainbow-dash pinkie-pie fluttershy rarity spike big-macintosh \
          apple-bloom sweetie-belle scootaloo zecora celestia luna granny-smith discord \
          trixie derpy cheerilee angel gummy winona opale tank owlowiscious; do
  printf 'export { default, cutieMark } from "../_placeholder-poney.js";\n' > "svg/poneys/$id.js"
done
for id in bibliotheque sweet-apple-acres carousel-boutique sugarcube-corner chaumiere-fluttershy \
          foret-desenchantee hutte-zecora canterlot cloudsdale ecole-poneyville; do
  printf 'export { default } from "../_placeholder-lieu.js";\n' > "svg/lieux/$id.js"
done
```

- [ ] **Step 4 : vérifier que tout passe** — Run : `npm test` — Expected : PASS

- [ ] **Step 5 : commit**

```bash
git add -A && git commit -m "feat: contrat SVG et placeholders pour les 36 dessins

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4 : routing + les 5 écrans

**Files:**
- Create: `js/app.js`, `js/render.js`
- Modify: `css/style.css` (ajout des styles d'écrans)

**Interfaces:**
- Consumes: `data.js` (Task 2), contrat SVG (Task 3).
- Produces: routes `#/`, `#/poneys`, `#/lieux`, `#/poney/<id>`, `#/lieu/<id>` ; helper `portrait(svg)` (recadrage viewBox).

- [ ] **Step 1 : écrire `js/app.js`**

```js
import { render } from './render.js';

async function route() {
  const [, ecran = '', id = ''] = (location.hash || '#/').slice(1).split('/');
  await render(ecran || 'accueil', id);
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);
route();
```

- [ ] **Step 2 : écrire `js/render.js`**

```js
import { PERSONNAGES, LIEUX, PERSONNAGE, LIEU } from './data.js';

const app = document.getElementById('app');
const ESPECES = {
  terrestre: "Poney terrestre 🍎", pegase: "Pégase 🪽", licorne: "Licorne 🦄",
  alicorne: "Alicorne 👑", dragon: "Dragon 🔥", zebre: "Zèbre 🌿",
  draconequus: "Draconequus 🌀", lapin: "Lapin 🥕", alligator: "Alligator 🦷",
  chien: "Chien 🦴", chat: "Chat 🧶", tortue: "Tortue 🚁", hibou: "Hibou 🌙",
};

const svgDe = async (p) => (await import(`../svg/poneys/${p.id}.js`)).default(p.couleurs);
const svgLieu = async (l) => (await import(`../svg/lieux/${l.id}.js`)).default();
const portrait = (svg) => svg.replace('viewBox="0 0 300 300"', 'viewBox="60 15 180 180"');

const vignettePoney = async (id) => {
  const p = PERSONNAGE[id];
  return `<a class="vignette" href="#/poney/${id}">${portrait(await svgDe(p))}<span>${p.nom}</span></a>`;
};
const vignetteLieu = async (id) => {
  const l = LIEU[id];
  return `<a class="vignette vignette-lieu" href="#/lieu/${id}">${await svgLieu(l)}<span>${l.nom}</span></a>`;
};
const toutes = (ids, fab) => Promise.all(ids.map(fab)).then(v => v.join(''));
const entete = (titre) => `<header><a class="maison" href="#/" aria-label="Accueil">🏠</a><h1>${titre}</h1></header>`;

const ECRANS = {
  async accueil() {
    const carte = (await import('../svg/carte.js')).default();
    const lieux = LIEUX.map(l =>
      `<a class="sur-carte" href="#/lieu/${l.id}" style="left:${l.carte.x}%;top:${l.carte.y}%">${l.nom}</a>`).join('');
    const poneys = await toutes(PERSONNAGES.filter(p => p.carte).map(p => p.id), async (id) => {
      const p = PERSONNAGE[id];
      return `<a class="sur-carte poney-carte" href="#/poney/${id}" style="left:${p.carte.x}%;top:${p.carte.y - 8}%">${portrait(await svgDe(p))}</a>`;
    });
    return `<header class="accueil-titre"><h1>Le Grand livre de Poneyville</h1></header>
      <nav class="gros-boutons">
        <a href="#/poneys">🦄 Les poneys</a>
        <a href="#/lieux">🏡 Les lieux</a>
      </nav>
      <div class="carte-cadre">${carte}${lieux}${poneys}</div>`;
  },
  async poneys() {
    const poneys = PERSONNAGES.filter(p => !p.liens.proprietaire);
    const animaux = PERSONNAGES.filter(p => p.liens.proprietaire);
    return `${entete('Les poneys')}
      <div class="grille">${await toutes(poneys.map(p => p.id), vignettePoney)}</div>
      <h2>Les animaux</h2>
      <div class="grille">${await toutes(animaux.map(p => p.id), vignettePoney)}</div>`;
  },
  async lieux() {
    return `${entete('Les lieux')}<div class="grille grille-lieux">${await toutes(LIEUX.map(l => l.id), vignetteLieu)}</div>`;
  },
  async poney(id) {
    const p = PERSONNAGE[id];
    if (!p) return ECRANS.accueil();
    const mod = await import(`../svg/poneys/${id}.js`);
    const compagnon = p.liens.animal ?? p.liens.proprietaire;
    const proches = [...(p.liens.famille ?? []), ...(p.liens.amis ?? []), ...(compagnon ? [compagnon] : [])];
    return `${entete(p.nom)}
      <div class="fiche">
        <figure class="fiche-dessin">${mod.default(p.couleurs)}</figure>
        <div class="fiche-infos">
          <p class="espece">${ESPECES[p.espece]}</p>
          ${p.cutieMark ? `<p class="medaillon">${mod.cutieMark(p.couleurs)}<span>Sa cutie mark : ${p.cutieMark}.</span></p>` : ''}
          <p class="texte">${p.texte}</p>
          ${p.leSaisTu ? `<p class="le-sais-tu">💡 Le sais-tu ? ${p.leSaisTu}</p>` : ''}
        </div>
      </div>
      ${p.lieuId ? `<h2>Où ça se passe</h2><div class="grille">${await vignetteLieu(p.lieuId)}</div>` : ''}
      ${proches.length ? `<h2>Sa famille et ses amis</h2><div class="grille">${await toutes(proches, vignettePoney)}</div>` : ''}`;
  },
  async lieu(id) {
    const l = LIEU[id];
    if (!l) return ECRANS.accueil();
    return `${entete(l.nom)}
      <figure class="fiche-dessin fiche-lieu">${await svgLieu(l)}</figure>
      <p class="texte">${l.texte}</p>
      <h2>Qui habite ici</h2>
      <div class="grille">${await toutes(l.habitants, vignettePoney)}</div>`;
  },
};

export async function render(ecran, id) {
  const fab = ECRANS[ecran] ?? ECRANS.accueil;
  app.innerHTML = await fab(id);
}
```

- [ ] **Step 3 : ajouter les styles d'écrans à `css/style.css`**

```css
/* ------- écrans ------- */
header { display: flex; align-items: center; gap: 16px; padding: 8px 0 20px; }
h1 { font-size: clamp(1.6rem, 4vw, 2.4rem); }
h2 { margin: 28px 0 12px; font-size: 1.3rem; }
.maison { font-size: 2rem; line-height: 1; min-width: 64px; min-height: 64px;
  display: grid; place-items: center; background: var(--carton); border-radius: var(--rayon);
  box-shadow: 0 2px 6px #0002; }
.accueil-titre { justify-content: center; }
.gros-boutons { display: flex; gap: 16px; justify-content: center; margin-bottom: 20px; }
.gros-boutons a { background: var(--carton); border-radius: var(--rayon); padding: 18px 28px;
  font-size: 1.4rem; font-weight: 700; box-shadow: 0 3px 8px #0002; min-height: 64px;
  display: grid; place-items: center; }
.carte-cadre { position: relative; border-radius: var(--rayon); overflow: hidden;
  box-shadow: 0 4px 14px #0003; }
.carte-cadre > svg { display: block; width: 100%; height: auto; }
.sur-carte { position: absolute; transform: translate(-50%, -50%); background: #fffd;
  padding: 10px 14px; border-radius: 999px; font-weight: 700; min-height: 44px;
  display: grid; place-items: center; box-shadow: 0 2px 6px #0003; }
.poney-carte { background: none; box-shadow: none; padding: 0; width: 76px; height: 76px; }
.poney-carte svg { width: 100%; height: 100%; }
.grille { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 16px; }
.vignette { background: var(--carton); border-radius: var(--rayon); padding: 12px;
  display: grid; justify-items: center; gap: 8px; box-shadow: 0 2px 8px #0002;
  font-weight: 700; text-align: center; transition: transform .15s; }
.vignette:active { transform: scale(.96); }
.vignette svg { width: 110px; height: 110px; }
.vignette-lieu svg { width: 100%; height: auto; border-radius: 12px; }
.fiche { display: grid; grid-template-columns: minmax(240px, 1fr) 1.2fr; gap: 24px;
  background: var(--carton); border-radius: var(--rayon); padding: 24px;
  box-shadow: 0 4px 14px #0002; align-items: center; }
.fiche-dessin svg { width: 100%; height: auto; }
.fiche-lieu { background: var(--carton); border-radius: var(--rayon); padding: 16px;
  box-shadow: 0 4px 14px #0002; }
.espece { font-weight: 700; color: var(--accent); font-size: 1.1rem; }
.medaillon { display: flex; align-items: center; gap: 12px; margin: 12px 0; }
.medaillon svg { width: 64px; height: 64px; flex: none; background: var(--fond);
  border-radius: 50%; padding: 8px; }
.texte { font-size: 1.15rem; line-height: 1.6; margin: 12px 0; }
.le-sais-tu { background: #fff7d6; border-radius: 16px; padding: 12px 16px; line-height: 1.5; }
@media (max-width: 640px) { .fiche { grid-template-columns: 1fr; } }
/* ------- clignement ------- */
.paupieres { transform-box: fill-box; transform-origin: center top; animation: cligne 4.5s infinite; }
@keyframes cligne { 0%, 93%, 100% { transform: scaleY(0); } 95%, 98% { transform: scaleY(1); } }
```

- [ ] **Step 4 : vérifier au navigateur (Playwright MCP)**

Lancer `./serve.sh` en tâche de fond. Avec Playwright : naviguer sur `http://localhost:8123/#/`, `#/poneys`, `#/lieux`, `#/poney/twilight`, `#/poney/angel`, `#/lieu/foret-desenchantee`, `#/poney/inexistant` (→ doit afficher l'accueil). À chaque page : screenshot + `browser_console_messages` sans erreur. Vérifier que les liens croisés fonctionnent (fiche Twilight → bibliothèque → fiche Spike).
Expected : navigation complète avec placeholders, zéro erreur console.

- [ ] **Step 5 : `npm test` toujours PASS, puis commit**

```bash
git add -A && git commit -m "feat: routing par hash et les 5 écrans (accueil, galeries, fiches)

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5 : repo GitHub public + Pages

**Files:** aucun (opérations gh/git)

- [ ] **Step 1 : créer le repo et pousser**

```bash
export PATH="/opt/homebrew/bin:$PATH"
cd /Users/willow/Sites/_Claude_output/grand-livre-poneyville
gh repo create w3cdotorg/grand-livre-poneyville --public --source . --push \
  --description "Le Grand livre de Poneyville — encyclopédie visuelle MLP G4 pour les 4-5 ans (SVG originaux, zéro dépendance)"
```

- [ ] **Step 2 : activer Pages depuis master**

```bash
gh api repos/w3cdotorg/grand-livre-poneyville/pages -X POST \
  -f "source[branch]=master" -f "source[path]=/"
```

- [ ] **Step 3 : vérifier le déploiement**

Run : `sleep 60 && curl -s https://w3cdotorg.github.io/grand-livre-poneyville/ | grep -c "Grand livre de Poneyville"`
Expected : `1` (réessayer, le premier build Pages peut prendre quelques minutes)

---

### Task 6 : Twilight Sparkle — le dessin qui fixe le style

**Files:**
- Modify: `svg/poneys/twilight.js` (remplace le ré-export placeholder)
- Modify: `NOTES.md` (guide de style)

**Interfaces:**
- Consumes: contrat SVG (Task 3).
- Produces: le **guide de style** que toutes les vagues suivantes copient : pose 3/4 plein pied, proportions, position de la tête (portrait), groupe paupières, cutie mark sur le flanc.

- [ ] **Step 1 : dessiner Twilight**

Point de départ (à raffiner visuellement — c'est l'étape artistique, itérer jusqu'à ce que ce soit mignon) :

```js
export default (c) => `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img">
  <!-- queue (mèches dans les couleurs de crinière) -->
  <path d="M78 195 Q40 215 50 262 Q72 252 84 260 Q92 225 100 208 Z" fill="${c.criniere[0]}"/>
  <path d="M84 200 Q60 228 66 256" stroke="${c.criniere[1]}" stroke-width="9" fill="none" stroke-linecap="round"/>
  <!-- pattes -->
  <rect x="96" y="212" width="24" height="62" rx="12" fill="${c.robe}"/>
  <rect x="180" y="212" width="24" height="62" rx="12" fill="${c.robe}"/>
  <!-- corps -->
  <ellipse cx="150" cy="205" rx="72" ry="48" fill="${c.robe}"/>
  <!-- cutie mark sur le flanc -->
  <g transform="translate(178 196) scale(.55)">
    <path d="M30 4 39 24 60 24 43 37 49 58 30 45 11 58 17 37 0 24 21 24 Z" fill="${c.criniere[1]}"/>
  </g>
  <!-- cou + tête -->
  <path d="M120 175 Q118 130 138 112 L172 118 Q178 150 168 178 Z" fill="${c.robe}"/>
  <circle cx="150" cy="103" r="60" fill="${c.robe}"/>
  <!-- museau -->
  <ellipse cx="196" cy="122" rx="26" ry="20" fill="${c.robe}"/>
  <circle cx="205" cy="118" r="3" fill="#0004"/>
  <path d="M186 134 Q198 142 208 134" stroke="#0006" stroke-width="4" fill="none" stroke-linecap="round"/>
  <!-- oreille + corne -->
  <path d="M118 56 Q112 34 130 42 Q140 50 134 62 Z" fill="${c.robe}"/>
  <path d="M162 46 L172 8 L184 44 Q173 52 162 46 Z" fill="${c.robe}" stroke="#0001"/>
  <!-- crinière : frange + mèche longue -->
  <path d="M108 80 Q120 34 168 40 Q198 46 200 74 Q168 58 140 70 Q118 76 108 80 Z" fill="${c.criniere[0]}"/>
  <path d="M112 78 Q96 120 104 168 Q116 150 122 118 Q124 94 112 78 Z" fill="${c.criniere[0]}"/>
  <path d="M124 66 Q150 52 184 62" stroke="${c.criniere[1]}" stroke-width="9" fill="none" stroke-linecap="round"/>
  <!-- yeux (3/4 : un grand, un plus petit) -->
  <ellipse cx="136" cy="106" rx="17" ry="21" fill="#fff"/>
  <ellipse cx="178" cy="108" rx="12" ry="17" fill="#fff"/>
  <circle cx="139" cy="110" r="10" fill="${c.yeux}"/><circle cx="142" cy="106" r="3.5" fill="#fff"/>
  <circle cx="180" cy="111" r="7" fill="${c.yeux}"/><circle cx="182" cy="108" r="2.5" fill="#fff"/>
  <g class="paupieres">
    <ellipse cx="136" cy="98" rx="18" ry="14" fill="${c.robe}"/>
    <ellipse cx="178" cy="101" rx="13" ry="11" fill="${c.robe}"/>
  </g>
  <path d="M118 86 Q132 78 150 84" stroke="${c.criniere[0]}" stroke-width="4" fill="none" stroke-linecap="round"/>
</svg>`;

export const cutieMark = (c) => `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
  <path d="M30 4 39 24 60 24 43 37 49 58 30 45 11 58 17 37 0 24 21 24 Z" fill="${c.criniere[1]}"/>
  <circle cx="10" cy="10" r="4" fill="#fff" stroke="${c.criniere[2] ?? c.criniere[0]}" stroke-width="2"/>
  <circle cx="50" cy="8" r="3.5" fill="#fff" stroke="${c.criniere[2] ?? c.criniere[0]}" stroke-width="2"/>
</svg>`;
```

- [ ] **Step 2 : itérer visuellement** — `npm test` PASS, puis Playwright : screenshots de `#/poney/twilight` (fiche), `#/poneys` (portrait recadré) et `#/` (mini-portrait sur carte). Contrôler : silhouette lisible, tête bien cadrée dans le portrait (`60 15 180 180`), cutie mark visible, paupières alignées sur les yeux (vérifier le clignement en attendant ~5 s entre deux screenshots). Ajuster jusqu'à satisfaction.

- [ ] **Step 3 : documenter le style dans `NOTES.md`** — ajouter une section « Guide de style poneys » : coordonnées clés retenues (tête, yeux, flanc), ordre des couches (queue → pattes arrière → corps → cutie mark → cou/tête → museau → oreille/corne-ou-ailes → crinière → yeux → paupières), variantes par espèce (corne / ailes / ni l'un ni l'autre), et tout piège rencontré.

- [ ] **Step 4 : commit**

```bash
git add -A && git commit -m "feat(dessins): Twilight Sparkle + guide de style poneys

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 7 : vague 1 — le reste des Mane 6 + Spike

**Files:**
- Modify: `svg/poneys/applejack.js`, `rainbow-dash.js`, `pinkie-pie.js`, `fluttershy.js`, `rarity.js`, `spike.js`

- [ ] **Step 1 : dessiner les 6**, en copiant la structure de `twilight.js` (Task 6) et en suivant le guide de style de NOTES.md. Particularités : Applejack = chapeau (`c.chapeau`) + queue liée ; Rainbow Dash = ailes déployées + crinière 6 mèches arc-en-ciel ; Pinkie Pie = crinière très bouclée (arcs de cercles) ; Fluttershy = crinière longue qui tombe, ailes repliées ; Rarity = crinière en volute élégante ; Spike = bipède petit, crête verte, ventre clair (`c.ventre`), pas de cutie mark (pas d'export `cutieMark`, mais garder le groupe `paupieres`).
- [ ] **Step 2 :** `npm test` PASS (le test de complétude valide le contrat pour chacun).
- [ ] **Step 3 : vérification Playwright** — screenshot des 6 fiches + la galerie `#/poneys` entière ; contrôler couleurs, silhouettes différenciées, portraits bien cadrés. Corriger.
- [ ] **Step 4 : commit** — `feat(dessins): Mane 6 au complet + Spike` (+ trailer Co-Authored-By).

---

### Task 8 : la carte d'accueil

**Files:**
- Modify: `svg/carte.js`

- [ ] **Step 1 : dessiner la scène** (remplace le placeholder) : ciel dégradé en haut, Cloudsdale (nuages + arc-en-ciel) en haut à gauche, montagne + Canterlot (tours blanches, toits or) en haut à droite, collines vertes au centre avec le village de Poneyville (toits colorés, mairie ronde), vergers de Sweet Apple Acres à gauche, rivière, et la forêt Désenchantée en bande sombre en bas (sapins bleu-vert froids, quelques yeux de lucioles amicales — mystérieuse, PAS effrayante). Chaque zone dessinée doit correspondre visuellement aux positions `carte.x/y` de `data.js` (les pastilles-liens se posent dessus) ; ajuster les x/y de `data.js` si le dessin l'exige — les tests bornent seulement 0-100.
- [ ] **Step 2 : vérification Playwright** — screenshot de `#/` aux tailles 1024×768 (iPad paysage) et 768×1024 (portrait) : les pastilles de lieux tombent sur leurs bâtiments, les 6 mini-portraits des Mane 6 sont posés près de chez eux, rien ne se chevauche illisiblement. Ajuster.
- [ ] **Step 3 :** `npm test` PASS, commit — `feat(dessins): carte de Poneyville et ses environs`.

---

### Task 9 : vague 2 — famille Apple + Chercheuses de talent

**Files:**
- Modify: `svg/poneys/big-macintosh.js`, `apple-bloom.js`, `sweetie-belle.js`, `scootaloo.js`, `granny-smith.js`

- [ ] **Step 1 : dessiner les 5** (structure Task 6, guide NOTES.md). Particularités : Big Mac = gabarit plus massif (corps +15 %, cou épais), collier de trait ; Apple Bloom = gabarit pouliche (corps −20 %, tête proportionnellement plus grosse), grand nœud rose (`c.noeud`), **flanc vierge** ; Sweetie Belle = pouliche licorne, crinière bicolore bouclée ; Scootaloo = pouliche pégase, petites ailes ; Granny Smith = posture voûtée, chignon blanc, paupières tombantes.
- [ ] **Step 2 :** `npm test` PASS ; Playwright : 5 fiches + galerie ; contrôle que les trois pouliches sont visiblement plus petites que les adultes. Corriger.
- [ ] **Step 3 : commit** — `feat(dessins): famille Apple et Chercheuses de talent`.

---

### Task 10 : vague 3 — princesses et personnages hauts en couleur

**Files:**
- Modify: `svg/poneys/celestia.js`, `luna.js`, `zecora.js`, `discord.js`, `trixie.js`, `derpy.js`, `cheerilee.js`

- [ ] **Step 1 : dessiner les 7.** Particularités : Celestia/Luna = gabarit élancé (cou long, jambes fines), corne ET ailes, couronne + collier, crinière ondulante multi-bandes (Celestia pastel, Luna nuit avec petites étoiles) ; Zecora = rayures (paths clairs sur robe grise), crinière mohawk, anneaux d'or au cou et à l'oreille ; Discord = le plus libre : corps serpentin, deux cornes différentes, une aile de chauve-souris + une d'oiseau, patte de lion + serre d'aigle — sourire espiègle, PAS menaçant ; Trixie = chapeau + cape violets étoilés par-dessus la structure licorne ; Derpy = yeux légèrement désaxés (pupilles divergentes, gentil, jamais moqueur) ; Cheerilee = structure standard, crinière bicolore.
- [ ] **Step 2 :** `npm test` PASS ; Playwright : 7 fiches + galerie complète des poneys (les 19). Corriger.
- [ ] **Step 3 : commit** — `feat(dessins): princesses, Zecora, Discord, Trixie, Derpy, Cheerilee`.

---

### Task 11 : vague 4 — les 6 animaux de compagnie

**Files:**
- Modify: `svg/poneys/angel.js`, `gummy.js`, `winona.js`, `opale.js`, `tank.js`, `owlowiscious.js`

- [ ] **Step 1 : dessiner les 6.** Même contrat SVG (viewBox 300, tête zone portrait, groupe `paupieres`), mais anatomies propres : Angel = lapin assis, grandes oreilles ; Gummy = alligator souriant sans dents, regard fixe ; Winona = chienne colley assise, langue sortie ; Opale = chatte à poil long, air pincé, nœud ; Tank = tortue avec petite hélice sur la carapace ; Owlowiscious = hibou perché, gros yeux ronds.
- [ ] **Step 2 :** `npm test` PASS ; Playwright : 6 fiches + rangée « Les animaux » de la galerie. Corriger.
- [ ] **Step 3 : commit** — `feat(dessins): les six animaux de compagnie`.

---

### Task 12 : les 10 lieux

**Files:**
- Modify: `svg/lieux/bibliotheque.js`, `sweet-apple-acres.js`, `carousel-boutique.js`, `sugarcube-corner.js`, `chaumiere-fluttershy.js`, `foret-desenchantee.js`, `hutte-zecora.js`, `canterlot.js`, `cloudsdale.js`, `ecole-poneyville.js`

- [ ] **Step 1 : dessiner les 10 scènes** (`viewBox="0 0 400 300"`, fond pleine surface, bâtiment central + 2-3 éléments de contexte, mêmes aplats que les personnages). Repères : bibliothèque = gros chêne vivant à fenêtres rondes éclairées ; Sweet Apple Acres = grange rouge + rangées de pommiers + clôture ; Carousel Boutique = tour ronde à toit de manège, mannequins en vitrine ; Sugarcube Corner = maison pain d'épices, toit « glaçage », cupcake géant ; chaumière = toit d'herbe, nichoirs, petit pont ; forêt Désenchantée = troncs tordus bleu-nuit, brume douce, lucioles (palette froide mais accueillante) ; hutte = arbre creux, masques colorés, fioles suspendues ; Canterlot = tours blanches et or à flanc de montagne, cascades ; Cloudsdale = colonnes antiques sur nuages, arcs-en-ciel ; école = façade lilas, cloche rouge, cour avec drapeaux. Cohérence : réutiliser les couleurs des habitants où pertinent (importer depuis `../../js/data.js` si utile).
- [ ] **Step 2 :** `npm test` PASS ; Playwright : les 10 fiches lieux + galerie `#/lieux` + vignettes « Où ça se passe » sur 2-3 fiches poneys. Corriger.
- [ ] **Step 3 : deux commits** (5 lieux chacun) — `feat(dessins): lieux de Poneyville (1/2)` puis `(2/2)`.

---

### Task 13 : polissage et publication finale

**Files:**
- Modify: `css/style.css`, `NOTES.md`, `README.md` (+ retouches ponctuelles)
- Delete: `svg/_placeholder-poney.js`, `svg/_placeholder-lieu.js` (plus aucun ré-export ne doit pointer dessus)

- [ ] **Step 1 : animations douces** — vérifier le clignement sur toutes les fiches ; ajouter une transition d'apparition des écrans (`#app > * { animation: apparait .25s ease-out }` + `@keyframes apparait { from { opacity: 0; transform: translateY(6px) } }`) ; désactiver le tout sous `@media (prefers-reduced-motion: reduce)`.
- [ ] **Step 2 : audit tactile et responsive** — Playwright aux tailles 1024×768, 768×1024 et 375×667 : aucune cible interactive < 64 px sur iPad (mesurer via `browser_evaluate` sur `.vignette, .sur-carte, .maison, .gros-boutons a`), pas de scroll horizontal, textes lisibles.
- [ ] **Step 3 : suppression des placeholders** — `grep -r "_placeholder" svg/` ne doit renvoyer que zéro résultat après suppression des deux fichiers ; `npm test` PASS.
- [ ] **Step 4 : relecture de tous les textes** dans `data.js` (orthographe, ton 4-5 ans, terminologie VF) et de `README.md` ; compléter `NOTES.md` (bilan final).
- [ ] **Step 5 : tour complet Playwright** — parcourir toutes les routes (générables depuis data.js), screenshot de chacune, zéro erreur console.
- [ ] **Step 6 : commit + push + vérifier Pages**

```bash
git add -A && git commit -m "polish: animations, responsive, relecture des textes

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
git push && sleep 90 && curl -s https://w3cdotorg.github.io/grand-livre-poneyville/ | grep -c "Grand livre"
```

- [ ] **Step 7 : signaler à willow** que le test sur iPad réel lui revient.

---

## Ordre et jalons

Tasks 1→5 = socle navigable en ligne (placeholders). Task 6-7 = **premier jalon montrable à Raphaël** (Mane 6 + Spike dessinés). Ensuite 8→13 dans l'ordre. Push vers GitHub après chaque tâche à partir de la Task 5.
