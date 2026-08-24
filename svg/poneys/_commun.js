// ───────────────────────────────────────────────────────────────────────────────
// Anatomie commune des poneys — extraite du TEMPLATE CANON `twilight.js`
// (lui-même relevé sur la référence vectorielle du 24/08/2026).
//
// Tous les poneys de la série partagent la MÊME carcasse : corps, cou, tête,
// museau, oreille, quatre pattes, machinerie de l'œil. Ce qui les distingue est
// la crinière, la queue, la marque de beauté et l'attribut d'espèce. Ce module
// porte donc la partie commune ; chaque fichier de personnage n'écrit que sa
// part singulière.
//
// `twilight.js` reste volontairement autonome : c'est la pièce de référence,
// relisible d'un bloc face au PNG. Les coordonnées ci-dessous en sont la copie
// exacte, dans le même repère (viewBox 300 × 300, x_svg = 0,31·x_ref + 8).
//
// Lire NOTES.md § « Guide de style poneys » avant d'en dériver un personnage.
// ───────────────────────────────────────────────────────────────────────────────

// ── Dérivés de couleur ────────────────────────────────────────────────────────
// `fS` multiplie la saturation, `dL` décale la luminosité (fraction de 0→1).
// Passer par HSL — et jamais par des hex écrits à la main — est ce qui rend les
// ombres portables d'une robe orange à une robe blanche.
export const ton = (hex, fS, dL) => {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) / 255, g = ((n >> 8) & 255) / 255, b = (n & 255) / 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  const l = (mx + mn) / 2;
  const s = d ? d / (1 - Math.abs(2 * l - 1)) : 0;
  let h = 0;
  if (d) h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  const pince = (v) => Math.max(0, Math.min(1, v));
  return `hsl(${Math.round(h * 60)} ${Math.round(pince(s * fS) * 100)}% ${Math.round(pince(l + dL) * 100)}%)`;
};

// Palette dérivée complète. TOUT accès `criniere[i]` avec i > 0 est gardé :
// une robe monochrome (Applejack, Pinkie, Fluttershy, Rarity) n'a qu'une mèche,
// et un `fill="undefined"` donne un aplat noir.
export const derives = (c) => {
  const M = (i) => c.criniere[i] ?? c.criniere[0];
  return {
    M0: M(0), M1: M(1), M2: M(2), M3: M(3), M4: M(4), M5: M(5),
    TRAIT: ton(c.robe, .64, -.21),      // contour de la robe
    FOND: ton(c.robe, .65, -.10),       // membres du fond
    FOND_T: ton(c.robe, .55, -.25),     // contour des membres du fond
    CRIN_T: ton(M(0), 1.3, -.165),      // contour de la crinière
    CRIN_S: ton(M(0), 1, -.045),        // séparation de mèches
    // Reflet de mèche. Indispensable aux crinières MONOCHROMES (Applejack,
    // Pinkie, Fluttershy, Rarity) : `criniere[1]` y valant `criniere[0]`, les
    // bandes de couleur du template disparaissent. Ce reflet les remplace.
    CRIN_H: ton(M(0), .95, .075),
    // Séparation RENFORCÉE. `CRIN_S` (-4,5 %) suffit sur une crinière sombre où
    // les bandes de couleur portent déjà la structure ; sur une crinière claire
    // et monochrome elle est invisible.
    CRIN_S2: ton(M(0), 1.05, -.12),
    PUPILLE: ton(c.yeux, 1.2, -.28),    // pupille
    IRIS_BAS: ton(c.yeux, .35, .42),    // bas d'iris éclairci
    BLANC: "#fff8ff",                   // blanc de l'œil
    BOUCHE: "#c7096e",                  // intérieur de la bouche
    LANGUE: "#fc5e1f",                  // langue
  };
};

// ── Formes réutilisables ──────────────────────────────────────────────────────
// Œil MLP : amande inclinée dessinée dans un repère local centré (39 × 33 unités).
// Le même tracé sert de blanc de l'œil ET de paupière.
export const AMANDE = "M-19.5 -3.9C-16 -11.5-9.5 -16.8-1.5 -16.5 8.5 -16 17.5 -3 19.9 9.5"
  + "C18 14 14 16.5 8.5 16.4 -1 16-13 10-19.5 -3.9Z";
// Les deux moitiés de l'amande, en tracés OUVERTS. Elles servent de plis de
// paupière : c'est en reprenant le bord même de l'œil qu'un pli reste parallèle
// à l'œil au lieu de le barrer d'un trait étranger.
export const AMANDE_BAS = "M19.9 9.5C18 14 14 16.5 8.5 16.4 -1 16-13 10-19.5 -3.9";
export const AMANDE_HAUT = "M-19.5 -3.9C-16 -11.5-9.5 -16.8-1.5 -16.5 8.5 -16 17.5 -3 19.9 9.5";
// Iris : disque aplati le long du bord haut-droit de l'amande, qu'il affleure.
// C'est ce contact qui produit le liseré sombre caractéristique du regard MLP.
export const IRIS = "M-12 -2C-11.2 -9-6 -14.6-1 -15 7 -14 15.2 -6 17.6 2"
  + "C18.1 7.2 14 10.4 8 11.6 0 12.6-8.2 8-12 -2Z";
// Étincelle à 4 branches, centrée sur (0,0).
export const ETINCELLE = "M0 -10 1.9 -2.6 5.2 0 1.9 2.6 0 10-1.9 2.6-5.2 0-1.9 -2.6Z";
export const etincelle = (x, y, e, f = "#fff") =>
  `<path transform="translate(${x} ${y}) scale(${e})" d="${ETINCELLE}" fill="${f}"/>`;

// ── OREILLE : longue feuille pointue, en arrière de la tête. Son bord externe
//    prolonge la joue ; c'est le contour de la tête, dessiné par-dessus, qui
//    creuse le pli interne. Pointe (188,56) → pointe basse (205,101).
export const OREILLE = "M188 56C183 59 181.5 63 181.5 68"
  + "C182 75 185 81 190 88 195 94 201 98 205 101"
  + "C203 91 201 79 200 69 199 62 194 58 188 56Z";

