# Notes et trouvailles

Journal des découvertes techniques et choix de dessin, au fil de l'eau.

## Guide de style poneys

Établi en redessinant Twilight Sparkle (`svg/poneys/twilight.js`) d'après l'**image de
référence** fournie par le propriétaire le 24/08/2026 :
`.superpowers/sdd/2026-08-24-grand-livre-poneyville/reference-twilight.png`.

Ce fichier est le **modèle anatomique** des 24 autres personnages. Le plus simple pour
démarrer un nouveau poney est de le copier et de ne retoucher que la crinière, la queue,
la marque de beauté et l'attribut d'espèce (corne / ailes / rien).

### RÈGLE : tout nouveau personnage exige une référence PLEIN PIED

Acté le 24/08/2026 par le propriétaire, après la vague 2 : **aucun visage ne se
dessine de mémoire.** Twilight est réussie parce qu'elle a été relevée sur une
vraie image ; les visages faits « de connaissance » sont ratés, et ils se ratent
toujours au même endroit (voir le tableau des trois erreurs systématiques plus
bas). Le protocole complet, pour chaque personnage :

1. **Trouver une image officielle PLEIN PIED**, si possible dans la pose du
   template (trois quarts, tête à droite). Le chemin qui marche est l'API
   MediaWiki de `mlp.fandom.com` (voir § protocole de références) ; les images
   d'infobox `File:<Nom> ID S…` sont presque toujours des plein pied sur fond
   d'épisode. **Les fichiers dont le titre commence par `ID` en minuscules
   (`File:Apple Bloom id S01E12.png`) sont les plus anciens, et souvent les plus
   proches de la pose du template.** Écarter les titres `FANMADE`.
2. **La télécharger dans `refs/` et la REGARDER** (outil Read). Les images
   arrivent en WebP sous une extension `.png` : les repasser en PNG avec PIL,
   sinon l'outil de lecture ne les affiche pas.
3. **Relever la géométrie en fraction de la HAUTEUR DE TÊTE** (sommet du crâne →
   menton). C'est la seule cote comparable d'une pose à l'autre : la « longueur
   de tête » dépend de l'orientation, et « l'arrière du crâne » est sous la
   crinière. Un montage à grille (`PIL` + `ImageDraw`, un trait tous les 40 px,
   coordonnées écrites dans l'image) suffit et va vite.
4. **Boucler contre la référence** : une page HTML qui met côte à côte, à la même
   hauteur, le visage de la référence recadré et mon portrait `171 6 124 124`,
   plus le plein pied des deux ; capture en Chrome headless ; deux à quatre tours.
   **La superposition à 55 % du § suivant n'est possible que si la référence est
   dans la MÊME pose** — les images d'infobox sont souvent de trois quarts
   *avant*, et le dessin de trois quarts *côté* : dans ce cas on compare des
   rapports, pas des pixels.
5. **Noter l'URL de la référence en tête du fichier du personnage.**

**Les trois erreurs systématiques du dessin de mémoire**, toutes les trois
relevées sur la vague 2 et toutes les trois invisibles avant la comparaison :

| Erreur | Ce que dit la référence |
| --- | --- |
| l'œil trop **haut** dans le crâne | centre de l'œil à 0,53 → 0,68 de la hauteur de tête, jamais 0,48 (le canon de Twilight, dont la tête est *relevée vers le ciel*) |
| les **cils** au coin bas | tête de niveau ⇒ cils au coin **haut-arrière**, en éventail vers le haut et l'arrière. Au coin bas ils se lisent comme trois griffures sur la joue |
| l'œil trop **petit** chez une pouliche | 0,61 → 0,655 de largeur-sur-hauteur-de-tête, contre 0,53 chez l'adulte |

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

### Le visage : une expression signature par personnage

Le retour du propriétaire sur la vague 1 — « elles ont toutes exactement le même
visage et la même expression faciale » — était exact et méritait sa propre passe.
Les cinq poneys de la vague héritaient tels quels des quatre blocs de visage du
template (`museau`, `oeil`, `paupieres`, `cils`), donc du visage de Twilight.

**Protocole de références (obligatoire avant de dessiner un visage).** Les images
officielles se prennent sur `mlp.fandom.com`, et **pas** avec un `WebFetch` ni un
`curl` sur la page (402 et 403 respectivement — Fandom filtre). Le chemin qui
marche est **l'API MediaWiki**, qui répond 200 sans authentification :

    # l'image d'infobox d'un personnage
    api.php?action=query&prop=pageimages&titles=Applejack|Rarity&format=json&pithumbsize=700
    # chercher un plan d'expression précis (namespace 6 = Fichier)
    api.php?action=query&list=search&srsearch=Rainbow+Dash+smug+smirk&srnamespace=6&srlimit=8
    # l'URL directe d'un fichier nommé
    api.php?action=query&prop=imageinfo&iiprop=url|size&titles=File:...
    # ★ LE PLUS EFFICACE pour trouver une image d'infobox (refonte du 24/08) :
    #   lister les fichiers PAR PRÉFIXE. `list=search` ne les sort pas, il noie
    #   la requête dans les FANMADE et les captures d'épisode.
    api.php?action=query&list=allimages&aiprefix=Rarity+id&ailimit=30
    api.php?action=query&list=allimages&aiprefix=Rarity+ID&ailimit=30

Écarter les titres préfixés `FANMADE` (ce ne sont pas des captures de la série),
et les suffixes `EG`, `EGDS`, `CYOE` : ce sont les versions Equestria Girls
(humaines), pas les poneys. Les deux casses (`id` et `ID`) doivent être
interrogées séparément, l'API est sensible à la casse sur `aiprefix`.
Les dix références retenues sont dans
`.superpowers/sdd/2026-08-24-grand-livre-poneyville/refs/`. Les **regarder** :
deux relevés seulement contredisaient l'intuition, et tous les deux comptaient —
les taches de rousseur d'Applejack sont plus **claires** que sa robe, et le fard à
paupières de Rarity est un **bleu** clair, pas un lilas gris.

**La règle d'or : tout se joue À L'INTÉRIEUR de l'amande.** Le groupe
`class="paupieres"` du clignement est calé sur l'amande de l'œil. Donc aucune
expression ne doit toucher à l'amande : ni l'agrandir, ni la déplacer, ni la
faire tourner. Un œil « écarquillé » s'obtient en **rétrécissant l'iris** pour
qu'il se décolle du bord haut (option `iris` de `oeil`), un regard baissé en
**décalant l'iris** (option `regard`), un œil mi-clos en **peignant une paupière
par-dessus**. Corollaire vérifié au navigateur : les six poneys ont exactement la
même boîte de paupières (`214,6 / 51,4 / 59,9 × 44`) et la couvre-t-elle des
quatre amandes avec marge positive sur les quatre côtés.

**Une paupière fixe est un MÉLANGE DES DEUX BORDS de l'amande**, point à point
(`melange` dans `_commun.js`) : à 0 elle ne couvre rien, à 1 elle couvre tout.
Les deux bords partageant leurs extrémités, tout mélange part et arrive aux deux
**coins** de l'œil — la paupière pivote sur les coins, comme une vraie, et ne peut
par construction jamais sortir de l'œil. Deux versions ont été jetées avant :

- *l'amande entière remontée* : sa moitié haute sort du crâne. Sur Rarity la
  paupière du fard débordait au-dessus du front, à côté de la corne, en gros
  hématome lilas. Invisible sur Rainbow Dash et Fluttershy **parce que leur
  crinière la masquait** — le piège classique de ce qui marche par chance ;
- *le bord bas translaté vers le haut* : le remplissage restait borné, mais le
  **pli** s'échappait. Le bord bas a ses extrémités à y −3,9 et +9,5 alors que le
  sommet de l'amande est à −16,8 : remonté de 21, son extrémité arrière passe à
  −24,9, soit huit unités au-dessus. Le pli traçait un grand arc en travers du
  front de Rainbow Dash. **Une paupière n'est pas un bord translaté, c'est un
  bord qui pivote.**

La paupière fixe se dessine dans le repère du **blanc** de l'œil
(`translate(-1.6 1.4) scale(.955)`), ce qui laisse intact le liseré sombre de
l'amande sur tout le tour : c'est lui qui fait la ligne de cil supérieure.
Elle se pose en **couche 8 bis**, entre les yeux et `paupieres`.

**Le sourcil n'est possible que si la crinière laisse le front nu.** Sur les cinq
poneys de la vague, **un seul** : Rainbow Dash, dont la crête est rejetée en
arrière (front nu de y 45 à y 60). Applejack a le chapeau, Pinkie ses boucles, la
crinière de Fluttershy descend en diagonale de (254,44) à (214,84) et couvre tout
l'arrière de l'œil, la frange de Rarity est coiffée en avant et son bord bas passe
par (238,66) — **plus bas que le sommet de l'œil**. Et déplacer le sourcil « là où
il reste de la place » ne sauve rien : avancé jusqu'au triangle de front nu
(x 240 → 258), il cesse de se lire comme le sourcil de l'œil proche et devient un
pli au-dessus de l'œil **lointain**, c'est-à-dire l'air fâché du piège connu.
Cotes du sourcil qui marche : **court** (une demi-largeur d'œil, pas plus — long,
il fait un pli du front), **fin** (2,6), de la couleur sombre des **cils** et non
du contour de la robe, et montant vers l'**avant** (vers l'arrière : air inquiet).

