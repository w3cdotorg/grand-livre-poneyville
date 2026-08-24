# Le Grand livre de Poneyville — design

**Date** : 2026-08-24
**Public** : Raphaël, 4-5 ans (4e projet de la série : corps humain, volcan, Paris).
**Objet** : encyclopédie visuelle de l'univers de Mon Petit Poney (génération 4, *Les amies, c'est magique*), navigable sans savoir lire, avec de courts textes qu'un adulte lit à voix haute.

## Décisions actées

| Sujet | Décision |
|---|---|
| Visuels | SVG dessinés main, style inspiré de FiM (aplats, silhouettes simples, marques de beauté) — 100 % originaux, aucun asset officiel Hasbro. |
| Texte | 2-3 phrases par fiche, lues par le parent. Pas de synthèse vocale. |
| Périmètre | Large d'emblée : 25 personnages (dont 6 animaux de compagnie) et 10 lieux. |
| Navigation | Accueil = carte dessinée + boutons galerie « Les poneys » / « Les lieux ». Navigation croisée fiche ↔ fiche. |
| Technique | Option A : statique, vanilla JS modules ES, zéro dépendance, zéro build, GitHub Pages. |
| Langue | Tout en français. Terminologie VF (« forêt Désenchantée ») ; les poneys gardent leurs noms de la VF (Twilight Sparkle, Rainbow Dash…). « Poneyville » s'écrit avec « poney ». "marque de beauté" (amendement 24/08). |
| Titre | « Le Grand livre de Poneyville » (capitalisation française : pas de majuscule à chaque mot). |
| Repo | `w3cdotorg/grand-livre-poneyville`, public, Pages servi depuis `master`. |

## Architecture

Site 100 % statique, sans framework ni build :

```
grand-livre-poneyville/
  index.html                  coquille unique (title, conteneur, <script type="module">)
  css/style.css               styles globaux + animations CSS
  js/app.js                   routing par hash (#/, #/poneys, #/lieux, #/poney/<id>, #/lieu/<id>)
  js/data.js                  TOUT le contenu : personnages, lieux, relations, textes FR
  js/render.js                construit chaque écran à partir de data.js
  svg/poneys/<id>.js          un module par personnage, exporte une chaîne SVG
  svg/lieux/<id>.js           un module par lieu
  svg/carte.js                la grande carte de l'accueil
  test/                       tests node (node --test), sans dépendance
  serve.sh                    serveur de dev local (python3 -m http.server)
  NOTES.md                    trouvailles et pièges notés au fil de l'eau
  docs/superpowers/specs/     ce document
```

Choix notables :

- **SVG en modules JS** (chaînes exportées) plutôt qu'en fichiers `.svg` fetchés : injection inline obligatoire pour animer au CSS (clignements d'yeux, queues) et poser des zones cliquables ; et pas de fetch → pas de dépendance au serveur.
- **Routing par hash**, aucun état hors `location.hash` : le bouton retour du navigateur/iPad marche naturellement, chaque fiche a une URL partageable.
- **Aucune dépendance réseau externe.** Police : pile système arrondie (`ui-rounded`, etc.) avec repli sans-serif — pas de Google Fonts, le site marche hors-ligne une fois chargé.

## Modèle de données (`js/data.js`)

**Personnage** :

```js
{
  id: "twilight",                    // slug, clé partout (fichier SVG, route, liens)
  nom: "Twilight Sparkle",
  espece: "licorne",                 // terrestre | pegase | licorne | alicorne | dragon |
                                     // zebre | draconequus | lapin | bebe-alligator | chien |
                                     // chat | tortue | hibou
  couleurs: { robe: "#…", criniere: ["#…", "#…"] },
  cutieMark: "une grande étoile magenta entourée de petites étoiles blanches",
  lieuId: "bibliotheque",            // null pour les sans-domicile-fixe (Discord, Trixie, Derpy)
  liens: {
    famille: ["…"],                  // ids
    amis: ["…"],
    animal: "owlowiscious"           // ou proprietaire: "…" pour un animal
  },
  texte: "2-3 phrases simples, chaleureuses, à lire à voix haute.",
  leSaisTu: "Une phrase amusante."
}
```

**Lieu** :

```js
{
  id: "foret-desenchantee",
  nom: "La forêt Désenchantée",
  habitants: ["zecora"],             // dérivable mais listé explicitement pour l'ordre d'affichage
  texte: "…",
  carte: { x: 62, y: 78 }            // position en % sur la carte d'accueil
}
```

Les tests d'intégrité garantissent : toute référence (lieuId, liens, habitants) pointe vers une entrée existante ; tout personnage et tout lieu a son module SVG ; réciprocité animal ↔ propriétaire ; chaque texte non vide ; ids uniques et en kebab-case.

## Écrans

