// ───────────────────────────────────────────────────────────────────────────────
// Cheerilee — poney terrestre, maîtresse de l'école de Poneyville. Structure
// standard, dérivée du TEMPLATE CANON `twilight.js` via `_commun.js`.
//
// RÉFÉRENCE PLEIN PIED (règle « aucun visage ne se dessine de mémoire ») :
//   `File:Cheerilee ID S2E17.png` — https://mlp.fandom.com/wiki/File:Cheerilee_ID_S2E17.png
//   (475 × 494, trois quarts avant, tête à droite ; `refs/w3-cheerilee-pp.png`,
//   gros plans `refs/zoom-cheerilee-tete.png` et `zoom-cheerilee-marque.png`).
//
// Ce que la référence a donné, et qui ne s'aurait pas devinée :
//   · sa crinière est BICOLORE PAR BANDES, et les bandes claires sont DEUX
//     rubans nets dans la masse rose, pas un dégradé — c'est sa signature ;
//   · la masse de tête part en une grosse VOLUTE VERS L'AVANT au-dessus du
//     front, et non en frange retombante : c'est ce qui la fait lire « adulte
//     coiffée » et pas « pouliche à frange » ;
//   · l'œil est GRAND et grand ouvert, iris vert clair, gros noyau de pupille,
//     trois cils courts au coin haut-arrière ;
//   · sa marque de beauté n'est pas « trois fleurs » mais trois fleurs à
//     HUIT PÉTALES pâles, cœur crème, portant chacune un VISAGE SOURIANT
//     (deux yeux + une bouche). Sans le visage ce sont trois marguerites
//     quelconques ; c'est le sourire qui fait la marque de la maîtresse.
// ───────────────────────────────────────────────────────────────────────────────
import {
  ton, derives, OREILLE, CORPS, membresFond, membresProches, naseau,
  sourireDoux, oeil, OEIL_PROCHE, OEIL_LOIN, paupieres, paupiereHaute,
  joue, cilsCoinHaut, museauLisse,
} from "./_commun.js";

// ── MASSE DE TÊTE — UNE SEULE PIÈCE, et c'est le point qui a demandé deux tours.
//    Bornes dures reprises de la vague 1 : bord bas au-dessus de y 56 entre
//    x 213 et x 230 (les trois cils du coin haut occupent x 215 → 228 /
//    y 57,7 → 66,4), aucun point sous y 62 au-delà de x 224 (l'amande de l'œil
//    proche est 216 → 255 / 61 → 94), et sommet pas au-dessus de y 11 (la fenêtre
//    de portrait commence à y 6, et il faut ~5 unités de marge — cf. le chapeau
//    d'Applejack, qui se lisait comme coupé dans le mini-portrait de la carte).
//    Deux erreurs corrigées ici :
//      · bord bas en simple arc = BÉRET (piège documenté). Il faut la POINTE
//        vers le bas, ici au front AVANT (250 ; 57), là où la référence montre
//        la mèche qui mord sur le sourcil ;
//      · le rouleau avant dessiné en pièce SÉPARÉE, avec son crochet intérieur,
//        se lisait comme un DONUT posé sur le crâne : son contour retracé faisait
//        un anneau fermé. Il fait maintenant partie de la même silhouette — le
//        bord haut se renfle vers l'avant et redescend sur la pointe — et le
//        roulé est rendu par une seule ligne interne.
const FRANGE = "M250 57"
  + "C243 55 233 56 223 55"
  + "C213 53 205 51 202 47"
  + "C199 38 203 26 212 19"
  + "C222 12 236 11 247 16"
  + "C258 22 266 30 269 39"
  + "C272 47 267 53 259 53"
  + "C255 54 251 55 250 57Z";

// ── MÈCHE D'ENCOLURE : elle descend derrière la tête le long du cou et s'achève
//    en crochet vers l'avant, comme sur la référence.
const MECHE = "M205 42"
  + "C190 52 180 70 179 92"
  + "C178 111 185 128 197 138"
  + "C208 145 221 142 225 132"
  + "C229 122 222 110 211 110"
  + "C203 110 199 117 201 124"
  + "C193 116 188 102 189 88"
  + "C191 68 200 52 212 44Z";