**L'encoche de bouche du template n'est pas une réserve de place, c'est la forme
du museau.** Elle interdit tout point à x > 272 entre y 98 et 102. Piste essayée
et écartée sur Pinkie : élargir l'encoche de `CORPS` pour elle seule, de
(271,98) → (279,106) à (265 ; 97,5) → (276,5 ; 109). Résultat, le bout du museau
se lit comme **mordu** et la nouvelle lèvre inférieure fait une marche. Un grand
rire doit donc se contenter de la joue, entre le bord bas de l'œil (y 94,4 à
x 250) et la mâchoire (y 113,2 à x 261) : **large (23) et peu haut (14)**, jamais
rond — plus haut, il se lit comme posé sur le menton. Et c'est sa **bande de
dents** qui le rend spectaculaire, pas sa taille : l'aplat rose du template se
lisait comme une langue tirée. Une seule ligne de séparation entre les rangées ;
dessiner chaque dent fait peur.

**Le crochet d'un sourire en coin reste court.** Deux essais perdus : monté à
y 90 il sort du chanfrein (à y 93 la silhouette est déjà à x 279,3) et dessine un
bec ; et même contenu, un crochet de huit unités se lit comme un hameçon. Trois
unités de relevé au maximum.

**Le tableau des expressions** — c'est le guide des vagues suivantes :

| Personnage | Paupière haute | Bouche | Cils | Autre |
| --- | --- | --- | --- | --- |
| Twilight (référence) | aucune | `museau` ouvert + langue | 3 × 1, coin **bas** | — |
| Applejack | aucune (regard franc) | **`sourireDents(1,25)`** | 3 **hauts** × 1 | 3 **taches de rousseur** claires et serrées, `museau` à encoche |
| Rainbow Dash | **.72** + basse .07 | `sourireCoin(2)` + `museauLisse` | 3 **hauts** × 1 | **sourcil** plat, en `CRAYON` ; œil à cerne noir |
| Pinkie Pie | aucune | **`grandRire`** (dents) + `museauLisse` | 3 **hauts** × 1 | iris **.84**, regard (1,6 ; 3), 2 étincelles, œil à cerne noir |
| Fluttershy | **.72** (tombante) | `sourireTimide` + `museauLisse` | 3 **hauts** × **1,6**, fins (2,2) | regard baissé (,6 ; 3,2), **sourcil** arqué, œil à cerne noir |
| Rarity | **.72**, peinte du **fard** | `sourirePose` + `museauLisse` | 3 **hauts** × **1,6**, épais (2,5) | fard = `ton(yeux, .5, .4)`, **sourcil** fin, corne à contour renforcé |
| Spike (dragon) | aucune | gueule ouverte, crocs | aucun | crête à 3 grandes palmes, `CADRE_SPIKE` |
| Big Macintosh | **.60** (lourde) | sourire fermé épais + **fossette** de coin | **aucun** | 3 taches de rousseur, œil descendu de 4 |
| Apple Bloom | aucune | petit rire ouvert, dents | 3 **hauts** | nœud rose géant, PAS de taches |
| Sweetie Belle | aucune | petite bouche ronde ouverte | 2 **hauts** | iris **.86**, regard (0 ; 0,8) |
| Scootaloo | aucune, + basse **.12** | grand rire relevé vers l'arrière | 3 **hauts** | petites ailes |
| Granny Smith | **.56**, ligne sombre | sourire long et bas + **pli de coin** | 2 **hauts**, épais | **3 rides**, regard (0 ; 1) |
| Diamond Tiara | **.74** | sourire en coin fermé | 3 **hauts**, épais | **sourcil arqué**, tiare |

Réglages utiles de la paupière haute : 1 = grand ouvert, .72 = regard doux
tombant, .6 = mi-clos élégant, .64 + .1 par le bas = plissé d'assurance, .2 =
presque fermé. **Ne pas descendre sous .5** : en vignette de galerie (60 px) l'œil
devient une fente et le poney a l'air endormi, pas expressif. C'est la cote qui a
coûté trois itérations sur Rainbow Dash.

