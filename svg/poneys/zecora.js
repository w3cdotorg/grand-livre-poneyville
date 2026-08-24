// ───────────────────────────────────────────────────────────────────────────────
// Zecora — zèbre. Même carcasse que les poneys (`_commun.js`) : dans la série son
// anatomie est celle d'un poney, seuls la robe rayée, la crinière en crête et les
// anneaux d'or la distinguent.
//
// RÉFÉRENCE PLEIN PIED (règle « aucun visage ne se dessine de mémoire ») :
//   `File:Zecora id.png` — https://mlp.fandom.com/wiki/File:Zecora_id.png
//   (400 × 500, debout de trois quarts, tête à droite — la pose du template ;
//   `refs/w3-zecora-pp.png`, gros plan `refs/zoom-zecora-tete.png`)
//
// LA TROUVAILLE DE LA FICHE, et elle contredisait le fichier de données : sa
// robe est CLAIRE et ses rayures SOMBRES, pas l'inverse. Relevé à la pipette sur
// la référence : robe #dad1db (9 327 pixels, la couleur dominante), rayures
// #686876 (3 738 pixels). Le brief et `js/data.js` disaient « paths clairs sur
// robe grise » ; dessinée comme ça, Zecora devenait un poney gris moucheté de
// blanc, et le contraste s'inversait par rapport à tous les zèbres du monde.
// `js/data.js` a donc été corrigé (robe et rayures échangées, œil ramené au
// bleu-vert plus soutenu du relevé, clé `or` ajoutée pour les anneaux).
//
// Autres relevés :
//   · son œil est ANGULAIRE, pas rond : la paupière haute descend franchement
//     (.78) et l'iris bleu-vert n'occupe que l'avant de l'amande — c'est ce qui
//     donne le regard qui en sait long, sans le rendre méfiant ;
//   · sa crinière est une CRÊTE en trois grandes pointes couchées en arrière,
//     rayée elle aussi, et non une frange ;
//   · les anneaux d'or sont au COU (cinq), à la PATTE avant (trois) et à
//     l'OREILLE (un) ;
//   · ses sabots sont sombres, comme ceux d'un vrai zèbre — le seul personnage
//     du livre dans ce cas.
// ───────────────────────────────────────────────────────────────────────────────
import {
  ton, derives, OREILLE, CORPS, membresFond, membresProches, naseau,
  sourireDoux, oeil, OEIL_PROCHE, OEIL_LOIN, paupieres, paupiereHaute,
  joue, cilsCoinHaut, museauLisse,
} from "./_commun.js";

// ── UNE RAIE : bande effilée aux deux bouts, écrite dans un repère local (7
//    unités de large, 42 de long, pointe en bas) puis posée par
//    translate/rotate/scale. Des raies à bouts ronds (un simple `stroke` à
//    `linecap="round"`) se lisent comme des taches : c'est la POINTE qui fait
//    lire « zèbre ».
const RAIE = "M0 0C2.6 5 3.4 12 2.6 20"
  + "C2 28 .4 35-1.4 40"
  + "C-2.6 34-3 26-2.4 18"
  + "C-1.8 10-.8 4 0 0Z";