// ── QUEUE : gros crochet massif, la même forme retournée que la mèche.
const QUEUE = "M144 124"
  + "C116 128 92 146 80 172"
  + "C67 200 72 230 92 246"
  + "C112 260 138 256 148 238"
  + "C158 220 148 198 128 196"
  + "C114 195 106 205 111 216"
  + "C99 207 96 189 105 174"
  + "C115 157 136 149 152 155"
  + "C144 145 143 133 152 126Z";

// ── LA FLEUR de la marque de beauté : huit pétales pâles, cœur crème, VISAGE
//    souriant. Diamètre relevé : 0,11 de la longueur du tronc, soit ~19 unités
//    sur le flanc. Le visage tient en trois traits — deux points et un arc ;
//    dessiné plus finement il disparaît dans le médaillon de 60 unités.
const PETALE_C = "M0 -9.6C3.6 -9.6 6 -6.8 6 -3.8 6 -1.1 3.4 .6 0 .6"
  + "C-3.4 .6-6 -1.1-6 -3.8-6 -6.8-3.6 -9.6 0 -9.6Z";
const PETALE = "#fbe0ef";
const PETALE_T = "#e9aacd";
const COEUR = "#fdf3c4";
const COEUR_T = "#e2c168";
const VISAGE = "#b9762f";
const fleur = (x, y, e) => `<g transform="translate(${x} ${y}) scale(${e})">
    <g fill="${PETALE}" stroke="${PETALE_T}" stroke-width="1.5">${
      [0, 45, 90, 135, 180, 225, 270, 315].map((a) =>
        `<path transform="rotate(${a})" d="${PETALE_C}"/>`).join('')}
    </g>
    <circle r="5.4" fill="${COEUR}" stroke="${COEUR_T}" stroke-width="1.3"/>
    <g fill="none" stroke="${VISAGE}" stroke-width="1.2" stroke-linecap="round">
      <path d="M-2.4 -1.8C-2.4 -1.2-2.4 -.8-2.4 -.4"/>
      <path d="M2.4 -1.8C2.4 -1.2 2.4 -.8 2.4 -.4"/>
      <path d="M-2.6 1.4C-1.4 2.8 1.4 2.8 2.6 1.4"/>
    </g>
  </g>`;
// Disposition relevée : une fleur en haut-arrière, une en bas-arrière, une en
// avant à mi-hauteur. Repliées en triangle serré elles se fondent en un pâté
// dans le médaillon ; écartées de 1,3 diamètre elles restent trois fleurs.
const TROIS_FLEURS = (x, y, e) =>
  fleur(x - 11 * e, y - 11 * e, e) + fleur(x - 12 * e, y + 11 * e, e) + fleur(x + 10 * e, y + 1 * e, e);

