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

// Couche 7 : naseau + bouche. `ouverte` donne le sourire ouvert de la référence,
// sinon un simple sourire fermé (poneys calmes : Fluttershy, Rarity).
export const museau = ({ TRAIT, BOUCHE, LANGUE }, ouverte = true) =>
  `<path d="M268.5 85.5C270.5 88 273.5 88.5 276 86.5" fill="none" stroke="${TRAIT}" stroke-width="2.2"/>`
  + (ouverte
    ? `<path d="M267.5 95C271 93.5 275.5 97.5 278.5 102.5 275 104.5 271.5 105 269.5 103.5
           267 100 266.5 97 267.5 95Z" fill="${BOUCHE}" stroke="${TRAIT}" stroke-width="2.2"/>
       <path d="M269 100C271.5 102 274 103.5 276 104.5 273 106 270 105 268.5 102.5Z" fill="${LANGUE}"/>`
    : `<path d="M265.5 95.5C270 94.5 275 97.5 278.5 102" fill="none" stroke="${TRAIT}" stroke-width="2.6"/>`);

// Un œil = masse sombre, blanc inséré, iris, bas d'iris, pupille, 2 reflets.
export const oeil = (c, { PUPILLE, BLANC, IRIS_BAS }) => (t) => `<g transform="${t}">
    <path d="${AMANDE}" fill="${PUPILLE}"/>
    <path d="${AMANDE}" transform="translate(-1.6 1.4) scale(.955)" fill="${BLANC}"/>
    <path d="${IRIS}" fill="${c.yeux}"/>
    <ellipse cx=".5" cy="8" rx="4.6" ry="2.9" fill="${IRIS_BAS}"/>
    <ellipse cx="2.8" cy="-3.3" rx="10.6" ry="11.4" fill="${PUPILLE}"/>
    <ellipse cx="-4" cy="-5.2" rx="3.8" ry="7.1" fill="#fff" transform="rotate(-12 -4 -5.2)"/>
    <circle cx="4.8" cy=".2" r="2" fill="#fff"/>
  </g>`;

// Positions canoniques : œil proche (grand) et œil lointain (étroit, miroir
// écrasé — c'est la perspective 3/4 qui l'aplatit, pas une autre forme).
export const OEIL_PROCHE = "translate(235.5 77.9)";
export const OEIL_LOIN = "translate(266 65.8) scale(-.41 .81)";

// Couche 9 : PAUPIÈRES dessinées EN POSITION FERMÉE (l'amande agrandie de 7 %).
// Le CSS les replie en scaleY(0) au repos. Jamais de `stroke` ici : un contour
// sur un groupe à scaleY(0) laisse un filet horizontal visible.
// `teinte` permet de déroger à la robe : Rarity a du fard à paupières, qui
// n'apparaît justement qu'au clignement.
export const paupieres = (c, e = 1, teinte = c.robe) => `<g class="paupieres">
    <path d="${AMANDE}" transform="translate(235.5 77.9) scale(${1.07 * e})" fill="${teinte}"/>
    <path d="${AMANDE}" transform="translate(266 65.8) scale(${-.44 * e} ${.87 * e})" fill="${teinte}"/>
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

// Couche 13 : CILS — trois traits courts au coin EXTERNE de l'œil proche, et
// rien d'autre : le moindre trait au-dessus de l'œil lointain fait un sourcil.
// `l` allonge les cils (Rarity, Fluttershy en ont de très longs).
export const cils = ({ PUPILLE }, l = 1) => `<g fill="none" stroke="${PUPILLE}" stroke-width="2.6">
    <path d="M223 84C${221 - 2 * (l - 1)} ${85 + l - 1} ${219 - 4 * (l - 1)} ${86 + 2 * (l - 1)} ${218 - 5 * (l - 1)} ${87.5 + 3 * (l - 1)}"/>
    <path d="M226 87C${224 - 2 * (l - 1)} ${88.5 + l - 1} ${222 - 4 * (l - 1)} ${89.5 + 2 * (l - 1)} ${221 - 5 * (l - 1)} ${91 + 3 * (l - 1)}"/>
    <path d="M229 90C${227 - 2 * (l - 1)} ${91.5 + l - 1} ${225 - 4 * (l - 1)} ${92.5 + 2 * (l - 1)} ${224 - 5 * (l - 1)} ${94 + 3 * (l - 1)}"/>
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
