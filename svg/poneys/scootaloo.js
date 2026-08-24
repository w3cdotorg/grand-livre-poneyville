// ───────────────────────────────────────────────────────────────────────────────
// Scootaloo — POULICHE pégase, l'intrépide des Chercheuses de talent.
//
// RÉFÉRENCE PLEIN PIED : `refs/scootaloo-plein-pied.png`
//   https://static.wikia.nocookie.net/mlp/images/3/3b/Scootaloo_ID_S4E17.png
// Compléments : `refs/scootaloo-id.png` (Scootaloo_ID_S6E4.png, plein pied de
// trois quarts) et `refs/scootaloo-grin.png` (Scootaloo_grin_S4E15.png) pour la
// bouche.
//
// Gabarit de pouliche de `_commun.js` : tête à museau court, tronc creux, gorge
// de 30 unités, pattes trapues, cadrage `CADRE_MINI`.
// FLANC VIERGE (`cutieMark: null`) — ce qui tombe bien : la place sert à l'aile.
//
// Relevés propres au personnage :
//   · CRINIÈRE EN ÉPIS. Trois pointes franches sur la ligne de cheveux, pas une
//     masse arrondie : c'est la seule des trois Chercheuses dont la crinière est
//     hérissée, et c'est ce qui la fait reconnaître de loin.
//   · PETITES AILES. Sur la référence elles sont minuscules et repliées haut sur
//     le flanc, trois lobes de plumes visibles — l'aile de Fluttershy réduite
//     serait déjà trop grande pour une pouliche.
//
// ── EXPRESSION SIGNATURE : ESPIÈGLE ET ÉNERGIQUE. Grand SOURIRE OUVERT à bande
//    de dents, relevé vers l'arrière (relevé sur `scootaloo-grin.png`), plus une
//    PAUPIÈRE BASSE à .12 : ce léger plissé par le bas est ce qui transforme un
//    rire en malice. Trois cils au coin haut-arrière.
// ───────────────────────────────────────────────────────────────────────────────
import {
  derives, OREILLE_P, CORPS_POULICHE, membresFondPouliche,
  membresProchesPouliche, naseauPouliche, oeil, OEIL_PROCHE_P, OEIL_LOIN_P,
  OEIL_P, CADRE_MINI, paupiereBasse, paupieres, jouePouliche, cilsHauts,
} from "./_commun.js";

// ── QUEUE en brosse : trois pointes franches en bas, pas une vague.
const QUEUE = "M152 128C140 132 128 142 120 156"
  + "C112 170 108 186 108 200"
  + "C112 196 116 190 120 184"
  + "C119 192 119 200 121 208"
  + "C126 200 131 192 136 186"
  + "C136 194 138 200 141 206"
  + "C145 196 149 184 152 172"
  + "C154 160 154 142 152 128Z";

// ── FRANGE EN ÉPIS. La ligne de cheveux est un zigzag de trois pointes tournées
//    vers le haut et l'arrière. Cote de la fenêtre de portrait (y_final =
//    1,15·y − 8,5, bord haut à y 6) : aucune pointe au-dessus de y 16, sinon
//    elle est tranchée net dans la vignette de galerie.
const FRANGE = "M196 48C199 55 203 59 208 61 210 62 212 61 213 60"
  + "C217 55 222 50 228 45 235 40 243 36 250 33"
  + "C249 29 246 26 243 25"
  + "C240 27 237 29 233 30"
  + "C234 26 233 22 231 19"
  + "C227 23 222 27 217 30"
  + "C217 26 215 22 213 19"
  + "C208 24 202 32 199 40"
  + "C197 44 196 46 196 48Z";
// ── MÈCHE d'encolure, en pointe elle aussi.
const MECHE = "M200 72C194 84 189 98 187 112 186 118 187 122 188 126"
  + "C193 121 198 116 201 110"
  + "C203 102 205 92 209 84"
  + "C211 79 213 75 214 72"
  + "C210 69 204 69 200 72Z";

// ── PETITE AILE repliée haut sur le flanc, trois lobes de plumes.
const AILERON = "M217 118C209 118 200 122 193 128"
  + "C187 133 183 138 182 142"
  + "C184 144 188 143 192 141"
  + "C190 144 189 147 189 149"
  + "C193 149 197 147 200 144"
  + "C207 138 214 129 217 118Z";

