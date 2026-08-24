# Notes et trouvailles

Journal des découvertes techniques et choix de dessin, au fil de l'eau.

## Guide de style poneys

Établi en redessinant Twilight Sparkle (`svg/poneys/twilight.js`) d'après l'**image de
référence** fournie par le propriétaire le 24/08/2026 :
`.superpowers/sdd/2026-08-24-grand-livre-poneyville/reference-twilight.png`.

Ce fichier est le **modèle anatomique** des 24 autres personnages. Le plus simple pour
démarrer un nouveau poney est de le copier et de ne retoucher que la crinière, la queue,
la marque de beauté et l'attribut d'espèce (corne / ailes / rien).

### Le repère : tout est relisable sur la référence

La référence (905 × 813 px) se projette sur le viewBox 300 × 300 par

    x_svg = 0,31 · x_ref + 8        y_svg = 0,31 · y_ref + 18

Toutes les coordonnées du fichier sont donc directement comparables au PNG. **C'est la
clé de la méthode** : on ne dessine pas « à l'œil », on relève des extrema ligne par
ligne sur la référence (`PIL`, un scan horizontal par couleur) et on les reporte.

### Proportions show-accurate (le nouveau canon)

Fini les « proportions FiM simplifiées » du brief initial (grosse tête ~40 %) : la
référence est un vecteur fidèle à la série.

| Élément | Géométrie (viewBox 300 × 300) |
| --- | --- |
| Silhouette totale | x 8 → 288, y 18 → 269 |
| Tête + crinière | x 179 → 288, y 18 → 120 — soit **~1/3** de la hauteur |
| Tête seule (museau compris) | x 181 → 282, y 42 → 117 |
| Naseau / bout du museau | (281, 85) ; sourire ouvert x 267 → 279, y 94 → 105 |
| Œil proche | amande 39,7 × 32,9 centrée (235,5 ; 77,9) |
| Œil lointain | même amande en `scale(-.41 .81)` centrée (266 ; 65,8) |
| Oreille | pointe (188, 56) → pointe basse (205, 101) : **longue**, pas un petit nub |
| Corne (licornes) | pointe (246, 19), base x 233 → 248 à y 46, 4 stries fines |
| Barrel / dos | dos plat y ≈ 125 de x 148 à 160, creux à y 132 vers x 175, garrot (194, 126) |
| Ventre | point bas y ≈ 185 entre x 166 et 178 |
| Croupe | bord gauche x ≈ 126 de y 150 à 180 |
| Pattes arrière | proche x 118 → 149, du fond x 147 → 166 ; sabots à y 266 |
| Pattes avant | proche x 177 → 206, du fond x 200 → 222 ; sabots à y 266 |
| Marque de beauté | centre (141,3 ; 154,4), étoile 15 × 25 + 5 étincelles |
| Queue | crescent : sommet (88, 84), extérieur jusqu'à x 9 vers y 196, pointe (95, 250) |

Le cou est **fin** et long (gorge de (243, 121) à (216, 181)), les jambes sont des
colonnes hautes légèrement galbées. Un corps trop rond ou des pattes courtes ramènent
immédiatement au style « peluche » qu'on a abandonné.

### Ordre des couches (strict)

1. **queue** : masse `criniere[0]`, puis bandes `criniere[1]` et `criniere[2]`, puis les
   séparations de mèches, puis **le contour retracé par-dessus** (voir pièges)
2. **membres du fond** (arrière puis avant) en robe assombrie + contour assombri
3. **oreille** — avant la tête : c'est le contour de la tête, dessiné ensuite, qui creuse
   le pli interne de l'oreille
4. **corps + cou + tête + museau : UN SEUL tracé fermé.** Aucune couture possible entre
   tête, encolure et poitrail
5. **marque de beauté** (sur le flanc, côté croupe)
6. **membres proches** : remplissage sans contour, puis le seul contour **visible** en
   tracé ouvert