export default (c) => {
  const d = derives(c);
  const { M0, M1, TRAIT, CRIN_S2 } = d;
  // Contour de crinière ADOUCI. `CRIN_T` du template (+30 % de saturation,
  // −16,5 % de luminosité) donne sur un rose vif un magenta franc, et la
  // crinière se lit alors comme un tube cerné d'un gros trait fluo au lieu
  // d'une masse. Sur la référence le liseré est un rose sourd, à peine plus
  // foncé que la masse.
  const CRIN_T = ton(M0, .9, -.2);
  // Crayon à cils : `CRAYON` dérive d'un œil VERT CLAIR et en tire un vert très
  // sombre encore lisible comme vert. Sur la référence les cils sont noirs.
  const CRAYON = ton(c.yeux, .45, -.52);
  const oe = oeil(c, { ...d, PUPILLE: CRAYON });

  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img">
  <g stroke-linejoin="round" stroke-linecap="round">

  <!-- 1. QUEUE : gros crochet, masse rose puis les DEUX rubans clairs -->
  <path d="${QUEUE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <g fill="none" stroke="${M1}" stroke-width="9">
    <path d="M131 132C106 144 88 164 82 186 76 210 82 232 98 242"/>
    <path d="M146 148C122 158 106 176 101 195 96 216 103 234 117 241"/>
  </g>
  <g fill="none" stroke="${CRIN_S2}" stroke-width="1.5">
    <path d="M124 130C100 143 84 163 79 184"/>
    <path d="M152 158C132 167 117 182 113 199"/>
  </g>
  <path d="${QUEUE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <!-- 2. MEMBRES DU FOND -->
  ${membresFond(d)}

  <!-- 4. CORPS + COU + TÊTE + MUSEAU : une seule silhouette -->
  <path d="${CORPS}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 5. MARQUE DE BEAUTÉ : trois fleurs souriantes sur la croupe -->
  ${TROIS_FLEURS(142, 152, .78)}

  <!-- 6. MEMBRES PROCHES -->
  ${membresProches(c, d)}

  <!-- 6 ter. MUSEAU LISSE : bouche fermée, donc l'encoche de bouche de la
       silhouette resterait vide et le museau se terminerait en bec. -->
  ${museauLisse(c, d)}

  <!-- 7. NASEAU + SOURIRE DOUX long, coin avant relevé : la maîtresse
       accueillante. Pas de dents — sur la référence sa bouche est fermée. -->
  ${naseau(d)}${sourireDoux(d, 1.15, .9)}

  <!-- 8. YEUX : grands, iris vert clair au contact du bord haut. Pupille et
       liseré d'amande en CRAYON sombre (et non en dérivé de l'iris, qui
       donnerait un œil tout vert — cf. § « l'œil à cerne noir » de NOTES.md). -->
  ${oe(OEIL_PROCHE)}${oe(OEIL_LOIN)}

  <!-- 8 bis. PAUPIÈRE à peine rabattue (.86) : c'est la seule chose qui
       distingue son regard de celui d'Applejack (grand ouvert franc). Plus
       basse, la maîtresse a l'air fatiguée. -->
  ${paupiereHaute(c, d, .86)}

  <!-- 9. PAUPIÈRES du clignement -->
  ${paupieres(c)}

  <!-- 10. contour de la joue, par-dessus l'œil lointain -->
  ${joue(d)}

  <!-- 11. (ni corne ni aile : poney terrestre) -->

  <!-- 12. CRINIÈRE : masse de tête, volute avant, mèche d'encolure. Chaque
       pièce : masse, les deux rubans clairs, les séparations, contour retracé. -->
  <path d="${FRANGE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <!-- UN SEUL ruban clair, en travers du dessus de la masse. Un second ruban
       posé le long du bord BAS se lisait comme le BORD d'un béret : c'était,
       avec la masse trop plate, tout le défaut des deux premiers tours. -->
  <path d="M250 20C238 15 224 15 214 21 207 26 203 34 204 42" fill="none"
        stroke="${M1}" stroke-width="9"/>
  <path d="${FRANGE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <!-- le ROULÉ avant, rendu par une seule ligne interne (et non par une pièce
       séparée, qui se lisait comme un anneau posé sur le crâne) -->
  <path d="M251 52C260 49 265 43 263 36 262 31 257 26 250 24" fill="none"
        stroke="${CRIN_S2}" stroke-width="2"/>

  <path d="${MECHE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <g fill="none" stroke="${M1}" stroke-width="7.5">
    <path d="M199 55C190 66 184 82 184 98 184 112 189 124 198 131"/>
    <path d="M207 52C198 63 192 79 192 96 192 110 197 122 206 130"/>
  </g>
  <g fill="none" stroke="${CRIN_S2}" stroke-width="1.5">
    <path d="M195 58C186 70 181 86 182 102"/>
    <path d="M212 60C204 70 200 84 201 98"/>
  </g>
  <path d="${MECHE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <!-- 12 bis. OREILLE, ici et pas en couche 3 : la mèche d'encolure couvre toute
       sa zone (181 → 205, 56 → 101) et un contour retracé ne découpe rien. Le
       pli interne, normalement creusé par le contour du corps, est retracé. -->
  <path d="${OREILLE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.2"/>
  <path d="M202 62C200 74 200 86 202 100" fill="none" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 13. CILS AU COIN HAUT-ARRIÈRE : trois, courts, noirs (relevé). -->
  ${cilsCoinHaut(d, 3, 2.4, 1, OEIL_PROCHE, 1, CRAYON)}

  </g>
</svg>`;
};

export const cutieMark = (c) => `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" role="img">
  <circle cx="30" cy="30" r="30" fill="${c.robe}"/>
  ${TROIS_FLEURS(30, 30, 1.22)}
</svg>`;
