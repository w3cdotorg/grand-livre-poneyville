// ───────────────────────────────────────────────────────────────────────────────
// Fluttershy — pégase. Dérivée du TEMPLATE CANON `twilight.js` via `_commun.js`
// (carcasse, œil, museau, oreille, membres).
//
// Singularités : AILE REPLIÉE sur le flanc, crinière LONGUE et lisse qui tombe
// jusqu'au poitrail et s'y enroule, queue longue au ras du sol, bouche fermée
// (sourire doux plutôt que le rire de Twilight) et cils allongés.
// Crinière monochrome : reflets `CRIN_H` et séparations `CRIN_S2` au lieu des
// bandes de couleur du template. Marque de beauté = trois papillons.
// ───────────────────────────────────────────────────────────────────────────────
import {
  ton, derives, OREILLE, CORPS, membresFond, membresProches, museau,
  oeil, OEIL_PROCHE, OEIL_LOIN, paupieres, joue, cils, ailePliee,
} from "./_commun.js";

// ── CRINIÈRE : UN SEUL tracé, de la pointe de la frange sur le front jusqu'au
//    crochet du bas, à hauteur de poitrail. C'est l'enseignement de la vague :
//    découper la crinière de Fluttershy en « frange » + « masse » donne
//    infailliblement un BÉRET posé sur la tête, avec une couture entre les deux.
//    Le tracé suit, dans l'ordre : ligne de cheveux du front (214,84) → (254,44),
//    bord extérieur par-dessus le crâne puis le long de la nuque, crochet
//    d'extrémité qui revient vers l'avant, bord intérieur qui remonte l'encolure.
const MANE = "M214 84"
  + "C222 76 232 66 240 56 246 50 251 46 254 44"
  + "C249 32 237 27 223 27"
  + "C209 28 196 34 188 44"
  + "C180 55 176 72 175 92"
  + "C174 118 175 146 177 170"
  + "C179 188 182 198 187 208"
  + "C193 220 205 224 216 221"
  + "C227 218 232 209 229 199"
  + "C226 190 217 187 210 191"
  + "C211 180 213 166 214 150"
  + "C215 126 214 104 210 88Z";

// ── QUEUE : longue, presque droite, qui balaie jusqu'au sol et s'enroule à peine.
const QUEUE = "M143 122"
  + "C124 125 108 134 98 150"
  + "C88 166 84 186 83 206"
  + "C82 224 85 240 90 252"
  + "C95 262 105 265 114 261"
  + "C123 257 127 248 124 238"
  + "C121 230 114 227 107 230"
  + "C106 216 108 200 112 184"
  + "C117 164 124 144 132 132"
  + "C136 126 140 123 143 122Z";

// ── PAPILLON de la marque de beauté : quatre lobes d'aile autour d'un corps
//    fuselé. Le rose du papillon est une constante documentée — il ne dérive
//    d'aucune couleur de `c` (la robe est jaune pâle, la crinière rose clair :
//    ni l'une ni l'autre ne se verrait sur le flanc).
//    Les ÉCHANCRURES entre aile haute et aile basse doivent revenir jusqu'à
//    x = ±6 : à ±10 (première version) les quatre lobes fusionnent en une
//    tache ronde dès qu'on descend à la taille du médaillon.
const PAPILLON = "M0 -6C-2 -12-9 -15-13 -12C-17 -9-15 -3-6 0"
  + "C-11 3-12 9-8 11C-4 13-1 10 0 5"
  + "C1 10 4 13 8 11C12 9 11 3 6 0"
  + "C15 -3 17 -9 13 -12C9 -15 2 -12 0 -6Z";
const ROSE = "#ef7ba9";
const ROSE_T = ton(ROSE, 1, -.15);
const papillon = (x, y, e) => `<g transform="translate(${x} ${y}) scale(${e})">
    <g fill="none" stroke="${ROSE_T}" stroke-width="1.4">
      <path d="M-1 -7C-3 -11-6 -13-8 -14"/><path d="M1 -7C3 -11 6 -13 8 -14"/>
    </g>
    <path d="${PAPILLON}" fill="${ROSE}" stroke="${ROSE_T}" stroke-width="1.8"/>
    <ellipse cx="0" cy="-1" rx="1.8" ry="6.5" fill="${ROSE_T}"/>
    <circle cx="0" cy="-7.5" r="2" fill="${ROSE_T}"/>
  </g>`;
