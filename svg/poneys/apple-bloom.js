// ───────────────────────────────────────────────────────────────────────────────
// Apple Bloom — POULICHE terrestre, la petite dernière de la famille Apple.
//
// RÉFÉRENCE PLEIN PIED (obligatoire, cf. NOTES.md § « Toute figure se dessine
// contre une référence ») : `refs/apple-bloom-plein-pied.png`
//   https://static.wikia.nocookie.net/mlp/images/4/40/Apple_Bloom_id_S01E12.png
// Complément de visage : `refs/apple-bloom-id.png` (Apple_Bloom_ID_S6E4.png).
//
// Gabarit de pouliche de `_commun.js` (`CORPS_POULICHE`, `pattePouliche`,
// `OREILLE_P`, `CADRE_MINI`) : tête canonique, tronc court et creux, gorge de
// 30 unités, pattes visibles de 46 unités, sabots à y 218 avant cadrage.
//
// FLANC VIERGE : `cutieMark: null` dans `js/data.js`, et c'est tout le sujet du
// personnage — pas de marque de beauté sur la croupe, pas de médaillon.
//
// ── EXPRESSION SIGNATURE, relevée sur la référence : ENJOUÉE ET CURIEUSE.
//    Aucune paupière rabattue ; l'œil AGRANDI de 15 % et DESCENDU de 4,6 unités
//    (0,655 de hauteur de tête en largeur contre 0,53 chez l'adulte, centre à
//    0,62 de la hauteur contre 0,48) ; petit RIRE OUVERT dominé par le blanc des
//    dents ; trois cils au coin arrière.
//    CORRECTION APPORTÉE PAR LA RÉFÉRENCE : Apple Bloom n'a PAS de taches de
//    rousseur. Le premier jet lui en donnait « parce qu'elle est de la famille
//    Apple » — ses joues sont unies sur les deux références.
// ───────────────────────────────────────────────────────────────────────────────
import {
  ton, derives, OREILLE_P, CORPS_POULICHE, membresFondPouliche,
  membresProchesPouliche, naseauPouliche, oeil, OEIL_PROCHE_P, OEIL_LOIN_P,
  OEIL_P, CADRE_MINI, paupieres, jouePouliche, cilsHauts,
} from "./_commun.js";

// ── QUEUE de pouliche : courte, et sa pointe s'ENROULE vers l'avant. C'est la
//    boucle qui dit « jeune » — une queue en vague tombante fait une jument.
const QUEUE = "M152 128C136 132 124 142 117 156"
  + "C110 170 109 184 113 196"
  + "C118 207 128 213 138 210"
  + "C148 207 152 197 149 188"
  + "C146 180 137 177 130 181"
  + "C124 184 122 190 125 196"
  + "C119 194 116 188 117 180"
  + "C119 168 125 156 134 147"
  + "C141 140 148 133 152 128Z";

// ── FRANGE. Sur la référence, la crinière NE MORD PAS sur l'œil : il reste une
//    bande de robe nue de 8 à 10 unités entre la ligne de cheveux et le bord
//    haut de l'amande, et c'est là que poussent les cils. Le bord bas est donc
//    remonté (pointe à (207,62), puis 218 → y 54, 232 → y 46), en gardant deux
//    petites dents — un arc lisse au ras du crâne ferait un bonnet.
const FRANGE = "M196 48C199 54 202 58 205 61 206 62 207 62 208 62"
  + "C209 60 210 58 211 57"
  + "C212 59 213 61 214 61"
  + "C219 55 225 49 232 44 240 38 248 34 255 33"
  + "C258 32 259 30 258 27"
  + "C252 24 241 22 230 23 215 25 201 38 196 48Z";
// ── MÈCHE d'encolure : une seule, en POINTE (188,126). Les crinières de
//    pouliches sont simples — deux mèches et des boucles feraient une adulte.
const MECHE = "M200 72C194 84 189 98 187 112 186 118 187 122 188 126"
  + "C193 121 198 116 201 110"
  + "C203 102 205 92 209 84"
  + "C211 79 213 75 214 72"
  + "C210 69 204 69 200 72Z";

// ── LE NŒUD. Sur la référence il est ÉNORME — aussi haut que la tête — et posé
//    à l'arrière du crâne. En vue de trois quarts une de ses deux boucles passe
//    derrière la tête : il en reste une haute et une arrière, tirées à 25 % de
//    plus que le premier jet. Il est dessiné DANS la crinière (couche 12), et
//    l'oreille passe par-dessus en 12 ter — le nœud est derrière la tête.
//    Cotes contraintes par la fenêtre de portrait (x 171 → 295, y 6 → 130,
//    APRÈS le cadrage `CADRE_MINI` : y_final = 1,15·y − 8,5) : la pointe haute
//    reste à y 16 (→ 9,9 final) et la pointe arrière à x 178 (→ 171,7 final).
const BOUCLE_H = "M206 44C202 36 196 26 193 19 189 11 182 13 183 25"
  + "C184 37 192 46 203 52Z";
const BOUCLE_B = "M203 49C196 45 189 44 185 45 180 47 179 55 185 60"
  + "C192 64 199 60 205 55Z";

