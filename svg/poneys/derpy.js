// ───────────────────────────────────────────────────────────────────────────────
// Derpy — pégase factrice. Structure standard + aile repliée, dérivée du TEMPLATE
// CANON `twilight.js` via `_commun.js`.
//
// RÉFÉRENCES PLEIN PIED (règle « aucun visage ne se dessine de mémoire ») :
//   `File:Derpy ID S02E14.png` — https://mlp.fandom.com/wiki/File:Derpy_ID_S02E14.png
//     (283 × 279, debout, de trois quarts, tête à gauche ; `refs/w3-derpy-2.png`)
//   `File:Derpy id.png` — https://mlp.fandom.com/wiki/File:Derpy_id.png
//     (340 × 340, en vol, bouche ouverte ; `refs/w3-derpy-pp.png`)
//
// SA SIGNATURE — et le seul endroit où il faut être précis, sous peine de la
// rendre méchante ou idiote : ses deux pupilles ne regardent pas le même point.
// Le relevé donne, sur les deux références, l'œil PROCHE avec la pupille HAUTE
// (elle laisse voir du blanc en dessous) et l'œil LOINTAIN avec la pupille
// BASSE. Ce n'est ni un œil révulsé ni un œil vide : l'iris reste entier dans
// l'amande, seulement décalé, et il est légèrement RÉTRÉCI (.88) pour que le
// blanc apparaisse tout autour — c'est le mécanisme de l'œil écarquillé de
// Pinkie Pie, mis au service d'un regard divergent.
// Ce qui empêche la lecture moqueuse, et qui compte autant que le décalage :
// une bouche franchement RIEUSE (coin arrière relevé, bande de dents) et aucune
// paupière rabattue. Un œil divergent sous une paupière lourde donne l'air
// endormi ; sous un sourcil il donne l'air hébété. Derpy n'a ni l'un ni l'autre.
// ───────────────────────────────────────────────────────────────────────────────
import {
  ton, derives, OREILLE, CORPS, membresFond, membresProches, naseau,
  sourireRavi, oeil, OEIL_PROCHE, OEIL_LOIN, paupieres, joue, cilsCoinHaut,
  museauLisse, ailePliee,
} from "./_commun.js";

// ── FRANGE en MÈCHES POINTUES. Sur les deux références la crinière de Derpy
//    n'est pas une masse à bord lisse : elle retombe sur le front en deux ou
//    trois pointes franches. Bornes dures : bord bas au-dessus de y 56 entre
//    x 213 et x 230 (les cils du coin haut y vivent), et rien sous y 62 au-delà
//    de x 224 (amande de l'œil proche 216 → 255 / 61 → 94). Les deux pointes
//    sont donc calées à x 235 et x 245, hors de la zone des cils.
const FRANGE = "M262 40"
  + "C257 48 251 53 245 50"
  + "C240 54 233 53 229 48"
  + "C221 50 210 49 204 45"
  + "C199 36 202 25 211 18"
  + "C221 12 234 11 245 15"
  + "C255 20 261 30 262 40Z";

// ── MÈCHE D'ENCOLURE : masse blonde qui descend derrière la tête et s'achève en
//    pointe au poitrail (pas en crochet : la crinière de Derpy tombe droit).
const MECHE = "M205 42"
  + "C193 52 185 70 184 92"
  + "C183 112 187 132 195 148"
  + "C199 156 202 162 204 168"
  + "C208 158 211 148 212 136"
  + "C213 120 210 104 206 90"
  + "C203 78 202 60 206 46Z";

// ── QUEUE : grande touffe souple, la plus large du livre après celle de Pinkie.
//    Elle s'évase du haut vers le bas au lieu de se pincer (relevé : la queue de
//    Derpy est un plumeau, sans ligature).
const QUEUE = "M143 124"
  + "C122 130 104 146 94 168"
  + "C84 190 79 214 80 236"
  + "C84 244 91 244 96 238"
  + "C100 246 108 248 113 242"
  + "C119 248 126 245 129 238"
  + "C133 220 136 198 139 178"
  + "C142 158 146 138 152 126Z";

// ── BULLES de la marque de beauté. Sept bulles claires (relevé sur la référence
//    en vol, où le flanc est entièrement dégagé) : quatre grandes en losange et
//    trois petites entre elles. Le liseré et le REFLET en croissant sont ce qui
//    les fait lire comme des bulles et non comme des pois.
const BULLE = "#e6e9f2";
const BULLE_T = "#a8afc6";
const bulle = (x, y, r) => `<g transform="translate(${x} ${y})">
    <circle r="${r}" fill="${BULLE}" stroke="${BULLE_T}" stroke-width="${r * .22}"/>
    <path d="M${-r * .55} ${-r * .2}C${-r * .6} ${-r * .62} ${-r * .25} ${-r * .8} ${r * .05} ${-r * .72}"
          fill="none" stroke="#fff" stroke-width="${r * .3}" stroke-linecap="round"/>
  </g>`;
const BULLES = (x, y, e) => bulle(x - 10 * e, y - 8 * e, 6.4 * e)
  + bulle(x + 9 * e, y - 9 * e, 5.2 * e)
  + bulle(x - 11 * e, y + 9 * e, 5.6 * e)
  + bulle(x + 8 * e, y + 8 * e, 6.8 * e)
  + bulle(x, y - 1 * e, 3.4 * e)
  + bulle(x - 2 * e, y + 15 * e, 2.6 * e)
  + bulle(x + 15 * e, y + 1 * e, 2.8 * e);

