// ───────────────────────────────────────────────────────────────────────────────
// Big Macintosh — poney terrestre, le colosse de la famille Apple.
// Dérivé du TEMPLATE CANON `twilight.js` via `_commun.js`.
//
// RÉFÉRENCE PLEIN PIED : `refs/bigmac-plein-pied.png`
//   https://static.wikia.nocookie.net/mlp/images/2/2b/Big_McIntosh_id_S2E17.png
// (176 × 228, la taille du fichier d'origine — petite, mais c'est un plein pied
// de trois quarts dans la pose même du template, en miroir.)
// Complément de visage : `refs/big-mac-sourire.png`
//   (Big_McIntosh_sympathetic_smile_S4E14.png).
//
// GABARIT MASSIF. La tête reste canonique (c'est la fenêtre de portrait
// `171 6 124 124` qui l'impose), et tout le reste grossit autour. Ce que la
// référence a corrigé du premier jet, en fraction de la HAUTEUR DE TÊTE (52 px
// sur la référence, 75 unités ici) :
//
// | mesure                        | Twilight | Big Mac réf. | d'où          |
// | profondeur du tronc           | 0,80     | **1,35**     | ventre à y 203 |
// | longueur de patte visible     | 1,08     | **0,75**     | sabots à y 258 |
// | largeur d'œil                 | 0,53     | 0,54         | œil À TAILLE 1 |
// | hauteur d'œil VISIBLE         | 0,44     | **0,31**     | paupière à .60 |
//
// Les deux lignes du bas sont la vraie leçon : son œil n'est pas PETIT, il est
// MI-CLOS. Le premier jet le réduisait à .85 en gardant la paupière haute à .70,
// ce qui donnait un œil de poney normal juste rapetissé. C'est la paupière
// lourde, sur un œil de taille pleine, qui fait le regard placide.
// Et ce sont les PATTES COURTES sous un tronc PROFOND qui font le colosse — pas
// la taille générale, qu'on ne peut pas montrer sur un personnage seul dans son
// cadre.
//
// ── EXPRESSION SIGNATURE : PLACIDE ET DOUX. Paupière haute rabattue à .60 — le
//    regard tranquille de celui qui répond « Eeyup » — sourire FERMÉ, épais, bas
//    sur le museau, avec une fossette au coin arrière, aucun cil (il n'en a pas
//    dans la série), et des TACHES DE ROUSSEUR : contrairement à l'intuition il
//    en a, comme Applejack, trois par joue et plus grosses qu'elle.
// ───────────────────────────────────────────────────────────────────────────────
import {
  ton, derives, OREILLE, PATTE_AR_FOND, PATTE_AV_FOND, PATTE_AR_BORD,
  PATTE_AV_BORD, PATTE_AR_CLOS, PATTE_AV_CLOS, naseau, oeil,
  paupiereHaute, paupieres, joue, taches,
} from "./_commun.js";

// ── ŒIL : taille pleine, mais DESCENDU de 4 unités dans le crâne. Toutes les
//    références de la vague placent le centre de l'œil à 0,53-0,62 de la hauteur
//    de tête, quand le canon de Twilight (tête relevée vers le ciel) le met à
//    0,48. C'est un des deux points que le propriétaire jugeait « ratés ».
const OEIL_P_BM = "translate(235.5 82)";
const OEIL_L_BM = "translate(266 69) scale(-.41 .81)";

// ── SILHOUETTE MASSIVE. Le segment mâchoire → crâne → menton → mâchoire est le
//    tracé canonique de `CORPS`, à la virgule près : la tête ne change pas.
//    Tout le reste est relevé 15 % plus large et 18 unités plus bas.
const CORPS_MASSIF = "M188 134C194 122 198 111 199 100 200 86 199 74 202 62"
  + "C206 52 218 45 238 42 256 45 265 53 269 62"
  + "C272 68 274 74 278 79 281 83 282 87 281 89"
  + "C279 92 273 95 271 98 271 102 275 104 279 106"
  + "C277 108 273 110 268 112 264 113 259 114.5 255 115"
  + "C250 115.5 246 115.5 243 116"
  + "C244 122 245 128 244 134"          // gorge épaisse : elle ressort vers l'avant
  + "C242 148 238 162 232 175"
  + "C228 184 224 191 221 197"          // poitrail profond
  + "C210 202 197 203 184 203"
  + "C174 203 166 202 160 200"
  + "C150 198 140 196 132 192"
  + "C124 187 119 178 118 168"
  + "C117 155 120 143 126 135"
  + "C133 128 142 126 151 126"
  + "C161 128 173 133 181 135"
  + "C184 135 187 135 188 134Z";

