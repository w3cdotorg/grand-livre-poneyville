// ───────────────────────────────────────────────────────────────────────────────
// Rarity — licorne. Dérivée du TEMPLATE CANON `twilight.js` via `_commun.js`
// (carcasse, œil, museau, oreille, membres, corne).
//
// Singularités : crinière et queue en VOLUTES. Une volute ne se dessine pas
// comme un tracé fermé — il faudrait un contour qui se recroise. On la dessine
// comme un TRAIT ÉPAIS le long d'une spirale, à bouts ronds, passé deux fois :
// d'abord large en `CRIN_T` (ce qui fait le contour), puis plus fin en `M0`.
// Là où la spirale se recouvre elle-même, la seconde passe efface la première :
// la volute se referme proprement, sans couture interne.
//
// ── EXPRESSION SIGNATURE (relevée sur `refs/rarity-sweet.png` et
//    `refs/rarity-canterlot.png`) : paupières MI-CLOSES, cils spectaculaires
//    (quatre, longs, épais), sourcils fins et arqués, sourire posé.
//
//    Et surtout : le FARD À PAUPIÈRES est visible YEUX OUVERTS. Il l'était
//    seulement au clignement, ce qui revenait à cacher sa marque de fabrique
//    99 % du temps. La solution est d'un seul tenant : la paupière fixe
//    mi-close est peinte du fard, si bien que le lilas est exactement l'aplat
//    qu'on voit dans la série au-dessus de l'œil. Sur la référence ce fard est
//    un bleu-lilas CLAIR, plus clair que la crinière — d'où `ton(M0, .55, .34)`.
// ───────────────────────────────────────────────────────────────────────────────
import {
  ton, derives, OREILLE, CORPS, membresFond, membresProches, naseau,
  sourirePose, oeil, OEIL_PROCHE, OEIL_LOIN, paupieres, paupiereHaute,
  joue, cils, corne,
} from "./_commun.js";

// ── FRANGE : reprise du template, avec l'encoche qui contourne la corne
//    (233,42 → 237,28) et la pointe qui mord sur le coin externe de l'œil
//    proche (216,82). Le balayage est un peu plus long et plus doux que celui
//    de Twilight — Rarity a la mèche coiffée, pas ébouriffée.
const FRANGE = "M236 28C230 32 220 38 210 45 204 49 197 54 193 60"
  + "C198 65 204 70 210 75 213 78 215 80 216 82"
  + "C222 78 230 72 238 66 246 60 253 55 256 51"
  + "C250 47 242 44 233 42"
  + "C234 37 235 32 237 28Z";

// ── VOLUTES. Chemins de spirale : chaque volute part de la base de la frange
//    et s'enroule vers son centre. Le trait épais fait le volume.
const VOLUTE_TETE = "M198 62C184 66 174 78 176 92 178 104 190 112 201 108"
  + "C210 105 214 95 210 87 207 81 199 79 194 84 191 88 192 93 196 95";
const VOLUTE_COU = "M200 104C192 116 189 132 194 146 199 158 212 163 221 156"
  + "C229 150 229 138 223 132 218 127 210 128 207 134 205 138 207 143 211 144";
// La queue est une seule grande volute qui descend sous la croupe et se
// retourne vers l'avant.
const VOLUTE_QUEUE = "M142 128C118 133 99 150 94 174 89 198 100 220 120 229"
  + "C138 237 156 228 159 211 161 197 150 187 138 190 130 192 126 200 130 207";

// ── DIAMANT de la marque de beauté : taille brillant vue de face — table
//    (le plat du haut), couronne, pavillon en pointe. Les facettes ne sont pas
//    décoratives : sans elles le losange se lit comme un cerf-volant.
const DIAMANT = "M-7 -6L-3 -11 3 -11 7 -6 0 11Z";
const BLEU = "#7fc3e8";
const BLEU_T = ton(BLEU, 1, -.2);
const diamant = (x, y, e) => `<g transform="translate(${x} ${y}) scale(${e})">
    <path d="${DIAMANT}" fill="${BLEU}" stroke="${BLEU_T}" stroke-width="1.8"/>
    <g fill="none" stroke="${BLEU_T}" stroke-width="1.2">
      <path d="M-7 -6L7 -6"/><path d="M-3 -11L-1.4 -6"/><path d="M3 -11L1.4 -6"/>
      <path d="M-3.6 -6L0 11"/><path d="M3.6 -6L0 11"/>
    </g>
  </g>`;
// Trois diamants en triangle pointe en bas, comme les pommes d'Applejack.
const TROIS_DIAMANTS = (x, y, e) =>
  diamant(x - 9 * e, y - 8 * e, e) + diamant(x + 9 * e, y - 8 * e, e) + diamant(x, y + 10 * e, e);

