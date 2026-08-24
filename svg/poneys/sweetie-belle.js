// ───────────────────────────────────────────────────────────────────────────────
// Sweetie Belle — POULICHE licorne, la petite sœur de Rarity.
//
// RÉFÉRENCE PLEIN PIED : `refs/sweetie-belle-plein-pied.png`
//   https://static.wikia.nocookie.net/mlp/images/4/41/Sweetie_Belle_ID_S1E18.png
// Complément : `refs/sweetie-belle-id.png` (Sweetie_Belle_ID_S6E4.png).
//
// Gabarit de pouliche de `_commun.js` : tête à museau court, tronc creux, gorge
// de 30 unités, pattes trapues de 46 unités, cadrage `CADRE_MINI`.
// FLANC VIERGE (`cutieMark: null`).
//
// Relevés propres au personnage :
//   · PETITE CORNE — 24 unités de haut, base sur le crâne bombé à y 44. Une
//     pouliche licorne n'a pas encore la corne d'une adulte (27 unités posées
//     plus haut, sur un crâne plus plat).
//   · CRINIÈRE EN BOUCLES bicolore, rose `criniere[0]` et lilas `criniere[1]` :
//     sur la référence, chaque masse porte DEUX à TROIS lobes ronds et une
//     spirale creuse en son centre. La ligne de cheveux festonnée fait tout le
//     travail — voir le § écarté plus bas.
//
// ── EXPRESSION SIGNATURE, relevée sur la référence : CANDIDE ET ÉMERVEILLÉE.
//    Aucune paupière rabattue, iris rétréci à .86 — c'est le blanc apparaissant
//    tout autour de l'iris qui fait l'émerveillement, jamais un agrandissement
//    de l'amande (règle d'or : tout se joue à l'intérieur de l'amande). Bouche
//    PETITE ET RONDE, ouverte : c'est la chanteuse de la bande, et une bouche de
//    chant se lit aussi comme l'étonnement doux. Deux cils au coin haut-arrière.
// ───────────────────────────────────────────────────────────────────────────────
import {
  derives, OREILLE_P, CORPS_POULICHE, membresFondPouliche,
  membresProchesPouliche, naseauPouliche, oeil, OEIL_PROCHE_P, OEIL_LOIN_P,
  OEIL_P, CADRE_MINI, paupieres, jouePouliche, cilsHauts,
} from "./_commun.js";

// ── QUEUE bouclée : masse tombante dont la pointe s'enroule en volute.
const QUEUE = "M152 128C136 132 124 142 117 156"
  + "C110 170 109 184 113 196"
  + "C118 207 128 213 138 210"
  + "C148 207 152 197 149 188"
  + "C146 180 137 177 130 181"
  + "C124 184 122 190 125 196"
  + "C119 194 116 188 117 180"
  + "C119 168 125 156 134 147"
  + "C141 140 148 133 152 128Z";

// ── FRANGE. Ligne de cheveux FESTONNÉE en trois lobes : c'est ce qui dit
//    « bouclée » d'un seul coup d'œil, et le bord bas remonte au-dessus de
//    l'amande (bande de robe nue de 8 unités, où poussent les cils).
//    Version écartée : de vraies volutes à la Rarity (trait épais passé deux
//    fois). À l'échelle d'une tête de pouliche, une boucle de 12 unités de
//    diamètre garde un trou au centre et se lit comme un BIGOUDI posé sur le
//    crâne — la volute a besoin d'une grande courbe balayée pour fonctionner.
const FRANGE = "M196 48C199 54 202 58 205 61 206 62 208 62 209 61"
  + "C213 55 219 49 226 43 234 37 243 33 250 31"
  + "C254 26 251 20 245 21 240 22 238 27 240 31"
  + "C235 24 228 20 222 22 217 24 216 30 219 34"
  + "C214 28 206 29 201 35 197 39 196 44 196 48Z";
// ── MÈCHE d'encolure, courte, à deux lobes bouclés.
const MECHE = "M200 72C194 82 189 94 187 106"
  + "C185 113 187 120 192 123"
  + "C198 126 203 122 203 116"
  + "C206 121 211 121 213 116"
  + "C215 111 213 105 209 102"
  + "C211 92 213 80 214 72"
  + "C210 69 204 69 200 72Z";

// ── PETITE CORNE : 24 unités (celle du template en fait 27, plantée plus haut),
//    base sur le crâne bombé à y 44. Les stries ne sont pas décoratives : sans
//    elles la corne se lit comme une deuxième oreille.
//    Cote apprise à l'écran : pointe à y 26, la corne DISPARAÎT sous la ligne de
//    cheveux (les lobes de la frange montent à y 21), et robe quasi blanche sur
//    crinière rose pâle, rien ne la rattrape. Pointe remontée à y 20.
//    Et surtout PLANTÉE EN AVANT (base x 244 → 256) : centrée sur le crâne elle
//    disparaît derrière le lobe avant de la frange. Sur la référence elle sort
//    juste devant les boucles du front.
const CORNE_P = "M254 18C251 26 248 36 246 44 250 46 255 46 258 44 258 35 256 26 254 18Z";