export default (c) => {
  const d = derives(c);
  const { M0, TRAIT, CRIN_T, CRIN_S2, CRIN_H } = d;
  // Crayon à cils : `CRAYON` dérive d'un œil JAUNE D'OR et en tire un brun doré
  // encore franchement coloré. Sur les références les cils sont noirs.
  const CRAYON = ton(c.yeux, .3, -.52);
  const dd = { ...d, PUPILLE: CRAYON };
  // LES DEUX REGARDS. Le décalage est en unités de l'amande (39 × 33) : ±5 en y,
  // soit un sixième de la hauteur d'œil — assez pour être net en vignette de
  // galerie, trop peu pour que la pupille touche le bord. Le repère de l'œil
  // lointain étant en miroir (`scale(-.41 .81)`), son dx s'y lit à l'envers ;
  // seul le dy compte vraiment pour lui, et c'est celui qui porte la divergence.
  const oeProche = oeil(c, dd, { iris: .88, regard: [1.6, -5] });
  const oeLoin = oeil(c, dd, { iris: .88, regard: [-2, 6] });

  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img">
  <g stroke-linejoin="round" stroke-linecap="round">

  <!-- 1. QUEUE en plumeau. Crinière MONOCHROME : pas de bandes de couleur, mais
       un reflet CRIN_H et des séparations renforcées CRIN_S2. -->
  <path d="${QUEUE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <path d="M134 132C117 146 104 168 96 192 89 212 87 226 88 238" fill="none"
        stroke="${CRIN_H}" stroke-width="9"/>
  <g fill="none" stroke="${CRIN_S2}" stroke-width="1.6">
    <path d="M139 128C120 142 106 164 98 188 91 208 88 226 89 240"/>
    <path d="M148 130C133 147 122 170 117 192 112 212 111 228 112 240"/>
  </g>
  <path d="${QUEUE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <!-- 2. MEMBRES DU FOND -->
  ${membresFond(d)}

  <!-- 4. CORPS + COU + TÊTE + MUSEAU : une seule silhouette -->
  <path d="${CORPS}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 5. MARQUE DE BEAUTÉ : les sept bulles, à GAUCHE de x 158 — l'aile repliée
       occupe le flanc de x 158 à x 209 (cf. _commun.js). -->
  ${BULLES(138, 152, .82)}

  <!-- 5 bis. AILE REPLIÉE sur le flanc (relevé sur la référence debout : l'aile
       de Derpy est rangée le long du corps, pas déployée). -->
  ${ailePliee(c, d)}

  <!-- 6. MEMBRES PROCHES -->
  ${membresProches(c, d)}

  <!-- 6 ter. MUSEAU LISSE : sans lui l'encoche de bouche déborde derrière la
       bouche ouverte et le chanfrein se termine en marche d'escalier. -->
  ${museauLisse(c, d)}

  <!-- 7. NASEAU + GRAND SOURIRE RAVI, coin arrière relevé, bande de dents.
       C'est lui qui empêche le regard divergent de se lire comme un regard
       hébété : sous une bouche fermée, les deux pupilles décalées font un
       personnage absent ; sous un rire, elles font un personnage joyeux. -->
  ${naseau(d)}${sourireRavi(d, 1)}

  <!-- 8. YEUX DIVERGENTS — sa signature. Iris rétréci à .88 dans les deux yeux
       (le blanc apparaît tout autour), pupille HAUTE côté proche et BASSE côté
       lointain. L'amande, elle, n'est pas touchée : c'est la règle d'or, le
       groupe du clignement est calé dessus. -->
  ${oeProche(OEIL_PROCHE)}${oeLoin(OEIL_LOIN)}

  <!-- 8 bis. (AUCUNE paupière rabattue, et c'est délibéré : une paupière sur un
       œil divergent donne l'air endormi.) -->

  <!-- 9. PAUPIÈRES du clignement -->
  ${paupieres(c)}

  <!-- 10. contour de la joue, par-dessus l'œil lointain -->
  ${joue(d)}

  <!-- 11. (pas de corne : pégase) -->

  <!-- 12. CRINIÈRE : frange à mèches pointues + masse d'encolure -->
  <path d="${FRANGE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <path d="M256 26C245 20 231 19 220 23 212 27 207 33 206 40" fill="none"
        stroke="${CRIN_H}" stroke-width="7"/>
  <g fill="none" stroke="${CRIN_S2}" stroke-width="1.5">
    <path d="M254 33C243 28 231 28 222 32 215 35 211 40 210 45"/>
    <path d="M247 44C242 47 236 48 231 47"/>
  </g>
  <path d="${FRANGE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <path d="${MECHE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <path d="M204 54C196 66 191 84 191 104 191 124 196 142 202 158" fill="none"
        stroke="${CRIN_H}" stroke-width="7"/>
  <g fill="none" stroke="${CRIN_S2}" stroke-width="1.6">
    <path d="M199 56C191 70 187 88 188 108 189 128 194 146 201 160"/>
    <path d="M208 62C202 76 199 92 200 110 201 128 204 144 208 156"/>
  </g>
  <path d="${MECHE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <!-- 12 bis. OREILLE, après la crinière : la masse d'encolure couvre toute sa
       zone (181 → 205, 56 → 101), et un contour retracé ne découpe rien. Le pli
       interne, normalement creusé par le contour du corps, est retracé. -->
  <path d="${OREILLE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.2"/>
  <path d="M202 62C200 74 200 86 202 100" fill="none" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 13. CILS AU COIN HAUT-ARRIÈRE : trois, courts (relevé sur la référence
       debout, où ils sortent bien du coin haut). -->
  ${cilsCoinHaut(d, 3, 2.4, 1, OEIL_PROCHE, 1, CRAYON)}

  </g>
</svg>`;
};

export const cutieMark = (c) => `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" role="img">
  <circle cx="30" cy="30" r="30" fill="${c.robe}"/>
  ${BULLES(29, 28, 1.25)}
</svg>`;
