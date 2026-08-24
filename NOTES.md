# Notes et trouvailles

Journal des découvertes techniques et choix de dessin, au fil de l'eau.

## Guide de style poneys

Établi en dessinant Twilight Sparkle (`svg/poneys/twilight.js`), qui sert de **modèle de
référence** : les 24 autres poneys reprennent ces coordonnées et ne changent que la
crinière, la queue, la marque de beauté et l'attribut d'espèce (corne / ailes / rien).

Le plus simple pour démarrer un nouveau poney est de copier `twilight.js` et de ne
retoucher que ces quatre blocs.

### Pose et cadrage

- `viewBox="0 0 300 300"`, pose **3/4 plein pied, tournée vers la droite** (museau à
  droite, croupe et queue à gauche).
- La silhouette occupe **y 22 → 276** : rien au-dessus de y=22 (la pointe de corne) ni
  en dessous de y=276 (le bas des sabots).
- Le portrait de galerie est le recadrage `viewBox="60 15 180 180"` du **même** SVG
  (fait par `js/render.js`). Donc : tout ce qui compte pour le portrait doit vivre dans
  x 60→240 / y 15→195, et la pointe de corne / d'oreille ne doit **jamais** dépasser
  y=20 sinon elle est coupée dans la vignette et sur la carte d'accueil.
- Proportions : tête ⌀108 pour une silhouette de 254 de haut, soit ~42 % — plus la
  crinière au-dessus. Le corps (124 × 86) est **volontairement plus petit que la tête** :
  c'est ce rapport qui fait « mignon ». Un corps plus gros et le poney devient un ourson.

### Coordonnées clés retenues

| Élément | Géométrie |
| --- | --- |
| Tête | `circle cx=152 cy=98 r=54` |
| Museau | `ellipse cx=194 cy=122 rx=24.5 ry=20` (naseau à 205,113 ; sourire 184→206 vers y=132) |
| Corps | `ellipse cx=140 cy=202 rx=62 ry=43` |
| Cou | `M124 122 Q112 158 126 186 L184 184 Q190 168 185 152 Q194 138 190 118 Z` |
| Pattes du fond | `rect` x=96 et x=156, `y=192 w=27 h=84 rx=13.5`, + calque `#000 / .1` |
| Pattes de devant | `rect` x=126 et x=176, mêmes dimensions ; sabots = bande `y=260 h=16` en `#000 / .13` |
| Œil proche (grand) | blanc `137,103 rx17 ry22` — iris `140,107 rx11 ry13` — pupille `140,109 rx5 ry6.5` (`#2a1436`) |
| Œil lointain (petit) | blanc `181,102 rx12.5 ry17` — iris `183,105 rx8 ry10` — pupille `184,107 rx3.6 ry5` |
| Reflets | `144,99 r4.6` + `134,113 r2.6` (opacité .8) sur l'œil proche ; `186,98 r3.2` sur l'autre |
| Paupières | mêmes centres que les blancs, rayons **+1 / +1** : `137,103 rx18 ry23` et `181,102 rx13.5 ry18` |
| Ligne de cils | `M121 96 Q124 84 137 81`, épaisseur 5, couleur `criniere[0]` |
| Oreille | `M106 70 Q100 32 122 40 Q138 48 132 72 Z` + conque `#000 / .13` |
| Corne (licornes) | `M164 62 Q170 40 191 22 Q195 46 192 68 Q176 72 164 62 Z` + reflet `#fff / .22` + 3 stries `#000 / .16` |
| Marque de beauté (flanc) | `translate(88 183) scale(.54)` d'un motif dessiné dans un carré 60×60 |
| Queue | masse `M96 174 Q56 194 48 246 Q54 262 72 258 Q90 250 98 226 Q104 198 104 176 Z` + 2 mèches en `stroke` |

### Ordre des couches (strict)

1. **queue** (derrière tout : masse `criniere[0]`, puis mèches `criniere[1]` et `criniere[2]` en `stroke-linecap="round"`)
2. **pattes du fond** — dessinées deux fois : robe, puis le même `rect` en `#000` opacité `.1`. C'est ce voile qui les fait lire « derrière » alors qu'elles sont de la même couleur que le corps.
3. **corps**
4. **marque de beauté** (sur le corps, sous les pattes de devant)
5. **pattes de devant** + sabots
6. **cou**, puis **tête**
7. **museau**, naseau, sourire
8. **oreille**, puis **corne / ailes** — avant la crinière, pour que la frange recouvre leur base : c'est ce qui fait que la corne « pousse » dans les cheveux au lieu d'être collée dessus
9. **crinière** : frange (masse `criniere[0]`, puis bande `criniere[1]`, puis bande `criniere[2]` par-dessus), puis mèche d'encolure
10. **yeux** (blanc → iris → pupille → reflets)
11. **paupières** (`<g class="paupieres">`)
12. **ligne de cils** (au-dessus des paupières, pour rester visible pendant le clignement)

