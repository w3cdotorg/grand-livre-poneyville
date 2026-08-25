# Le Grand livre de Poneyville

Encyclopédie visuelle de l'univers de Mon Petit Poney (*Les amies, c'est magique*)
pour les enfants de 4-5 ans. Personnages et lieux cliquables, textes courts à lire
à voix haute.

En ligne : <https://w3cdotorg.github.io/grand-livre-poneyville/>

## Visuels

Deux régimes, depuis l'amendement du 25/08 :

- les **26 personnages** sont des **images officielles de la série**, détourées sur
  fond transparent (`img/poneys/<id>.png`) — © Hasbro, reprises ici dans un projet
  de fan non commercial, sans but lucratif ;
- la **carte** et les **10 lieux** restent des **SVG originaux** dessinés à la main
  (`svg/carte.js`, `svg/lieux/*.js`).

## Ce qu'il y a dedans

- une **carte de Poneyville** en page d'accueil, où chaque bâtiment et six poneys
  sont cliquables ;
- **26 personnages** — les Mane 6, Spike, la famille Apple, les Chercheuses de
  talent, les princesses, Zecora, Discord, Trixie, Derpy, Cheerilee et les six
  animaux de compagnie ;
- **10 lieux** — la bibliothèque Golden Oak, Sweet Apple Acres, la Carousel
  Boutique, Sugarcube Corner, la chaumière de Fluttershy, la forêt Désenchantée,
  la hutte de Zecora, Canterlot, Cloudsdale et l'école de Poneyville.

Chaque fiche donne l'espèce, un texte court, et selon les cas la marque de beauté
et un « Le sais-tu ? ». Les cibles tactiles font toutes au moins 64 px : le livre
se lit au doigt sur un iPad.

## Comment c'est fait

Aucune dépendance, aucune étape de build : du HTML, du CSS et des modules ES
servis tels quels. Le routeur tient dans `js/app.js` (sur `location.hash`), les
écrans dans `js/render.js`, tout le contenu dans `js/data.js`. Chaque lieu est un
module `svg/…` qui exporte une fonction rendant une chaîne SVG ; chaque
personnage est un simple `<img>`.

```
index.html        page unique
css/style.css     styles (dont respiration des fiches et « mouvement réduit »)
js/data.js        26 personnages + 10 lieux : le contenu
js/render.js      les cinq écrans (accueil, poneys, lieux, poney, lieu)
img/poneys/*.png  une image officielle détourée par personnage (© Hasbro)
svg/carte.js      la carte d'accueil
svg/lieux/*.js    un module par lieu (+ `_decor.js`, le décor partagé)
refs/             captures de la série ayant servi de modèle (locales, non versionnées)
NOTES.md          journal des trouvailles et des choix de dessin
```

- Dev : `./serve.sh` puis <http://localhost:8123>
- Tests : `npm test` (node --test, zéro dépendance) — 13 tests, cohérence des
  données, présence des 26 images détourées, conformité des modules SVG restants
  et validateur d'arité des tracés.