// ── PATTES : les quatre tracés canoniques, mis à l'échelle 1,14 dans un groupe.
//    Passer par un `transform` plutôt que par quatre nouveaux tracés garantit
//    que le sabot garde exactement le galbe du template (et le trait épaissit
//    de 3,2 à 3,65, ce qui tombe bien pour un poney de trait).
//    Le décalage vertical (−45,2) pose les sabots à y 258 et ENFONCE le haut des
//    pattes dans le tronc : la patte visible ne fait plus que 55 unités sous un
//    ventre à y 203, soit les 0,75 hauteur de tête de la référence. Les lignes
//    d'épaule et de cuisse remontent d'autant dans le flanc — c'est exactement ce
//    que montre la référence.
const GROS = 'transform="translate(-22.5 -45.2) scale(1.14)"';

// ── QUEUE : longue, épaisse, presque droite — pas la vague des juments.
const QUEUE = "M146 140C130 144 116 154 108 170"
  + "C101 184 98 200 99 214"
  + "C100 226 104 234 108 240"
  + "C114 244 122 242 123 236"
  + "C123 226 119 214 120 202"
  + "C121 188 125 176 133 166"
  + "C138 157 143 148 146 140Z";

// ── CRINIÈRE. Monochrome (`criniere` n'a qu'une entrée) : les bandes de couleur
//    du template n'existent pas, ce sont des reflets `CRIN_H` et des séparations
//    renforcées `CRIN_S2`. La frange est COURTE et peignée vers l'avant, sa
//    pointe (218,76) mord sur le coin arrière de l'œil.
// Cote critique : l'œil étant réduit à .85, son amande culmine à y 65,5 vers
// x 228 — la pointe de frange doit donc rester en ARRIÈRE de x 222 pour dipper
// à y 73 sans manger l'iris (la règle « pas sous y 62 au-delà de x 224 » de
// NOTES.md, retendue par l'œil plus petit).
const FRANGE = "M196 52C200 60 206 66 212 70 215 72 218 73 220 73"
  + "C224 68 229 62 235 56 242 50 250 46 256 43"
  + "C252 37 242 33 231 33 217 34 202 43 196 52Z";
// Mèche d'encolure épaisse le long de la nuque, qui déborde de 12 unités à
// gauche du cou : les cheveux pendent DEHORS, pas sur le cou. COURTE — arrêtée
// à y 143 : descendue au poitrail elle donne une chevelure de jument.
const MECHE = "M201 74C196 84 191 96 189 108"
  + "C187 116 188 124 192 129"
  + "C197 133 203 131 205 126"
  + "C206 118 207 110 209 102"
  + "C211 92 213 82 214 76"
  + "C210 72 205 71 201 74Z";

// ── MOITIÉ DE POMME VERTE (marque de beauté), vue par la FACE COUPÉE : c'est
//    la chair pâle et les deux pépins qui disent « moitié » — un profil de
//    pomme verte se lirait juste comme une pomme. Silhouette reprise de la
//    pomme d'Applejack (creux supérieur), pour que la famille reste cohérente.
const POMME = "M0 -7C-3 -10-7 -9.5-9 -6"
  + "C-11 -2.5-10.5 3-7.5 6.5"
  + "C-5 9.5-2.5 10.5 0 9.5"
  + "C2.5 10.5 5 9.5 7.5 6.5"
  + "C10.5 3 11 -2.5 9 -6"
  + "C7 -9.5 3 -10 0 -7Z";