1. **Accueil (`#/`)** — le titre, puis la grande carte SVG : Poneyville au centre (mairie, chaumières), Sweet Apple Acres à l'ouest, la forêt Désenchantée au sud (sombre mais pas effrayante), Canterlot accroché à sa montagne au nord-est, Cloudsdale dans le ciel. Chaque lieu est une zone cliquable → sa fiche ; quelques poneys posés sur la carte, cliquables aussi. Deux gros boutons au-dessus : **Les poneys**, **Les lieux**.
2. **Galerie poneys (`#/poneys`)** — grille de gros portraits (tête + prénom), les animaux de compagnie dans une rangée séparée en bas.
3. **Galerie lieux (`#/lieux`)** — grille de vignettes des scènes.
4. **Fiche personnage (`#/poney/<id>`)** — le personnage en grand, plein pied, clignement des yeux en boucle ; pictogramme d'espèce ; marque de beauté en médaillon ; le texte + le « Le sais-tu ? » ; vignettes cliquables : son lieu, sa famille, ses amis, son animal (ou son propriétaire).
5. **Fiche lieu (`#/lieu/<id>`)** — la scène en grand, texte court, vignettes des habitants.

**Navigation** : bouton 🏠 permanent (retour carte), tout écran atteignable en ≤ 2 taps depuis l'accueil, cibles tactiles ≥ 64 px, transitions CSS douces, pas de scroll horizontal. Cible principale : iPad (Safari), mais responsive desktop/mobile.

## Contenu

**Personnages (19)** : Twilight Sparkle, Applejack, Rainbow Dash, Pinkie Pie, Fluttershy, Rarity, Spike, Big Macintosh, Apple Bloom, Sweetie Belle, Scootaloo, Zecora, princesse Celestia, princesse Luna, Granny Smith, Discord, Trixie, Derpy, Cheerilee.
**Animaux de compagnie (6)** : Angel (Fluttershy), Gummy (Pinkie Pie), Winona (Applejack), Opale (Rarity), Tank (Rainbow Dash), Owlowiscious (Twilight).
**Lieux (10)** : la bibliothèque Golden Oak, Sweet Apple Acres, la Carousel Boutique, Sugarcube Corner, la chaumière de Fluttershy, la forêt Désenchantée, la hutte de Zecora, Canterlot, Cloudsdale, l'école de Poneyville.

Ton des textes : simple, chaleureux, factuel-univers (« Twilight adore les livres… »), zéro contenu effrayant. Vocabulaire accessible à 4-5 ans, phrases courtes.

## Dessin des SVG

- **Amendement du 24/08** — style commun documenté dans NOTES.md dès le premier poney validé : proportions **show-accurate**, relevées sur l'image de référence vectorielle fournie par le propriétaire (`.superpowers/sdd/2026-08-24-grand-livre-poneyville/reference-twilight.png`) et reproduites le plus fidèlement possible — tête ≈ 1/3 de la hauteur, encolure fine, jambes longues, très grands yeux, contours d'un ton plus soutenu que la robe ; viewBox commun `0 0 300 300` pour les personnages, palette par personnage dans `data.js` (source unique des couleurs, les SVG l'importent).
- Chaque personnage : pose plein pied 3/4, marque de beauté visible, paupières animables (CSS `@keyframes` sur un groupe `#paupieres`).
- Portraits de galerie : recadrage du même SVG via `viewBox` réduit (pas de second dessin).
- Lieux : scènes simples et lisibles (bâtiment + 2-3 éléments de contexte), même style d'aplats.

## Gestion des erreurs

- Route inconnue (`#/poney/xyz`) → retour doux à l'accueil (pas de page d'erreur : public de 4 ans).
- `data.js` étant validé par les tests, pas de gestion défensive dans le rendu.

## Tests et vérification

- **Tests node** (`node --test`, zéro dépendance) : intégrité des données (cf. modèle), présence et validité de base des SVG (parse, viewBox, groupe paupières pour les poneys), routes générées.
- **Vérification visuelle Playwright** à chaque vague de dessins : screenshot de chaque nouvelle fiche, contrôle à l'œil (couleurs, proportions, marque de beauté). Pas de WebGL ici → screenshots fiables directement. Piège connu (projet Paris) : cache agressif des modules ES → `page.route()` no-cache.
- **Test final sur iPad réel** (à la charge de willow).

## Phases de réalisation

1. **Squelette** : structure, routing, data.js (contenu texte complet), tests, serve.sh, NOTES.md — commit + repo GitHub public + Pages.
2. **Gabarits d'écrans** avec SVG placeholder (silhouette grise) : toute la navigation fonctionne de bout en bout.
3. **Mane 6 + Spike** dessinés → première version montrable à Raphaël.
4. **Carte d'accueil** dessinée.
5. **Reste des personnages** par vagues (famille Apple + Chercheuses de talent ; princesses + Zecora ; Discord/Trixie/Derpy/Cheerilee ; animaux).
6. **Les 10 lieux.**
7. **Polissage** : animations, transitions, responsive, accessibilité tactile, revue des textes.

Commits fréquents (au moins un par vague), trouvailles notées dans NOTES.md au fil de l'eau.

## Hors périmètre (YAGNI)

Synthèse vocale, sons, quiz/jeux, multilingue, épisodes/histoires, générations autres que G4, mode sombre, service worker/PWA. Extensible plus tard : ajouter un personnage = une entrée data.js + un SVG.