export default (c) => {
  const RAYURE = c.rayures ?? "#5b5b66";
  const OR = c.or ?? "#e9c642";
  const OR_T = ton(OR, .9, -.2);
  const OR_H = ton(OR, .8, .16);
  const d0 = derives(c);
  // Contour de robe RENFORCÉ. `TRAIT` du template (−21 % de luminosité) tiré
  // d'une robe presque blanche (#dcd6de) donne un gris à peine visible : la
  // silhouette disparaissait. Même problème et même correctif que la corne de
  // Rarity, en plus radical parce qu'ici c'est TOUT le contour.
  const TRAIT = ton(c.robe, .5, -.42);
  const d = { ...d0, TRAIT, FOND: ton(c.robe, .6, -.11), FOND_T: ton(c.robe, .5, -.28) };
  const { M0, M1, CRIN_T, CRIN_S2 } = d;
  // Crayon à cils : `CRAYON` dérive d'un œil bleu-vert ; il en tire un vert
  // sombre encore coloré. Les cils de la référence sont noirs.
  const CRAYON = ton(c.yeux, .3, -.5);
  const oe = oeil(c, { ...d, PUPILLE: CRAYON });

  const raie = (x, y, r, e, ey = 1) =>
    `<path transform="translate(${x} ${y}) rotate(${r}) scale(${e} ${ey})" d="${RAIE}"/>`;

  // Anneau d'or : un arc épais posé en travers d'un membre ou du cou. Le liseré
  // sombre dessous et le filet clair dessus sont ce qui le fait lire « métal »
  // et non « bandeau de tissu ».
  const anneau = (trace, w) => `<path d="${trace}" fill="none" stroke="${OR_T}"
        stroke-width="${w + 2.4}"/>
    <path d="${trace}" fill="none" stroke="${OR}" stroke-width="${w}"/>
    <path d="${trace}" fill="none" stroke="${OR_H}" stroke-width="${w * .3}"
        stroke-opacity=".8"/>`;

  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img">
  <g stroke-linejoin="round" stroke-linecap="round">

  <!-- 1. QUEUE : fine, rayée, terminée par une touffe sombre -->
  <path d="M141 124C126 130 114 142 108 158 102 176 100 198 100 218
           C100 226 102 232 105 236 110 240 118 240 123 235
           C127 230 128 222 126 214 124 206 123 198 124 190
           C126 172 130 152 140 134Z"
        fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.2"/>
  <g fill="${RAYURE}">
    ${raie(107, 150, -100, .45, .4)}${raie(104, 170, -95, .45, .4)}
    ${raie(102, 190, -90, .45, .4)}
  </g>
  <path d="M104 210C104 224 106 234 112 240 118 244 126 242 128 234
           C130 226 128 216 126 208 118 204 110 205 104 210Z"
        fill="${M0}" stroke="${CRIN_T}" stroke-width="2.8"/>
  <g fill="none" stroke="${M1}" stroke-width="3.4" stroke-opacity=".9">
    <path d="M106 216C112 213 120 213 126 216"/>
    <path d="M108 227C113 224 121 224 127 227"/>
  </g>

  <!-- 2. MEMBRES DU FOND -->
  ${membresFond(d)}

  <!-- 4. CORPS + COU + TÊTE + MUSEAU : une seule silhouette -->
  <path d="${CORPS}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.4"/>

  <!-- 4 bis. LES RAIES du tronc, du cou et de la croupe. Elles suivent la
       courbure : verticales sur le flanc, obliques vers l'arrière sur la croupe,
       en travers du cou. Le museau n'en porte que DEUX, fines — le visage est la
       priorité, et cinq raies dessus le transforment en masque. -->
  <g fill="${RAYURE}">
    ${raie(140, 131, 9, 1.6, 1.15)}${raie(157, 128, 3, 1.85, 1.3)}
    ${raie(174, 128, -3, 1.9, 1.35)}${raie(191, 131, -9, 1.7, 1.2)}
    ${raie(132, 138, 8, 1.35, .95)}
    ${raie(203, 105, -73, 1.4, .48)}${raie(200, 120, -76, 1.5, .5)}
    ${raie(119, 192, -84, 1.15, .8)}${raie(120, 212, -84, 1.1, .75)}
    ${raie(177, 228, -84, 1.1, .63)}${raie(178, 246, -84, 1.05, .52)}
    ${raie(264, 82, -127, .62, .3)}
  </g>

  <!-- 5. MARQUE DE BEAUTÉ : le soleil en spirale, sur la croupe -->
  ${SOLEIL(142, 154, .82, RAYURE, ton(RAYURE, .6, .3))}

  <!-- 6. MEMBRES PROCHES + leurs raies + les sabots sombres -->
  ${membresProches(c, d)}
  <g fill="${ton(RAYURE, .7, -.12)}" stroke="${ton(RAYURE, .7, -.24)}" stroke-width="2">
    <path d="M119 252C127 255 137 255 145 252
             C146 258 146 263 145 265 137 268 127 268 120 265 118 262 118 257 119 252Z"/>
    <path d="M178 252C186 255 196 255 204 252
             C205 258 205 263 204 265 196 268 186 268 179 265 177 262 177 257 178 252Z"/>
  </g>

  <!-- 6 ter. MUSEAU LISSE : bouche fermée, sans lui le chanfrein se termine en
       marche d'escalier (cf. _commun.js). -->
  ${museauLisse(c, d)}

  <!-- 7. NASEAU + SOURIRE DOUX un peu relevé : la sagesse tranquille. -->
  ${naseau(d)}${sourireDoux(d, 1, .5)}

  <!-- 8. YEUX, iris bleu-vert, liseré et pupille noirs -->
  ${oe(OEIL_PROCHE)}${oe(OEIL_LOIN)}

  <!-- 8 bis. PAUPIÈRE à .78, ligne peinte du CRAYON : l'œil ANGULAIRE du relevé.
       Grand ouvert, Zecora perd son air de sage ; sous .7 elle s'endort. -->
  ${paupiereHaute(c, { TRAIT: CRAYON }, .78)}

  <!-- 9. PAUPIÈRES du clignement -->
  ${paupieres(c)}

  <!-- 10. contour de la joue, par-dessus l'œil lointain -->
  ${joue(d)}

  <!-- 11. (ni corne ni aile) -->

  <!-- 12. LA CRÊTE : trois grandes pointes couchées en arrière, masse sombre
       barrée de raies claires. Bornes : la pointe la plus haute ne monte pas
       au-dessus de y 12 (fenêtre de portrait à y 6, cinq unités de marge), et le
       bord bas reste au-dessus de y 56 entre x 213 et 230 pour laisser sortir
       les cils du coin haut. -->
  <path d="${CRETE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3"/>
  <g fill="none" stroke="${M1}" stroke-width="3.4">
    <path d="M201 44C199 34 198 26 199 20"/>
    <path d="M208 46C210 37 213 30 216 25"/>
    <path d="M221 45C219 34 219 25 221 18"/>
    <path d="M228 46C231 37 234 29 237 24"/>
    <path d="M242 45C241 35 242 27 244 21"/>
    <path d="M249 46C252 39 255 32 258 27"/>
  </g>
  <path d="${CRETE}" fill="none" stroke="${CRIN_T}" stroke-width="3"/>

  <!-- 12 bis. LA BROSSE de nuque : la crête se prolonge en une courte brosse le
       long de l'encolure. -->
  <path d="M199 46C192 56 188 70 188 86 188 98 191 108 196 116
           C202 112 206 104 207 94 208 82 205 66 202 52Z"
        fill="${M0}" stroke="${CRIN_T}" stroke-width="3"/>
  <g fill="none" stroke="${M1}" stroke-width="3.4">
    <path d="M195 56C191 66 190 78 191 90"/>
    <path d="M201 60C199 70 199 82 201 94"/>
  </g>

  <!-- 12 ter. OREILLE, après la crinière (la brosse couvre sa zone), et son
       ANNEAU D'OR. Le pli interne est retracé à la main. -->
  <path d="${OREILLE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.2"/>
  <path d="M202 62C200 74 200 86 202 100" fill="none" stroke="${TRAIT}" stroke-width="3.4"/>
  <path d="M188 60C185 63 184 66 184 69" fill="none" stroke="${RAYURE}" stroke-width="3.4"/>
  ${anneau("M199 96C205 96 209 101 209 106 209 111 205 115 199 115 194 115 190 111 190 106 190 101 194 96 199 96Z", 3.2)}

  <!-- 12 quater. LES ANNEAUX DU COU : cinq, empilés du haut de la gorge à la
       base de l'encolure. Leur bord avant reste en deçà de la frontière du cou
       (x 242 à y 128, 238 à y 141, 234 à y 149, 229 à y 160, 222 à y 172). -->
  ${anneau("M203 123C214 129 226 133 237 135", 6.4)}
  ${anneau("M201 133C212 139 223 143 234 145", 6.4)}
  ${anneau("M200 143C210 149 221 152 231 154", 6.2)}
  ${anneau("M200 153C209 158 219 161 228 163", 6)}
  ${anneau("M201 163C209 168 218 171 226 172", 5.6)}

  <!-- 12 quinquies. LES ANNEAUX DE LA PATTE AVANT : trois -->
  ${anneau("M179 197C186 201 196 201 203 197", 5)}
  ${anneau("M178.5 207C186 211 196 211 203 207", 5)}
  ${anneau("M178 217C186 221 196 221 203 217", 4.6)}

  <!-- 13. CILS AU COIN HAUT-ARRIÈRE : trois, fins -->
  ${cilsCoinHaut(d, 3, 2.2, 1.1, OEIL_PROCHE, 1, CRAYON)}

  </g>
</svg>`;
};

// ── LA CRÊTE. Trois pointes, dessinées d'un seul tracé : la ligne du haut monte
//    et redescend trois fois, la ligne du bas suit la ligne de cheveux.
const CRETE = "M197 47"
  + "C193 36 193 25 197 18"
  + "C202 24 206 29 209 33"
  + "C209 27 211 20 216 14"
  + "C221 20 225 26 228 31"
  + "C229 25 232 19 237 15"
  + "C242 21 246 27 250 32"
  + "C251 27 254 23 258 20"
  + "C261 27 263 34 265 41"
  + "C259 47 244 51 228 51"
  + "C213 51 201 50 197 47Z";

// ── LE SOLEIL EN SPIRALE de la marque de beauté. Une spirale épaisse au centre
//    (deux passes de trait, comme les volutes de Rarity — un tracé fermé
//    devrait se recroiser) et huit rayons triangulaires autour.
//    Contrôlé dans le médaillon de 60 unités : à moins de six rayons la marque
//    se lit comme une virgule, à plus de dix ils se touchent.
const SPIRALE = "M0 -1C4 -1 7 2 7 6 7 11 3 15-2 15-8 15-13 10-13 4"
  + "C-13 -3-7 -9 0 -9 8 -9 15 -2 15 5";
const RAYON = "M0 -15L4.6 -22.4L-4.6 -22.4Z";
const SOLEIL = (x, y, e, col, clair) => `<g transform="translate(${x} ${y}) scale(${e})">
    <g fill="${col}">${[0, 45, 90, 135, 180, 225, 270, 315].map((a) =>
      `<path transform="rotate(${a})" d="${RAYON}"/>`).join('')}</g>
    <path d="${SPIRALE}" fill="none" stroke="${col}" stroke-width="7"
          stroke-linecap="round"/>
    <path d="${SPIRALE}" fill="none" stroke="${clair}" stroke-width="2"
          stroke-linecap="round" stroke-opacity=".7"/>
  </g>`;

export const cutieMark = (c) => {
  const RAYURE = c.rayures ?? "#5b5b66";
  return `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" role="img">
  <circle cx="30" cy="30" r="30" fill="${c.robe}"/>
  ${SOLEIL(30, 31, 1.15, RAYURE, ton(RAYURE, .6, .3))}
</svg>`;
};