const FEUILLE = "M1.5 -8.5C3 -11 5.5 -12 7.5 -11.5 7 -9.5 5 -8 2.5 -7.5Z";
const VERT = "#9ccb4d";              // pomme Granny Smith  (constante documentée)
const VERT_T = ton(VERT, 1, -.13);
const CHAIR = "#eef3cf";             // chair de la pomme    (idem)
const PEPIN = "#6b4a2a";             // pépins               (idem)
const demiPomme = (x, y, e) => `<g transform="translate(${x} ${y}) scale(${e})">
    <path d="${POMME}" fill="${VERT}" stroke="${VERT_T}" stroke-width="1.8"/>
    <path d="${POMME}" transform="scale(.68)" fill="${CHAIR}"/>
    <ellipse cx="-2.6" cy="0" rx="1.5" ry="2.4" fill="${PEPIN}" transform="rotate(-18 -2.6 0)"/>
    <ellipse cx="2.6" cy="0" rx="1.5" ry="2.4" fill="${PEPIN}" transform="rotate(18 2.6 0)"/>
    <path d="M0.5 -8C0.5 -10 0.5 -11 0.5 -12" fill="none" stroke="${VERT_T}" stroke-width="1.8"/>
    <path d="${FEUILLE}" fill="${VERT}" stroke="${VERT_T}" stroke-width="1.4"/>
  </g>`;