const TROIS_PAPILLONS = (x, y, e) =>
  papillon(x - 15 * e, y - 3 * e, e) + papillon(x + 14 * e, y - 8 * e, e) + papillon(x - 1 * e, y + 12 * e, e);

export default (c) => {
  const d = derives(c);
  const { M0, TRAIT, CRIN_T, CRIN_S2, CRIN_H } = d;
  const oe = oeil(c, d);

  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img">
  <g stroke-linejoin="round" stroke-linecap="round">

  <!-- 1. QUEUE longue -->
  <path d="${QUEUE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <path d="M130 134C117 149 107 170 102 192 97 214 97 234 100 250" fill="none"
        stroke="${CRIN_H}" stroke-width="13"/>
  <g fill="none" stroke="${CRIN_S2}" stroke-width="1.6">
    <path d="M137 129C122 145 110 167 105 192 100 216 100 238 103 254"/>
    <path d="M119 147C107 163 97 184 94 206 91 228 92 244 95 256"/>
  </g>
  <path d="${QUEUE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <!-- 2. MEMBRES DU FOND -->
  ${membresFond(d)}

  <!-- 4. CORPS + COU + TÊTE + MUSEAU : une seule silhouette -->
  <path d="${CORPS}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 5. MARQUE DE BEAUTÉ : trois papillons sur la croupe. Elle est posée AVANT
       l'aile repliée, qui court de x 158 à x 209 : la marque doit donc tenir à
       gauche de x 158, sinon l'aile la recouvre. -->
  ${TROIS_PAPILLONS(140, 150, .6)}

  <!-- 5 bis. AILE REPLIÉE : après le corps, avant les membres proches -->
  ${ailePliee(c, d)}

  <!-- 6. MEMBRES PROCHES -->
  ${membresProches(c, d)}

  <!-- 7. NASEAU + BOUCHE FERMÉE (sourire discret : Fluttershy ne rit pas à
       gorge déployée comme Twilight ou Pinkie) -->
  ${museau(d, false)}

  <!-- 8. YEUX -->
  ${oe(OEIL_PROCHE)}${oe(OEIL_LOIN)}

  <!-- 9. PAUPIÈRES -->
  ${paupieres(c)}

  <!-- 10. contour de la joue, par-dessus l'œil lointain -->
  ${joue(d)}

  <!-- 11. (pas de corne : pégase — l'aile est posée en 5 bis) -->

  <!-- 12. CRINIÈRE : la masse, un reflet et deux séparations qui SUIVENT le
       balayage du front à la nuque puis la chute, enfin le contour retracé. -->
  <path d="${MANE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <path d="M243 48C227 36 208 37 195 51 186 62 185 84 185 108
           185 140 187 172 193 200" fill="none" stroke="${CRIN_H}" stroke-width="12"/>
  <g fill="none" stroke="${CRIN_S2}" stroke-width="1.7">
    <path d="M251 45C233 32 210 33 196 47 186 58 184 82 184 108
             184 142 186 174 192 204"/>
    <path d="M234 64C218 53 204 57 196 71 190 83 191 108 191 134
             191 164 193 190 199 212"/>
  </g>
  <path d="${MANE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <!-- 12 bis. OREILLE, ici et pas en couche 3 : la longue masse de crinière
       passe par-dessus la zone de l'oreille (181 → 205, 56 → 101). L'oreille
       proche est en avant de la crinière rejetée derrière la tête ; le pli
       interne, que le contour du corps dessinait en couche 4, est retracé à la
       main juste après. -->
  <path d="${OREILLE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.2"/>
  <path d="M202 62C200 74 200 86 202 100" fill="none" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 13. CILS, allongés : c'est la marque du regard de Fluttershy -->
  ${cils(d, 1.7)}

  </g>
</svg>`;
};

export const cutieMark = (c) => `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" role="img">
  <circle cx="30" cy="30" r="30" fill="${c.robe}"/>
  ${TROIS_PAPILLONS(30, 29, 1.1)}
</svg>`;
