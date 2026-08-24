// ───────────────────────────────────────────────────────────────────────────────
// Pinkie Pie — poney terrestre. Dérivée du TEMPLATE CANON `twilight.js` via
// `_commun.js` (carcasse, œil, museau, oreille, membres).
//
// Singularité : la crinière n'est PAS faite de mèches mais de BOUCLES. Chaque
// boucle est un disque plein, contour compris, posé de l'arrière vers l'avant ;
// c'est le contour de chaque disque qui reste visible sur ses voisins qui donne
// la masse bouclée. À l'intérieur, une volute (`CRIN_S2`) et un reflet en
// croissant (`CRIN_H`) — sans eux les disques se lisent comme des bulles de
// savon et pas comme des cheveux.
// Crinière monochrome : ni bandes de couleur ni contour clair possibles.
// Ni corne ni ailes. Marque de beauté = trois ballons.
// ───────────────────────────────────────────────────────────────────────────────
import {
  ton, derives, OREILLE, CORPS, membresFond, membresProches, museau,
  oeil, OEIL_PROCHE, OEIL_LOIN, paupieres, joue, cils,
} from "./_commun.js";

// ── BOUCLES. Les listes sont ordonnées de l'ARRIÈRE vers l'AVANT du dessin.
//    Contraintes de composition relevées sur la carcasse :
//      · l'œil proche occupe x 216 → 255, y 61 → 94 : aucune boucle de frange
//        ne descend sous y 58 dans cette bande ;
//      · la boucle la plus haute culmine à y 13, la fenêtre de portrait
//        commence à y 6 : deux unités de marge, pas plus ;
//      · les boucles de queue restent à x < 145 pour laisser la croupe à la
//        marque de beauté.
// Chaque masse est faite de DEUX rangs : le rang extérieur d'abord, le rang
// intérieur par-dessus. Une seule file de boucles donne une chaîne de perles,
// pas un volume.
const BOUCLES_TETE = [
  [192, 44, 11], [200, 30, 11], [214, 22, 12],   // rang extérieur, du crâne
  [232, 20, 12], [248, 28, 11], [258, 42, 10],   //   vers le front
  [188, 60, 12], [196, 46, 12], [208, 36, 13],   // rang intérieur
  [224, 32, 13], [240, 36, 12], [251, 47, 10],
  [180, 76, 12], [180, 92, 12],                  // la nuque
];
const BOUCLES_COU = [
  [186, 106, 12], [190, 122, 13], [192, 138, 13],
  [190, 154, 12], [194, 170, 11],
  [200, 112, 11], [204, 130, 12], [203, 148, 12], [202, 164, 11],
];
const BOUCLES_QUEUE = [
  [124, 142, 12], [112, 152, 14], [100, 168, 15],
  [94, 188, 15], [94, 208, 15], [102, 226, 14], [116, 238, 13],
  [118, 158, 13], [110, 180, 14], [108, 200, 14], [114, 220, 13],
];

// ── BALLON de la marque de beauté : goutte inversée + nœud + ficelle. Le jaune
//    et le bleu sont des constantes documentées — la marque de Pinkie ne dérive
//    d'aucune couleur de sa robe.
const BALLON = "M0 -13C6 -13 10 -8 10 -2C10 5 5 12 0 15"
  + "C-5 12-10 5-10 -2C-10 -8-6 -13 0 -13Z";
const JAUNE = "#f7d54e";
const BLEU = "#86cfee";
const ballon = (x, y, e, col) => `<g transform="translate(${x} ${y}) scale(${e})">
    <path d="M0 14C2 18-2 21 0 25" fill="none" stroke="${ton(col, .9, -.24)}" stroke-width="2"/>
    <path d="${BALLON}" fill="${col}" stroke="${ton(col, .9, -.24)}" stroke-width="2.2"/>
    <path d="M-3 13L3 13 0 17Z" fill="${ton(col, .9, -.24)}"/>
    <ellipse cx="-4" cy="-6" rx="2.4" ry="3.6" fill="#fff" fill-opacity=".55"
             transform="rotate(-20 -4 -6)"/>
  </g>`;