export default (c) => {
  const d = derives(c);
  const { M0, TRAIT, CRIN_T, CRIN_S2, CRIN_H, BOUCHE, LANGUE } = d;
  const NOEUD = c.noeud ?? "#f27a9c";      // gardé : la clé reste optionnelle
  const NOEUD_T = ton(NOEUD, .95, -.16);
  const NOEUD_H = ton(NOEUD, .9, .08);
  const oe = oeil(c, d);

  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img">
  <g ${CADRE_MINI} stroke-linejoin="round" stroke-linecap="round">

  <!-- 1. QUEUE courte à pointe enroulée. Crinière MONOCHROME : reflet CRIN_H et
       séparations renforcées CRIN_S2 à la place des bandes du template. -->
  <path d="${QUEUE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <path d="M143 143C133 152 126 165 124 180 122 192 126 200 134 202" fill="none"
        stroke="${CRIN_H}" stroke-width="9"/>
  <g fill="none" stroke="${CRIN_S2}" stroke-width="1.6">
    <path d="M147 138C136 148 129 162 127 178 125 191 129 201 138 203"/>
    <path d="M136 150C128 160 122 172 121 184 120 194 123 201 130 204"/>
  </g>
  <path d="${QUEUE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <!-- 2. MEMBRES DU FOND, gabarit pouliche -->
  ${membresFondPouliche(d)}

  <!-- 3. (l'OREILLE passe en 12 ter : le nœud et la mèche couvrent sa zone.) -->

  <!-- 4. CORPS DE POULICHE + tête canonique : une seule silhouette -->
  <path d="${CORPS_POULICHE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 5. PAS DE MARQUE DE BEAUTÉ : le flanc d'Apple Bloom est vierge. -->

  <!-- 6. MEMBRES PROCHES, gabarit pouliche -->
  ${membresProchesPouliche(c, d)}

  <!-- 7. NASEAU + PETIT RIRE (14 × 12), dans la fenêtre de bouche de la tête de
       pouliche : x 256 → 272, y 84 → 96 — entre le coin avant de l'amande
       (255 ; 91) et l'encoche du museau (265,87) → (272,94).
       Premier essai écarté : aplat rose + langue, comme la bouche ouverte du
       template. À cette taille l'aplat #c7096e se lit comme une tache de rouge
       à lèvres. Le rire de pouliche est DOMINÉ PAR LE BLANC des dents. -->
  ${naseauPouliche(d)}
  <path d="M257 85C261 81.5 266 82.5 269 86.5
           C270 90.5 266.5 95 261.5 95
           C256 95 254 90 257 85Z"
        fill="${BOUCHE}" stroke="${TRAIT}" stroke-width="2.3"/>
  <path d="M258.6 84.8C261.8 82.2 265.4 83 267.6 86.2
           C265.8 88.2 261.8 88.8 258.4 87.6Z" fill="#fff"/>

  <!-- 8. YEUX de pouliche : amande agrandie de 15 %, descendue de 4,6 -->
  ${oe(`${OEIL_PROCHE_P} scale(${OEIL_P})`)}${oe(`${OEIL_LOIN_P} scale(${OEIL_P})`)}

  <!-- 8 bis. (AUCUNE tache de rousseur : relevé de la référence.) -->

  <!-- 9. PAUPIÈRES du clignement, calées sur l'amande de pouliche -->
  ${paupieres(c, OEIL_P, c.robe, OEIL_PROCHE_P, OEIL_LOIN_P)}

  <!-- 10. contour de la joue, par-dessus l'œil lointain -->
  ${jouePouliche(d)}

  <!-- 11. (ni corne ni aile : poney terrestre) -->

  <!-- 12. CRINIÈRE : frange bombée à pointes, mèche d'encolure en pointe -->
  <path d="${FRANGE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <path d="M201 42C209 36 220 31 231 31 241 32 249 34 253 37" fill="none"
        stroke="${CRIN_H}" stroke-width="6"/>
  <g fill="none" stroke="${CRIN_S2}" stroke-width="1.5">
    <path d="M201 47C209 39 220 34 231 33"/>
    <path d="M206 56C213 47 222 40 231 37"/>
  </g>
  <path d="${FRANGE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <path d="${MECHE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <path d="M200 80C195 92 192 104 191 116 191 121 192 124 193 126" fill="none"
        stroke="${CRIN_H}" stroke-width="7"/>
  <g fill="none" stroke="${CRIN_S2}" stroke-width="1.5">
    <path d="M206 78C200 90 196 102 195 114"/>
    <path d="M211 76C206 88 202 98 201 108"/>
  </g>
  <path d="${MECHE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <!-- 12 bis. LE NŒUD ROSE, deux boucles et un cœur. Le cœur est posé APRÈS les
       boucles : c'est lui qui masque leurs deux racines, sinon on voit la
       couture des deux pétales. -->
  <g stroke="${NOEUD_T}" stroke-width="3">
    <path d="${BOUCLE_H}" fill="${NOEUD}"/>
    <path d="${BOUCLE_B}" fill="${NOEUD}"/>
  </g>
  <g fill="none" stroke="${NOEUD_H}" stroke-width="4">
    <path d="M198 43C194 35 190 27 187 22"/>
    <path d="M200 51C194 47 189 46 185 47"/>
  </g>
  <circle cx="205" cy="47" r="6.5" fill="${NOEUD}" stroke="${NOEUD_T}" stroke-width="3"/>

  <!-- 12 ter. OREILLE DE POULICHE (courte) par-dessus le nœud, puis le PLI
       INTERNE retracé à la main — c'est le contour du cou qui le dessinait. -->
  <path d="${OREILLE_P}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.2"/>
  <path d="M202 62C200 70 200 78 201 88" fill="none" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 13. CILS au coin HAUT-arrière, en éventail — c'est le relevé de la
       référence, et c'est ce qui distingue un visage de pouliche du visage de
       Twilight (dont la tête est relevée vers le ciel, cils au coin bas). -->
  <g transform="${OEIL_PROCHE_P} scale(${OEIL_P})">${cilsHauts(d, 3, 2.2 / OEIL_P)}</g>

  </g>
</svg>`;
};