// ── SILHOUETTE DE LA ROBE : croupe → dos → encolure → crâne → chanfrein →
//    bouche → menton → mâchoire → gorge → poitrail → ventre → croupe.
//    Un seul tracé fermé : c'est lui qui garantit qu'aucune couture n'apparaît
//    entre tête, cou et corps. Le décrochement 277→271→279 (y 92→106) est
//    l'encoche de la bouche ouverte ; l'angle (256,115)→(244,117) est le coin
//    mâchoire/gorge, très marqué dans la référence.
export const CORPS = "M194 126C197 116 201 108 202 100 200 86 200 74 202 62"
  + "C206 52 218 45 238 42 256 45 265 53 269 62"
  + "C272 68 274 74 278 79 281 83 282 87 281 89"
  + "C279 92 273 95 271 98 271 102 275 104 279 106"
  + "C277 108 273 110 268 112 264 113 259 114.5 255 115"
  + "C250 115.5 246 115.5 243 116 242.5 120 242.5 124 242 128"
  + "C241 133 238 141 234 149 229 160 222 172 216 181"
  + "C207 186 197 187 187 187 179 187 174 186 170 184"
  + "C162 184 155 185 148 185 140 185 133 183 129 178"
  + "C126 170 125 160 126 151 127 141 131 133 137 128"
  + "C142 125 146 125 150 125 158 127 168 131 175 132"
  + "C183 133 189 130 194 126Z";

// ── MEMBRES. Chaque paire est dessinée deux fois : le membre du fond (robe
//    assombrie, contour complet) puis le membre proche.
export const PATTE_AR_FOND = "M156 152C152 168 149 186 147.6 205 147 222 147.5 238 149.5 252"
  + "C150.5 259 152.5 263 156 263.5 161 264 165 262.5 165.6 258"
  + "C166.5 244 164.5 226 163.2 208 162 188 161 168 161.5 152Z";
export const PATTE_AV_FOND = "M201 168C200 182 200.6 196 201.4 210"
  + "C202.4 224 204.6 238 207.6 250 208.6 256 210.6 261 214 261.5"
  + "C218 262 221 260 221 256 220 240 216 224 213 208"
  + "C211 192 210 178 210 166Z";
// Membre proche : le contour VISIBLE s'arrête au flanc (tracé ouvert). Un
// contour fermé dessinerait une couture en travers de la croupe / du poitrail.
export const PATTE_AR_BORD = "M162 163C155 171 151 180 149.3 188"
  + "C146 200 143 214 142 228 142 240 143 252 146 261"
  + "C147 265 145 266 142 266 132 267 124 266 121 264"
  + "C119 256 118 244 118.5 231 119 216 122 200 127 189"
  + "C129 185 130 183 131 182";
export const PATTE_AV_BORD = "M182 187C180 198 178 212 177.6 226 177.6 240 179 252 181 261"
  + "C182 265 184 266.5 188 266.5 197 267 204 266 206 263"
  + "C207 250 205 236 202 222 200 208 198 194 199 182";
// Fermeture des membres proches (remplissage seul, sans contour).
export const PATTE_AR_CLOS = `${PATTE_AR_BORD} C145 168 155 164 162 163Z`;
export const PATTE_AV_CLOS = `${PATTE_AV_BORD} C193 178 195 176 199 176Z`;

// ── BLOCS COMPOSITES ──────────────────────────────────────────────────────────

// Couche 2 : les deux membres du fond.
export const membresFond = ({ FOND, FOND_T }) =>
  `<g fill="${FOND}" stroke="${FOND_T}" stroke-width="3.2">
    <path d="${PATTE_AR_FOND}"/><path d="${PATTE_AV_FOND}"/>
  </g>`;

// Couche 6 : membres proches — remplissage fermé sans contour, puis le seul
// contour VISIBLE en tracé ouvert.
export const membresProches = (c, { TRAIT }) =>
  `<g fill="${c.robe}"><path d="${PATTE_AR_CLOS}"/><path d="${PATTE_AV_CLOS}"/></g>
  <g fill="none" stroke="${TRAIT}" stroke-width="3.2">
    <path d="${PATTE_AR_BORD}"/><path d="${PATTE_AV_BORD}"/>
  </g>`;

// ── Couche 7 : le MUSEAU ──────────────────────────────────────────────────────
// Géométrie de la zone à respecter, relevée sur `CORPS` : le chanfrein descend à
// (281,89), l'ENCOCHE DE BOUCHE rentre jusqu'à (271,98) puis ressort au menton
// (279,106), et la mâchoire repart vers (255,115) puis (243,116). Toute bouche
// dessinée ici doit donc rester DERRIÈRE la courbe (271,98) → (279,106) : un
// point à x 276 / y 100 sort du museau. Et rester au-dessus de y 111, sinon elle
// crève la mâchoire.
export const naseau = ({ TRAIT }) =>
  `<path d="M268.5 85.5C270.5 88 273.5 88.5 276 86.5" fill="none" stroke="${TRAIT}" stroke-width="2.2"/>`;

// Couche 7 : naseau + bouche. `ouverte` donne le sourire ouvert de la référence,
// sinon un simple sourire fermé (poneys calmes : Fluttershy, Rarity).
export const museau = (d, ouverte = true) => {
  const { TRAIT, BOUCHE, LANGUE } = d;
  return naseau(d)
  + (ouverte
    ? `<path d="M267.5 95C271 93.5 275.5 97.5 278.5 102.5 275 104.5 271.5 105 269.5 103.5
           267 100 266.5 97 267.5 95Z" fill="${BOUCHE}" stroke="${TRAIT}" stroke-width="2.2"/>
       <path d="M269 100C271.5 102 274 103.5 276 104.5 273 106 270 105 268.5 102.5Z" fill="${LANGUE}"/>`
    : `<path d="M265.5 95.5C270 94.5 275 97.5 278.5 102" fill="none" stroke="${TRAIT}" stroke-width="2.6"/>`);
};

