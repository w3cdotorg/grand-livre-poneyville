# Le Grand livre de Poneyville

Encyclopédie visuelle de l'univers de Mon Petit Poney (*Les amies, c'est magique*)
pour les enfants de 4-5 ans. Personnages et lieux cliquables, textes courts à lire
à voix haute. Tous les dessins sont des SVG originaux faits main.

En ligne : <https://w3cdotorg.github.io/grand-livre-poneyville/>

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
écrans dans `js/render.js`, tout le contenu dans `js/data.js`. Chaque dessin est
un module `svg/…` qui exporte une fonction rendant une chaîne SVG.

```
index.html        page unique
css/style.css     styles (dont clignement et « mouvement réduit »)
js/data.js        26 personnages + 10 lieux : le contenu
js/render.js      les cinq écrans (accueil, poneys, lieux, poney, lieu)
svg/carte.js      la carte d'accueil
svg/poneys/*.js   un module par personnage (+ `_commun.js`, l'anatomie partagée)
svg/lieux/*.js    un module par lieu (+ `_decor.js`, le décor partagé)
refs/             captures de la série ayant servi de modèle (locales, non versionnées)
NOTES.md          journal des trouvailles et des choix de dessin
```

- Dev : `./serve.sh` puis <http://localhost:8123>
- Tests : `npm test` (node --test, zéro dépendance) — 15 tests, cohérence des
  données, conformité des modules SVG et validateur d'arité des tracés.