**Correction de la refonte du 24/08 : ne pas descendre sous .70 non plus, quand
la paupière est la SEULE chose qui porte l'expression.** Rainbow Dash à `.64`
plus `.10` par le bas et Rarity à `.6` avaient, dans la galerie, les deux yeux
les plus fermés d'une série où ces deux personnages ont justement les plus grands
yeux. Sur relevé, un œil mi-clos de la série garde une PUPILLE RONDE ENTIÈRE : la
paupière mange la moitié du BLANC, pas la moitié de l'iris. `.72` est la valeur
qui donne ça.

**Le fard de Rarity devait être visible YEUX OUVERTS.** Il ne l'était qu'au
clignement, soit caché 99 % du temps. La solution tient en un seul geste : peindre
la **paupière fixe mi-close** du fard, ce qui met le lilas exactement là où la
série le met. Bonus : le clignement, qui utilise la même teinte, reste cohérent.

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
- **La bouche doit rester DANS le museau, et l'encoche vide se lit comme un bec.**
  Les deux moitiés du même piège, trouvées à la refonte du 24/08 : `sourireCoin`
  sortait de cinq unités du chanfrein, et l'encoche de bouche laissée vide
  terminait le museau en marche d'escalier. Frontière avant échantillonnée et
  correctif (`museauLisse`, couche 6 ter) au § de la refonte, plus bas. À retenir
  d'un mot : **un crochet de sourire ne peut pas monter à l'avant**, l'encoche
  est rentrante.
- **Un trait sombre dérivé de `c.yeux` n'est pas un crayon à cils.** Les cils de
  la série sont noirs pour tout le monde ; utiliser `CRAYON` et non `PUPILLE`.
  Même remarque pour le liseré de l'amande et la pupille sur un iris coloré :
  `oeil(c, { ...d, PUPILLE: d.CRAYON })`.
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
- **Le validateur d'arité tourne à chaque itération de la passe expressions**, et
  il a servi : un mélange de points en JavaScript produit des `-0.05000000000001`
  qui gonflent les `d=` inutilement (d'où l'arrondi à 2 décimales dans
  `melange`), et une bouche écrite en deux `C` concaténés à la main s'était
  retrouvée avec un `C` de 10 nombres au lieu de 12. 500 tracés, 0 erreur.
- **Un validateur de tracés se rentabilise immédiatement.** Le script de la vague parse
  tous les `d="…"` des six modules avec **leurs vraies couleurs de `data.js`**, vérifie
  l'arité de chaque commande (`M`/`L`/`T` = 2, `H`/`V` = 1, `C` = 6, `S`/`Q` = 4, `A` = 7)
  et cherche `undefined`, `NaN`, `hsl(NaN`. 483 tracés contrôlés à chaque itération.
- Boucle de fidélité : une page HTML locale qui rend, côte à côte et pour chaque
  personnage, **le dessin entier, le portrait recadré `171 6 124 124`, les paupières
  forcées à `scaleY(1)` et le médaillon**, capturée en Chrome headless. Beaucoup plus
  rapide que Playwright, et elle montre d'un coup les trois cadrages qui comptent.

## 2026-08-24 — passe expressions : un visage par personnage

- **Les cinq poneys de la vague Mane ont chacun leur visage.** Finding du
  propriétaire clos. Détail et cotes dans le § « Le visage : une expression
  signature par personnage » ci-dessus, tableau récapitulatif compris.
- **`_commun.js` gagne une boîte à outils d'expression** sans rien retirer :
  `naseau`, quatre bouches (`sourireCoin`, `grandRire`, `sourireTimide`,
  `sourirePose`), `paupiereHaute` / `paupiereBasse` (+ les primitives
  `PAUPIERE_H`, `PLI_H`, `PAUPIERE_B`, `PLI_B`), `sourcil`, `taches` / `TACHE`,
  et les deux moitiés d'amande `AMANDE_HAUT` / `AMANDE_BAS`. `museau` reste
  inchangé (Twilight, Spike), `oeil` gagne un 3ᵉ argument **optionnel**
  (`iris`, `regard`, `sus`) et `cils` deux (`n`, `w`) — dans les deux cas les
  valeurs par défaut reproduisent le rendu du template.
- **Twilight et Spike n'ont pas été touchés**, et aucune incohérence flagrante
  n'a été relevée sur eux. En particulier le placement des cils **au coin
  bas-arrière** de l'œil, qui surprend face aux références de la série (elles les
  montrent au coin haut-arrière), est correct **pour cette pose** : dans la
  référence fournie, Twilight a la tête relevée vers le ciel, donc le coin
  externe de son œil pointe vers le bas-arrière. Tous les poneys héritant de
  cette pose, la cote est bonne partout — c'est noté pour que la vague suivante
  ne « corrige » pas ce qui n'est pas cassé.
- **Réserves.** (1) Fluttershy garde la tête relevée du template : la baisser
  demanderait de redessiner `CORPS`, hors périmètre ; le regard baissé est rendu
  par l'iris. (2) Le toupet en rouleau de Rarity n'est pas repris : sa volute de
  nuque (`VOLUTE_TETE`) joue déjà ce rôle devant l'oreille, et refaire la frange
  en volute avant sortait du périmètre « expressions ». (3) Applejack n'a de
  taches de rousseur que sur la joue **proche** — en vue de trois quarts l'autre
  joue n'existe pas à l'écran.

## 2026-08-24 — vague 2 : Big Macintosh, les Chercheuses de talent, Granny Smith, Diamond Tiara