const TROIS_BALLONS = (x, y, e) =>
  ballon(x - 16 * e, y + 5 * e, e, BLEU)
  + ballon(x + 15 * e, y + 2 * e, e, BLEU)
  + ballon(x, y - 11 * e, e, JAUNE);

export default (c) => {
  const d = derives(c);
  const { M0, TRAIT, CRIN_T, CRIN_S2, CRIN_H } = d;
  const oe = oeil(c, d);

  // Une boucle : le disque, sa volute intérieure, son reflet.
  const boucle = ([x, y, r]) => `<g>
      <circle cx="${x}" cy="${y}" r="${r}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
      <path d="M${(x - r * .1).toFixed(1)} ${(y - r * .58).toFixed(1)}
               C${(x + r * .52).toFixed(1)} ${(y - r * .5).toFixed(1)}
                ${(x + r * .56).toFixed(1)} ${(y + r * .34).toFixed(1)}
                ${x} ${(y + r * .5).toFixed(1)}
               C${(x - r * .46).toFixed(1)} ${(y + r * .48).toFixed(1)}
                ${(x - r * .5).toFixed(1)} ${y}
                ${(x - r * .08).toFixed(1)} ${(y - r * .12).toFixed(1)}"
            fill="none" stroke="${CRIN_S2}" stroke-width="2"/>
      <path d="M${(x - r * .72).toFixed(1)} ${(y - r * .28).toFixed(1)}
               C${(x - r * .64).toFixed(1)} ${(y - r * .68).toFixed(1)}
                ${(x - r * .22).toFixed(1)} ${(y - r * .86).toFixed(1)}
                ${(x + r * .16).toFixed(1)} ${(y - r * .8).toFixed(1)}"
            fill="none" stroke="${CRIN_H}" stroke-width="${(r * .3).toFixed(1)}"/>
    </g>`;
  const boucles = (l) => l.map(boucle).join('');

  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img">
  <g stroke-linejoin="round" stroke-linecap="round">

  <!-- 1. QUEUE : une grappe de boucles sous la croupe -->
  ${boucles(BOUCLES_QUEUE)}

  <!-- 2. MEMBRES DU FOND -->
  ${membresFond(d)}

  <!-- 4. CORPS + COU + TÊTE + MUSEAU : une seule silhouette -->
  <path d="${CORPS}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 5. MARQUE DE BEAUTÉ : trois ballons sur la croupe -->
  ${TROIS_BALLONS(154, 150, .62)}

  <!-- 6. MEMBRES PROCHES -->
  ${membresProches(c, d)}

  <!-- 7. NASEAU + BOUCHE (grand sourire ouvert : c'est son expression par défaut) -->
  ${museau(d)}

  <!-- 8. YEUX -->
  ${oe(OEIL_PROCHE)}${oe(OEIL_LOIN)}

  <!-- 9. PAUPIÈRES -->
  ${paupieres(c)}

  <!-- 10. contour de la joue, par-dessus l'œil lointain -->
  ${joue(d)}

  <!-- 11. (ni corne ni aile : poney terrestre) -->

  <!-- 12. CRINIÈRE : boucles de la nuque puis boucles de la tête -->
  ${boucles(BOUCLES_COU)}
  ${boucles(BOUCLES_TETE)}

  <!-- 12 bis. OREILLE, ici et pas en couche 3 : les boucles de nuque couvrent
       toute la zone de l'oreille (181 → 205, 56 → 101) et un disque plein ne se
       rattrape pas. L'oreille proche est de toute façon en avant des boucles
       rejetées derrière la tête. Le pli interne, dessiné par le contour du corps
       en couche 4, est retracé à la main juste après. -->
  <path d="${OREILLE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.2"/>
  <path d="M202 62C200 74 200 86 202 100" fill="none" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 13. CILS -->
  ${cils(d)}

  </g>
</svg>`;
};

export const cutieMark = (c) => `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" role="img">
  <circle cx="30" cy="30" r="30" fill="${c.robe}"/>
  ${TROIS_BALLONS(30, 30, 1.05)}
</svg>`;