// ── BOUCHES D'EXPRESSION ──────────────────────────────────────────────────────
// Le sourire ouvert unique du template est ce qui donnait à toute la vague le
// même visage. Quatre bouches signées le remplacent ; chacune vit dans
// l'encoche de bouche décrite ci-dessus.

// SOURIRE EN COIN, fermé : la lèvre plonge au milieu puis se RELÈVE d'un crochet
// à l'avant. C'est le crochet, et lui seul, qui fait la différence entre un
// sourire poli et un sourire malicieux. `crochet` en règle la hauteur
// (Applejack 1, Rainbow Dash 2 : plus haut = plus crâneur).
// Le crochet doit rester COURT. Deux essais perdus : monté à y 90 il sort du
// chanfrein (à y 93 la silhouette est déjà à x 279,3) et dessine un bec ; et même
// contenu, un crochet de huit unités se lit comme un hameçon et non comme un
// coin de lèvre. Amplitude finale : 1,6 unité par cran, soit au plus trois
// unités de relevé pour crochet = 2.
export const sourireCoin = ({ TRAIT }, crochet = 1) => {
  const ax = 277.2 + .2 * crochet, ay = 100 - .5 * crochet;
  const bx = 277.6 + .2 * crochet, by = 99.2 - 1.1 * crochet;
  const cx = 277.2 + .2 * crochet, cy = 98.4 - 1.6 * crochet;
  return `<path d="M262 99C266 104.5 272 105.5 276.5 101.2C${ax} ${ay} ${bx} ${by} ${cx} ${cy}"
        fill="none" stroke="${TRAIT}" stroke-width="2.6"/>`;
};

// GRAND RIRE bouche ouverte. Le rire de Pinkie n'est pas le sourire du template
// agrandi : il s'étale vers l'ARRIÈRE, sous la joue, parce que l'avant du museau
// est bloqué par l'encoche (rien au-delà de x 272 entre y 98 et 102). Relevé sur
// la référence : ce rire est DOMINÉ PAR LE BLANC des dents, l'intérieur rose ne
// se voyant plus qu'en liseré et au coin — c'est l'inverse de la bouche ouverte
// du template, qui est un aplat rose avec une langue. Une seule ligne de
// séparation entre les rangées de dents ; en dessiner chaque dent fait peur.
// Cotes serrées de tous côtés, toutes relevées : devant, l'encoche interdit
// x > 272 entre y 98 et 102 ; en haut, le bord bas de l'œil descend à y 94,4 à
// x 250 ; en bas, la mâchoire passe à y 113,2 à x 261. D'où un rire LARGE (23) et
// PEU HAUT (14) plutôt que rond : plus haut, il se lit comme posé sur le menton.
export const grandRire = ({ TRAIT, BOUCHE }) =>
  `<path d="M249 96C256.5 91.6 266 92.4 271.6 98
           C273 104 268.4 109.8 261 109.8
           C252.6 109.8 246.8 103.6 249 96Z"
        fill="${BOUCHE}" stroke="${TRAIT}" stroke-width="2.4"/>
   <path d="M251 96.6C257.6 92.8 265.6 93.6 269.8 98.6
           C271 103.6 267 108 261 108
           C254.4 108 249.6 102.4 251 96.6Z"
        fill="#fff"/>
   <path d="M250.6 101.4C256.4 104.4 265 104.8 270.4 101.4" fill="none"
        stroke="${TRAIT}" stroke-width="1.3" stroke-opacity=".5"/>`;

// PETIT SOURIRE TIMIDE : court, bas, presque horizontal. Il ne remonte pas —
// c'est ce qui le distingue du sourire posé de Rarity.
export const sourireTimide = ({ TRAIT }) =>
  `<path d="M264.5 98.6C268.5 100.2 272.5 102.6 275.8 105.2" fill="none"
        stroke="${TRAIT}" stroke-width="2.6"/>`;

// SOURIRE POSÉ : plus long, il remonte franchement vers l'avant et s'achève sur
// un petit repli de lèvre. Le maintien, pas la joie.
export const sourirePose = ({ TRAIT }) =>
  `<path d="M263 97.5C267.5 100.5 272 103 276.6 103.4" fill="none"
        stroke="${TRAIT}" stroke-width="2.4"/>
   <path d="M274.8 105.6C275.8 105.2 276.6 104.6 277 104" fill="none"
        stroke="${TRAIT}" stroke-width="1.8"/>`;

// Un œil = masse sombre, blanc inséré, iris, bas d'iris, pupille, 2 reflets.
//
// `o` module l'iris SANS toucher à l'amande — c'est la règle d'or de la passe
// expressions : l'amande est ce sur quoi le groupe `paupieres` est calé, donc
// tout ce qui change le regard doit se jouer À L'INTÉRIEUR d'elle.
//   · `iris`  — facteur d'échelle du groupe iris/pupille. < 1 décolle l'iris du
//               bord haut de l'amande et fait apparaître du blanc tout autour :
//               c'est TOUT le secret de l'œil écarquillé (Pinkie).
//   · `regard` — [dx, dy] : décale l'iris dans l'œil. Positif en y = regard
//               baissé (Fluttershy).
//   · `sus`   — balises ajoutées par-dessus l'œil, dans son repère local
//               (étincelles supplémentaires).
export const oeil = (c, { PUPILLE, BLANC, IRIS_BAS }, o = {}) => (t) => {
  const { iris = 1, regard = [0, 0], sus = "" } = o;
  const noyau = `<path d="${IRIS}" fill="${c.yeux}"/>
    <ellipse cx=".5" cy="8" rx="4.6" ry="2.9" fill="${IRIS_BAS}"/>
    <ellipse cx="2.8" cy="-3.3" rx="10.6" ry="11.4" fill="${PUPILLE}"/>
    <ellipse cx="-4" cy="-5.2" rx="3.8" ry="7.1" fill="#fff" transform="rotate(-12 -4 -5.2)"/>
    <circle cx="4.8" cy=".2" r="2" fill="#fff"/>`;
  const drape = iris === 1 && !regard[0] && !regard[1]
    ? noyau
    : `<g transform="translate(${regard[0]} ${regard[1]}) scale(${iris})">${noyau}</g>`;
  return `<g transform="${t}">
    <path d="${AMANDE}" fill="${PUPILLE}"/>
    <path d="${AMANDE}" transform="translate(-1.6 1.4) scale(.955)" fill="${BLANC}"/>
    ${drape}${sus}
  </g>`;
};