export default (c) => {
  const d = derives(c);
  const { M0, TRAIT, CRIN_H } = d;
  // Contour de crinière renforcé : `CRIN_T` du template (-16,5 %) ne détache
  // pas un trait épais violet foncé de la volute qu'il cerne.
  const CRIN_T = ton(M0, 1.25, -.21);
  // Fard à paupières. Relevé sur `refs/rarity-canterlot.png` : c'est un BLEU
  // lilas clair, nettement plus bleu que la crinière. Un `ton(M0, …)` en donnait
  // un gris-violet qui, sur une robe presque blanche, se lisait comme une ombre
  // sale ; il dérive donc de la couleur des YEUX, désaturée et éclaircie.
  const FARD = ton(c.yeux, .5, .4);
  const oe = oeil(c, d);

  // Une volute : passe large en contour, passe fine en crinière, filet clair.
  const volute = (trace, large) => `<path d="${trace}" fill="none" stroke="${CRIN_T}"
        stroke-width="${large}" stroke-linecap="round"/>
    <path d="${trace}" fill="none" stroke="${M0}"
        stroke-width="${large - 6.4}" stroke-linecap="round"/>
    <path d="${trace}" fill="none" stroke="${CRIN_H}"
        stroke-width="${(large - 6.4) * .3}" stroke-linecap="round" stroke-opacity=".8"/>`;

  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img">
  <g stroke-linejoin="round" stroke-linecap="round">

  <!-- 1. QUEUE : une seule grande volute -->
  ${volute(VOLUTE_QUEUE, 40)}

  <!-- 2. MEMBRES DU FOND -->
  ${membresFond(d)}

  <!-- 4. CORPS + COU + TÊTE + MUSEAU : une seule silhouette -->
  <path d="${CORPS}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 5. MARQUE DE BEAUTÉ : trois diamants sur la croupe -->
  ${TROIS_DIAMANTS(146, 152, .78)}

  <!-- 6. MEMBRES PROCHES -->
  ${membresProches(c, d)}

  <!-- 7. NASEAU + SOURIRE POSÉ : long, il remonte vers l'avant et s'achève sur
       un repli de lèvre. Le maintien, pas la joie. -->
  ${naseau(d)}${sourirePose(d)}

  <!-- 8. YEUX -->
  ${oe(OEIL_PROCHE)}${oe(OEIL_LOIN)}

  <!-- 8 bis. PAUPIÈRES MI-CLOSES peintes du FARD : .6 d'ouverture. C'est
       ce qui rend le fard visible à l'état ouvert, et non plus au seul
       clignement. Le bord bas du fard est le bord bas même de l'œil remonté,
       donc rigoureusement parallèle à lui. -->
  ${paupiereHaute(c, d, .6, FARD)}

  <!-- 8 ter. PAS DE SOURCIL. Essayé en couleur de crinière (x 222 → 240), et
       intégralement invisible : la frange de Rarity est coiffée EN AVANT et son
       bord bas passe par (222,78), (230,72), (238,66), (246,60) — donc plus bas
       que le sommet de l'œil (y 61). Elle mord le coin arrière de l'œil : il n'y
       a littéralement pas de front. Ce sont les paupières fardées et les cils
       qui portent l'expression. -->

  <!-- 9. PAUPIÈRES du clignement, du même fard -->
  ${paupieres(c, 1, FARD)}

  <!-- 10. contour de la joue, par-dessus l'œil lointain -->
  ${joue(d)}

  <!-- 11. CORNE, avant la crinière pour que la frange couvre sa base -->
  ${corne(c, d)}

  <!-- 12. CRINIÈRE : frange, puis les deux volutes de la nuque et de l'encolure -->
  <path d="${FRANGE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <path d="M202 58C210 51 220 45 230 39 239 34 246 31 250 30" fill="none"
        stroke="${CRIN_H}" stroke-width="7"/>
  <path d="M205 66C214 58 225 51 236 45" fill="none"
        stroke="${ton(M0, 1.05, -.11)}" stroke-width="1.6"/>
  <path d="${FRANGE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  ${volute(VOLUTE_TETE, 26)}

  <!-- 12 bis. OREILLE, ici et pas en couche 3 : la volute de nuque couvre toute
       sa zone (181 → 205, 56 → 101), et un trait épais ne se rattrape pas au
       contour. L'oreille proche est de toute façon en avant de la volute
       rejetée derrière la tête ; le pli interne, dessiné par le contour du corps
       en couche 4, est retracé à la main juste après. -->
  <path d="${OREILLE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.2"/>
  <path d="M202 62C200 74 200 86 202 100" fill="none" stroke="${TRAIT}" stroke-width="3.4"/>

  ${volute(VOLUTE_COU, 26)}

  <!-- 13. CILS SPECTACULAIRES : quatre, très longs et ÉPAIS (3,2). Le quatrième
       part de (231,5 ; 93), sur le bord bas de l'amande : au-delà il décollerait
       de l'œil. C'est le seul poney de la vague qui en a quatre. -->
  ${cils(d, 2, 4, 3.2)}

  </g>
</svg>`;
};

export const cutieMark = (c) => `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" role="img">
  <circle cx="30" cy="30" r="30" fill="${c.robe}"/>
  ${TROIS_DIAMANTS(30, 30, 1.28)}
</svg>`;