export default (c) => {
  const d = derives(c);
  const { M0, TRAIT, CRIN_T, CRIN_S2, CRIN_H } = d;
  const BOIS = "#b0803c";              // collier de trait     (constante documentée)
  const BOIS_T = ton(BOIS, .9, -.16);
  const oe = oeil(c, d);

  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img">
  <g stroke-linejoin="round" stroke-linecap="round">

  <!-- 1. QUEUE : masse, reflet, séparations, puis contour retracé par-dessus -->
  <path d="${QUEUE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <path d="M136 150C124 162 116 178 113 196 110 214 111 228 115 238" fill="none"
        stroke="${CRIN_H}" stroke-width="11"/>
  <g fill="none" stroke="${CRIN_S2}" stroke-width="1.6">
    <path d="M141 148C127 160 118 178 115 196 112 216 113 230 117 240"/>
    <path d="M128 158C117 170 110 186 107 202 104 220 105 234 108 241"/>
  </g>
  <path d="${QUEUE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <!-- 2. MEMBRES DU FOND, à l'échelle 1,14 -->
  <g ${GROS} fill="${d.FOND}" stroke="${d.FOND_T}" stroke-width="3.2">
    <path d="${PATTE_AR_FOND}"/><path d="${PATTE_AV_FOND}"/>
  </g>

  <!-- 3. (l'OREILLE passe en couche 12 ter : la mèche de nuque couvre toute sa
       zone (181 → 205, 56 → 101), et un contour retracé ne DÉCOUPE rien.) -->

  <!-- 4. CORPS MASSIF + COU ÉPAIS + TÊTE CANONIQUE : une seule silhouette -->
  <path d="${CORPS_MASSIF}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.6"/>

  <!-- 5. MARQUE DE BEAUTÉ : la moitié de pomme, ENTRE LES DEUX PATTES PROCHES.
       Les pattes étant remontées de 20 unités dans le tronc, leurs remplissages
       mangent le flanc bien plus haut qu'en gabarit normal : le bord haut de la
       cuisse arrière passe à y 143 (x 148) et celui de l'épaule à y 155
       (x 185). Posée à (150,152) — la place canonique — la pomme disparaissait
       entièrement sous la cuisse. La fenêtre libre est x 164 → 186. -->
  ${demiPomme(175, 158, .95)}

  <!-- 6. MEMBRES PROCHES, à l'échelle 1,14 -->
  <g ${GROS}>
    <g fill="${c.robe}"><path d="${PATTE_AR_CLOS}"/><path d="${PATTE_AV_CLOS}"/></g>
    <g fill="none" stroke="${TRAIT}" stroke-width="3.2">
      <path d="${PATTE_AR_BORD}"/><path d="${PATTE_AV_BORD}"/>
    </g>
  </g>

  <!-- 7. NASEAU + BOUCHE PAISIBLE : trait épais, bas sur le museau, à peine
       relevé, doublé d'une FOSSETTE au coin arrière. C'est la fossette qui
       transforme une ligne neutre en sourire tranquille. -->
  ${naseau(d)}
  <path d="M265 99.5C269.5 102.5 273.5 104.5 277.5 104.2" fill="none"
        stroke="${TRAIT}" stroke-width="2.8"/>
  <path d="M264.5 99.5C263.8 101 263.6 102.5 264 104" fill="none"
        stroke="${TRAIT}" stroke-width="2"/>

  <!-- 8. YEUX à taille pleine, descendus de 4 unités -->
  ${oe(OEIL_P_BM)}${oe(OEIL_L_BM)}

  <!-- 8 bis. PAUPIÈRE HAUTE à .60 : le regard mi-clos, tranquille — c'est elle,
       et non un œil rapetissé, qui donne les 0,31 de hauteur visible relevés sur
       la référence. Et les TACHES DE ROUSSEUR, plus claires que la robe, trois
       sur la joue proche sous le coin bas de l'amande (244 ; 98). -->
  ${paupiereHaute(c, d, .60, c.robe, 1, OEIL_P_BM, OEIL_L_BM)}
  ${taches(c.robe, [[238, 101, 2.4], [246.5, 102.5, 2.4], [242, 107.5, 2.2]])}

  <!-- 9. PAUPIÈRES du clignement, au même facteur .85 que l'amande -->
  ${paupieres(c, 1, c.robe, OEIL_P_BM, OEIL_L_BM)}

  <!-- 10. contour de la joue, par-dessus l'œil lointain -->
  ${joue(d)}

  <!-- 11. (ni corne ni aile : poney terrestre) -->

  <!-- 12. CRINIÈRE : frange courte peignée en avant + grosse mèche de nuque -->
  <path d="${FRANGE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <path d="M203 46C211 42 222 40 232 41 242 42 250 45 254 47" fill="none"
        stroke="${CRIN_H}" stroke-width="6"/>
  <g fill="none" stroke="${CRIN_S2}" stroke-width="1.5">
    <path d="M202 53C210 47 221 43 232 43"/>
    <path d="M207 64C214 57 223 52 232 49"/>
    <path d="M212 71C219 63 227 57 236 53"/>
  </g>
  <path d="${FRANGE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <path d="${MECHE}" fill="${M0}" stroke="${CRIN_T}" stroke-width="3.2"/>
  <path d="M199 82C194 94 191 106 191 116 191 122 192 126 193 128" fill="none"
        stroke="${CRIN_H}" stroke-width="8"/>
  <g fill="none" stroke="${CRIN_S2}" stroke-width="1.6">
    <path d="M205 80C199 92 196 104 196 114 196 122 197 127 198 130"/>
    <path d="M210 82C206 92 203 102 203 112 203 119 203 124 204 127"/>
  </g>
  <path d="${MECHE}" fill="none" stroke="${CRIN_T}" stroke-width="3.2"/>

  <!-- 12 bis. COLLIER DE TRAIT, PAR-DESSUS la crinière : un joug se porte sur
       les cheveux, et posé avant (couche 6 bis, premier essai) la mèche de
       nuque en mangeait toute la moitié gauche — il ne restait qu'un moignon
       brun au poitrail. Sur la référence ce n'est pas une lanière mais une
       PIÈCE LARGE, qui couvre l'épaule du garrot au poitrail : une bande de
       13 unités s'y lisait comme une écharpe. Ses deux bouts restent DANS la
       silhouette (le bord du poitrail passe à x 236 pour y 166). -->
  <path d="M186 128C192 150 205 165 222 171
           C229 173 234 170 235 164
           C228 158 219 148 212 137
           C206 129 201 123 197 119
           C192 120 187 123 186 128Z"
        fill="${BOIS}" stroke="${BOIS_T}" stroke-width="3"/>
  <path d="M192 130C197 149 208 161 223 167" fill="none"
        stroke="${BOIS_T}" stroke-width="1.8"/>

  <!-- 12 ter. OREILLE, PAR-DESSUS la crinière (l'oreille proche est en avant de
       la mèche rejetée derrière la tête), puis le PLI INTERNE retracé à la main
       — c'est le contour du cou qui le dessinait en couche 4. -->
  <path d="${OREILLE}" fill="${c.robe}" stroke="${TRAIT}" stroke-width="3.2"/>
  <path d="M202 62C199 74 200 86 199 100" fill="none" stroke="${TRAIT}" stroke-width="3.6"/>

  <!-- 13. (AUCUN CIL : Big Macintosh n'en a pas dans la série — trois cils
       suffisent à le faire lire comme une jument.) -->

  </g>
</svg>`;
};

// Médaillon : la face coupée est pâle, elle a besoin du disque de robe derrière.
export const cutieMark = (c) => `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" role="img">
  <circle cx="30" cy="30" r="30" fill="${c.robe}"/>
  ${demiPomme(30, 31, 2.1)}
</svg>`;