// Positions canoniques : œil proche (grand) et œil lointain (étroit, miroir
// écrasé — c'est la perspective 3/4 qui l'aplatit, pas une autre forme).
export const OEIL_PROCHE = "translate(235.5 77.9)";
export const OEIL_LOIN = "translate(266 65.8) scale(-.41 .81)";

// ── PLACEMENT DE L'ŒIL POUR LES POULICHES ─────────────────────────────────────
// Relevé sur les références plein pied (`refs/apple-bloom-plein-pied.png`,
// `sweetie-belle-plein-pied.png`), en fraction de la HAUTEUR DE TÊTE — la seule
// cote comparable d'une pose à l'autre, le sommet du crâne et le menton étant
// toujours identifiables alors que « l'arrière du crâne » est sous la crinière :
//
// | mesure                    | canon (Twilight) | Apple Bloom | Sweetie Belle |
// | largeur d'œil / h. tête   | 0,53             | 0,655       | 0,61          |
// | hauteur d'œil / h. tête   | 0,44             | 0,55        | 0,51          |
// | centre de l'œil, en y     | 0,48             | 0,62        | 0,68          |
//
// D'où, pour une pouliche, DEUX corrections : l'amande descend dans le crâne,
// et elle grossit — mais seulement de 6 %, et c'est le point clé. Premier jet à
// 1,15 sur la tête ADULTE : deux gros yeux plantés au milieu d'un long museau.
// L'œil ne paraissait petit que parce que la TÊTE était trop grande ; la tête de
// pouliche raccourcie (crâne y 39 → menton y 94, 55 unités au lieu de 75), 6 %
// suffisent à atteindre les 0,63 de largeur-sur-hauteur-de-tête de la référence.
export const OEIL_PROCHE_P = "translate(234 80)";
// L'œil LOINTAIN, lui, ne suit PAS l'agrandissement en largeur : large, il vient
// se poser en travers du chanfrein raccourci. Il reste étroit (.30), haut sur le
// museau, et sa cote est bornée par le crâne, pas par la symétrie avec le proche.
// Et il est ÉCRASÉ (.66 en hauteur) : à pleine hauteur, posé au milieu d'un
// museau court, il se lit comme un second œil greffé sur le nez au lieu de
// l'œil de l'autre côté de la tête. Sa place est calée pour que son bord avant
// affleure le contour de la joue, qui le RECOUPE ensuite (couche 10) — c'est ce
// recoupement, et lui seul, qui le fait lire « de l'autre côté ».
export const OEIL_LOIN_P = "translate(267 69) scale(-.30 .66)";
export const OEIL_P = 1.06;


// ── Couche 8 bis : PAUPIÈRES D'EXPRESSION (fixes, pas celles du clignement) ───
//
// PREMIÈRE TENTATIVE, ÉCARTÉE : l'amande entière, agrandie de 7 % et remontée
// d'un décalage, remplie en robe. Le croissant d'œil restant est juste, mais la moitié
// HAUTE de l'amande remontée sort du crâne — sur Rarity la paupière du fard
// débordait au-dessus du front, à côté de la corne, en gros hématome lilas
// (le crâne culmine à y 42 au milieu du front et redescend à y 53 à x 265,
// alors qu'une amande remontée de 20 monte jusqu'à y 36). Le débord ne se voyait
// pas sur Rainbow Dash ni Fluttershy parce que leur crinière le masquait — piège
// classique : ce qui marche « par chance » sous une frange casse au poney suivant.
//
// TENUE : la paupière est le MÉLANGE des deux bords de l'amande (voir `melange`
// plus bas), donc bornée par l'œil par construction. On la dessine dans le
// repère du BLANC de l'œil (`translate(-1.6 1.4) scale(.955)`), ce qui préserve
// le liseré sombre de l'amande sur tout le tour : c'est lui qui fait la ligne de
// cil supérieure.
//
// Le réglage est une FRACTION d'ouverture (0 = fermé, 1 = grand ouvert) :
//   1 = pas de paupière du tout (Applejack, Pinkie), .72 = regard doux tombant
//   (Fluttershy), .6 = mi-clos élégant (Rarity), .64 = plissé d’assurance
//   (Rainbow Dash, plus .15 mangé par le bas), .2 = presque fermé.
// La même valeur sert aux deux yeux : elle est relative à l'amande, donc le
// lointain, déjà écrasé en .81, reste proportionnel.
//
// À placer APRÈS les yeux et AVANT `paupieres` : le groupe du clignement, à
// scaleY(1), recouvre l'amande entière et donc aussi ces paupières fixes. Le
// calage du clignement reste garanti parce que l'amande, elle, n'a pas bougé —
// c'est la raison pour laquelle toute la passe expressions se joue à
// l'intérieur de l'amande et jamais sur elle.
const OEIL_BLANC = "translate(-1.6 1.4) scale(.955)";

// Les deux bords de l'amande, en LISTES DE POINTS, tous deux parcourus du coin
// arrière (-19,5 ; -3,9) au coin avant (19,9 ; 9,5) — deux courbes de Bézier
// cubiques chacun, donc 7 points.
const BORD_HAUT = [[-19.5, -3.9], [-16, -11.5], [-9.5, -16.8], [-1.5, -16.5], [8.5, -16], [17.5, -3], [19.9, 9.5]];
const BORD_BAS = [[-19.5, -3.9], [-13, 10], [-1, 16], [8.5, 16.4], [14, 16.5], [18, 14], [19.9, 9.5]];