Six personnages, **treize dessins sur vingt-six** désormais. Références plein
pied utilisées (toutes via l'API MediaWiki, toutes dans `refs/`) :

| Personnage | Référence plein pied | Complément |
| --- | --- | --- |
| Big Macintosh | `Big_McIntosh_id_S2E17.png` (176 × 228, la pose du template en miroir) | `Big_McIntosh_sympathetic_smile_S4E14.png` |
| Apple Bloom | `Apple_Bloom_id_S01E12.png` | `Apple_Bloom_ID_S6E4.png` |
| Sweetie Belle | `Sweetie_Belle_ID_S1E18.png` | `Sweetie_Belle_ID_S6E4.png` |
| Scootaloo | `Scootaloo_ID_S4E17.png` (gros plan) | `Scootaloo_ID_S6E4.png`, `Scootaloo_grin_S4E15.png` |
| Granny Smith | `Granny_Smith_ID_S2E06.png` | `Applejack_and_Granny_Smith_smile_S03E08.png` |
| Diamond Tiara | `Diamond_Tiara_ID_S2E06.png` | `Diamond_Tiara_ID_S5E18.png`, `Diamond_Tiara_smug_smile_S2E23.png` |

### LE GABARIT DE POULICHE — la trouvaille de la vague

Une pouliche n'est pas un adulte réduit, et surtout **ce n'est pas un adulte à
qui on a coupé les pattes.** Relevé sur les trois références, en fraction de la
hauteur de tête :

| mesure | adulte | pouliche |
| --- | --- | --- |
| tête / hauteur totale | 33 % | **39 %** |
| profondeur / longueur du tronc | 0,51 | **0,61** |
| gorge (mâchoire → poitrail) | 65 unités | **30** |
| patte visible | 1,08 h. de tête | **0,62** |
| largeur d'œil | 0,53 | 0,63 |
| oreille | 0,60 | **0,38** |

Et surtout, la correction qui a demandé trois tours : **la tête elle-même
change**. Le chanfrein adulte descend à x 282 et le menton à y 116 ; sous un
grand œil de pouliche, il reste 25 unités de museau vide et **le profil se lit
comme un lama**. La tête de pouliche (`CORPS_POULICHE` dans `_commun.js`) a donc
le museau court (bout à x 275), le crâne bombé (sommet y 39) et le menton remonté
(y 94) — d'où `naseauPouliche` et `jouePouliche`, et une fenêtre de bouche
ramenée à x 256 → 272 / y 84 → 96.

**Conséquence en cascade, contre-intuitive :** sur cette tête raccourcie, l'œil
n'a plus besoin que de **6 %** d'agrandissement pour atteindre les 0,63 de la
référence. Le premier jet l'avait mis à **1,15 sur la tête adulte** : deux gros
yeux plantés au milieu d'un long museau. *L'œil ne paraissait petit que parce que
la tête était trop grande.*

**L'œil LOINTAIN ne suit pas l'agrandissement.** Large, il vient se poser en
travers du chanfrein court : on lit deux yeux au milieu du profil. Il reste
étroit (.30) **et écrasé (.66)**, et sa place est calée pour que son bord avant
affleure le contour de joue, **qui le recoupe** en couche 10 — c'est ce
recoupement, et lui seul, qui le fait lire « de l'autre côté de la tête ».

**Le cadrage.** Une pouliche à tête canonique et pattes courtes ne remplit que
les deux tiers hauts du viewBox : 82 unités de vide en bas, le dessin flotte dans
sa fiche. Tout le personnage est donc posé dans un groupe
`translate(-33 -8.5) scale(1.15)` (`CADRE_MINI`). Les deux nombres sont bornés
par la fenêtre de portrait : le bas de la tête doit rester au-dessus de y 130,
la tête doit tenir dans x 171 → 295. Bonus : la tête remplit **mieux** la
vignette de galerie (86 unités de haut au lieu de 75). Le groupe englobe
`class="paupieres"` sans rien casser — le CSS animait déjà le `transform` **du
groupe**, un transform parent se compose simplement (vérifié au navigateur, les
paupières restent calées sur les amandes).
Corollaire à retenir pour la suite : **toute cote destinée à la fenêtre de
portrait doit être écrite dans le repère final** (`y_final = 1,15·y − 8,5`) —
une pointe de nœud à y 12 sort de la fenêtre, à y 16 elle y entre.

### Personnages : ce que la référence a corrigé

- **Big Macintosh — son œil n'est pas petit, il est MI-CLOS.** Premier jet : œil
  réduit à .85 avec la paupière du regard doux. La référence donne une largeur
  d'œil normale (0,54 h. de tête) pour une hauteur VISIBLE de 0,31 : c'est la
  paupière lourde (`.60`) sur un œil de taille pleine. Et ce qui fait le colosse
  n'est ni la taille générale (invisible sur un personnage seul dans son cadre)
  ni un corps gonflé, c'est **un tronc profond (1,35 h. de tête contre 0,80) sous
  des pattes courtes (0,75 contre 1,08)** — pattes canoniques à l'échelle 1,14
  posées 20 unités plus haut dans le tronc, sabots à y 258.
  Il A des taches de rousseur (contre-intuitif, vérifié deux fois). Son collier
  de trait n'est pas une lanière mais **une pièce large** qui couvre l'épaule.
- **Apple Bloom n'a PAS de taches de rousseur.** Le premier jet lui en donnait
  « parce qu'elle est de la famille Apple » : ses joues sont unies sur les deux
  références. Et son nœud est **énorme**, posé à l'arrière du crâne — mais la
  fenêtre de portrait borne ses deux pointes (y ≥ 16, x ≥ 178).
- **Sweetie Belle : la corne d'une pouliche licorne doit être plantée EN AVANT.**
  Centrée sur le crâne, elle disparaît derrière le lobe avant de la frange — et
  robe quasi blanche sur crinière rose pâle, rien ne la rattrape. Deux tours
  perdus dessus.
- **Scootaloo : les épis se couchent en ARRIÈRE.** Dressés depuis la ligne de
  cheveux, ils font une crête de coq posée sur le crâne. Ses ailes sont
  minuscules et hautes sur le flanc.
- **Granny Smith ne porte PAS de lunettes** (le brief demandait de vérifier ;
  elle porte un châle à pommes, non repris). Ce qui fait l'âge, dans l'ordre :
  paupières lourdes (.56), **trois rides fines** (sous l'œil, sur la joue, fanon
  de mâchoire — épaisses, elles font des balafres), **dos ensellé** (croupe
  y 127 / creux y 141 / garrot y 136 : c'est le S qui fait la voûture, pas un
  simple abaissement), ventre pendant, pattes raccourcies de 6 %.
- **Diamond Tiara est la seule de la vague à pouvoir porter un sourcil** : son
  toupet balayé en arrière dégage le front au-dessus de l'œil proche. On a gardé
  de la référence le sourcil arqué et le regard mi-clos, **écarté** le sourcil
  baissé vers l'avant et la bouche pincée, qui la rendent méprisante.

### Deux pièges de couleur nouveaux

- **`PUPILLE` ne fait pas toujours un bon crayon à cils.** Il dérive de
  `c.yeux` : sur Diamond Tiara (yeux bleu très clair) il donne un bleu vif, sur
  Granny Smith (yeux orange) un orange franc — des traits de crayon de couleur
  au-dessus de l'œil. Les deux ont un `CRAYON` local, sombre, dérivé de la
  crinière ou de l'œil (`ton(M0, 1.1, -.34)`, `ton(yeux, .85, -.46)`). Astuce
  utile : `paupiereHaute(c, { TRAIT: CRAYON }, …)` — la fonction ne lit que
  `TRAIT`, on lui passe donc un faux `d` pour teinter la ligne de paupière.
- **`CRIN_T` est inutilisable sur une crinière BLANCHE.** `#efefef` n'a aucune
  saturation : `ton()` n'en tire qu'un gris neutre, invisible sur la robe vert
  pâle de Granny Smith. La référence borde ses cheveux d'un bleu-gris franc,
  d'où une constante documentée `#a8bfca`.

### Bouches : le blanc des dents, encore

Même leçon que sur le rire de Pinkie, redécouverte deux fois : un aplat
`#c7096e` de 14 unités **se lit comme une tache de rouge à lèvres**, et un
intérieur presque tout blanc **se lit comme une perle**. La proportion qui marche
pour une petite bouche ouverte de pouliche : le rose domine, le blanc n'est
qu'une **bande le long du bord haut** (40 % de la hauteur), plus un soupçon de
langue en bas.

### Additions à `_commun.js` (toutes additives, les 7 existants intacts)

`CORPS_POULICHE`, `pattePouliche` + les quatre pattes de pouliche,
`membresFondPouliche`, `membresProchesPouliche`, `naseauPouliche`,
`jouePouliche`, `OREILLE_P`, `CADRE_MINI`, `OEIL_PROCHE_P` / `OEIL_LOIN_P` /
`OEIL_P`, et `cilsHauts` (cils au coin haut-arrière, écrits dans le repère LOCAL
de l'amande pour suivre n'importe quel placement d'œil).
`paupiereHaute`, `paupiereBasse` et `paupieres` prennent deux paramètres
optionnels de plus (`P`, `L`) : le placement de l'œil, pour que la paupière fixe
et le clignement suivent une amande déplacée. Valeurs par défaut = le canon.

### Réserves de la vague

1. **Les cils des 7 personnages de la vague 1 restent au coin BAS.** La vague 2
   les met au coin haut-arrière, sur relevé de référence. Les deux conventions
   cohabitent donc dans la galerie ; c'est visible si on les compare de près.
   Reprendre la vague 1 est un chantier à part (il faut refaire les franges qui
   couvrent le front).
2. **La pose reste celle du template** (trois quarts côté, tête relevée). Les
   références d'infobox sont souvent de trois quarts *avant* : la comparaison
   s'est donc faite sur des rapports, pas en superposition pixel à pixel. Un
   profil paraît toujours moins « mignon » qu'un trois quarts avant, et c'est une
   limite de la pose, pas du dessin.
3. **La tête de Big Macintosh et celle de Granny Smith restent canoniques.** Sur
   la référence, Big Mac a un museau plus court et plus haut, Granny un museau
   long et tombant à fanons : les deux demanderaient leur propre silhouette,
   comme les pouliches. Leur œil a été descendu de 4 unités, ce qui corrige le
   défaut principal.
4. Le châle à pommes de Granny Smith et la trottinette de Scootaloo ne sont pas
   dessinés (hors périmètre).

## 2026-08-24 — refonte des visages de la vague 1 (les 6 dessinés de mémoire)

Constat du propriétaire : « à part Twilight Sparkle, c'est un peu moche ». Il
avait raison, et le diagnostic est net : Twilight a été relevée sur une vraie
image, la vague 2 aussi, mais les **six de la vague 1** (Applejack, Rainbow Dash,
Pinkie Pie, Fluttershy, Rarity, Spike) ont été dessinés **de connaissance**. Ils
sont donc repassés, un par un, sous le régime de la règle « aucun visage ne se
dessine de mémoire » : une image officielle **plein pied** téléchargée, regardée,
relevée à la grille, puis deux à quatre tours de comparateur.

### Références utilisées (toutes via l'API MediaWiki, toutes dans `refs/`)

| Personnage | Plein pied | Complément d'expression |
| --- | --- | --- |
| Applejack | [`File:Applejack id S3E1.png`](https://mlp.fandom.com/wiki/File:Applejack_id_S3E1.png) (360 × 430) | `File:Applejack ID S3E12.png`, `refs/applejack-sourire.png` |
| Rainbow Dash | [`File:Rainbow Dash ID S3E7.png`](https://mlp.fandom.com/wiki/File:Rainbow_Dash_ID_S3E7.png) (378 × 403) | `refs/rainbow-dash-smirk.png` |
| Pinkie Pie | [`File:Pinkie Pie ID S4E11.png`](https://mlp.fandom.com/wiki/File:Pinkie_Pie_ID_S4E11.png) (449 × 458) | `refs/pinkie-pie-grin.png` |
| Fluttershy | [`File:Fluttershy ID S1E17.png`](https://mlp.fandom.com/wiki/File:Fluttershy_ID_S1E17.png) (550 × 466, **tête à gauche**) | `File:Fluttershy ID S4E6.png` |
| Rarity | [`File:Rarity id S1E08.png`](https://mlp.fandom.com/wiki/File:Rarity_id_S1E08.png) (840 × 720, la plus détaillée) | `refs/rarity-sweet.png`, `refs/rarity-canterlot.png` |
| Spike | [`File:Spike ID S4E24.png`](https://mlp.fandom.com/wiki/File:Spike_ID_S4E24.png) (341 × 487) | `File:Spike ID S8E11.png` |

**Comment les trouver** (le `list=search` de la § protocole ne les sort pas) :
`list=allimages&aiprefix=<Nom>+id` et `aiprefix=<Nom>+ID`, qui listent les
fichiers par préfixe exact. Écarter les suffixes `EG`, `EGDS`, `CYOE` : ce sont
les versions Equestria Girls (humaines), pas les poneys.

### LES DEUX BOUCHES PERÇAIENT LE MUSEAU — la trouvaille de la passe

Elle vaut pour tout le livre. `CORPS` porte une **encoche de bouche** profonde de
10 unités : la silhouette avance jusqu'à x 281 au bout du nez (y 89), **rentre à
x 271** (y 98), puis ressort à x 279 au menton (y 106). Frontière avant
échantillonnée sur le tracé :

| y | 95 | 96 | 97 | 98 | 99 | 100 | 101 | 102 | 103 | 104 | 105 | 106 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| x max | 274,8 | 273,4 | 272,4 | 271,5 | **271,3** | 271,7 | 272,3 | 273,3 | 274,7 | 276,3 | 278,4 | 279,0 |

Deux conséquences, et les deux étaient violées :

1. **`sourireCoin` sortait de cinq unités.** Son tracé passait par
   (276,5 ; 101,2) puis remontait le crochet jusqu'à (277,6 ; 95,2), c'est-à-dire
   dans le vide, en laissant un triangle de fond visible entre lui et le museau.
   Au comparateur, Rainbow Dash n'avait pas une bouche, elle avait **un bec**.
   Le correctif n'est pas de raccourcir le crochet : **un crochet de sourire ne
   peut pas monter à l'avant**, l'encoche étant rentrante. Il monte donc **en
   reculant** (x constant à 269, y qui décroît) — même lecture, coin de lèvre
   relevé, sans percer le chanfrein. `sourirePose` était dehors de deux unités,
   même correction.
2. **L'encoche laissée VIDE se lit comme un bec.** Elle n'est juste que pour
   Twilight, dont la bouche ouverte la remplit et la fait lire comme deux lèvres
   écartées. Sur les quatre poneys à bouche fermée ou reculée elle terminait le
   museau par une marche en escalier — et **aucune des six références ne montre
   ça**, le chanfrein y est continu. D'où **`museauLisse`** (couche 6 ter) : une
   pièce de robe qui **rabote l'encoche de 10 unités à 3**, sans rallonger le
   museau (bout du nez toujours à x 281, menton à 279,6).
   Piège du correctif, qui a coûté un tour : **le bord intérieur de la pièce doit
   passer 2 unités À GAUCHE de l'encoche sur toute sa hauteur**, pour couvrir la
   moitié interne du `stroke-width: 3.4` de la silhouette. Au premier essai il
   passait à x 274 à y 93,5 alors que l'encoche y est à x 276 : le vieux trait
   ressortait **en diagonale au travers de la joue**.

### Les cils : la convention de la vague 2 s'applique aux sept

C'était la réserve n° 1 de la vague 2, elle est close. Les six ont maintenant
`cilsCoinHaut` (coin **haut-arrière**, en éventail). Ce qui a fallu faire en
plus, et que la réserve annonçait : **remonter les franges**. Cotes de la zone à
dégager, pour un œil canonique — les trois cils occupent **x 215 → 228,
y 57,7 → 66,4**, donc le bord bas de la crinière doit rester au-dessus de y 56
entre x 213 et x 230.

Et un relevé de couleur qui change tout : **les cils de la série sont NOIRS**,
quelle que soit la couleur de l'œil. `PUPILLE` donnait un bleu vif chez Pinkie,
un magenta chez Rainbow Dash, un turquoise chez Fluttershy — des traits de
crayon de couleur sur la joue. D'où le dérivé **`CRAYON` = `ton(yeux, .7, -.46)`**
dans `derives()`, presque noir pour les 26 palettes du livre et portable.

### L'ŒIL À CERNE NOIR

Corollaire du même relevé, et c'est le gain le plus visible de la passe. Dans
`oeil()`, **`PUPILLE` sert à la fois de liseré d'amande et de pupille**. Sur un
iris de la même famille de teinte, les trois se confondent :

- Rainbow Dash : liseré magenta foncé + iris magenta + pupille magenta = **une
  seule tache magenta cernée d'un gros trait**, l'effet trait d'eye-liner ;
- Pinkie : trois bleus, l'œil se lit comme **une spirale** ;
- Fluttershy : trois verts-canard.

Sur les références, liseré et pupille sont **noirs** et l'iris seul est coloré.
Le correctif ne touche pas `oeil()` : on lui passe un `d` modifié,
`oeil(c, { ...d, PUPILLE: d.CRAYON })` — la fonction ne lit `PUPILLE` que pour
ces deux usages. Twilight, dont `PUPILLE` vaut déjà `hsl(274 77% 3%)`, était
déjà juste : c'est **pour ça** qu'elle marchait et pas les autres.

### La frange ne peut pas filer jusqu'au museau : l'œil LOINTAIN est là

Relevé en essayant de donner à Applejack la mèche qui retombe sur le chanfrein
qu'on voit sur sa référence. **L'œil lointain occupe x 258 → 274 / y 52 → 79**,
c'est-à-dire précisément le front avant. Poussée jusqu'à x 272, la frange
l'avalait aux trois quarts et n'en laissait qu'un triangle vert qui se lisait
comme une écaille. C'est aussi la raison — jamais écrite — pour laquelle la
frange du template s'arrête à x 251 : **dans cette pose, le front avant
appartient à l'œil de l'autre côté de la tête.**

### Deux revirements assumés sur la passe expressions

La passe expressions avait conclu, cotes en main, que **seule Rainbow Dash**
pouvait porter un sourcil. Le raisonnement était juste, mais il portait sur des
crinières fausses :

- **Fluttershy** : sa ligne de cheveux descendait en diagonale de (254,44) à
  (214,84) et couvrait tout l'arrière de l'œil. Sur la référence elle court
  **haut sur le crâne** et laisse **11 unités de front nu** au-dessus de l'œil —
  et l'arc doux qui s'y dessine est le trait le plus caractéristique de son
  visage. Crinière remontée de 20 unités ; bénéfice collatéral, elle cesse de se
  lire comme un bonnet de bain.
- **Rarity** : sa frange était coiffée **en avant**, bord bas à (216,82), donc
  par-dessus l'arrière de l'œil. Les deux références montrent l'inverse, une
  masse **balayée en arrière** qui dégage le front. Frange refaite ; il reste
  7 unités entre son bord bas et le sommet de l'amande, où le sourcil tient à
  condition d'être **mince (1,9)**. Et il faut alors **raccourcir les cils**
  (l = 1,6 et non 2) : plus longs, le cil arrière traverse le sourcil et les deux
  se brouillent.

Le sourcil de Rainbow Dash, lui, était **peint en `PUPILLE`, soit magenta vif**,
et nettement arqué. C'est un sourcil de colère, et c'était le défaut n° 1 du
personnage : elle avait l'air méchante, pas crâneuse. Quatre cotes relevées sur
le smirk, et les quatre comptent : **court** (une demi-largeur d'œil), **fin**
(2,2), **plat** (deux unités de dénivelé, pas cinq) et **noir**.

### Autres relevés par personnage

- **Applejack.** Son chapeau était un melon posé à plat : bord horizontal
  descendant jusqu'à y 59, tout le front couvert, pas une mèche devant. Sur la
  référence il est posé **en arrière et basculé**, son bord remonte vers l'avant,
  la calotte est haute, et c'est la frange qui occupe le front sous le bord. Sa
  frange était aussi **à l'envers** : elle couvrait le front ARRIÈRE et laissait
  le front avant nu, exactement l'inverse du relevé. Sa bouche n'est **jamais
  fermée** sur les références : sourire ouvert à **bande de dents**
  (`sourireDents`), le rose ne restant qu'en liseré — un aplat rose de 5 unités
  se lit comme du rouge à lèvres, troisième fois qu'on redécouvre cette leçon.
  Ses taches sont **plus claires que la robe** (#fff8d3 à la pipette sur une robe
  #f5b765, contre-intuitif et revérifié) et en **petit triangle serré** de
  7 unités de côté, diamètre 3,4 : le grand triangle bas du premier jet se lisait
  comme trois miettes tombées sur la joue.
  Enfin, **borne de cadrage** : la calotte calée à y 8 n'avait que 2 unités de
  marge sur 124 et, dans le mini-portrait de la carte d'accueil (76 px), elle
  affleurait le bord du cadre et se lisait comme coupée. Descendue de 3.
- **Rainbow Dash.** Les six pointes de la crête **dépassaient de la masse** : le
  contour retracé par-dessus ne découpe rien (piège déjà documenté), donc chaque
  tête de mèche sortait en épine du bord haut-arrière et la crête se lisait comme
  une crête de coq punk — c'est ce qui la rendait agressive. Pointes rentrées de
  10 à 14 unités. Et le **liseré violet foncé autour de chaque bande** a sauté :
  dans la référence il n'y a **pas de contour entre deux couleurs de crinière**,
  seule la masse en porte un.
- **Pinkie Pie.** Ses boucles étaient **trop nombreuses et trop petites** (14
  disques de rayon 10 à 13 sur la seule tête) : à la taille de la vignette elles
  se fondaient en un relief régulier de petits lobes, un **chou-fleur**. Le
  relevé donne des boucles de 0,21 à 0,23 hauteur de tête (rayon 15 à 17) et
  **quatre par rang, pas six**. Deux tours ont été nécessaires : à cinq boucles
  de rayon 13-15 la couronne se lisait encore comme **une guirlande de perles**
  autour du crâne. Ce qui fait la crinière de Pinkie, ce sont peu de GROS lobes.
  Son grand rire, lui, a pu **avancer de 3 unités** — c'est `museauLisse` qui
  lui a rendu la place ; posé aussi en arrière, il se lisait comme un pansement
  sur la joue.
- **Fluttershy.** Ses trois papillons de marque de beauté doivent être écartés
  d'au moins **1,9 largeur de papillon**, sinon leurs quatre lobes se touchent :
  dans le médaillon 60 × 60 les trois fusionnaient en **un nœud de vermicelles**.
  Et son petit sourire finissait **pile sur le contour du menton**, où il se
  confondait avec la silhouette en dessinant un Y : rentré et raccourci.
- **Rarity.** `TRAIT` dérive d'une robe quasi blanche (#f2f0f7) : il en sort un
  gris-lavande très clair avec lequel **la corne disparaissait purement et
  simplement** du front — on ne voyait plus que ses quatre stries flotter.
  Constante locale `CORNE_T = ton(robe, 1.05, -.34)`. Et la frange doit
  s'arrêter à **x 240** : poussée à 255 elle avalait les deux tiers de la corne
  et se lisait comme un béret de travers — sur les références la corne se dresse
  **devant** la crinière, dégagée sur toute sa longueur.
- **Spike.** Trois écarts flagrants, tous corrigés.
  1. **La crête.** Quatre petites pointes de 6 unités le long du crâne : une
     scie, pas un dragon. Ce sont **trois grandes palmes en flamme**, larges de
     0,25 à 0,37 longueur de crâne, qui montent à **0,57 hauteur de crâne**
     au-dessus du sommet de la tête, la plus haute à l'avant, **penchées en
     arrière**. Dressées droit et pointues (deuxième tour), elles se lisaient
     comme une **couronne en papier**. Elles ne tiennent dans la fenêtre de
     portrait qu'au prix du **`CADRE_SPIKE`** : `translate(31 25.4) scale(.87)`,
     dont les deux nombres sont bornés par la fenêtre (pointe de crête à y 8,
     menton à y 122, tête recentrée sur x 189 → 286 — le `scale` seul la ramenait
     à x 158, hors cadre). Comme pour les pouliches, le groupe englobe
     `class="paupieres"` sans casser le clignement.
  2. **Le cou de girafe.** 12 unités de large (gorge x 208 / nuque x 196 à y 120)
     sous un crâne de 111, et 47 unités de long. Le cou d'un bébé dragon fait
     **0,7 de la largeur de base du crâne** et il est court. Porté à 24 de large
     et 23 de long. Cause co-responsable, moins évidente : **le plastron
     démarrait à y 126** alors que le menton est à y 107, ce qui laissait
     19 unités de robe nue sous la gorge et rallongeait le cou d'autant.
  3. **Deux verts distincts.** L'aileron d'oreille n'est **pas** du vert de la
     crête : il est du **vert pâle du ventre**, délavé comme la face interne
     d'une aile — seul relevé de couleur qui contredisait l'intuition sur Spike.
     Il est aussi **deux fois plus grand** que le premier jet (0,42 longueur de
     crâne au lieu de 0,22) et nervuré. Plus : cinq **écailles** en travers du
     plastron (sans elles il se lit comme une bavette), et un **naseau en
     virgule** enroulée là où le point du premier jet se lisait comme un grain de
     beauté.

### Additions à `_commun.js` (toutes additives)

`CRAYON` (clé de plus dans `derives`), `cilsCoinHaut`, `sourireDents`,
`TACHES_JOUE`, `museauLisse`, et un paramètre optionnel `l` sur `cilsHauts` (et
donc sur `cilsCoinHaut`) pour allonger les cils. `sourireCoin`, `sourirePose`,
`sourireTimide` et `grandRire` ont été **corrigés** — ils ne sont utilisés que
par la vague 1, respectivement Rainbow Dash, Rarity, Fluttershy et Pinkie.
Contrôle de non-régression : les **sept** personnages non touchés (Twilight et
les six de la vague 2) rendus avec l'ancien `_commun.js` et le nouveau donnent
des SVG **rigoureusement identiques** (comparaison par hachage du dessin et du
médaillon).

### Réserves de la passe

1. **La pose reste celle du template** (trois quarts côté, tête relevée) alors
   que les six références sont de trois quarts *avant*. La comparaison s'est donc
   faite sur des **rapports** relevés à la grille, pas en superposition pixel à
   pixel. Un profil paraît toujours moins « mignon » qu'un trois quarts avant :
   c'est la limite de la pose, pas du dessin, et elle vaut pour les treize.
2. **Le corps de Spike reste faible** : bras en tube posé sur le plastron,
   jambe en fût à pied de botte, queue terminée en nageoire plutôt qu'en fer de
   lance. La tête, la crête, l'aileron, le plastron et le cou sont refaits, le
   reste mériterait sa propre passe.
3. **Les crinières monochromes gardent leur lecture concentrique.** Sur
   Fluttershy, reflet et séparations suivent le contour de la masse (c'est le
   seul moyen propre sans `clipPath`), ce qui donne des arcs parallèles au bord
   là où la référence a des mèches. Visible de près, pas en vignette.
4. **L'aile de Rainbow Dash reste déployée** alors que sa référence plein pied la
   montre repliée sur le flanc. Choix conservé : c'est le personnage le plus
   dynamique du livre, et `ailePliee` occupe la place de la marque de beauté.
5. **La frange de Rarity reste une masse à bord bas régulier**, là où la
   référence a un balayage à mèches. Reprendre sa crinière en volutes avant
   sortait du périmètre « visages ».
6. Les **13 placeholders gris** sont toujours mal cadrés par la fenêtre de
   portrait, comme depuis la tâche 6ter.

## Carte d'accueil

`svg/carte.js` (viewBox `0 0 1000 700`) est le **fond** de l'écran d'accueil ; par-dessus,
`js/render.js` pose 16 liens HTML positionnés en pourcentage : les 10 pastilles de lieux
(`LIEUX[].carte`) et les 6 mini-portraits des Mane 6 (`PERSONNAGES[].carte`, **décalés de
−8 en y**). Un point `carte: { x, y }` tombe donc sur le point SVG `(x · 10, y · 7)`, et
un poney dont le portrait doit atterrir sur la rangée `y` se déclare à `y + 8`.

### La géométrie des pastilles commande le dessin, pas l'inverse

C'est **la** trouvaille de la tâche. Les pastilles sont dimensionnées en **pixels CSS
fixes** (`.sur-carte` : texte à 1 rem, `min-height: 64px`) alors que la carte, elle,
s'échelonne avec la largeur du cadre. Mesuré au navigateur :

| Cadre | Pastille la plus large | En unités SVG | Hauteur en unités SVG |
| --- | --- | --- | --- |
| 1024 × 768 (cadre 977 × 684) | 239 px | 245 | 65 |
| 768 × 1024 (cadre 736 × 515) | 239 px | **325** | **87** |

En portrait, les dix étiquettes couvrent ~40 % du cadre : **aucun bâtiment posé sous sa
pastille n'y est visible**. La composition part donc du placement des liens, en rangées :

    rangée 1  y = 10 %   Cloudsdale (20) · Rainbow Dash (36) · Canterlot (84)
    rangée 2  y = 27 %   Sweet Apple Acres (13) · Carousel Boutique (48) · Sugarcube (74)
    rangée 3  y = 43 %   Applejack (10) · Twilight (30) · Rarity (52) · Pinkie (74)
    rangée 4  y = 59 %   bibliothèque (30) · école (62) · Fluttershy (88)
    rangée 5  y = 75 %   hutte de Zecora (18) · forêt (46) · chaumière (78)

L'écart de rangée (16 %, soit 82 px dans le cadre portrait) est choisi **juste au-dessus
du besoin** : demi-hauteur d'étiquette (6,2 %) + demi-hauteur de portrait (7,4 %) =
13,6 %. Conséquence : deux éléments de rangées différentes ne peuvent plus se chevaucher,
et il ne reste qu'un problème de rangement **horizontal** dans chaque rangée. C'est ce qui
règle les deux findings de la vague : l'école était sous le portrait de Fluttershy et la
bibliothèque mordait sur Twilight parce que leurs y ne différaient que de 5 à 8 points.

Corollaire pour les portraits : un poney posé **directement au-dessus ou au-dessous** de
sa pastille (même x, une rangée d'écart) reste « chez lui » sans jamais gêner le clic —
Twilight sur son chêne, Applejack dans le verger, Pinkie au coin de la pâtisserie.

### Une étiquette près du bord se rétrécit et passe à la ligne

`.sur-carte` est en `position: absolute` sans largeur : sa boîte est un *shrink-to-fit*
borné par la place restante jusqu'au bord droit du cadre. « La chaumière de Fluttershy »
mesure **242 px** au centre, **215 px** à `left: 78 %` en paysage et **162 px** (sur deux
lignes, donc 66 px de haut) dans le cadre portrait. Une table de largeurs figées est donc
fausse : le seul juge est `getBoundingClientRect()` dans le navigateur, aux deux tailles.

### Vérification des 16 clics

Deux étages, tous les deux en une seule `browser_evaluate` :
1. **blocage** — `document.elementFromPoint` sur 5 points par lien (centre + 4 points
   internes) : 80 points doivent tous renvoyer le lien attendu. C'est ce test, et pas la
   comparaison des boîtes, qui prouve qu'un mini-portrait (carré de 76 px **entièrement
   cliquable**, même là où le SVG est transparent) ne vole pas le clic du voisin.
2. **routage** — un `MouseEvent('click', { bubbles: true })` dispatché sur l'élément
   réellement au-dessus du point, puis lecture de `location.hash` et du `<h1>` rendu.
   16/16 aux deux tailles. (`elementFromPoint` renvoie souvent un nœud **SVG**, qui n'a
   pas de méthode `.click()` en Firefox : passer par `dispatchEvent`.)

### Pièges de dessin propres à la carte

- **L'ordre des couches doit tenir compte de la bande de forêt.** Dessiné avant elle, le
  chêne Golden Oak (base à y 556) était avalé par les sapins. Il passe **après** `foret()`
  et se plante dans une clairière (`ellipse` d'herbe) : il se lit alors comme l'arbre en
  lisière du village. Même logique pour la hutte de Zecora et la chaumière, posées sur des
  clairières découpées dans la bande sombre.
- **Les six bandes de l'arc-en-ciel sont des `Q` parallèles décalés de 10 en y**, tracés
  *avant* le nuage de premier plan qui doit masquer leurs départs. Sans ce nuage posé par
  dessus, la bande violette dépasse en moignon sous la cité.
- **Un bâtiment n'est identifiable que par un détail qui survit à la pastille.** La cloche
  rouge de l'école est donc doublée : clocheton sur le toit (masqué en portrait) **et**
  cloche dans une arche sur la façade, à y 472, hors de toute pastille.
- La bande de forêt fait un tiers de la carte et reste **fraîche, pas effrayante** :
  aplats bleu-vert (`#2f5f56` / `#38736a`), trois rangs de sapins pour la profondeur, et
  douze lucioles (halo `#ffef9f` à 22 % + cœur blanc). Aucun œil, aucune branche griffue.
- Le validateur d'arité de la vague 1 se rejoue tel quel sur la carte (226 tracés), avec
  **une correction du motif de capture** : `d="…"` attrape aussi la fin de `id="…"` (le
  gradient `c-ciel` était compté comme un tracé invalide). Exiger un blanc ou un guillemet
  devant : `/[\s"]d="([^"]+)"/g`.

## 2026-08-24 — la carte d'accueil dessinée

- **`svg/carte.js` remplace son placeholder** : ciel dégradé et soleil, Cloudsdale et son
  arc-en-ciel en haut à gauche, massif et château d'or de Canterlot en haut à droite,
  trois plans de collines, rivière et petit pont, Sweet Apple Acres (grange rouge, onze
  pommiers) à gauche, le village (manège de Rarity, pâtisserie à cupcake, mairie ronde à
  horloge, école à cloche, quatre maisons), le chêne Golden Oak, la forêt Désenchantée et
  ses lucioles, la hutte de Zecora et la chaumière de Fluttershy. Mêmes aplats et mêmes
  contours que les personnages, palette gaie et douce.
- **Les 16 `carte: { x, y }` de `js/data.js` ont été recalés** (mandat du lead) sur la
  grille de rangées ci-dessus. Avant → après : bibliothèque (48,55) → (30,59) ; école
  (65,60) → (62,59) ; Twilight (48,55) → (30,51) ; Fluttershy (68,72) → (88,67) ;
  chaumière (68,72) → (78,75) ; Sweet Apple Acres (18,58) → (13,27) ; Applejack (18,58) →
  (10,51) ; Carousel Boutique (40,48) → (48,27) ; Rarity (40,48) → (52,51) ; Sugarcube
  (58,50) → (74,27) ; Pinkie (58,50) → (74,51) ; Cloudsdale (20,12) → (20,10) ;
  Rainbow Dash (20,12) → (36,18) ; Canterlot (80,18) → (84,10) ; forêt (55,88) → (46,75) ;
  hutte de Zecora (42,90) → (18,75). Les deux findings en attente (école recouverte par
  Fluttershy, bibliothèque mordant sur Twilight) sont clos.

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