export default (c) => {
  const d = derives(c);
  const { M0, TRAIT, CRIN_T, CRIN_S2, CRIN_H, BOUCHE } = d;
  const oe = oeil(c, d);

  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img">
  <g ${CADRE_MINI} stroke-linejoin="round" stroke-linecap="round">

  <!-- 1. QUEUE en brosse. Crinière MONOCHROME : reflet CRIN_H et séparations
       renforcées CRIN_S2 à la place des bandes de couleur du template. -->
  <path d="${QUEUE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <path d="M145 140C135 152 127 168 124 184 122 194 122 200 123 204" fill="none"
        stroke="${CRIN_H}" stroke-width="9"/>
  <g fill="none" stroke="${CRIN_S2}" stroke-width="1.6">
    <path d="M148 136C137 149 129 166 126 182 124 193 124 200 125 205"/>
    <path d="M137 148C128 160 121 176 118 190 116 198 116 202 117 205"/>
  </g>
  <path d="${QUEUE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <!-- 2. MEMBRES DU FOND, gabarit pouliche -->
  ${membresFondPouliche(d)}

  <!-- 3. (l'OREILLE passe en 12 ter : les épis couvrent toute sa zone.) -->

  <!-- 4. CORPS DE POULICHE : une seule silhouette, museau court compris -->
  <path d="${CORPS_POULICHE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 5. PAS DE MARQUE DE BEAUTÉ : le flanc de Scootaloo est vierge. -->

  <!-- 5 bis. AILE, après le corps et avant les pattes proches, avec le voile
       sombre qui la fait lire « derrière » — comme les membres du fond. -->
  <path d="${AILERON}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="2.8"/>
  <path d="${AILERON}" fill="#000" fill-opacity=".10"/>
  <g fill="none" stroke="${TRAIT}" stroke-width="1.8">
    <path d="M212 121C205 126 197 132 192 138"/>
    <path d="M214 127C208 132 202 137 198 142"/>
  </g>

  <!-- 6. MEMBRES PROCHES, gabarit pouliche -->
  ${membresProchesPouliche(c, d)}

  <!-- 7. NASEAU + GRAND SOURIRE OUVERT (17 × 13) dans la fenêtre de bouche de la
       tête de pouliche (x 256 → 272, y 84 → 96). Son bord haut MONTE vers
       l'arrière : c'est cette pente, et non la taille, qui donne la malice. La
       BANDE DE DENTS fait le reste — un aplat rose se lirait comme une langue
       tirée (piège documenté sur le rire de Pinkie). -->
  ${naseauPouliche(d)}
  <path d="M255 87C258 82.5 265 82 269.5 86
           C271 90 267.5 95.5 262 95.5
           C256 95.5 252.5 91.5 255 87Z"
        fill="${BOUCHE}" stroke="${TRAIT}" stroke-width="2.3"/>
  <path d="M256.6 87.4C259.2 84 264.4 83.6 267.8 86.6
           C265.8 88.8 260.6 89.4 256.6 88Z" fill="#fff"/>

  <!-- 8. YEUX de pouliche, grands ouverts -->
  ${oe(`${OEIL_PROCHE_P} scale(${OEIL_P})`)}${oe(`${OEIL_LOIN_P} scale(${OEIL_P})`)}

  <!-- 8 bis. PAUPIÈRE BASSE à .12 : le plissé d'espièglerie. Au-delà de .2, l'œil
       se ferme et la pouliche a l'air endormie. -->
  ${paupiereBasse(c, d, .12, c.robe, OEIL_P, OEIL_PROCHE_P, OEIL_LOIN_P)}

  <!-- 9. PAUPIÈRES du clignement, calées sur l'amande de pouliche -->
  ${paupieres(c, OEIL_P, c.robe, OEIL_PROCHE_P, OEIL_LOIN_P)}

  <!-- 10. contour de la joue, par-dessus l'œil lointain -->
  ${jouePouliche(d)}

  <!-- 11. (l'aile est en 5 bis, avant les pattes proches) -->

  <!-- 12. CRINIÈRE EN ÉPIS : masse, reflet, séparations, contour retracé -->
  <path d="${FRANGE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <path d="M202 44C208 37 216 31 225 27 234 23 242 22 247 23" fill="none"
        stroke="${CRIN_H}" stroke-width="6"/>
  <g fill="none" stroke="${CRIN_S2}" stroke-width="1.5">
    <path d="M203 50C210 41 219 34 229 29"/>
    <path d="M209 58C216 48 225 40 235 34"/>
  </g>
  <path d="${FRANGE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <path d="${MECHE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <path d="M200 80C195 92 192 104 191 116 191 121 192 124 193 126" fill="none"
        stroke="${CRIN_H}" stroke-width="7"/>
  <g fill="none" stroke="${CRIN_S2}" stroke-width="1.5">
    <path d="M206 78C200 90 196 102 195 114"/>
  </g>
  <path d="${MECHE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <!-- 12 ter. OREILLE DE POULICHE par-dessus les épis, puis le PLI INTERNE -->
  <path d="${OREILLE_P}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.2"/>
  <path d="M202 62C200 70 200 78 201 88" fill="none" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 13. CILS : trois, au coin haut-arrière -->
  <g transform="${OEIL_PROCHE_P} scale(${OEIL_P})">${cilsHauts(d, 3, 2.2 / OEIL_P)}</g>

  </g>
</svg>`;
};