export default (c) => {
  const d = derives(c);
  const { M0, M1, TRAIT, CRIN_T, CRIN_S2, CRIN_H, BOUCHE, LANGUE } = d;
  const oe = oeil(c, d, { iris: .86, regard: [0, .8] });

  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img">
  <g ${CADRE_MINI} stroke-linejoin="round" stroke-linecap="round">

  <!-- 1. QUEUE : masse rose, large bande lilas, spirales, contour retracé -->
  <path d="${QUEUE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <path d="M147 138C135 149 128 164 127 179 126 191 131 200 140 202" fill="none"
        stroke="${M1}" stroke-width="11"/>
  <path d="M138 148C130 158 125 171 125 183 125 192 129 198 135 201" fill="none"
        stroke="${CRIN_H}" stroke-width="6"/>
  <g fill="none" stroke="${CRIN_S2}" stroke-width="1.5">
    <path d="M150 134C138 145 130 160 129 176"/>
    <path d="M131 158C125 168 122 180 124 190"/>
    <path d="M136 184C142 185 145 190 143 195"/>
  </g>
  <path d="${QUEUE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <!-- 2. MEMBRES DU FOND, gabarit pouliche -->
  ${membresFondPouliche(d)}

  <!-- 3. (l'OREILLE passe en 12 ter : les boucles couvrent toute sa zone.) -->

  <!-- 4. CORPS DE POULICHE : une seule silhouette, museau court compris -->
  <path d="${CORPS_POULICHE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 5. PAS DE MARQUE DE BEAUTÉ : le flanc de Sweetie Belle est vierge. -->

  <!-- 6. MEMBRES PROCHES, gabarit pouliche -->
  ${membresProchesPouliche(c, d)}

  <!-- 7. NASEAU + PETITE BOUCHE RONDE OUVERTE (9 × 10), dans la fenêtre de
       bouche de la tête de pouliche : x 256 → 272, y 84 → 96. -->
  ${naseauPouliche(d)}
  <path d="M258 85.5C261.5 82.5 266 83 268.5 86.5
           C269.5 90 266.5 94 262.5 94
           C258 94 255.5 89.5 258 85.5Z"
        fill="${BOUCHE}" stroke="${TRAIT}" stroke-width="2.1"/>
  <path d="M259.4 85.4C262 83.2 265.4 83.6 267.2 86.2
           C265.6 87.8 262.2 88.2 259.4 87.2Z" fill="#fff"/>
  <path d="M259 90.6C261 92.6 264.4 92.6 266.6 90.4
           C266.2 92.8 264.4 94 262.4 94 260.6 94 259.3 92.4 259 90.6Z"
        fill="${LANGUE}"/>

  <!-- 8. YEUX de pouliche, IRIS À .86 : le blanc apparaît tout autour, c'est
       l'émerveillement. Regard très légèrement baissé (0 ; 0,8) — au-delà,
       l'air devient triste. -->
  ${oe(`${OEIL_PROCHE_P} scale(${OEIL_P})`)}${oe(`${OEIL_LOIN_P} scale(${OEIL_P})`)}

  <!-- 9. PAUPIÈRES du clignement, calées sur l'amande de pouliche -->
  ${paupieres(c, OEIL_P, c.robe, OEIL_PROCHE_P, OEIL_LOIN_P)}

  <!-- 10. contour de la joue, par-dessus l'œil lointain -->
  ${jouePouliche(d)}

  <!-- 11. PETITE CORNE, avant la crinière : les lobes doivent couvrir sa base -->
  <path d="${CORNE_P}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="2.6"/>
  <g fill="none" stroke="${TRAIT}" stroke-width="1.3">
    <path d="M247 41.5C251 39.5 255 39.5 257.6 40"/>
    <path d="M248.5 33C251.5 31.5 254.5 31.5 256.5 32"/>
    <path d="M250 25C252 24 254 24 255 24.5"/>
  </g>

  <!-- 12. CRINIÈRE : masse rose festonnée, large BANDE LILAS le long de la
       ligne de cheveux (criniere[1]), spirales de mèche, contour retracé. -->
  <path d="${FRANGE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <path d="M199 44C205 37 214 30 224 27 234 24 243 24 248 26" fill="none"
        stroke="${M1}" stroke-width="10"/>
  <path d="M201 51C208 43 217 36 227 33" fill="none"
        stroke="${CRIN_H}" stroke-width="5"/>
  <g fill="none" stroke="${CRIN_S2}" stroke-width="1.5">
    <path d="M245 24C247 28 246 32 242 33 239 33 238 31 239 29"/>
    <path d="M223 25C226 29 226 33 222 35 219 35 218 33 219 31"/>
    <path d="M204 34C202 38 202 42 205 45"/>
  </g>
  <path d="${FRANGE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <path d="${MECHE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <path d="M204 78C199 88 195 98 194 108 193 114 195 118 199 119" fill="none"
        stroke="${M1}" stroke-width="8"/>
  <g fill="none" stroke="${CRIN_S2}" stroke-width="1.5">
    <path d="M199 108C203 110 205 114 203 118"/>
    <path d="M207 106C210 108 211 112 209 115"/>
  </g>
  <path d="${MECHE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <!-- 12 ter. OREILLE DE POULICHE par-dessus les boucles, puis le PLI INTERNE
       retracé à la main (c'est le contour du cou qui le dessinait). -->
  <path d="${OREILLE_P}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.2"/>
  <path d="M202 62C200 70 200 78 201 88" fill="none" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 13. CILS : deux, fins, au coin haut-arrière — la petite sœur de Rarity,
       pas Rarity. -->
  <g transform="${OEIL_PROCHE_P} scale(${OEIL_P})">${cilsHauts(d, 2, 2.1 / OEIL_P)}</g>

  </g>
</svg>`;
};