// Une PAUPIÈRE est le mélange linéaire, point à point, des deux bords.
// `t` = 0 → le bord de départ lui-même (la paupière ne couvre rien),
// `t` = 1 → le bord opposé (elle couvre tout l'œil).
// Les deux bords PARTAGEANT LEURS EXTRÉMITÉS, tout mélange part et arrive aux
// deux COINS de l'œil : une paupière ainsi construite pivote sur les coins,
// exactement comme une vraie, et ne peut par construction jamais sortir de
// l'amande. C'est la troisième tentative, et la bonne.
//
// (Deuxième tentative écartée : décaler le bord bas de `dy` vers le haut. Le
// remplissage restait borné, mais le PLI, lui, s'échappait — le bord bas a ses
// extrémités à y −3,9 et +9,5, alors que le sommet de l'amande est à −16,8 :
// remonté de 21, son extrémité arrière passe à −24,9, soit huit unités
// AU-DESSUS du crâne de l'œil. Sur Rainbow Dash le pli dessinait un grand arc
// en travers du front. Une paupière n'est pas un bord translaté, c'est un bord
// qui pivote.)
const arrondi = (v) => +v.toFixed(2);   // sinon les tracés se remplissent de 1e-16
const melange = (A, B, t) =>
  A.map(([x, y], i) => [arrondi(x + (B[i][0] - x) * t), arrondi(y + (B[i][1] - y) * t)]);
const enBezier = (p) => `M${p[0][0]} ${p[0][1]}C${p[1]} ${p[2]} ${p[3]}C${p[4]} ${p[5]} ${p[6]}`
  .replace(/,/g, " ");
const enBezierInverse = (p) => `C${p[5]} ${p[4]} ${p[3]}C${p[2]} ${p[1]} ${p[0]}`.replace(/,/g, " ");

// Paupière SUPÉRIEURE : de `BORD_HAUT` vers `BORD_BAS`. `ouv` est la fraction
// d'œil qui reste OUVERTE : 1 = grand ouvert, .6 = mi-clos, .5 = plissé, 0 = fermé.
export const PLI_H = (ouv) => enBezier(melange(BORD_HAUT, BORD_BAS, 1 - ouv));
export const PAUPIERE_H = (ouv) =>
  `${enBezier(BORD_HAUT)}${enBezierInverse(melange(BORD_HAUT, BORD_BAS, 1 - ouv))}Z`;
// Paupière INFÉRIEURE : de `BORD_BAS` vers `BORD_HAUT`. `mange` est la fraction
// d'œil qu'elle remonte par le bas — .1 à .2, pas plus.
export const PLI_B = (mange) => enBezier(melange(BORD_BAS, BORD_HAUT, mange));
export const PAUPIERE_B = (mange) =>
  `${enBezier(BORD_BAS)}${enBezierInverse(melange(BORD_BAS, BORD_HAUT, mange))}Z`;

// `e` accompagne le facteur d'échelle des YEUX quand un personnage déroge à
// l'œil canonique (Big Macintosh a l'œil à .85, les pouliches à 1.05) : la
// paupière fixe doit suivre exactement la même mise à l'échelle que l'amande,
// sinon elle flotte. `paupieres(c, e)` applique déjà le même `e` au clignement.
// `P` et `L` permettent de déroger au placement canonique de l'œil (pouliches,
// et les personnages dont le relevé de référence descend l'œil dans le crâne) :
// la paupière fixe doit être calée sur l'amande, où qu'elle soit.
export const paupiereHaute = (c, { TRAIT }, ouv, teinte = c.robe, e = 1,
  P = OEIL_PROCHE, L = OEIL_LOIN) => `<g fill="${teinte}">
    <path d="${PAUPIERE_H(ouv)}" transform="${P} scale(${e}) ${OEIL_BLANC}"/>
    <path d="${PAUPIERE_H(ouv)}" transform="${L} scale(${e}) ${OEIL_BLANC}"/>
    <path d="${PLI_H(ouv)}" transform="${P} scale(${e}) ${OEIL_BLANC}"
          fill="none" stroke="${TRAIT}" stroke-width="${2.2 / e}"/>
  </g>`;

// PAUPIÈRE INFÉRIEURE. `mange` est la fraction d'œil remontée par le bas. Elle
// ne sert qu'au plissement (Rainbow Dash) et reste discrète — .1 à .2. Au-delà,
// combinée à la paupière haute, l'œil se ferme et le poney a l'air endormi.
export const paupiereBasse = (c, { TRAIT }, mange, teinte = c.robe, e = 1,
  P = OEIL_PROCHE, L = OEIL_LOIN) => `<g fill="${teinte}">
    <path d="${PAUPIERE_B(mange)}" transform="${P} scale(${e}) ${OEIL_BLANC}"/>
    <path d="${PAUPIERE_B(mange)}" transform="${L} scale(${e}) ${OEIL_BLANC}"/>
    <path d="${PLI_B(mange)}" transform="${P} scale(${e}) ${OEIL_BLANC}"
          fill="none" stroke="${TRAIT}" stroke-width="${1.9 / e}"/>
  </g>`;

// SOURCIL. Uniquement au-dessus de l'œil PROCHE : au-dessus du lointain il fait
// immanquablement un air fâché (piège documenté dans NOTES.md). Se pose en
// couche 8 ter, donc SOUS la crinière — un sourcil se porte sur la peau, et la
// mèche qui le recouvre en partie est justement ce qui l'empêche de flotter.
//
// CONSÉQUENCE, vérifiée sur les cinq poneys de la vague : un sourcil n'est
// possible QUE si la crinière laisse le front nu au-dessus de l'œil proche, et
// c'est le cas d'un seul personnage — Rainbow Dash, dont la crête est rejetée en
// arrière (front nu de y 45 à y 60). Applejack a le chapeau ; Pinkie a ses
// boucles ; la crinière de Fluttershy descend en diagonale sur le coin arrière
// de l'œil ; la frange de Rarity est coiffée en avant et passe SOUS le sommet de
// l'œil. Sur ces quatre-là, l'expression passe par la paupière, pas par le
// sourcil — et un sourcil déplacé « là où il reste de la place » devient un pli
// au-dessus de l'œil lointain, c'est-à-dire l'air fâché.
export const sourcil = (col, trace, w = 2.8) =>
  `<path d="${trace}" fill="none" stroke="${col}" stroke-width="${w}"/>`;