### Les paupières et le clignement

`css/style.css` anime `.paupieres` en `scaleY` avec `transform-box: fill-box` et
`transform-origin: center top`. Conséquences **non négociables** :

- Les paupières se dessinent **en position fermée**, c'est-à-dire recouvrant entièrement
  les blancs des yeux (rayons +1 sur le blanc). Au repos le CSS les met à `scaleY(0)`.
  Le point de départ du brief ne couvrait que la moitié haute de l'œil : l'œil restait
  mi-ouvert pendant le clignement.
- L'origine du pli est le **haut de la bounding box du groupe entier**, donc le haut de
  la paupière la plus haute. Les deux paupières ne se replient donc pas exactement en
  phase — invisible à l'œil (le clignement dure ~135 ms), mais inutile d'essayer de les
  aligner parfaitement.
- Vérification en Playwright : forcer les deux états au lieu d'attendre le hasard —
  `.paupieres{animation:none;transform:scaleY(0)}` pour les yeux ouverts,
  `scaleY(1)` pour les yeux fermés.

### Variantes par espèce

- **Licorne / alicorne** : la corne ci-dessus, à sa place exacte. Le reflet clair et les
  3 stries ne sont pas décoratifs — sans eux la corne se lit comme une deuxième oreille.
- **Pégase / alicorne** : aile au lieu de la 2e patte du fond côté flanc, à insérer
  **après le corps et avant les pattes de devant**, autour de `(120..185, 165..205)`, en
  robe + un voile `#000 / .08` pour la détacher.
- **Terrestre / autres** : ni corne ni aile — garder l'oreille telle quelle. Ne pas
  compenser en agrandissant la crinière, ça déséquilibre le portrait.
- **Non-poneys** (Spike, Discord, animaux) : la grille tête/corps/pattes tient encore,
  mais tête et museau sont à retailler ; garder impérativement `class="paupieres"`
  (les tests l'exigent) et le cadrage tête dans `60 15 180 180`.

### Pièges rencontrés

- **Une oreille et une corne de même taille = deux oreilles.** La lecture ne vient pas de
  la position mais du contraste de forme : oreille courte et arrondie en arrière,
  corne fine, haute et striée à l'avant.
- **Tout trait sombre au-dessus de l'œil lointain fait un sourcil fâché.** Une seule
  ligne de cils, sur l'œil proche, et qui **suit** le bord du blanc de l'œil.
- **Les cils détachés de l'œil font des agrafes** : posés dans le vide ils tombent sur la
  crinière et se lisent comme des rayures. Un cil doit partir du bord de l'œil.
- **Pas de segment droit dans un contour visible.** Le premier cou finissait par un
  `L` horizontal exposé entre la mâchoire et le poitrail : effet marche d'escalier. Les
  segments droits d'un tracé doivent être noyés à l'intérieur d'une autre forme.
- **Une frange = un béret** si sa ligne de cheveux est un simple arc. Il faut une
  **pointe vers le bas** entre les deux yeux (ici `Q192 82 178 84`) pour que ça se lise
  comme des cheveux.
- **Les bandes de couleur de la crinière doivent rester à l'intérieur de la masse.**
  Elles sont dessinées comme des formes fermées qui longent la ligne de cheveux ; leur
  extrémité droite a dû être rentrée de ~10 unités (198 → 188 → 180) parce qu'elles
  dépassaient en pointe hors de la masse sombre.
- **La marque de beauté va sur la croupe**, côté queue (x≈88..120), pas côté poitrail. Le
  point de départ du brief la plaçait à droite, c'est-à-dire sur l'épaule.
- **Ombres portables d'un poney à l'autre** : utiliser `fill="#000" fill-opacity="…"`
  plutôt que d'assombrir une couleur, pour que ça marche avec n'importe quelle robe
  sans calculer de teinte.
- Playwright : `browser_take_screenshot` sur un élément **timeout** tant que le
  clignement tourne (« waiting for element to be stable »). Couper l'animation d'abord,
  ou faire une capture de viewport.
- Le cache des modules ES est agressif : ajouter `?v=n` sur `index.html` à chaque
  navigation, et **vérifier** qu'un morceau du nouveau tracé est bien dans le DOM
  (`el.outerHTML.includes('…')`) avant de juger une capture.
- **Tout accès à `criniere[i]` avec i > 0 doit être gardé par `?? criniere[0]`.** Les
  poneys monochromes ont une crinière avec un seul élément → `criniere[1]` = undefined →
  remplissages `fill="undefined"` noirs. Utiliser `c.criniere[1] ?? c.criniere[0]` et
  `c.criniere[2] ?? c.criniere[0]` partout, y compris dans `export const cutieMark`.

## 2026-08-24 — démarrage
- (les entrées s'ajoutent en tête de section, datées)