7. **naseau**, **bouche ouverte** (intérieur + langue)
8. **yeux** (masse sombre → blanc inséré → iris → bas d'iris éclairci → pupille → 2 reflets)
9. **paupières** (`<g class="paupieres">`)
10. **le contour de la joue retracé**, par-dessus l'œil lointain, qui affleure le museau
11. **corne / ailes** — avant la crinière, pour que la frange recouvre leur base
12. **crinière** : frange, mèche rejetée en arrière, mèche d'encolure — chacune : masse,
    bandes, séparations, contour retracé
13. **cils**

### Couleurs : tout dérive de `c`

`c.robe`, `c.criniere[i]`, `c.yeux` sont les seules entrées. Les dérivés se calculent en
HSL par l'utilitaire `ton(hex, facteurSaturation, deltaLuminosité)` :

| Dérivé | Formule | Rendu sur Twilight |
| --- | --- | --- |
| contour de la robe | `ton(robe, .64, -.21)` | `#a64cc4` |
| membres du fond | `ton(robe, .65, -.10)` | `#b17bcd` |
| contour des membres du fond | `ton(robe, .55, -.25)` | `#9251ad` |
| contour de la crinière | `ton(criniere[0], 1.3, -.165)` | `#030f36` |
| séparation de mèches | `ton(criniere[0], 1, -.045)` | `#132566` |
| pupille | `ton(yeux, 1.2, -.28)` | `#040000` |
| bas d'iris éclairci | `ton(yeux, .35, .42)` | `#cbabdb` |

Seules trois constantes locales restent : blanc de l'œil `#fff8ff`, intérieur de bouche
`#c7096e`, langue `#fc5e1f`. **Tout accès `criniere[i]` avec i > 0 doit être gardé par
`?? criniere[0]`** — les poneys monochromes n'ont qu'une couleur, sinon `fill="undefined"`
donne des aplats noirs. Vérifié avec la palette d'Applejack : le modèle tient.

### Fenêtre de portrait

`portrait()` dans `js/render.js` recadre le **même** SVG en `viewBox="171 6 124 124"`
(retenu le 24/08 : la boîte tête+crinière fait 109 × 102 centrée sur (233,5 ; 68,5), la
fenêtre de 124 laisse ~7 % de marge de chaque côté). Conséquence : tout ce qui compte
pour la vignette de galerie et pour le mini-portrait de la carte d'accueil doit vivre
dans x 171 → 295 / y 6 → 130. Une pointe de corne au-dessus de y = 10 serait coupée.

Les 24 placeholders gris sont mal cadrés par cette fenêtre — c'est assumé, ils
disparaîtront au fur et à mesure des vrais dessins.

### Les paupières et le clignement

`css/style.css` anime `.paupieres` en `scaleY` avec `transform-box: fill-box` et
`transform-origin: center top`. Conséquences **non négociables** :

- Les paupières sont **l'amande de l'œil agrandie de 7 %**, dessinées en position
  fermée. Au repos le CSS les met à `scaleY(0)`.
- Elles n'ont **pas de contour** : un `stroke` sur un groupe mis à `scaleY(0)` laisse
  parfois un filet horizontal visible.
- L'origine du pli est le haut de la bounding box du groupe entier : les deux paupières
  ne se replient pas exactement en phase, invisible sur 135 ms.
- Vérification : forcer les deux états plutôt qu'attendre le hasard —
  `.paupieres{animation:none;transform:scaleY(0)}` yeux ouverts, `scaleY(1)` fermés.
  En Chrome headless, `--virtual-time-budget=4320` tombe pile dans le clignement.

### `_commun.js` : l'anatomie partagée

Depuis la vague 1 (Applejack → Spike), la carcasse est **factorisée** dans
`svg/poneys/_commun.js` : `ton`, `derives`, `AMANDE`, `IRIS`, `ETINCELLE`, `OREILLE`,
`CORPS`, les quatre pattes, et les blocs composites `membresFond`, `membresProches`,
`museau(d, ouverte)`, `oeil(c, d)(transform)`, `paupieres(c, e, teinte)`, `joue`,
`corne`, `cils(d, l)`, `ailePliee`, `aileDeployee`. Un fichier de personnage n'écrit
plus que sa part singulière (crinière, queue, marque, attribut d'espèce).

`twilight.js` reste **volontairement autonome** : c'est la pièce de référence, relisible
d'un bloc face au PNG. Les coordonnées de `_commun.js` en sont la copie exacte.

Deux dérivés de couleur ont été ajoutés pour les crinières **monochromes** (Applejack,
Pinkie, Fluttershy, Rarity), où `criniere[1]` vaut `criniere[0]` et où les bandes de
couleur du template disparaissent donc purement et simplement :

| Dérivé | Formule | Rôle |
| --- | --- | --- |
| `CRIN_H` | `ton(criniere[0], .95, +.075)` | reflet de mèche, remplace les bandes |
| `CRIN_S2` | `ton(criniere[0], 1.05, -.12)` | séparation renforcée (`CRIN_S` est invisible sur une mèche claire) |

### Variantes par espèce

- **Licorne / alicorne** : la corne ci-dessus, à sa place exacte. Les 4 stries fines et
  le contour ne sont pas décoratifs : sans eux la corne se lit comme une oreille.
- **Pégase / alicorne** : aile à insérer **après le corps et avant les pattes de
  devant**, en robe + contour, plus un voile `#000`. Deux variantes dans `_commun.js` :
  - `ailePliee` — repliée le long du flanc, `(158..209, 137..184)`, voile `.11`. C'est
    l'aile de Fluttershy. **Elle mange la place de la marque de beauté** : la marque doit
    tenir à gauche de x 158.
  - `aileDeployee` — déployée du garrot `(198,132)` vers `(113,88)`, voile `.08`. C'est
    l'aile de Rainbow Dash. Sa pointe reste à x < 171 pour rester **hors de la fenêtre de
    portrait**. À sa place nominale son bord bas descend à y 143 et **recouvre la marque
    de beauté** ; Rainbow Dash la remonte de 11 unités (`translate(-2 -11)`).
- **Terrestre** : ni corne ni aile, garder l'oreille telle quelle.
- **Non-poneys** (Spike, Discord, animaux) : rien de la carcasse ne se réemploie sauf
  `oeil`, `AMANDE` et `derives`. Garder impérativement `class="paupieres"` (les tests
  l'exigent) **avec les mêmes transformations que les yeux**, et le cadrage tête dans
  `171 6 124 124`.

### Dragon (Spike) — ce qui change

- **Échelle.** Un personnage petit dans l'univers doit quand même remplir sa fenêtre de
  portrait : Spike est dessiné à grande échelle, crâne `x 182 → 293, y 20 → 110`, la
  boîte même que la tête de Twilight. Son corps entier ne fait que ~2,5 hauteurs de tête,
  ce qui est le canon du personnage et pas un accident.
- **Face frontale aux trois quarts**, pas un profil de chanfrein. Les deux yeux sont côte
  à côte à l'avant du crâne, le lointain simplement resserré en largeur
  (`scale(.74 .95)`). Deux erreurs à ne pas refaire : le mettre **en miroir** (son iris
  part du mauvais côté, le regard devient divergent) et le poser à la place du poney
  (à droite, sur le museau — il se lit comme un œil greffé sur la truffe).
- **Le museau doit saillir BAS**, sous la ligne des yeux (`276,52 → 290,72 → 260,96`).
  Posé à hauteur d'œil il se lit comme une bosse sur la joue ; absent, la tête reste une
  boule et le dragon se lit comme un chat violet.
- **La gueule ouverte doit rester bien à l'intérieur du crâne.** Posée sur le bord de la
  mâchoire (y ≈ 100) elle se confond avec le contour et les crocs pendent dans le vide
  sous le menton.
- Ni les cils ni les sourcils du template : sur une face frontale, un sourcil au-dessus
  d'un œil sur deux fait un air fâché, et Spike n'en a pas dans la série.
- L'intérieur de gueule rose du template (`#c7096e`) est un rose de poney. Constantes
  locales : gueule `#8f3448`, langue `#d9647a`.

### Pièges rencontrés

- **Un `C` SVG mange les coordonnées par paquets de 3 points.** Un `C` suivi de 5 paires
  est un tracé **invalide** : le navigateur abandonne silencieusement la fin du chemin.
  C'est passé inaperçu une itération entière (frange amputée). Systématiquement
  valider : compter les nombres de chaque commande et vérifier le multiple attendu.
- **Un `stroke` centré fait un contour deux fois trop épais.** La référence a une bande
  de contour de ~2,5 unités ; un `stroke-width: 5` en produit 5 (2,5 dehors + 2,5 sur le
  remplissage) et étouffe les masses — la crinière devenait un ruban fin dans une bordure
  grasse. Valeurs retenues : **3,4** pour le corps, **3,2** pour crinière / queue /
  oreille / pattes, **2,8** pour la corne, **1,4-1,5** pour les séparations de mèches.
- **Les bandes de couleur d'une mèche sont des TRAITS épais le long de la courbe**, pas
  des tracés fermés : leurs bords restent ainsi parallèles à la mèche. Elles débordent
  toujours un peu → **retracer le contour de la mèche par-dessus** (le même `d`, en
  `fill="none"`). C'est le seul moyen propre de rattraper le débord sans `clipPath`.
- **Une frange = un béret** si sa ligne de cheveux est un simple arc. Il faut la pointe
  vers le bas (ici (212, 74)) qui mord sur l'œil proche.
- **L'iris doit affleurer le bord haut-droit de l'amande.** C'est ce contact qui produit
  le liseré sombre du regard MLP. On le fait avec un tracé d'iris aplati le long de ce
  bord — pas avec un `clipPath` (les IDs se dupliquent, le même SVG apparaît 3 fois par
  page).
- **Tout trait sombre au-dessus de l'œil lointain fait un sourcil fâché.** Trois cils
  courts au coin **externe** de l'œil proche, et rien d'autre.
- **Le contour du museau repasse par-dessus l'œil lointain.** Sans ce second passage
  l'œil déborde de la joue : dans la référence il affleure vraiment le bord.
- **Le coin mâchoire/gorge est un angle presque horizontal** : de (255, 115) à (243, 116)
  le bord perd 12 unités en 1. Une courbe douce y fait un menton de cheval.
- **Le contour d'une patte proche ne doit pas être fermé** : le trait traverserait le
  flanc. Remplissage fermé sans contour + tracé ouvert pour le contour visible.
- **Les étincelles blanches de la marque de beauté sont invisibles sur le médaillon**
  (fond clair de la fiche). Le `cutieMark` porte donc un disque de `c.robe` derrière :
  c'est la marque « telle qu'elle est sur la robe ».
- **La marque de beauté va sur la croupe**, côté queue, pas côté poitrail.
- **Ombres portables d'un poney à l'autre** : passer par `ton()` en HSL plutôt que par
  des hex écrits à la main, pour que ça marche avec n'importe quelle robe.
- Playwright : `browser_take_screenshot` sur un élément **timeout** tant que le
  clignement tourne. Pour la boucle de fidélité, plus rapide et plus fiable : rendre le
  SVG dans une page HTML locale et capturer avec Chrome headless
  (`--headless --screenshot --window-size`), en superposant la référence à 55 %
  d'opacité — la comparaison devient métrique et non plus impressionniste.
- Le cache des modules ES est agressif : ajouter `?v=n` et **vérifier** qu'un morceau du
  nouveau tracé est bien dans le DOM (`el.outerHTML.includes('…')`) avant de juger.

### Pièges de la vague 1 (Applejack, Rainbow Dash, Pinkie, Fluttershy, Rarity, Spike)

- **Un contour retracé en `fill="none"` retrace un bord, il ne DÉCOUPE rien.** C'est la
  méprise la plus coûteuse de la vague. La technique marche pour rattraper le débord
  d'une bande *le long* du bord de sa mèche ; elle ne fait rien contre une forme qui
  dépasse franchement de la masse (une mèche pointue, un disque de boucle, un trait
  épais). Conséquence pratique : **quand la masse arrière couvre la zone de l'oreille
  (`181 → 205, 56 → 101`), il faut poser l'oreille DEVANT la crinière**, en couche 12 bis
  au lieu de 3, et retracer à la main le pli interne que le contour du corps dessinait :
  `M202 62C200 74 200 86 202 100` en `TRAIT`, épaisseur 3,4. C'est le cas de Rainbow
  Dash, Pinkie, Fluttershy et Rarity — et c'est de toute façon la bonne lecture, l'oreille
  proche est en avant des mèches rejetées derrière la tête.
- **Découper une crinière longue en « frange » + « masse » donne infailliblement un
  béret**, avec une couture entre les deux. Fluttershy est dessinée en **UN SEUL tracé**,
  de la pointe de frange sur le front au crochet de poitrail. Corollaire : le bord bas de
  la frange doit être **concave** et la ligne de cheveux **bombée** (jusqu'à y 32) ; un
  bord bas rectiligne au ras du crâne fait un couvre-chef même en une seule pièce.
- **La frange ne doit pas descendre sous y 62 au-delà de x 224**, sinon elle recouvre la
  pupille de l'œil proche (amande `216 → 255, 61 → 94`). Cote relevée sur la référence :
  le bord bas passe par (213,75) puis remonte à (233,62) et (251,52). Deux itérations
  perdues sur Applejack à cause de ça.
- **Six couleurs de crinière : les traits parallèles ne suffisent plus.** Une famille de
  courbes décalée d'un `(dx, dy)` constant ne peut pas suivre un contour qui s'évase :
  sur la crête de Rainbow Dash les pointes restaient en aplat violet. Les coquilles
  concentriques (même tracé mis à l'échelle autour de la racine) sont pires : la largeur
  de bande croît avec la distance, on obtient un énorme cœur violet sur le crâne. La
  solution est **six mèches explicites**, chacune une amande pointue `M … Q … Q … Z`,
  posées de la plus profonde à la plus haute sur une masse de fond. En revanche, sur la
  **queue** — un faisceau droit — les six traits parallèles marchent très bien.
- **Le contour de crinière ne dérive pas toujours de `criniere[0]`.** Sur Rainbow Dash,
  `ton(rouge, …)` cerne les bandes bleues et violettes d'un liseré rouge très voyant : le
  contour dérive de `criniere[5]` (le violet), la plus sombre des six. Sur Rarity, le
  `CRIN_T` du template (-16,5 %) ne détache pas un trait épais violet foncé de la volute
  qu'il cerne : on passe à `ton(M0, 1.25, -.21)`.
- **Une volute ne se dessine pas comme un tracé fermé** — son contour devrait se
  recroiser. On la dessine comme un **trait épais à bouts ronds passé deux fois** : large
  en `CRIN_T` (c'est le contour), puis plus fin en `M0`. Aux recouvrements la seconde
  passe efface la première et la boucle se referme sans couture interne. C'est toute la
  crinière et toute la queue de Rarity.
- **Une seule file de boucles fait une chaîne de perles, pas un volume.** La crinière de
  Pinkie est faite de **deux rangs** de disques par masse, le rang extérieur d'abord.
  Chaque boucle porte une volute (`CRIN_S2`) et un reflet en croissant (`CRIN_H`) : sans
  eux les disques se lisent comme des bulles de savon.
- **Une marque de beauté à trois motifs se lit mal si les motifs sont trop repliés sur
  eux-mêmes.** Les échancrures d'aile du papillon de Fluttershy devaient revenir jusqu'à
  x ±6 : à ±10 les quatre lobes fusionnent en une tache ronde dès la taille du médaillon.
  Contrôler chaque marque **dans le médaillon 60 × 60**, pas seulement sur le flanc.
- **La marque de beauté est prise en étau entre la cuisse et l'aile.** Le bord haut de la
  patte arrière proche passe de (131,182) à (162,163) : tout ce qui descend sous y 168
  disparaît sous la cuisse. Et l'aile (repliée ou déployée) occupe précisément le flanc.
  Les marques de la vague sont donc **hautes et compactes**, et le médaillon est décalé
  vers le bas (`translate` +2 à +3) pour ne pas déborder du disque de 60.
- **Attention aux accents graves dans les commentaires HTML d'un template literal** : un
  ``fill="none"`` en accents graves à l'intérieur d'un `` `…` `` ferme la chaîne. Deux
  `SyntaxError` sur la vague. Écrire `fill=none` en clair dans les commentaires SVG.
- **Un validateur de tracés se rentabilise immédiatement.** Le script de la vague parse
  tous les `d="…"` des six modules avec **leurs vraies couleurs de `data.js`**, vérifie
  l'arité de chaque commande (`M`/`L`/`T` = 2, `H`/`V` = 1, `C` = 6, `S`/`Q` = 4, `A` = 7)
  et cherche `undefined`, `NaN`, `hsl(NaN`. 483 tracés contrôlés à chaque itération.
- Boucle de fidélité : une page HTML locale qui rend, côte à côte et pour chaque
  personnage, **le dessin entier, le portrait recadré `171 6 124 124`, les paupières
  forcées à `scaleY(1)` et le médaillon**, capturée en Chrome headless. Beaucoup plus
  rapide que Playwright, et elle montre d'un coup les trois cadrages qui comptent.

## 2026-08-24 — vague 1 : les cinq autres Mane 6 + Spike

- **Applejack, Rainbow Dash, Pinkie Pie, Fluttershy, Rarity et Spike dessinés**
  show-accurate, et l'anatomie commune extraite dans `svg/poneys/_commun.js`. Sept
  personnages sur vingt-six sont désormais de vrais dessins ; dix-neuf placeholders
  restent. Trouvailles consignées ci-dessus (§ « Pièges de la vague 1 », § `_commun.js`,
  § « Variantes par espèce », § « Dragon (Spike) »).
- Aucun hex de `data.js` n'a eu besoin d'être retouché : les six palettes fournies
  tiennent à l'écran, y compris la robe quasi blanche de Rarity (`#f2f0f7`), dont le
  contour dérivé `ton(robe, .64, -.21)` donne un gris lavande clair conforme à la série.
- Couleurs qui ne dérivent d'aucune entrée de `c` et restent donc des **constantes
  documentées**, par personnage : pommes `#c9302c` / feuille `#5aa844` (Applejack),
  nuage `#ffffff` / `#c9d4e2` (Rainbow Dash), ballons `#f7d54e` et `#86cfee` (Pinkie),
  papillons `#ef7ba9` (Fluttershy), diamants `#7fc3e8` (Rarity), gueule `#8f3448` et
  langue `#d9647a` (Spike).

## 2026-08-24 — démarrage
- **Twilight redessinée d'après référence (show-accurate).** Le propriétaire a fourni un
  vecteur de référence ; le guide de style ci-dessus est réécrit en conséquence et
  remplace les « proportions FiM simplifiées » du spec (amendement acté dans
  `docs/superpowers/specs/…-design.md`). Méthode : relevé métrique de la référence en
  Python (extrema par ligne et par colonne, par couleur), report dans le repère
  `0,31·ref + (8, 18)`, puis 6 tours de boucle rendu → superposition → diff numérique.
  Hex de Twilight repipetés sur le PNG dans `data.js` :
  robe `#c9a7e0 → #d291eb`, crinière `[#2a2f6e, #ec5fa4, #7147a8] → [#152878, #fc0b8a, #600a92]`,
  yeux `#7b3fa0 → #561c81`. Fenêtre de portrait : `60 15 180 180 → 171 6 124 124`.
- (les entrées s'ajoutent en tête de section, datées)
