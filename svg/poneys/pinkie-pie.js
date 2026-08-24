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
// ── EXPRESSION SIGNATURE, REFAITE SUR RÉFÉRENCE PLEIN PIED (24/08/2026) :
//    `File:Pinkie Pie ID S4E11.png`
//    — https://mlp.fandom.com/wiki/File:Pinkie_Pie_ID_S4E11.png
//    (complément d'expression : `refs/pinkie-pie-grin.png`).
//    Le grand rire et les yeux écarquillés restent — la trouvaille de la passe
//    expressions tient toujours : un œil écarquillé ne s'obtient pas en
//    agrandissant l'amande (ce qui décalerait le clignement) mais en
//    RÉTRÉCISSANT l'iris pour qu'il se décolle du bord haut. Trois cotes ont
//    changé au relevé :
//      · le LISERÉ de l'amande et la PUPILLE sortaient tous les deux de
//        `PUPILLE`, qui vaut un bleu MOYEN sur un œil bleu clair : les trois
//        bleus se confondaient et l'œil se lisait comme une spirale bleue. Sur
//        la référence, liseré et pupille sont NOIRS, l'iris seul est bleu ;
//      · les CILS partaient du coin bas, en bleu vif : trois griffures sur la
//        joue. Coin HAUT-arrière et noirs, comme sur la référence ;
//      · les BOUCLES étaient trop nombreuses et trop petites (14 disques de
//        rayon 10 à 13 sur la seule tête) : au comparateur la crinière se lisait
//        comme un chou-fleur. La référence en montre moitié moins, deux fois
//        plus grosses.
import {
  ton, derives, OREILLE, CORPS, membresFond, membresProches, naseau,
  grandRire, oeil, OEIL_PROCHE, OEIL_LOIN, paupieres, joue, cilsCoinHaut,
  museauLisse, etincelle,
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
// REFONTE : MOINS DE BOUCLES, PLUS GROSSES. Le premier jet en posait 14 sur la
// tête, de rayon 10 à 13 ; à la taille de la vignette de galerie elles se
// fondaient en un relief régulier de petits lobes — un chou-fleur. Le relevé
// donne, sur la hauteur de tête, des boucles de 0,21 à 0,23 (ici rayon 15 à 17)
// et QUATRE par rang, pas six. Deuxième tour nécessaire : à cinq boucles de
// rayon 13-15 la couronne se lisait encore comme une guirlande de perles autour
// du crâne. Ce qui fait la crinière de Pinkie, ce sont peu de GROS lobes. Les deux rangs restent : une seule file de boucles
// fait une chaîne de perles, pas un volume.
// Bornes de composition, inchangées et revérifiées : aucune boucle ne descend
// sous y 58 dans la bande x 216 → 255 (l'amande de l'œil proche), la boucle la
// plus haute culmine à y 8 (la fenêtre de portrait commence à y 6), et la
// dernière boucle de front reste à x < 262 pour ne pas avaler l'œil LOINTAIN
// (x 258 → 274 / y 52 → 79).
const BOUCLES_TETE = [
  [193, 44, 15], [211, 26, 17], [239, 26, 16],   // rang extérieur, du crâne
  [258, 40, 11],                                 //   vers le front
  [188, 66, 14], [204, 44, 16], [228, 32, 17],   // rang intérieur
  [250, 42, 13],
  [180, 84, 13], [181, 100, 12],                 // la nuque
];
const BOUCLES_COU = [
  [185, 108, 13], [190, 126, 14], [191, 144, 13], [194, 162, 12],
  [201, 116, 11], [204, 136, 12], [203, 156, 11],
];
const BOUCLES_QUEUE = [
  [124, 142, 13], [110, 154, 15], [98, 172, 16],
  [94, 194, 16], [100, 216, 15], [114, 234, 14],
  [116, 162, 14], [108, 186, 15], [110, 210, 14],
];

// ── BALLON de la marque de beauté : goutte inversée + nœud + ficelle. Le jaune
//    et le bleu sont des constantes documentées — la marque de Pinkie ne dérive
//    d'aucune couleur de sa robe.
// ── SILHOUETTE : on garde celle du template, et c'est un choix documenté.
//    Piste essayée et ÉCARTÉE : élargir, pour Pinkie seule, l'encoche de bouche
//    de `CORPS` — (271,98) → (279,106) devenant (265 ; 97,5) → (276,5 ; 109) —
//    pour loger un rire plus grand dans le museau même. Résultat : le bout du
//    museau se lit comme MORDU, la nouvelle lèvre inférieure fait une marche, et
//    Pinkie perd son profil de poney. La leçon est que l'encoche de bouche du
//    template n'est pas une réserve de place, c'est la forme du museau : le
//    grand rire doit se contenter de la joue, et c'est sa BANDE DE DENTS, pas sa
//    taille, qui le rend spectaculaire.

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
  // Iris à 84 % et poussé vers le bas-avant : il quitte le bord haut de
  // l'amande, du blanc s'ouvre au-dessus, et le regard pétille. Plus une
  // étincelle supplémentaire au coin haut de chaque œil.
  // ŒIL À CERNE NOIR : `PUPILLE` (un bleu moyen sur un iris bleu clair) servait
  // à la fois de liseré d'amande et de pupille, si bien que les trois bleus se
  // confondaient. La référence donne un liseré et une pupille NOIRS autour d'un
  // iris bleu clair — d'où `CRAYON` passé en `PUPILLE` pour cet œil.
  const oe = oeil(c, { ...d, PUPILLE: d.CRAYON }, {
    iris: .84, regard: [1.6, 3],
    sus: etincelle(-9.5, -10, .3) + etincelle(12.5, -4.5, .22),
  });

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

  <!-- 6 ter. MUSEAU LISSE. Le grand rire s'étalant sur la JOUE, l'encoche de
       bouche de la silhouette restait vide et le bout du museau se lisait comme
       un bec (cf. _commun.js). Elle est rabotée de 10 unités à 3. -->
  ${museauLisse(c, d)}

  <!-- 7. NASEAU + GRAND RIRE. Il s'étale vers l'ARRIÈRE, sous la joue, et non
       vers l'avant : même museau raboté, la lèvre avant ne peut pas dépasser
       x 274. Sa rangée de dents est ce qui le distingue du sourire ouvert du
       template. -->
  ${naseau(d)}${grandRire(d)}

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

  <!-- 13. CILS AU COIN HAUT-ARRIÈRE, noirs (convention de la vague 2, désormais
       partagée). Au coin bas et en bleu vif, ils faisaient trois griffures. -->
  ${cilsCoinHaut(d, 3, 2.4)}

  </g>
</svg>`;
};

export const cutieMark = (c) => `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" role="img">
  <circle cx="30" cy="30" r="30" fill="${c.robe}"/>
  ${TROIS_BALLONS(30, 30, 1.05)}
</svg>`;