// TACHES DE ROUSSEUR. Relevé sur la référence d'Applejack : elles sont PLUS
// CLAIRES que la robe (crème), pas plus foncées, et groupées en petit triangle
// sur la joue proche, juste sous le coin bas de l'œil. En vue de trois quarts on
// ne voit que la joue proche — les trois de l'autre joue sont hors champ.
export const TACHE = (robe) => ton(robe, .72, .2);
export const taches = (robe, l) => `<g fill="${TACHE(robe)}">${
  l.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}"/>`).join('')}</g>`;

// Couche 9 : PAUPIÈRES dessinées EN POSITION FERMÉE (l'amande agrandie de 7 %).
// Le CSS les replie en scaleY(0) au repos. Jamais de `stroke` ici : un contour
// sur un groupe à scaleY(0) laisse un filet horizontal visible.
// `teinte` permet de déroger à la robe : Rarity a du fard à paupières, qui
// n'apparaît justement qu'au clignement.
export const paupieres = (c, e = 1, teinte = c.robe,
  P = OEIL_PROCHE, L = OEIL_LOIN) => `<g class="paupieres">
    <path d="${AMANDE}" transform="${P} scale(${1.07 * e})" fill="${teinte}"/>
    <path d="${AMANDE}" transform="${L} scale(${1.07 * e})" fill="${teinte}"/>
  </g>`;

// Couche 10 : le contour de la joue repasse PAR-DESSUS l'œil lointain — sans
// lui l'œil déborde du museau.
export const joue = ({ TRAIT }) =>
  `<path d="M269 62C272 68 274 74 278 79" fill="none" stroke="${TRAIT}" stroke-width="3.4"/>`;

// Couche 11 : CORNE des licornes — fine, haute, striée. Les 4 stries ne sont pas
// décoratives : sans elles la corne se lit comme une oreille.
export const corne = (c, { TRAIT }) => `<path
    d="M246 19C242 26 237 34 233 46 238 48 244 48 248 46 249 34 248 26 246 19Z"
    fill="${c.robe}" stroke="${TRAIT}" stroke-width="2.8"/>
  <g fill="none" stroke="${TRAIT}" stroke-width="1.4">
    <path d="M234.5 43.5C239 41.5 244 41.5 248 42"/>
    <path d="M237 36.5C241 34.5 245 34.5 248.6 35"/>
    <path d="M240 30C243 28.5 246 28.5 248 29"/>
    <path d="M242.5 24.5C244.5 23.5 246 23.5 247.2 24"/>
  </g>`;

// Couche 13 : CILS — traits courts au coin EXTERNE de l'œil proche, et rien
// d'autre : le moindre trait au-dessus de l'œil lointain fait un sourcil.
// Le coin externe est ici EN BAS À GAUCHE, et ce n'est pas une erreur : dans la
// référence de Twilight la tête est relevée vers le ciel, donc le coin externe
// de l'œil pointe vers le bas-arrière. Tous les poneys héritent de cette pose.
// `l` allonge les cils, `n` en règle le nombre (2 = cils sobres d'Applejack,
// 4 = cils spectaculaires de Rarity), `w` l'épaisseur.
const RACINES_CILS = [[223, 84], [226, 87], [229, 90], [231.5, 93]];
export const cils = ({ PUPILLE }, l = 1, n = 3, w = 2.6) =>
  `<g fill="none" stroke="${PUPILLE}" stroke-width="${w}">${
    RACINES_CILS.slice(0, n).map(([x, y]) =>
      `<path d="M${x} ${y}C${x - 2 - 2 * (l - 1)} ${y + 1 + (l - 1)} ${x - 4 - 4 * (l - 1)} ${y + 2 + 2 * (l - 1)} ${x - 5 - 5 * (l - 1)} ${y + 3.5 + 3 * (l - 1)}"/>`
    ).join('')}
  </g>`;

// ── GABARIT DE POULICHE ───────────────────────────────────────────────────────
// Les quatre pouliches de l'école (Apple Bloom, Sweetie Belle, Scootaloo,
// Diamond Tiara) ne peuvent pas se contenter du gabarit adulte réduit : le
// portrait de galerie est une fenêtre FIXE (`171 6 124 124`) où la tête de
// chacun doit tomber et qu'elle doit remplir. Donc la tête reste EXACTEMENT
// canonique — même boîte, même œil, même museau, mêmes helpers d'expression —
// et c'est le CORPS qui rapetisse autour d'elle. C'est aussi la bonne lecture :
// une pouliche est un poney à grosse tête, cou court et pattes courtes.
//
// Relevé sur les trois références d'infobox (`refs/apple-bloom-id.png`,
// `sweetie-belle-id.png`, `scootaloo-id.png`), en fraction de la LONGUEUR DE
// TÊTE (bout du museau → arrière du crâne, 101 unités ici) :
//
// | mesure                        | adulte    | pouliche  |
// | tête / hauteur totale         | 33 %      | **39 %**  |
// | profondeur / longueur du tronc| 0,51      | **0,61**  (tronc plus creux que long) |
// | gorge (mâchoire → poitrail)   | 65 unités | **30**    (le cou est presque absent) |
// | longueur de patte             | 81        | **60**    |
// | sabots                        | y 266     | **y 232** |
//
// Conséquence assumée : la pouliche laisse ~68 unités de vide en bas du viewBox
// (l'adulte en laisse 31), donc elle se REND plus petite que les adultes dans
// une vignette de même taille. C'est exactement le contrôle demandé au brief.
// ── LA TÊTE D'UNE POULICHE N'EST PAS LA TÊTE ADULTE. Premier jet écarté : la
//    tête canonique de `CORPS` collée sur un tronc d'enfant. Face à la référence
//    plein pied, le défaut sautait aux yeux — le chanfrein adulte descend
//    jusqu'à x 282 et le menton jusqu'à y 116, ce qui laisse, sous un grand œil
//    de pouliche, une plage de museau vide de 25 unités : le profil se lit comme
//    un lama. Relevé sur `refs/scootaloo-plein-pied.png` (gros plan de trois
//    quarts) : le bout du museau ne dépasse le bord avant de l'œil que de 0,3
//    LARGEUR D'ŒIL (l'adulte : 0,65), et le crâne est un DÔME, pas une pente.
//    D'où cette tête à museau court (bout à x 275 au lieu de 282), crâne bombé
//    (sommet y 39 au lieu de 42) et menton remonté (y 94 au lieu de 106).
//    Conséquence en cascade : `naseauPouliche` et `jouePouliche` remplacent
//    leurs versions canoniques, et la bouche descend dans la fenêtre
//    x 256 → 272 / y 84 → 96.
export const CORPS_POULICHE = "M196 112C199 104 201 96 201 88 200 78 200 70 202 62"
  + "C205 51 214 43 232 39 248 40 258 45 263 52"   // crâne bombé
  + "C267 58 271 65 274 71 275 74 275 77 274 79"   // chanfrein COURT
  + "C271 82 267 84 265 87 265 90 269 92 272 94"   // encoche de bouche + menton
  + "C270 97 266 100 261 102 254 104 246 105 239 106"
  + "C236 106 234 106.5 232 107"                   // coin mâchoire / gorge
  // ── gorge COURTE (30 unités au lieu de 65), poitrail rond, ventre bas
  + "C231 113 230 119 228 126"
  + "C224 135 219 142 214 148"
  + "C207 156 199 162 191 166"
  + "C183 169 175 171 168 170"
  + "C161 169 154 166 150 161"
  + "C146 156 145 150 146 144"
  + "C148 136 152 129 158 124"
  + "C166 118 176 114 185 112"
  + "C189 112 193 112 196 112Z";

// Naseau et contour de joue de la tête de pouliche (le museau étant plus court
// et plus haut, les tracés canoniques tomberaient dans le vide).
export const naseauPouliche = ({ TRAIT }) =>
  `<path d="M266.5 76C268.5 78.5 271.5 79 273.5 77" fill="none"
        stroke="${TRAIT}" stroke-width="2.1"/>`;
export const jouePouliche = ({ TRAIT }) =>
  `<path d="M263 52C267 58 271 65 274 71" fill="none" stroke="${TRAIT}" stroke-width="3.4"/>`;

// Patte de pouliche : colonne courte et droite à sabot arrondi, en tracé
// OUVERT du haut du bord AVANT (x + l) au haut du bord ARRIÈRE (x − l), comme
// les pattes adultes — les deux extrémités disparaissent sous le tronc, et
// c'est le `Z` du remplissage (jamais tracé) qui referme le haut.
// `yAv` et `yAr` diffèrent : la ligne de cuisse/épaule d'une pouliche remonte
// nettement plus haut côté flanc que côté croupe.
export const pattePouliche = (x, l, yAv, yAr, y1) =>
  `M${x + l} ${yAv}`
  + `C${x + l + 1} ${yAv + 8} ${x + l + 1.5} ${y1 - 16} ${x + l + 1} ${y1 - 6}`
  + `C${x + l + 1} ${y1 - 2} ${x + l - 1} ${y1} ${x} ${y1}`
  + `C${x - l + 1} ${y1} ${x - l - 1} ${y1 - 2} ${x - l - 1} ${y1 - 6}`
  + `C${x - l - 1.5} ${y1 - 16} ${x - l - 1} ${yAr + 8} ${x - l} ${yAr}`;

// Les pattes du FOND sont décalées de ~20 unités vers l'avant, comme chez
// l'adulte (la paire de gauche est la paire proche, donc la plus en arrière).
// Les paires se TOUCHENT (bords à 158 et 212) : écartées de quatre unités, les
// quatre pattes se lisent comme quatre poteaux plantés sous une caisse.
// SABOTS À y 218, pas 232 : mesuré sur les deux références plein pied, la patte
// visible d'une pouliche fait 0,62 hauteur de tête (l'adulte 1,08), soit 46
// unités sous un ventre à y 170. C'était l'erreur la plus voyante du premier
// jet — des pattes d'adulte sous un tronc d'enfant.
// Et ÉPAISSES : sur les références plein pied les pattes d'une pouliche sont
// des petits fûts trapus, pas les colonnes galbées d'une adulte.
export const PATTE_AR_FOND_P = pattePouliche(166, 8.5, 142, 146, 214);
export const PATTE_AV_FOND_P = pattePouliche(219, 8.5, 138, 142, 214);
export const PATTE_AR_BORD_P = pattePouliche(150, 10, 148, 152, 218);
export const PATTE_AV_BORD_P = pattePouliche(203, 10, 150, 156, 218);

// ── OREILLE DE POULICHE : la feuille adulte écrasée à 65 % en hauteur (pointe
//    basse ramenée de y 101 à y 85). Relevé sur les références : l'oreille d'une
//    pouliche fait 0,38 hauteur de tête, celle d'une adulte 0,60.
export const OREILLE_P = "M188 56C183 58 181.5 60.6 181.5 63.8"
  + "C182 68.4 185 72.3 190 76.8 195 80.7 201 83.4 205 85.3"
  + "C203 78.8 201 71 200 64.5 199 60 194 57.3 188 56Z";

// ── CADRAGE DES POULICHES. Une pouliche à tête canonique et pattes courtes ne
//    remplit que les deux tiers hauts du viewBox : 82 unités de vide en bas, et
//    le dessin FLOTTE dans sa fiche. Tout le personnage est donc posé dans un
//    groupe à l'échelle 1,15 — le brief l'autorise explicitement (« les
//    pouliches peuvent être dessinées plus grandes dans le viewBox, comme
//    Spike »). Les proportions d'enfant sont intactes, la tête remplit MIEUX la
//    fenêtre de portrait (86 unités de haut dans une fenêtre de 124, contre 75),
//    et les sabots retombent à y 242 au lieu de 218.
//    Bornes qui fixent les deux nombres : le bas de la tête (canon y 117) doit
//    rester au-dessus de y 130 (bord bas de la fenêtre) → ty = −8,5 ; la tête
//    (canon x 181 → 282) doit tenir dans x 171 → 295 → tx = −33.
export const CADRE_MINI = 'transform="translate(-33 -8.5) scale(1.15)"';

export const membresFondPouliche = ({ FOND, FOND_T }) =>
  `<g fill="${FOND}" stroke="${FOND_T}" stroke-width="3"><path d="${PATTE_AR_FOND_P}Z"/>
    <path d="${PATTE_AV_FOND_P}Z"/></g>`;

export const membresProchesPouliche = (c, { TRAIT }) =>
  `<g fill="${c.robe}"><path d="${PATTE_AR_BORD_P}Z"/><path d="${PATTE_AV_BORD_P}Z"/></g>
  <g fill="none" stroke="${TRAIT}" stroke-width="3">
    <path d="${PATTE_AR_BORD_P}"/><path d="${PATTE_AV_BORD_P}"/>
  </g>`;

// ── CILS AU COIN HAUT-ARRIÈRE ─────────────────────────────────────────────────
// Les cils de `cils()` sortent du coin BAS-arrière de l'œil : c'est juste pour
// la pose de la référence de Twilight (tête relevée vers le ciel), et c'est
// documenté comme tel. Sur les six références plein pied de la vague 2, la tête
// est DE NIVEAU et les cils sortent tous du coin HAUT-arrière, en éventail vers
// le haut et l'arrière. Rendus au coin bas sur ces personnages, ils se lisent
// comme trois griffures sur la joue — c'est même le défaut le plus visible du
// premier jet de la vague.
//
// Ces cils sont écrits dans le repère LOCAL de l'amande (celui de `AMANDE`), à
// poser dans un groupe `translate(cx cy) scale(e)` : ils suivent ainsi
// n'importe quel placement d'œil sans être réécrits. Le bord haut de l'amande
// va de (−19,5 ; −3,9) à (−1,5 ; −16,5) : les racines sont dessus.
// Cils COURTS et RABATTUS EN ARRIÈRE (et non dressés) : dressés, ils se lisent
// comme trois épingles plantées dans la paupière. Sur les références ils
// épousent le bord de l'œil sur les deux premiers tiers de leur longueur.
const RACINES_HAUTES = [
  [[-15.5, -11.5], [-17.5, -12.5], [-19, -13.5], [-20.5, -15]],
  [[-11.5, -14.5], [-13.5, -15.5], [-15, -16.5], [-16.5, -18]],
  [[-7.5, -16.3], [-9.5, -17.5], [-11, -18.7], [-12.5, -20.2]],
];
export const cilsHauts = ({ PUPILLE }, n = 3, w = 2.4) =>
  `<g fill="none" stroke="${PUPILLE}" stroke-width="${w}">${
    RACINES_HAUTES.slice(0, n).map((p) =>
      `<path d="M${p[0][0]} ${p[0][1]}C${p[1][0]} ${p[1][1]} ${p[2][0]} ${p[2][1]} ${p[3][0]} ${p[3][1]}"/>`
    ).join('')}
  </g>`;

// ── AILES DE PÉGASE ───────────────────────────────────────────────────────────
// L'aile se substitue à la 2e patte du fond côté flanc : elle s'insère APRÈS le
// corps et AVANT les membres proches. Un voile #000 / .08 par-dessus la couche
// de robe la fait lire « derrière », comme les membres du fond.

// Aile REPLIÉE (Fluttershy) : elle épouse le flanc, pointe vers la croupe.
// Trois pennes visibles, dessinées comme des entailles du bord bas.
export const AILE_REPLIEE = "M209 137C201 137 190 141 180 148"
  + "C170 155 162 163 158 170 161 172 166 172 171 170"
  + "C168 175 166 179 166 182 171 182 177 179 182 175"
  + "C182 179 183 182 184 184 189 181 194 176 198 170"
  + "C204 161 209 149 209 137Z";
export const ailePliee = (c, { TRAIT }) => `<g>
    <path d="${AILE_REPLIEE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.2"/>
    <path d="${AILE_REPLIEE}" fill="#000" fill-opacity=".11"/>
    <g fill="none" stroke="${TRAIT}" stroke-width="2">
      <path d="M203 141C193 147 183 156 176 165"/>
      <path d="M206 149C198 155 190 163 185 171"/>
    </g>
  </g>`;

// Aile DÉPLOYÉE (Rainbow Dash) : elle part du garrot (196,130) et se déploie
// vers le haut-arrière jusqu'à (124,64). Le bord bas est festonné : quatre
// pennes. La pointe reste à x < 171 pour rester HORS de la fenêtre de portrait.
export const AILE_DEPLOYEE = "M198 132C186 122 168 106 148 92"
  + "C136 84 127 78 124 76 122 79 124 85 129 93"
  + "C122 90 116 88 113 88 115 93 121 100 129 108"
  + "C122 108 117 108 114 109 119 115 127 121 137 127"
  + "C131 130 127 132 125 134 132 138 142 141 153 143"
  + "C167 145 181 143 191 139 196 137 198 135 198 132Z";
export const aileDeployee = (c, { TRAIT }) => `<g>
    <path d="${AILE_DEPLOYEE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.2"/>
    <path d="${AILE_DEPLOYEE}" fill="#000" fill-opacity=".08"/>
    <g fill="none" stroke="${TRAIT}" stroke-width="2">
      <path d="M186 133C172 127 155 116 140 104"/>
      <path d="M178 137C165 132 150 122 137 112"/>
      <path d="M167 140C156 136 145 129 135 121"/>
    </g>
  </g>`;
